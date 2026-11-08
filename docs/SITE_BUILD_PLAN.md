# Site build plan: from the transported frames to a live site

8 Nov 2026. Status: Phase 0 built and passing its gates; waiting on his review of the component
sheet before Phase 1.

## Resume here

A new session picks this up from this file alone.

- Done: Phase 0. `site/css/tokens.css` rewritten from the local Portfolio and Haven variables and
  the type table below (names follow Figma: Neutral/550 is `--neutral-550`); `site/css/grid.css`
  (12 columns, 40 margin, 40 gutter); `site/css/components.css` with Navbar, Footer, Link, Badge,
  Context list, Button and Small button; exported icons and images in `site/assets/ui/`.
- Component sheet: `site/dev/components/` (`npm run dev`, then `/dev/components/`). Each Figma set
  sits beside its coded twin at 1x, variants at their Figma positions. `site/dev/` never ships
  (`scripts/build.mjs` leaves it out, like `motion-lab`).
- Gates: `.unlazy/site-build/GATES.md` (local, gitignored), 10 of 10 met. Rerun with
  `node scripts/verify-tokens.mjs` and `node scripts/verify-components.mjs grid|sizes|pixels|focus|health|haven`.
  All 27 variants match Figma size within 1 px; every panel is under 4 percent pixel difference
  (footer 3.2 and 3.7, button 3.3, navbar 2.3, the rest under 1.1; the pixel check registers within 1 px first).
- Found while building, listed on the sheet: the Link component's Block Default fill and every Nav
  and Footer hover and pressed fill are still bound to Mondai's remote `Color primitives`
  (Neutral/200 #c9cfc6, Neutral/150 #d9dfd1); the 8 Nov rebinding check covered `01 Portfolio` and
  `02 Haven` only. Code uses Portfolio Neutral/400 and Neutral/200; the Figma fills still need moving to the local
  Portfolio variables (asked him 8 Nov). He fixed the footer in Figma 8 Nov: Resume on column 10,
  LinkedIn on 7, bottom row gap 176; code and the reference renders follow. The copyright reads
  @2026 as drawn.
- Figma measures text without letter spacing after the last glyph; CSS adds it. Negative tracked
  text adds it back as end padding (comment at the top of `components.css`).
- `npm run check` now skips `site/motion-lab/` (its renders are gitignored, so a fresh clone could
  never pass); it still checks `site/dev/`.
- His call 8 Nov: Transported home is the launch homepage; the old hero plan is parked as context
  (tracker D8). Earlier homepage work counts only where it is basic motion.
- He looked at the sheet 8 Nov: "fine enough".
- Next action: Phase 1, Collection page first, built from these
  components. Haven keeps its own CSS until Phase 1 moves it.
- Figma reads: file `5RO0m4bYYrTvbiaOgaU3tI`, call `create_session` first; `get_metadata` on page
  `5658:1061` is 2 MB, so read single frames instead.

## Source of truth

Figma file `5RO0m4bYYrTvbiaOgaU3tI` (Desktop 1 MVP), page CS (`5658:1061`). Read live on 8 Nov.

| Frame | Node | Size | What it is |
|---|---|---|---|
| Transported home | `5812:22862` | 1440 by 3724 | Hero (CHDWCK wordmark), Selected works (Mondai, Haven), About with Current role, footer |
| Transported Multi-CS Model | `5812:22999` | 1440 by 900 | Mondai collection page: Framework CS, Design system CS, Operations CS locked |
| Transported Haven CS | `5812:21569` | 1440 by 19957 | Haven case study |
| Transported Framework CS | `5812:16446` | 1440 by 23917 | Framework case study, a copy of Mondai Framework CS Master `5763:2448` |

Components on the same page:

| Component | Node | Variants |
|---|---|---|
| Navbar | `5812:22709` | PD (home, with "Product Designer"), Base |
| Footer | `5812:22749` | Default, Other pages |
| Link | `5812:22559` | Block, Nav, Footer, each Default, Hover, Pressed |
| Badge | `5812:22599` | Type 1 White; Type 2 White, Black, Locked |
| Context list | `5812:22608` | Default with three line options, Hover, Pressed, Locked with three line options |
| Button | `5812:22672` | outline only. Interaction states still to design together |
| Small button | `5812:22855` | Default only. Interaction states still to design together |

Grid: 12 columns, stretch, margin 40, gutter 40. At 1440 that is a 1360 content width and 76.67 px
columns. The `--grid-*` variables in this file (24 gutter, 48 margin) are Mondai's grid and do not
apply to the portfolio.

The older Portfolio Design file (`IarvWaqjIwrZ2afQmMxKm6`) and its master `4226:8899` are superseded
for the build by these frames. `site/css/tokens.css` was read from that older master on 16 Oct and
is out of date (see Type below).

## Color audit, 8 Nov

Method: every fill and stroke in all four frames, read through the Plugin API. Layers inside a
product screenshot (a subtree whose text is all in a non Satoshi font, such as Heebo, IBM Plex Mono
or Inter) count as product UI and may carry product colors. Everything else is portfolio owned and
should use the portfolio palette. Hidden layers skipped.

### How the colors are wired

- The frames are bound to **remote** libraries carried over from the other account: `01 Portfolio`,
  `02 Haven`, `03 Mondai`, plus Mondai's own `Color`, `Color primitives`, `Colors` and `Primitives`.
- The local `Portfolio` collection he created in this file (34 variables) is **not used by any of
  the four frames**. Its values match `01 Portfolio` exactly, so nothing renders wrong today, but
  editing the local collection will not change the frames.
- Same for type: the frames use remote text styles. The 12 local text styles exist twice each
  (24 styles), and neither copy is applied in these frames. Values match the remote styles.
- For code this does not matter: tokens are written from values, named after the portfolio names.

### Portfolio owned layers using something other than the portfolio palette

| Frame | Layers | Uses | Verdict |
|---|---|---|---|
| Haven | Source pills in The data (`5812:21603`, `21604`, `21605`) and in Ending base (`5812:22554`, `22555`, `22556`) | Mondai `Color primitives: Neutral/200` #c9cfc6 (green tinted gray) | **Wrong library.** This is the name collision: Mondai Neutral/200 sits next to Portfolio Neutral/400 #c9c9d4. Code uses Portfolio Neutral/400 |
| Framework | Foundation diagram lines, Line 218 (`5812:16528`, `16543`, `16558`, `16573`) | raw #767c74, which is Mondai neutral 400 | **Wrong palette.** Code uses Portfolio Neutral/550 #7b7b86, the nearest portfolio gray |
| Framework | Falling behind divider, Line 221 (`5812:20343`) | Mondai `Color primitives: Neutral/700` #181a18 | **Wrong library.** Code uses Portfolio Neutral/700 #1d1d21 |
| Framework | Falling behind labels: Pathway target, Pathway pace, Ahead of target, Rollover (`5812:20296`, `20299`, `20302`, `20314`) | `03 Mondai: Green/400` #39f145 | **Keep.** These labels key the diagram to the green in the Mondai screens beside them |
| Collection | Mondai mark (`5812:23005`) | Mondai `Primitives/Neutral/100` | **Keep.** It is Mondai's logo |
| Collection | Lock icon in the Operations row (`I5812:23016;5812:22646`, `22647`) | raw #ffe3e3 and #912222 | **Check.** Renders gray in the frame, so likely masked; code draws the lock in Portfolio colors |
| Home | Hero frame and the Mondai card backing (`5812:22863`, `5812:22903`) | raw #040405 | Fine. Same value as Portfolio Neutral/900, just unbound |
| Home | Haven card empty container (`5812:22910`) | raw #0f0f1b | Fine. Image backing |
| Haven | Phase strokes, card fills and phones | raw purples and blues (#482cff, #aa21f4, #b75eda, #c25bfa, #1414f7, #28167a, #ac54db, #5cc43c) | Fine. Haven brand colors, unbound; the coded Haven page already carries them |

Inside the Framework CS screenshots, Mondai colors and fonts are correct and stay as they are.
Screenshots ship as image exports, never rebuilt in HTML (motion rules: real product UI only).

## Type, 8 Nov

Text styles in use (values in Figma's units: line height and tracking as a percent of size):

| Style | Font | Size | Line height | Tracking |
|---|---|---|---|---|
| Display/212 | Satoshi Regular | 212 | 83% | -5.5% |
| Display/96 | Satoshi Medium | 96 | 98% | -4% |
| Heading/64 | Satoshi Medium | 64 | 109% | -4% |
| Heading/40 | Satoshi Medium | 40 | 115% | -4% |
| Heading/24 | Satoshi Medium | 24 | 116% | -4% |
| Heading/20 | Satoshi Medium | 20 | 132% | -2% |
| Body/16 | Satoshi Regular | 16 | 140% | -1% |
| Body/16 M | Satoshi Medium | 16 | 132% | -1% |
| Label/14 | Satoshi Regular | 14 | 140% | 2% |
| Label/14 C | Satoshi Regular | 14 | 100% | 6% |
| Label/12 | Satoshi Regular | 12 | 140% | 4% |
| Label/12 C | Satoshi Regular | 12 | 140% | 10% |

`tokens.css` disagrees with these in several places (Display/212 is weight 500 there, Body/16 is
500, Heading/40 tracks -2px instead of -4%). It gets rewritten from this table.

Unstyled text to settle in code:

- **Home, Selected works:** the card labels are scaled, not styled: 19.64, 14.89, 11.79, 13.75 and
  23.57 px. Code snaps them to Heading/20, Label/14 C, Label/12 C, Label/14 and Heading/24.
- **Home, CHDWCK:** 388 px Satoshi Medium with per letter tracking (-9%, -12% on the H). Built as an
  SVG or fitted text so it spans the viewport, not as a fixed 388 px.
- **Haven insight cards:** Bold 20 and Regular 14 at 1% tracking, outside the styles. Already in the
  coded Haven page; kept as built.
- **Ending base (both case studies):** Bold 14 at 6% and Bold 16. Satoshi Bold is one of the three
  shipped weights, so it builds as is.

## Gaps found

1. **No mobile frames.** The guardrail says mobile is recomposed, not collapsed. Plan: I propose
   390 wide compositions per page in the browser for his review, then he decides whether any need a
   Figma frame.
2. **Framework CS copy is not final.** The hero body is placeholder text in the frame, and the
   tactics pass has eight proposals waiting on his marks. The page is built from structure now and
   the copy is synced from Figma last.
3. **The home in these frames differs from the old tracker plan.** Settled 8 Nov (D8): the
   transported home launches and the old hero rows are parked.
4. **Button and Small button have one state each.** Hover, pressed and focus get designed together
   in Phase 2; Phase 1 ships the default state plus a visible focus ring.

## The order

Code first, motion second, hosting last, as he proposed. The reason to keep motion out of Phase 1:
every animation is tuned against final layout and sizes, so animating a page that is still moving
means tuning twice.

| Phase | What | Done when |
|---|---|---|
| 0 Foundation | Rewrite `tokens.css` from the Portfolio values and the type table; 12 column grid utility (40 margin, 40 gutter); shared components in HTML and CSS: Navbar (PD, Base), Footer (Default, Other pages), Link (3 styles by 3 states), Badge, Context list, Button, Small button | A component sheet page in `site/` matches each Figma variant side by side at 1440 |
| 1 Pages, static | Collection page first (smallest, uses most components), then Home, then Framework CS (screenshots as 2x image exports), then Haven moved onto the shared nav, footer and tokens without changing its spacing or motion | Each page matches its frame at 1440, `npm run check` passes, no Figma asset URL in the code |
| 2 Interactions and motion | Button and Small button states designed together; link and card hovers; carry over what exists (Haven motion, Falling behind, the footer transition); new motion only after his pick | Each piece passes the motion review loop in `.claude/motion-rules.md` |
| 3 Responsive | 390 wide recompositions per page, then 768 and 1200 | No horizontal scroll at 390, 768, 1200 and 1440; he approves the 390 versions |
| 4 Launch | Point `npm run build` at `site/`, remove the noindex header, robots allow, domain on Vercel (steps in `docs/SITE_SETUP.md`) | chadwickfenner.com serves the site, indexing on |

Hosting needs no new setup: Vercel already deploys this repo from `dist/` and serves the holding
page in `public/` until Phase 4 flips it.

## Figma rebinding, 8 Nov

His ask: the frames should use this file's own variables and text styles, not the other account's.

- Done from the cloud session: every non text layer in the four frames and the seven component
  sets now uses the local `Portfolio` collection (604 paints). A new local `Haven` collection holds
  the six Haven colors the frames use (Mantis/Bright, Mantis/500, Violet/200, Violet/300,
  Nimbus/300, Goldfish/500). Re-read after the change: 0 non text layers left on `01 Portfolio` or
  `02 Haven`. The six Haven source pills now use Portfolio Neutral/400, the five Framework diagram
  lines Portfolio Neutral/550 and Neutral/700, and the two unbound #040405 fills Neutral/900.
- Text, done 8 Nov: he ran `scripts/figma/rebind-text-to-local.js` in his own Figma tab through the
  community plugin Scripter (the cloud connection has no Satoshi), then a Framework only rerun.
  Re-read after: 0 text fills or portfolio text styles left on the other account's libraries.
  Mondai's own styles and colors inside the screenshots stay on Mondai's library, as intended.
- Not done, on purpose: one copy of each duplicated local text style can be deleted once the text
  pass has run and nothing on another page uses it. That check needs the whole file.
