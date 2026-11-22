# Gates: Home sync to "Mondai home newest" (6364:28896)

OWNS: site/index.html, site/css/**, site/haven/haven.css, site/assets/ui/logo.svg, scripts/verify-figma-sync.mjs, scripts/verify-tokens.mjs, reports/figma-sync-2026-11-22/**

Scope: the home page at 1440 matches the newest Figma frame in copy, type, colour and position, and nothing else on the site regresses.

- [x] G1: Every 1440 position, colour and type value read from 6364:28896 matches the built page.
  CHECK: node scripts/verify-figma-sync.mjs
  EXPECT: /^FIGMA_SYNC_OK \d+ checks$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=5fc1711cf511/16 entries; EXPECT=matched; output-sha256=0116c15d3dca41971e3f69ae680cd357a39d8c05dad99e7f46c85a0a87fac605; output-bytes=25

- [x] G2: The tokens equal the Portfolio Design library's text styles and variables as re-read on 22 Nov.
  CHECK: node scripts/verify-tokens.mjs
  EXPECT: TOKENS_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=5fc1711cf511/16 entries; EXPECT=matched; output-sha256=a14b68f9c220a6cd9847ab4357d556903bf0ac37e7c1196a384e068fcee74cbc; output-bytes=64

- [x] G3: Every link hover still swaps instantly on every page, Haven's nav included.
  CHECK: node scripts/verify-hover-still.mjs
  EXPECT: HOVER_STILL_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=5fc1711cf511/16 entries; EXPECT=matched; output-sha256=ec4304a9d1ac05ae7d959cf669818d54e37abfa0c0833309cbe95b942086c72f; output-bytes=25

- [x] G4: All 11 site pages load clean.
  CHECK: node scripts/check-site.mjs
  EXPECT: site check OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=5fc1711cf511/16 entries; EXPECT=matched; output-sha256=5520f7a5c107ad31202ebb66961fffd13a416e165c7a117b7259b83718261b0a; output-bytes=27

- [x] G5: The home page carries no raw colour or type values outside tokens.
  CHECK: node scripts/verify-pages.mjs shared home
  EXPECT: /^SHARED_OK$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=5fc1711cf511/16 entries; EXPECT=matched; output-sha256=a8a8ab0ea9b1034faa975cd4c6e93d5612b2d790d69b30c3d7f32fda56d5e150; output-bytes=10

- [x] G6: The taste audit adds no new finding (needs npm run dev running, so manual).
  EVIDENCE: npm run taste, 22 Nov, after the last edit: 6 of 6 checks ran, findings 1, the known "Design system CS" line on /mondai/ at 390 (docs/PROJECT_CONTEXT.md lists it as left on purpose). Positive control: the same audit flagged figure.quote before the wrapper was renamed, so the check fires on this page.

- [x] G7: Every part of his ask is covered: hero supporting text and its max width, every style on the page checked against the frame, light and dark mode checked.
  EVIDENCE: Hero line copied from 6364:28913, max-width 457px in home.css, checked by G1 (text and w 457). All 42 visible text layers dumped with style, size, line, tracking, colour and variable, plus the layout tree; every difference is a row in DIFF.md. Text styles re-read from the Portfolio Design library. Light and dark: the frame and its footer instance have only dark fills (#040405 page, Neutral fills on text); no light mode exists to sync (DIFF Q4). Full page pixel overlay against the Figma render showed no layout offsets left at 1440.
