<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
const seconds = ref(3)
const ready = ref(false)

let timer = null

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })

  timer = window.setInterval(() => {
    if (seconds.value <= 1) {
      window.clearInterval(timer)
      timer = null
      router.replace({ name: 'home' })
      return
    }
    seconds.value -= 1
  }, 1000)
})

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
})
</script>

<template>
<section class="hero hero-page hero-notfound" :class="{ 'is-ready': ready }">
  <div class="container">
    <div class="hero-page-layout notfound-layout">
      <div class="hero-page-copy notfound-copy">
        <span class="notfound-status">
          <span class="notfound-status-code">404</span>
          <span
            data-en="Page not found"
            data-zh="页面未找到"
            data-tw="頁面未找到"
          >页面未找到</span>
        </span>
        <h1
          data-en="We couldn't find that page"
          data-zh="找不到这个页面"
          data-tw="找不到這個頁面"
        >找不到这个页面</h1>
        <p
          class="lead"
          data-en="The address may be outdated or mistyped. You'll return to the home page in a moment."
          data-zh="地址可能已失效，或输入有误。片刻后将返回首页。"
          data-tw="地址可能已失效，或輸入有誤。片刻後將返回首頁。"
        >地址可能已失效，或输入有误。片刻后将返回首页。</p>

        <div class="notfound-redirect" aria-live="polite">
          <div class="notfound-redirect-meta">
            <span
              data-en="Returning home"
              data-zh="即将返回首页"
              data-tw="即將返回首頁"
            >即将返回首页</span>
            <span class="notfound-redirect-time">{{ seconds }}s</span>
          </div>
          <div class="notfound-progress" role="progressbar" :aria-valuenow="4 - seconds" aria-valuemin="0" aria-valuemax="3">
            <span class="notfound-progress-bar"></span>
          </div>
        </div>

        <div class="hero-cta notfound-cta">
          <RouterLink
            class="btn btn-primary btn-lg"
            to="/"
            data-en="Back to home"
            data-zh="返回首页"
            data-tw="返回首頁"
          >返回首页</RouterLink>
          <RouterLink
            class="btn btn-outline btn-lg"
            to="/contact"
            data-en="Contact us"
            data-zh="联系我们"
            data-tw="聯繫我們"
          >联系我们</RouterLink>
        </div>

        <nav class="notfound-links" aria-label="Quick links">
          <span
            class="notfound-links-label"
            data-en="Quick links"
            data-zh="常用入口"
            data-tw="常用入口"
          >常用入口</span>
          <RouterLink to="/products" data-en="Products" data-zh="产品与方案" data-tw="產品與方案">产品与方案</RouterLink>
          <RouterLink to="/faq" data-en="Help Center" data-zh="帮助中心" data-tw="幫助中心">帮助中心</RouterLink>
          <RouterLink to="/about" data-en="About" data-zh="关于我们" data-tw="關於我們">关于我们</RouterLink>
        </nav>
      </div>

      <div class="hero-page-media notfound-media" aria-hidden="true">
        <div class="notfound-visual">
          <svg class="notfound-svg" viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="24" y="28" width="432" height="304" rx="8" stroke="#E2E8F0" stroke-width="1.5"/>
            <path class="notfound-grid" d="M24 108h432M24 188h432M24 268h432M144 28v304M264 28v304M384 28v304" stroke="#F1F5F9" stroke-width="1"/>
            <path class="notfound-route" d="M72 248C120 248 132 168 196 168H268" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round"/>
            <path class="notfound-route notfound-route--gap" d="M292 168H348C400 168 408 96 432 72" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8"/>
            <circle class="notfound-node" cx="72" cy="248" r="7" fill="#fff" stroke="#E1251B" stroke-width="2.5"/>
            <circle class="notfound-node notfound-node--mid" cx="196" cy="168" r="6" fill="#fff" stroke="#94A3B8" stroke-width="2"/>
            <circle class="notfound-node notfound-node--end" cx="432" cy="72" r="7" fill="#fff" stroke="#CBD5E1" stroke-width="2"/>
            <path class="notfound-break" d="M274 156l16 24M290 156l-16 24" stroke="#E1251B" stroke-width="2.5" stroke-linecap="round"/>
            <text class="notfound-mark" x="320" y="292" fill="#0F172A" font-size="42" font-weight="800" letter-spacing="-1.5">404</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
