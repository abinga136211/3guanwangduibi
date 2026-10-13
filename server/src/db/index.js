import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'
import { DEFAULT_CONFIG, DEFAULT_CONFIG_ITEMS } from '../defaults/config.js'

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
  ensureConfigItemsTable(db)

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

/** Multilingual config items; seed once from legacy system_config or defaults. */
function ensureConfigItemsTable(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS system_config_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL DEFAULT '',
      name_en TEXT NOT NULL DEFAULT '',
      name_tw TEXT NOT NULL DEFAULT '',
      value_zh TEXT NOT NULL DEFAULT '',
      value_en TEXT NOT NULL DEFAULT '',
      value_tw TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_config_items_sort
      ON system_config_items(is_deleted, sort_order, id);
  `)

  const count = database
    .prepare('SELECT COUNT(*) AS c FROM system_config_items')
    .get().c
  if (count > 0) return

  seedConfigItems(database)
}

function seedConfigItems(database) {
  const legacy = database.prepare('SELECT * FROM system_config WHERE id = 1').get()
  const customer =
    (legacy?.customer_email || '').trim() || DEFAULT_CONFIG.customer_email
  const partnership =
    (legacy?.partnership_email || '').trim() || DEFAULT_CONFIG.partnership_email
  const address =
    (legacy?.office_address || '').trim() || DEFAULT_CONFIG.office_address

  const seeds = DEFAULT_CONFIG_ITEMS.map((item, index) => {
    if (index === 0) {
      return { ...item, value_zh: customer, value_en: customer, value_tw: customer }
    }
    if (index === 1) {
      return {
        ...item,
        value_zh: partnership,
        value_en: partnership,
        value_tw: partnership,
      }
    }
    return { ...item, value_zh: address, value_en: address, value_tw: address }
  })

  const ts = new Date().toISOString()
  const insert = database.prepare(`
    INSERT INTO system_config_items (
      name_zh, name_en, name_tw, value_zh, value_en, value_tw,
      sort_order, is_deleted, created_at, updated_at
    ) VALUES (
      @name_zh, @name_en, @name_tw, @value_zh, @value_en, @value_tw,
      @sort_order, 0, @created_at, @updated_at
    )
  `)

  const tx = database.transaction((rows) => {
    for (const row of rows) {
      insert.run({ ...row, created_at: ts, updated_at: ts })
    }
  })
  tx(seeds)
}

export function nowIso() {
  return new Date().toISOString()
}
