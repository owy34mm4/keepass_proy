from backend.Logger.LoggerUtil import Logger, error_logs_wrapper
from backend.Middlewares.encrypter.encrypter_lib import desencriptar,encriptar

def decrypt_all_user_data(masterpass,tuple_array_info):
    '''Recibe como parametor la masterpass valdia para desencriptar, así como un array de tuplas [()] con la informacion del usuario\n
Retorna Arry de Array con los datos desencriptados '''
    try:
        datos_desencriptados=[]
        for fila in tuple_array_info:
            id_item=fila[0]
            title= desencriptar(fila[1],masterpass)
            user_name= desencriptar(fila[2],masterpass)
            password= desencriptar(fila[3],masterpass)
            url= desencriptar(fila[4],masterpass)
            notes= desencriptar(fila[5],masterpass)
            datos_desencriptados.append((id_item,title,user_name,password,url,notes))
        return datos_desencriptados
    except Exception as e:
        Logger.generate_log_error(f"Error en middleware/encrypter/tranformer_all_usr_dt/decrypt/all_usr/dt||| {str(e)}")
        return [[str(e)]]

@error_logs_wrapper
def re_encrypt_all_user_data(new_masterpass,user_id,row_data):
    '''Retorna json con Data encriptada'''
    print(f"row data --> {row_data}")
    id,title,user_name,password,url,notes=row_data
    j_data={
        "user_id":user_id,
        "title":encriptar(title,new_masterpass),
        "user_name":encriptar(user_name,new_masterpass),
        "password":encriptar(password,new_masterpass),
        "url":encriptar(url,new_masterpass),
        "notes":encriptar(notes,new_masterpass)
    }
    return j_data
    
