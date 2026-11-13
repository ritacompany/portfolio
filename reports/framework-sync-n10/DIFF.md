# N10: framework page against his current frame, 12 Nov

Source: WIP Mondai framework case study `4269:9433` in `IarvWaqjIwrZ2afQmMxKm6`, read 12 Nov. Each section was
compared at 1440 as a render (Figma beside the site) and by text and figure boxes. Node ids on the page are
unchanged (they still name the old copy's nodes) so motion and checks keep finding them.

| Section | Frame node | Result |
|---|---|---|
| Hero | `4664:16790` | height 656 to 647 (logo and tagline were N1) |
| Competitive analysis | `4508:10098` | first row 8 up, second row 30 up, section 871 to 905 |
| The foundation we built on | `4450:5467` | matches, no change |
| Growth Journey | `4809:27610` | matches, no change |
| Pathway | `4811:27970` | matches, no change |
| Action hub | `4599:8825` | matches, no change |
| Action item | `4889:14256` | matches, no change |
| Personalized timeline | `4453:5797` | left as is: his frame still has the longer Capacity copy and the Example box lower; the site has the shorter copy he approved today (N5, `00273ab`). For his call: update the frame or keep the site |
| Calendar setup | `4617:10604` | matches, no change |
| Schedule view | `4700:21901` | intro line wraps at 700, Rescheduling title and text 22 up, gaps image 22 up, section 2101 to 2079 |
| Buffer flow | `4726:11317` | matches; now placed before Falling behind, as in the frame |
| Falling behind | `4875:16329` | done in N3 (`8bacdaa`) |
| Start of week | `4800:*` | skipped, start-of-week owns the carousel |
| What's still open | `4854:19154` | body 900 wide and one block with no paragraph gap, section 905 to 831, section label "In reflection" to "What's still open" |

No copy was changed. The only copy difference found is the Personalized timeline one above.

Checks: `check-boxes.mjs` prints ORDER_OK and BOXES_OK (14 sections in frame order, heights within 1.5 px,
21 moved elements within 1.5 px). At 390: no sideways scroll; every image loads except three Start of week
slides that sit off screen in the carousel.
