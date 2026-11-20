// Page change: Home to the Mondai collection, and the collection to the framework case study.
// PROVISIONAL (20 Nov): no settled record was found in the repo; built for him to feel while he answers.
// Styles and the reasoning: css/page-transition.css, docs/motion/page-transition/style_guide.md.
// Runs in <head>, before first paint, so the arriving page knows which title to morph.
// The browser's cross document view transition does the drawing; this file only says which element on
// each side is "the same thing", and only for a forward click on that link. Back and forward buttons get
// the plain cross fade, because the clicked title may be off screen by then.
(() => {
  const KEY = "pt-shared";
  const root = document.documentElement;
  // Arriving: a flag left by the page we came from in the last few seconds names the shared title.
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (raw) {
      const { name, at } = JSON.parse(raw);
      if (Date.now() - at < 4000 && /^[a-z-]+$/.test(name)) root.classList.add("pt-in", `pt-in-${name}`);
    }
  } catch (e) {}
  addEventListener("pagereveal", (e) => {
    if (!e.viewTransition) { root.classList.remove("pt-in"); return; }
    e.viewTransition.finished.finally(() => root.classList.remove("pt-in"));
  });
  // Leaving: a click on a link marked data-pt="name" names its title on this page and leaves the flag.
  addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[data-pt]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const name = a.dataset.pt;
    try { sessionStorage.setItem(KEY, JSON.stringify({ name, at: Date.now() })); } catch (err) {}
    root.classList.add(`pt-out-${name}`);
  });
  // Coming back from the cache: drop any leftover leaving state.
  addEventListener("pageshow", (e) => {
    if (e.persisted) [...root.classList].filter((c) => c.startsWith("pt-out-")).forEach((c) => root.classList.remove(c));
  });
})();
