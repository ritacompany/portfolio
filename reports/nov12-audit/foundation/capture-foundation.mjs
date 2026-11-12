// Captures the media entrance on the real framework page, frame by frame, by seeking the Web Animation.
// node capture.mjs <width> <height> <figmaNode> <variant> <outdir>
// variant: haven (1.3 settle), s108 (1.08 settle), curtain (no scale), stats (pixel stats only)
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
const SITE = "/Users/chadwickfenner/Code/portfolio-site";
const { chromium } = await import(pathToFileURL(SITE + "/node_modules/playwright/index.mjs").href);
const [W, H, NODE, VARIANT, OUT] = process.argv.slice(2);
const root = SITE + "/site";
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const body = await readFile(path.join(root, p));
    res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +W, height: +H } });
await page.goto(`http://127.0.0.1:${server.address().port}/mondai/framework/`, { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__mm);
await mkdir(OUT, { recursive: true });

if (VARIANT === "stats") {
  // Edge band (what the 1.3 settle hides at its start) against the centre, plus page background
  const stats = await page.evaluate(async () => {
    const out = {};
    for (const img of document.querySelectorAll(".fw-sec > img.fig")) {
      const im = new Image(); im.src = img.src; await im.decode();
      const w = 400, h = Math.round(400 * im.naturalHeight / im.naturalWidth);
      const c = new OffscreenCanvas(w, h), x = c.getContext("2d"); x.drawImage(im, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h).data; const side = 0.5 * (1 - 1 / 1.3);
      const acc = { band: [0, 0, 0, 0], inner: [0, 0, 0, 0] };
      const lums = { band: [], inner: [] };
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
        const k = (j * w + i) * 4, r = d[k] / 255, g = d[k + 1] / 255, b = d[k + 2] / 255;
        const L = 0.2126 * r + 0.7152 * g + 0.0722 * b, C = Math.max(r, g, b) - Math.min(r, g, b);
        const fx = i / w, fy = j / h, key = fx < side || fx > 1 - side || fy < side || fy > 1 - side ? "band" : "inner";
        acc[key][0] += L; acc[key][1] += C; acc[key][2]++; if (C > 0.25) acc[key][3]++;
      }
      const r = img.getBoundingClientRect();
      out[img.dataset.figmaNode + " " + img.src.split("/").pop()] = {
        cssW: Math.round(r.width), cssH: Math.round(r.height), left: Math.round(r.left + scrollX),
        widthShare: +(r.width / innerWidth).toFixed(2), heightShare: +(r.height / innerHeight).toFixed(2),
        bandLum: +(acc.band[0] / acc.band[2]).toFixed(3), bandChroma: +(acc.band[1] / acc.band[2]).toFixed(3),
        bandVivid: +(acc.band[3] / acc.band[2]).toFixed(3),
        innerLum: +(acc.inner[0] / acc.inner[2]).toFixed(3), innerChroma: +(acc.inner[1] / acc.inner[2]).toFixed(3),
        cropPxW: Math.round(r.width * (1 - 1 / 1.3)), cropPxH: Math.round(r.height * (1 - 1 / 1.3)),
      };
    }
    return out;
  });
  console.log(JSON.stringify(stats, null, 1));
  await browser.close(); server.close(); process.exit(0);
}

const img = page.locator(`[data-figma-node="${NODE}"]`);
await img.evaluate((el) => { el.loading = "eager"; return el.decode(); });
await page.evaluate((id) => {
  const el = document.querySelector(`[data-figma-node="${id}"]`);
  const sec = el.closest("section");
  const r = sec.getBoundingClientRect(), y = scrollY + el.getBoundingClientRect().top;
  const target = Math.max(0, y - innerHeight * 0.45);
  if (window.__mm.lenis) window.__mm.lenis.scrollTo(target, { immediate: true, force: true });
  window.scrollTo(0, target);
}, NODE);
await page.waitForTimeout(3000);
await page.evaluate(({ id, v }) => {
  const el = document.querySelector(`[data-figma-node="${id}"]`);
  const sec = el.closest("section");
  // Replay the section text too, as a reader arriving would see it
  const texts = [...sec.children].filter((c) => c !== el);
  const anims = [];
  const bez = (x1, y1, x2, y2) => { const c = (a, b, t) => ((1 - 3 * b + 3 * a) * t + (3 * b - 6 * a)) * t * t + 3 * a * t; const d = (a, b, t) => 3 * (1 - 3 * b + 3 * a) * t * t + 2 * (3 * b - 6 * a) * t + 3 * a; return (x) => { let t = x; for (let i = 0; i < 8; i++) { const e = c(x1, x2, t) - x, s = d(x1, x2, t); if (Math.abs(e) < 1e-6 || !s) break; t -= e / s; } return c(y1, y2, Math.min(1, Math.max(0, t))); }; };
  texts.forEach((t, i) => { t.getAnimations().forEach((a) => a.cancel()); anims.push(t.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1400, delay: Math.min(i, 4) * 150, easing: "cubic-bezier(0.5, 1, 0.89, 1)", fill: "both" })); });
  el.getAnimations().forEach((a) => a.cancel());
  el.style.clipPath = "none"; el.style.transform = "none";
  const step = texts.length ? Math.min(texts.length, 4) * 150 : 0;
  if (v === "wipe") {
    const ease = bez(0.76, 0, 0.24, 1), f = [];
    for (let i = 0; i <= 48; i++) { const t = i / 48; f.push({ offset: t, clipPath: `inset(0 ${100 * (1 - ease(t))}% 0 0)` }); }
    anims.push(el.animate(f, { duration: 1200, easing: "linear", fill: "both" }));
  } else if (v === "still") {
    // The diagram is simply there; only the words around it arrive
  } else {
    const bands = v === "rows" ? [[0, 0.41], [0.41, 0.71], [0.71, 1]].map(([a, b]) => `inset(${a * 100}% 0 ${(1 - b) * 100}% 0)`)
      : [[0, 0.162], [0.162, 0.373], [0.373, 0.585], [0.585, 0.796], [0.796, 1]].map(([a, b]) => `inset(0 ${(1 - b) * 100}% 0 ${a * 100}%)`);
    el.style.visibility = "hidden";
    bands.forEach((clip, i) => {
      const c = el.cloneNode(); c.removeAttribute("data-figma-node"); c.style.visibility = "visible"; c.style.clipPath = clip; c.className = "fig mm-band"; if (getComputedStyle(sec).position === "static") sec.style.position = "relative"; const er = el.getBoundingClientRect(), sr = sec.getBoundingClientRect(); for (const [k, v] of Object.entries({ position: "absolute", margin: "0", left: (er.left - sr.left) + "px", top: (er.top - sr.top) + "px", width: er.width + "px", height: er.height + "px" })) c.style.setProperty(k, v, "important");
      el.after(c);
      anims.push(c.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 1000, delay: step + i * 160, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }));
    });
  }
  anims.forEach((a) => a.pause());
  window.__as = anims;
}, { id: NODE, v: VARIANT });
const FPS = 30, N = 2.4 * FPS;
for (let i = 0; i <= N; i++) {
  await page.evaluate((ms) => { window.__as.forEach((a) => { a.currentTime = ms; }); }, (i / FPS) * 1000);
  await page.screenshot({ path: `${OUT}/f${String(i).padStart(3, "0")}.png` });
}
await browser.close(); server.close();
