# Gates: Falling behind, Action Item motion and breakpoint (20 Nov)

OWNS: reports/falling-behind-motion-2026-11-20/**, site/js/mondai-motion.js, site/css/mondai-motion.css, site/css/framework.css, site/assets/framework/**, site/mondai/framework/index.html

Scope: session 6 of the 20 Nov CS2 review: the Rollover row (5812:20316) and its panel in the second Falling behind part, its motion and its behaviour across the 1160 switch. Not section titles (session 1), not the tablet layout itself (sessions 7 and 8).

- [x] G1: he has been told what was tried on this Action Item and why each fell short, traced to commits
  EVIDENCE: chat reply 20 Nov. fcf9e94 put the 5 Nov carry scene in the panel's place; fa3779d reverted it the same day ("page wide motion only"). 540cf43 (11 Nov) slid the panel in from the left; reports/nov12-audit N7 replaced that with no entrance at his suggestion. Today mondai-motion.js lists the row and card in STILL.

- [x] G2: every breakpoint defect at 390, 768, 1159, 1160 and 1440 is measured and shown to him
  EVIDENCE: fb-1160.png, fb-768.png, row-768.png, row-390.png here (Playwright, reduced motion). Under 1160 the row image keeps the panel's left edge baked in while .panel-card is display none; label 5812:20314 top 1150 sits above the row top 1232 at 768; at 390 the row is 342 wide, tag text about 5 px; at 1160 .fw zoom 0.806 so body 16 px renders about 12.9 px.

- [x] G3: his motion pick is recorded here in his words before any motion build
  EVIDENCE: 21 Nov, "We figured out the whole section animates in." Shown as a dev preview with videos (today vs new, 1440 and 390, in this folder); his yes on the question card "[site change] ... ship it", 21 Nov.

- [x] G4: the row is his Falling behind v4 image (6331:24623 at 2x), loads, and there is no sideways scroll at 390, 768, 1160 or 1440, built on claude/fw-sync-fixes
  EVIDENCE: node reports/falling-behind-motion-2026-11-20/check.mjs printed FALLING BEHIND ROW CHECK PASSED (21 Nov): src rollover-v5@2x.webp, natural 1630, scrollWidth equal to the window at all four widths. Scope cut by him 20 Nov: label order and the other stacked findings are not to be changed; session 1's under 1160 card rules removed with the lead's go ahead, as the new image carries its own background like the rail.

- [x] G5: with reduced motion on, nothing in the section moves and its end state shows at once
  EVIDENCE: same check run: reduced motion first frame opacity 1, clip none, transform none at all four widths.

- [x] G6: the row enters with the page's own entrance (card fades, row opens with the curtain), once, no loop
  EVIDENCE: mondai-motion.js STILL now holds only the Capacity card; the row takes the shared mask path. Check run with motion on: first frame clip inset(0 0 100%), 2.5 s later clip none and opacity 1. Frames from new-1440 show the curtain opening once and holding.

- [x] G7: the lead session knows whether this fix collides with the tablet Figma edit by sessions 7 and 8
  EVIDENCE: told the lead 20 Nov that his v4 edit replaces session 1's under 1160 card; lead and session 1 replied it can go. Session 7 owns the tablet build; this change only swaps the image and the motion list, no tablet layout rules.

- [x] G8: a draft PR into claude/relaxed-ride-5mlbdu exists and its link went to the lead session
  EVIDENCE: https://github.com/ritacompany/portfolio/pull/32 (draft, into claude/relaxed-ride-5mlbdu); link sent to the lead session 21 Nov.
