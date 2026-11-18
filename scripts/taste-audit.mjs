// Runs the "How to check it" of six taste library entries against the shipped portfolio pages
// (tabular-numbers, optical-centre, concentric-radius, alpha-borders, layered-shadows,
// balanced-headlines; the entries live in ritacompany/claude-harness taste/entries/).
// Needs the local server: npm run dev (http://127.0.0.1:4318). Writes reports/taste-audit.json
// and prints "taste audit complete: 6 of 6 checks ran" only when every check executed on every page.
// Usage: node scripts/taste-audit.mjs [base url] [output path]

import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

// The repo lists playwright as a dev dependency; a cloud session has it installed globally instead,
// so fall back to the global install when the local one is missing.
import { execSync } from "node:child_process";
const load = () => {
  try { return createRequire(import.meta.url)("playwright"); }
  catch { return createRequire(execSync("npm root -g").toString().trim() + "/")("playwright"); }
};
const { chromium } = load();

const base = process.argv[2] || "http://127.0.0.1:4318";
const out = process.argv[3] || new URL("../reports/taste-audit.json", import.meta.url).pathname;
const pages = ["/", "/mondai/", "/mondai/framework/", "/haven/"];
const widths = [1440, 390];

const audit = () => {
  const sel = (el) => {
    if (el.id) return `#${el.id}`;
    const cls = [...el.classList].slice(0, 2).join(".");
    return el.tagName.toLowerCase() + (cls ? `.${cls}` : "");
  };
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
  const all = [...document.querySelectorAll("body *")].filter(visible);
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
  const res = {};

  // 1. tabular-numbers: elements whose own text is a number, time or figure, or that a script updates.
  const numeric = /^[\s$£€+−-]*\d[\d\s:.,%/]*\s*(am|pm|AM|PM|[A-Z]{2,4}|%|k|K|m|x)?[\s\w]{0,6}$/;
  res.tabular = all.filter((el) => numeric.test(ownText(el)) || el.matches("[data-chicago-clock], time, [data-count], [data-clock]"))
    .map((el) => ({ el: sel(el), text: ownText(el).slice(0, 30) || el.textContent.trim().slice(0, 30), fvn: getComputedStyle(el).fontVariantNumeric, live: el.matches("[data-chicago-clock], time, [data-count], [data-clock]") }));

  // 2. optical-centre: text in buttons, pills and tags; gap from cap top to the top edge vs baseline to the bottom edge.
  const ctx = document.createElement("canvas").getContext("2d");
  // The label may sit in a child span (the goo buttons), so measure the text's own element against the control's box.
  const control = /^(btn|button|pill|tag|chip|cta|badge)(-[a-z]+)?$/;
  res.optical = all.filter((el) => el.matches("button") || [...el.classList].some((c) => control.test(c)))
    .map((box) => [box, ownText(box) ? box : [...box.querySelectorAll("*")].find((c) => ownText(c) && visible(c))])
    .filter(([, el]) => el)
    .map(([box, el]) => {
      const s = getComputedStyle(el);
      ctx.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const cap = ctx.measureText("H").actualBoundingBoxAscent;
      // A text range's rect is the font's content area, so the baseline sits the font ascent below its top.
      // (An inserted probe element would become a flex item in a flex control and measure nothing useful.)
      const textNode = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
      const range = document.createRange(); range.selectNodeContents(textNode);
      const baseline = range.getClientRects()[0].top + ctx.measureText("H").fontBoundingBoxAscent;
      const r = box.getBoundingClientRect(); const bs = getComputedStyle(box);
      const top = baseline - cap - r.top - parseFloat(bs.borderTopWidth);
      const bottom = r.bottom - parseFloat(bs.borderBottomWidth) - baseline;
      // Canvas cap height can differ from the font's own cap metric by a pixel or so; past 2px, confirm with a pixel crop.
      return { el: sel(box), text: ownText(el).slice(0, 24), capTopGap: +top.toFixed(1), baselineBottomGap: +bottom.toFixed(1), diff: +(top - bottom).toFixed(1), pass: Math.abs(top - bottom) <= 2 };
    });

  // 3. concentric-radius: a rounded child near a rounded parent's corner should take outer radius minus the gap.
  // Browsers shrink a radius larger than half the box, so a pill's real radius is half its short side.
  const radius = (el) => { const r = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0; const b = el.getBoundingClientRect(); return Math.min(r, b.width / 2, b.height / 2); };
  res.concentric = [];
  for (const el of all) {
    const r = radius(el); if (!r) continue;
    let p = el.parentElement; while (p && p !== document.body && !radius(p)) p = p.parentElement;
    if (!p || p === document.body) continue;
    const R = radius(p); const a = el.getBoundingClientRect(); const b = p.getBoundingClientRect();
    const gap = Math.min(a.left - b.left, a.top - b.top);
    if (gap < 0 || gap >= R) continue; // only children that sit inside the parent's corner curve
    // A child pill inside a parent pill is concentric whenever both are full rounds.
    const pill = (q, rr) => { const b = q.getBoundingClientRect(); return Math.abs(rr - Math.min(b.width, b.height) / 2) <= 1; };
    const want = Math.max(R - gap, 4);
    res.concentric.push({ el: sel(el), parent: sel(p), outer: +R.toFixed(1), gap: +gap.toFixed(1), inner: +r.toFixed(1), want: +want.toFixed(1), pass: Math.abs(r - want) <= 1 || (R - gap < 4 && r <= 4) || (pill(el, r) && pill(p, R)) });
  }

  // 4. alpha-borders: every visible border or 1px inset box-shadow line, with its colour and whether it is alpha; images without a hairline.
  res.borders = [];
  for (const el of all) {
    const s = getComputedStyle(el);
    if (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== "none") res.borders.push({ el: sel(el), via: "border", color: s.borderTopColor, alpha: /rgba|\/ ?0?\.\d/.test(s.borderTopColor) });
    if (/inset/.test(s.boxShadow)) res.borders.push({ el: sel(el), via: "inset shadow", color: s.boxShadow, alpha: /rgba\([^)]*,\s*0?\.\d+\)/.test(s.boxShadow) });
  }
  res.images = all.filter((el) => el.matches("img, video, picture") && el.getBoundingClientRect().width > 120)
    .map((el) => { const s = getComputedStyle(el); return { el: sel(el), hairline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0 }; });

  // 5. layered-shadows: every outer (non inset) box-shadow and how many layers it has.
  res.shadows = all.map((el) => ({ el: sel(el), v: getComputedStyle(el).boxShadow }))
    .filter((x) => x.v !== "none")
    .map((x) => ({ el: x.el, layers: x.v.split(/,(?![^(]*\))/).filter((l) => !/inset/.test(l)).length, value: x.v }))
    .filter((x) => x.layers > 0);

  // 6. balanced-headlines: headings and display text, their wrap style, line count and last line length.
  const display = /^(h\d{2,3}|display|title|headline|lede|quote)$|(__|-)(title|headline|lede|tagline|quote)$/;
  res.headlines = all.filter((el) => (el.matches("h1, h2, h3, h4, blockquote") || [...el.classList].some((c) => display.test(c))) && el.textContent.trim().length > 12)
    .map((el) => {
      const s = getComputedStyle(el);
      const range = document.createRange(); range.selectNodeContents(el);
      const rects = [...range.getClientRects()].filter((r) => r.width > 1);
      const lines = [...new Set(rects.map((r) => Math.round(r.top)))].length;
      const lastWidth = rects.filter((r) => Math.round(r.top) === Math.max(...rects.map((q) => Math.round(q.top)))).reduce((a, r) => a + r.width, 0);
      const box = el.getBoundingClientRect().width;
      // Words on the last line, measured word by word so a mixed size heading still counts right.
      const tops = []; const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n; (n = walker.nextNode());) for (const m of n.data.matchAll(/\S+/g)) { const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); const b = r.getClientRects()[0]; if (b) tops.push(Math.round(b.top)); }
      const last = Math.max(...tops);
      const lastLineWords = tops.filter((t) => Math.abs(t - last) <= 3).length;
      const wordLines = [...tops].sort((a, b) => a - b).filter((t, i, a) => i === 0 || t - a[i - 1] > 3).length;
      return { el: sel(el), text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 50), wrap: s.textWrapStyle || s.textWrap, lines, lastLineShare: +(lastWidth / box).toFixed(2), lastLineWords, wordLines };
    });
  return res;
};

const browser = await chromium.launch();
const report = { base, ran: new Set(), pages: {} };
for (const path of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const r = await page.evaluate(audit);
    for (const k of ["tabular", "optical", "concentric", "borders", "shadows", "headlines"]) if (Array.isArray(r[k])) report.ran.add(k);
    report.pages[`${path} @${width}`] = r;
    await page.close();
  }
}
// Font test for tnum: zeroes and ones at the same size must match width with tabular-nums on.
const page = await browser.newPage();
await page.goto(base + "/", { waitUntil: "networkidle" });
report.fontTnum = await page.evaluate(async () => {
  await document.fonts.ready;
  const out = {};
  for (const w of [400, 500, 700]) {
    const m = (t, fvn) => { const s = document.createElement("span"); s.style.cssText = `font: ${w} 40px Satoshi; font-variant-numeric: ${fvn}; position: absolute; white-space: nowrap`; s.textContent = t; document.body.append(s); const x = s.getBoundingClientRect().width; s.remove(); return x; };
    out[w] = { proportional: [m("0000000000", "normal"), m("1111111111", "normal")].map((x) => +x.toFixed(1)), tabular: [m("0000000000", "tabular-nums"), m("1111111111", "tabular-nums")].map((x) => +x.toFixed(1)) };
  }
  return out;
});
await browser.close();
report.ran = [...report.ran];
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(report, null, 2));
console.log(`report: ${out}`);

// Findings: what fails an entry's check, deduplicated across widths. Alpha borders and image
// hairlines are listed in the report only; on a single flat surface they render the same, so they
// are a judgment call, never a finding.
const findings = new Set();
for (const [where, r] of Object.entries(report.pages)) {
  const page = where.split(" @")[0];
  for (const t of r.tabular) if (t.live && !/tabular-nums/.test(t.fvn)) findings.add(`tabular-numbers: ${page} ${t.el} updates live without tabular-nums`);
  for (const o of r.optical) if (!o.pass) findings.add(`optical-centre: ${page} ${o.el} "${o.text}" label off centre by ${Math.abs(o.diff)}px (confirm with a pixel crop)`);
  for (const c of r.concentric) if (!c.pass) findings.add(`concentric-radius: ${page} ${c.el} in ${c.parent} has radius ${c.inner}, wants ${c.want}`);
  for (const sh of r.shadows) {
    const layers = sh.value.split(/,(?![^(]*\))/).filter((l) => !/inset/.test(l));
    const blurs = layers.map((l) => parseFloat((l.match(/(-?[\d.]+)px/g) || [])[2] || 0));
    if (layers.length === 1 && blurs[0] > 2) findings.add(`layered-shadows: ${page} ${sh.el} has one shadow layer with ${blurs[0]}px blur`);
  }
  for (const h of r.headlines) if (h.wordLines > 1 && h.lastLineWords === 1) findings.add(`balanced-headlines: ${page} @${where.split("@")[1]} ${h.el} "${h.text.slice(0, 30)}" ends on one word`);
}
report.findings = [...findings];
writeFileSync(out, JSON.stringify(report, null, 2));
console.log(report.findings.length ? `findings: ${report.findings.length}\n  ` + report.findings.join("\n  ") : "findings: 0");
if (report.ran.length === 6 && Object.keys(report.pages).length === pages.length * widths.length) console.log("taste audit complete: 6 of 6 checks ran");
else { console.log(`only ${report.ran.length} checks ran`); process.exit(1); }
