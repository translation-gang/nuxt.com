<script setup lang="ts">
definePageMeta({
  validate: route => /^\d\.x$/.test(route.params.version as string),
  heroBackground: 'opacity-30'
})

const { version } = useDocsVersion()

const { data: errors } = await useAsyncData(`${version.value.collection}-errors`, () =>
  queryCollection(version.value.collection!)
    .where('path', 'LIKE', `${version.value.path}/errors/%`)
    .select('path', 'title', 'description')
    .all()
)

if (!errors.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Страница не найдена', fatal: true })
}

const code = (path: string) => path.split('/').pop()!.toUpperCase()

const sections = computed(() => [
  {
    title: 'Ошибки выполнения',
    description: 'Ошибки в браузере или при серверном рендеринге.',
    errors: errors.value!.filter(error => code(error.path).startsWith('E'))
  },
  {
    title: 'Ошибки сборки',
    description: 'Ошибки во время сборки Nuxt.',
    errors: errors.value!.filter(error => code(error.path).startsWith('B'))
  }
].filter(section => section.errors.length))

const title = 'Коды ошибок'
const description = 'Справочник кодов ошибок Nuxt. У каждой ошибки и предупреждения есть уникальный код с префиксом NUXT_, ведущий к подробному описанию и шагам решения.'

useSeoMeta({
  title,
  titleTemplate: `%s · Nuxt ${version.value.shortTag}`,
  description,
  ogTitle: `${title} · Nuxt ${version.value.shortTag}`,
  ogDescription: description
})

if (import.meta.server) {
  defineOgImage('Docs.takumi', {
    headline: 'Документация',
    title,
    description
  })
}
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="title" :description="description" />

      <UPageBody>
        <div v-for="section in sections" :key="section.title" class="mb-12">
          <h2 class="text-xl font-semibold text-highlighted">
            {{ section.title }}
          </h2>
          <p class="mt-1 text-muted">
            {{ section.description }}
          </p>
          <ul class="mt-6 divide-y divide-default border-y border-default">
            <li v-for="error in section.errors" :key="error.path">
              <NuxtLink :to="error.path" class="group flex items-baseline gap-4 py-3">
                <code class="shrink-0 text-sm font-mono text-primary">{{ code(error.path) }}</code>
                <span class="text-default group-hover:text-highlighted">{{ error.title }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
