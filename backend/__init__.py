from flask import Flask
from flask_jwt_extended import JWTManager
import os
from backend.Routes.auth_routes import auth_bp
from backend.Routes.user_routes import user_bp
from dotenv import load_dotenv

class Config:
    '''Configura todo lo relacionado al webtoken'''
    load_dotenv()
    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 600  # 10 minutos
    JWT_TOKEN_LOCATION = ['cookies']            # ← Obligatorio
    JWT_COOKIE_SECURE = False         # True en producción (https)
    JWT_COOKIE_HTTPONLY = True        # Evita acceso por JS
    JWT_ACCESS_COOKIE_NAME = 'access_token_cookie'
    JWT_COOKIE_CSRF_PROTECT = False  # ← Desactívalo para pruebas

jwt= JWTManager()

def crear_app():
    '''Funcion inicializadora de proyecto\n
Crea un objeto app(Flask) el cual contiene todo el aplicativo\n
en esta funcion es donde se relaiconan todas las configuraciones e inicializaciones relacionadas al APP'''
    app=Flask(__name__)
    app.config.from_object(Config)
    jwt.init_app(app)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')

    return app