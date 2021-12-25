from flask import Flask
import pymongo

app = Flask(__name__)

conn = pymongo.MongoClient("mongodb://user:ydp111@13.125.216.105:27017/")

from app import views
