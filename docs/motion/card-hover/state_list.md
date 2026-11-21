# Work card hover: state list

The render drives a scripted pointer (white dot) across both cards in a 6.0 s loop. Times are seconds
in the render; each line is a cut the review strips check.

- 0.00 s: rest, pointer below the cards. Both cards show only their image, no Learn more.
- 0.50 s: pointer enters the Mondai card. The overlay starts to darken.
- 0.58 s: Learn more starts to load in on Mondai, rising and growing into place.
- 1.10 s: Mondai fully hovered: overlay at 75 percent, Learn more settled, label and description white.
- 2.00 s: pointer leaves Mondai toward Haven. Learn more and the overlay go out together.
- 2.40 s: pointer enters the Haven card. Its overlay darkens; Mondai is back at rest.
- 2.48 s: Learn more starts to load in on Haven.
- 3.20 s: pointer flicks out of Haven before it settles; everything reverses from where it was, no jump.
- 3.35 s: pointer comes straight back in; the hover resumes from its current state, no restart.
- 4.60 s: pointer leaves Haven downward. Both cards return to rest.
- 5.60 s: pointer back at its start point and held still.
- 6.00 s: rest again; the last frame matches the first (loop seam).
