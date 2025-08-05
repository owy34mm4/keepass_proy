from backend.APIs.db_sqlite import ConexionSQLite
from backend.Middlewares.kwargs_checker.kwargs_checker import kwargs_checker,dynamic_query_generator

class ConexionUserSQLite(ConexionSQLite):
    def __init__(self):
        super().__init__()
    
    @ConexionSQLite.check_conn
    def get_masterpass(self,id):
        '''Retorna la Array[Masterpass] y boolean'''
        try:
            self.cursor.execute("select masterpass from users where id=(?)",(id,))
            data = self.cursor.fetchall()
            if not data:
                return [],False
            return data[0], True 
        except Exception as e:
            return [],False

    @ConexionSQLite.check_conn 
    def add_data(self,**kwargs):
        '''Retorna String y Boolean\n
    Donde String es un mensaje y Boolean un controlador\n
    Esta funcion se encarga de generar la insercion en SQLite de los datos'''
        msj, retorno= kwargs_checker(["title","user_name","password","url","notes","user_id"],**kwargs)
        if not retorno:
            return msj,control
        msj,valores,control=dynamic_query_generator(1,"data",**kwargs)
        if not control:
            return f"Error en la insercion --> {msj}",False
        self.cursor.execute(msj,valores)
        self.conn.commit()
        return "Insercion Exitosa",True
    
    @ConexionSQLite.check_conn
    def get_all_data(self,user_id):
        '''Retorna Array de Tupla [()] y Boolean\n
    Funcion Encargada de traer toda la data relacionada a un usuario-> Retorna valores encriptados'''
        try:
            self.cursor.execute("select id,title,user_name,password,url,notes from data where user_id=(?)",(user_id,))
            resp= self.cursor.fetchall()
            if not resp:
                return [()],False
            return resp,True
        except Exception as e:
            return [(e)],False

    @ConexionSQLite.check_conn
    def update_data_by_id(self,**kwargs):
        '''Actualiza los datos de un item, filtrando por id e id_usuario\n
    Retorna String y Boolean\n
    Recibe un json->KWARGS el cual debe contener la data encriptada junto a user_id e item_id '''
        msj,control= kwargs_checker(["title","user_name","password","url","notes","user_id","item_id"],**kwargs)
        if not control:
            return msj,control
        msj,valores,control=dynamic_query_generator(2,"data",kwargs["item_id"],**kwargs)
        if not control:
            return msj,control
        print(msj)
        self.cursor.execute(msj,valores)
        self.conn.commit()
        return "Insercion Exitosa", True

    @ConexionSQLite.check_conn
    def delete_data_by_id(self,**kwargs):
        '''Elimina los datos de un item, a través de su id y el id del usuario\n
    Retorna String y Boolean\n
    Recibe un json con la siguente informacion ->KWARGS ---> user_id - item_id
    '''
        return "",False
ConexionUser= ConexionUserSQLite()
