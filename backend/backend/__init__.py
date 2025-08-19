from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from os import getenv
from backend.Auth.Auth_Routes.auth_routes import auth_bp
from backend.User.User_Routes.user_routes import user_bp
from dotenv import load_dotenv

class Config:
    '''Configura todo lo relacionado al webtoken'''
    load_dotenv()
    SECRET_KEY = getenv('SECRET_KEY')
    JWT_SECRET_KEY = getenv('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 6000  # 10 minutos
    JWT_TOKEN_LOCATION = ['cookies']            # ← Obligatorio
    JWT_COOKIE_SECURE = False         # True en producción (https)
    JWT_COOKIE_HTTPONLY = True        # Evita acceso por JS
    JWT_ACCESS_COOKIE_NAME = 'access_token_cookie'
    JWT_COOKIE_CSRF_PROTECT = False  # ← Desactívalo para pruebas
    JWT_COOKIE_SAMESITE='Lax'

jwt= JWTManager()

def crear_app():
    '''Funcion inicializadora de proyecto\n
Crea un objeto app(Flask) el cual contiene todo el aplicativo\n
en esta funcion es donde se relaiconan todas las configuraciones e inicializaciones relacionadas al APP'''
    app=Flask(__name__)
    app.config.from_object(Config)
    CORS(app,
         origins=["http://localhost:3000",
                "http://frontend:3000"
                  ],
         supports_credentials=True,
         expose_headers=True,
         allow_headers="*",
         send_wildcard=True)
    jwt.init_app(app)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/user')

    return app