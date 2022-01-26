from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt
from bson.json_util import dumps
from bson.objectid import ObjectId
import json
from . import app, conn
import gridfs
import codecs
from flask_mail import Mail, Message

db = conn.get_database('root')
bcrypt = Bcrypt()
fs = gridfs.GridFS(db)
email = Mail(app)

@app.route("/login", methods=['GET',"POST"])
def login():
    col = db.get_collection('user')
    if request.method == 'POST':
        email = request.form.get('user_id')
        pw =  request.form.get('password')
        find_user = col.find_one({'user_id':email})
        if bcrypt.check_password_hash(find_user['password'], pw):
            session['login'] =  email
            session['ide'] = find_user['user_ide']
            session['name'] = find_user['user_name']
            return redirect(url_for('index'))
        else:
            flash("아이디와 비밀번호를 확인하세요")
            return redirect(url_for('login'))
            # return render_template('login.html')
    else:
        return render_template('login.html')

@app.route('/join', methods=['GET',"POST"])
def join():
    col = db.get_collection('user')
    email_list = [user['user_id'] for user in col.find()]
    ide_list = [user['user_ide'] for user in col.find()]

    if request.method == "POST":
        email = request.form.get('email')
        if email in email_list:
            flash('이미 존재하는 이메일 입니다.')
            return redirect(url_for('join'))
        
        pw = bcrypt.generate_password_hash(request.form.get('password'))
        pw2 = request.form.get('password2')
        if bcrypt.check_password_hash(pw, pw2):
            _default = col.find_one({'user_id':'default'})
            user_id = request.form.get('user_id')
            user_name = request.form.get('user_name')
            col.insert_one(
                { 'user_id': email,
                'password': pw,
                'user_ide': user_id,
                'user_name': user_name,
                'friend_list': [],
                'profile_img': ObjectId(_default['profile_img']),
                'background_img': ObjectId(_default['background_img']),
                'bio': None,
                })
            return render_template('join_success.html')
        else:
            flash('비밀번호를 확인해 주세요.')   
        # print(bcrypt.check_password_hash(pw, pw2))
        return redirect(url_for('join'))
        # return redirect('join.html')
    else:
        return render_template('join.html', email_list=email_list, ide_list=ide_list)

@app.route("/password_reset")
def password_reset():
    return render_template('password_reset.html')

# 이메일 인증번호 발송
@app.route('/send_email', methods=['POST'])
def send_email():
    ran_num = "123456"
    recipients = request.form['email']

    # msg = Message(
    #     "YDP-SNS 비밀번호 변경 인증번호", #메일 제목
    #     body = "인증번호 6자리 [ " + ran_num + " ] 를 입력 후 인증해주세요.", #메일 내용
    #     sender = "ydpsns.project@gmail.com", #메일을 보낸 계정
    #     recipients = [recipients] #메일을 보낼 계정
    # )
    # email.send(msg)

    return redirect(url_for('password_reset'))

@app.route("/join_success")
def join_success():
    return render_template('join_success.html')

@app.route("/", methods=['GET',"POST"])
def index():
    col_user = db.get_collection('user')
    if session.get('login') is None:
        return redirect(url_for('login'))

    if request.form.get('search_btn') == 'topbar_search':
        # input의 name으로 값을 가져옴
        search = request.form.get('search')
        return redirect(url_for('search', search = search))
    
    session_friend_list =  col_user.find_one({'user_id' : session['login']}, {'_id':0, 'friend_list':1})['friend_list']

    friend_dic = {}
    for user in session_friend_list:
        friend_dic[user] = col_user.find_one({'user_id': user})
    
    for key in friend_dic:
        img = fs.get(friend_dic[key]['profile_img'])
        base64_data = codecs.encode(img.read(), 'base64')
        friend_dic[key]['profile_img'] = base64_data.decode('utf-8')   
    # # 프로필 이미지
    # img = fs.get(session_user['profile_img'])
    # base64_data = codecs.encode(img.read(), 'base64')
    # profile_img = base64_data.decode('utf-8')
    # # 배경 이미지
    # img = fs.get(session_user['background_img'])
    # base64_data = codecs.encode(img.read(), 'base64')
    # background_img = base64_data.decode('utf-8')

    
    return render_template('index.html', friend_dic = friend_dic)

@app.route("/search", methods=['GET',"POST"])
def search():
    email = session['login']
    col_request_friend = db.get_collection('request_friend')
    request_list = col_request_friend.find()
    col = db.get_collection('user')
    # if request.method == "POST":
    # if request.form.get('search_btn') == 'topbar_search':
    #     search = request.form.get('search')
    #     return redirect(url_for('search', search = search))
    
    search = request.args.get('search')
    query = { '$or' : 
        [ {'name': { '$regex' :  search, '$options': '$i'}},\
            {'user_ide' :  { '$regex' : search, '$options': '$i'}}
        ]
    }
    search_user = list(col.find(query))
    print(search_user)
    search_user_id = {}
    for user in search_user:
        search_user_id[user['user_ide']] = user['user_id']

    search_user_id = json.dumps(search_user_id, ensure_ascii = False)
    
    for i in col.find({'user_id': email}):
        friend_list = i['friend_list']

    session_request_list = {}
    session_request_list[''] = [user['request_user'] for user in col_request_friend.find({'user_id': session['login']})]
    
    print(list(col_request_friend.find()))
    session_request_list = json.dumps(session_request_list, ensure_ascii = False)

    return render_template('search.html',session_user=email, search = search, search_user=search_user,\
                search_user_id = search_user_id, friend_list=friend_list, session_request_list=session_request_list)

# 팝업창 txt와 img를 DB로 전송
@app.route("/content_submit", methods=["POST"])
def content_submit():
    global content_file
    content_txt = request.form.get('content_txt')
    content_file = request.files.get('content_file')    
    print(type(content_file))
    print('-==============================',content_txt, content_file)
    return redirect(url_for('user', user=session['ide']))

@app.route("/user/<user>")
def user(user):
    col_user = db.get_collection('user')
    col_request_friend = db.get_collection('request_friend')

    for i in col_user.find({'user_id': session['login']}):
        session_friend_list = i['friend_list']
    
    user = col_user.find_one({'user_ide':user})
    # user의 친구 정보 dictionary
    friend_dic = {}
    for i in user['friend_list']:
        friend_dic[i] = col_user.find_one({'user_id': i})

    # session 유저가 친구 요청을 보낸 user의 id 리스트
    session_request_list = [user['request_user'] for user in col_request_friend.find({'user_id': session['login']})]
    # print(friend_dic)
    return render_template('user.html', user=user,session_friend_list=session_friend_list,\
         friend_dic=friend_dic, session_request_list = session_request_list)

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
    request_friend = {}
    for i in request_friend_id:
        find_user = col_user.find_one({'user_id':i})
        request_friend[i] = find_user['user_ide']

    friend_list = []
    for i in col_user.find({'user_id':user}):
        friend_list = i['friend_list']
    friend_dict = {}
    for i in friend_list:
        find_user = col_user.find_one({'user_id':i})
        friend_dict[i] = find_user['user_ide']

    # request_friend={'aaa':'aaa', 'bbb':'bbb', 'ccc':'ccc', 'ddd':'ddd'}
    # friend_list = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']
    return render_template('friend.html', request_friend=request_friend, friend_list=friend_dict)

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
    
    return jsonify(result = "success", result2= data)

@app.route("/setting")
def setting():
    col_user = db.get_collection('user')
    session_user = col_user.find_one({'user_id': session['login']})

    # 프로필 이미지
    img = fs.get(session_user['profile_img'])
    base64_data = codecs.encode(img.read(), 'base64')
    profile_img = base64_data.decode('utf-8')
    # 배경 이미지
    img = fs.get(session_user['background_img'])
    base64_data = codecs.encode(img.read(), 'base64')
    background_img = base64_data.decode('utf-8')

    return render_template('setting.html', profile_img=profile_img, background_img=background_img)

@app.route("/setting", methods= ['POST'])
def post_setting():
    col_user = db.get_collection('user')
    # gridfs를 사용할 colection
    if 'setting_button_profile' in request.form:
        input_profile = request.files.get('setting_input_profile')
        # colection에 파일 저장 put 함수는 저장된 document id를 반환한다
        _id = fs.put(input_profile)
        # 해당 documet id 정보를 현재 session user document에 추가
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'profile_img': _id}}
        )
        session['profile_img'] = _id

    if 'setting_button_background' in request.form:
        input_background = request.files.get('setting_input_background')
        _id = fs.put(input_background)
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'background_img': _id}}
        )

    if 'setting_button_ide' in request.form:
        input_ide = request.form.get('setting_input_ide')
        col_user.update_one(
            {'user_id': session['login']},
            {'$set' : {'user_ide': input_ide}}
        )
        session['user_ide'] = input_ide

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

    if 'setting_button_pw' in request.form:
        input_pw = bcrypt.generate_password_hash(request.form.get('setting_input_pw'))
        input_pw2 = request.form.get('setting_input_pw2')
        if bcrypt.check_password_hash(input_pw, input_pw2):
            col_user.update_one(
                {'user_id': session['login']},
                {'$set' : {'password': input_pw}}
            )
            
    return redirect(url_for('setting'))

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
    # print(* list(col.find({},{'user_id':True, 'user_ide':True})))
    col.update_many({},{"$rename":{"name":"user_name"}})
    lis = col.find({})
    
    json_lis = dumps(lis)
    print(json_lis)
    return jsonify(json_lis)

