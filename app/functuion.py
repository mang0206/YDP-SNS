### 이미지 지정 함수 
# from crypt import methods
import gridfs
import codecs
import re
from . import app, conn
from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = conn.get_database('root')
fs = gridfs.GridFS(db)

def get_user_image(user, kind_img):
    user_img = fs.get(user[kind_img])
    base64_data = codecs.encode(user_img.read(), 'base64')
    user[kind_img] = base64_data.decode('utf-8')
     
@app.route('/check_password', methods=['POST'])
def check_password():
    if request.method == 'POST':
        # data = request.get_json()
        col_user = db.get_collection('user')        

        reset_pw = request.form['password']
        reset_pw = bcrypt.generate_password_hash(reset_pw)

        col_user.update_one(
                {'user_email': session['send_email']},
                {'$set' : {'password': reset_pw}}
            )

        # 비밀번호 유효성 검사
        # if not re.findall('[a-z]', reset_pw) or \
        # not re.findall('[A-Z]', reset_pw) or \
        # not re.findall('[0-9]+', reset_pw):
            # 통과하지 못 할 경우 false 전달
            # check_password = False
            # return jsonify(result = "success", check_password=check_password)

        # else:
            # check_password = True
 
            # col_user.update_one(
                # {'user_id': session['login']},
                # {'$set' : {'password': reset_pw}}
            # )
            # print(reset_pw)
            # return jsonify(result = "success", check_password=check_password)
            
        return redirect(url_for('login'))
    