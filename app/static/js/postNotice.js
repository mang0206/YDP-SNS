// post에 해당하는 notice의 image를 클릭하면 해당 게시물을 modal 형태로 띄움
let noticeList = document.querySelector('.notice_list');
let postNotice = document.querySelectorAll('.post_notice');
// console.log(postNotice)

if (postNotice.length != 0) {
    postNotice.forEach(post => {
        // console.log(post);
        
        let postNoticeImg = $(post).children('.img').children();
        // console.log(postNoticeImg)
        let noticeImg = postNoticeImg[0];
        // console.log(noticeImg)

        noticeImg.addEventListener('click', function(){
            // console.log(this, "this");
            let noticeModal = $(this).parent().parent().siblings('.notice_modal_background');
            // console.log(noticeModal);
            // noticeModal[0].style.display = 'block';

        });
    });
};
function noticeModal() {
};

