---
title: Koyeb
description: 'Разверните ваше приложение Nuxt на Koyeb инфраструктуре.'
logoIcon: 'i-simple-icons-koyeb'
category: Хостинг
nitroPreset: 'koyeb'
website: 'https://www.koyeb.com/'
---

Nuxt поддерживает развертывание на [Koyeb serverless platform](https://www.koyeb.com/docs) с минимальными настройками.

## Настройка

1. Создайте новое приложение Koyeb для Nuxt, следуя [руководству](https://www.koyeb.com/docs/deploy/nuxt).

2. Установите в поле `engines.node` в файле `package.json` вашего проекта значение [Koyeb-поддерживаемой версии Node.js](https://www.koyeb.com/docs/build-and-deploy/build-from-git/nodejs#runtime):

    ```json [package.json]
    {
      "engines": {
          "node": "20.x"
      }
    }
    ```

3. Убедитесь, что скрипты `build` и `start` определены в файле `package.json` проекта, чтобы определить, как собирать и запускать приложение:

    ```json [package.json]
    {
      "scripts": {
          "build": "nuxt build",
          "start": "node .output/server/index.mjs"
      }
    }
    ```

4. Во время развертывания вам потребуется настроить переменные окружения. В настройках службы установите следующую [переменную окружения](https://www.koyeb.com/docs/build-and-deploy/environment-variables):

    ```bash
    SERVER_PRESET=koyeb
    ```

5. Нажмите «Развернуть», чтобы создать и развернуть приложение Nuxt.

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/koyeb" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания Koyeb.
::
