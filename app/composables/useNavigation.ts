import type { CommandPaletteGroup } from '@nuxt/ui'
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
      active: route.path.startsWith(to) || route.path.startsWith(`/deploy`),
      children: [{
        label: 'Начало',
        description: 'Learn how to get started with Nuxt to build your first app.',
        icon: 'i-lucide-rocket',
        to: `${to}/getting-started/installation`,
        active: route.path.startsWith(`${to}/getting-started`)
      }, {
        label: 'Структура',
        description: 'Структура директорий проекта Nuxt.',
        icon: 'i-lucide-folder-open',
        to: `${to}/directory-structure`,
        active: route.path.startsWith(`${to}/directory-structure`)
      }, {
        label: 'Руководство',
        description: 'Ключевые концепции, структура и лучшие практики.',
        icon: 'i-lucide-book-open',
        to: `${to}/guide`,
        active: route.path.startsWith(`${to}/guide`) && !route.path.startsWith(`${to}/guide/directory-structure`)
      }, {
        label: 'API',
        description: 'Explore the Nuxt components, composables, utilities and more.',
        icon: 'i-lucide-code-xml',
        to: `${to}/api`,
        active: route.path.startsWith(`${to}/api`)
      }, {
        label: 'Деплой',
        description: 'Разверните проект Nuxt где угодно.',
        icon: 'i-lucide-cloud',
        to: '/deploy',
        active: route.path.startsWith('/deploy')
      }, {
        label: 'Примеры',
        description: 'Официальные и общественные примеры.',
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
      label: 'Модули',
      icon: 'i-lucide-puzzle',
      to: '/modules',
      description: 'Расширьте проект Nuxt модулями.'
    }, {
      label: 'Шаблоны',
      icon: 'i-lucide-app-window',
      description: 'Начните следующий проект с шаблона Nuxt.',
      to: '/templates'
    }, {
      label: 'Ресурсы',
      icon: 'i-lucide-library',
      to: '/showcase',
      search: false,
      active: route.path.startsWith('/video-courses') || route.path.startsWith('/showcase'),
      children: [{
        label: 'Витрина',
        description: 'Проекты, созданные на Nuxt.',
        icon: 'i-lucide-presentation',
        to: '/showcase'
      }, {
        label: 'Видеокурсы',
        description: 'Изучайте Nuxt с помощью видеокурсов.',
        icon: 'i-lucide-graduation-cap',
        to: '/video-courses'
      }, {
        label: 'Сертификация Nuxt',
        description: 'Получите сертификат компетентности.',
        icon: 'i-lucide-medal',
        to: 'https://certification.nuxt.com',
        target: '_blank'
      }]
    }, {
      label: 'Энтерпрайз',
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
  label: 'Обзор',
  children: [{
    label: 'Modules',
    to: 'https://nuxt.com/modules'
  }, {
    label: 'Templates',
    to: 'https://nuxt.com/templates'
  }, {
    label: 'Showcase',
    to: 'https://nuxt.com/showcase'
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
  const { track } = useAnalytics()

  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()
  const { modules } = useModules()
  const { providers } = useHostingProviders()

  const searchLinks = computed(() => [{
    label: 'Спросите ИИ',
    icon: 'i-lucide-wand',
    to: 'javascript:void(0);',
    onSelect: () => {
      track('Ask AI Opened', { source: 'search-links' })
      nuxtApp.$kapa?.openModal()
    }
  }, ...headerLinks.value.map((link) => {
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
  }, {
    label: 'Исходный код',
    icon: 'i-lucide-code',
    to: 'https://github.com/nuxt/nuxt.com',
    target: '_blank'
  }])

  const modulesItems = computed(() => modules.value.map(module => ({
    id: `module-${module.name}`,
    label: module.npm,
    suffix: module.description,
    avatar: {
      src: moduleImage(module.icon),
      ui: {
        root: 'rounded-none bg-transparent'
      }
    },
    to: `/modules/${module.name}`,
    // Store searchable fields for filtering
    _searchFields: [module.name, module.npm, module.repo].filter(Boolean)
  })))

  const hostingItems = computed(() => providers.value.map(hosting => ({
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
    to: hosting.path,
    // Store searchable fields for filtering
    _searchFields: [hosting.title].filter(Boolean)
  })))

  const searchGroups = computed<CommandPaletteGroup[]>(() => [{
    id: 'ask-ai-search',
    label: 'ИИ',
    ignoreFilter: true,
    postFilter: (searchTerm: string, items: any[]) => {
      if (!searchTerm) {
        return []
      }
      return items
    },
    items: [{
      label: 'Спросите ИИ',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        track('Ask AI Opened', { source: 'search-palette', query: searchTerm.value })
        nuxtApp.$kapa?.openModal(searchTerm.value)
      }
    }]
  }, {
    id: 'modules-search',
    label: 'Модули',
    items: modulesItems.value
  }, {
    id: 'hosting-search',
    label: 'Хостинг',
    items: hostingItems.value
  }])

  watchDebounced(searchTerm, (term) => {
    if (term) {
      track('Search Performed', { term })
    }
  }, { debounce: 500 })

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation
