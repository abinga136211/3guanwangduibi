<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useLocaleStore } from '@/stores/locale'
import { apiFetch } from '@/api/client'
import { useAutoRefresh } from '@/composables/useAutoRefresh'

const locale = useLocaleStore()

const jobs = ref([])
const jobsLoading = ref(true)
const jobsError = ref('')
const expandedId = ref(null)
const applyOpen = ref(false)
const applyJobId = ref(null)
const applySubmitting = ref(false)
const applyMsg = ref({ show: false, text: '', ok: true })
const resumeInputRef = ref(null)
const resumeFile = ref(null)

const emptyApplyForm = () => ({
  name: '',
  gender: '',
  phone: '',
  email: '',
  school: '',
  location: '',
  bio: '',
  resumeName: '',
})

const applyForm = ref(emptyApplyForm())

const lang = computed(() => locale.language)

const LABEL_PACKS = {
  zh: {
    responsibilities: '岗位职责',
    requirements: '岗位要求',
    apply: '投递意向',
    empty: '当前暂无开放职位。欢迎稍后再来，或通过联系页与我们沟通。',
    count: '个职位空缺',
    experience: '经验',
    formTitle: '招聘信息表',
    formJob: '应聘职位',
    formName: '姓名',
    formGender: '性别',
    formGenderMale: '男',
    formGenderFemale: '女',
    formPhone: '手机号',
    formEmail: '邮箱',
    formSchool: '毕业院校',
    formLocation: '现居地',
    formBio: '个人简介',
    formBioHint: '限 200 字',
    formResume: '简历',
    formResumeHint: '仅 PDF，限 5MB',
    formResumePick: '选择文件',
    formResumeEmpty: '未选择文件',
    formResumeType: '请上传 PDF 格式简历。',
    formSubmit: '提交投递',
    formSubmitting: '提交中…',
    formCancel: '取消',
    formClose: '关闭',
    formRequired: '请完整填写必填项。',
    formEmailInvalid: '请输入正确的邮箱格式。',
    formBioTooLong: '个人简介不能超过 200 字。',
    formResumeTooLarge: '简历文件不能超过 5MB。',
    formSuccess: '已收到您的投递，我们会尽快与您联系。',
    formFail: '提交失败，请稍后重试。',
    loadFail: '职位加载失败，请刷新重试。',
    phName: '请输入姓名',
    phPhone: '请输入手机号',
    phEmail: 'name@example.com',
    phSchool: '请输入毕业院校',
    phLocation: '请输入现居地',
    phBio: '请简要介绍自己（限 200 字）',
  },
  tw: {
    responsibilities: '崗位職責',
    requirements: '崗位要求',
    apply: '投遞意向',
    empty: '當前暫無開放職位。歡迎稍後再來，或通過聯繫頁與我們溝通。',
    count: '個職位空缺',
    experience: '經驗',
    formTitle: '招聘信息表',
    formJob: '應聘職位',
    formName: '姓名',
    formGender: '性別',
    formGenderMale: '男',
    formGenderFemale: '女',
    formPhone: '手機號',
    formEmail: '郵箱',
    formSchool: '畢業院校',
    formLocation: '現居地',
    formBio: '個人簡介',
    formBioHint: '限 200 字',
    formResume: '簡歷',
    formResumeHint: '僅 PDF，限 5MB',
    formResumePick: '選擇文件',
    formResumeEmpty: '未選擇文件',
    formResumeType: '請上傳 PDF 格式簡歷。',
    formSubmit: '提交投遞',
    formSubmitting: '提交中…',
    formCancel: '取消',
    formClose: '關閉',
    formRequired: '請完整填寫必填項。',
    formEmailInvalid: '請輸入正確的郵箱格式。',
    formBioTooLong: '個人簡介不能超過 200 字。',
    formResumeTooLarge: '簡歷文件不能超過 5MB。',
    formSuccess: '已收到您的投遞，我們會盡快與您聯繫。',
    formFail: '提交失敗，請稍後重試。',
    loadFail: '職位加載失敗，請刷新重試。',
    phName: '請輸入姓名',
    phPhone: '請輸入手機號',
    phEmail: 'name@example.com',
    phSchool: '請輸入畢業院校',
    phLocation: '請輸入現居地',
    phBio: '請簡要介紹自己（限 200 字）',
  },
  en: {
    responsibilities: 'Responsibilities',
    requirements: 'Requirements',
    apply: 'Apply / Express interest',
    empty: 'No open roles right now. Please check back later or contact us.',
    count: 'open roles',
    experience: 'Experience',
    formTitle: 'Application Form',
    formJob: 'Position',
    formName: 'Full name',
    formGender: 'Gender',
    formGenderMale: 'Male',
    formGenderFemale: 'Female',
    formPhone: 'Phone',
    formEmail: 'Email',
    formSchool: 'Graduation school',
    formLocation: 'Current city',
    formBio: 'About you',
    formBioHint: 'Max 200 characters',
    formResume: 'Resume',
    formResumeHint: 'PDF only, max 5MB',
    formResumePick: 'Choose file',
    formResumeEmpty: 'No file selected',
    formResumeType: 'Please upload a PDF resume.',
    formSubmit: 'Submit application',
    formSubmitting: 'Submitting…',
    formCancel: 'Cancel',
    formClose: 'Close',
    formRequired: 'Please complete all required fields.',
    formEmailInvalid: 'Please enter a valid email address.',
    formBioTooLong: 'About you must be 200 characters or fewer.',
    formResumeTooLarge: 'Resume must be 5MB or smaller.',
    formSuccess: 'Application received. We will contact you soon.',
    formFail: 'Submission failed. Please try again later.',
    loadFail: 'Failed to load roles. Please refresh.',
    phName: 'Your name',
    phPhone: 'Phone number',
    phEmail: 'name@example.com',
    phSchool: 'School / university',
    phLocation: 'City / region',
    phBio: 'Brief intro (max 200 characters)',
  },
}

const labels = computed(() => LABEL_PACKS[lang.value] || LABEL_PACKS.zh)

const applyJobTitle = computed(() => {
  if (!applyJobId.value) return ''
  const job = jobs.value.find((j) => j.id === applyJobId.value)
  return job?.title || ''
})

const bioLen = computed(() => applyForm.value.bio.length)

async function loadJobs() {
  try {
    const data = await apiFetch('/api/jobs')
    jobs.value = data.items || []
    jobsError.value = ''
  } catch {
    if (jobsLoading.value) jobsError.value = labels.value.loadFail
  } finally {
    jobsLoading.value = false
  }
}

useAutoRefresh(loadJobs, {
  intervalMs: 2000,
  paused: computed(() => applyOpen.value),
})

function toggleExpand(id) {
  expandedId.value = expandedId.value === id ? null : id
}

function openApply(jobId) {
  applyJobId.value = jobId ?? null
  applyForm.value = emptyApplyForm()
  resumeFile.value = null
  applyMsg.value = { show: false, text: '', ok: true }
  if (resumeInputRef.value) resumeInputRef.value.value = ''
  applyOpen.value = true
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onApplyKeydown)
}

function closeApply() {
  if (!applyOpen.value) return
  applyOpen.value = false
  applySubmitting.value = false
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onApplyKeydown)
}

function onApplyKeydown(e) {
  if (e.key === 'Escape') closeApply()
}

onUnmounted(() => {
  window.removeEventListener('keydown', onApplyKeydown)
  document.body.style.overflow = ''
})

function onResumeChange(e) {
  const input = e.target
  const file = input.files?.[0]
  applyMsg.value = { show: false, text: '', ok: true }
  if (!file) {
    resumeFile.value = null
    applyForm.value.resumeName = ''
    return
  }
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    resumeFile.value = null
    applyForm.value.resumeName = ''
    input.value = ''
    applyMsg.value = { show: true, text: labels.value.formResumeType, ok: false }
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    resumeFile.value = null
    applyForm.value.resumeName = ''
    input.value = ''
    applyMsg.value = { show: true, text: labels.value.formResumeTooLarge, ok: false }
    return
  }
  resumeFile.value = file
  applyForm.value.resumeName = file.name
}

async function onApplySubmit(e) {
  e.preventDefault()
  const f = applyForm.value
  if (
    !applyJobId.value ||
    !f.name.trim() ||
    !f.gender ||
    !f.phone.trim() ||
    !f.email.trim() ||
    !f.school.trim() ||
    !f.location.trim() ||
    !f.bio.trim() ||
    !resumeFile.value
  ) {
    applyMsg.value = { show: true, text: labels.value.formRequired, ok: false }
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) {
    applyMsg.value = { show: true, text: labels.value.formEmailInvalid, ok: false }
    return
  }
  if (f.bio.length > 200) {
    applyMsg.value = { show: true, text: labels.value.formBioTooLong, ok: false }
    return
  }
  applySubmitting.value = true
  try {
    const body = new FormData()
    body.set('job_id', String(applyJobId.value))
    body.set('name', f.name.trim())
    body.set('gender', f.gender)
    body.set('phone', f.phone.trim())
    body.set('email', f.email.trim())
    body.set('school', f.school.trim())
    body.set('residence', f.location.trim())
    body.set('bio', f.bio.trim())
    body.set('resume', resumeFile.value)
    await apiFetch('/api/applications', { method: 'POST', body })
    applyMsg.value = { show: true, text: labels.value.formSuccess, ok: true }
    window.setTimeout(() => closeApply(), 800)
  } catch (err) {
    applyMsg.value = {
      show: true,
      text: err.message || labels.value.formFail,
      ok: false,
    }
  } finally {
    applySubmitting.value = false
  }
}
</script>

<template>
<section class="hero hero-page">
<div class="container">
<div class="hero-page-layout">
<div class="hero-page-copy">
<span class="hero-page-kicker" data-en="Careers" data-zh="就业机会" data-tw="就業機會">就业机会</span>
<h1 data-en="Join Us" data-zh="加入我们" data-tw="加入我們">加入我们</h1>
<p class="lead" data-en="ADG PAY looks for people who share our values. Join us to build licensed, transparent cross-border payment solutions and help enterprises collect and settle with confidence." data-zh="ADG PAY 一直寻找认同我们价值观的人才。加入我们，共同打造持牌、透明的跨境支付方案，帮助企业更安心地收款与结算。" data-tw="ADG PAY 一直尋找認同我們價值觀的人才。加入我們，共同打造持牌、透明的跨境支付方案，幫助企業更安心地收款與結算。">ADG PAY 一直寻找认同我们价值观的人才。加入我们，共同打造持牌、透明的跨境支付方案，帮助企业更安心地收款与结算。</p>
<div class="career-hero-cta">
<a class="btn btn-primary btn-lg" href="#openings" data-en="Open Roles" data-zh="职位空缺" data-tw="職位空缺">职位空缺</a>
<a class="btn btn-outline btn-lg" href="/contact" data-en="Contact Us" data-zh="联系我们" data-tw="聯繫我們">联系我们</a>
</div>
</div>
<div class="hero-page-media">
<figure class="hero-page-figure">
<img
  class="hero-page-img"
  src="/images/career-hero.jpg"
  alt=""
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

<section class="section career-section">
<div class="container">
<div class="career-intro career-intro--left">
<h2 data-en="Our Values" data-zh="我们的价值观" data-tw="我們的價值觀">我们的价值观</h2>
<p data-en="With expertise in payments and compliance, we stay close to real cross-border needs and deliver practical, innovative solutions for enterprises." data-zh="我们凭着在支付与合规方面的专业能力，贴近跨境企业真实需求，提供务实创新的解决方案，帮助客户提升竞争力。" data-tw="我們憑着在支付與合規方面的專業能力，貼近跨境企業真實需求，提供務實創新的解決方案，幫助客戶提升競爭力。">我们凭着在支付与合规方面的专业能力，贴近跨境企业真实需求，提供务实创新的解决方案，帮助客户提升竞争力。</p>
</div>
<div class="career-value-grid">
<article class="career-value">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</span>
<h3 data-en="Vision" data-zh="愿景" data-tw="願景">愿景</h3>
<p data-en="Make cross-border collection and settlement simpler through licensed, stable payment capabilities." data-zh="通过持牌、稳定的支付能力，让跨境收款与结算更简单。" data-tw="通過持牌、穩定的支付能力，讓跨境收款與結算更簡單。">通过持牌、稳定的支付能力，让跨境收款与结算更简单。</p>
</article>
<article class="career-value">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l2.2 4.5 5 .7-3.6 3.5.8 5L12 14.8 7.6 16.7l.8-5L4.8 8.2l5-.7L12 3z" stroke-linejoin="round"/></svg>
</span>
<h3 data-en="Innovation" data-zh="创新" data-tw="創新">创新</h3>
<p data-en="We keep refining products and experience so clients get clearer flows and better tools." data-zh="持续打磨产品与体验，让客户拥有更清晰的流程与更好用的工具。" data-tw="持續打磨產品與體驗，讓客戶擁有更清晰的流程與更好用的工具。">持续打磨产品与体验，让客户拥有更清晰的流程与更好用的工具。</p>
</article>
<article class="career-value">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke-linejoin="round"/><path d="M9.5 12l1.8 1.8L14.8 10" stroke-linecap="round" stroke-linejoin="round"/></svg>
</span>
<h3 data-en="Reliability" data-zh="可靠" data-tw="可靠">可靠</h3>
<p data-en="Compliance, security and transparent fees are the foundation of every client relationship." data-zh="合规、安全与透明费率，是我们与客户长期合作的基础。" data-tw="合規、安全與透明費率，是我們與客戶長期合作的基礎。">合规、安全与透明费率，是我们与客户长期合作的基础。</p>
</article>
<article class="career-value">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V5M4 19h16" stroke-linecap="round"/><path d="M8 15V9M12 15V7M16 15v-3" stroke-linecap="round"/></svg>
</span>
<h3 data-en="Commitment" data-zh="决心" data-tw="決心">决心</h3>
<p data-en="We face challenges together, stay pragmatic, and deliver results clients can trust." data-zh="面对挑战保持务实与协作，把结果做到客户信得过。" data-tw="面對挑戰保持務實與協作，把結果做到客戶信得過。">面对挑战保持务实与协作，把结果做到客户信得过。</p>
</article>
</div>
</div>
</section>

<section class="section career-section career-section--soft">
<div class="container">
<div class="career-head">
<h2 data-en="Benefits" data-zh="津贴和福利" data-tw="津貼和福利">津贴和福利</h2>
</div>
<div class="career-benefit-grid">
<article class="career-benefit">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 10l8-6 8 6v9a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-9z" stroke-linejoin="round"/></svg>
</span>
<strong data-en="Location" data-zh="地点" data-tw="地點">地点</strong>
<span data-en="Hong Kong office in a convenient business district" data-zh="香港甲级写字楼，交通便利" data-tw="香港甲級寫字樓，交通便利">香港甲级写字楼，交通便利</span>
</article>
<article class="career-benefit">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" stroke-linejoin="round"/></svg>
</span>
<strong data-en="Insurance" data-zh="保险" data-tw="保險">保险</strong>
<span data-en="Medical coverage for eligible employees" data-zh="合资格员工享有医疗保障" data-tw="合資格員工享有醫療保障">合资格员工享有医疗保障</span>
</article>
<article class="career-benefit">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M8 7V5a4 4 0 018 0v2" stroke-linecap="round"/><circle cx="12" cy="13" r="1.5"/></svg>
</span>
<strong data-en="Bonus" data-zh="奖金" data-tw="獎金">奖金</strong>
<span data-en="Discretionary year-end bonus" data-zh="酌情年终奖金" data-tw="酌情年終獎金">酌情年终奖金</span>
</article>
<article class="career-benefit">
<span class="career-icon" aria-hidden="true">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V5M4 19h16" stroke-linecap="round"/><path d="M8 15l3-4 3 2 4-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
</span>
<strong data-en="Career" data-zh="职业发展" data-tw="職業發展">职业发展</strong>
<span data-en="Clear growth path in payments and compliance" data-zh="支付与合规领域的成长空间" data-tw="支付與合規領域的成長空間">支付与合规领域的成长空间</span>
</article>
</div>
</div>
</section>

<section class="section career-section">
<div class="container">
<div class="career-head career-head--left">
<h2 data-en="Our Business" data-zh="我们的业务" data-tw="我們的業務">我们的业务</h2>
<p data-en="Serving cross-border enterprises from Hong Kong across key corridors." data-zh="立足香港，服务跨境企业的主要市场与资金走廊。" data-tw="立足香港，服務跨境企業的主要市場與資金走廊。">立足香港，服务跨境企业的主要市场与资金走廊。</p>
</div>
<ul class="career-markets">
<li data-en="Hong Kong" data-zh="香港" data-tw="香港">香港</li>
<li data-en="Mainland China" data-zh="中国内地" data-tw="中國內地">中国内地</li>
<li data-en="Southeast Asia" data-zh="东南亚" data-tw="東南亞">东南亚</li>
<li data-en="Singapore" data-zh="新加坡" data-tw="新加坡">新加坡</li>
<li data-en="Global corridors" data-zh="全球主要走廊" data-tw="全球主要走廊">全球主要走廊</li>
</ul>
</div>
</section>

<section class="section career-section career-section--soft" id="openings">
<div class="container">
<div class="career-head career-head--left">
<h2 data-en="Open Roles" data-zh="现有职位空缺" data-tw="現有職位空缺">现有职位空缺</h2>
</div>
<div class="career-openings">
<p v-if="jobsLoading" class="career-openings-empty">Loading…</p>
<p v-else-if="jobsError" class="career-openings-empty">{{ jobsError }}</p>
<template v-else>
<p class="career-openings-count">
<strong>{{ jobs.length }}</strong>
<span>{{ labels.count }}</span>
</p>

<template v-if="jobs.length">
<ul class="career-job-list">
<li
  v-for="job in jobs"
  :key="job.id"
  class="career-job"
  :class="{ 'is-open': expandedId === job.id }"
>
<button type="button" class="career-job-toggle" @click="toggleExpand(job.id)">
<span class="career-job-main">
<span class="career-job-title">{{ job.title }}</span>
<span class="career-job-meta">
<span>{{ job.work_location }}</span>
<span v-if="job.job_type" aria-hidden="true">·</span>
<span v-if="job.job_type">{{ job.job_type }}</span>
<span v-if="job.experience" aria-hidden="true">·</span>
<span v-if="job.experience">{{ labels.experience }} {{ job.experience }}</span>
</span>
</span>
<span class="career-job-chevron" aria-hidden="true"></span>
</button>
<div v-show="expandedId === job.id" class="career-job-body">
<div class="career-job-block">
<h4>{{ labels.responsibilities }}</h4>
<ul>
<li v-for="(item, i) in job.responsibilities" :key="'r-' + job.id + '-' + i">{{ item }}</li>
</ul>
</div>
<div class="career-job-block">
<h4>{{ labels.requirements }}</h4>
<ul>
<li v-for="(item, i) in job.requirements" :key="'q-' + job.id + '-' + i">{{ item }}</li>
</ul>
</div>
<a class="btn btn-primary" href="#" @click.prevent="openApply(job.id)">{{ labels.apply }}</a>
</div>
</li>
</ul>
</template>

<template v-else>
<p class="career-openings-empty">{{ labels.empty }}</p>
</template>
</template>
</div>
</div>
</section>

<Teleport to="body">
<div
  v-if="applyOpen"
  class="career-apply-overlay"
  role="presentation"
  @click.self="closeApply"
>
  <div
    class="career-apply-modal"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="'career-apply-title'"
  >
    <div class="career-apply-modal__head">
      <h2 id="career-apply-title">{{ labels.formTitle }}</h2>
      <button
        type="button"
        class="career-apply-modal__close"
        :aria-label="labels.formClose"
        @click="closeApply"
      >
        ×
      </button>
    </div>

    <form class="form career-apply-form" novalidate @submit="onApplySubmit">
      <div class="career-apply-form__body">
        <div v-if="applyJobTitle" class="career-apply-job">
          <span class="career-apply-job__label">{{ labels.formJob }}</span>
          <strong>{{ applyJobTitle }}</strong>
        </div>

        <div class="career-apply-grid">
          <div class="field">
            <label for="apply-name">{{ labels.formName }} <span class="req">*</span></label>
            <input
              id="apply-name"
              v-model="applyForm.name"
              type="text"
              :placeholder="labels.phName"
              required
              autocomplete="name"
            />
          </div>

          <div class="field">
            <span class="career-apply-label">{{ labels.formGender }} <span class="req">*</span></span>
            <div class="career-apply-gender" role="radiogroup" :aria-label="labels.formGender">
              <label class="career-apply-radio">
                <input v-model="applyForm.gender" type="radio" name="apply-gender" value="male" />
                <span>{{ labels.formGenderMale }}</span>
              </label>
              <label class="career-apply-radio">
                <input v-model="applyForm.gender" type="radio" name="apply-gender" value="female" />
                <span>{{ labels.formGenderFemale }}</span>
              </label>
            </div>
          </div>

          <div class="field">
            <label for="apply-phone">{{ labels.formPhone }} <span class="req">*</span></label>
            <input
              id="apply-phone"
              v-model="applyForm.phone"
              type="tel"
              :placeholder="labels.phPhone"
              required
              autocomplete="tel"
            />
          </div>

          <div class="field">
            <label for="apply-email">{{ labels.formEmail }} <span class="req">*</span></label>
            <input
              id="apply-email"
              v-model="applyForm.email"
              type="email"
              :placeholder="labels.phEmail"
              required
              autocomplete="email"
            />
          </div>

          <div class="field">
            <label for="apply-school">{{ labels.formSchool }} <span class="req">*</span></label>
            <input
              id="apply-school"
              v-model="applyForm.school"
              type="text"
              :placeholder="labels.phSchool"
              required
            />
          </div>

          <div class="field">
            <label for="apply-location">{{ labels.formLocation }} <span class="req">*</span></label>
            <input
              id="apply-location"
              v-model="applyForm.location"
              type="text"
              :placeholder="labels.phLocation"
              required
              autocomplete="address-level2"
            />
          </div>

          <div class="field career-apply-grid__full">
            <label for="apply-bio">
              {{ labels.formBio }} <span class="req">*</span>
              <span class="career-apply-hint">（{{ labels.formBioHint }}）</span>
            </label>
            <textarea
              id="apply-bio"
              v-model="applyForm.bio"
              :placeholder="labels.phBio"
              maxlength="200"
              rows="3"
              required
            />
            <p class="career-apply-counter" :class="{ 'is-full': bioLen >= 200 }">{{ bioLen }} / 200</p>
          </div>

          <div class="field career-apply-grid__full">
            <label for="apply-resume">
              {{ labels.formResume }} <span class="req">*</span>
              <span class="career-apply-hint">（{{ labels.formResumeHint }}）</span>
            </label>
            <div class="career-apply-resume">
              <input
                id="apply-resume"
                ref="resumeInputRef"
                class="career-apply-resume__input"
                type="file"
                accept="application/pdf,.pdf"
                @change="onResumeChange"
              />
              <label for="apply-resume" class="btn btn-outline career-apply-resume__btn">{{ labels.formResumePick }}</label>
              <span class="career-apply-resume__path" :title="applyForm.resumeName || undefined">
                {{ applyForm.resumeName || labels.formResumeEmpty }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="career-apply-form__foot">
        <div
          class="form-msg"
          :class="{ show: applyMsg.show }"
          :style="applyMsg.ok
            ? { background: '#e7f6ec', color: 'var(--green-500)' }
            : { background: '#fdecec', color: 'var(--red-500)' }"
        >
          {{ applyMsg.text }}
        </div>
        <div class="career-apply-actions">
          <button class="btn btn-outline" type="button" @click="closeApply">{{ labels.formCancel }}</button>
          <button class="btn btn-primary" type="submit" :disabled="applySubmitting">
            {{ applySubmitting ? labels.formSubmitting : labels.formSubmit }}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
</Teleport>

</template>
