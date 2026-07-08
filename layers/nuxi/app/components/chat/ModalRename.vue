<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()

const emit = defineEmits<{ close: [string | false] }>()

const value = ref(props.title ?? '')

const trimmed = computed(() => value.value.trim())

function submit() {
  if (!trimmed.value) return
  emit('close', trimmed.value)
}
</script>

<template>
  <UModal
    title="Переименовать чат"
    description="Выберите новое название для этого чата."
    :ui="{ footer: 'flex-row-reverse justify-start' }"
    :close="false"
  >
    <template #body>
      <UInput
        v-model="value"
        autofocus
        size="lg"
        placeholder="Название чата"
        class="w-full"
        :ui="{ root: 'w-full' }"
        @keydown.enter.prevent="submit"
      />
    </template>

    <template #footer>
      <UButton label="Сохранить" :disabled="!trimmed" @click="submit" />
      <UButton color="neutral" variant="ghost" label="Отмена" @click="emit('close', false)" />
    </template>
  </UModal>
</template>
