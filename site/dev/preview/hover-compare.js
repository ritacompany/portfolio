// Preview only: press O to switch the hover text between the old drawing and proposal 9, to compare on a Mac.
(() => {
  const tag = document.createElement("div");
  tag.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:99999;padding:6px 8px;font:12px/1 system-ui;background:#fff;color:#000;display:none";
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() !== "o" || e.target.closest("input, textarea, [contenteditable]")) return;
    const old = document.documentElement.classList.toggle("hover-old");
    tag.textContent = old ? "Hover: old drawing" : "Hover: proposal 9"; tag.style.display = "block";
    document.body.append(tag);
  });
})();
