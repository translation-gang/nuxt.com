<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { h, resolveComponent } from 'vue'

const UButton = resolveComponent('UButton')
const { user, clear } = useUserSession()

async function logout() {
  await clear()
  navigateTo('/admin/login')
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value?.login,
      avatar: {
        src: user.value?.avatar_url,
        alt: user.value?.login
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Экспорт отзывов',
      icon: 'i-lucide-download',
      onClick: handleExportFeedback
    },
    {
      label: 'Экспорт аналитики',
      icon: 'i-lucide-bar-chart',
      onClick: handleExportPageAnalytics
    }
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onClick: logout
    }
  ]
])

const { data: rawFeedback, refresh: refreshFeedback } = await useFetch('/api/feedback')
const { deleteFeedback } = useFeedbackDelete()
const { exportFeedbackData, exportPageAnalytics } = useFeedbackExport()

async function handleDeleteFeedback(feedbackId: number) {
  const success = await deleteFeedback(feedbackId)
  if (success) {
    await refreshFeedback()
  }
  showFeedbackModal.value = false
}

async function handleExportFeedback() {
  if (feedbackData.value && feedbackData.value.length > 0) {
    await exportFeedbackData(feedbackData.value)
  }
}

async function handleExportPageAnalytics() {
  if (pageAnalytics.value && pageAnalytics.value.length > 0) {
    await exportPageAnalytics(pageAnalytics.value)
  }
}

function useAdminTable() {
  const table = useTemplateRef<any>('table')
  const pagination = ref({
    pageIndex: 0,
    pageSize: 5
  })

  const sorting = ref([
    {
      id: 'updatedAt',
      desc: true
    }
  ])

  const globalFilter = ref('')

  function resetFilters() {
    globalFilter.value = ''
    versionFilter.value = 'all'
    sorting.value = [{ id: 'updatedAt', desc: true }]
    pagination.value = { pageIndex: 0, pageSize: 5 }
  }

  const versionFilter = ref<'all' | 'v3' | 'v4'>('all')

  function filterByVersion(version: 'v3' | 'v4') {
    versionFilter.value = version
    pagination.value.pageIndex = 0
    if (version === 'v3') {
      globalFilter.value = 'docs/3.x'
    } else {
      globalFilter.value = 'docs/4.x'
    }
  }

  const filteredPageAnalytics = computed(() => {
    let filtered = pageAnalytics.value

    if (versionFilter.value === 'v3') {
      filtered = filtered.filter(page => !page.path.includes('docs/4.x'))
    } else if (versionFilter.value === 'v4') {
      filtered = filtered.filter(page => page.path.includes('docs/4.x'))
    }

    if (globalFilter.value.trim()) {
      const searchTerm = globalFilter.value.toLowerCase().trim()
      filtered = filtered.filter((page) => {
        const title = (page.lastFeedback?.title || '').toLowerCase()
        const path = page.path.toLowerCase()
        return title.includes(searchTerm) || path.includes(searchTerm)
      })
    }

    return filtered
  })

  const columns: TableColumn<PageAnalytic>[] = [
    {
      accessorKey: 'path',
      header: 'Страница',
      cell: ({ row }) => {
        const page = row.original
        return h('div', { class: 'flex flex-col' }, [
          h('span', { class: 'font-medium text-sm' }, page.lastFeedback.title),
          h('code', { class: 'text-xs text-muted font-mono mt-1' }, page.path)
        ])
      }
    },
    {
      accessorKey: 'positive',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Положительные',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5 text-success',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => {
        return h('div', { class: 'text-center' }, [
          h('span', { class: 'font-medium text-success' }, row.original.positive.toString())
        ])
      }
    },
    {
      accessorKey: 'negative',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Отрицательные',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5 text-error',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => {
        return h('div', { class: 'text-center' }, [
          h('span', { class: 'font-medium text-error' }, row.original.negative.toString())
        ])
      }
    },
    {
      accessorKey: 'averageScore',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Оценка',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => {
        const score = row.original.averageScore
        const colorClass = score >= 4.0 ? 'text-success' : score >= 3.0 ? 'text-warning' : 'text-error'
        return h('div', { class: 'text-center' }, [
          h('span', { class: `font-semibold ${colorClass}` }, `${score}/4`)
        ])
      }
    },
    {
      accessorKey: 'total',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Всего',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => {
        return h('div', { class: 'text-center font-medium' }, row.original.total.toString())
      }
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Создано',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => {
        const date = row.original.createdAt.toLocaleDateString('ru', {
          month: 'short',
          day: 'numeric',
          year: '2-digit'
        })
        return h('div', { class: 'text-center' }, [
          h('span', { class: 'text-sm text-muted' }, date)
        ])
      }
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return h(UButton, {
          color: 'neutral',
          variant: 'ghost',
          label: 'Обновлено',
          icon: isSorted
            ? isSorted === 'asc'
              ? 'i-lucide-arrow-up-narrow-wide'
              : 'i-lucide-arrow-down-wide-narrow'
            : 'i-lucide-arrow-up-down',
          class: '-mx-2.5',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        })
      },
      cell: ({ row }) => {
        const date = row.original.updatedAt.toLocaleDateString('ru', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
        return h('div', { class: 'text-center' }, [
          h('span', { class: 'text-sm text-muted' }, date)
        ])
      }
    }
  ]

  return {
    table,
    pagination,
    sorting,
    globalFilter,
    columns,
    resetFilters,
    filterByVersion,
    filteredPageAnalytics,
    versionFilter
  }
}

const { globalStats, pageAnalytics, feedbackData } = useFeedbackData(rawFeedback)
const { table, pagination, sorting, globalFilter, columns, resetFilters, filterByVersion, filteredPageAnalytics, versionFilter } = useAdminTable()
const { selectedPage, showFeedbackModal, currentPage, itemsPerPage, paginatedFeedback, totalPages, viewPageDetails } = useFeedbackModal()

const feedbackContainer = useTemplateRef<HTMLElement>('feedbackContainer')

watch(currentPage, () => {
  if (feedbackContainer.value) {
    feedbackContainer.value.scrollTop = 0
  }
})
</script>

<template>
  <div class="min-h-screen">
    <div class="absolute top-2 right-2">
      <UDropdownMenu :items="items">
        <UButton
          :avatar="{
            src: user?.avatar_url,
            alt: user?.login
          }"
          color="neutral"
          trailing-icon="i-lucide-menu"
          variant="ghost"
          :label="user?.login"
        />
      </UDropdownMenu>
    </div>
    <UContainer class="py-12">
      <div class="text-center mb-8 space-y-2">
        <UIcon name="i-lucide-bar-chart" class="size-8 text-primary mx-auto" />
        <h1 class="text-3xl font-bold">
          Feedback Analytics
        </h1>
        <p class="text-muted text-lg max-w-2xl mx-auto">
          Monitor user feedback and documentation satisfaction across all pages
        </p>
      </div>

      <UCard class="max-w-5xl mx-auto">
        <FeedbackDatePicker />
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <FeedbackStatCard
            icon="i-lucide-message-circle"
            :value="globalStats.total"
            label="Всего"
            :popover-stats="{
              trend: `В среднем ${Math.round(globalStats.total / 7)} в день`,
              details: 'Всего отзывов по всем страницам'
            }"
          />

          <FeedbackStatCard
            icon="i-lucide-thumbs-up"
            icon-color="text-success"
            :value="globalStats.positive"
            label="Положительные"
            :popover-stats="{
              percentage: `${globalStats.positivePercentage}% от общего`,
              trend: `${globalStats.positivePercentage >= 70 ? '📈 Отлично' : globalStats.positivePercentage >= 50 ? '✅ Хорошо' : '📉 Требует доработки'}`,
              details: 'Очень полезно + Полезно'
            }"
          />

          <FeedbackStatCard
            icon="i-lucide-thumbs-down"
            icon-color="text-error"
            :value="globalStats.negative"
            label="Отрицательные"
            :popover-stats="{
              percentage: `${100 - globalStats.positivePercentage}% от общего`,
              trend: `${globalStats.negative <= 2 ? '🟢 Мало' : globalStats.negative <= 5 ? '🟡 Умеренно' : '🔴 Много'}`,
              details: 'Не полезно + Запутанно'
            }"
          />

          <FeedbackStatCard
            icon="i-lucide-target"
            icon-color="text-primary"
            :value="`${globalStats.averageScore}/4`"
            label="Средняя оценка"
            :popover-stats="{
              percentage: `${Math.round(globalStats.averageScore / 4 * 100)}% удовлетворённости`,
              trend: `${globalStats.averageScore >= 3.5 ? '🎯 Отлично' : globalStats.averageScore >= 3.0 ? '👍 Хорошо' : '⚠️ Требует доработки'}`,
              details: 'Взвешенное среднее всех оценок'
            }"
          />
        </div>

        <div class="border-t border-default pt-6">
          <FeedbackChart :page-analytics="pageAnalytics" />
        </div>

        <div class="border-t border-default pt-6">
          <div class="flex sm:items-center justify-between flex-col sm:flex-row mb-4 gap-4">
            <h2 class="text-xl font-semibold">
              Отзывы по страницам
            </h2>
            <div class="flex items-center gap-2">
              <UInput
                v-model="globalFilter"
                class="flex-1 max-w-sm"
                placeholder="Поиск страниц..."
                icon="i-lucide-search"
              />
              <UTooltip text="Сбросить фильтры" :content="{ side: 'top' }">
                <UButton
                  color="neutral"
                  variant="outline"
                  icon="i-lucide-filter-x"
                  aria-label="Сбросить фильтры"
                  @click="resetFilters"
                />
              </UTooltip>
              <UTooltip text="Только страницы v3" :content="{ side: 'top' }">
                <UButton
                  :color="versionFilter === 'v3' ? 'primary' : 'neutral'"
                  :variant="versionFilter === 'v3' ? 'solid' : 'outline'"
                  label="v3"
                  @click="filterByVersion('v3')"
                />
              </UTooltip>
              <UTooltip text="Только страницы v4" :content="{ side: 'top' }">
                <UButton
                  :color="versionFilter === 'v4' ? 'primary' : 'neutral'"
                  :variant="versionFilter === 'v4' ? 'solid' : 'outline'"
                  label="v4"
                  @click="filterByVersion('v4')"
                />
              </UTooltip>
            </div>
          </div>

          <UTable
            ref="table"
            v-model:pagination="pagination"
            v-model:sorting="sorting"
            :data="filteredPageAnalytics"
            :columns="columns"
            :pagination-options="{
              getPaginationRowModel: getPaginationRowModel()
            }"
            class="flex-1 cursor-pointer [&_tbody_tr]:cursor-pointer"
            :ui="{
              base: 'table-fixed border-separate border-spacing-0',
              thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
              tbody: '[&>tr]:last:[&>td]:border-b-0',
              th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
              td: 'border-b border-default'
            }"
            @select="(_, row) => viewPageDetails(row.original)"
          />

          <div class="flex justify-end border-t border-default pt-4">
            <UPagination
              :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
              :items-per-page="table?.tableApi?.getState().pagination.pageSize"
              :total="table?.tableApi?.getFilteredRowModel().rows.length"
              @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
            />
          </div>
        </div>
      </UCard>
    </UContainer>

    <UModal v-model:open="showFeedbackModal" :ui="{ content: 'max-w-3xl max-sm:max-h-[85vh] overflow-y-auto' }">
      <template #content>
        <UCard v-if="selectedPage">
          <template #header>
            <UButton
              size="sm"
              variant="ghost"
              color="neutral"
              icon="i-lucide-x"
              class="absolute top-2 right-2"
              @click="showFeedbackModal = false"
            />
            <div>
              <h3 class="font-semibold text-lg sm:text-xl mb-2">
                {{ selectedPage.lastFeedback.title }}
              </h3>
              <div class="flex items-center gap-1">
                <ULink :to="`https://nuxt.com${selectedPage.path}`" target="_blank">
                  <code class="text-xs sm:text-sm bg-muted px-2 py-1 rounded">{{ selectedPage.path }}</code>
                </ULink>
                <UButton
                  size="sm"
                  variant="ghost"
                  color="neutral"
                  icon="i-lucide-external-link"
                  :to="`https://nuxt.com${selectedPage.path}`"
                  target="_blank"
                />
                <UButton
                  v-if="selectedPage.lastFeedback.stem"
                  size="sm"
                  variant="ghost"
                  color="neutral"
                  :to="`https://github.com/nuxt/nuxt/edit/4.x/${selectedPage.lastFeedback.stem.replace(/docs\/\d\.x/, 'docs')}.md`"
                  target="_blank"
                  icon="i-simple-icons-github"
                />
              </div>
            </div>
          </template>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
            <FeedbackStatCard
              icon="i-lucide-target"
              icon-color="text-primary"
              :value="`${selectedPage.averageScore}/4`"
              label="Средняя оценка"
              :popover-stats="{
                percentage: `${Math.round(selectedPage.averageScore / 4 * 100)}% удовлетворённости`,
                trend: `${selectedPage.averageScore >= 3.5 ? '🎯 Отлично' : selectedPage.averageScore >= 3.0 ? '👍 Хорошо' : '⚠️ Плохо'}`,
                details: `На основе ${selectedPage.total} ${selectedPage.total === 1 ? 'ответа' : 'ответов'}`
              }"
            />

            <FeedbackStatCard
              icon="i-lucide-message-circle"
              icon-color="text-muted"
              :value="selectedPage.total"
              label="Ответы"
              :popover-stats="{
                trend: `${selectedPage.total === 1 ? 'Один отзыв' : 'Несколько отзывов'}`,
                details: 'Всего отзывов по этой странице'
              }"
            />

            <FeedbackStatCard
              icon="i-lucide-thumbs-up"
              icon-color="text-success"
              :value="selectedPage.positive"
              label="Положительные"
              :popover-stats="{
                percentage: `${selectedPage.positivePercentage}% ответов`,
                trend: `${selectedPage.positivePercentage >= 70 ? '📈 Отлично' : selectedPage.positivePercentage >= 50 ? '✅ Хорошо' : '📉 Плохо'}`,
                details: 'Страница полезна пользователям'
              }"
            />

            <FeedbackStatCard
              icon="i-lucide-thumbs-down"
              icon-color="text-error"
              :value="selectedPage.negative"
              label="Отрицательные"
              :popover-stats="{
                percentage: `${100 - selectedPage.positivePercentage}% ответов`,
                trend: `${selectedPage.negative <= 1 ? '🟢 Мало' : selectedPage.negative <= 3 ? '🟡 Умеренно' : '🔴 Много'}`,
                details: 'Пользователи нашли проблемы на странице'
              }"
            />
          </div>

          <div class="space-y-3 sm:space-y-4">
            <h4 class="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
              <UIcon name="i-lucide-message-square" class="size-4 sm:size-5" />
              Отдельные отзывы
            </h4>
            <div class="space-y-3 sm:space-y-4">
              <div ref="feedbackContainer" class="space-y-2 sm:space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                <FeedbackItem
                  v-for="(feedback, index) in paginatedFeedback"
                  :key="index"
                  :feedback="feedback"
                  show-delete
                  @delete="handleDeleteFeedback"
                />
              </div>

              <div v-if="totalPages > 1" class="flex items-center justify-between pt-4 border-t border-default">
                <div class="text-sm text-muted">
                  Showing {{ (currentPage - 1) * itemsPerPage + 1 }}-{{ Math.min(currentPage * itemsPerPage, selectedPage.total) }} of {{ selectedPage.total }} feedbacks
                </div>
                <UPagination
                  v-model:page="currentPage"
                  :total="selectedPage.total"
                  :items-per-page="itemsPerPage"
                  :sibling-count="1"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UModal>
  </div>
</template>
