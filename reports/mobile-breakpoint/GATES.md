# Gates: case study mobile breakpoint (under 768)

OWNS: reports/mobile-breakpoint/**, and after his yes: site/css/framework.css (phone @media hunks only)

Scope: study how the Haven case study handles phone widths (spacing, layout, type sizes and the code that
does it), audit the framework page at 360 and 390 against that, fix what the audit finds after his yes,
no regressions at tablet and 1440, committed as my hunks only and pushed to claude/relaxed-ride-5mlbdu.

- [x] G1: ISSUES.md records Haven's phone system from measurement: margins, section gaps, type sizes and line heights per role, figure widths, and which CSS rules produce them
  EVIDENCE: ISSUES.md, 20 Nov, from compare.mjs at 360 and 390
- [ ] G2: ISSUES.md lists every framework page phone problem at 360 and 390, each with a measurement against the Haven value, and Chadwick has the list in plain words
- [ ] G3: Chadwick said yes to the fix list before anything under site/ changes
- [ ] G4: every issue measures fixed at 360, 390 and 430 with reduced motion on and off
  CHECK: node reports/mobile-breakpoint/verify.mjs
  EXPECT: PHONE_OK 6 of 6
- [ ] G5: tablet unchanged
  CHECK: node reports/tablet-breakpoint/verify.mjs
  EXPECT: TABLET_OK 8 of 8
- [ ] G6: 1440 and 1200 element boxes identical with the phone block on and off
- [ ] G7: committed with only my hunks, branch pushed, never main
