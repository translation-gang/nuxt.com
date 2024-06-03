---
title: AWS Amplify
description: 'Разверните ваше приложение Nuxt на AWS Amplify инфраструктуре.'
componentImg: Amplify
logoIcon: 'i-logos-aws-amplify'
category: Хостинг
nitroPreset: 'aws-amplify'
website: 'https://aws.amazon.com/amplify/?trk=bed847b4-6e9f-4e09-ba09-0d4680a0447b&sc_channel=el'
---

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с AWS Amplify возможна с нулевой конфигурацией, [узнать больше](https://nitro.unjs.io/deploy#zero-config-providers).
::

## Настройка

1. Войдите в [AWS Amplify Hosting Console](https://console.aws.amazon.com/amplify/?trk=01c5a476-5997-4e6a-88b9-fd0a0a5bbe34&sc_channel=el).
2. Нажмите «Начать» > Amplify Hosting (размещение вашего веб-приложения).
3. Выберите и авторизуйте доступ к вашему провайдеру репозитория Git и выберите основную ветку.
4. Выберите имя для приложения, убедитесь, что настройки сборки автоматически определяются, и установите переменные среды требований в разделе «Дополнительно».
5. В качестве опции выберите Enable SSR logging, чтобы включить ведение журнала на стороне сервера в вашем аккаунте Amazon CloudWatch.
6. Подтвердите конфигурацию и нажмите «Сохранить и развернуть».

## Узнать больше

::read-more{to="https://www.youtube.com/watch?v=CAk5_XGkOG4" target="_blank"}
Посмотрите руководство по хостингу Amplify Hosting с помощью Nuxt
::

::read-more{to="https://nitro.unjs.io/deploy/providers/aws-amplify" target="_blank"}
Перейдите по ссылке **Документация Nitro**, чтобы узнать больше о предустановке развертывания aws-amplify.
::
