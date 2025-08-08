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
        return [[str(e)]]
    
def re_encrypt_all_user_data(new_masterpass,row_data):
    '''Retorna json con Data encriptada'''
    id,title,user_name,password,url,notes=row_data
    return {
        "id":id,
        "title":encriptar(title,new_masterpass),
        "user_name":encriptar(user_name,new_masterpass),
        "password":encriptar(password,new_masterpass),
        "url":encriptar(url,new_masterpass),
        "notes":encriptar(notes,new_masterpass)
    }
    
