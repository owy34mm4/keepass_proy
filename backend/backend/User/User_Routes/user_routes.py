from flask import Blueprint
from backend.backend.User.User_Controller.user_controller import user_add_data,user_read_all_data,user_update_data_by_id,user_delete_data_by_id,user_rotate_masterpass_and_items_hash

user_bp= Blueprint('user',__name__)

user_bp.route('/add_data',methods=['POST'])(user_add_data)
user_bp.route('/read_all_data',methods=['GET'])(user_read_all_data)
user_bp.route('/update_data_by_id',methods=['PUT'])(user_update_data_by_id)
user_bp.route('/delete_data_by_id',methods=['DELETE'])(user_delete_data_by_id)
user_bp.route('/change_masterpass',methods=['PUT'])(user_rotate_masterpass_and_items_hash)

