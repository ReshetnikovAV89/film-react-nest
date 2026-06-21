# FILM! Frontend

Frontend-часть проекта FILM!.

## Описание

Frontend реализован на React + TypeScript + Vite.

Приложение получает данные о фильмах и расписании из backend API, отображает карточки фильмов и позволяет оформить заказ на выбранное место.

## Стек

* React
* TypeScript
* Vite
* SCSS
* Docker

## Переменные окружения

Создайте `.env` из `.env.example`.

### Локальная разработка

```env
VITE_API_URL=https://stub.practicum-team.ru/api/afisha
VITE_CDN_URL=https://stub.practicum-team.ru/content/afisha
```

### Docker-сборка

Для Docker-сборки используются значения:

```env
VITE_API_URL=/api/afisha
VITE_CDN_URL=/content/afisha
```

Так frontend обращается к backend через nginx.

## Запуск локально

### Установить зависимости

```bash
npm install
```

### Запустить dev-сервер

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Preview production-сборки

```bash
npm run preview
```
