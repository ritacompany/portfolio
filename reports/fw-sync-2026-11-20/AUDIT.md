# Framework page version audit, 20 Nov

Source of truth: frame **mondai framework cS most current** `6331:20607` in Desktop 1 (MVP) `5RO0m4bYYrTvbiaOgaU3tI`,
page CS, read 20 Nov after his live edits. Compared with the built page `site/mondai/framework/index.html` at 1440,
by text (every case study text layer outside product screens), colour, position and a render of each changed section.

## Where the build came from

The page is not built from one Figma version. Its layers, in order:

1. **Transported Framework CS** `5812:16446` (9 Nov): `scripts/framework-page/build.py` generated the page from it. Every
   `data-figma-node` id on the page still names this frame, so motion and checks keep finding their elements.
2. **WIP Mondai framework case study** `4269:9433` in the Portfolio Design file (12 Nov, N10 sync): section heights,
   Competitive analysis rows, Schedule view and the ending were moved to it.
3. **Hand edits since then**, each with his yes: the Capacity cut (N5, 12 Nov), the Start of week carousel (13 Nov),
   the Capacity card demo (16 Nov), the footer Resume (17 Nov), tablet rounds 2 and 3 (18 to 20 Nov), the example
   results ending (20 Nov).
4. **Copy** follows `reference/cs2/review-2026-11-07/final-copy.md` plus his later edits, which are also in his frame.

The frames on page CS, oldest to newest: Mondai Framework CS Master OLD `5763:2448` (pre review copy, Suzie, cognitive
load); mondai fraework CS Master NEW `6228:102151` (approved copy, old 24 px navbar, title at 136, and a Capacity body
he cut mid sentence while testing length); BACKUP 20 Nov `6297:25872` (a copy of NEW); most current `6331:20607`
(his 20 Nov edits: 52 px navbar, title at 164, the wider Capacity layout with the approved cut, the Other pages footer).
The mix he noticed was the page carrying NEW's or WIP's layout in some sections and his newest in others.

## Section by section

| Section | Build before this pass | Frame 6331:20607 | Came from | Now |
| - | - | - | - | - |
| Nav | logo top 24, Base 24 navbar | 52 tall navbar from the page top, logo 19, links centred on it | NEW / OLD (Base, 24 tall) | synced: logo 19 on this page only |
| Hero | title cap top 136; both paragraphs Neutral/050; Affiliate x 312, Focus x 507 | title 164; second paragraph Neutral/525 (#90909d); Affiliate 314, Focus 510 | NEW | synced (items 2 and 9) |
| Competitive analysis | copy, positions and colours match | same | WIP via N10 | no change |
| The foundation we built on | match | same | Transported | no change |
| Growth Journey | match | same | Transported | no change |
| Pathway | match | same | Transported | no change |
| Action Hub | match | same | Transported | no change |
| Action Item | match | same | Transported | no change |
| Personalized timeline | section 1133 tall; eyebrow 101, heading 155 at 660 wide; Capacity 255 wide at x 505; Effort at x 787; image 408; Example box at y 877, 563 by 115 | section 834; eyebrow 64, heading 118 at 724; Capacity 541 wide at x 508; Effort at x 1092; image 371; Example box at 508, 565, 489 by 95 | Transported layout with the N5 copy | synced (item 3). Copy identical in both |
| Calendar setup | match, including "Calendar sync is optional..." | same | Transported | no change (item 6: no difference) |
| Schedule view | intro capped at 700 and wrapping at 1440; everything under it 22 lower; section 2079 | intro one line (753 box); notes 1196, Rescheduling 1444 and 1490, gaps image 1384; section 2057 | WIP via N10, the intro width from Transported | synced (items 10 and 11). Copy identical |
| Buffer flow | match | same | WIP via N10 | no change |
| Falling behind, right rail block | eyebrow Falling behind | eyebrow Falling behind (also in NEW and OLD) | all frames | eyebrow now Target and pace (item 7, below) |
| Falling behind, Rollover block | Rollover effect icon 5.5 px above the words' middle; card at tablet cut flat on its right | icon frame and words centred on one 26 px row, words cap top 1616; icon #d2d2db | NEW | synced; tablet and phone card drawn whole (item 12) |
| Start of week | copy and layout match; the page uses the dots carousel he picked 13 Nov | five template frames with a "Scroll to view more templates" line | Transported plus the 13 Nov carousel | no change (item 5: copy identical; the scroll line is the old carousel idea his 13 Nov pick replaced) |
| Ending, The test | copy matches | same, 14 Nov example results | built 20 Nov from the preview | no change |
| Ending strip | match | same | Transported | no change |
| Footer | Base footer: Contact in the list, Resume shown, CONTACT label Bold | Other pages variant `6331:20545`: Testimonials in the list, Resume hidden, CONTACT Medium | Home footer, 18 Nov | synced (item 8). **Not final**: he is still finishing it |

Copy differences found: none in the case study text. Every block on the page reads word for word as frame 6331:20607.
One difference between the frame and the annotations group `6284:26169` (Approved copy for Framework CS NEW): the
Rollover headline there is "...still open on Saturday night, everything after it moves a little later." His frame and
the page both say "...on a Saturday night, everything after it moves forward chronologically." The page follows his frame.

## His items, what the frame showed

- **Capacity (item 4).** His frame holds the approved cut, word for word the page's text. The version that stops mid
  sentence ("...learning the number from how dsfsfsfsfsfsfsfsf.") is in the older NEW frame `6228:102151` and its backup,
  not in the current one. Nothing to pick: frame and page agree. What changed in his frame is the layout: Capacity runs
  541 wide, so the cut sits on five lines.
- **Falling behind twice (item 7).** Both frames carry it twice. The Rollover block is the falling behind moment (its
  headline is the Saturday night open item, and Falling behind was the Rollover bridge's eyebrow from 3 Nov). The rail
  block introduces the Pathway target, pace and the gap, so its eyebrow is wrong. It now reads Target and pace: the
  record names that block by those words (HANDOFF 3 Nov, "target and pace already have their own section"). His frame
  still says Falling behind on both; one Figma edit for him.
- **Nav and gap (item 9).** Only this frame has the 52 px navbar (component `6331:20421`, Base 52) and the 164 title.
  Transported Haven CS `5812:21569` still has the old 24 px navbar and its title at 130, the same as the built Haven page.
  So the "wider gap" he remembered on another case study is not in any Haven frame; Haven and Home are unchanged.
  The navbar sits absolute over the page with no fill, nothing sticks to it and no script reads its height, so the
  taller bar moves only the logo and links (5 px up) and the content (28 px down, the same for every motion trigger).
- **Rescheduling (item 10).** At 1440 the frame and the page already had 32 between heading and body; under 1160 it was
  20 (tablet) and 10 (phone). Now 32 at every width.
- **Schedule view line (item 11).** It wrapped at 1440 because a 700 width carried over from the Transported frame. Now
  it has no measure cap: one line wherever it fits, a wrap only when its section runs out of room. `check.mjs oneline`
  sweeps 320 to 1600 and fails on a wrap that did not need to happen; it caught a planted cap and the old 700 width.
- **Rollover (item 12).** The icon colour was already #d2d2db. The words were untrimmed inside the flex row, so the
  icon sat 5.5 px high; the row now centres them as his frame does. The figure under 1160 showed the export's rounded
  left edge and a flat right edge, because the card behind it is a desktop only panel; the figure now draws the card.

## Footer record

Built from the Other pages variant on 20 Nov and marked not final in the page source. Testimonials is in the list but
hidden until its Home section ships, the rule Home already follows, so the framework footer shows Home, About and
Selected works. The live clock keeps its seconds (the frame's 10:24pm CST is a static placeholder). Session 2 owns its
words.
