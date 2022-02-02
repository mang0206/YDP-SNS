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