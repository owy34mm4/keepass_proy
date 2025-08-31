# -------------------------------
# Imagen Base ligera
# -------------------------------
# Usamos slim porque reduce el tamaño drásticamente comparado con python:3.12
# pero conserva lo esencial para producción.
# Mejor práctica: fijar versión exacta (inmutabilidad).
FROM python:3.12.10-slim AS base

# -------------------------------
# Variables de entorno globales
# -------------------------------
# PYTHONUNBUFFERED evita que Python use buffers (logs en tiempo real).
# PIP_NO_CACHE_DIR evita almacenar cache de pip -> reduce tamaño.
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PYTHONPATH="/app"

# -------------------------------
# Crear usuario NO ROOT
# -------------------------------
# Creamos usuario "appuser" sin privilegios.
# Explicación:
# - "-r" = sistema (sin home interactivo innecesario)
# - Seguridad: si un atacante explota tu app, no corre como root.
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# -------------------------------
# Instalar dependencias del sistema
# -------------------------------
# Usamos --no-install-recommends para no instalar paquetes extras innecesarios.
# Limpiamos cache para reducir peso.
RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# Carpeta de trabajo
# -------------------------------
WORKDIR /app

ARG SECRET_KEY
ARG JWT_SECRET_KEY

ENV SECRET_KEY=${SECRET_KEY}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}

# -------------------------------
# Instalar dependencias de Python
# -------------------------------
# Copiamos primero requirements.txt -> cache eficiente (si código cambia,
# no reinstala dependencias desde cero).
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


# -------------------------------
# Copiar el proyecto
# -------------------------------
# Después copiamos el resto de archivos (evita invalidar cache).
COPY . .

# -------------------------------
# Ajustar permisos
# -------------------------------
RUN chown -R appuser:appgroup /app
RUN chown -R appuser:appgroup /app/backend/APIs/Data

# -------------------------------
# Cambiar usuario
# -------------------------------
# Desde aquí todo corre como usuario no-root.
#USER appuser

# -------------------------------
# Exponer puerto
# -------------------------------
EXPOSE 5000

# -------------------------------
# CMD final
# -------------------------------
# python -m backend.server es mejor que python backend/server.py porque
# garantiza imports correctos (modular).
CMD ["python", "-m", "backend.server"]
