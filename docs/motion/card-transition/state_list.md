# Card to collection transition: states

Times are from the release on the card. Arrival times are from the first frame of `/mondai/`; the page load
between the two shows Home's last frame (the browser holds it until the new page paints).

| State | When | Look |
|---|---|---|
| Rest | before the release | Home as it is; the cursor in its Learn more button press |
| Exit | 0 to 220 ms on Home | a copy of the card's picture and shared words sits exactly on the card; a Neutral/900 veil fades over everything else, the description, the phone's Learn more and the cursor included |
| Hand over | the page load | Home's last frame: the card's picture and words alone on Neutral/900 |
| Arrival start | 0 ms on `/mondai/` | the same frame, drawn by the collection page: picture, name, // and label at the card's rects |
| Travel | spring: A 0.84 s, B 0.68 s, C 1.25 s | per direction, below |
| Settle | the spring within 0.5 percent | the words sit on the real title and label at their real size and colour; copies removed |
| Fill | A and B from 60 percent of the travel, C from 30 percent | nav, intro and rows fade in place, power1 out: A and B 1.0 s with 0.12 s steps, C 0.7 s with 0.08 s steps (C's intro from 75 percent) |
| End | everything at rest | the collection page exactly as a direct visit leaves it |

## Per direction, travel state

| Direction | Picture | Name | // and label | Mark | Spring |
|---|---|---|---|---|---|
| A. Open | its frame grows from the card's rect to the whole screen; the picture grows with it and dissolves between 35 and 85 percent of the travel | travels to the title, 20 to 40 px | travel to the list label, dropping first (vertical move leads) | fades in from 50 percent | k 80, d 18 |
| B. Dock | shrinks along an arc into the mark's 40 px circle (corner rounds to a circle on the way); fades out between 50 and 85 percent | travels to the title, grows | travel to the list label, dropping first (vertical move leads) | fades in from 60 percent, under the closing picture | k 120, d 22 |
| C. Zoom | is part of the page's world: zooms with it from half to full size; fades out in the first 30 percent | is the real title, riding the page from 0.5 to 1 scale | travel in screen space to where the page's label is that frame | rides the page; fades in from 30 percent | k 40, d 13 |

Description ("Tech career navigator") and the phone's Learn more: go with Home under the veil in every direction. The picture is shaded to 35 percent in the first quarter of the travel (C: first fifth) so the words never cross its screen text. A shared word the card does not draw at that width (the phone has no //) fades in at 85 percent, as its partner lands.

## Interrupt
A click, key or wheel during the arrival jumps to End. During the exit on Home nothing interrupts: it is
220 ms and the page is already leaving.

## Reduced motion
No exit and no arrival. The link opens the collection at rest.

## Fallbacks
- No stored card, older than 5 s, window resized, or the collection layout not found: the page's own entrance.
- Back to Home from the collection (back forward cache): veil and copy removed on `pageshow`.
