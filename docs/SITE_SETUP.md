# Site setup (S0)

16 Oct 2026. Status: done, awaiting Chadwick's review. Nothing here is deployed.

The real site lives in `site/`. It is plain HTML, CSS and JavaScript with no framework and no
bundler, built from the Figma frames, deployed by Vercel from this repo. S1 and S2 drop sections
and pages into this structure; nothing about tooling should need deciding again.

## The decision, in one line

Static multi page site in `site/`, Satoshi self hosted, GSAP and Lenis self hosted, one CSS token
file read from Figma, Vercel serving `dist/` with clean URLs, and the deploy kept on the holding
page until launch.

## Why this setup

| Choice | Why | What would change it |
|---|---|---|
| **Plain HTML, CSS and JS, no framework** | The site is five or six pages of art directed layout plus motion. A framework adds a build step and a runtime and buys nothing for content this size. Every earlier piece (the September homepage, the Haven page, the journey map, the motion audit's GSAP grammar) is already plain HTML and JS, so all of it drops in unchanged. The tracker also rules out React tooling for motion | A need for shared components across many pages, such as a CMS or a blog, which v1 does not have |
| **`site/` as the source folder** | The September homepage and the Haven case study branch (`haven/case-study`, `site/haven/`) both already use `site/`, so the Haven page merges in without moving files | None |
| **One folder per page, clean URLs** | `/mondai` reads better than `/mondai.html` in a link someone shares. Vercel's `cleanUrls` is already on in `vercel.json` | None |
| **Satoshi self hosted, three weights** | The frames use 400, 500 and 700 only. Self hosting avoids a third party font request and the flash of a fallback; the 500 weight is preloaded because it carries most of the page. Same files as the September build and the journey map (Fontshare) | A fourth weight in the frames, or the 212px display needing a variable font for its hover |
| **GSAP 3.13.0 and Lenis 1.1.20 self hosted in `site/vendor/`** | They are the versions the Haven motion was tuned with, and the audit recommends that grammar as the site wide base. Pinned files cannot change under us, and the page works offline. GSAP is free for commercial use since 3.13 | H7 needing a plugin. ScrollTrigger is not vendored yet; add `ScrollTrigger.min.js` 3.13.0 next to GSAP when H7 starts |
| **`site/css/tokens.css` read from Figma** | Colors, text styles, spacing and curves in one file, named after the Figma variables, so a color change (H19) is one edit. Every value cites its frame | Figma changing; update the token, never a component |
| **Shared behavior in small modules** (`clock.js`, `dialog.js`, `motion.js`) | Each one carries a piece that survived the redesign: the Chicago clock from September, one dialog behavior for the about panel and the compact menu (merged from the September menu and the H14 prototype), and the motion plumbing. `main.js` starts each only if its markup is on the page | None |
| **No package installs** | `package.json` has no dependencies and every script is plain Node. Nothing to install on another account or in a cloud session | A browser test runner for S3; Playwright is the likely one, as on the September branch |

## What is in `site/`

```
site/
  index.html            homepage shell: hero, superpowers, work, footer landmarks with their Figma node ids
  robots.txt            disallow all until launch
  css/tokens.css        Figma values
  css/base.css          @font-face, reset, focus ring, scroll lock, reduced motion
  js/main.js            entry point for every page
  js/clock.js           live Chicago time in the footer
  js/dialog.js          about panel and compact menu behavior
  js/motion.js          Lenis smooth scroll on the GSAP ticker, off under reduced motion
  vendor/               gsap-3.13.0.min.js, lenis-1.1.20.min.js
  assets/fonts/         satoshi-400, 500, 700 woff2
  assets/img/           logo, bolt icons
```

Planned routes, one folder each, built in S1 and S2:

| Route | Page | Waits on |
|---|---|---|
| `/` | Homepage | S1 |
| `/mondai` | Case study collection | F9 (list or cards), H13 |
| `/mondai/framework` | Framework CS | C1 |
| `/mondai/design-system` | Design system CS | C2. If it misses launch, the Mondai card links straight to `/mondai/framework` (H13) |
| `/haven` | Haven CS, from branch `haven/case-study` | C3 triage |
| `/404` | Not found | S1 |

The about panel is not a route. It opens on the homepage from the superpowers button and the nav,
and `/#about` opens it directly.

## How to work in it

```bash
npm run dev
```

Serves `site/` at http://127.0.0.1:4318 with the same clean URLs as Vercel.

```bash
npm run check
```

Fails if any link or asset in `site/` does not resolve, or if a temporary Figma asset URL slipped in
(they expire after 7 days). Run it before every commit that touches `site/`.

```bash
npm run build:site
```

Copies `site/` into `dist/` to check exactly what would deploy.

Asset rule: export from Figma with `download_assets`, save into `site/assets/img/` (or the page's own
`assets/` folder) as WebP or JPG for photos and SVG for vectors, never link a Figma URL.

## What deploys today, and what flips at launch

Nothing about the deploy changed. `npm run build`, which Vercel runs, still copies the holding page
in `public/` into `dist/`. `vercel.json` still sends `noindex, nofollow` on every response, and both
`robots.txt` files disallow everything. Vercel settings were not touched.

At launch (S4), with Chadwick's domain access:

1. In `package.json`, point `build` at the site: `node scripts/build.mjs site`.
2. In `vercel.json`, remove the `X-Robots-Tag` header.
3. Replace `site/robots.txt` with an allow rule and a sitemap line, and drop the robots meta tag.
4. Add chadwickfenner.com to the Vercel project and switch DNS.
5. Delete `public/` once the real site is live.

## Reused from earlier work

| From | Reused | Left behind |
|---|---|---|
| September homepage (`claude/optimistic-euler-q7025d`) | The sticky fix (`overflow-x: clip` on the canvas), the dialog behavior of the compact menu, the static server pattern | Its markup and CSS: built against the older design, so S1 rebuilds from the current frames |
| Later September revision (`codex/homepage-responsive`) | The Chicago clock, which prints CDT or CST correctly | The Mondai panel, superseded by the collection page |
| Haven motion plan and journey map | Lenis settings, the vendored GSAP and Lenis | The Haven page specific motion |
| `build/` | Nothing. Those are Metalab scaffold rebuilds with base64 inlined fonts; `site/` uses the same Satoshi family from files | All of it |
