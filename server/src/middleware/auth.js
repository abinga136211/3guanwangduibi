import { isValidSession, COOKIE_NAME } from '../services/authService.js'

export function attachAdmin(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  req.isAdmin = isValidSession(token)
  req.adminToken = token || null
  next()
}

export function requireAuth(req, res, next) {
  if (!req.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
