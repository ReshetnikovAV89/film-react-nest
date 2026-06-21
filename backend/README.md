# FILM! Backend

Backend-часть проекта FILM!.

## Описание

Backend реализован на Nest.js и работает с PostgreSQL через TypeORM.

Основные задачи backend:

* отдавать список фильмов;
* отдавать расписание сеансов;
* создавать заказ;
* проверять, не занято ли выбранное место;
* сохранять забронированные места в PostgreSQL;
* отдавать статические файлы из `public`.

## Стек

* Nest.js
* TypeScript
* TypeORM
* PostgreSQL
* Jest
* Docker

## Переменные окружения

Создайте `.env` из `.env.example`.

### Основные переменные

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=film
DATABASE_USERNAME=student
DATABASE_PASSWORD=student
PORT=3000
FILMS_LIMIT=100
LOGGER_TYPE=dev
```

В Docker Compose значение `DATABASE_HOST` должно быть `database`, потому что backend подключается к контейнеру PostgreSQL по имени сервиса.

## Запуск локально

### Установить зависимости

```bash
npm ci
```

### Запустить backend в режиме разработки

```bash
npm run start:dev
```

### Запустить production-сборку

```bash
npm run build
npm run start:prod
```

## Проверки

### Линтер

```bash
npm run lint
```

### Сборка

```bash
npm run build
```

### Тесты

```bash
npm run test
```

## API

### Префикс API

```text
/api/afisha
```

### Маршруты

```text
GET /api/afisha/films
GET /api/afisha/films/:id/schedule
GET /api/afisha/films/:id/shedule
POST /api/afisha/order
```

Маршрут `shedule` оставлен для совместимости с контрактом проекта.

## Логирование

В backend реализованы три логгера:

* `DevLogger`
* `JsonLogger`
* `TskvLogger`

Выбор логгера задаётся переменной окружения `LOGGER_TYPE`.

### Доступные значения

```text
dev
json
tskv
```
