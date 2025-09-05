from backend.Logger.LoggerUtil import Logger
from os import remove

def delete_data_parquet(abspath_data_parquet):
    '''Return String(message) and Boolean(control)'''
    try:
        remove(abspath_data_parquet)
        return "Eliminacion Exitosa", True
    except Exception as e:
        Logger.generate_log_error(f"err /mdlw/expr_usr_data/prq_generator -- receives{abspath_data_parquet} ||{e}")
        return str(e),False