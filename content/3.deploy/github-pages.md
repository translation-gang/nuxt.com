---
title: GitHub Pages
description: 'Разверните ваше приложение Nuxt на GitHub Pages инфраструктуре.'
logoIcon: 'i-simple-icons-github'
category: Хостинг
nitroPreset: 'github-pages'
website: 'https://pages.github.com/'
---

Nuxt поддерживает развертывание на [GitHub Pages](https://pages.github.com/) с минимальными настройками.

::caution
GitHub Pages поддерживает только статические сайты, Nuxt будет предварительно рендерить ваше приложение в статические HTML-файлы.
::

::caution
Если вы **не** используете пользовательский домен, вам нужно установить `NUXT_APP_BASE_URL` на ваш репозиторий-slug для вашего шага сборки.

**Пример**: `https://<user>.github.io/<repository>/`: `NUXT_APP_BASE_URL=/<repository>/ npx nuxt build --preset github_pages`
::

## Настройка

Выполните следующие шаги, чтобы [создать сайт GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Развертывание

Вот пример рабочего процесса GitHub Actions для развертывания вашего сайта на GitHub Pages с использованием предустановки `github_pages`:

```yaml [.github/workflows/deploy.yml]
# https://github.com/actions/deploy-pages#usage
name: Deploy to GitHub Pages
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: corepack enable
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      # Выберите свой собственный менеджер пакетов и сценарий сборки
      - run: npm install
      - run: npx nuxt build --preset github_pages
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./.output/public
  # Задание по развертыванию
  deploy:
    # Добавьте зависимость в задание сборки
    needs: build
    # Предоставьте GITHUB_TOKEN права, необходимые для развертывания Pages
    permissions:
      pages: write      # для развертывания в Pages
      id-token: write   # для проверки того, что развертывание происходит из соответствующего источника
    # Развертывание в среде github_pages
    environment:
      name: github_pages
      url: ${{ steps.deployment.outputs.page_url }}
    # Определите раннер + шаг развертывания
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

::read-more{to="https://nitro.unjs.io/deploy/providers/github-pages" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания github-pages.
::
