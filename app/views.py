# from crypt import methods
from asyncio.windows_events import NULL
from enum import Flag
import profile
from time import strftime
from unittest import result
from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
from . import app, conn
import gridfs
import codecs
from flask_mail import Mail, Message
import random
from .functuion import *
import datetime as dt
import pymongo

db = conn.get_database('root')
bcrypt = Bcrypt()
# fs = gridfs.GridFS(db)
email = Mail(app)
@app.route("/login", methods=['GET',"POST"])
def login():
    col = db.get_collection('user')
    if request.method == 'POST':
        user_id = request.form.get('user_id')
        pw =  request.form.get('password')
        find_user = col.find_one({'user_id':user_id})
        if bcrypt.check_password_hash(find_user['password'], pw):
            session['login'] =  user_id
            session['nickname'] = find_user['nickname']
            session['name'] = find_user['user_name']
            session['profile_img'] = find_user['profile_img'][1]
            session['like'] = find_user['like']
            return redirect(url_for('index'))
        else:
            flash("아이디 혹은 비밀번호가 틀렸습니다.")
            return redirect(url_for('login'))
            # return render_template('login.html')
    else:
        return render_template('login.html')

@app.route('/join', methods=['GET',"POST"])
def join():
    col = db.get_collection('user')
    id_list = [user['user_id'] for user in col.find()]
    nickname_list = [user['nickname'] for user in col.find()]
    email_list = [user['user_email'] for user in col.find()]

    if request.method == "POST":
        email = request.form.get('user_email')
        if email in email_list:
            flash('이미 존재하는 이메일입니다.')
            return redirect(url_for('join'))
        user_id = request.form.get('user_id')
        if user_id in id_list:
            flash('이미 존재하는 아이디입니다.')
            return redirect(url_for('join'))
        nickname = request.form.get('nickname')
        if nickname in nickname_list:
            flash('이미 존재하는 닉네임입니다.')
            return redirect(url_for('join'))
        
        pw = bcrypt.generate_password_hash(request.form.get('password'))
        pw2 = request.form.get('password2')
        if bcrypt.check_password_hash(pw, pw2):
            _default = col.find_one({'user_id':'default'})
            user_name = request.form.get('user_name')
            col.insert_one(
                { 'user_id': user_id,
                'password': pw,
                'nickname': nickname,
                'user_name': user_name,
                'friend_list': [],
                'profile_img': _default['profile_img'],
                'background_img': _default['background_img'],
                'bio': None,
                'user_email': email,
                'like': []
                })
            return render_template('join_success.html')
        else:
            flash('비밀번호를 확인해 주세요.')   
        # print(bcrypt.check_password_hash(pw, pw2))
        return redirect(url_for('join'))
        # return redirect('join.html')
    else:
        return render_template('join.html', email_list=email_list, nickname_list=nickname_list, id_list=id_list)

@app.route("/password_reset", methods=["GET", "POST"])
def password_reset():
    
    if request.get_json():
        data = request.get_json()
        input_num = data['input_num']
        ran_num = session['certification_num']

        return jsonify(result = 'success')

    else:
        return render_template('password_reset.html')
        

# 이메일 인증번호 발송
@app.route('/send_email', methods=["POST"])
def send_email():
    data = request.get_json()
    send_email = data['send_email'] # 사용자가 입력한 email 주소

    number = "0123456789"
    ran_num = ""  #인증번호 6자리

    for i in range(6):
        ran_num += random.choice(number)

    msg = Message(
        "YDP-SNS 비밀번호 변경 인증번호", #메일 제목
        body = "인증번호 6자리 [ " + ran_num + " ] 를 입력 후 인증해주세요.", #메일 내용
        sender = "ydpsns.project@gmail.com", #발송인
        recipients = [send_email] #수신인
    )
    email.send(msg)

    session['certification_num'] = ran_num
    session['send_email'] = send_email

    # print(session['certification_num'])

    # return redirect(url_for('password_reset'))
    return jsonify(result = 'success', ran_num=ran_num)

@app.route("/join_success")
def join_success():
    return render_template('join_success.html')

@app.route("/", methods=['GET',"POST"])
def index():
    if session.get('login') is None:
        return redirect(url_for('login'))

    if request.form.get('search_btn') == 'topbar_search':
        # input의 name으로 값을 가져옴
        search = request.form.get('search')
        return redirect(url_for('search', search = search))
    
    session_friend_list = get_friend_list(session['login'])
    # 친구 정보 딕셔너리 
    friend_dic = get_friend_dic(session_friend_list)
     
    return render_template('index.html', friend_dic = friend_dic)

@app.route("/search", methods=['GET',"POST"])
def search():
    email = session['login']
    col_request_friend = db.get_collection('request_friend')
    request_list = col_request_friend.find()
    col_user = db.get_collection('user')
    # if request.method == "POST":
    # if request.form.get('search_btn') == 'topbar_search':
    #     search = request.form.get('search')
    #     return redirect(url_for('search', search = search))
    
    search = request.args.get('search')
    query = { '$or' : 
        [ {'name': { '$regex' :  search, '$options': '$i'}},\
            {'nickname' :  { '$regex' : search, '$options': '$i'}}
        ]
    }
    search_user = list(col_user.find(query))
    # print('----------------', search_user)
    #js 연동을 위한 search user의 nickname, id 딕셔너리
    search_user_id = {}
    for user in search_user:
        search_user_id[user['nickname']] = user['user_id']

    search_user_id = json.dumps(search_user_id, ensure_ascii = False)

    # 검색한 user 목록 dictionary
    search_user_dic = get_friend_dic([user['user_id'] for user in search_user])

    #세션 유저의 친구 목록
    session_friend_list =  get_friend_list(session['login'])

    #세션 유저가 요청한 user 목록
    session_request_list = {}
    session_request_list[''] = [user['request_user'] for user in col_request_friend.find({'user_id': session['login']})]
    session_request_list = json.dumps(session_request_list, ensure_ascii = False)

    return render_template('search.html', search = search, search_user_dic=search_user_dic, search_user_id=search_user_id,\
                 session_friend_list=session_friend_list, session_request_list=session_request_list)

# 팝업창 txt와 img를 DB로 전송
@app.route("/content_submit", methods=["POST"])
def content_submit():
    col_post = db.get_collection('post')
    content_txt = request.form.get('content_txt')
    content_file = request.files.getlist("content_file[]")    
    print('-==============================',content_txt, content_file)
    # print("get list",len(content_file))

    time = dt.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    now_time = dt.datetime.now()
    print(now_time)
    print(type(now_time))

    img_list = []
    if len(content_file) > 0:
        for img in content_file:
            filename = img.filename.split('.')[0]
            ext = img.filename.split('.')[-1]
            nickname = session['nickname']
            img_name = dt.datetime.now().strftime(f"{nickname}-{filename}-%Y-%m-%d-%H-%M-%S.{ext}")
            s3_put_object(s3,'ydpsns',img,img_name,'postimages')
            img_list.append(s3_get_image_url(s3, img_name, 'postimages')) 

    tmp = content_txt.splitlines(True)
    text = []
    for t in tmp:
        text.extend(t.split(' '))
        if '\n' in text[-1]:
            text[-1] = text[-1][:-1]
            text.append('\n')

    # hash_tag = []
    # if content_txt:
    #     hash_tag = [h[1:] for h in content_txt.split(' ') if len(h) and h[0] == '#']
    hash_tag = [h[1:] for h in tmp if len(h) and h[0] == '#']
        

    col_post.insert_one(
        {'create_user': session['login'],
        'create_user_nickname': session['nickname'],
        'create_user_profile' : session['profile_img'],
        'create_time': time,
        'text': content_txt,
        'split_text' : text,
        'images': img_list,
        'hashtag' : hash_tag,
        'like' : [],
        'comment' : 0
    })
    # print(hash_tag)
    flash("게시물이 업로드 되었습니다.")
    
    return redirect(url_for('user', user=session['nickname']))

@app.route("/content_submit", methods=["DELETE"])
def delete_post():
    col_user = db.get_collection('user')
    col_post = db.get_collection('post')
    col_delete = db.get_collection('deleteFile')

    data = request.get_json()

    del_post = col_post.find_one({'_id':ObjectId(data)})

    # 해당 게시물에 해당하는 s3의 이미지 파일들 삭제
    for img in del_post['images']:
        tmp_img = img.split('/')[-1]
        if 'postimages' in tmp_img :
            tmp_img = tmp_img.split('/')[-1]
        col_delete.insert_one({
            'file_route' : 'postimages',
            'file_name' : tmp_img
        })
        # s3_delete_image(tmp_img, file_kind='postimages')

    # 해당 게시물 좋아요 누른 사용자에 대한 document 정리
    for user in del_post['like']:
        col_user.update_one({'nickname': user['nickname']}, {'$pull' : {'like': data}})
        print(col_user.find_one({'nickname': user['nickname']}, {'_id':0, 'like':1})['like'])

    # 해당 게시물 댓글 및 답글단 사용자에 대한 document 정리

    # 최종 해당 post 삭제 
    col_post.delete_one({'_id':ObjectId(data)})
    return jsonify(result = "success")

@app.route("/content_reaction_submit", methods=["POST"])
def like_submit():
    col_user = db.get_collection('user')
    col_post = db.get_collection('post')
    col_comment = db.get_collection('comment')

    data = request.get_json()
    # like 버튼을 눌렀을 때에 대한 ajax 통신
    if data['kind'] == 'like':
        # 세션 유저 정보 document에서 nickname, profile_img, like 정보만 가져온 변수
        session_user = col_user.find_one({'user_id':session['login']},{'_id':0, 'nickname':1 ,'profile_img':1, 'like':1})
        if data['flag'] == 'color':
            col_user.update_one({'user_id':session['login']}, {'$push': {'like': data['post_id']}})
            session_user = col_user.find_one({'user_id':session['login']},{'_id':0, 'nickname':1 ,'profile_img':1, 'like':1})
            col_post.update_one({'_id':ObjectId(data['post_id'])}, {'$push': {'like': session_user}})
            session['like'] = col_user.find_one({'user_id':session['login']},{'_id':0, 'like':1})['like']
        else:
            col_user.update_one({'user_id':session['login']}, {'$pull': {'like': data['post_id']}})
            col_post.update_one({'_id':ObjectId(data['post_id'])}, {'$pull': {'like': { 'nickname' : session['nickname']}}})
            session['like'] = col_user.find_one({'user_id':session['login']},{'_id':0, 'like':1})['like']

        return jsonify(result = "success", session_user=session_user)
    # 댓글 달기 버튼을 눌렀을 때에 대한 ajax 통신
    elif data['kind'] == 'append_comment':
        time = dt.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        session_user = col_user.find_one({'user_id':session['login']},{'_id':0, 'nickname':1 ,'profile_img':1})
        comment = data['text'].split(' ')
        col_comment.insert_one({
            'post_id' : data['post_id'],
            'comment_user' : session_user,
            'comment_time' : time,
            'comment' : comment,
            'reply_list' : []
        })
        col_user.update_one(
            {'user_id': session['login']},
            {'$push': {'comment': ['comment', data['post_id']]}}
        )
        col_post.update_one({'_id': ObjectId(data['post_id'])}, {'$inc': {'comment': 1}})
        print(comment)
        return jsonify(result = "success", session_user=session_user, comment=comment, time=time)
    # 해당 post의 댓글을 불러오는 ajax 통신
    elif data['kind'] == 'get_comment':
        comment_dic = list(col_comment.find(
            {'post_id': data['post_id']},
            {'_id': 0}
        ))#.sort("comment_time", pymongo.DESCENDING))
        return jsonify(result = "success", comment_dic = comment_dic)

@app.route("/user/<user>")
def user(user):
    col_user = db.get_collection('user')
    col_request_friend = db.get_collection('request_friend')
    col_post = db.get_collection('post')

    session_friend_list = get_friend_list(session['login'])
    
    search_user = col_user.find_one({'nickname':user})
    # get_user_image(search_user, 'profile_img')
    # get_user_image(search_user, 'background_img')
    # user의 친구 정보 dictionary
    user_friend_list = get_friend_list(search_user['user_id']) 
    friend_dic = get_friend_dic(user_friend_list)

    # session 유저가 친구 요청을 보낸 user의 id 리스트
    session_request_list = [user['request_user'] for user in col_request_friend.find({'user_id': session['login']})]
    # print(friend_dic)
    post_dic = col_post.find({'create_user_nickname': user}).sort("create_time", pymongo.DESCENDING)  
    # print(list(post_dic))
    return render_template('user.html', user=search_user,session_friend_list=session_friend_list,\
         friend_dic=friend_dic, session_request_list = session_request_list, post_dic=post_dic)

@app.route("/logout")
def logout():
    flash("로그아웃 되었습니다.")
    session['login'] = None
    return redirect(url_for('login'))

@app.route("/friend", methods=["GET", "POST"])
def friend():
    user = session['login']
    col_user = db.get_collection('user')
    col_request_friend = db.get_collection('request_friend')
    
    request_friend_id = [user['user_id'] for user in col_request_friend.find({'request_user':user})]
    request_friend = get_friend_dic(request_friend_id)

    friend_list = get_friend_list(user)
    friend_dict = get_friend_dic(friend_list)

    # request_friend={'aaa':'aaa', 'bbb':'bbb', 'ccc':'ccc', 'ddd':'ddd'}
    # friend_list = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
    recommend_frined_dic = {}
    for friend in friend_list:
        print('friend = ', friend)
        friend_friend_list = get_friend_list(friend)
        friend_friend_dict = get_friend_dic(friend_friend_list)
        for f, recommend_friend in friend_friend_dict.items():
            print('f = ', f)
            if f != session['login'] and f not in friend_list:
                friend_dic = col_user.find_one({'user_id':friend})
                if f in recommend_frined_dic.keys():
                    recommend_frined_dic[f]['count'].append(friend_dic)
                else:
                    recommend_frined_dic[f] = recommend_friend
                    recommend_frined_dic[f]['count'] = [friend_dic]
    for k, v in recommend_frined_dic.items():
        print(k, v['count'])

    return render_template('friend.html', request_friend=request_friend, friend_list=friend_dict, recommend_frined_dic=recommend_frined_dic)

@app.route("/friend_respond", methods=["POST"])
def friend_respond():
    data = request.get_json()
    print(data, type(data))
    col_user = db.get_collection('user')
    col_request_friend = db.get_collection('request_friend')

    if data['respond'] == 'accept_btn':
        col_user.update_one({'user_id': session['login']}, {'$push': {'friend_list': data['friend']}})
        col_user.update_one({'user_id': data['friend']}, {'$push': {'friend_list': session['login']}})
    elif data['respond'] == 'delete_btn':
        col_user.update_one({'user_id': session['login']}, {'$pull': {'friend_list': data['friend']}})
        col_user.update_one({'user_id': data['friend']}, {'$pull': {'friend_list': session['login']}})
    col_request_friend.delete_one({'user_id': data['friend'], 'request_user':session['login']})
    col_request_friend.delete_one({'user_id': session['login'], 'request_user':data['friend']})

    return jsonify(result = "success", result2= data)

@app.route("/setting")
def setting():
    col_user = db.get_collection('user')
    session_user = col_user.find_one({'user_id': session['login']})
    # get_user_image(session_user, 'background_img')
    
    return render_template('setting.html', session_user=session_user)

@app.route("/setting", methods= ['POST'])
def post_setting():
    col_user = db.get_collection('user')
    # gridfs를 사용할 colection
    if 'setting_button_profile' in request.form:
        input_profile = request.files.get('setting_input_profile')
        # colection에 파일 저장 put 함수는 저장된 document id를 반환한다
        # _id = fs.put(input_profile)
        # 해당 documet id 정보를 현재 session user document에 추가
        # col_user.update_one(
            # {'user_id': session['login']},
            # {'$set' : {'profile_img': _id}}
        # )
        # session['profile_img'] = _id
        filename = input_profile.filename.split('.')[0]
        ext = input_profile.filename.split('.')[-1]
        nickname = session['nickname']
        img_name = dt.datetime.now().strftime(f"{nickname}-{filename}-%Y-%m-%d-%H-%M-%S.{ext}")

        # _delete = col_user.find_one({'user_id':session['login']}, {'_id':0, 'profile_img':1})['profile_img']
        # if _delete != col_user.find_one({'user_id': 'default'}, {'_id':0, 'profile_img':1})['profile_img']:
            # s3_delete_image(_delete[0])
        s3_put_object(s3,'ydpsns',input_profile,img_name)
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'profile_img': [img_name, s3_get_image_url(s3, img_name)]}}
        )
        session['profile_img'] = [img_name, s3_get_image_url(s3, img_name)][1]

    if 'setting_button_background' in request.form:
        input_background = request.files.get('setting_input_background')

        filename = input_background.filename.split('.')[0]
        ext = input_background.filename.split('.')[-1]
        img_name = dt.datetime.now().strftime(f"{session['nickname']}-{filename}-%Y-%m-%d-%H-%M-%S.{ext}")
        s3_put_object(s3,'ydpsns',input_background,img_name)
        # _delete = col_user.find_one({'user_id':session['login']}, {'_id':0, 'background_img':1})['background_img']
        # if _delete != col_user.find_one({'user_id': 'default'}, {'_id':0, 'background_img':1})['background_img']:
            # s3_delete_image(_delete[0])
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'background_img': [img_name, s3_get_image_url(s3, img_name)]}}
        )

    if 'setting_button_ide' in request.form:
        input_ide = request.form.get('setting_input_ide')
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'nickname': input_ide}}
        )
        session['nickname'] = input_ide

    if 'setting_button_bio' in request.form:
        bio = request.form.get('setting_input_bio')
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'bio': bio}}
        )

    if 'setting_button_name' in request.form:
        input_name = request.form.get('setting_input_name')
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'user_name': input_name}}
        )
        session['user_name'] = input_name

    return redirect(url_for('setting'))

# setting 기존 비밀번호 일치 여부 반환
@app.route('/change_pw', methods=['POST'])
def change_pw():
    col_user = db.get_collection('user')

    # print(request.get_json())
    # 사용자가 입력한 기존 pw와 세션 pw가 일치하면 check_password 함수 실행
    if request.get_json():
        # print('first_if')
        data = request.get_json()
        origin_pw = data['origin_pw']
        db_pw = col_user.find_one({ "user_id" : session['login'] })

        if bcrypt.check_password_hash(db_pw['password'], origin_pw):
            flag = 1
            # print('true')
            # print(flag)
            return jsonify(result="success", flag=flag)
        else:
            flag = 0
            return jsonify(result="success", flag=flag)


# 친구 요청, 요청 삭제, 친구 삭제 처리
@app.route('/request_friend', methods=['POST'])
def request_frie():
    data = request.get_json()
    col_user = db.get_collection('user')
    col_request_friend = db.get_collection('request_friend')
    print(data['user'], data['id'].split('!')[-1], data['val'])
    user = data['user']
    request_user = data['id'].split('!')[-1]
    
    if data['val'] == '친구 요청':
        col_request_friend.insert_one({
            'user_id' : user,
            'request_user' : request_user
        })
    elif data['val'] == '요청 삭제':
        query = { '$or' : 
            [{'user_id': user}, {'request_user' : request_user}]
        }
        col_request_friend.delete_one(query)
    else:
        print('================친구 삭제',user, request_user)
        col_user.update_one( {'user_id':user},{'$pull': {'friend_list' : request_user }})
        col_user.update_one( {'user_id':request_user},{'$pull': {'friend_list' : user }})
    
    return jsonify(result = "success", result2= data)

@app.route('/test')
def connection_mongodb():
    print(conn.list_database_names())
    print(db.list_collection_names())

    col = db.get_collection('user')
    col_post = db.get_collection('post')
    col_delete = db.get_collection('deleteFile')
    col_comment = db.get_collection('comment')
    # print(* list(col.find({},{'user_id':True, 'nickname':True})))
    # col.update_many({},{"$rename":{"name":"user_name"}})
    lis = col.find_one({'nickname':'bbb'})
    
    json_lis = dumps(lis)
    print(json_lis)
    print('\n\n\n')
    for i in lis['like']:
        f = col_post.find_one({'_id': ObjectId(i)})
        print(f, end='\n-------------------------\n')
    for i in col_post.find({}):
        print(i, end='\n-------------------------\n')
    for i in col_comment.find({}):
        print(i, end='\n-------------------------\n')
    return jsonify(json_lis)

