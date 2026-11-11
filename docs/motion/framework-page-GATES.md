# Gates: framework page motion

OWNS: docs/motion/framework-page*, site/dev/preview/mondai-motion.js

Scope: the framework case study (`site/mondai/framework/`, Figma 5812:16446) has Haven's motion as built, at L1, through the preview layer `site/dev/preview/mondai-motion.js` and `.css` (6341aa0), with a plan for every block and the new ideas held for his yes. Checks run from the repository root; `framework-page-gates.mjs browser` starts its own studio server and drives headless Chromium.

- [x] G1: the page loads with no page error and no failed site request at 1440, 768 and 390, with motion and with reduced motion (studio tooling requests excluded)
  CHECK: node docs/motion/framework-page-gates.mjs browser
  EXPECT: BROWSER_GATES_OK 5 runs
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=5fa38a6a331e920671f9eaedf2c3e3d4cc09dffc492b8f3fba1874981b1df9b0; output-bytes=375

- [x] G2: every Haven precedent block animates and Lenis runs: with motion on, every item below the fold starts hidden and every item is final after a scroll through, and the timings equal Haven's (text 1.4 s, 0.15 s step, 100 px trigger, media 1.2 s from 1.3, arrival 0.35 s); reduced motion shows every final state at load with no Lenis. Asserted by the same browser run as G1
  CHECK: node docs/motion/framework-page-gates.mjs browser
  EXPECT: BROWSER_GATES_OK 5 runs
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=5fa38a6a331e920671f9eaedf2c3e3d4cc09dffc492b8f3fba1874981b1df9b0; output-bytes=375

- [x] G3: no approved copy changed: `site/mondai` is identical to 6341aa0
  CHECK: node docs/motion/framework-page-gates.mjs copy
  EXPECT: COPY_UNCHANGED_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=224ec90ec0bcb9347af16fa3e1c4934a439c43104d972c448662f7be04d881f6; output-bytes=18

- [x] G4: no em or en dash in this round's docs and scripts
  CHECK: node docs/motion/framework-page-gates.mjs dashes
  EXPECT: NO_DASHES_OK 4
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=82533ff0d968f4a9c2c1f7e3a13c93d48538ebfaffdf47001c761608d28a79b8; output-bytes=15

- [x] G5: the motion plan gives every block of the page its Haven pattern and the reason, then lists every block needing a motion idea Haven does not have as waiting on his yes; no Oxford commas in it (read against the 14 sections and the ending bar in the page markup)
  EVIDENCE: manual, 11 Nov: the block table has 15 rows matching the 14 section aria labels plus the ending bar in site/mondai/framework/index.html; four waiting blocks listed with their lab paths; Oxford comma scan (", and" and ", or") found three list commas, all rewritten

- [ ] G6: `scripts/motion-check.mjs` passes for the motion built this round
  EVIDENCE: pending

- [x] G7: the work is committed and pushed to `claude/relaxed-ride-5mlbdu`
  CHECK: git status --porcelain=v1 --branch docs/motion site/dev/preview/mondai-motion.js
  EXPECT: /^## claude\/relaxed-ride-5mlbdu\.\.\.origin\/claude\/relaxed-ride-5mlbdu\s*$/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site/docs/motion; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=8af7348b64cd41c0dbbf431d69185a61a03bef1f8970e64a63a8b60f68622e0c; output-bytes=66

ABANDON: G6 not applicable, not failed: the motion rules (Scope) review page entrances on the browser clock in the browser and never render them, and no motion inside media was built this round. It becomes a real gate for whichever waiting block he says yes to.

## Results, 11 Nov

Run in headless Chromium (Playwright) against `npm run studio`, because the built-in browser pane was
hidden and a hidden pane never fires the observers. Script: the check above, at each width and mode.

| Run | Lenis | Items | Hidden below the fold at load | Not final after scroll through | Timing diffs | Page errors | Site 404s |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 | on | 126 | 114 of 114 | 0 | none | 0 | 0 |
| 768 | on | 121 | 107 of 107 | 0 | none | 0 | 0 |
| 390 | on | 121 | 111 of 111 | 0 | none | 0 | 0 |
| 1440 reduced | off | 126 | 0 | 0 | not run (layer stands down) | 0 | 0 |
| 390 reduced | off | 121 | 0 | 0 | not run (layer stands down) | 0 | 0 |

- Gate ids above were renumbered when the ledger moved to the unlazy format; the checker output is the record.
- Negative control: with the old Lenis path restored for one run, the browser gate failed on the 404 and on Lenis not running at all three widths.
- Fixed this round: Lenis never loaded in the preview. The layer looked for it at `/dev/vendor/`, a 404,
  so the page scrolled natively. It now resolves `/vendor/` from both the studio and the phone build.
- Lenis runs at the Scroll feel panel's lerp (0.075 today), not Haven's 0.1, by design of the preview:
  every page follows his panel while he tunes it. The two errors per run are studio tooling (Flare's
  Geist CSS and the 4321 health ping), not the page.
