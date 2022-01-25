// 비밀번호 일치 여부 검사

// 사용자가 키보드를 눌렀다 뗄 때 마다
$('.lock_icon').keyup(function(){
    let pw = $('#join_pw').val();
    let pw2 = $('#join_pw2').val();
    // pw 값과 pw2 값이 같으면 border green 스타일 지정
    if (pw == pw2) {
        console.log('true')        
        $('#join_pw').attr('style', 'outline:none; border: solid 2px green;');
        $('#join_pw2').attr('style', 'outline:none; border: solid 2px green;');

    // pw 값과 pw2 값이 다르면 border red 스타일 지정
    } else {
        console.log('false')
        $('#join_pw').attr('style', 'outline:none; border: solid 2px red;');        
        $('#join_pw2').attr('style', 'outline:none; border: solid 2px red;');        
    }
});