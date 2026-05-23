<script setup lang="ts">
import { joinURL } from 'ufo'

definePageMeta({
  layout: 'chat'
})

const site = useSiteConfig()

useHead({
  title: 'Агент Nuxt'
})

useSeoMeta({
  ogTitle: 'Агент Nuxt · Nuxt',
  ogDescription: 'Агент Nuxt помогает изучать документацию — спрашивайте о Nuxt, модулях, деплое и многом другом.',
  ogImage: joinURL(site.url, '/nuxt-agent.jpg'),
  twitterTitle: 'Агент Nuxt · Nuxt',
  twitterDescription: 'Агент Nuxt помогает изучать документацию — спрашивайте о Nuxt, модулях, деплое и многом другом.',
  twitterImage: joinURL(site.url, '/nuxt-agent.jpg')
})
useCanonical()
</script>

<template>
  <ClientOnly>
    <ChatPanel />
  </ClientOnly>
</template>
