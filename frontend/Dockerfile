FROM node:20-bookworm-slim AS builder

WORKDIR /app

ARG VITE_API_URL=/api/afisha
ARG VITE_CDN_URL=/content/afisha

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CDN_URL=$VITE_CDN_URL

COPY package.json ./
RUN npm install --no-package-lock

COPY . .
RUN npm run build

FROM alpine:3.20 AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist

CMD ["sh", "-c", "mkdir -p /frontend-dist && cp -r /app/dist/. /frontend-dist && tail -f /dev/null"]
