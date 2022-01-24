// 상단바 프로필 사진 팝업창(프로필, 설정, 로그아웃)
$('.top_bar_user').click(function(){
    
    $('#user_popup').toggleClass('none');
    $('.triangle').toggleClass('none');

}); // notice.js 같은 동작