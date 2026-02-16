<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '#ui/types'

const {
  label = 'Подпишитесь на нашу рассылку',
  description = 'Следите за новыми выпусками и функциями, руководствами и обновлениями сообщества.'
} = defineProps<{
  label?: string
  description?: string
}>()

const toast = useToast()
const { track } = useAnalytics()

const loading = ref(false)

const schema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true

  await $fetch('/api/newsletter/subscribe', {
    method: 'POST',
    body: {
      email: event.data.email
    }
  }).then(() => {
    track('Newsletter Subscription', { success: true })
    toast.add({ title: 'Подписка ожидается', description: 'Пожалуйста, проверьте почту, чтобы подтвердить подписку.', color: 'success' })
    state.email = ''
  }).catch((err) => {
    track('Newsletter Subscription', { success: false })
    const description = err.data?.message || 'Что-то пошло не так. Попробуйте позже.'
    toast.add({ title: 'Подписка не удалась', description, color: 'error' })
  })
  loading.value = false
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormField name="email" :label="label" size="lg" :description="description" :ui="{ label: 'font-semibold', container: 'mt-3' }">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="you@domain.com"
        required
        autocomplete="off"
        class="max-w-sm w-full"
      >
        <template #trailing>
          <UButton type="submit" size="xs" color="neutral" :label="loading ? 'Подписываемся' : 'Подпишись'" :loading="loading" />
        </template>
      </UInput>
    </UFormField>
  </UForm>
</template>
