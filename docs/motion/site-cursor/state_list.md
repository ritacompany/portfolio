# Site cursor: states

Every size change runs on the reference's spring (stiffness 400, damping 30, mass 1; settles in about
460 ms), passed to CSS as a linear() curve.

| State | Trigger | Look | Move into it |
|---|---|---|---|
| Hidden | before the first pointer move; pointer leaves the window; over a text field | nothing drawn; the system text cursor in fields | opacity 150 ms |
| Dot | pointer anywhere else, links included | 24 px Neutral/100 circle, drop shadow 0 12 24 at 20 percent black | spring |
| Dot pressed | mouse down anywhere outside the card media | 20 px, same look | spring; release springs back to 24 |
| Button | pointer over `[data-cursor="button"]` (the Mondai card media) | Learn more small button: 3 px Neutral/100 outline, Neutral/100 text, transparent | size on the spring, inset fill drains to 3 px; label fades in partway |
| Button pressed | mouse down while Button | Neutral/100 fill (the stroke's colour), Neutral/900 text, scale 0.98 | white ripples out from the pointer, 140 ms; release lets the card link navigate |

Follow: none; the dot sits on the pointer. Touch and coarse pointers: no custom cursor. Keyboard focus on
the card: the static Learn more shows at its Figma position. Reduced motion: every transition 0 ms.
