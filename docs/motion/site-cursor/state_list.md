# Site cursor: states

| State | Trigger | Look | Move into it |
|---|---|---|---|
| Hidden | page load before the first pointer move; pointer leaves the window; over a text field | nothing drawn, system cursor in text fields | opacity 150 ms |
| Dot | pointer anywhere else | 12 px solid Neutral/100 circle | from the link dot 200 ms; from the pill, the shape closes and the fill floods back, 360 ms cubic out |
| Link | pointer over a link or button that is not the Mondai card media | 24 px Neutral/100 dot at 32 percent | 200 ms cubic out |
| Pill | pointer over `[data-cursor="button"]` (the Mondai card media) | Learn more small button default: 3 px Neutral/100 outline, Neutral/100 text, transparent | the shape grows from the dot to the button box while the inset fill drains to 3 px, 360 ms cubic out; label opacity 0 to 1, 200 ms after 198 ms |
| Pill pressed | mouse down while Pill | Neutral/100 fill, Neutral/900 text, scale 0.98 | 120 ms quart out; release returns to Pill and the card link navigates |

Follow: position eases toward the pointer at a lerp of 0.35 per 60 fps frame (about 50 ms to cover
most of a move). Reduced motion: lerp 1 and every transition 0 ms.
