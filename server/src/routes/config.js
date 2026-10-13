import { Router } from 'express'
import {
  listPublicConfigItems,
  listAdminConfigItems,
  createConfigItem,
  updateConfigItem,
  softDeleteConfigItem,
} from '../services/configService.js'
import { requireAuth } from '../middleware/auth.js'

const publicRouter = Router()
const adminRouter = Router()

publicRouter.get('/config', (_req, res) => {
  res.json({ items: listPublicConfigItems() })
})

adminRouter.get('/config', requireAuth, (req, res) => {
  const includeDeleted = req.query.include_deleted === '1'
  res.json({ items: listAdminConfigItems({ includeDeleted }) })
})

adminRouter.post('/config', requireAuth, (req, res) => {
  const result = createConfigItem(req.body || {})
  if (result.error) return res.status(400).json({ error: result.error })
  res.status(201).json(result)
})

adminRouter.put('/config/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid id' })
  const result = updateConfigItem(id, req.body || {})
  if (result.error) {
    return res.status(result.status || 400).json({ error: result.error })
  }
  res.json(result)
})

adminRouter.delete('/config/:id', requireAuth, (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'Invalid id' })
  const result = softDeleteConfigItem(id)
  if (result.error) {
    return res.status(result.status || 400).json({ error: result.error })
  }
  res.json(result)
})

export { publicRouter as configPublicRouter, adminRouter as configAdminRouter }
