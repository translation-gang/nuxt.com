---
name: Nuxt Russian Translation
overview: "Реанимация nuxt-ru.vercel.app: синхронизация translation-gang/nuxt.com и translation-gang/nuxt с upstream, обновление деплоя, перевод сайта и документации по секциям."
todos:
  - id: phase1-sync-nuxt
    content: "Фаза 1.1: Синхронизация translation-gang/nuxt с upstream nuxt/nuxt (v4.0.2 -> v4.3.1)"
    status: completed
  - id: phase1-sync-site
    content: "Фаза 1.2: Синхронизация translation-gang/nuxt.com с upstream nuxt/nuxt.com (Aug 2025 -> Feb 2026)"
    status: completed
  - id: phase1-fix-deps
    content: "Фаза 1.3: Обновление зависимостей (ui-pro -> ui v4, content, nuxthub и др.)"
    status: completed
  - id: phase1-fix-build
    content: "Фаза 1.4: Исправление ошибок сборки после синхронизации, проверка локального билда"
    status: completed
  - id: phase1-vercel-env
    content: "Фаза 1.5: Обновление Vercel env-переменных, проверка деплоя"
    status: completed
  - id: phase1-nuxthub
    content: "Фаза 1.6: Обновление NuxtHub (0.9.0 -> 0.10.6+), миграции Drizzle"
    status: completed
  - id: phase2-glossary
    content: "Фаза 2.1: Создание/обновление глоссария терминов GLOSSARY.md"
    status: completed
  - id: phase2-yml
    content: "Фаза 2.2: Перевод YML-контента (index.yml, blog.yml, deploy.yml, modules.yml и др.)"
    status: completed
  - id: phase2-components
    content: "Фаза 2.3: Перевод Vue-компонентов (Header, Footer, Feedback, Newsletter и др.)"
    status: completed
  - id: phase2-pages
    content: "Фаза 2.4: Перевод страниц (index, blog, deploy, modules, enterprise, team и др.)"
    status: completed
  - id: phase2-meta
    content: "Фаза 2.5: Перевод мета-данных (llms, OG, title templates)"
    status: completed
  - id: phase3-audit
    content: "Фаза 3.0: Аудит уже переведённых файлов документации, список оставшихся"
    status: completed
  - id: phase3-getting-started
    content: "Фаза 3.1: Перевод/обновление docs/1.getting-started/ (18 файлов)"
    status: completed
  - id: phase3-directory-structure
    content: "Фаза 3.2: Перевод docs/2.directory-structure/ (28 файлов)"
    status: completed
  - id: phase3-guide-concepts
    content: "Фаза 3.3: Перевод docs/3.guide/1.concepts/ (9 файлов)"
    status: completed
  - id: phase3-guide-rest
    content: "Фаза 3.4: Перевод docs/3.guide/ остальное (31 файл)"
    status: completed
  - id: phase3-api-composables
    content: "Фаза 3.5: Перевод docs/4.api/2.composables/ (28 файлов)"
    status: completed
  - id: phase3-api-rest
    content: "Фаза 3.6: Перевод docs/4.api/ остальное (~77 файлов)"
    status: completed
  - id: phase3-community
    content: "Фаза 3.7: Перевод docs/5.community/ (6 файлов)"
    status: completed
  - id: phase3-bridge-migration
    content: "Фаза 3.8: Перевод docs/6.bridge/ и docs/7.migration/ (21 файл)"
    status: completed
  - id: phase4-blog
    content: "Фаза 4.1: Перевод блог-постов content/blog/ (~42 файла)"
    status: completed
  - id: phase4-deploy
    content: "Фаза 4.2: Перевод деплой-гайдов content/deploy/ (~22 файла)"
    status: completed
  - id: phase5-ci
    content: "Фаза 5: GitHub Action для регулярной синхронизации с upstream"
    status: completed
isProject: true
---

# План реанимации [nuxt-ru.vercel.app](http://nuxt-ru.vercel.app)

План перенесён в репозиторий. Выполнять по фазам.

## Фаза 1: Деплой (выполнена)

- **1.5** Инструкция по env и сборке добавлена в README (раздел «Деплой на Vercel»). Вручную в Vercel задать `NUXT_SESSION_PASSWORD`, `NUXT_PUBLIC_SITE_URL`, при необходимости `NUXT_GITHUB_TOKEN`.
- **1.6** NuxtHub ^0.10.6 в проекте, скрипты `db:generate` / `db:migrate` есть. Инструкция в README; при необходимости — `nuxthub link`.

## Фаза 2: Перевод сайта

- **2.1** Глоссарий — `GLOSSARY.md` в корне.
- **2.2** YML: `content/index.yml`, `blog.yml`, `deploy.yml`, `modules.yml`, `newsletter.yml`, `team.yml`, `enterprise/*.yml`.
- **2.3** Vue-компоненты с текстом (header, footer, feedback, newsletter и др.).
- **2.4** Страницы (index, blog, deploy, modules, enterprise, team и др.).
- **2.5** Мета (llms.domain, title, description в nuxt.config).

## Фаза 3: Документация (translation-gang/nuxt, docs/)

- **3.0** Выполнено: скрипт `scripts/audit-docs-translation.mjs` и шаблон отчёта `docs/TRANSLATION_AUDIT.md`. Запуск: `NUXT_V4_PATH=/path/to/nuxt pnpm run audit:docs` — перезапишет отчёт списками переведённых/не переведённых по разделам.
- **3.0** Аудит переведённого.
- **3.1** getting-started (18) → **3.8** bridge + migration (21).

## Фаза 4: Блог и деплой-гайды

- **4.1** content/blog/ (~42).
- **4.2** content/deploy/ (~22).

## Фаза 5: CI (выполнена)

- **5** Workflow `.github/workflows/sync-upstream.yml`: еженедельно (пн 9:00) и по кнопке проверяет upstream nuxt/nuxt.com; при наличии изменений создаёт issue с метками `translation`, `sync` и списком изменённых файлов.

---

## Деплой (подробная инструкция)

Ориентир по настройке — как в официальных репозиториях:

- **[nuxt/nuxt](https://github.com/nuxt/nuxt)** — ядро Nuxt и исходники документации (`docs/`). Для сборки сайта nuxt.com не деплоится сам по себе; используется локально через `NUXT_V4_PATH` при разработке и при пререндере документации.
- **[nuxt/nuxt.com](https://github.com/nuxt/nuxt.com)** — репозиторий сайта [nuxt.com](https://nuxt.com). Деплой — именно этот репо (или форк, например translation-gang/nuxt.com).

### Как настроить деплой nuxt.com (или форка) на Vercel

1. **Импорт проекта**
  - [Vercel → Add New → Project](https://vercel.com/new).
  - Импортируйте репозиторий (например `translation-gang/nuxt.com`).
  - Root Directory — корень репо (оставить пустым).
  - **Framework Preset** — не переопределять вручную; Vercel определит Nuxt по зависимостям.
  - **Output Directory** — оставить пустым (не указывать `dist`). Vercel сам определяет Nuxt и находит `.output`.
2. **Конфигурация в репозитории**
  - `**nuxt.config.ts**` — **НЕ** задавать `nitro.preset` вручную. Nitro автоматически определяет Vercel по env `VERCEL=1` и использует правильный пресет (нулевая конфигурация). Вывод сборки — `.output`.
  - `**vercel.json**` — только при необходимости переопределить команды (не указывать `framework`, `outputDirectory` или `nitro.preset`):
    ```json
    {
      "$schema": "https://openapi.vercel.sh/vercel.json",
      "buildCommand": "NODE_OPTIONS='--max-old-space-size=8192' pnpm run build",
      "installCommand": "corepack enable && corepack prepare pnpm@10.29.3 --activate && pnpm install"
    }
    ```
3. **Переменные окружения в Vercel**
  - Проект → **Settings → Environment Variables**.
  - **Обязательные для сборки и работы:**

    | Переменная              | Описание                                                                      |
    | ----------------------- | ----------------------------------------------------------------------------- |
    | `NUXT_SESSION_PASSWORD` | Пароль для сессий (nuxt-auth-utils). Сгенерировать: `openssl rand -base64 32` |
    | `NUXT_PUBLIC_SITE_URL`  | URL сайта, например `https://nuxt-ru.vercel.app`                              |

  - **Рекомендуемые** (без них часть страниц/API может падать при пререндере или в рантайме):

    | Переменная          | Описание                                              |
    | ------------------- | ----------------------------------------------------- |
    | `NUXT_GITHUB_TOKEN` | GitHub Personal Access Token (модули, team, спонсоры) |

  - Остальные — по необходимости: см. `.env.example` (Turnstile, Resend, Open Collective, OAuth для админки отзывов и т.д.).
4. **NuxtHub (БД)**
  - В проекте используется `@nuxthub/core`, БД по умолчанию — sqlite; на Vercel при деплое используется драйвер Vercel.
  - При изменении схемы в `server/db/schema.ts`: локально выполнить `pnpm db:generate` и `pnpm db:migrate`, закоммитить миграции.
  - Опционально: `npx nuxthub@latest login` и `npx nuxthub@latest link` для дашборда и бэкапов.
5. **Проверка**
  - После деплоя убедиться, что главная страница, документация и API (например `/api/sponsors`) открываются без 500.
  - При ошибках «Missing output directory» / «dist» — убедиться, что в `vercel.json` нет `outputDirectory`/`framework`, в `nuxt.config.ts` нет `nitro.preset` (авто-определение), и в настройках проекта Vercel поле Output Directory пустое.

Подробнее по шагам и переменным — раздел «Деплой на Vercel» в [README.md](./README.md) репозитория.

---

Полный текст плана с таблицами и чек-листами — в оригинале: `~/.cursor/plans/nuxt_russian_translation_ab28c233.plan.md`.
