# Cursor button: state list

Tuner clip (site/dev/cursor-button/index.html, scripted pointer, 4.6 s):

- 0.00 s: pointer outside the card, left of it. Card at rest, system cursor showing, no button.
- 0.40 s: pointer crosses the left edge of the image. Button starts at the crossing point, scale 0.6, clear.
- 0.85 s: button fully in (scale 1, opaque), trailing the pointer by a few px as it moves right.
- 1.60 s: pointer stops near the middle. Button settles on it within 0.3 s, no overshoot.
- 2.20 s: mouse down. White fill, dark text, 0.96.
- 2.50 s: mouse up. Outline again, scale 1.
- 2.60 s: pointer moves down and right in an arc; the button follows, never ahead of it.
- 3.80 s: pointer leaves through the bottom edge. Button shrinks to 0.6 and clears by 4.10 s.
- 4.60 s: end, as at 0.00 s.

Cuts: none. Loop seam: 4.60 to 0.00 (both at rest, no button).
