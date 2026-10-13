<script setup>
import { computed, ref, watch } from 'vue'
import { apiFetch } from '@/api/client'
import { formatDateTime, previewText } from '@/utils/formatAdmin'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const items = ref([])
const searchInput = ref('')
const searchQuery = ref('')
const statusFilter = ref('all')
const msg = ref('')
const industryLabel = {
  ecommerce: '跨境电商',
  trade: '外贸出口',
  saas: '软件服务',
  other: '其他',
}

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
    const industry = industryLabel[row.industry] || row.industry || ''
    const hay = [
      row.id,
      row.name,
      row.company,
      row.phone,
      row.email,
      industry,
      row.message,
      row.ip,
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
    const q = params.toString() ? `?${params}` : ''
    const data = await apiFetch(`/api/admin/inquiries${q}`)
    items.value = data.items || []
  } catch (err) {
    msg.value = err.message
  }
}

watch(statusFilter, () => {
  load()
})

useAutoRefresh(load, { intervalMs: 2000 })

function applySearch() {
  searchQuery.value = searchInput.value.trim()
}

function onSearchKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    applySearch()
  }
}

async function toggleRead(row) {
  await apiFetch(`/api/admin/inquiries/${row.id}/read`, {
    method: 'PATCH',
    body: { is_read: row.is_read ? 0 : 1 },
  })
  await load()
}

async function softDelete(row) {
  if (!confirm(`确认软删除咨询 #${row.id}？`)) return
  await apiFetch(`/api/admin/inquiries/${row.id}`, { method: 'DELETE' })
  await load()
}
</script>

<template>
  <div class="admin-card">
    <h1>咨询记录</h1>
    <div class="admin-toolbar">
      <input
        v-model="searchInput"
        class="admin-toolbar-input"
        type="search"
        placeholder="搜索姓名、公司、邮箱、需求…"
        aria-label="搜索咨询"
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
            <th>联系人</th>
            <th>联系方式</th>
            <th>行业</th>
            <th>需求说明</th>
            <th>来源</th>
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
                <strong>{{ row.name }}</strong>
                <span>{{ row.company }}</span>
              </div>
            </td>
            <td>
              <div class="admin-stack">
                <span class="admin-cell-nowrap">{{ row.phone }}</span>
                <span>{{ row.email }}</span>
              </div>
            </td>
            <td class="admin-cell-nowrap">
              {{ industryLabel[row.industry] || row.industry || '—' }}
            </td>
            <td>
              <div class="admin-cell-clamp" :title="row.message">{{ previewText(row.message, 80) }}</div>
            </td>
            <td>
              <div class="admin-stack">
                <small class="admin-cell-nowrap">{{ formatDateTime(row.created_at) }}</small>
                <small class="admin-cell-nowrap">IP {{ row.ip || '—' }}</small>
              </div>
            </td>
            <td>
              <div v-if="!row.is_deleted" class="admin-actions">
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
            <td colspan="8" class="admin-muted">
              {{ items.length ? '没有匹配的记录' : '暂无记录' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
