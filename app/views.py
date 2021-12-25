from flask import request, render_template, jsonify
from . import app, conn

@app.route("/login")
def login():
    return render_template('login.html')

@app.route('/join', methods=['GET',"POST"])
def join():
    if request.method == "POST" :
        email = request.form.get('join_email')
        password = request.form.get('join_pw')
        password = request.form.get('join_pw2')
        user_id = request.form.get('user_id')
        

    return render_template('join.html')

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
