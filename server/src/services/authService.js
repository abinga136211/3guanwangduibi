import crypto from 'node:crypto'
import bcrypt from 'bcryptjs'

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000
/** @type {Map<string, { expires: number }>} */
const sessions = new Map()

export function getAdminCredentials() {
  const password = process.env.ADMIN_PASSWORD || '123456'
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || ''
  return { password, passwordHash }
}

export async function verifyAdminPassword(password) {
  const creds = getAdminCredentials()
  if (creds.passwordHash) {
    return bcrypt.compare(password, creds.passwordHash)
  }
  return password === creds.password
}

export function createSession() {
  const token = crypto.randomBytes(32).toString('hex')
  sessions.set(token, { expires: Date.now() + SESSION_TTL_MS })
  return token
}

export function destroySession(token) {
  if (token) sessions.delete(token)
}

export function isValidSession(token) {
  if (!token) return false
  const s = sessions.get(token)
  if (!s) return false
  if (Date.now() > s.expires) {
    sessions.delete(token)
    return false
  }
  s.expires = Date.now() + SESSION_TTL_MS
  return true
}

export const COOKIE_NAME = 'adg_admin_session'
