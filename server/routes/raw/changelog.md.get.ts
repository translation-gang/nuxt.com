export default defineCachedEventHandler(async (event) => {
  const domain = getSiteUrl(event)
  const releases = await fetchRawReleases() || []

  const lines: string[] = [
    '# История изменений Nuxt',
    '',
    '> Последние релизы Nuxt и официальных модулей.',
    ''
  ]

  for (const release of releases.slice(0, 20)) {
    const date = new Date(release.date).toISOString().split('T')[0]
    lines.push(`## ${release.title} (${release.repo}) - ${date}`, '')
    lines.push(`[Заметки к релизу](${release.url})`, '')
    lines.push(release.markdown, '')
    lines.push('---', '')
  }

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'Link', [
    `<${domain}/changelog>; rel="canonical"`,
    `<${domain}/changelog>; rel="alternate"; type="text/html"`
  ].join(', '))
  return lines.join('\n')
}, {
  name: 'raw-changelog-md',
  swr: true,
  maxAge: 60 * 60
})
