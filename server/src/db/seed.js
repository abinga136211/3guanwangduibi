import { getDb, nowIso } from './index.js'

const SEED_JOBS = [
  {
    title: '前端工程师',
    job_type: '全职',
    experience: '2 年以上',
    work_location: '香港',
    responsibilities:
      '负责官网与商户后台的前端开发与体验优化\n与产品、设计协作，落地跨境支付相关页面与交互\n维护组件库与前端工程规范，保障多语言与多端适配',
    requirements:
      '熟悉 Vue 3 / TypeScript，有实际项目经验\n了解前端性能、无障碍与基础安全实践\n沟通清晰，能独立推进功能交付',
  },
  {
    title: '后端工程师（支付系统）',
    job_type: '全职',
    experience: '3 年以上',
    work_location: '香港',
    responsibilities:
      '参与收款、结算与对账相关服务的设计与开发\n对接银行 / 通道接口，保障交易链路稳定与可观测\n编写接口文档与单元测试，参与代码评审',
    requirements:
      '熟悉 Java 或 Node.js，了解常见数据库与消息队列\n有金融 / 支付 / 清结算相关经验优先\n重视数据一致性、幂等与异常处理',
  },
  {
    title: '合规专员（AML / KYC）',
    job_type: '全职',
    experience: '2 年以上',
    work_location: '香港',
    responsibilities:
      '执行客户尽职调查（CDD / EDD）与持续监控\n识别可疑交易，协助提交可疑交易报告（STR）相关材料\n维护合规政策文档并配合监管检查',
    requirements:
      '熟悉香港 AML 法规与 MSO 监管要求\n细致、保密意识强，能处理敏感客户资料\n具备合规或风控相关经验优先',
  },
]

/** Insert demo published jobs when the table is empty. */
export function seedJobsIfEmpty() {
  const count = getDb().prepare('SELECT COUNT(*) AS c FROM jobs').get().c
  if (count > 0) return
  const ts = nowIso()
  const stmt = getDb().prepare(
    `INSERT INTO jobs (title, job_type, experience, work_location, responsibilities, requirements, status, is_deleted, created_at, updated_at)
     VALUES (@title, @job_type, @experience, @work_location, @responsibilities, @requirements, 'published', 0, @created_at, @updated_at)`,
  )
  const tx = getDb().transaction((jobs) => {
    for (const job of jobs) {
      stmt.run({ ...job, created_at: ts, updated_at: ts })
    }
  })
  tx(SEED_JOBS)
  console.log(`Seeded ${SEED_JOBS.length} jobs`)
}
