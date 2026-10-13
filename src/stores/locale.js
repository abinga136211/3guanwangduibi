import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const LANGS = ['zh', 'tw', 'en']

const TITLES = {
  home: {
    zh: 'ADG PAY | 持牌跨境支付与收款解决方案',
    tw: 'ADG PAY | 持牌跨境支付與收款解決方案',
    en: 'ADG PAY | Licensed cross-border payment solutions',
  },
  products: {
    zh: '产品与解决方案 | ADG PAY',
    tw: '產品與解決方案 | ADG PAY',
    en: 'Products & Solutions | ADG PAY',
  },
  about: {
    zh: '关于我们 | ADG PAY',
    tw: '關於我們 | ADG PAY',
    en: 'About us | ADG PAY',
  },
  compliance: {
    zh: '合规与安全 | ADG PAY',
    tw: '合規與安全 | ADG PAY',
    en: 'Compliance & Security | ADG PAY',
  },
  faq: {
    zh: '帮助中心 / 常见问题 | ADG PAY',
    tw: '幫助中心 / 常見問題 | ADG PAY',
    en: 'Help Center / FAQ | ADG PAY',
  },
  contact: {
    zh: '联系我们 | ADG PAY',
    tw: '聯繫我們 | ADG PAY',
    en: 'Contact | ADG PAY',
  },
  privacy: {
    zh: '加入我们 | ADG PAY',
    tw: '加入我們 | ADG PAY',
    en: 'Join Us | ADG PAY',
  },
  notFound: {
    zh: '页面未找到 | ADG PAY',
    tw: '頁面未找到 | ADG PAY',
    en: 'Page Not Found | ADG PAY',
  },
}

const NAV_LABELS = {
  zh: {
    home: '首页',
    products: '产品与解决方案',
    about: '关于我们',
    compliance: '合规与安全',
    faq: '帮助中心',
    contact: '联系我们',
    privacy: '加入我们',
  },
  tw: {
    home: '首頁',
    products: '產品與解決方案',
    about: '關於我們',
    compliance: '合規與安全',
    faq: '幫助中心',
    contact: '聯繫我們',
    privacy: '加入我們',
  },
  en: {
    home: 'Home',
    products: 'Products & Solutions',
    about: 'About us',
    compliance: 'Compliance & Security',
    faq: 'Help Center',
    contact: 'Contact',
    privacy: 'Join Us',
  },
}

function normalizeLang(next) {
  if (next === 'en' || next === 'tw' || next === 'zh') return next
  return 'zh'
}

function htmlLang(lang) {
  if (lang === 'en') return 'en'
  if (lang === 'tw') return 'zh-TW'
  return 'zh-CN'
}

export const useLocaleStore = defineStore('locale', () => {
  const stored =
    typeof localStorage !== 'undefined' ? localStorage.getItem('adgpay-language') : null
  const language = ref(normalizeLang(stored || 'zh'))

  const isEn = computed(() => language.value === 'en')
  const isTw = computed(() => language.value === 'tw')
  const isZh = computed(() => language.value === 'zh')

  function setLanguage(next) {
    language.value = normalizeLang(next)
    localStorage.setItem('adgpay-language', language.value)
    document.documentElement.lang = htmlLang(language.value)
    applyDom()
  }

  function langToggleLabel() {
    if (language.value === 'en') return 'EN'
    if (language.value === 'tw') return '繁'
    return '简'
  }

  function langOptionLabel(code) {
    if (code === 'en') return 'English'
    if (code === 'tw') return '繁體'
    return '简体'
  }

  function navLabel(key) {
    const pack = NAV_LABELS[language.value] || NAV_LABELS.zh
    return pack[key] || key
  }

  function contactCta() {
    if (language.value === 'en') return 'Contact us'
    if (language.value === 'tw') return '聯繫諮詢'
    return '联系咨询'
  }

  function brandTag() {
    return language.value === 'en' ? 'Cross-border payments' : '跨境支付'
  }

  /** Pick zh / tw / en from a map or three positional args */
  function t(zhOrMap, en, tw) {
    if (zhOrMap && typeof zhOrMap === 'object' && !Array.isArray(zhOrMap)) {
      const m = zhOrMap
      if (language.value === 'en') return m.en ?? m.zh ?? ''
      if (language.value === 'tw') return m.tw ?? m.zh ?? m.en ?? ''
      return m.zh ?? m.tw ?? m.en ?? ''
    }
    if (language.value === 'en') return en ?? zhOrMap ?? ''
    if (language.value === 'tw') return tw ?? zhOrMap ?? en ?? ''
    return zhOrMap ?? ''
  }

  function setDocumentTitle(viewKey) {
    const pack = TITLES[viewKey] || TITLES.home
    document.title = t(pack)
  }

  function textForEl(el) {
    const { en, zh, tw } = el.dataset
    if (!zh && el.innerHTML) el.dataset.zh = el.innerHTML
    if (language.value === 'en') return el.dataset.en
    if (language.value === 'tw') return el.dataset.tw || el.dataset.zh
    return el.dataset.zh
  }

  function phForEl(el) {
    if (!el.dataset.zhPh) el.dataset.zhPh = el.getAttribute('placeholder') || ''
    if (language.value === 'en') return el.dataset.enPh
    if (language.value === 'tw') return el.dataset.twPh || el.dataset.zhPh
    return el.dataset.zhPh
  }

  /** Apply data-en / data-zh / data-tw (+ placeholder variants) on the current DOM */
  function applyDom(root = document) {
    root.querySelectorAll('[data-en]').forEach((el) => {
      el.innerHTML = textForEl(el)
    })
    root.querySelectorAll('[data-en-ph]').forEach((el) => {
      el.setAttribute('placeholder', phForEl(el))
    })
    const ppZh = root.querySelector?.('.pp-zh') ?? document.querySelector('.pp-zh')
    const ppTw = root.querySelector?.('.pp-tw') ?? document.querySelector('.pp-tw')
    const ppEn = root.querySelector?.('.pp-en') ?? document.querySelector('.pp-en')
    if (ppZh) ppZh.style.display = language.value === 'zh' ? '' : 'none'
    if (ppTw) ppTw.style.display = language.value === 'tw' ? '' : 'none'
    if (ppEn) ppEn.style.display = language.value === 'en' ? '' : 'none'
  }

  return {
    language,
    langs: LANGS,
    isEn,
    isTw,
    isZh,
    setLanguage,
    langToggleLabel,
    langOptionLabel,
    navLabel,
    contactCta,
    brandTag,
    t,
    setDocumentTitle,
    applyDom,
  }
})
