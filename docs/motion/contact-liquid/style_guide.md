# Liquid Contact button: style guide

The footer Contact button (Figma 5812:22855 family, `components.css .button`) with a mix of his two Framer
references. Engine: `site/js/contact-liquid.js`. Lab: `site/motion-lab/contact-liquid.html`. Tuner:
`site/motion-lab/contact-liquid-tuner.html`, built by `scripts/motion-tuner/contact-liquid.py`.

## Sources, read from the recordings

- `reference/buttons/liquid-button-frames.png` and `reference/buttons/liquid-button-recording.mov`
  (Liquid Button, Blue Jackson). Read at 10 fps around 0.8 to 3.2 s and 9.5 to 11.9 s.
  - The outline is a membrane. It reacts to where the pointer is, not just whether it is over the button.
  - Pointer inside: the nearest edge bulges outward over it, like a finger inside a balloon, and the bulge
    travels with the pointer along the top or bottom edge. Top and bottom both move when the pointer is
    in the middle.
  - Pointer just outside an edge: a wedge of colour (cyan in the reference) rises into the button from that
    edge. The outline itself barely moves. The colour is the hidden layer showing where the body was
    pressed in.
  - Pointer leaving: the edge sticks to the pointer and is dragged out into a point, then lets go and
    wobbles back. Small kinks appear where it lets go.
  - The body is a dark fill a shade off the page, the outline is a thin light line, the label never moves.
- `reference/buttons/gooey-liquid-button-frames.png` and the recording (Gooey Liquid Button, Khanh Huu).
  - At rest the label pill and the icon circle are one shape joined by a neck.
  - Hover: the circle pulls away from the pill, the neck stretches and snaps, the icon turns. Leave: it
    flows back and merges.
- His notes (9 Nov): he likes the gooey behaviour, wants it mixed with the liquid outline, does not want
  it to rest joined, wants it to respond to where the pointer is, and points to the colour behind it as a
  setting still to decide. On 17 Oct he said he did not like the blue fill in the outline reference; the
  tuner keeps the colour switchable and its value open.

## The mix

- Rest: the two Figma pills, crisp, touching, each with its own outline. No neck, no colour.
- Inside: the outline bulges toward the pointer (outline membrane).
- Outside near an edge: the body dents and the hidden colour shows in the dent (dent membrane).
- Leaving: the edge sticks and stretches after the pointer, lets go past the release distance.
- Hover: the circle pulls away (left by default, or right, or away from the pointer) and tips; while it
  moves the shapes melt together through a goo filter and snap apart. The merged outline only fades in
  while hovered.
- Press: both shapes squeeze in.
- Reduced motion: none of this runs, the plain borders stay.

## Look

- Outline: Neutral 100 (`#e8e7ee`), 3 px, the same weight as the Figma borders.
- Body: the footer black (`#040405`) by default, so only the outline reads, as on the site now.
- Hidden colour: reference cyan as a placeholder (`#22d3ee`), on or off, strength 0 to 1. Not decided.
- Springs are set as speed (seconds to settle) and bounce. Physics runs at a fixed 60 Hz.

## Timing

- Outline: speed 0.36 s, bounce 0.6 (the liquid reference wobbles two or three times).
- Dent: speed 0.55 s, bounce 0.35 (the colour wedge rises and drains, little overshoot).
- Circle: speed 0.38 s, bounce 0.65 (the gooey split he liked on 9 Nov).
- Press: speed 0.26 s, bounce 0.4.
