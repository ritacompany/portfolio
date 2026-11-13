# Gates: Haven page tablet breakpoint

OWNS: reports/haven-tablet/**, site/haven/haven.css, site/haven/current.css, site/haven/pill-tips.css (tablet @media hunks only, plus a Haven body fix if its cause is in these files)

Scope: every issue in ISSUES.md fixed at 768, 834, 1024 and 1180 with reduced motion on and off, 390 and 1440 unchanged by the tablet rules, the 1440 Haven body failure explained (and fixed if it is Haven's own), committed as my files only and pushed to claude/relaxed-ride-5mlbdu.

- [x] G1: ISSUES.md lists every issue found at the four widths, each with a measurement or crop, and Chadwick has the list in plain words
  EVIDENCE: ISSUES.md written 13 Nov: H1 and H2 with measurements from measure.mjs and two committed crops; the list is in this session's reply to Chadwick

- [x] G2: every issue measures fixed at 768, 834, 1024 and 1180, reduced motion on and off
  CHECK: node reports/haven-tablet/verify.mjs
  EXPECT: ^HAVEN_TABLET_OK 8 of 8$
  EVIDENCE: 13 Nov run: exit 0, HAVEN_TABLET_OK 8 of 8. Positive control: with the block stripped it exits 1 with 14 problems

- [x] G3: the tablet rules move nothing at 390, 1200 and 1440 (route swap: element boxes with the tablet hunks removed equal boxes with them in)
  CHECK: node reports/haven-tablet/swap.mjs
  EXPECT: ^HAVEN_SWAP_OK 3 widths$
  EVIDENCE: 13 Nov run: exit 0, 474 boxes identical at 390, 1200 and 1440; control differs at 768 (10) and 1180 (304)

- [x] G4: Haven's own suites pass after the work as they did before it (motion; body judged by G5)
  CHECK: node scripts/verify-haven.mjs motion
  EXPECT: ^HAVEN_MOTION_OK$
  EVIDENCE: HAVEN_MOTION_OK before (baseline run) and after

- [x] G5: the cause of the 1440 Haven body failure is found and written in ISSUES.md; fixed if it lives in Haven's own stylesheets, otherwise reported with its owner
  EVIDENCE: verify-haven body compares against 87d58cd (9 Nov); every differing band is a later deliberate Haven commit (crops viewed). 89,529 changed pixels before and after this work. Not in Haven's stylesheets, so reported in ISSUES.md with its owner (shared scripts), not fixed

- [x] G6: no regression in the shared responsive suites for Haven (fit, size and health)
  CHECK: node scripts/verify-responsive.mjs fit haven && node scripts/verify-responsive.mjs size haven && node scripts/verify-responsive.mjs health haven
  EXPECT: RESPONSIVE_HEALTH_OK
  EVIDENCE: 13 Nov run: exit 0, RESPONSIVE_FIT_OK, RESPONSIVE_SIZE_OK and RESPONSIVE_HEALTH_OK at 5 page widths

- [x] G7: committed with only my files and hunks (no git commit -a), branch pushed, never main
  EVIDENCE: 41b148b pushed to origin/claude/relaxed-ride-5mlbdu, staged by path: site/haven/current.css (16 added lines, all this session's) and reports/haven-tablet/; others' files left out
