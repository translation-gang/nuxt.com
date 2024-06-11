<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const route = useRoute()
const { navKeyFromPath } = useContentHelpers()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Страница не найдена', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, async () => {
  if (page.value.surround === false) {
    return []
  }
  return queryContent('/docs')
    .where({ _extension: 'md', navigation: { $ne: false } })
    .without(['body', 'excerpt'])
    .findSurround(withoutTrailingSlash(route.path))
})

const breadcrumb = computed(() => {
  const links = mapContentNavigation(findPageBreadcrumb(navigation.value, page.value)).map(link => ({
    label: link.label,
    to: link.to
  }))

  if (route.path.startsWith('/docs/bridge') || route.path.startsWith('/docs/migration')) {
    links.splice(1, 0, {
      label: 'Upgrade Guide',
      to: '/docs/getting-started/upgrade'
    })
  }

  return links
})

const titleTemplate = computed(() => {
  if (page.value.titleTemplate) return page.value.titleTemplate
  const titleTemplate = navKeyFromPath(route.path, 'titleTemplate', navigation.value)
  if (titleTemplate) return titleTemplate
  return '%s · Nuxt'
})

const communityLinks = computed(() => [{
  icon: 'i-ph-pen-duotone',
  label: 'Редактировать эту страницу',
  to: `https://github.com/translation-gang/nuxt/edit/main/docs/${page?.value?._file?.split('/').slice(1).join('/')}`,
  target: '_blank'
}, {
  icon: 'i-ph-shooting-star-duotone',
  label: 'Звезды на GitHub',
  to: 'https://github.com/nuxt/nuxt',
  target: '_blank'
}, {
  icon: 'i-ph-chat-centered-text-duotone',
  label: 'Чат в Discord',
  to: 'https://discord.com/invite/nuxt',
  target: '_blank'
}, {
  icon: 'i-ph-hand-heart-duotone',
  label: 'Стать спонсором',
  to: 'https://github.com/sponsors/nuxt',
  target: '_blank'
}])

const ecosystemLinks = [{
  icon: 'i-ph-buildings-duotone',
  label: 'Корпоративная поддержка',
  to: '/enterprise/support'
}, {
  icon: 'i-ph-handshake-duotone',
  label: 'Агентства Nuxt',
  to: '/enterprise/agencies'
}, {
  icon: 'i-ph-briefcase-duotone',
  label: 'Найти работу в Nuxt',
  to: '/enterprise/jobs'
}, {
  icon: 'i-ph-graduation-cap-duotone',
  label: 'Видеокурсы',
  to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
  target: '_blank'
}, {
  label: 'Сертификация Nuxt',
  icon: 'i-ph-medal-duotone',
  to: 'https://certification.nuxt.com',
  target: '_blank'
}]

const title = page.value.head?.title || page.value.title
const description = page.value.head?.description || page.value.description

useSeoMeta({
  titleTemplate,
  title,
  description,
  ogDescription: description,
  ogTitle: titleTemplate.value?.includes('%s') ? titleTemplate.value.replace('%s', title) : title
})

defineOgImageComponent('Docs', {
  headline: breadcrumb.value.length ? breadcrumb.value.map(link => link.label).join(' > ') : ''
})
</script>

<template>
  <UPage
    :ui="{
      right: 'sticky top-[--header-height] bg-background/75 backdrop-blur group -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))] z-10'
    }"
  >
    <UPageHeader v-bind="page">
      <template #headline>
        <UBreadcrumb :links="breadcrumb" />
      </template>
    </UPageHeader>

    <UPageBody prose class="dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
      <ContentRenderer v-if="page && page.body" :value="page" />

      <hr v-if="surround?.length">

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page.toc !== false" #right>
      <UContentToc title="Оглавление" :links="page.body?.toc?.links" :ui="{ wrapper: '' }">
        <template #bottom>
          <div class="hidden lg:block space-y-6" :class="{ '!mt-6': page.body?.toc?.links?.length }">
            <UDivider v-if="page.body?.toc?.links?.length" type="dashed" />

            <UPageLinks title="Сообщество" :links="communityLinks" />

            <UDivider type="dashed" />

            <UPageLinks title="Экосистема" :links="ecosystemLinks" />

            <UDivider type="dashed" />

            <Ads />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
