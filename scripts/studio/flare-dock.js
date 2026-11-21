// Studio only (npm run studio adds it to every page; the files on disk never change).
// 1. Docks Flare's panel to the right edge, full height, with the page beside it instead of under it.
//    The site's breakpoints read the window, not the page, so it docks only while the page keeps
//    1024 px, the same floor as the shared edit panel (fixes/2026-11-11-docked-panel-broke-tablet.md).
//    Narrower than that the panel floats as Flare ships it; Canvas mode shows the page beside it.
// 2. Stamps the width on every push to Flare's bridge, so Claude knows which layout a note was about:
//    the window width, or the frame widths when the push came from Canvas mode.
(function () {
  if (window !== window.top || /[?&]__flare_embed=/.test(location.search)) return;
  const PANEL = 340, PAGE_MIN = 1024, html = document.documentElement;
  const BRIDGE = (window.__FLARE_BRIDGE__ && window.__FLARE_BRIDGE__.url) || "";

  // Width stamp. Flare posts {origin, snapshot} to <bridge>/api/agent/push; the bridge keeps the whole
  // snapshot, so an extra field on it reaches the inbox file unchanged.
  const send = window.fetch.bind(window);
  window.fetch = function (input, init) {
    try {
      const url = String(input && input.url ? input.url : input);
      if (BRIDGE && url.startsWith(BRIDGE) && url.endsWith("/api/agent/push") && init && typeof init.body === "string") {
        const body = JSON.parse(init.body);
        if (body && body.snapshot) {
          body.snapshot.viewport = viewport();
          init = Object.assign({}, init, { body: JSON.stringify(body) });
        }
      }
    } catch (e) { /* leave the push as Flare made it */ }
    return send(input, init);
  };
  function viewport() {
    const frames = shadow() ? [...shadow().querySelectorAll("iframe")] : [];
    const canvas = frames.map((f) => { try { return f.contentWindow.innerWidth; } catch (e) { return null; } }).filter(Boolean);
    return canvas.length
      ? { mode: "canvas", frameWidths: canvas, windowWidth: innerWidth }
      : { mode: "page", width: innerWidth, height: innerHeight };
  }

  const shadow = () => { const h = document.getElementById("flare-host"); return h && h.shadowRoot; };
  let style = null, docked = false;
  const moved = new Map();

  function dockStyle(root) {
    if (style && style.isConnected) return;
    style = document.createElement("style");
    style.textContent = `.f-shell.f-expanded[data-studio-dock] { top: 0 !important; right: 0 !important; bottom: 0 !important;
      left: auto !important; width: ${PANEL}px !important; max-width: none !important; height: 100vh !important;
      max-height: none !important; border-radius: 0 !important; transform: none !important; }`;
    root.append(style);
  }

  function layout() {
    const root = shadow();
    const shell = root && root.querySelector(".f-shell.f-expanded");
    const inCanvas = !!(root && root.querySelector("iframe"));
    const want = !!shell && !inCanvas && innerWidth - PANEL >= PAGE_MIN;
    if (root) dockStyle(root);
    if (shell) shell.toggleAttribute("data-studio-dock", want);
    if (want === docked) { if (docked) shiftFixed(); return; }
    docked = want;
    html.style.setProperty("margin-right", docked ? PANEL + "px" : "", docked ? "important" : "");
    shiftFixed();
    dispatchEvent(new Event("resize"));
  }

  // Fixed bars (the nav) are placed against the window, so the page's margin does not move them.
  function shiftFixed() {
    for (const [n, o] of moved) { n.style.setProperty("right", o.r, o.rp); n.style.setProperty("left", o.l, o.lp); n.style.setProperty("width", o.w, o.wp); }
    moved.clear();
    if (!docked || !document.body) return;
    const vw = innerWidth;
    for (const n of document.body.querySelectorAll("*")) {
      if (n.id === "flare-host" || getComputedStyle(n).position !== "fixed") continue;
      const r = n.getBoundingClientRect();
      if (!r.width || r.right <= vw - PANEL + 0.5) continue;
      const o = { r: n.style.getPropertyValue("right"), rp: n.style.getPropertyPriority("right"), l: n.style.getPropertyValue("left"), lp: n.style.getPropertyPriority("left"), w: n.style.getPropertyValue("width"), wp: n.style.getPropertyPriority("width") };
      if (r.left <= 1 && vw - r.right <= 1) { n.style.setProperty("left", "0px", "important"); n.style.setProperty("width", "auto", "important"); }
      n.style.setProperty("right", Math.max(0, vw - r.right) + PANEL + "px", "important");
      moved.set(n, o);
    }
  }

  // Flare builds its panel after load and swaps it for a tab when minimized, so watch its shadow root.
  let watching = null;
  function watch() {
    const root = shadow();
    if (!root) { setTimeout(watch, 100); return; }
    if (watching === root) return;
    watching = root;
    new MutationObserver(() => requestAnimationFrame(layout)).observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    layout();
  }
  addEventListener("resize", layout);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch); else watch();
})();
