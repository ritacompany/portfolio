// Haven on a phone: the whole page, not only the shared parts verify-responsive scopes to.
// Each width runs as a touch phone (isMobile, hasTouch, deviceScaleFactor 2) with motion on, scrolls
// the page from top to bottom the way a thumb does, waits for the reveals and then measures:
//   hscroll   the page scrolls sideways
//   hidden    a text block or media frame still hidden after the whole page has been scrolled past
//   size      text that renders under 12 px on screen (font size times any scale on its parents)
//   body      running paragraphs under 16 px
//   cut       visible text or image outside the screen, not inside a sideways scroller or data-bleed
//   blur      a raster image drawn wider than half its pixel width (not sharp at 2x)
//   tapflash  a link, button or tappable card that keeps the grey tap highlight
//   hover     a sticky hover (a phone keeps :hover on the last thing tapped) changes the colour,
//             background, border, filter, opacity, transform, underline or shadow of a target or its children
//   press     a link or button that looks the same pressed (:hover plus :active) as at rest
//   qlabel    a quiz pillar label off the screen, on another label or on an icon
// Usage: node reports/haven-mobile-2026-11-23/audit.mjs [--widths 320,360,375,390,430] [--only hover,size]
//        [--inject <css>]  adds a stylesheet after load
//        [--preview]  the proposal in site/dev/haven-phone: phone.css injected, haven.js swapped in
// Prints one line per finding and HAVEN_PHONE_OK when there are none.
import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const argv = process.argv.slice(2);
const opt = (n) => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null);
const widths = (opt("--widths") || "320,360,375,390,430").split(",").map(Number);
const only = opt("--only") ? opt("--only").split(",") : null;
const preview = argv.includes("--preview");
const inject = opt("--inject") || (preview ? "site/dev/haven-phone/phone.css" : null);
const want = (k) => !only || only.includes(k);
const repo = resolve(new URL("../..", import.meta.url).pathname);
const root = join(repo, opt("--root") || "site");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".mp4": "video/mp4", ".glb": "model/gltf-binary" };
const server = createServer((req, res) => {
  let p = resolve(join(root, normalize(decodeURIComponent(new URL(req.url, "http://x").pathname))));
  try { if (statSync(p).isDirectory()) p = join(p, "index.html"); } catch {}
  try { res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream" }).end(readFileSync(p)); } catch { res.writeHead(404).end(); }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/haven/`;
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const out = [];

for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: Math.round(w * 2.16) }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  // --preview: the proposed phone.css after load and the proposed haven.js in place of the shipped one.
  if (preview) await page.route("**/haven/haven.js", (route) => route.fulfill({ contentType: "text/javascript", body: readFileSync(join(repo, "site/dev/haven-phone/haven.js")) }));
  await page.goto(base, { waitUntil: "networkidle" });
  if (inject) await page.addStyleTag({ content: readFileSync(resolve(repo, inject), "utf8") });
  await page.evaluate(() => document.fonts.ready);
  // Scroll the way a thumb does: a screen at a time, with time for each reveal to fire.
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= H + 1000; y += Math.round(w * 1.2)) { await page.evaluate((y) => scrollTo(0, y), y); await page.waitForTimeout(160); }
  await page.waitForTimeout(2600);
  const at = `@${w}`;

  const found = await page.evaluate(({ w }) => {
    const r = [];
    const vw = document.documentElement.clientWidth;
    const name = (e) => {
      const c = typeof e.className === "string" ? e.className.trim().split(/\s+/)[0] : "";
      const t = (e.getAttribute("alt") || e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 36);
      return `<${e.tagName.toLowerCase()}${c ? "." + c : ""}> "${t}"`;
    };
    const hiddenUp = (e) => { for (let a = e; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return true; } return false; };
    const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const skip = (e) => e.closest(".visually-hidden, .skip-link, [aria-hidden=true] svg, .pill-tips, script, style, noscript, .menu");
    if (document.documentElement.scrollWidth > vw) r.push(["hscroll", `page is ${document.documentElement.scrollWidth} wide on a ${vw} screen`]);
    const goneUp = (e) => { for (let a = e; a; a = a.parentElement) if (getComputedStyle(a).display === "none") return true; return false; };
    for (const e of document.querySelectorAll(".tb-item")) if (!skip(e) && !goneUp(e) && (+getComputedStyle(e).opacity < 1 || getComputedStyle(e).visibility === "hidden")) r.push(["hidden", `${name(e)} still hidden (opacity ${getComputedStyle(e).opacity})`]);
    for (const e of document.querySelectorAll("[data-mask]")) if (!goneUp(e) && e.dataset.revealDone !== "true") r.push(["hidden", `media frame ${name(e)} never revealed`]);
    // Product of every parent's transform scale and zoom, so a 1440 row scaled to a phone counts at its screen size.
    const scaleOf = (e) => { let k = 1; for (let a = e; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.transform !== "none") { const m = new DOMMatrix(cs.transform); k *= Math.hypot(m.a, m.b); } const z = parseFloat(cs.zoom); if (z) k *= z; } return k; };
    for (const e of document.body.querySelectorAll("*")) {
      if (!ownText(e) || skip(e) || hiddenUp(e)) continue;
      const b = e.getBoundingClientRect(); if (b.width < 1 || b.height < 1) continue;
      const fs = parseFloat(getComputedStyle(e).fontSize) * scaleOf(e);
      if (fs < 11.95) r.push(["size", `${name(e)} renders at ${fs.toFixed(1)} px`]);
      if (e.tagName === "P" && e.textContent.trim().length > 90 && fs < 15.95) r.push(["body", `${name(e)} paragraph at ${fs.toFixed(1)} px`]);
      let sc = false;
      for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const ox = getComputedStyle(a).overflowX; if (ox === "auto" || ox === "scroll") { sc = true; break; } }
      if (!sc && !e.closest("[data-bleed], .ticker, .page-header")) {
        const rg = document.createRange(); rg.selectNodeContents(e);
        for (const q of rg.getClientRects()) if (q.width > 1 && (q.left < -1 || q.right > vw + 1)) { r.push(["cut", `${name(e)} text spans ${q.left.toFixed(0)} to ${q.right.toFixed(0)}`]); break; }
      }
    }
    for (const i of document.images) {
      if (hiddenUp(i) || /\.svg(\?|$)/.test(i.currentSrc)) continue;
      const b = i.getBoundingClientRect(); if (b.width < 2) continue;
      const fit = getComputedStyle(i).objectFit;
      // Drawn size of the bitmap: with cover the image is scaled to the larger ratio.
      const k = Math.max(b.width / i.naturalWidth, b.height / i.naturalHeight);
      const drawnW = fit === "cover" ? i.naturalWidth * k : b.width;
      const dpp = i.naturalWidth / drawnW;
      if (dpp < 1.95) r.push(["blur", `${i.getAttribute("src")} drawn ${drawnW.toFixed(0)} px wide from ${i.naturalWidth} px (${dpp.toFixed(2)}x)`]);
    }
    for (const e of document.querySelectorAll("a[href], button, [role=button], [tabindex='0'], .end-card, .pill")) {
      if (hiddenUp(e) || skip(e)) continue;
      const t = getComputedStyle(e).webkitTapHighlightColor;
      if (t && !/rgba\(0, 0, 0, 0\)|transparent/.test(t)) r.push(["tapflash", `${name(e)} tap highlight ${t}`]);
    }
    const L = [...document.querySelectorAll(".qcol__label")].map((e) => e.getBoundingClientRect());
    const I = [...document.querySelectorAll(".qcol__icon")].map((e) => e.getBoundingClientRect());
    const hit = (a, c) => a.left < c.right && c.left < a.right && a.top < c.bottom && c.top < a.bottom;
    L.forEach((a, i) => {
      if (a.left < 0 || a.right > vw) r.push(["qlabel", `quiz label ${i} spans ${a.left.toFixed(0)} to ${a.right.toFixed(0)}`]);
      L.forEach((c, j) => { if (j > i && hit(a, c)) r.push(["qlabel", `quiz labels ${i} and ${j} overlap`]); });
      I.forEach((c, k) => { if (hit(a, c)) r.push(["qlabel", `quiz label ${i} sits on icon ${k}`]); });
    });
    return r;
  }, { w });
  for (const [k, m] of found) if (want(k)) out.push(`${at} ${k}: ${m}`);

  if (want("hover") || want("press")) {
    // A phone keeps :hover on whatever was tapped last (iOS until the next tap elsewhere), so the
    // check forces :hover on every target through DevTools and compares it with rest after any
    // transition. Then it forces :hover plus :active, the press, which must still look different.
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    await page.evaluate(() => {
      const els = [...document.querySelectorAll("a[href], button, .pill, .end-bg, .context, [tabindex='0']")].filter((e) => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 1 && cs.visibility !== "hidden" && !e.closest(".skip-link, .visually-hidden, .pill-tips"); });
      els.forEach((e, i) => e.setAttribute("data-audit-tap", i));
    });
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
    const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "[data-audit-tap]" });
    const snap = () => page.evaluate(() => [...document.querySelectorAll("[data-audit-tap]")].map((e) => [e, ...e.querySelectorAll("*")].slice(0, 12).map((x) => { const c = getComputedStyle(x); return [c.color, c.backgroundColor, c.borderTopColor, c.filter, c.opacity, c.transform, c.textDecorationLine, c.boxShadow, c.webkitTextStrokeWidth, c.webkitFontSmoothing].join("|"); }).join(" ; ")));
    const labels = await page.evaluate(() => [...document.querySelectorAll("[data-audit-tap]")].map((e) => { const c = typeof e.className === "string" ? e.className.trim().split(/\s+/)[0] : ""; return `<${e.tagName.toLowerCase()}${c ? "." + c : ""}> "${(e.getAttribute("aria-label") || e.textContent).trim().replace(/\s+/g, " ").slice(0, 32)}"`; }));
    const presses = await page.evaluate(() => [...document.querySelectorAll("[data-audit-tap]")].map((e) => e.matches("a[href], button")));
    const force = async (cls) => { for (const id of nodeIds) await cdp.send("CSS.forcePseudoState", { nodeId: id, forcedPseudoClasses: cls }); await page.waitForTimeout(900); };
    const rest = await snap();
    await force(["hover"]); const hov = await snap();
    await force(["hover", "active"]); const prs = await snap();
    await force([]);
    rest.forEach((v, i) => {
      if (want("hover") && v !== hov[i]) out.push(`${at} hover: ${labels[i]} changes under a sticky hover`);
      if (want("press") && presses[i] && v === prs[i]) out.push(`${at} press: ${labels[i]} gives no press feedback`);
    });
  }
  await ctx.close();
}
await browser.close(); server.close();
for (const l of out) console.log(l);
console.log(out.length ? `${out.length} finding(s)` : "HAVEN_PHONE_OK");
process.exit(out.length ? 1 : 0);
