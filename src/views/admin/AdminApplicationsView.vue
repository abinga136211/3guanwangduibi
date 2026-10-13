<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch, apiUrl, getAdminToken } from '@/api/client'
import { formatDateTime, previewText, shortPath } from '@/utils/formatAdmin'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const route = useRoute()
const router = useRouter()

const items = ref([])
const searchInput = ref('')
const searchQuery = ref('')
const statusFilter = ref('all')
const msg = ref('')
const previewUrl = ref('')

const jobIdFilter = computed(() => {
  const raw = route.query.job_id
  if (raw == null || raw === '') return null
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : null
})

const jobFilterTitle = computed(() => {
  if (!jobIdFilter.value || !items.value.length) {
    return jobIdFilter.value ? `岗位 #${jobIdFilter.value}` : ''
  }
  return items.value[0]?.job_title
    ? `${items.value[0].job_title}（#${jobIdFilter.value}）`
    : `岗位 #${jobIdFilter.value}`
})

const filteredItems = computed(() => {
  let list = items.value
  if (statusFilter.value === 'deleted') {
    list = list.filter((r) => r.is_deleted)
  } else if (statusFilter.value !== 'all_deleted') {
    list = list.filter((r) => !r.is_deleted)
    if (statusFilter.value === 'unread') list = list.filter((r) => !r.is_read)
    if (statusFilter.value === 'read') list = list.filter((r) => r.is_read)
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((row) => {
    const hay = [
      row.id,
      row.job_id,
      row.job_title,
      row.name,
      row.gender,
      row.phone,
      row.email,
      row.school,
      row.residence,
      row.bio,
      row.resume_path,
    ]
      .map((v) => String(v ?? '').toLowerCase())
      .join(' ')
    return hay.includes(q)
  })
})

async function load() {
  try {
    const params = new URLSearchParams()
    if (statusFilter.value === 'deleted' || statusFilter.value === 'all_deleted') {
      params.set('include_deleted', '1')
    }
    if (statusFilter.value === 'unread') params.set('read', '0')
    if (statusFilter.value === 'read') params.set('read', '1')
    if (jobIdFilter.value) params.set('job_id', String(jobIdFilter.value))
    const q = params.toString() ? `?${params}` : ''
    const data = await apiFetch(`/api/admin/applications${q}`)
    items.value = data.items || []
  } catch (err) {
    msg.value = err.message
  }
}

useAutoRefresh(load, {
  intervalMs: 2000,
  paused: computed(() => Boolean(previewUrl.value)),
})

watch([jobIdFilter, statusFilter], () => {
  load()
})

function applySearch() {
  searchQuery.value = searchInput.value.trim()
}

function onSearchKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    applySearch()
  }
}

function clearJobFilter() {
  const q = { ...route.query }
  delete q.job_id
  router.replace({ name: 'admin-applications', query: q })
}

async function toggleRead(row) {
  await apiFetch(`/api/admin/applications/${row.id}/read`, {
    method: 'PATCH',
    body: { is_read: row.is_read ? 0 : 1 },
  })
  await load()
}

async function openResume(row) {
  closePreview()
  const res = await fetch(apiUrl(`/api/admin/applications/${row.id}/resume`), {
    credentials: 'include',
    headers: getAdminToken() ? { Authorization: `Bearer ${getAdminToken()}` } : {},
  })
  if (!res.ok) {
    msg.value = '无法加载简历'
    return
  }
  const blob = await res.blob()
  previewUrl.value = URL.createObjectURL(blob)
}

function closePreview() {
  if (previewUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = ''
}

async function softDelete(row) {
  if (!confirm(`确认软删除投递 #${row.id}？将同时删除磁盘上的 PDF。`)) return
  await apiFetch(`/api/admin/applications/${row.id}`, { method: 'DELETE' })
  closePreview()
  await load()
}

const genderLabel = { male: '男', female: '女' }
</script>

<template>
  <div class="admin-card">
    <h1>招聘投递</h1>
    <div class="admin-toolbar">
      <input
        v-model="searchInput"
        class="admin-toolbar-input"
        type="search"
        placeholder="搜索姓名、邮箱、岗位、院校…"
        aria-label="搜索投递"
        @keydown="onSearchKeydown"
      />
      <button class="admin-btn" type="button" @click="applySearch">搜索</button>
      <select v-model="statusFilter" class="admin-toolbar-select" aria-label="筛选状态">
        <option value="all">全部</option>
        <option value="unread">未读</option>
        <option value="read">已读</option>
        <option value="deleted">仅已删除</option>
        <option value="all_deleted">全部（含已删除）</option>
      </select>
      <span v-if="jobIdFilter" class="admin-meta-pill">
        筛选：{{ jobFilterTitle }}
        <button class="admin-link-clear" type="button" @click="clearJobFilter">清除</button>
      </span>
      <span class="admin-spacer" />
      <span class="admin-muted">共 {{ filteredItems.length }} 条</span>
      <button class="admin-btn" type="button" @click="load">刷新</button>
    </div>
    <p v-if="msg" class="admin-msg err">{{ msg }}</p>
    <div class="admin-table-scroll">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>状态</th>
            <th>岗位</th>
            <th>候选人</th>
            <th>联系方式</th>
            <th>背景</th>
            <th>简介</th>
            <th>简历</th>
            <th>投递时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filteredItems"
            :key="row.id"
            :class="{
              'is-deleted-row': row.is_deleted,
              'is-read-row': !row.is_deleted && row.is_read,
              'is-unread-row': !row.is_deleted && !row.is_read,
            }"
          >
            <td class="admin-cell-nowrap">{{ row.id }}</td>
            <td>
              <span
                class="admin-badge"
                :class="row.is_deleted ? 'deleted' : row.is_read ? 'read' : 'unread'"
              >
                {{ row.is_deleted ? '已删' : row.is_read ? '已读' : '● 未读' }}
              </span>
            </td>
            <td>
              <div class="admin-stack">
                <strong>{{ row.job_title || '—' }}</strong>
                <small>#{{ row.job_id }}</small>
              </div>
            </td>
            <td class="admin-cell-nowrap">
              {{ row.name }}
              <span class="admin-muted">· {{ genderLabel[row.gender] || row.gender }}</span>
            </td>
            <td>
              <div class="admin-stack">
                <span class="admin-cell-nowrap">{{ row.phone || '—' }}</span>
                <span>{{ row.email || '—' }}</span>
              </div>
            </td>
            <td>
              <div class="admin-stack">
                <span>{{ row.school || '—' }}</span>
                <small>{{ row.residence || '—' }}</small>
              </div>
            </td>
            <td>
              <div class="admin-cell-clamp" :title="row.bio">{{ previewText(row.bio, 60) }}</div>
            </td>
            <td>
              <span class="admin-muted" :title="row.resume_path || ''">{{
                shortPath(row.resume_path)
              }}</span>
            </td>
            <td class="admin-cell-nowrap">{{ formatDateTime(row.created_at) }}</td>
            <td>
              <div v-if="!row.is_deleted" class="admin-actions">
                <button class="admin-btn" type="button" @click="openResume(row)">查看简历</button>
                <button
                  class="admin-btn"
                  :class="row.is_read ? 'admin-btn-mark-unread' : 'admin-btn-mark-read'"
                  type="button"
                  @click="toggleRead(row)"
                >
                  {{ row.is_read ? '标为未读' : '标为已读' }}
                </button>
                <button class="admin-btn admin-btn-danger" type="button" @click="softDelete(row)">
                  删除
                </button>
              </div>
              <span v-else class="admin-muted">已软删</span>
            </td>
          </tr>
          <tr v-if="!filteredItems.length">
            <td colspan="10" class="admin-muted">
              {{ items.length ? '没有匹配的投递' : '暂无投递' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="previewUrl" class="admin-card">
    <div class="admin-toolbar">
      <h2 style="margin: 0; flex: 1">简历预览</h2>
      <a class="admin-btn" :href="previewUrl" target="_blank" rel="noopener">新窗口打开</a>
      <button class="admin-btn" type="button" @click="closePreview">关闭</button>
    </div>
    <iframe
      :src="previewUrl"
      title="resume"
      class="admin-resume-frame"
    />
  </div>
</template>

<style scoped>
.admin-link-clear {
  margin-left: 0.35rem;
  border: none;
  background: transparent;
  color: var(--red-700, #c8102e);
  cursor: pointer;
  text-decoration: underline;
  font: inherit;
  font-size: 0.78rem;
  padding: 0;
}
.admin-resume-frame {
  width: 100%;
  height: 70vh;
  border: 1px solid var(--red-100, #fceae9);
  border-radius: var(--radius-sm, 8px);
}
</style>
