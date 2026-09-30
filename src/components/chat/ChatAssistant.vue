<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLocaleStore } from '@/stores/locale'
import { CHAT_KB } from '@/data/chatKnowledge'

const locale = useLocaleStore()
const router = useRouter()

const open = ref(false)
const input = ref('')
const bodyEl = ref(null)
const messages = ref([])

const T = {
  placeholder: {
    zh: '输入您的问题…',
    tw: '輸入您的問題…',
    en: 'Type your question…',
  },
  status: {
    zh: '在线 · 即时回复',
    tw: '在線 · 即時回覆',
    en: 'Online · Instant reply',
  },
  welcome: {
    zh: '您好！我是 ADG PAY 智能助手 👋\n我可以帮您了解牌照资质、开户流程、收款付款、多币种与合规安全等常见问题。您想了解什么？',
    tw: '您好！我是 ADG PAY 智能助手 👋\n我可以幫您了解牌照資質、開戶流程、收款付款、多幣種與合規安全等常見問題。您想了解什麼？',
    en: "Hi! I'm the ADG PAY assistant 👋\nI can help with licensing, onboarding, collection & payments, multi-currency and compliance. What would you like to know?",
  },
  quick: {
    zh: ['如何开户？', '持有哪类牌照？', '支持哪些币种？', '怎么联系你们？'],
    tw: ['如何開戶？', '持有哪類牌照？', '支持哪些幣種？', '怎麼聯繫你們？'],
    en: ['How to open an account?', 'What license do you hold?', 'Which currencies?', 'How to contact you?'],
  },
  contactLabel: {
    zh: '前往「联系我们」留资',
    tw: '前往「聯繫我們」留資',
    en: 'Go to Contact page',
  },
  fallback: {
    zh: '这个问题我暂时无法直接解答。您可以点击下方按钮留下联系方式，或前往「联系我们」页面，我们的团队会尽快为您详细回复。',
    tw: '這個問題我暫時無法直接解答。您可以點擊下方按鈕留下聯繫方式，或前往「聯繫我們」頁面，我們的團隊會盡快為您詳細回覆。',
    en: "I can't answer that one automatically yet. Tap the button below to leave your details, or visit the Contact page — our team will follow up shortly.",
  },
  title: {
    zh: 'ADG PAY 智能助手',
    tw: 'ADG PAY 智能助手',
    en: 'ADG PAY Assistant',
  },
}

const lang = computed(() => locale.language)
const quicks = computed(() => T.quick[lang.value] || T.quick.zh)
const statusText = computed(() => T.status[lang.value] || T.status.zh)
const placeholder = computed(() => T.placeholder[lang.value] || T.placeholder.zh)
const titleText = computed(() => T.title[lang.value] || T.title.zh)

function matchKb(text) {
  const t = (text || '').toLowerCase()
  let best = null
  let bestScore = 0
  for (const item of CHAT_KB) {
    let score = 0
    for (const k of item.k) {
      if (t.includes(k.toLowerCase())) score++
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  return bestScore > 0 ? best : null
}

async function scrollBottom() {
  await nextTick()
  if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight
}

function addMsg(role, text, showContact = false) {
  messages.value.push({ role, text, showContact, typing: false })
  scrollBottom()
}

function addTyping() {
  messages.value.push({ role: 'bot', typing: true })
  scrollBottom()
  return messages.value.length - 1
}

function removeAt(idx) {
  messages.value.splice(idx, 1)
}

async function botReply(userText) {
  const l = lang.value
  const typingIdx = addTyping()
  await new Promise((r) => setTimeout(r, 480))
  removeAt(typingIdx)

  const hit = matchKb(userText)
  if (hit) addMsg('bot', hit.a[l] || hit.a.zh)
  else addMsg('bot', T.fallback[l] || T.fallback.zh, true)
}

function send(text) {
  const t = (text || '').trim()
  if (!t) return
  addMsg('user', t)
  input.value = ''
  botReply(t)
}

function openPanel() {
  open.value = true
  if (!messages.value.length) addMsg('bot', T.welcome[lang.value])
}

function closePanel() {
  open.value = false
}

function goContact() {
  router.push('/contact')
  closePanel()
}

watch(lang, () => {
  // keep quick chips reactive via computed; refresh welcome only if empty
})
</script>

<template>
  <div class="adg-chat" :class="{ open }">
    <button
      aria-label="打开智能助手"
      class="adg-chat-fab"
      type="button"
      @click="openPanel"
    >
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.6-.8L3 21l1.8-5.4A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"
        />
      </svg>
    </button>
    <div aria-label="ADG PAY 智能助手" class="adg-chat-panel" role="dialog">
      <div class="adg-chat-header">
        <div class="adg-chat-title">
          <span class="adg-chat-avatar">AI</span>
          <div>
            <strong>{{ titleText }}</strong>
            <small>{{ statusText }}</small>
          </div>
        </div>
        <button aria-label="关闭" class="adg-chat-close" type="button" @click="closePanel">
          ×
        </button>
      </div>
      <div ref="bodyEl" class="adg-chat-body">
        <template v-for="(m, i) in messages" :key="i">
          <div v-if="m.typing" class="adg-msg bot adg-typing">
            <div class="adg-bubble"><span></span><span></span><span></span></div>
          </div>
          <template v-else>
            <div class="adg-msg" :class="m.role">
              <div class="adg-bubble">{{ m.text }}</div>
            </div>
            <div v-if="m.showContact" class="adg-action">
              <button type="button" @click="goContact">{{ T.contactLabel[lang] || T.contactLabel.zh }}</button>
            </div>
          </template>
        </template>
      </div>
      <div class="adg-chat-quick">
        <button
          v-for="q in quicks"
          :key="q"
          type="button"
          class="adg-chip"
          @click="send(q)"
        >
          {{ q }}
        </button>
      </div>
      <form class="adg-chat-input" @submit.prevent="send(input)">
        <input
          v-model="input"
          :aria-label="placeholder"
          autocomplete="off"
          :placeholder="placeholder"
          type="text"
        />
        <button aria-label="发送" class="adg-chat-send" type="submit">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22l-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>
