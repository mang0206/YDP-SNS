// 세션에 로그인 된 사용자만 프로필 편집 버튼 활성화



// user 프로필 사진 및 배경 이미지
// 업로드 할 이미지 미리보기(단일이미지)
// $(function() {
//     $("#profile_image_input").on('change', function(){
//     readURL(this);
//     });
// });
// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//         $('.profile_image').attr('src', e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }