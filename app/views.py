import re
from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt
from bson.json_util import dumps
import json
from . import app, conn
db = conn.get_database('root')
bcrypt = Bcrypt()

search = ''

@app.route("/login", methods=['GET',"POST"])
def login():
    col = db.get_collection('user')
    if request.method == 'POST':
        email = request.form.get('user_id')
        pw =  request.form.get('password')
        find_user = col.find_one({'user_id':email})
        if bcrypt.check_password_hash(find_user['password'], pw):
            session['login'] =  email
            print('success')
            return redirect(url_for('index'))
        else:
            print('fail')
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
            user_id = request.form.get('user_id')
            user_name = request.form.get('user_name')
            col.insert_one(
                { 'user_id': email,
                'password': pw,
                'user_ide': user_id,
                'user_name': user_name })
            return render_template('join_success.html')
            
        # print(bcrypt.check_password_hash(pw, pw2))
        return redirect(url_for('join'))
        # return redirect('join.html')
    else:
        return render_template('join.html', email_list=email_list, ide_list=ide_list)

@app.route("/password_reset")
def password_reset():
    return render_template('password_reset.html')

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
        
        print(search)
        return redirect(url_for('search', search = search))
    return render_template('index.html')

@app.route("/search", methods=['GET',"POST"])
def search():
    email = session['login']
    col_request_friend = db.get_collection('request_friend')
    request_list = col_request_friend.find()
    col = db.get_collection('user')
    # if request.method == "POST":
    if request.form.get('search_btn') == 'topbar_search':
        search = request.form.get('search')
        return redirect(url_for('search', search = search))
    
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
    print(session_request_list)
    print(list(col_request_friend.find()))
    session_request_list = json.dumps(session_request_list, ensure_ascii = False)
    return render_template('search.html',session_user=email, search = search, search_user=search_user,\
                search_user_id = search_user_id, friend_list=friend_list, session_request_list=session_request_list)

# 팝업창 txt와 img를 DB로 전송
@app.route("/content_submit", methods=["POST"])
def content_submit():
    print(request.method)
    content_txt = request.form.get('content_txt')
    content_file = request.form.get('content_file')
    print(type(content_file))
    print('-==============================',content_txt, content_file)
    return redirect(url_for('user'))

@app.route("/user")
def user():
    return render_template('user.html')

@app.route("/friend")
def friend():
    return render_template('friend.html')

@app.route("/setting")
def setting():
    return render_template('setting.html')

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
        pass
    
    return jsonify(result = "success", result2= data)

@app.route('/test')
def connection_mongodb():
    print(conn.list_database_names())
    print(db.list_collection_names())

    col = db.get_collection('user')
    # print(* list(col.find({},{'user_id':True, 'user_ide':True})))

    lis = col.find({})

    json_lis = dumps(lis)
    print(json_lis)
    return jsonify(json_lis)

