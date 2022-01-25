import pymongo
from bson.objectid import ObjectId

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
db = conn.get_database('root')
col = db.get_collection('user')
def modify_user():
    lst = []
    ''' 유저마다 닉네임 추가'''
    # for i in col.find({},{'user_id':True, 'user_ide':True}):
    #     lst.append(i['user_id'])
    # # print(lst)
    # name = ['test', 'aa', 'bb', 'cc', 'dd', "ee"]
    # # for i in range(len(lst)):
    # #     col.update_one(
    # #         {'user_id':lst[i]},
    # #         {'$set':{'name':name[i]}}
    # #     )
    # for i in col.find({},{'user_id':True, 'user_ide':True}):
    #     print(i)
    '''유저에 친구 목록 리스트 추가'''
    for user in col.find():
        print(user)
    return

def modify_user_one():
    '''유저에 친구 목록 리스트 추가'''
    # result = col.update_many(
    #     {},
    #     {'$set':{'friend_list':[]}}
    # )
    # result = col.update_many(
    #     {},
    #     {'$unset': {'friend':1}}
    # )
    # return
    result = col.update_many(
        {},
        {'$set': {'profile_img': None }}
    )

def del_user():
    lst = []
    for i in col.find({}):
        # lst.append(i['user_id'])
        print(i)
    # print(lst)
    result = col.delete_one({
        # '_id': ObjectId('61d00cdeba8833acb1019a6b')
        '_id': ObjectId('61dc1006c540a7b3d8829150')
    })
    print(result.deleted_count)

def search():
    search_user = col.find({})
    for i in search_user:
        print(i)
    # s = col.aggregate([ 
    #     {"$group": {"_id": "$user_id", "unique_ids": {"$addToSet": "$_id"},
    #      "count": {"$sum": 1}}}, {"$match": {"count": { "$gte": 2 }}} 
    #      ])
    # print(list(s['_id']))

# del_user()
# search()
# modify_user_one()
# search()