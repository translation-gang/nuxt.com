---
title: Render
description: 'Разверните ваше приложение Nuxt на Render инфраструктуре.'
logoSrc: '/assets/integrations/render.jpg'
category: Хостинг
nitroPreset: 'render'
website: 'https://render.com/'
---

Nuxt поддерживает развертывание на [Render](https://render.com/) с минимальными настройками.

## Настройка приложения

1. [Создайте новый веб-сервис](https://dashboard.render.com/select-repo?type=web) и выберите репозиторий, содержащий ваш код.
2. Убедитесь, что выбрано окружение 'Node'.
3. В зависимости от менеджера пакетов задайте команду сборки: `yarn && yarn build`, `npm install && npm run build` или `pnpm i --shamefully-hoist && pnpm build`.
4. Обновите команду запуска на `node .output/server/index.mjs`.
5. Нажмите «Дополнительно» и добавьте следующие переменные окружения

    ```bash
    SERVER_PRESET=render_com
    NODE_VERSION=20
    ```

6. Нажмите на `Create Web Service`.

## Дополнительные параметры

::read-more{to="https://nitro.unjs.io/deploy/providers/render" target="_blank"}
Ознакомьтесь с документацией **Nitro**, чтобы узнать больше о пресетах развертывания Render.
::
