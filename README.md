# ADG PAY（Vue 3）

由 `public/adgpay.html` 重构而来的 Vue 3 + Vite 官网项目，便于后续按页面/组件修改。

## 本地开发

```sh
npm install
npm run dev
```

会同时启动 Vite 前端与 Node API（默认 `http://localhost:3003`）。前端通过 Vite 代理访问 `/api`。

仅前端：`npm run dev:web`  
仅后端：`npm run dev:server`

管理后台：浏览器打开 `/admin/login`（仅密码，默认 `123456`，见 `.env` / `.env.example`）。

后台功能一览：

- **数据表**：只读浏览四张表（长文本省略显示）
- **系统配置**：客户/合作邮箱、办公地址（空则官网用硬编码兜底）
- **咨询 / 投递**：列表、已读未读、软删；投递可预览 PDF
- **岗位**：增删改、上架下架（有投递时禁止删除）

方案与计划见 [`docs/backend-sqlite-plan.md`](./docs/backend-sqlite-plan.md)。

## 目录结构

```
src/          # Vue 官网 + /admin 后台
server/       # Express + SQLite API
  src/
  data/       # SQLite 文件（gitignore）
  uploads/    # 简历 PDF（gitignore）
docs/backend-sqlite-plan.md
```

密钥放在 `.env`（参考 `.env.example`），勿提交到仓库。原单页备份为 `public/adgpay.legacy.html`。

图片与视觉资源的来源、许可及商用说明见 [`CREDITS.md`](./CREDITS.md)。

## 构建

```sh
npm run build
```

```sh
npm run test:unit
```

```sh
npm run lint
```
