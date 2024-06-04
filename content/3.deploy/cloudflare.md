---
title: Cloudflare
description: 'Разверните ваше приложение Nuxt на Cloudflare инфраструктуре.'
logoSrc: '/assets/integrations/cloudflare.svg'
category: Хостинг
nitroPreset: 'cloudflare'
website: 'https://pages.cloudflare.com/'
---

## Страницы Cloudflare

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с Cloudflare Pages возможна с нулевой настройкой, [узнать больше](https://nitro.unjs.io/deploy#zero-config-providers).
::

### Интеграция с Git

Если вы используете интеграцию GitHub/GitLab с Cloudflare Pages, **настройка не требуется**. При отправке в ваш репозиторий проект будет автоматически собран и развернут.

::note
Nuxt определит окружающую среду, чтобы установить правильную предустановку [Server/Nitro](https://nitro.unjs.io/deploy/providers/cloudflare).
::

Чтобы использовать серверный рендеринг на уровне сети, установите команду сборки на: `nuxt build`.

Чтобы статически сгенерировать ваш сайт, задайте команду сборки: `nuxt generate`.

### Сопоставление маршрутов

Если на CloudFlare Pages будет найден HTML-файл, путь к которому совпадает с текущим запрошенным маршрутом, он будет использовать его. Он также перенаправит HTML-страницы на их аналоги без расширения: например, `/contact.html` будет перенаправлен на `/contact`, а `/about/index.html` будет перенаправлен на `/about/`.

Чтобы соответствовать правилам Cloudflare [согласования маршрутов](https://developers.cloudflare.com/pages/configuration/serving-pages/#route-matching), установите для параметра nitro `autoSubfolderIndex` значение `false`.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  }
})
```

### Прямая загрузка

В качестве альтернативы вы можете использовать [wrangler](https://github.com/cloudflare/workers-sdk) для загрузки проекта на Cloudflare.

В этом случае вам придется задать предварительную настройку вручную.

1. Создайте проект для Cloudflare Pages:

    ```bash [Terminal]
    npx nuxi build --preset=cloudflare_pages
    ```

2. Разверните, и он попросит вас создать проект в первый раз:

    ```bash [Terminal]
    wrangler pages deploy dist/
    ```

## Отключите автоминификацию

Убедитесь, что отключили минификацию HTML, CSS и JavaScript в **CloudFlare -> Speed -> Optimization -> Auto Minify**, чтобы избежать гидратации Vue.

![Отключить автоматическую минификацию Cloudflare](/assets/deploy/cloudflare-auto-minify.png)

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="_blank"}
Ознакомьтесь с **документацией Nitro**, чтобы узнать больше о предварительной настройке развертывания Cloudflare.
::

::read-more{to="https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/#use-bindings-in-your-nuxt-application" target="_blank"}
Ознакомьтесь с документацией **CloudFlare Pages**, чтобы узнать об этом подробнее.
::

## Templates

::card-group
  ::card
  ---
  icon: i-simple-icons-github
  title: Nuxt Todos Edge
  to: https://github.com/atinux/nuxt-todos-edge
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Приложение todos с аутентификацией пользователей, SSR и Cloudflare D1.

  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Atinotes
  to: https://github.com/atinux/atinotes
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Редактируемый сайт с универсальным рендерингом на базе Cloudflare KV.
  ::
::

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/cloudflare" target="_blank"}
Ознакомьтесь с **документацией Nitro**, чтобы узнать больше о предварительной настройке развертывания cloudflare.
::
