from backend.Logger.LoggerUtil import error_logs_wrapper

# Importamos lo necesario de la librería cryptography y otras utilidades estándar
from cryptography.fernet import Fernet     # Para cifrar y descifrar texto de forma segura
import base64                               # Para codificar/decodificar en base64 (lo que usa Fernet)
import hashlib                              # Para transformar nuestra clave de texto a una forma segura

@error_logs_wrapper
def generar_clave_desde_password(password):
    '''Esta función toma tu contraseña y la convierte en una clave válida para Fernet\n
No usar individualmente'''
    hash = hashlib.sha256(password.encode())           # Convierte el string en un hash de 32 bytes
    clave = base64.urlsafe_b64encode(hash.digest())    # Codifica esa clave en base64 segura
    return clave

@error_logs_wrapper
def encriptar(texto, password):
    '''Recibe "Texto" y "Password"\n
Retorna el texto encriptado con la password brindada'''
    clave = generar_clave_desde_password(password)   # Generamos una clave segura desde la contraseña
    f = Fernet(clave)                                # Creamos un objeto Fernet con esa clave
    token = f.encrypt(texto.encode())                # Encriptamos el texto (convertido a bytes)
    return token                                     # Devolvemos el texto encriptado

@error_logs_wrapper
def desencriptar(token, password):
    '''Recibe texto encriptado y masterpass\n
Retorna el texto desencritado con la masrtepass'''
    clave = generar_clave_desde_password(password)   # Usamos la misma clave para desencriptar
    f = Fernet(clave)                                # Creamos un objeto Fernet con esa clave
    texto = f.decrypt(token).decode()                # Desencriptamos y convertimos a string
    return texto                                     # Devolvemos el texto original