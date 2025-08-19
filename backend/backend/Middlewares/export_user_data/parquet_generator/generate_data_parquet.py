import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from os.path import abspath,dirname,join

def generate_data_parquet(tuple_array_info):
    '''Recibe un array de tuplas con la informacion desencriptada de lo que hay almacenado en la base de datos del cliente\n\n
    Retorna String(Msj) , Boolean(Control), String (Ruta absoluta del archivo parquet generado{si control==true})'''
    try:
        #Paso 1 -> Convertir Array de tuplas en dataframe Excel
        df=pd.DataFrame(tuple_array_info,columns=["id","notes","password","title","url","user_name"])
        tabla=pa.Table.from_pandas(df)
        pq.write_table(tabla,abspath(join(dirname(__file__),"data_exported.parquet")))
        ruta_parquet_generado = abspath(join(dirname(__file__),"data_exported.parquet"))
        return "Creacion de Excel Exitosa", True, str(ruta_parquet_generado)
    except Exception as e:
        return str(e),False,str('')
    

