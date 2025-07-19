---
title: DigitalOcean
description: 'Разверните ваше приложение Nuxt на DigitalOcean инфраструктуре.'
logoSrc: '/assets/integrations/digitalocean.svg'
category: Хостинг
nitroPreset: 'digitalocean'
website: 'https://www.digitalocean.com/'
---

Nuxt поддерживает развертывание на [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/) с минимальными настройками.

## Настройка

1. Создайте новое приложение DigitalOcean, следуя [руководству](https://docs.digitalocean.com/products/app-platform/how-to/create-apps/).

2. Далее вам нужно настроить переменные окружения. В настройках приложения убедитесь, что есть следующие [переменные окружения на уровне приложения](https://docs.digitalocean.com/products/app-platform/how-to/use-environment-variables/):

    ```bash
    SERVER_PRESET=digital-ocean
    ```

3. Чтобы убедиться, что DigitalOcean использует поддерживаемую версию Node.js, вам необходимо задать поле `engines.node` в файле `package.json` вашего приложения:

    ```json [package.json]
    {
      "engines": {
          "node": "20.x"
      }
    }
    ```

4. Вам также нужно будет добавить команду run, чтобы DigitalOcean знал, какую команду запускать после сборки. Это можно сделать, добавив скрипт запуска в ваш `package.json`:

    ```json [package.json]
    {
      "scripts": {
          "start": "node .output/server/index.mjs"
      }
    }
    ```

5. Наконец, вам нужно добавить этот скрипт запуска в команду запуска вашего приложения DigitalOcean. Перейдите в `Компоненты > Настройки > Команды`, нажмите «Редактировать», а затем добавьте `npm run start`.

::tip
Ваше приложение Nuxt должно быть размещено на сгенерированном DigitalOcean URL, и теперь вы можете следовать [остальной части руководства по развертыванию DigitalOcean](https://docs.digitalocean.com/products/app-platform/how-to/manage-deployments/).
::

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/digitalocean" target="_blank"}
Ознакомьтесь с **документацией Nitro**, чтобы узнать больше о предустановке развертывания digitalocean.
::
