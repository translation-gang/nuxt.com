import { createSharedComposable } from '@vueuse/core'

function _useHeaderLinks() {
  const route = useRoute()
  const { version } = useDocsVersion()

  const headerLinks = computed(() => {
    const to = version.value.path

    return [{
      label: 'Документация',
      icon: 'i-lucide-book-marked',
      to,
      search: false,
      active: route.path.startsWith(to),
      children: [{
        label: 'Начало',
        description: 'Learn how to get started with Nuxt to build your first app.',
        icon: 'i-lucide-rocket',
        to: `${to}/getting-started`,
        active: route.path.startsWith(`${to}/getting-started`)
      }, {
        label: 'Руководство',
        description: 'Get the key concepts, directory structure and best practices.',
        icon: 'i-lucide-book-open',
        to: `${to}/guide`,
        active: route.path.startsWith(`${to}/guide`)
      }, {
        label: 'API',
        description: 'Explore the Nuxt components, composables, utilities and more.',
        icon: 'i-lucide-code-xml',
        to: `${to}/api`,
        active: route.path.startsWith(`${to}/api`)
      }, {
        label: 'Примеры',
        description: 'Откройте для себя и изучите официальные и общественные примеры.',
        icon: 'i-lucide-app-window-mac',
        to: `${to}/examples`,
        active: route.path.startsWith(`${to}/examples`)
      }, {
        label: 'Сообщество',
        description: 'Найдите ответы и поддержку в сообществе.',
        icon: 'i-lucide-messages-square',
        to: `${to}/community`,
        active: route.path.startsWith(`${to}/community`)
      }]
    }, {
      label: 'Интеграции',
      to: '/modules',
      icon: 'i-lucide-unplug',
      search: false,
      active: route.path.startsWith('/modules') || route.path.startsWith('/deploy'),
      children: [{
        label: 'Модули',
        description: 'Усильте свой проект Nuxt модулями.',
        icon: 'i-lucide-puzzle',
        to: '/modules'
      }, {
        label: 'Хостинг',
        description: 'Разверните свой проект Nuxt в любом месте.',
        icon: 'i-lucide-rocket',
        to: '/deploy'
      }]
    }, {
      label: 'Ресурсы',
      icon: 'i-lucide-library',
      to: '/templates',
      search: false,
      active: route.path.startsWith('/templates') || route.path.startsWith('/video-courses') || route.path.startsWith('/showcase'),
      children: [{
        label: 'Шаблоны',
        icon: 'i-lucide-app-window',
        description: 'Начните свой следующий проект с шаблона Nuxt.',
        to: '/templates'
      }, {
        label: 'Видеокурсы',
        description: 'Изучайте Nuxt с помощью видеокурсов.',
        icon: 'i-lucide-graduation-cap',
        to: '/video-courses'
      }, {
        label: 'Витрина',
        description: 'Discover and explore projects built with Nuxt.',
        icon: 'i-lucide-presentation',
        to: '/showcase'
      }, {
        label: 'Сертификация Nuxt',
        description: 'Получите сертификат компетентности.',
        icon: 'i-lucide-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: 'Продукты',
      icon: 'i-lucide-sparkle',
      search: false,
      children: [{
        label: 'Nuxt UI Pro',
        to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=header',
        description: 'Build faster with premium components for Vue or Nuxt.',
        icon: 'i-lucide-panels-top-left',
        target: '_blank'
      }, {
        label: 'Nuxt Studio',
        to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=header',
        description: 'Edit your Nuxt Content website with a visual editor.',
        icon: 'i-lucide-pen',
        target: '_blank'
      }, {
        label: 'NuxtHub',
        to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=header',
        description: 'Deploy & manage full-stack Nuxt apps that scale.',
        icon: 'i-lucide-rocket',
        target: '_blank'
      }]
    }, {
      label: 'Энтерпрайс',
      icon: 'i-lucide-building-2',
      to: '/enterprise',
      search: false,
      children: [{
        label: 'Поддержка',
        to: '/enterprise/support',
        description: 'Профессиональная поддержка экспертов Nuxt.',
        icon: 'i-lucide-life-buoy'
      }, {
        label: 'Агентства',
        to: '/enterprise/agencies',
        description: 'Агентства, специализирующиеся на разработке Nuxt.',
        icon: 'i-lucide-handshake'
      }, {
        label: 'Спонсоры',
        to: '/enterprise/sponsors',
        description: 'Помогите нам поддержать развитие Nuxt.',
        icon: 'i-lucide-hand-heart'
      }]
    }, {
      label: 'Блог',
      icon: 'i-lucide-newspaper',
      to: '/blog'
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

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

export const useFooterLinks = () => ({ footerLinks })

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()
  const searchTerm = ref<string>('')

  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()

  const searchLinks = computed(() => [
    {
      label: 'Ask AI',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect: () => nuxtApp.$kapa?.openModal()
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
    }).filter((link): link is NonNullable<typeof link> => Boolean(link)), {
      label: 'Команда',
      icon: 'i-lucide-users',
      to: '/team'
    }, {
      label: 'Набор для дизайна',
      icon: 'i-lucide-palette',
      to: '/design-kit'
    }, {
      label: 'Рассылка',
      icon: 'i-lucide-mail',
      to: '/newsletter'
    }])

  type SearchGroup = {
    id: string
    label: string
    icon?: string
    items: Array<{
      id: string
      label: string
      suffix?: string
      icon?: string
      avatar?: {
        src?: string
        ui?: {
          root: string
        }
      }
      to: string
      onSelect?: () => Promise<void>
    }>
  }

  const searchGroups = computed<SearchGroup[]>(() => {
    const aiGroup: SearchGroup = {
      id: 'ask-ai-search',
      label: 'ИИ',
      icon: 'i-lucide-wand',
      items: []
    }

    const modulesGroup: SearchGroup = {
      id: 'modules-search',
      label: 'Modules',
      items: []
    }

    const hostingGroup: SearchGroup = {
      id: 'hosting-search',
      label: 'Hosting',
      items: []
    }

    const groups = [aiGroup, modulesGroup, hostingGroup]

    if (!searchTerm.value) {
      return groups
    }

    aiGroup.items = [{
      id: `ask-ai-${searchTerm.value}`,
      label: `Спросите ИИ о "${searchTerm.value}"`,
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        return nuxtApp.$kapa.openModal(searchTerm.value)
      }
    }]

    const loadModules = async () => {
      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      modulesGroup.items = modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field as keyof typeof module]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.npm,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon),
            ui: {
              root: 'rounded-none bg-transparent'
            }
          },
          to: `/modules/${module.name}`
        }))
    }

    const loadHosting = async () => {
      const { providers, fetchList } = useHostingProviders()
      if (!providers.value.length) {
        await fetchList()
      }

      hostingGroup.items = providers.value
        .filter(hosting => ['title'].map(field => hosting[field as keyof typeof hosting]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(hosting => ({
          id: `hosting-${hosting.path}`,
          label: hosting.title,
          suffix: hosting.description,
          icon: hosting.logoIcon,
          avatar: hosting.logoSrc
            ? {
                src: hosting.logoSrc,
                ui: {
                  root: 'rounded-none bg-transparent'
                }
              }
            : undefined,
          to: hosting.path
        }))
    }

    onMounted(() => {
      Promise.all([
        loadModules(),
        loadHosting()
      ]).catch(error => console.error('Error loading search results:', error))
    })

    return groups
  })

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
