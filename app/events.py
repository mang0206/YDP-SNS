from flask import session
from flask_socketio import emit
from bson.objectid import ObjectId
import pymongo

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
db = conn.get_database('root')
col = db.get_collection('user')
col_post = db.get_collection('post')
col_comment = db.get_collection('comment')
col_notice = db.get_collection('notice')
def socketio_init(socketio):
    
    @socketio.on('connect')
    def test():
        retMessage = { 'msg' : "hello response11" }
        emit('connect', retMessage)

    @socketio.on('testSocket')
    def testEvent(message):
        # tsession = session.get('test')
        print('received message='+ message)
    
    @socketio.on('like_post')
    def like_notice(message):
        print(message)
        message = col_notice.find(
            {'$and': [
                    {'notice_user' : message['create_user']},
                    {'reaction_user.nickame' : message['session_user']},
                    {'kind' : message['kind']}]
            }).sort('time').limit(1)
        message = list(message)
        # col_notice.find({
        #             'notice_user' : message['create_user'],
        #             'reaction_user' : {'nickname': session['nickname'], 'profile_img':session['profile_img']},
        #             'kind' : 'like',
        #             'time' : dt.datetime.now().strftime("%Y-%m-%d-%H-%M-%S"),
        #             'check' : False
        # })
        # nickname = session.get('nickname')
        # post = col_post.find_one({'_id':ObjectId(message['post_id'])})
        # retMessage = { 'msg' : nickname + " 님이 좋아요 누름", 'post_nickname': post['create_user_nickname'] }
        print('message = ',message)
        # message['_id'] = str(message['_id'])
        emit('test2',message, broadcast=True) 
