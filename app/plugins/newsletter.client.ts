export default defineNuxtPlugin(() => {
  const toast = useToast()

  useNuxtApp().hook('app:mounted', () => {
    const { email, confirmation } = useRoute().query
    if (email && confirmation) {
      $fetch('/api/newsletter/confirm', {
        method: 'POST',
        body: { email, confirmation }
      }).then(() => {
        toast.add({ title: 'Подписка оформлена', description: 'Вы успешно подписались на рассылку Nuxt.', color: 'success' })
      }).catch((err) => {
        toast.add({ title: 'Ошибка подписки', description: err.data?.message || '', color: 'error' })
      })
    }
  })
})
