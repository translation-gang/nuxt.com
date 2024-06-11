<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { BlogArticle } from '~/types'

const route = useRoute()
const { copy } = useCopyToClipboard()

const { data: article } = await useAsyncData(route.path, () => queryContent<BlogArticle>(route.path).findOne())
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Статья не найдена', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/blog')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(withoutTrailingSlash(route.path))
)

useSeoMeta({
  title: article.value.head?.title || article.value.title,
  description: article.value.head?.description || article.value.description
})

const title = article.value.head?.title || article.value.title
const description = article.value.head?.description || article.value.description
useSeoMeta({
  titleTemplate: '%s · Nuxt Блог',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · Nuxt Блог`
})

if (article.value.image) {
  defineOgImage({ url: article.value.image })
}
else {
  defineOgImageComponent('Docs', {
    headline: 'Блог'
  })
}

const authorTwitter = article.value.authors?.[0]?.twitter
const socialLinks = computed(() => [{
  icon: 'i-simple-icons-linkedin',
  to: `https://www.linkedin.com/sharing/share-offsite/?url=https://nuxt-ru.vercel.app${article.value._path}`
}, {
  icon: 'i-simple-icons-twitter',
  to: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${article.value.title}${authorTwitter ? ` by @${article.value.authors[0].twitter}` : ''}\n\n`)}https://nuxt-ru.vercel.app${article.value._path}`
}])

function copyLink() {
  copy(`https://nuxt-ru.vercel.app${article.value._path}`, { title: 'Скопировано в буфер обмена' })
}
const links = [
  {
    icon: 'i-ph-pen-duotone',
    label: 'Отредактируйте эту статью',
    to: `https://github.com/translation-gang/nuxt.com/edit/main/content/${article.value._file}`,
    target: '_blank'
  }, {
    icon: 'i-ph-shooting-star-duotone',
    label: 'Звезды на GitHub',
    to: 'https://go.nuxt.com/github',
    target: '_blank'
  }, {
    icon: 'i-ph-chat-centered-text-duotone',
    label: 'Чат в Discord',
    to: 'https://go.nuxt.com/discord',
    target: '_blank'
  }, {
    icon: 'i-ph-hand-heart-duotone',
    label: 'Стать спонсором',
    to: 'https://go.nuxt.com/sponsor',
    target: '_blank'
  }
]
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader :title="article.title" :description="article.description" :ui="{ headline: 'flex flex-col gap-y-8 items-start' }">
        <template #headline>
          <UBreadcrumb :links="[{ label: 'Блог', icon: 'i-ph-newspaper-duotone', to: '/blog' }, { label: article.title }]" />
          <div class="flex items-center space-x-2">
            <span>
              {{ article.category }}
            </span>
            <span class="text-gray-500 dark:text-gray-400">&middot;&nbsp;&nbsp;<time>{{ formatDateByLocale('ru', article.date) }}</time></span>
          </div>
        </template>

        <div class="mt-4 flex flex-wrap items-center gap-6">
          <UButton
            v-for="(author, index) in article.authors"
            :key="index"
            :to="author.link"
            target="_blank"
            color="white"
            variant="ghost"
            class="-my-1.5 -mx-2.5"
          >
            <UAvatar :src="author.avatarUrl" :alt="author.name" />

            <div class="text-left">
              <p class="font-medium">
                {{ author.name }}
              </p>
              <p class="text-gray-500 dark:text-gray-400 leading-4">
                {{ `@${author.link.split('/').pop()}` }}
              </p>
            </div>
          </UButton>
        </div>
      </UPageHeader>

      <UPage>
        <UPageBody prose class="dark:text-gray-300 dark:prose-pre:!bg-gray-800/60">
          <ContentRenderer v-if="article && article.body" :value="article" />

          <div class="flex items-center justify-between mt-12 not-prose">
            <NuxtLink href="/blog" class="text-primary">
              ← Вернуться к блогу
            </NuxtLink>
            <div class="flex justify-end items-center gap-1.5">
              <UButton icon="i-ph-link-simple" v-bind="($ui.button.secondary as any)" @click="copyLink">
                Скопировать URL
              </UButton>
              <UButton
                v-for="(link, index) in socialLinks"
                :key="index"
                v-bind="link"
                variant="ghost"
                color="gray"
                target="_blank"
              />
            </div>
          </div>

          <hr v-if="surround?.length">

          <UContentSurround :surround="surround" />
        </UPageBody>

        <template #right>
          <UContentToc v-if="article.body && article.body.toc" :links="article.body.toc.links">
            <template #bottom>
              <div class="hidden lg:block space-y-6">
                <UPageLinks title="Ссылки" :links="links" />

                <UDivider type="dashed" />

                <Ads />
              </div>
            </template>
          </UContentToc>
        </template>
      </UPage>
    </UPage>
  </UContainer>
</template>
