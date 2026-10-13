<script setup>
import { computed, ref, watch } from 'vue'
import { apiFetch } from '@/api/client'
import { formatDateTime, previewText } from '@/utils/formatAdmin'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const items = ref([])
const searchInput = ref('')
const searchQuery = ref('')
const statusFilter = ref('active')
const msg = ref('')
const ok = ref(true)
const saving = ref(false)
const modalOpen = ref(false)
const editingId = ref(null)
const form = ref(emptyForm())

function emptyForm() {
  return {
    name_zh: '',
    name_en: '',
    name_tw: '',
    value_zh: '',
    value_en: '',
    value_tw: '',
  }
}

function applySearch() {
  searchQuery.value = searchInput.value.trim()
}

function onSearchKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    applySearch()
  }
}

const filteredItems = computed(() => {
  let list = items.value
  if (statusFilter.value === 'active') {
    list = list.filter((r) => !r.is_deleted)
  } else if (statusFilter.value === 'deleted') {
    list = list.filter((r) => r.is_deleted)
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((row) => {
    const hay = [
      row.id,
      row.name_zh,
      row.name_en,
      row.name_tw,
      row.value_zh,
      row.value_en,
      row.value_tw,
    ]
      .map((v) => String(v ?? '').toLowerCase())
      .join(' ')
    return hay.includes(q)
  })
})

async function load() {
  try {
    const includeDeleted = statusFilter.value !== 'active'
    const q = includeDeleted ? '?include_deleted=1' : ''
    const data = await apiFetch(`/api/admin/config${q}`)
    items.value = data.items || []
  } catch (err) {
    msg.value = err.message
    ok.value = false
  }
}

watch(statusFilter, () => {
  load()
})

useAutoRefresh(load, {
  intervalMs: 2000,
  paused: computed(() => modalOpen.value || saving.value),
})

function openCreate() {
  editingId.value = null
  form.value = emptyForm()
  msg.value = ''
  modalOpen.value = true
}

function openEdit(row) {
  editingId.value = row.id
  form.value = {
    name_zh: row.name_zh || '',
    name_en: row.name_en || '',
    name_tw: row.name_tw || '',
    value_zh: row.value_zh || '',
    value_en: row.value_en || '',
    value_tw: row.value_tw || '',
  }
  msg.value = ''
  modalOpen.value = true
}

function closeModal() {
  if (saving.value) return
  modalOpen.value = false
  editingId.value = null
}

async function save() {
  saving.value = true
  msg.value = ''
  try {
    if (editingId.value == null) {
      await apiFetch('/api/admin/config', { method: 'POST', body: form.value })
    } else {
      await apiFetch(`/api/admin/config/${editingId.value}`, {
        method: 'PUT',
        body: form.value,
      })
    }
    modalOpen.value = false
    editingId.value = null
    ok.value = true
    msg.value = '已保存'
    await load()
  } catch (err) {
    msg.value = err.message || '保存失败'
    ok.value = false
  } finally {
    saving.value = false
  }
}

async function remove(row) {
  if (!confirm(`确认删除配置「${row.name_zh || row.id}」？`)) return
  try {
    await apiFetch(`/api/admin/config/${row.id}`, { method: 'DELETE' })
    msg.value = '已删除'
    ok.value = true
    await load()
  } catch (err) {
    msg.value = err.message || '删除失败'
    ok.value = false
  }
}
</script>

<template>
  <div class="admin-card">
    <h1>系统配置</h1>
    <p class="admin-muted">
      以列表管理联系信息；每条需填写中 / 英 / 繁名称与内容。保存后写入数据库，联系我们页约 2
      秒内自动同步。
    </p>

    <div class="admin-toolbar">
      <button class="admin-btn admin-btn-primary" type="button" @click="openCreate">
        新增配置
      </button>
      <input
        v-model="searchInput"
        class="admin-toolbar-input"
        type="search"
        placeholder="搜索名称或内容…"
        aria-label="搜索配置"
        @keydown="onSearchKeydown"
      />
      <button class="admin-btn" type="button" @click="applySearch">搜索</button>
      <select v-model="statusFilter" class="admin-toolbar-select" aria-label="筛选状态">
        <option value="active">仅正常</option>
        <option value="deleted">仅已删除</option>
        <option value="all">全部</option>
      </select>
      <span class="admin-spacer" />
      <span class="admin-muted">共 {{ filteredItems.length }} 条</span>
      <button class="admin-btn" type="button" @click="load">刷新</button>
    </div>

    <p v-if="msg" class="admin-msg" :class="ok ? 'ok' : 'err'">{{ msg }}</p>

    <div class="admin-table-scroll">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>名称（简）</th>
            <th>内容摘要</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filteredItems"
            :key="row.id"
            :class="{ 'is-deleted-row': row.is_deleted }"
          >
            <td class="admin-cell-nowrap">{{ row.id }}</td>
            <td>
              <strong>{{ row.name_zh || '—' }}</strong>
              <div class="admin-stack">
                <small>{{ row.name_en || '—' }}</small>
                <small>{{ row.name_tw || '—' }}</small>
              </div>
            </td>
            <td>
              <span class="admin-cell-ellipsis" :title="row.value_zh">
                {{ previewText(row.value_zh, 48) }}
              </span>
            </td>
            <td class="admin-cell-nowrap">{{ formatDateTime(row.updated_at) }}</td>
            <td>
              <div v-if="!row.is_deleted" class="admin-actions">
                <button class="admin-btn" type="button" @click="openEdit(row)">编辑</button>
                <button class="admin-btn admin-btn-danger" type="button" @click="remove(row)">
                  删除
                </button>
              </div>
              <span v-else class="admin-muted">已删除</span>
            </td>
          </tr>
          <tr v-if="!filteredItems.length">
            <td colspan="5" class="admin-muted">
              {{
                items.length
                  ? '没有匹配的配置'
                  : '暂无配置，点击「新增配置」添加'
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div
    v-if="modalOpen"
    class="admin-modal-backdrop"
    role="presentation"
    @click.self="closeModal"
  >
    <div class="admin-modal" role="dialog" aria-modal="true" aria-labelledby="config-modal-title">
      <div class="admin-modal-header">
        <h2 id="config-modal-title">
          {{ editingId == null ? '新增系统配置' : `编辑系统配置 #${editingId}` }}
        </h2>
        <button class="admin-modal-close" type="button" aria-label="关闭" @click="closeModal">
          ×
        </button>
      </div>
      <form class="admin-form" @submit.prevent="save">
        <fieldset class="admin-lang-group">
          <legend>简体中文</legend>
          <label>
            名称
            <input v-model="form.name_zh" required />
          </label>
          <label>
            内容
            <textarea v-model="form.value_zh" rows="2" required />
          </label>
        </fieldset>
        <fieldset class="admin-lang-group">
          <legend>English</legend>
          <label>
            Name
            <input v-model="form.name_en" required />
          </label>
          <label>
            Content
            <textarea v-model="form.value_en" rows="2" required />
          </label>
        </fieldset>
        <fieldset class="admin-lang-group">
          <legend>繁體中文</legend>
          <label>
            名稱
            <input v-model="form.name_tw" required />
          </label>
          <label>
            內容
            <textarea v-model="form.value_tw" rows="2" required />
          </label>
        </fieldset>
        <div class="admin-actions">
          <button class="admin-btn admin-btn-primary" type="submit" :disabled="saving">
            {{ saving ? '保存中…' : '保存' }}
          </button>
          <button class="admin-btn" type="button" :disabled="saving" @click="closeModal">
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
