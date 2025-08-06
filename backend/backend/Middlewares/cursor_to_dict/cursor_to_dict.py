def to_dict(lista_campos,retorno_cursor):
    '''Recibe una lista[Array] en la cual se contienen los campos esperados, tambien espera una Lista de tuplas [()] con el contenido retorno de un cursor.fetchall() desencriptado
\nRetorna un diccionario compuesto por el retorno del cursor, organizado en formato k,v'''

    ret={}
    contador=1
    for fila in retorno_cursor:
        fila_dict=dict(zip(lista_campos,fila))
        ret[contador]=fila_dict
        contador+=1
    return ret

###
#Defectuosa
    # ret={}
    # for iterable in range(1,len(retorno_cursor)+1):
    #     ret[iterable]={}
    #     for campo in lista_campos:
    #         ret[iterable][campo]=''
    # return ret
##
###
### 
# Defectuosisima
  # print(retorno_cursor)
    # for iterable in range(1,len(retorno_cursor)+1):
    #     for fila in retorno_cursor:
    #         fila_dict=dict(zip(lista_campos,fila))
    #         ret[iterable]=fila_dict
    # return ret

#####