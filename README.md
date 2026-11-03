# Autunn Play 官网

Autunn Play 的独立静态官网，使用 GitHub Pages 发布。

- 网站：<https://autunn.github.io/>
- 网页文件：`site/`
- 部署配置：`.github/workflows/pages.yml`
- 适配车型：2023、2024、2025 款红旗 HS5。
- QQ 群：Autunnplay交流群，<https://qm.qq.com/q/5XZu4U8flY>。

官网展示普通 CarPlay 的连接、音乐、导航、导航分屏四类中控页面，以及车型适配和安装咨询。安装方式通过交流群了解。站点不提供安装包、车机固件或在线版本管理服务。

将网页修改推送到 `main` 后会自动部署，也可以在 Actions 中手动运行部署工作流。仓库的 Settings → Pages → Source 使用 GitHub Actions。

## 本地预览

```sh
python3 -m http.server 8000 --directory site
```

访问 <http://localhost:8000/>。页面使用相对资源路径，无需构建工具或后端即可展示。

## 展示图片来源

- `site/assets/carplay-navigation.png`、`carplay-dashboard.png`：普通 CarPlay 的历史导航与导航分屏截图，使用内置 imagegen 仅对街道名、地点名及目的地等关键信息做局部模糊处理，保留道路、路线、箭头和布局；图注明确标识处理范围。
- `site/assets/carplay-connected.png`：普通 CarPlay 连接后的音乐界面，来自 Android 手机台架的 ADB 整屏采集；不包含个人位置、联系人或消息内容。
- `site/assets/carplay-wireless.png`、`carplay-usb.png`：由实际连接页生成的 Android 本地渲染预览，保留完整画面及原始来源标识。
- `site/assets/app-icon.png`：当前项目应用图标。

所有图片保留各自来源说明，可点击查看大图。手机端提供固定快捷入口和群链接复制。

仪表投屏仅用文字说明：保留原厂仪表框架并显示全屏地图；网站不展示仪表截图。

地图图片的编辑提示摘要：仅对敏感地名文字的局部区域模糊，保留地图道路、路线、定位标记及中控 UI，禁止整幅地图模糊或添加 Ultra 元素。

## 赞助与授权回馈

入口：<https://wzyp.cn/item/lwbqa1>。官网使用“独立开发赞助计划（含授权回馈）”说明支持形式，明确付款后会收到用于授权或功能解锁的密钥，不将该链接描述为完全无对价的纯捐赠。支持款不涉及软件所有权买断，不包含安装、调试、远程协助等技术服务；授权适用范围及交付说明需在付款前阅读链接页。

## 域名与旧站源码

官网仓库为 `autunn/autunn.github.io`，根地址为 <https://autunn.github.io/>。此前占用根地址的网站已停止发布，其源码及提交历史完整保留在 `autunn/autunn.github.io-archive-20261103`，原发布工作流已停用。

原项目站路径 `/AutunnPlay-Website/` 和六个旧语言入口均跳转到根首页，并保留 URL 的查询参数与锚点。
