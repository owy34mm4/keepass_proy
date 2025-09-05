from backend.Logger.LoggerUtil import Logger

from io import BytesIO
import pandas as pd
from os import remove

def parquet_to_excel_in_memory(parquet_archive):
    '''Retorna Excel Buffer(BytesIO{si control==true}) y un Boolean(control)'''
    try:
        #Leer el archivo parquet y convertirlo en DataFrame
        df=pd.read_parquet(parquet_archive)

        #Crear archivo exel en memoria(sin guardarlo en Disco)
        excel_buffer=BytesIO()
        df.to_excel(excel_buffer,index=False,engine='openpyxl')
        excel_buffer.seek(0) # Volver al inicio del archivo en memoria
        remove(parquet_archive)
        return excel_buffer,True
    except Exception as e:
        Logger.generate_log_error(f"err /mdlw/exprt_usr_dt/parquet_to_excel_in_memory-- receives{parquet_archive} ||| {str(e)}")
        return str(e),False

    