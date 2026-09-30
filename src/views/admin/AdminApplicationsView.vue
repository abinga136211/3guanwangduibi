<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiFetch, apiUrl } from '@/api/client'
import { formatDateTime, previewText, shortPath } from '@/utils/formatAdmin'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const route = useRoute()
const router = useRouter()

const items = ref([])
const filter = ref('all')
const includeDeleted = ref(false)
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

async function load() {
  try {
    const params = new URLSearchParams()
    if (filter.value === 'unread') params.set('read', '0')
    if (filter.value === 'read') params.set('read', '1')
    if (includeDeleted.value) params.set('include_deleted', '1')
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

watch(jobIdFilter, () => {
  load()
})

async function setFilter(v) {
  filter.value = v
  await load()
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

function openResume(row) {
  previewUrl.value = apiUrl(`/api/admin/applications/${row.id}/resume`)
}

function closePreview() {
  previewUrl.value = ''
}

async function softDelete(row) {
  if (!confirm(`确认软删除投递 #${row.id}？将同时删除磁盘上的 PDF。`)) return
  await apiFetch(`/api/admin/applications/${row.id}`, { method: 'DELETE' })
  if (previewUrl.value.includes(`/${row.id}/resume`)) previewUrl.value = ''
  await load()
}

const genderLabel = { male: '男', female: '女' }
</script>

<template>
  <div class="admin-card">
    <h1>招聘投递</h1>
    <div class="admin-toolbar">
      <button
        class="admin-btn"
        :class="{ 'is-active': filter === 'all' }"
        type="button"
        @click="setFilter('all')"
      >
        全部
      </button>
      <button
        class="admin-btn"
        :class="{ 'is-active': filter === 'unread' }"
        type="button"
        @click="setFilter('unread')"
      >
        未读
      </button>
      <button
        class="admin-btn"
        :class="{ 'is-active': filter === 'read' }"
        type="button"
        @click="setFilter('read')"
      >
        已读
      </button>
      <label class="admin-check">
        <input v-model="includeDeleted" type="checkbox" @change="load" />
        含已删除
      </label>
      <span v-if="jobIdFilter" class="admin-meta-pill">
        筛选：{{ jobFilterTitle }}
        <button class="admin-link-clear" type="button" @click="clearJobFilter">清除</button>
      </span>
      <span class="admin-spacer" />
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
            v-for="row in items"
            :key="row.id"
            :class="{ 'is-deleted-row': row.is_deleted }"
          >
            <td class="admin-cell-nowrap">{{ row.id }}</td>
            <td>
              <span
                class="admin-badge"
                :class="row.is_deleted ? 'deleted' : row.is_read ? 'read' : 'unread'"
              >
                {{ row.is_deleted ? '已删' : row.is_read ? '已读' : '未读' }}
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
          <tr v-if="!items.length">
            <td colspan="10" class="admin-muted">暂无投递</td>
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
