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
    // document.querySelector(".content_comment_container").className = "content_comment_container";
});