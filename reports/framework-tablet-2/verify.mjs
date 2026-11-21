// Framework page tablet, round 2 (18 Nov). Default: the spacing rhythm in ISSUES.md at 768, 834, 1024 and
// 1180, reduced motion on and off; prints FW_TABLET2_OK <n> of <n> only when every run passes.
// "rollover": the Rollover effect heading reads before its body and sits above it at 390, 768, 1024, 1180.
// Gaps are between trimmed text boxes; a flex text row (the Rollover effect) is measured from its words.
import { serve, chromium, open } from "./serve.mjs";
const mode = process.argv[2] || "rhythm";
const { server, base } = await serve(process.env.STRIP === "1"); // STRIP=1: the positive control, tablet block removed
const b = await chromium.launch();
const problems = [];
let runs = 0;

if (mode === "rollover") {
  for (const w of [390, 768, 1024, 1150]) {
    runs++;
    const page = await open(b, base, w);
    const r = await page.evaluate(() => {
      const h = document.querySelector('[data-figma-node="5812:20346"]'), p = document.querySelector('[data-figma-node="5812:20350"]');
      return { domFirst: !!(h.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING), above: h.getBoundingClientRect().bottom <= p.getBoundingClientRect().top };
    });
    if (!r.domFirst) problems.push(`${w}: heading after its body in reading order`);
    if (!r.above) problems.push(`${w}: heading not above its body`);
    await page.close();
  }
  finish(`FW_ROLLOVER_OK ${runs} widths`);
} else {
  for (const motion of ["reduce", "no-preference"]) for (const w of [768, 834, 1024, 1150]) {
    runs++;
    const page = await open(b, base, w, motion);
    if (motion === "no-preference") await page.waitForTimeout(2500); // let the last entrances finish
    const found = await page.evaluate(() => {
      const out = [];
      // cap top and baseline offsets of an untrimmed Heading/20 line, for flex rows whose text is not trimmed
      const probe = (trim) => { const p = document.createElement("p"); p.className = "t s-heading-20"; p.textContent = "Hx"; p.style.cssText = `position:absolute;left:0;top:0;text-box:${trim}`; document.body.append(p); const h = p.getBoundingClientRect().height; p.remove(); return h; };
      const full = probe("none"), capTop = full - probe("trim-start cap alphabetic"), base = probe("trim-end cap alphabetic");
      const kind = (e) => e.matches(".fig, .sow") ? "F" : e.matches(".rule") ? "R" : e.matches(".fw-logo") ? "M"
        : e.matches(".s-display-212") ? "T" : e.matches(".s-heading-40, .s-display-96") ? "H"
        : e.matches("h2") || (e.matches(".s-heading-20") && e === e.parentElement.firstElementChild) ? "E"
        : e.matches(".s-heading-20") ? "S" : e.matches(".s-label-14-c") ? "L" : e.matches(".s-label-12") ? "L12"
        : e.matches(".s-label-12-c") ? "X" : e.matches(".s-label-14") ? "XT" : "B";
      const want = (a, c, node) => {
        if (a === "T") return 64; if (a === "R") return 64; if (c === "R") return node === "hero" ? 24 : 120;
        if (a === "M") return 32; if (a === "E" && c === "H") return 40; if (a === "H") return 80;
        if (c === "F") return 40; if (a === "F") return 56;
        if (a === "L" && c === "S") return 16; if (a === "L12" && c === "B") return 16;
        if ((a === "S" || a === "L") && c === "B") return 20; if (a === "B" && c === "B") return 26.5;
        return 56;
      };
      // His tablet frames (21 Nov) set their own gaps in Personalized timeline, Calendar setup and the first part of
      // Falling behind; reports/figma-tablet-sections-2026-11-20/build-check.mjs checks those against his frames.
      const HIS_SECS = new Set(["5812:17084", "5812:17129"]);
      const HIS = new Set(["5812:20258", "5812:20259", "5812:20260", "5812:20296", "5812:20297", "5812:20299", "5812:20300", "5812:20302", "5812:20303", "5812:20250"]);
      for (const s of document.querySelectorAll(".fw-sec")) {
        if (HIS_SECS.has(s.dataset.figmaNode)) continue;
        const hero = s.dataset.figmaNode === "5812:16447";
        const sr = s.getBoundingClientRect();
        const items = [...s.children].filter((c) => getComputedStyle(c).display !== "none" && !c.matches(".capdemo, [data-figma-node='5812:17128']")).map((c) => {
          const tf = c.style.transform; c.style.transform = "none"; const r = c.getBoundingClientRect(); c.style.transform = tf; let top = r.top, bottom = r.bottom; // layout, not the scroll linked laptop move
          if (c.matches(".fb-effect")) { top = r.top + capTop; bottom = r.top + base; }
          return { c, k: kind(c), top, bottom, id: c.dataset.figmaNode || c.className };
        });
        const first = Math.min(...items.map((i) => i.top));
        const topWant = hero ? 0 : 64;
        if (Math.abs(first - sr.top - topWant) > 1.5) out.push(`${s.getAttribute("aria-label")}: top ${(first - sr.top).toFixed(1)}, want ${topWant}`);
        const last = Math.max(...items.map((i) => i.bottom)) + 0, lastEx = s.querySelector("[data-figma-node='5812:17128']");
        const end = lastEx && getComputedStyle(lastEx).display !== "none" ? Math.max(last, lastEx.getBoundingClientRect().bottom) : last;
        const botWant = hero ? 64 : 120;
        if (Math.abs(sr.bottom - end - botWant) > 1.5) out.push(`${s.getAttribute("aria-label")}: bottom ${(sr.bottom - end).toFixed(1)}, want ${botWant}`);
        for (const it of items) {
          let above = null;
          for (const o of items) if (o !== it && o.bottom <= it.top + 0.5 && (!above || o.bottom > above.bottom)) above = o;
          if (!above) continue;
          if (HIS.has(it.id) || HIS.has(above.id)) continue;
          const g = it.top - above.bottom;
          // 20 Nov, his ask: Rescheduling an Action Item keeps 32 between its heading and body at every width.
          const w = above.id === "5812:20246" && it.id === "5812:20247" ? 32 : want(above.k, it.k, hero ? "hero" : "");
          if (Math.abs(g - w) > 1.5) out.push(`${s.getAttribute("aria-label")}: ${above.id} (${above.k}) to ${it.id} (${it.k}) ${g.toFixed(1)}, want ${w}`);
        }
      }
      if (document.documentElement.scrollWidth > document.documentElement.clientWidth) out.push("sideways scroll");
      return out;
    });
    for (const f of found) problems.push(`${w} ${motion === "reduce" ? "reduced" : "motion"}: ${f}`);
    await page.close();
  }
  finish(`FW_TABLET2_OK ${runs} of ${runs}`);
}

function finish(ok) {
  b.close(); server.close();
  if (problems.length) { console.log(problems.join("\n")); console.log(`${problems.length} problems`); process.exit(1); }
  console.log(ok);
}
