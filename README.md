<a href="https://nuxt.com"><img width="1200" alt="Nuxt Website" src="./public/website.jpg"></a>

[![Install in Cursor](https://nuxt.com/mcp/badge.svg)](https://nuxt.com/mcp/deeplink)
[![Install in VSCode](https://nuxt.com/mcp/badge.svg?ide=vscode)](https://nuxt.com/mcp/deeplink?ide=vscode)

# nuxt-ru.vercel.app

Добро пожаловать на сайт-репозиторий Nuxt, доступный по адресу [https://nuxt-ru.vercel.app](https://nuxt-ru.vercel.app).

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com)

## Настройка

Make sure to enable corepack and install the dependencies:

```bash
corepack enable
pnpm install
```

Скопируйте файл `.env.example` в файл `.env`:

```bash
cp .env.example .env
```

Clone/Fork [nuxt/nuxt](https://github.com/translation-gang/nuxt) repo where you want (but not in the Nuxt.com project) and inside the root of the repo, run:

```bash
pwd
```

Если вы работаете под Windows, вместо этого можно использовать следующую команду:

```bash
echo %cd%
```

Скопируйте вывод команды выше и вставьте его в переменные `NUXT_V3_PATH` и `NUXT_V4_PATH` в файле `.env`.

## Разработка

Запустите сервер разработки:

```bash
pnpm dev
```

Чтобы запустить сервер разработки с полной подгрузкой контента (модули, API и т.д.):

```bash
pnpm dev:full
```

### Добавление шаблона Nuxt

Чтобы добавить шаблон Nuxt в список, добавьте его в папку [./content/templates](./content/templates).

Обязательно запустите сервер разработки, чтобы сгенерировать скриншот для шаблона, и перейдите по адресу <http://localhost:3000/templates>, чтобы увидеть результат.

Если вы хотите обновить url, по которому мы делаем автоматический скриншот, используйте свойство `screenshotUrl`.

Чтобы сгенерировать изображение заново, удалите сгенерированное в папке `public/assets/templates`.

## Продакшен

Соберите production-приложение:

```bash
pnpm build
```

## Деплой на Vercel (фазы 1.5–1.6)

Полная пошаговая инструкция (как в [nuxt/nuxt](https://github.com/nuxt/nuxt) и [nuxt/nuxt.com](https://github.com/nuxt/nuxt.com)): раздел **«Деплой (подробная инструкция)»** в [.cursor/plans/nuxt_russian_translation.plan.md](./.cursor/plans/nuxt_russian_translation.plan.md).

### Переменные окружения в Vercel

В настройках проекта Vercel → Settings → Environment Variables задайте:

**Обязательные для сборки и работы:**

| Переменная | Описание |
|------------|----------|
| `NUXT_SESSION_PASSWORD` | Пароль для шифрования сессий (nuxt-auth-utils). Сгенерировать: `openssl rand -base64 32` |
| `NUXT_PUBLIC_SITE_URL` | URL сайта, например `https://nuxt-ru.vercel.app` |

**Рекомендуемые (иначе часть страниц/API будет падать при пререндере или в рантайме):**

| Переменная | Описание |
|------------|----------|
| `NUXT_GITHUB_TOKEN` | GitHub Personal Access Token с доступом к репозиторию (для модулей, team, stats) |
| `INTERNAL_API_SECRET` | Общий секрет между Nuxt-приложением и Eve runtime (Nuxi) |
| `AI_GATEWAY_API_KEY` | API-ключ Vercel AI Gateway для Nuxi |

**Опционально:** см. `.env.example` (Turnstile, Resend, Open Collective, OAuth для админки отзывов и т.д.).

### Сборка в Vercel

Используются настройки из `vercel.json` (сервисы `web` и `eve`). При необходимости переопределите команды в Vercel → Settings → General.

### NuxtHub

- В проекте используется `@nuxthub/core`, БД — sqlite (на Vercel — драйвер Vercel).
- Если меняете схему БД в `server/db/schema.ts`, локально выполните:
  ```bash
  pnpm db:generate
  pnpm db:migrate
  ```

### Nuxi (Eve agent)

Nuxi живёт в [`layers/nuxi/`](./layers/nuxi/) — runtime Eve (`agent/`), UI и internal API в одном слое. Для локальной разработки:

```bash
# Обязательно — общий секрет между Nuxt-приложением и Eve runtime
INTERNAL_API_SECRET=$(openssl rand -base64 32)

# Опционально — канонический URL сайта для MCP и internal API
NUXT_PUBLIC_SITE_URL=http://localhost:3000

pnpm dev
```

На Vercel настройте **оба** сервиса (`web` и `eve` в `vercel.json`) с одинаковыми `INTERNAL_API_SECRET`, `AI_GATEWAY_API_KEY` и переменными БД.

### Evals для MCP-сервера

Для запуска evals убедитесь, что dev-сервер запущен, создайте API-ключ на https://vercel.com/ai-gateway и добавьте `AI_GATEWAY_API_KEY` в `.env`. Затем: `pnpm eval` или `pnpm eval:ui`.

## Лицензия

[MIT License](./LICENSE)
