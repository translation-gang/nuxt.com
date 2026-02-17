---
title: Northflank
description: 'Разверните приложение Nuxt в инфраструктуре Northflank.'
logoSrc: '/assets/integrations/northflank.svg'
category: Хостинг
nitroPreset: 'node'
website: 'https://www.northflank.com/'
---

Nuxt поддерживает развёртывание на [Northflank](https://www.northflank.com) с минимальной настройкой.

## Настройка

1. Подключите [провайдера Git](https://northflank.com/docs/v1/application/getting-started/link-your-git-account) и [создайте новый проект](https://northflank.com/docs/v1/application/getting-started/create-a-project) в Northflank.
   
2. В проекте создайте [Service](https://northflank.com/docs/v1/application/getting-started/build-and-deploy-your-code) и привяжите его к репозиторию Nuxt.

3. Убедитесь, что в package.json есть скрипт start для запуска production-сервера Nuxt.
  ```json [package.json]
  {
    "scripts": {
      "start": "node .output/server/index.mjs"
    }
  }
  ```

4. Нажмите «Create Service», чтобы собрать и развернуть приложение Nuxt.

::read-more{to="https://northflank.com/docs" target="_blank"}
Подробнее в **документации Northflank**.
::
