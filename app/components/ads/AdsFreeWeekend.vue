<template>
  <div class="group relative border border-default rounded-md hover:bg-elevated/50 w-full transition-colors p-2">
    <ULink
      to="https://vueschool.io/freeweekend/?friend=nuxt"
      target="_blank"
      class="absolute inset-0 z-10"
    />
    <div class="flex justify-center w-full aspect-video">
      <img src="/assets/ads/vueschool-free-weekend.png" alt="VueSchool — бесплатные выходные" class="w-full rounded-sm">
    </div>

    <div class="text-xs text-muted py-1 pt-2 transition-colors group-hover:text-default">
      Неограниченный доступ ко всем курсам. Включая Vue.js Master Class.
    </div>
  </div>
</template>
