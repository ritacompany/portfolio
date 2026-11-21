# Gates: Falling behind, Action Item motion and breakpoint (20 Nov)

OWNS: reports/falling-behind-motion-2026-11-20/**, site/js/mondai-motion.js, site/css/mondai-motion.css, site/css/framework.css, site/assets/framework/**, site/mondai/framework/index.html

Scope: session 6 of the 20 Nov CS2 review: the Rollover row (5812:20316) and its panel in the second Falling behind part, its motion and its behaviour across the 1160 switch. Not section titles (session 1), not the tablet layout itself (sessions 7 and 8).

- [x] G1: he has been told what was tried on this Action Item and why each fell short, traced to commits
  EVIDENCE: chat reply 20 Nov. fcf9e94 put the 5 Nov carry scene in the panel's place; fa3779d reverted it the same day ("page wide motion only"). 540cf43 (11 Nov) slid the panel in from the left; reports/nov12-audit N7 replaced that with no entrance at his suggestion. Today mondai-motion.js lists the row and card in STILL.

- [x] G2: every breakpoint defect at 390, 768, 1159, 1160 and 1440 is measured and shown to him
  EVIDENCE: fb-1160.png, fb-768.png, row-768.png, row-390.png here (Playwright, reduced motion). Under 1160 the row image keeps the panel's left edge baked in while .panel-card is display none; label 5812:20314 top 1150 sits above the row top 1232 at 768; at 390 the row is 342 wide, tag text about 5 px; at 1160 .fw zoom 0.806 so body 16 px renders about 12.9 px.

- [ ] G3: his motion pick is recorded here in his words before any motion build
  EVIDENCE: his words 21 Nov: "We figured out the whole section animates in." Built as a dev preview (site/dev/falling-behind/: the Rollover card and row leave STILL and enter like the rail; row image rollover-v5@2x.webp from Falling behind v4 6331:24623 at 2x). Videos here, today vs new at 1440 and 390. Waiting on his yes to ship to the page.

- [ ] G4: under 1160 the row shows no half card, its label follows it, the tag reads at 390, and there is no sideways scroll at 390, 768, 1160 or 1440, built on claude/fw-sync-fixes
  EVIDENCE: pending

- [ ] G5: with reduced motion on, nothing in the section moves and its end state shows at once
  EVIDENCE: pending

- [ ] G6: the chosen motion is checked in rendered strips at 1440 and 390 against .claude/motion-rules.md, plays once and never loops
  EVIDENCE: pending

- [ ] G7: the lead session knows whether this fix collides with the tablet Figma edit by sessions 7 and 8
  EVIDENCE: pending

- [ ] G8: a draft PR into claude/relaxed-ride-5mlbdu exists and its link went to the lead session
  EVIDENCE: pending
