# Деплой на Amvera Cloud

Сайт — **Astro (статика) + PHP** (`api/lead.php`). На Amvera это разворачивается через **Docker** (`Dockerfile` + `amvera.yml` в корне репозитория).

Бесплатный домен Amvera: `https://<имя-проекта>.<логин>.amvera.io`  
Документация: [docs.amvera.ru](https://docs.amvera.ru/)

---

## 1. Что уже лежит в репозитории

| Файл | Назначение |
|---|---|
| `amvera.yml` | Окружение Docker, порт `80`, том `/data` |
| `Dockerfile` | Сборка Astro → Apache + PHP 8.3 |
| `docker/entrypoint.sh` | Конфиг из env, логи на `/data` |
| `docker/generate-config.php` | Пишет `api/config.php` из переменных Amvera |
| `.dockerignore` | Исключает `дизайн/`, `node_modules`, секреты |

Секреты **не** коммитьте: `api/config.php` в `.gitignore`. На Amvera конфиг создаётся при старте контейнера из переменных.

---

## 2. Создать приложение в Amvera

1. Зарегистрируйтесь / войдите: [amvera.ru](https://amvera.ru/).
2. **Создать проект** → тип приложения (веб).
3. Способ загрузки кода: **Git** (рекомендуется).
4. Скопируйте URL репозитория Amvera вида  
   `https://git.amvera.ru/<логин>/<имя-проекта>`  
   (вкладка **Репозиторий**).
5. На шаге конфигурации можно ничего не набивать вручную — в репозитории уже есть `amvera.yml` + `Dockerfile`.  
   Если мастер просит окружение: выберите **Docker**.

---

## 3. Привязать GitHub-репозиторий (рекомендуется)

Два рабочих варианта.

### Вариант A — webhook GitHub → Amvera (удобно для CI)

По [официальной инструкции](https://docs.amvera.ru/applications/git/webhooks.html). Токен GitHub нужен и для публичного, и для приватного репозитория.

1. Создайте GitHub token:
   - **Fine-grained** (предпочтительно): *Settings → Developer settings → Personal access tokens → Fine-grained tokens* — доступ к нужному репозиторию (Contents: Read).  
   - или **Classic**: *Tokens (classic) → Generate new token* с правом `repo` (для приватного обязательно).
2. В Amvera: **Репозиторий** → **Подключить GitHub, GitLab, Bitbucket**.
3. Выберите **GitHub**, вставьте token, укажите репозиторий и целевую ветку (`main`).
4. Придумайте **секрет** вебхука, скопируйте Payload URL, нажмите **Применить**.
5. В GitHub: **Settings → Webhooks → Add webhook**:
   - Payload URL — из Amvera  
   - Content type: `application/json`  
   - Secret — тот же, что в Amvera  
   - Event: **Just the push event** (вебхуки Amvera реагируют на push; при выборе CI — на Workflow runs)
6. После `git push` в GitHub Amvera подтянет код и запустит сборку.

### Вариант B — дополнительный remote `amvera`

Локально (или в CI) один раз:

```bash
git remote add amvera https://git.amvera.ru/<логин>/<имя-проекта>
```

Пуш (ветка проекта — `main`):

```bash
git push amvera main:master
```

Логин/пароль — учётные данные Amvera.  
Подробнее: [secondary origin](https://docs.amvera.ru/applications/git/secondary-origin.html).

> Amvera ожидает ветку **`master`** в своём git. При пуше из `main` используйте `main:master`.

---

## 4. Переменные и секреты

В проекте Amvera откройте **Переменные** и добавьте значения.  
После изменения переменных **перезапустите** контейнеры (на этапе сборки env недоступны).

### Обязательные / важные

| Имя | Секрет? | Пример | Описание |
|---|---|---|---|
| `SITE_URL` | нет | `https://gaggenau-service.myuser.amvera.io` | Канонический URL сайта (CORS + подсказки) |
| `ALLOWED_ORIGINS` | нет | `https://gaggenau-service.myuser.amvera.io` | CORS, через запятую при нескольких доменах |
| `LEAD_DRY_RUN` | нет | `false` | `true` — только лог, без Telegram/email |
| `TELEGRAM_BOT_TOKEN` | **да** | токен от BotFather | Уведомления в Telegram |
| `TELEGRAM_CHAT_ID` | **да** | `-100…` или id чата | Куда слать заявки |

### Опционально (email)

| Имя | Пример |
|---|---|
| `EMAIL_ENABLED` | `true` |
| `EMAIL_TO` | `leads@yourdomain.ru` |
| `EMAIL_FROM` | `noreply@yourdomain.ru` |
| `EMAIL_FROM_NAME` | `Gaggenau Service` |
| `EMAIL_TRANSPORT` | `smtp` |
| `SMTP_HOST` | smtp-хост |
| `SMTP_PORT` | `587` |
| `SMTP_ENCRYPTION` | `tls` |
| `SMTP_USERNAME` | логин |
| `SMTP_PASSWORD` | **секрет** |

### Прочее

| Имя | По умолчанию |
|---|---|
| `RATE_LIMIT_MAX` | `8` |
| `RATE_LIMIT_WINDOW` | `600` (секунды) |
| `LEAD_LOG_FILE` | `/data/logs/leads.log` |

Переменная `AMVERA=1` задаётся платформой автоматически — entrypoint по ней генерирует `api/config.php`.

---

## 5. Домен и HTTPS

1. **Настройки → Доменные имена → Добавить**.
2. Тип подключения: **HTTPS**.
3. Тип домена:
   - **Бесплатный домен Amvera** → `https://<проект>.<логин>.amvera.io` (обычно готов за 1–2 минуты), или  
   - **Свой домен** → пропишите A и TXT у регистратора (AAAA быть не должно).
4. Укажите тот же URL в `SITE_URL` и `ALLOWED_ORIGINS`.
5. В репозитории при необходимости обновите:
   - `public/robots.txt` (Sitemap URL)
   - при желании пересоберите с `SITE_URL=...` (sitemap в `dist/`)

Чтобы sitemap собрался с боевым доменом, задайте build-arg в Dockerfile при сборке или пересоберите образ с:

```dockerfile
ARG SITE_URL=https://ваш-домен.amvera.io
```

В текущем `Dockerfile` аргумент `SITE_URL` уже есть (по умолчанию `https://example.com`).  
Если Amvera не пробрасывает build-args из UI, после получения боевого домена можно временно прописать его в `Dockerfile` / `astro.config.mjs` и сделать новый push — либо оставить `example.com` только для sitemap и править `robots.txt` вручную.

Практичный минимум для формы заявок: корректные **`SITE_URL` + `ALLOWED_ORIGINS`** в переменных (это влияет на CORS в PHP, не на sitemap).

---

## 6. Проверка после деплоя

1. В Amvera статус приложения: **запущено**, логи без ошибок Apache/PHP.
2. Откройте `https://<ваш-домен>/ru/` — главная должна открыться.
3. С `LEAD_DRY_RUN=true` отправьте тестовую заявку с сайта.
4. В постоянном хранилище (том `/data`) должен появиться `/data/logs/leads.log`.
5. Выставьте `LEAD_DRY_RUN=false`, заполните Telegram-секреты, перезапустите, отправьте ещё одну заявку — сообщение должно прийти в чат.

Прямой тест API:

```bash
curl -X POST "https://<ваш-домен>/api/lead.php" \
  -H "Content-Type: application/json" \
  -H "Origin: https://<ваш-домен>" \
  -d '{"name":"Test","phone":"+79991234567","consent":true,"locale":"ru"}'
```

Ожидается JSON с `"ok":true`.

---

## 7. Типичные проблемы

| Симптом | Что проверить |
|---|---|
| 502 / «запущено», сайт не открывается | Порт: в `amvera.yml` должен быть `containerPort: 80`, процесс слушает `0.0.0.0:80` (Apache так и делает) |
| Сборка падает | В корне есть `Dockerfile` и `amvera.yml`; смотрите лог сборки Docker |
| Форма: CORS / ошибка сети | `ALLOWED_ORIGINS` и `SITE_URL` совпадают с адресом в браузере (схема `https://`, без лишнего `/`) |
| Telegram не приходит | `LEAD_DRY_RUN=false`, секреты `TELEGRAM_*`, перезапуск после смены переменных |
| Логи заявок пропали после рестарта | Том должен быть `persistenceMount: /data` (уже в `amvera.yml`) |

---

## 8. Локальная проверка Docker (опционально)

Если установлен Docker:

```bash
docker build --build-arg SITE_URL=http://127.0.0.1:8080 -t gaggenau-amvera .
docker run --rm -p 8080:80 \
  -e LEAD_CONFIG_FROM_ENV=1 \
  -e LEAD_DRY_RUN=true \
  -e SITE_URL=http://127.0.0.1:8080 \
  -e ALLOWED_ORIGINS=http://127.0.0.1:8080 \
  -v gaggenau-data:/data \
  gaggenau-amvera
```

Откройте `http://127.0.0.1:8080/ru/`.

---

## 9. Краткий чеклист

- [ ] Проект создан в Amvera (Docker)
- [ ] Репозиторий привязан (GitHub webhook или `git remote add amvera`)
- [ ] В корне есть `amvera.yml` + `Dockerfile` (уже в git)
- [ ] Заданы `SITE_URL`, `ALLOWED_ORIGINS`, Telegram-секреты
- [ ] `LEAD_DRY_RUN=false` на боевом
- [ ] Домен HTTPS привязан
- [ ] Тестовая заявка прошла
