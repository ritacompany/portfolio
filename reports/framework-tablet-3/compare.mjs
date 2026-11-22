// Haven against the framework page at one width: every visible text or media block in reading order, per
// section, with its type (size, line height, weight), its width, its left edge and the gap from the block
// above it in the same column. Text boxes are measured as rendered (no trim), the same way on both pages,
// so the two can be compared like for like.
// Usage: node reports/framework-tablet-3/compare.mjs <width> [motion]   (prints Haven, then the framework page)
import { serve, chromium } from "../framework-tablet-2/serve.mjs";
const [w = "768", motion] = process.argv.slice(2);
const { server, base } = await serve();
const b = await chromium.launch();
for (const path of ["/haven/", "/mondai/framework/"]) {
  const page = await b.newPage({ viewport: { width: +w, height: 1000 }, reducedMotion: motion ? "no-preference" : "reduce" });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
  await page.waitForTimeout(600);
  const text = await page.evaluate(() => {
    const R = (e) => e.getBoundingClientRect();
    const vis = (e) => { const r = R(e), s = getComputedStyle(e); return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none"; };
    const ownText = (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    const media = (e) => /^(IMG|VIDEO|CANVAS|svg)$/.test(e.tagName) && R(e).width > 60;
    const main = document.querySelector("main") || document.body;
    const secs = [...main.querySelectorAll("section, header.hero, .hero")].filter((s, i, a) => vis(s) && !a.some((o) => o !== s && o.contains(s)));
    const out = [`PAGE ${location.pathname} vw ${innerWidth} scrollW ${document.documentElement.scrollWidth}`];
    for (const s of secs) {
      const sr = R(s);
      const blocks = [...s.querySelectorAll("*")].filter((e) => vis(e) && (ownText(e) || media(e)) && !e.closest("button, .pill, .wires__list, .ticker, .stats, .flow, .quiz__stage, .ending__cards, .roles, .week, svg *"));
      // keep the outermost block of each text run (a <b> inside a <p> belongs to the <p>)
      const top = blocks.filter((e) => !blocks.some((o) => o !== e && o.contains(e)));
      out.push(`SEC ${(s.getAttribute("aria-label") || s.className || s.tagName).toString().slice(0, 40)} h ${Math.round(sr.height)} padT ${getComputedStyle(s).paddingTop} padB ${getComputedStyle(s).paddingBottom}`);
      const boxes = top.map((e) => ({ e, r: R(e) }));
      for (const { e, r } of boxes) {
        let above = null;
        for (const o of boxes) if (o.e !== e && o.r.bottom <= r.top + 0.5 && o.r.left < r.right - 1 && o.r.right > r.left + 1 && (!above || o.r.bottom > above.r.bottom)) above = o;
        const st = getComputedStyle(e);
        const gap = above ? `${Math.round(r.top - above.r.bottom)}` : `top ${Math.round(r.top - sr.top)}`;
        const type = media(e) ? "MEDIA" : `${parseFloat(st.fontSize)}/${st.lineHeight === "normal" ? "n" : parseFloat(st.lineHeight)} w${st.fontWeight}`;
        out.push(`  ${type.padEnd(16)} x ${String(Math.round(r.left)).padStart(4)} w ${String(Math.round(r.width)).padStart(4)} gap ${gap.padStart(6)} | ${(e.className && typeof e.className === "string" ? e.className.split(" ")[0] : e.tagName.toLowerCase()).padEnd(14)} ${media(e) ? "" : e.textContent.trim().slice(0, 30)}`);
      }
      const last = Math.max(...boxes.map((o) => o.r.bottom), sr.top);
      out.push(`  bottom space ${Math.round(sr.bottom - last)}`);
    }
    return out.join("\n");
  });
  console.log(text + "\n");
  await page.close();
}
await b.close();
server.close();
