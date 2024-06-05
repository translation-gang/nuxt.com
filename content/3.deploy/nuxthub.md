---
title: NuxtHub
description: 'Разверните свое full-stack приложение Nuxt на глобальных серверах вашего аккаунта Cloudflare.'
componentImg: NuxtHub
logoSrc: '/assets/integrations/nuxthub.svg'
category: Хостинг
featured: true
nitroPreset: 'cloudflare-pages'
website: 'https://hub.nuxt.com'
---

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с NuxtHub возможна с нулевой конфигурацией, [узнать больше](https://nitro.unjs.io/deploy#zero-config-providers).
::

::note
NuxtHub - это платформа развертывания и администрирования для Nuxt на базе Cloudflare. :br Основное отличие от [Cloudflare](/deploy/cloudflare) заключается в том, что NuxtHub обеспечивает развертывание с нулевой конфигурацией (инициализация, развертывание и администрирование). :br Он также предоставляет мощный интерфейс администратора для управления вашими проектами Nuxt (база данных, blob, KV, ...), а также [удалённое хранение](https://hub.nuxt.com/docs/getting-started/remote-storage).
::

## Быстрый старт

- Войдите на сайт [admin.hub.nuxt.com](https://admin.hub.nuxt.com)
- Подключите свой аккаунт Cloudflare, нажав на `Создать новый токен с необходимыми правами` и следуйте инструкциям
- Теперь вы готовы развернуть ваш проект Nuxt на вашем аккаунте Cloudflare!

## Развертывание с помощью Git

1. Разместите код в своем git-репозитории (GitHub или GitLab).
2. Нажмите на `Новый проект`, затем `Импортировать Git-репозиторий`.
3. Выберите репозиторий и нажмите на `Импортировать репозиторий`.
4. NuxtHub настроит ваш проект на Cloudflare Pages и развернет его
5. Ваше приложение будет развернуто с доменом `.nuxt.dev`.

После импорта и развертывания вашего проекта все последующие изменения в ветках будут генерировать предварительные развертывания, а все изменения, внесенные в продакшен ветку (обычно «main»), приведут к развертыванию на продакшен.

### NuxtHub CLI

::warning
Если вы выполните первое развертывание с помощью NuxtHub CLI, вы не сможете прикрепить свой репозиторий GitHub/GitLab в дальнейшем из-за ограничения Cloudflare.
::

Вы можете развернуть свой локальный проект с помощью одной команды:

```bash [Terminal]
npx nuxthub deploy
```

Далее:

1. Убедитесь, что вы авторизованы на [admin.hub.nuxt.com](admin.hub.nuxt.com)
2. Свяжите ваш локальный проект с проектом NuxtHub или помогите создать новый
3. Соберите ваш проект Nuxt с правильным пресетом
4. Разверните его на вашем аккаунте Cloudflare со всеми необходимыми ресурсами
5. Предоставьте вам URL-адрес для доступа к вашему проекту

::note
Вы также можете установить [NuxtHub CLI](https://github.com/nuxt-hub/cli) глобально с помощью: `npm i -g nuxthub`.
::

## Шаблоны

::card-group
  ::card
  ---

  icon: i-simple-icons-github
  title: NuxtHub Starter
  to: https://github.com/nuxt-hub/starter
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Минимальный стартовый набор для начала работы с хранилищем и функциями NuxtHub.
  ::
  ::card
  ---

  icon: i-simple-icons-github
  title: Nuxt Todos
  to: https://github.com/atinux/nuxt-todos-edge
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
::

::callout
Посмотреть весь список шаблонов можно на <https://hub.nuxt.com/templates>
::
