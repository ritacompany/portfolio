// Writes the proposal page: the live framework page's markup with the phone proposal stylesheet linked after
// the page's own CSS. Rerun after the live page changes so the proposal never drifts from it.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { repo } from "./serve.mjs";
const live = join(repo, "site", "mondai", "framework", "index.html");
const dir = join(repo, "site", "dev", "framework-mobile");
const src = readFileSync(live, "utf8");
const link = '<link rel="stylesheet" href="/css/capacity-demo.css">';
if (!src.includes(link)) { console.error("anchor stylesheet link not found"); process.exit(1); }
const out = src.replace(link, link + '\n  <link rel="stylesheet" href="/dev/framework-mobile/phone.css"><!-- proposal, 23 Nov -->')
  .replace("<title>Framework case study", "<title>Proposal: framework case study on a phone");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "index.html"), out);
console.log("DEV_PAGE_WRITTEN");
