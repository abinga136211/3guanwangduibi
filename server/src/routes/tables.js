import { Router } from 'express'
import { getDb } from '../db/index.js'
import { requireAuth } from '../middleware/auth.js'
import { listAdminConfigItems } from '../services/configService.js'

const router = Router()

router.get('/tables', requireAuth, (req, res) => {
  const includeDeleted = req.query.include_deleted !== '0'
  const db = getDb()

  const configItems = listAdminConfigItems({ includeDeleted })

  const inquiriesSql = includeDeleted
    ? 'SELECT * FROM inquiries ORDER BY id DESC'
    : 'SELECT * FROM inquiries WHERE is_deleted = 0 ORDER BY id DESC'
  const jobsSql = includeDeleted
    ? 'SELECT * FROM jobs ORDER BY id DESC'
    : 'SELECT * FROM jobs WHERE is_deleted = 0 ORDER BY id DESC'
  const applicationsSql = includeDeleted
    ? `SELECT a.*, j.title AS job_title
       FROM applications a
       LEFT JOIN jobs j ON j.id = a.job_id
       ORDER BY a.id DESC`
    : `SELECT a.*, j.title AS job_title
       FROM applications a
       LEFT JOIN jobs j ON j.id = a.job_id
       WHERE a.is_deleted = 0
       ORDER BY a.id DESC`

  const inquiries = db.prepare(inquiriesSql).all()
  const jobs = db.prepare(jobsSql).all()
  const applications = db.prepare(applicationsSql).all()

  res.json({
    include_deleted: includeDeleted,
    summary: {
      system_config: configItems.length,
      inquiries: inquiries.length,
      jobs: jobs.length,
      applications: applications.length,
      inquiries_unread: db
        .prepare('SELECT COUNT(*) AS c FROM inquiries WHERE is_deleted = 0 AND is_read = 0')
        .get().c,
      applications_unread: db
        .prepare('SELECT COUNT(*) AS c FROM applications WHERE is_deleted = 0 AND is_read = 0')
        .get().c,
      jobs_published: db
        .prepare(`SELECT COUNT(*) AS c FROM jobs WHERE is_deleted = 0 AND status = 'published'`)
        .get().c,
    },
    tables: {
      system_config: {
        columns: [
          'id',
          'name_zh',
          'name_en',
          'name_tw',
          'value_zh',
          'value_en',
          'value_tw',
          'sort_order',
          'is_deleted',
          'created_at',
          'updated_at',
        ],
        rows: configItems,
      },
      inquiries: {
        columns: [
          'id',
          'ip',
          'name',
          'company',
          'phone',
          'email',
          'industry',
          'message',
          'is_read',
          'is_deleted',
          'created_at',
        ],
        rows: inquiries,
      },
      jobs: {
        columns: [
          'id',
          'title',
          'job_type',
          'experience',
          'work_location',
          'responsibilities',
          'requirements',
          'status',
          'is_deleted',
          'created_at',
          'updated_at',
        ],
        rows: jobs,
      },
      applications: {
        columns: [
          'id',
          'job_id',
          'job_title',
          'name',
          'gender',
          'phone',
          'email',
          'school',
          'residence',
          'bio',
          'resume_path',
          'is_read',
          'is_deleted',
          'created_at',
        ],
        rows: applications,
      },
    },
  })
})

export default router
