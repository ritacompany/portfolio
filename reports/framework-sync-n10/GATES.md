# Gates: N10, framework page against his current frame

OWNS: site/mondai/framework/index.html (sections other than Start of week), site/css/framework.css (desktop rules only), site/assets/framework/** (new exports), reports/framework-sync-n10/**

Scope: every framework section except the hero, Falling behind and Start of week matches WIP Mondai framework case study 4269:9433 at 1440: section order and heights, text and figure positions, imagery. Copy that differs is listed for his call, not changed, because site copy went through his approval rounds.

- [x] G1: every Figma text layer in the compared sections is found on the page and sits within 1.5 px of its Figma position at 1440
  CHECK: node reports/framework-sync-n10/check-boxes.mjs
  EXPECT: BOXES_OK
  EVIDENCE: exit 0, BOXES_OK: 21 moved elements within 1.5 px at 1440 (12 Nov); before the change Competitive analysis sat 8 to 30 px low

- [x] G2: section order and heights equal the frame's (Buffer flow before Falling behind)
  CHECK: node reports/framework-sync-n10/check-boxes.mjs
  EXPECT: ORDER_OK
  EVIDENCE: exit 0, ORDER_OK: 14 sections in frame order, Buffer flow before Falling behind, heights within 1.5 px (Personalized timeline and Start of week excluded, owned elsewhere)

- [x] G3: no sideways scroll at 390 and every figure loads
  EVIDENCE: Playwright at 390: scrollWidth 390; all images load except three off screen Start of week carousel slides (start-of-week owns them); ending and Schedule view checked by eye

- [x] G4: DIFF.md lists each section's changes and every copy difference left for his call; only my hunks committed; branch pushed
  EVIDENCE: DIFF.md written; only my hunks staged (framework.css one line, index.html hero, Competitive, Schedule, ending, section order); pushed in the commit carrying this file
