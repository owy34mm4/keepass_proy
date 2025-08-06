from flask import Blueprint
from backend.Controllers.auth_controller import login, protegido,logout

auth_bp= Blueprint('auth',__name__)

auth_bp.route('/login',methods=['POST'])(login)
auth_bp.route('/logout',methods=['POST'])(logout)
auth_bp.route('/protegido',methods=['GET'])(protegido)




