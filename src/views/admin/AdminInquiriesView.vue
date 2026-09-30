<script setup>
import { ref } from 'vue'
import { apiFetch } from '@/api/client'
import { formatDateTime, previewText } from '@/utils/formatAdmin'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const items = ref([])
const filter = ref('all')
const includeDeleted = ref(false)
const msg = ref('')
const industryLabel = {
  ecommerce: '跨境电商',
  trade: '外贸出口',
  saas: '软件服务',
  other: '其他',
}

async function load() {
  try {
    const params = new URLSearchParams()
    if (filter.value === 'unread') params.set('read', '0')
    if (filter.value === 'read') params.set('read', '1')
    if (includeDeleted.value) params.set('include_deleted', '1')
    const q = params.toString() ? `?${params}` : ''
    const data = await apiFetch(`/api/admin/inquiries${q}`)
    items.value = data.items || []
  } catch (err) {
    msg.value = err.message
  }
}

useAutoRefresh(load, { intervalMs: 2000 })

async function setFilter(v) {
  filter.value = v
  await load()
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
          <tr v-if="!items.length">
            <td colspan="8" class="admin-muted">暂无记录</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
