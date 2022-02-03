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