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
  wordmark in 0.7 s; the same for the Framework CS card title into the case study heading. It is kept
  here as direction A, unchanged, and still runs the collection to framework page change in every
  direction.

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
1. Release on the card. Home draws a copy of the picture and the two shared words exactly where they are
   and fades a Neutral/900 veil over everything else in 220 ms (quart out). Then the browser loads `/mondai/`.
   The browser's own view transition is skipped for that one page change.
2. The collection reads where the card was (this tab's session storage) and starts on that same frame.
3. The copies land on the real wordmark, label and card frame, which take over with no jump.
4. Everything only on the collection (the nav, the card heads, the other cards) fades in place, power1 out,
   in reading order.

## The three directions
- **A. Title** (PR #30, unchanged): only the name moves. The two pages fade through the page colour while
  "Mondai" grows into the wordmark. Drawn by the browser (Chrome, Edge, Safari 18.2 and later).
- **B. Card**: the picture becomes the first case study. The card's frame travels and resizes into the
  Framework CS card's frame; inside it the Home picture is shaded, then gives way to the framework preview
  (a container transform: only the frame is shared, the content changes inside it). The other two cards
  and the heads fade in beside it.
- **C. Open**: the picture becomes the page. The frame grows to fill the screen, the picture dissolves into
  the page colour, and the page's cards and heads fade in on it.

## Timing
- Exit on Home: 220 ms from the frame of the release (Doherty threshold).
- Travel: one closed form spring per direction (site/lib/motion.js), no overshoot, starting at 0 velocity:
  B k 90, d 19 (0.78 s); C k 80, d 18 (0.84 s). Rescaled to reach exactly 1 on the frame it is within 0.5
  percent, when the copies hand over.
- The Home picture is shaded to about 40 percent in the first quarter, before the words cross it.
- Page only items: from 30 percent of the travel; B 0.9 s fades 0.09 s apart, C 1.0 s, 0.1 s.

## Where it runs
- Any pointer: mouse, touch, keyboard Enter. A modified click is left to the browser.
- Only when the collection opens from the card in the same tab within 5 s at the same window size. A direct
  visit, a reload or the back button gets the page's own entrance.
- Back to Home: the veil and copies are removed on return.

## Reduced motion
No veil and no travel; PR #30's view transition is off under reduced motion too. The page shows at rest.

## Not in scope
The Haven card, the reverse move, and a new collection to framework move (PR #30's title morph stays).
