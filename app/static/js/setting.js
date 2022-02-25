// 사이드 네비게이션
// 1. '프로필 편집' 버튼
$('#profile_setting_btn').click(function(){
    $('#profile_setting').removeClass('none');
    $('#account_setting').addClass('none');
    $('#profile_setting_btn').addClass('nav_btn_focus');
    $('#account_setting_btn').removeClass('nav_btn_focus');
});

// 2. '계정' 버튼
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

//닉네임 변경 중복 검사
function nickname(){
    let input_nickname = document.getElementsByName('setting_input_ide');
    console.log(input_nickname)

    let nickname = {
        "nickname":input_nickname
    }

    $.ajax({
        type: 'GET',
        url: 'post_setting',
        data: JSON.stringify(nickname),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){

        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    })
};

// change_pw
// 사용자가 입력한 기존 pw를 ajax로 전달
$('#origin_pw_btn').click(function(){
    let origin_pw = $('#origin_pw').val();

    var input_pw = {
        "origin_pw": origin_pw
    }

    $.ajax({
        type: 'POST',
        url: 'change_pw',
        data: JSON.stringify(input_pw),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            if (data['flag'] == 1) {
                // 사용자 입력 허용 disabled false
                $('#change_pw_btn').attr('disabled', false);
                $('.lock_icon').attr('disabled', false);
                // 영역 흐림 해제
                $('#setting_pw_form').removeClass('opacity');
                // 비밀번호 틀림 문구 해제
                $('.wrong_origin_pw').addClass('none');
                $('#origin_pw').removeAttr('style', 'outline:none; border: solid 2px red;');        
                
            } else {
                // 사용자 입력 차단 disabled true
                $('#change_pw_btn').attr('disabled', true);
                $('.lock_icon').attr('disabled', true);
                // 영역 흐림 표시
                $('#setting_pw_form').addClass('opacity');
                // 비밀번호 틀림 문구 표시 및 border:red
                $('.wrong_origin_pw').removeClass('none');
                $('#origin_pw').attr('style', 'outline:none; border: solid 2px red;');        
            }
            
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    })
});

// 비밀번호 변경 유효성 검사
import {password_validation} from './check_password.js';
document.getElementById('pw2').addEventListener('keyup', password_validation);
document.getElementById('pw').addEventListener('keyup', password_validation);

//회원 탈퇴
$("html").click(function(e){
    // console.log(e.target)
    let withdrawal = document.getElementsByClassName("more_icon_popup_back");
    let withdrawal_info = document.getElementsByClassName("withdrawal_info");
    let withdrawal_info2 = document.getElementsByClassName('withdrawal_info2');
    let withdrawal_step = document.getElementsByClassName('withdrawal_step');
    let withdrawal_complete = document.getElementsByClassName('withdrawal_complete');
    
    //탈퇴 버튼
    if (e.target.className == 'withdrawal') {
        withdrawal[0].className = 'more_icon_popup_back';
    } //탈퇴 진행(확인) 버튼
    else if (e.target.id == 'withdrawal_btn') {
        withdrawal_info2[0].style.maxHeight = '0px';
        withdrawal_step[0].style.maxHeight = '250px';
        console.log("withdrawal_btn")
    } //탈퇴 취소 버튼(각 요소 원위치)
    else if (e.target.id == 'withdrawal_cancel_btn') {
        withdrawal[0].className = 'more_icon_popup_back none';
        withdrawal_info[0].style = '';
        withdrawal_info2[0].style = '';
        withdrawal_step[0].style = '';
    } //탈퇴 진행 완료 버튼(로그인 페이지 이동)
    else if (e.target.id == 'withdrawal_submit') {
        withdrawal_info[0].style.maxHeight = '0px';
        withdrawal_step[0].style = '';
        withdrawal_complete[0].style.maxHeight = '100px';
    };

});