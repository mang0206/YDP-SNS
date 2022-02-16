// 동일한 content 구조가 들어가는 page에 export

// session user 더보기 btn
$(function(){
    let more_icon = document.querySelectorAll(".more_icon");
    more_icon.forEach(more => {
        $(more).click(function(index){
            console.log("length",more_icon.length)
            console.log("index",index)
            $(more).next().removeClass('none');
            document.querySelector(".body").className = "body scroll_hidden";    
        });
    });
    let more_icon_cancel = document.querySelectorAll(".more_icon_cancel");
    more_icon_cancel.forEach(cancel => {
        $(cancel).click(function(){
            $(cancel).parent().parent().addClass('none');
            document.querySelector(".body").className = "body";    
        });
    });
});

// 이미지 슬라이드
//1.페이지 처음 로드 시 이미지의 개수에 따라 화살표 버튼 및 이미지 번호 표시를 구분 함
$(function(){   
    let total_img = document.querySelectorAll('.img_number');
    // let total_img_val = total_img.val();
    // console.log(typeof(total_img_val))

    // 페이지에서 불러들인 모든 img_number P 태그를 돌며
    total_img.forEach(img_num => {
        //해당 P 태그의 value 속성
        let total_img_val = $(img_num).attr('value');
        //해당 P 태그의 양쪽 화살표 버튼
        let img_arrow_btn = $(img_num).parent().siblings('.content_image_viewer').children().children('.img_arrow_btn');
        
        //업로드한 이미지가 한 장이거나 없을 경우 화살표 & img_num 표시 X
        if (total_img_val == "1" || total_img_val == "0") {
            $(img_arrow_btn).css({"display":"none"});
            $(img_num).css({"display":"none"});
        };
        
    });
    //페이지 처음 로드 시, 모든 게시물의 왼쪽 버튼 비활성화
    $('.left_arrow').css({"display":"none"});
});

//2.여러 이미지의 transform 및 현재 이미지 번호 표시
$(function(){
    //모든 이미지 앨범을 가져옴
    let img_albums = document.querySelectorAll('.img_album');
    //각 이미지 앨범마다 다른 변수를 지정
    img_albums.forEach(img_album => {
        // console.log(typeof(img_album), img_album)
        //해당 게시물의 총 이미지 개수
        let total_img_num = $(img_album).children().attr('value');
        // console.log("게시물 이미지 개수",total_img_num)

        let img_index = 0; // 이미지 index
        let translate = 0; //이미지 이동 거리(x축)
        let present_img = 1; //현재 보이는 이미지의 순서

        //현재 게시물의 버튼
        let arrow_btn = $(img_album).siblings(".img_arrow_btn"); 
        //현재 게시물의 p태그
        let p_tag = $(img_album).parent().parent().siblings(".content_footer").children('.img_number');
        
        $(arrow_btn).click(function(){
            //해당 게시물에서 누른 버튼이 right인 경우
            if ($(this).attr("class") == "img_arrow_btn right_arrow") {
                console.log("right")
                img_index += 1;
                present_img += 1;
                console.log("총 이미지",total_img_num)
                console.log("현재 이미지",present_img)

                //해당 게시물의 총 이미지 개수보다 index 번호가 작으면
                if (img_index < total_img_num) {
                    //해당 게시물 왼쪽 화살표 display 되돌림
                    $(img_album).siblings('.left_arrow').css({"display":""});
                    //앨범 x축 이동 거리(-) 추가 & 이동
                    translate -= 401;
                    $(img_album).css({
                        "transform":`translateX(${translate}px)`
                    });
                    //현재 이미지 번호 +1 & text 변경
                    p_tag.text(present_img +` / `+ p_tag.attr('value'));

                }
    
            };
            //해당 게시물에서 누른 버튼이 left인 경우
            if ($(this).attr("class") == "img_arrow_btn left_arrow") {
                console.log("left")
                img_index -= 1;
                present_img -= 1;
                console.log("총 이미지",total_img_num)
                console.log("현재 이미지",present_img)

                //해당 게시물의 총 이미지 개수보다 index 번호가 작으면
                if (img_index < total_img_num) {
                    //해당 게시물 오른쪽 화살표 display 되돌림
                    $(img_album).siblings('.right_arrow').css({"display":""});
                    //앨범 x축 이동 거리(+) 추가 & 이동
                    translate += 401;
                    $(img_album).css({
                        "transform":`translateX(${translate}px)`
                    });
                    //현재 이미지 번호 -1 & text 변경
                    p_tag.text(present_img +` / `+ p_tag.attr('value'));

                }
    
            };
            //image의 양 끝에 도달한 경우 버튼 display:none 설정
            //img_album의 transition이 끝났을 때
            $(img_album).on("transitionend", function(){
                //index 번호와 총 이미지 개수가 같다면
                if (img_index == (total_img_num -1)) {
                    console.log(img_index, total_img_num, "right end")
                    //해당 게시물 right 버튼 비활성화 & 현재 이미지 번호와 index 번호 일치
                    $(img_album).siblings('.right_arrow').css({"display":"none"});
                    p_tag.text(p_tag.attr('value') +` / `+ p_tag.attr('value'));
                }
                //index 번호가 0이면
                if (img_index == 0) {
                    console.log(img_index, total_img_num, "left end")
                    //해당 게시물 left 버튼 비활성화 & 처음 이미지 번호 표시
                    $(img_album).siblings('.left_arrow').css({"display":"none"});
                    p_tag.text(`1 / `+ p_tag.attr('value'));
                }
            });
        });

    });
});

// like list btn
$('.content_like').click(function(){
    let like_contaiber = $(this).parent().children('.like_container_back');
    // document.querySelector(".like_container_back").className = "like_container_back";
    // $(like_contaiber).addClass('like_container_back')
    $(like_contaiber).removeClass('none')
    document.querySelector(".body").className = "body scroll_hidden";
});

$('.like_close').click(function(){
    let like_contaiber = $(this).parent().parent().parent()
    // let like_contaiber = $(this).parent().children('.like_container_back');
    // document.querySelector(".like_container_back").className = "like_container_back none";
    $(like_contaiber).addClass('none')
    document.querySelector(".body").className = "body";
});

$('[id$=_delete_btn]').click(function(){
    let post_id = $(this).attr('value');
    close_div = $(this).parent().parent().parent().parent().parent();
    console.log(close_div)
    $.ajax({
        type: 'DELETE',
        url: "/content_submit",
        data: JSON.stringify(post_id),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            // $(close_div).addClass('none')
            $(close_div).css("display" ,"none");
            document.querySelector(".body").className = "body";
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});

//like btn ajax
$('[id$=_icon]').click(function(){
    let btn_value = $(this).attr('value');
    let post_id = $(this).attr('post_id');
    let btn = $(this)
    var request_data = {
        "flag": btn_value,
        "post_id": post_id
    }
    // 해당 post의 좋아요 버튼
    let content_like = $(btn).parent().children('.content_like')
    // 해당 post의 좋아요 누른 user 수
    let like_count = Number($(content_like).text().slice(0,1))
    // 클릭한 버튼의 해당 post의 like_container_back를 찾기 위해 parent 및 children을 사용
    let like_div = $(btn).parent().children('.like_container_back').children().children('.like_user_list_container')[0]

    $.ajax({
        type: 'POST',
        url: "/content_like_submit",
        data: JSON.stringify(request_data),
        dataType: 'JSON',
        contentType: "application/json",
        success: function(data){
            // session user가 이미 좋아요를 누른 상태
            if (btn_value == "empty") {
                $(btn).attr('value', 'color')
                $(btn).attr('src', '../static/img/empty_like.png')
                like_count -= 1
                $(content_like).text(String(like_count) + '개')

                let chiled = $(like_div).children()
                //해당 div의 모든 자식 요소를 돌며
                for (let i = 0; i < chiled.length; i++) {
                    console.log($(chiled[i]).attr('value'))
                    //입력한 값과 일치하는 속성 값을 가진 자식요소를 찾고
                    if ($(chiled[i]).attr('value') == data['session_user']['nickname']) {
                        // 해당 요소를 지움
                        $(chiled[i]).remove();
                    }
                }
            // session user가 좋아요를 누르지 않은 상태
            }else{ 
                $(btn).attr('value', 'empty')
                $(btn).attr('src', '../static/img/color_like.png')
                like_count += 1
                $(content_like).text(String(like_count) + '개')
                
                // 좋아요 누른 user 리스트에 추가할 user 태그들 생성
                const create_div = document.createElement('div');
                const create_a_img = document.createElement('a');
                const create_a_nickname = document.createElement('a');
                const create_img = document.createElement('img');
                // 좋아요 리스트에 추가할 div 태그
                $(create_div).attr({
                    'class': 'like_user_list',
                    'value': data['session_user']['nickname']
                });
                // 이미지를 감쌀 a 테그
                $(create_a_img).attr({
                    'href': '/user/'+data['session_user']['nickname']
                });
                // 닉네임 태그
                $(create_a_nickname).attr({
                    'href': '/user/'+data['session_user']['nickname'],
                    'class': 'like_user_nickname',
                });
                $(create_a_nickname).text(data['session_user']['nickname'])
                // 이미지 테그
                $(create_img).attr({
                    'src': data['session_user']['profile_img'][1],
                    'class': 'content_user_img'
                });
                // 생성한 태그들 구조에 맞게 append
                create_a_img.appendChild(create_img);
                create_div.appendChild(create_a_img);
                create_div.appendChild(create_a_nickname);
                // 좋아요 리스트에 최종적으로 div 태그 append
                like_div.appendChild(create_div);
            }
        },
        error: function(request, status, error){
            alert('ajax 통신 실패')
            alert(error);
        }
    })
});


// comment list btn
$(function(){
    //모든 댓글 영역
    let comment_area = document.querySelectorAll(".content_comment_container");
    //각 게시물의 댓글 영역
    comment_area.forEach(comment => {
        //각 게시물의 댓글 버튼
        let comment_btn = $(comment).siblings(".content_footer").children(".comment").children();
        //toggle 상태
        let change = false;
        //해당 게시물의 comment_btn 클릭 시
        $(comment_btn).click(function(){
            if (change) {
                change = false; 
                console.log("false")       
            } else {
                change = true;
                console.log("true")       
            };
            //댓글 영역에 toggle 효과를 줌
            $(comment).toggle(function(){
                $(comment).attr("class","content_comment_container none");
                $(comment).removeAttr('display');
            });
        })

        // 해당 게시글의 댓글 입력란 높이 조절
        let comment_textarea = $(comment).children(".comment_form").children(".comment_textarea");
        //댓글 입력란에서 keyup이 일어날 때 마다 실행
        $(comment_textarea).on('keyup',function(){
            console.log("typing")
            // 높이가 줄어들 경우 height값 초기화
            $(comment_textarea)[0].style.height = 'auto';
        
            // prop, 스크롤 높이 계산
            let textarea_height = $(comment_textarea).prop('scrollHeight');
            // 계산한 높이를 textarea의 css style로 지정
            $(comment_textarea).css('height', textarea_height);
        });
    });
});