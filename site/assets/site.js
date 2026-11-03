"use strict";
(() => {
  let toastTimer;
  function toast(message) {
    const notice = document.getElementById("toast");
    notice.textContent = message;
    notice.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { notice.hidden = true; }, 3500);
  }

  document.querySelectorAll("[data-gallery]").forEach(button => button.addEventListener("click", () => {
    const selected = button.dataset.gallery;
    document.querySelectorAll("[data-gallery]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
    document.querySelectorAll("[data-gallery-panel]").forEach(panel => { panel.hidden = panel.dataset.galleryPanel !== selected; });
  }));

  document.querySelectorAll("[data-preview]").forEach(button => button.addEventListener("click", () => {
    const selected = button.dataset.preview;
    document.querySelectorAll("[data-preview]").forEach(option => option.setAttribute("aria-pressed", String(option === button)));
    document.querySelectorAll("[data-preview-panel]").forEach(panel => { panel.hidden = panel.dataset.previewPanel !== selected; });
  }));

  document.getElementById("copy-group-link").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("https://qm.qq.com/q/Gr2eTNI2I4"); toast("入群链接已复制，可粘贴到 QQ 或浏览器打开"); }
    catch (_) { toast("复制未成功，请点击“立即加入 QQ 群”打开群页面"); }
  });
})();
