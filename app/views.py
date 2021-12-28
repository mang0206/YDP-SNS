from flask import request, render_template, jsonify, redirect, url_for
from . import app, conn

@app.route("/login")
def login():
    return render_template('login.html')

@app.route('/join', methods=['GET',"POST"])
def join():
    if request.method == "POST" and request.form.get('submit_btn') == "join_form":
        email = request.form.get('join_email')
        pw = request.form.get('join_pw')
        pw2 = request.form.get('join_pw2')
        user_id = request.form.get('user_id')

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
    print(conn)
    db = conn.get_database('root')
    col = db.get_collection('test')
    col.insert_one({'Hello':'World'})
    print(conn.list_database_names())
    print(db.list_collection_names())
    return jsonify({"":list(col.find())})
