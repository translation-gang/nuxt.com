<script setup lang="ts">
interface PageLink {
  label: string
  icon?: string
  to?: string
  target?: '_blank' | '_parent' | '_self' | '_top' | string
  external?: boolean
}

interface Props {
  hasLinks?: boolean
  communityLinks: PageLink[]
}

defineProps<Props>()

const route = useRoute()
const { open } = useNuxtAgent()
const { track } = useAnalytics()

function explainWithAI() {
  track('Nuxi Explain Page', { page: route.path })
  open('Объясни эту страницу')
}
</script>

<template>
  <USeparator v-if="hasLinks" type="dashed" />
  <UPageLinks title="Сообщество" :links="communityLinks" />
  <USeparator type="dashed" />
  <UPageLinks
    :links="[{
      label: 'Пояснить через агента',
      icon: 'i-lucide-brain',
      onClick: explainWithAI
    }]"
  />
  <USeparator type="dashed" />
  <SocialLinks />
  <Ads />
</template>
