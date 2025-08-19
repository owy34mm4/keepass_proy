import sqlite3
from os.path import abspath,dirname,join 
from functools import wraps
import threading


class ConexionSQLite():
    '''Clase Padre\n
    Abre conexion y habilita pragma FOREIGN KEY\n
    Establece Funcionamiento desde el __INIT__'''
    def __init__(self):
        '''Init de la clase padre "ConexionSQLite'''
        #Bloqueo de hilo REentraante
        self._lock = threading.RLock()
        self._dbpath=abspath(join(dirname(__file__),'Data','db_pass.db'))
        self.conn=sqlite3.connect(self._dbpath,check_same_thread=False)
        self.cursor=self.conn.cursor()
        self.cursor.execute("PRAGMA foreign_keys= ON")

    @staticmethod
    def check_conn(function):
            '''Decorador que engloba multifuncion\n
        Sí se le pasa el kwarg {closing} con valor TRUE a la funcion decorada este se encarga de cerrar la conexion al finalizar el metodo
        -Establece la creacion y cierre de la conexion en cada metodo\n
        -Establece el bloqueo de hilo durante la ejecucion\n
        Ahorrando lineas de codigo y evitando posibles fallas a futuro
        '''
            @wraps(function)
            def funcion_decorada(self,*args,closing=None,**kwargs):
                with self._lock:
                    try:
                        self.cursor.execute("select 1")
                    except (AttributeError, sqlite3.ProgrammingError):
                        #Si no existe o si está cerrada
                        self.conn= sqlite3.connect(self._dbpath,check_same_thread=False)
                        self.cursor=self.conn.cursor()
                        self.cursor.execute("PRAGMA foreign_keys= ON")
                    try:
                        funcion= function(self,*args,**kwargs)
                        return funcion
                    finally:
                        #Cierra al final de la ejecucion
                        if closing!=None:
                            print("closing")
                            self.cursor.close()
                            self.conn.close()
                            self.cursor=None
                            self.conn= None
                        
            return funcion_decorada
    

    

    

