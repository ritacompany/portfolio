# Gates: Mondai case study collection, transitions and cursor button (20 Nov review, session 4)

OWNS: site/mondai/index.html, site/css/collection.css, site/assets/collection/**, site/js/cursor-button.js, site/css/cursor-button.css, site/index.html, site/css/home.css, site/js/page-transition.js, site/css/page-transition.css, site/mondai/framework/index.html (head and script tags only), site/js/mondai-motion.js (collection selectors only), docs/DECISIONS.md, docs/motion/cursor-button/**, docs/motion/page-transition/**, scripts/check-collection.mjs, reports/mondai-collection-2026-11-20/**

Scope: /mondai/ is rebuilt from Figma frame 6331:27875 (old Multi-CS frame retired), the home Mondai and
Haven cards and the collection's framework card show a cursor that turns into a button, and the
home to collection to framework page change is built from the settled decision, or held for his answer.

- [x] G1: At 1440 by 949 the wordmark, label, three card headers and three image slots sit within 2 px of the Figma boxes in 6331:27875, and the image slots are 394 by 469.
  CHECK: node scripts/check-collection.mjs boxes
  EXPECT: BOXES PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=39b8913b4b933c7b224bfc92e5bd5dc0e36a7840e761d4cbf08882186ae1649c; output-bytes=11

- [x] G2: No horizontal page scroll and no overlapping text boxes on /mondai/ at 390, 768, 1024 and 1440.
  CHECK: node scripts/check-collection.mjs fit
  EXPECT: FIT PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=137ba1b85e7ba40cd3afee6e182b9ffa6200dc1b041022b26ab88c32235ce089; output-bytes=9

- [x] G3: Hovering the framework card image shows a button that reads "View case study" under the pointer and hides the system cursor there; the two locked cards show no button and are not links.
  CHECK: node scripts/check-collection.mjs cursor
  EXPECT: CURSOR PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=9fa4a4914ee3303c24483585d774696a2f368d58784bd85d3ab3133bccf417fd; output-bytes=12

- [x] G4: On Home, hovering the Mondai card image shows the cursor button with the Mondai label, and it follows the pointer (position changes when the pointer moves); keyboard focus shows a static button.
  CHECK: node scripts/check-collection.mjs home
  EXPECT: HOME PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=02fd556f2a594497e0284821f7641031e37661a245ef39c2811c5a5485c70dfe; output-bytes=10

- [x] G5: With reduced motion on, the cursor button sits exactly on the pointer (no lag) and nothing on /mondai/ animates on load.
  CHECK: node scripts/check-collection.mjs reduced
  EXPECT: REDUCED PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=9f5ac0eb8402548c310126d007bd2b3f32d4d2eceb7916e9d61cf60caf027247; output-bytes=13

- [x] G6: Nothing in site/ still renders the old frame: no data-figma-node 5812:22999 or its rows (5812:23014, 23015, 23016), and the retirement is in docs/DECISIONS.md.
  CHECK: node scripts/check-collection.mjs retired
  EXPECT: RETIRED PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=e12b1424dea5e784f58264ca06fed84511fe9d813aa4e00364c2085c384b2803; output-bytes=13

- [x] G7: Page transitions: either built from a settled decision found in the records (cited), or the search and one question are put to him with nothing guessed shipped as final.
  EVIDENCE: 20 Nov: no record found (searched list in docs/motion/page-transition/style_guide.md); lead session asked; provisional build labelled PROVISIONAL in code and docs; one question put to him in the session reply.

- [x] G8: Copy on the new page and in the cursor labels passes the dash and Oxford comma rules and uses sentence case.
  CHECK: node scripts/check-collection.mjs copy
  EXPECT: COPY PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=53e9369f8b402ff11541a45e68d3b65ed48da469652418397cdea7e47fe602e9; output-bytes=10

- [x] G9: Figma frame re-read right before the final build step shows no change he made that the build lacks (node list and text compared).
  EVIDENCE: 20 Nov: get_metadata of 6331:27875 re-read after the build, byte identical to the first read (node ids, names, positions); text matched against get_design_context of the same session.

- [x] G10: Preview artifact at 390, 768 and 1440 published; draft PR into claude/relaxed-ride-5mlbdu open; lead sent the PR link.
  EVIDENCE: 20 Nov: artifact https://claude.ai/artifact/LPQDoodChTDDuyiXEKfw7H (2x shots at three widths, live cursor button with the edit panel); draft PR https://github.com/ritacompany/portfolio/pull/30; lead message delivered.

- [ ] G11: Chadwick has felt the cursor button on the published tuner (site/dev/cursor-button/) and sent values back or said it feels right (motion rules: an interactive piece stays open until he has).
  EVIDENCE: pending
