# Gates: framework headlines at three lines, 768 to 1159

OWNS: reports/headline-lines-2026-11-21/**, site/dev/headline-lines/**, scripts/review-preview/**, site/css/framework.css (only the headline block, after his yes), reports/figma-tablet-sections-2026-11-20/build-check.mjs (Calendar line assertion only, after his yes)

Scope: measure every framework section headline from 768 to 1159, find the width where three lines stop holding, recommend clamp or a four line threshold, build the pick in site/dev on the review preview and ask him on a [site change] card; ship only on his yes.

- [x] G1: TABLE.md holds every headline on the page (13 section headlines plus the ending title), its lines at 768, 900, 1024 and 1150 under the current rules, the narrowest box and window that keep it at three at 32 px and the widest box that keeps it at three, all regenerated from measure.mjs output on the real page
  CHECK: node reports/headline-lines-2026-11-21/table.mjs check
  EXPECT: TABLE_OK
  EVIDENCE: table.mjs check printed TABLE_OK (21 Nov, after table.mjs wrote TABLE.md from the real page)

- [x] G2: the proposal page keeps every headline at exactly three lines at every whole pixel width from 768 to 1159, and at 1160 and 1440, with no word changed against the shipped page
  CHECK: node reports/headline-lines-2026-11-21/check-lines.mjs http://localhost:4318/dev/headline-lines/
  EXPECT: LINES_OK
  EVIDENCE: check-lines.mjs on the proposal printed "checked 394 widths x 14 headlines" and LINES_OK (21 Nov)

- [x] G3: negative control: the same checker fails on the shipped page today (which runs two and four line headlines)
  CHECK: node reports/headline-lines-2026-11-21/check-lines.mjs http://localhost:4318/mondai/framework/ expect-fail
  EXPECT: LINES_FAIL_AS_EXPECTED
  EVIDENCE: check-lines.mjs on the shipped page printed "found 3177 failures, e.g. 768 5812:16474: 2 lines" and LINES_FAIL_AS_EXPECTED (21 Nov)

- [x] G4: the proposal leaves 390, 1160 and 1440 pixel identical to the shipped page outside the tablet range (no headline box, font size or position moves)
  CHECK: node reports/headline-lines-2026-11-21/check-lines.mjs http://localhost:4318/dev/headline-lines/ same-outside
  EXPECT: OUTSIDE_SAME
  EVIDENCE: check-lines.mjs same-outside printed OUTSIDE_SAME at 390, 1160 and 1440 (21 Nov)

- [x] G5: review preview built with the two fixes (root url paths in stylesheets made relative, Refresh button keeping width and scroll) at 390, 768, 1024, 1150 and 1440, and published
  EVIDENCE: built from dev/headline-lines; in Playwright the viewer showed buttons 390,768,1024,1150,1440, the Calendar tablet background loaded (200, ../assets path), Refresh reloaded at 768 and kept scrollY 5000; published https://claude.ai/artifact/CvyAVQbrR8CSZYBD7dUQkL (21 Nov)

- [ ] G6: his yes on a [site change] card, then the rules move into site/css/framework.css and G2 passes on the shipped page
  EVIDENCE: pending

- [ ] G7: after shipping, the existing checks pass: framework-tablet-2, framework-tablet-3, framework-tablet-4, tablet-breakpoint, fw-sync-2026-11-20, falling-behind-motion-2026-11-20 and the figma-tablet-sections build check
  EVIDENCE: pending

- [ ] G8: draft PR into claude/fw-integration, and one line with the link to the lead session
  EVIDENCE: pending
