# Framework page, tablet (768 to 1199), round 2: his audit of 18 Nov

Measured 18 Nov with `node reports/framework-tablet-2/measure.mjs 1440,768` (every section item in reading
order with its gap to the item above, trimmed text boxes, so a gap runs from one line's baseline to the
next line's cap top) and Haven with the same method at 1440 and 768.

## How Haven's tablet was done (the method copied here)

- Type steps down by role, not by element: the title scales with the window from its 1440 size
  (`clamp(72px, 14.72vw, 170px)`, 212 / 1440 = 14.72vw), Heading/40 drops to 32 (line height 1.15), the
  ending title to `clamp(52px, 6.66vw, 80px)`. Body, labels, Heading/24 and Heading/20 stay at size.
- Spacing keeps the 1440 numbers wherever the relationship still exists: eyebrow to heading 40 at both
  widths, heading to the next block 80 at both. Sections run 64 on top and 120 under (165 at 1440).
- Pairs that fit side by side stay side by side (the hero tagline beside its text, the testing text beside
  its cards, the insights in one row). Only media that cannot fit beside its text goes under it.

## The 1440 rhythm on the framework page

| Relationship | 1440 | Tablet before | Tablet now |
|---|---|---|---|
| Section top to eyebrow | 64 | 72 | 64 |
| Eyebrow to heading | 39.5 (38.5 once) | 20 | 40 |
| Heading to the next block | 122 to 240 (side by side) | 40 | 80, Haven's value for the same step |
| Subhead to its body (Capacity, Pathways, CareerFoundry) | 19.5 to 23.5 | 10 | 20 |
| Label/14 C to its body (Pathway target) | 20 to 24 | 10 | 20 |
| Label/14 C to its subhead (01. Progress) | 16 | 16 | 16 |
| Label/12 to its value (Role, Example) | 16.4 | 10 | 16 |
| Body to the next group (references row, Falling behind labels) | 55.5 (31.5 to 52.9 in one place) | 36 | 56 |
| One body block to the next | 26.5 (a paragraph break inside a block: pitch 38, less the 11.5 cap) | 24 | 26.5 |
| Text to a figure | 24 to 33.5 | 40 | 40, Haven's media gap |
| Figure to text | 55.6 | 32 | 56 |
| Last content to section end | 164 | 72 | 120 (Haven's tablet) |
| Hero: title to details, details to rule, rule to mark, mark to tagline | 81, 23.5, 64, 32 | 40, 48, 48, 32 | 64 (Haven's tablet hero), 24, 64, 32 |

Side by side at tablet, as at 1440: the hero details on the 8 column grid, the mark and tagline beside the
two hero paragraphs (which start level with the mark), the four references, Capacity beside Effort, the
two Schedule view notes under the screen. Figures beside text still go under it.

## His six items

| # | What he saw | Measured before | Cause | Status |
|---|---|---|---|---|
| 1 | Spacing does not match 1440; Capacity's body sits closer to its heading than at 1440 | Capacity to its body 10 (20.5 at 1440); eyebrow to heading 20 (39.5); see the table | The first pass used one stacked rule set for every width under 1200 and tuned it for 390 | Fixed: the table above, checked by `verify.mjs` at 768, 834, 1024, 1180, motion on and off |
| 2 | Headings and title larger than Haven's at the same width | Heading/40 40 vs Haven 32; ending 64 vs 52 at 768; the title was 105.6 vs 113 (smaller, a different formula) | tokens.css steps the framework type for its own phone layout, not Haven's tablet scale | Fixed: Haven's three formulas, checked by `type.mjs` against Haven's computed sizes at 768, 834, 1024, 1159 |
| 3 | The black gradient behind "Select a new time" shows a hard edge over "Usability findings" | Crops: `shots/item3-popover-edge-*-brightened.png` (brightened 4 times) | It is in the picture itself, `schedule-gaps@2x.webp` (Phase 1 export, 1094 by 1018): the popover's shadow stops in a hard, ragged band across the Usability findings card and runs past the card's right edge, while the dimming over the rows below fills the card evenly. The same file is used at 1440, so the edge is there too | Not fixed: it needs a fresh render of that frame from his Figma file. The Figma connector hit its daily limit on his View seat while I traced the node (5812:20114 is not in either file I could reach; the framework now lives in WIP Mondai framework case study 4269:9433). Handover below |
| 4 | Rollover effect heading renders under its body | Heading after its body in the page source | The heading was added by hand (11 Nov) after its body line, and below 1200 items stack in source order | Fixed in source order (the two lines swapped), so 390 and screen readers get it too; 1440 places both absolutely, so nothing moves there. Checked by `verify.mjs rollover` at 390, 768, 1024, 1180 |
| 5 | The placeholder footer with numbers is not responsive | Not identified: the only footer is the shared site footer (year, clock, Linkedin, Resume over the wordmark), the same on Haven and the home page, and it reflows at 768, 1024 and 390 | Waiting on which footer he means; the shared footer lives in components.css, which this task may not edit | Asked the starting session 18 Nov; open |
| 6 | Check every animation at tablet | Motion on: entrances armed before scrolling, every item shown after a scroll through, the carousel built; reduced: every item shown at load | n/a | Checked by `motion.mjs` at 768, 1024, 1180, both settings; control (no scroll) leaves 86 items hidden |

## Checks

- `node reports/framework-tablet-2/verify.mjs`: FW_TABLET2_OK 8 of 8. Control (`STRIP=1`, the tablet block
  removed): 792 problems.
- `node reports/framework-tablet-2/type.mjs`: FW_TYPE_OK 4 widths. Control: 12 problems.
- `node reports/framework-tablet-2/verify.mjs rollover`: FW_ROLLOVER_OK 4 widths.
- `node reports/framework-tablet-2/motion.mjs`: FW_MOTION_OK 6 runs. Control (`NOSCROLL=1`): 86 items left
  hidden at each width.
- `node reports/framework-tablet-2/swap.mjs`: 230 boxes identical at 390, 1200 and 1440 with the block on
  and off (footer clock frozen, since it ticks between loads); 205 differ at 768. FW_SWAP_OK 3 widths.
- `node reports/tablet-breakpoint/verify.mjs`: TABLET_OK 8 of 8 (the first pass's checks, unchanged).
- `verify-responsive.mjs` size and health OK at 5 widths. Fit fails only on the Start of week carousel's
  side cards (20, off the stage by design), identically at 37b4424 before this work, including 390, 1200
  and 1366 where this block does nothing; `fit.mjs` holds that.

## Handover for item 3

Render the Schedule view reschedule frame (the one exported as `site/assets/framework/schedule-gaps@2x.webp`,
547 by 509 at 1x) from his Figma file at 2x, with the popover shadow and the row dimming fully inside the
outer card, and replace the file under the same name. Nothing else changes: the picture keeps its size, so
the page does not move. Either he exports it, or a session renders it once the Figma connector's daily
limit resets.
