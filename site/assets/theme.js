"use strict";
/* Apply appearance before rendering to avoid a flash of the other theme. */
(() => {
  const modes = ["system", "light", "dark"];
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  let mode = "system";
  try { const saved = localStorage.getItem("faw-play-appearance"); if (modes.includes(saved)) mode = saved; } catch (_) {}
  function apply() {
    const dark = mode === "dark" || (mode === "system" && media.matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.querySelector("meta[name=\"theme-color\"]").content = dark ? "#101113" : "#F5F7F5";
    const label = { system: "跟随系统", light: "浅色", dark: "深色" }[mode];
    const button = document.getElementById("theme-toggle");
    if (button) { document.getElementById("theme-label").textContent = label; button.setAttribute("aria-label", `外观：${label}，点击切换跟随系统、浅色或深色`); }
  }
  apply();
  media.addEventListener("change", () => { if (mode === "system") apply(); });
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.getElementById("theme-toggle").addEventListener("click", () => {
      mode = modes[(modes.indexOf(mode) + 1) % modes.length];
      try { localStorage.setItem("faw-play-appearance", mode); } catch (_) {}
      apply();
    });
  });
})();
