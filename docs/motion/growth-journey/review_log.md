# Growth Journey image, review log

## Round 1 (fill on the bars only, 5.2 s)
Scores: motion 6, composition 8, phone readability 5, pacing 7, loop seam 9 (PSNR 54 dB), Figma fidelity 9.
Worst three, fixed in round 2:
1. The fill lives in four 26px gaps, and bars 1 and 2 are already green, so the travel barely registers and the
   order of the dates is not taught at all. Fix: each Pathway's date pair lights in the accent in turn as the fill
   passes, handing the accent on to the next, so the order is read on the dates themselves.
2. The dashed bars showed above the fill. Fix: fill height 3.4 frame units over the 2.5 stroke.
3. Arrival read late because nothing led the eye to Opportunity. Fix: the travelling date accent ends on it.

## Round 2 (dates light in order, 5.6 s)
Scores: motion 8, composition 8, phone readability 6, pacing 8, loop seam 9 (PSNR 53 dB), Figma fidelity 9.
Phone readability is held by his UI itself: date text is 6px in a 962px screen, so at 390 wide it is small
whatever the motion does. Raising it needs a closer crop of the screen, his call. Round 3 and the 390 render are
still owed, and the determinism double render.
Reduced motion still: output/motion/growth-journey-still.png (t 3.0).
