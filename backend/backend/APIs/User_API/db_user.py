from backend.APIs.db_sqlite import ConexionSQLite
from backend.Middlewares.kwargs_checker.kwargs_checker import kwargs_checker
from backend.Middlewares.dinamyc_query_generator.dinamyc_query_generator import dynamic_query_generator
from backend.Middlewares.encrypter.transformer_all_user_data import decrypt_all_user_data,re_encrypt_all_user_data

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
        print(msj)
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
        msj,control= kwargs_checker(["title","user_name","password","url","notes","user_id","id"],**kwargs)
        if not control:
            return msj,control
        msj,valores,control=dynamic_query_generator(2,"data",where=kwargs["id"],**kwargs)
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
        msj,control=kwargs_checker(["id","user_id"],**kwargs)
        if not control:
            return msj,control
        msj,valores,control=dynamic_query_generator(3,"data",where=kwargs["id"],**kwargs)
        if not control:
            return msj,False
        print(valores,msj)
        self.cursor.execute(msj,valores)
        
        self.conn.commit()
        print(self.cursor.rowcount)
        return "Eliminacion Exitosa",True

    ConexionSQLite.check_conn
    def user_change_masterpass_and_every_item_hash(self,user_id,**kwargs):
        '''Recibe json data con full info de los items\n
    Retorna String y Boolean'''
        try:
            # Comprobamos la validez de los kwargs suministrados
            msj,control = kwargs_checker(["masterpass"],**kwargs)
            if not control:
                return msj,False
            #Obtenemos la masterpass original del solicitante
            masterpass,control=ConexionUser.get_masterpass(user_id)
            if not control:
                return masterpass,False
            masterpass=masterpass[0]
            #Obtenemos todos los datos del usuario
            all_encrypted_user_data,control=ConexionUser.get_all_data(user_id)
            
            if not control:
                return all_encrypted_user_data,False
            #Desencriptamos toda la data y la guardamos en una variable
            datos_desencriptados=decrypt_all_user_data(masterpass,all_encrypted_user_data)
            #Actualizamos la masterpass
            msj_or_query,valores,control=dynamic_query_generator(4,"users",user_id,**kwargs)
            if not control:
                return msj_or_query,False
            print(f"Valores  {valores}")
            print(f"query  {msj_or_query}")
            self.cursor.execute(msj_or_query,valores)
            #Re-encriptamos los registros
            print(datos_desencriptados)
            for fila in datos_desencriptados:
                id_item=fila[0]
                encrypted_json_data=re_encrypt_all_user_data(kwargs["masterpass"],user_id,fila)
                
                msj_or_query,valores,control=dynamic_query_generator(2,'data',id_item,**encrypted_json_data)
                print(msj_or_query)
                print(f"Valores  {valores}")
                print(f"query  {msj_or_query}")
                self.cursor.execute(msj_or_query,valores)
                print(self.cursor.rowcount)
                self.conn.commit()
            return "",True
        except Exception as e:
            self.conn.rollback()
            return str(e),False
        

ConexionUser= ConexionUserSQLite()
