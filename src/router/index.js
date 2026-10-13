import { createRouter, createWebHistory } from 'vue-router'
import { apiFetch } from '@/api/client'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { view: 'home' },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/ProductsView.vue'),
    meta: { view: 'products' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { view: 'about' },
  },
  {
    path: '/compliance',
    name: 'compliance',
    component: () => import('@/views/ComplianceView.vue'),
    meta: { view: 'compliance' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FaqView.vue'),
    meta: { view: 'faq' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { view: 'contact' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/PrivacyView.vue'),
    meta: { view: 'privacy' },
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLoginView.vue'),
    meta: { admin: true, publicAdmin: true },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { admin: true, requiresAdmin: true },
    children: [
      { path: '', redirect: { name: 'admin-tables' } },
      {
        path: 'tables',
        name: 'admin-tables',
        component: () => import('@/views/admin/AdminTablesView.vue'),
      },
      {
        path: 'config',
        name: 'admin-config',
        component: () => import('@/views/admin/AdminConfigView.vue'),
      },
      {
        path: 'inquiries',
        name: 'admin-inquiries',
        component: () => import('@/views/admin/AdminInquiriesView.vue'),
      },
      {
        path: 'jobs',
        name: 'admin-jobs',
        component: () => import('@/views/admin/AdminJobsView.vue'),
      },
      {
        path: 'applications',
        name: 'admin-applications',
        component: () => import('@/views/admin/AdminApplicationsView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { view: 'notFound' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth', top: 84 })
        }, 50)
      })
    }
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  if (!to.matched.some((r) => r.meta.requiresAdmin)) return true
  try {
    await apiFetch('/api/admin/me')
    return true
  } catch {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }
})

export default router
