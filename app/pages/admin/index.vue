<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Админка: аналитика отзывов',
  description: 'Админка: аналитика отзывов',
  ogTitle: 'Админка: аналитика отзывов',
  ogDescription: 'Админка: аналитика отзывов'
})
</script>

<template>
  <AdminDashboard />
</template>
