# Card to collection transition: states

Lands on the new collection page (Figma 6331:27875). Times for B and C are from the release on the card,
on both pages. A was PR #30's view transition until 24 Nov; it now runs on this engine.

| State | When | Look |
|---|---|---|
| Rest | before the release | Home as it is; the cursor in its Learn more press |
| Exit | 0 to 220 ms on Home | the move starts at once: the picture, "Mondai" and the label travel from the card; a Neutral/900 veil fades over everything else, the "//", description, phone Learn more and cursor included |
| Page load | from 220 ms until the browser swaps pages | Home keeps drawing the move on the veil |
| Arrival | the collection's first painted frame | the move continues from Home's last frame and catches up with the clock over about 0.15 s; nav and cards held hidden |
| Travel | A and B 0.78 s, C 0.84 s | per direction, below |
| Settle | the spring within 0.5 percent | the wordmark copy sits on the real wordmark, B's frame on the Framework CS card frame; copies removed |
| Fill | from 30 percent of the travel | nav, card heads and cards fade in place, power1 out, left to right |
| End | everything at rest | the collection exactly as a direct visit leaves it |

## Per direction, travel state

| Direction | Frame | Inside the frame | "Mondai" | Label |
|---|---|---|---|---|
| A. Title | stays at the card's rect | Home picture shaded by 15 percent, gone by 30 percent, with Home | grows into the wordmark; word to wordmark swap in the first 15 percent | as B |
| B. Card | from the card's rect to the Framework CS card's frame (394 by 469 at 1440) | Home picture shaded to 40 percent by 20 percent, fades out 20 to 50 percent; the framework preview fades in 40 to 75 percent | grows into the wordmark; word to wordmark swap in the first 15 percent | travels and grows to 16 px, dropping first; card label out 45 to 65 percent, page label in 65 to 95 percent |
| C. Open | from the card's rect to the whole screen | Home picture shaded by 25 percent, dissolves 55 to 100 percent, as the cards arrive | as B | as B |

## Interrupt
A click, key or wheel during the arrival jumps to End.

## Reduced motion
No exit and no arrival. The link opens the collection at rest.

## Fallbacks
- No stored card, older than 5 s, window resized, or the collection layout not found: the page's own entrance.
- Back to Home from the collection: veil and copies removed on `pageshow`.
