// Preview only. Press O to switch the hover text back to the old drawing and compare.
// Press W for the hover weight dial (proposal 10): a hairline outline on the highlighted text, set by eye.
(() => {
  const KEY = "hover-weight-v1", root = document.documentElement;
  const load = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch {} };
  const set = (v) => root.style.setProperty("--hover-weight", v + "px");
  const saved = load(); if (saved !== null) set(saved);
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99999;padding:8px 10px;font:12px/1.4 system-ui;background:#fff;color:#000;display:none;-webkit-font-smoothing:auto";
  const label = document.createElement("div");
  const dial = Object.assign(document.createElement("input"), { type: "range", min: 0, max: 0.4, step: 0.01, value: saved ?? 0.15 });
  dial.style.cssText = "display:none;width:220px";
  const show = () => {
    const old = root.classList.contains("hover-old");
    label.textContent = old ? "Hover: old drawing (press O for the proposal)" : `Hover weight: ${Number(dial.value).toFixed(2)} px (0 is none)`;
    box.style.display = "block"; if (!box.isConnected) { box.append(label, dial); document.body.append(box); }
  };
  dial.addEventListener("input", () => { set(dial.value); save(dial.value); show(); });
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest("input, textarea, [contenteditable]")) return;
    const k = e.key.toLowerCase();
    if (k === "o") { root.classList.toggle("hover-old"); show(); }
    if (k === "w") { dial.style.display = dial.style.display === "none" ? "block" : "none"; show(); }
  });
})();
