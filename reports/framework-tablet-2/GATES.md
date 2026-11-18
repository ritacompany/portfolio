# Gates: framework page tablet, round 2 (his audit, 18 Nov)

OWNS: reports/framework-tablet-2/**, site/css/framework.css (the tablet block at the end of the file), site/mondai/framework/index.html (the Rollover effect heading line only), reports/tablet-breakpoint/verify.mjs (only if a check must change, with the reason)

Scope: the framework page from 768 to 1199 keeps the 1440 spacing rhythm and Haven's tablet type scale, the Rollover effect heading sits above its text, the Schedule view gradient and the footer are dealt with, every animation works at tablet with motion on and off, 390 and 1440 are unchanged by the tablet rules, committed as my files and hunks only and pushed to claude/relaxed-ride-5mlbdu.

- [x] G1: ISSUES.md has the 1440 rhythm measured, Haven's tablet method written down, every audit item (1 to 6) with its measurement before the fix, and the rule chosen for each
  EVIDENCE: ISSUES.md written 18 Nov: Haven's method (type by role, 1440 numbers kept, pairs kept side by side), the rhythm table with 1440, before and now columns from measure.mjs, items 1 to 6 each with measurement, cause and status

- [x] G2: item 1, spacing: at 768, 834, 1024 and 1180, motion on and off, every gap in the page follows the rhythm table in ISSUES.md (eyebrow to heading, heading to what follows, subhead to body, label to subhead, group to group, paragraph to paragraph, text to figure, figure to text, section top and bottom), each within 1.5 px
  CHECK: node reports/framework-tablet-2/verify.mjs
  EXPECT: /^FW_TABLET2_OK 8 of 8$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=c5a449ef5354bd3a74b132fb1aed908f46e15955ae0f583a7c62866f10491256; output-bytes=21

- [x] G3: item 2, type: the title, Heading/40 and the Display/96 ending heading have the same computed size as Haven's title, Heading/40 and ending title at 768, 834, 1024 and 1159 (Haven's own tablet range)
  CHECK: node reports/framework-tablet-2/type.mjs
  EXPECT: /^FW_TYPE_OK 4 widths$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=227177b5fe9357da1535a0d406096c017220190883176c26d12b8c1fd8877be4; output-bytes=294

- [x] G4: item 4: the Rollover effect heading sits above its body text (reading order and on screen) at 390, 768, 1024 and 1180
  CHECK: node reports/framework-tablet-2/verify.mjs rollover
  EXPECT: /^FW_ROLLOVER_OK 4 widths$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=3288a5b9490b0f20c59fb799f9e01b3f249c1d57c19520d93a5365acf69f2118; output-bytes=24

- [x] G5: item 3: the cause of the hard edge in the Schedule view popover gradient is found and written in ISSUES.md with a crop, whether it is also at 1440 is stated, and it is fixed or its fix is handed over with what it needs
  EVIDENCE: handed over, not fixed. Cause: baked into schedule-gaps@2x.webp (the popover shadow stops in a hard band across the Usability findings card); same file at 1440, so the edge is there too. Crops shots/item3-popover-edge-1440-brightened.png and -768-. A re-render needs his Figma file; the Figma connector hit its daily limit on his View seat 18 Nov. Handover section in ISSUES.md

- [ ] G6: item 5: the footer with numbers is identified with him and made to respond at tablet and 390, or handed over with his answer recorded
  EVIDENCE: pending

- [x] G7: item 6: with motion on, every section item on the page starts hidden or animates and ends fully shown after a scroll through, and with reduced motion every item is shown without scrolling, at 768, 1024 and 1180
  CHECK: node reports/framework-tablet-2/motion.mjs
  EXPECT: /^FW_MOTION_OK 6 runs$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=33a9557d0a351a9e8bfb69f6ac8a7ffda0a5d105a25623c910bcd2896bf1fa9f; output-bytes=20

- [x] G8: the tablet rules move nothing at 390, 1200 and 1440 (route swap: element boxes with the tablet block removed equal boxes with it in), and the control differs at 768
  CHECK: node reports/framework-tablet-2/swap.mjs
  EXPECT: /^FW_SWAP_OK 3 widths$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f64943076f3525c1f079d23805ce253d02726aa9f1dbc1fce4b39be3271870d7; output-bytes=124

- [x] G9: the first tablet pass's checks still pass
  CHECK: node reports/tablet-breakpoint/verify.mjs
  EXPECT: /^TABLET_OK 8 of 8$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1db5ebc3ec0a85788a67b2834b8ce8e7436182d46a1af5bd221383dde1d82ee9; output-bytes=17

- [x] G10: the shared responsive suites for the framework page pass on size and health (fit is G13: it fails before this work on the carousel, found 18 Nov, so the gate was split rather than left unmeetable)
  CHECK: node scripts/verify-responsive.mjs size framework && node scripts/verify-responsive.mjs health framework
  EXPECT: RESPONSIVE_HEALTH_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=0475b486d747d68806cb35e8eb33a8e27878b1140afa4b8cc909174c1ab66c3b; output-bytes=68

- [x] G13: the shared fit check finds nothing on the framework page except the Start of week carousel's side cards, which fail the same way at 37b4424 before this work
  CHECK: node reports/framework-tablet-2/fit.mjs
  EXPECT: /^FIT_ONLY_CAROUSEL \d+ carousel card\(s\), 0 other problems$/m
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1b79479fc3d43a0747f4ff8321222ca89e49b90ce063fa60221838e7ffb58ddc; output-bytes=56

- [ ] G11: committed with only my files and hunks (no git commit -a), branch pushed, never main, main checkout fast forwarded only if it tracks this branch
  EVIDENCE: pending

- [ ] G12: the framework page is open at 768 in the built-in browser pane for his audit
  EVIDENCE: pending
