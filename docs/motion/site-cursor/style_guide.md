# Site cursor: style guide

Live motion. Runs in the visitor's browser from `site/js/site.js` once approved; tuned on `site/dev/cursor/`.

## Reference, measured and read from its code
cursors.framer.wiki, "Simple Replace" (the home page of that site). Measured in Chromium on 21 Nov and read
from its component module (framer-DyGFw): every variant change uses one spring, stiffness 400, damping 30,
mass 1; the pressed variant is 20 by 20. `node scripts/check-cursor.mjs REF` measures the live reference
again (rest, pressed, released) and compares ours. Frame by frame, our press and release match its sizes
within 0.4 px at every sampled time.
- Dot: 24 by 24, rgb(255, 255, 255), fully round, drop shadow `0 12px 24px rgba(0, 0, 0, 0.2)`, no blend
  mode, no border.
- Follow: none. The dot is drawn exactly on the pointer.
- Ordinary links: no change.
- Over a hover target it grows into a white pill (44 tall, padding 10 by 15, label and arrow) on a spring:
  about 90 percent of the way at 40 percent of the time, a 2 percent overshoot, settled by about 350 ms.
- Mouse down anywhere: the dot shrinks to 20 px on the spring; release springs back with a 0.5 percent
  overshoot.

Take: the dot exactly (size, shadow, no lag, no link state), its spring for every change and its press.
Not taken, his calls: the colour is Neutral/100, matching the button, not white (21 Nov); the hover shape
is the Learn more small button in its outline look, not a white pill; it turns white only on mouse down.

## The pieces
- Dot: as measured above, in Neutral/100. Pressed on any click: 20 px, the reference's own press.
- Card button: over the Mondai card media the dot springs (the reference's spring) into the Learn more
  small button (3 px Neutral/100 outline, transparent, Neutral/100 text), sized to the real button's box.
  It grows solid out of the dot, then the fill drains into the outline; the label fades in partway.

- Button pressed, his pick 21 Nov: the white ripples out from the pointer in 140 ms (from 21st.dev
  "Ripple Button", an outline button that fills from the press point), Neutral/900 text, scale 0.98.
  The fill is the stroke's colour, Neutral/100, checked in G2. Release lets the card link open `/mondai/`.

## Patterns and rules used
- Interruptible: every change is a CSS transition from current values.
- Origin aware: the button grows out of the dot at the pointer; the flood starts at the pointer.
- Doherty threshold: hover and press respond on the next frame.
- One fixed, out of flow shape changes width, height and an inset box-shadow plus transform and
  opacity; it moves nothing else on the page.

## Where it runs
- Only with `(hover: hover) and (pointer: fine)`. Touch and coarse pointers keep the system cursor and
  the static Learn more on the card. Text fields keep the text cursor.
- The static Learn more on the Mondai card hides while the custom cursor runs and still shows on keyboard
  focus at its Figma position.

## Reduced motion
The cursor swaps state with no transition: dot, button and press appear at rest.

## Not in scope
Haven card: plain dot for now. It could get the same treatment with its own label.
