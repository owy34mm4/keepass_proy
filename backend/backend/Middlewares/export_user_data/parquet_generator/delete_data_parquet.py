from os import remove

def delete_data_parquet(abspath_data_parquet):
    '''Return String(message) and Boolean(control)'''
    try:
        remove(abspath_data_parquet)
        return "Eliminacion Exitosa", True
    except Exception as e:
        return str(e),False