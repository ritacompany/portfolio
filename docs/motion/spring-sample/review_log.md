# Spring sample review log

Ranked review, P0 to P2. Earlier scored rounds live on branch haven/case-study.

## Round 1
4 Nov 2026. 720 by 900 and 390 by 488 at 30 fps, sheets from state_list.md (cuts 0.30, 2.00, 2.80 and the seam at 4.60).
Fresh eyes: the phone leans in, squares up to face the viewer by about 0.75 s, holds, then tilts back from about 2.8 s toward the starting angle.
- P1: 0.75 s to 2.75 s the turn looks done well before the 2.00 s settle in the state list, then the phone sits still for about 2 s. (Fresh eyes.) Not fixed: this is a pipeline sample, not a shipping piece.
- P1: 3.5 s to 4.6 s the return creeps with a long slow tail and no clear rest before the loop. (Fresh eyes.) Not fixed, same reason.
- P2: 2.75 s the contact tile shows a slight tilt before the 2.80 s cut. (Fresh eyes.) Checked: every move is keyed at 2.80 s, so nothing moves earlier; contact tiles snap to the nearest 30 fps frame, which can be 2.83 s.
- P2: 390 render, the profile body copy is tiny and soft. (Fresh eyes and mine.) Expected for a whole phone at phone width; name, score and card titles read.
- P2: the seam matches (PSNR 43.7 dB at 720, 43.5 dB at 390); the first frame looks marginally more tilted. (Fresh eyes.)
No P0 from either list, so no second round.
