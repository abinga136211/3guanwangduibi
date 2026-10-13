import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { loadEnvFile } from './loadEnv.js'
import { initDb } from './db/index.js'
import { seedJobsIfEmpty } from './db/seed.js'
import { attachAdmin } from './middleware/auth.js'
import authRouter from './routes/auth.js'
import { configPublicRouter, configAdminRouter } from './routes/config.js'
import { inquiriesPublicRouter, inquiriesAdminRouter } from './routes/inquiries.js'
import { jobsPublicRouter, jobsAdminRouter } from './routes/jobs.js'
import {
  applicationsPublicRouter,
  applicationsAdminRouter,
} from './routes/applications.js'
import tablesAdminRouter from './routes/tables.js'

loadEnvFile()

const PORT = Number(process.env.PORT || 3003)

initDb()
seedJobsIfEmpty()

const app = express()
app.set('trust proxy', 1)

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(attachAdmin)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'adgpay-api' })
})

app.use('/api', configPublicRouter)
app.use('/api', inquiriesPublicRouter)
app.use('/api', jobsPublicRouter)
app.use('/api', applicationsPublicRouter)

app.use('/api/admin', authRouter)
app.use('/api/admin', configAdminRouter)
app.use('/api/admin', inquiriesAdminRouter)
app.use('/api/admin', jobsAdminRouter)
app.use('/api/admin', applicationsAdminRouter)
app.use('/api/admin', tablesAdminRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`ADG PAY API listening on http://localhost:${PORT}`)
})
