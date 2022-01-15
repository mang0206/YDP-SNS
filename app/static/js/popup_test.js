// object형 데이터 null 확인
// function isEmpty(obj){
//     if (obj === Object && Object.keys(obj).length === 0){
//         return true;
//     } else {
//         return false;
//     }
// }

// 게시물 추가 popup창 
function plus(){
    document.querySelector(".plus_background").className = "plus_background show";
    document.querySelector(".body").className = "body hidden";
}


// 게시물 작성 취소 버튼 및 경고창
function close(){ 
    // textarea의 value를 가져옴
    let text_value = document.getElementById('popup_textarea').value;

    // text value의 length가 0이고, img 미리보기 영역의 value가 file이 아니면 팝업창 닫힘
    if (text_value.length == 0 && img_value != "file") {  // img_value : line 72
        document.querySelector(".plus_background").className = "plus_background none";
        document.querySelector(".body").className = "body";

    // 게시물 작성 취소 경고창
    } else {
        if(confirm("작성하신 내용이 사라집니다.") == true){
            document.querySelector(".plus_background").className = "plus_background none";
            document.querySelector(".body").className = "body";

            // 이미지 영역 초기화
            images.splice(0);
            document.getElementById('file_container').innerHTML = image_show();

            // textarea 초기화
            document.getElementById('popup_textarea').value = '';
            img_value = {}

        } else {
            return false;
        }
    }
}

// 팝업창 이미지 올리기
var images = []; 
// 이미지 미리보기가 생성되는 div의 value
var img_value = {};

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
    document.getElementById('file_container').innerHTML = image_show();

    // img를 선택하면 생성되는 div의 value를 할당
    img_value = document.getElementById('file_preview').getAttribute('value');
}
    

// 이미지 미리보기
function image_show() {
    var image = "";
    images.forEach((i) => {
        image += `<div class="file_preview" id="file_preview" value="file">
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

// image 데이터 전송?
// function get_image_data() {
//     var form = new FormData()
//     for (let index = 0; index < images.length; index++) {
//         form.append("file[" + index + "]", images[index]['file']);
//     }
//     return form;
// }



document.querySelector("#close_icon_btn").addEventListener('click', close);
document.querySelector("#plus_icon_btn").addEventListener('click', plus);


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


