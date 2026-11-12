// ASCII reveal, preview only (his ask, 11 Nov: the checker reveal on the Home works cards "isn't correct",
// try "a bunch of different ASCII options"). Pairs with ascii-reveal.css.
//
// Home motion (home-motion.js, owned by the main session) still decides how far each card's reveal has
// got as it scrolls (revealFrom, revealAt and its 0.38 s catch up). This file reads that progress every
// frame and draws the cover itself, in characters, on its own canvas over the image, hiding home
// motion's checker canvas while an ASCII style is picked. Picking "Checker squares" hands the drawing back.
//
// Styles (each a different idea of what the characters are doing):
//   Density ramp      the cover breaks up into characters that thicken toward the clearing edge, then
//                     the image. The Characters field is the ramp, sparse to dense.
//   Image in type     the image arrives first as characters picked by its own brightness, in its own
//                     colours, then resolves to the picture.
//   Decode            the edge is a band of characters churning at random, settling cell by cell.
//   Block shade       the cover thins through full, dark, mid and light shade blocks drawn in the page
//                     colour, so the image shows through the gaps.
//   Binary rain       columns of 0 and 1 fall through the edge at their own pace.
// Edges: top down (the reference), bottom up, centre out, falling columns, scatter. Ragged edge mixes
// noise into any of them.
(() => {
  if (!document.querySelector(".home")) return;

  const STYLES = [
    ["checker", "Checker squares (current)"],
    ["ramp", "Density ramp"],
    ["image", "Image in type"],
    ["decode", "Decode"],
    ["shade", "Block shade"],
    ["binary", "Binary rain"],
  ];
  const EDGES = [["down", "Top down"], ["up", "Bottom up"], ["centre", "Centre out"], ["columns", "Falling columns"], ["scatter", "Scatter"]];
  const CURVES = [["linear", "Linear"], ["out", "Ease out"], ["in", "Ease in"], ["inout", "Ease in and out"]];
  const SHADE = "█▓▒░";
  const DEFAULTS = {
    style: "ramp", edge: "down", chars: " .:-=+*#%@", cell: 10, row: 1.5, band: 0.7, ragged: 0.25,
    glyph: "#d4d4d8", cover: "#040405", imageColour: true, flicker: 14, curve: "linear", weight: "500",
    scrub: false, at: 0.5,
  };
  const V = { ...DEFAULTS };
  const curve = (t) => ({ out: 1 - (1 - t) ** 3, in: t ** 3, inout: t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2 }[V.curve] ?? t);
  // Fixed per cell randomness, so the pattern is stable frame to frame (no static unless a style asks).
  const hash = (a, b, s = 0) => { let h = (a * 374761393 + b * 668265263 + s * 2147483647) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };

  let reveals = [], layers = [], dirty = true;
  const mono = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace';

  function makeLayer(r) {
    const canvas = document.createElement("canvas");
    canvas.className = "ar-canvas"; canvas.setAttribute("aria-hidden", "true");
    return { r, canvas, ctx: canvas.getContext("2d"), w: 0, h: 0, cols: 0, rows: 0, img: null, imgFor: "", drawnP: -1, sig: "" };
  }
  function size(L) {
    const m = L.r.media, w = m.clientWidth, h = m.clientHeight, dpr = Math.min(2, devicePixelRatio || 1);
    const cw = V.cell, ch = V.cell * V.row;
    const cols = Math.max(1, Math.ceil(w / cw)), rows = Math.max(1, Math.ceil(h / ch));
    if (L.w !== w || L.h !== h || L.cols !== cols || L.rows !== rows || L.dpr !== dpr) {
      Object.assign(L, { w, h, cols, rows, dpr });
      L.canvas.width = Math.max(1, Math.round(w * dpr)); L.canvas.height = Math.max(1, Math.round(h * dpr));
      L.img = null; L.drawnP = -1;
    }
  }
  // The image sampled at one value per cell, as object-fit: cover draws it, for Image in type.
  function sample(L) {
    const im = L.r.media.querySelector("img");
    const key = `${L.cols}x${L.rows}:${im && im.currentSrc}`;
    if (L.img && L.imgFor === key) return L.img;
    if (!im || !im.complete || !im.naturalWidth) return null;
    const c = document.createElement("canvas"); c.width = L.cols; c.height = L.rows;
    const x = c.getContext("2d", { willReadFrequently: true });
    // Cover in cell space: cells are not square, so scale the image's height by the cell aspect.
    const aspect = (L.h / L.rows) / (L.w / L.cols);
    const iw = im.naturalWidth, ih = im.naturalHeight / aspect;
    const k = Math.max(L.cols / iw, L.rows / ih);
    const dw = iw * k, dh = ih * k;
    try { x.drawImage(im, (L.cols - dw) / 2, (L.rows - dh) / 2, dw, dh); L.img = x.getImageData(0, 0, L.cols, L.rows).data; L.imgFor = key;
      // The card art is dark, so stretch its brightness range across the ramp (2nd to 98th percentile).
      const lums = []; for (let i = 0; i < L.img.length; i += 4) lums.push(0.2126 * L.img[i] + 0.7152 * L.img[i + 1] + 0.0722 * L.img[i + 2]);
      lums.sort((a, b) => a - b);
      L.lo = lums[Math.floor(lums.length * 0.02)] || 0; L.hi = Math.max(L.lo + 1, lums[Math.floor(lums.length * 0.98)] || 255); }
    catch { L.img = null; }
    return L.img;
  }
  // Where a cell sits along the edge's path, 0 clears first and 1 clears last.
  function along(x, y, L) {
    const u = (x + 0.5) / L.cols, v = (y + 0.5) / L.rows;
    let s;
    switch (V.edge) {
      case "up": s = 1 - v; break;
      case "centre": { const dx = (u - 0.5) * (L.w / Math.max(L.w, L.h)), dy = (v - 0.5) * (L.h / Math.max(L.w, L.h)); s = Math.min(1, Math.hypot(dx, dy) / 0.5); break; }
      case "columns": s = v * 0.6 + hash(x, 0, 11) * 0.4; break;
      case "scatter": s = hash(x, y, 5); break;
      default: s = v;
    }
    return s * (1 - V.ragged) + hash(x, y, 3) * V.ragged;
  }

  function draw(L, p, now) {
    const { ctx, cols, rows, dpr } = L;
    const cw = L.w / cols, ch = L.h / rows;
    const B = Math.max(0.02, V.band), front = p * (1 + B) - B;
    const chars = V.style === "shade" ? SHADE : V.style === "binary" ? "01" : (V.chars || "#");
    const n = chars.length;
    const [gr, gg, gb] = hex(V.glyph);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, L.w, L.h);
    const fontPx = Math.max(4, Math.min(cw / 0.6, ch * 0.92));
    ctx.font = `${V.weight} ${fontPx.toFixed(2)}px ${mono}`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const img = V.style === "image" ? sample(L) : null;
    const tick = Math.floor(now * V.flicker);
    let animated = false;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const c = Math.min(1, Math.max(0, (along(x, y, L) - front) / B)); // 1 covered, 0 clear
        const px = x * cw, py = y * ch;
        if (c >= 1) { ctx.fillStyle = V.cover; ctx.fillRect(px, py, cw + 0.5, ch + 0.5); continue; }
        if (c <= 0) continue;
        const r = hash(x, y, 1);
        if (V.style === "shade") {
          // Shade blocks in the page colour on the image, thinning as the edge passes.
          const i = Math.min(n - 1, Math.floor((1 - c) * n));
          ctx.fillStyle = V.cover; ctx.fillText(chars[i], px + cw / 2, py + ch / 2);
          continue;
        }
        if (c < r * 0.5) continue; // the clearing side of the band breaks up cell by cell
        ctx.fillStyle = V.cover; ctx.fillRect(px, py, cw + 0.5, ch + 0.5);
        let g, col = null;
        if (V.style === "image" && img) {
          const o = (y * cols + x) * 4, raw = 0.2126 * img[o] + 0.7152 * img[o + 1] + 0.0722 * img[o + 2];
          const lum = Math.min(1, Math.max(0, (raw - L.lo) / (L.hi - L.lo)));
          g = chars[Math.min(n - 1, Math.floor(lum * n))];
          // Its own colour, lifted so a dark pixel still reads as a character on the cover.
          if (V.imageColour) { const k = Math.min(6, 210 / Math.max(1, img[o], img[o + 1], img[o + 2])); col = `rgb(${Math.round(img[o] * k)},${Math.round(img[o + 1] * k)},${Math.round(img[o + 2] * k)})`; }
        } else if (V.style === "decode") {
          g = chars[Math.floor(hash(x, y, tick + Math.floor(r * 97)) * n)]; animated = V.flicker > 0;
        } else if (V.style === "binary") {
          // Each column falls at its own speed; the digit under the fall is bright, the rest fade with c.
          const sp = 0.5 + hash(x, 0, 9) * 1.5, head = ((now * V.flicker * 0.15 * sp + hash(x, 0, 4)) % 1) * rows;
          const near = Math.max(0, 1 - Math.abs(y - head) / 6);
          g = chars[Math.floor(hash(x, y, Math.floor(now * V.flicker * 0.5 * sp)) * n)]; animated = V.flicker > 0;
          ctx.fillStyle = `rgba(${gr},${gg},${gb},${(0.35 + 0.65 * Math.max(near, 1 - c)).toFixed(3)})`;
          ctx.fillText(g, px + cw / 2, py + ch / 2);
          continue;
        } else {
          g = chars[Math.min(n - 1, Math.floor((1 - c) * n))];
        }
        if (!g || g === " ") continue;
        ctx.fillStyle = col || V.glyph;
        ctx.fillText(g, px + cw / 2, py + ch / 2);
      }
    }
    return animated;
  }

  function frame(t) {
    const now = t / 1000;
    const ascii = V.style !== "checker";
    for (const L of layers) {
      const r = L.r;
      const live = r.canvas && r.canvas.isConnected && !r.done;
      const show = ascii && (live || V.scrub);
      if (r.canvas) r.canvas.style.visibility = ascii ? "hidden" : "";
      if (!show) { if (L.canvas.isConnected) L.canvas.remove(); continue; }
      if (!L.canvas.isConnected) { r.media.append(L.canvas); L.drawnP = -1; }
      size(L);
      const p = curve(Math.min(1, Math.max(0, V.scrub ? V.at : r.p)));
      if (!dirty && !L.anim && Math.abs(p - L.drawnP) < 0.002) continue;
      L.anim = draw(L, p, now) && p > 0 && p < 1;
      L.drawnP = p;
    }
    dirty = false;
    requestAnimationFrame(frame);
  }

  const replay = () => { const b = document.querySelector(".hm-panel [data-replay]"); if (b) b.click(); };
  const set = (k) => (v) => { V[k] = v; dirty = true; if (k === "cell" || k === "row") layers.forEach((L) => (L.drawnP = -1)); };
  const not = (...s) => (v) => !s.includes(v.style);
  const is = (...s) => (v) => s.includes(v.style);
  const def = {
    id: "home-ascii", title: "Reveal style", tab: "Motion",
    note: "How the cover on each card image clears. Timing comes from Selected works reveal; turn on Hold to look at one frame.",
    controls: [
      { key: "style", label: "Style", type: "select", options: STYLES, value: V.style, default: DEFAULTS.style, onInput: set("style") },
      { key: "edge", label: "Edge travels", type: "select", options: EDGES, value: V.edge, onInput: set("edge"), enabledWhen: not("checker") },
      { key: "chars", label: "Characters, sparse to dense", type: "text", value: V.chars, maxLength: 48, onInput: set("chars"), enabledWhen: is("ramp", "image", "decode"),
        hint: "Reverse the order to flip the ramp" },
      { key: "cell", label: "Character size", min: 4, max: 32, step: 1, unit: "px", value: V.cell, onInput: set("cell"), enabledWhen: not("checker") },
      { key: "row", label: "Row height", min: 1, max: 2.5, step: 0.05, unit: "x", value: V.row, onInput: set("row"), enabledWhen: not("checker") },
      { key: "band", label: "Edge width", min: 0.05, max: 1.5, step: 0.05, unit: "of image", value: V.band, onInput: set("band"), enabledWhen: not("checker") },
      { key: "ragged", label: "Ragged edge", min: 0, max: 1, step: 0.05, value: V.ragged, onInput: set("ragged"), enabledWhen: not("checker") },
      { key: "curve", label: "Progress curve", type: "select", options: CURVES, value: V.curve, onInput: set("curve"), enabledWhen: not("checker") },
      { key: "flicker", label: "Churn speed", min: 0, max: 40, step: 1, unit: "per s", value: V.flicker, onInput: set("flicker"), enabledWhen: is("decode", "binary") },
      { key: "glyph", label: "Character colour", type: "color", value: V.glyph, onInput: set("glyph"), enabledWhen: not("checker", "shade") },
      { key: "imageColour", label: "Characters take the image's colour", type: "toggle", value: V.imageColour, onInput: set("imageColour"), enabledWhen: is("image") },
      { key: "cover", label: "Cover colour", type: "color", value: V.cover, onInput: set("cover"), enabledWhen: not("checker") },
      { key: "weight", label: "Weight", type: "select", options: [["300", "Light"], ["500", "Medium"], ["700", "Bold"]], value: V.weight, onInput: set("weight"), enabledWhen: not("checker", "shade") },
      { key: "scrub", label: "Hold at a frame", type: "toggle", value: V.scrub, onInput: set("scrub"), enabledWhen: not("checker") },
      { key: "at", label: "Held at", min: 0, max: 1, step: 0.01, value: V.at, onInput: set("at"), enabledWhen: (v) => v.scrub && v.style !== "checker" },
    ],
    actions: [{ label: "Replay reveals", onClick: replay }],
  };

  let tries = 0;
  (function wait() {
    const hm = window.__hm;
    if (!hm || !hm.reveals) { if (++tries < 200) setTimeout(wait, 50); return; }
    reveals = hm.reveals;
    layers = reveals.filter((r) => r.media).map(makeLayer);
    addEventListener("resize", () => { dirty = true; });
    window.EditPanel ? window.EditPanel.register(def) : (window.EditPanelQueue ||= []).push(def);
    window.__asciiReveal = { V, layers, DEFAULTS, STYLES };
    requestAnimationFrame(frame);
  })();
})();
