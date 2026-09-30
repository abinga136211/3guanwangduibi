<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { apiFetch } from '@/api/client'
import '@/assets/styles/admin.css'

const router = useRouter()

async function logout() {
  try {
    await apiFetch('/api/admin/logout', { method: 'POST' })
  } catch {
    /* ignore */
  }
  router.push({ name: 'admin-login' })
}
</script>

<template>
  <div class="admin-shell">
    <header class="admin-top">
      <div class="admin-brand">ADG PAY 管理后台</div>
      <nav class="admin-nav">
        <RouterLink :to="{ name: 'admin-tables' }">数据表</RouterLink>
        <RouterLink :to="{ name: 'admin-config' }">系统配置</RouterLink>
        <RouterLink :to="{ name: 'admin-inquiries' }">咨询</RouterLink>
        <RouterLink :to="{ name: 'admin-jobs' }">岗位</RouterLink>
        <RouterLink :to="{ name: 'admin-applications' }">投递</RouterLink>
      </nav>
      <div class="admin-top-actions">
        <button type="button" @click="logout">退出</button>
      </div>
    </header>
    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>
