---
title: Hostinger
description: 'Разверните приложение Nuxt на Hostinger Node.js Hosting.'
componentImg: Hostinger
logoSrc: '/assets/integrations/hostinger.svg'
category: Хостинг
nitroPreset: 'node-server'
website: 'https://www.hostinger.com/'
---
## Развертывание через Git

1. Отправьте код в репозиторий GitHub.
2. Войдите в [hPanel](https://hpanel.hostinger.com), перейдите в **Websites** и нажмите **Add Website**.
3. Выберите **Node.js Apps**, затем **Import Git Repository**.
4. Разрешите Hostinger доступ к вашему аккаунту GitHub и выберите репозиторий.
5. Hostinger автоматически определит приложение Nuxt и предложит настройки сборки.
6. Нажмите **Deploy** — приложение будет собрано и опубликовано автоматически.

После развертывания каждый push в репозиторий запускает новую сборку и автоматически обновляет приложение.

## Развертывание через загрузку файлов

1. Упакуйте файлы проекта в архив `.zip`.
2. В hPanel перейдите в **Websites → Add Website → Node.js Apps**, затем выберите **Upload your website files**.
3. Загрузите файл `.zip` и подтвердите настройки сборки.
4. Нажмите **Deploy**.

Подробнее о [развертывании Node.js](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/) на Hostinger.
