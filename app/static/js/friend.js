// 로그인 유저
// const session_user = $('#search').data().name;
// 로그인 유저 친구 목록
// const user_friend_list = $('#search').data().friend_list; 
// 친구 요청을 보낸 유저 목록
// const request_friend_list = $('#search').data().session_request_list;

// test
const request_friend_list = $('#request_button').attr('data-list');
const request_friend = $('.request_button').attr('data-value');
const user_id = "";

console.log(request_friend_list)

// 요청 수락 or 거절 작동 함수
// _btn으로 끝나는 id 요소를 클릭한 경우 
$('[id$=_btn]').click(function(){
    // 클릭한 버튼에 해당하는 div 요소를 가져옴
    var div = $(this).parent()
    // div의 모든 자식 요소(button)
    var div_btn = $(this).parent().children();

    // 요청한 유저의 버튼이 맞는지 확인(및 flask data 전송)
    var btn_data_value = $(this).attr('btn-data-value');
    // console.log(btn_data_value)

    // (ajax)클릭한 버튼의 id 값으로 p태그 문구 변경
    var id = $(this).attr("id")

    // 모든 자식 요소(button)에 none class 추가
    $(div_btn).addClass('none');
    // console.log(div_btn)

    // p 태그 생성
    var create_p = document.createElement('p');
    // p 태그 text 출력 test
    // $(create_p).text('innerText 테스트');
    // div 영역에 p 태그 추가
    $(div).append(create_p);
    
    // console.log(create_p)

    var request_data = {
        "friend": btn_data_value, 
        "respond" : id
    }
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
            if (id == "accept_btn") {
                $(create_p).text('요청이 수락되었습니다.');

            }else {
                $(create_p).text('요청이 거절됐습니다.');

            }
            // $('#request_button').append(create_p);
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});
console.log('test')

