from flask import session
from flask_socketio import emit
from bson.objectid import ObjectId
import pymongo

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
db = conn.get_database('root')
col_user = db.get_collection('user')
col_post = db.get_collection('post')
col_comment = db.get_collection('comment')
col_notice = db.get_collection('notice')
def socketio_init(socketio):
    
    @socketio.on('connect')
    def test():
        retMessage = { 'msg' : "hello response11" }
        emit('connect', retMessage)
    
    @socketio.on('friend_request')
    def request_friend_notice(message):
        print(message)
        # user = []
        # users = col_user.find({'$or' :[{'user_id': message['user']},{'user_id': message['id'].split('!')[-1]}]},
        #     {'_id':0, 'nickname':1, 'profile_img':1})
        notice_user = col_user.find_one({'user_id': message['user']}, {'_id': 0, 'nickname':1})

        notice = col_notice.find(
            {'$and': [
                    {'notice_user' : message['id'].split('!')[-1]},
                    {'reaction_user.nickname' : notice_user['nickname']},
                    {'kind' : 'request_friend'}]
            }).sort('time', pymongo.DESCENDING).limit(1)
        notice = list(notice)
        print('message = ',notice)
        if len(notice):
            notice[0]['_id'] = str(notice[0]['_id'])
        emit('request_notice',notice, broadcast=True)
    
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
            print('reply message = ',notice, message['create_user'],  message['session_user'])
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
            print('comment message = ',notice, message['create_user'],  message['session_user'])
            notice[0]['_id'] = str(notice[0]['_id'])
            emit('comment_notice',notice, broadcast=True) 


    @socketio.on('mention')
    def mention_notice(message):
        print('mention message = ', message)
        notice = col_notice.find(
            {'$and': [
                    {'notice_user' : message['mention']},
                    {'reaction_user.nickname' : message['session_user']},
                    {'kind' :'mention'}]
            }).sort('time', pymongo.DESCENDING).limit(1)
        notice = list(notice)
        # print('mention, message = ',notice, message['create_user'], message['session_user'])
        if len(message):
            notice[0]['_id'] = str(notice[0]['_id'])
        emit('mention_notice',notice, broadcast=True) 
