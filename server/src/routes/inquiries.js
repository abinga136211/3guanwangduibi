import { Router } from 'express'
import { getDb, nowIso } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'

const INDUSTRY_MAP = {
  ecommerce: 'ecommerce',
  trade: 'trade',
  saas: 'saas',
  other: 'other',
  跨境电商: 'ecommerce',
  '外贸出口（B2B）': 'trade',
  外贸出口: 'trade',
  软件服务: 'saas',
  其他: 'other',
}

const publicRouter = Router()
const adminRouter = Router()

function clientIp(req) {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return req.socket?.remoteAddress || ''
}

publicRouter.post('/inquiries', (req, res) => {
  const { name, company, phone, email, industry, message } = req.body || {}
  const n = String(name || '').trim()
  const c = String(company || '').trim()
  const p = String(phone || '').trim()
  const e = String(email || '').trim()
  const m = String(message || '').trim()
  if (!n || !c || !p || !e || !m) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return res.status(400).json({ error: 'Invalid email' })
  }
  const rawIndustry = String(industry || '').trim()
  const industryCode = rawIndustry ? INDUSTRY_MAP[rawIndustry] || rawIndustry : ''
  if (industryCode && !['ecommerce', 'trade', 'saas', 'other'].includes(industryCode)) {
    return res.status(400).json({ error: 'Invalid industry' })
  }

  const info = getDb()
    .prepare(
      `INSERT INTO inquiries (ip, name, company, phone, email, industry, message, is_read, is_deleted, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?)`,
    )
    .run(clientIp(req), n, c, p, e, industryCode || null, m, nowIso())

  res.status(201).json({ ok: true, id: info.lastInsertRowid })
})

adminRouter.get('/inquiries', requireAuth, (req, res) => {
  const { read, include_deleted } = req.query
  const where = []
  const params = []
  if (include_deleted !== '1') {
    where.push('is_deleted = 0')
  }
  if (read === '0' || read === '1') {
    where.push('is_read = ?')
    params.push(Number(read))
  }
  const sql = `SELECT * FROM inquiries ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC`
  const rows = getDb().prepare(sql).all(...params)
  res.json({ items: rows })
})

adminRouter.get('/inquiries/:id', requireAuth, (req, res) => {
  const row = getDb().prepare('SELECT * FROM inquiries WHERE id = ?').get(Number(req.params.id))
  if (!row || row.is_deleted) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

adminRouter.patch('/inquiries/:id/read', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const is_read = req.body?.is_read === false || req.body?.is_read === 0 ? 0 : 1
  const row = getDb().prepare('SELECT id FROM inquiries WHERE id = ? AND is_deleted = 0').get(id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  getDb().prepare('UPDATE inquiries SET is_read = ? WHERE id = ?').run(is_read, id)
  res.json({ ok: true, id, is_read })
})

adminRouter.delete('/inquiries/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const row = getDb().prepare('SELECT id FROM inquiries WHERE id = ? AND is_deleted = 0').get(id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  getDb().prepare('UPDATE inquiries SET is_deleted = 1 WHERE id = ?').run(id)
  res.json({ ok: true })
})

export { publicRouter as inquiriesPublicRouter, adminRouter as inquiriesAdminRouter }
