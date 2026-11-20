# Gates: framework page tablet, round 4 (20 Nov review), session 8

OWNS: reports/framework-tablet-4/**, the Personalized timeline (5812:17084) lines inside the 768 to 1159 media
query of site/css/framework.css. Not the Schedule view, Rollover, popover shadow or Falling behind.

His ask (20 Nov): the Capacity card stretches and sits off-center at tablet; it should look exactly the same as
desktop, nothing about it changes between desktop and tablet.

Cause (measured before the fix): at 768, 1024 and 1150 the card image sits at x 32 and the animated overlay at
x 64. The section is a grid at tablet and the overlay took grid-column 1 / -1, so its left offset was measured
from the grid area, not the padding box. Two panels drawn 32 apart read as one stretched, off-center panel.

- [x] G1: at 768, 1024 and 1150 the overlay box equals the card image box (left, top, width, height within 0.5px),
  and the card is 308 by 298, its desktop size and proportion
  CHECK: node reports/framework-tablet-4/check.mjs
  EXPECT: CAPCARD_OK
  EVIDENCE: 20 Nov, CAPCARD_OK; overlay equals the card at 390, 768, 1024, 1150 and 1440, card 308 by 298 at tablet. Control: on the old CSS the same check fails with overlay at x 64, card at 32, at 768, 1024 and 1150
- [x] G2: the cursor demo still plays at tablet (cursor seen visible during the run, overlay ends showing 6) and
  with reduced motion no overlay mounts and the card is the export; 390 and 1440 unchanged
  CHECK: same script
  EVIDENCE: cursor seen at all five widths, ends at 6; no overlay with reduced motion at 768 and 1440
- [x] G3: round 3's checks still pass: framework-tablet-3/check.mjs ROUND3_OK, framework-tablet-2/verify.mjs
  FW_TABLET2_OK 8 of 8, framework-tablet-2/motion.mjs FW_MOTION_OK, tablet-breakpoint/verify.mjs TABLET_OK 8 of 8
  EVIDENCE: 20 Nov, all four pass. ROUND3_OK run with BASE=6f7dfc7^ (before round 3): against HEAD its 768 control cannot differ, because this change only moves the overlay, which mounts on scroll after the box snapshot
- [x] G4: he sees it in a published preview at 390, 768 and 1440
  EVIDENCE: https://claude.ai/artifact/7k9jsUjcmhdyCvNA6izEiw (768 after and before, 1440, 390)
- [ ] G5: own branch claude/fw-tablet-build, only my hunk, pushed, draft PR into claude/relaxed-ride-5mlbdu,
  lead told the link
