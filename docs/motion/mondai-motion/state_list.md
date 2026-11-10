# Mondai case study motion: state list

Scroll triggered, browser clock. Times are seconds from the trigger named on each line; a reader at
the top of the page sees the load lines, then each section's lines as it scrolls in.

## Load (both pages)
- 0.00 s: first paint. Every item that will move is hidden (text at 0 opacity, media closed at its top
  edge). The nav shows.
- 0.35 s: arrival wait ends. Items on screen start: text step 1 begins its 1.4 s fade.
- 0.50 s: text step 2 begins (0.15 s after step 1), and so on down the screen.
- 0.35 s: a media frame on screen at load starts opening from the top, picture at 1.3.
- 1.55 s: that frame is fully open, picture at 1, clip removed.
- 3.00 s: failsafe. If the script never ran, everything shows.

## Collection (`/mondai/`), from load
- 0.35 s: mark and Mondai (one line) and the Case study collection label start together (each opens its
  own section).
- 0.50 s: the intro and the Framework CS row.
- 0.65 s: Design system CS row.
- 0.80 s: Operations CS row.
- 2.20 s: last row fully in. At rest.
- Phone (390): the same; the intro wraps to more lines but stays one step.

## Framework (`/mondai/framework/`)
Hero, from load:
- 0.35 s: Framework CS title.
- 0.50 s: Role, Affiliate, Focus labels together (one line).
- 0.65 s: their values together.
- 0.80 s: the rule.
- 0.95 s: the lead and the body together (side by side at 1440).
- Phone (390): the labels and values stack, so the steps run title, Role, Founding designer, Affiliate,
  then everything below starts at 0.95 s, the fifth and last step.

Each section, from the moment its first item is 100 px inside the screen:
- 0.00 s: eyebrow (step 1).
- 0.15 s: lead (step 2).
- 0.30 s on: the next line of items that is also past the trigger, one step per line, up to 0.60 s
  (the fifth step); later lines share that step. Items further down wait for their own trigger and
  start at 0.00 s when they reach it.
- Media: from the moment any pixel of the screen image is on screen, curtain from the top over 1.2 s,
  picture 1.3 to 1 on the same curve. Fully open at 1.20 s.
- Start of week: the moment the carousel shows, all five templates open together; the slide labels
  fade when the carousel is 100 px inside the screen.
- Fast scroll: anything scrolled past before its trigger fired shows at once, so scrolling back up
  never finds an empty section.
- Ending bar: fades as one item when it is 100 px inside the screen.

## Widths
- 1440 and 1200 to 1440 (the page zooms): the Figma positions; items side by side share a step.
- Under 1200 and 390: the stacked order; every item is its own line, so its own step, up to the fifth.

## Reduced motion
- 0.00 s: everything in its final state. Nothing fades, opens or smooths.
