# Start of week descriptions: proposal, 21 Nov (waiting on his yes)

Measured with scripts/check-sow-desc-lines.mjs on the built page (Satoshi loaded), lines at each width.
Figma desktop frame 6331:20607: Catching up sits in a 461px box there (the others 529px), so it shows four lines.

| Template | Now (lines 1440 / 1200 / 768 / 390) | Proposed | Proposed lines 1440 / 768 / 390, Figma 461 box |
| --- | --- | --- | --- |
| Clean slate | 2 / 2 / 3 / 3 | unchanged | 2 / 3 / 3, 2 |
| Catching up | 3 / 3 / 5 / 5, Figma desktop 4 | A user who is behind sees how many days they made up last week and how finishing early closes the rest. | 2 / 3 / 3, 2 |
| Rollover | 3 / 3 / 5 / 5 | Unfinished Action Items wait in the new week under a magenta tag, next to the new pace, so the plan never changes unseen. | 2 / 3 / 3, 2 |
| Recalibration | 3 / 3 / 5 / 4 | When a user keeps giving far fewer hours than they set, this screen suggests a capacity that fits. They can take it or keep their plan. | 2 / 3 / 3, 3 |
| Reset | 3 / 3 / 5 / 5 | After a long absence, the week rebuilds from today and keeps their progress. It has one button, so keep my plan can’t win by default. | 2 / 3 / 3, 3 |

Fact trace (mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md, Start of Week states):
- Catching up: behind pace with positive movement; days made up is the pace movement line (Pace -4d to -2d). Finishing early is his original wording.
- Rollover: magenta accent; the pace tile carries the situation. Never changes unseen is his.
- Recalibration: 3 weeks in a row below roughly half declared capacity (paraphrased as far fewer hours than they set); Accept and Keep are equal weight (take it or keep their plan). The current text's skip it with a warning is not in the archive.
- Reset: re-bundles from today, progress intact, one action (Start from today). The default reasoning is his.

What each cut loses:
- Catching up: the explicit point that finishing every Action Item does not close the gap (now implied by closes the rest).
- Rollover: the separate mention of what carried over (the magenta tag shows it).
- Recalibration: the contrast with Rollover (one unfinished week) and his set their own or skip it with a warning.
- Reset: why it is not Catching up (the old plan is too far behind to catch up to).

Humanizer pass: draft, audit (fragment "One button, so..." rewritten as a full sentence; no AI vocabulary, no dashes, no Oxford commas, no new facts), final as above.
