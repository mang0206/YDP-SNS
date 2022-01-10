// id만 전송 받음
const search_result_list = [""]

const user_friend_list = [""]

const request_friend_list = ["", ""]

// // 조건에 따른 버튼( <a>, <input> ) 생성
// function create_btn() {
//     // const key = search_result_list
//     for (let key in search_result_list.id){
//         for (let i in key.length) {
//             const create_a = document.createElement('a');
        
//             if (i == user_friend_list.id){
//                 // input 노드 생성
//                const newText = document.createElement('input');
//                 // input 속성 추가
//                 $(newText).attr({
//                       "type": "button", 
//                       "class": "friend_button",
//                       "value": "친구 삭제"
//                     });
//                 // a 태그에 input 노드 추가
//                 create_a.appendChild(newText);
//                     // id값으로 가져온 위치에 a태그 추가
//                 return document.getElementById('friend_button_test').appendChild(create_a);
        
//             } else if (i == request_friend_list.id){
//                 const newText = document.createElement('input');
//                 $(newText).attr({
//                       "type": "button", 
//                       "class": "friend_button",
//                       "value": "요청 삭제"
//                     });
                
//                 create_a.appendChild(newText);
                
//                 return document.getElementById('friend_button_test').appendChild(create_a);
                
//             } else {
//                 const newText = document.createElement('input');
//                 $(newText).attr({
//                       "type": "button", 
//                       "class": "friend_button",
//                       "value": "친구 요청"
//                     });
        
//                 create_a.appendChild(newText);
        
//                 return document.getElementById('friend_button_test').appendChild(create_a);
//             }
//         }
//     }
// }

console.log("test")


// 태그 생성 test
// function createDiv() {
//     // 1. <a> element 만들기
//     const newDiv = document.createElement('a');
//     $(newDiv).attr({
//         "href": ""
//       });
    
//     // 2. <a>에 들어갈 node 만들기
//     const newText = document.createElement('input');
//     $(newText).attr({
//           "type": "button", 
//           "class": "friend_button",
//           "value": "친구 요청"
//         });
    
//     // 3. <a>에 <input> node 붙이기
//     newDiv.appendChild(newText);
    
//     // 4. friend_button_test에 1에서 만든 <a> element 붙이기
//     document.getElementById('friend_button_test').appendChild(newDiv);
//   } 


// function create_btn() {
//     // key = 검색 결과 중 id에 해당하는 값
//     for (let key in search_result_list.id){
//         // 유사 array인 key를 찐 array로 바꿈
//         // key가 가진 요소만큼 함수를 반복
//         Array.from(key).forEach(function(){
//             // console.log(key)
//             for (let i in key) {
//                 const create_a = document.createElement('a');
//                 // console.log(key)
//                 console.log(i)
                
//                 if (i == user_friend_list.id){
//                     // input 노드 생성
//                    const newText = document.createElement('input');
//                     // input 속성 추가
//                     $(newText).attr({
//                           "type": "button", 
//                           "class": "friend_button",
//                           "value": "친구 삭제"
//                         });
//                     // a 태그에 input 노드 추가
//                     create_a.appendChild(newText);
//                         // id값으로 가져온 위치에 a태그 추가
//                     return document.getElementById('friend_button_test').appendChild(create_a);
        
//                 } else if (i == request_friend_list.id){
//                     const newText = document.createElement('input');
//                     $(newText).attr({
//                           "type": "button", 
//                           "class": "friend_button",
//                           "value": "요청 삭제"
//                         });
                
//                     create_a.appendChild(newText);
                
//                     return document.getElementById('friend_button_test').appendChild(create_a);
                
//                 } else {
//                     const newText = document.createElement('input');
//                     $(newText).attr({
//                           "type": "button", 
//                           "class": "friend_button",
//                           "value": "친구 요청"
//                         });
        
//                     create_a.appendChild(newText);
        
//                     return document.getElementById('friend_button_test').appendChild(create_a);
//                 }
//             }
//         });
//     }
// }