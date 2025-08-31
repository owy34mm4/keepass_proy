from backend.APIs.db_sqlite import ConexionSQLite 

class ConexionAuthSQLite(ConexionSQLite):
    def __init__(self):
        super().__init__()

    @ConexionSQLite.check_conn
    def check_login(self,user,password):
        '''Comprueba login\n
    Retorna el id del user , Boolean'''
        try:
            self.cursor.execute("select id from users where username=(?) and masterpass=(?)",(user,password))
            ret = self.cursor.fetchall()
            if not ret:
                return "",False
            return ret[0][0],True
        except Exception as e:
            return str(e),False
            

ConexionAuth = ConexionAuthSQLite()