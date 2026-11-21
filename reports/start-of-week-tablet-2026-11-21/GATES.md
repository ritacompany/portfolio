# Gates: Start of week carousel at tablet (21 Nov)

OWNS: reports/start-of-week-tablet-2026-11-21/**, site/dev/start-of-week-tablet/**, and on his yes the Start of week
hunks of site/js/start-of-week.js and site/css/framework.css. In Figma file 5RO0m4bYYrTvbiaOgaU3tI only the five
768 tablet Start of week frames (6341:30117, 6345:30110, 6345:30525, 6345:30930, 6345:31358). Not the template
descriptions (another session), not Schedule view or Target and pace (another session), never his desktop frames.

His notes (21 Nov, via the lead session): 1 card text readable at 768; 2 a fade at both edges showing more cards;
3 the fade scales with the window, his adjusted tablet gradient is the guide, checked at 768, 1024, 1150 and 1440;
4 no gap between a description and the dots at any width; 5 Figma: caption text fills and hugs, parents hug;
6 Figma: his adjusted gradient on all five templates, matching on both sides.

- [ ] G1: notes 1 to 4 in the preview (cards at desktop size from 768 up, fade in his formula, 390 and 1440 rects unchanged, no gap)
  CHECK: node reports/start-of-week-tablet-2026-11-21/sow-check.mjs http://localhost:4318/dev/start-of-week-tablet/
  EXPECT: SOW_CHECK_OK
- [ ] G2: the check fails on the page without this work (control)
  CHECK: node reports/start-of-week-tablet-2026-11-21/sow-check.mjs http://localhost:4318/mondai/framework/ || echo CONTROL_FAILS_AS_EXPECTED
  EXPECT: SOW_CHECK_FAIL
- [x] G3: Figma notes 5 and 6 on all five tablet templates, desktop frame untouched
  EVIDENCE: 21 Nov use_figma: in each template the description and "Scroll to view more templates" are FILL / HUG with no
  max width, the label frame and its two texts FILL / HUG, the dots block FILL / HUG, caption, Frame 2087331160 and
  Content HUG vertically (template 1's Content was a fixed 769); description to dots is the 32 item spacing in all five.
  Gradient stops on all five rectangles 0 / 0.0559 (0.63) / 0.2236 (0) / 0.5 / 0.7764 (0) / 0.9441 (0.63) / 1: his
  Recalibration frame's adjusted stops (0.0488 left, 0.9370 right) averaged so both sides match; the other four had
  the desktop 0.1263 / 0.8663. 6331:20607 before and after: 21 children, 1440 by 24745.56 at 27868, 21358.
- [ ] G4: review preview published with 390, 768, 1024, 1150 and 1440, and his yes on a [site change] card
  EVIDENCE: pending
- [ ] G5: on his yes the preview moves into the shipped files and G1 passes on the live page
  CHECK: node reports/start-of-week-tablet-2026-11-21/sow-check.mjs http://localhost:4318/mondai/framework/
  EXPECT: SOW_CHECK_OK
- [ ] G6: existing checks still pass on the live page (figma-tablet-sections build-check, framework-tablet-2, -3, -4, tablet-breakpoint, fw-sync-2026-11-20, falling-behind-motion)
  CHECK: node reports/figma-tablet-sections-2026-11-20/build-check.mjs http://localhost:4318/mondai/framework/
  EXPECT: BUILD_CHECK_OK
- [ ] G7: own branch pushed, draft PR into claude/fw-integration, one line with the link to the lead session
  EVIDENCE: pending

## Notes

- His adjusted gradient is on template 4 (Recalibration, 6345:31343), not template 1: only that rectangle's stops
  differed from the other four and from the desktop frame.
- Fade in the build: clear point at 22.365% of the stage (the same share in both his frames); the 0.63 band is
  39.3 px at the 704 tablet stage and 132.2 px at the 1017 desktop stage, linear between, clamped outside. Not at
  phone widths (no frame of his for it).
- Cards from 700 up are drawn at the desktop size, 543 card and side centres 481 out, as in his tablet frames.
- Figma text cannot be reflowed here (Satoshi is not available to the connector), so the text boxes keep the
  cloud's line breaks until he opens the file; sizing modes are what makes them close up there.
- The build puts the dots under the card and the caption under the dots (his 12 Nov pick); his Figma frames have
  the caption first. Not changed.
