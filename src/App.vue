<script setup>
import { watch, nextTick } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CookieConsent from '@/components/layout/CookieConsent.vue'
import { useLocaleStore } from '@/stores/locale'

const locale = useLocaleStore()
const route = useRoute()
const router = useRouter()

locale.setLanguage(locale.language)

watch(
  () => [route.meta.view, locale.language, route.fullPath],
  async () => {
    locale.setDocumentTitle(route.meta.view || 'home')
    await nextTick()
    locale.applyDom()
  },
  { immediate: true },
)

/** Intercept plain <a href="/..."> from migrated HTML so SPA navigation works */
function onAppClick(e) {
  // RouterLink already handled this click — don't push again
  if (e.defaultPrevented) return
  const a = e.target.closest('a')
  if (!a) return
  if (a.hasAttribute('download') || a.target === '_blank') return
  const href = a.getAttribute('href')
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))
    return
  if (href.startsWith('#') && !href.startsWith('#/')) {
    // in-page hash only
    return
  }
  // Strip Vite base (e.g. /Joanna/) so router.push matches route paths
  const base = import.meta.env.BASE_URL || '/'
  let path = href
  if (base !== '/' && path.startsWith(base)) {
    path = `/${path.slice(base.length)}`
  }
  if (path.startsWith('/') || path.startsWith('#')) {
    e.preventDefault()
    router.push(path)
  }
}
</script>

<template>
  <div class="adg-app" @click="onAppClick">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
    <CookieConsent />
  </div>
</template>
