# Autunn Play 官网

Autunn Play 的独立静态官网，使用 GitHub Pages 发布。

- 网站：<https://autunn.github.io/AutunnPlay-Website/>
- 网页文件：`site/`
- 部署配置：`.github/workflows/pages.yml`

将网页修改推送到 `main` 后会自动部署，也可以在 Actions 中手动运行部署工作流。仓库的 Settings → Pages → Source 使用 GitHub Actions。

本地预览：

```sh
python3 -m http.server 8000 --directory site
```

访问 <http://localhost:8000/>。页面使用相对资源路径，无需构建工具或后端即可展示。

此仓库只保存官网静态文件。授权、激活和应用更新服务独立运行；网页当前不提供应用 APK 或固件安装包下载。

## 手机端与展示图片

页面优先适配手机，包含底部快捷入口、QQ 交流群按钮、入群链接复制，以及无线 / USB 连接界面切换。交流群：<https://qm.qq.com/q/5XZu4U8flY>。

当前展示对应 CarPlay 1.0.1 的连接页。`site/assets/carplay-wireless.png` 和 `carplay-usb.png` 是由应用实际连接页生成的 Android 本地渲染预览，保留完整画面和原始标识，不代表实车截图。图片可点击查看原图。应用图标来自当前项目。

更新图片时同时保留准确的图片说明，避免将历史主题概念图描述为当前版本实车效果。
