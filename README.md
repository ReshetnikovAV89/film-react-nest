# FILM!

Учебный проект онлайн-сервиса бронирования билетов в кино.

Проект состоит из frontend-приложения на React, backend-приложения на Nest.js, базы данных PostgreSQL и инфраструктуры на Docker Compose с nginx.

## Деплой

### Frontend

```text
https://dru-film.students.nomorepartiessite.ru
```

### API

```text
https://api.dru-film.students.nomorepartiessite.ru/api/afisha/films
```

### pgAdmin

```text
http://89.169.173.149:8080
```

## Стек

### Frontend

* React
* TypeScript
* Vite
* SCSS

### Backend

* Nest.js
* TypeScript
* TypeORM
* PostgreSQL
* Jest

### Infrastructure

* Docker
* Docker Compose
* nginx
* PostgreSQL
* pgAdmin
* GitHub Actions
* GitHub Container Registry

## Docker Compose

Проект запускается через Docker Compose.

### Сервисы

* `frontend` — production-сборка frontend-приложения.
* `backend` — Nest.js API.
* `nginx` — отдаёт frontend и проксирует запросы к backend.
* `database` — PostgreSQL.
* `pgadmin` — веб-интерфейс для работы с PostgreSQL.

## Переменные окружения

Для запуска через Docker Compose нужно создать файл `.env` из примера `.env.example`.

```bash
cp .env.example .env
```

### Пример переменных

```env
POSTGRES_USER=student
POSTGRES_PASSWORD=student
POSTGRES_DB=film

DATABASE_DRIVER=postgres
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=film
DATABASE_USERNAME=student
DATABASE_PASSWORD=student

PORT=3000
FILMS_LIMIT=100
LOGGER_TYPE=json

PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=change_me_strong_password
```

Файл `.env` не должен попадать в репозиторий.

## Запуск проекта

### Запустить проект

```bash
docker compose up -d --build
```

### Проверить состояние контейнеров

```bash
docker compose ps
```

### Остановить проект

```bash
docker compose down
```

### Остановить проект с удалением Docker volumes

```bash
docker compose down -v
```

Команду `docker compose down -v` нужно использовать осторожно: она удаляет данные PostgreSQL и pgAdmin.

## API

### Основной префикс API

```text
/api/afisha
```

### Основные маршруты

```text
GET /api/afisha/films
GET /api/afisha/films/:id/schedule
GET /api/afisha/films/:id/shedule
POST /api/afisha/order
```

Маршрут `shedule` оставлен для совместимости с контрактом проекта.

## Проверка API

### Получить список фильмов

```bash
curl http://localhost/api/afisha/films
```

### Получить расписание фильма

```bash
curl http://localhost/api/afisha/films/<filmId>/schedule
```

### Создать заказ

```bash
curl -X POST http://localhost/api/afisha/order \
  -H "Content-Type: application/json" \
  -d '[
    {
      "film": "<filmId>",
      "session": "<sessionId>",
      "daytime": "2024-06-28T10:00:53+03:00",
      "row": 1,
      "seat": 1,
      "price": 350
    }
  ]'
```

## Логирование

В backend реализованы три логгера:

* `DevLogger`
* `JsonLogger`
* `TskvLogger`

Выбор логгера задаётся переменной окружения:

```env
LOGGER_TYPE=json
```

### Доступные значения

```text
dev
json
tskv
```

## GitHub Actions

В проекте настроен workflow:

```text
.github/workflows/docker-publish.yml
```

Workflow собирает и публикует Docker-образы в GitHub Container Registry.

### Docker-образы

```text
ghcr.io/reshetnikovav89/film-react-nest-backend:latest
ghcr.io/reshetnikovav89/film-react-nest-frontend:latest
ghcr.io/reshetnikovav89/film-react-nest-nginx:latest
```

### Ветки запуска workflow

```text
main
review-2
```

## Локальная разработка backend

### Перейти в папку backend

```bash
cd backend
```

### Установить зависимости

```bash
npm ci
```

### Запустить backend в режиме разработки

```bash
npm run start:dev
```

### Проверить backend

```bash
npm run lint
npm run build
npm run test
```

## Локальная разработка frontend

### Перейти в папку frontend

```bash
cd frontend
```

### Установить зависимости

```bash
npm install
```

### Запустить frontend в режиме разработки

```bash
npm run dev
```

### Собрать frontend

```bash
npm run build
```

## Проверенный деплой

Проект задеплоен на сервер через Docker Compose.

### Проверено

* Frontend открывается по домену.
* API возвращает список фильмов.
* `/content/afisha/*` отдаёт статические изображения.
* `POST /api/afisha/order` создаёт заказ.
* Повторное бронирование занятого места возвращает ошибку `400`.
* GitHub Actions успешно собирает и публикует Docker-образы.
