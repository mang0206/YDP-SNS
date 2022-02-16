
// 이미지 슬라이드
let img_index = 0; //이미지의 index 번호
let img_width = 401; // 이미지 너비

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
        //해당 게시물의 총 이미지 개수
        let total_img_num = $(img_album).children().attr('value');
        // console.log("게시물 이미지 개수",total_img_num)

        let img_index = 0; // 이미지 index
        let translate = 0; //이미지 이동 거리(x축)
        let present_img = 1; //현재 보이는 이미지의 순서

        //현재 게시물의 버튼
        let arrow_btn = $(img_album).siblings(".img_arrow_btn"); 
        console.log(typeof(arrow_btn))
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
