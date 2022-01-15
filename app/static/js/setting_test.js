// 프로필 이미지 변경
$(function() {
    $("#profile_image").on('change', function(){
    readURL(this);
    });
});
// 배경 이미지 변경
$(function() {
    $("#background_image").on('change', function(){
        readURL(this);
    });
});

var profile_image = document.getElementById('profile_image_input');
var background_image = document.getElementById('background_image_input');

function readURL(input) {
    console.log(typeof(input.id))
    // console.log(document.getElementById('background_image_input').getAttribute('id'))
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        const newText = document.createElement('img');
        reader.onload = function (e) {
            $(newText).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
        input.appendChild(newText);
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
