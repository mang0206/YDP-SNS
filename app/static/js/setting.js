// 사이드 네비게이션
// 1. '프로필 편집' 버튼
$('#profile_setting_btn').click(function(){
    $('#profile_setting').removeClass('none');
    $('#account_setting').addClass('none');
    $('#profile_setting_btn').addClass('nav_btn_focus');
    $('#account_setting_btn').removeClass('nav_btn_focus');
});

// 2. '계정' 버튼
// click
$('#account_setting_btn').click(function(){
    $('#account_setting').removeClass('none');
    $('#profile_setting').addClass('none');
    $('#account_setting_btn').addClass('nav_btn_focus');
    $('#profile_setting_btn').removeClass('nav_btn_focus');
});


// 프로필 이미지 변경
$(function() {
    $("#profile_image_input").on('change', function(){
    readURL(this, 1);
    });
});
// 배경 이미지 변경
$(function() {
    $("#background_image_input").on('change', function(){
        readURL(this, 2);
    });
});

function readURL(input, n) {
    // $('.profile_img').attr('src', '../static/img/user_profile_gray.png');
    // $('.background_img').attr('src', '../static/img/login_background.png');

    if (input.files && input.files[0]) {
        var reader = new FileReader();
        // 1 -> 프로필 이미지 변경
        if (n == 1) {
            reader.onload = function (e) {
                $('.profile_img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        } else {
        // 2 -> 배경 이미지 변경
            reader.onload = function (e) {
                $('.background_img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
}

// 비밀번호 변경 유효성 검사
import {password_validation} from './check_password.js';
document.getElementById('pw').addEventListener('keyup', password_validation);
document.getElementById('pw2').addEventListener('keyup', password_validation);
