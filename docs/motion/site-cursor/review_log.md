# Site cursor: review log

Live piece, pointer driven. live-capture.mjs was not used: it scrolls a target in and steps an entrance,
and the cursor has no entrance. Frames come from pausing the cursor's CSS transitions and seeking them to
exact times (getAnimations), which is the same frame by frame evidence for a hover piece.

## Round 1
Fresh eyes: real time screenshots were too late to show the morph, the press frames missed the cursor, the ring cut through nav letters, the drain started late.
- P0: strip, 40 and 110 ms: frames taken in real time land late (screenshot cost), so the morph could not be judged. Fixed by seeking paused transitions to exact times.
- P0: strip, press frames: capture cropped the wrong area. Fixed in the capture.
- P0: slowed strip, 250 ms: the clip-path drain showed as two horizontal bars, not a fill draining into an outline. Fixed by growing one out of flow shape with an inset fill instead of clipping a full size pill.
- P1: link ring cut through the letters of About. Replaced by a see-through 24 px dot.
- P1: label faded in over a still thick outline. Delay moved to 55 percent of the morph.

## Round 2
Fresh eyes: called the 0 to 40 ms grow a pop and the mirrored nav letter a glitch; label early.
- P0: 0 to 40 ms: quart out covered 41 percent of the grow in 40 ms and read as a pop. Fixed with cubic out over 360 ms.
- P2: the mirrored letter in About is the site's own type design, not a cursor fault. No change.

## Round 3
Fresh eyes: no P0. The solid blob hollowing at 80 to 120 ms reads as cutting a hole; the link dot is dim; press scale is subtle.
- P1: link dot at 24 percent too dim. Raised to 32 percent; tunable on the test page.
- P1: solid then hollow is the brief's "solid dot growing into the outline". Kept; flagged to Chadwick as his call.
- P2: press 0.98 is subtle by spec; the fill swap carries the press.

## Round 4
Fresh eyes: Chadwick, 21 Nov: "that circle is like way too small and ugly ... copy the exact size and style of the circle in the video". The reference had never been opened; the dot came from the brief's "about 12px". Measured the reference in Chromium and copied it.
- P0: dot 12 px Neutral/100, eased, no shadow. Reference: 24 px white, drop shadow 0 12 24 at 20 percent, on the pointer, no link state. Fixed; `check-cursor.mjs REF` compares against the live reference (fails on the old dot, passes now).
- P1: press option C at 40 ms: dark text over the closing slot read as struck through. Text now turns dark from 30 percent of the press.
- P2: option C still shows a thin slot through the text for about two frames at 40 ms.

## Round 5
Fresh eyes: dot now matches the reference in size and white; option C sliced its label at 40 ms and showed pale text at 80 ms; option B front loaded; flood splits glyphs mid sweep.
- P0: option C, 40 ms: the label was cut by the closing slot, and pale grey at 80 ms. Changed: the light label fades out at once and the dark label fades in after 45 percent of the press, so no text crosses the slot. Needs a fresh eyes round 6 to close (the subagent limit for this turn was reached).
- P1: option B: quart out covered 55 percent at 40 ms. Now an even in out sweep.
- P2: option A: letters split between white and dark mid flood; that is the flood passing, kept.
- P2: the drop shadow does not show against the black page in the dot comparison; REF measures it numerically.
