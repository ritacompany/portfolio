// Checks the tablet preview of his frames (site/dev/framework-tablet/) against his Figma frames, 21 Nov.
//  768: every gap and width his frames set, within 2 px (headlines excepted: they run at 32 on the page).
//  1024 and 1150: the same structure holds (two columns, the box, the image shapes), nothing overflows.
//  390, 1200 and 1440: the four sections' children sit exactly where they did before (baseline-rects.json).
// Prints BUILD_CHECK_OK when every assertion passes. Needs the site served on :4318.
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const URL_ = process.argv[2] || 'http://localhost:4318/dev/framework-tablet/';
const fails = []; let n = 0;
const ok = (c, m) => { n++; if (!c) fails.push(m); };
const near = (a, b, m, t = 2) => ok(Math.abs(a - b) <= t, `${m}: ${a.toFixed(1)} vs ${b}`);
const b = await chromium.launch(); const p = await b.newPage({ reducedMotion: 'reduce' });
async function load(w) { await p.setViewportSize({ width: w, height: 1000 }); await p.goto(URL_, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); }
const R = (id) => p.evaluate((id) => { const e = document.querySelector(`[data-figma-node="${id}"]`); const r = e.getBoundingClientRect(); const s = e.closest('.fw-sec').getBoundingClientRect(); return { x: r.left, y: r.top - s.top, w: r.width, h: r.height, b: r.bottom - s.top, sh: s.height, r: r.right }; }, id);
const lines = (id) => p.evaluate((id) => { const e = document.querySelector(`[data-figma-node="${id}"]`); return Math.round(e.getBoundingClientRect().height / parseFloat(getComputedStyle(e).lineHeight)) ; }, id);

for (const w of [768, 1024, 1150]) {
  await load(w);
  const c = w - 64; // content width
  // Personalized timeline
  const capT = await R('5812:17121'), capB = await R('5812:17122'), effT = await R('5812:17124'), effB = await R('5812:17125');
  const img = await R('5812:17089'), exL = await R('5812:17127'), exT = await R('5812:17128'), hl = await R('5812:17087');
  const col = (c - 32) / 2;
  near(capT.x, 32, `${w} PT left column x`); near(img.x, 32 + col + 32, `${w} PT right column x`);
  near(img.w, Math.min(col, 336), `${w} PT card width`); near(img.w / img.h, 336 / 260, `${w} PT card shape`, 0.01);
  near(img.y, capT.y, `${w} PT card top = Capacity top`); near(capT.y - hl.b, 80, `${w} PT headline to columns`);
  near(capB.y - capT.b, 20, `${w} PT Capacity title to body`); near(effT.y - capB.b, 32, `${w} PT Capacity to Effort`);
  near(effB.y - effT.b, 20, `${w} PT Effort title to body`); near(exL.y - img.b, 28, `${w} PT card to Example`);
  near(exT.y - exL.b, 16, `${w} PT Example label to text`); near(exT.w, col, `${w} PT Example text width`);
  near(capB.w, Math.min(col, 520), `${w} PT Capacity body width`, 1);
  const ptEnd = Math.max(effB.b, exT.b); near(capT.sh - ptEnd, 164, `${w} PT bottom padding`);
  // Calendar
  const cHl = await R('5812:17134'), cImg = await R('5812:17138'), cCap = await R('5812:17137');
  ok(cHl.w <= 528.5, `${w} CAL headline width ${cHl.w}`); if (w === 768) ok(await lines('5812:17134') === 4, `768 CAL headline lines`);
  near(cImg.y - cHl.b, 80, `${w} CAL headline to image`); near(cImg.x, 32, `${w} CAL image x`); near(cImg.w, c, `${w} CAL image width`);
  near(cImg.w / cImg.h, 704 / 428, `${w} CAL image shape`, 0.01); near(cCap.y - cImg.b, 37, `${w} CAL image to answers`);
  ok(cCap.w <= 578.5, `${w} CAL answers width ${cCap.w}`); near(cCap.sh - cCap.b, 164, `${w} CAL bottom padding`);
  // Falling behind, first part
  const fHl = await R('5812:20255'), nar = await R('5812:20258'), box = await R('5812:20259'), rail = await R('5812:20260');
  const l1 = await R('5812:20296'), b1 = await R('5812:20297'), l2 = await R('5812:20299'), b2 = await R('5812:20300'), l3 = await R('5812:20302'), b3 = await R('5812:20303');
  const rule = await p.evaluate(() => { const s = document.querySelector('.fw-sec[data-figma-node="5812:20248"]'); const r = s.querySelector(':scope > .rule').getBoundingClientRect(); return { y: r.top - s.getBoundingClientRect().top, w: r.width }; });
  ok(nar.w <= 457.5, `${w} FB narrative width ${nar.w}`); near(nar.y - fHl.b, 80, `${w} FB headline to narrative`);
  near(box.y - nar.b, 40, `${w} FB narrative to box`); near(box.x, 32, `${w} FB box x`); near(box.w, c, `${w} FB box width`);
  const unit = (c - 1 - 24) / (400 + 256 + 23);
  near(rail.x, 33, `${w} FB card x`); const cardW = Math.min(400 * unit, 466); near(rail.w, cardW, `${w} FB card width`, 1); near(rail.w / rail.h, 400 / 481, `${w} FB card shape`, 0.01);
  near(rail.y, box.y + 1, `${w} FB card top`); near(box.b, rail.b + 1, `${w} FB box as tall as the card`);
  near(l1.x, rail.r + 24, `${w} FB notes x`); near(b1.w, Math.min((c - 1 - cardW - 24) * 256 / 279, 520), `${w} FB notes width`, 1.5);
  near(l1.y - box.y, 56, `${w} FB first note from box top`); near(b1.y - l1.b, 20, `${w} FB label to body`);
  near(l2.y - b1.b, 32, `${w} FB note to note`); near(b2.y - l2.b, 20, `${w} FB label to body 2`); near(l3.y - b2.b, 32, `${w} FB note to note 2`); near(b3.y - l3.b, 20, `${w} FB label to body 3`);
  ok(b3.b <= box.b, `${w} FB notes inside the box`);
  near(rule.y - box.b, 164, `${w} FB box to rule`); near(rule.w, w, `${w} FB rule full width`);
  // Start of week
  const sn = await R('5812:20715'), sd = await R('5812:20704');
  ok(sn.w <= 437.5 && sn.w > 380, `${w} SOW narrative width ${sn.w}`); ok(sd.w <= 314.5 && sd.w > 280, `${w} SOW description width ${sd.w}`);
  // Nothing wider than the window
  ok(await p.evaluate(() => document.documentElement.scrollWidth) <= w, `${w} no horizontal scroll`);
}
// Unchanged widths
const { rects } = await import('./rects.mjs');
const base = JSON.parse(readFileSync(new URL('./baseline-rects.json', import.meta.url)));
for (const w of [390, 1200, 1440]) {
  const now = await rects(p, w, URL_);
  ok(JSON.stringify(now) === JSON.stringify(base[w]), `${w} rects differ from the baseline`);
}
await b.close();
if (fails.length) { console.log(`FAILED ${fails.length} of ${n}`); for (const f of fails) console.log(' - ' + f); process.exit(1); }
console.log(`BUILD_CHECK_OK ${n} assertions`);
