from flask import session
from flask_socketio import emit
from bson.objectid import ObjectId
import pymongo

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
db = conn.get_database('root')
col = db.get_collection('user')
col_post = db.get_collection('post')
col_comment = db.get_collection('comment')

def socketio_init(socketio):
    
    @socketio.on('connect')
    def test():
        print('1111111111111111111111111111111111111111111111111111111')
        retMessage = { 'msg' : "hello response11" }
        emit('connect', retMessage)

    @socketio.on('testSocket')
    def testEvent(message):
        # tsession = session.get('test')
        print('================================================================received message='+ message)
        print('-----------------------------------------------------------')
    
    @socketio.on('like_post')
    def testEvent(message):
        print(message)
        nickname = session.get('nickname')
        post = col_post.find_one({'_id':ObjectId(message['post_id'])})
        retMessage = { 'msg' : nickname + " 님이 좋아요 누름", 'post_nickname': post['create_user_nickname'] }
        emit('test2',retMessage)
