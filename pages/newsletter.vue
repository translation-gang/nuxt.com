<script setup lang="ts">
definePageMeta({
  heroBackground: 'opacity-80 -z-10'
})
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())

const title = page.value.head?.title || page.value.title
const description = page.value.head?.description || page.value.description
useSeoMeta({
  titleTemplate: '%s',
  title,
  description,
  ogDescription: description,
  ogTitle: title
})
defineOgImageComponent('Docs')
</script>

<template>
  <UContainer>
    <UPageHero v-bind="page">
      <template #links>
        <NewsletterForm class="flex-1 max-w-xs" :label="null" :description="null" />
      </template>
    </UPageHero>

    <UPage>
      <UPageBody>
        <ULandingCTA v-bind="page.cta" card />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
