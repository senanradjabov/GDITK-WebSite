# Этап сборки
FROM node:23-slim AS builder

WORKDIR /app

# 1.1) Скопировать зависимости + lock-файл
COPY frontend/package.json frontend/package-lock.json ./ 

# 1.2) Настроить npm: registry и кеширование
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 3 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# 1.3) Установить зависимости (используем npm ci)
RUN npm ci --prefer-offline --no-audit --progress=false

# 1.4) Скопировать весь код и собрать проект
COPY frontend . 
RUN npm run build  # Предполагаем, что сборка сгенерирует файлы в dist/

# Этап запуска (nginx)
FROM nginx:stable-alpine

# 2.1) Копируем собранные файлы в директорию для nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 2.2) Копируем nginx-конфиг
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
