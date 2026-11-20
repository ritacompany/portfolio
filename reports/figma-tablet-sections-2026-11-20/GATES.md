# Gates: tablet sections in Figma for Chadwick (20 Nov)

OWNS: reports/figma-tablet-sections-2026-11-20/**, and in Figma file 5RO0m4bYYrTvbiaOgaU3tI page CS only the new
section "Tablet sections for Chadwick, 20 Nov" and what is inside it. No site code. His frames untouched.

His ask (20 Nov review, via the lead session): four 768 wide tablet frames he can edit himself.

- [x] G0: write access proven with a harmless create and delete before any build
  EVIDENCE: frame 6336:30057 created and removed on page CS, 20 Nov
- [x] G1: one section on page CS, beside 6331:20607 and overlapping no existing top level node, holding four frames 768 wide
- [x] G2: every frame is built from copies of his own layers (text styles, components, image fills kept); no node of 6331:20607 changed (child count and frame size the same before and after)
- [ ] G3 (PARTIAL): tablet rules from site/css/framework.css: 32 side margin, 704 content, body 520 max, Heading/40 at 32, section padding 64 top and 120 bottom, eyebrow to heading 40, heading to next 80
- [x] G4 Personalized timeline: Capacity card image above the Capacity and Effort columns, image at its true proportions (width over height equal to the desktop's within 0.5 percent), Example box to the right
- [x] G5 Calendar setup: headline width strictly between the built tablet width and his desktop width; the right side of the section shown as in the desktop frame
- [x] G6 Falling behind: the block with Pathway target, Pathway pace, Ahead of target and the rail card, under whatever title his frame gives it
- [x] G7 Start of week template 1 of 5 (Clean slate) at tablet
- [ ] G8 (PARTIAL): each frame screenshotted and checked for clipped text, overlap and stretched images
- [ ] G9: node ids sent to the lead session; Chadwick told where they are and that session 8 builds what he locks

## Evidence (20 Nov)

- Section 6340:30057 at x 29409, y 22420, 3572 by 1542; overlap check against every other top level node on CS: none.
- Frames: 6340:30058 Personalized timeline, 6340:30102 Calendar setup, 6341:30057 Falling behind (Pathway target and pace),
  6341:30117 Start of week template 1 of 5 (Clean slate). All 768 wide, padding 64 / 32 / 120 / 32, fill bound to the
  same colour variable as 6331:20607.
- G2: every layer is a clone of his (text styles, colour variables, image fills, component instances kept). 6331:20607
  before and after: 21 children, 1440 by 24745.56, position 27868, 21358.
- G4: Capacity card clone 6340:30064 rescaled as a whole to 328 wide: width over height 1.033557 before and after.
  Example box 6340:30092 to its right (328 wide); Capacity and Effort under them, 328 each, 48 apart.
- G5: headline 612 wide (7 of the 8 tablet columns): narrower than the built 704, and between
  the built 92 percent of the window and his desktop 62 percent (887 of 1440). Laptop image clone 6340:30109 rescaled
  as a whole to 596 by 427.6 (ratio 1.39372 before and after) and bleeding off the right edge, as at 1440 (82 percent of
  it shows in both).
- G6: title is his frame's: Falling behind. Rail card panel 400, annotations 256, box 704 by 430.
- G7: carousel 704 wide, Clean slate card centred, neighbours peeking, gradient overlay resized to 704 by 550.

## What did not pass, and why

- Satoshi is not available to the Figma connector (loadFontAsync: family does not exist). Text layers could be moved and
  resized but not reflowed or restyled. So:
  - G3: headlines stay at Heading/40 (40 px); the tablet's 32 px could not be set. Widths and every other rule are applied.
  - G8: box sizes are set from line counts measured with the site's own Satoshi files at each new width (method checked
    against five desktop boxes: all heights matched), but the cloud render still draws the old line breaks, so the
    rendered text could not be checked here. On a machine with Satoshi, Figma lays text out again on open (inferred from
    how Figma handles font changes, not tested).
