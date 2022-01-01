// 게시물 추가 버튼 popup
function plus(){
    document.querySelector(".plus_background").className = "plus_background show";
}
  
function close(){ 
    document.querySelector(".plus_background").className = "plus_background";
}
  
document.querySelector("#close_icon_btn").addEventListener('click', close);
document.querySelector("#plus_icon_btn").addEventListener('click', plus);

// console.log("test")