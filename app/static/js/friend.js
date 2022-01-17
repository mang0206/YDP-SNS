// 로그인 유저
// const session_user = $('#search').data().name;
// 로그인 유저 친구 목록
// const user_friend_list = $('#search').data().friend_list; 
// 친구 요청을 보낸 유저 목록
// const request_friend_list = $('#search').data().session_request_list;

// test
const request_friend_list = [];
const empty_request = document.querySelector('.request_friend');
const request_friend = document.querySelector('.empty_request_friend');

// 친구 요청에 따른 div 영역 display 설정
document.addEventListener('DOMContentLoaded', function request_status(){
    console.log('test')
    if (request_friend_list.length == 0) {
        empty_request.style.display = 'none';
        // console.log('else')
        
        // empty_request.classList.add('none');
        // console.log('if')
    // } else {
        
        // request_friend.classList.add('none');
    }
});