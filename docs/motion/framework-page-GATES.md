# Gates: framework page motion, live on the site

OWNS: docs/motion/framework-page*, site/js/mondai-motion.js, site/css/mondai-motion.css, site/mondai/index.html, site/mondai/framework/index.html, site/dev/preview/mondai-motion.js, site/dev/preview/mondai-motion.css, scripts/verify-pages.mjs

Scope: Haven's page motion (text fades, media curtains, arrival wait, Lenis at 0.1) runs on the real Mondai pages, `/mondai/framework/` and `/mondai/`, from `site/js/mondai-motion.js` and `site/css/mondai-motion.css`, served normally and from the built output, with no section specific animation and every static image left as it is. Checks run from the repository root.

- [x] G1: the framework page served normally (`scripts/serve.mjs site`, not studio) runs the motion at 1440, 768 and 390 with no page error and no failed request: every item below the fold starts hidden and ends final after a scroll through, Lenis lerp is 0.1, timings equal Haven's; with reduced motion nothing is hidden and Lenis is off; the collection page arrives on load the same way
  CHECK: node docs/motion/framework-page-gates.mjs browser site
  EXPECT: BROWSER_GATES_OK site 5 runs
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=d330c18961709c39d2dcbda0864aa5b6e78d0d3a7943db3f334d436133e5545d; output-bytes=576

- [x] G2: the same holds on the built output (`node scripts/build.mjs site`, then dist/ served), so the motion ships and does not depend on site/dev
  CHECK: node docs/motion/framework-page-gates.mjs browser dist
  EXPECT: BROWSER_GATES_OK dist 5 runs
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=c7065cf93fc28a5329223164bee83f4376b8a66366e98573b6e05a8b08a1e0df; output-bytes=576

- [x] G3: no approved copy and no image changed: the only lines changed in `site/mondai` since 6341aa0 are the added motion stylesheet and the two scripts
  CHECK: node docs/motion/framework-page-gates.mjs copy
  EXPECT: COPY_UNCHANGED_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=ba29331c84b4dd9002744fd668807e946dd9b44c5343882c547b2787f1615066; output-bytes=39

- [x] G4: no em or en dash in this round's docs, scripts and the two motion files
  CHECK: node docs/motion/framework-page-gates.mjs dashes
  EXPECT: NO_DASHES_OK 6
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=74f7ae92273a86c6fc8e08d398ebd4048ad0eeb9fe83b0e2c172a89561b781d7; output-bytes=15

- [x] G5: the site's suites hold: verify-1440 adds no failure to the three already on fa3779d (home lede box, framework footer box, Haven body, all from the Figma sync), and verify-responsive passes health, fit, overlap and size on every page
  CHECK: node docs/motion/framework-page-gates.mjs suites
  EXPECT: /SUITES_OK verify-1440 \d+ known failures, 0 new; verify-responsive 4 modes/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=c41436f6f473852591b5d76759255cc0c7246922dd1974ca89d8e76d254e7617; output-bytes=73

- [x] G6: the preview copies are gone, so studio never runs the motion twice
  CHECK: node -e "const f=require('fs');const g=['site/dev/preview/mondai-motion.js','site/dev/preview/mondai-motion.css'].filter(p=>f.existsSync(p));console.log(g.length?'STILL '+g:'PREVIEW_COPIES_GONE');process.exit(g.length?1:0)"
  EXPECT: PREVIEW_COPIES_GONE
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=e653f67ef23d55e33fe214fbac8d5c0462685d19a12b995f8d9f365d47b389a7; output-bytes=20

- [x] G7: checked in the built-in browser on the normal server at 1440, 768 and 390
  EVIDENCE: manual, 11 Nov: page loads only site scripts (fit-desktop, contact-goo, site, /vendor/lenis-1.1.20.min.js, /js/mondai-motion.js), no failed request on the page, Lenis lerp 0.1 and Haven's timings at all three widths, items below the fold hidden at load (83 of 96 at 1440, 77 of 90 at 768, 79 of 92 at 390; the rest are rules and plates outside the hidden set). The pane was hidden, so it ran no animation frames, and it cannot emulate reduced motion: playback and reduced motion are proven by G1 and G2 in headless Chromium.

- [ ] G8: `scripts/motion-check.mjs` passes for motion built inside media
  EVIDENCE: pending

ABANDON: G8 not applicable, not failed: the Falling behind carry was reverted at his word (he wanted page wide motion only), so no motion inside media is built; page entrances on the browser clock are reviewed in the browser, never rendered (motion rules, Scope).

## Notes, 11 Nov

- `scripts/verify-pages.mjs` now opens its page with reduced motion. Its full page shot is compared with the Figma frames, which are the pages at rest; with motion on, everything below the first screen was still hidden and the framework pixel check failed (5812:17129 2.86%, 5812:17143 4.53%, 5812:20248 4.56%). That failure is the negative control for G5: the suites gate caught it as new.
- Negative control for G1 and G2 (10 and 11 Nov): with the old Lenis path the browser gate failed on the 404 and on Lenis not running at all three widths.
