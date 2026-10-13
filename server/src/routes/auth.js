import { Router } from 'express'
import {
  verifyAdminPassword,
  createSession,
  destroySession,
  COOKIE_NAME,
} from '../services/authService.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { password } = req.body || {}
  if (!password) {
    return res.status(400).json({ error: 'Password required' })
  }
  const ok = await verifyAdminPassword(String(password))
  if (!ok) {
    return res.status(401).json({ error: 'Invalid password' })
  }
  const token = createSession()
  // Cross-site admin (e.g. GitHub Pages → Cloudflare tunnel) needs SameSite=None
  const crossSite = String(process.env.COOKIE_SAMESITE || '').toLowerCase() === 'none'
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: crossSite ? 'none' : 'lax',
    secure: crossSite || process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  })
  // Also return token for Authorization header (required when third-party cookies are blocked)
  res.json({ ok: true, token })
})

router.post('/logout', (req, res) => {
  destroySession(req.adminToken)
  const crossSite = String(process.env.COOKIE_SAMESITE || '').toLowerCase() === 'none'
  res.clearCookie(COOKIE_NAME, {
    path: '/',
    sameSite: crossSite ? 'none' : 'lax',
    secure: crossSite || process.env.NODE_ENV === 'production',
  })
  res.json({ ok: true })
})

router.get('/me', (req, res) => {
  if (!req.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  res.json({ ok: true })
})

export default router
