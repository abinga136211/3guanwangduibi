/** Format ISO timestamps for admin lists (local time). */
export function formatDateTime(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function shortPath(path) {
  if (!path) return '—'
  const parts = String(path).replace(/\\/g, '/').split('/')
  return parts[parts.length - 1] || path
}

export function previewText(text, max = 48) {
  const s = String(text || '').replace(/\s+/g, ' ').trim()
  if (!s) return '—'
  return s.length > max ? `${s.slice(0, max)}…` : s
}

export function lineCount(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean).length
}
