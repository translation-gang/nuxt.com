export default defineAppConfig({
  agent: {
    faqQuestions: [
      {
        category: 'Начало работы',
        items: [
          'Покажи доступные стартовые шаблоны',
          'Что нового в Nuxt 4?',
          'Как добавить авторизацию в мое Nuxt-приложение?'
        ]
      },
      {
        category: 'Возможности',
        items: [
          'useFetch vs useAsyncData?',
          'Как работает файловая маршрутизация?',
          'Как подключить базу данных к моему Nuxt-приложению?'
        ]
      },
      {
        category: 'Деплой и изучение',
        items: [
          'Как задеплоить мое Nuxt-приложение?',
          'Какие режимы рендеринга доступны?',
          'Как добавить SEO meta-теги в Nuxt?'
        ]
      }
    ]
  },
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
      important: 'violet'
    },
    pageHero: {
      slots: {
        container: 'py-10 sm:py-20 lg:py-20',
        title: 'sm:text-5xl'
      }
    },
    prose: {
      img: {
        base: 'w-full'
      },
      codeTree: {
        slots: {
          root: 'bg-default m-0',
          content: '[&>div>pre]:rounded-r-none'
        }
      }
    }
  }
})
