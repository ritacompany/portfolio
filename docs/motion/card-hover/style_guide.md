# Work card hover: style guide

Piece: the two Selected works cards on Home (Mondai, Figma 5812:22891; Haven, 5812:22905). Interactive,
pointer driven. His spec, 9 Nov, in his words: the cards "should stay as like their base version right
with like the image and then when they highlight there should be an overlay say at like 75% like black
overlay that appears and then this button loads in over the top like the learn more button so it
shouldn't just be there by default that's actually an interaction".

## Reference
- His spec above, and the card images exported from Figma (`site/assets/home/mondai-card@2x.webp`,
  `haven-card@2x.webp`). No outside reference: the motion is his description.
- The Learn more Small button (5812:22855) with its picked hover fill (option A, 9 Nov).
- What exists today (Phase 2, never reviewed by him): the image eases in 3.5 percent and the label and
  description go white; Learn more always shows and fills on hover.

## What to take
- At rest: only the image, exactly as the Figma frame draws it, minus Learn more.
- On hover: a black layer over the image fades to 75 percent. Learn more then loads in over it: it
  rises a short distance into place and grows from slightly smaller to full size while it fades in,
  starting a beat after the overlay so the overlay reads first.
- On leave: Learn more goes first and faster, the overlay follows; nothing lingers.
- Both cards behave the same. Haven gets a Learn more too, in the centre of its image (Figma has none
  there; his spec covers both cards).
- Keep from Phase 2: the image eases in a little (3.5 percent) under the overlay, the label and
  description go white. Both read as part of the same hover.
- Keyboard focus shows the hovered state, so the button is reachable without a mouse.

## What not to take
- No blur on the image, no colour tint, no glow: a plain black layer (motion rules ban glow on UI).
- No bounce on the button: it carries text, so it settles without overshoot (motion rules, TYPE).
- Not on touch screens: a tap opens the card, so the image stays as it is at rest.

## Timing (starting values, his to tune)
- Overlay to 75 percent: critically damped spring, settles in about 0.45 s.
- Learn more: starts 0.08 s after the overlay, rises 12 px and scales from 0.92, critically damped,
  settles in about 0.55 s. Its opacity reaches full at 60 percent of the way.
- Leave: both springs return together with no delay.
- Image: heavy spring to 1.035, settles in about 1.3 s, as Phase 2 had it.

## Reduced motion
The still is the card at rest: the image only. With reduced motion the hovered state appears and
disappears at once (overlay at 75 percent, Learn more in place), with nothing moving.
