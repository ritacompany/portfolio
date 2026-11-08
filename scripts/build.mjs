import { cp, mkdir, rm } from "node:fs/promises";

// `npm run build` copies public/ (the holding page Vercel deploys today) into dist/.
// `npm run build:site` copies site/ (the real site) into dist/ for a local check.
// At launch (S4) the default flips to site/; see docs/SITE_SETUP.md.
const source = process.argv[2] === "site" ? "site/" : "public/";

const projectRoot = new URL("../", import.meta.url);
const sourceDirectory = new URL(source, projectRoot);
const outputDirectory = new URL("dist/", projectRoot);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
// site/motion-lab/ holds motion work pages and pipeline samples (.claude/motion-rules.md) and
// site/dev/ holds the component sheet and its Figma references. Neither ever ships.
const unshipped = ["site/motion-lab", "site/dev"].map((dir) => new URL(dir, projectRoot).pathname);
await cp(sourceDirectory, outputDirectory, { recursive: true, filter: (from) => !unshipped.some((dir) => from === dir || from.startsWith(dir + "/")) });
