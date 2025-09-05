from os.path import abspath,dirname,join
from datetime import datetime
from functools import wraps


class ExceptionLogger():
    '''This class generetes the entity responsable of Logging the app\n
    Cause whe focus on the user privacy, the onli logs we save is the logs error
    '''
    def __init__(self):
        self._logs_dir_path=abspath(join(
            dirname(dirname(dirname(dirname(__file__))))
            ,"LogsDir"))    
    
    def generate_log_error(self, exception):
        '''Receives the error as parameter\n
        Wite te error as string in the logfile according the date
        Doesnt return any value'''
        fecha_actual=datetime.now()
        string_to_save=f'{fecha_actual.strftime("%H:%M:%S")}---*{str(exception)}\n'

        with open (f'{self._logs_dir_path}/{fecha_actual.strftime("%Y-%m-%d")}.log','a') as log_file:
            log_file.write(string_to_save)

Logger = ExceptionLogger()
Logger.generate_log_error("Error test")

@staticmethod
def error_logs_wrapper(function):
    '''This wrappers get encapsulated the workflow of the method wrapped\n
    If the wrapped methos throws an exception, the wrapper will call the Class function responsable of write the log '''
    @wraps(function)
    def wrapper(self,*args,**kwargs):
        try:
            ret=function(self,*args,**kwargs)
            return ret
        except Exception as e:
            Logger=ExceptionLogger()
            Logger.generate_log_error(str(e))
            return ret
                
            

    

