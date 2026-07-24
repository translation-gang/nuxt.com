<a href="https://nuxt.com"><img width="1200" alt="Nuxt Website" src="./public/website.jpg"></a>

[![Install in Cursor](https://nuxt.com/mcp/badge.svg)](https://nuxt.com/mcp/deeplink)
[![Install in VSCode](https://nuxt.com/mcp/badge.svg?ide=vscode)](https://nuxt.com/mcp/deeplink?ide=vscode)

# nuxt-ru.vercel.app

Добро пожаловать на сайт-репозиторий Nuxt, доступный по адресу [https://nuxt-ru.vercel.app](https://nuxt-ru.vercel.app).

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com)

## Быстрый старт

Переменные окружения не обязательны — сайт работает сразу после установки:

```bash
corepack enable
pnpm install
pnpm dev
```

В режиме по умолчанию (`--ui-only`):

- Документация клонируется из публичных репозиториев [nuxt/nuxt](https://github.com/nuxt/nuxt) и [nuxt/examples](https://github.com/nuxt/examples).
- API экосистемы (`/api/v1/**` — модули, шаблоны и т.д.) проксируются на nuxt.com.
- Агент Nuxi виден, но отключён: Eve runtime не запускается, ключи AI не нужны.

## Режимы разработки

| Команда | Назначение |
|---------|------------|
| `pnpm dev` | Только UI — без конфига, без Eve, API экосистемы через прокси на nuxt.com |
| `pnpm dev:nuxi` | UI + агент Nuxi — запускает Eve runtime (нужны `AI_GATEWAY_API_KEY` и `INTERNAL_API_SECRET`) |
| `pnpm dev:full` | Полный режим — Eve runtime и локальная загрузка экосистемы Nuxt |

`pnpm dev:full` требует переменные окружения (см. [`.env.example`](./.env.example), в частности `AI_GATEWAY_API_KEY` для агента). Все переменные в `.env.example` опциональны и сгруппированы по фичам — задавайте только то, что используете.

### Работа с документацией

Документация живёт в репозитории [nuxt/nuxt](https://github.com/nuxt/nuxt). Для локального редактирования склонируйте или форкните репозиторий вне этого проекта и укажите `NUXT_V3_PATH` / `NUXT_V4_PATH` / `NUXT_V5_PATH` в `.env` на локальную копию (`pwd` внутри клона — или `echo %cd%` в Windows). То же для `NUXT_EXAMPLES_PATH` с [nuxt/examples](https://github.com/nuxt/examples).

### Вход через GitHub

Вход (dashboard, история чатов) требует GitHub OAuth: создайте приложение на [github.com/settings/applications/new](https://github.com/settings/applications/new) с callback `http://localhost:3000/api/auth/github`, затем задайте `NUXT_OAUTH_GITHUB_CLIENT_ID` и `NUXT_OAUTH_GITHUB_CLIENT_SECRET` в `.env`.

### Добавление шаблона Nuxt

Чтобы добавить шаблон в список, положите его в [./content/templates](./content/templates).

Запустите dev-сервер для генерации скриншота и откройте <http://localhost:3000/templates>.

Чтобы изменить URL для автоматического скриншота, используйте свойство `screenshotUrl`.

Чтобы перегенерировать изображение, удалите файл из `public/assets/templates`.

## Продакшен

```bash
pnpm build
```

## Деплой на Vercel

Подробная инструкция: раздел «Деплой» в [.cursor/plans/nuxt_russian_translation.plan.md](./.cursor/plans/nuxt_russian_translation.plan.md).

### Переменные окружения в Vercel

**Обязательные:**

| Переменная | Описание |
|------------|----------|
| `NUXT_SESSION_PASSWORD` | Шифрование сессий (`openssl rand -base64 32`) |
| `NUXT_PUBLIC_SITE_URL` | URL сайта, например `https://nuxt-ru.vercel.app` |

**Рекомендуемые:**

| Переменная | Описание |
|------------|----------|
| `NUXT_GITHUB_TOKEN` | GitHub PAT для модулей, team, stats |
| `INTERNAL_API_SECRET` | Общий секрет между Nuxt и Eve runtime (Nuxi) |
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway для Nuxi |

**Опционально:** см. `.env.example` (Turnstile, Resend, Open Collective, OAuth и т.д.).

### Сборка в Vercel

Настройки в `vercel.json` (сервисы `web` и `eve`). При необходимости переопределите команды в Vercel → Settings → General.

### NuxtHub

- `@nuxthub/core`, БД — sqlite (на Vercel — драйвер Vercel).
- При изменении схемы в `server/db/schema.ts` локально:

```bash
pnpm db:generate
pnpm db:migrate
```

### Nuxi (Eve agent)

Nuxi живёт в [`layers/nuxi/`](./layers/nuxi/) — Eve runtime (`agent/`), UI и internal API в одном слое. Агент запускается с `pnpm dev:full` или `pnpm dev:nuxi`. В режиме `pnpm dev` Eve не стартует, чат показывает disabled state.

```bash
# Обязательно — ключ Vercel AI Gateway
AI_GATEWAY_API_KEY=<your-api-key>

# Обязательно — общий секрет между Nuxt и Eve runtime
INTERNAL_API_SECRET=$(openssl rand -base64 32)

# Опционально — канонический URL для MCP и internal API
NUXT_PUBLIC_SITE_URL=http://localhost:3000

pnpm dev:nuxi
```

На Vercel задайте одинаковые `INTERNAL_API_SECRET`, `AI_GATEWAY_API_KEY` и переменные БД для сервисов `web` и `eve` в `vercel.json`.

### Evals для MCP-сервера

Dev-сервер должен быть запущен. Создайте API-ключ на https://vercel.com/ai-gateway, добавьте `AI_GATEWAY_API_KEY` в `.env`, затем `pnpm eval` или `pnpm eval:ui`.

## Лицензия

[MIT License](./LICENSE)
