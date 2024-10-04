---
title: Firebase
description: 'Разверните ваше приложение Nuxt на Firebase инфраструктуре.'
logoIcon: 'i-logos-firebase'
category: Хостинг
nitroPreset: 'firebase'
website: 'https://firebase.google.com/'
---

## Firebase функции

Чтобы использовать более новое и рекомендуемое поколение функций firebase, установите опцию `firebase.gen` в значение `2`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    firebase: {
      gen: 2
    }
  }
})
```

::note
Если по каким-либо причинам вы не можете использовать конфигурацию, в качестве альтернативы можно воспользоваться переменной окружения `NITRO_FIREBASE_GEN=2`.
::

Если у вас уже есть развернутая версия вашего сайта и вы хотите перейти на 2-й gen, [см. процесс миграции в документации Firebase](https://firebase.google.com/docs/functions/2nd-gen-upgrade). А именно, CLI попросит вас удалить существующие функции перед развертыванием новых.

::tip{to="https://firebase.google.com/docs/functions/version-comparison" target="_blank"}
Сравнение функций 1-го и 2-го поколения
::

## Настройка проекта

Вы можете предпочесть настроить проект с помощью Firebase CLI, который получит для вас идентификатор проекта, добавит необходимые зависимости (см. выше) и даже настроит автоматическое развертывание через GitHub Actions (только для хостинга). [Узнайте об установке Firebase CLI](https://firebase.google.com/docs/cli#windows-npm).

1. Установите последнюю версию Firebase CLI.

    ```bash [Terminal]
    npm install -g firebase-tools@latest
    ```

2. Инициализируйте ваш проект Firebase

    ```bash [Terminal]
    firebase login
    firebase init hosting
    ```

::note
При появлении запроса вы можете указать `.output/public` в качестве публичной директории. На следующем шаге **не** конфигурируйте проект как одностраничное приложение.
::

После завершения работы добавьте следующее в файл `firebase.json`, чтобы включить серверный рендеринг в Cloud Functions:

```json [firebase.json]
{
  "functions": { "source": ".output/server" },
  "hosting": [
    {
      "site": "<your_project_id>",
      "public": ".output/public",
      "cleanUrls": true,
      "rewrites": [{ "source": "**", "function": "server" }]
    }
  ]
}
```

## Локальный предварительный просмотр

Вы можете предварительно просмотреть локальную версию своего сайта, если вам нужно протестировать его без развертывания.

```bash
npm run build -- --preset=firebase
firebase emulators:start
```

## Сборка и развертывание

Разверните хостинг Firebase Hosting, выполнив сборку Nitro, а затем запустив команду `firebase deploy`.

```bash
npm run build -- --preset=firebase
firebase deploy
```

## Параметры

Вы можете задать параметры для функций firebase в файле `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        region: 'europe-west1',
        maxInstances: 3,
      },
    },
  },
});
```

### Версия Node.js для выполнения

В конфигурации можно задать пользовательскую версию Node.js:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    firebase: {
      nodeVersion: '18' // Может быть '16' или '18' или '20'
    },
  },
});
```

Инструменты Firebase используют версию `engines.node` в `package.json`, чтобы определить, какую версию node использовать для ваших функций. Nuxt автоматически записывает в `.output/server/package.json` сконфигурированную версию Node.js.

Вам также может понадобиться добавить ключ времени выполнения в файл `firebase.json`:

```json [firebase.json]
{
  "functions": {
    "source": ".output/server",
    "runtime": "nodejs20"
  }
}
```

::read-more{to="https://firebase.google.com/docs/functions/manage-functions?gen=2nd#set_nodejs_version" target="_blank"}
Подробнее об этом можно прочитать в **Firebase Docs**.
::

## Если в вашем проекте firebase есть другие облачные функции

Вы можете получить предупреждение о том, что другие облачные функции будут удалены при развертывании проекта Nuxt. Это происходит потому, что Nitro развернет весь ваш проект в функции firebase. Если вы хотите развернуть только ваш проект Nuxt, вы можете использовать флаг `--only`:

```bash
firebase deploy --only functions:server,hosting
```

::read-more{to="https://nitro.unjs.io/deploy/providers/firebase" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания Firebase.
::

## Использование Cookies в продакшене

При использовании Firebase Hosting вместе с Cloud Functions или Cloud Run куки обычно удаляются из входящих запросов, чтобы обеспечить эффективное поведение CDN-кеша. Только куки со специальным именем `__session` могут быть переданы вашему приложению.

::read-more{to="https://firebase.google.com/docs/hosting/manage-cache#using_cookies" target="\_blank"}
Для получения дополнительной информации обратитесь к документации **Firebase**.
::

## Working with Environment Variables

To set environment variables for your Firebase functions, you need to copy the `.env` file to the `.output/server` directory.
You can do this by adding a `postbuild` script to your `package.json`, that will automatically run after the build command:

```json [package.json]
{
  "scripts": {
    "postbuild": "cp .env .output/server/.env"
  }
}
```

::read-more{to="https://firebase.google.com/docs/functions/config-env?gen=2nd#env-variables" target="\_blank"}
For more information, refer to the **Firebase documentation**.
::