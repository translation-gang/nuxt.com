---
title: Firebase
description: 'Разверните ваше приложение Nuxt на Firebase инфраструктуре.'
logoIcon: 'i-logos-firebase'
category: Хостинг
nitroPreset: 'firebase'
website: 'https://firebase.google.com/'
---

## Firebase App Hosting (рекомендуется)

::note
Для начала работы потребуется тариф [**Blaze**](https://firebase.google.com/pricing) (оплата по мере использования).
::

:read-more{title="Firebase App Hosting" to="https://firebase.google.com/docs/app-hosting"}

### Настройка проекта

1. Откройте [консоль Firebase](https://console.firebase.google.com/) и создайте новый проект.
2. В боковом меню выберите **Build > App Hosting**.
    - На этом шаге может потребоваться обновить тариф.
3. Нажмите **Get Started**.
    - Выберите регион.
    - Импортируйте репозиторий GitHub (нужно привязать аккаунт GitHub).
    - Настройте развёртывание (корневая директория и ветка), включите автоматические выкатывания.
    - Задайте уникальный ID для бэкенда.
4. Нажмите Finish & Deploy для первого выкатывания.

При развёртывании через Firebase App Hosting пресет App Hosting запускается автоматически при сборке.

## Firebase функции (устарело)

::important
Этот способ развёртывания устарел и не рекомендуется. Рекомендуется использовать Firebase App Hosting для развёртывания Nuxt на Firebase.
::

Чтобы использовать более новое и рекомендуемое поколение функций Firebase, установите опцию `firebase.gen` в значение `2`:

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

Разверните хостинг Firebase Hosting, выполнив сборку Nuxt, а затем запустив команду `firebase deploy`.

```bash
npm run build -- --preset=firebase
firebase deploy
```

## Параметры

Вы можете задать параметры для функций Firebase в файле `nuxt.config.ts`:

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

## Другие Cloud Functions

Вы можете получить предупреждение о том, что другие облачные функции будут удалены при развёртывании проекта Nuxt. Это происходит потому, что Nitro развернет весь ваш проект в функции firebase. Если вы хотите развернуть только ваш проект Nuxt, вы можете использовать флаг `--only`:

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

## Переменные окружения

Чтобы задать переменные окружения для функций Firebase, скопируйте файл `.env` в директорию `.output/server`. Можно добавить скрипт `postbuild` в `package.json` — он выполнится после сборки:

```json [package.json]
{
  "scripts": {
    "postbuild": "cp .env .output/server/.env"
  }
}
```

::read-more{to="https://firebase.google.com/docs/functions/config-env?gen=2nd#env-variables" target="\_blank"}
Подробнее в **документации Firebase**.
::
