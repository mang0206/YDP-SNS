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
    // request_button에 none class 추가
    $('.request_button').addClass('none');
    // p 태그 생성
    var create_p = document.createElement('p');
    // p 태그 text 변경
    $(create_p).text('innerText 테스트');
    // div 영역에 p 태그 추가
    $('#request_button').append(create_p);

    console.log(create_p)

    var request_data = {
        "id": id, 
    }
    console.log(id, request_data)
    $.ajax({
        type: 'POST',
        url: 'friend_respond',
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            console.log(id, typeof(id), data)
            // alert('성공! 데이터 값:')
            // id 값에 따른 p태그 innerText 변경
            if (id == 'accept_btn') {
                // create_p.innerText('요청이 수락되었습니다.');
                $(create_p).text('요청이 수락되었습니다.');

            }else {
                // create_p.innerText('요청이 거절됐습니다.');
                $(create_p).text('요청이 거절됐습니다.');

            }
            $('#request_button').append(create_p);
            // document.getElementById('request_button').appendChild(create_p);
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});
console.log('test')

