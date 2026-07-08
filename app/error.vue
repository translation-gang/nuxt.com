<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'Страница не найдена',
  description: 'К сожалению, эта страница не найдена.'
})

defineProps<{ error: NuxtError }>()

const route = useRoute()
const { version } = useDocsVersion()

const { data: navigation } = await useFetch('/api/navigation.json')

const versionNavigation = computed(() => navigation.value?.filter(item => item.path === version.value.path || item.path === '/blog') ?? [])

provide('navigation', versionNavigation)
</script>

<template>
  <UApp>
    <div :class="[(route.path.startsWith('/docs/') || route.path.startsWith('/deploy')) && 'root']">
      <Header />

      <UError :error="error" />

      <AppFooter />

      <ClientOnly>
        <Search :navigation="versionNavigation" />
      </ClientOnly>
    </div>
  </UApp>
</template>
