// 사이드 네비게이션 버튼
// 1. '프로필 편집' 버튼을 누른 경우
$('#profile_setting_btn').click(function(){
    $('#profile_setting').removeClass('none');
    $('#account_setting').addClass('none');
});
// 2. '계정' 버튼을 누른 경우
$('#account_setting_btn').click(function(){
    $('#account_setting').removeClass('none');
    $('#profile_setting').addClass('none');

});

// 기존 프로필 이미지 미리보기
// -- 구현하기 --


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


// var profile_image = [];

// function change_image(){
//     image = document.getElementById('profile_image_input').files;
//     profile_image.push({
//         "name" : image.name,
//         "url" : URL.createObjectURL(image[0]),
//         "file" : image[0]
//     })
//     console.log(profile_image)
//     document.getElementById('profile_image').innerHTML = image_preview();
// }
// console.log(profile_image)

// function image_preview(){
//     console.log("image")
//     var image = "";
//     profile_image((i) => {
//      image += `<div class="file_preview" id="file_preview">
//      <img src="`+ i.url +`" alt="Image">
//      </div>`;
//     })
//     return image;
// }
