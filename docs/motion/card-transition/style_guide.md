# Card to collection transition: style guide

Live motion. Runs in the visitor's browser across a real page change: Home (`/`) to the Mondai collection
(`/mondai/`). Proposal only: it lives in `site/dev/preview/card-transition.js` and `.css` and runs on the
preview build. Nothing reaches the shipped site until Chadwick says yes.

## What was there before
Nothing. Clicking the Mondai card is a plain page load; the collection page then runs its own entrance
(mondai-motion: text fades in place over 1.4 s after a 0.35 s wait). The earlier prototype
`prototypes/homepage-foundations/collection-page.html` (tracker H13) holds no transition: it shows the card
and the collection page as two sections of one page joined by a `#collection` jump link, with hover states
only.

## Reference
- The Figma frames the two pages are built from: Transported home `5812:22862` (the card) and Multi-CS
  Model `5812:22999` (the collection). The transition invents no layout: every start is the card exactly as
  Home draws it and every end is the collection exactly as it is built.
- The craft rule "Shared element" in `.claude/motion-patterns.md`: what is on both sides travels and resizes;
  the two screens never crossfade around it.
- The press that starts it: the site cursor (`docs/motion/site-cursor/`). Release on the card media follows
  the card link; the transition starts from that release.

What is on both sides, measured in the code:

| On the card (Home) | On the collection | Change |
|---|---|---|
| "Mondai", Heading/20, Neutral/050 (Neutral/000 while hovered) | the title, Heading/40, Neutral/050 | travels, grows to twice the size, tracking from -0.02 to -0.04 em |
| "//", Mark/15, Neutral/200 | "//", Mark/15, Neutral/500 | travels, colour only |
| "Case study collection", Label/12 C, Neutral/300 | the list label, Label/12 C, Neutral/400 | travels, colour only |
| the card picture | nothing | each direction treats it differently: this is what makes the three different |
| "Tech career navigator" | nothing | fades out where it is |

Take: the shared words travel in every direction, at their real sizes at both ends, so nothing jumps.
Not taken: a crossfade of either page around them; a rise on any text (the masked rise was rejected); the
picture appearing anywhere on the collection page once the move ends.

## How it runs across the page change
1. Release on the card. Home draws a copy of the card exactly where it is and fades a Neutral/900 veil over
   everything else in 220 ms (quart out), so the last frame of Home is the card alone on the page colour.
   Then the browser loads `/mondai/`.
2. The collection page reads where the card was (kept in this tab's session storage) and starts on that same
   frame: the card alone on Neutral/900. The direction plays from there.
3. The words land on the real title and label, which take over with no jump; the copies are removed.
4. Everything that is only on the collection (the nav, the Mondai mark, the intro, the rows) fades in place,
   power1 out, in reading order. It starts from the shared text fade but runs quicker (below), because here
   it follows a move the visitor started rather than a scroll.

## The three directions
Each is a different structure: the picture becomes the page, the picture becomes the logo, or the camera
moves.

- **A. Open.** The card's frame grows to fill the screen and becomes the page. The picture grows with it and
  dissolves into the Neutral/900 as it passes the edges; the words ride to their places inside it. Pattern:
  container transform, origin aware (the page opens out of the card).
- **B. Dock.** The card closes into the Mondai mark beside the title. The picture shrinks along an arc to the
  mark's 40 px circle and hands over to the mark; the name grows out of it into the title. Pattern: shared
  element, origin aware in reverse (the card ends where the brand starts).
- **C. Zoom.** The collection page arrives as a half size miniature with its title sitting exactly on the
  card's name, and the view zooms in to full size. The picture belongs to the same world and flies past the
  edges as the camera pushes in. Pattern: camera move; the title is never copied, it rides the page.

## Timing
- Exit on Home: 220 ms, starting on the frame of the release (Doherty threshold).
- Travel: one spring per direction, closed form, as in `site/lib/motion.js`. A moves large media: HEAVY tuned
  a touch quicker (k 80, d 18, no overshoot, 0.84 s). B uses TYPE (k 120, d 22, 0.68 s) because the picture
  ends 40 px wide. C is a camera move: HEAVY, slower (k 40, d 13, 1.25 s) so the zoom can be read. Each
  starts at 0 velocity, so the first 0.1 s is a soft lift, not a snap.
- The spring is rescaled to reach exactly 1 on the frame it is within 0.5 percent; the words hand over then,
  with no jump.
- Fades for collection only items: A and B 1.0 s, 0.12 s steps, from 60 percent of the travel; C 0.7 s,
  0.08 s steps, from 30 percent, once the picture has gone, and the intro waits until 75 percent so the
  travelling label never crosses it. Card only text fades in the first 12 percent.

## Rules used
- Shared element, origin aware, no layout shift (only transform, opacity and clip path move; the real page is
  laid out from the first frame), interruptible (any click or key during the arrival finishes it at once).
- Frequency of use: a visitor opens this once or twice, so it may take a little over a second.

## Where it runs
- Any pointer: mouse, touch, keyboard Enter. A modified click (new tab, new window) is left to the browser.
- Only when the collection is opened from the card in the same tab within 5 s and the window size has not
  changed. A direct visit, a reload or the back button gets the page's own entrance, unchanged.
- Back from the collection to Home: the veil and copy are removed on return, so Home is as it was left.

## Reduced motion
No veil and no travel: the link opens the collection, which shows at rest (mondai-motion already stands down
under reduced motion).

## Not in scope
The Haven card (it opens a case study page, not a collection) and the reverse move back to Home.
