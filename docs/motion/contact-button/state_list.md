# Contact button motion: state list

The render drives a scripted pointer (white dot) through the same path for both versions (6.0 s loop).
Times are seconds in the render; each line is a cut the review strips check.

- 0.00 s: rest, pointer off to the left. Both buttons match the Figma frame exactly.
- 0.60 s: pointer reaches the icon's left edge (enter). A: circle starts pulling left. B: icon edge caught.
- 1.00 s: pointer on the label's top edge. A: still apart (pointer over the button). B: edge caught under the pointer.
- 1.40 s: pointer pulls up and out. A: pointer off the button, circle returns and the neck reforms. B: a peak follows it, capped at 27 px.
- 1.90 s: pointer drags right while out. B: the peak travels along the edge with it.
- 2.20 s: pointer flicks away. A: at rest. B: edge lets go and snaps back with a wobble.
- 3.00 s: pointer comes back up to the bottom edge. A: circle pulls away again. B: bottom edge caught.
- 3.30 s: pointer moves inside over the label. B: a dent follows it in, capped at 12 px, clear of the text.
- 3.80 s: press. Both shapes squeeze 4 px inward.
- 4.20 s: release. Both spring back out with a small overshoot.
- 4.80 s: pointer leaves to the right, off the button.
- 5.70 s: pointer back at its start point and held still.
- 6.00 s: rest again; the last frame matches the first (loop seam).
