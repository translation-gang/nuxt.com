import { queryCollection } from '@nuxt/content/server'

const STATIC_LINKS = [
  { title: 'Главная', path: '/' },
  { title: 'Документация', path: '/docs' },
  { title: 'Модули', path: '/modules' },
  { title: 'Шаблоны', path: '/templates' },
  { title: 'Витрина', path: '/showcase' },
  { title: 'Деплой', path: '/deploy' },
  { title: 'История изменений', path: '/changelog' },
  { title: 'Блог', path: '/blog' },
  { title: 'Команда', path: '/team' },
  { title: 'Рассылка', path: '/newsletter' },
  { title: 'Набор для дизайна', path: '/design-kit' },
  { title: 'Дизайн-система', path: '/design.md' },
  { title: 'Видеокурсы', path: '/video-courses' }
]

export default defineEventHandler(async (event) => {
  const domain = getSiteUrl(event)
  // Mirrors /sitemap.xml: v3 (legacy) and v5 (nightly) are excluded — v5 is
  // also disallowed in /robots.txt until Nuxt 5 ships.
  const [docsv4, blog, deploy] = await Promise.all([
    queryCollection(event, 'docsv4')
      .where('extension', '=', 'md')
      .select('path', 'title')
      .all(),
    queryCollection(event, 'blog')
      .where('draft', '=', 0)
      .select('path', 'title', 'date')
      .all(),
    queryCollection(event, 'deploy')
      .select('path', 'title')
      .all()
  ])

  const lines: string[] = [
    '# Карта сайта Nuxt',
    '',
    '> Markdown-индекс всех страниц nuxt.com. Добавьте `.md` к любому URL docs/blog/deploy (или укажите `Accept: text/markdown`), чтобы получить исходник в Markdown.',
    '',
    '## Страницы',
    ''
  ]
  for (const link of STATIC_LINKS) {
    lines.push(`- [${link.title}](${domain}${link.path})`)
  }

  lines.push('', '## Документация', '')
  for (const doc of docsv4) lines.push(`- [${doc.title}](${domain}${doc.path}.md)`)

  lines.push('', '## Провайдеры деплоя', '')
  for (const provider of deploy) lines.push(`- [${provider.title}](${domain}${provider.path}.md)`)

  lines.push('', '## Блог', '')
  for (const post of (blog as Array<{ path: string, title: string, date?: string }>)) {
    const date = post.date ? ` _(${post.date})_` : ''
    lines.push(`- [${post.title}](${domain}${post.path}.md)${date}`)
  }

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  return lines.join('\n') + '\n'
})
