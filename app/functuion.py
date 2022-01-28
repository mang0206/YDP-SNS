### 이미지 지정 함수 
import gridfs
import codecs
from . import app, conn

db = conn.get_database('root')
fs = gridfs.GridFS(db)

## db에 저장된 이미지 가지고 오는 함수
def get_user_image(user, kind_img):
    user_img = fs.get(user[kind_img])
    base64_data = codecs.encode(user_img.read(), 'base64')
    user[kind_img] = base64_data.decode('utf-8')
     