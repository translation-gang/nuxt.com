---
title: Netlify
description: 'Разверните ваше приложение Nuxt на Netlify инфраструктуре.'
componentImg: Netlify
logoIcon: 'i-logos-netlify-icon'
category: Хостинг
featured: true
nitroPreset: 'netlify'
website: https://www.netlify.com/
---

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с Netlify возможна с нулевой настройкой, [узнать больше](https://nitro.unjs.io/deploy#zero-config-providers).
::

## Настройка

Nuxt автоматически определит, что вы находитесь в среде сборки [Netlify](https://www.netlify.com) и соберет оптимизированную версию вашего сервера.

Для новых сайтов Netlify определит, что вы используете Nuxt 3 и установит директорию публикации в `dist`, а команду сборки в `npm run build`.

::note
Если вы обновляете существующий сайт с Nuxt 2, вам следует проверить их и при необходимости обновить.
::

Если вы хотите добавить пользовательские редиректы, вы можете сделать это с помощью [`routeRules`](/docs/guide/concepts/rendering#hybrid-rendering) или добавив файл [`_redirects`](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file) в каталог `public`.

::tip{color="green" icon="i-ph-check-circle-duotone"}
Для развертывания просто запустите git-репозиторий [как вы обычно делаете для Netlify](https://docs.netlify.com/configure-builds/get-started/).
::

## Netlify Edge Функции

::read-more{to="https://www.netlify.com/blog/announcing-serverless-compute-with-edge-functions" target="_blank"}
Netlify Edge Functions использует Deno и мощную среду выполнения V8 JavaScript, чтобы позволить вам запускать глобально распределенные функции для максимально быстрого отклика.
::

Установите следующую переменную окружения для запуска Nuxt на Edge Functions:

```bash
SERVER_PRESET=netlify_edge
```

## On-demand Builders

On-demand Builders - это бессерверные функции, используемые для генерации веб-контента по мере необходимости, который автоматически кэшируется в Netlify's Edge CDN.

Они позволяют создавать страницы сайта при первом посещении пользователем и затем кэшировать их для последующих посещений до следующего развертывания.

::read-more{to="https://docs.netlify.com/configure-builds/on-demand-builders/" target="_blank"}
Подробнее о Netlify on-demand builders
::

Установите следующую переменную окружения, чтобы включить on-demand builders:

```bash
SERVER_PRESET=netlify_builder
```

::read-more{to="https://nitro.unjs.io/deploy/providers/netlify" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания netlify.
::
