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
    status: pending
  - id: phase1-nuxthub
    content: "Фаза 1.6: Обновление NuxtHub (0.9.0 -> 0.10.6+), миграции Drizzle"
    status: pending
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
    status: pending
  - id: phase2-meta
    content: "Фаза 2.5: Перевод мета-данных (llms, OG, title templates)"
    status: pending
  - id: phase3-audit
    content: "Фаза 3.0: Аудит уже переведённых файлов документации, список оставшихся"
    status: pending
  - id: phase3-getting-started
    content: "Фаза 3.1: Перевод/обновление docs/1.getting-started/ (18 файлов)"
    status: pending
  - id: phase3-directory-structure
    content: "Фаза 3.2: Перевод docs/2.directory-structure/ (28 файлов)"
    status: pending
  - id: phase3-guide-concepts
    content: "Фаза 3.3: Перевод docs/3.guide/1.concepts/ (9 файлов)"
    status: pending
  - id: phase3-guide-rest
    content: "Фаза 3.4: Перевод docs/3.guide/ остальное (31 файл)"
    status: pending
  - id: phase3-api-composables
    content: "Фаза 3.5: Перевод docs/4.api/2.composables/ (28 файлов)"
    status: pending
  - id: phase3-api-rest
    content: "Фаза 3.6: Перевод docs/4.api/ остальное (~77 файлов)"
    status: pending
  - id: phase3-community
    content: "Фаза 3.7: Перевод docs/5.community/ (6 файлов)"
    status: pending
  - id: phase3-bridge-migration
    content: "Фаза 3.8: Перевод docs/6.bridge/ и docs/7.migration/ (21 файл)"
    status: pending
  - id: phase4-blog
    content: "Фаза 4.1: Перевод блог-постов content/blog/ (~42 файла)"
    status: pending
  - id: phase4-deploy
    content: "Фаза 4.2: Перевод деплой-гайдов content/deploy/ (~22 файла)"
    status: pending
  - id: phase5-ci
    content: "Фаза 5: GitHub Action для регулярной синхронизации с upstream"
    status: pending
isProject: true
---

# План реанимации [nuxt-ru.vercel.app](http://nuxt-ru.vercel.app)

План перенесён в репозиторий. Выполнять по фазам.

## Фаза 1: Деплой (1.1–1.4 выполнены)

- **1.5** В Vercel: задать `NUXT_SESSION_PASSWORD`, `NUXT_GITHUB_TOKEN` (опц.), проверить Build/Install команды.
- **1.6** NuxtHub: при необходимости `nuxthub link`, `pnpm db:generate` / `pnpm db:migrate`.

## Фаза 2: Перевод сайта

- **2.1** Глоссарий — `GLOSSARY.md` в корне.
- **2.2** YML: `content/index.yml`, `blog.yml`, `deploy.yml`, `modules.yml`, `newsletter.yml`, `team.yml`, `enterprise/*.yml`.
- **2.3** Vue-компоненты с текстом (header, footer, feedback, newsletter и др.).
- **2.4** Страницы (index, blog, deploy, modules, enterprise, team и др.).
- **2.5** Мета (llms.domain, title, description в nuxt.config).

## Фаза 3: Документация (translation-gang/nuxt, docs/)

- **3.0** Аудит переведённого.
- **3.1** getting-started (18) → **3.8** bridge + migration (21).

## Фаза 4: Блог и деплой-гайды

- **4.1** content/blog/ (~42).
- **4.2** content/deploy/ (~22).

## Фаза 5: CI

- **5** Workflow уже есть: `.github/workflows/sync-upstream.yml`. При необходимости расширить (создание issue при изменениях в upstream).

---

Полный текст плана с таблицами и чек-листами — в оригинале: `~/.cursor/plans/nuxt_russian_translation_ab28c233.plan.md`.
