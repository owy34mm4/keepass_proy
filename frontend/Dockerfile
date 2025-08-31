# -------------------------------
# Etapa 1: Construcción (builder)
# -------------------------------
FROM node:20-alpine AS builder

#EStablecemos las variables que vamosa  recibir por argumento en al construccion
ARG NEXT_PUBLIC_AUTH_API_URL
ARG NEXT_PUBLIC_USER_API_URL

# Variables de entorno de build NODE_ENV=development
ENV  \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_AUTH_API_URL=$NEXT_PUBLIC_AUTH_API_URL \
    NEXT_PUBLIC_USER_API_URL=$NEXT_PUBLIC_USER_API_URL
WORKDIR /app

# Copiamos package.json y lock para aprovechar cache
COPY package*.json ./
COPY tsconfig.json ./

COPY postcss.config.mjs ./

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
    NEXT_TELEMETRY_DISABLED=1 
    #NEXT_PUBLIC_AUTH_API_URL=http://localhost:5000/auth \
    #NEXT_PUBLIC_USER_API_URL=http://localhost:5000/user



WORKDIR /app


# Instalar solo dependencias de producción
RUN npm install -g npm@latest
COPY package.json package-lock.json ./
COPY --from=builder /app/package.json ./package.json
RUN npm install


# Copiamos solo lo necesario desde el builder

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
