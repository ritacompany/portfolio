import { cp, mkdir, rm } from "node:fs/promises";

const projectRoot = new URL("../", import.meta.url);
const publicDirectory = new URL("public/", projectRoot);
const outputDirectory = new URL("dist/", projectRoot);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(publicDirectory, outputDirectory, { recursive: true });
