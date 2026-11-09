# Contact button motion: state list

The render drives a scripted pointer (white ring) through the same path for both versions (6.0 s loop).
Times are seconds in the render; each line is a cut the review strips check. A is the shipped gooey
split (site/js/contact-goo.js); B is the liquid outline, kept on the lab page for comparison only.

- 0.00 s: rest, pointer off to the left. Both buttons match the Figma frame, A with the liquid neck.
- 0.60 s: pointer reaches the icon's left edge (enter). A: the circle tucks toward the label, about 3 px, before it pulls. B: icon edge caught.
- 0.80 s: A: the neck has stretched to a thread and snaps; the circle is past half way.
- 1.00 s: pointer on the label's top edge. A: the circle has overshot by about 3 px and is settling 28 px out, icon tipped 18 degrees. B: edge caught under the pointer.
- 1.40 s: pointer pulls up and out (it left the button at about 1.02 s). A: the circle pushed out a touch, came back and the neck has reformed; settled by 1.45 s. B: a peak follows the pointer, capped at 27 px.
- 1.90 s: pointer drags right while out. B: the peak travels along the edge with it.
- 2.20 s: pointer flicks away. A: at rest. B: edge lets go and snaps back with a wobble.
- 3.00 s: pointer comes back up to the bottom edge. A: tuck, pull and snap again, settled by 3.40 s. B: bottom edge caught.
- 3.30 s: pointer moves inside over the label. B: a dent follows it in, capped at 8 px, clear of the text.
- 3.80 s: press. Both shapes squeeze 6 px inward over about 0.14 s.
- 4.20 s: release. Both ease back out.
- 4.80 s: pointer leaves to the right (it left the button at about 4.5 s). A: pushed out, flowed back, neck reformed, settled by 4.9 s.
- 5.70 s: pointer back at its start point and held still.
- 6.00 s: rest again; the last frame matches the first (loop seam).
