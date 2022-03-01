from flask import Flask
import pymongo
import boto3
from flask_socketio import SocketIO

socketio = SocketIO(logger=True,engineio_logger=True)

def create_app(debug=False):
    app = Flask(__name__)
    app.debug = debug
    app.config["SECRET_KEY"] = "sns"
    app.config['JSON_AS_ASCII'] = False
    # 메일 인증 기능
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USERNAME"] = "ydpsns.project@gmail.com" 
    app.config["MAIL_PASSWORD"] = "gqizwnzhwaxwrjjj"
    app.config["MAIL_USE_TLS"] = True 

    socketio.init_app(app)
print(dir(socketio))
app = create_app(debug=True)
# socketio = SocketIO(app)

conn = pymongo.MongoClient("mongodb://root:study111@13.125.71.134:27017/root?authSource=admin")
from app import views


