<script setup lang="ts">
withDefaults(defineProps<{
  label: string
}>(), {
  label: 'Результаты не найдены.'
})
</script>

<template>
  <UCard>
    <div class="flex flex-col items-center py-12">
      <UIcon name="i-ph-magnifying-glass" class="w-16 h-16 mx-auto text-gray-500 dark:text-gray-400 mb-4" aria-hidden="true" />

      <p class="text-lg text-center max-w-sm">
        {{ label }}
      </p>

      <div class="flex items-center gap-3 mt-6">
        <slot />
      </div>
    </div>
  </UCard>
</template>
