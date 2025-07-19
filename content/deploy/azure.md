---
title: Azure
description: 'Разверните ваше приложение Nuxt на Azure инфраструктуре.'
logoIcon: 'i-logos-azure-icon'
category: Хостинг
nitroPreset: 'azure'
website: 'https://azure.microsoft.com/en-us/services/app-service/static/'
---

## Azure Static Web Apps

::tip
**Нулевая конфигурация ✨**
:br
Интеграция с провайдером Azure Static Web Apps возможна с нулевой настройкой, [подробнее](https://nitro.unjs.io/deploy#zero-config-providers).
::

Статические веб-приложения Azure предназначены для постоянного развертывания в рамках рабочего процесса [GitHub Actions](https://docs.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow). По умолчанию Nuxt определяет эту среду развертывания, чтобы включить предустановку `azure`.

### Локальный предварительный просмотр

Установите [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local), если хотите протестировать локально.

Вы можете вызвать среду разработки для предварительного просмотра перед развертыванием.

```bash [Terminal]
npx nuxi build --preset=azure
npx @azure/static-web-apps-cli start .output/public --api-location .output/server
```

### Конфигурация

Статические веб-приложения Azure [настраиваются](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration) с помощью файла `staticwebapp.config.json`.

Nuxt автоматически генерирует этот конфигурационный файл, когда приложение собирается с предустановкой `azure`.

Он добавляет следующие свойства, основываясь на следующих критериях:

| Свойство | Критерии | По умолчанию |
| --- | --- | --- |
| **[platform.apiRuntime](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#platform)** | Будет автоматически установлен на `node:16` или `node:14` в зависимости от конфигурации вашего пакета. | `node:16` |
| **[navigationFallback.rewrite](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#fallback-routes)** | Всегда `/api/server` | `/api/server` |
| **[routes](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration#routes)** | Добавляются все пререндеренные маршруты. Кроме того, если у вас нет файла `index.html`, то в целях совместимости будет создан пустой файл, а также запросы к `/index.html` будут перенаправлены в корневой каталог, который обрабатывается `/api/server`.  | `[]` |

### Пользовательская конфигурация

Вы можете изменить сгенерированную конфигурацию с помощью опции `azure.config`. Например, если вы хотите указать Node runtime для ваших Azure Functions, измените файл `nuxt.config.ts` следующим образом:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // ...
  nitro: {
    azure: {
      config: {
        // ...
        platform: {
          apiRuntime: 'node:18'
        }
      }
    }
  }
})
```

Пользовательские маршруты будут добавлены и сопоставлены первыми. В случае конфликта (определяется, если объект имеет одинаковое свойство route) пользовательские маршруты будут преобладать над сгенерированными.

### Развертывание с помощью CI/CD через GitHub Actions

Когда вы связываете свой репозиторий GitHub с Azure Static Web Apps, в репозиторий добавляется файл workflow.

Когда вам будет предложено выбрать фреймворк, выберите пользовательский и укажите следующую информацию:

| Входные данные | Значение |
| --- | --- |
| **app_location** | '/' |
| **api_location** | '.output/server' |
| **output_location** | '.output/public' |

Если вы пропустите этот шаг, вы всегда можете найти раздел конфигурации сборки в своем рабочем процессе и обновить конфигурацию сборки:

```yaml [.github/workflows/azure-static-web-apps-<RANDOM_NAME>.yml]
###### Конфигурация репозитория/сборки ######
app_location: '/'
api_location: '.output/server'
output_location: '.output/public'
###### Завершение конфигурации репозитория/сборки ######
```

::callout
Вот и все! Теперь Azure Static Web Apps будет автоматически разворачивать ваше приложение на базе Nitro в режиме push.
::

Если вы используете `runtimeConfig`, вам, скорее всего, потребуется настроить соответствующие [переменные окружения в Azure](https://docs.microsoft.com/en-us/azure/static-web-apps/application-settings).

## Дополнительные параметры

::read-more{to="https://nitro.unjs.io/deploy/providers/azure" target="_blank"}
Узнайте о других предустановках развертывания Azure в документации Nitro.
::
