# ADG PAY：Node + SQLite 一期方案与计划表

> 状态：**一期已完成（P0–P7 + 后台列表/配置体验优化）**；部署 P8 待定  
> 范围：系统配置 + 咨询 / 岗位 / 投递表单数据 + 管理后台  
> 不含：全站文案 CMS、FAQ/聊天知识库入库、部署细则（后续单独约定）

---

## 1. 目标与边界

### 1.1 目标

- 引入 **Node 后端 + SQLite**，对系统配置与业务表单做持久化。
- 数据库无数据或读失败时，用**现有硬编码**作系统配置兜底。
- 提供管理后台：单账号登录；配置可改；岗位可增删改、上架/下架；咨询与投递可查、已读/未读、软删；投递简历 PDF 可预览。
- 官网咨询表单改为只写自家库（不再依赖 Web3Forms）。

### 1.2 明确不做（一期）

- FAQ、聊天 KB、首页/产品等营销文案入库
- 页脚展示邮箱
- 多管理员 / 角色权限
- 邮件通知（可后期加 SMTP）
- 服务器 / 域名 / Docker 部署细节

---

## 2. 总体架构

```
浏览器
  ├─ 官网 (现有 Vue)     → 公开 API（配置、岗位列表、咨询提交、投递）
  └─ 管理后台 (/admin)   → 鉴权 API（配置/岗位/咨询/投递 CRUD + PDF）

Node 服务
  ├─ REST API
  ├─ 静态托管前端 dist（或 Nginx 反代，部署阶段再定）
  ├─ SQLite 文件
  └─ uploads/ 简历 PDF
```

### 2.1 技术选型（建议）

| 层级 | 选型 | 说明 |
|------|------|------|
| 后端 | Node.js + Express 或 Fastify | 与现有 Node 引擎要求一致 |
| 数据库 | SQLite + `better-sqlite3` | 单机持久化，备份简单 |
| Schema | SQL migration 文件 | 可追溯建表/变更 |
| 鉴权 | Session Cookie 或 JWT（HttpOnly） | 单管理员账号，密码存哈希 |
| 上传 | `multipart` + 磁盘存储 | 仅 PDF，≤5MB |
| 前端 API | `VITE_API_BASE` | 开发代理，生产同源 `/api` |

### 2.2 仓库结构（建议）

```
Joanna/
  src/                 # 现有官网 Vue
  server/              # 新建后端
    src/
      index.js
      db/
      routes/
      middleware/
      defaults/        # 系统配置硬编码兜底
    uploads/           # gitignore，简历文件
    data/              # gitignore，*.sqlite
  docs/backend-sqlite-plan.md
```

---

## 3. 数据模型

### 3.1 `system_config`（系统配置）

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | INTEGER PK | |
| `customer_email` | TEXT | 客户邮箱 → Contact「客服支持 / 邮箱」 |
| `partnership_email` | TEXT | 合作邮箱 → Contact「商务合作 / 合作邮箱」 |
| `office_address` | TEXT | 办公地址 → Contact「办公地址」 |
| `updated_at` | TEXT | ISO 时间 |

也可改为 key-value 多行；一期推荐**单行三列**，后台编辑更直观。

**页面映射（页脚不展示邮箱）：**

| 配置项 | 页面位置 | 当前硬编码兜底 |
|--------|----------|----------------|
| 客户邮箱 | `ContactView` 客服邮箱 | `Athos.xu@adgpay.com` |
| 合作邮箱 | `ContactView` 合作邮箱 | `Athos.xu@adgpay.com` |
| 办公地址 | `ContactView` 办公地址 | `UNIT 3586, LEVEL 35, INFINITUS PLAZA, … HONG KONG` |

**读取策略：** DB 有有效值 → 用 DB；空库 / 缺字段 / 异常 → 返回上述兜底。前端可选保留二次兜底。

---

### 3.2 `inquiries`（咨询表）

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | INTEGER PK | |
| `ip` | TEXT | 服务端取客户端 IP |
| `name` | TEXT | 姓名 |
| `company` | TEXT | 公司名称 |
| `phone` | TEXT | 联系电话 |
| `email` | TEXT | 邮箱 |
| `industry` | TEXT | `ecommerce` / `trade` / `saas` / `other`（跨境电商、外贸出口、软件服务、其他） |
| `message` | TEXT | 需求说明 |
| `is_read` | INTEGER | `0` 未读 / `1` 已读，默认 `0` |
| `is_deleted` | INTEGER | `0` 正常 / `1` 软删，默认 `0` |
| `created_at` | TEXT | 创建时间 |

---

### 3.3 `jobs`（岗位信息表）

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | INTEGER PK | 岗位 ID |
| `title` | TEXT | 岗位名称 |
| `job_type` | TEXT | 岗位类型（如全职） |
| `experience` | TEXT | 工作经验 |
| `work_location` | TEXT | 上班地址 |
| `responsibilities` | TEXT | 岗位职责（可用换行或 JSON 文本） |
| `requirements` | TEXT | 岗位要求 |
| `status` | TEXT | `published` 上架 / `draft` 下架 |
| `is_deleted` | INTEGER | 软删标记，默认 `0` |
| `created_at` | TEXT | |
| `updated_at` | TEXT | |

**删岗规则：**

- 删除 = **软删**（`is_deleted = 1`），同时下架；保留历史投递的 `job_id` 关联。
- 有投递也可软删（官网与默认列表不再展示该岗；勾选「含已删除」可查看）。
- 官网列表：仅 `status = published` 且 `is_deleted = 0`。

一期岗位文案可用单语（中文）字段；若需多语言，可后续加列或 JSON，不阻塞一期。

---

### 3.4 `applications`（招聘投递表）

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | INTEGER PK | |
| `job_id` | INTEGER FK → jobs.id | |
| `name` | TEXT | 姓名 |
| `gender` | TEXT | 性别 |
| `phone` | TEXT | 手机号 |
| `email` | TEXT | 邮箱 |
| `school` | TEXT | 毕业院校 |
| `residence` | TEXT | 现居地 |
| `bio` | TEXT | 个人简介，≤200 字 |
| `resume_path` | TEXT | 磁盘相对路径，如 `uploads/resumes/{id}.pdf` |
| `is_read` | INTEGER | `0` / `1`，默认 `0` |
| `is_deleted` | INTEGER | 软删，默认 `0` |
| `created_at` | TEXT | 投递时间 |

**删投递规则：** 软删记录，并**同时删除磁盘上的 PDF**。

**上传约束：** 仅 `application/pdf`（及扩展名 `.pdf`），大小 ≤ 5MB。

---

## 4. API 方案（草案）

前缀统一 `/api`。公开接口无需登录；`/api/admin/*` 需登录。

### 4.1 公开

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/config` | 系统配置（含兜底合并结果） |
| GET | `/api/jobs` | 上架且未删岗位列表 |
| GET | `/api/jobs/:id` | 岗位详情（仅上架未删，供投递页） |
| POST | `/api/inquiries` | 提交咨询（记 IP） |
| POST | `/api/applications` | 投递（multipart：字段 + PDF） |

### 4.2 管理端（需鉴权）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/admin/login` | 登录 |
| POST | `/api/admin/logout` | 登出 |
| GET | `/api/admin/me` | 当前会话 |
| GET/PUT | `/api/admin/config` | 查 / 改配置 |
| GET | `/api/admin/inquiries` | 咨询列表（默认不含已软删；可筛已读/未读） |
| GET | `/api/admin/inquiries/:id` | 详情 |
| PATCH | `/api/admin/inquiries/:id/read` | 标已读/未读 |
| DELETE | `/api/admin/inquiries/:id` | 软删 |
| GET/POST | `/api/admin/jobs` | 列表 / 新建 |
| GET/PUT | `/api/admin/jobs/:id` | 详情 / 更新 |
| PATCH | `/api/admin/jobs/:id/status` | 上架 / 下架 |
| DELETE | `/api/admin/jobs/:id` | 软删（有投递则 409） |
| GET | `/api/admin/applications` | 投递列表 |
| GET | `/api/admin/applications/:id` | 详情 |
| PATCH | `/api/admin/applications/:id/read` | 已读/未读 |
| GET | `/api/admin/applications/:id/resume` | **PDF 预览/下载**（鉴权流式输出） |
| DELETE | `/api/admin/applications/:id` | 软删 + 删磁盘 PDF |

管理鉴权：环境变量 `ADMIN_PASSWORD`（默认 `123456`）或 `ADMIN_PASSWORD_HASH`（有哈希则忽略明文密码）。登录页仅需密码，无用户名。

---

## 5. 前端改造方案

### 5.1 官网

| 页面/模块 | 改动 |
|-----------|------|
| `ContactView` | 侧栏邮箱/地址改为读 `/api/config`；表单改 POST `/api/inquiries`；移除 Web3Forms |
| `PrivacyView`（Join Us） | 岗位列表改读 `/api/jobs`；投递改 POST `/api/applications`（PDF）；去掉「demo only」逻辑 |
| 页脚 | 不展示邮箱（保持现状即可） |
| 环境变量 | 新增 `VITE_API_BASE`；可移除对 `VITE_WEB3FORMS_KEY` 的依赖（咨询链路） |

### 5.2 管理后台

- 路由：`/admin/login`、`/admin`（仪表或列表入口）、配置 / 咨询 / 岗位 / 投递子页。
- 与官网同仓同构建，或 `src/views/admin/*` 独立布局（无官网 Header/Footer）。
- 简历：用鉴权 URL 在 iframe / 新窗口打开 PDF。
- UI：功能优先，与现有品牌色可简单统一，不做复杂设计系统。

### 5.3 岗位种子数据（可选）

首次迁移后可将 `PrivacyView` 现有演示岗位写入 DB（状态上架），便于联调；也可后台手工录入。

---

## 6. 安全与校验要点

- 管理接口全部鉴权；PDF 仅走鉴权接口，禁止未登录直链 `uploads/`。
- 咨询 / 投递做字段校验与长度限制；投递校验岗位存在且上架未删。
- 上传：MIME + 扩展名双重校验；文件名服务端重写，避免路径穿越。
- 生产关闭详细错误栈；CORS 按部署域名收紧（同源可省略）。
- SQLite 与 `uploads` 目录权限、定期备份（部署阶段落实）。

---

## 7. 计划表（实施阶段）

| 阶段 | 名称 | 主要工作 | 产出 / 验收 | 预估 |
|------|------|----------|-------------|------|
| **P0** | 对齐开工 | 确认本文件；建 `server/` 骨架、依赖、脚本（`dev:server` / `dev` 并行） | 本地能起 API + `GET /api/health` | 0.5 天 |
| **P1** | 数据库 | 四表 migration；defaults 兜底常量；DB 初始化路径 | 空库可建表；配置读取返回兜底 | 0.5–1 天 |
| **P2** | 配置 API + Contact | `GET/PUT config`；Contact 展示改 API；兜底联调 | 空库页面仍显示现网邮箱/地址；改库后刷新生效 | 1 天 |
| **P3** | 咨询 | `POST /api/inquiries`；记 IP；Contact 表单切换；去掉 Web3Forms | 提交进库；字段与行业枚举正确 | 0.5–1 天 |
| **P4** | 岗位公开 + 投递 | 岗位公开 API；投递 multipart + PDF；Join Us 页改造 | 仅上架岗位可见；PDF≤5MB；简介≤200 字 | 1–1.5 天 |
| **P5** | Admin 鉴权 | 登录/登出/会话；路由守卫；单账号 | 未登录无法进后台与管理 API | 0.5–1 天 |
| **P6** | Admin 业务 | 配置编辑；咨询列表/已读/软删；岗位 CRUD/上下架/软删规则；投递列表/已读/软删+删文件/PDF 预览 | 与定稿规则一致的操作均可完成 | 2–3 天 |
| **P7** | 联调与收口 | 端到端自测；错误提示；`.env.example`；README 本地启动说明 | 验收清单全部打勾 | 0.5–1 天 |
| **P8** | 部署（暂缓） | 服务器、域名、HTTPS、`base: '/'`、备份 | 待你另行通知 | — |

**合计（不含部署）：约 7–10 人日。**

### 建议开发顺序（严格依赖）

```
P0 → P1 → P2 → P3
         ↘ P4
              → P5 → P6 → P7
                           → P8（后续）
```

P2 与 P3 可紧接；P4 依赖 P1；P5/P6 依赖前面公开 API 与表结构稳定。

---

## 8. 验收清单

- [x] 空库时 Contact 客户邮箱 / 合作邮箱 / 办公地址与现网硬编码一致  
- [x] 后台改配置后，Contact 展示更新（API 已支持；建议本地点一次后台保存验证）  
- [x] 咨询提交入库，含 IP、行业、时间；后台可已读/未读、软删  
- [x] 仅上架未删岗位在官网展示  
- [x] 投递仅 PDF≤5MB；简介≤200；后台可预览 PDF  
- [x] 投递软删后记录不可见且磁盘 PDF 已删  
- [x] 岗位有投递时删除返回失败；无投递可软删且历史关联可保留  
- [x] 岗位可上架/下架  
- [x] 未登录无法访问 `/admin` 与管理 API、无法打开简历  
- [x] 页脚不出现配置邮箱  

---

## 9. 已锁定决策一览

| # | 决策 |
|---|------|
| 1 | 咨询只写自家库（方案 A），不用 Web3Forms 双写 |
| 2 | 配置只服务页面对应位置；页脚不展示邮箱 |
| 3 | 咨询/投递：软删 + 已读/未读；岗位含上下架与时间戳 |
| 4 | 投递软删时同步删除磁盘 PDF；简历仅 PDF，后台预览 |
| 5 | 岗位删除为软删；可含历史投递关联 |
| 6 | 单管理员账号 |
| 7 | 一期只做系统配置 + 表单数据 |
| 8 | 部署后续再定 |

---

## 10. 开工触发

本方案与计划表已定稿。收到明确指令（如「开始开发」）后，按 **P0 → P7** 执行；**P8** 等部署信息就绪后再做。
