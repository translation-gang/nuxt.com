---
title: Clever Cloud
description: 'Разверните приложение Nuxt в инфраструктуре Clever Cloud.'
logoSrc: '/assets/integrations/clever-cloud.svg'
category: Хостинг
nitroPreset: 'node_server'
website: 'https://www.clever-cloud.com/'
---

Nuxt поддерживает развёртывание на [Clever Cloud](https://www.clever-cloud.com/) с минимальной настройкой.

## Развёртывание из консоли Clever Cloud

Чтобы развернуть проект Nuxt в Clever Cloud, создайте **новое приложение**. Мастер проведёт через необходимые шаги настройки.

1. В боковом меню выберите **Create > An application**.
2. Выберите способ развёртывания: **Create an application from a local repository** или **Create an application from a GitHub repository**.
3. Выберите приложение **Node.js** или **статическое**.
4. Задайте минимальный размер инстанса и опции масштабирования. Приложение Nuxt нужно разворачивать с размером не менее **XS** для **Node.js** и **nano** для **статического**. Для процесса сборки позже потребуется настроить размер не менее **M**, чтобы хватало ресурсов. В зависимости от проекта и зависимостей может понадобиться корректировка по метрикам на странице **Overview**.
5. Выберите **регион** развёртывания.
6. Пункт **Add-ons** можно пропустить, если база данных не используется.
7. Задайте **переменные окружения**:
  - Для **Node.js**

::code-group{sync="pm"}

```ini [npm]
CC_POST_BUILD_HOOK="npm run build"
CC_RUN_COMMAND="node .output/server/index.mjs"
```

```ini [yarn]
CC_POST_BUILD_HOOK="yarn build"
CC_RUN_COMMAND="node .output/server/index.mjs"
```

```ini [pnpm]
CC_POST_BUILD_HOOK="pnpm build"
CC_RUN_COMMAND="node .output/server/index.mjs"
```

```ini [bun]
CC_POST_BUILD_HOOK="bun build"
CC_RUN_COMMAND="node .output/server/index.mjs"
```

::

  - Для **статического приложения**

::note
Если в `nuxt.config.ts` задано [`ssr: false`](https://nuxt.com/docs/4.x/getting-started/deployment#static-hosting) **или** в проекте есть динамические маршруты, которые нельзя предварительно отрендерить:
1. Используйте приложение **Static Apache**.
2. Создайте файл [`.htaccess`](https://www.clever.cloud/developers/doc/applications/static-apache/#serving-indexhtml-for-spa-single-page-application-routers), перенаправляющий все маршруты на `index.html` для корректной работы SPA.

В остальных случаях подойдёт приложение **Static HTML** по умолчанию.
::

::code-group{sync="pm"}

```ini [npm]
CC_WEBROOT=/.output/public
CC_OVERRIDE_BUILDCACHE=/.output/public
CC_PRE_BUILD_HOOK=npm install
CC_POST_BUILD_HOOK=npm run generate
```

```ini [yarn]
CC_WEBROOT=/.output/public
CC_OVERRIDE_BUILDCACHE=/.output/public
CC_PRE_BUILD_HOOK=yarn install
CC_POST_BUILD_HOOK=yarn generate
```

```ini [pnpm]
CC_WEBROOT=/.output/public
CC_OVERRIDE_BUILDCACHE=/.output/public
CC_PRE_BUILD_HOOK=pnpm install
CC_POST_BUILD_HOOK=pnpm generate
```

```ini [bun]
CC_WEBROOT=/.output/public
CC_OVERRIDE_BUILDCACHE=/.output/public
CC_PRE_BUILD_HOOK=bun install
CC_POST_BUILD_HOOK=bun generate
```

::

8. В меню приложения **Information** включите опцию **enable dedicated build instance** с минимальным инстансом типа **M**.
9. **Разверните.** При развёртывании из **GitHub** деплой запустится автоматически. При использовании **Git** см. [документацию](https://www.clever-cloud.com/developers/doc/quickstart/#choose-how-to-deploy).

## Узнать больше

::read-more{to="https://developers.clever-cloud.com/guides/nuxt" target="_blank"}
Документация Clever Cloud по развёртыванию Nuxt
::
