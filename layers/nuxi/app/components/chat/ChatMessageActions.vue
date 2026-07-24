<script setup lang="ts">
import type { UIMessage } from 'ai'
import type { DropdownMenuItem } from '@nuxt/ui'
import { format, isToday, isYesterday } from 'date-fns'
import { ru } from 'date-fns/locale'

const props = defineProps<{
  message: UIMessage
  vote: boolean | null
  streaming?: boolean
  chatId?: string
  canRegenerate?: boolean
}>()

const emit = defineEmits<{
  vote: [message: UIMessage, isUpvoted: boolean]
  regenerate: []
}>()

const { copy, copied } = useClipboard()
const { refresh: refreshChats } = useChats()
const toast = useToast()

const textContent = computed(() => {
  return props.message.parts
    .filter(p => p.type === 'text')
    .map(p => (p as { text: string }).text)
    .join('\n')
})

const createdAt = computed(() => {
  const raw = (props.message.metadata as { createdAt?: string } | undefined)?.createdAt
  return raw ? new Date(raw) : null
})

const dateLabel = computed(() => {
  if (!createdAt.value) return null
  const d = createdAt.value
  const time = format(d, 'HH:mm', { locale: ru })
  if (isToday(d)) return `Сегодня, ${time}`
  if (isYesterday(d)) return `Вчера, ${time}`
  return format(d, 'd MMM yyyy, HH:mm', { locale: ru })
})

const isBranching = ref(false)

async function branch() {
  if (!props.chatId || isBranching.value) return
  isBranching.value = true
  try {
    const { id } = await $fetch<{ id: string }>(`/api/chats/${props.chatId}/branch`, {
      method: 'POST',
      body: { messageId: props.message.id }
    })
    await refreshChats()
    await navigateTo(`/dashboard/chat/${id}`)
  } catch {
    toast.add({
      description: 'Не удалось создать ответвление чата',
      icon: 'i-lucide-alert-circle',
      color: 'error'
    })
  } finally {
    isBranching.value = false
  }
}

const moreItems = computed<DropdownMenuItem[][]>(() => {
  const items: DropdownMenuItem[] = []
  if (dateLabel.value) {
    items.push({ type: 'label', label: dateLabel.value })
  }
  if (props.chatId) {
    items.push({
      label: 'Ответвить в новый чат',
      icon: 'i-lucide-git-branch',
      disabled: isBranching.value,
      onSelect: branch
    })
  }
  return [items]
})
</script>

<template>
  <div v-if="!streaming" class="flex items-center gap-0.5">
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
        aria-label="Отметить ответ как бесполезный"
        :aria-pressed="vote === false ? 'true' : 'false'"
        :color="vote === false ? 'error' : 'neutral'"
        variant="ghost"
        size="xs"
        @click="emit('vote', message, false)"
      />
    </UTooltip>

    <UTooltip v-if="canRegenerate" text="Перегенерировать">
      <UButton
        icon="i-lucide-rotate-ccw"
        aria-label="Перегенерировать ответ"
        color="neutral"
        variant="ghost"
        size="xs"
        @click="emit('regenerate')"
      />
    </UTooltip>

    <UDropdownMenu
      v-if="moreItems[0]?.length"
      :items="moreItems"
      :content="{ align: 'start', side: 'top' }"
    >
      <UButton
        icon="i-lucide-ellipsis"
        aria-label="Ещё"
        color="neutral"
        variant="ghost"
        size="xs"
      />
    </UDropdownMenu>
  </div>
</template>
