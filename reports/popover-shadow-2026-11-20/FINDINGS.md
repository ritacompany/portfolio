# Rescheduling popover shadow (20 Nov)

## What the gradient is for
It dims everything behind the "Select a new time" popover so the eye goes to the popover and the
Action Item it belongs to.

## What was wrong
Figma frame 6331:20607, group 6331:24278. The dimming layer (Rectangle 2982, 6331:24376) started 87px
down, halfway through the "Synthesize usability findings" card, with a hard 26% top edge. That cut the
white title in half (title pixels 205 above the edge, 154 below). The shipped image matched Figma, so
the build had not broken it.

## Fix (his, in Figma, 20 Nov)
Chadwick reset the layer so it fills the container and hugs all four edges: 6331:24376 is now a vector
at -4,-6, 550 x 530 over the 546 x 508 frame, same #040405 stops (26%, 74% at 12.2%, 100%) on a shifted
transform, so the top of the frame starts at 26% with no edge inside the picture. The site image is now
a straight 2x export of 6331:24278, lossless webp, 1094 x 1018. Title rows 160 to 188 run 153 to 140,
a smooth fade with no step.

An earlier rebuild in this branch (gradient starting under the card, made before his fix) is replaced.
