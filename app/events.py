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
        notice = col_notice.find(
            {'$and': [
                    {'notice_user' : message['create_user']},
                    {'reaction_user.nickname' : message['session_user']},
                    {'kind' : message['kind']}]
            }).sort('time', pymongo.DESCENDING).limit(1)
        notice = list(notice)
        print('message = ',notice)
        if len(notice):
            notice[0]['_id'] = str(notice[0]['_id'])
        emit('like_notice',notice, broadcast=True)

    @socketio.on('comment_post')
    def comment_notice(message):
        print(message)
        if message['kind'] == 'append_reply':
            notice = col_notice.find(
                {'$and': [
                        {'notice_user' : message['create_user']},
                        {'reaction_user.nickname' : message['session_user']},
                        {'kind' : 'reply'}]
                }).sort('time', pymongo.DESCENDING).limit(1)
            notice = list(notice)
            print('message = ',notice)
            notice[0]['_id'] = str(notice[0]['_id'])
            emit('comment_notice',notice, broadcast=True) 
        else :
            notice = col_notice.find(
                {'$and': [
                        {'notice_user' : message['create_user']},
                        {'reaction_user.nickname' : message['session_user']},
                        {'kind' : 'comment'}]
                }).sort('time', pymongo.DESCENDING).limit(1)
            notice = list(notice)
            print('message = ',notice)
            notice[0]['_id'] = str(notice[0]['_id'])
            emit('comment_notice',notice, broadcast=True) 


    @socketio.on('mention')
    def mention_notice(message):
        print(message)
        notice = col_notice.find(
            {'$and': [
                    {'notice_user' : message['create_user']},
                    {'reaction_user.nickname' : message['session_user']},
                    {'kind' :'mention'}]
            }).sort('time', pymongo.DESCENDING).limit(1)
        notice = list(notice)
        # print('message = ',message)
        # if len(message):
        #     message[0]['_id'] = str(message[0]['_id'])
        emit('mention_notice',notice, broadcast=True) 
