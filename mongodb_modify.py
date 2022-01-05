import pymongo
from bson.objectid import ObjectId

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
db = conn.get_database('root')
col = db.get_collection('user')
def modify_user():
    lst = []
    for i in col.find({},{'user_id':True, 'user_ide':True}):
        lst.append(i['user_id'])
    # print(lst)
    name = ['test', 'aa', 'bb', 'cc', 'dd', "ee"]
    # for i in range(len(lst)):
    #     col.update_one(
    #         {'user_id':lst[i]},
    #         {'$set':{'name':name[i]}}
    #     )
    for i in col.find({},{'user_id':True, 'user_ide':True}):
        print(i)
    return

def modify_user_one():
    result = col.update_one(
        {'user_ide':'eee'},
        {'$set':{'name':'abcd'}}
    )
    return


def del_user():
    lst = []
    for i in col.find({}):
        # lst.append(i['user_id'])
        print(i)
    # print(lst)
    result = col.delete_one({
        # '_id': ObjectId('61d00cdeba8833acb1019a6b')
        # '_id': ObjectId('61d00d0dba8833acb1019a6e')
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
search()
# modify_user_one()