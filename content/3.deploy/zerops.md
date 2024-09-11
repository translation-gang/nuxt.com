---
title: Zerops
description: "Разверните приложение Nuxt в инфраструктуре Zerops."
componentImg: Zerops
logoSrc: "/assets/integrations/zerops.svg"
category: Hosting
NuxtPreset: "zerops"
website: "https://zerops.io"
---

**Предустановка Nodejs**: `SERVER_PRESET: zerops`
**Предустановка Static**: `SERVER_PRESET: zerops-static`

:read-more{title="Zerops" to="https://zerops.io"}

::tip
**Nuxt x Zerops Quickrun ✨**
:br
Хотите протестировать работу Nuxt на Zerops, ничего не устанавливая и не настраивая? Использование репозиториев [Zerops x Nuxt - Static](https://github.com/zeropsio/recipe-nuxt-static) или [Zerops x Nuxt - SSR on Node.js](https://github.com/zeropsio/recipe-nuxt-nodejs) вы можете развернуть пример приложения Nuxt одним щелчком мыши.
::

Zerops поддерживает развертывание как статических приложений, так и приложений с рендерингом на сервере с помощью простого файла конфигурации в корне вашего проекта.

## Статика 

Проекты и сервисы можно добавлять либо с помощью [мастера добавления проекта](https://app.zerops.io/dashboard/project-add), либо импортировать с помощью YAML-структуры:

### Создание проекта

```yml [zerops-project-import.yml]
project:
  name: recipe-nuxt

services:
  - hostname: app
    type: static
```

Это создаст проект под названием `recipe-nuxt` с сервисом Zerops Static под названием `app`.

### Настройка Zerops YAML

Чтобы указать Zerops, как собирать и запускать ваше приложение, добавьте `zerops.yml` в корень:

```yml [zerops.yml]
zerops:
  - setup: app
    build:
      base: nodejs@20
      buildCommands:
        - yarn
        - yarn nuxi generate
      deployFiles:
        - .output/public/~
    run:
      base: static
```

Теперь вы можете запустить [конвейер сборки и развертывания с помощью Zerops CLI](#building-deploying-your-app) или подключить сервис приложений к вашему репозиторию [GitHub](https://docs.zerops.io/references/github-integration/) / [GitLab](https://docs.zerops.io/references/gitlab-integration) из детализации сервиса.

## SSR Node.js

Проекты и сервисы можно добавлять либо с помощью [мастера добавления проекта](https://app.zerops.io/dashboard/project-add), либо импортировать с помощью YAML-структуры:

```yml [zerops-project-import.yml]
project:
  name: recipe-nuxt

services:
  - hostname: app
    type: nodejs@20
```

Это создаст проект под названием `recipe-nuxt` с сервисом Zerops Static под названием `app`.

### Настройка Zerops YAML

Чтобы указать Zerops, как собирать и запускать ваше приложение, добавьте `zerops.yml` в корень:

```yml [zerops.yml]
zerops:
  - setup: nuxt
    build:
      base: nodejs@18
      prepareCommands:
        - node -v
      buildCommands:
        - yarn
        - yarn build
      deployFiles:
        - .output/~
    run:
      base: nodejs@18
      ports:
        - port: 3000
          httpSupport: true
      start: node server/index.mjs
```

Теперь вы можете запустить [конвейер сборки и развертывания с помощью Zerops CLI](#building-deploying-your-app) или подключить сервис приложений к вашему репозиторию [GitHub](https://docs.zerops.io/references/github-integration/) / [GitLab](https://docs.zerops.io/references/gitlab-integration) из детализации сервиса.

## Создание и развертывание приложения {#building-deploying-your-app}

- Установите [Zerops CLI](https://github.com/zeropsio/zcli).

```sh
npm i -g @zerops/zcli
```

- Откройте [Настройки > Управление токенами доступа](https://app.zerops.io/settings/token-management) в приложении Zerops и сгенерируйте новый токен доступа.

- Войдите в систему, используя свой токен доступа, с помощью следующей команды:

```sh
zcli login <token>
```

- Перейдите в корень вашего приложения (где находится `zerops.yml`) и выполните следующую команду, чтобы запустить развертывание:

```sh
zcli push
```

Ваш код может быть развернут автоматически при каждом коммите или новом теге, если подключить сервис к вашему репозиторию [GitHub](https://docs.zerops.io/references/gitlab-integration) / [GitLab](https://docs.zerops.io/references/gitlab-integration). Это соединение можно настроить в деталях сервиса.

:read-more{title="Zerops Documentation" to="https://docs.zerops.io/"}
