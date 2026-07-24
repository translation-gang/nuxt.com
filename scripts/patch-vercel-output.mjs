import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const funcDir = join(root, '.vercel/output/functions/__fallback.func')

if (!existsSync(funcDir)) {
  console.warn('[patch-vercel-output] No .vercel/output — skip')
  process.exit(0)
}

const runtimeDbSource = `import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema.mjs'

function hubConnection() {
  const url = process.env.TURSO_DATABASE_URL || process.env.LIBSQL_URL || process.env.DATABASE_URL
  if (url) {
    return {
      url,
      authToken: process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN
    }
  }
  const bundled = join(process.cwd(), 'db/sqlite.db')
  const runtime = '/tmp/nuxt-hub-sqlite.db'
  if (existsSync(bundled)) {
    try {
      if (!existsSync(runtime)) {
        copyFileSync(bundled, runtime)
      }
      return { url: \`file:\${runtime}\` }
    } catch {
      return { url: \`file:\${bundled}\` }
    }
  }
  return { url: \`file:\${runtime}\` }
}

const db = drizzle({ connection: hubConnection(), schema })
export { db, schema }
`

// @libsql/linux-x64-gnu — нужен при prebuilt с macOS; на Linux CI обычно уже в bundle
const libsqlSource = join(root, 'node_modules/@libsql/linux-x64-gnu')
const libsqlTargetDir = join(funcDir, 'node_modules/@libsql')
if (existsSync(libsqlSource)) {
  mkdirSync(libsqlTargetDir, { recursive: true })
  cpSync(libsqlSource, join(libsqlTargetDir, 'linux-x64-gnu'), { recursive: true })
  console.log('[patch-vercel-output] linux-x64-gnu')
} else {
  console.warn('[patch-vercel-output] Missing', libsqlSource)
}

// Hub SQLite после миграций на сборке (на Vercel — /vercel/path0/.data/db/sqlite.db)
const sqliteCandidates = [
  join(root, '.data/db/sqlite.db'),
  join(root, '.vercel/output/functions/sqlite.db')
]
const sqliteSource = sqliteCandidates.find(existsSync)
const sqliteTargetDir = join(funcDir, 'db')
if (sqliteSource) {
  mkdirSync(sqliteTargetDir, { recursive: true })
  cpSync(sqliteSource, join(sqliteTargetDir, 'sqlite.db'))
  console.log('[patch-vercel-output] db/sqlite.db from', sqliteSource)
} else {
  console.warn('[patch-vercel-output] Missing sqlite.db — hub DB may fail without TURSO_*')
}

const bundledDb = join(funcDir, 'node_modules/@nuxthub/db/db.mjs')
if (existsSync(bundledDb)) {
  writeFileSync(bundledDb, runtimeDbSource)
  console.log('[patch-vercel-output] @nuxthub/db/db.mjs')
} else {
  console.warn('[patch-vercel-output] Missing bundled @nuxthub/db/db.mjs')
}

// Hobby: maxDuration ≤ 60; ISR cold start главной тянет content DB
const vcConfigPath = join(funcDir, '.vc-config.json')
if (existsSync(vcConfigPath)) {
  const vcConfig = JSON.parse(readFileSync(vcConfigPath, 'utf8'))
  vcConfig.maxDuration = 60
  writeFileSync(vcConfigPath, `${JSON.stringify(vcConfig, null, 2)}\n`)
  console.log('[patch-vercel-output] maxDuration=60')
}
