# Framework page on a phone: audit (23 Nov)

Measured at 320, 360, 375, 390 and 430 on touch emulation (isMobile, hasTouch, 2x), motion on and off, with
`audit.mjs` (hidden items, small type, edge overflow, sharpness, hover rules), `compare.mjs` (Haven against the
page, block by block), `haven-trimmed.mjs` (Haven with its text trimmed the way the framework sets it, so gaps
compare like for like) and the repo's `scripts/verify-responsive.mjs`. Raw output: `audit-before.txt`,
`base-*.txt`, `check-live-before.txt`.

Figma: the repo records no phone frames for this page (framework.css: "this page's body has no phone design
yet"; reports/mobile-breakpoint G2 and G3 still open). The Figma read on 23 Nov was refused at the seat's tool
limit, so neither file could be re-checked today. Haven's phone rules are the reference, as the 20 Nov P list set.

## What already works (no change)

- No sideways scroll at any width (scrollWidth equals the window at all five).
- Nothing stays hidden. After a touch scroll through the page with motion on, every text block and image is at
  full opacity at all five widths. The page has no `display: contents` boxes, so the Home page's
  IntersectionObserver bug does not apply here. The only hidden element is the Capacity demo's cursor between loops,
  which is the demo working.
- No text under 12 px; all body copy is 16 px. The Example box text is Label/14 by design.
- The start of week carousel works by touch: a swipe moves one template, a dot tap jumps to it (G10).
- The repo's size and health checks pass at the five widths.

## Defects and P list items (fixed in the proposal)

| # | What | Live at 390 | Proposal | Gate |
|---|---|---|---|---|
| P1 | Side margin, page and nav | 24 | 16, as Haven | G1 |
| P2 | Title | 51.3 px, 0.143 of the content width, box on the margin (ink at 28) | 61.6 px, 0.172: one line as large as it fits, ink on the 16 margin | G2 |
| P3 | Eyebrow | 20 on 26 | 16 on 21.12 | G3 |
| P4 | Heading/40 line | 28 on 34 | 28 on 32.2 | G3 |
| P5 | Section top and bottom | 56 and 56 | 64 and 88 | G4 |
| new | Personalized timeline and Falling behind opened 24 lower than every other section | 80 to the eyebrow | 64 | G4 |
| P6 | Eyebrow to heading | 20 | 40 | G5 |
| P7 | Heading to what follows | 40 (36 to a label) | 80 | G5 |
| P8 | Subhead or label to its body | 10 | 20; Label/14 C to its subhead 16; the Rollover effect row 20 to its words | G5 |
| P9 | Hero details | three stacked rows, label 10 over value, title 40 over them | Role and Affiliate in one row 32 apart, Focus 32 under them (beside them from 500), label 16 over value, title 48 over them | G6 |
| P10 | Hero text under the tagline | 24 | 40 | G7 |
| H1 | Carousel dots light up under hover and stay lit after a tap (his no hover rule) | neutral 600 to 525 | resting color under a finger, neutral 400 while pressed | G8 |
| H2 | Blue tap flash on carousel cards, dots, nav and footer links | rgba(51, 181, 229, 0.4) | none; each has its own pressed feedback or moves | G9 |

## Open, outside this proposal

- Capacity card picture is soft on a phone: the file is 616 wide, shown 342 at 390 and 382 at 430 (1.80x and
  1.61x, under the 2x the rest of the page has). Needs a wider export of 5812:17089 from his Figma (refused today),
  or the card capped at 308 wide on a phone. Not changed: the capacity session owns that card.
- Nav and footer link hover rules live in components.css (`.link-nav:hover`, `.link-footer:hover`), shared with
  every page. Under his no hover rule they want a `(hover: hover)` wrapper there; not changed here, since the brief
  keeps components.css to its owner. The tap flash on those links is removed on this page (H2).

## Exemptions (measured, not defects)

- verify-responsive fit: carousel cards 2 to 5 sit past the screen at every width. The stage clips them on
  purpose (overflow hidden, center mode); a sliver of the next card is the swipe cue. Same as at tablet and desktop.
- verify-responsive overlap: "Capacity" over "6 of 8", "Target and pace" over "7 of 8" and "Rollover" over "6 of 8"
  at every width. The check compares em boxes, and the 104 px number's em box rises above its trimmed line. The ink
  is 28 or more apart at all five widths (G13).

## Design choice for his call

- The title. A (built, recommended): one line, as large as it fits, ink on the margin. B: Haven's own size,
  18vw (70 at 390), which breaks "Framework CS" onto two lines. C: today's size, the box on the margin.
  A keeps Haven's rule (ink on the margin, as big as the room allows) without breaking the name; B matches Haven's
  number but stacks a two word title into a block Haven's shorter "Haven CS" never makes.

## His walkthrough (23 Nov)

- On the canvas he called the boards he had open good, in his words "these all transition really nicely over
  though honestly so I'd say that these are all good that I'm seeing here". Those were Read me, Title, Hero,
  the two width boards, Competitive analysis, Personalized timeline and Start of week. Falling behind and The test
  were off screen. This is his read of the look, not yet the yes that moves phone.css onto the live page, and the
  title option is still open.
- Dividers: he has started another session that will change the divider colors site wide. This proposal changes
  no color. The only divider rule it touches is the hero rule's stretch inside the new grid (layout only), so the
  two pieces of work do not collide. Whoever lands second rechecks the hero rule on a phone.
