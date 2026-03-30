/**
 * Удаляет кэш удалённых источников @nuxt/content (isomorphic-git).
 * Иначе при смене коммита на origin или «битом» кэше Vercel clone в непустую папку даёт:
 * "Your local changes ... would be overwritten by checkout"
 */
import { existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const dir = join(process.cwd(), '.data', 'content')
if (existsSync(dir)) {
  rmSync(dir, { recursive: true, force: true })
}
