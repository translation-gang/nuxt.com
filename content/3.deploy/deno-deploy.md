---
title: Deno Deploy
description: 'Разверните ваше приложение Nuxt на Deno Deploy инфраструктуре.'
logoIcon: 'i-logos-deno'
category: Хостинг
nitroPreset: 'deno-deploy'
website: 'https://deno.com/deploy'
---

::important
Предварительная установка Deno deploy является экспериментальной.
::

## Развертывание с помощью CLI

Вы можете использовать [deployctl](https://deno.com/deploy/docs/deployctl) для развертывания вашего приложения.

Войдите в [Deno Deploy](https://dash.deno.com/account#access-tokens), чтобы получить токен доступа `DENO_DEPLOY_TOKEN`, и установите его в качестве переменной окружения.

```bash
# Сборка с предварительной установкой deno_deploy
npm run build --preset=deno_deploy

# Убедитесь, что команда deployctl запущена из выходного каталога.
cd .output
deployctl deploy --project=my-project server/index.ts --token=<DENO_DEPLOY_TOKEN>
```

## Развертывание в рамках CI/CD с помощью GitHub Actions

Свяжите свой репозиторий GitHub с проектом Deno Deploy и выберите режим развертывания «GitHub Actions». Это можно сделать в настройках проекта на <https://dash.deno.com>.

Создайте файл действия GitHub в вашем репозитории:

```yaml [.github/workflows/deno_deploy.yml]
name: deno-deploy
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
jobs:
  deploy:
    steps:
      - uses: actions/checkout@v3
      - run: corepack enable
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
        env:
          NITRO_PRESET: deno_deploy
      - name: Deploy to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: <my-project>
          entrypoint: server/index.ts
          root: .output
```

::important
Обязательно переименуйте `<my-project>` в название вашего проекта.
::

## Шаблоны

::card-group
  ::card
  ---
  icon: i-simple-icons-github
  title: Nuxt Deno KV
  to: https://github.com/Atinux/nuxt-deno-kv
  target: _blank
  ui.icon.base: text-black dark:text-white
  ---

  Совместное приложение для составления списков дел, созданное с помощью Deno KV и Nuxt.
  ::
::

## Узнать больше

::read-more{to="https://nitro.unjs.io/deploy/providers/deno-deploy" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания deno-deploy.
::
