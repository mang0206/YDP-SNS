import re
from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt

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
    if request.method == "POST": #and request.form.get('submit_btn') == "join_form":
        email = request.form.get('email')
        #중복 체크 필요
        pw = bcrypt.generate_password_hash(request.form.get('password'))
        pw2 = request.form.get('password2')
        if bcrypt.check_password_hash(pw, pw2):
            user_id = request.form.get('user_id')
            col = db.get_collection('user')
            col.insert_one(
                { 'user_id': email,
                'password': pw,
                'user_ide': user_id })
            return render_template('join_success.html')
            
        # print(bcrypt.check_password_hash(pw, pw2))
        return redirect(url_for('join'))
        # return redirect('join.html')
    else:
        return render_template('join.html')

@app.route("/password_reset")
def password_reset():
    return render_template('password_reset.html')

@app.route("/join_success")
def join_success():
    return render_template('join_success.html')

@app.route("/")
def index():
    print(session['login'])
    return render_template('index.html')

@app.route("/search")
def search():
    return render_template('search.html')

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
    # col.insert_one(
    #     {'user_id':'test1',
    #     'password': 1111,
    #     'user_ide':'test1'})
    col = db.get_collection('user')
    print(list(col.find()))
    return jsonify({"":'list(col.find())'})

