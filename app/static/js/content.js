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
    document.querySelector(".like_container_back").className = "like_container_back";
    document.querySelector(".body").className = "body scroll_hidden";
});

$('.like_close').click(function(){
    document.querySelector(".like_container_back").className = "like_container_back none";
    document.querySelector(".body").className = "body";
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