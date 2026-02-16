#!/usr/bin/env node
/**
 * Аудит перевода документации (фаза 3.0).
 * Сканирует docs/ в репозитории translation-gang/nuxt и помечает файлы:
 * - с кириллицей = переведены
 * - без кириллицы = не переведены
 *
 * Запуск из корня nuxt.com:
 *   NUXT_V4_PATH=/path/to/translation-gang/nuxt node scripts/audit-docs-translation.mjs
 * Или из корня nuxt (translation-gang/nuxt):
 *   node /path/to/nuxt.com/scripts/audit-docs-translation.mjs
 */

import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const CYRILLIC = /[а-яА-ЯёЁ]/

const SECTIONS = [
  { id: '1.getting-started', name: 'Getting Started', planFiles: 18 },
  { id: '2.directory-structure', name: 'Directory Structure', planFiles: 28 },
  { id: '3.guide', name: 'Guide (concepts + rest)', planFiles: 40 },
  { id: '4.api', name: 'API', planFiles: 105 },
  { id: '5.community', name: 'Community', planFiles: 6 },
  { id: '6.bridge', name: 'Bridge', planFiles: 10 },
  { id: '7.migration', name: 'Migration', planFiles: 11 }
]

function getSection(filePath) {
  const first = filePath.split('/')[0]
  if (first.startsWith('1.')) return '1.getting-started'
  if (first.startsWith('2.')) return '2.directory-structure'
  if (first.startsWith('3.')) return '3.guide'
  if (first.startsWith('4.')) return '4.api'
  if (first.startsWith('5.')) return '5.community'
  if (first.startsWith('6.')) return '6.bridge'
  if (first.startsWith('7.')) return '7.migration'
  return 'other'
}

async function findMdFiles(dir, base = dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => [])
  for (const e of entries) {
    const full = join(dir, e.name)
    const rel = relative(base, full)
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      await findMdFiles(full, base, acc)
    } else if (e.isFile() && e.name.endsWith('.md')) {
      acc.push(rel)
    }
  }
  return acc
}

function hasCyrillic(text) {
  return CYRILLIC.test(text)
}

async function main() {
  const docsDir = process.env.NUXT_V4_PATH
    ? join(process.env.NUXT_V4_PATH, 'docs')
    : process.env.NUXT_V3_PATH
      ? join(process.env.NUXT_V3_PATH, 'docs')
      : null

  if (!docsDir) {
    console.error('Задайте NUXT_V4_PATH (или NUXT_V3_PATH) — путь к клону translation-gang/nuxt')
    process.exit(1)
  }

  const exists = await import('node:fs').then(fs => fs.promises.access(docsDir).then(() => true).catch(() => false))
  if (!exists) {
    console.error('Директория не найдена:', docsDir)
    process.exit(1)
  }

  const files = await findMdFiles(docsDir)
  const bySection = {}
  const results = []

  for (const file of files) {
    const section = getSection(file)
    if (!bySection[section]) bySection[section] = { translated: [], notTranslated: [] }
    const content = await readFile(join(docsDir, file), 'utf8').catch(() => '')
    if (hasCyrillic(content)) {
      bySection[section].translated.push(file)
    } else {
      bySection[section].notTranslated.push(file)
    }
  }

  const out = []
  out.push('# Аудит перевода документации (docs/)')
  out.push('')
  out.push(`Дата: ${new Date().toISOString().slice(0, 10)}`)
  out.push(`Репозиторий: ${process.env.NUXT_V4_PATH || process.env.NUXT_V3_PATH}`)
  out.push('')
  out.push('## Сводка по разделам')
  out.push('')
  out.push('| Раздел | Переведено | Не переведено | Всего |')
  out.push('|--------|------------|---------------|-------|')

  for (const { id, name, planFiles } of SECTIONS) {
    const data = bySection[id] || { translated: [], notTranslated: [] }
    const total = data.translated.length + data.notTranslated.length
    out.push(`| ${name} (${id}) | ${data.translated.length} | ${data.notTranslated.length} | ${total} |`)
  }

  const other = bySection.other || { translated: [], notTranslated: [] }
  if (other.translated.length || other.notTranslated.length) {
    out.push(`| Прочее | ${other.translated.length} | ${other.notTranslated.length} | ${other.translated.length + other.notTranslated.length} |`)
  }

  out.push('')
  out.push('## Детали по разделам')
  out.push('')

  for (const { id, name } of SECTIONS) {
    const data = bySection[id] || { translated: [], notTranslated: [] }
    out.push(`### ${name} (\`${id}\`)`)
    out.push('')
    out.push('**Переведены:**')
    if (data.translated.length) {
      data.translated.sort().forEach(f => out.push(`- ${f}`))
    } else {
      out.push('- (нет)')
    }
    out.push('')
    out.push('**Не переведены:**')
    if (data.notTranslated.length) {
      data.notTranslated.sort().forEach(f => out.push(`- ${f}`))
    } else {
      out.push('- (нет)')
    }
    out.push('')
  }

  if (other.translated.length || other.notTranslated.length) {
    out.push('### Прочее')
    out.push('')
    other.translated.sort().forEach(f => out.push(`- ${f}`))
    other.notTranslated.sort().forEach(f => out.push(`- ${f}`))
    out.push('')
  }

  const reportPath = join(process.cwd(), 'docs', 'TRANSLATION_AUDIT.md')
  await mkdir(join(process.cwd(), 'docs'), { recursive: true })
  await writeFile(reportPath, out.join('\n'), 'utf8')
  console.log('Отчёт записан:', reportPath)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
