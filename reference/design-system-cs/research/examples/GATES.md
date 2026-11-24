# Gates: keep the ten design system examples for later

OWNS: reference/design-system-cs/research/examples/**

Scope: every one of the ten pages in EXAMPLES.md is captured whole (screens of the full page plus its text) into a private archive, and a public safe study file records what each page shows, section by section, so the set can be used without reopening the pages.

- [x] G1: the archive holds, for each of the ten pages, screens covering the full page height and the page text
  CHECK: node check-archive.mjs
  EXPECT: ARCHIVE-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=d273c47867c6/16 entries; EXPECT=matched; output-sha256=a786a75433282fc136efc92908fd5ffecf49bf1a0e2de066c5135e12703b0056; output-bytes=13

- [x] G2: STUDY.md has one section per page with its structure, visuals, numbers and what to take, matching the ten links in EXAMPLES.md, with no dash punctuation, no Oxford comma and no long quotes (public repo)
  CHECK: node check-study.mjs
  EXPECT: STUDY-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=d273c47867c6/16 entries; EXPECT=matched; output-sha256=c6675f8b840d205a96f6afb26e2d7c1e688745e35c154b5533a2a3fa5fd19f09; output-bytes=11

- [x] G3: the private archive artifact is published and lists every page with its screens, and STUDY.md links to it
  EVIDENCE: 24 Nov 2026, https://claude.ai/artifact/Q5CKQKpkyB9bEWRXdpdP7s holds 185 files (page, data, 10 texts, 173 screens) per the artifact file listing; Playwright run at 390, 768, 1280 and 1920 px: no sideways scroll, list and notes collapse, arrow keys move screens and examples, every screen loads, no script errors.

- [x] G4: STUDY.md, the checks and this ledger are on the remote branch
  CHECK: node check-pushed.mjs
  EXPECT: PUSHED-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research/examples; path=d273c47867c6/16 entries; EXPECT=matched; output-sha256=e07522c72bf03aa0492a25afab6f4928ebd92b6d272269a18cf6737b65514df8; output-bytes=12
