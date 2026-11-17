// Screenshot of the Haven profile picture frame (.pframe and the phone over it) at a given width, 2x.
import { createRequire } from "node:module";
import { serve, settle } from "../haven-tablet/serve.mjs";
const { server, base } = await serve();
const { chromium } = createRequire(import.meta.url)("playwright");
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +process.argv[2], height: 900 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
await p.goto(base + "/haven/", { waitUntil: "networkidle" }); await p.evaluate(() => document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"))); await settle(p);
await p.locator(".profile__phone").screenshot({ path: process.argv[3] }); await b.close(); server.close();
