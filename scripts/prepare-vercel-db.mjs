import { writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dbModule = join(root, 'node_modules/@nuxthub/db/db.mjs')

// NuxtHub перезапишет этот файл во время build — оставляем шаблон на случай
// локального import до генерации. Финальный патч — patch-vercel-output.mjs.
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

writeFileSync(dbModule, runtimeDbSource)
console.log('[prepare-vercel-db] Patched @nuxthub/db/db.mjs for runtime path / Turso env')
