# Haven MVP timeline at tablet width: research

For F1 in `FEEDBACK-13NOV.md`. Research only, nothing built. Second pass, 14 Nov 2026.

The first pass listed nine sources, but five of them showed the same layout (scroll sideways) and two were papers. This pass has seven layouts that each work differently, each with a real example captured in the browser. The screenshots are on a board in this session's scratch folder (`haven-timeline-layouts.html`). The session that builds this can ask for it.

## The pick: names in a column on the left

From 768 to 1159 px, draw the chart as sixteen rows, one per stage, in the same order as the desktop staircase. The stage name sits in a fixed column on the left. On the right, a slim bar in the phase color spans its columns across 01 to 12. The end marker is a vertical line at 07.

Why:

- **Everything is on screen.** At 768 the bars get about 48 px per column. They can be that small because they no longer carry text, so the whole chart fits with nothing hidden. This beats the first pass's pick (scroll sideways), where Community's last columns sit off screen until you swipe. That is new evidence, which is why the pick changed.
- **It still reads as the desktop chart.** The same twelve columns, the same staircase, the same overlap at 05 to 07 and the same end line. The one change is that names move out of the pills into the left column.
- **It is a shipped pattern.** Flourish's Gantt template draws its event day schedule this way at 820 px.
- **It fits Haven's content.** Sixteen short stage names and no extra text per stage. Layouts that need something to say at each stop (number 6) or that put many names on one bar (number 4) don't fit what Haven has.

What would change the pick:

- If he wants the pills with names inside kept exactly as on desktop, take number 2 (scroll sideways) and accept the swipe.
- If he wants the two phases to read as two lanes side by side, take number 3 (turned on its side). It costs a new drawing and runs tall.

## The seven layouts

| # | Layout | Example | How it works | Overlap | Order | End marker | Fits Haven |
|---|---|---|---|---|---|---|---|
| 1 | Names in a column on the left | [Flourish Gantt, event day schedule](https://flourish.studio/visualisations/gantt-charts/) | One row per task, name on the left, a plain colored bar on the right | Kept | Kept | Kept | Yes, nothing hidden |
| 2 | Same chart, scrolls sideways | [Bryntum Gantt responsive demo](https://bryntum.com/products/gantt/examples/responsive/) | Full width chart in a sideways scroll row, names pinned left | Kept | Kept | Kept | Yes, but Community's end needs a swipe |
| 3 | Turned on its side, time runs down | [Mobiscroll scheduler, resource view](https://demo.mobiscroll.com/scheduler/resource-view) | Time top to bottom, lanes as columns, like a calendar week | Kept | Kept | Kept, as a line across | Yes, but a new drawing and tall |
| 4 | One bar per phase, stages as markers | [Linear timeline view](https://linear.app/docs/timeline) | Each project one long bar, checkpoints as diamonds with names under | Kept | Kept | Kept | No: eight stages per phase would collide |
| 5 | Lanes squeezed to fit | [Flourish Gantt, project management](https://flourish.studio/visualisations/gantt-charts/) | Chart shrinks to the screen, names cut off inside short bars | Kept | Kept | Kept | No: "Prototype" and "Empathize" get cut off at about 75 px |
| 6 | One stop at a time | [Knight Lab TimelineJS](https://timeline.knightlab.com/) | Big panel for one event up top, thin timeline strip below to swipe | Lost | Kept | Only if you land on it | No: needs content per stop, which Haven doesn't have |
| 7 | A list down the page | [MOJ design system timeline](https://design-patterns.service.justice.gov.uk/components/timeline/) | Events stacked with a rule on the left | Lost | Kept | Only as a list item | No: this is close to today's version, which is the problem |

## For the session building it

- Below 1160 px, swap the image for an HTML grid: a label column, then twelve equal columns. Each stage is a row with a bar spanning its start and end columns, bordered in `--phase-identity` or `--phase-community` like the legend swatches. Column numbers 01 to 12 run along the top, with the end line and its "Case study end point, Identity launch" label at 07 and "Community launch" at 12.
- Take the sixteen stages and their columns from the desktop chart, not from the pill lists. The image is the source of truth for the timing.
- Check at 768, 900 and 1159 that every bar and label shows without scrolling.

## What was checked

All seven examples were opened in the built in browser. Examples 1, 2, 3, 5, 6 and 7 were captured at 820 or 900 px wide. Linear's is its own desktop image, since the pattern is narrow by nature. The Haven numbers (48 px per column at 768, 75 px pills in layout 5) are worked out from the page width and the 1440 px chart, not measured on a built page.
