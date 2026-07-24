<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  viewTransition: true
})

useNuxiChatSeo()

const { user, loggedIn } = useUserSession()
const { usage, rateLimitReached } = useNuxtAgent()

const {
  input,
  loading,
  prompt,
  onSubmit,
  handlePaste,
  removeAttachment,
  restoreToInput,
  createFromSuggestion
} = useStartChat('dashboard-home')

const baseGreeting = computed(() => {
  const name = user.value?.name?.split(' ')[0] || user.value?.username
  return name ? `Привет, ${name}` : 'Привет'
})
const greeting = ref<string>(baseGreeting.value)
onMounted(() => {
  const hour = new Date().getHours()
  let timeGreeting = 'Добрый вечер'
  if (hour < 12) timeGreeting = 'Доброе утро'
  else if (hour < 18) timeGreeting = 'Добрый день'
  const name = user.value?.name?.split(' ')[0] || user.value?.username
  greeting.value = name ? `${timeGreeting}, ${name}` : timeGreeting
})

const suggestions = [
  { icon: 'i-lucide-rocket', label: 'Покажи доступные стартовые шаблоны' },
  { icon: 'i-lucide-lock', label: 'Как добавить аутентификацию в Nuxt-приложение?' },
  { icon: 'i-lucide-layers', label: 'Какие режимы рендеринга есть в Nuxt?' },
  { icon: 'i-lucide-database', label: 'Как подключить базу данных к Nuxt-приложению?' },
  { icon: 'i-lucide-cloud', label: 'Как задеплоить Nuxt-приложение?' },
  { icon: 'i-lucide-sparkles', label: 'Что нового в Nuxt 4?' }
]
</script>

<template>
  <UDashboardPanel
    id="home"
    class="min-h-0"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <template #header>
      <UDashboardNavbar
        class="bg-default sm:px-4"
      >
        <template #right>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-custom-new-chat"
            to="/dashboard/chat"
            class="lg:hidden"
            aria-label="Новый чат"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UContainer class="flex-1 flex flex-col justify-center gap-6 sm:gap-8 py-8">
        <div class="flex flex-col items-center gap-4 sm:gap-6">
          <div class="relative h-36 w-full max-w-2xl shrink-0 overflow-hidden sm:h-40">
            <AgentShader variant="hero" />
            <AgentNuxiIcon class="absolute bottom-0 left-1/2 -translate-x-1/2 size-10 sm:size-12 shrink-0" />
          </div>
          <h1 class="text-2xl sm:text-3xl text-highlighted font-semibold tracking-tight text-center">
            {{ greeting }}
          </h1>
        </div>

        <div class="w-full max-w-2xl mx-auto flex flex-col gap-6">
          <div class="flex flex-col gap-1.5">
            <AgentDisabledHint />
            <template v-if="!loggedIn && !rateLimitReached">
              <div class="flex flex-col gap-1.5">
                <AgentLoginHint />
                <AgentChatPrompt
                  v-model="input"
                  v-bind="prompt"
                  :status="loading ? 'streaming' : 'ready'"
                  :usage="usage"
                  variant="subtle"
                  :submit-disabled="!prompt.canSubmit"
                  class="[view-transition-name:chat-prompt]"
                  :ui="{ base: 'px-1.5', footer: 'items-baseline', header: 'px-1.5 pt-1.5 pb-0 gap-1.5 flex flex-wrap items-start' }"
                  @submit="onSubmit"
                  @paste="handlePaste"
                  @remove-attachment="removeAttachment"
                  @restore-attachment="restoreToInput"
                />
              </div>
            </template>

            <AgentRateLimitBanner v-else-if="rateLimitReached" />
            <AgentChatPrompt
              v-else
              v-model="input"
              v-bind="prompt"
              :status="loading ? 'streaming' : 'ready'"
              :usage="usage"
              variant="subtle"
              :submit-disabled="!prompt.canSubmit"
              class="[view-transition-name:chat-prompt]"
              :ui="{ base: 'px-1.5', footer: 'items-baseline', header: 'px-1.5 pt-1.5 pb-0 gap-1.5 flex flex-wrap items-start' }"
              @submit="onSubmit"
              @paste="handlePaste"
              @remove-attachment="removeAttachment"
              @restore-attachment="restoreToInput"
            />
          </div>

          <div class="flex flex-wrap gap-2 justify-center">
            <UButton
              v-for="s in suggestions"
              :key="s.label"
              :icon="s.icon"
              :label="s.label"
              size="sm"
              color="neutral"
              variant="outline"
              class="rounded-full"
              :disabled="loading"
              @click="createFromSuggestion(s.label)"
            />
          </div>
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
