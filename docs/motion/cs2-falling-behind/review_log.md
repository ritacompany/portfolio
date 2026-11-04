# CS2 Falling behind: review log

Scores 1 to 10: motion quality, composition, readability at 390, pacing, loop seam, fidelity to the approved playground.

## Round 1 (720 by 720, 30 fps)
Scores: motion 7, composition 6, readability 6, pacing 7, seam 9, fidelity 6.
Worst three:
1. The carried row's lighter border never showed: the colour blend returned rgb text and the second blend could not read it. Fixed: the blend returns hex. The playground has the same nested blend, so its carried border may not have shown either.
2. End state sat high with 170 px of empty frame below. Fixed: frame 720 by 680, stage 40 from the top.
3. Labels at 390 wide are about 9 px. Not fixed: label size is his tuned value. Open with him.

## Round 2 (720 by 680 and 390 by 368, 30 fps)
Scores: motion 7, composition 8, readability 7, pacing 8, seam 9, fidelity 8.
Worst: Next week rows ran into each other while stepping down, because the top row led the ripple toward the rows below it. Fixed: the bottom row leads.

## Round 3 (720 by 680, 30 fps, then final)
Scores: motion 8, composition 8, readability 7, pacing 8, seam 9, fidelity 8.
Rows step down evenly, the carried row lands and settles to size with its border, the gap closes after landing. Seam clean (PSNR 44 to 47 dB).

## Final
1440 by 1360, 60 fps, 6.2 s loop, rendered twice: sha256 68405130935e098bcd39695e36277334f55d9933edea88f14f0af3c51615f603 both times.
Renders with the renderer's dpr 2 flag differed between two runs; rendering at double size instead is deterministic, so the final uses that.
Files here: cs2-falling-behind.mp4 and cs2-falling-behind-still.png (reduced motion still, 4.5 s).
Open: readability at phone width (labels about 9 px at 390), a background if any.
