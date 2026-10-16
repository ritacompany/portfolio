// `npm run check`: every local link and asset in site/*.html must resolve to a real file,
// and nothing may point at a Figma asset URL (they expire after 7 days).
// This is the cheap half of launch check L5. Browser checks (states, breakpoints) come in S3.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(new URL("../site/", import.meta.url).pathname);
const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) { if (name !== "vendor") walk(path); }
    else if (name.endsWith(".html")) pages.push(path);
  }
})(root);

const exists = (p) => { try { return statSync(p).isFile() || statSync(join(p, "index.html")).isFile(); } catch { try { return statSync(p + ".html").isFile(); } catch { return false; } } };

const problems = [];
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const [, attr, url] of html.matchAll(/\b(href|src|srcset|poster)="([^"]+)"/g)) {
    for (const ref of attr === "srcset" ? url.split(",").map((s) => s.trim().split(/\s+/)[0]) : [url]) {
      if (/figma\.com\/api\/mcp\/asset/.test(ref)) { problems.push(`${relative(root, page)}: temporary Figma asset ${ref}`); continue; }
      if (/^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
      const clean = ref.split(/[?#]/)[0];
      const target = clean.startsWith("/") ? join(root, clean) : join(dirname(page), clean);
      if (!exists(target)) problems.push(`${relative(root, page)}: ${attr}="${ref}" does not resolve`);
    }
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\nsite check failed: ${problems.length} problem(s) in ${pages.length} page(s)`);
  process.exit(1);
}
console.log(`site check OK (${pages.length} page(s))`);
