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

## Introduction

NuxtHub is a deployment and administration platform for Nuxt, powered by Cloudflare.

The main difference with the [Cloudflare](/deploy/cloudflare) deployment is that NuxtHub provides a zero-configuration deployment experience (provisioning, deployment, and administration).

It also provides a powerful admin interface to manage your Nuxt projects (database, blob, KV, ...) as well as [remote storage](https://hub.nuxt.com/docs/getting-started/remote-storage?utm_source=nuxt-website&utm_medium=deploy-page).

Read more on [hub.nuxt.com](https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=deploy-page).

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

See an example in video:

::video{poster="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.jpg" controls class="rounded dark:border dark:border-gray-700 md:w-2/3"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.webm" type="video/webm"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.mp4" type="video/mp4"}
  :source{src="https://res.cloudinary.com/nuxt/video/upload/v1723569534/nuxthub/nuxthub-deploy_xxs5s8.ogg" type="video/ogg"}
::

::note
Вы также можете установить [NuxtHub CLI](https://github.com/nuxt-hub/cli) глобально с помощью: `npm i -g nuxthub`.
::

::warning
If you do your first deployment with the NuxtHub CLI, you won't be able to attach your GitHub/GitLab repository later on due to a Cloudflare limitation.
::

## Deploy using Git

1. Push your code to your git repository (GitHub or GitLab)
2. Click on `New Project` then `Import a Git repository`
3. Select your repository and click on `Import repository`
4. NuxtHub will configure your project on Cloudflare Pages and deploy it
5. Your application is deployed with a `.nuxt.dev` domain

After your project has been imported and deployed, all subsequent pushes to branches will generate preview deployments and all changes made to the production branch (commonly “main”) will result in a production deployment.

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
  A minimal Nuxt starter running on the edge.
  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: NuxtHub Starter
  to: https://github.com/nuxt-hub/starter
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---
  A starter to get started with NuxtHub features (Database, Blob, KV, ...).
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
  title: Nuxt Image Gallery
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
  Web application that lets you to draw and share your drawings with the world, with Cloudflare R2 & AI.
  ::
::

::callout
Посмотреть весь список шаблонов можно на <https://hub.nuxt.com/templates>
::
