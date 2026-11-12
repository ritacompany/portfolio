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

- [x] G3: no approved copy changed: the words on both Mondai pages match 9fd175b except his two cut sources lines and the approved subhead "The Rollover effect", now live text
  CHECK: node docs/motion/framework-page-gates.mjs copy
  EXPECT: COPY_UNCHANGED_OK beyond the two cut sources lines and the subhead made live
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=704cbfa125dd08c53434776c1028260b3546a85a06311decbc014f8c62d17b97; output-bytes=77

- [x] G4: no em or en dash in this round's docs, scripts and the two motion files
  CHECK: node docs/motion/framework-page-gates.mjs dashes
  EXPECT: NO_DASHES_OK 7
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=3b25a2b28a4813bcc94bc780a15887a8a2e811c291431d314bf88b8590e42332; output-bytes=15

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

- [x] G9: his audit fixes of 11 Nov hold at 1440, 768 and 390: no sources line; the schedule line on one line at 1440 and wrapping at 390; the Rollover effect live text with its icon 14.6 by 16.1 and centred on the text within 1 px; the vertical line 8 to 24 px past the body text; ending bar links padded the same both sides with no white square behind the chevron, which turns light on hover; the laptop rises into place, sits still mid read and outruns the page past its screen; the Rollover panel slides in from the left and settles; nothing moves with reduced motion
  CHECK: node docs/motion/framework-audit-gates.mjs
  EXPECT: AUDIT_FIXES_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=d344eb439f3a3d5ac735a8286df236952f40a9274cf7f71a2881b5a27bb93cc4; output-bytes=423

- [ ] G10: the Foundation diagram wipes open from 01 across to 05 with no settle, his pick on 11 Nov (part way at 0.45 s, fully open after, no transform)
  CHECK: node docs/motion/framework-audit-gates.mjs
  EXPECT: AUDIT_FIXES_OK
  EVIDENCE: pending

- [ ] G11: the Mondai mark sits at the end of the title row, inside the screen at 1440, 768 and 390 and on the 40 px margin at 1440 (he left the spot to me on 11 Nov)
  CHECK: node docs/motion/framework-audit-gates.mjs
  EXPECT: AUDIT_FIXES_OK
  EVIDENCE: pending

- [ ] G12: "Explore more case studies" is plain text, not a link (his answer, 11 Nov)
  CHECK: node docs/motion/framework-audit-gates.mjs
  EXPECT: AUDIT_FIXES_OK
  EVIDENCE: pending

- [ ] G13: the footer portraits show no outline, once he confirms which outline he means (the only candidate found: the pill's light grey fill showing as a rim above the photo)
  EVIDENCE: pending

ABANDON: G8 not applicable, not failed: the Falling behind carry was reverted at his word (he wanted page wide motion only), so no motion inside media is built; page entrances on the browser clock are reviewed in the browser, never rendered (motion rules, Scope).

## Notes, 11 Nov

- `scripts/verify-pages.mjs` now opens its page with reduced motion. Its full page shot is compared with the Figma frames, which are the pages at rest; with motion on, everything below the first screen was still hidden and the framework pixel check failed (5812:17129 2.86%, 5812:17143 4.53%, 5812:20248 4.56%). That failure is the negative control for G5: the suites gate caught it as new.
- Negative control for G1 and G2 (10 and 11 Nov): with the old Lenis path the browser gate failed on the 404 and on Lenis not running at all three widths.
