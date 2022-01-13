// id만 전송 받음
const session_user = ""

const search_result_list = [""]

const user_friend_list = [""]

const request_friend_list = ["", ""]

function create_btn(){
    for (let user in search_result_list){
        const create_a = document.createElement('a');

        if (user == session_user){

        } else if (user in user_friend_list){
            const newText = document.createElement('input');
            // input 속성 추가
            $(newText).attr({
                  "type": "button", 
                  "class": "friend_button",
                  "value": "친구 삭제"
                });
            // a 태그 속성 추가
            $(newText).attr({
                "href": "/request_friend/del_friend"
              });
            // a 태그에 input 노드 추가
            create_a.appendChild(newText);
                // id값으로 가져온 위치에 a태그 추가
            return document.getElementById('friend_button_test').appendChild(create_a);
        } else {
            if (user in request_friend_list){
                const newText = document.createElement('input');
                $(newText).attr({
                      "type": "button", 
                      "class": "friend_button",
                      "value": "요청 삭제"
                    });
                $(newText).attr({
                    "href": "/request_friend/del_request"
                  });
                create_a.appendChild(newText);
                
                return document.getElementById('friend_button_test').appendChild(create_a);
            } else {
                const newText = document.createElement('input');
                $(newText).attr({
                      "type": "button", 
                      "class": "friend_button",
                      "value": "친구 요청"
                    });
                $(newText).attr({
                    "href": "/request_friend/add_friend"
                  });
                create_a.appendChild(newText);
                
                return document.getElementById('friend_button_test').appendChild(create_a);
            }
        }
    }
}