// Route swap: every element box on the framework page with the tablet block in and with it removed
// (serve.mjs strip) must match at 390, 1200 and 1440; at 768 they must differ (the control).
// Prints FW_SWAP_OK 3 widths.
process.env.FIX_CLOCK = "1"; // the footer clock ticks between loads
const { serve, chromium, open } = await import("./serve.mjs");
const on = await serve(false), off = await serve(true);
const b = await chromium.launch();
const boxes = async (base, w) => {
  const page = await open(b, base, w);
  const r = await page.evaluate(() => [...document.querySelectorAll(".canvas *")].map((e) => { const q = e.getBoundingClientRect(); return `${e.tagName}${e.dataset.figmaNode || ""} ${q.left.toFixed(1)} ${(q.top + scrollY).toFixed(1)} ${q.width.toFixed(1)} ${q.height.toFixed(1)} ${getComputedStyle(e).fontSize}`; }));
  await page.close(); return r;
};
const problems = [];
for (const w of [390, 1200, 1440, 768]) {
  const a = await boxes(on.base, w), c = await boxes(off.base, w);
  let diff = 0; for (let i = 0; i < Math.max(a.length, c.length); i++) if (a[i] !== c[i]) { diff++; if (process.env.SHOW && w !== 768) console.log("  ", a[i], "|", c[i]); }
  console.log(`${w}: ${a.length} boxes, ${diff} differ`);
  if (w === 768 ? diff === 0 : diff !== 0) problems.push(`${w}: ${diff} differ`);
}
await b.close(); on.server.close(); off.server.close();
if (problems.length) { console.log(problems.join("\n")); process.exit(1); }
console.log("FW_SWAP_OK 3 widths");
