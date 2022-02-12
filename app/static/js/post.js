// 동일한 content 구조가 들어가는 page에 export

// session user 더보기 btn
$('.more_icon').click(function(){
    document.querySelector(".more_icon_popup_back").className = "more_icon_popup_back";
    document.querySelector(".body").className = "body scroll_hidden";
});

$('.more_icon_cancel').click(function(){
    document.querySelector(".more_icon_popup_back").className = "more_icon_popup_back none";
    document.querySelector(".body").className = "body";
});

// like list btn
$('.content_like').click(function(){
    let like_contaiber = $(this).parent().children('.like_container_back');
    // document.querySelector(".like_container_back").className = "like_container_back";
    // $(like_contaiber).addClass('like_container_back')
    $(like_contaiber).removeClass('none')
    document.querySelector(".body").className = "body scroll_hidden";
});

$('.like_close').click(function(){
    let like_contaiber = $(this).parent().parent().parent()
    // let like_contaiber = $(this).parent().children('.like_container_back');
    // document.querySelector(".like_container_back").className = "like_container_back none";
    $(like_contaiber).addClass('none')
    document.querySelector(".body").className = "body";
});

//like btn ajax
$('[id$=_icon]').click(function(){
    let btn_value = $(this).attr('value');
    let post_id = $(this).attr('post_id');
    let btn = $(this)
    var request_data = {
        "flag": btn_value,
        "post_id": post_id
    }
    // 해당 post의 좋아요 버튼
    let content_like = $(btn).parent().children('.content_like')
    // 해당 post의 좋아요 누른 user 수
    let like_count = Number($(content_like).text().slice(0,1))
    // 클릭한 버튼의 해당 post의 like_container_back를 찾기 위해 parent 및 children을 사용
    let like_div = $(btn).parent().children('.like_container_back').children().children('.like_user_list_container')[0]

    $.ajax({
        type: 'POST',
        url: "/content_like_submit",
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            // session user가 이미 좋아요를 누른 상태
            if (btn_value == "color") {
                $(btn).attr('value', 'empty')
                $(btn).attr('src', '../static/img/empty_like.png')
                like_count -= 1
                $(content_like).text(String(like_count) + '개')

                let chiled = $(like_div).children()
                //해당 div의 모든 자식 요소를 돌며
                for (let i = 0; i < chiled.length; i++) {
                    console.log($(chiled[i]).attr('value'))
                    //입력한 값과 일치하는 속성 값을 가진 자식요소를 찾고
                    if ($(chiled[i]).attr('value') == data['session_user']['nickname']) {
                        // 해당 요소를 지움
                        $(chiled[i]).remove();
                    }
                }
            // session user가 좋아요를 누르지 않은 상태
            }else{ 
                $(btn).attr('value', 'color')
                $(btn).attr('src', '../static/img/color_like.png')
                like_count += 1
                $(content_like).text(String(like_count) + '개')
                
                // 좋아요 누른 user 리스트에 추가할 user 태그들 생성
                const create_div = document.createElement('div');
                const create_a_img = document.createElement('a');
                const create_a_nickname = document.createElement('a');
                const create_img = document.createElement('img');
                // 좋아요 리스트에 추가할 div 태그
                $(create_div).attr({
                    'class': 'like_user_list',
                    'value': data['session_user']['nickname']
                });
                // 이미지를 감쌀 a 테그
                $(create_a_img).attr({
                    'href': '/user/'+data['session_user']['nickname']
                });
                // 닉네임 태그
                $(create_a_nickname).attr({
                    'href': '/user/'+data['session_user']['nickname'],
                    'class': 'like_user_nickname',
                });
                $(create_a_nickname).text(data['session_user']['nickname'])
                // 이미지 테그
                $(create_img).attr({
                    'src': data['session_user']['profile_img'][1],
                    'class': 'content_user_img'
                });
                // 생성한 태그들 구조에 맞게 append
                create_a_img.appendChild(create_img);
                create_div.appendChild(create_a_img);
                create_div.appendChild(create_a_nickname);
                // 좋아요 리스트에 최종적으로 div 태그 append
                like_div.appendChild(create_div);
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});


// comment list btn
let change = false;
$('.content_comment').click(function(){
    if (change) {
        change = false;        
    } else {
        change = true;
    }
    $('.content_comment_container').toggle(function(){
        $(this).className = "content_comment_container none"
        $(this).removeAttr('display')
    });
});

// 댓글 입력란 높이 조절
function auto_height(){
    let textarea = $('.comment_textarea');
    // 높이가 줄어들 경우 height값 초기화
    textarea[0].style.height = 'auto';

    // prop, 스크롤 높이 계산
    let textarea_height = textarea.prop('scrollHeight');
    // 계산한 높이를 textarea의 css style로 지정
    textarea.css('height', textarea_height);
};