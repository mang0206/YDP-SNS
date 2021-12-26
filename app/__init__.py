from flask import Flask
import pymongo

app = Flask(__name__)

# conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root")
# conn = pymongo.MongoClient("mongodb://13.125.216.105:27017/")
conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
from app import views
