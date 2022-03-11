// post에 해당하는 notice의 image를 클릭하면 해당 게시물을 modal 형태로 띄움
// let noticeList = document.querySelector('.notice_list');
let postNotice = document.querySelectorAll('.post_notice');

//post notice가 존재하는 경우
if (postNotice.length != 0) {
    postNotice.forEach(post => {
        // 해당 게시물의 이미지        
        let postNoticeImg = post.querySelector('.post_notice_img');
        console.log(postNoticeImg)

        postNoticeImg.addEventListener('click', function(){
            // console.log(this, "this");
            let noticeModal = $(this).parent().siblings('.notice_modal_background');
            console.log(noticeModal);
            noticeModal[0].style.display = 'block';

        });
    });
};

// console.log($('.notice_modal_background').arrt('value'))

