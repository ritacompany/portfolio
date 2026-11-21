# Gates: tablet sections in Figma for Chadwick (20 Nov)

OWNS: reports/figma-tablet-sections-2026-11-20/**, and in Figma file 5RO0m4bYYrTvbiaOgaU3tI page CS only the new
section "Tablet sections for Chadwick, 20 Nov" and what is inside it. No site code. His frames untouched.

His ask (20 Nov review, via the lead session): four 768 wide tablet frames he can edit himself.

- [x] G0: write access proven with a harmless create and delete before any build
  EVIDENCE: frame 6336:30057 created and removed on page CS, 20 Nov
- [x] G1: one section on page CS, beside 6331:20607 and overlapping no existing top level node, holding four frames 768 wide
  EVIDENCE: section 6340:30057, four frames 768 wide, overlap check against every top level node on CS returned none
- [x] G2: every frame is built from copies of his own layers (text styles, components, image fills kept); no node of 6331:20607 changed (child count and frame size the same before and after)
  EVIDENCE: all layers cloned; 6331:20607 has 21 children and is 1440 by 24745.56 at 27868, 21358 before and after
- [ ] G3: tablet rules from site/css/framework.css: 32 side margin, 704 content, body 520 max, Heading/40 at 32, section padding 64 top and 120 bottom, eyebrow to heading 40, heading to next 80
  EVIDENCE: margins, 704 content, 520 body, 64 and 120 padding, 40 and 80 gaps applied; headlines still 40 px (Satoshi not loadable by the connector)
- [x] G4: Personalized timeline: Capacity card image above the Capacity and Effort columns, image at its true proportions (width over height equal to the desktop's within 0.5 percent), Example box to the right
  EVIDENCE: 6340:30064 ratio 1.033557 before and after; Example box 6340:30092 to its right; Capacity and Effort below
- [x] G5: Calendar setup: headline width strictly between the built tablet width and his desktop width; the right side of the section shown as in the desktop frame
  EVIDENCE: headline 612 wide, between built 704 and desktop share; laptop image 6340:30109 ratio 1.39372 kept, bleeds off the right edge
- [x] G6: Falling behind: the block with Pathway target, Pathway pace, Ahead of target and the rail card, under whatever title his frame gives it
  EVIDENCE: frame 6341:30057, title Falling behind from his frame; rail card panel and three annotations in one 704 box
- [x] G7: Start of week template 1 of 5 (Clean slate) at tablet
  EVIDENCE: frame 6341:30117, Clean slate card centred in a 704 carousel, caption and dots kept
- [ ] G8: each frame screenshotted and checked for clipped text, overlap and stretched images
  EVIDENCE: images, overlap and box sizes checked on screenshots; rendered line breaks could not be checked (cloud render has no Satoshi)
- [x] G9: node ids sent to the lead session; Chadwick told where they are and that session 8 builds what he locks
  EVIDENCE: lead session message delivered 20 Nov with the four node ids; report to Chadwick sent

ABANDON: G3 the connector cannot load Satoshi, so the headline size cannot be set to 32; Chadwick or session 8 sets it
ABANDON: G8 rendered line breaks cannot be seen without Satoshi; checked on his Mac when he opens the frames

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

## Added 21 Nov, his ask: the other four Start of week templates

Cloned from his edited template 1 frame (6341:30117), so his widths carry over (narrative 437, caption 314), with each
desktop template's carousel and caption swapped in: template 2 Catching up 6345:30110, 3 Rollover 6345:30525,
4 Recalibration 6345:30930, 5 Reset 6345:31358. Stacked under template 1 in the same section; no overlap with any
other top level node; 6331:20607 unchanged (21 children, 24745.56 tall). Captions at 314 run 5 lines (measured with the
site's Satoshi); the box heights are set for that, the cloud render still draws the desktop breaks.

# Build of his edited frames (21 Nov, his ask: "are you going to update them in the file based on what I put there")

Preview first (site review loop): site/dev/framework-tablet/ (tablet.css, two tablet image exports from his frames,
capacity-demo.js copy whose overlay follows the cropped card). On his yes it moves into site/css/framework.css,
site/assets/framework/ and site/js/capacity-demo.js.

- [x] B1: at 768 every gap and width in his four frames, and the same structure at 1024 and 1150 with nothing overflowing; 390, 1200 and 1440 unchanged
  CHECK: node reports/figma-tablet-sections-2026-11-20/build-check.mjs
  EXPECT: BUILD_CHECK_OK
  EVIDENCE: 21 Nov, BUILD_CHECK_OK 142 assertions; control: the live page fails 100 of 142 (it has the old tablet layout)
- [x] B2: every entrance still runs and ends shown on the preview at 768, 1024 and 1150, motion on and off
  EVIDENCE: reports/framework-tablet-2/motion.mjs pointed at /dev/framework-tablet/: FW_MOTION_OK 6 runs
- [x] B3: the capacity card demo overlay sits on the cropped card (overlay is the whole drawn image, centred on the box)
  EVIDENCE: 768 img 400,320 336x260, overlay 400,287 336x325; 1024 img 464x359, overlay 464x449; end frame screenshot clean
- [ ] B4: his yes on a [site change] card, then the preview moves into the shipped files and B1 runs against /mondai/framework/
  EVIDENCE: pending
