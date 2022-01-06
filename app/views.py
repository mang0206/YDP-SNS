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
    col = db.get_collection('user')
    email_list = [user['user_id'] for user in col.find()]
    ide_list = [user['user_ide'] for user in col.find()]

    if request.method == "POST": #and request.form.get('submit_btn') == "join_form":
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
    # print(session['login'])
    if request.method == 'POST':
        search = request.form.get('search_input')
        
        return redirect(url_for('search', search = search))
    return render_template('index.html')

@app.route("/search")
def search():
    col = db.get_collection('user')
    search = request.args.get('search')
    query = { '$or' : 
        [ {'name': { '$regex' :  search, '$options': '$i'}},\
            {'user_ide' :  { '$regex' : search, '$options': '$i'}}
        ]
    }
    search_user = col.find(query)
    print(list(search_user))
    return render_template('search.html',search = search, search_user=list(search_user))

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
    for i in col.find({}):
        print(i)
    return jsonify({"":'list(col.find())'})

