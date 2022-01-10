const search_result_list = [
    {id: 1},
    {id: 2},
    {id: 3}
]
const user_friend_list = [
    {id: 1}
]
const request_friend_list = [
    {id: 2}
]

// 조건에 따른 버튼( <a>, <input> ) 생성
function create_btn() {
    const create_a = document.createElement('a');
    $(create_a).attr({
        'href': 'request_friend'
    })
    for (i in search_result_list){
        if (i.id === user_friend_list.id){
            // input 노드 생성
            const newText = document.createElement('input');
            // input 속성 추가
            $(newText).attr({
                  "type": "button", 
                  "class": "friend_button",
                  "value": "친구 삭제"
                });
            // a 태그에 input 노드 추가
            create_a.appendChild(newText);
                // id값으로 가져온 위치에 a태그 추가
            return document.getElementById('friend_button_test').appendChild(create_a);

        } else if (i.id === request_friend_list.id){
            const newText = document.createElement('input');
            $(newText).attr({
                  "type": "button", 
                  "class": "friend_button",
                  "value": "요청 삭제"
                });

            create_a.appendChild(newText);

            return document.getElementById('friend_button_test').appendChild(create_a);

        } else ()=>{
            const newText = document.createElement('input');
            $(newText).attr({
                  "type": "button", 
                  "class": "friend_button",
                  "value": "친구 요청"
                });

            create_a.appendChild(newText);

            return document.getElementById('friend_button_test').appendChild(create_a);

        }
    }
}

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