# Официальный сервис Gaggenau (working title)

Сайт заказа ремонта техники Gaggenau для Москвы и Подмосковья (до ~100 км).

Стек: **Next.js (App Router) + TypeScript + Tailwind CSS**. UI по умолчанию на русском, переключатель **RU | EN**.

## Документы

- [Продуктовый разбор](docs/product-discovery.md)
- [ТЗ дизайна](docs/design-brief.md)
- [Черновик акций](docs/promos-draft.md)
- [План разработки](docs/development-plan.md) — исторический план (Astro/PHP); актуальный рантайм — Next.js ниже

## Страницы v1

| URL | Назначение |
|---|---|
| `/` → `/ru` | Редирект на RU |
| `/ru`, `/en` | Главная |
| `/ru/repair/{slug}` | 5 посадочных (стиральные, посудомойки, холодильники, духовки, кофемашины) |
| `/ru/contacts`, `/about`, `/privacy`, `/terms` | Служебные |
| `/ru/thank-you` | Thank-you (день/ночь по Europe/Moscow) |

Форма заявки — в модалке; thank-you также как состояние успеха в модалке.

## Требования

- Node.js 20+
- npm 10+

## Команды

```bash
npm install
npm run dev      # http://localhost:3000 (0.0.0.0)
npm run build
npm run start    # production на :3000
```

Откройте:

- главную: http://localhost:3000/ru
- посадочную: http://localhost:3000/ru/repair/washing-machines

## Заявки (API stub)

`POST /api/lead` — валидирует имя/телефон/согласие и **логирует** заявку в server console.

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"+79991234567","consent":true,"locale":"ru"}'
```

TODO перед продом: Telegram + email уведомления через env-секреты (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, SMTP). Секреты в репозиторий не коммитить.

Папка `api/` (PHP) — наследие shared-хостинга; текущий путь заявок — Next.js route.

## Продуктовые якоря

- Зона: Москва и Подмосковье до 100 км
- SLA: ответ 15 мин / выезд от 30 мин (8:00–22:00 ежедневно)
- Гарантия: 12 месяцев на работы; запчасти — гарантия производителя; только оригинал
- Акция A на всех страницах (см. `docs/promos-draft.md`)
- Без блока цен, без описания оплаты, без калькулятора

## Working title

«Официальный сервис Gaggenau» — тестовое имя; контакты — плейсхолдеры до запуска.
