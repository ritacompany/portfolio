# Capacity card cursor demo: review log

## Round 1
Fresh eyes: card plays once 6, 7, 8, 7 with counts 4, 4, 5, 4; no patches or boxes visible, nothing cropped; the cursor hides the caption on exit and covers the arrows while pressing.
- P1: 4.00 s the cursor drifts down over the Action Items line while the end state settles
- P1: 1.05 s to 3.50 s the cursor tip sits on the arrow icon, so hover and pressed are mostly covered
- P1: 390 wide at 1x density, the Action Items digit renders small and raised
- P2: 2.40 s the cursor crosses in front of the hours on its way left
- P2: 0.35 s and 3.90 s the cursor looks grey at the card edge (motion blur from sub frame blending in the render)
- P2: 1.56 s and 2.06 s one blended frame where two digits overlap (render blur, live swap is instant)
- P2: at rest the ring is the token #5c675d, a touch darker than the export's ring; the overlay is on from page load, so the export's ring is never seen

## Round 2
Fresh eyes: sequence right (6, 7, 8, 7, counts 4, 4, 5, 4), no P0; it saw a faint darker box behind the digit, doubted the hover state and flagged the cursor smudging over the hours on its way left.
- P1: 2.20 s and 3.50 s to 3.90 s a faint darker box behind the hours. Confirmed: the browser decodes the panel as #080808 and the patches were #060606. Fixed: the patch colour is sampled from the export when the demo mounts; inside and outside the patches now read 8, 8, 8
- P1: 1.05 s to 1.42 s hover looked dimmer. Measured, not a problem: ring 100 at rest, 119 on hover, 72 pressed, arrow 173 dimmed to 125 when pressed
- P1: 2.40 s to 2.60 s cursor over the bottom of the 8 and the hours label. Fixed: the move is 0.58 s instead of 0.70 s on a flatter arc
- P2: 3.90 s to 4.80 s exit reads slow and grey (motion blur in the render)
- P2: 1.05 s and 3.36 s the cursor rests about 0.35 s before each press; kept, a person settles before clicking
- P2: 390 wide at 1x density the digit snaps a pixel high; at 3x density it sits on the line
