# Spring sample review log

Round 1, 27 Oct 2026, 1200 by 900, 60 fps, 5 s. Contact, strip at 0.4 s, phone sheet and seam viewed.

| Score | Area | Note |
|---|---|---|
| 7 | Motion quality | Heavy spring turn reads as weight, no overshoot, settles by 1.6 s |
| 5 | Composition | Phone fills about a fifth of the frame width; the right half is dead space |
| 4 | Readability at phone size | Profile text is unreadable at 360 wide; the frame needs a crop closer to the phone |
| 6 | Pacing | 2 s static hold from 1.6 s to 3.6 s; fine for a page loop, long for a clip |
| 9 | Loop seam | PSNR 47 dB between last and first frame |

Three worst, to fix next: scale the phone to about 70 percent of frame height, crop the frame to the phone, shorten the hold to 1.2 s.

Round 2, 720 by 900, 30 fps, 4.4 s. Frame cropped to the phone, phone 85 percent of the frame height, grid plate removed, hold cut to 1.2 s.

| Score | Area | Note |
|---|---|---|
| 6 | Motion quality | HEAVY covers 41 percent of the turn in its first 0.2 s, so the turn snaps then crawls |
| 8 | Composition | Phone fills the frame; no dead space |
| 7 | Readability at phone size | Headings read, body copy small |
| 7 | Pacing | 1.3 s still hold |
| 9 | Loop seam | 44 dB |

Three worst: the snap at the start of the turn, the hold, readability (check at 390 wide, not only scaled down).

Round 3, 720 by 900 and 390 by 488. Turn on a softer spring (k 30, d 11, z 1.0, settles in 1.7 s, 30 percent at 0.2 s); hold 0.8 s; 4.6 s loop.
Defect found at 390: the phone was sized in pixels and cropped top and bottom. Motion 8, pacing 8, composition at 390 scored 2.

Round 4, both sizes. Phone sized to 85 percent of the frame height; lift scaled with it.

| Score | Area | Note |
|---|---|---|
| 8 | Motion quality | Strip from 0.3 s shows an even ease into the turn and a settle with no overshoot |
| 8 | Composition | Fits and centers at 720 by 900 and 390 by 488 |
| 8 | Readability at phone size | Name, match score and card titles read at 390; body copy is as small as the Figma still at that width |
| 8 | Pacing | Turn, short hold, turn back, no dead second |
| 9 | Loop seam | 43.7 dB at 720, 43.5 dB at 390 |
| 9 | Fidelity | Real profile export, unchanged |

All 8 or more. Final at 60 fps rendered twice: sha256 f841f0dc both times.
