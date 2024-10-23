<a href="https://nuxt.com"><img width="1200" alt="Nuxt Website" src="https://github.com/nuxt/nuxt.com/assets/904724/22772d8b-4fff-4cf9-a592-85c5ff5d6d58"></a>

# <https://nuxt-ru.vercel.app>

Добро пожаловать на сайт-репозиторий Nuxt, доступный по адресу [https://nuxt-ru.vercel.app](https://nuxt-ru.vercel.app).

[![Nuxt UI Pro](https://img.shields.io/badge/Made%20with-Nuxt%20UI%20Pro-00DC82?logo=nuxt.js&labelColor=020420)](https://ui.nuxt.com/pro)

## Настройка

Make sure to enable corepack and install the dependencies:

```bash
corepack enable
pnpm install
```

Скопируйте файл `.env.example` в файл `.env`:

```bash
cp .env.example .env
```

Клонируйте/сделайте форк репозитория [translation-gang/nuxt](https://github.com/translation-gang/nuxt) в нужном вам месте (но не в проекте Nuxt.com) и внутри директории `docs/`, запустите:

```bash
pwd
```

Если вы работаете под Windows, вместо этого можно использовать следующую команду:

```bash
echo %cd%
```

Скопируйте вывод команды выше и вставьте его в переменную `NUXT_DOCS_PATH` в файле `.env`.

## Разработка

Запустите сервер разработки:

```bash
pnpm dev
```

### Добавьте шаблон Nuxt

Чтобы добавить шаблон Nuxt в список, добавьте его в список на странице [./content/4.templates.yml](./content/4.templates.yml).

Обязательно запустите сервер разработки, чтобы сгенерировать скриншот для шаблона, и перейдите по адресу <http://localhost:3000/templates>, чтобы увидеть результат.

Если вы хотите обновить url, по которому мы делаем автоматический скриншот, используйте свойство `screenshotUrl`.

Чтобы сгенерировать изображение заново, удалите сгенерированное в папке `public/assets/templates`.

## Продакшен

Для того, чтобы собрать приложение для продакшена, вам необходимо иметь лицензию [Nuxt UI Pro](https://ui.nuxt.com/pro) и установить переменную `NUXT_UI_PRO_LICENSE` в файле `.env`.

Обратите внимание, что это не требуется для запуска в разработке и внесения вклада на сайт Nuxt или в документацию.

Соберите production-приложение:

```bash
pnpm generate
```

## Лицензия

[MIT License](./LICENSE)
