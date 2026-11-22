// One cursor on the preview, while two proposals overlap on this branch. PR #30 (the new collection page)
// brought its own cursor button (site/js/cursor-button.js); main has the site cursor he picked on 21 Nov
// (site-cursor.js here). Both would draw at once. The preview keeps the site cursor: this stops the
// cursor button from ever starting (its zones listen for pointerenter, which reaches the window's
// capture listener first). Delete this file once one of the two is chosen and the other removed.
(() => {
  if (!document.querySelector("[data-cursor]")) return;
  addEventListener("pointerenter", (e) => {
    if (e.target && e.target.matches && e.target.matches("[data-cursor]")) e.stopImmediatePropagation();
  }, true);
  document.documentElement.classList.remove("cursor-btn-on");
})();
