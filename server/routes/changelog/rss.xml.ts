import { Feed } from 'feed'
import { joinURL } from 'ufo'

export default defineCachedEventHandler(async (event) => {
  const baseUrl = 'https://nuxt.com'
  const changelogUrl = joinURL(baseUrl, 'changelog')

  const feed = new Feed({
    title: 'История изменений Nuxt',
    description: 'Последние релизы Nuxt и официальных модулей.',
    id: changelogUrl,
    link: changelogUrl,
    language: 'ru',
    image: joinURL(baseUrl, 'icon.png'),
    favicon: joinURL(baseUrl, 'favicon.png'),
    copyright: `© 2016–${new Date().getFullYear()} Nuxt. Все права защищены.`,
    feedLinks: {
      rss: joinURL(baseUrl, 'changelog/rss.xml')
    }
  })

  const releases = await fetchRawReleases() || []

  for (const release of releases.slice(0, 50)) {
    feed.addItem({
      title: `${release.title} (${release.repo})`,
      id: release.url,
      link: release.url,
      description: `Новый релиз ${release.tag} для ${release.repo}`,
      content: release.markdown,
      date: new Date(release.date),
      category: [{ name: release.repo.split('/')[1]! }]
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
}, {
  name: 'changelog-rss',
  swr: true,
  maxAge: 60 * 60
})
