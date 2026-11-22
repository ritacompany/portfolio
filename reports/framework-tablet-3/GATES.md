# Gates: framework page tablet, round 3, against Haven (20 Nov)

OWNS: reports/framework-tablet-3/**, site/css/framework.css (tablet and 1160 to 1199 hunks), the width lists in
reports/framework-tablet-2/{verify,motion}.mjs and reports/tablet-breakpoint/verify.mjs

His ask (20 Nov): the framework page's tablet should match Haven's tablet in spacing, sizing, motion and the
code that does it. His yes to build: the [site change] card, 20 Nov.

- [x] G1: ISSUES.md compares both pages with one method at 768, 1024 and 1180 and lists every difference
  EVIDENCE: compare.mjs runs at 768, 1024, 1150, 1180; H1 to H6 written with measurements
- [x] G2: hero, tablet edge and body measure match Haven; nothing moves at 390, 1200 or 1440
  CHECK: node reports/framework-tablet-3/check.mjs
  EXPECT: ROUND3_OK
  EVIDENCE: 20 Nov, exit 0, ROUND3_OK; control (768 differs before and after) passed inside the same run
- [x] G3: round 2's rhythm, type and Rollover checks still pass at tablet (1150 now stands in for 1180)
  CHECK: node reports/framework-tablet-2/verify.mjs
  EXPECT: FW_TABLET2_OK 8 of 8
  EVIDENCE: 20 Nov, FW_TABLET2_OK 8 of 8
- [x] G4: every entrance still runs and ends shown at tablet, motion on and off
  CHECK: node reports/framework-tablet-2/motion.mjs
  EXPECT: FW_MOTION_OK 6 runs
  EVIDENCE: 20 Nov, FW_MOTION_OK 6 runs
- [x] G5: the first tablet pass's checks pass (T5 now 78 characters for Haven's 520 measure, hero exempt and checked in G2)
  CHECK: node reports/tablet-breakpoint/verify.mjs
  EXPECT: TABLET_OK 8 of 8
  EVIDENCE: 20 Nov, TABLET_OK 8 of 8
- [x] G6: shared suites: size and health pass; fit fails only on the Start of week side cards, as before this work
  EVIDENCE: RESPONSIVE_SIZE_OK and RESPONSIVE_HEALTH_OK 5 widths; fit lists only img.sow__card at 1366
- [x] G7: committed by path with only my hunks, pushed to claude/relaxed-ride-5mlbdu, never main
  EVIDENCE: 6f7dfc7 pushed; .claude/launch.json, shots and the font file left out
