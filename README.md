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
npm run dev          # локальный UI (Astro), /api проксируется на :8080
npm run api          # PHP: php -S 127.0.0.1:8080 -t .
npm run build        # сборка в dist/
npm run preview      # просмотр production-сборки
```

### Локальная проверка формы заявок

1. Скопируйте `api/config.example.php` → `api/config.php` (уже с `dry_run => true`).
2. В одном терминале: `npm run api` (нужен PHP 8.1+ в PATH).
3. В другом: `npm run dev` → откройте сайт → «Оставить заявку» → отправьте тест.
4. Успех: экран «Заявка принята»; строка появится в `api/logs/leads.log`.
5. Для боя: в `config.php` выставьте `dry_run => false`, заполните Telegram `bot_token` + `chat_id`, при необходимости SMTP (`email.enabled => true`).

Прямой тест API без UI:

```bash
curl -X POST http://127.0.0.1:8080/api/lead.php ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"phone\":\"+79991234567\",\"consent\":true,\"locale\":\"ru\"}"
```

## Деплой (кратко)

- В `public_html` (или корень сайта): содержимое `dist/` + папка `api/`.
- На сервере: `api/config.php` из example с боевыми секретами (`dry_run => false`).
- `api/config.php` и `api/logs/` не должны быть доступны из браузера (есть `.htaccess` для Apache).

## Рабочий цикл после каждой задачи

1. Локальный просмотр (`npm run dev` / при необходимости `npm run api`)
2. Чек-лист задачи из [docs/development-plan.md](docs/development-plan.md)
3. Git commit по задаче

## Статус

Задачи 0–10 сделаны; дальше по плану — 11 (полировка).
