// Every framework headline (the 13 section headlines and the ending title) runs exactly three lines at every whole
// pixel width from 768 to 1159, and at 1160 and 1440; its words match the shipped page.
// Usage: node check-lines.mjs <url>                 prints LINES_OK or the failures
//        node check-lines.mjs <url> expect-fail    negative control: prints LINES_FAIL_AS_EXPECTED if it finds failures
//        node check-lines.mjs <url> same-outside   every headline box and font size at 390, 1160 and 1440 equals the
//                                                   shipped page's: prints OUTSIDE_SAME
// Site served on 4318 (PORT=4318 node scripts/serve.mjs).
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const [url = 'http://localhost:4318/mondai/framework/', mode] = process.argv.slice(2);
const SHIPPED = 'http://localhost:4318/mondai/framework/';
const SEL = '.fw-sec > .s-heading-40, .fw-sec > .fw-end__title';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 768, height: 900 } });
const read = () => p.evaluate((SEL) => [...document.querySelectorAll(SEL)].map((e) => {
  const rg = document.createRange(); rg.selectNodeContents(e); const r = e.getBoundingClientRect();
  return { id: e.dataset.figmaNode || 'ending title', text: e.textContent, fs: getComputedStyle(e).fontSize,
    lines: new Set([...rg.getClientRects()].map((x) => Math.round(x.top))).size, box: [r.x, r.y, r.width, r.height].map((v) => Math.round(v * 100) / 100) };
}), SEL);
const load = async (u, w) => { await p.setViewportSize({ width: w, height: 900 }); await p.goto(u, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); };
const fails = [];
if (mode === 'same-outside') {
  for (const w of [390, 1160, 1440]) {
    await load(SHIPPED, w); const a = await read(); await load(url, w); const c = await read();
    if (a.length !== c.length) fails.push(`${w}: ${a.length} vs ${c.length} headlines`);
    a.forEach((h, i) => { if (JSON.stringify(h) !== JSON.stringify(c[i])) fails.push(`${w} ${h.id}: ${JSON.stringify(h.box)} ${h.fs} vs ${JSON.stringify(c[i].box)} ${c[i].fs}`); });
  }
  console.log(fails.length ? fails.join('\n') + '\nOUTSIDE_DIFFERS' : 'OUTSIDE_SAME');
  await b.close(); process.exit(fails.length ? 1 : 0);
}
await load(SHIPPED, 1440); const words = (await read()).map((h) => h.text);
await load(url, 768);
const n = (await read()).length;
if (n !== 14) fails.push(`expected 14 headlines, found ${n}`);
(await read()).forEach((h, i) => { if (h.text !== words[i]) fails.push(`words differ: ${h.id}`); });
const widths = [...Array.from({ length: 1159 - 768 + 1 }, (_, i) => 768 + i), 1160, 1440];
for (const w of widths) {
  if (w === 1160) await load(url, 1160); else await p.setViewportSize({ width: w, height: 900 });
  if (w === 1160 || w === 1440) await p.evaluate(() => document.fonts.ready);
  for (const h of await read()) if (h.lines !== 3) fails.push(`${w} ${h.id}: ${h.lines} lines`);
}
await b.close();
if (mode === 'expect-fail') { console.log(fails.length ? `found ${fails.length} failures, e.g. ${fails[0]}\nLINES_FAIL_AS_EXPECTED` : 'LINES_UNEXPECTEDLY_OK'); process.exit(fails.length ? 0 : 1); }
console.log(fails.length ? fails.slice(0, 40).join('\n') + `\n${fails.length} failures` : `checked ${widths.length} widths x ${n} headlines\nLINES_OK`);
process.exit(fails.length ? 1 : 0);
