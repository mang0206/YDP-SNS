# aws -ec2 주소 : 13.125.71.134

# 모델 스키마

## user
	- user_id : 로그인 ID
    - password : 로그인 PW
    - nickname : 사용자 닉네임
	- user_name : 사용자 이름
	- friend_list : 사용자 친구 목록
    - profile_img : 사용자 프로필 이미지
    - background_img : 사용자 백그라운드 이미지
    - bio : 소개글
    - like : 좋아요 누른 post의 id 리스트
    - commemt : 댓글 혹은 답글을 단 post의 id 리스트

## request_friend
	- user_id : 요청을 보낸 사용자 ID
	- request_user : 요청을 받는 사용자 ID
	
## post
    - create_user : 작성한 사용자 ID
    - create_user_nickname : 작성한 사용자 nickname
    - create_time : 작성 시간(24시간 전까지는 ~시간 전, 지난 후에는 일자 표시)
	- text : text data
    - split_text : 개행문자 \n 처리 및 split한 text list
	- images : 이미지 리스트
    - hash_tag : 해시 태그 리스트
    - like : 좋아요 누른 user 딕셔너리 리스트

## comment
    - post_id : 기준 post 
    - comment_user : 댓글을 단 사용자 
    - comment_time : 작성 시간(24시간 전까지는 ~시간 전, 지난 후에는 일자 표시)
    - comment : 댓글
    - reply_list : 답글 리스트
        - reply_user : 답글을 단 사용자 ID
        - reply_time : 작성 시간(24시간 전까지는 ~시간 전, 지난 후에는 일자 표시)
        - reply : 답글

## deleteFile
    - file_route : s3의 파일 경로
    - file_name : 삭제할 이미지 파일 명

# session 정보
    session['login'] : id(로그인 id)
    session['nickname'] = nickname
    session['name'] = name
    session['profile_img'] = 프로필 사진
    session['like'] = user가 좋아요 누른 post id 리스트 


