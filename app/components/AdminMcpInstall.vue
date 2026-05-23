<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const { data, status, error, execute } = useFetch('/api/admin/mcp-install', {
  immediate: false,
  default: () => null
})

watch(open, (isOpen) => {
  if (isOpen && !data.value) execute()
})

const jsonString = computed(() =>
  data.value ? JSON.stringify(data.value.json, null, 2) : ''
)

const { copy: copyJson, copied: jsonCopied } = useClipboard()
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'max-w-xl' }">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="font-semibold text-lg flex items-center gap-2">
                <UIcon name="i-lucide-plug" class="size-5 text-primary" />
                Установить Admin MCP
              </h3>
              <p class="text-sm text-muted mt-1">
                Подключите ваш IDE к админскому MCP-серверу Nuxt для запросов отзывов и данных AI-агента из чата.
              </p>
            </div>
            <UButton
              size="sm"
              variant="ghost"
              color="neutral"
              icon="i-lucide-x"
              @click="open = false"
            />
          </div>
        </template>

        <div v-if="status === 'pending'" class="flex items-center gap-2 text-sm text-muted">
          <UIcon name="i-lucide-loader-2" class="size-4 animate-spin" />
          Загрузка информации об установке…
        </div>

        <UAlert
          v-else-if="error"
          color="error"
          variant="subtle"
          icon="i-lucide-triangle-alert"
          title="Не удалось загрузить информацию об установке"
          :description="error.message"
        />

        <div v-else-if="data" class="space-y-5">
          <div class="grid grid-cols-2 gap-2">
            <UButton
              :to="data.deeplinks.cursor"
              external
              color="neutral"
              variant="solid"
              icon="i-simple-icons-cursor"
              label="Установить в Cursor"
              block
            />
            <UButton
              :to="data.deeplinks.vscode"
              external
              color="neutral"
              variant="outline"
              icon="i-simple-icons-visualstudiocode"
              label="Установить в VS Code"
              block
            />
          </div>

          <USeparator label="или настройте вручную" />

          <div class="space-y-3">
            <div class="space-y-1.5">
              <label class="text-xs font-medium text-muted uppercase tracking-wide">URL сервера</label>
              <UInputCopy :value="data.url" size="lg" />
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-medium text-muted uppercase tracking-wide">Bearer токен</label>
              <UInputCopy :value="data.token" size="lg" />
            </div>

            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <label class="text-xs font-medium text-muted uppercase tracking-wide">JSON конфиг</label>
                <UButton
                  size="xs"
                  variant="ghost"
                  color="neutral"
                  :icon="jsonCopied ? 'i-lucide-check' : 'i-lucide-copy'"
                  :label="jsonCopied ? 'Скопировано' : 'Копировать'"
                  @click="copyJson(jsonString)"
                />
              </div>
              <pre class="text-xs bg-elevated/50 border border-default rounded-md p-3 overflow-x-auto"><code>{{ jsonString }}</code></pre>
            </div>
          </div>

          <UAlert
            color="warning"
            variant="subtle"
            icon="i-lucide-shield-alert"
            title="Храните этот токен в секрете"
            description="Любой, у кого есть этот токен, имеет полный доступ к чтению отзывов и данных агента. Не делитесь им и не коммитьте в публичный репозиторий."
          />
        </div>
      </UCard>
    </template>
  </UModal>
</template>
