<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'admin'
})

useSeoMeta({
  title: 'Аналитика',
  description: 'Аналитика отзывов',
  ogTitle: 'Аналитика',
  ogDescription: 'Аналитика отзывов'
})
</script>

<template>
  <AdminAnalytics />
</template>
