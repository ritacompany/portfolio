# Site cursor: states

| State | Trigger | Look | Move into it |
|---|---|---|---|
| Hidden | page load before the first pointer move; pointer leaves the window; over a text field | nothing drawn, system cursor in text fields | opacity 150 ms |
| Dot | pointer anywhere else, links included | 24 px white circle, drop shadow 0 12 24 at 20 percent black | from the button: shape closes on the spring, fill floods back, 420 ms |
| Button | pointer over `[data-cursor="button"]` (the Mondai card media) | Learn more small button default: 3 px Neutral/100 outline, Neutral/100 text, transparent | width and height on the measured spring, inset fill drains to 3 px, 420 ms; label in 200 ms after 168 ms |
| Pressed | mouse down while Button | Neutral/100 fill, Neutral/900 text, scale 0.98 | 220 ms, by option: A flood from the pointer, B sweep left to right, C outline thickens inward (text turns dark from 30 percent) |

Follow: none; the dot sits on the pointer, as the reference does. Reduced motion: every transition 0 ms.
