---
title: NuxtHub
description: 'Разверните свое Nuxt приложение на глобальных серверах вашего аккаунта Cloudflare c нулевой конфигурацией.'
componentImg: NuxtHub
logoSrc: '/assets/integrations/nuxthub.svg'
category: Хостинг
featured: true
nitroPreset: 'cloudflare-pages'
website: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page'
---

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с NuxtHub возможна с нулевой конфигурацией, [узнать больше](https://nitro.unjs.io/deploy#zero-config-providers).
::

## Введение

NuxtHub - это платформа развертывания и администрирования для Nuxt, работающая на базе Cloudflare.

Основное отличие от развертывания [Cloudflare](/deploy/cloudflare) заключается в том, что NuxtHub обеспечивает развертывание с нулевой конфигурацией (инициализация, развертывание и администрирование).

Он также предоставляет мощный интерфейс администратора для управления вашими проектами Nuxt (базами данных, блобами, KV, ...), а также [удаленным хранилищем](https://hub.nuxt.com/docs/getting-started/remote-storage?utm_source=nuxt-website&utm_medium=deploy-page).

Подробнее на [hub.nuxt.com](https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page).

## NuxtHub CLI

Вы можете развернуть свой локальный проект с помощью одной команды:

```bash [Terminal]
npx nuxthub deploy
```

Далее:

1. Убедитесь, что вы авторизованы на [admin.hub.nuxt.com](https://admin.hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page)
2. Свяжите ваш локальный проект с проектом NuxtHub или помогите создать новый
3. Соберите ваш проект Nuxt с правильным пресетом
4. Разверните его на вашем аккаунте Cloudflare со всеми необходимыми ресурсами
5. Предоставьте вам URL-адрес для доступа к вашему проекту

Смотрите пример на видео:

::video{poster="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.jpg" controls class="rounded dark:border dark:border-gray-700 md:w-2/3"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.webm" type="video/webm"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.mp4" type="video/mp4"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.ogg" type="video/ogg"}
::

::note
Вы также можете установить [NuxtHub CLI](https://github.com/nuxt-hub/cli) глобально с помощью: `npm i -g nuxthub`.
::

::warning
Если вы выполните первое развертывание с помощью NuxtHub CLI, то впоследствии не сможете прикрепить свой репозиторий GitHub/GitLab из-за ограничения Cloudflare.
::

## Развертывание с помощью Git

1. Поместите код в свой git-репозиторий (GitHub или GitLab).
2. Нажмите на `New Project`, затем `Import a Git repository`.
3. Выберите свой репозиторий и нажмите `Импортировать репозиторий`.
4. NuxtHub настроит ваш проект на Cloudflare Pages и развернет его
5. Ваше приложение будет развернуто с доменом `.nuxt.dev`.

После того как ваш проект был импортирован и развернут, все последующие изменения в ветках будут генерировать предварительные развертывания, а все изменения, внесенные в продакшен ветку (обычно «main»), приведут к развертыванию на продакшене.

## Шаблоны

::card-group
  ::card
  ---
  icon: i-simple-icons-github
  title: Hello Edge
  to: https://github.com/nuxt-hub/hello-edge
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
Минимальный стартер Nuxt, работающий на edge.
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: NuxtHub Starter
  to: https://github.com/nuxt-hub/starter
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  Стартовая программа для начала работы с функциями NuxtHub (база данных, блобы, KV, ...).
  ::
  ::card
  ---

  icon: i-simple-icons-github
  title: Atidone
  to: https://github.com/atinux/atidone
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Full-stack приложение с аутентификацией и базой данных для управления вашими Todos.
  ::
  ::card
  ---

  icon: i-simple-icons-github
  title: Галерея изображений Nuxt
  to: https://github.com/flosciante/nuxt-image-gallery
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Галерея изображений, позволяющая загружать, редактировать и делиться своими изображениями со всем миром.
  ::
  ::card
  ---

  icon: i-simple-icons-github
  title: Atinotes
  to: https://github.com/atinux/atinotes
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Редактируемый сайт на основе компонентов Markdown и Vue с динамической генерацией изображений OG.
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Atidraw
  to: https://github.com/atinux/atidraw
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  Веб-приложение, позволяющее рисовать и делиться своими рисунками со всем миром, с Cloudflare R2 & AI.
  ::
::

::callout
Посмотреть весь список шаблонов можно на <https://hub.nuxt.com/templates>
::
