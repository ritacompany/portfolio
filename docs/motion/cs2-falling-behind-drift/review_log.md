# CS2 Falling behind, Drift: review log

Scores 1 to 10: motion quality, composition, readability at 390, pacing, loop seam, fidelity to his direction.

## Round 0, stills at 2, 3.2 and 5 s
The direction reads: field behind, weeks side by side, chip, carry, green outline. Worst: finished rows were dimmed with opacity, so the field showed through them. Fixed: the contents dim and the card stays solid.

## Round 1, clip at 720 by 680 and 390 by 368, 30 fps
Scores: motion 8, composition 8, readability 8, pacing 8, seam 9, fidelity 8.
The review tool reported a visible seam (PSNR 35 dB). That is the field drifting one frame between the last frame and the first, which is the motion itself: stills at 0 s and 8 s are byte identical (sha256 1c7c4cb4...).
At 390 wide the labels hold up; the ROLLOVER chip is too small to read and works only as a magenta mark.

## Final
1440 by 1360, 60 fps, 8 s loop, rendered twice: sha256 308b04d021e79eb25f52d3e653c4ba359213a83592988eb07c236571667180a4 both times.
Files here: cs2-falling-behind-drift.mp4 and cs2-falling-behind-drift-still.png (reduced motion still, 5 s).
Open with him: chip text ROLLOVER is a placeholder; magenta and greens are sampled estimates.
