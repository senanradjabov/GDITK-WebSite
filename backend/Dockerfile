FROM python:3.13-slim

# Устанавливаем Poetry
RUN pip install --no-cache-dir poetry

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY pyproject.toml poetry.lock ./

# Отключаем виртуальное окружение и устанавливаем зависимости
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 8000

# Применяем миграции и запускаем сервер FastAPI
CMD ["sh", "-c", "poetry run alembic upgrade head && poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000"]
