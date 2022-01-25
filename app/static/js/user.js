// 세션에 로그인 된 사용자의 user 페이지가 아닐 경우,
// 친구 추가, 요청 삭제, 친구 삭제 버튼 활성화
function create_btn(){
    // const session_user = $('#search').data().name;
    var request_btn = document.querySelector('.request_btn')
    var setting_btn = document.querySelector('.setting_btn')
    console.log(request_btn.value)

    // 세션 로그인 유저일 경우 setting 아이콘 표시

    if (request_btn.value == 'friend'){
        $(request_btn).attr('id', 'delete_btn');
    } else if($(request_btn).attr('friend_list').includes($(request_btn).attr('user'))){
        $(request_btn).attr('id', 'reject_btn');
        $(request_btn).text('요청 삭제');
    } else {
        $(request_btn).attr('id', 'accept_btn');
        $(request_btn).text('친구 요청');
    }
}

window.onload = create_btn();
user = $('.request_btn').data().name;

$('[id$=_btn]').click(function(){
    var btn_value = $(this).attr('user');
    var txt = $(this).text();

    var request_data = {
        "user": user,
        "id": btn_value, 
        "val" : txt
    }
    $.ajax({
        type: 'POST',
        url: "/request_friend",
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            if (txt == "친구 요청") {
                $(".request_btn").attr('id', 'reject_btn')
                $(".request_btn").text('요청 취소');

                // '요청 취소' button
            } else if (txt == "요청 취소") {
                $(".request_btn").attr('id', 'accept_btn')
                $(".request_btn").text('친구 요청');

            }else{ // '친구 삭제' button
                $(".request_btn").attr('id', 'accept_btn')
                $(".request_btn").text('친구 추가');
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});