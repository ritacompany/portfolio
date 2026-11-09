// Gate helper: renders the Contact button lab clip twice at the final settings and compares the
// two sha256 lines the renderer prints. Prints RENDER_MATCH only when they are equal.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
// The renderer wants the Playwright module path; point it at whatever playwright node resolves here.
if (!process.env.PLAYWRIGHT_MODULE) { try { process.env.PLAYWRIGHT_MODULE = createRequire(import.meta.url).resolve("playwright").replace(/index\.js$/, "index.mjs"); } catch {} }
const args = ["scripts/render.mjs", "--page", "site/motion-lab/contact-button.html", "--width", "560", "--height", "520", "--fps", "60", "--dur", "6", "--sub", "1"];
const sha = (out) => { const r = spawnSync(process.execPath, [...args, "--out", out], { encoding: "utf8" }); if (r.status !== 0) { console.error(r.stderr || r.stdout); process.exit(1); } const m = (r.stdout + r.stderr).match(/sha256[^\n]*([0-9a-f]{64})/); return m ? m[1] : null; };
const a = sha("output/motion/contact-button-560x520.mp4"), b = sha("output/motion/contact-button-560x520-again.mp4");
if (!a || !b) { console.error("no sha256 line in the render output", a, b); process.exit(1); }
if (a !== b) { console.error(`RENDER_DIFF ${a} ${b}`); process.exit(1); }
console.log(`RENDER_MATCH ${a}`);
