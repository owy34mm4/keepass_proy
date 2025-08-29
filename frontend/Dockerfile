# -------------------------------
# Etapa 1: Construcción (builder)
# -------------------------------
FROM node:20-slim AS builder

# Variables de entorno de build
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copiamos package.json y lock para aprovechar cache
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos todo el código fuente
COPY . .

# Generamos build de Next.js
RUN npm run build


# -------------------------------
# Etapa 2: Ejecución (runner)
# -------------------------------
FROM node:20-slim AS runner

# Variables de entorno de ejecución
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_AUTH_API_URL=http://backend:5000/auth \
    NEXT_PUBLIC_USER_API_URL=http://backend:5000/user

WORKDIR /app

# Copiamos solo lo necesario desde el builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Creamos usuario no root
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser \
    && chown -R appuser:appgroup /app

USER appuser

# Next.js escucha en 3000 por defecto
EXPOSE 3000

# Arrancamos el servidor de producción de Next.js
CMD ["npm", "run", "start"]
