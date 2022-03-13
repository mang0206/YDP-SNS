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