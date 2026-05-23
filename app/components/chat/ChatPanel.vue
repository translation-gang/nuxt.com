<script setup lang="ts">
const { collapseToSidebar, usage, rateLimitReached } = useNuxtAgent()
const { chat, input, votes, vote, canClear, onSubmit, askQuestion, clearMessages, chatTheme } = useAgentChat({
  source: 'chat-page',
  withPageContext: 'always'
})

const suggestions = [
  {
    icon: 'i-lucide-rocket',
    title: 'Начать проект',
    description: 'Выбрать стартовый шаблон',
    question: 'Покажи доступные стартовые шаблоны'
  },
  {
    icon: 'i-lucide-lock',
    title: 'Добавить авторизацию',
    description: 'Настройка аутентификации',
    question: 'Как добавить авторизацию в мое Nuxt-приложение?'
  },
  {
    icon: 'i-lucide-layers',
    title: 'Рендеринг',
    description: 'SSR, SSG, ISR и многое другое',
    question: 'Какие режимы рендеринга доступны в Nuxt?'
  },
  {
    icon: 'i-lucide-database',
    title: 'База данных',
    description: 'Подключить базу данных',
    question: 'Как подключить базу данных к моему Nuxt-приложению?'
  },
  {
    icon: 'i-lucide-cloud',
    title: 'Деплой',
    description: 'Вывести в продакшн',
    question: 'Как задеплоить мое Nuxt-приложение?'
  },
  {
    icon: 'i-lucide-sparkles',
    title: 'Что нового',
    description: 'Последнее в Nuxt 4',
    question: 'Что нового в Nuxt 4?'
  }
]
</script>

<template>
  <div class="flex-1 flex flex-col min-h-0 relative">
    <div class="absolute top-0 inset-x-0 z-10 backdrop-blur pointer-events-none">
      <div class="flex items-center justify-between px-3 py-2 pointer-events-auto">
        <UTooltip text="Вернуться на nuxt.com">
          <NuxtLink to="/" class="flex items-baseline gap-1.5 text-muted hover:text-highlighted transition-colors" @click="collapseToSidebar">
            <UIcon name="i-lucide-arrow-left" class="size-4" />
            <NuxtLogo class="h-4.5 w-auto" />
          </NuxtLink>
        </UTooltip>

        <div class="flex items-center gap-1.5">
          <UTooltip v-if="canClear" text="Новый разговор">
            <UButton
              icon="i-lucide-list-x"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="clearMessages"
            />
          </UTooltip>
          <UColorModeButton size="sm" color="neutral" variant="ghost" />
        </div>
      </div>
    </div>

    <template v-if="!chat.messages.length">
      <div class="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        <div class="flex w-full max-w-2xl flex-col items-center px-4">
          <div class="relative h-36 w-full shrink-0 overflow-hidden sm:h-40">
            <AgentShader variant="hero" />
          </div>
          <div class="text-center">
            <h1 class="text-2xl sm:text-3xl font-semibold text-highlighted tracking-tight">
              Чем могу помочь?
            </h1>
            <p class="text-base text-muted mt-2 max-w-lg mx-auto">
              Спросите что угодно или изучите документацию, модули, деплой и многое другое.
            </p>
          </div>
        </div>

        <div class="w-full max-w-2xl flex flex-col gap-6">
          <div v-if="rateLimitReached" class="flex items-center justify-center gap-2 py-4 text-sm text-muted">
            <UIcon name="i-lucide-clock" class="size-4 shrink-0" />
            <span>Достигнут дневной лимит. Попробуйте снова завтра.</span>
          </div>
          <UChatPrompt
            v-else
            v-model="input"
            :error="chat.error"
            placeholder="Спросите что угодно…"
            variant="subtle"
            :rows="2"
            :maxrows="5"
            autofocus
            class="[view-transition-name:chat-prompt]"
            :ui="{ base: 'px-1.5 rounded-none' }"
            @submit="onSubmit"
          >
            <template #footer>
              <UTooltip v-if="usage" text="Осталось сообщений на сегодня">
                <span class="text-xs text-dimmed" :class="usage.remaining <= 5 ? 'text-warning' : ''">
                  {{ usage.remaining }}/{{ usage.limit }}
                </span>
              </UTooltip>
              <UChatPromptSubmit
                color="neutral"
                size="sm"
                :status="chat.status"
                :disabled="chat.status === 'ready' && !input.trim()"
                @stop="chat.stop()"
                @reload="chat.regenerate()"
              />
            </template>
          </UChatPrompt>

          <div class="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion.title"
              class="flex sm:flex-col gap-3 p-4 rounded-lg border border-default bg-default hover:bg-elevated/50 text-left transition-colors cursor-pointer"
              @click="askQuestion(suggestion.question)"
            >
              <UIcon :name="suggestion.icon" class="size-5 text-muted shrink-0" />
              <div>
                <p class="text-sm font-medium text-highlighted">
                  {{ suggestion.title }}
                </p>
                <p class="text-sm text-muted mt-0.5 hidden sm:block">
                  {{ suggestion.description }}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex-1 overflow-y-auto overscroll-none">
        <UTheme :ui="chatTheme">
          <div class="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <UChatMessages
              should-auto-scroll
              :messages="chat.messages"
              :status="chat.status"
              class="pt-10 pb-4"
            >
              <template #indicator>
                <AgentIndicator />
              </template>

              <template #content="{ message }">
                <ChatContent :message="message" />
              </template>

              <template #actions="{ message }">
                <ChatMessageActions
                  v-if="message.role === 'assistant'"
                  :message="message"
                  :vote="votes.get(message.id) ?? null"
                  @vote="vote"
                />
              </template>
            </UChatMessages>
          </div>
        </UTheme>
      </div>

      <div class="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div v-if="rateLimitReached" class="flex items-center justify-center gap-2 py-4 text-sm text-muted">
          <UIcon name="i-lucide-clock" class="size-4 shrink-0" />
          <span>Достигнут дневной лимит. Попробуйте снова завтра.</span>
        </div>
        <UChatPrompt
          v-else
          v-model="input"
          :error="chat.error"
          placeholder="Спросите что угодно…"
          variant="subtle"
          :rows="2"
          :maxrows="8"
          autofocus
          class="[view-transition-name:chat-prompt] rounded-b-none"
          :ui="{ base: 'px-1.5', root: 'rounded-b-none' }"
          @submit="onSubmit"
        >
          <template #footer>
            <UTooltip v-if="usage" text="Осталось сообщений на сегодня">
              <span class="text-xs text-dimmed" :class="usage.remaining <= 5 ? 'text-warning' : ''">
                {{ usage.remaining }}/{{ usage.limit }}
              </span>
            </UTooltip>
            <UChatPromptSubmit
              :status="chat.status"
              :disabled="chat.status === 'ready' && !input.trim()"
              color="neutral"
              size="sm"
              @stop="chat.stop()"
              @reload="chat.regenerate()"
            />
          </template>
        </UChatPrompt>
      </div>
    </template>
  </div>
</template>
