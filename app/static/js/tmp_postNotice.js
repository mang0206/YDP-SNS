import { indicate_comment, indicate_reply } from './create_comment.js';

let postNotice = document.querySelectorAll('.post_notice_click');

if (postNotice.length != 0) {
    // 각 post modal에 이벤트 추가
    postNotice.forEach(post => {
        // 이미지가 있는 post
        if (post.className.includes('post_notice_img')) {
            post.addEventListener('click', function(){
                let noticeModal = $(post).parent().siblings('.notice_modal_background');
                console.log(noticeModal);
                noticeModal[0].style.display = 'block';
                document.querySelector(".body").className = "body scroll_hidden";
            });
        } else { // text만 있는 post
            post.addEventListener('click', function(){
                let noticeModal = $(post).parent().parent().siblings('.notice_modal_background');
                console.log(noticeModal);
                noticeModal[0].style.display = 'block';
                document.querySelector(".body").className = "body scroll_hidden";
            });
        };
        console.log($(post).find('.post_notice_comment_list'))
        // $('this .post_notice_comment_list')
    });
};