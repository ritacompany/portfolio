# Gates: home page tablet breakpoint

OWNS: reports/home-tablet/**, site/css/home.css (tablet @media hunks only)

Scope: every issue in ISSUES.md fixed at 768, 834, 1024 and 1180, no change at 390 and 1440, reduced motion on and off, the boxes home failure in verify-1440 traced to its cause, committed as my hunks only and pushed to claude/relaxed-ride-5mlbdu.

- [ ] G1: ISSUES.md lists every issue found at the four widths, each with a measurement or crop, and Chadwick has the list in plain words
  EVIDENCE: ISSUES.md written 13 Nov: H1 (hero 760 tall on every tablet screen) and H2 (the 1440 check's stale lede id), with measurements and a crop; list sent in this session's report

- [ ] G2: every issue measures fixed at 768, 834, 1024 and 1180 with reduced motion on and off
  CHECK: node reports/home-tablet/verify.mjs
  EXPECT: ^HOME_TABLET_OK 8 of 8$
  EVIDENCE: 13 Nov run: exit 0, HOME_TABLET_OK 8 of 8

- [ ] G3: verify.mjs fails on the page as it was before the fixes (positive control)
  CHECK: node reports/home-tablet/verify.mjs control
  EXPECT: ^CONTROL_FAILS_AS_EXPECTED \d+ problems$
  EVIDENCE: 13 Nov run: exit 0, CONTROL_FAILS_AS_EXPECTED 14 problems

- [ ] G4: 390, 1200 and 1440 unchanged: every element box on home is identical with the tablet block on and off
  CHECK: node reports/home-tablet/route-swap.mjs
  EXPECT: ^ROUTE_SWAP_OK 3 widths \d+ boxes$
  EVIDENCE: 13 Nov run: exit 0, ROUTE_SWAP_OK 3 widths 450 boxes (footer clock frozen; unfrozen, only the clock text width differed)

- [ ] G5: the boxes home failure in verify-1440 has a named cause, fixed if it sits in home's own files, otherwise written in ISSUES.md and reported
  EVIDENCE: cause named: 299b09b renamed the hero line's id to 4929:12396; scripts/figma-pages.json still asks for 5812:22877. Not home's own file, so not fixed; written as H2 and reported. The line's 1440 box matches the expected one exactly

- [ ] G6: no file outside OWNS changed by this work, committed by path, branch pushed, never main
  EVIDENCE: committed by path: home.css tablet hunk and reports/home-tablet only
