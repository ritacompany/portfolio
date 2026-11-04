// Output checks for the editor layout research and structure. Usage: node check.mjs g1|g2|g3
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
const dir = fileURLToPath(new URL("./", import.meta.url));
const root = fileURLToPath(new URL("../../../", import.meta.url));
const which = process.argv[2];
if (which === "g1") {
  const s = readFileSync(dir + "research.md", "utf8");
  const tools = (s.match(/^### /gm) || []).length, urls = (s.match(/https?:\/\//g) || []).length;
  console.log(tools >= 6 && urls >= 6 ? `RESEARCH_OK ${tools} tools ${urls} urls` : `RESEARCH_SHORT ${tools} ${urls}`);
} else if (which === "g2") {
  const e = readFileSync(root + "site/motion-lab/fb-engine.js", "utf8");
  const a = e.indexOf("DEFAULTS = {"), d = e.slice(a, e.indexOf("};", a));
  const keys = [...d.matchAll(/(\w+):/g)].map((m) => m[1]);
  const s = readFileSync(dir + "structure.md", "utf8");
  const miss = keys.filter((k) => !s.includes("`" + k + "`"));
  console.log(miss.length ? "MISSING " + miss.join(",") : "ALL_HOMED " + keys.length);
} else if (which === "g3") {
  const s = readFileSync(dir + "structure.md", "utf8");
  const r = s.split(/^## /m).slice(1), bad = r.filter((x) => !/Pattern:/.test(x));
  console.log(r.length >= 4 && !bad.length ? "REGIONS_GROUNDED " + r.length : `UNGROUNDED ${bad.length} of ${r.length}`);
}
