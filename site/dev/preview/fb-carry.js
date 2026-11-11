// Falling behind carry on the framework page, preview only (his yes, 11 Nov). Moves into site/js on his
// yes to the page. The scene is the motion lab's engine (site/motion-lab/fb-engine.js) with the settings
// in fb-settings.json, so what was rendered and reviewed (docs/motion/cs2-falling-behind-final/) is
// exactly what plays here.
//   Placement  a frame takes the place of the static Rollover panel in the Falling behind block (PLACE).
//   Entrance   Haven's media curtain opens the frame (the mondai-motion layer treats it as a .fig).
//   Playback   the loop starts once the curtain is open and plays only while the frame is on screen.
//   Reduced    one still at STILL_T, the state the motion argues for: carried, active, gap closed.
(() => {
  const page = document.querySelector(".canvas.framework");
  if (!page) return;
  const here = document.currentScript ? document.currentScript.src : location.href;
  const lab = new URL(/\/dev\/preview\//.test(here) ? "../../motion-lab/" : "../motion-lab/", here);
  const PLACE = { section: '[data-figma-node="5812:20248"]', replaces: ['[data-figma-node="5812:20311"]', '[data-figma-node="5812:20316"]'] };
  const STILL_T = 5.5;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const section = page.querySelector(PLACE.section);
  if (!section) return;
  const frame = document.createElement("div");
  frame.className = "fig fb-carry";
  frame.dataset.figmaNode = "fb-carry";
  frame.setAttribute("role", "img");
  frame.setAttribute("aria-label", "This week and next week side by side. The one Action Item still open on Saturday night gets a Rollover tag, moves to the top of next week and turns active, while next week drops an item so it still holds three.");
  const old = PLACE.replaces.map((s) => section.querySelector(s)).filter(Boolean);
  // In reading order where the static card was (after the Rollover caption), so the stacked layout under
  // 1200 shows it in place; at 1440 its position comes from fb-carry.css
  const at = section.querySelector(PLACE.replaces[1]) || old[0];
  at ? at.before(frame) : section.append(frame);
  old.forEach((e) => e.classList.add("fb-carry-replaced"));
  document.documentElement.classList.add("has-fb-carry");

  (async () => {
    const [{ createScene, FONT_CSS }, saved] = await Promise.all([
      import(new URL("fb-engine.js", lab).href),
      fetch(new URL("fb-settings.json", lab), { cache: "no-store" }).then((r) => r.json()).catch(() => ({})),
    ]);
    // The engine's font rule points at assets/ beside the lab page; here it needs the lab's own folder
    const style = document.createElement("style");
    style.textContent = FONT_CSS.replaceAll('url("assets/', `url("${new URL("assets/", lab).href}`);
    document.head.append(style);
    const host = document.createElement("div");
    frame.append(host);
    const scene = createScene(host, saved);
    const S = scene.settings;
    frame.style.setProperty("--fb-ratio", `${S.frameW} / ${S.frameH}`);
    const fit = () => { const w = frame.clientWidth; if (w) scene.resize(w / S.frameW, Math.min(2, window.devicePixelRatio || 1)); };
    new ResizeObserver(fit).observe(frame);
    await document.fonts.load('700 20px "Plex Mono FB"').catch(() => {});
    fit();
    scene.seek(STILL_T);
    window.__fbCarry = { scene, frame, STILL_T };
    if (reduced) return;

    // Play while on screen, from the start of the loop each time it comes back into view; wait for the curtain
    let visible = false, running = false, t0 = 0;
    const opened = () => frame.dataset.mmDone === "1" || getComputedStyle(frame).clipPath === "none";
    const tick = (now) => {
      if (!running) return;
      scene.seek((now - t0) / 1000);
      requestAnimationFrame(tick);
    };
    const start = () => { if (running || !visible) return; running = true; t0 = performance.now(); requestAnimationFrame(tick); };
    const wait = () => { if (!visible || running) return; opened() ? start() : setTimeout(wait, 120); };
    scene.seek(0);
    new IntersectionObserver((es) => es.forEach((e) => {
      visible = e.isIntersecting;
      if (visible) wait(); else { running = false; scene.seek(0); }
    }), { threshold: 0.25 }).observe(frame);
  })();
})();
