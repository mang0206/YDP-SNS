// user 프로필 사진 및 배경 이미지
// 업로드 할 이미지 미리보기(단일이미지)
$(function() {
    $("#popup_input_file").on('change', function(){
    readURL(this);
    });
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
        $('#img_preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}