// 상단바 프로필 사진 팝업창(프로필, 설정, 로그아웃)
let user_icon = document.getElementsByClassName('.top_bar_user');
let user_popup = document.getElementById('user_popup');
let triangle = document.getElementById('triangle');

$('html').click(function(e){
    //모달 영역 클릭하면 pass
    if(e.target == user_popup){
        return console.log('popup area');
    } //모달 영역 외 클릭
    else if(e.target != user_popup){
        //user icon 클릭하면 모달 show & hide
        if (e.target.className == 'top_bar_user') {
            user_popup.classList.toggle('none');
            triangle.classList.toggle('none');
            console.log('user_icon');
        } else { //user icon 외 클릭
            user_popup.className = 'user_popup none';
            triangle.className = 'triangle none';
            console.log('popup close area');
        };
    };
});
// notice.js 같은 동작

//현재 페이지 navigation 표시
let url = document.location.href.split('/');
console.log(url)

$(function(){
    let top_bar_icon = document.querySelectorAll('.top_bar_icon');
    console.log(top_bar_icon)
    top_bar_icon.forEach(icon => {
        let alt = icon.getAttribute('alt');
        console.log($(icon))
        //index 페이지 일 경우
        if(url[3] == ''){
            console.log("home")
            //home_icon만 가져와서 변경
            if (alt == 'home_icon') {
                $(icon).attr('src', '../static/img/home_fill.png');
                console.log("src", $(icon).attr('src'))
            };
        } //friend 페이지 일 경우
        else if(url[3] == 'friend'){
            //friend_icon만 가져와서 변경
            if(alt == 'friend_icon'){
                $(icon).attr('src', '../static/img/friends_fill.png');
                console.log("src", $(icon).attr('src'))
            };
        }; 
    });
});