<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { user, clear } = useUserSession()
const colorMode = useColorMode()

async function logout() {
  await clear()
  await navigateTo('/')
}

const items = computed<DropdownMenuItem[][]>(() => {
  const groups: DropdownMenuItem[][] = [
    [{
      type: 'label',
      label: user.value?.name || user.value?.username || 'Аккаунт',
      avatar: {
        src: user.value?.avatar,
        alt: user.value?.username
      }
    }]
  ]

  const accountItems: DropdownMenuItem[] = [{
    label: 'Чаты с Nuxi',
    icon: 'i-lucide-message-circle',
    to: '/dashboard/chat'
  }]
  if (user.value?.role === 'admin') {
    accountItems.push({
      label: 'Аналитика',
      icon: 'i-lucide-chart-bar',
      to: '/admin/analytics'
    })
  }
  groups.push(accountItems)

  groups.push([{
    label: 'Оформление',
    icon: 'i-lucide-sun-moon',
    children: [[
      {
        label: 'Светлая',
        icon: 'i-lucide-sun',
        onSelect: () => { colorMode.preference = 'light' },
        checked: colorMode.value === 'light'
      },
      {
        label: 'Тёмная',
        icon: 'i-lucide-moon',
        onSelect: () => { colorMode.preference = 'dark' },
        checked: colorMode.value === 'dark'
      }
    ]]
  }])

  groups.push([{
    label: 'Выйти',
    icon: 'i-lucide-log-out',
    onSelect: logout
  }])

  return groups
})
</script>

<template>
  <UDropdownMenu
    v-if="user"
    :items="items"
    :content="{ align: 'end' }"
  >
    <UButton
      :avatar="{ src: user.avatar, alt: user.username }"
      color="neutral"
      variant="ghost"
      square
      :aria-label="user.username"
    />
  </UDropdownMenu>
</template>
