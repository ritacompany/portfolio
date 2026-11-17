// G3: each new picture keeps the old one's width to height ratio within 1 percent. Reads PNG, WebP and SVG headers.
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
const A = "site/haven/assets/";
const pairs = [["profile-current.png","profile-card-2x.webp"],["schedule-current.png","schedule-2x.webp"],["security-pin-current.png","security-pin-2x.webp"],["security-discreet-current.png","security-discreet-2x.webp"],["chat-still.png","chat-still-2x.webp"],["profile-background-current.png","profile-background.webp"],["collage.png","collage-2x.webp"],["mvp-timeline-current.png","mvp-timeline.svg"],["program-texture.webp","program-texture-3x.webp"],["profile-bg.webp","profile-base.webp"]];
const size = (f) => { if (f.endsWith(".svg")) { const m = readFileSync(A + f, "utf8").match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/); return [+m[1], +m[2]]; }
  const o = execSync(`sips -g pixelWidth -g pixelHeight "${A + f}"`).toString(); return [+o.match(/pixelWidth: (\d+)/)[1], +o.match(/pixelHeight: (\d+)/)[1]]; };
let ok = 0;
for (const [a, b] of pairs) { const [w1, h1] = size(a), [w2, h2] = size(b); const d = Math.abs(w1 / h1 - w2 / h2) / (w1 / h1);
  if (d <= 0.01) ok++; else console.log(`${b} ratio off by ${(d * 100).toFixed(1)}%`); }
console.log(ok === pairs.length ? `RATIO_OK ${ok} of ${pairs.length}` : `RATIO_FAIL ${ok} of ${pairs.length}`); process.exit(ok === pairs.length ? 0 : 1);
