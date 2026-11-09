# Contact button motion: state list

The render drives a scripted pointer (white ring) over the Home footer as built
(site/motion-lab/contact-button-footer.html), 8.5 s loop at 60 Hz steps. Times are seconds in the
render, at the moment the pointer crosses the edge in question; each line is a cut the review strips check.

- 0.00 s: rest, pointer off to the left. The button is the Figma default: two outlined pills crossing by 3 px.
- 0.41 s: pointer reaches the icon circle, low on its left (enter). The two rings melt into one body as the circle tucks in, then it pulls left, the neck thins and snaps, the circle overshoots and settles apart by 0.85 s.
- 1.60 s: pointer on the pill's top edge. The outline bulges over it and the hump follows the pointer along the top, down the right end and back along the bottom.
- 3.25 s: pointer crosses the bottom edge on its way out, slowly. The bottom edge sticks, stretches after it into a soft point, lets go and wobbles back. The circle comes home, the body melts around it, then the two rings separate by 3.9 s.
- 5.00 s: pointer arrives 8 px under the pill from below, outside. The body presses in, the colour behind shows in the gap and the letters it reaches take the text colour. Holds to 5.8 s.
- 5.88 s: pointer crosses the bottom edge inward. The colour drains over about half a second, the outline bulges over the pointer, the circle splits off again.
- 6.50 s: press. Both shapes squeeze in 9 px.
- 6.80 s: release. Both ease back out.
- 7.23 s: pointer leaves through the right end. The right end stretches after it and wobbles back; the circle comes home and the rings separate by 7.9 s.
- 8.10 s: pointer off to the top left. Rest.
- 8.50 s: rest again; the last frame matches the first (loop seam).
