// 인증번호 발송
// send_email
$('#send_email_btn').click(function(){
    console.log('send email ajax')
    let send_email = $('#send_email').val();
    console.log(send_email)

    let input_email = {
        'send_email' : send_email
    };

    $.ajax({
        type: 'POST',
        url: 'send_email',
        data: JSON.stringify(input_email),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data) {
            console.log(data['ran_num'])
            // 메일로 발송한 인증번호 flask->js->html
            $('#input_num_submit').attr('num-data', data['ran_num'])
            count_down();
            alert('인증번호 발송')
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    })
});

// 인증번호 일치 여부
// password_reset
$('#input_num_submit').click(function(){
    console.log('button ajax')
    // 사용자가 입력한 6자리 session 전달
    const input_num = $('#input_num').val();
    sessionStorage.setItem('input_num', input_num);
    // 발급된 인증번호
    const ran_num = $('#input_num_submit').attr('num-data');

    // 인증번호 일치여부
    let certification_img = $('.certification_img');
    let certification_text = $('#certification_text');

    // 인증번호 일치 시 비밀번호 변경하는 영역 표시
    let password_reset = $('#password_reset');
    // 인증번호 일치 시 인증번호 입력란 가림
    let email_send_container = $('#email_send_container');

    let flag_data = {
        "input_num": input_num,
        "ran_num": ran_num,
        // "password_reset": password_reset
    }
    console.log(input_num, certification_img, certification_text, password_reset, email_send_container)
    $.ajax({
        type: 'POST',
        url: 'password_reset',
        data: JSON.stringify(flag_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            if (input_num == ran_num) {
                // 번호 일치시 img 변경
                certification_img.attr('src','../static/img/protection_color.png');
                // 번호 일치시 text 및 style 변경
                certification_text.text('인증에 성공하였습니다.');
                certification_text.attr('style','color:green');
                // 번호 일치시 pw 변경 영역 표시
                password_reset.removeClass('none');
                password_reset.css({
                    "transition" : "all .5s"
                });

                // 번호 일치시 email 입력 영역 가림
                email_send_container.addClass('none');

            } else {
                // 번호 불일치 시
                certification_img.attr('src','../static/img/unprotected_color.png');
                certification_text.text('인증에 실패하였습니다.');
                certification_text.attr('style','color:red');
                password_reset.addClass('none');
                email_send_container.removeClass('none');
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            // alert(error);
        }
    })
});


// 인증 유효시간 count-down
function paddedFormat(num) {
    return num < 10 ? "0" + num : num; 
}

function startCountDown(duration, element) {
    let secondsRemaining = duration;
    let min = 0;
    let sec = 0;

    let countInterval = setInterval(function () {

        min = parseInt(secondsRemaining / 60);
        sec = parseInt(secondsRemaining % 60);

        element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

        secondsRemaining = secondsRemaining - 1;
        if (secondsRemaining < 0) { clearInterval(countInterval) };

    }, 1000);
}

function count_down() {
    let time_minutes = 3; // Value in minutes
    let time_seconds = 0; // Value in seconds

    let duration = time_minutes * 60 + time_seconds;

    element = document.querySelector('#count_down');
    element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;

    startCountDown(--duration, element);
};

// 비밀번호 변경 유효성 검사
import { password_validation } from './check_password';
document.getElementById('pw').addEventListener('keyup', password_validation);
document.getElementById('pw2').addEventListener('keyup', password_validation);
