# Chadwick's tablet review of Haven, 13 Nov

Every point from his voice note, one row each, in his order. A row is closed only by a passing check
(verify.mjs, media.mjs) or his yes. Gates: GATES.md round 2.

| # | Section | What he said | What he wants | Status |
|---|---|---|---|---|
| F0 | The browser pane | It kept auto adjusting while he reviewed | The pane stops changing size under him | Cause: this session set tablet sizes on the pane's tab. From now on width checks run headless or in a separate tab, never his |
| F1 | Designing an MVP | The tablet version (bars above the stage pills) does not communicate what the timeline does | Research how others show a timeline like this at narrow widths, then a version that reads as the timeline | Research running in session haven-timeline-research, writing timeline-research.md. Rebuild waits for his pick |
| F2 | Usability testing | "Six participants tested three key flows" moved above the cards | Keep it on the left as on desktop | Fixed, checked at 768, 834, 1024, 1180 |
| F3 | Usability testing | The three flow cards | They can shrink sideways to make room | Fixed: they narrow beside the text |
| F4 | Usability testing | The four insight cards look big, top and bottom padding unequal | One horizontal row filling the width | Fixed: one row margin to margin, text centred with 24 px all round, checked within 3 px |
| F5 | Primary identity quiz | The phone has no room to travel, it jumps and looks glitchy | Room for the phone's scroll motion | Fixed: 434 px under the stage as at 1440. The phone now holds for 6 scroll steps at 768 and 1024 (was 0), the same as 1440 |
| F6 | All case study pages | The interview insight pills animate in | Always visible, no entrance | Fixed on Haven at every width (pills left the text reveal). The framework and home pages have no pills |
| F7 | Confidante profile | The background image is outdated, at desktop too | The latest version from his Figma | Blocked: needs his export. The file on the page is 680 px wide shown at up to 2712 |
| F8 | Confidante profile | The "Religious parents" card fills the screen and is blurry | Sharp, not an enlarged picture | Size fixed: capped at its Figma width, 680. Still soft: the file is a 1x export (680 px) so it needs a 2x export |
| F9 | Scheduling and chat | Both mockups look blurry | Sharp | Blocked: 1x exports (1047 and 314 px wide). Need 2x exports |
| F10 | Security features | Right screen blurry and taller than the left | Sharp, same height | Height fixed (510 and 550 became one height). Sharpness needs 2x exports |
| F11 | Where things stand | Hover does not exist on a tablet | Cards open from the start, text visible, swipe stays | Fixed from 768 to 1199: all five open, captions visible, row swipes |
| F12 | Bar with the other case studies | It grows taller at tablet | Same height as desktop | Waiting on his call: the rule is in the shared stylesheet (all pages), and at 768 the three links do not fit one 44 px row |
| F13 | Tooling | He should be able to adjust and comment as we go | Live edits and comments | Answered: the shared edit panel tunes values on dev pages; nothing yet lets him comment on a live page. Proposed as its own session |
| F14 | Process | The audit passed a page with all of the above | Real checks so these do not come back | Fix record fixes/2026-11-13-haven-tablet-review-misses.md (not verified). New checks fail on the old page (55 problems, 32 soft images) |

Checked in git: none of F1 to F12 came from the 41b148b tablet commit, which changed only the stats row
gap and five section heights from 1160 to 1199. They were already on the page, and that audit passed
them. That miss is F14.

## Exports he needs to make (F7 to F10)

At 2x, PNG, from the Haven CS master (Portfolio Design file, VC page). Replace the files in
site/haven/assets/ with the same names, or drop them anywhere and say where.

| File on the page | What it is | Size now | Needs |
|---|---|---|---|
| profile-background-current.png | Confidante profile background (and the latest version of it, F7) | 680 x 677 | 3842 wide (shown 1921 at 1440) |
| profile-current.png | Religious parents card | 680 x 364 | 1360 wide |
| schedule-current.png | Scheduling, two phones | 1047 x 457 | 2094 wide |
| chat-still.png | Chat phone still | 314 x 649 | 628 wide |
| security-pin-current.png | Security PIN screen | 501 x 751 | 1002 wide |
| security-discreet-current.png | Keep Haven discreet screen | 464 x 751 | 928 wide |
| collage.png, mvp-timeline-current.png | Data collage, MVP chart | 1440 wide | 2880 wide |
