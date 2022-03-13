const session_user = $('#content').attr('session_nicnkname');
var socket = io.connect('http://' + document.domain + ':' + location.port+'/');

import { indicate_comment, indicate_reply } from './create_comment.js';

import indicate_time from './time_information.js';
// upload time
$(function(){
    let create_time = document.querySelectorAll('.comment_time');
    //각 게시물 별 업로드 시간
    create_time.forEach(time => {
        indicate_time(time)
        // time.addEventListener('load', indicate_time);
    });
});

let postNotice = document.querySelectorAll('.post_notice_click');

if (postNotice.length != 0) {
    // 각 post modal에 이벤트 추가
    postNotice.forEach(post => {
        // 이미지가 있는 post
        if (post.className.includes('post_notice_img')) {
            post.addEventListener('click', function(){
                let noticeModal = $(post).parent().siblings('.notice_modal_background');
                console.log(noticeModal);
                noticeModal[0].style.display = 'block';
                document.querySelector(".body").className = "body scroll_hidden";
            });
        } else { // text만 있는 post
            post.addEventListener('click', function(){
                let noticeModal = $(post).parent().parent().siblings('.notice_modal_background');
                console.log(noticeModal);
                noticeModal[0].style.display = 'block';
                document.querySelector(".body").className = "body scroll_hidden";
            });
        };
        console.log($(post).find('.post_notice_comment_list'))
        // $('this .post_notice_comment_list')
    });
};

$('.notice_comment_submit').click(function(){
    // 댓글 내용
    let text = $(this).prev().val();
    console.log(text)
    // 해당 버튼이 있는 post의 id 값
    let post_id = $(this).parent().attr('value');
    let btn = $(this)
    let add_comment_list = $(this).parent().siblings(".post_notice_comment_list")
    let create_user = $(this).parents('#content').attr('create_user_nickname')

    var request_data = {
        "kind" : "append_comment",
        "text": text,
        "post_id": post_id,
        "create_user": create_user,
        "session_user": session_user
    }
    $.ajax({
        type: "POST",
        url: "/content_reaction_submit",
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            indicate_comment(data, add_comment_list)
            
            socket.emit('comment_post', request_data);
            if(data['mention'].length > 0){
                for(let i = 0; i < data['mention'].length; i++){
                    console.log(data['mention'][i])
                    var mention_data = {
                        "kind" : "append_reply",
                        "text": text,
                        "post_id": post_id,
                        'create_user': create_user,
                        'session_user': session_user,
                        'mention' : data['mention'][i]
                    }
                    socket.emit('mention', mention_data);
                    // console.log(request)
                }
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});

// 답글 칸 생성 ajax
$(document).on("click",".notice_reply",function(){
    const value = $(this).attr('value')
    const comment_id = $(this).attr('comment_id')

    const div_tag = $(this).parent().parent().parent().parent()
    // 답글 전체를 감쌀 div tag
    const create_div = document.createElement('div');
    // 답글에 대한 맨션 tag
    // const create_mention = document.createElement('p');

    // 답글을 작성할 textarea tag
    const create_textarea = document.createElement('textarea');
    // 답글을 누를 button
    const create_btn = document.createElement('button');
    // 답글 취소 button
    const create_btn_cancel = document.createElement('button');
    
    //댓글 입력칸 hidden
    $(this).parent().parent().parent().siblings('.comment_form').hide();

    $(create_div).attr({
        'class': 'comment_form reply_form',
        'value': comment_id,
    });
    // $(create_mention).attr({
    //     'class': 'reply_metion',
    // });

    $(create_textarea).attr({
        'class': 'comment_textarea reply_textarea'
    });
    $(create_textarea).text('@'+value+ ' ')

    $(create_btn).text('답글 달기')
    $(create_btn).attr({
        'class': 'comment_submit notice_reply_submit',
        'type' : 'submit'
    });

    $(create_btn_cancel).text('취소')
    $(create_btn_cancel).attr({
        'id': 'reply_cancel_id',
        'class': 'reply_cancel comment_submit',
    });

    // create_div.appendChild(create_mention)
    create_div.appendChild(create_textarea)
    create_div.appendChild(create_btn);
    create_div.appendChild(create_btn_cancel);
    $(div_tag).append(create_div);
});

// import indicate_reply from './create_comment.js';
// 답글을 달았을 때 댓글 정보와 댓글을 단 유저 정보를 답글 목록에 추가하는 함수

//답글 전송 ajax
$(document).on("click",".notice_reply_submit",function(){
    console.log('apply test')
    // 답글 내용
    let text = $(this).prev().val();
    // 해당 버튼이 있는 comment
    let this_comment = $(this).parent()
    console.log(this_comment)
    // 해당 버튼이 있는 comment의 id 값
    let comment_id = this_comment.attr('value');
    let comment_form = $(this).parent().siblings('.comment_form')
    // 해당 답글이 달린 comment가 있는 post id 값
    let post_id = comment_form.attr('value');
    // 답글 전송시 답글 입력 tag 삭제
    let remove_tag = $(this).parent()
    // 해당 post 작성 user
    let create_user = $(this).parents('#content').attr('create_user_nickname')

    let add_comment_list = $(this).parent().siblings(".post_notice_comment_list")
    let chiled = add_comment_list.children()

    let standard_div = null
    for(let i = 0; i < chiled.length; i++){
        if ($(chiled[i]).attr('comment_id') == comment_id & $(chiled[i]).attr('class') == 'reply_container'){
            standard_div = chiled[i]
        }
    }
    var request_data = {
        "kind" : "append_reply",
        "text": text,
        "post_id": post_id,
        "comment_id": comment_id,
        'create_user': create_user,
        'session_user': session_user
    }
    $.ajax({
        type: "POST",
        url: "/content_reaction_submit",
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            indicate_reply(data, add_comment_list, standard_div)
            //해당 댓글의 답글 list show
            $(standard_div).attr('style','display:flex;');
            $(remove_tag).remove()
            $(comment_form).show()
            socket.emit('comment_post', request_data);

            console.log('mention = ',data['mention'])
            if(data['mention'].length > 0){
                for(let i = 0; i < data['mention'].length; i++){
                    console.log(data['mention'][i])
                    var mention_data = {
                        "kind" : "append_reply",
                        "text": text,
                        "post_id": post_id,
                        "comment_id": comment_id,
                        'create_user': create_user,
                        'session_user': session_user,
                        'mention' : data['mention'][i]
                    }
                    socket.emit('mention', mention_data);
                    // console.log(request)
                }
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});