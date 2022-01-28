
let login = window.sessionStorage.getItem('login')
console.log(login)
// // 이미지 중복 체크
// function check_duplicate(name) {
//     var image = true;
//     if (images.length > 0) {
//         for (e = 0; e < images.length; e++) {
//             if (images[e].name == name) {
//                 image = false;
//                 break;
//             }
//         }
//     }
//     return image;
// }

// //
// function get_image_data() {
//     var form = new FormData()
//     for (let index = 0; index < images.length; index++) {
//         form.append("file[" + index + "]", images[index]['file']);
//     }
//     return form;
// }