<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Подпишитесь на нашу рассылку'
  },
  description: {
    type: String,
    default: 'Следите за новыми выпусками и функциями, руководствами и обновлениями сообщества.'
  }
})

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  if (loading.value) {
    return
  }
  loading.value = true

  $fetch('https://api.nuxt.com/newsletter/subscribe', {
    method: 'POST',
    body: { email: email.value }
  }).then(() => {
    toast.add({ title: 'Подписка ожидается', description: 'Пожалуйста, проверьте свою электронную почту, чтобы подтвердить подписку.', color: 'green' })
    email.value = ''
  }).catch((err) => {
    const error = JSON.parse(err.data?.message)
    const description = error[0].message || 'Что-то пошло не так. Пожалуйста, повторите попытку позже.'
    toast.add({ title: 'Подписка не удалась', description, color: 'red' })
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UFormGroup name="email" :label="label" :description="description" size="xl" :ui="{ label: { base: 'font-semibold' }, container: 'mt-3' }">
      <UInput
        v-model="email"
        type="email"
        placeholder="you@domain.com"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        required
        autocomplete="off"
        class="max-w-sm"
      >
        <template #trailing>
          <UButton type="submit" size="xs" color="black" :label="loading ? 'Подписываемся' : 'Подпишись'" :loading="loading" />
        </template>
      </UInput>
    </UFormGroup>
  </form>
</template>
