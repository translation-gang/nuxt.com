---
title: GitLab Pages
description: 'Разверните ваше приложение Nuxt на GitLab Pages.'
logoSrc: '/assets/integrations/gitlab.svg'
category: Хостинг
website: 'https://docs.gitlab.com/ee/user/project/pages'
---

Nuxt поддерживает развертывание на [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages) с минимальными настройками.

::caution
GitLab Pages поддерживает только статические сайты, Nuxt будет предварительно рендерить ваше приложение в статические HTML-файлы.
::

## Развертывание

1. Вот пример рабочего процесса GitLab Pages для развертывания вашего сайта на GitLab Pages:

```yaml [.gitlab-ci.yml]
# Образ Docker, который будет использоваться для сборки вашего приложения
image: node:lts
# Функции, которые должны быть выполнены перед запуском сценария сборки
before_script:
   - npm install
cache:
   paths:
      # Директории, кэшируемые между сборками
      - node_modules/
pages:
   script:
      # Укажите здесь шаги, необходимые для создания вашего приложения
      - npm run generate
   artifacts:
      paths:
         # Директория, содержащая собранные файлы для публикации
         - .output/public
   # Директория, содержащая собранные файлы для публикации
   publish: .output/public
   rules:
      # Это гарантирует, что развертывание страниц будет происходить
      # только в ветке по умолчанию
      - if: $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH
```

## Узнать больше

::read-more{to="https://docs.gitlab.com/ee/user/project/pages/getting_started_part_one.html#project-website-examples" target="_blank"}
Перейдите по ссылке **Доменные имена и URL-адреса по умолчанию GitLab Pages**, чтобы узнать больше о доменных именах по умолчанию GitLab Pages.
::
