// 게시물 추가 popup창 생성 및 닫기 버튼
function plus(){
    document.querySelector(".plus_background").className = "plus_background show";
    document.querySelector(".body").className = "body hidden";
}
  
function close(){ 
    document.querySelector(".plus_background").className = "plus_background none";
    document.querySelector(".body").className = "body";
}
  
document.querySelector("#close_icon_btn").addEventListener('click', close);
document.querySelector("#plus_icon_btn").addEventListener('click', plus);

// 팝업창 이미지 올리기
var images = [];

// 이미지 선택
function image_select() {
    var image = document.getElementById('popup_input_file').files;
    for (i = 0; i < image.length; i++) {
        if (check_duplicate(image[i].name)) {
            images.push({
                "name" : image[i].name,
                "url" : URL.createObjectURL(image[i]),
                "file" : image[i],
            })
            } else {
                alert(image[i].name + "이미 선택한 파일입니다.");
            }
    }

    // document.getElementById('form').reset();
    document.getElementById('file_container').innerHTML = image_show();
}

// 이미지 미리보기
function image_show() {
    var image = "";
    images.forEach((i) => {
        image += `<div class="file_preview">
                <img src="`+ i.url +`" alt="Image">
                <span onclick="delete_image(`+ images.indexOf(i) +`)">&times;</span>
            </div>`;
    })
    return image;
}

// 이미지 삭제
function delete_image(e) {
    images.splice(e, 1);
    document.getElementById('file_container').innerHTML = image_show();
}

// 이미지 중복 체크
function check_duplicate(name) {
    var image = true;
    if (images.length > 0) {
        for (e = 0; e < images.length; e++) {
            if (images[e].name == name) {
                image = false;
                break;
            }
        }
    }
    return image;
}

//
function get_image_data() {
    var form = new FormData()
    for (let index = 0; index < images.length; index++) {
        form.append("file[" + index + "]", images[index]['file']);
    }
    return form;
}

// console.log("test")


// 파일 업로드 제한

// function readInputFile(e){
//     let sel_files = [];
    
//     sel_files = [];
//     $('#img_preview_area').empty();
    
//     let files = e.target.files;
//     let fileArr = Array.prototype.slice.call(files);
//     let index = 0;
    
//     fileArr.forEach(function(f){
//     	// if(!f.type.match("image/.*")){
//         // 	alert("이미지 확장자만 업로드 가능합니다.");
//         //     return;
//         // };
//         if(files.length < 11){
//         	sel_files.push(f);
//             let reader = new FileReader();
//             reader.onload = function(e){
//             	let html = `<a id=img_id_${index}><img src=${e.target.result} data-file=${f.name} /></a>`;
//                 $('img_preview_area').append(html);
//                 index++;
//             };
//             reader.readAsDataURL(f);
//         }
//     })
//     if(files.length > 11){
//     	alert("최대 10장까지 업로드 할 수 있습니다.");
//     }
// }

// $('#popup_input_file').on('change',readInputFile);


