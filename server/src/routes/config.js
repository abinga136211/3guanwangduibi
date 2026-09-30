import { Router } from 'express'
import { getPublicConfig, getAdminConfig, upsertConfig } from '../services/configService.js'
import { requireAuth } from '../middleware/auth.js'

const publicRouter = Router()
const adminRouter = Router()

publicRouter.get('/config', (_req, res) => {
  const config = getPublicConfig()
  res.json({
    customer_email: config.customer_email,
    partnership_email: config.partnership_email,
    office_address: config.office_address,
  })
})

adminRouter.get('/config', requireAuth, (_req, res) => {
  res.json(getAdminConfig())
})

adminRouter.put('/config', requireAuth, (req, res) => {
  const { customer_email, partnership_email, office_address } = req.body || {}
  const result = upsertConfig({ customer_email, partnership_email, office_address })
  res.json(result)
})

export { publicRouter as configPublicRouter, adminRouter as configAdminRouter }
