---
title: Vercel
description: 'Разверните ваше приложение Nuxt на Vercel инфраструктуре.'
componentImg: Vercel
logoSrc: '/assets/integrations/vercel.svg'
category: Хостинг
nitroPreset: 'vercel'
website: 'https://vercel.com/'
---

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с Vercel возможна с нулевой конфигурацией, [подробнее](https://nitro.unjs.io/deploy#zero-config-providers).
::

## Развертывание с помощью Git

1. Поместите код в свой git-репозиторий (GitHub, GitLab, Bitbucket).
2. [Импортируйте ваш проект](https://vercel.com/new) в Vercel.
3. Vercel определит, что вы используете Nitro, и включит правильные настройки для развертывания.
4. Ваше приложение развернуто!

После того как проект импортирован и развернут, все последующие изменения в ветках будут генерировать [Preview Deployments](https://vercel.com/docs/concepts/deploy/environments#preview), а все изменения, внесенные в Production Branch (обычно «main»), приведут к [Production Deployment](https://vercel.com/docs/concepts/deploy/environments#production).

Узнайте больше о [Интеграции с Git в Vercel](https://vercel.com/docs/concepts/git).

## Vercel Edge функции

Можно развернуть ваши приложения Nuxt непосредственно на [Vercel Edge Функциях](https://vercel.com/docs/concepts/functions/edge-functions).

> Функции Vercel Edge Functions позволяют быстро и персонализировано доставлять контент посетителям вашего сайта.
> Они по умолчанию развернуты в глобальной сети Vercel Edge Network и позволяют перенести server-side логику в Edge, ближе к месту нахождения посетителей.
> Функции Edge используют Vercel Edge Runtime, который построен на том же высокопроизводительном движке V8 JavaScript и WebAssembly, что и браузер Chrome.
> Используя преимущества этого небольшого рантайма, Edge-функции могут иметь более быструю загрузку и более высокую масштабируемость, чем бессерверные функции.
> Edge Functions запускаются после кэша и могут как кэшировать, так и возвращать ответы. [Читать далее](https://vercel.com/docs/concepts/functions/edge-functions)

Чтобы использовать это, установите следующую переменную окружения:

```bash
SERVER_PRESET=vercel_edge
```

Или обновите команду сборки на `nuxt build --preset=vercel_edge`.

## Vercel KV Storage

Вы можете легко использовать [Vercel KV Storage](https://vercel.com/docs/storage/vercel-kv) с [Nuxt Server Storage](/docs/guide/directory-structure/server#server-storage).

::read-more{to="https://unstorage.unjs.io/drivers/vercel-kv" target="_blank"}
Подробнее о драйвере Vercel KV читайте в документации Unstorage.
::

1. Установите зависимость `@vercel/kv`:

    ```bash [Terminal]
    npm i @vercel/kv
    ```

2. Обновите файл `nuxt.config.ts`:

    ```ts [nuxt.config.ts]
    export default defineNuxtConfig({
      nitro: {
        storage: {
          data: {
            driver: 'vercelKV'
            /* Vercel KV driver параметры */
          }
        }
      }
    })
    ```

::caution
Вам нужно либо установить переменные окружения `KV_REST_API_URL` и `KV_REST_API_TOKEN`, либо передать `url` и `token` в опции драйвера. Более подробную информацию об использовании смотрите в [документации по драйверам](https://unstorage.unjs.io/drivers/vercel-kv).
::

Теперь вы можете получить доступ к своему хранилищу данных в любом месте директории `server/`:

```ts [server/routes/hello.ts]
export default defineEventHandler(async (event) => {
  const dataStorage = useStorage('data');
  await dataStorage.setItem('hello', 'world');

  return {
    hello: await dataStorage.getItem("hello"),
  }
})
```

## Пользовательская конфигурация вывода сборки

Вы можете предоставить дополнительную [конфигурацию вывода сборки](https://vercel.com/docs/build-output-api/v3), используя ключ `nitro.vercel.config` внутри `nuxt.config.ts`. Она будет объединена со встроенной, автоматически генерируемой конфигурацией.

## Шаблоны

::card-group
  ::card
  ---

  icon: i-simple-icons-github
  title: Nuxt Vercel ISR
  to: https://github.com/danielroe/nuxt-vercel-isr
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Пример приложения Nuxt с гибридным рендерингом, развернутого на Vercel.

  ::
  ::card
  ---
  icon: i-simple-icons-github
  title: Nuxt on the Edge on Vercel
  to: https://github.com/pi0/nuxt-on-the-edge
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Пример приложения Nuxt, работающего на Vercel Edge Functions.
  ::
::

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/vercel" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше об инкрементной статической регенерации по требованию или более продвинутых опциях.
::
