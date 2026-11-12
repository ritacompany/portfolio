# Haven pill tooltips: gates

Option 2 from site/dev/pill-tooltips/ (detached box, arrow on the chip), chosen by Chadwick on 11 Nov.
Pattern: WAI-ARIA APG tooltip, NN/g tooltip guidelines, WCAG 1.4.13. Every gate is checked in the built in
browser on site/haven/ at 1440, 768 and 390 wide.

1. Text. All 14 pills have aria-describedby pointing at a role tooltip whose text equals the page's own
   card it cites (Key insights, testing cards, Confidante roles). No text is written into the tooltip by hand.
2. Hover only. A mouse pointer on a chip opens nothing before 300ms and opens the tip after it. Moving to the
   next chip while one is open swaps at once.
3. No click. A click or a touch tap opens nothing.
4. Keyboard. Tab focus on a chip opens its tip at once; Escape closes it and focus stays on the chip; blur closes it.
5. Hoverable. The pointer can cross from the chip onto the box (the bridge covers the gap) and the box stays open.
6. Placement. Box sits above the chip with 8px plus half the arrow between them, left aligned to the chip,
   flips below when there is no room above, and stays at least 16px inside both window edges. The arrow's
   centre is within 1px of the chip's centre.
7. Spec. Box is 306 wide (or the window less 32), radius 6, padding 20, Neutral/800 fill, Body/Label/12 in Neutral/200.
8. Tokens. No hex in pill-tips.css or pill-tips.js; every value comes from the Tooltip block in tokens.css.
9. Copy. No em dash, en dash, double hyphen or Oxford comma in any file written for this.

## Results, 11 Nov

Run in the built in browser on localhost:4318/haven/ with a script that walks every pill (transitions frozen
so positions read at rest).

| Width | Pills | Failures | Notes |
|---|---|---|---|
| 1440 | 14 | 0 | Gap 14.4 everywhere, arrow offset 0, Interview insight 2 shifts to 16px off the right edge. 1440.jpg |
| 768 | 14 | 0 | Same; Interview insight 2 shifted to the right edge with the arrow still on the chip. 768.jpg |
| 390 | 14 | 0 | Mouse placement keeps 16px edges at 306 wide. A touch tap opens nothing and shows no focus ring. 390.jpg |

Gates 1 to 6 pass at all three widths. Gate 7: box reads rgb(18, 18, 20) on Neutral/800, ink rgb(222, 222, 229)
on Neutral/200, 12px/17px, 0.48px tracking, padding 20, radius 6, width 306. Gate 8: no hex in pill-tips.css or
pill-tips.js. Gate 4 was checked with dispatched focus events because the hidden browser pane does not fire
real focus; Escape closed the tip and focus stayed on the chip.

Flip checked on the page at 1440: Interview insight 4 with its chip 30px from the top opened below, gap 14, arrow offset 0.
