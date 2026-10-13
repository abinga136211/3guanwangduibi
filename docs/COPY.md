# ADG PAY 全站文案

- Extraction date: 2026-09-26
- Note: 文案来源见各章节对应源文件；修改网站文案请改源码后同步更新本文件。
- 语种：ZH（简体）/ TW（繁体）/ EN（英文）。繁体对照来自 docs/deepseek_markdown_20260926_bffd2f.md。

> 本文档从 Vue views、`locale.js`、`chatKnowledge.js` 及 layout / home / chat 组件中提取全部中英文用户可见文案，供文档与翻译对照使用。不含 CSS、业务逻辑或图片路径。

## 文案源文件索引

- `src/views/*.vue`（HomeView、ProductsView、AboutView、ComplianceView、FaqView、ContactView、PrivacyView）
- `src/stores/locale.js`
- `src/data/chatKnowledge.js`
- `src/components/layout/AppHeader.vue`, `AppFooter.vue`
- `src/components/chat/ChatAssistant.vue`
- `src/components/home/FlagMarquee.vue`, `HeroVisual.vue`

---

## 全局 · locale.js

### 页面标题（TITLES）

| 路由 key | ZH | TW | EN |
|---|---|---|---|
| home | ADG PAY \| 持牌跨境支付与收款解决方案 | ADG PAY \| 持牌跨境支付與收款解決方案 | ADG PAY \| Licensed cross-border payment solutions |
| products | 产品与解决方案 \| ADG PAY | 產品與解決方案 \| ADG PAY | Products & Solutions \| ADG PAY |
| about | 关于我们 \| ADG PAY | 關於我們 \| ADG PAY | About us \| ADG PAY |
| compliance | 合规与安全 \| ADG PAY | 合規與安全 \| ADG PAY | Compliance & Security \| ADG PAY |
| faq | 帮助中心 / 常见问题 \| ADG PAY | 幫助中心 / 常見問題 \| ADG PAY | Help Center / FAQ \| ADG PAY |
| contact | 联系我们 \| ADG PAY | 聯繫我們 \| ADG PAY | Contact \| ADG PAY |
| privacy | 加入我们 \| ADG PAY | 加入我們 \| ADG PAY | Join Us \| ADG PAY |

### 导航标签（NAV_LABELS）

| key | ZH | TW | EN |
|---|---|---|---|
| home | 首页 | 首頁 | Home |
| products | 产品与解决方案 | 產品與解決方案 | Products & Solutions |
| about | 关于我们 | 關於我們 | About us |
| compliance | 合规与安全 | 合規與安全 | Compliance & Security |
| faq | 帮助中心 | 幫助中心 | Help Center |
| contact | 联系我们 | 聯繫我們 | Contact |
| privacy | 加入我们 | 加入我們 | Join Us |

### 其他

- **contactCta** — ZH: 联系咨询 / TW: 聯繫諮詢 / EN: Contact us
- **brandTag** — ZH: 跨境支付 / TW: 跨境支付 / EN: Cross-border payments

---

## 全局 · AppHeader.vue

- **品牌名：** ADG / ADG PAY（副标见 brandTag）
- **语言切换按钮：** 中文模式下显示 `EN`；英文模式下显示 `中文`
- **联系 CTA：** 见 locale `contactCta`
- **无障碍（中文硬编码）：** ZH: ADG PAY首页；主导航；切换中文与英文；打开菜单 / TW: ADG PAY首頁；主導覽；切換中文與英文；打開選單

---

## 全局 · AppFooter.vue

### 品牌简介

- **ZH:** 持有香港 MSO牌照的支付服务提供商，专注为跨境企业提供合规、透明的跨境支付与收款方案。
- **TW:** 持有香港 MSO牌照的支付服務提供商，專注為跨境企業提供合規、透明的跨境支付與收款方案。
- **EN:** A payment service provider holding a Hong Kong MSO licence, focused on compliant and transparent cross-border payment and collection solutions for cross-border enterprises.

### 栏目 · 产品

- **标题** — ZH: 产品 / TW: 產品 / EN: Products
- **链接**
  - ZH: 跨境收款 / TW: 跨境收款 / EN: Cross-border Collection
  - ZH: 多币种结算 / TW: 多幣種結算 / EN: Multi-currency Settlement
  - ZH: 虚拟账户 / TW: 虛擬賬戶 / EN: Virtual Accounts
  - ZH: 供应商付款 / TW: 供應商付款 / EN: Supplier Payments

### 栏目 · 公司

- **标题** — ZH: 公司 / TW: 公司 / EN: Company
- **链接**
  - ZH: 关于我们 / TW: 關於我們 / EN: About Us
  - ZH: 牌照资质 / TW: 牌照資質 / EN: Licence & Qualifications
  - ZH: 合规与安全 / TW: 合規與安全 / EN: Compliance & Security
  - ZH: 联系我们 / TW: 聯繫我們 / EN: Contact Us

### 栏目 · 支持

- **标题** — ZH: 支持 / TW: 支持 / EN: Support
- **链接**
  - ZH: 帮助中心（展示文案含「帮助中心 / FAQ」） / TW: 幫助中心（展示文案含「幫助中心 / FAQ」） / EN: Help Center
  - ZH: 使用指南 / TW: 使用指南 / EN: User Guides
  - ZH: 安全说明 / TW: 安全說明 / EN: Security Notes
  - ZH: 商务合作 / TW: 商務合作 / EN: Business Cooperation

### 页脚底部

- **版权** — ZH: © 2026 AD GLOBAL (HONG KONG) LIMITED. 保留所有权利。 / TW: © 2026 AD GLOBAL (HONG KONG) LIMITED. 保留所有權利。 / EN: © 2026 AD GLOBAL (HONG KONG) LIMITED. All rights reserved.
- **风险提示** — ZH: 风险提示：本网站所示信息以正式协议及当地监管规定为准；支付服务的具体可用范围、费率与到账时间，请与我们的团队确认。 / TW: 風險提示：本網站所示信息以正式協議及當地監管規定為準；支付服務的具體可用範圍、費率與到賬時間，請與我們的團隊確認。 / EN: Risk notice: Information on this website is subject to the formal agreement and local regulations; please confirm the specific availability, fees and arrival times of payment services with our team.

---

## 首页 · HomeView.vue

### Hero

- **H1**
  - **ZH:** 持牌跨境支付 / 让跨境企业全球收款更简单
  - **TW:** 持牌跨境支付 / 讓跨境企業全球收款更簡單
  - **EN:** Licensed Cross-border Payment / Making Global Collections Easier for Cross-border Businesses
- **导语**
  - **ZH:** ADG PAY持有香港MSO牌照，专注为电商、外贸与 SaaS 等跨境企业提供合规、透明、高效的跨境收款与多币种结算服务。本地团队，陪伴式服务。
  - **TW:** ADG PAY持有香港MSO牌照，專注為電商、外貿與 SaaS 等跨境企業提供合規、透明、高效的跨境收款與多幣種結算服務。本地團隊，陪伴式服務。
  - **EN:** ADG PAY holds a Hong Kong Money Service Operator (MSO) licence and focuses on providing compliant, transparent and efficient cross-border collection and multi-currency settlement services for cross-border enterprises such as e-commerce, trade and SaaS. Local team, companion-style service.
- **按钮**
  - ZH: 咨询开户 / TW: 諮詢開戶 / EN: Account Opening Consult
  - ZH: 查看产品方案 / TW: 查看產品方案 / EN: View Product Solutions

### Hero 数据条

| 主文案 ZH | 主文案 TW | 主文案 EN | 副文案 ZH | 副文案 TW | 副文案 EN |
|---|---|---|---|---|---|
| 多币种账户 | 多幣種賬戶 | Multi-currency Accounts | 本地币种收款与结算 | 本地幣種收款與結算 | Local-currency Collection & Settlement |
| 费率透明 | 費率透明 | Transparent Fees | 无隐藏费用 | 無隱藏費用 | No Hidden Fees |
| 持牌合规 | 持牌合規 | Licensed & Compliant | 受监管资金服务 | 受監管資金服務 | Regulated Fund Services |
| 本地化支持 | 本地化支持 | Localized Support | 中文团队服务 | 中文團隊服務 | Chinese-speaking Team Service |

### 核心产品（区头）

- **Kicker** — ZH: 核心产品 / TW: 核心產品 / EN: Core Products
- **H2** — ZH: 一站式的跨境收付能力 / TW: 一站式的跨境收付能力 / EN: One-stop Cross-border Pay-in & Pay-out
- **Lead** — ZH: 围绕跨境企业真实贸易场景打造，功能务实、上手简单，不堆砌复杂概念。 / TW: 圍繞跨境企業真實貿易場景打造，功能務實、上手簡單，不堆砌複雜概念。 / EN: Built around real cross-border trade scenarios — practical, easy to use, and free of unnecessary complexity.
- **Tab** — ZH: 收付方式 / TW: 收付方式 / EN: Pay-in & Pay-out
- **Tab** — ZH: 适配场景 / TW: 適配場景 / EN: Scenarios
- **CTA** — ZH: 了解更多 → / TW: 了解更多 → / EN: Learn more →

### 收付方式（methodItems）

#### 跨境收款 / Cross-border Collection

- **Desc** — ZH: 为全球买家提供本地收款账户，用本地币种收款，减少中转与汇损。 / TW: 為全球買家提供本地收款賬戶，用本地幣種收款，減少中轉與匯損。 / EN: Provide local collection accounts for global buyers to receive funds in local currencies, reducing intermediaries and FX loss.
- **Visual tag** — ZH: 本地收款 / TW: 本地收款 / EN: Local collection
- **Visual headline** — ZH: 本地币种收款入账 / TW: 本地幣種收款入賬 / EN: Receive in local currency
- **Visual detail** — ZH: 减少中转与汇损 / TW: 減少中轉與匯損 / EN: Fewer hops, less FX loss

#### 多币种结算 / Multi-currency Settlement

- **Desc** — ZH: 持有并管理多种币种余额，按需结算，灵活把握换汇时点。 / TW: 持有並管理多種幣種餘額，按需結算，靈活把握換匯時點。 / EN: Hold and manage multiple currency balances, settle on demand, and flexibly time your currency exchange.
- **Visual tag** — ZH: 多币种 / TW: 多幣種 / EN: Multi-currency
- **Visual headline** — ZH: 持有余额，按需结算 / TW: 持有餘額，按需結算 / EN: Hold & settle on demand
- **Visual detail** — ZH: 灵活把握换汇时点 / TW: 靈活把握換匯時點 / EN: Time your FX with flexibility

#### 虚拟账户 / Virtual Accounts

- **Desc** — ZH: 为每个业务线开立独立虚拟账户，资金清晰可分，对账更高效。 / TW: 為每個業務線開立獨立虛擬賬戶，資金清晰可分，對賬更高效。 / EN: Open independent virtual accounts for each business line, keeping funds clearly separable and reconciliation more efficient.
- **Visual tag** — ZH: 虚拟账户 / TW: 虛擬賬戶 / EN: Virtual account
- **Visual headline** — ZH: 一业务线一账户 / TW: 一業務線一賬戶 / EN: One line, one ledger
- **Visual detail** — ZH: 对账更高效 / TW: 對賬更高效 / EN: Clearer reconciliation

#### 供应商付款 / Supplier Payments

- **Desc** — ZH: 向海外供应商批量付款，支持多币种，流程留痕、合规可查。 / TW: 向海外供應商批量付款，支持多幣種，流程留痕、合規可查。 / EN: Make batch payments to overseas suppliers in multiple currencies, with traceable processes and compliant records.
- **Visual tag** — ZH: 批量付款 / TW: 批量付款 / EN: Batch payout
- **Visual headline** — ZH: 向海外供应商付款 / TW: 向海外供應商付款 / EN: Pay suppliers globally
- **Visual detail** — ZH: 流程留痕、合规可查 / TW: 流程留痕、合規可查 / EN: Traceable & compliant

### 适配场景（scenarioItems）

#### 跨境电商 / Cross-border E-commerce

- **Subtitle** — ZH: 平台收款与回款 / TW: 平台收款與回款 / EN: Platform Collection & Payout
- **Desc** — ZH: 对接主流电商平台收款，本地币种入账，回国结算更顺。 / TW: 對接主流電商平台收款，本地幣種入賬，回國結算更順。 / EN: Connect with major e-commerce platforms for collection, credit in local currency, and smoother repatriation settlement.
- **Features** — ZH: 多店铺统一归集；本地收款账户 / TW: 多店鋪統一歸集；本地收款賬戶 / EN: Unified Multi-store Aggregation；Local Collection Account
- **Visual tag** — ZH: 跨境电商 / TW: 跨境電商 / EN: E-commerce
- **Visual headline** — ZH: 平台收款与回款 / TW: 平台收款與回款 / EN: Platform Collection & Payout
- **Visual detail** — ZH: 本地币种入账，回国结算更顺 / TW: 本地幣種入賬，回國結算更順 / EN: Local currency in, smoother repatriation

#### 外贸出口 / Cross-border Trade / Export

- **Subtitle** — ZH: B2B 贸易收付款 / TW: B2B 貿易收付款 / EN: Cross-border Trade B2B
- **Desc** — ZH: 面向海外买家的电汇收款与供应商付款，单证与流水清晰可查。 / TW: 面向海外買家的電匯收款與供應商付款，單證與流水清晰可查。 / EN: Wire collection from overseas buyers and supplier payments, with clear documents and transaction records.
- **Features** — ZH: 电汇收款；批量付供应商 / TW: 電匯收款；批量付供應商 / EN: Wire Collection；Batch Supplier Payments
- **Visual tag** — ZH: 外贸出口 / TW: 外貿出口 / EN: B2B Trade
- **Visual headline** — ZH: B2B 贸易收付款 / TW: B2B 貿易收付款 / EN: B2B pay-in & pay-out
- **Visual detail** — ZH: 单证与流水清晰可查 / TW: 單證與流水清晰可查 / EN: Clear documents & records

#### SaaS / 软件 / SaaS / Software

- **Subtitle** — ZH: 订阅与全球收款 / TW: 訂閱與全球收款 / EN: Subscriptions & Global Collection
- **Desc** — ZH: 支持全球用户以本地方式付费，统一归集到多币种账户。 / TW: 支持全球用戶以本地方式付費，統一歸集到多幣種賬戶。 / EN: Let global users pay locally, with funds unified into multi-currency accounts.
- **Features** — ZH: 订阅收款；自动化对账 / TW: 訂閱收款；自動化對賬 / EN: Subscription Collection；Automated Reconciliation
- **Visual tag** — ZH: 软件服务 / TW: 軟件服務 / EN: SaaS
- **Visual headline** — ZH: 订阅与全球收款 / TW: 訂閱與全球收款 / EN: Subscriptions & Global Collection
- **Visual detail** — ZH: 本地付费，统一归集 / TW: 本地付費，統一歸集 / EN: Local pay-in, unified accounts

### 为什么选择 ADG PAY

- **Kicker** — ZH: 为什么选择 ADG PAY / TW: 為什麼選擇 ADG PAY / EN: Why Choose ADG PAY
- **H2** — ZH: 专注跨境企业，更懂你的业务 / TW: 專注跨境企業，更懂你的業務 / EN: Focused on Cross-border Enterprises, We Understand Your Business
- **Intro** — ZH: 我们把合规、透明与本地化服务，做成跨境企业用得起的跨境收付能力。 / TW: 我們把合規、透明與本地化服務，做成跨境企業用得起的跨境收付能力。 / EN: We turn compliance, transparency and localized service into cross-border pay-in/pay-out capabilities that cross-border enterprises can afford.

#### 受监管的资金服务

- **Title** — ZH: 受监管的资金服务 / TW: 受監管的資金服務 / EN: Regulated Fund Services
- **Body** — ZH: 我们持有香港海关发出的MSO牌照，在反洗黑钱与客户尽职审查方面受监管约束，为客户资金安全提供制度性保障。 / TW: 我們持有香港海關發出的MSO牌照，在反洗黑錢與客戶盡職審查方面受監管約束，為客戶資金安全提供制度性保障。 / EN: We hold a Money Service Operator licence issued by Hong Kong Customs (MSO), regulated for anti-money laundering and customer due diligence, providing institutional safeguards for client fund security.
- **监管机构** — ZH: 香港海关（展示完整：香港海关（Customs & Excise Department）） / TW: 香港海關（展示完整：香港海關（Customs & Excise Department）） / EN: Customs & Excise Department
- **服务范围** — ZH: 货币兑换 / 汇款 / TW: 貨幣兌換 / 匯款 / EN: Currency Exchange / Remittance
- **资金安排** — ZH: 客户资金隔离存放 / TW: 客戶資金隔離存放 / EN: Client Funds Segregated Custody
- **按钮** — ZH: 查看资质详情 / TW: 查看資質詳情 / EN: View Licence Details

#### 四个优势卡片

| 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|
| 持牌合规 | 持牌合規 | Licensed & Compliant | 香港 MSO 牌照受海关监管，经营受约束、资金更可信。 | 香港 MSO 牌照受海關監管，經營受約束、資金更可信。 | The Hong Kong MSO licence is supervised by Customs; regulated operations make funds more trustworthy. |
| 费率透明 | 費率透明 | Transparent Fees | 无隐藏费用，费率与汇率在开户前清晰告知。 | 無隱藏費用，費率與匯率在開戶前清晰告知。 | No hidden fees — rates and FX are clearly disclosed before account opening. |
| 本地服务 | 本地服務 | Local Service | 中文 / English 支持团队，按统一流程跟进，沟通清晰无隔阂。 | 中文 / English 支持團隊，按統一流程跟進，溝通清晰無隔閡。 | Chinese / English support team following a unified process for clear, barrier-free communication. |
| 快速响应 | 快速響應 | Fast Response | 决策链路短，开户与问题处理响应更快。 | 決策鏈路短，開戶與問題處理響應更快。 | Short decision chains mean faster responses for onboarding and issue resolution. |

### 四步开始

- **Kicker** — ZH: 四步开始 / TW: 四步開始 / EN: Get Started in Four Steps
- **H2** — ZH: 开户与使用的简单流程 / TW: 開戶與使用的簡單流程 / EN: A Simple Onboarding & Usage Flow
- **Lead** — ZH: 线上提交，资料审核，最快数个工作日内即可开始收款。 / TW: 線上提交，資料審核，最快數個工作日內即可開始收款。 / EN: Submit online, documents reviewed, and you can start collecting in as few as a few business days.

| 步骤 | 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|---|
| 1 | 提交申请 | 提交申請 | Submit Application | 在线填写企业资料，选择目标币种与服务。 | 在線填寫企業資料，選擇目標幣種與服務。 | Fill in company details online and select target currencies and services. |
| 2 | 资质审核 | 資質審核 | Verification | 完成 KYC 与业务尽调，资料齐全审核更快。 | 完成 KYC 與業務盡調，資料齊全審核更快。 | Complete KYC and business due diligence; complete documents speed up review. |
| 3 | 开通账户 | 開通賬戶 | Account Opening | 获取多币种虚拟账户，可立即向客户提供收款信息。 | 獲取多幣種虛擬賬戶，可立即向客戶提供收款信息。 | Get multi-currency virtual accounts and immediately provide collection details to clients. |
| 4 | 收款结算 | 收款結算 | Collection & Settlement | 收款、持有或结算，专属经理全程协助。 | 收款、持有或結算，專屬經理全程協助。 | Collect, hold or settle, with a dedicated manager assisting throughout. |

### 首页 CTA

- **H2** — ZH: 准备好让跨境收款更省心了吗？ / TW: 準備好讓跨境收款更省心了嗎？ / EN: Ready to Make Cross-border Collection Easier?
- **P** — ZH: 与我们的本地团队聊聊，获取适合你业务的合规支付方案。 / TW: 與我們的本地團隊聊聊，獲取適合你業務的合規支付方案。 / EN: Talk to our local team to get a compliant payment solution tailored to your business.
- **按钮** — ZH: 免费咨询 / TW: 免費諮詢 / EN: Free Consultation；ZH: 常见问题 / TW: 常見問題 / EN: FAQ

---

## 首页组件 · FlagMarquee.vue（覆盖地区）

| ZH | TW | EN |
|---|---|---|
| 香港 | 香港 | Hong Kong |
| 新加坡 | 新加坡 | Singapore |
| 台湾 | 台灣 | Taiwan |
| 韩国 | 韓國 | South Korea |
| 澳大利亚 | 澳大利亞 | Australia |
| 加拿大 | 加拿大 | Canada |
| 南非 | 南非 | South Africa |
| 法国 | 法國 | France |
| 意大利 | 意大利 | Italy |
| 阿联酋 | 阿聯酋 | UAE |
| 美国 | 美國 | United States |
| 英国 | 英國 | United Kingdom |
| 日本 | 日本 | Japan |
| 马来西亚 | 馬來西亞 | Malaysia |
| 泰国 | 泰國 | Thailand |
| 印度尼西亚 | 印度尼西亞 | Indonesia |
| 德国 | 德國 | Germany |
| 荷兰 | 荷蘭 | Netherlands |
| 菲律宾 | 菲律賓 | Philippines |
| 越南 | 越南 | Vietnam |
| 新西兰 | 新西蘭 | New Zealand |
| 瑞士 | 瑞士 | Switzerland |

---

## 首页组件 · HeroVisual.vue（装饰 UI，仅中文）

| ZH | TW |
|---|---|
| 跨境结算 | 跨境結算 |
| 实时入账 | 實時入賬 |
| 多币种收款账户 | 多幣種收款賬戶 |
| 本地收款 · 统一结算至 HKD | 本地收款 · 統一結算至 HKD |
| 今日净流入 | 今日淨流入 |

---

## 产品页 · ProductsView.vue

### Hero

- **Kicker** — ZH: 香港 MSO持牌机构 / TW: 香港 MSO持牌機構 / EN: Hong Kong MSO Licensed Institution
- **H1** — ZH: 产品与解决方案 / TW: 產品與解決方案 / EN: Products & Solutions
- **Lead** — ZH: 从收款到结算，覆盖跨境业务的核心资金环节。按行业场景选择适合你的方案。 / TW: 從收款到結算，覆蓋跨境業務的核心資金環節。按行業場景選擇適合你的方案。 / EN: From collection to settlement, covering the core fund flows of cross-border business. Choose the solution that fits your industry scenario.
- **按钮** — ZH: 免费咨询 / TW: 免費諮詢 / EN: Get a Quote

### 按行业场景（区头）

- **Kicker** — ZH: 按行业场景 / TW: 按行業場景 / EN: By Industry Scenario
- **H2** — ZH: 选择适合你的方案 / TW: 選擇適合你的方案 / EN: Choose the Right Solution for You
- **P** — ZH: 不同行业的收款与结算痛点不同，我们据此组织产品组合。 / TW: 不同行業的收款與結算痛點不同，我們據此組織產品組合。 / EN: Different industries face different collection and settlement pain points, so we organize our product portfolio accordingly.

### Tabs

- ZH: 跨境电商 / TW: 跨境電商 / EN: Cross-border E-commerce
- ZH: 外贸出口 / TW: 外貿出口 / EN: Cross-border Trade / Export
- ZH: 软件服务（按钮默认文案 SaaS / 软件） / TW: 軟件服務（按鈕默認文案 SaaS / 軟件） / EN: SaaS / Software
- ZH: 全部能力 / TW: 全部能力 / EN: All Capabilities

### Panel · 跨境电商

#### 平台本地收款账户 / Platform Local Collection Account

- **Tag** — ZH: 本地收款 / TW: 本地收款 / EN: Local Collection
- **P** — ZH: 为店铺提供本地币种收款账户，买家以本地方式付款，减少中转环节。 / TW: 為店鋪提供本地幣種收款賬戶，買家以本地方式付款，減少中轉環節。 / EN: Provide local-currency collection accounts for stores; buyers pay locally, reducing intermediary steps.
- **Features** — ZH: 多店铺资金归集；回款可追踪 / TW: 多店鋪資金歸集；回款可追蹤 / EN: Multi-store Fund Aggregation；Traceable Payouts

#### 多币种持有与结算 / Multi-currency Hold & Settlement

- **Tag** — ZH: 结算 / TW: 結算 / EN: Settlement
- **P** — ZH: 按业务节奏选择结算时点，减少不必要的换汇损耗。 / TW: 按業務節奏選擇結算時點，減少不必要的換匯損耗。 / EN: Choose settlement timing to your business rhythm, reducing unnecessary FX loss.
- **Features** — ZH: 按需换汇；费率透明 / TW: 按需換匯；費率透明 / EN: Exchange on Demand；Transparent Fees

#### 自动对账 / Automated Reconciliation

- **Tag** — ZH: 对账 / TW: 對賬 / EN: Reconciliation
- **P** — ZH: 流水清晰可导出，减轻财务对账负担。 / TW: 流水清晰可導出，減輕財務對賬負擔。 / EN: Clear, exportable statements lighten the finance reconciliation burden.
- **Features** — ZH: 明细可导出；多账户视图 / TW: 明細可導出；多賬戶視圖 / EN: Exportable Details；Multi-account View

### Panel · 外贸出口

#### 电汇收款 / Wire Collection

- **Tag** — ZH: 收款 / TW: 收款 / EN: Collection
- **P** — ZH: 面向海外买家的跨境电汇收款，提供清晰收款信息，流水留痕。 / TW: 面向海外買家的跨境電匯收款，提供清晰收款信息，流水留痕。 / EN: Cross-border wire collection from overseas buyers, with clear collection details and traceable records.
- **Features** — ZH: 多币种入账；到账通知 / TW: 多幣種入賬；到賬通知 / EN: Multi-currency Credit；Arrival Notification

#### 供应商批量付款 / Batch Supplier Payments

- **Tag** — ZH: 付款 / TW: 付款 / EN: Payment
- **P** — ZH: 向海外供应商批量付款，流程合规、单据齐全、便于审计。 / TW: 向海外供應商批量付款，流程合規、單據齊全、便於審計。 / EN: Batch payments to overseas suppliers with compliant processes, complete documents and easy audit.
- **Features** — ZH: 批量处理；付款留痕 / TW: 批量處理；付款留痕 / EN: Batch Processing；Traceable Payments

#### 贸易背景审核 / Trade Background Review

- **Tag** — ZH: 合规 / TW: 合規 / EN: Compliance
- **P** — ZH: 依据监管要求完成贸易真实性核验，保障资金合规流动。 / TW: 依據監管要求完成貿易真實性核驗，保障資金合規流動。 / EN: Verify trade authenticity per regulatory requirements to ensure compliant fund flows.
- **Features** — ZH: KYC / 尽调（完整：KYC / 业务尽调） / TW: KYC / 盡調（完整：KYC / 業務盡調） / EN: KYC / Due Diligence
- **Features** — ZH: 风控监控 / TW: 風控監控 / EN: Risk Monitoring

### Panel · SaaS

#### 全球订阅收款 / Global Subscription Collection

- **Tag** — ZH: 订阅 / TW: 訂閱 / EN: Subscription
- **P** — ZH: 支持全球用户以本地方式付费，资金统一归集到多币种账户。 / TW: 支持全球用戶以本地方式付費，資金統一歸集到多幣種賬戶。 / EN: Let global users pay locally, with funds unified into multi-currency accounts.
- **Features** — ZH: 本地收款体验；统一归集 / TW: 本地收款體驗；統一歸集 / EN: Local Collection Experience；Unified Aggregation

#### 虚拟账户分账 / Virtual Account Splitting

- **Tag** — ZH: 账户 / TW: 賬戶 / EN: Account
- **P** — ZH: 按产品或区域开立虚拟账户，收入一目了然，便于分账核算。 / TW: 按產品或區域開立虛擬賬戶，收入一目了然，便於分賬核算。 / EN: Open virtual accounts by product or region for clear revenue visibility and easy split accounting.
- **Features** — ZH: 多账户管理；清晰分账 / TW: 多賬戶管理；清晰分賬 / EN: Multi-account Management；Clear Split Accounting

#### 多币种结算 / Multi-currency Settlement

- **Tag** — ZH: 结算 / TW: 結算 / EN: Settlement
- **P** — ZH: 持有订阅收入，按需结算为本币，平滑汇率波动。 / TW: 持有訂閱收入，按需結算為本幣，平滑匯率波動。 / EN: Hold subscription income and settle to local currency on demand, smoothing FX volatility.
- **Features** — ZH: 按需结算；汇率透明 / TW: 按需結算；匯率透明 / EN: Settle on Demand；Transparent FX Rates

### Panel · 全部能力

| 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|
| 跨境收款 | 跨境收款 | Cross-border Collection | 本地币种收款账户，减少中转与汇损。 | 本地幣種收款賬戶，減少中轉與匯損。 | Local-currency collection accounts reduce intermediaries and FX loss. |
| 多币种结算 | 多幣種結算 | Multi-currency Settlement | 持有与结算多币种，灵活把握换汇时点。 | 持有與結算多幣種，靈活把握換匯時點。 | Hold and settle multiple currencies, flexibly timing your exchange. |
| 虚拟账户 | 虛擬賬戶 | Virtual Accounts | 独立虚拟账户，资金清晰可分。 | 獨立虛擬賬戶，資金清晰可分。 | Independent virtual accounts keep funds clearly separable. |
| 供应商付款 | 供應商付款 | Supplier Payments | 多币种批量付款，合规可查。 | 多幣種批量付款，合規可查。 | Multi-currency batch payments, compliant and traceable. |
| 货币兑换 | 貨幣兌換 | Currency Exchange | 牌照范围内的货币兑换服务。 | 牌照範圍內的貨幣兌換服務。 | Currency exchange services within licence scope. |
| 对账与报表 | 對賬與報表 | Reconciliation & Reporting | 流水导出、明细可查，便于财务核算。 | 流水導出、明細可查，便於財務核算。 | Statement export and detail lookup facilitate financial accounting. |

### 业务流转 · 能力总览

- **Kicker** — ZH: 业务流转 · 能力总览 / TW: 業務流轉 · 能力總覽 / EN: How It Works · Capabilities
- **H2** — ZH: 从开户到资金结算，一条清晰的资金链路 / TW: 從開戶到資金結算，一條清晰的資金鏈路 / EN: From account opening to fund settlement, one clear fund chain
- **P** — ZH: 围绕跨境收付的核心环节，ADG PAY 为企业提供从收款、持币到付款结算的连贯服务；一套账户，覆盖主要资金环节。 / TW: 圍繞跨境收付的核心環節，ADG PAY 為企業提供從收款、持幣到付款結算的連貫服務；一套賬戶，覆蓋主要資金環節。 / EN: Around the core of cross-border pay-in/out, ADG PAY provides coherent services from collection and holding to payment settlement — one account suite covering major fund flows.
- **Aria** — ZH: 资金链路步骤 / TW: 資金鏈路步驟 / EN: Fund chain steps；上一步 / Previous；下一步 / Next

#### flowSteps

| 标题 ZH | 标题 TW | 标题 EN | 描述 ZH | 描述 TW | 描述 EN |
|---|---|---|---|---|---|
| 开通账户 | 開通賬戶 | Account Opening | 提交资料并完成 KYC 审核 | 提交資料並完成 KYC 審核 | Submit documents and complete KYC review |
| 收款 | 收款 | Collection | 本地收款、电汇与订阅收款，覆盖主要进账场景 | 本地收款、電匯與訂閱收款，覆蓋主要進賬場景 | Local, wire and subscription collection for major inbound scenarios |
| 持有 | 持有 | Holding | 多币种余额管理，按需持有结算币种 | 多幣種餘額管理，按需持有結算幣種 | Multi-currency balances, hold settlement currencies on demand |
| 币种兑换 | 幣種兌換 | Currency Exchange | 将余额兑换为所需结算币种 | 將餘額兌換為所需結算幣種 | Exchange balances into the required settlement currency |
| 付款 | 付款 | Payment | 供应商与批量付款，流程留痕可审计 | 供應商與批量付款，流程留痕可審計 | Supplier and batch payments with audit-ready records |

### 客户好评 / 方案匹配

- **Kicker** — ZH: 客户好评 / TW: 客戶好評 / EN: Customer Stories
- **H2** — ZH: 不确定哪套方案适合你？ / TW: 不確定哪套方案適合你？ / EN: Not sure which solution fits you?
- **P** — ZH: 告诉我们你的业务与收款场景，由本地团队为你匹配。 / TW: 告訴我們你的業務與收款場景，由本地團隊為你匹配。 / EN: Tell us about your business and collection scenario, and our local team will match one for you.
- **Trust chips** — ZH: 跨境电商；外贸出口；SaaS / 软件；MSO 持牌；费率透明；本地团队 / TW: 跨境電商；外貿出口；SaaS / 軟件；MSO 持牌；費率透明；本地團隊 / EN: Cross-border E-commerce；Trade Export；SaaS；MSO Licensed；Transparent Fees；Local Team
- **按钮** — ZH: 联系顾问 / TW: 聯繫顧問 / EN: Contact an Advisor

---

## 关于我们 · AboutView.vue

### Hero

- **Kicker** — ZH: 我们的定位 / TW: 我們的定位 / EN: Our Positioning
- **H1** — ZH: 为跨境企业而生的跨境支付伙伴 / TW: 為跨境企業而生的跨境支付夥伴 / EN: A Cross-border Payment Partner Born for Cross-border Enterprises
- **Lead 1** — ZH: ADG PAY 持有香港MSO牌照，面向跨境电商、外贸出口与 SaaS 等跨境企业，提供跨境收款、多币种结算与虚拟账户等服务。 / TW: ADG PAY 持有香港MSO牌照，面向跨境電商、外貿出口與 SaaS 等跨境企業，提供跨境收款、多幣種結算與虛擬賬戶等服務。 / EN: ADG PAY holds a Hong Kong Money Service Operator (MSO) licence and serves cross-border enterprises such as e-commerce, trade export and SaaS with cross-border collection, multi-currency settlement and virtual accounts.
- **Lead 2** — ZH: 我们相信，合规的金融服务不应只是大企业的专属。所以我们把牌照优势、透明费率与本地化服务结合起来，让跨境企业也能用得上、用得起、用得放心。 / TW: 我們相信，合規的金融服務不應只是大企業的專屬。所以我們把牌照優勢、透明費率與本地化服務結合起來，讓跨境企業也能用得上、用得起、用得放心。 / EN: We believe compliant financial services should not be exclusive to large enterprises. So we combine licence advantages, transparent fees and localized service to make them accessible, affordable and trustworthy for cross-border enterprises.
- **要点**
  - ZH: 持牌经营，受香港海关监管 / TW: 持牌經營，受香港海關監管 / EN: Licensed operations, supervised by Hong Kong Customs
  - ZH: 聚焦跨境企业真实场景 / TW: 聚焦跨境企業真實場景 / EN: Focused on real cross-border enterprise scenarios
  - ZH: 中文团队，时区一致的服务 / TW: 中文團隊，時區一致的服務 / EN: Chinese-speaking team, same-time-zone service
- **按钮** — ZH: 与我们聊聊 / TW: 與我們聊聊 / EN: Talk to Us

### 发展足迹

- **Eyebrow** — ZH: 发展足迹 / TW: 發展足跡 / EN: Our Journey
- **H2** — ZH: 我们打造的不仅是一套跨境支付方案，而是让跨境企业用得上、用得起的合规金融能力 / TW: 我們打造的不仅是一套跨境支付方案，而是讓跨境企業用得上、用得起的合規金融能力 / EN: We are not only building a cross-border payment solution — we are making licensed finance accessible for cross-border enterprises.

| Mark ZH | Mark TW | Mark EN | Title ZH | Title TW | Title EN | Body ZH | Body TW | Body EN |
|---|---|---|---|---|---|---|---|---|
| 起步 | 起步 | Start | 公司成立 | 公司成立 | Company Founded | 于香港设立，定位跨境企业跨境支付服务。 | 於香港設立，定位跨境企業跨境支付服務。 | Established in Hong Kong, positioned for cross-border enterprise payment services. |
| 持牌 | 持牌 | Licensed | 取得 MSO牌照 | 取得 MSO牌照 | Obtained MSO Licence | 获香港海关发出MSO牌照。 | 獲香港海關發出MSO牌照。 | Granted the Money Service Operator licence by Hong Kong Customs. |
| 上线 | 上線 | Launch | 产品上线 | 產品上線 | Products Launched | 跨境收款与多币种结算能力对外提供服务。 | 跨境收款與多幣種結算能力對外提供服務。 | Cross-border collection and multi-currency settlement capabilities launched. |
| 今天 | 今天 | Today | 持续服务 | 持續服務 | Ongoing Service | 服务更多行业客户，打磨本地化体验。 | 服務更多行業客戶，打磨本地化體驗。 | Serving more industry clients and refining the localized experience. |

### 核心团队

- **Kicker** — ZH: 核心团队 / TW: 核心團隊 / EN: Core Team
- **H2** — ZH: 务实而有经验的团队 / TW: 務實而有經驗的團隊 / EN: A Pragmatic and Experienced Team
- **P** — ZH: 核心成员来自支付、风控与跨境贸易领域，对跨境企业的经营痛点有切身体会。 / TW: 核心成員來自支付、風控與跨境貿易領域，對跨境企業的經營痛點有切身體會。 / EN: Core members come from payments, risk control and cross-border trade, with first-hand understanding of cross-border enterprises' pain points.

| 角色 ZH | 角色 TW | 角色 EN | 描述 ZH | 描述 TW | 描述 EN |
|---|---|---|---|---|---|
| 管理 / 战略 | 管理 / 戰略 | Management / Strategy | 负责合规方向与整体经营，确保业务在监管框架内稳健运行。 | 負責合規方向與整體經營，確保業務在監管框架內穩健運行。 | Responsible for compliance direction and overall operations, ensuring the business runs steadily within the regulatory framework. |
| 风控 / 合规 | 風控 / 合規 | Risk Control / Compliance | 统筹 KYC、AML 与交易监控，守住资金与合规底线。 | 統籌 KYC、AML 與交易監控，守住資金與合規底線。 | Coordinates KYC, AML and transaction monitoring, safeguarding the bottom line of funds and compliance. |
| 技术与产品 | 技術與產品 | Technology & Product | 打磨收款、结算与对账体验，让系统稳定好用。 | 打磨收款、結算與對賬體驗，讓系統穩定好用。 | Refines the collection, settlement and reconciliation experience, keeping the system stable and easy to use. |
| 客户成功 | 客戶成功 | Customer Success | 1v1 客户经理，陪伴开户与日常使用全过程。 | 1v1 客戶經理，陪伴開戶與日常使用全過程。 | 1v1 account manager accompanying the entire onboarding and daily usage process. |

### 监管资质

- **Kicker** — ZH: 监管资质 / TW: 監管資質 / EN: Regulatory Qualifications
- **H2** — ZH: 香港 MSO 牌照 / TW: 香港 MSO 牌照 / EN: Hong Kong MSO Licence
- **P1** — ZH: MSO牌照由香港海关发出，涵盖货币兑换与汇款服务。 / TW: MSO牌照由香港海關發出，涵蓋貨幣兌換與匯款服務。 / EN: The Money Service Operator licence is issued by Hong Kong Customs, covering currency exchange and remittance services.
- **P2** — ZH: 持牌意味着我们须遵守AML、客户尽职审查与客户资金处理等相关规定，并接受监管机构的监督。这是我们向客户承诺合规的基础。 / TW: 持牌意味著我們須遵守AML、客戶盡職審查與客戶資金處理等相關規定，並接受監管機構的監督。這是我們向客戶承諾合規的基礎。 / EN: Being licensed means we must comply with anti-money laundering, customer due diligence and client fund handling rules, and accept regulator supervision. This is the foundation of our compliance commitment to clients.
- **按钮** — ZH: 了解合规与安全 / TW: 了解合規與安全 / EN: Learn about Compliance & Security

### About CTA

- **H2** — ZH: 想进一步了解我们的资质与服务？ / TW: 想進一步了解我們的資質與服務？ / EN: Want to learn more about our qualifications and services?
- **P** — ZH: 欢迎联系我们，获取资料或预约一对一沟通。 / TW: 歡迎聯繫我們，獲取資料或預約一對一溝通。 / EN: Feel free to contact us for materials or to schedule a one-on-one discussion.
- **按钮** — ZH: 联系我们 / TW: 聯繫我們 / EN: Contact Us；ZH: 加入我们 / TW: 加入我們 / EN: Join Us

---

## 合规与安全 · ComplianceView.vue

### Hero

- **Kicker** — ZH: 受监管经营 / TW: 受監管經營 / EN: Regulated Operations
- **H1** — ZH: 合规与安全 / TW: 合規與安全 / EN: Compliance & Security
- **Lead** — ZH: 合规不是口号，而是我们开展每一笔业务的前提。以下是我们对客户的真实承诺。 / TW: 合規不是口號，而是我們開展每一筆業務的前提。以下是我們對客戶的真實承諾。 / EN: Compliance is not a slogan but the premise of every transaction we conduct. Below are our real commitments to clients.
- **按钮** — ZH: 联系我们 / TW: 聯繫我們 / EN: Contact Us
- **图片 alt：** Regulated operations, compliance and justice

### 合规框架

- **Kicker** — ZH: 合规框架 / TW: 合規框架 / EN: Compliance Framework
- **H2** — ZH: 在监管之下开展业务 / TW: 在監管之下開展業務 / EN: Operating Under Regulation
- **P** — ZH: 我们持有香港 MSO 牌照，受香港海关监管，遵守AML与客户尽职审查等相关规定。 / TW: 我們持有香港 MSO 牌照，受香港海關監管，遵守AML與客戶盡職審查等相關規定。 / EN: We hold a Hong Kong MSO licence, supervised by Hong Kong Customs, and comply with anti-money laundering and customer due diligence rules.

| 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|
| 持牌经营 | 持牌經營 | Licensed Operations | MSO牌照由香港海关发出，经营受监管约束，并接受监督。 | MSO牌照由香港海關發出，經營受監管約束，並接受監督。 | The Money Service Operator licence is issued by Hong Kong Customs; operations are regulated and supervised. |
| KYC 客户尽调 | KYC 客戶盡調 | KYC Client Due Diligence | 开户前完成客户身份与业务背景核验，从源头降低风险。 | 開戶前完成客戶身份與業務背景核驗，從源頭降低風險。 | Complete customer identity and business background verification before onboarding to reduce risk at the source. |
| AML | AML | Anti-Money Laundering | 建立AML制度与可疑交易识别流程，配合监管要求报送。 | 建立AML制度與可疑交易識別流程，配合監管要求報送。 | Establish an anti-money laundering system and suspicious transaction identification process, reporting per regulatory requirements. |

### 数据安全

- **Kicker** — ZH: 数据安全 / TW: 數據安全 / EN: Data Security
- **H2** — ZH: 保护你的数据与隐私 / TW: 保護你的數據與隱私 / EN: Protect Your Data & Privacy

| 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|
| 传输与存储加密 | 傳輸與存儲加密 | Encryption in Transit & Storage | 采用行业通用的加密技术保护数据传输与存储，降低信息泄露风险。 | 採用行業通用的加密技術保護數據傳輸與存儲，降低信息洩露風險。 | Use industry-standard encryption to protect data in transit and at rest, reducing information leakage risk. |
| 最小权限访问 | 最小權限訪問 | Least-privilege Access | 内部采用基于角色的访问控制，仅授权人员在必要范围内接触数据。 | 內部採用基於角色的訪問控制，僅授權人員在必要範圍內接觸數據。 | Role-based internal access control ensures only authorized personnel access data within necessary scope. |
| 操作留痕 | 操作留痕 | Operation Logging | 关键操作记录日志，便于审计与追溯，提升整体可问责性。 | 關鍵操作記錄日誌，便於審計與追溯，提升整體可問責性。 | Key operations are logged for audit and traceability, improving overall accountability. |
| 持续监测 | 持續監測 | Continuous Monitoring | 对系统进行安全监测与定期评估，及时发现并处置异常。 | 對系統進行安全監測與定期評估，及時發現並處置異常。 | Continuously monitor and periodically assess the system to detect and handle anomalies promptly. |

- **说明** — ZH: 说明：以上为通用安全实践描述。如贵司已取得具体认证（如 ISO 27001、SOC 2 等），请在此处如实补充并附证书。 / TW: 說明：以上為通用安全實踐描述。如貴司已取得具體認證（如 ISO 27001、SOC 2 等），請在此處如實補充並附證書。 / EN: Note: The above describes general security practices. If your company holds specific certifications (e.g., ISO 27001, SOC 2), please add them here with certificates.

### 风控体系

- **Kicker** — ZH: 风控体系 / TW: 風控體系 / EN: Risk Control System
- **H2** — ZH: 多层风控，守护每笔资金 / TW: 多層風控，守護每筆資金 / EN: Multi-layer Risk Control, Safeguarding Every Fund
- **P** — ZH: 从开户到交易，关键环节设置相应控制措施。 / TW: 從開戶到交易，關鍵環節設置相應控制措施。 / EN: From onboarding to transactions, corresponding controls are set at key stages.

| # | 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|---|
| 01 | 准入审核 | 准入審核 | Access Review | 开户 KYC 与业务背景核验，筛除高风险主体。 | 開戶 KYC 與業務背景核驗，篩除高風險主體。 | Onboarding KYC and business background checks filter out high-risk entities. |
| 02 | 交易监控 | 交易監控 | Transaction Monitoring | 对交易进行规则与人工结合的风险识别。 | 對交易進行規則與人工結合的風險識別。 | Combine rule-based and manual risk identification for transactions. |
| 03 | 异常复核 | 異常複核 | Exception Review | 对可疑交易启动复核与必要的限制措施。 | 對可疑交易啟動複核與必要的限制措施。 | Initiate review and necessary restrictions for suspicious transactions. |
| 04 | 合规报送 | 合規報送 | Compliance Reporting | 依监管要求履行可疑交易识别与报送义务。 | 依監管要求履行可疑交易識別與報送義務。 | Fulfill suspicious transaction identification and reporting obligations per regulatory requirements. |

### 资金隔离

- **Kicker** — ZH: 资金隔离 / TW: 資金隔離 / EN: Fund Segregation
- **H2** — ZH: 客户资金隔离存放 / TW: 客戶資金隔離存放 / EN: Client Funds Segregated Custody
- **P** — ZH: 客户资金与公司自有资金分离管理，按牌照与监管要求以隔离方式存放，降低资金被挪用的风险。 / TW: 客戶資金與公司自有資金分離管理，按牌照與監管要求以隔離方式存放，降低資金被挪用的風險。 / EN: Client funds are managed separately from company own funds and held in segregated custody per licence and regulatory requirements, reducing misappropriation risk.

| Label ZH | Label TW | Label EN | Value ZH | Value TW | Value EN |
|---|---|---|---|---|---|
| 账户隔离 | 賬戶隔離 | Account Segregation | 客户 / 自有分离 | 客戶 / 自有分離 | Client / Own Funds Separated |
| 存放方式 | 存放方式 | Custody Method | 隔离存放（受监管） | 隔離存放（受監管） | Segregated Custody (Regulated) |
| 用途限制 | 用途限制 | Usage Restriction | 仅用于客户指令 | 僅用於客戶指令 | Used Only for Client Instructions |
| 审计 | 審計 | Audit | 定期核对与留存 | 定期核對與留存 | Periodic Reconciliation & Retention |

### Compliance CTA

- **H2** — ZH: 对合规与安全还有疑问？ / TW: 對合規與安全還有疑問？ / EN: Still have questions about compliance and security?
- **P** — ZH: 我们乐于就具体安排与客户沟通说明。 / TW: 我們樂於就具體安排與客戶溝通說明。 / EN: We are happy to discuss specific arrangements with clients.
- **按钮** — ZH: 联系我们 / TW: 聯繫我們 / EN: Contact Us；ZH: 查看 FAQ / TW: 查看 FAQ / EN: View FAQ

---

## 帮助中心 · FaqView.vue

### Hero

- **Kicker** — ZH: 客户支持 / TW: 客戶支持 / EN: Support
- **H1** — ZH: 帮助中心 / TW: 幫助中心 / EN: Help Center
- **Lead** — ZH: 关于开户、费率、收款与合规的常见问题都在这里。没找到答案？随时联系我们。 / TW: 關於開戶、費率、收款與合規的常見問題都在這裡。沒找到答案？隨時聯繫我們。 / EN: Common questions about onboarding, fees, collection and compliance are all here. Can't find an answer? Contact us anytime.
- **按钮** — ZH: 联系客服 / TW: 聯繫客服 / EN: Contact Support

### 快速入口

- **Kicker** — ZH: 快速入口 / TW: 快速入口 / EN: Quick Links
- **H2** — ZH: 从一份指引开始 / TW: 從一份指引開始 / EN: Start with a Guide
- **P** — ZH: 先跳到你关心的主题，或直接浏览下方常见问题。 / TW: 先跳到你關心的主題，或直接瀏覽下方常見問題。 / EN: Jump to the topic you need, or browse the FAQ below.

| 标题 ZH | 标题 TW | 标题 EN | 描述 ZH | 描述 TW | 描述 EN |
|---|---|---|---|---|---|
| 开户指南 | 開戶指南 | Account Opening Guide | 所需资料、审核流程与预计时长一览。 | 所需資料、審核流程與預計時長一覽。 | Required documents, review process and estimated timeline at a glance. |
| 收款操作指引 | 收款操作指引 | Collection Guide | 如何获取收款账户、发起与核对收款。 | 如何獲取收款賬戶、發起與核對收款。 | How to get a collection account, initiate and reconcile collections. |
| 安全与合规说明 | 安全與合規說明 | Security & Compliance | 了解我们的合规框架与资金安全措施。 | 了解我們的合規框架與資金安全措施。 | Learn about our compliance framework and fund security measures. |

### FAQ 区头

- **Kicker** — ZH: 常见问题 / TW: 常見問題 / EN: FAQ
- **H2** — ZH: 你可能想了解 / TW: 你可能想了解 / EN: Things You May Want to Know

### 开户相关 / Account Opening

**Q1**
- **ZH:** 开通账户需要哪些资料？
- **TW:** 開通賬戶需要哪些資料？
- **EN:** What documents are required to open an account?
- **A ZH:** 通常需要企业注册文件、受益所有人信息、业务说明与银行账户资料等。具体清单以开户表单与 KYC 要求为准，资料越齐全审核越快。
- **A TW:** 通常需要企業註冊文件、受益所有人信息、業務說明與銀行賬戶資料等。具體清單以開戶表單與 KYC 要求為準，資料越齊全審核越快。
- **A EN:** Usually corporate registration documents, beneficial owner information, business description and bank account details, etc. The exact list depends on the onboarding form and KYC requirements; more complete documents mean faster review.

**Q2**
- **ZH:** 开户审核需要多久？
- **TW:** 開戶審核需要多久？
- **EN:** How long does account review take?
- **A ZH:** 在资料完整的情况下，通常数个工作日内完成。复杂或需补充材料的个案会相应延长，客户经理会同步进度。
- **A TW:** 在資料完整的情況下，通常數個工作日內完成。複雜或需補充材料的個案會相應延長，客戶經理會同步進度。
- **A EN:** With complete documents, usually within a few business days. Complex cases or those needing supplemental materials take longer; the account manager will keep you updated.

**Q3**
- **ZH:** 个人可以开户吗？
- **TW:** 個人可以開戶嗎？
- **EN:** Can individuals open an account?
- **A ZH:** 当前服务主要面向企业客户（如跨境电商、外贸与 SaaS 公司）。个人业务以正式说明为准。
- **A TW:** 當前服務主要面向企業客戶（如跨境電商、外貿與 SaaS 公司）。個人業務以正式說明為準。
- **A EN:** Current services mainly target corporate clients (e.g., cross-border e-commerce, trade and SaaS companies). Individual services are subject to official notice.

### 费率与结算 / Fees & Settlement

**Q1**
- **ZH:** 费率是如何计算的？
- **TW:** 費率是如何計算的？
- **EN:** How are fees calculated?
- **A ZH:** 费率通常由收款/付款手续费与换汇点差组成。我们以透明方式在开户前告知，具体以你的行业、币种与交易量为准。
- **A TW:** 費率通常由收款/付款手續費與換匯點差組成。我們以透明方式在開戶前告知，具體以你的行業、幣種與交易量為準。
- **A EN:** Fees usually consist of collection/payment handling fees and FX spread. We disclose them transparently before onboarding; specifics depend on your industry, currency and volume.

**Q2**
- **ZH:** 支持哪些币种结算？
- **TW:** 支持哪些幣種結算？
- **EN:** Which currencies can be settled?
- **A ZH:** 支持多种主流结算币种（如 USD、EUR、GBP、HKD 等），具体可结算币种以账户开通时的服务范围为准。
- **A TW:** 支持多種主流結算幣種（如 USD、EUR、GBP、HKD 等），具體可結算幣種以賬戶開通時的服務範圍為準。
- **A EN:** Multiple major settlement currencies are supported (e.g., USD, EUR, GBP, HKD); the exact settlable currencies depend on the service scope at account opening.

**Q3**
- **ZH:** 资金一般多久到账？
- **TW:** 資金一般多久到賬？
- **EN:** How long does funding usually take to arrive?
- **A ZH:** 到账时间取决于币种、通道与合规审核，部分通道可较快到账。实际时效以交易时的提示与协议约定为准。
- **A TW:** 到賬時間取決於幣種、通道與合規審核，部分通道可較快到賬。實際時效以交易時的提示與協議約定為準。
- **A EN:** Arrival time depends on currency, channel and compliance review; some channels are faster. Actual timing is per the transaction prompt and agreement.

### 全球账户与操作 / Global Account & Operations

**Q1**
- **ZH:** 全球账户申请后可以查看哪些信息？
- **TW:** 全球賬戶申請後可以查看哪些信息？
- **EN:** What information can I view after applying for a global account?
- **A ZH:** 可以在已开通的服务范围内查看账户地区、币种、账号信息和当前状态；申请记录用于跟进开通进度，具体可用功能以账户页面实际展示为准。
- **A TW:** 可以在已開通的服務範圍內查看賬戶地區、幣種、賬號信息和當前狀態；申請記錄用於跟進開通進度，具體可用功能以賬戶頁面實際展示為準。
- **A EN:** Within the activated service scope you can view account region, currency, account number and current status; application records track onboarding progress; actual features are per the account page.

**Q2**
- **ZH:** 如何核对收款和入账凭证？
- **TW:** 如何核對收款和入賬憑證？
- **EN:** How do I reconcile collections and entry vouchers?
- **A ZH:** 在收款记录中按账户、币种或时间筛选交易，确认入账后可在入账凭证管理中查看或留存对应凭证，实际下载权限以账户服务范围为准。
- **A TW:** 在收款記錄中按賬戶、幣種或時間篩選交易，確認入賬後可在入賬憑證管理中查看或留存對應憑證，實際下載權限以賬戶服務範圍為準。
- **A EN:** Filter transactions by account, currency or time in collection records; after confirming credit, view or retain the corresponding voucher in voucher management; actual download rights depend on account service scope.

**Q3**
- **ZH:** 支持团队可以用英文沟通吗？
- **TW:** 支持團隊可以用英文溝通嗎？
- **EN:** Can the support team communicate in English?
- **A ZH:** 可以。支持团队可使用中文和英文处理开户、KYC、账户申请、收款核对、兑换和付款状态跟进。提交咨询时请注明偏好语言。
- **A TW:** 可以。支持團隊可使用中文和英文處理開戶、KYC、賬戶申請、收款核對、兌換和付款狀態跟進。提交諮詢時請註明偏好語言。
- **A EN:** Yes. The support team can handle onboarding, KYC, account application, collection verification, exchange and payment status follow-up in Chinese and English. Please indicate your preferred language when submitting an inquiry.

### 合规与安全 / Compliance & Security

**Q1**
- **ZH:** 你们有支付牌照吗？
- **TW:** 你們有支付牌照嗎？
- **EN:** Do you have a payment licence?
- **A ZH:** 我们持有香港MSO牌照，受香港海关监管。牌照编号与登记信息见「关于我们 - 牌照资质」页面。
- **A TW:** 我們持有香港MSO牌照，受香港海關監管。牌照編號與登記信息見「關於我們 - 牌照資質」頁面。
- **A EN:** We hold a Hong Kong Money Service Operator (MSO) licence, supervised by Hong Kong Customs. Licence number and registration details are on the 'About Us – Licence' page.

**Q2**
- **ZH:** 我的资金安全如何保障？
- **TW:** 我的資金安全如何保障？
- **EN:** How is my fund security ensured?
- **A ZH:** 客户资金与公司自有资金隔离存放，系统采用加密与访问控制等安全措施。详见「合规与安全」页面。
- **A TW:** 客戶資金與公司自有資金隔離存放，系統採用加密與訪問控制等安全措施。詳見「合規與安全」頁面。
- **A EN:** Client funds are segregated from company own funds, and the system uses encryption and access control. See the 'Compliance & Security' page.

**Q3**
- **ZH:** 为什么有时需要补充材料？
- **TW:** 為什麼有時需要補充材料？
- **EN:** Why are supplemental documents sometimes required?
- **A ZH:** 为履行 KYC 与AML义务，我们会就交易背景进行核验。补充材料是合规流程的一部分，旨在保护双方资金安全。
- **A TW:** 為履行 KYC 與AML義務，我們會就交易背景進行核驗。補充材料是合規流程的一部分，旨在保護雙方資金安全。
- **A EN:** To meet KYC and anti-money laundering obligations, we verify transaction backgrounds. Supplemental documents are part of compliance, protecting both parties' fund security.

### FAQ CTA

- **H2** — ZH: 还有其他问题？ / TW: 还有其他問題？ / EN: Any other questions?
- **P** — ZH: 我们的团队随时为你解答。 / TW: 我們的團隊隨時為你解答。 / EN: Our team is ready to answer anytime.
- **按钮** — ZH: 联系客服 / TW: 聯繫客服 / EN: Contact Support；ZH: 浏览产品 / TW: 瀏覽產品 / EN: Browse Products

---

## 联系我们 · ContactView.vue

### Hero

- **Kicker** — ZH: 本地团队服务 / TW: 本地團隊服務 / EN: Local Team Service
- **H1** — ZH: 联系我们 / TW: 聯繫我們 / EN: Contact Us
- **Lead** — ZH: 无论是开户咨询还是商务合作，留下信息，我们的团队会尽快与你联系。 / TW: 無論是開戶諮詢還是商務合作，留下信息，我們的團隊會盡快與你聯繫。 / EN: Whether for onboarding consultation or business cooperation, leave your information and our team will contact you soon.
- **按钮** — ZH: 留下你的需求 / TW: 留下你的需求 / EN: Leave Your Details
- **图片 alt：** Business cooperation and contact

### 侧栏 · 客服支持

- **Kicker** — ZH: 客服支持 / TW: 客服支持 / EN: Customer Support
- **邮箱** — ZH/TW/EN label: 邮箱 / 郵箱 / Email → Athos.xu@adgpay.com
- **服务时间** — ZH: 周一至周五 9:00–18:00（香港时间） / TW: 週一至週五 9:00–18:00（香港時間） / EN: Monday to Friday 9:00–18:00 (Hong Kong Time)

### 侧栏 · 中英双语支持

- **Kicker** — ZH: 中英双语支持 / TW: 中英雙語支持 / EN: Bilingual Support
- **P** — ZH: 支持团队可使用中文与英文处理开户咨询、KYC 资料沟通、全球账户申请、收款核对、币种兑换及付款状态跟进。 / TW: 支持團隊可使用中文與英文處理開戶諮詢、KYC 資料溝通、全球賬戶申請、收款核對、幣種兌換及付款狀態跟進。 / EN: The support team can handle onboarding consultation, KYC document communication, global account application, collection verification, currency exchange and payment status follow-up in Chinese and English.
- **服务方式** — ZH: 中文 / 英文邮件与在线沟通 / TW: 中文 / 英文郵件與在線溝通 / EN: Chinese / English Email & Online Communication

### 侧栏 · 商务合作

- **Kicker** — ZH: 商务合作 / TW: 商務合作 / EN: Business Cooperation
- **合作邮箱** — Athos.xu@adgpay.com
- **办公地址** — UNIT 3586, LEVEL 35, INFINITUS PLAZA, 199 DES VOEUS RD CENTRAL, SHEUNG WAN, HONG KONG
- **脚注** — ZH: 以上为我们的常用联系方式，欢迎随时来信或到访。 / TW: 以上為我們的常用聯繫方式，歡迎隨時來信或到訪。 / EN: The above are our common contact details; feel free to write or visit anytime.

### 表单

- **H2** — ZH: 留下你的需求 / TW: 留下你的需求 / EN: Leave Your Details
- **Lead** — ZH: 带 * 为必填项。 / TW: 帶 * 為必填項。 / EN: Fields marked with an asterisk (*) are required.

| 字段 | Label ZH | Label TW | Label EN | Placeholder ZH | Placeholder TW | Placeholder EN |
|---|---|---|---|---|---|---|
| name | 姓名 | 姓名 | Name | 您的称呼 | 您的稱呼 | Your name |
| company | 公司名称 | 公司名稱 | Company Name | 企业全称 | 企業全稱 | Company legal name |
| phone | 联系电话 | 聯繫電話 | Phone | 含区号 | 含區號 | Include country code |
| email | 邮箱 | 郵箱 | Email | 请输入邮箱地址 | 請輸入郵箱地址 | name@company.com |
| industry | 行业场景 | 行業場景 | Industry / Use Case | — | — | — |
| message | 需求说明 | 需求說明 | Inquiry Details | 请简要描述您的收款/付款场景与需求 | 請簡要描述您的收款/付款場景與需求 | Briefly describe your collection/payment scenario and needs |

#### 行业场景选项

- ZH: 请选择 / TW: 請選擇 / EN: Please select
- ZH: 跨境电商 / TW: 跨境電商 / EN: Cross-border E-commerce
- ZH: 外贸出口（B2B） / TW: 外貿出口（B2B） / EN: Cross-border Trade (B2B)
- ZH: 软件服务 / TW: 軟件服務 / EN: SaaS / Software
- ZH: 其他 / TW: 其他 / EN: Other

- **协议说明** — ZH: 提交即表示您同意我们就此次咨询与您联系。我们不会将您的信息用于其他用途。 / TW: 提交即表示您同意我們就此諮詢與您聯繫。我們不會將您的信息用於其他用途。 / EN: By submitting, you agree that we may contact you about this inquiry. We will not use your information for other purposes.

### FM 对象（脚本消息）

| Key | ZH | TW | EN |
|---|---|---|---|
| err | 请完整填写带 * 的必填项，并确保邮箱格式正确。 | 請完整填寫帶 * 的必填項，並確保郵箱格式正確。 | Please complete all required fields (*) and ensure the email format is correct. |
| submitting | 提交中… | 提交中… | Submitting… |
| success | 已收到您的信息，我们会尽快与您联系！ | 已收到您的信息，我們會盡快與您聯繫！ | We have received your information and will contact you shortly! |
| submit | 提交咨询 | 提交諮詢 | Submit Inquiry |
| failPrefix | 提交失败： | 提交失敗： | Submission failed: |
| failDefault | 请稍后重试，或直接邮件联系我们。 | 請稍後重試，或直接郵件聯繫我們。 | Please try again later, or email us directly. |
| net | 网络异常，提交未成功。请稍后重试，或直接邮件联系我们。 | 網絡異常，提交未成功。請稍後重試，或直接郵件聯繫我們。 | Network error, submission failed. Please try again later, or email us directly. |

---

## 加入我们 · PrivacyView.vue（招聘页）

### Hero

- **Kicker** — ZH: 就业机会 / TW: 就業機會 / EN: Careers
- **H1** — ZH: 加入我们 / TW: 加入我們 / EN: Join Us
- **Lead** — ZH: ADG PAY 一直寻找认同我们价值观的人才。加入我们，共同打造持牌、透明的跨境支付方案，帮助企业更安心地收款与结算。 / TW: ADG PAY 一直尋找認同我們價值觀的人才。加入我們，共同打造持牌、透明的跨境支付方案，幫助企業更安心地收款與結算。 / EN: ADG PAY looks for people who share our values. Join us to build licensed, transparent cross-border payment solutions and help enterprises collect and settle with confidence.
- **按钮** — ZH: 职位空缺 / TW: 職位空缺 / EN: Open Roles；ZH: 联系我们 / TW: 聯繫我們 / EN: Contact Us

### 我们的价值观

- **H2** — ZH: 我们的价值观 / TW: 我們的價值觀 / EN: Our Values
- **Intro** — ZH: 我们凭着在支付与合规方面的专业能力，贴近跨境企业真实需求，提供务实创新的解决方案，帮助客户提升竞争力。 / TW: 我們憑著在支付與合規方面的專業能力，貼近跨境企業真實需求，提供務實創新的解決方案，幫助客戶提升競爭力。 / EN: With expertise in payments and compliance, we stay close to real cross-border needs and deliver practical, innovative solutions for enterprises.

| 标题 ZH | 标题 TW | 标题 EN | 正文 ZH | 正文 TW | 正文 EN |
|---|---|---|---|---|---|
| 愿景 | 願景 | Vision | 通过持牌、稳定的支付能力，让跨境收款与结算更简单。 | 通過持牌、穩定的支付能力，讓跨境收款與結算更簡單。 | Make cross-border collection and settlement simpler through licensed, stable payment capabilities. |
| 创新 | 創新 | Innovation | 持续打磨产品与体验，让客户拥有更清晰的流程与更好用的工具。 | 持續打磨產品與體驗，讓客戶擁有更清晰的流程與更好用的工具。 | We keep refining products and experience so clients get clearer flows and better tools. |
| 可靠 | 可靠 | Reliability | 合规、安全与透明费率，是我们与客户长期合作的基础。 | 合規、安全與透明費率，是我們與客戶長期合作的基礎。 | Compliance, security and transparent fees are the foundation of every client relationship. |
| 决心 | 決心 | Commitment | 面对挑战保持务实与协作，把结果做到客户信得过。 | 面對挑戰保持務實與協作，把結果做到客戶信得過。 | We face challenges together, stay pragmatic, and deliver results clients can trust. |

### 津贴和福利

- **H2** — ZH: 津贴和福利 / TW: 津貼和福利 / EN: Benefits

| 标题 ZH | 标题 TW | 标题 EN | 描述 ZH | 描述 TW | 描述 EN |
|---|---|---|---|---|---|
| 地点 | 地點 | Location | 香港甲级写字楼，交通便利 | 香港甲級寫字樓，交通便利 | Hong Kong office in a convenient business district |
| 保险 | 保險 | Insurance | 合资格员工享有医疗保障 | 合資格員工享有醫療保障 | Medical coverage for eligible employees |
| 奖金 | 獎金 | Bonus | 酌情年终奖金 | 酌情年終獎金 | Discretionary year-end bonus |
| 职业发展 | 職業發展 | Career | 支付与合规领域的成长空间 | 支付與合規領域的成長空間 | Clear growth path in payments and compliance |

### 我们的业务

- **H2** — ZH: 我们的业务 / TW: 我們的業務 / EN: Our Business
- **P** — ZH: 立足香港，服务跨境企业的主要市场与资金走廊。 / TW: 立足香港，服務跨境企業的主要市場與資金走廊。 / EN: Serving cross-border enterprises from Hong Kong across key corridors.
- **市场** — ZH: 香港；中国内地；东南亚；新加坡；全球主要走廊 / TW: 香港；中國內地；東南亞；新加坡；全球主要走廊 / EN: Hong Kong；Mainland China；Southeast Asia；Singapore；Global corridors

### 职位筛选 UI labels

| Key | ZH | TW | EN |
|---|---|---|---|
| Filters | 筛选条件 | 篩選條件 | Filters |
| All regions | 所有地区 | 所有地區 | All regions |
| Hong Kong | 香港 | 香港 | Hong Kong |
| Department | 部门 | 部門 | Department |
| All departments | 所有部门 | 所有部門 | All departments |
| Technology | 科技部门 | 科技部門 | Technology |
| Compliance | 合规部门 | 合規部門 | Compliance |
| Operations | 运营部门 | 運營部門 | Operations |
| count | 个职位空缺 | 個職位空缺 | open roles |
| region (job meta) | 香港 | 香港 | Hong Kong |
| responsibilities | 岗位职责 | 崗位職責 | Responsibilities |
| requirements | 岗位要求 | 崗位要求 | Requirements |
| apply | 投递意向 | 投遞意向 | Apply / Express interest |
| empty | 当前筛选条件下暂无职位。可切换部门，或留下简历与意向。 | 當前篩選條件下暫無職位。可切換部門，或留下簡歷與意向。 | No roles match the current filters. Try another department, or leave your profile with us. |
| empty CTA | 投递意向 | 投遞意向 | Send your profile |

### 职位 · 前端工程师 / Frontend Engineer

- **类型** — ZH: 全职 / TW: 全職 / EN: Full-time
- **部门** — ZH: 科技部门 / TW: 科技部門 / EN: Technology
- **岗位职责 ZH：**
  1. 负责官网与商户后台的前端开发与体验优化
  2. 与产品、设计协作，落地跨境支付相关页面与交互
  3. 维护组件库与前端工程规范，保障多语言与多端适配
- **岗位职责 TW：**
  1. 負責官網與商戶後台的前端開發與體驗優化
  2. 與產品、設計協作，落地跨境支付相關頁面與交互
  3. 維護組件庫與前端工程規範，保障多語言與多端適配
- **岗位职责 EN：**
  1. Build and improve the website and merchant dashboard frontend
  2. Work with product and design on cross-border payment UX
  3. Maintain component standards, i18n and responsive quality
- **岗位要求 ZH：**
  1. 熟悉 Vue 3 / TypeScript，有实际项目经验
  2. 了解前端性能、无障碍与基础安全实践
  3. 沟通清晰，能独立推进功能交付
- **岗位要求 TW：**
  1. 熟悉 Vue 3 / TypeScript，有實際項目經驗
  2. 了解前端性能、無障礙與基礎安全實踐
  3. 溝通清晰，能獨立推進功能交付
- **岗位要求 EN：**
  1. Solid Vue 3 / TypeScript experience
  2. Aware of performance, accessibility and basic frontend security
  3. Clear communicator who can ship features independently

### 职位 · 后端工程师（支付系统） / Backend Engineer (Payments)

- **类型** — ZH: 全职 / TW: 全職 / EN: Full-time
- **岗位职责 ZH：**
  1. 参与收款、结算与对账相关服务的设计与开发
  2. 对接银行 / 通道接口，保障交易链路稳定与可观测
  3. 编写接口文档与单元测试，参与代码评审
- **岗位职责 TW：**
  1. 參與收款、結算與對賬相關服務的設計與開發
  2. 對接銀行 / 通道接口，保障交易鏈路穩定與可觀測
  3. 編寫接口文檔與單元測試，參與代碼評審
- **岗位职责 EN：**
  1. Design and develop collection, settlement and reconciliation services
  2. Integrate bank / channel APIs with reliable monitoring
  3. Write API docs and tests; participate in code reviews
- **岗位要求 ZH：**
  1. 熟悉 Java 或 Node.js，了解常见数据库与消息队列
  2. 有金融 / 支付 / 清结算相关经验优先
  3. 重视数据一致性、幂等与异常处理
- **岗位要求 TW：**
  1. 熟悉 Java 或 Node.js，了解常見數據庫與消息隊列
  2. 有金融 / 支付 / 清結算相關經驗優先
  3. 重視數據一致性、冪等與異常處理
- **岗位要求 EN：**
  1. Strong Java or Node.js; comfortable with databases and queues
  2. Payments / clearing experience is a plus
  3. Care about consistency, idempotency and failure handling

### 职位 · 合规专员（AML / KYC） / Compliance Officer (AML / KYC)

- **类型** — ZH: 全职 / TW: 全職 / EN: Full-time
- **岗位职责 ZH：**
  1. 执行客户尽职调查（CDD / EDD）与持续监控
  2. 识别可疑交易，协助提交可疑交易报告（STR）相关材料
  3. 维护 AML 政策与操作指引，配合监管检查与内部审计
- **岗位职责 TW：**
  1. 執行客戶盡職調查（CDD / EDD）與持續監控
  2. 識別可疑交易，協助提交可疑交易報告（STR）相關材料
  3. 維護 AML 政策與操作指引，配合監管檢查與內部審計
- **岗位职责 EN：**
  1. Perform CDD / EDD and ongoing monitoring
  2. Escalate suspicious activity and support STR-related work
  3. Maintain AML policies and support regulatory / audit reviews
- **岗位要求 ZH：**
  1. 了解香港《打击洗钱及恐怖分子资金筹集条例》及海关 MSO 监管要求
  2. 具备金融、法律或合规相关学历 / 工作经验
  3. 细心严谨，能独立完成尽调与档案留存
- **岗位要求 TW：**
  1. 了解香港《打擊洗錢及恐怖分子資金籌集條例》及海關 MSO 監管要求
  2. 具備金融、法律或合規相關學歷 / 工作經驗
  3. 細心嚴謹，能獨立完成盡調與檔案留存
- **岗位要求 EN：**
  1. Familiar with Hong Kong AML laws and MSO supervisory expectations
  2. Background in finance, law or compliance preferred
  3. Detail-oriented; able to complete CDD and maintain records

### 职位 · 风控分析师 / Risk Analyst

- **类型** — ZH: 全职 / TW: 全職 / EN: Full-time
- **岗位职责 ZH：**
  1. 监控商户交易行为，识别异常模式与欺诈风险
  2. 制定与优化风控规则，推动系统策略落地
  3. 与合规、运营协作处理高风险案例与客户沟通
- **岗位职责 TW：**
  1. 監控商戶交易行為，識別異常模式與欺詐風險
  2. 制定與優化風控規則，推動系統策略落地
  3. 與合規、運營協作處理高風險案例與客戶溝通
- **岗位职责 EN：**
  1. Monitor merchant activity and spot unusual / fraud patterns
  2. Design and refine risk rules for system enforcement
  3. Collaborate with compliance and operations on high-risk cases
- **岗位要求 ZH：**
  1. 熟悉支付风控、反欺诈或数据分析工具优先
  2. 具备 Excel / SQL 等数据处理能力
  3. 抗压能力强，能快速响应交易异常
- **岗位要求 TW：**
  1. 熟悉支付風控、反欺詐或數據分析工具優先
  2. 具備 Excel / SQL 等數據處理能力
  3. 抗壓能力強，能快速響應交易異常
- **岗位要求 EN：**
  1. Experience in payment risk, anti-fraud or data analysis preferred
  2. Comfortable with Excel / SQL for investigation
  3. Able to respond quickly under operational pressure

### 职位 · 运营专员（商户支持） / Operations Specialist (Merchant Support)

- **类型** — ZH: 全职 / TW: 全職 / EN: Full-time
- **岗位职责 ZH：**
  1. 跟进商户开户、资料补件与日常业务咨询
  2. 协调对账、退款与异常交易的处理进度
  3. 整理运营报表，反馈产品改进建议
- **岗位职责 TW：**
  1. 跟進商戶開戶、資料補件與日常業務諮詢
  2. 協調對賬、退款與異常交易的處理進度
  3. 整理運營報表，反饋產品改進建議
- **岗位职责 EN：**
  1. Support merchant onboarding, document follow-ups and daily inquiries
  2. Coordinate reconciliation, refunds and exception handling
  3. Prepare ops reports and share product improvement feedback
- **岗位要求 ZH：**
  1. 具备客户服务或金融运营经验优先
  2. 中英双语沟通流利，工作条理清晰
  3. 熟悉跨境贸易或支付业务者优先
- **岗位要求 TW：**
  1. 具備客戶服務或金融運營經驗優先
  2. 中英雙語溝通流利，工作條理清晰
  3. 熟悉跨境貿易或支付業務者優先
- **岗位要求 EN：**
  1. Customer service or financial operations experience preferred
  2. Fluent in Chinese and English; highly organized
  3. Cross-border trade or payments exposure is a plus

### 职位 · 结算运营专员 / Settlement Operations Specialist

- **类型** — ZH: 全职 / TW: 全職 / EN: Full-time
- **岗位职责 ZH：**
  1. 负责日终 / 周期结算流程与资金核对
  2. 跟踪通道到账情况，处理延迟与差异
  3. 维护结算台账，配合财务完成对账闭环
- **岗位职责 TW：**
  1. 負責日終 / 週期結算流程與資金核對
  2. 跟蹤通道到賬情況，處理延遲與差異
  3. 維護結算台賬，配合財務完成對賬閉環
- **岗位职责 EN：**
  1. Run daily / periodic settlement and fund checks
  2. Track channel arrivals and resolve delays or mismatches
  3. Maintain settlement ledgers and close the loop with finance
- **岗位要求 ZH：**
  1. 细心、数字敏感，有财务或清算相关经验优先
  2. 熟悉 Excel，能独立排查账务差异
  3. 可接受与结算节奏相关的时效要求
- **岗位要求 TW：**
  1. 細心、數字敏感，有財務或清算相關經驗優先
  2. 熟悉 Excel，能獨立排查賬務差異
  3. 可接受與結算節奏相關的時效要求
- **岗位要求 EN：**
  1. Detail-oriented; finance or clearing experience preferred
  2. Strong Excel skills for variance investigation
  3. Comfortable with time-sensitive settlement cycles

---

## 智能助手 · ChatAssistant.vue

- **面板标题** — ZH: ADG PAY 智能助手 / TW: ADG PAY 智能助手 / EN: ADG PAY Assistant
- **状态** — ZH: 在线 · 即时回复 / TW: 在線 · 即時回覆 / EN: Online · Instant reply
- **输入占位** — ZH: 输入您的问题… / TW: 輸入您的問題… / EN: Type your question…
- **欢迎语 ZH:** 您好！我是 ADG PAY 智能助手 👋 / 我可以帮您了解牌照资质、开户流程、收款付款、多币种与合规安全等常见问题。您想了解什么？
- **欢迎语 TW:** 您好！我是 ADG PAY 智能助手 👋 / 我可以幫您了解牌照資質、開戶流程、收款付款、多幣種與合規安全等常見問題。您想了解什麼？
- **欢迎语 EN:** Hi! I'm the ADG PAY assistant 👋 / I can help with licensing, onboarding, collection & payments, multi-currency and compliance. What would you like to know?
- **快捷问题 ZH:** 如何开户？；持有哪类牌照？；支持哪些币种？；怎么联系你们？
- **快捷问题 TW:** 如何開戶？；持有哪類牌照？；支持哪些幣種？；怎麼聯繫你們？
- **快捷问题 EN:** How to open an account?；What license do you hold?；Which currencies?；How to contact you?
- **联系按钮** — ZH: 前往「联系我们」留资 / TW: 前往「聯繫我們」留資 / EN: Go to Contact page
- **兜底回复 ZH:** 这个问题我暂时无法直接解答。您可以点击下方按钮留下联系方式，或前往「联系我们」页面，我们的团队会尽快为您详细回复。
- **兜底回复 TW:** 這個問題我暫時無法直接解答。您可以點擊下方按鈕留下聯繫方式，或前往「聯繫我們」頁面，我們的團隊會盡快為您詳細回覆。
- **兜底回复 EN:** I can't answer that one automatically yet. Tap the button below to leave your details, or visit the Contact page — our team will follow up shortly.

---

## 聊天知识库 · chatKnowledge.js（CHAT_KB）

### 1. 牌照 / License

- **Keywords:** 牌照, mso, 金钱服务, 监管, 合规, license, licensed, regulated, regulatory, legal, 海关
- **ZH:** ADG PAY 持有香港海关发出的MSO牌照，受《打击洗钱及恐怖分子资金筹集条例》规管，提供货币兑换与汇款服务，并执行严格的AML与KYC审查及交易监控。
- **TW:** ADG PAY 持有香港海關發出的MSO牌照，受《打擊洗錢及恐怖分子資金籌集條例》規管，提供貨幣兌換與匯款服務，並執行嚴格的AML與KYC審查及交易監控。
- **EN:** ADG PAY holds a Hong Kong Customs & Excise Department Money Service Operator (MSO) license, regulated under the Anti-Money Laundering and Counter-Terrorist Financing Ordinance, providing money changing and remittance with strict AML/KYC due diligence and transaction monitoring.

### 2. 开户 / Onboarding

- **Keywords:** 开户, 注册, 申请, onboard, open account, register, sign up, 申请账户, 开通, 入驻
- **ZH:** 开户流程很简单：① 在线提交企业资料与申请；② 完成KYC与业务核验；③ 审核通过后开通多币种账户。全程在线办理，合规团队会协助您准备材料。
- **TW:** 開戶流程很簡單：① 在線提交企業資料與申請；② 完成KYC與業務核驗；③ 審核通過後開通多幣種賬戶。全程在線辦理，合規團隊會協助您準備材料。
- **EN:** Onboarding is simple: 1) Submit your company details and application online; 2) Complete KYC identity and business verification; 3) Your multi-currency account is activated after approval. Our compliance team assists with the documents.

### 3. 收款 / Collection

- **Keywords:** 收款, 收钱, 收取, collection, receive, 收款账户, 收汇, collect, 收款项
- **ZH:** 您可通过 ADG PAY 开立多币种收款账户，向合作方提供本地收款信息以收取跨境款项，资金隔离存放、安全持有。
- **TW:** 您可通過 ADG PAY 開立多幣種收款賬戶，向合作方提供本地收款信息以收取跨境款項，資金隔離存放、安全持有。
- **EN:** Open multi-currency collection accounts with ADG PAY and share local receiving details with partners to collect cross-border payments, held safely in segregated funds.

### 4. 付款 / Payment

- **Keywords:** 付款, 打款, 支付, pay, send, disburse, 付款给, global pay, 汇款, remit, 转账
- **ZH:** ADG PAY 支持向全球供应商、员工与合作伙伴付款，覆盖主流币种，流程为：持有币种 → 按需兑换 → 发起对外付款。
- **TW:** ADG PAY 支持向全球供應商、員工與合作夥伴付款，覆蓋主流幣種，流程為：持有幣種 → 按需兌換 → 發起對外付款。
- **EN:** ADG PAY supports paying suppliers, employees and partners worldwide across major currencies: hold funds → exchange as needed → send outward payments.

### 5. 币种 / Currency

- **Keywords:** 币种, 货币, 多币种, currency, fx, foreign exchange, 换汇, 兑换, exchange, 多货币, 持有
- **ZH:** 我们提供多币种持有与货币兑换服务，您可在同一账户内持有多种货币，并按需进行兑换，降低汇兑成本。
- **TW:** 我們提供多幣種持有與貨幣兌換服務，您可在同一賬戶內持有多種貨幣，並按需進行兌換，降低匯兌成本。
- **EN:** We provide multi-currency holding and exchange — hold several currencies in one account and convert on demand to reduce FX costs.

### 6. 费率 / Fees

- **Keywords:** 费率, 手续费, 收费, fee, charge, cost, price, 价格, 多少钱, 报价, 费用
- **ZH:** 具体费率根据您的业务规模与币种组合定制。请留下联系方式，我们的商务团队会为您一对一提供透明报价。
- **TW:** 具體費率根據您的業務規模與幣種組合定制。請留下聯繫方式，我們的商務團隊會為您一對一提供透明報價。
- **EN:** Pricing is tailored to your business volume and currency mix. Leave your contact details and our team will share a transparent quote with you.

### 7. 到账 / Settlement timing

- **Keywords:** 到账, 多久, 时间, speed, settle, settlement, 时效, 几天, 处理时间
- **ZH:** 到账时间取决于币种与通道，多数主流币种付款可在 1–2 个工作日内处理。具体时效建议您联系我们按场景确认。
- **TW:** 到賬時間取決於幣種與通道，多數主流幣種付款可在 1–2 個工作日內處理。具體時效建議您聯繫我們按場景確認。
- **EN:** Settlement depends on currency and corridor; most major-currency payments are processed within 1–2 business days. Contact us for timing on your scenario.

### 8. 安全 / Security

- **Keywords:** 安全, 资金, 隔离, security, safe, segregat, 资金安全, 加密, 保护, 风控
- **ZH:** 客户资金隔离存放于受监管金融机构账户，与平台自有资金分离；全链路采用银行级加密与访问控制，保障资金与数据安全。
- **TW:** 客戶資金隔離存放於受監管金融機構賬戶，與平台自有資金分離；全鏈路採用銀行級加密與訪問控制，保障資金與數據安全。
- **EN:** Client funds are held in segregated accounts at regulated financial institutions, separate from company funds. Bank-grade encryption and access controls protect funds and data.

### 9. 语言 / Bilingual

- **Keywords:** 语言, 双语, 中英文, chinese, english, language, bilingual, 中文, 英文
- **ZH:** 我们提供中英双语服务，网站与客服团队均支持中文与英文沟通，方便不同地区合作伙伴对接。
- **TW:** 我們提供中英雙語服務，網站與客服團隊均支持中文與英文溝通，方便不同地區合作夥伴對接。
- **EN:** We provide bilingual (Chinese & English) service — both the website and our support team communicate in Chinese and English.

### 10. 客户 / Industries

- **Keywords:** 客户, 行业, 谁, 适合, industry, who, partner, 适用, 电商, 外贸, 业务
- **ZH:** ADG PAY 服务于有跨境收款、付款与换汇需求的企业，覆盖电商、外贸、服务贸易、数字业务等多种行业。
- **TW:** ADG PAY 服務於有跨境收款、付款與換匯需求的企業，覆蓋電商、外貿、服務貿易、數字業務等多種行業。
- **EN:** ADG PAY serves businesses with cross-border collection, payment and FX needs — e-commerce, trade, service export, digital businesses and more.

### 11. 联系 / Contact

- **Keywords:** 联系, 客服, 电话, 邮箱, contact, email, phone, reach, 怎么找, 人工, 沟通
- **ZH:** 您可访问「联系我们」页面提交咨询，我们会尽快与您取得联系；需要人工协助时也可直接邮件沟通。
- **TW:** 您可訪問「聯繫我們」頁面提交諮詢，我們會盡快與您取得聯繫；需要人工協助時也可直接郵件溝通。
- **EN:** Visit the Contact page to submit an inquiry and we'll get back to you promptly; email is also available for direct assistance.

### 12. 公司 / About

- **Keywords:** 公司, 关于, 介绍, about, company, 你们是, who are you, 是什么, 做什么
- **ZH:** ADG PAY 是持有香港MSO牌照的跨境支付服务提供商，专注为企业的全球收款、多币种持有、货币兑换与对外付款提供合规、稳定的金融基础设施。
- **TW:** ADG PAY 是持有香港MSO牌照的跨境支付服務提供商，專注為企業的全球收款、多幣種持有、貨幣兌換與對外付款提供合規、穩定的金融基礎設施。
- **EN:** ADG PAY is a Hong Kong MSO-licensed cross-border payment provider, offering compliant and reliable infrastructure for global collection, multi-currency holding, FX and outbound payments.
