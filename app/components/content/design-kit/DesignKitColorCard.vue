<script setup lang="ts">
const props = defineProps<{
  name: string
  background: string
}>()

const { copy } = useClipboard()

function copyLink() {
  copy(props.background, {
    title: 'Скопировано в буфер',
    icon: 'i-lucide-copy-check'
  })
}
</script>

<template>
  <div>
    <UCard class="p-16 sm:p-16" :style="{ background }" />

    <div class="flex items-center justify-between pt-2">
      <h5 class="font-semibold text-highlighted text-base">
        {{ name }}
      </h5>
      <UButton variant="link" label="Копировать" size="sm" @click="copyLink" />
    </div>
    <p class="text-muted text-sm">
      {{ background }}
    </p>
  </div>
</template>
