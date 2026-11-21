# Site cursor: style guide

Live motion. Runs in the visitor's browser from `site/js/site.js`; tuned on `site/dev/cursor/`.

## Reference
cursors.framer.wiki, "Simple Replace": a small solid dot replaces the system cursor and, over a card,
becomes a pill label that follows the pointer.

Take: the dot as the only cursor, the pill that travels with the pointer, the label living in the cursor
instead of on the card.
Leave: anything that blends, trails, magnetises or adds a second shape. No blend modes, no lag trail, no
spring wobble on text (the TYPE rule: text never overshoots).

## The pieces
- Dot: solid Neutral/100, 12 px, follows the pointer with light easing (frame rate independent lerp).
- Link hint: over any other link or button the dot grows to 24 px and thins to 32 percent, so the link
  under it stays readable. A hollow 32 px ring was tried first and dropped: its edge cut through the
  letters of the nav links (review round 1).
- Card button: over the Mondai card media the dot grows into the Learn more small button in its default
  look (transparent fill, 3 px Neutral/100 outline, Neutral/100 text), sized to the real button's box. The
  shape grows solid out of the dot, then the fill drains outward into the outline as it opens; the label
  fades in once the outline has thinned (from 55 percent of the morph).
- Press: mouse down over the card fills the pill Neutral/100, text Neutral/900, scale 0.98. Release lets
  the card link open `/mondai/`. No separate hover look and no Neutral/300 pressed look on the cursor.

## Patterns and rules used
- Frequency of use: the cursor is used constantly, so moves are short (morph 360 ms on a cubic out
  curve, link hint 200 ms, press 120 ms) and the follow ease is light.
- Interruptible: every state change is a CSS transition from current values, so leaving the card halfway
  through the morph reverses from where it is.
- Origin aware: the pill grows out of the dot at the pointer, never from the card's center.
- Doherty threshold: hover and press respond on the next frame.
- Animated properties: one fixed, out of flow shape changes width, height and an inset box-shadow (the
  drain), plus transform and opacity. A clip-path version was tried first and dropped: clipping a full
  size pill showed the drain as two horizontal bars. The shape's size change moves nothing else on the
  page (it sits in a 0 by 0 fixed container), so the layout rule's reason does not apply.

## Where it runs
- Only with `(hover: hover) and (pointer: fine)`. Touch and coarse pointers keep the system cursor and
  the static Learn more on the card.
- Text fields keep the text cursor and the dot hides over them.
- The static Learn more on the Mondai card hides while the custom cursor runs and still shows on keyboard
  focus at its Figma position.

## Reduced motion
The cursor sits exactly on the pointer and swaps state with no transition: dot, ring, pill and press
appear at rest.

## Not in scope
Haven card: plain link dot for now. It could get the same treatment with its own label.
