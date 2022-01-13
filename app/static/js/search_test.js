// id만 전송 받음
const session_user = $('#search').data().name;

const search_result_list = $('#search').data().search_user;

const user_friend_list = $('#search').data().friend_list;

const request_friend_list = $('#search').data().session_request_list;

function create_btn(){
    for (let user_l in search_result_list){
        user = search_result_list[user_l]
        console.log(user)
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
            $(create_a).attr("href", '/request_friend');
            // a 태그에 input 노드 추가
            create_a.appendChild(newText);
                // id값으로 가져온 위치에 a태그 추가
            return document.getElementById('friend_button_area').appendChild(create_a);
        } else {
            if (user in request_friend_list){
                const newText = document.createElement('input');
                $(newText).attr({
                      "type": "button", 
                      "class": "friend_button",
                      "value": "요청 삭제"
                    });
                    $(create_a).attr("href", '/request_friend');
                create_a.appendChild(newText);
                
                return document.getElementById('friend_button_area').appendChild(create_a);
            } else {
                const newText = document.createElement('input');
                $(newText).attr({
                    //   "href": "{{url_for('request_friend')}}",
                      "type": "button", 
                      "class": "friend_button",
                      "value": "친구 요청"
                    });
                // $(create_a).attr("href", "{{url_for('request_friend')}}");
                $(create_a).attr("href", '/request_friend');
                create_a.appendChild(newText);
                
                return document.getElementById('friend_button_area').appendChild(create_a);
            }
        }
    }
}

window.onload = create_btn();
