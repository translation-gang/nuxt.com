export default defineCachedEventHandler(async (event) => {
  const domain = getSiteUrl(event)
  const modules = await fetchModules(event) || []

  const lines: string[] = [
    '# Модули Nuxt',
    '',
    `> ${modules.length}+ модулей для вашего проекта [Nuxt](https://nuxt.com).`,
    ''
  ]

  const categories = new Map<string, typeof modules>()
  for (const mod of modules) {
    const cat = mod.category || 'Без категории'
    if (!categories.has(cat)) categories.set(cat, [])
    categories.get(cat)!.push(mod)
  }

  for (const [category, mods] of categories) {
    lines.push(`## ${category}`, '')
    for (const mod of mods) {
      const links = [
        mod.website ? `[Docs](${mod.website})` : '',
        mod.repo ? `[GitHub](https://github.com/${mod.repo})` : '',
        `[npm](https://www.npmjs.com/package/${mod.npm})`
      ].filter(Boolean).join(' · ')

      lines.push(`### ${mod.npm}`, '')
      lines.push(mod.description, '')
      lines.push(`Установка: \`npx nuxt@latest module add ${mod.name}\``, '')
      lines.push(links, '')
    }
  }

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setResponseHeader(event, 'Link', [
    `<${domain}/modules>; rel="canonical"`,
    `<${domain}/modules>; rel="alternate"; type="text/html"`
  ].join(', '))
  return lines.join('\n')
}, {
  name: 'raw-modules-md',
  swr: true,
  maxAge: 60 * 60
})
