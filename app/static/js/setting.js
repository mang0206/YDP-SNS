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
                $('.profile_image_input').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        } else {
        // 2 -> 배경 이미지 변경
            reader.onload = function (e) {
                $('.background_image_input').attr('src', e.target.result);
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
