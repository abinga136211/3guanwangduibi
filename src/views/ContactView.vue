<script setup>
import { ref, computed } from 'vue'
import { useLocaleStore } from '@/stores/locale'
import { apiFetch } from '@/api/client'
import { useSiteConfig } from '@/composables/useSiteConfig'

const locale = useLocaleStore()
const formRef = ref(null)
const submitting = ref(false)
const msg = ref({ show: false, text: '', ok: true })
const { config: siteConfig } = useSiteConfig({ intervalMs: 2000 })

const FM = {
  zh: {
    err: '请完整填写带 * 的必填项，并确保邮箱格式正确。',
    submitting: '提交中…',
    success: '已收到您的信息，我们会尽快与您联系！',
    submit: '提交咨询',
    failPrefix: '提交失败：',
    failDefault: '请稍后重试，或直接邮件联系我们。',
    net: '网络异常，提交未成功。请稍后重试，或直接邮件联系我们。',
  },
  tw: {
    err: '請完整填寫帶 * 的必填項，並確保郵箱格式正確。',
    submitting: '提交中…',
    success: '已收到您的信息，我們會盡快與您聯繫！',
    submit: '提交諮詢',
    failPrefix: '提交失敗：',
    failDefault: '請稍後重試，或直接郵件聯繫我們。',
    net: '網絡異常，提交未成功。請稍後重試，或直接郵件聯繫我們。',
  },
  en: {
    err: 'Please complete all required fields (*) and ensure the email format is correct.',
    submitting: 'Submitting…',
    success: 'We have received your information and will contact you shortly!',
    submit: 'Submit Inquiry',
    failPrefix: 'Submission failed: ',
    failDefault: 'Please try again later, or email us directly.',
    net: 'Network error, submission failed. Please try again later, or email us directly.',
  },
}

const copy = computed(() => FM[locale.language] || FM.zh)

async function onSubmit(e) {
  e.preventDefault()
  const form = formRef.value
  if (!form) return
  const required = form.querySelectorAll('[required]')
  let ok = true
  required.forEach((el) => {
    if (!el.value.trim()) {
      ok = false
      el.style.borderColor = 'var(--red-500)'
    } else {
      el.style.borderColor = ''
    }
  })
  const email = form.querySelector('#email')
  if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    ok = false
    email.style.borderColor = 'var(--red-500)'
  }
  if (!ok) {
    msg.value = { show: true, text: copy.value.err, ok: false }
    return
  }
  submitting.value = true
  try {
    const fd = new FormData(form)
    await apiFetch('/api/inquiries', {
      method: 'POST',
      body: {
        name: String(fd.get('name') || '').trim(),
        company: String(fd.get('company') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        industry: String(fd.get('industry') || '').trim(),
        message: String(fd.get('message') || '').trim(),
      },
    })
    msg.value = { show: true, text: copy.value.success, ok: true }
    form.reset()
  } catch (err) {
    msg.value = {
      show: true,
      text: `${copy.value.failPrefix}${err.message || copy.value.failDefault}`,
      ok: false,
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
<section class="hero hero-page">
<div class="container">
<div class="hero-page-layout">
<div class="hero-page-copy">
<span class="hero-page-kicker" data-en="Local Team Service" data-zh="本地团队服务" data-tw="本地團隊服務">本地团队服务</span>
<h1 data-en="Contact Us" data-zh="联系我们" data-tw="聯繫我們">联系我们</h1>
<p class="lead" data-en="Whether for onboarding consultation or business cooperation, leave your information and our team will contact you soon." data-zh="无论是开户咨询还是商务合作，留下信息，我们的团队会尽快与你联系。" data-tw="無論是開戶諮詢還是商務合作，留下信息，我們的團隊會儘快與你聯繫。">无论是开户咨询还是商务合作，留下信息，我们的团队会尽快与你联系。</p>
<a class="btn btn-primary btn-lg" href="#contact-form" data-en="Leave Your Details" data-zh="留下你的需求" data-tw="留下你的需求">留下你的需求</a>
</div>
<div class="hero-page-media">
<figure class="hero-page-figure">
<img
  class="hero-page-img"
  src="/images/contact-hero.jpg"
  alt="Business cooperation and contact"
  width="960"
  height="720"
  loading="eager"
  decoding="async"
/>
</figure>
</div>
</div>
</div>
</section>

<section class="section contact-section">
<div class="container">
<div class="contact-layout">
<aside class="contact-aside">
<div class="contact-block">
<span class="contact-kicker" data-en="Customer Support" data-zh="客服支持" data-tw="客服支持">客服支持</span>
<div class="contact-row">
<span class="contact-label" data-en="Email" data-zh="邮箱" data-tw="郵箱">邮箱</span>
<a class="contact-value" :href="'mailto:' + siteConfig.customer_email">{{ siteConfig.customer_email }}</a>
</div>
<div class="contact-row">
<span class="contact-label" data-en="Service Hours" data-zh="服务时间" data-tw="服務時間">服务时间</span>
<span class="contact-value" data-en="Monday to Friday 9:00–18:00 (Hong Kong Time)" data-zh="周一至周五 9:00–18:00（香港时间）" data-tw="周一至周五 9:00–18:00（香港時間）">周一至周五 9:00–18:00（香港时间）</span>
</div>
</div>

<div class="contact-block" id="bilingual">
<span class="contact-kicker" data-en="Bilingual Support" data-zh="中英双语支持" data-tw="中英雙語支持">中英双语支持</span>
<p data-en="The support team can handle onboarding consultation, KYC document communication, global account application, collection verification, currency exchange and payment status follow-up in Chinese and English." data-zh="支持团队可使用中文与英文处理开户咨询、KYC 资料沟通、全球账户申请、收款核对、币种兑换及付款状态跟进。" data-tw="支持團隊可使用中文與英文處理開戶諮詢、KYC 資料溝通、全球賬戶申請、收款核對、幣種兌換及付款狀態跟進。">支持团队可使用中文与英文处理开户咨询、KYC 资料沟通、全球账户申请、收款核对、币种兑换及付款状态跟进。</p>
<div class="contact-row">
<span class="contact-label" data-en="Service Method" data-zh="服务方式" data-tw="服務方式">服务方式</span>
<span class="contact-value" data-en="Chinese / English Email &amp; Online Communication" data-zh="中文 / 英文邮件与在线沟通" data-tw="中文 / 英文郵件與在線溝通">中文 / 英文邮件与在线沟通</span>
</div>
</div>

<div class="contact-block">
<span class="contact-kicker" data-en="Business Cooperation" data-zh="商务合作" data-tw="商務合作">商务合作</span>
<div class="contact-row">
<span class="contact-label" data-en="Partnership Email" data-zh="合作邮箱" data-tw="合作郵箱">合作邮箱</span>
<a class="contact-value" :href="'mailto:' + siteConfig.partnership_email">{{ siteConfig.partnership_email }}</a>
</div>
<div class="contact-row">
<span class="contact-label" data-en="Office Address" data-zh="办公地址" data-tw="辦公地址">办公地址</span>
<span class="contact-value contact-value--wrap">{{ siteConfig.office_address }}</span>
</div>
</div>

<p class="contact-footnote" data-en="The above are our common contact details; feel free to write or visit anytime." data-zh="以上为我们的常用联系方式，欢迎随时来信或到访。" data-tw="以上爲我們的常用聯繫方式，歡迎隨時來信或到訪。">以上为我们的常用联系方式，欢迎随时来信或到访。</p>
</aside>

<div class="contact-form-wrap" id="contact-form">
<form ref="formRef" class="form contact-form" novalidate @submit="onSubmit">
<h2 data-en="Leave Your Details" data-zh="留下你的需求" data-tw="留下你的需求">留下你的需求</h2>
<p class="contact-form-lead" data-en="Fields marked with an asterisk (*) are required." data-zh="带 * 为必填项。" data-tw="帶 * 爲必填項。">带 <span class="req">*</span> 为必填项。</p>
<div class="field">
<label for="name"><span data-en="Name" data-zh="姓名" data-tw="姓名">姓名</span> <span class="req">*</span></label>
<input data-en-ph="Your name" data-zh-ph="您的称呼" data-tw-ph="您的稱呼" id="name" name="name" placeholder="您的称呼" required type="text"/>
</div>
<div class="row-2">
<div class="field">
<label for="company"><span data-en="Company Name" data-zh="公司名称" data-tw="公司名稱">公司名称</span> <span class="req">*</span></label>
<input data-en-ph="Company legal name" data-zh-ph="企业全称" data-tw-ph="企業全稱" id="company" name="company" placeholder="企业全称" required type="text"/>
</div>
<div class="field">
<label for="phone"><span data-en="Phone" data-zh="联系电话" data-tw="聯繫電話">联系电话</span> <span class="req">*</span></label>
<input data-en-ph="Include country code" data-zh-ph="含区号" data-tw-ph="含區號" id="phone" name="phone" placeholder="含区号" required type="tel"/>
</div>
</div>
<div class="field">
<label for="email"><span data-en="Email" data-zh="邮箱" data-tw="郵箱">邮箱</span> <span class="req">*</span></label>
<input data-en-ph="name@company.com" data-zh-ph="请输入邮箱地址" data-tw-ph="請輸入郵箱地址" id="email" name="email" placeholder="name@company.com" required type="email"/>
</div>
<div class="field">
<label data-en="Industry / Use Case" data-zh="行业场景" data-tw="行業場景" for="industry">行业场景</label>
<select id="industry" name="industry">
<option data-en="Please select" data-zh="请选择" data-tw="請選擇" value="">请选择</option>
<option value="ecommerce" data-en="Cross-border E-commerce" data-zh="跨境电商" data-tw="跨境電商">跨境电商</option>
<option value="trade" data-en="Cross-border Trade (B2B)" data-zh="外贸出口（B2B）" data-tw="外貿出口（B2B）">外贸出口（B2B）</option>
<option value="saas" data-en="SaaS / Software" data-zh="软件服务" data-tw="軟件服務">软件服务</option>
<option value="other" data-en="Other" data-zh="其他" data-tw="其他">其他</option>
</select>
</div>
<div class="field">
<label for="message"><span data-en="Inquiry Details" data-zh="需求说明" data-tw="需求說明">需求说明</span> <span class="req">*</span></label>
<textarea data-en-ph="Briefly describe your collection/payment scenario and needs" data-zh-ph="请简要描述您的收款/付款场景与需求" data-tw-ph="請簡要描述您的收款/付款場景與需求" id="message" name="message" placeholder="请简要描述您的收款/付款场景与需求" required></textarea>
</div>
<button class="btn btn-primary btn-block btn-lg" type="submit" :disabled="submitting">
  {{ submitting ? copy.submitting : copy.submit }}
</button>
<p class="note" data-en="By submitting, you agree that we may contact you about this inquiry. We will not use your information for other purposes." data-zh="提交即表示您同意我们就此次咨询与您联系。我们不会将您的信息用于其他用途。" data-tw="提交即表示您同意我們就此次諮詢與您聯繫。我們不會將您的信息用於其他用途。">提交即表示您同意我们就此次咨询与您联系。我们不会将您的信息用于其他用途。</p>
<div
  class="form-msg"
  :class="{ show: msg.show }"
  :style="msg.ok
    ? { background: '#e7f6ec', color: 'var(--green-500)' }
    : { background: '#fdecec', color: 'var(--red-500)' }"
>
  {{ msg.text }}
</div>
</form>
</div>
</div>
</div>
</section>
</template>
