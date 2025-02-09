import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()
  const headerLinks = computed(() => {
    const route = useRoute()

    return [{
      label: 'Документация',
      icon: 'i-ph-book-bookmark',
      to: '/docs',
      search: false,
      children: [{
        label: 'Начало',
        description: 'Узнайте, как начать работу с Nuxt.',
        icon: 'i-ph-rocket-launch',
        to: '/docs/getting-started',
        active: route.path.startsWith('/docs/getting-started')
      }, {
        label: 'Руководство',
        description: 'Узнайте, как создавать и развертывать приложения Nuxt.',
        icon: 'i-ph-book-open',
        to: '/docs/guide',
        active: route.path.startsWith('/docs/guide')
      }, {
        label: 'API',
        description: 'Изучите API Nuxt.',
        icon: 'i-ph-code',
        to: '/docs/api',
        active: route.path.startsWith('/docs/api')
      }, {
        label: 'Примеры',
        description: 'Откройте для себя и изучите официальные и общественные примеры.',
        icon: 'i-ph-app-window',
        to: '/docs/examples',
        active: route.path.startsWith('/docs/examples')
      }, {
        label: 'Сообщество',
        description: 'Найдите ответы и поддержку в сообществе.',
        icon: 'i-ph-chats-teardrop',
        to: '/docs/community',
        active: route.path.startsWith('/docs/community')
      }]
    }, {
      label: 'Интеграции',
      to: '/modules',
      icon: 'i-ph-plugs-connected',
      search: false,
      active: route.path.startsWith('/modules') || route.path.startsWith('/deploy'),
      children: [{
        label: 'Модули',
        description: 'Усильте свой проект Nuxt модулями.',
        icon: 'i-ph-puzzle-piece',
        to: '/modules'
      }, {
        label: 'Хостинг',
        description: 'Разверните свой проект Nuxt в любом месте.',
        icon: 'i-ph-rocket-launch',
        to: '/deploy'
      }]
    }, {
      label: 'Ресурсы',
      icon: 'i-ph-books',
      to: '/templates',
      search: false,
      active: route.path.startsWith('/templates') || route.path.startsWith('/video-courses'),
      children: [{
        label: 'Шаблоны',
        icon: 'i-ph-browsers',
        description: 'Начните свой следующий проект с шаблона Nuxt.',
        to: '/templates'
      }, {
        label: 'Видеокурсы',
        description: 'Изучайте Nuxt с помощью видеокурсов.',
        icon: 'i-ph-graduation-cap',
        to: '/video-courses'
      }, {
        label: 'Витрина',
        description: 'Discover and explore projects built with Nuxt.',
        icon: 'i-ph-projector-screen',
        to: '/showcase'
      }, {
        label: 'Сертификация Nuxt',
        description: 'Получите сертификат компетентности.',
        icon: 'i-ph-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: 'Продукты',
      icon: 'i-ph-sparkle',
      search: false,
      children: [{
        label: 'Nuxt UI Pro',
        to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=header',
        description: 'Премиальные компоненты Vue для Nuxt.',
        icon: 'i-ph-layout',
        target: '_blank'
      }, {
        label: 'Nuxt Studio',
        to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=header',
        description: 'CMS для Nuxt, основанная на Git',
        icon: 'i-ph-pen',
        target: '_blank'
      }, {
        label: 'NuxtHub',
        to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=header',
        description: 'Создавайте, развертывайте и управляйте приложениями Nuxt, которые масштабируются.',
        icon: 'i-ph-rocket-launch',
        target: '_blank'
      }]
    }, {
      label: 'Энтерпрайс',
      icon: 'i-ph-buildings',
      to: '/enterprise',
      search: false,
      children: [{
        label: 'Поддержка',
        to: '/enterprise/support',
        description: 'Профессиональная поддержка экспертов Nuxt.',
        icon: 'i-ph-lifebuoy'
      }, {
        label: 'Агентства',
        to: '/enterprise/agencies',
        description: 'Агентства, специализирующиеся на разработке Nuxt.',
        icon: 'i-ph-handshake'
      }, {
        label: 'Спонсоры',
        to: '/enterprise/sponsors',
        description: 'Помогите нам поддержать развитие Nuxt.',
        icon: 'i-ph-hand-heart'
      }]
    }, {
      label: 'Блог',
      icon: 'i-ph-newspaper',
      to: '/blog'
    }]
  })

  const footerLinks = [{
    label: 'Сообщество',
    children: [{
      label: 'Nuxters',
      to: 'https://nuxters.nuxt.com',
      target: '_blank'
    }, {
      label: 'Команда',
      to: '/team'
    }, {
      label: 'Набор для дизайна',
      to: '/design-kit'
    }]
  }, {
    label: 'Продукты',
    children: [{
      label: 'Nuxt UI Pro',
      to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=footer',
      target: '_blank'
    }, {
      label: 'Nuxt Studio',
      to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=footer',
      target: '_blank'
    }, {
      label: 'NuxtHub',
      to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=footer',
      target: '_blank'
    }]
  }, {
    label: 'Enterprise',
    children: [{
      label: 'Поддержка',
      to: '/enterprise/support'
    }, {
      label: 'Агентства',
      to: '/enterprise/agencies'
    }, {
      label: 'Спонсоры',
      to: '/enterprise/sponsors'
    }]
  }]

  const searchLinks = computed(() => [
    {
      label: 'Ask AI',
      icon: 'i-ph-magic-wand',
      to: 'javascript:void(0);',
      click: () => nuxtApp.$kapa?.openModal()
    },
    ...headerLinks.value.map((link) => {
    // Remove `/docs` and `/enterprise` links from command palette
      if (link.search === false) {
        return {
          label: link.label,
          icon: link.icon,
          children: link.children
        }
      }

      return link
    }).filter(Boolean), {
      label: 'Команда',
      icon: 'i-ph-users',
      to: '/team'
    }, {
      label: 'Набор для дизайна',
      icon: 'i-ph-palette',
      to: '/design-kit'
    }, {
      label: 'Рассылка',
      icon: 'i-ph-envelope-simple',
      to: '/newsletter'
    }])

  const searchGroups = [{
    key: 'ask-ai-search',
    label: 'ИИ',
    icon: 'i-ph-magic-wand',
    search: async (q) => {
      if (!q) {
        return []
      }

      return [{
        label: `Спросите ИИ о "${q}"`,
        icon: 'i-ph-magic-wand',
        to: 'javascript:void(0);',
        click() {
          return nuxtApp.$kapa.openModal(q)
        }
      }]
    }
  }, {
    key: 'modules-search',
    label: 'Модули',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      return modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.npm,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon),
            ui: {
              rounded: 'rounded-md'
            }
          },
          to: `/modules/${module.name}`
        }))
    }
  }, {
    key: 'hosting-search',
    label: 'Хостинг',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { providers, fetchList } = useHostingProviders()
      if (!providers.value.length) {
        await fetchList()
      }

      return providers.value
        .filter(hosting => ['title'].map(field => hosting[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
        .map(hosting => ({
          id: `hosting-${hosting._path}`,
          label: hosting.title,
          suffix: hosting.description,
          icon: hosting.logoIcon,
          avatar: hosting.logoSrc
            ? {
                src: hosting.logoSrc
              }
            : undefined,
          to: hosting._path
        }))
    }
  }, {
    key: 'articles-search',
    label: 'Статьи',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { articles, fetchList } = useBlog()
      if (!articles.value.length) {
        await fetchList()
      }

      return articles.value
        .filter(article => article.title.search(searchTextRegExp(q)) !== -1)
        .map(article => ({
          id: `article-${article._path}`,
          label: article.title,
          suffix: article.description,
          icon: 'i-ph-newspaper',
          to: article._path
        }))
    }
  }]

  return {
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = createSharedComposable(_useNavigation)
