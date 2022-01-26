// email 인증번호가 일치할 경우에만 pw 변경하는 영역 표시



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