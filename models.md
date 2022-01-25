# 모델 스키마

## user
	- user_id : 로그인 ID
    - password : 로그인 PW
    - user_ide : 사용자 닉네임
	- user_name : 사용자 이름
	- friend_list : 사용자 친구 목록
    - profile_img : 사용자 프로필 이미지
    - background_img : 사용자 백그라운드 이미지
    - bio : 소개글

## request_friend
	- user_id : 요청을 보낸 사용자 ID
	- request_user : 요청을 받는 사용자 ID
	
## poster 
    - create_user : 작성한 사용자 ID
    - create_time : 작성 시간(24시간 전까지는 ~시간 전, 지난 후에는 일자 표시)
	- text : text data
	- images : 이미지 리스트
    - hash_tag : 해시 태그 리스트

## response
    - poster : 기준이 될 poster
    - create_response_user : 반응을 추가한 사용자 ID
    - response : 반응 
    - response_count : 반응 갯수

    - create_comment_user : 댓글을 단 사용자 
    - create_time : 작성 시간(24시간 전까지는 ~시간 전, 지난 후에는 일자 표시)
    - comment : 댓글
    
    - create_reply_user : 답글을 단 사용자 ID
    - create_time : 작성 시간(24시간 전까지는 ~시간 전, 지난 후에는 일자 표시)
    - reply : 댓글의 답글

## session
    session['login'] : session id
    session['ide'] = session ide(닉네임)
    session['name'] = session name(이름)
    session['profile_img'] = session profile_img