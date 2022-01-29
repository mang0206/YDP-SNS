// 비밀번호 변경 유효성 검사
// 사용자가 키보드를 눌렀다 뗄 때 마다
export function password_validation(pw, pw2){
    pw = $('#pw').val();
    pw2 = $('#pw2').val();

    // pw 값과 pw2 값이 같고, 길이 8 이상인 경우 
    if (pw == pw2 && pw.length > 7) {
        console.log('true')    
        // style : border green 
        $('#pw').attr('style', 'outline:none; border: solid 2px green;');
        $('#pw2').attr('style', 'outline:none; border: solid 2px green;');
        // 비밀번호 변경 버튼 disabled 해제
        $('#change_pw_btn').attr('disabled', false);
        // 비밀번호 설정 안내 문구 color red 해제
        $('.password_rule').removeAttr('style', 'color:red');

    } else {
        console.log('false')
        $('#pw').attr('style', 'outline:none; border: solid 2px red;');        
        $('#pw2').attr('style', 'outline:none; border: solid 2px red;');        
        $('#change_pw_btn').attr('disabled', true);
        $('.password_rule').attr('style', 'color:red');        
    }
}