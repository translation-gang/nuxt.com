---
title: Flightcontrol
description: 'Разверните ваше приложение Nuxt на Flightcontrol инфраструктуре.'
logoSrc: '/assets/integrations/flightcontrol.webp'
category: Хостинг
nitroPreset: 'flightcontrol'
website: 'https://www.flightcontrol.dev'
---

Nitro поддерживает развертывание в [AWS через Flightcontrol](https://flightcontrol.dev?ref=nuxt) с минимальными настройками.

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с Flightcontrol возможна с нулевой конфигурацией.
::

## Настройте свою учетную запись Flightcontrol

В общих чертах, чтобы развернуть проект в первый раз, вам нужно выполнить следующие шаги:

1. Создайте учетную запись на сайте [Flightcontrol](https://app.flightcontrol.dev/signup?ref=nuxt).
2. Создайте учетную запись на [AWS](https://portal.aws.amazon.com/billing/signup) (если у вас ее еще нет).
3. Свяжите свою учетную запись AWS с Flightcontrol
4. Авторизуйте приложение Flightcontrol GitHub App для доступа к выбранным вами репозиториям, публичным или частным.
5. Создайте проект Flightcontrol с конфигурацией через приборную панель или с конфигурацией через `flightcontrol.json`.

## Создание проекта с конфигурацией через приборную панель

1. Создайте проект Flightcontrol с помощью панели управления. Выберите репозиторий для источника.
2. Выберите тип конфигурации `GUI`.
3. Выберите предустановку Nuxt.
4. Выберите желаемый размер сервера AWS.
5. Отправьте форму нового проекта.

## Создание проекта с конфигурацией через `flightcontrol.json`

1. Создайте проект Flightcontrol на панели управления. Выберите репозиторий для источника.
2. Выберите тип конфигурации `flightcontrol.json`.
3. Добавьте новый файл в корень репозитория с именем `flightcontrol.json`. Вот пример конфигурации, которая создает сервис AWS fargate для вашего приложения:

    ```json [flightcontrol.json]
    {
      "$schema": "https://app.flightcontrol.dev/schema.json",
      "environments": [
        {
          "id": "production",
          "name": "Production",
          "region": "us-west-2",
          "source": {
            "branch": "main"
          },
          "services": [
            {
              "id": "nitro",
              "buildType": "nixpacks",
              "name": "My Nitro site",
              "type": "fargate",
              "domain": "www.yourdomain.com",
              "outputDirectory": ".output",
              "startCommand": "node .output/server/index.mjs",
              "cpu": 0.25,
              "memory": 0.5
            }
          ]
        }
      ]
    }
    ```

4. Отправьте форму нового проекта.

::read-more{to="https://www.flightcontrol.dev/docs?ref=nuxt" target="_blank"}
Узнайте больше о конфигурации Flightcontrol.
::

::read-more{to="https://nitro.unjs.io/deploy/providers/flightcontrol" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания flightcontrol.
::
