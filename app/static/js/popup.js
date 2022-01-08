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


