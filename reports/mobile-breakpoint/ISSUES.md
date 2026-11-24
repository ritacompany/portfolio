# Framework page against Haven on a phone (20 Nov)

Measured at 390 (and 360 for overflow) with `node reports/framework-tablet-3/compare.mjs <width>`, the same
method on both pages. Neither page scrolls sideways at 360 or 390.

## How Haven does its phone (haven.css, `@media (max-width: 767px)`)

- Side margin 16 (`main, .site-nav { --m: 16px }`), on the page and the nav.
- Type steps down by role: title `clamp(56px, 18vw, 180px)` (72 at 390) pulled left 0.06 em; Heading/40 to 28
  (line 1.15); eyebrow to 16; Heading/24 to 20 in the hero tagline. Body stays 16.
- Rhythm keeps the tablet relationships: section top 64, eyebrow to heading 40, heading to body 80, subhead
  or label to its body 20, paragraphs 40 apart in the hero, text to media 32 to 40, media to text 40,
  section bottom 88.
- Hero: top 104, details in one wrapping row (gaps 20 down, 32 across), mark, tagline 32 under it, text 40 under.
- Everything is one column, media full width (358 at 390).

## Differences on the framework page

| # | What | Haven at 390 | Framework at 390 |
|---|---|---|---|
| P1 | Side margin | 16 | 24 (the site's phone grid) |
| P2 | Title size | 72, ink on the margin | 51, box on the margin |
| P3 | Eyebrow | 16 | 20 |
| P4 | Heading/40 line height | 32.2 | 34 |
| P5 | Section top and bottom | 64 and 88 | 56 and 56 |
| P6 | Eyebrow to heading | 40 | 20 |
| P7 | Heading to body | 80 | 40 |
| P8 | Subhead or label to its body | 20 | 10 |
| P9 | Hero details | one wrapping row, 20 by 32 | three stacked rows, 24 apart, label 10 over value |
| P10 | Hero paragraphs | 40 apart, tagline 32 under the mark | 24 under the tagline, 40 apart |

Fix for each: take Haven's value.

> Correction, 24 Nov: row P1 is wrong. His phone grid is 4 columns, 24 margin, 24 gutter (docs/DECISIONS.md); Haven's 16 was the deviation, not the model. Haven moves to the grid (reports/haven-mobile-2026-11-23).
 The rest (body 16, media full width, one column, text to media 32) already matches.
