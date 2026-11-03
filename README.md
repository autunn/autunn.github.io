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
