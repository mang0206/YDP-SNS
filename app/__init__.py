from flask import Flask
import pymongo

app = Flask(__name__)
app.config["SECRET_KEY"] = "sns"
app.config['JSON_AS_ASCII'] = False

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
from app import views
