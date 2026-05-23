<script setup lang="ts">
import type { UIMessage } from 'ai'

const props = defineProps<{
  message: UIMessage
  vote: boolean | null
}>()

const emit = defineEmits<{
  vote: [message: UIMessage, isUpvoted: boolean]
}>()

const { copy, copied } = useClipboard()

const textContent = computed(() => {
  return props.message.parts
    .filter(p => p.type === 'text')
    .map(p => (p as { text: string }).text)
    .join('\n')
})
</script>

<template>
  <div class="flex items-center gap-0.5">
    <UTooltip :text="copied ? 'Скопировано' : 'Копировать'">
      <UButton
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        :aria-label="copied ? 'Скопировано' : 'Копировать ответ'"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="copy(textContent)"
      />
    </UTooltip>

    <UTooltip text="Хороший ответ">
      <UButton
        icon="i-lucide-thumbs-up"
        aria-label="Отметить ответ как полезный"
        :aria-pressed="vote === true ? 'true' : 'false'"
        :color="vote === true ? 'success' : 'neutral'"
        variant="ghost"
        size="xs"
        @click="emit('vote', message, true)"
      />
    </UTooltip>

    <UTooltip text="Плохой ответ">
      <UButton
        icon="i-lucide-thumbs-down"
        aria-label="Отметить ответ как неполезный"
        :aria-pressed="vote === false ? 'true' : 'false'"
        :color="vote === false ? 'error' : 'neutral'"
        variant="ghost"
        size="xs"
        @click="emit('vote', message, false)"
      />
    </UTooltip>
  </div>
</template>
