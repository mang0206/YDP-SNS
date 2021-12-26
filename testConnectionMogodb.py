import pymongo
import pprint
# conn = pymongo.MongoClient("mongodb://13.125.216.105:27017/")
# conn = pymongo.MongoClient("mongodb://admin:study111@13.125.216.105:27017/admin")
# conn = pymongo.MongoClient("mongodb://root:study111@13.125.216.105:27017/admin")
# conn = pymongo.MongoClient("mongodb://user:ydp111@13.125.216.105:27017/root")
# conn = pymongo.MongoClient("mongodb://root:study111@13.125.216.105:27017/user?ssl=true&ssl_cert_reqs=CERT_NONE")
# conn = pymongo.MongoClient("mongodb://admin:study111@13.125.216.105:27017/admin?ssl=true&ssl_cert_reqs=CERT_NONE")
# conn = pymongo.MongoClient("mongodb://root:study111@13.125.216.105:27017/admin?ssl=true&ssl_cert_reqs=CERT_NONE")
# conn = pymongo.MongoClient(f"mongodb://13.125.216.105:27017/root")
# conn = pymongo.MongoClient(f"mongodb://admin:study111@MJ:study111@13.125.216.105:27017/admin")
# conn = pymongo.MongoClient(f"mongodb://root:study111@{}13.125.216.105:27017/root".format(MJ:study111))
conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")

print('test',conn.list_database_names())

db = conn.get_database('root')
print(db.list_collection_names())
# db = conn.root
col = db.get_collection('test')
# col = db.test

# pprint(col.find_one())
print(list(col.find_one()))
print(list(col.find()))
