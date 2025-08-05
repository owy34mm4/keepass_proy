#Imagen Base
FROM python:3.12.10-slim

#Crear carpeta de trabajo en el contenedor
WORKDIR /code

#Copia solamente el archivo requirements
COPY requirements.txt .

#Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

#Copiar todos los archivos del proyecto al contenedor
COPY . .

#Expone el puerto 5000 del contenedor
EXPOSE 5000

#Estructura del comando cmd de ejecucion
CMD ["python", "-m", "backend.server"]