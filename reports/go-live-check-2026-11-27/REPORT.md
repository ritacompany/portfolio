# Putting the approved work on main: what it would do, 27 Nov

His note on the review board: he would approve if he could be sure it overrides no work and nothing clashes. This
is the check, run on a test build before anything touches main.

## The test build

main, plus `claude/sharp-turing-jy21r2` (home, Haven, framework phone, end bar), plus
`claude/relaxed-ride-5mlbdu` (framework desktop and tablet, with today's #35, #36, #37, #38 and #24), plus
`claude/haven-flow-order` (the Figma rule in CLAUDE.md). Built in a scratch worktree; main was not touched.

## Clashes found and how each was settled

1. `site/css/framework.css`: the phone rules (#43, under 768) and the tablet headline rules (#36, 768 to 1159)
   were both added at the same spot. Different screen sizes, so both kept, one after the other.
2. `CLAUDE.md`: the file list gained a motion line on one side and a review preview line on the other. Both kept.
3. `site/dev/framework-mobile/` (a preview page) still named the Rescheduling picture by its old file name, which
   #37 renamed. Pointed at the new name. The same fix was needed in two other preview pages today, done in #37 and #36.

Nothing else conflicted. main's own changes since the stack last took it are all hero drawing files under
`prototypes/`; none touch the site.

## Checks on the test build

- site check OK (21 pages), image check IMAGES_OK (221 pictures), responsive health OK (20 page widths), hover
  still OK.
- Responsive fit and overlap report 20 and 15 items, all on the framework page (Start of week side cards and the
  test result numbers). sharp-turing shows the same 20 and 15 today, checked 27 Nov; only the side card positions at
  768 and 1024 differ, because #35 draws the cards larger. The side cards sit off screen by design (it is a
  carousel), and the numbers overlap is older than this work (PR #41's baseline). None is new.

## Does any page lose or change something it should not?

Every section of every page was screenshotted in the test build and in the branch that holds its newest version,
then compared pixel by pixel (`compare.mjs`, results in `compare.txt` and `compare-framework-vs-sharp.txt`,
differing pairs in `diffs/`).

- Home at 390, 768 and 1440 against sharp-turing: same, apart from two sections at 768 with 0.01 and 0.03 percent
  of pixels (text smoothing).
- Haven at 390, 768 and 1440: same, apart from the footer at 0.01 percent (the ticking clock).
- Collection page at 390 and 1440: same.
- Framework at 1440 against sharp-turing: every section the same except Start of week, which has the shorter
  descriptions (#38). That is the approved change and nothing else.
- Framework at 768 against sharp-turing: sections differ where the tablet changes apply: headlines at three lines
  (#36), balanced lines in running text (#37), the Start of week carousel at desktop size (#35). Checked by eye on
  The test and the end bar.
- Framework at 768 and 1440 against relaxed-ride: small differences in every section, from the home side changes
  already approved on sharp-turing (dividers in Neutral/700, link colours, the re-exported timeline picture, the
  end bar).
- Framework at 390 against sharp-turing: same.

## What is left out on purpose

`branches-not-included.txt` lists every branch with work not in the build. The recent ones are his on purpose:
the Mondai collection page and its transition (he is working on updated versions: `mondai-collection-v2`,
`page-transition-research`, `mondai-collection`, `card-to-collection-transition`) and the design system case study
research (`design-system-cs-*`, not site pages). The rest are older snapshots and finished experiments from before
20 Nov. Putting this on main deletes no branch; every one stays where it is.
