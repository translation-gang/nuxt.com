import { Feed } from 'feed'
import { joinURL } from 'ufo'
import type { H3Event } from 'h3'
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event: H3Event) => {
  const baseUrl = 'https://nuxt.com'
  const siteUrl = joinURL(baseUrl, 'blog')
  const feed = new Feed({
    title: 'Блог Nuxt',
    description: 'Новости и обновления Nuxt.',
    id: siteUrl,
    link: siteUrl,
    language: 'ru',
    image: joinURL(baseUrl, 'icon.png'),
    favicon: joinURL(baseUrl, 'favicon.png'),
    copyright: `© 2016–${new Date().getFullYear()} Nuxt. Все права защищены.`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`
    }
  })

  const articles = await queryCollection(event, 'blog')
    .order('date', 'DESC')
    .all()

  for (const article of articles) {
    if (article.draft) {
      continue
    }
    feed.addItem({
      link: joinURL(baseUrl, article.path),
      image: joinURL(baseUrl, article.image),
      title: article.title,
      date: new Date(article.date),
      description: article.description,
      category: [{
        name: article.category
      }]
      // author: article.authors, INF0: Cannot work without an email field in the author object https://github.com/jpmonette/feed/issues/141
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
