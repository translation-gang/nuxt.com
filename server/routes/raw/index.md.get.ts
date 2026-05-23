import { queryCollection } from '@nuxt/content/server'
import { CURRENT_DOCS_VERSION } from '#shared/utils/docs'

export default defineCachedEventHandler(async (event) => {
  const domain = getSiteUrl(event)
  const index = await queryCollection(event, 'index').first()

  const title = index?.hero?.title?.replace(/\s+/g, ' ').trim() || 'Nuxt'
  const description = index?.hero?.description?.replace(/\s+/g, ' ').trim()
    || 'Full-Stack Vue-фреймворк. Создавайте быстрые production-ready веб-приложения с уверенностью.'

  const featureBullets = (index?.features?.features ?? [])
    .map(feature => `- **${feature.title}**: ${feature.description}`)
    .join('\n')

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical_url: ${JSON.stringify(domain)}`,
    `last_updated: ${JSON.stringify(new Date().toISOString().split('T')[0])}`,
    '---',
    '\n'
  ].join('\n')

  const body = `# ${title}

${description}

## Возможности

${featureBullets}

## Начало работы

\`\`\`bash
npx nuxi@latest init <project-name>
cd <project-name>
npm install
npm run dev
\`\`\`

- Введение: <${domain}/raw/docs/${CURRENT_DOCS_VERSION}/getting-started/introduction.md>
- Установка: <${domain}/raw/docs/${CURRENT_DOCS_VERSION}/getting-started/installation.md>
- Конфигурация: <${domain}/raw/docs/${CURRENT_DOCS_VERSION}/getting-started/configuration.md>

## Обзор

- Документация: <${domain}/docs>
- Модули: <${domain}/raw/modules.md>
- Шаблоны: <${domain}/templates>
- Витрина: <${domain}/showcase>
- Деплой: <${domain}/deploy>
- Блог: <${domain}/blog/rss.xml>
- История изменений: <${domain}/changelog/rss.xml>
- Команда: <${domain}/team>
- Карта сайта (XML): <${domain}/sitemap.xml>
- Карта сайта (Markdown): <${domain}/sitemap.md>
- Индекс LLMs: <${domain}/llms.txt>
- Полная документация LLMs: <${domain}/llms-full.txt>

## Ресурсы для агентов

- Карточка MCP-сервера: <${domain}/.well-known/mcp/server-card.json>
- MCP endpoint: <${domain}/mcp>
- Каталог API: <${domain}/.well-known/api-catalog>

## Сообщество

- GitHub: <https://github.com/nuxt/nuxt>
- Discord: <https://chat.nuxt.dev>
- X (Twitter): <https://x.com/nuxt_js>
- Bluesky: <https://bsky.app/profile/nuxt.com>
`

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'Link', [
    `<${domain}>; rel="canonical"`,
    `<${domain}>; rel="alternate"; type="text/html"`
  ].join(', '))
  return frontmatter + body
}, {
  name: 'raw-index-md',
  swr: true,
  maxAge: 60 * 60
})
