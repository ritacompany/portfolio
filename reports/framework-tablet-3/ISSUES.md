# Framework page against Haven at tablet, round 3 (20 Nov)

Measured with `node reports/framework-tablet-3/compare.mjs <width>`, which uses the same method on both
pages: rendered text boxes, every block in reading order, gap to the block above in the same column.
Widths 768, 1024 and 1180, reduced motion.

## What already matches Haven (round 2, 18 Nov)

| Relationship | Haven | Framework |
|---|---|---|
| Side margin | 32 | 32 |
| Section top to eyebrow | 64 | 64 |
| Eyebrow to heading | 40 | 40 |
| Heading to body | 80 | 80 |
| Text to media, media to text | 40 | 40 |
| Last content to section end | 120 | 120 |
| Title size | 113 at 768, 151 at 1024 | the same |
| Heading/40 | 32 | 32 |
| Media width | full measure (704 at 768, 960 at 1024) | the same, smaller figures held at their Figma width |
| Motion | same entrance code (mondai-motion.js is Haven's), no width rules on either page | the same |

## What still differs

| # | Difference | Haven | Framework | Fix |
|---|---|---|---|---|
| H1 | Where tablet ends | desktop from 1160 | tablet until 1199, so from 1160 to 1199 the pages disagree (Heading/40 is 40 on Haven, 32 here at 1180) | end the framework tablet block at 1159.98 and let the desktop scaling cover 1160 to 1199, if the desktop layout holds there |
| H2 | Body text measure | 520 | 480 | 520 |
| H3 | Hero right column | starts at 45 percent of the width (348 at 768, 445 at 1024) | starts at 52 percent (400 at 768, 528 at 1024) | match Haven's split |
| H4 | Hero tagline width | 268 at 768, 365 at 1024 | 336 at 768, 464 at 1024 | follows from H3 |
| H5 | Title optical edge | pulled left 0.06 em so the letter's ink sits on the margin | box on the margin, so the ink sits a few px in | pull left 0.06 em |
| H6 | Body line height | 22.4 (16 at 1.4) | 22 | site token; leave unless he wants it changed everywhere |

Not tablet: Haven has a 1 px rule under each section at every width; the framework page has none. That is
a desktop design choice, so it stays out of this round.

## Fixed, 20 Nov (his yes)

| # | Fix | Checked |
|---|---|---|
| H1 | Every framework.css query at 1200 moves to 1160; between 1160 and 1199 the page takes the desktop type and grid back from tokens.css | at 1180 the page is in its scaled desktop composition, hero text at 512 and 388 wide, the same as Haven |
| H2 | Body measure 520 | widest body block 520 at 768, 1024, 1150 |
| H3, H4 | Hero: tagline two fifths, text three fifths, 48 apart | within 6 px of Haven at 768, 2 px at 1024 and 1150 |
| H5 | Title pulled left 0.06 em | title edge 25 at 768, Haven 25 |
| H6 | Left as is: a site token | not changed |

The nav and footer still switch at 1200 on both pages (components.css); that is shared and the same on Haven.
