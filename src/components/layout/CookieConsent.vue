<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'

const COOKIE_NAME = 'adgpay-cookie-consent'
/** 1 year */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const locale = useLocaleStore()
const router = useRouter()
const visible = ref(false)
const POLICY_PATH = '/compliance#privacy'

function readCookie(name) {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=([^;]*)`),
  )
  return match ? decodeURIComponent(match[1]) : null
}

function writeCookie(name, value, maxAge = COOKIE_MAX_AGE) {
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`
}

function openPolicy(e) {
  e.preventDefault()
  e.stopPropagation()
  router.push(POLICY_PATH)
}

const COPY = {
  zh: {
    title: 'Cookie 偏好设定',
    before: '本网站使用 Cookie 为您提供更好的体验，继续浏览即表示您同意我们的',
    privacy: '《隐私政策》',
    mid: '及',
    cookie: '《Cookie 政策》',
    after: '。',
    decline: '拒绝',
    agree: '同意',
  },
  tw: {
    title: 'Cookie 偏好設定',
    before: '本網站使用 Cookie 為您提供更好的體驗，繼續瀏覽即表示您同意我們的',
    privacy: '《隱私政策》',
    mid: '及',
    cookie: '《Cookie 政策》',
    after: '。',
    decline: '拒絕',
    agree: '同意',
  },
  en: {
    title: 'Cookie Preferences',
    before:
      'This website uses cookies to provide you with a better experience. By continuing to browse, you agree to our ',
    privacy: '《Privacy Policy》',
    mid: 'and',
    cookie: '《Cookie Policy》',
    after: '.',
    decline: 'Decline',
    agree: 'Agree',
  },
}

const copy = computed(() => COPY[locale.language] || COPY.zh)

onMounted(() => {
  if (!readCookie(COOKIE_NAME)) visible.value = true
})

function dismiss(choice) {
  writeCookie(COOKIE_NAME, choice)
  visible.value = false
}
</script>

<template>
  <Transition name="cookie-banner">
    <div
      v-if="visible"
      class="cookie-consent"
      role="dialog"
      aria-live="polite"
      :aria-label="copy.title"
    >
      <div class="cookie-consent__inner">
        <div class="cookie-consent__copy">
          <strong class="cookie-consent__title">{{ copy.title }}</strong>
          <p class="cookie-consent__text">
            {{ copy.before }}<a
              class="cookie-consent__link"
              href="/compliance#privacy"
              @click="openPolicy"
              >{{ copy.privacy }}</a
            >{{ copy.mid }}<a
              class="cookie-consent__link"
              href="/compliance#privacy"
              @click="openPolicy"
              >{{ copy.cookie }}</a
            >{{ copy.after }}
          </p>
        </div>
        <div class="cookie-consent__actions">
          <button class="cookie-consent__btn cookie-consent__btn--decline" type="button" @click="dismiss('declined')">
            {{ copy.decline }}
          </button>
          <button class="cookie-consent__btn cookie-consent__btn--agree" type="button" @click="dismiss('accepted')">
            {{ copy.agree }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
