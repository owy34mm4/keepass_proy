from flask import Blueprint
from backend.Controllers.user_controller import user_add_data,user_read_all_data,user_uptade_data_by_id

user_bp= Blueprint('user',__name__)

user_bp.route('/add_data',methods=['POST'])(user_add_data)
user_bp.route('/read_all_data',methods=['GET'])(user_read_all_data)
user_bp.route('/update_data_by_id',methods=['PUT'])(user_uptade_data_by_id)

