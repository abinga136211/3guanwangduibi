import { getDb, nowIso } from '../db/index.js'
import { DEFAULT_CONFIG } from '../defaults/config.js'

function pickFilled(value, fallback) {
  const v = typeof value === 'string' ? value.trim() : ''
  return v || fallback
}

/** Merge DB row with hardcoded defaults (empty fields fall back). */
export function resolveConfig(row) {
  if (!row) return { ...DEFAULT_CONFIG, source: 'defaults' }
  return {
    customer_email: pickFilled(row.customer_email, DEFAULT_CONFIG.customer_email),
    partnership_email: pickFilled(row.partnership_email, DEFAULT_CONFIG.partnership_email),
    office_address: pickFilled(row.office_address, DEFAULT_CONFIG.office_address),
    updated_at: row.updated_at || null,
    source: 'database',
  }
}

export function getPublicConfig() {
  try {
    const row = getDb().prepare('SELECT * FROM system_config WHERE id = 1').get()
    return resolveConfig(row)
  } catch {
    return { ...DEFAULT_CONFIG, source: 'defaults' }
  }
}

export function getAdminConfig() {
  const row = getDb().prepare('SELECT * FROM system_config WHERE id = 1').get()
  if (!row) {
    return {
      customer_email: '',
      partnership_email: '',
      office_address: '',
      updated_at: null,
      effective: resolveConfig(null),
    }
  }
  return {
    customer_email: row.customer_email,
    partnership_email: row.partnership_email,
    office_address: row.office_address,
    updated_at: row.updated_at,
    effective: resolveConfig(row),
  }
}

export function upsertConfig({ customer_email, partnership_email, office_address }) {
  const updated_at = nowIso()
  getDb()
    .prepare(
      `INSERT INTO system_config (id, customer_email, partnership_email, office_address, updated_at)
       VALUES (1, @customer_email, @partnership_email, @office_address, @updated_at)
       ON CONFLICT(id) DO UPDATE SET
         customer_email = excluded.customer_email,
         partnership_email = excluded.partnership_email,
         office_address = excluded.office_address,
         updated_at = excluded.updated_at`,
    )
    .run({
      customer_email: String(customer_email ?? '').trim(),
      partnership_email: String(partnership_email ?? '').trim(),
      office_address: String(office_address ?? '').trim(),
      updated_at,
    })
  return getAdminConfig()
}
