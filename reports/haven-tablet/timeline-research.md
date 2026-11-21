# Haven MVP timeline at tablet width: research

For F1 in `FEEDBACK-13NOV.md`. Research only, nothing built. 13 Nov 2026.

## The pick

**Keep the desktop chart as it is and let it scroll sideways inside its row, held at 1160 px wide, from 768 to 1159 px.** Drop the stacked pills version at these widths.

Why:

- **Nothing about the chart changes.** Overlap, stage order and the end marker all survive because the chart itself survives. Every other pattern below has to rebuild the chart in a new form. That rebuild is where the current pills version lost the message.
- **The first screen already tells the case study's part of the story.** The chart is a 1440 px image. Held at 1160 px, a 768 px screen opens on columns 01 to about 08: all of Phase 1, the start of the overlap at 05 and the "Case study end point, Identity launch" marker at 07. Scrolling only adds Phase 2's tail to 12, which is the part the case study does not cover. (Worked out from the image's column positions, not yet checked on the page.)
- **The page already does this.** The wireframes row a section below uses `.scroll-x` to scroll sideways on small screens, with `tabindex="0"` and an aria label. Using the same class and the same cue is not new visual language.
- **It stays legible.** Scaling the whole image to fit instead would shrink the 14 px stage labels to about 7.5 px at 768. Held at 1160 px they stay at about 11 px, the size they already are at the 1160 breakpoint today.
- **It is what tools built for this do.** Bryntum, Highcharts, GitHub and Jira all keep the Gantt shape and give a sideways window over it rather than restacking the bars.

What would change the pick:

- If he does not want any sideways gesture on the page at tablet, the next best is rotating the chart to vertical (pattern 2 below): columns 01 to 12 run down the page, the two phases become two side by side lanes and the end marker becomes a horizontal rule after 07. It keeps all three things but is a new drawing, so it costs a Figma pass.
- If the chart moves from a PNG to HTML later, a sticky column 01 to 12 header becomes possible, but at 446 px tall the chart fits on screen without one.
- Phones (below 768) are a separate call. At 375 px the opening window would show only about 01 to 03, so the end marker would sit off screen and the argument above stops holding.

## Examples

| # | Example | Pattern | Overlap | Order | End marker |
|---|---|---|---|---|---|
| 1 | [Bryntum Gantt, responsive demo](https://bryntum.com/products/gantt/examples/responsive/) | Sideways scroll over the full chart, task names frozen in a left column, a vertical "Project start" line | Kept | Kept | Kept, as a vertical line |
| 2 | [Kim, Moritz and Hullman, Design patterns and trade offs in responsive visualization (EuroVis 2021)](https://dig.cmu.edu/publications/2021-patterns.html) | Catalog of 378 desktop and mobile pairs from news sites. Names "transpose axes" (rotate) and "serialize" (stack side by side parts in a column) | Transpose keeps it; serialize loses it | Kept in both | Kept in transpose |
| 3 | [Highcharts, scrollable plot area](https://api.highcharts.com/highcharts/chart.scrollablePlotArea) | Below a set `minWidth` the plot area scrolls sideways while title, legend and axes stay fixed, with a fading mask at the edge | Kept | Kept | Kept |
| 4 | [GitHub Projects, roadmap layout](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-roadmap-layout) | Zoom levels (month, quarter, year) over a scrolling Gantt, with vertical markers for milestones and iterations | Kept | Kept | Kept, as markers |
| 5 | [Jira, timeline view](https://support.atlassian.com/jira-software-cloud/docs/what-is-the-timeline-and-how-do-i-use-it/) | Gantt with weeks, months or quarters zoom and a vertical line for today | Kept | Kept | Kept, as a line |
| 6 | [Knight Lab TimelineJS](https://timeline.knightlab.com/) | Zoomed window: one event large, a short strip of the time axis below that you swipe through | Lost, one item at a time | Kept | Only if you land on it |
| 7 | [Hoffswell, Li and Liu, Techniques for flexible responsive visualization design (CHI 2020)](https://idl.uw.edu/papers/responsive-vis) | 231 news charts. Most common moves: compress the width, move labels, remove labels, shorten labels | Kept if only compressed | Kept | Kept |
| 8 | [MOJ design system, timeline](https://design-patterns.service.justice.gov.uk/components/timeline/) | Vertical list of dated events, one per row | Lost | Kept | Only as a list item |
| 9 | [NN/g, mobile tables](https://www.nngroup.com/articles/mobile-tables/) | For wide grids on small screens: keep columns wide enough to read without zoom, scroll the rest and keep headers sticky | Kept | Kept | Kept |

Notes on what each one means for Haven:

1. **Bryntum** is the closest match to Haven's chart: overlapping bars, labels next to bars, a single marker line. Checked at 900 px wide: the chart does not reflow, it scrolls.
2. **Kim et al.** gives the vocabulary. The current tablet version is a "serialize": the two phases stacked as lists. The paper's own trade off is that serialized parts stop being visible together, which "can hamper comparisons". That is the overlap Chadwick says is gone. It also warns that transposing makes a chart long, which matters less here with only twelve columns.
3. **Highcharts** is the precedent for fixing a minimum width and scrolling, which is the pick in one setting.
4. **GitHub** and 5. **Jira** show the end marker treatment working at any zoom: a vertical line stays readable because it cuts every row.
6. **TimelineJS** suits an event story, not phases. Knight Lab's own tips say it "does not work well" for stories that jump around in time. Two overlapping phases are that kind of story.
7. **Hoffswell et al.** shows that compressing the width is the default move. It works until labels get too small, which is where Haven is below about 1160.
8. **MOJ timeline** is the pattern the current pills version drifts toward. MOJ says not to use it as a progress indicator. It shows a sequence, not a span.
9. **NN/g** sets the legibility floor that rules out shrinking the image to fit.

## Patterns ranked for Haven

1. **Sideways scroll at a fixed width** (Bryntum, Highcharts, GitHub, Jira, NN/g). Keeps all three, reuses the page's own scroll row. The pick.
2. **Rotate to vertical** (Kim et al. transpose). Keeps all three but needs a new drawing of the chart.
3. **Compress to fit** (Hoffswell et al.). Keeps all three, fails legibility below about 1000 px.
4. **Zoomed window or slides** (TimelineJS). Loses the overlap.
5. **Stacked lists** (MOJ and the current build). Loses the overlap and the timing. This is what F1 is about.

## For the session building it

- Below 1160 px: show `.mvp__chart`, hide `.phases`, give the chart `scroll-x` with the image held at 1160 px wide, `tabindex="0"` and an aria label in the wireframes row's wording style. The existing alt text already describes the chart.
- Start scrolled to the left so the end marker is in the first view.
- Check on the page at 768, 900 and 1159 that the marker at 07 is visible without scrolling at 768.

## What was checked

Each example above was opened in the built in browser on 13 Nov 2026. Bryntum and TimelineJS were looked at in a 900 px viewport; the others were read from their own pages or papers. The Haven numbers (label sizes, which columns show at 768) are worked out from the 1440 by 554 image and its column positions, not measured on the page.
