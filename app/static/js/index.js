var images = [];

// 이미지 선택
function image_select() {
    var image = document.getElementById('image').files;
    for (i = 0; i < image.length; i++) {
        if (check_duplicate(image[i].name)) {
            images.push({
                "name" : image[i].name,
                "url" : URL.createObjectURL(image[i]),
                "file" : image[i],
            })
            } else {
                alert(image[i].name + "는 선택된 파일입니다.");
            }
    }

    document.getElementById('form').reset();
    document.getElementById('container').innerHTML = image_show();
}

// 이미지 미리보기
function image_show() {
    var image = "";
    images.forEach((i) => {
        image += `<div class="image_container d-flex justify-content-center position-relative">
                <img src="`+ i.url +`" alt="Image">
                <span class="position-absolute" onclick="delete_image(`+ images.indexOf(i) +`)">&times;</span>
            </div>`;
    })
    return image;
}

// 이미지 삭제
function delete_image(e) {
    images.splice(e, 1);
    document.getElementById('container').innerHTML = image_show();
}

// 이미지 중복 체크
function check_duplicate(name) {
    var image = true;
    if (images.length > 0) {
        for (e = 0; e < images.length; e++) {
            if (images[e].name == name) {
                image = false;
                break;
            }
        }
    }
    return image;
}

//
function get_image_data() {
    var form = new FormData()
    for (let index = 0; index < images.length; index++) {
        form.append("file[" + index + "]", images[index]['file']);
    }
    return form;
}

console.log("test")
