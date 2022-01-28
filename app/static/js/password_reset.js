// 인증번호 발송
// send_email
$('#send_email_btn').click(function(){
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
            sessionStorage.setItem('send_email', data);
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
    // 사용자가 입력한 6자리
    const input_num = $('#input_num').val();
    console.log(input_num)
    sessionStorage.setItem('input_num', input_num);

    // 메일로 발송한 인증번호
    // const ran_num = sessionStorage.getItem('certification_num');
    // const ran_num = $('#input_num_submit').attr('num-data');
    // console.log(ran_num)
    let ran_num = '010101'


    let certification_status = $('.certification_status');

    let flag = '';

    let flag_data = {
        "input_num": input_num,
        "ran_num": ran_num,
        "flag": flag,
        "certification_status": certification_status
    }

    $.ajax({
        type: 'POST',
        url: 'password_reset',
        data: JSON.stringify(flag_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            if (input_num == ran_num) {
                flag += "True";
                certification_status.attr('src','../static/img/protection_color.png');

            } else {
                flag += "False";
                certification_status.attr('src','../static/img/unprotected_color.png');
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




// 비밀번호 일치 여부 검사

// 사용자가 키보드를 눌렀다 뗄 때 마다
$('.lock_icon').keyup(function(){
    let pw = $('#reset_pw').val();
    let pw2 = $('#reset_pw2').val();
    // pw 값과 pw2 값이 같으면 border green 스타일 지정
    if (pw == pw2) {
        console.log('true')        
        $('#reset_pw').attr('style', 'outline:none; border: solid 2px green;');
        $('#reset_pw2').attr('style', 'outline:none; border: solid 2px green;');

    // pw 값과 pw2 값이 다르면 border red 스타일 지정
    } else {
        console.log('false')
        $('#reset_pw').attr('style', 'outline:none; border: solid 2px red;');        
        $('#reset_pw2').attr('style', 'outline:none; border: solid 2px red;');        
    }
});