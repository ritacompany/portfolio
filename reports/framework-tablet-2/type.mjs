// Item 2: the framework page's title, Heading/40 and ending heading against Haven's title, Heading/40 and
// ending title at the same widths, inside Haven's tablet range (768 to 1159). Prints FW_TYPE_OK <n> widths.
import { serve, chromium, open } from "./serve.mjs";
const { server, base } = await serve(process.env.STRIP === "1");
const b = await chromium.launch();
const problems = [];
const W = [768, 834, 1024, 1159];
for (const w of W) {
  const fw = await open(b, base, w);
  const f = await fw.evaluate(() => {
    const fs = (sel) => parseFloat(getComputedStyle(document.querySelector(sel)).fontSize);
    const lh = (sel) => parseFloat(getComputedStyle(document.querySelector(sel)).lineHeight) / fs(sel);
    return { title: fs(".fw-title"), h40: fs(".fw-sec > .s-heading-40"), end: fs(".fw-sec > .s-display-96"), h40lh: lh(".fw-sec > .s-heading-40") };
  });
  await fw.close();
  const hv = await b.newPage({ viewport: { width: w, height: 1000 }, reducedMotion: "reduce" });
  await hv.goto(base + "/haven/", { waitUntil: "networkidle" });
  const h = await hv.evaluate(() => {
    const fs = (sel) => parseFloat(getComputedStyle(document.querySelector(sel)).fontSize);
    const lh = (sel) => parseFloat(getComputedStyle(document.querySelector(sel)).lineHeight) / fs(sel);
    return { title: fs(".hero .display"), h40: fs(".h40"), end: fs(".ending__title"), h40lh: lh(".h40") };
  });
  await hv.close();
  for (const k of ["title", "h40", "end"]) if (Math.abs(f[k] - h[k]) > 0.5) problems.push(`${w}: ${k} framework ${f[k].toFixed(2)} Haven ${h[k].toFixed(2)}`);
  if (Math.abs(f.h40lh - h.h40lh) > 0.01) problems.push(`${w}: Heading/40 line height ${f.h40lh.toFixed(3)} vs Haven ${h.h40lh.toFixed(3)}`);
  console.log(`${w}: title ${f.title.toFixed(1)}/${h.title.toFixed(1)} h40 ${f.h40}/${h.h40} ending ${f.end.toFixed(1)}/${h.end.toFixed(1)} (framework/Haven)`);
}
await b.close(); server.close();
if (problems.length) { console.log(problems.join("\n")); process.exit(1); }
console.log(`FW_TYPE_OK ${W.length} widths`);
