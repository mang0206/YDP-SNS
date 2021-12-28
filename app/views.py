from flask import request, render_template, jsonify, redirect, url_for
import bcrypt
from . import app, conn
db = conn.get_database('root')
col = db.get_collection('user')

@app.route("/login", methods=['GET',"POST"])
def login():
    if request.method == 'POST':
        return 
    return render_template('login.html')

@app.route('/join', methods=['GET',"POST"])
def join():
    if request.method == "POST": #and request.form.get('submit_btn') == "join_form":
        email = request.form.get('join_email')
        pw = request.form.get('join_pw')
        pw2 = request.form.get('join_pw2')
        user_id = request.form.get('user_id')
        print(email, pw, pw2, user_id)
        return render_template('join_success.html')
    else:
        return render_template('join.html')

@app.route("/password_reset")
def login():
    return render_template('password_reset.html')


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/test')
def connection_mongodb():
    print(conn.list_database_names())
    print(db.list_collection_names())
    # col.insert_one(
    #     {'user_id':'test1',
    #     'password': 1111,
    #     'user_ide':'test1'})

    print(list(col.find()))
    return jsonify({"":'list(col.find())'})
