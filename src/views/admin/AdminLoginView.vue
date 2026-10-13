<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch, setAdminToken } from '@/api/client'
import '@/assets/styles/admin.css'

const router = useRouter()
const password = ref('')
const error = ref('')
const loading = ref(false)

onMounted(async () => {
  try {
    await apiFetch('/api/admin/me')
    router.replace({ name: 'admin-tables' })
  } catch {
    /* stay on login */
  }
})

async function onSubmit(e) {
  e.preventDefault()
  error.value = ''
  loading.value = true
  try {
    const data = await apiFetch('/api/admin/login', {
      method: 'POST',
      body: { password: password.value },
    })
    if (data?.token) setAdminToken(data.token)
    router.push({ name: 'admin-tables' })
  } catch (err) {
    error.value = err.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="admin-login">
    <form class="admin-login-card admin-form" @submit="onSubmit">
      <h1>ADG PAY 管理后台</h1>
      <p>请输入管理密码</p>
      <label>
        密码
        <input v-model="password" type="password" autocomplete="current-password" required autofocus />
      </label>
      <button class="admin-btn admin-btn-primary" type="submit" :disabled="loading">
        {{ loading ? '登录中…' : '登录' }}
      </button>
      <div v-if="error" class="admin-msg err">{{ error }}</div>
    </form>
  </div>
</template>
