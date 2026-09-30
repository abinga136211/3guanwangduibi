import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const serverRoot = path.resolve(__dirname, '../..')

export const DATA_DIR = path.join(serverRoot, 'data')
export const UPLOADS_DIR = path.join(serverRoot, 'uploads', 'resumes')
export const DB_PATH = process.env.SQLITE_PATH || path.join(DATA_DIR, 'adgpay.sqlite')

let db

export function getDb() {
  if (!db) throw new Error('Database not initialized')
  return db
}

export function initDb() {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  const migrationPath = path.join(__dirname, 'migrations', '001_initial.sql')
  const sql = fs.readFileSync(migrationPath, 'utf8')
  db.exec(sql)
  ensureColumnMigrations(db)

  return db
}

/** Additive columns for DBs that already ran an older 001_initial. */
function ensureColumnMigrations(database) {
  const cols = database
    .prepare(`PRAGMA table_info(applications)`)
    .all()
    .map((c) => c.name)
  if (!cols.includes('phone')) {
    database.exec(`ALTER TABLE applications ADD COLUMN phone TEXT NOT NULL DEFAULT ''`)
  }
  if (!cols.includes('email')) {
    database.exec(`ALTER TABLE applications ADD COLUMN email TEXT NOT NULL DEFAULT ''`)
  }
}

export function nowIso() {
  return new Date().toISOString()
}
