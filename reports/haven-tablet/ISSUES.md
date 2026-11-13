# Haven page, tablet (768 to 1199): issues

Audited 13 Nov at 768, 834, 1024 and 1180 (plus 800, 1160 and 1199 where an issue sat on an edge), reduced
motion on and off, against the page at 1440 and the tablet grid (8 columns, 32 px margin, 24 px gutter).
Every section was compared side by side at 768, 1024, 1180 and 1440 in full page shots, and the stats
fix was looked at in the built-in browser at 768.

Note on the ranges: Haven's own rules switch at 1160, not 1200. From 768 to 1159 it runs its tablet
layout; from 1160 to 1199 it runs the 1440 layout scaled down. So 1180 shows the desktop composition.

Measurements: `node reports/haven-tablet/measure.mjs <widths> [motion]` scans every text block (outside
the margins, line length, size, overlap, hidden) and the empty space under each section's last content.
Full page shots: `node reports/haven-tablet/shoot.mjs <dir> <widths>` with the site on port 4318 (not
committed, 3 to 5 MB each). The crops below are committed.

## The list

| # | Issue | Measured | Crop |
|---|---|---|---|
| H1 | Demographic access: the 3 + 3 row is wider than the page at 768, so "Subject matter experts" runs into the left edge | Row needs 738 px, margins leave 704. Label starts at 15 px (margin 32). Clears from 800 up | shots/h1-stats-768-before.png |
| H2 | From 1160 to 1199 five sections keep their 1440 pixel heights while their content shrinks, so extra black piles up under them | Empty space under the last content at 1180: MVP 218, Wireframes 189, Confidante program 248, Scheduling 202, Security 301. At 1440 every one is 165 (the 164 px bottom padding) | shots/h2-security-1180-before.png |

Checked and fine at all four widths, motion on and off: no sideways scroll; no body line over 80
characters; no text under 11 px; no text left hidden after scrolling through; the MVP chart turning into
two phase lists below 1160, the 2x2 insight cards, the five step flow, the chat pair and the ending cards
all hold their 1440 composition or the page's existing small screen version. The measure script also
flags the "Haven CS" title, the Security and ending headings and the ending's closing line, but those
flag identically at 1440: glyph overhang and full width blocks, not faults.

Left alone on purpose: the quiz also has extra space under it from 1160 to 1199 (638 px at 1180, 434 at
1440), but that space is its motion hold, and the Haven review says not to read it as padding.

## Fixes, 13 Nov

One block at the end of `site/haven/current.css`, `@media (min-width: 768px) and (max-width: 1199.98px)`.

| # | Fix | Checked |
|---|---|---|
| H1 | Below 834 the stats row's gaps drop to the 24 px tablet gutter (row 690 px) | Row and both labels inside the 32 px margins at 768, 800 and 834 |
| H2 | From 1160 those five sections lose the fixed 1440 height, so their 164 px bottom padding sets the end, as at 1440 | 165 px under each at 1160, 1180 and 1199 |

- `node reports/haven-tablet/verify.mjs`: HAVEN_TABLET_OK 8 of 8. With the block stripped it fails with 14
  problems (the positive control).
- `node reports/haven-tablet/swap.mjs`: 474 element boxes identical at 390, 1200 and 1440 with the block
  on and off; 10 differ at 768 and 304 at 1180 (the control). HAVEN_SWAP_OK 3 widths.
- `verify-haven.mjs motion` OK before and after. `verify-responsive.mjs` fit, size and health OK for Haven.

## The 1440 failure (Haven body)

Not caused by the page and not fixed here. `scripts/verify-haven.mjs body` compares the 1440 page with a
fixed reference, commit 87d58cd (9 Nov, before Haven moved onto the shared nav). Fifteen commits since
then changed Haven on purpose. Diffing the two renders, every band that differs is one of them: the
HAVEN wordmark above the tagline (47149a4), the second hero paragraph and card colours from his 11 Nov
file (8ddaa0f), the quiz labels and insight cards back on their text styles (8ddaa0f, 7744eac), the
insight pills (3bfe2c9) and the chat pair (73d7176). Checked by eye on side by side crops of each band. The check reports 89,529 changed pixels both before and after this work, so the
tablet block adds none.

`verify-haven.mjs files` fails the same way: its list of files allowed to change predates pill-tips.css,
pill-tips.js, chat-rotate.js and the wordmark.

Owner: whoever keeps `scripts/verify-haven.mjs` (shared scripts, not Haven's stylesheets). The fix is to
move its reference to a commit he has approved at 1440 and widen the file list; that choice of reference
is his, so it is reported rather than done.

Also seen, outside this range: from 1200 to 1439 the same fixed heights as H2 leave extra space under
those sections. The task kept 1200 and up unchanged, so it is noted, not fixed.
