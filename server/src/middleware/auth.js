import { isValidSession, COOKIE_NAME } from '../services/authService.js'

function bearerToken(req) {
  const header = req.get('authorization') || ''
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match?.[1]?.trim() || null
}

export function attachAdmin(req, _res, next) {
  const token = bearerToken(req) || req.cookies?.[COOKIE_NAME] || null
  req.isAdmin = isValidSession(token)
  req.adminToken = token
  next()
}

export function requireAuth(req, res, next) {
  if (!req.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
