from flask import Flask
import pymongo

app = Flask(__name__)

conn = pymongo.MongoClient("mongodb://root:ydp111@13.125.216.105:27017/root")

from app import views
