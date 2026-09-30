<script setup>
import { computed, ref } from 'vue'
import { apiFetch } from '@/api/client'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const form = ref({
  customer_email: '',
  partnership_email: '',
  office_address: '',
})
const effective = ref(null)
const lastLoaded = ref(null)
const msg = ref('')
const ok = ref(true)
const saving = ref(false)

const dirty = computed(() => {
  if (!lastLoaded.value) return false
  return JSON.stringify(form.value) !== JSON.stringify(lastLoaded.value)
})

const live = computed(() => ({
  customer_email:
    form.value.customer_email.trim() || effective.value?.customer_email || '',
  partnership_email:
    form.value.partnership_email.trim() || effective.value?.partnership_email || '',
  office_address:
    form.value.office_address.trim() || effective.value?.office_address || '',
}))

function applyPayload(data) {
  const next = {
    customer_email: data.customer_email || '',
    partnership_email: data.partnership_email || '',
    office_address: data.office_address || '',
  }
  form.value = next
  lastLoaded.value = { ...next }
  effective.value = data.effective
}

async function load() {
  try {
    const data = await apiFetch('/api/admin/config')
    applyPayload(data)
  } catch (err) {
    msg.value = err.message
    ok.value = false
  }
}

useAutoRefresh(load, {
  intervalMs: 2000,
  paused: computed(() => dirty.value || saving.value),
})

async function save(e) {
  e.preventDefault()
  saving.value = true
  msg.value = ''
  try {
    const data = await apiFetch('/api/admin/config', {
      method: 'PUT',
      body: form.value,
    })
    applyPayload(data)
    msg.value = '已保存'
    ok.value = true
  } catch (err) {
    msg.value = err.message || '保存失败'
    ok.value = false
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="admin-card">
    <h1>系统配置</h1>
    <p class="admin-muted">编辑后保存即写入数据库；留空则官网使用下方「当前生效」兜底值。未编辑时约 2 秒自动同步。</p>
    <form class="admin-form" @submit="save">
      <label>
        客户邮箱
        <input
          v-model="form.customer_email"
          type="email"
          :placeholder="effective?.customer_email || '客户邮箱'"
        />
        <small class="admin-field-hint">当前生效：{{ live.customer_email || '—' }}</small>
      </label>
      <label>
        合作邮箱
        <input
          v-model="form.partnership_email"
          type="email"
          :placeholder="effective?.partnership_email || '合作邮箱'"
        />
        <small class="admin-field-hint">当前生效：{{ live.partnership_email || '—' }}</small>
      </label>
      <label>
        办公地址
        <textarea
          v-model="form.office_address"
          rows="3"
          :placeholder="effective?.office_address || '办公地址'"
        />
        <small class="admin-field-hint">当前生效：{{ live.office_address || '—' }}</small>
      </label>
      <button class="admin-btn admin-btn-primary" type="submit" :disabled="saving">
        {{ saving ? '保存中…' : '保存' }}
      </button>
      <div v-if="msg" class="admin-msg" :class="ok ? 'ok' : 'err'">{{ msg }}</div>
    </form>
  </div>
</template>

<style scoped>
.admin-field-hint {
  color: var(--gray-500, #64748b);
  font-size: 0.82rem;
  line-height: 1.4;
  word-break: break-word;
}
</style>
