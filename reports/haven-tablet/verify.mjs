// Checks H1 and H2 from ISSUES.md at 768, 834, 1024 and 1180, reduced motion on and off, plus no sideways
// scroll and no text left hidden after scrolling through. Serves site/ itself.
// Prints HAVEN_TABLET_OK <n> of <n> only when every run passes.
import { createRequire } from "node:module";
import { serve, settle } from "./serve.mjs";
const { server, base } = await serve();
const { chromium } = createRequire(import.meta.url)("playwright");
const browser = await chromium.launch();
const problems = []; let runs = 0;
for (const motion of ["reduce", "no-preference"]) for (const w of [768, 834, 1024, 1180]) {
  runs++;
  const page = await browser.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: motion });
  await page.goto(base + "/haven/", { waitUntil: "networkidle" });
  await settle(page);
  const found = await page.evaluate(() => {
    const out = [], vw = document.documentElement.clientWidth;
    const m = parseFloat(getComputedStyle(document.querySelector("main")).getPropertyValue("--m"));
    const R = (s) => document.querySelector(s).getBoundingClientRect();
    // H1 the stats row and its labels stay inside the side margins
    for (const s of [".stats__row", ".stat-left .stat__label", ".stats__row .stat:last-child .stat__label"]) {
      const r = R(s); if (r.left < m - 0.5 || r.right > vw - m + 0.5) out.push(`H1 ${s} ${Math.round(r.left)} to ${Math.round(r.right)}, margins ${m} and ${vw - m}`);
    }
    // H2 from the last content to the section's end is the 164 px bottom padding (plus the 1 px rule), as at 1440
    if (vw >= 1160) for (const n of ["mvp", "wires", "program", "schedule", "security"]) {
      const s = document.querySelector(`main section.${n}`), S = s.getBoundingClientRect(); let last = S.top;
      for (const e of s.querySelectorAll("*")) { const r = e.getBoundingClientRect(); if (r.width && r.height) last = Math.max(last, Math.min(r.bottom, S.bottom)); }
      const tail = S.bottom - last; if (tail > 170) out.push(`H2 ${n} ${Math.round(tail)} px empty under its content`);
    }
    if (document.documentElement.scrollWidth > vw) out.push(`sideways scroll ${document.documentElement.scrollWidth}`);
    for (const e of document.querySelectorAll("main .tb-item")) {
      const cs = getComputedStyle(e); if (e.getClientRects().length && (cs.visibility === "hidden" || +cs.opacity < 0.5)) out.push(`hidden ${e.className} "${e.textContent.trim().slice(0, 24)}"`);
    }
    return out;
  });
  for (const f of found) problems.push(`${w} ${motion}: ${f}`);
  await page.close();
}
await browser.close(); server.close();
if (problems.length) { console.error(problems.join("\n")); console.error(`${problems.length} problems`); process.exit(1); }
console.log(`HAVEN_TABLET_OK ${runs} of ${runs}`);
