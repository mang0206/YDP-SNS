//maintain notice dot
$(function(){
    console.log(notice_icon)
    //새로운 알림이 존재하면 notice dot 표시
    
    // $.ajax({
    //     type: 'GET',
    //     url: "/",
    //     data: JSON.stringify(),
    //     dataType: 'JSON',
    //     contentType: "application/json",
    //     success: function(data){
    //         if (notice.length > 0) {
    //             notice_dot.className == 'notice_dot'
    //         }
    //     },
    //     error: function(request, status, error){
    //         alert('ajax 통신 실패')
    //         console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
    //     }
    // });
})


import indicate_time from './time_information.js';
// upload time
$(function(){
    let create_time = document.querySelectorAll('.notice_time');
    //각 게시물 별 업로드 시간
    create_time.forEach(time => {
        indicate_time(time)
        // time.addEventListener('load', indicate_time);
    });
});
//user icon
let user_icon = document.getElementsByClassName('.top_bar_user');
let user_popup = document.getElementById('user_popup');
let user_triangle = document.getElementById('triangle');
// notice icon
let notice_icon = document.getElementsByClassName('notice_icon');
let notice_popup = document.getElementById('notice_container');
let notice_dot = document.getElementById('notice_dot');
let notice_triangle = document.getElementById('notice_triangle');
//상단바 아이콘 팝업창 토글
$('html').click(function(e){
    //user modal area
    if (e.target == user_popup){
        return console.log('user modal');
    } //notice modal area
    else if (e.target == notice_popup) {
        return console.log('notice modal');
    } //not modal area
    else if(e.target != user_popup || e.target != notice_popup){
        //user icon click
        if (e.target.className == 'top_bar_user') {
            //user modal toggle
            user_popup.classList.toggle('none');
            user_triangle.classList.toggle('none');
            //notice hide
            notice_popup.className = 'none notice_popup user_popup';
            notice_triangle.className = 'triangle none';
            //notice icon change
            $(notice_icon[0]).attr('src', '../static/img/notification.png');
            console.log('user_icon');
        } 
        //notice icon click
        else if (e.target.className == 'top_bar_icon notice_icon') {
            //notice modal toggle
            notice_popup.classList.toggle('none');
            notice_triangle.classList.toggle('none');
            //notice icon change
            if (notice_popup.classList.contains('none')) {
                //if notice popup has class 'none', show empty icon
                $(notice_icon[0]).attr('src', '../static/img/notification.png');
            } else {
                $(notice_icon[0]).attr('src', '../static/img/notification_fill.png');
            }
            //notice dot hide
            notice_dot.className = 'notice_dot none';
            //user hide
            user_popup.className = 'user_popup none';
            user_triangle.className = 'triangle none';
            console.log('notice_icon');
        } 
        else { //if not icon clicked, hide to all modal
            user_popup.className = 'user_popup none';
            user_triangle.className = 'triangle none';
            notice_popup.className = 'none notice_popup user_popup';
            notice_triangle.className = 'triangle none';
            $(notice_icon[0]).attr('src', '../static/img/notification.png');
            console.log('close area');
        };
    };
});


//현재 페이지 navigation 표시
let url = document.location.href.split('/');

$(function(){
    let top_bar_icon = document.querySelectorAll('.top_bar_icon');
    top_bar_icon.forEach(icon => {
        let alt = icon.getAttribute('alt');
        //index 페이지 일 경우
        if(url[3] == ''){
            //home_icon만 가져와서 변경
            if (alt == 'home_icon') {
                $(icon).attr('src', '../static/img/home_fill.png');
                console.log("home")
            };
        } //friend 페이지 일 경우
        else if(url[3] == 'friend'){
            //friend_icon만 가져와서 변경
            if(alt == 'friend_icon'){
                $(icon).attr('src', '../static/img/friends_fill.png');
                console.log("friend")
            };
        }; 
    });
});
let session_nickname = $('#notice_container').attr('session_nickname')
console.log(session_nickname)
socket.on('like_notice', function(retMessage) {
    if(retMessage['notice_user'] == session_nickname){
        console.log(retMessage)
    }
});

socket.on('comment_notice', function(retMessage) {
    if(retMessage['notice_user'] == session_nickname){
        console.log(retMessage)
    }
});

socket.on('mention_notice', function(retMessage) {
    if(retMessage['notice_user'] == session_nickname){
        console.log(retMessage)
    }
});
