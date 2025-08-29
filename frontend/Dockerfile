# -------------------------------
# Etapa 1: Construcción (builder)
# -------------------------------
FROM node:20-alpine AS builder

# -------------------------------
# Instalar dependencias del sistema
# -------------------------------
# Usamos --no-install-recommends para no instalar paquetes extras innecesarios.
# Limpiamos cache para reducir peso.
#RUN apt-get update && apt-get install -y --no-install-recommends \
  #    build-essential \
  #  && rm -rf /var/lib/apt/lists/*

# Variables de entorno de build NODE_ENV=development
ENV  \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copiamos package.json y lock para aprovechar cache
COPY package*.json ./

# Instalamos dependencias
RUN npm install -g npm@latest
RUN npm install
RUN npm install next@latest react@latest react-dom@latest
# Copiamos todo el código fuente
COPY . .

# Generamos build de Next.js
RUN npm run build


# -------------------------------
# Etapa 2: Ejecución (runner)
# -------------------------------
FROM node:20-alpine AS runner

# Variables de entorno de ejecución NODE_ENV=production 
ENV \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_AUTH_API_URL=http://backend:5000/auth \
    NEXT_PUBLIC_USER_API_URL=http://backend:5000/user

# -------------------------------
# Instalar dependencias del sistema
# -------------------------------
# Usamos --no-install-recommends para no instalar paquetes extras innecesarios.
# Limpiamos cache para reducir peso.
#RUN apt-get update && apt-get install -y --no-install-recommends \
#      build-essential \
#    && rm -rf /var/lib/apt/lists/*


WORKDIR /app


# Instalar solo dependencias de producción
COPY package.json package-lock.json ./
RUN npm ci 


# Copiamos solo lo necesario desde el builder
COPY --from=builder /app/package.json ./package.json
##COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Creamos usuario no root
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser \
    && chown -R appuser:appgroup /app

USER appuser

# Next.js escucha en 3000 por defecto
EXPOSE 3000

# Arrancamos el servidor de producción de Next.js
CMD ["npm", "run", "start"]
