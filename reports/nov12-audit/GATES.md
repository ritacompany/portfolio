# Gates: his framework page notes, 12 Nov

OWNS: reports/nov12-audit/**

Scope: every ask from his 12 Nov notes on the framework page, each with one owner, closed only when the owner's commit is checked.

Owners: [figma-sync] local_e0b4a7dd, [capacity] local_9721b7a7, [tablet] new session, [carousel] local_0980bb28 (start-of-week), [motion] local_b8926dcc (cs2-motion, conductor).

- [x] N1: title row matches the updated Figma frame on the framework page (it reads "Framework CS" today) [figma-sync]
  EVIDENCE: 47149a4 (figma-sync). His title still reads Framework CS in his file; what changed is the Mondai mark (4961:12105), moved off the title row to sit above the tagline. Checked by figma-sync at 1440 and by cs2-motion at 390 in the built-in browser: mark at the left above the tagline, no sideways scroll.

- [x] N2: Haven page title row matches its updated Figma frame [figma-sync]
  EVIDENCE: 47149a4 (figma-sync). Same change on Haven: HAVEN wordmark (4961:11998) above the tagline. Checked at 1440 by figma-sync and at 390 by cs2-motion.

- [ ] N3: Falling behind section matches the updated Figma frame: spacing, image positions, the Cognition pathway imagery [figma-sync]
  EVIDENCE: pending

- [x] N4: footer portraits on the far right show no stroke or light rim on either photo, on every page, and the fix is written into docs/DECISIONS.md so it stops getting lost [figma-sync]
  EVIDENCE: 7bf19d5 (figma-sync). Cause: the pill's light background antialiased apart from the photo; the fix had only ever lived in site/dev/preview/proposals.css. Now one clip-path in components.css, light edge pixels 1229 to 73, recorded in docs/DECISIONS.md. cs2-motion zoomed both portraits at 390 on Haven: no rim.

- [ ] N5: Capacity section is shorter; its text column ends a little above the bottom of the image beside it at 1440 [capacity]
  EVIDENCE: pending

- [ ] N6: Foundation entrance no longer moves the diagram as one block; he has seen options (including no entrance on the diagram) and picked one, built and checked at 1440, 768 and 390 with reduced motion on and off [motion]
  EVIDENCE: pending

- [ ] N7: Falling behind slide in from the left is replaced; he has seen options (including no entrance) and picked one, built after N3 lands [motion]
  EVIDENCE: pending

- [ ] N8: a tablet breakpoint session is open, has listed every issue at 768 to 1199 and fixed them after N1 to N5 land [tablet]
  EVIDENCE: pending

- [ ] N10: the rest of the framework page re-checked against his current frame (WIP Mondai framework case study 4269:9433, file IarvWaqjIwrZ2afQmMxKm6); figma-sync found the page was built from an older copy (5RO0m4bY) and only the hero has been compared (site 656 px tall, Figma 647) [figma-sync, after N3]
  EVIDENCE: pending

- [ ] N9: his verdict "the carousel is just bad" has reached the carousel session; he said he will pick that thread up himself, so it is recorded here and not worked from this list [carousel]
  EVIDENCE: pending
