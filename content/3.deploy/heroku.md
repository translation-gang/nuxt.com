---
title: Heroku
description: 'Разверните ваше приложение Nuxt на Heroku инфраструктуре.'
logoSrc: '/assets/integrations/heroku.svg'
category: Хостинг
nitroPreset: 'heroku'
website: 'https://www.heroku.com/'
---

Nuxt поддерживает развертывание на [Heroku](https://heroku.com/) с минимальными настройками.

## Использование Heroku CLI

1. Создайте новое приложение Heroku.

    ```bash [Terminal]
    heroku create myapp
    ```

2. Настройте Heroku на использование билдпака nodejs.

    ```bash [Terminal]
    heroku buildpacks:set heroku/nodejs
    ```

3. Настройте свое приложение.

    ```bash [Terminal]
    heroku config:set SERVER_PRESET=heroku
    ```

4. Убедитесь, что в файле `package.json` есть команды `start` и `build`.

    ```json [package.json]
    {
      "scripts": {
        "build": "nuxt build",
        "start": "node .output/server/index.mjs"
      }
    }
    ```

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/heroku" target="_blank"}
Ознакомьтесь с **документацией Nitro**, чтобы узнать больше о предварительной настройке развертывания Heroku.
::
