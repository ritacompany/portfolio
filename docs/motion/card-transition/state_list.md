# Card to collection transition: states

Lands on the new collection page (Figma 6331:27875). Times for B and C are from the release on the card;
arrival times from the first frame of `/mondai/` (the browser holds Home's last frame until the new page
paints). A is PR #30's view transition and keeps its own timings (docs/motion/page-transition/).

| State | When | Look |
|---|---|---|
| Rest | before the release | Home as it is; the cursor in its Learn more press |
| Exit | 0 to 220 ms on Home | a copy of the picture, "Mondai" and the label sits exactly on the card; a Neutral/900 veil fades over everything else, the "//", description, phone Learn more and cursor included |
| Hand over | the page load | Home's last frame: picture and two words alone on Neutral/900 |
| Arrival start | 0 ms on `/mondai/` | the same frame, drawn by the collection page; nav and card frames held hidden |
| Travel | B 0.78 s, C 0.84 s | per direction, below |
| Settle | the spring within 0.5 percent | the wordmark copy sits on the real wordmark, B's frame on the Framework CS card frame; copies removed |
| Fill | from 30 percent of the travel | nav, card heads and cards fade in place, power1 out, left to right |
| End | everything at rest | the collection exactly as a direct visit leaves it |

## Per direction, travel state

| Direction | Frame | Inside the frame | "Mondai" | Label |
|---|---|---|---|---|
| B. Card | from the card's rect to the Framework CS card's frame (394 by 469 at 1440) | Home picture shaded to 40 percent by 20 percent, fades out 20 to 50 percent; the framework preview fades in 40 to 75 percent | grows into the wordmark; word to wordmark swap in the first 15 percent | travels and grows to 16 px, dropping first; card label out 45 to 65 percent, page label in 65 to 95 percent |
| C. Open | from the card's rect to the whole screen | Home picture shaded by 25 percent, dissolves 40 to 90 percent | as B | as B |

## Interrupt
A click, key or wheel during the arrival jumps to End.

## Reduced motion
No exit and no arrival. The link opens the collection at rest.

## Fallbacks
- No stored card, older than 5 s, window resized, or the collection layout not found: the page's own entrance.
- Back to Home from the collection: veil and copies removed on `pageshow`.
