// 비밀번호 변경 유효성 검사
import {password_validation} from './check_password.js';
document.getElementById('pw').addEventListener('keyup', password_validation);
document.getElementById('pw2').addEventListener('keyup', password_validation);
