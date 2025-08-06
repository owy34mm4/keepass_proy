from backend.APIs.Auth_API.db_auth import ConexionAuth
from flask import request, jsonify, make_response
from flask_jwt_extended import create_access_token, set_access_cookies,unset_jwt_cookies, jwt_required, get_jwt_identity


def login():
    data = request.get_json()
    iden,check_login= ConexionAuth.check_login(data["user"],data["psw"])
    if not check_login:
        return jsonify(msg="Credenciales no asociadas"),400
    acces_token=create_access_token(identity=str(iden))
    resp= make_response(jsonify(acces_token=acces_token, msg = "Inicio Sesion Exitoso"))
    set_access_cookies(resp,acces_token)
    return resp

def logout():
    resp= make_response(jsonify(msg="Sesion Cerrada"))
    unset_jwt_cookies(resp)
    return resp


@jwt_required()
def protegido():
    identidad = get_jwt_identity()
    return jsonify(msg=f"Hola, {identidad}. Acceso concedido.")
