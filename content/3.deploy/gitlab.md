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

::caution
If you are **not** using a custom domain, you need to set `NUXT_APP_BASE_URL` to your repository-slug for your build step.

**Example**: `https://<group/user>.gitlab.io/<repository>/`: `NUXT_APP_BASE_URL=/<repository>/ npm run generate`
::

## Развертывание

1. Вот пример рабочего процесса GitLab Pages для развертывания вашего сайта на GitLab Pages:

```yaml [.gitlab-ci.yml]
# Job name has to be `pages`. See https://docs.gitlab.com/ee/user/project/pages/#how-it-works
pages:
   image: node
   before_script:
      - npm ci --cache .npm --prefer-offline
   script:
      # Укажите здесь шаги, необходимые для создания вашего приложения
      - npm run generate
   cache: # https://docs.gitlab.com/ee/ci/caching/#cache-nodejs-dependencies
      key:
         files:
         - package-lock.json
      paths:
         - .npm/
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
