<script setup lang="ts">
const { toggle, isOpen } = useNuxtAgent()
const { track } = useAnalytics()

function handleToggle() {
  track('Nuxt Agent Toggled', { source: 'header', open: !isOpen.value })
  toggle()
}
</script>

<template>
  <UTooltip text="Агент">
    <UButton
      icon="i-custom-ai"
      color="neutral"
      variant="ghost"
      @click="handleToggle"
    />
  </UTooltip>
</template>
