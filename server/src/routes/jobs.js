import { Router } from 'express'
import { getDb, nowIso } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'

const publicRouter = Router()
const adminRouter = Router()

function splitLines(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function mapPublicJob(row) {
  return {
    id: row.id,
    title: row.title,
    job_type: row.job_type,
    experience: row.experience,
    work_location: row.work_location,
    responsibilities: splitLines(row.responsibilities),
    requirements: splitLines(row.requirements),
  }
}

publicRouter.get('/jobs', (_req, res) => {
  const rows = getDb()
    .prepare(
      `SELECT * FROM jobs WHERE is_deleted = 0 AND status = 'published' ORDER BY updated_at DESC`,
    )
    .all()
  res.json({ items: rows.map(mapPublicJob) })
})

publicRouter.get('/jobs/:id', (req, res) => {
  const row = getDb()
    .prepare(
      `SELECT * FROM jobs WHERE id = ? AND is_deleted = 0 AND status = 'published'`,
    )
    .get(Number(req.params.id))
  if (!row) return res.status(404).json({ error: 'Not found' })
  res.json(mapPublicJob(row))
})

adminRouter.get('/jobs', requireAuth, (req, res) => {
  const includeDeleted = req.query.include_deleted === '1'
  const sql = includeDeleted
    ? 'SELECT * FROM jobs ORDER BY updated_at DESC'
    : 'SELECT * FROM jobs WHERE is_deleted = 0 ORDER BY updated_at DESC'
  const rows = getDb().prepare(sql).all()
  const withCounts = rows.map((row) => {
    const count = getDb()
      .prepare(
        `SELECT COUNT(*) AS c FROM applications WHERE job_id = ? AND is_deleted = 0`,
      )
      .get(row.id).c
    return { ...row, application_count: count }
  })
  res.json({ items: withCounts })
})

adminRouter.get('/jobs/:id', requireAuth, (req, res) => {
  const row = getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(Number(req.params.id))
  if (!row || row.is_deleted) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

function validateJobBody(body) {
  const title = String(body?.title || '').trim()
  if (!title) return { error: 'Title required' }
  const status = body?.status === 'published' ? 'published' : 'draft'
  return {
    title,
    job_type: String(body?.job_type || '').trim(),
    experience: String(body?.experience || '').trim(),
    work_location: String(body?.work_location || '').trim(),
    responsibilities: String(body?.responsibilities || '').trim(),
    requirements: String(body?.requirements || '').trim(),
    status,
  }
}

adminRouter.post('/jobs', requireAuth, (req, res) => {
  const data = validateJobBody(req.body)
  if (data.error) return res.status(400).json({ error: data.error })
  const ts = nowIso()
  const info = getDb()
    .prepare(
      `INSERT INTO jobs (title, job_type, experience, work_location, responsibilities, requirements, status, is_deleted, created_at, updated_at)
       VALUES (@title, @job_type, @experience, @work_location, @responsibilities, @requirements, @status, 0, @created_at, @updated_at)`,
    )
    .run({ ...data, created_at: ts, updated_at: ts })
  const row = getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(row)
})

adminRouter.put('/jobs/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const existing = getDb().prepare('SELECT * FROM jobs WHERE id = ? AND is_deleted = 0').get(id)
  if (!existing) return res.status(404).json({ error: 'Not found' })
  const data = validateJobBody({ ...existing, ...req.body })
  if (data.error) return res.status(400).json({ error: data.error })
  getDb()
    .prepare(
      `UPDATE jobs SET title=@title, job_type=@job_type, experience=@experience, work_location=@work_location,
       responsibilities=@responsibilities, requirements=@requirements, status=@status, updated_at=@updated_at
       WHERE id=@id`,
    )
    .run({ ...data, updated_at: nowIso(), id })
  res.json(getDb().prepare('SELECT * FROM jobs WHERE id = ?').get(id))
})

adminRouter.patch('/jobs/:id/status', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const status = req.body?.status === 'published' ? 'published' : 'draft'
  const existing = getDb().prepare('SELECT id FROM jobs WHERE id = ? AND is_deleted = 0').get(id)
  if (!existing) return res.status(404).json({ error: 'Not found' })
  getDb()
    .prepare('UPDATE jobs SET status = ?, updated_at = ? WHERE id = ?')
    .run(status, nowIso(), id)
  res.json({ ok: true, id, status })
})

adminRouter.delete('/jobs/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const existing = getDb().prepare('SELECT id FROM jobs WHERE id = ? AND is_deleted = 0').get(id)
  if (!existing) return res.status(404).json({ error: 'Not found' })
  getDb()
    .prepare('UPDATE jobs SET is_deleted = 1, status = ?, updated_at = ? WHERE id = ?')
    .run('draft', nowIso(), id)
  res.json({ ok: true })
})

export { publicRouter as jobsPublicRouter, adminRouter as jobsAdminRouter }
