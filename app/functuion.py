### 이미지 지정 함수 
# from crypt import methods
from asyncio.windows_events import NULL
from sre_constants import SUCCESS
import gridfs
import codecs
import re
from . import app, conn
from flask import request, render_template, jsonify, redirect, url_for, session, flash
from flask_bcrypt import Bcrypt
import boto3

import datetime as dt

bcrypt = Bcrypt()
db = conn.get_database('root')
fs = gridfs.GridFS(db)

def s3_connection():
    try:
        s3 = boto3.client(
            service_name="s3",
            region_name="ap-northeast-2", # 자신이 설정한 bucket region
            aws_access_key_id='AKIAYFTWJFXVINK7YLUL',
            aws_secret_access_key='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',
        )
    except Exception as e:
        print(e)
    else:
        print("s3 bucket connected!")
        return s3

s3 = s3_connection()

## db에 저장된 이미지 가지고 오는 함수
def get_user_image(user, kind_img):
    user_img = fs.get(user[kind_img])
    base64_data = codecs.encode(user_img.read(), 'base64')
    user[kind_img] = base64_data.decode('utf-8')
     
def get_friend_list(user):
    col_user = db.get_collection('user')
    return col_user.find_one({'user_id' : user}, {'_id':0, 'friend_list':1})['friend_list']

def get_friend_dic(search_list, background=False):
    friend_dic = {}
    col_user = db.get_collection('user')
    for _user in search_list:
        friend_dic[_user] = col_user.find_one({'user_id': _user})
    
    # for key in friend_dic:
    #     get_user_image(friend_dic[key], 'profile_img')
    #     if background:
    #         get_user_image(friend_dic[key], 'background_img')
    return friend_dic

def s3_put_object(s3, bucket, file, filename, file_kind = 'images'):
    """
    s3 bucket에 지정 파일 업로드
    :param s3: 연결된 s3 객체(boto3 client)
    :param bucket: 버킷명
    :param file: 저장할 파일
    :param filename: 저장 파일명
    :return: 성공 시 True, 실패 시 False 반환
    """
    try:
        s3.put_object(
            Body = file,
	        Bucket = bucket,
            Key = f'{file_kind}/{filename}',
            ContentType = file.content_type
        )
    except Exception as e:
        return False
    return True

def s3_get_image_url(s3, filename, file_kind = 'images'):
    """
    s3 : 연결된 s3 객체(boto3 client)
    filename : s3에 저장된 파일 명
    """
    location = s3.get_bucket_location(Bucket='ydpsns')["LocationConstraint"]
    return f"https://{'ydpsns'}.s3.{location}.amazonaws.com/{file_kind}/{filename}"

def s3_delete_image(filename):
    print('delete =', f'images/{filename}')
    s3.delete_object(Bucket='ydpsns',Key=f'images/{filename}')

@app.route('/check_password', methods=['GET','POST'])
def check_password():

    if 'password' in request.form:
        print('request post!')
        # data = request.get_json()
        col_user = db.get_collection('user')        
        
        reset_pw = request.form['password']
        print(reset_pw)

        reset_pw = bcrypt.generate_password_hash(reset_pw)

        try:
            #password_reset 비밀번호 변경
            col_user.update_one(
                    {'user_email': session['send_email']},
                    {'$set' : {'password': reset_pw}}
                )
        except:
            #setting 비밀번호 변경
            col_user.update_one(
                    {'user_id': session['login']},
                    {'$set' : {'password': reset_pw}}
                )

        flash('비밀번호가 정상적으로 변경되었습니다! 새로운 비밀번호로 로그인 해주세요 :)')
        
        session['login'] = None

        return redirect(url_for('login'))
    