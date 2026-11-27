# Framework headlines: lines at tablet

Measured by `node reports/headline-lines-2026-11-21/table.mjs` on the real page with Satoshi loaded (21 Nov). Do not edit by hand.

Tablet headlines run at 32 px; the page margin is 32 px each side, so the headline box is the window less 64 unless a cap stops it. The ending title scales with the window (6.66vw, 52 to 80 px).

"Fits three from" is the narrowest box that keeps the headline to three lines at 32 px, and the window that gives that box. "Two lines past" is the widest box that still holds three: any cap above it lets the headline fall to two at wide tablets. "Cap" is the proposal: his 1440 frame width in em, so at 32 px it breaks where it breaks at 1440.

| Section | Lines now at 768 | 900 | 1024 | 1150 | Fits three from (box, window) | Two lines past (box) | Proposal cap at 32 | Proposal lines, 768 to 1159 |
|---|---|---|---|---|---|---|---|---|
| Competitive analysis | 2 | 2 | 2 | 2 | 433, 497 | 640 | 633 | 3 |
| The foundation we built on | 3 | 3 | 3 | 3 | 518, 582 | 762 | 608 | 3 |
| Growth Journey | 3 | 3 | 3 | 3 | 507, 571 | 762 | 642 | 3 |
| Pathway | 3 | 3 | 3 | 3 | 588, 652 | 865 | 674 | 3 |
| Action Hub | 2 | 2 | 2 | 2 | 472, 536 | 698 | 582 | 3 |
| Action Item | 3 | 3 | 3 | 3 | 551, 615 | 798 | 575 | 3 |
| Personalized timeline | 3 | 2 | 2 | 2 | 464, 528 | 713 | 579 | 3 |
| Calendar setup | 4 | 4 | 4 | 4 | 571, 635 | 853 | 710 | 3 |
| Schedule view | 3 | 3 | 3 | 3 | 661, 725 | 981 | 725 | 3 |
| Buffer flow | 2 | 2 | 2 | 2 | 463, 527 | 695 | 577 | 3 |
| Target and pace | 3 | 2 | 2 | 2 | 520, 584 | 751 | 742 | 3 |
| Falling behind | 2 | 2 | 2 | 2 | 472, 536 | 699 | 566 | 3 |
| Start of week | 3 | 2 | 2 | 2 | 493, 557 | 722 | 613 | 3 |
| Ending title (The test) | 3 | 3 | 3 | 4 | 10.96em of its size: 570 at 52, 877 at 80 | 15.89em: 827 at 52, 1272 at 80 | 13.45em (1291 at 96) | 3 |

Where three lines stop holding at 32 px: a 725 window (Schedule view), then 652 (Pathway) and 635 (Calendar setup). Tablet starts at 768, so inside 768 to 1159 every headline fits three at 32 with no change of size.
Why one shared cap cannot work: Competitive analysis drops to two lines past 640, but Schedule view needs at least 661 to fit in three. The caps have to be per headline.
