from backend.Logger.LoggerUtil import Logger

def dynamic_query_generator(valor_case,tabla_objetivo,where=None,**kwargs):
    '''Recibe un valor de matchCase, el nombre de la tabla objetivo,y el valor establecido para el where(edicion), junto al json de datos a integrar en la consulta\n
Retorna String, Array y Boolean\n
Si el {valor_case}==1 entonces retorna consulta de insercion\n
Si el {valor_case}==2 entonces retorna consulta de actualizacion\n
Si el {valor_case}==3 entonces retorna consulta de eliminacion\n
Si el {valor_case}==4 entonces retorna consulta de actualizacion masterpass'''
    try:
        #Inicializamos las listas con las que entraremos en la insercion dinamica
        columnas=[]
        valores=[]
        #Agregamos el contenido de los **kwargs a las listas
        for clave, valor in kwargs.items():
            if clave=="user_id" or  clave=="id" or clave=='closing':
                continue
            columnas.append(clave)
            valores.append(valor)
        
        #Construimos la query
        match valor_case:
            case 1:
                '''Consulta insercion'''
                columnas.append("user_id")
                valores.append(kwargs["user_id"])
                columnas_string=', '.join(columnas)
                placeholders_string=',  '.join(['?']*len(valores))
                query_generada=f"insert into {tabla_objetivo} ({columnas_string}) values ({placeholders_string})"
                return query_generada,valores,True
            case 2:
                '''Consulta Actualizacion'''
                valores.append(int(where))
                valores.append(int(kwargs["user_id"]))
                set_clause = ', '.join([f"{col} = ?" for col in columnas])
                query_generada=f"update {tabla_objetivo} set {set_clause} where id = ? and user_id= ?"
                return query_generada,valores,True
            case 3:
                '''Consulta eliminacion'''
                valores.append(kwargs["user_id"])
                valores.append(kwargs["id"])
                query_generada= f"delete from {tabla_objetivo} where user_id=? and id=?"
                return query_generada,valores,True
            case 4:
                '''Consulta Actualizacion'''
                valores.append(where)
                set_clause = ', '.join([f"{col} = ?" for col in columnas])
                query_generada=f"update {tabla_objetivo} set {set_clause} where id = ?"
                return query_generada,valores,True
            case _:
                return "Valor case no valido, usa los valores establecidos en la documentacion",[], False

    except Exception as e:
        string_error=f"Error en query gen ->{e}"
        Logger.generate_log_error(string_error)
        return string_error,[],False