#Objeto para acceder a la BD
from backend.User.User_DB.db_user import ConexionUser 
#Middlewares encargados de encrptar y desencriptar
from backend.Middlewares.encrypter.encrypter_lib import encriptar, desencriptar
from backend.Middlewares.encrypter.transformer_all_user_data import decrypt_all_user_data
#Middleware para convertir formato de datos
from backend.Middlewares.cursor_to_dict.cursor_to_dict import to_dict
#Middleware para los Excel de descarga
from backend.Middlewares.kwargs_checker.kwargs_checker import kwargs_checker
from backend.Middlewares.export_user_data.parquet_generator.generate_data_parquet import generate_data_parquet
from backend.Middlewares.export_user_data.parquet_generator.delete_data_parquet import delete_data_parquet
from backend.Middlewares.export_user_data.parquet_to_excel_in_memory.parquet_to_excel_in_memory import parquet_to_excel_in_memory
#Flask
from flask import request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity


@jwt_required()
def user_add_data():
    '''Perteneciente al controlador de usuario\n
Recibe directamente la peticion, procesa toda la logica intermedia, a través de middleware\n
Encripta los datos recibidos en texto plano, usando la masterpass\n
Retorna HTTPResponse'''
    user_id=get_jwt_identity()
    data = request.get_json()
    msj, control =kwargs_checker(["title","user_name","password","url","notes"],**data)
    if not control:
        return jsonify(msg=msj),400
              
    masterpass,control=ConexionUser.get_masterpass(user_id,closing=True)
    if not control:
        return jsonify(msg="No se encontró masterpass valida")
    masterpass=masterpass[0]
    
    json_data={
                "title":encriptar(data.get("title",''),masterpass),
                "user_name":encriptar(data.get("user_name",''),masterpass),
                "password":encriptar(data.get("password",''),masterpass),
                "url":encriptar(data.get("url",''),masterpass),
                "notes":encriptar(data.get("notes",''),masterpass),
                "user_id":user_id
               }
    msj,control =ConexionUser.add_data(closing=True,**json_data)
    if not control:
        return jsonify(msg=f"Error {msj}"),400
    return jsonify(msg=msj),200

@jwt_required()
def user_read_all_data():
    user_id = get_jwt_identity()
    masterpass, control= ConexionUser.get_masterpass(user_id,closing=True)
    if not control:
        return jsonify(msg="No se encontró masterpass, Vuelva a Iniciar Sesion")
    masterpass=masterpass[0]

    data_t,control=ConexionUser.get_all_data(user_id,closing=True)
    data = [list(fila) for fila in data_t]
    if not control:
        return jsonify(msg=f"Error {data}")
    
    campos=["id","title","user_name","password","url","notes"]
    for tupla in range(len(data)):
        print(f"Fila --> {tupla}")
        for dato in range(len(data[tupla])):
            if dato ==0:
                continue
            data[tupla][dato]=desencriptar(data[tupla][dato],masterpass)          
    ret = to_dict(campos,data)
    return jsonify(msg="Fetch Exitoso", ret = ret)
    
@jwt_required()
def user_update_data_by_id():
    user_id=get_jwt_identity()
    masterpass,control=ConexionUser.get_masterpass(user_id,closing=True)
    if not control:
        return jsonify(msg="No se pudo obtener masterpass, Vuleva a iniciar Sesion"),400
    masterpass=masterpass[0]

    data = request.get_json()
    print(data)
    json_data={
                "title":encriptar(data.get("title"),masterpass),
                "user_name":encriptar(data.get("user_name"),masterpass),
                "password":encriptar(data.get("password"),masterpass),
                "url":encriptar(data.get("url"),masterpass),
                "notes":encriptar(data.get("notes"),masterpass),
                "user_id":user_id,
                "id":data.get("id")
               }
    msj,control=ConexionUser.update_data_by_id(closing=True,**json_data)
    if not control:
        return jsonify(msg=msj),400

    return jsonify(msg=msj,data=data),200

@jwt_required()
def user_delete_data_by_id():
    data=request.get_json()
    json_data={
                "user_id":get_jwt_identity(),
               "id":data.get("id",'')
               }
    if json_data["id"]=='':
        return jsonify(msg="No se relacionó un item valido"),400
    msj,control=ConexionUser.delete_data_by_id(closing=True,**json_data)
    if not control:
        return jsonify(msg=msj),400
    return jsonify(msg=msj),200
    
@jwt_required()
def user_rotate_masterpass_and_items_hash():
    data= request.get_json()
    user_id=get_jwt_identity()
    json_data={
        "masterpass":data.get("masterpass",'')
    }

    msj,control=ConexionUser.user_change_masterpass_and_every_item_hash(user_id,closing=True,**json_data)
    if not control:
        return jsonify(msg=msj),400
    return jsonify(msg=msj),200

@jwt_required()
def user_download_data():
    user_id=get_jwt_identity()
    cursor,control=ConexionUser.get_all_data(user_id)
    if not control:
        return jsonify(msg=cursor),400
    masterpass,control=ConexionUser.get_masterpass(user_id)
    if not control:
        return jsonify(msg=masterpass[0]),400
    masterpass=masterpass[0]
    data_matrix=decrypt_all_user_data(masterpass,cursor)
    msj,control,abspath_file=generate_data_parquet(data_matrix)
    if not control:
        return jsonify(msg=msj),400
    excel_buffer,control= parquet_to_excel_in_memory(abspath_file)
    if not control:
        return jsonify(msg=excel_buffer),400
    msj,control=delete_data_parquet(abspath_file)
    if not control:
        return jsonify(msg=msj),400
    return send_file(excel_buffer,
                     mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                     as_attachment=True,
                     download_name='data_exported.xlsx'),200

