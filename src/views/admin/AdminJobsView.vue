<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '@/api/client'
import { formatDateTime } from '@/utils/formatAdmin'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const router = useRouter()
const items = ref([])
const searchInput = ref('')
const searchQuery = ref('')
const statusFilter = ref('all')
const msg = ref('')
const editing = ref(null)
const form = ref(emptyForm())

function emptyForm() {
  return {
    title: '',
    job_type: '全职',
    experience: '',
    work_location: '香港',
    responsibilities: '',
    requirements: '',
    status: 'draft',
  }
}

const filteredItems = computed(() => {
  let list = items.value
  if (statusFilter.value === 'deleted') {
    list = list.filter((r) => r.is_deleted)
  } else if (statusFilter.value !== 'all_deleted') {
    list = list.filter((r) => !r.is_deleted)
    if (statusFilter.value === 'published') {
      list = list.filter((r) => r.status === 'published')
    }
    if (statusFilter.value === 'draft') {
      list = list.filter((r) => r.status !== 'published')
    }
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((row) => {
    const hay = [
      row.id,
      row.title,
      row.job_type,
      row.experience,
      row.work_location,
      row.responsibilities,
      row.requirements,
    ]
      .map((v) => String(v ?? '').toLowerCase())
      .join(' ')
    return hay.includes(q)
  })
})

async function load() {
  try {
    const includeDeleted =
      statusFilter.value === 'deleted' || statusFilter.value === 'all_deleted'
    const q = includeDeleted ? '?include_deleted=1' : ''
    const data = await apiFetch(`/api/admin/jobs${q}`)
    items.value = data.items || []
  } catch (err) {
    msg.value = err.message
  }
}

watch(statusFilter, () => {
  load()
})

useAutoRefresh(load, {
  intervalMs: 2000,
  paused: computed(() => editing.value !== null),
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

function viewResumes(row) {
  router.push({ name: 'admin-applications', query: { job_id: String(row.id) } })
}

function startCreate() {
  editing.value = 'new'
  form.value = emptyForm()
}

function startEdit(row) {
  editing.value = row.id
  form.value = {
    title: row.title,
    job_type: row.job_type,
    experience: row.experience,
    work_location: row.work_location,
    responsibilities: row.responsibilities,
    requirements: row.requirements,
    status: row.status,
  }
}

function cancelEdit() {
  editing.value = null
}

async function save() {
  msg.value = ''
  try {
    if (editing.value === 'new') {
      await apiFetch('/api/admin/jobs', { method: 'POST', body: form.value })
    } else {
      await apiFetch(`/api/admin/jobs/${editing.value}`, {
        method: 'PUT',
        body: form.value,
      })
    }
    editing.value = null
    await load()
  } catch (err) {
    msg.value = err.message
  }
}

async function setStatus(row, status) {
  await apiFetch(`/api/admin/jobs/${row.id}/status`, {
    method: 'PATCH',
    body: { status },
  })
  await load()
}

async function remove(row) {
  if (!confirm(`确认软删除岗位「${row.title}」？历史投递仍会保留关联。`)) return
  try {
    await apiFetch(`/api/admin/jobs/${row.id}`, { method: 'DELETE' })
    await load()
  } catch (err) {
    msg.value = err.message || '删除失败'
  }
}
</script>

<template>
  <div class="admin-card">
    <h1>岗位管理</h1>
    <div class="admin-toolbar">
      <button class="admin-btn admin-btn-primary" type="button" @click="startCreate">新建岗位</button>
      <input
        v-model="searchInput"
        class="admin-toolbar-input"
        type="search"
        placeholder="搜索岗位名称、类型、地点…"
        aria-label="搜索岗位"
        @keydown="onSearchKeydown"
      />
      <button class="admin-btn" type="button" @click="applySearch">搜索</button>
      <select v-model="statusFilter" class="admin-toolbar-select" aria-label="筛选状态">
        <option value="all">全部</option>
        <option value="published">上架</option>
        <option value="draft">下架</option>
        <option value="deleted">仅已删除</option>
        <option value="all_deleted">全部（含已删除）</option>
      </select>
      <span class="admin-spacer" />
      <span class="admin-muted">共 {{ filteredItems.length }} 条</span>
      <button class="admin-btn" type="button" @click="load">刷新</button>
    </div>
    <p v-if="msg" class="admin-msg err">{{ msg }}</p>

    <div v-if="editing !== null" class="admin-card" style="margin: 0 0 1rem; background: #f8fafc">
      <h2>{{ editing === 'new' ? '新建岗位' : `编辑岗位 #${editing}` }}</h2>
      <form class="admin-form" @submit.prevent="save">
        <label>岗位名称 <input v-model="form.title" required /></label>
        <label>岗位类型 <input v-model="form.job_type" /></label>
        <label>工作经验 <input v-model="form.experience" /></label>
        <label>上班地址 <input v-model="form.work_location" /></label>
        <label>岗位职责（每行一条） <textarea v-model="form.responsibilities" rows="5" /></label>
        <label>岗位要求（每行一条） <textarea v-model="form.requirements" rows="5" /></label>
        <label>
          状态
          <select v-model="form.status">
            <option value="draft">下架</option>
            <option value="published">上架</option>
          </select>
        </label>
        <div class="admin-actions">
          <button class="admin-btn admin-btn-primary" type="submit">保存</button>
          <button class="admin-btn" type="button" @click="cancelEdit">取消</button>
        </div>
      </form>
    </div>

    <div v-if="editing === null" class="admin-table-scroll">
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>岗位</th>
            <th>信息</th>
            <th>状态</th>
            <th>投递</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filteredItems"
            :key="row.id"
            :class="{
              'is-deleted-row': row.is_deleted,
              'is-published-row': !row.is_deleted && row.status === 'published',
              'is-draft-row': !row.is_deleted && row.status !== 'published',
            }"
          >
            <td class="admin-cell-nowrap">{{ row.id }}</td>
            <td>
              <strong>{{ row.title }}</strong>
            </td>
            <td>
              <div class="admin-stack">
                <span>
                  <span class="admin-meta-pill">{{ row.job_type || '—' }}</span>
                  <span class="admin-meta-pill">{{ row.experience || '—' }}</span>
                </span>
                <small>{{ row.work_location || '—' }}</small>
              </div>
            </td>
            <td>
              <span
                class="admin-badge"
                :class="
                  row.is_deleted
                    ? 'deleted'
                    : row.status === 'published'
                      ? 'published'
                      : 'draft'
                "
              >
                {{
                  row.is_deleted
                    ? '已删'
                    : row.status === 'published'
                      ? '上架'
                      : '● 下架'
                }}
              </span>
            </td>
            <td class="admin-cell-nowrap">{{ row.application_count }}</td>
            <td class="admin-cell-nowrap">{{ formatDateTime(row.updated_at) }}</td>
            <td>
              <div v-if="!row.is_deleted" class="admin-actions">
                <button
                  v-if="row.application_count > 0"
                  class="admin-btn"
                  type="button"
                  title="查看该岗位投递与简历"
                  @click="viewResumes(row)"
                >
                  查看简历
                </button>
                <button class="admin-btn" type="button" @click="startEdit(row)">编辑</button>
                <button
                  v-if="row.status !== 'published'"
                  class="admin-btn"
                  type="button"
                  @click="setStatus(row, 'published')"
                >
                  上架
                </button>
                <button v-else class="admin-btn" type="button" @click="setStatus(row, 'draft')">
                  下架
                </button>
                <button class="admin-btn admin-btn-danger" type="button" @click="remove(row)">
                  删除
                </button>
              </div>
              <span v-else class="admin-muted">已软删</span>
            </td>
          </tr>
          <tr v-if="!filteredItems.length">
            <td colspan="7" class="admin-muted">
              {{ items.length ? '没有匹配的岗位' : '暂无岗位' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
