// Gates for the site cursor (docs/motion/site-cursor/GATES.md). Serves site/ and drives Chromium.
//   node scripts/check-cursor.mjs <G1|G2|G3|control|G4|G5|G6|all> [--page /]
// Each gate prints "<gate> PASS" only after every assertion holds, otherwise "<gate> FAIL: <why>" and exits 1.
// While the cursor is a proposal in site/dev/preview, a page that does not load it gets site-cursor.css and
// site-cursor.js injected, the same files the preview build adds to every page.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../site");
const argv = process.argv.slice(2);
const which = argv[0] || "all";
const PAGE = argv.includes("--page") ? argv[argv.indexOf("--page") + 1] : "/";
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
  try { if ((await stat(f)).isDirectory()) f = path.join(f, "index.html"); res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" }); res.end(await readFile(f)); }
  catch { res.writeHead(404).end("not found"); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();

const NEUTRAL_100 = "rgb(232, 231, 238)", NEUTRAL_900 = "rgb(4, 4, 5)";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
class Fail extends Error {}
const must = (ok, why) => { if (!ok) throw new Fail(why); };

async function open(opts = {}, page = PAGE) {
  const ctx = await browser.newContext({ viewport: { width: opts.width || 1440, height: opts.height || 900 }, reducedMotion: opts.reduced ? "reduce" : "no-preference", hasTouch: !!opts.touch, isMobile: !!opts.touch });
  const pg = await ctx.newPage();
  const errors = [];
  pg.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  pg.on("pageerror", (e) => errors.push(String(e)));
  await pg.goto(BASE + page, { waitUntil: "load" });
  const has = await pg.evaluate(() => !!window.SiteCursor);
  if (!has) {
    await pg.addStyleTag({ url: "/dev/preview/site-cursor.css" });
    await pg.addScriptTag({ url: "/dev/preview/site-cursor.js" });
  }
  await pg.evaluate(() => document.fonts.ready);
  await wait(100);
  return { ctx, pg, errors };
}
const media = async (pg) => {
  await pg.locator(".work-card-mondai .work-card__media").scrollIntoViewIfNeeded();
  await wait(300);
  return pg.locator(".work-card-mondai .work-card__media").boundingBox();
};
const cursor = (pg) => pg.evaluate(() => {
  const r = document.querySelector(".site-cursor");
  if (!r) return null;
  const cs = (el) => getComputedStyle(el), p = r.querySelector(".site-cursor__shape"), l = r.querySelector(".site-cursor__label");
  const pr = p.getBoundingClientRect();
  return { state: r.dataset.state, shown: cs(r).opacity, label: l.textContent, labelOpacity: cs(l).opacity,
    pill: { opacity: cs(r).opacity, shadow: cs(p).boxShadow, bg: cs(p).backgroundColor, color: cs(p).color, transform: cs(p).transform, w: pr.width, h: pr.height },
    dot: { opacity: cs(r).opacity, w: pr.width, h: pr.height, shadow: cs(p).boxShadow }, transform: r.style.transform,
    durations: [r, p, l].map((el) => cs(el).transitionDuration) };
});

const gates = {
  async G1() {
    const { ctx, pg } = await open();
    const b = await media(pg);
    await pg.mouse.move(b.x + b.width * 0.3, b.y + b.height * 0.3);
    await pg.mouse.move(b.x + b.width * 0.5, b.y + b.height * 0.5, { steps: 5 });
    await wait(700);
    let c = await cursor(pg);
    must(c, "no cursor element at 1440");
    must(c.state === "pill", `state over media is ${c.state}`);
    must(c.label === "Learn more" && c.labelOpacity === "1", `label "${c.label}" at opacity ${c.labelOpacity}`);
    must(c.pill.opacity === "1", "pill not visible");
    must(c.pill.shadow.includes(NEUTRAL_100) && /inset/.test(c.pill.shadow) && /\b3px\b/.test(c.pill.shadow), `outline ${c.pill.shadow}`);
    must(c.pill.bg === "rgba(0, 0, 0, 0)", `pill fill ${c.pill.bg}`);
    must(c.pill.color === NEUTRAL_100, `pill text ${c.pill.color}`);
    // Size check against the real small button: same box.
    const btn = await pg.evaluate(() => { const r = document.querySelector(".work-card-mondai .button-sm").getBoundingClientRect(); const p = document.querySelector(".site-cursor__shape").getBoundingClientRect(); return { bw: r.width, bh: r.height, pw: p.width, ph: p.height }; });
    must(Math.abs(btn.pw - btn.bw) <= 1 && Math.abs(btn.ph - btn.bh) <= 1, `pill ${btn.pw}x${btn.ph} vs small button ${btn.bw}x${btn.bh}`);
    // Outside the card: the dot.
    await pg.mouse.move(b.x + b.width + 4, b.y - 60, { steps: 4 });
    await wait(700);
    c = await cursor(pg);
    must(c.state === "dot", `state outside is ${c.state}`);
    must(c.dot.opacity === "1" && Math.abs(c.dot.w - 24) < 0.6 && Math.abs(c.dot.h - 24) < 0.6, `dot ${c.dot.w}x${c.dot.h} opacity ${c.dot.opacity}`);
    must(c.dot.shadow.includes("rgb(255, 255, 255)") && /12px 24px/.test(c.dot.shadow), `dot colour and drop shadow ${c.dot.shadow}`);
    must(c.label === "Learn more" && c.labelOpacity === "0", "label still showing outside");
    await ctx.close();
    return `pill ${btn.pw.toFixed(1)}x${btn.ph.toFixed(1)} vs button ${btn.bw.toFixed(1)}x${btn.bh.toFixed(1)}; dot ${c.dot.w.toFixed(1)}px`;
  },
  // Every press option must end in the same look: the pill reads as Neutral/100 with Neutral/900 text,
  // scaled 0.98. Judged from pixels, so it holds whichever layer draws the white.
  // The dot against the reference itself, measured live, so this compares to the source and not to numbers
  // copied from it: size, fill, radius and drop shadow at rest away from any card.
  async REF() {
    const rc = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const rp = await rc.newPage();
    await rp.goto("https://cursors.framer.wiki/", { waitUntil: "networkidle", timeout: 60000 });
    await rp.mouse.move(380, 520); await rp.mouse.move(400, 530); await wait(900);
    const ref = await rp.evaluate(() => { const el = document.querySelector(".framer-pointer-events-none"); if (!el) return null; const r = el.getBoundingClientRect(), cs = getComputedStyle(el); return { w: r.width, h: r.height, bg: cs.backgroundColor, shadow: cs.boxShadow }; });
    await rc.close();
    must(ref, "reference cursor element not found on cursors.framer.wiki");
    const { ctx, pg } = await open();
    await pg.mouse.move(200, 200); await pg.mouse.move(220, 210); await wait(500);
    const ours = await pg.evaluate(() => { const el = document.querySelector(".site-cursor__shape"), r = el.getBoundingClientRect(), cs = getComputedStyle(el); return { w: r.width, h: r.height, shadow: cs.boxShadow }; });
    await ctx.close();
    must(Math.abs(ours.w - ref.w) < 0.6 && Math.abs(ours.h - ref.h) < 0.6, `size ${ours.w}x${ours.h} vs reference ${ref.w}x${ref.h}`);
    must(ours.shadow.includes(ref.bg), `fill: ours ${ours.shadow} lacks reference ${ref.bg}`);
    const drop = ref.shadow.replace(/\s+/g, " ");
    must(ours.shadow.replace(/\s+/g, " ").includes(drop), `drop shadow: reference ${drop}, ours ${ours.shadow}`);
    return `reference ${ref.w}px ${ref.bg} / ${drop}; ours ${ours.w}px`;
  },
  async G2() {
    const notes = [];
    for (const style of ["ripple", "ping", "squeeze"]) {
      const { ctx, pg } = await open();
      await pg.evaluate((st) => window.SiteCursor.set({ pressStyle: st }), style);
      const b = await media(pg);
      await pg.mouse.move(b.x + b.width * 0.5, b.y + b.height * 0.5, { steps: 5 });
      await wait(700);
      await pg.mouse.down();
      await wait(500);
      const c = await cursor(pg);
      must(c.state === "pill", `${style}: state ${c.state}`);
      const m = c.pill.transform.match(/matrix\(([-\d.e]+), [-\d.e]+, [-\d.e]+, ([-\d.e]+)/);
      must(m && Math.abs(+m[1] - 0.98) < 0.002 && Math.abs(+m[2] - 0.98) < 0.002, `${style}: press transform ${c.pill.transform}`);
      const r = await pg.evaluate(() => { const q = document.querySelector(".site-cursor__shape").getBoundingClientRect(); return { x: q.x, y: q.y, w: q.width, h: q.height }; });
      const png = await pg.screenshot({ clip: { x: r.x + 8, y: r.y + 6, width: r.w - 16, height: r.h - 12 } });
      const px = await pg.evaluate(async (b64) => {
        const img = await createImageBitmap(await (await fetch("data:image/png;base64," + b64)).blob());
        const cv = new OffscreenCanvas(img.width, img.height), g = cv.getContext("2d"); g.drawImage(img, 0, 0);
        const d = g.getImageData(0, 0, img.width, img.height).data; let light = 0, dark = 0, n = d.length / 4;
        for (let i = 0; i < d.length; i += 4) { const [R, G, B] = [d[i], d[i + 1], d[i + 2]];
          if (Math.abs(R - 232) < 10 && Math.abs(G - 231) < 10 && Math.abs(B - 238) < 10) light++;
          else if (R < 40 && G < 40 && B < 40) dark++; }
        return { light: light / n, dark: dark / n };
      }, png.toString("base64"));
      must(px.light > 0.55 && px.dark > 0.08, `${style}: pill not Neutral/100 with dark text when pressed (light ${px.light.toFixed(2)}, dark ${px.dark.toFixed(2)})`);
      const nav = pg.waitForURL(/\/mondai\/$/, { timeout: 5000 });
      await pg.mouse.up();
      await nav;
      notes.push(`${style} light ${px.light.toFixed(2)} dark ${px.dark.toFixed(2)} scale ${m[1]} -> ${new URL(pg.url()).pathname}`);
      await ctx.close();
    }
    return notes.join("; ");
  },
  async G3() {
    const out = [];
    // At 390 the phone layout hides the overlay button by design (home.css, the phone block) and shows
    // the Learn more link under the card, so there only the cursor's absence is checked.
    for (const width of [1440, 1024, 390]) {
      const { ctx, pg } = await open({ touch: true, width });
      const b = await media(pg);
      await pg.touchscreen.tap(b.x + 4, b.y - 80 > 0 ? b.y - 80 : b.y + 4).catch(() => {});
      await wait(300);
      const r = await pg.evaluate(() => {
        const s = document.querySelector(".work-card-mondai .work-card__media .button-sm"), cs = getComputedStyle(s), rect = s.getBoundingClientRect();
        return { el: !!document.querySelector(".site-cursor"), cls: document.documentElement.classList.contains("has-site-cursor"), pointer: matchMedia("(pointer: coarse)").matches, op: cs.opacity, vis: cs.visibility, disp: cs.display, w: rect.width };
      });
      must(r.pointer, `coarse pointer not emulated at ${width}`);
      must(!r.el && !r.cls, `custom cursor rendered on touch at ${width}`);
      if (width >= 768) {
        must(r.op === "1" && r.vis === "visible" && r.disp !== "none" && r.w > 0, `static Learn more hidden on touch at ${width}: opacity ${r.op} display ${r.disp}`);
        out.push(`${width}: no cursor, static Learn more ${r.w.toFixed(0)}px wide`);
      } else out.push(`${width}: no cursor (phone layout shows the link under the card)`);
      await ctx.close();
    }
    return out.join("; ");
  },
  async control() {
    const { ctx, pg } = await open();
    await pg.mouse.move(300, 300); await pg.mouse.move(320, 320);
    await wait(200);
    const r = await pg.evaluate(() => ({ el: !!document.querySelector(".site-cursor"), cls: document.documentElement.classList.contains("has-site-cursor") }));
    must(r.el && r.cls, "the detector did not find the cursor on a fine pointer");
    await ctx.close();
    return "fine pointer: cursor element found";
  },
  async G4() {
    const { ctx, pg } = await open();
    await pg.mouse.move(200, 200);
    let ok = false;
    for (let i = 0; i < 40 && !ok; i++) {
      await pg.keyboard.press("Tab");
      ok = await pg.evaluate(() => document.activeElement && document.activeElement.matches(".work-card-mondai"));
    }
    must(ok, "Tab never reached the Mondai card");
    await wait(500);
    const r = await pg.evaluate(() => {
      const card = document.activeElement, m = card.querySelector(".work-card__media"), s = m.querySelector(".button-sm");
      const mr = m.getBoundingClientRect(), sr = s.getBoundingClientRect(), cs = getComputedStyle(s);
      return { fv: card.matches(":focus-visible"), cls: document.documentElement.classList.contains("has-site-cursor"), op: cs.opacity, left: sr.left - mr.left, top: sr.top - mr.top, mw: mr.width, mh: mr.height, cl: parseFloat(cs.left), ct: parseFloat(cs.top) };
    });
    must(r.fv, "card is not :focus-visible");
    must(r.cls, "custom cursor not running, so this would not test the hide and show");
    must(r.op === "1", `static Learn more opacity ${r.op} on focus`);
    const ex = (r.mw * 343.39) / 879, ey = (r.mh * 250.87) / 575.28;
    must(Math.abs(r.cl - ex) < 1 && Math.abs(r.ct - ey) < 1, `offset ${r.cl},${r.ct} vs Figma ${ex.toFixed(2)},${ey.toFixed(2)}`);
    await ctx.close();
    return `focus-visible, opacity 1, left ${r.cl.toFixed(2)} top ${r.ct.toFixed(2)} (Figma ${ex.toFixed(2)}, ${ey.toFixed(2)})`;
  },
  async G5() {
    const { ctx, pg } = await open({ reduced: true });
    await pg.mouse.move(200, 200); await wait(100);
    await pg.mouse.move(700, 160);
    await pg.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    let c = await cursor(pg);
    must(c.transform.includes("700px, 160px"), `position after one frame ${c.transform}`);
    must(c.durations.every((d) => d.split(",").every((x) => parseFloat(x) === 0)), `transition durations ${c.durations.join(" | ")}`);
    const b = await media(pg);
    await pg.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await pg.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    c = await cursor(pg);
    must(c.state === "pill" && /\b3px\b/.test(c.pill.shadow) && c.pill.w > 150 && c.labelOpacity === "1", `pill not at rest after one frame: ${c.pill.w}px ${c.pill.shadow} ${c.labelOpacity}`);
    await ctx.close();
    return "cursor on the pointer after one frame, all durations 0s, pill at rest at once";
  },
  async G6() {
    const out = [];
    for (const width of [1440, 1200, 967, 768, 390]) {
      const { ctx, pg, errors } = await open({ width }, "/");
      await pg.mouse.move(width / 2, 300);
      const b = await media(pg);
      if (width >= 768) { await pg.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 }); await wait(400); }
      const r = await pg.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
      must(r.sw <= r.iw, `horizontal overflow at ${width}: ${r.sw} > ${r.iw}`);
      must(errors.length === 0, `console errors at ${width}: ${errors.join(" | ")}`);
      out.push(`${width}:${r.sw}`);
      await ctx.close();
    }
    return "scrollWidth " + out.join(" ");
  },
};

let failed = 0;
for (const g of which === "all" ? Object.keys(gates) : [which]) {
  if (!gates[g]) { console.log(`unknown gate ${g}`); failed++; continue; }
  try { const note = await gates[g](); console.log(`${g === "control" ? "CONTROL" : g} PASS ${note}`); }
  catch (e) { failed++; console.log(`${g === "control" ? "CONTROL" : g} FAIL: ${e.message}`); }
}
await browser.close(); server.close();
process.exit(failed ? 1 : 0);
