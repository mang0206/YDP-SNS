// 게시물 추가 popup창 생성 및 닫기 버튼
function plus(){
    document.querySelector(".plus_background").className = "plus_background show";
}
  
function close(){ 
    document.querySelector(".plus_background").className = "plus_background";
}
  
document.querySelector("#close_icon_btn").addEventListener('click', close);
document.querySelector("#plus_icon_btn").addEventListener('click', plus);

// console.log("test")

// 업로드 할 이미지 미리보기
function readInputFile(e){
    var sel_files = [];
    
    sel_files = [];
    $('#img_preview_area').empty();
    
    var files = e.target.files;
    var fileArr = Array.prototype.slice.call(files);
    var index = 0;
    
    fileArr.forEach(function(f){
    	// if(!f.type.match("image/.*")){
        // 	alert("이미지 확장자만 업로드 가능합니다.");
        //     return;
        // };
        if(files.length < 11){
        	sel_files.push(f);
            var reader = new FileReader();
            reader.onload = function(e){
            	var html = `<a id=img_id_${index}><img src=${e.target.result} data-file=${f.name} /></a>`;
                $('img_preview_area').append(html);
                index++;
            };
            reader.readAsDataURL(f);
        }
    })
    if(files.length > 11){
    	alert("최대 10장까지 업로드 할 수 있습니다.");
    }
}

$('#popup_input_file').on('change',readInputFile);