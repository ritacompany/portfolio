# Contact button motion: style guide

Piece: the outlined Button (Contact) in the footer, Figma 5812:22672: an icon circle (78 by 75.92,
3.31 stroke) overlapping a label pill (3 stroke) by 3 px. Interactive, pointer driven. His ask 9 Nov:
the liquid button effect from his pinned session "Liquid button effects recreation" (branch
claude/cool-albattani-5v7t70), applied to this button. His pick 9 Nov: A, the gooey split.

## Reference
Two paid Framer marketplace buttons he screen recorded on 17 Oct. The recordings are the truth:
`reference/buttons/gooey-liquid-button-recording.mov` (60 fps, 6 s) and `liquid-button-recording.mov`
on main; the frame sheets in this folder (`ref-gooey-frames.png`, `ref-liquid-frames.png`) are for
reading without playing video.
- Gooey Liquid Button ($5, framer.com/marketplace/components/gooey-liquid-button).
- Liquid Button ($10, framer.com/marketplace/components/liquid-button).

## What to take
Gooey (A), measured frame by frame on the recording (button height H = 139 px in the capture):
- At rest the circle and the pill are one body: the circle sits a third of its width inside the
  pill and a concave neck about half the height (74 of 139 px) joins them.
- Hover is one eased move, not a spring. Frames 22 to 44 (0.37 to 0.73 s): the circle first tucks
  toward the pill by 6 px (10 percent of the move), launches, covers 60 px (0.43 H), overshoots by
  5 px (8 percent) at 0.29 s and is settled at 0.36 s. No second bounce. That is a back ease in and
  out of about 0.38 s (cubic-bezier near 0.68, -0.6, 0.32, 1.6).
- The neck thins over three frames (0.05 s) and snaps when the circle is about 60 percent of the
  way out. A slight point stays on the pill's end for a frame and rounds off.
- Leave is the same curve in reverse (frames 100 to 123): the circle pushes 5 px further out first,
  comes back, the neck reforms as a thread and thickens, the circle sinks 6 px past rest and settles.
- The icon inside the circle turns as the circle moves (the reference turns its refresh icon about 180).
- Text never blurs or wobbles: only the shapes are liquid.

Liquid outline (B), kept on the lab page for comparison, not shipped:
- The outline is a thin membrane. When the cursor reaches the edge, the edge is caught and dragged with
  the cursor, forming a peak or a dent toward wherever the cursor goes, up to about 20 px off the
  rest line at a 56 px button height.
- The pull is local: about one button height of edge around the cursor moves; the rest stays put.
- Fast cursor moves leave a wave that travels along the edge and settles in about 0.6 s.
- When the cursor leaves, the caught part snaps back with one or two small wobbles.
- Stays an outline: the cyan fill the reference shows in the dragged area is left out (his ask in the
  original session).

## What not to take
- The reference's grey filled pill: the portfolio button is an outline on Neutral/900, so the goo
  is drawn as the outline of the union (blur, threshold, erode, subtract). The filled look stays out.
- The reference's deep overlap at rest. The Figma button overlaps by 3 px and that geometry stays, so
  the content (icon, text) sits exactly where Figma puts it. The liquid neck is built by the filter
  from that 3 px seam instead; it reads a little fuller than the reference neck (about two thirds of
  the circle against half) because the seam is shallow. Sinking the drawn circle deeper would put the
  icon off centre in its ring, so no.
- The reference's 56 px size and refresh icon: the portfolio button keeps its Figma geometry and the
  mail icon, so distances scale by the button height.
- No glow, no blur on text, no color change (motion rules: banned glow on UI).

## Scale and timing at the portfolio size (H = 76 px)
- A: pull 28 px. Scaled travel would be 33 px (0.43 H), but with a 3 px seam that opens a gap of
  34 px, nearly half the circle, where the reference gap is a third of the circle (45 of 139 px).
  28 px splits the difference: travel 0.37 H, gap 29 px (0.38 of the circle). His slider decides.
- A: move 380 ms, tuck and overshoot about 10 percent (bounce 1.7 on the tuner), icon tips 18 degrees
  (a mail icon turned 90 reads as a document, round 1).
- A filter: blur 12, threshold 40 with cutoff 18 (steep, so the thinning neck stays a crisp thread
  instead of a grey smear), line 3 px to match the Figma stroke.
- Press squeezes the shapes 6 px inward over 140 ms and eases back on release. The recording has no
  press; this is ours.
- Reduced motion: the still is the button at rest, exactly the Figma frame with its plain borders.
  Nothing moves and the script never starts.

## How it is judged
Timing is checked on the real footer by scripts/verify-contact-goo.mjs (tuck, pull, one overshoot,
settled under 0.6 s, press, return). The look is judged against the recording frames, then by him on
the published tuner (scripts/motion-tuner/contact-goo.py builds it). Nothing is done until he has
felt it there and sent settings back or said it feels right.
