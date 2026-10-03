# Официальный сервис Gaggenau (working title)

Сайт заказа ремонта техники Gaggenau для Москвы и Подмосковья (до ~100 км).  
Стек рассчитан на **базовый shared-хостинг РФ**: статическая сборка + PHP для заявок.

## Документы

- [План разработки](docs/development-plan.md) — задачи, чек-листы, коммиты
- [Продуктовый разбор](docs/product-discovery.md)
- [ТЗ дизайна](docs/design-brief.md)
- [Черновик акций](docs/promos-draft.md)

## Стек

| Слой | Технология |
|---|---|
| Фронт | Astro (static) + TypeScript + Tailwind CSS |
| i18n | RU / EN |
| Заявки | `api/lead.php` → Telegram + email (SMTP) |
| Деплой | FTP/SFTP: содержимое `dist/` + папка `api/` |

Исходные HTML-макеты Stitch лежат в `дизайн/` и **не** деплоятся как сайт.

## Требования к машине разработки

- Node.js 20+ (LTS)
- npm 10+
- Для проверки формы локально: PHP 8.1+ (`php -S`)

## Команды

```bash
npm install
npm run dev          # локальный UI (Astro)
npm run build        # сборка в dist/
npm run preview      # просмотр production-сборки
```

Проверка PHP API (после появления `api/lead.php`):

```bash
php -S localhost:8080 -t .
# POST http://localhost:8080/api/lead.php
```

На Astro-dev для формы понадобится proxy на PHP или отдельный origin — см. задачу 8 в плане.

## Рабочий цикл после каждой задачи

1. Локальный просмотр (`npm run dev` / при необходимости `php -S`)
2. Чек-лист задачи из [docs/development-plan.md](docs/development-plan.md)
3. Git commit по задаче

## Статус

Разработка идёт по задачам 0→12 из плана.
