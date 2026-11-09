# Contact button motion: style guide

Piece: the outlined Button (Contact) in the footer, Figma 5812:22672: an icon circle (78 by 75.92,
3.31 stroke) overlapping a label pill (3 stroke) by 3 px. Interactive, pointer driven. His ask 9 Nov:
the liquid button effect from his pinned session "Liquid button effects recreation" (branch
claude/cool-albattani-5v7t70), applied to this button.

## Reference
Two paid Framer marketplace buttons he screen recorded on 17 Oct (frames in this folder):
- `ref-gooey-frames.png`: Gooey Liquid Button ($5, framer.com/marketplace/components/gooey-liquid-button).
- `ref-liquid-frames.png`: Liquid Button ($10, framer.com/marketplace/components/liquid-button).

## What to take
Gooey (A):
- At rest the circle and the pill are one shape: a concave neck of liquid fills the seam between them.
- On hover the circle pulls away from the pill along the row, about 24 px at the pill's height (56).
  The neck stretches thin, then snaps; a small bead stays on each side for a frame and is absorbed.
- The icon inside the circle turns as the circle moves (the reference turns its refresh icon about 180).
- On leave the circle slides back; as the gap closes the neck reforms from both sides before they touch,
  so they meet with a soft bulge, not a hard edge.
- Motion is quick with a small overshoot at the end of each move (about 0.45 s, settles in about 0.6 s).
- Text never blurs or wobbles: only the shapes are liquid.

Liquid outline (B):
- The outline is a thin membrane. When the cursor reaches the edge, the edge is caught and dragged with
  the cursor, forming a peak or a dent toward wherever the cursor goes, up to about 20 px off the
  rest line at a 56 px button height.
- The pull is local: about one button height of edge around the cursor moves; the rest stays put.
- Fast cursor moves leave a wave that travels along the edge and settles in about 0.6 s.
- When the cursor leaves, the caught part snaps back with one or two small wobbles.
- Stays an outline: the cyan fill the reference shows in the dragged area is left out (his ask in the
  original session).

## What not to take
- The reference's grey filled pill and blue fill: the portfolio button is an outline on Neutral/900.
- The reference's 56 px size and refresh icon: the portfolio button keeps its Figma geometry and the
  mail icon, so distances scale by 76 / 56 (about 1.36).
- No glow, no blur on text, no color change (motion rules: banned glow on UI).

## Scale and timing at the portfolio size
- A: circle pulls 32 px (24 times 1.36); icon tips 18 degrees (a mail icon turned 90 reads as a document, round 1).
- B: edge pull up to 27 px; caught span about 76 px of edge.
- Both settle by 0.6 s after the pointer stops; press squeezes the shape 4 px inward and springs back.
- Reduced motion: the still is the button at rest, exactly the Figma frame. Nothing moves.

## Which one
Both are built on the real button side by side; he picks by using them. They do not combine: A changes
the button's construction (two pills becoming one shape), B keeps it and makes the line itself liquid.

## Measured on the recording, 9 Nov (round 3)
Full resolution, 60 fps, first hover (frames 23 to 46) and first leave (frames 100 to 124). Button
height H 139, circle 106 wide, full pull 60 px. Travel as a fraction of the pull, one value a frame:

-0.03, -0.07, -0.08, -0.08, -0.10, -0.08, -0.07, -0.02, 0.07, 0.20, 0.38, 0.60, 0.78, 0.90, 0.98,
1.03, 1.07, 1.08, 1.08, 1.08, 1.07, 1.05, 1.05, 1.00

Leave is the same list mirrored (push out to 1.08 over six frames, home, sink to -0.10, settle), so
one table drives both directions. Neck height as a fraction of H against travel: 0.61 at -0.10,
0.57 at rest, 0.53 at 0.07, 0.44 at 0.20, 0.22 at 0.38, gone at 0.60. The neck depends on where the
circle is, not on time: the same travel gives the same neck on the way in and the way out.

The icon in the recording turns about 90 degrees over the move. The mail icon keeps a 20 degree tip,
which tracks the travel the same way; a mail icon turned 90 reads as a document.

Where it is built: the motion lab file `contact-goo-next.js` is the shipping module, tried on the
motion lab page `contact-button-footer.html` (the Home footer as built). On his yes it is copied over
the shipped `contact-goo.js` in the site's js folder; `components.css` needs no change, the neck is a
third span under the same `.goo-shapes span` rule.

## The mix, 9 Nov (round 4)
His correction: the gooey split and the liquid outline are one effect, in sequence. Hovering splits the
circle off (gooey recording, the curve above). With the cursor on the label pill the outline is a
membrane (liquid recording, read frames 132 to 246 and 366 to 426 at 60 fps):
- Inside: the outline nearest the pointer bulges outward over it, about 0.2 H, and the hump follows the
  pointer along the edge; with the pointer mid pill both edges move a little.
- Leaving: the edge sticks to the pointer and stretches after it into a soft point, lets go about 0.6 H
  away and wobbles back, settled in about 0.4 s. One or two small wobbles, not a ripple.
- Just outside an edge: the body presses in a little. In the reference that is where the cyan layer
  showed; here nothing is coloured, only the outline moves (his 17 Oct ask).
- The icon circle stays rigid and the text never moves.
At the portfolio size (H 76): bulge 16 px, reach 46 px, stretch up to 22 px, release at 48 px, press in
9 px within 40 px, spring speed 0.36 s and bounce 0.6, caps 20 px out and 8 px in. All in GOO at the
top of the lab module, so sliders can follow if he wants it less liquid.
