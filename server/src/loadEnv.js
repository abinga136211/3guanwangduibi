import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Load simple KEY=VALUE .env from project root if present (no override of existing env). */
export function loadEnvFile() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq <= 0) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}
