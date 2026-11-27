// Session 1 (20 Nov) gates: framework page against his current frame 6331:20607 (mondai framework cS most current).
// Usage: node reports/fw-sync-2026-11-20/check.mjs <port> <gate>. Needs the site served (PORT=<port> node scripts/serve.mjs).
// Prints <GATE>_OK and exits 0 only when every assertion in that gate passes; prints each failure otherwise.
import { createRequire } from "node:module";
const { chromium } = createRequire(new URL("../../package.json", import.meta.url).pathname)("playwright");
const [port = "4318", gate = ""] = process.argv.slice(2);
const base = `http://localhost:${port}`;
const fails = [];
const near = (a, b, tol, what) => { if (!(Math.abs(a - b) <= tol)) fails.push(`${what}: ${a.toFixed(2)} not ${b} (tol ${tol})`); };
const b = await chromium.launch();
async function open(path, width, reduced = true) {
  const p = await b.newPage({ viewport: { width, height: 900 }, reducedMotion: reduced ? "reduce" : "no-preference" });
  await p.goto(base + path, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  return p;
}
// Box of a node relative to its section, in CSS px of the 1440 composition.
const rel = (p, node) => p.evaluate((node) => {
  const e = document.querySelector(`[data-figma-node="${node}"]`);
  if (!e) return null;
  const s = e.closest("section"), r = e.getBoundingClientRect(), q = s.getBoundingClientRect();
  return { left: r.left - q.left, top: r.top - q.top, width: r.width, height: r.height, secH: q.height };
}, node);

const gates = {
  async hero() {
    const p = await open("/mondai/framework/", 1440);
    const c = await p.evaluate(() => [...document.querySelectorAll('[data-figma-node="5812:16468"] .para')].map((e) => getComputedStyle(e).color));
    if (c[0] !== "rgb(242, 241, 248)") fails.push(`para 1 color ${c[0]}`);
    if (c[1] !== "rgb(144, 144, 157)") fails.push(`para 2 color ${c[1]}`);
  },
  async nav() {
    const m = async (path, w = 1440) => { const p = await open(path, w); return p.evaluate(() => ({
      logo: document.querySelector(".navbar__logo").getBoundingClientRect().top,
      h1: document.querySelector("h1").getBoundingClientRect().top + scrollY })); };
    const f = await m("/mondai/framework/"), h = await m("/"), v = await m("/haven/");
    near(f.logo, 19, 0.5, "framework logo top"); near(f.h1, 164, 0.5, "framework title cap top");
    near(h.logo, 15, 0.5, "home logo top"); near(h.h1, 589, 0.5, "home h1 top");
    near(v.logo, 24, 0.5, "haven logo top"); near(v.h1, 130, 0.5, "haven title top");
  },
  async boxes() {
    const p = await open("/mondai/framework/", 1440);
    const want = {
      "5812:17084": 834, "5812:17143": 2057,
    };
    const boxes = [
      ["5812:17086", 159, 64], ["5812:17087", 159, 118, 724], ["5812:17121", 508, 391, 541], ["5812:17122", 508, 426, 541],
      ["5812:17124", 1092, 391], ["5812:17125", 1092, 426, 228], ["5812:17089", 158, 371, 308], ["5812:17126", 508, 565, 489],
      ["5812:17127", 528, 585], ["5812:17128", 528, 610, 449],
      ["5812:17150", 154, 419], ["5812:17152", 0, 454], ["5812:20111", 159, 1196, 501], ["5812:20112", 740, 1196, 426],
      ["5812:20246", 817, 1444], ["5812:20247", 817, 1490, 448], ["5812:20114", 154, 1384, 547],
    ];
    for (const [node, l, t, w] of boxes) {
      const r = await rel(p, node);
      if (!r) { fails.push(`${node} missing`); continue; }
      near(r.left, l, 1.5, `${node} left`); near(r.top, t, 1.5, `${node} top`); if (w) near(r.width, w, 1.5, `${node} width`);
    }
    for (const [sec, h] of Object.entries(want)) { const r = await rel(p, sec); near(r.height, h, 1.5, `${sec} section height`); }
  },
  async oneline() {
    // For each width: the intro is one line, or it is wider than its room (so the wrap is real). A planted cap at
    // 1440 must be caught, or the check proves nothing.
    const probe = async (p, plant) => {
      // The plant waits a beat: the reduced motion rule gives every transition 1 ms, so a read in the same task sees
      // the old box.
      if (plant) { await p.evaluate(() => document.querySelector('[data-figma-node="5812:17150"]').style.setProperty("max-width", "640px", "important")); await p.waitForTimeout(100); }
      return p.evaluate(() => {
      const e = document.querySelector('[data-figma-node="5812:17150"]');
      const range = document.createRange(); range.selectNodeContents(e);
      const lines = new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
      const c = e.cloneNode(true); c.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;width:auto;max-width:none";
      e.parentNode.appendChild(c); const natural = c.getBoundingClientRect().width; c.remove();
      const s = e.closest("section"), cs = getComputedStyle(s), q = s.getBoundingClientRect();
      const roomRight = q.right - parseFloat(cs.paddingRight) * (q.width / s.offsetWidth || 1);
      const room = roomRight - e.getBoundingClientRect().left;
      return { lines, natural, room };
    }); };
    for (let w = 320; w <= 1600; w += (process.env.STEP ? +process.env.STEP : 10)) {
      const p = await open("/mondai/framework/", w);
      const r = await probe(p, false);
      // His 21 Nov note supersedes this rule on a tablet (768 to 1159): there the intro breaks after "between" into two
      // even lines, checked by reports/fw-fixes-round2-2026-11-21/check.mjs orphans.
      if (w >= 768 && w < 1160) { await p.close(); continue; }
      if (r.lines > 1 && r.natural <= r.room - 1) fails.push(`${w}: wraps into ${r.lines} lines though ${r.natural.toFixed(1)} fits ${r.room.toFixed(1)}`);
      await p.close();
    }
    const p = await open("/mondai/framework/", 1440);
    const r = await probe(p, true);
    if (!(r.lines > 1 && r.natural <= r.room - 1)) fails.push(`planted 640 cap was not caught ${JSON.stringify(r)}`);
    else console.log("planted partial wrap caught at 1440");
  },
  async resched() {
    for (const w of [390, 768, 1440]) {
      const p = await open("/mondai/framework/", w);
      const g = await p.evaluate(() => {
        const h = document.querySelector('[data-figma-node="5812:20246"]').getBoundingClientRect();
        const t = document.querySelector('[data-figma-node="5812:20247"]').getBoundingClientRect();
        return (t.top - h.bottom) / (document.querySelector(".fw").getBoundingClientRect().width / document.querySelector(".fw").offsetWidth || 1);
      });
      near(g, 32, 0.75, `${w} heading to body`);
    }
  },
  async eyebrows() {
    const p = await open("/mondai/framework/", 1440);
    const t = await p.evaluate(() => [...document.querySelectorAll("main h2")].map((e) => e.textContent.trim()));
    const dup = t.filter((x, i) => t.indexOf(x) !== i);
    if (dup.length) fails.push(`duplicate eyebrows: ${dup.join(", ")}`);
    const g = (n) => p.evaluate((n) => document.querySelector(`[data-figma-node="${n}"]`).textContent.trim(), n);
    if ((await g("5812:20254")) !== "Target and pace") fails.push("rail eyebrow is not Target and pace");
    if ((await g("5812:20308")) !== "Falling behind") fails.push("Rollover eyebrow is not Falling behind");
  },
  async rollover() {
    const p = await open("/mondai/framework/", 1440);
    const r = await p.evaluate(() => {
      const e = document.querySelector('[data-figma-node="5812:20346"]'), img = e.querySelector("img");
      // The words are an anonymous flex item, so a marker element would become an item of its own: read the text
      // node's glyph box instead and find the baseline from the font's ascent.
      const text = [...e.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
      const range = document.createRange(); range.selectNodeContents(text);
      const ctx = document.createElement("canvas").getContext("2d"); ctx.font = getComputedStyle(e).font;
      const m = ctx.measureText("H"), cap = m.actualBoundingBoxAscent;
      const baseline = range.getClientRects()[0].top + m.fontBoundingBoxAscent;
      const s = e.closest("section").getBoundingClientRect(), i = img.getBoundingClientRect();
      return { capTop: baseline - cap - s.top, capMid: baseline - cap / 2, iconMid: i.top + i.height / 2 };
    });
    near(r.capTop, 1616, 1, "Rollover effect cap top"); near(r.iconMid, r.capMid, 1, "icon middle against cap middle");
    for (const w of [390, 768]) {
      const q = await open("/mondai/framework/", w);
      const s = await q.evaluate(() => { const e = document.querySelector('[data-figma-node="5812:20316"]'), c = getComputedStyle(e);
        return { outline: c.outlineStyle, radius: c.borderTopRightRadius, padR: parseFloat(c.paddingRight), bg: c.backgroundColor, w: e.getBoundingClientRect().width, cw: e.parentElement.clientWidth }; });
      // The card styling this pass added under 1160 was replaced by his Falling behind v4 row (PR #32, session 6),
      // whose image carries its own background, so only the fit is checked here now.
      if (s.w > s.cw) fails.push(`${w}: Rollover card wider than its section`);
    }
  },
  async footer() {
    const f = await open("/mondai/framework/", 1440), h = await open("/haven/", 1440);
    const read = (p) => p.evaluate(() => ({
      nav: [...document.querySelectorAll(".footer__nav li")].filter((li) => li.offsetParent).map((li) => li.textContent.trim()),
      all: [...document.querySelectorAll(".footer__nav li")].map((li) => li.textContent.trim()),
      resume: [...document.querySelectorAll(".footer__out")].filter((a) => a.offsetParent).map((a) => a.textContent.trim()),
      weight: getComputedStyle(document.querySelector("footer .button__label")).fontWeight }));
    const a = await read(f), v = await read(h);
    if (a.all.join("|") !== "Home|About|Selected works|Testimonials") fails.push(`framework list ${a.all}`);
    if (a.nav.join("|") !== "Home|About|Selected works") fails.push(`framework visible list ${a.nav}`);
    if (a.resume.join("|") !== "Linkedin") fails.push(`framework links ${a.resume}`);
    if (a.weight !== "500") fails.push(`framework Contact weight ${a.weight}`);
    if (v.nav.join("|") !== "Home|About|Selected works|Contact" || v.weight !== "700" || v.resume.join("|") !== "Linkedin|Resume") fails.push(`haven footer moved ${JSON.stringify(v)}`);
  },
  async scroll() {
    for (const w of [390, 768, 1440]) for (const red of [true, false]) {
      const p = await open("/mondai/framework/", w, red);
      const sw = await p.evaluate(() => document.documentElement.scrollWidth);
      if (sw > w) fails.push(`${w} reduced=${red}: scrollWidth ${sw}`);
      await p.close();
    }
  },
};
if (!gates[gate]) { console.log(`unknown gate ${gate}`); process.exit(2); }
await gates[gate]();
await b.close();
if (fails.length) { console.log(fails.join("\n")); process.exit(1); }
console.log(`${gate.toUpperCase()}_OK`);
