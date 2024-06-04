---
title: IIS
description: 'Разверните ваше приложение Nuxt на IIS инфраструктуре.'
logoSrc: '/assets/integrations/microsoft.webp'
category: Хостинг
nitroPreset: 'iis'
website: 'https://www.iis.net/'
---

## Использование IISnode

1. Установите последнюю LTS-версию [Node.js](https://nodejs.org/en/) на ваш Windows Server.
2. Установите [IISnode](https://github.com/azure/iisnode/releases).
3. Установите [IIS `URLRewrite` Module](https://www.iis.net/downloads/microsoft/url-rewrite).
4. В IIS добавьте `.mjs` как новый тип mime и установите тип содержимого `application/javascript`.
5. Создайте приложение с помощью следующей команды:

    ```bash [Terminal]
    npx nuxi build --preset=iis_node
    ```

6. Разверните содержимое папки `.output` на вашем сайте в IIS.

## Дополнительные параметры

::read-more{to="https://nitro.unjs.io/deploy/providers/iis" target="_blank"}
Ознакомьтесь с **документацией Nitro**, чтобы узнать больше о предварительных настройках развертывания IIS.
::
