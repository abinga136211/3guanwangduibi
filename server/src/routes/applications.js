import fs from 'node:fs'
import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import { getDb, nowIso, UPLOADS_DIR } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'

const publicRouter = Router()
const adminRouter = Router()

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.pdf`
    cb(null, safe)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const okMime = file.mimetype === 'application/pdf'
    const okExt = path.extname(file.originalname || '').toLowerCase() === '.pdf'
    if (okMime && okExt) cb(null, true)
    else cb(new Error('Only PDF resumes are allowed'))
  },
})

publicRouter.post('/applications', (req, res) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      const msg = err.message || 'Upload failed'
      const status = err.code === 'LIMIT_FILE_SIZE' ? 400 : 400
      return res.status(status).json({ error: msg })
    }

    const job_id = Number(req.body?.job_id)
    const name = String(req.body?.name || '').trim()
    const gender = String(req.body?.gender || '').trim()
    const phone = String(req.body?.phone || '').trim()
    const email = String(req.body?.email || '').trim()
    const school = String(req.body?.school || '').trim()
    const residence = String(req.body?.residence || req.body?.location || '').trim()
    const bio = String(req.body?.bio || '').trim()

    if (!job_id || !name || !gender || !phone || !email || !school || !residence || !bio) {
      if (req.file?.path) fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'Missing required fields' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (req.file?.path) fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'Invalid email' })
    }
    if (bio.length > 200) {
      if (req.file?.path) fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'Bio must be 200 characters or fewer' })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'PDF resume required' })
    }

    const job = getDb()
      .prepare(
        `SELECT id FROM jobs WHERE id = ? AND is_deleted = 0 AND status = 'published'`,
      )
      .get(job_id)
    if (!job) {
      fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'Job not available' })
    }

    const resume_path = path.join('resumes', req.file.filename).replace(/\\/g, '/')
    const info = getDb()
      .prepare(
        `INSERT INTO applications (job_id, name, gender, phone, email, school, residence, bio, resume_path, is_read, is_deleted, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)`,
      )
      .run(job_id, name, gender, phone, email, school, residence, bio, resume_path, nowIso())

    res.status(201).json({ ok: true, id: info.lastInsertRowid })
  })
})

adminRouter.get('/applications', requireAuth, (req, res) => {
  const { read, include_deleted, job_id } = req.query
  const where = []
  const params = []
  if (include_deleted !== '1') where.push('a.is_deleted = 0')
  if (read === '0' || read === '1') {
    where.push('a.is_read = ?')
    params.push(Number(read))
  }
  if (job_id) {
    where.push('a.job_id = ?')
    params.push(Number(job_id))
  }
  const sql = `
    SELECT a.*, j.title AS job_title
    FROM applications a
    LEFT JOIN jobs j ON j.id = a.job_id
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY a.created_at DESC`
  res.json({ items: getDb().prepare(sql).all(...params) })
})

adminRouter.get('/applications/:id', requireAuth, (req, res) => {
  const row = getDb()
    .prepare(
      `SELECT a.*, j.title AS job_title
       FROM applications a
       LEFT JOIN jobs j ON j.id = a.job_id
       WHERE a.id = ?`,
    )
    .get(Number(req.params.id))
  if (!row || row.is_deleted) return res.status(404).json({ error: 'Not found' })
  res.json(row)
})

adminRouter.patch('/applications/:id/read', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const is_read = req.body?.is_read === false || req.body?.is_read === 0 ? 0 : 1
  const row = getDb().prepare('SELECT id FROM applications WHERE id = ? AND is_deleted = 0').get(id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  getDb().prepare('UPDATE applications SET is_read = ? WHERE id = ?').run(is_read, id)
  res.json({ ok: true, id, is_read })
})

adminRouter.get('/applications/:id/resume', requireAuth, (req, res) => {
  const row = getDb()
    .prepare('SELECT * FROM applications WHERE id = ? AND is_deleted = 0')
    .get(Number(req.params.id))
  if (!row?.resume_path) return res.status(404).json({ error: 'Not found' })
  const abs = path.join(path.dirname(UPLOADS_DIR), row.resume_path)
  if (!fs.existsSync(abs)) return res.status(404).json({ error: 'File missing' })
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `inline; filename="resume-${row.id}.pdf"`)
  fs.createReadStream(abs).pipe(res)
})

adminRouter.delete('/applications/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  const row = getDb().prepare('SELECT * FROM applications WHERE id = ? AND is_deleted = 0').get(id)
  if (!row) return res.status(404).json({ error: 'Not found' })
  getDb().prepare('UPDATE applications SET is_deleted = 1 WHERE id = ?').run(id)
  if (row.resume_path) {
    const abs = path.join(path.dirname(UPLOADS_DIR), row.resume_path)
    try {
      if (fs.existsSync(abs)) fs.unlinkSync(abs)
    } catch {
      /* ignore fs errors */
    }
  }
  res.json({ ok: true })
})

export { publicRouter as applicationsPublicRouter, adminRouter as applicationsAdminRouter }
