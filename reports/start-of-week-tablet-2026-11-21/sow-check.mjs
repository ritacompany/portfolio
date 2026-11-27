// Start of week carousel at tablet, 21 Nov. Usage: node sow-check.mjs [url] [--baseline]
//  --baseline writes baseline.json (stage, card and caption rects at 390 and 1440, every template).
//  Otherwise asserts:
//   S1 768, 1024, 1150: the center card is drawn at its desktop size (scale 1: rendered width = its width attribute).
//   S2 768, 1024, 1150, 1440: the stage has the edge fade, symmetric, outer stop and clear point at the widths
//      the formula gives (his Recalibration tablet frame at 704, his desktop frame at 1017), colour = page fill.
//   S3 390: no fade; 390 and 1440 card, stage, dots and caption rects equal baseline.json within 0.5 px.
//   S4 every width, every template: no empty gap: the caption hugs its text (height = sum of children and
//      margins), dots sit 40 under the stage, the caption ends where the section padding starts.
//   S5 768: the side cards show at both edges (template 3 centred), at least 30 px of each.
// Prints SOW_CHECK_OK when all pass.
import { createRequire } from "node:module";
import fs from "node:fs";
const { chromium } = createRequire(import.meta.url)("playwright");
const args = process.argv.slice(2), base = args.includes("--baseline");
const url = args.find((a) => a.startsWith("http")) || "http://localhost:4318/mondai/framework/";
const dir = new URL(".", import.meta.url).pathname, bpath = dir + "baseline.json";
const fails = []; let n = 0;
const ok = (c, m) => { n++; if (!c) fails.push(m); };
const b = await chromium.launch();
async function open(w) {
  const p = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: "reduce" });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.locator(".sow").scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  return p;
}
const go = (p, i) => p.evaluate((i) => document.querySelectorAll(".sow__dot")[i].click(), i).then(() => p.waitForTimeout(400));
const rects = (p) => p.evaluate(() => {
  const r = (e) => { const b = e.getBoundingClientRect(); return [b.x, b.y + scrollY, b.width, b.height].map((v) => +v.toFixed(2)); };
  const s = document.querySelector(".sow");
  return { stage: r(s.querySelector(".sow__stage")), dots: r(s.querySelector(".sow__dots")), cap: r(s.querySelector(".sow__cap")),
    desc: r(s.querySelector(".sow__desc")), cards: [...s.querySelectorAll(".sow__card")].map(r) };
});
const fade = (p) => p.evaluate(() => {
  const st = document.querySelector(".sow__stage"), cs = getComputedStyle(st, "::after");
  return { bg: cs.backgroundImage, content: cs.content, W: st.getBoundingClientRect().width / (parseFloat(getComputedStyle(document.querySelector(".fw")).zoom) || 1),
    page: getComputedStyle(document.body).backgroundColor };
});
const out = {};
for (const w of [390, 768, 1024, 1150, 1440]) {
  const p = await open(w);
  const per = [];
  for (let i = 0; i < 5; i++) { await go(p, i); per.push(await rects(p)); }
  if (base) { if (w === 390 || w === 1440) out[w] = per; await p.close(); continue; }
  // S1
  if ([768, 1024, 1150].includes(w)) {
    for (let i = 0; i < 5; i++) {
      await go(p, i);
      const sc = await p.evaluate((i) => { const c = document.querySelectorAll(".sow__card")[i]; return c.getBoundingClientRect().width / +c.getAttribute("width"); }, i);
      ok(Math.abs(sc - 1) < 0.01, `S1 ${w} template ${i + 1} center card scale ${sc.toFixed(3)} not 1`);
    }
  }
  // S2 and S3 fade
  const f = await fade(p);
  if (w === 390) ok(f.content === "none" || !/gradient/.test(f.bg), `S3 390 has a fade`);
  else {
    // Each stop is a colour and a position; positions with clamp() and % are resolved against the stage width.
    const W = f.W, clamp = (a, b, c) => Math.min(c, Math.max(a, b));
    const body = f.bg.replace(/^linear-gradient\(to right,\s*/, "").replace(/\)$/, "");
    const parts = body.split(/,\s*(?=rgba?\()/);
    const stops = parts.map((t) => { const m = t.match(/^rgba?\(([^)]*)\)\s+(.*)$/); if (!m) return { a: NaN, x: NaN };
      const expr = m[2].replace(/([\d.]+)%/g, (_, v) => `(${W}*${v}/100)`).replace(/px/g, "").replace(/calc/g, "");
      return { a: m[1].split(",").length === 4 ? +m[1].split(",")[3] : 1, x: Function("clamp", `return (${expr})`)(clamp) }; });
    const A = Math.min(132.2, Math.max(39.3, 39.3 + (W - 704) * (132.2 - 39.3) / (1017 - 704))), B = 0.22365 * W;
    ok(stops.length === 6, `S2 ${w} fade has ${stops.length} stops: ${f.bg}`);
    if (stops.length === 6) {
      const want = [[1, 0], [0.63, A], [0, B], [0, W - B], [0.63, W - A], [1, W]];
      want.forEach(([a, x], k) => ok(Math.abs(stops[k].a - a) < 0.01 && Math.abs(stops[k].x - x) < 1.5, `S2 ${w} stop ${k} ${stops[k].a}@${stops[k].x} want ${a}@${x.toFixed(1)}`));
    }
    ok(f.bg.includes("rgb(4, 4, 5)") && f.page === "rgb(4, 4, 5)", `S2 ${w} fade colour or page fill not #040405: ${f.page}`);
  }
  // S3 rects
  if ((w === 390 || w === 1440) && fs.existsSync(bpath)) {
    const bl = JSON.parse(fs.readFileSync(bpath))[w];
    per.forEach((r, i) => { const flat = JSON.stringify(r), want = bl[i];
      ["stage", "dots", "cap", "desc"].forEach((k) => r[k].forEach((v, j) => ok(Math.abs(v - want[k][j]) <= 0.5, `S3 ${w} t${i + 1} ${k} ${r[k]} vs ${want[k]}`)));
      r.cards.forEach((c, ci) => c.forEach((v, j) => ok(Math.abs(v - want.cards[ci][j]) <= 0.5, `S3 ${w} t${i + 1} card ${ci + 1} moved`))); });
  }
  // S4 no gap
  for (let i = 0; i < 5; i++) {
    await go(p, i);
    const g = await p.evaluate(() => {
      const s = document.querySelector(".sow"), z = parseFloat(getComputedStyle(document.querySelector(".fw")).zoom) || 1;
      const R = (e) => e.getBoundingClientRect(), cap = s.querySelector(".sow__cap"), kids = [...cap.children];
      const sum = kids.reduce((t, k) => t + R(k).height + parseFloat(getComputedStyle(k).marginTop), 0);
      const sec = s.closest(".fw-sec"), last = [...sec.children].filter((e) => getComputedStyle(e).display !== "none").pop();
      return { dotsGap: (R(s.querySelector(".sow__dots")).top - R(s.querySelector(".sow__stage")).bottom) / z, capH: R(cap).height, sum,
        capLast: last === s || last.contains(cap), secPad: parseFloat(getComputedStyle(sec).paddingBottom), tail: (R(sec).bottom - R(cap).bottom) / z, static: getComputedStyle(s).position === "static" };
    });
    ok(Math.abs(g.dotsGap - 40) < 1, `S4 ${w} t${i + 1} dots ${g.dotsGap.toFixed(1)} under the stage, not 40`);
    ok(Math.abs(g.capH - g.sum) < 1, `S4 ${w} t${i + 1} caption ${g.capH.toFixed(1)} tall, text ${g.sum.toFixed(1)}`);
    if (g.static) ok(g.capLast && Math.abs(g.tail - g.secPad) < 1, `S4 ${w} t${i + 1} ${g.tail.toFixed(1)} under the caption, padding ${g.secPad}`);
  }
  // S5
  if (w === 768) {
    await go(p, 2);
    const v = await p.evaluate(() => { const st = document.querySelector(".sow__stage").getBoundingClientRect(), c = document.querySelectorAll(".sow__card");
      const l = c[1].getBoundingClientRect(), r = c[3].getBoundingClientRect(); return [l.right - st.left, st.right - r.left]; });
    ok(v[0] >= 30 && v[1] >= 30, `S5 768 side cards show ${v.map((x) => x.toFixed(0))} px`);
  }
  await p.close();
}
await b.close();
if (base) { fs.writeFileSync(bpath, JSON.stringify(out)); console.log("BASELINE_WRITTEN"); process.exit(0); }
if (fails.length) { console.log(fails.slice(0, 40).join("\n")); console.log(`SOW_CHECK_FAIL ${fails.length} of ${n}`); process.exit(1); }
console.log(`SOW_CHECK_OK ${n} assertions`);
