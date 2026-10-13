import { getDb, nowIso } from '../db/index.js'
import { DEFAULT_CONFIG_ITEMS } from '../defaults/config.js'

const PUBLIC_FIELDS = [
  'id',
  'name_zh',
  'name_en',
  'name_tw',
  'value_zh',
  'value_en',
  'value_tw',
  'sort_order',
]

function trimField(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function toPublicItem(row) {
  const out = {}
  for (const key of PUBLIC_FIELDS) out[key] = row[key]
  return out
}

export function listPublicConfigItems() {
  try {
    const rows = getDb()
      .prepare(
        `SELECT * FROM system_config_items
         WHERE is_deleted = 0
         ORDER BY sort_order ASC, id ASC`,
      )
      .all()
    if (!rows.length) {
      return DEFAULT_CONFIG_ITEMS.map((item, i) => ({
        id: -(i + 1),
        ...item,
      }))
    }
    return rows.map(toPublicItem)
  } catch {
    return DEFAULT_CONFIG_ITEMS.map((item, i) => ({
      id: -(i + 1),
      ...item,
    }))
  }
}

export function listAdminConfigItems({ includeDeleted = false } = {}) {
  const sql = includeDeleted
    ? `SELECT * FROM system_config_items ORDER BY sort_order ASC, id ASC`
    : `SELECT * FROM system_config_items WHERE is_deleted = 0 ORDER BY sort_order ASC, id ASC`
  return getDb().prepare(sql).all()
}

export function getAdminConfigItem(id) {
  return getDb()
    .prepare('SELECT * FROM system_config_items WHERE id = ? AND is_deleted = 0')
    .get(id)
}

function normalizeBody(body = {}) {
  const name_zh = trimField(body.name_zh)
  const name_en = trimField(body.name_en)
  const name_tw = trimField(body.name_tw)
  const value_zh = trimField(body.value_zh)
  const value_en = trimField(body.value_en)
  const value_tw = trimField(body.value_tw)

  if (!name_zh || !name_en || !name_tw) {
    return { error: '名称需填写中文、英文、繁体' }
  }
  if (!value_zh || !value_en || !value_tw) {
    return { error: '内容需填写中文、英文、繁体' }
  }

  const sort_order = Number.isFinite(Number(body.sort_order))
    ? Number(body.sort_order)
    : 0

  return {
    name_zh,
    name_en,
    name_tw,
    value_zh,
    value_en,
    value_tw,
    sort_order,
  }
}

export function createConfigItem(body) {
  const data = normalizeBody(body)
  if (data.error) return data

  const ts = nowIso()
  const result = getDb()
    .prepare(
      `INSERT INTO system_config_items (
         name_zh, name_en, name_tw, value_zh, value_en, value_tw,
         sort_order, is_deleted, created_at, updated_at
       ) VALUES (
         @name_zh, @name_en, @name_tw, @value_zh, @value_en, @value_tw,
         @sort_order, 0, @created_at, @updated_at
       )`,
    )
    .run({ ...data, created_at: ts, updated_at: ts })

  return getDb()
    .prepare('SELECT * FROM system_config_items WHERE id = ?')
    .get(result.lastInsertRowid)
}

export function updateConfigItem(id, body) {
  const existing = getAdminConfigItem(id)
  if (!existing) return { error: 'Not found', status: 404 }

  const data = normalizeBody({ ...existing, ...body })
  if (data.error) return data

  const ts = nowIso()
  getDb()
    .prepare(
      `UPDATE system_config_items SET
         name_zh=@name_zh, name_en=@name_en, name_tw=@name_tw,
         value_zh=@value_zh, value_en=@value_en, value_tw=@value_tw,
         sort_order=@sort_order, updated_at=@updated_at
       WHERE id=@id`,
    )
    .run({ ...data, updated_at: ts, id })

  return getDb().prepare('SELECT * FROM system_config_items WHERE id = ?').get(id)
}

export function softDeleteConfigItem(id) {
  const existing = getAdminConfigItem(id)
  if (!existing) return { error: 'Not found', status: 404 }

  getDb()
    .prepare(
      'UPDATE system_config_items SET is_deleted = 1, updated_at = ? WHERE id = ?',
    )
    .run(nowIso(), id)

  return { ok: true }
}
