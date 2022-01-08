
// 이미지 선택
function image_select() {
    let image = document.getElementById('image').files;
    for (i = 0; i < image.length; i++) {
        if (check_duplicate(image[i].name)) {
            image.push({
                "name" : image[i].name,
                "url" : URL.createObjectURL(image[i]),
                "file" : image[i],
            })
            } else {
                alert(image[i].name + " is already added to the list");
            }
    }

    document.getElementById('form').reset();
    document.getElementById('container').innerHTML = image_show();
}

// 이미지 미리보기
function image_show() {
    let image = "";
    image.forEach((i) => {
        image += `<div class="image_container d-flex justify-content-center position-relative">
                <img src="`+ i.url +`" alt="Image">
                <span class="position-absolute" onclick="delete_image(`+ image.indexOf(i) +`)">&times;</span>
            </div>`;
    })
    return image;
}

// 이미지 삭제
function delete_image(e) {
    image.splice(e, 1);
    document.getElementById('container').innerHTML = image_show();
}

// 이미지 중복 체크
function check_duplicate(name) {
    let image = true;
    if (image.length > 0) {
        for (e = 0; e < image.length; e++) {
            if (image[e].name == name) {
                image = false;
                break;
            }
        }
    }
    return image;
}

//
function get_image_data() {
    let form = new FormData()
    for (let index = 0; index < image.length; index++) {
        form.append("file[" + index + "]", image[index]['file']);
    }
    return form;
}

console.log("test")