// post에 해당하는 notice의 image를 클릭하면 해당 게시물을 modal 형태로 띄움
let postNotice = document.querySelectorAll('.post_notice_click');
// notice post
let notice_modal = document.getElementById('notice_modal');

if (postNotice.length != 0) {
    postNotice.forEach(post => {
        console.log(post);
        // 이미지가 있는 post
        if (post.className.includes('post_notice_img')) {
            post.addEventListener('click', function(){
                let noticeModal = $(post).parent().siblings('.notice_modal_background');
                console.log(noticeModal);
                noticeModal.style.display = 'block';
            });
        } else { // text만 있는 post
            post.addEventListener('click', function(){
                let noticeModal = $(post).parent().parent().siblings('.notice_modal_background');
                console.log(noticeModal);
                noticeModal.style.display = 'block';
            });
        };
    });
};
// modal 영역 외 클릭시
notice_modal.style.display = 'none';
