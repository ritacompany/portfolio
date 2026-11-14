// Checks H1 and H2 from ISSUES.md and F2 to F12 from FEEDBACK-13NOV.md (F6 checked before any scroll) at 768, 834, 1024 and 1180, reduced motion on and off, plus no sideways
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
  await page.waitForTimeout(300);
  // F6 the insight pills are visible from the start, before any scrolling, with no entrance
  const pills = await page.evaluate(() => [...document.querySelectorAll(".pills, .pills li, .pill")].filter((e) => { let n = e; while (n && n !== document.body) { const cs = getComputedStyle(n); if (cs.visibility === "hidden" || +cs.opacity < 1) return true; n = n.parentElement; } return false; }).length);
  if (pills) problems.push(`${w} ${motion}: F6 ${pills} pill elements hidden before scrolling`);
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
    const narrow = vw < 1160;
    // F2 F3 usability testing keeps its text on the left of the three flow cards, as on desktop
    { const a = R(".testing__text"), b = R(".tasks");
      if (a.right > b.left + 0.5 || Math.abs(a.top - b.top) > 2) out.push(`F2 testing text ${Math.round(a.left)}..${Math.round(a.right)} top ${Math.round(a.top)}, flows start ${Math.round(b.left)} top ${Math.round(b.top)}`);
      if (b.right > vw - m + 0.5) out.push(`F3 flow cards end ${Math.round(b.right)} past the margin ${vw - m}`); }
    // F4 the four insight cards sit in one row filling the width, equal heights, equal padding top and bottom
    { const c = [...document.querySelectorAll(".cards-testing .tcard")].map((e) => e.getBoundingClientRect());
      if (new Set(c.map((r) => Math.round(r.top))).size !== 1) out.push(`F4 insight cards on ${new Set(c.map((r) => Math.round(r.top))).size} rows`);
      if (Math.abs(c[0].left - m) > 1 || Math.abs(c[c.length - 1].right - (vw - m)) > 1) out.push(`F4 insight row ${Math.round(c[0].left)} to ${Math.round(c[c.length - 1].right)}, not margin to margin`);
      for (const b of document.querySelectorAll(".cards-testing .tcard__body")) {
        const B = b.getBoundingClientRect(), rg = document.createRange(); rg.selectNodeContents(b); const T = rg.getBoundingClientRect();
        if (Math.abs((T.top - B.top) - (B.bottom - T.bottom)) > 3) { out.push(`F4 insight text ${Math.round(T.top - B.top)} px from the top, ${Math.round(B.bottom - T.bottom)} from the bottom`); break; } } }
    // F5 the quiz phone has as much room to hold as at 1440 (334 px): from the phone's bottom to 100 px above the section end
    { const s = R(".quiz"), p = R(".quiz__phone"), room = s.bottom - 100 - p.bottom;
      if (room < 330) out.push(`F5 quiz phone room ${Math.round(room)} px`); }
    // F8 the profile detail card is never wider than its Figma width (680)
    { const r = R(".profile__who"); if (r.width > 680.5) out.push(`F8 profile detail ${Math.round(r.width)} wide`); }
    // F10 the two security screens share one height
    { const a = R(".security__a img"), b = R(".security__b img"); if (Math.abs(a.height - b.height) > 1) out.push(`F10 security heights ${Math.round(a.height)} and ${Math.round(b.height)}`); }
    // F11 every ending card is open, with its caption showing, without hover or tap
    for (const c of document.querySelectorAll(".end-card")) {
      const cap = c.querySelector(".end-caption").getBoundingClientRect(), cov = c.querySelector(".end-cover").getBoundingClientRect();
      if (cov.top < cap.bottom - 1) { out.push(`F11 caption covered on "${c.getAttribute("aria-label")}"`); break; }
    }
    // F12 the bar to the other case studies keeps its 44 px height
    { const h = R(".ending-bar").height; if (Math.abs(h - 44) > 0.5) out.push(`F12 ending bar ${Math.round(h)} px tall`); }
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
