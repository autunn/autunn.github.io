# Autunn Play 官网

Autunn Play 的独立静态官网，使用 GitHub Pages 发布。

- 网站：<https://autunn.github.io/>
- 网页文件：`site/`
- 部署配置：`.github/workflows/pages.yml`
- 适配车型：2023、2024、2025 款红旗 HS5。
- QQ 群：Autunnplay交流群，<https://qm.qq.com/q/5XZu4U8flY>。

官网展示普通 CarPlay 的连接、导航分屏、导航、音乐与应用五类中控页面。另有车型适配和安装咨询，安装方式通过交流群了解。安装包通过官网同源静态路径提供，可由 CDN 缓存，网站不提供车机固件或在线升级流程。

将网页修改推送到 `main` 后会自动部署，也可以在 Actions 中手动运行部署工作流。仓库的 Settings → Pages → Source 使用 GitHub Actions。

## 本地预览

```sh
python3 -m http.server 8000 --directory site
```

访问 <http://localhost:8000/>。页面使用相对资源路径，无需构建工具或后端即可展示。

## 展示图片来源

- `site/assets/carplay-apps-real.png`：用户提供的普通 CarPlay 应用页面实机截图，1920×720，原文件为 `03-CarPlay桌面-实机界面.PNG`；原样保留像素，图注明确标为实机截图。

- `site/assets/carplay-navigation.png`、`carplay-dashboard.png`：普通 CarPlay 的历史导航与导航分屏截图，使用内置 imagegen 仅对街道名、地点名及目的地等关键信息做局部模糊处理，保留道路、路线、箭头和布局；图注明确标识处理范围。
- `site/assets/carplay-connected.png`：普通 CarPlay 连接后的音乐界面，来自 Android 手机台架的 ADB 整屏采集；不包含个人位置、联系人或消息内容。
- `site/assets/carplay-wireless.png`、`carplay-usb.png`：由实际连接页生成的 Android 本地渲染预览，保留完整画面及原始来源标识。
- `site/assets/app-icon.png`：当前项目应用图标。

所有图片保留各自来源说明，可点击查看大图。手机端提供固定快捷入口和群链接复制。

仪表投屏仅用文字说明：保留原厂仪表框架并显示全屏地图；网站不展示仪表截图。

地图图片的编辑提示摘要：仅对敏感地名文字的局部区域模糊，保留地图道路、路线、定位标记及中控 UI，禁止整幅地图模糊或添加 Ultra 元素。

## 赞赏码

页面使用用户提供的赞赏码原图 `site/assets/appreciation-code.jpg`，未重绘、裁切或改变码点；支持查看原图和下载。赞赏完全自愿，不影响软件的下载与使用。

中控图集顺序为连接、导航分屏、导航、音乐、应用，默认展示连接页。页面顺序为产品介绍、五类中控界面、适配与安装包下载、使用帮助、交流区、赞赏码。QQ 入群入口仅位于交流区，顶栏、首屏、下载卡片和手机快捷栏不再重复展示。

## 安装包

CarPlay 1.0.1 / 10001，包名 `com.autunn.carplay`，大小 8,484,686 字节，最低 Android 9，APK v2 签名校验通过。安装包以现有正式交付文件原样存放在 `site/downloads/`，供官网同域名和 CDN 直接访问。

下载：<https://autunn.github.io/downloads/CarPlay-1.0.1-HS5-release.apk>。SHA-256：`95f59353f559ab57ea929a1f15ddef7492d4c9962fa80bd93791e3ed43fca292`。

## 域名与旧站源码

官网仓库为 `autunn/autunn.github.io`，根地址为 <https://autunn.github.io/>。此前占用根地址的网站已停止发布，其源码及提交历史完整保留在 `autunn/autunn.github.io-archive-20261103`，原发布工作流已停用。

原项目站路径 `/AutunnPlay-Website/` 和六个旧语言入口均跳转到根首页，并保留 URL 的查询参数与锚点。

## 源码致谢

本项目使用了 [DiPlay](https://github.com/shihabal3amri/DiPlay) 与 [xcertplay](https://github.com/shilapi/xcertplay) 的源码。官网底部保留原项目名称、链接及对原作者和贡献者的致谢。
