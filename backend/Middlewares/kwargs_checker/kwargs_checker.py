def kwargs_checker(lista_kwargs_esperados,**kwargs):
    '''Recibe una lista[Array] con los nombres de las columans esperadas en la consulta, Tambien recibe el json de la consulta\n
Retorna String y Boolean'''
    max_kwargs=len(lista_kwargs_esperados)
    #Comprobamos que no haya mayor cantidad de kwargs que los esperados
    if len(kwargs)>max_kwargs:
        return "Argumentos Inesperados",False
    #Comprobamos que los kwargs sí sean los esperados
    for k,v in kwargs.items():
        if not k in lista_kwargs_esperados:
            return f"Argumento '{k}' invalido",False   
    return "Kwargs Validos",True

def dynamic_query_generator(valor_case,tabla_objetivo,where=None,**kwargs):
    '''Recibe el nombre de la tabla objetivo, junto al json de datos a integrar en la consulta\n
Retorna String, Array y Boolean\n
Si el {valor_case}==1 entonces retorna consulta de insercion\n
Si el {valor_case}==2 entonces retorna consulta de actualizacion\n'''
    try:
        #Inicializamos las listas con las que entraremos en la insercion dinamica
        columnas=[]
        valores=[]
        #Agregamos el contenido de los **kwargs a las listas
        for clave, valor in kwargs.items():
            if clave=="item_id":
                continue
            columnas.append(clave)
            valores.append(valor)
        #Construimos la query
        match valor_case:
            case 1:
                columnas_string=', '.join(columnas)
                placeholders_string=',  '.join(['?']*len(valores))
                query_generada=f"insert into {tabla_objetivo} ({columnas_string}) values ({placeholders_string})"
                return query_generada,valores,True
            case 2:
                valores.append(where)
                valores.append(kwargs["user_id"])
                set_clause = ', '.join([f"{col} = ?" for col in columnas])
                query_generada=f"update {tabla_objetivo} set {set_clause} where id = ? and user_id= ?"
                return query_generada,valores,True
            
            case _:
                return "Valor case no valido, usa los valores establecidos en la documentacion",[], False

        
    except Exception as e:
        return f"{e}",[],False