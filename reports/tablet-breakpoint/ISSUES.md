# Framework page, tablet (768 to 1199): issues

Audited 12 Nov at 768, 834, 1024 and 1180, reduced motion on and off. Tracker: reports/nov12-audit/GATES.md N8.

What it was compared against: Figma has no tablet frame for this page. His current frame is WIP Mondai
framework case study, 4269:9433 in IarvWaqjIwrZ2afQmMxKm6 (the page was first built from an older copy,
5812:16446 in 5RO0m4bY). This audit used the older copy's local export (site/dev/pages/figma/framework.png)
because both Figma connectors hit the seat's usage limit; T2 to T7 get rechecked against 4269:9433 once an
export of it is available. So the reference is that frame's composition plus the
tablet grid set in Phase 3 (8 columns, 32 margin, 24 gutter). The Figma connector hit its usage limit
mid audit, so the 1440 comparison used the local export, not a fresh read.

Measurements come from `node reports/tablet-breakpoint/measure.mjs <widths> [motion]`. Full page shots are
regenerated with `node reports/tablet-breakpoint/shoot.mjs <dir> <widths>` (not committed, 5 to 10 MB each);
the crops below are committed.

## The list

| # | Issue | Measured | Owner of the fix |
|---|---|---|---|
| T1 | The Mondai mark touches the S of the title and stops short of the right margin. Figma puts it on the margin with clear space. | Gap between S and mark: 0 px at 768, 834, 1024 and 1180. Mark ends at 707 at 768 (margin is 736). Crop: shots/t1-title-mark-768.png | Resolved by figma-sync 47149a4 (N1): the mark left the title row for a 40 px logo above the tagline. Re-measured: no mark on the title row at any tablet width |
| T2 | Role, Affiliate and Focus stack into three rows. Figma sets them as one row, and the row fits at every tablet width. | Label tops 240, 294, 348 at 768 (54 px apart, should share one top) | Me |
| T3 | Competitive analysis drops Figma's two by two grid and runs the four references as one long column. Two columns of 340 px fit at 768. | Four groups stacked; section 903 px tall at every width. Crop: shots/t3-competitive-1180.png | Me |
| T4 | The Example box is broken: the label half shrinks to its word while the text half is full width, so the box has a notch. | Label half 105 px wide, text half 640 px at every width. Crop: shots/t4-example-768.png | Me, after cs2-capacity lands (same section, N5) |
| T5 | Body text lines are too long to read comfortably. | 92 characters a line at every tablet width (readable range 45 to 75) | Me |
| T6 | Small figures are blown up to twice their Figma size, so the type inside them reads larger than the page's own headings: the capacity dial, the right rail card and the rescheduling screen. | Capacity dial 616 px wide (308 in Figma), right rail card 704 to 932 (466), rescheduling 704 to 1094 (547). Crop: shots/t6-right-rail-1180.png | Me (capacity dial after cs2-capacity lands) |
| T7 | Big figures grow past their Figma size from about 900 wide, so the Action Item laptop runs one and a half screens tall. | Action Item laptop 1116 by 1494 at 1180 (892 by 1194 in Figma); Foundation diagram 1116 at 1180 (896) | Me |

Checked and fine: no sideways scroll at any tablet width; nothing stays hidden with motion on after
scrolling through (no element under half opacity); the Foundation diagram labels stay readable at 768
(about 11 px); no console errors.

Seen but owned elsewhere, not on this list: the Start of week carousel shows a slice of the next template at
the right edge (start-of-week owns it); footer portraits (figma-sync, N4).

## Fixes, 13 Nov

Rechecked against the page at 1440 after e811763 (N10), which synced every section to his current frame
4269:9433: the hero still has Role, Affiliate and Focus as one row and Competitive analysis is still two by
two, so T2 and T3 stand. All fixes sit in two `@media (min-width: 768px) and (max-width: 1199.98px)` blocks at
the end of site/css/framework.css. A first draft of the T4 to T7 block was picked up by e811763; the final
version is in this session's commit.

| # | Fix | Checked |
|---|---|---|
| T1 | Resolved by 47149a4 (the mark left the title row) | no mark on the title row |
| T2 | Hero is a three column grid for the details row; the divider still runs edge to edge | three labels share one top at 768, 834, 1024, 1180 |
| T3 | Competitive analysis is a two column grid, 48 px apart; each name sits 16 px under its label as in the frame (it was 36) | rows and columns aligned at all four widths |
| T4 | Example label and text stretch to one width | both halves the same width |
| T5 | Body text capped at 480 px | longest average line under 75 characters (it was 92) |
| T6, T7 | No figure wider than its Figma width | every figure at or under its width attribute |

`node reports/tablet-breakpoint/verify.mjs`: TABLET_OK 8 of 8 (four widths, reduced motion on and off).
At 390, 1200 and 1440 the page's 172 element boxes are identical with the tablet block on and off.

Not from this work, passed to the conductor: verify-responsive overlap fails at 1024, 1200 and 1366 on the
What's still open paragraphs (`paras-tight` from e811763 sets their gap to 0, so the trimmed boxes touch;
it fails the same way with the tablet block removed). verify-1440 fails boxes home, boxes framework and
Haven body: the framework box check still compares against the older Figma copy that N3 and N10 moved away
from, and the home and Haven failures are on other pages.
