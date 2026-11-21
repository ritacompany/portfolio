# Cursor button: style guide

Piece: the cursor turns into a button over a card image. Home: the Mondai card (5812:22891) and the Haven
card (5812:22905). Collection: the Framework CS card (6331:27894). Interactive, pointer driven.

His ask, 20 Nov review (paraphrased by the lead session): today a hover reveals "learn more" in a fixed
spot; he wants a mouse effect where the cursor turns into a button. On the homepage Mondai card it says
something like "Learn more"; on the framework card in the collection the same effect says something like
"View case study".

## Reference
- His ruling on the Small button, 10 Nov (docs/SITE_BUILD_PLAN.md, "His notes on the preview"): hover
  shows the outline only; pressing the card swaps it to the white button. The cursor button keeps that:
  outline while it follows, white fill while the mouse is down.
- The Small button component as built (components.css `.button-sm`, his 16 Nov master: Bold 16, upper
  case, 3 stroke, radius 32). The cursor button is that component, not a new one.
- The common pattern on portfolio and studio sites (a label pill that replaces the cursor over a media
  link): take the swap and the soft follow; leave out the blend modes, the magnetic pull and the trail.

## What to take
- Over the image, the system cursor disappears and the button sits centred on the pointer.
- It follows on a critically damped spring, so it trails by a hair and never overshoots: it carries text.
- Entering, it grows from 0.6 and fades in; leaving, it shrinks back to 0.6 and fades out, a little
  faster than it came in. It enters from where the pointer crossed the edge, never from a corner.
- Mouse down: white fill, dark text, 96 percent. Mouse up: back to the outline.
- Keyboard focus: the same button, still, centred on the image. Touch: nothing; the phone layouts keep
  their own Learn more link.

## What not to take
- No blend mode or colour inversion: the outline reads on both card images as it is.
- No magnetic pull towards the centre, no trail, no rotation, no glow.
- No bounce on enter, press or follow: text never overshoots (motion rules, TYPE).

## Labels (proposed, his yes needed)
- Home Mondai card: "View collection". It opens three case studies, and its card already says
  "Case study collection"; "Learn more" says nothing about where it goes.
- Home Haven card: "View case study". One case study behind it.
- Collection Framework CS card: "View case study".
One verb, the destination after it, so the three read as one system.

## Timing (starting values, his to tune on the tuner page)
- Follow: spring k 320, damping 35.8 (critical), about 0.3 s to catch a stopped pointer.
- Enter: scale and opacity on a TYPE spring (k 200, critical), about 0.45 s.
- Leave: k 420, critical, about 0.3 s.
- Press: scale to 0.96 in 120 ms (the button's own press), fill swaps at once.

## Reduced motion
The button sits exactly on the pointer with no lag and appears and disappears at once, with no scale.
The still frame is the button centred on the image in its outline state.
