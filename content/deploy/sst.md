---
title: SST
description: 'Разверните приложение Nuxt в AWS с помощью SST.'
logoSrc: '/assets/integrations/sst.svg'
category: Хостинг
nitroPreset: 'aws-lambda'
website: 'https://sst.dev/'
---

Nuxt поддерживает развёртывание на [SST](https://sst.dev/) с минимальной настройкой.

## Быстрый старт

1. Создайте проект Nuxt.
2. Инициализируйте SST в проекте:
   ```bash
   npx sst@latest init
   ```
3. SST определит использование Nuxt и предложит обновить `nuxt.config.ts`:
   ```ts
   nitro: {
     preset: 'aws-lambda'
   }
   ```
4. Для развёртывания выполните:
   ```bash
   npx sst deploy --stage production
   ```

Подробный туториал: [Nuxt на SST](https://sst.dev/docs/start/aws/nuxt).

## Дополнительно

Nuxt можно развернуть и в контейнере через SST. Подробнее — в [документации SST](https://sst.dev/docs/start/aws/nuxt).
