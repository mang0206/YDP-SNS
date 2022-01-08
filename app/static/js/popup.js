// 게시물 추가 popup창 생성 및 닫기 버튼
function plus(){
    document.querySelector(".plus_background").className = "plus_background show";
}
  
function close(){ 
    document.querySelector(".plus_background").className = "plus_background";
}
  
document.querySelector("#close_icon_btn").addEventListener('click', close);
document.querySelector("#plus_icon_btn").addEventListener('click', plus);

// 팝업창 게시글 데이터 전송


// 업로드 할 이미지 미리보기 1
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

// 업로드 할 이미지 미리보기(단일이미지)
// $(function() {
//     $("#popup_input_file").on('change', function(){
//     readURL(this);
//     });
// });
// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//         $('#img_preview').attr('src', e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }

// 업로드 할 이미지 미리보기(여러이미지)
// function readMultipleImage(input) {

//     const multipleContainer = document.getElementById("img_preview_area")
    
//     // 인풋 태그에 파일들이 있는 경우
//     if(input.files) {
//         // 이미지 파일 검사 (생략)

//         console.log(input.files)

//         // 유사배열을 배열로 변환 (forEach문으로 처리하기 위해)
//         const fileArr = Array.from(input.files)

//         const $colDiv1 = document.createElement("div")
//         const $colDiv2 = document.createElement("div")
//         $colDiv1.classList.add("column")
//         $colDiv2.classList.add("column")

//         fileArr.forEach((file, index) => {
//             const reader = new FileReader()

//             const $imgDiv = document.createElement("div")   
//             const $img = document.createElement("img")
//             $img.classList.add("image")

//             const $label = document.createElement("label")
//             $label.classList.add("image-label")
//             $label.textContent = file.name

//             $imgDiv.appendChild($img)
//             $imgDiv.appendChild($label)

//             reader.onload = e => {
//                 $img.src = e.target.result
                
//                 $imgDiv.style.width = ($img.naturalWidth) * 0.2 + "px"
//                 $imgDiv.style.height = ($img.naturalHeight) * 0.2 + "px"
//             }
            
//             console.log(file.name)
//             if(index % 2 == 0) {
//                 $colDiv1.appendChild($imgDiv)
//             } else {
//                 $colDiv2.appendChild($imgDiv)
//             }
            
//             reader.readAsDataURL(file)
//         })

//         multipleContainer.appendChild($colDiv1)
//         multipleContainer.appendChild($colDiv2)

//     }
// }

// const inputMultipleImage = document.getElementById("popup_input_file")
// inputMultipleImage.addEventListener("change", e => {
//     readMultipleImage(e.target)
// })

// console.log("test")
