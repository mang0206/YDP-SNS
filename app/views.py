from flask import request, render_template
from . import app

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

@app.route("/index")
def index():
    return render_template('index.html')