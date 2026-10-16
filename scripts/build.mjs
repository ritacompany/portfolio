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
await cp(sourceDirectory, outputDirectory, { recursive: true });
