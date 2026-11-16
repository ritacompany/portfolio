# Gates: framework page tablet breakpoint (N8)

OWNS: reports/tablet-breakpoint/**, site/css/framework.css (tablet @media hunks only)

Scope: every issue in ISSUES.md fixed at 768, 834, 1024 and 1180, no regressions at 390 and 1440, reduced motion on and off, committed as my hunks only and pushed to claude/relaxed-ride-5mlbdu.

- [ ] G1: ISSUES.md lists every issue found at the four widths, each with a measurement or crop, and Chadwick has the list in plain words
  EVIDENCE: ISSUES.md written 12 Nov with measurements from measure.mjs and verify.mjs (82 problems across 8 runs before any fix, the positive control); list sent in this session's reply

- [ ] G2: figma-sync (N1, N3, N4) and cs2-capacity (N5) have committed before I write to framework.css or the page
  EVIDENCE: met 13 Nov: N3 8bacdaa, N5 00273ab, N10 e811763 landed before the final writes. Earlier, 12 Nov: figma-sync landed N1 and N4 (47149a4, 7bf19d5); N3 (Falling behind) and N5 (Capacity) not committed yet, so no writes to framework.css or the page

- [ ] G3: T1 to T7 measure fixed at 768, 834, 1024 and 1180 with reduced motion on and off
  CHECK: node reports/tablet-breakpoint/verify.mjs
  EXPECT: TABLET_OK 8 of 8
  EVIDENCE: 13 Nov run: exit 0, TABLET_OK 8 of 8

- [ ] G4: no regression at 390, 768, 1024, 1200 and 1366: fit, overlap, size and health suites pass
  CHECK: node scripts/verify-responsive.mjs fit framework && node scripts/verify-responsive.mjs overlap framework && node scripts/verify-responsive.mjs size framework && node scripts/verify-responsive.mjs health framework
  EXPECT: RESPONSIVE_HEALTH_OK 5 page widths
  EVIDENCE: unmet, not from this work. fit, size and health OK at 5 widths; overlap fails at 1024, 1200 and 1366 on the What's still open paragraphs (paras-tight, e811763), identically with the tablet block removed. Handed to the conductor

- [ ] G5: 1440 unchanged: the 1440 suite passes
  CHECK: node scripts/verify-1440.mjs
  EXPECT: DESKTOP_1440_OK
  EVIDENCE: unmet, not from this work. 3 of 23 fail (boxes home, boxes framework against the older Figma copy, Haven body). The tablet block leaves all 172 framework boxes identical at 390, 1200 and 1440 (route swap test). Handed to the conductor

- [ ] G6: committed with only my hunks (no git commit -a), branch pushed, never main
  EVIDENCE: d785d28 pushed to origin/claude/relaxed-ride-5mlbdu, staged by path (framework.css diff was all this session's; .claude/launch.json and others' files left out)
