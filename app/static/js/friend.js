// 로그인 유저
// const session_user = $('#search').data().name;
// 로그인 유저 친구 목록
// const user_friend_list = $('#search').data().friend_list; 
// 친구 요청을 보낸 유저 목록
// const request_friend_list = $('#search').data().session_request_list;

// test
const request_friend_list = [1];
const request_friend = document.querySelector('.request_friend');
const user_id = "";

// 요청 수락 or 거절 작동 함수
// _btn으로 끝나는 id 요소를 클릭한 경우 
$('[id$=_btn]').click(function(){
    var id = $(this).attr('id');
    // var request_button = document.querySelectorAll('.request_button');
    console.log(id)

    $('.request_button').addClass('none');
    var create_p = document.createElement('p').innerText;
    console.log(create_p)


    if (id == 'accept_btn'){
        // 친구 삭제 버튼 생성
        console.log('accept_btn')
        

    } else {
        // 친구 요청 버튼 생성
        console.log('reject_btn')

    }
    $.ajax({
        type: 'POST',
        url: 'friend_respond',
        data: JSON.stringify(),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            // alert('성공! 데이터 값:' + data.result2['user']+' '+data.result2['id']+" " + data.result2['val'])
            if (id == 'accept_btn') {
                p_txt = '요청이 수락되었습니다.'
            }else {
                p_txt = '요청이 거절됐습니다.'
            }
            create_p.innerText = p_txt;
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});
console.log('test')

