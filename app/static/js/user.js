// 세션에 로그인 된 사용자의 user 페이지가 아닐 경우,
// 친구 추가, 요청 삭제, 친구 삭제 버튼 활성화

$('[id$=_btn]').click(function(){
    var btn_value = $(this).value;
    console.log(btn_value)
    var div = $(this).parent();
    // var div_btn = $(this).parent().children();

    var btn_data_value = $(this).attr('btn-data-value');
    var txt = $(this).text();

    // $(div_btn).addClass('none');
    // var create_p = document.createElement('p');
    // $(create_p).addClass('request_btn_p');
    // $(div).append(create_p);

    var request_data = {
        "friend": btn_data_value, 
        "respond" : txt
    }
    $.ajax({
        type: 'POST',
        url: '',
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            console.log(id, typeof(id), data)
            // alert('성공! 데이터 값:')
            // id 값에 따른 p태그 innerText 변경
            // '친구 요청' button
            if (txt == "친구 요청") {
                $(this).text('요청 취소');

                // '요청 취소' button
            } else if (txt == "요청 취소") {
                $(this).text('친구 추가');

            }else{ // '친구 삭제' button
                $(this).text('친구 추가');
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});