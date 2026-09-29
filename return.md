# ADG PAY 项目交接文档（return.md）

> 仓库：`Joanna`（Vue 3 官网 + Node/SQLite 管理后台）  
> 正式站点域名（canonical）：https://www.adgpay.com  
> GitHub：https://github.com/abinga136211/Joanna

---

## 1. 项目入口

| 角色 | 入口文件 / 命令 | 说明 |
|------|-----------------|------|
| HTML 挂载点 | `index.html` → `#app` | 加载 `/src/main.js` |
| 前端 JS 入口 | `src/main.js` | 创建 Vue App、Pinia、Router，挂载到 `#app` |
| 根组件 | `src/App.vue` | 布局（Header/Footer）、语言、路由视图；`/admin` 走后台布局 |
| 路由入口 | `src/router/index.js` | 官网页面 + 管理后台路由与鉴权守卫 |
| 后端入口 | `server/src/index.js` | Express API，默认端口 `3001` |
| 环境变量 | `.env`（参考 `.env.example`） | 前后端共用；密钥勿提交 Git |
| 本地一键启动 | `npm run dev` | 同时启动 Vite 前端 + Node API |
| 仅前端 | `npm run dev:web` | Vite，默认 `http://localhost:5173` |
| 仅后端 | `npm run dev:server` / `npm run start:server` | API：`http://localhost:3001` |

开发时前端通过 Vite 代理把 `/api` 转到 `http://localhost:3001`（见 `vite.config.js`）。

---

## 2. 技术栈

### 前端

| 技术 | 用途 |
|------|------|
| Vue 3 | SPA 框架 |
| Vite 8 | 构建 / 开发服务器 |
| Vue Router 5 | 路由（`createWebHistory`，`base: /Joanna/`） |
| Pinia | 状态（如语言 `stores/locale.js`） |
| d3-geo / topojson-client / world-atlas | 首页地球仪可视化 |
| Vitest + Vue Test Utils | 单元测试 |
| ESLint / Oxlint / Prettier | 代码规范 |

### 后端

| 技术 | 用途 |
|------|------|
| Node.js（`^22.18.0 \|\| >=24.12.0`） | 运行时 |
| Express 5 | REST API |
| better-sqlite3 | SQLite 同步驱动 |
| cookie-parser | 管理端 Session Cookie |
| cors | 跨域（生产建议配置 `CORS_ORIGIN`） |
| multer | 简历 PDF 上传（≤5MB） |
| bcryptjs | 可选：管理员密码哈希校验 |

### 数据与部署

| 技术 | 用途 |
|------|------|
| SQLite | 单文件库 `server/data/adgpay.sqlite` |
| gh-pages | 静态前端发布到 GitHub Pages |
| concurrently | 本地并行跑 web + api |

---

## 3. 项目架构

```
浏览器
  ├─ 官网 (Vue SPA)          → 公开 API：配置、岗位、咨询、投递
  └─ 管理后台 (/admin)       → Cookie 鉴权 API：CRUD + PDF 预览

Node 服务 (server/)
  ├─ REST /api、/api/admin
  ├─ SQLite 文件
  └─ uploads/resumes/ 简历 PDF

Vite (开发)
  └─ proxy /api → localhost:3001
```

### 目录结构

```
Joanna/
├── index.html                 # 前端 HTML 入口
├── vite.config.js             # base=/Joanna/，/api 代理
├── package.json
├── .env / .env.example
├── src/                       # Vue 官网 + /admin
│   ├── main.js
│   ├── App.vue
│   ├── api/client.js          # apiFetch / VITE_API_BASE
│   ├── router/index.js
│   ├── views/                 # 页面
│   ├── views/admin/           # 后台页面
│   ├── components/
│   ├── composables/
│   ├── data/                  # 默认配置、聊天知识库等
│   ├── stores/
│   └── assets/styles/
├── server/
│   ├── src/
│   │   ├── index.js           # API 入口
│   │   ├── loadEnv.js
│   │   ├── db/                # SQLite 初始化、migration、seed
│   │   ├── routes/            # 公开 + 管理路由
│   │   ├── middleware/auth.js
│   │   ├── services/
│   │   └── defaults/config.js # 配置硬编码兜底
│   ├── data/                  # *.sqlite（gitignore）
│   └── uploads/               # 简历（gitignore）
├── scripts/                   # 构建辅助、迁移脚本等
├── docs/backend-sqlite-plan.md
└── public/                    # 静态资源；原单页备份 adgpay.legacy.html
```

### 配置兜底策略

- DB 有有效值 → 使用数据库
- 空库 / 缺字段 / 读失败 → `server/src/defaults/config.js` 与前端 `src/data/siteConfigDefaults.js` 硬编码兜底

---

## 4. 数据库信息

### 4.1 位置

| 项 | 值 |
|----|-----|
| 默认路径 | `server/data/adgpay.sqlite`（可附带 `-wal` / `-shm`） |
| 环境变量覆盖 | `SQLITE_PATH`（见 `.env`） |
| 简历文件 | `server/uploads/resumes/*.pdf` |
| 初始化 | 启动时 `initDb()` 执行 migration；空岗位表时 `seedJobsIfEmpty()` 写入 3 条示例岗位 |

### 4.2 表结构概览

#### `system_config`（单行系统配置，`id` 固定为 1）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK | `CHECK (id = 1)` |
| customer_email | TEXT | 客户/客服邮箱 |
| partnership_email | TEXT | 商务合作邮箱 |
| office_address | TEXT | 办公地址 |
| updated_at | TEXT | ISO 时间 |

#### `inquiries`（联系咨询）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK AI | |
| ip | TEXT | 提交方 IP |
| name / company / phone / email | TEXT NOT NULL | |
| industry | TEXT | ecommerce / trade / saas / other |
| message | TEXT NOT NULL | |
| is_read / is_deleted | INTEGER | 0/1 |
| created_at | TEXT | |

#### `jobs`（招聘岗位）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK AI | |
| title | TEXT NOT NULL | |
| job_type / experience / work_location | TEXT | |
| responsibilities / requirements | TEXT | 多行文本，公开 API 按行拆成数组 |
| status | TEXT | `published` \| `draft` |
| is_deleted | INTEGER | 软删 |
| created_at / updated_at | TEXT | |

#### `applications`（岗位投递）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER PK AI | |
| job_id | INTEGER FK → jobs.id | |
| name / gender / school / residence / bio | TEXT NOT NULL | |
| phone / email | TEXT | |
| resume_path | TEXT | 相对路径，如 `resumes/xxx.pdf` |
| is_read / is_deleted | INTEGER | |
| created_at | TEXT | |

索引：`idx_inquiries_created`、`idx_jobs_status`、`idx_applications_job`、`idx_applications_created`。

### 4.3 建表 SQL（完整）

源文件：`server/src/db/migrations/001_initial.sql`

```sql
-- Initial schema for ADG PAY admin + forms

CREATE TABLE IF NOT EXISTS system_config (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  customer_email TEXT NOT NULL DEFAULT '',
  partnership_email TEXT NOT NULL DEFAULT '',
  office_address TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  industry TEXT,
  message TEXT NOT NULL,
  is_read INTEGER NOT NULL DEFAULT 0,
  is_deleted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  job_type TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '',
  work_location TEXT NOT NULL DEFAULT '',
  responsibilities TEXT NOT NULL DEFAULT '',
  requirements TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  is_deleted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  gender TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  school TEXT NOT NULL,
  residence TEXT NOT NULL,
  bio TEXT NOT NULL,
  resume_path TEXT,
  is_read INTEGER NOT NULL DEFAULT 0,
  is_deleted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, is_deleted);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);
```

运行时还会在 `server/src/db/index.js` 的 `ensureColumnMigrations` 中，对旧库补加 `applications.phone` / `applications.email`（若缺失）。

### 4.4 相关代码位置

| 文件 | 职责 |
|------|------|
| `server/src/db/index.js` | 打开库、WAL、执行 migration、路径常量 |
| `server/src/db/migrations/001_initial.sql` | 建表 |
| `server/src/db/seed.js` | 空表时种子岗位 |
| `server/src/services/configService.js` | 读写配置 + 兜底合并 |

---

## 5. 接口信息

基址：

- 本地开发：前端同源 `/api`（Vite 代理到 `3001`）
- 直接调 API：`http://localhost:3001/api/...`
- 生产跨域：设置 `VITE_API_BASE`（如 `https://api.example.com`）

管理接口需登录 Cookie（`HttpOnly`，登录后约 7 天）；`credentials: 'include'`。

### 5.1 公开接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 `{ ok, service }` |
| GET | `/api/config` | 公开系统配置（邮箱、地址，含兜底） |
| POST | `/api/inquiries` | 提交咨询表单 JSON |
| GET | `/api/jobs` | 已上架岗位列表 |
| GET | `/api/jobs/:id` | 单个已上架岗位 |
| POST | `/api/applications` | 投递（`multipart`：字段 + `resume` PDF） |

**POST `/api/inquiries` 必填：** `name`, `company`, `phone`, `email`, `message`；可选 `industry`。

**POST `/api/applications` 必填：** `job_id`, `name`, `gender`, `phone`, `email`, `school`, `residence`（或 `location`）, `bio`（≤200 字）, 文件字段 `resume`（PDF，≤5MB）。

### 5.2 管理接口（前缀 `/api/admin`，需鉴权，登录除外）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/admin/login` | body: `{ password }` |
| POST | `/api/admin/logout` | 登出 |
| GET | `/api/admin/me` | 当前是否已登录 |
| GET / PUT | `/api/admin/config` | 读 / 写系统配置 |
| GET | `/api/admin/inquiries` | 列表；query: `read`, `include_deleted` |
| GET | `/api/admin/inquiries/:id` | 详情 |
| PATCH | `/api/admin/inquiries/:id/read` | 已读/未读 |
| DELETE | `/api/admin/inquiries/:id` | 软删 |
| GET / POST | `/api/admin/jobs` | 列表 / 新建 |
| GET / PUT | `/api/admin/jobs/:id` | 详情 / 更新 |
| PATCH | `/api/admin/jobs/:id/status` | 上架/下架 |
| DELETE | `/api/admin/jobs/:id` | 软删（有关联投递时业务上应谨慎） |
| GET | `/api/admin/applications` | 列表；query: `read`, `job_id`, `include_deleted` |
| GET | `/api/admin/applications/:id` | 详情 |
| PATCH | `/api/admin/applications/:id/read` | 已读/未读 |
| GET | `/api/admin/applications/:id/resume` | 预览 PDF（inline） |
| DELETE | `/api/admin/applications/:id` | 软删并尝试删除文件 |
| GET | `/api/admin/tables` | 四表只读浏览汇总 |

默认管理员密码：`ADMIN_PASSWORD=123456`（生产务必修改；也可设 `ADMIN_PASSWORD_HASH` 覆盖明文）。

路由实现目录：`server/src/routes/`。

---

## 6. 网页路由及对应信息

本地开发基址一般为 `http://localhost:5173/Joanna/`（因 `vite.config.js` 中 `base: '/Joanna/'`）。  
GitHub Pages 静态站：`https://abinga136211.github.io/Joanna/`（以仓库 Pages 配置为准）。  
正式品牌域名：`https://www.adgpay.com`（需自备服务器/反代；当前 `deploy` 脚本主要面向 GitHub Pages）。

### 6.1 官网

| 路径 | 名称 | 视图组件 | 说明 |
|------|------|----------|------|
| `/` | home | `HomeView.vue` | 首页 / 品牌与产品概览、地球仪等 |
| `/products` | products | `ProductsView.vue` | 产品与服务 |
| `/about` | about | `AboutView.vue` | 关于我们 |
| `/compliance` | compliance | `ComplianceView.vue` | 合规与牌照相关 |
| `/faq` | faq | `FaqView.vue` | 常见问题 |
| `/contact` | contact | `ContactView.vue` | 联系我们；咨询表单 → `POST /api/inquiries`；锚点 `#contact-form`、`#bilingual` |
| `/privacy` | privacy | `PrivacyView.vue` | 隐私政策 |
| 其它未知路径 | — | 重定向到 `/` | |

页面内另有聊天助手组件（`ChatAssistant.vue` + `chatKnowledge.js` 关键词知识库），不入库。

### 6.2 管理后台

| 路径 | 名称 | 说明 |
|------|------|------|
| `/admin/login` | admin-login | 仅密码登录 |
| `/admin` | — | 重定向到 `tables` |
| `/admin/tables` | admin-tables | 四表只读浏览 |
| `/admin/config` | admin-config | 系统配置编辑 |
| `/admin/inquiries` | admin-inquiries | 咨询列表、已读、软删 |
| `/admin/jobs` | admin-jobs | 岗位增删改、上架下架 |
| `/admin/applications` | admin-applications | 投递列表、已读、PDF 预览、软删 |

未登录访问需鉴权的后台路由会跳转到 `/admin/login?redirect=...`。

---

## 7. 部署方式

### 7.1 本地开发

1. 安装依赖（需本机可编译 `better-sqlite3` 的 Node 版本）：

```sh
npm install
```

2. 复制环境变量：

```sh
# 将 .env.example 复制为 .env，按需修改
# Windows PowerShell 示例：
Copy-Item .env.example .env
```

3. 启动：

```sh
npm run dev
```

- 前端：Vite（带 `/Joanna/` base）  
- 后端：`http://localhost:3001`  
- 后台：浏览器打开 `/admin/login`，默认密码见 `.env` 的 `ADMIN_PASSWORD`

其它命令：

```sh
npm run build          # 产出 dist/
npm run preview        # 预览构建结果
npm run start:server   # 仅生产式启动 API
npm run test:unit
npm run lint
```

### 7.2 静态前端 → GitHub Pages（现有脚本）

```sh
npm run deploy
```

流程：`vite build` → `scripts/spa-github-pages.mjs`（复制 `index.html` 为 `404.html` 做 SPA 回退）→ `gh-pages -d dist`。

注意：

- `base` 为 `/Joanna/`，适合 `username.github.io/Joanna/`。
- **GitHub Pages 只托管静态前端，不跑 Node/SQLite**；表单与后台需另有可访问的 API，并通过 `VITE_API_BASE` 指向该 API，且配置好 `CORS_ORIGIN`。

### 7.3 自有服务器（前后端一体或分离，推荐生产）

一期方案中部署细则仍待定（见 `docs/backend-sqlite-plan.md` P8），常见做法如下。

**A. 同机部署（推荐小规模）**

1. 服务器安装 Node（满足 `engines`），克隆仓库并 `npm install`。
2. 生产 `.env` 示例：

```env
PORT=3001
SQLITE_PATH=/var/lib/adgpay/adgpay.sqlite
CORS_ORIGIN=https://www.adgpay.com
ADMIN_PASSWORD=请换成强密码
# 或 ADMIN_PASSWORD_HASH=...
VITE_API_BASE=          # 若 Nginx 同源反代 /api，构建时可不设
```

3. 若生产站点根路径为 `/` 而非 `/Joanna/`，构建前将 `vite.config.js` 的 `base` 改为 `'/'`。
4. 构建前端：`npm run build`，用 Nginx（或 Express 静态）托管 `dist/`。
5. 进程守护启动 API，例如：

```sh
NODE_ENV=production npm run start:server
# 或使用 pm2 / systemd
```

6. Nginx 示例要点：
   - `location /` → 前端静态 + SPA `try_files`
   - `location /api` → `proxy_pass http://127.0.0.1:3001`
   - HTTPS、上传体积限制、定期备份 `adgpay.sqlite` 与 `uploads/`

**B. 前后端分离**

- 前端静态 CDN / Pages：构建时设置 `VITE_API_BASE=https://api.xxx.com`
- 后端单独机器：只跑 `start:server`，设置 `CORS_ORIGIN` 为官网域名

### 7.4 数据备份建议

- 备份文件：`*.sqlite`（及 WAL 时先 checkpoint 或停写后拷贝）
- 备份目录：`server/uploads/resumes/`
- 勿将 `.env`、sqlite、上传简历提交到 Git（已在 `.gitignore` 中忽略）

---

## 8. 相关文档

| 文档 | 内容 |
|------|------|
| `README.md` | 快速开始与目录说明 |
| `docs/backend-sqlite-plan.md` | 一期后端方案、表模型与里程碑 |
| `CREDITS.md` | 图片与视觉资源许可 |
| `.env.example` | 全部环境变量说明 |

---

*文档根据当前仓库实现整理，若代码变更请以源码与 migration 为准同步更新本文。*
