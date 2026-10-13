# 图片与视觉资源授权说明（CREDITS）

本文档记录 ADG PAY（Joanna）项目中所有图片与相关视觉资源的来源、许可与商用结论。  
**更新日：** 2026-09-26  

> 本说明便于公司官网发布与合规审查，**不构成法律意见**。若需正式法务确认，请咨询律师。

---

## 总览：能否用于公司官网商用发布？

| 类别 | 结论 |
|------|------|
| `public/images/*.jpg`（下表所列） | **可以** — 均已替换为 Unsplash 免费图，适用 [Unsplash License](https://unsplash.com/license) |
| FlagCDN 国旗 | **可以** — 公有领域（Flagpedia 声明） |
| 地球仪路径（Natural Earth） | **可以** — 公有领域 |
| 手写 SVG / 文字 Logo「ADG」 | **可以** — 项目自有 |
| `favicon.ico` | **可以** — 视为项目自有资产 |

### Unsplash License 要点（官网适用）

- 允许个人与**商业**用途（含公司网站），一般**无需署名**（署名仍建议保留）。
- 不可将未改动原图作为独立商品出售；不可批量做成竞争图库。
- 照片中出现的 **商标 / 品牌 Logo**（如支付终端、App 界面）不等于被授权代言，请避免暗示官方合作。

完整条款：https://unsplash.com/license  
帮助中心：https://help.unsplash.com/en/articles/2612315-can-i-use-unsplash-images-for-personal-or-commercial-projects  

---

## 1. 本地照片（`public/images/`）

以下文件于 2026-09-26 **重新自 Unsplash CDN 下载**，并核对页面与摄影师信息，可直接用于公司官网。

| 文件 | 页面用途 | 摄影师 | Unsplash 页面 | 许可 | 商用/官网 |
|------|----------|--------|---------------|------|-----------|
| `about-hero.jpg` | About 头图 | Campaign Creators | https://unsplash.com/photos/man-standing-in-front-of-people-sitting-beside-table-with-laptop-computers-gMsnXqILjp4 | Unsplash License | ✓ |
| `about-journey-1.jpg` | About 历程 | Brooke Cagle | https://unsplash.com/photos/three-people-sitting-in-front-of-table-laughing-together-g1Kr4Ozfoac | Unsplash License | ✓ |
| `about-journey-2.jpg` | About 历程 | Brooke Cagle | https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-while-holding-pens-during-daytime-Qcsp3bfGJIs | Unsplash License | ✓ |
| `about-license.jpg` | About 牌照/合规 | Scott Graham | https://unsplash.com/photos/person-writing-on-white-paper-IiyDMtG-nyc | Unsplash License | ✓ |
| `career-hero.jpg` | Careers（Join Us）头图 | LinkedIn Sales Solutions | https://unsplash.com/photos/man-standing-in-front-of-people-sitting-beside-table-with-laptop-computers-5fNmWej7ows | Unsplash License | ✓ |
| `compliance-hero.jpg` | Compliance 头图（合规与安全） | Tingey Injury Law Firm | https://unsplash.com/photos/woman-holding-statue-of-a-sword-during-daytime-DZpc4UY8ZtY | Unsplash License | ✓ |
| `compliance-funds.jpg` | 资金隔离示意 | Fabian Blank | https://unsplash.com/photos/person-holding-paper-near-pen-and-calculator-WNUxrSqLOmI | Unsplash License | ✓ |
| `contact-hero.jpg` | Contact 头图（联系我们 / 商务合作） | Cytonn Photography | https://unsplash.com/photos/two-people-shaking-hands-n95VMLxqM2I | Unsplash License | ✓ |
| `faq-hero.jpg` | FAQ 头图 | John Schnobrich | https://unsplash.com/photos/three-person-pointing-the-silver-laptop-computer-2FPjlAyMQTA | Unsplash License | ✓ |
| `products-hero.jpg` | Products 头图 | Blake Wisz | https://unsplash.com/photos/person-holding-black-android-smartphone-c9FQyqIECds | Unsplash License | ✓ |
| `products-core.jpg` | 首页产品配图 | Cheung Yin | https://unsplash.com/photos/a-boat-in-a-body-of-water-with-a-city-in-the-background-prpiqPhdy3A | Unsplash License | ✓ |

### 建议署名格式（可选）

```text
Photo by {Photographer} on Unsplash
```

示例：`Photo by John Schnobrich on Unsplash`

---

## 2. 远程国旗（FlagCDN）

| 项目 | 说明 |
|------|------|
| 代码 | `src/components/home/FlagMarquee.vue` |
| URL 模式 | `https://flagcdn.com/w320/{iso}.png` |
| 来源 | [Flagpedia.net](https://flagpedia.net/) / [flagcdn.com](https://flagcdn.com/) |
| 许可 | Flagpedia 声明国旗图为**公有领域**，可商用与非商用；欢迎回链 https://flagpedia.net |
| 官网 | **可以** |

Terms：https://flagpedia.net/terms  

---

## 3. 地球仪矢量数据

| 项目 | 说明 |
|------|------|
| 生成脚本 | `scripts/generate-globe-paths.mjs` |
| 运行数据 | `src/data/globePaths.js` |
| 组件 | `HeroGlobe.vue`、`WhyGlobe.vue` |
| 数据来源 | [Natural Earth](https://www.naturalearthdata.com/)（经 `world-atlas` / TopoJSON） |
| 许可 | Natural Earth **公有领域**，可商用，无需署名 |
| 官网 | **可以** |

Terms：https://www.naturalearthdata.com/about/terms-of-use/  

---

## 4. 其它视觉

| 资源 | 来源 | 许可 / 官网 |
|------|------|-------------|
| 页面内联 SVG 图标、装饰图形 | 项目内手写 | 自有 → **可以** |
| CSS 内联 chevron SVG（`adgpay.css`） | 项目内手写 | 自有 → **可以** |
| Logo 文字「ADG」 | `AppHeader` / `AppFooter` 文本，非图片 | 自有 → **可以** |
| `public/favicon.ico` | 项目资源 | 视为自有 → **可以** |

---

## 5. 替换记录（2026-09-26）

此前部分 JPG **无仓库内授权记录**；其中 `products-core.jpg` 仅含失效 Flickr 内嵌链接，商用风险高。  
已将全部 11 张页面 JPG **替换为上表所列、可核对的 Unsplash 免费图**，并建立本 CREDITS 台账。

- **2026-09-26（同日后续）：** `compliance-hero.jpg` 先后替换为 FlyD「键盘挂锁」、再换为 Tingey Injury Law Firm「正义女神天平」图（https://unsplash.com/photos/woman-holding-statue-of-a-sword-during-daytime-DZpc4UY8ZtY），以匹配合规页「受监管经营 / 合规与安全」文案。
- **2026-09-26（同日后续）：** `contact-hero.jpg` 先后换为人物肖像、再换为 Cytonn Photography「握手合作」图（https://unsplash.com/photos/two-people-shaking-hands-n95VMLxqM2I），以贴合「开户咨询 / 商务合作 / 联系我们」。

若日后更换图片：

1. 仅使用可确认商用的来源（Unsplash / 自有拍摄 / 已购授权图库）。
2. 在本文件追加一行：文件名、摄影师、页面 URL、许可、日期。
3. 避免使用来源不明的 Flickr / 社交媒体截图。

---

## 6. 快速检查清单（上线前）

- [x] 页面 JPG 均有可点击的 Unsplash 出处链接  
- [x] 国旗与地球仪许可已确认可商用  
- [ ] （可选）页脚或关于页增加「部分摄影来自 Unsplash」致谢  
- [ ] （可选）法务抽查 1–2 张图的 Unsplash 页面是否仍为 Free（非 Unsplash+）  
