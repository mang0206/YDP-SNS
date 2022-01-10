import re
from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt
from bson.json_util import dumps
import json
from . import app, conn
db = conn.get_database('root')
bcrypt = Bcrypt()

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
    print(session['login'])
    if request.form.get('topbar_search') == 'topbar_search':
        search = request.form.get('search_input')
        
        return redirect(url_for('search', search = search))
    return render_template('index.html')

@app.route("/search", methods=['GET',"POST"])
def search():
    email = session['login']
    col_request_friend = db.get_collection('request_friend')
    request_list = col_request_friend.find()
    col = db.get_collection('user')
    if request.method == "POST":
        if request.form.get('topbar_search') == 'topbar_search':
            search = request.form.get('search_input')
            return redirect(url_for('search', search = search))
    
    search = request.args.get('search')
    query = { '$or' : 
        [ {'name': { '$regex' :  search, '$options': '$i'}},\
            {'user_ide' :  { '$regex' : search, '$options': '$i'}}
        ]
    }

    # search_user = list(col.find(query))
    search_user = [user['user_id'] for user in col.find(query)]
    # friend_list = col.find({'user_id': session['login']})['fiend_l
    friend_list = list(col.find({'user_id': email}, {'friend_list':True}))
    # friend_list = friend_list['friend_list']
    print(friend_list)
    # search_user = [user['user_id'] for user in col.find(query)]ist']
    # sessiotn_request_list = col_request_friend.find({'user_id': session['login']})
    # search_user = [user['user_ide'] for user in col.find(query)]
    print(search_user)
    return render_template('search.html',search = search, search_user=search_user)


@app.route("/request_friend")
def append_friend():
    

    return redirect(url_for('search'))

# 팝업창 txt와 img를 DB로 전송
@app.route("/content_submit", methods=["GET", "POST"])
def content_submit():
    if request.method == "POST":
        if request.form.get('content_submit') == "content_submit":
    #     popup_txt = request.form.get("popup_txt")
    #     col = db.get_collection('')
    #     post = {
    #         "popup_txt": popup_txt
    #     }

    #     return ""
            pass
    # else:
        return render_template('user.html')


@app.route("/user")
def user():
    return render_template('user.html')

@app.route("/friend")
def friend():
    return render_template('friend.html')

@app.route("/setting")
def setting():
    return render_template('setting.html')

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

