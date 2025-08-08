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

