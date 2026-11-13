// N10 gate: framework page sections against WIP Mondai framework case study 4269:9433 (read 12 Nov).
// Checks section order and heights at 1440 and the boxes of every element moved in this sync.
// Prints ORDER_OK and BOXES_OK, exit 0 only when all pass. Needs the site served on the port in argv[2] (default 4319).
import { createRequire } from "node:module";
const { chromium } = createRequire(new URL("../../package.json", import.meta.url).pathname)("playwright");
const port = process.argv[2] || "4319";
// [aria-label, Figma height] in frame order; Start of week is one carousel section on the site (start-of-week owns it).
const order = [["Introduction", 647], ["Competitive analysis", 905], ["The foundation we built on", 1027.13], ["Growth Journey", 1243],
  ["Pathway", 1239.56], ["Action hub", 1410], ["Action item", 1741.88], ["Personalized timeline", null], ["Calendar setup", 1503],
  ["Schedule view", 2079], ["Buffer flow", 1152], ["Falling behind", 2025], ["Start of week", null], ["What’s still open", 831]];
// [node, left, top, width] relative to its section, from the frame.
const boxes = [["5812:16473",273,64],["5812:16474",273,117],["5812:16480",273,360],["5812:16481",273,386],["5812:16482",273,424],
  ["5812:16485",739,360],["5812:16486",739,386],["5812:16487",739,424],["5812:16491",273,557],["5812:16492",273,583],["5812:16493",273,621],
  ["5812:16496",739,557],["5812:16497",739,583],["5812:16498",739,621],
  ["5812:17150",154,419,700],["5812:20246",817,1466],["5812:20247",817,1512,448],["5812:20114",154,1406,547],
  ["5812:21563",156,64],["5812:21564",149,134],["5812:21566",272,565,900]];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto(`http://localhost:${port}/mondai/framework/`, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
const got = await p.evaluate((boxes) => ({
  secs: [...document.querySelectorAll("main.fw > section.fw-sec")].map((s) => [s.getAttribute("aria-label"), s.getBoundingClientRect().height]),
  boxes: boxes.map(([id]) => { const e = document.querySelector(`[data-figma-node="${id}"]`); if (!e) return null; const s = e.closest("section").getBoundingClientRect(), r = e.getBoundingClientRect(); return [r.left - s.left, r.top - s.top, r.width]; })
}), boxes);
await b.close();
const bad = [];
if (got.secs.length !== order.length) bad.push(`sections ${got.secs.length}, frame ${order.length}`);
order.forEach(([name, h], i) => { const g = got.secs[i]; if (!g || g[0] !== name) bad.push(`section ${i} is ${g && g[0]}, frame ${name}`); else if (h != null && Math.abs(g[1] - h) > 1.5) bad.push(`${name} height ${g[1].toFixed(1)}, frame ${h}`); });
if (!bad.length) console.log("ORDER_OK");
const bad2 = [];
boxes.forEach(([id, x, y, w], i) => { const g = got.boxes[i]; if (!g) return bad2.push(`${id} missing`); if (Math.abs(g[0]-x) > 1.5 || Math.abs(g[1]-y) > 1.5 || (w && Math.abs(g[2]-w) > 1.5)) bad2.push(`${id} at ${g.map(v=>v.toFixed(1)).join(",")}, frame ${x},${y}${w?","+w:""}`); });
if (!bad2.length) console.log("BOXES_OK");
if (bad.length || bad2.length) { console.error([...bad, ...bad2].join("\n")); process.exit(1); }
