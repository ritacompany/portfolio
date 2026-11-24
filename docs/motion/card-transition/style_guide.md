# Card to collection transition: style guide

Live motion. Runs in the visitor's browser across a real page change: Home (`/`) to the Mondai collection
(`/mondai/`). Proposal only: it lives in `site/dev/preview/card-transition.js` and `.css` and runs on the
preview build of this branch. Nothing reaches the shipped site until Chadwick says yes.

## Which collection page
The new one: Figma "Mondai case study collection" `6331:27875`, built on draft PR #30 (branch
claude/mondai-collection), which this branch merges. His 20 Nov call retired the old list page
(`5812:22999`). The first round of this work (21 Nov) was built on the old page by mistake; record in
`fixes/2026-11-22-transition-built-on-retired-collection-page.md`.

## What was there before
- main: nothing. Clicking the card is a plain page load, then the page's own entrance.
- PR #30: a provisional page change (`site/js/page-transition.js`, `docs/motion/page-transition/`), a cross
  document view transition: the pages fade through the page colour and the card's "Mondai" grows into the
  wordmark in 0.7 s; the same for the Framework CS card title into the case study heading. Its idea is
  direction A here, rebuilt on this engine (24 Nov); it still runs the collection to framework page
  change in every direction.

## Reference
- The two Figma frames: Transported home `5812:22862` (the card) and `6331:27875` (the collection). The
  transition invents no layout: every start is the card exactly as Home draws it and every end is the
  collection exactly as it is built.
- The craft rule "Shared element" in `.claude/motion-patterns.md`: what is on both sides travels and resizes.
- The press that starts it: the site cursor (`docs/motion/site-cursor/`).

What is on both sides, measured in the code:

| On the card (Home) | On the collection | Change |
|---|---|---|
| "Mondai", Heading/20 | the Mondai wordmark, 586 by 157 at 1440 (an outlined vector of the same word) | grows about eight times; the word hands over to the wordmark in the first 15 percent, while both are small |
| "Case study collection", Label/12 C capitals, one line | "Case study collection", 16 px, two lines | travels and grows; the card's label fades out, then the page's fades in at the same place, never both at once |
| the card picture's frame | the Framework CS card's frame (B), or the whole page (C) | the frame is the shared object; what is inside it changes |
| "//", the description, the phone's Learn more | nothing | go with Home under the veil |

Not taken: a crossfade of either page around the shared words; a rise on any text (rejected); the Home
picture surviving on the collection once the move ends.

## How B and C run across the page change
His 24 Nov note, from a recording of the published build: "there's a pause". Measured in his recording: the
card sat still on black for about 0.4 s (19.37 to 19.77 s) between Home's fade and the move, the page load
plus a 150 ms wait for images. The move now never waits for the page:
1. Ahead of the click (when the card nears the screen, on hover or on focus) Home loads the collection in a
   hidden frame the size of the window and reads where everything lands. That also puts the page and its
   images in the browser's cache, so the page change is quicker in every direction, A included.
2. Release on the card: the move starts on Home on that frame. A Neutral/900 veil fades over everything that
   does not continue (220 ms), then Home opens `/mondai/` and keeps drawing the move until the browser swaps
   the page. The browser's own view transition is skipped for that one page change.
3. The collection is not painted until its transition script has run (`blocking="render"`), so its first
   frame is the move, never an empty page. It picks the move up from the last frame Home drew and catches up
   with the clock over about 0.15 s instead of jumping.
4. The copies land on the real wordmark, label and card frame, which take over with no jump.
5. Everything only on the collection (the nav, the card heads, the other cards) fades in place, power1 out,
   in reading order, never earlier than the page's first frame.
If Home has not measured the page yet (a click within moments of arriving), the card holds still on the veil
and the collection plays the move once it loads, as before.

## The three directions
- **A. Title**: only the words move (PR #30's idea, the title morph, rebuilt on 24 Nov). "Mondai" grows into
  the wordmark and the label travels to its place; the picture stays where it was, darkens and goes with
  Home. PR #30 drew this with the browser's own view transition, which cannot start until the page has
  loaded: the review of the real-time videos found a 0.37 s still Home before it began. On this engine it
  starts on the release like B and C.
- **B. Card**: the picture becomes the first case study. The card's frame travels and resizes into the
  Framework CS card's frame; inside it the Home picture is shaded, then gives way to the framework preview
  (a container transform: only the frame is shared, the content changes inside it). The other two cards
  and the heads fade in beside it.
- **C. Open**: the picture becomes the page. The frame grows to fill the screen, the picture dissolves into
  the page colour, and the page's cards and heads fade in on it.

## Timing
- Exit on Home: 220 ms from the frame of the release (Doherty threshold).
- Travel: one closed form spring per direction (site/lib/motion.js), no overshoot, starting at 0 velocity:
  A and B k 90, d 19 (0.78 s); C k 80, d 18 (0.84 s). Rescaled to reach exactly 1 on the frame it is within 0.5
  percent, when the copies hand over.
- The Home picture is shaded to about 40 percent in the first quarter, before the words cross it.
- Page only items: from 30 percent of the travel (never before the page's first frame), 0.9 s fades 0.09 s apart.

## Where it runs
- Any pointer: mouse, touch, keyboard Enter. A modified click is left to the browser.
- Only when the collection opens from the card in the same tab within 5 s at the same window size. A direct
  visit, a reload or the back button gets the page's own entrance.
- Back to Home: the veil and copies are removed on return.

## Reduced motion
No veil and no travel; PR #30's view transition is off under reduced motion too. The page shows at rest.

## Not in scope
The Haven card, the reverse move, and a new collection to framework move (PR #30's title morph stays).
