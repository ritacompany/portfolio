# Site build plan: from the transported frames to a live site

9 Nov 2026. Status: Phase 0 approved ("fine enough", 8 Nov). Phase 1 built: Collection, Home, Framework
CS and Haven pass their gates. Phase 2 is parked on his tuning and picks (see Parked below). Phase 3
(responsive) built 9 Nov for Collection, Home and Framework CS, awaiting his review of the 390 versions.

## Resume here

### Handoff, 10 Nov (from session "Portfolio: hover highlight"; read this before the 9 Nov one)
**Where the work is.** Branch `claude/hover-text-smoothing`, draft PR 18 into `claude/relaxed-ride-5mlbdu`.
Until PR 18 is merged, `claude/relaxed-ride-5mlbdu` does NOT have any of the hover work below, so its
proposals.css and preview look older than what he has been reviewing. Read the hover branch.
Preview link https://claude.ai/artifact/WEWiXsm3fsWdV2gd7z5BST, version 17, is built from it.

**Item 1 of the 9 Nov list, the hover highlight: he said "these look good, we're fine on these now"
(10 Nov).** What he approved, all in `site/dev/preview/proposals.css`:
- Big footer links (About, Selected works, Contact) and the email: the close light block, dark text.
  The block is the text's own resting colour, Neutral/100 (block 14), and reaches 0.02em past the
  capitals and baseline so round letters are not shaved (block 11; Satoshi overshoots 0.013em,
  measured in the font files). Mac smoothing `auto` on dark on light text (block 9) and a 0.05 px
  outline in the text colour (block 10) so the dark text reads as heavy as the light text at rest.
- Small all-caps links (nav, LinkedIn, Back to top): no block. Nav and LinkedIn rest at Neutral/300;
  all three go to Neutral/050 on hover (block 15). Two versions on the preview: "Bolder" (a 0.36 px
  outline, Satoshi Medium's extra stem width at 14 px, block 13) and "Brighter only".
  **Open: which of the two he wants. He did not say. Ask him first.**
- Blocks 5, 6 and 12 are marked SUPERSEDED in the file; drop them when shipping.

**Why the labels on the preview may look odd.**
- The white "Hover tester" panel, bottom left, is preview only (`site/dev/preview/hover-compare.js`).
  It is never shipped. Its "Before" button shows the hover from before this work, not the current site.
- Proposal numbers in proposals.css (1 to 15) are a running log, not an order to ship in. Higher
  numbers override lower ones where they touch the same link.
- Older notes and commit messages mention keys (O, W, 1 to 5). Those keys are gone; the panel
  replaced them because keys only reach the page after a click inside it.
- Old comments say "light block" in Neutral/200. It is Neutral/100 now (block 14).

**Evidence behind it.** Measured his own screen recording frame by frame: no letter moves a pixel on
hover. What he saw was weight: macOS draws dark on light text thinner with `antialiased`, and dark on
light reads lighter to the eye anyway (irradiation). An earlier 0.15 px outline overshot (31 percent
more ink in the nav), which read as "lifting"; the default is now 0.05.

**Next.** Ask Bolder or Brighter only. Then item 2 of the 9 Nov list: move the approved blocks into
site/css (components.css for the link styles), delete them from proposals.css, drop hover-compare.js
from the preview if nothing else needs it, rerun `node scripts/build-preview.mjs site <dir>`,
`node scripts/verify-1440.mjs` and `node scripts/verify-responsive.mjs <mode> all`.
Note for shipping: verify-hover-still.mjs checks letter boxes and colours, not stroke width or
smoothing, so it will not catch a wrong weight; check those by eye on his Mac.

### Handoff, 9 Nov evening (from session "Portfolio: site build Phase 3 responsive")
He asked for a new session to carry the site build on, starting with the hover highlight. In order:
1. **Hover highlight.** His rule: on hover a link changes only its text colour and gets the light block
   behind it; nothing moves, ever. He still sees a bigger gap between letters on hover (his example:
   Contact in the footer). The letters measure identical in headless Chromium on Linux, but he views
   on a Mac, so that measurement is not proof. Find what differs and the craft answer, with sources.
   Proposals: site/dev/preview/proposals.css. Checks: scripts/verify-hover-still.mjs, run by
   scripts/build-preview.mjs. Records: fixes/2026-11-09-hover-fade-flicker-called-still.md.
2. **Ship the preview proposals** once he says yes: card label Label/12 C Neutral/300, cover highlight on
   the email, LinkedIn, Back to top and the end bar, instant swaps, Haven nav swap, portrait pills with
   no rim. Move each block from proposals.css into site/css, delete it there, rerun
   node scripts/verify-1440.mjs and node scripts/verify-responsive.mjs <mode> all.
3. **Work card hover** (his spec: image only at rest; on hover a 75 percent black overlay, then Learn more
   loads in). Motion process under way: docs/motion/card-hover/style_guide.md and state_list.md written;
   module and CSS in site/motion-lab/card-hover/. Next: lab page with window.seek, renders at 1440 and
   390, review rounds with a fresh eyes subagent, motion-check, determinism, then a tuner and the
   preview. He sees nothing until the review passes.
4. **Heading/20 split:** headers keep Medium; body text moves to a new Regular Body/20. Wait for his Figma.
5. **Unstyled text in the case studies:** a later pass; the preview's Type review tool marks it.
6. **Phone layouts:** his notes (hero needs rethinking; list titles never wrap; list layout reads weird).
   Go through each page with him one by one, after the rest is in place.
7. **Small things to confirm with him:** Haven's nav now turns dark over the bridge at once instead of
   fading; the cw logo has no hover.
8. **Parked to the end, at his ask:** Contact button motion (tuners linked below), footer band motion.

How to work: the review loop and the block (below). Preview link https://claude.ai/artifact/WEWiXsm3fsWdV2gd7z5BST:
read it with the Artifact tool, rebuild with node scripts/build-preview.mjs site <dir>, publish to that
url. He comments on it, and comments sent to Claude arrive as turns. Branch: claude/relaxed-ride-5mlbdu
(commits after 9aa1315 are not yet in claude/lucid-carson-u56t7v). The Phase 2 session is finished and
holding.


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
  `02 Haven` only. Code uses Portfolio Neutral/400 and Neutral/200; the Figma fills were moved to those local
  Portfolio variables on 8 Nov at his yes; nothing in the Link set is on a remote library now. He fixed the footer in Figma 8 Nov: Resume on column 10,
  LinkedIn on 7, bottom row gap 176; code and the reference renders follow. The copyright reads
  @2026 as drawn.
- Figma measures text without letter spacing after the last glyph; CSS adds it. Negative tracked
  text adds it back as end padding (comment at the top of `components.css`).
- `npm run check` now skips `site/motion-lab/` (its renders are gitignored, so a fresh clone could
  never pass); it still checks `site/dev/`.
- His call 8 Nov: Transported home is the launch homepage; the old hero plan is parked as context
  (tracker D8). Earlier homepage work counts only where it is basic motion.
- He looked at the sheet 8 Nov: "fine enough".
- Phase 1, Collection page done 9 Nov: `site/mondai/index.html` and `site/css/collection.css`, page
  CSS layout only. Gates C1 to C8 in `.unlazy/site-build/GATES.md` (local); rerun with
  `node scripts/verify-pages.mjs boxes|pixels|health|a11y|shared collection`, spec and Figma boxes in
  `scripts/figma-pages.json`, reference render in `site/dev/pages/figma/`. 19 of 19 boxes within 1 px
  (the intro carries 1.5 for Figma's multi line trim), 0.73 percent pixel difference.
- Decided on Collection: rows 2 and 3 are fixed 992 in Figma while row 1 fills; built all full width.
  The locked row keeps Figma's fixed 1300 content frame, so its status ends 10 px from the right
  (now in components.css). Page background is Neutral/900 as the frame fill (base.css has
  Neutral/1000); promote to base.css if Home agrees. Badge text drops its trailing tracking like
  Figma (sheet badge diff 0.72 to 0.07 percent).
- Open on Collection: Framework CS and Design system CS link to `#framework` and `#design-system`
  until those pages exist; Design system CS has no page planned in Phase 1. No footer in the frame,
  so Contact me goes to `/#contact`.
- Phase 1, Home done 9 Nov: `site/index.html` (replaces the September skeleton) and `site/css/home.css`.
  Same gates, `node scripts/verify-pages.mjs <mode> home`: 27 of 27 boxes, 1.19 percent pixel
  difference. Card images and the hero CHDWCK are exports in `site/assets/home/` (cards at 2x; the
  Mondai card is webp quality 100 because its noise texture is one level deep and lower qualities
  flatten it).
- Decided on Home: Heading/20 lines are 26 px apart, as Figma lays them (tokens.css; this also let the
  Collection intro drop its tolerance). Page background Neutral/900 moved to base.css. Card labels
  snap to text styles as planned, except the // mark, which uses the Collection's 15.17 px mark
  token. Learn more is the Small button at full size on Figma's center (Figma draws it at 98.5
  percent). The home footer instance overrides the band's image filters (warmer, darker shadows), so
  Home uses a band rendered from that instance; the component and other pages keep the component's.
  The hero lede reads "change our minds"; Figma says "out minds", a typo to fix there. The clock and
  the band motion stay static until Phase 2.
- Phase 1, Framework CS done 9 Nov: `site/mondai/framework/index.html` and `site/css/framework.css`.
  Generated by `scripts/framework-page/build.py` from `spec.json` (the Figma text read) and
  `page.tpl`; rerun it after copy changes in Figma. Text is HTML at Figma positions inside sections
  of Figma height; product screens and diagrams are 19 exports at 2x in `site/assets/framework/`.
  106 of 106 boxes, 0.94 percent pixel difference against the Figma render with the four extra Start
  of week frames cut out (`site/dev/pages/figma/framework.png`).
- Decided on Framework CS: the five Start of week frames are one sideways scrolling track (CSS scroll
  snap, template 1 at load); its dots stay a static image until Phase 2. The two Falling behind
  headlines are DM Sans in Figma; built in Satoshi Heading/40 like every other headline. All line
  heights are now whole pixels (Figma rounds them; tokens.css), which keeps Home and Collection
  passing. The page gate now loads lazy images before its shot and fails on any image that did not
  render (the first run passed at 2.67 percent with three figures missing, because dark screenshots
  sit under the 64 level pixel threshold).
- Copy: every line comes from `reference/cs2/review-2026-11-07/final-copy.md` on main (spec.json and
  the template captions in build.py), not the Figma frame. Three places run longer than Figma's text,
  so what sits below moves down and the section grows with Figma's gap kept: hero right column
  (+87), the Capacity body pushes the Example box down 286, the Ending body sits under a three line
  headline (+188). The page gate compares boxes and pixels section by section from each section's
  top for that reason; text heights are not compared where the copy changed.
- Still from Figma and stale against final-copy.md, because they are baked into exports: the
  foundation diagram (Branding should come before Networking; Focus Areas and Action Items
  capitalized) and the Buffer mock line ("Every task, every week, no gaps." should read "Every Action
  Item, every week, no gaps."). Fix both in the Figma frame, then re-export those two figures.
  Optional Body 5 (streak) is left out. The Capacity body is now 15 lines in a 255 wide column; the
  layout wants a wider column there, his call in Figma.
- The Collection's Framework row now links here.
- Phase 1, Haven done 9 Nov: the shared navbar (fixed at 24 and still turning dark over the bridge),
  the Ending base bar (now a shared component, `.ending-bar` in components.css) and the Other pages
  footer replace Haven's own; Haven's neutrals point at tokens.css (only Neutral/800 changes value,
  #18181b to the Portfolio #121214). Checked by `node scripts/verify-haven.mjs files|body|motion`:
  only index.html, haven.css and current.css changed; the body renders as before with no pixel off by
  more than 64 levels (0.08 percent faint, the Neutral/800 change); clock live, nav inverts, no errors.
- Haven against its Figma frame: the coded body was already 368 px shorter than the frame (18552 to
  18920) before this move; left as is, since this step was not to change Haven's spacing.
- Phase 2 started 9 Nov: three button options on `site/dev/buttons/`. His call: Small button takes option A
  (fill on hover, Neutral/300 and 98 percent on press), now in components.css. The big Button (Contact) gets the liquid effect from his pinned session "Liquid button
  effects recreation" (branch claude/cool-albattani-5v7t70). The first build (9 Nov) skipped the motion
  studio and did not match the reference; it is removed from the pages. Rebuilt through the studio:
  docs/motion/contact-button/ (style guide and state list from his two Framer recordings, review log,
  three rounds with fresh eyes, no P0 open), site/motion-lab/contact-button.html (A gooey split, B
  liquid outline, deterministic seek), clip output/motion/contact-button.mp4 (60 fps, renders matched
  sha256). A live tuning page is published for him. His pick (9 Nov): A, the gooey split, at the default
  settings. Shipped as site/js/contact-goo.js on Home, Framework and Haven; the lab page now runs that
  same module, so the lab render is the shipped motion (two renders matched sha256). Reduced motion and
  no script keep the plain borders. At rest the two pills join with a liquid neck, a decided change from
  the Figma footer; page pixel gates still pass. Not done: he tunes it on the tuner
  (scripts/motion-tuner/contact-goo.py, published at https://claude.ai/artifact/1UZGKKtRGbZMBgv7BhBPQG) and
  his Copy settings output goes into GOO in contact-goo.js.
- **Parked 9 Nov, at his call ("I don't want to stop progress for a button effect"):** the Contact
  button motion. What exists and works: the gooey split in `site/js/contact-goo.js` on Home,
  Framework and Haven at default settings, the lab page and the tuner. Resume point: he tunes it on
  the tuner (https://claude.ai/artifact/1UZGKKtRGbZMBgv7BhBPQG), his Copy settings output goes into
  `GOO` in `contact-goo.js`, then `node scripts/verify-contact-goo.mjs` and the 1440 suite. Phase 3 did
  not touch the button, its script or the lab. The rest of Phase 2 also waited on him: card hovers (H11
  prototype, since built) and the footer transition (now in Details).
  Link and Context list hovers already work from Phase 0.
- Contact button, later on 9 Nov (the button session, still running when Phase 3 merged), his ask: mix the gooey split with the liquid outline, no neck at rest, react to
  where the pointer is, the hidden colour as a setting. Built in new files (another session owns
  contact-goo.js): site/js/contact-liquid.js, lab site/motion-lab/contact-liquid.html, tuner published at
  https://claude.ai/artifact/BdG5yNZuFnkSDSfgQneXnU (built by scripts/motion-tuner/contact-liquid.py),
  plan docs/motion/contact-liquid/. Not on the pages and not done until he has tuned it.
- **Phase 3 built 9 Nov** (responsive, before the remaining motion: motion is tuned against final
  layout, so layout first means tuning once). Gates in `.unlazy/site-responsive/GATES.md` (local):
  `node scripts/verify-responsive.mjs fit|overlap|size|health all` checks Home, Collection, Framework
  CS and Haven's shared parts at 390, 768, 1024, 1200 and 1366 (20 of 20 each: nothing cut off or past
  the window, no text on text or on a content image, no text under 12 px below 1200 or 10 px from
  1200, no horizontal scroll or failed request). `node scripts/verify-1440.mjs` reruns every Phase 0
  and 1 check: 23 of 23, so 1440 is unchanged. Screenshots at 390, 768 and 1200 in `docs/responsive/`.
- Decided in Phase 3 (each reversible; his call on the 390 versions):
  - Breakpoints: desktop 1200 and up keeps the Figma grid (12 columns, 40 and 40); tablet 768 to 1199
    is 8 columns, 32 margin, 24 gutter; mobile under 768 is 4 columns, 20 margin, 16 gutter. Only the
    large styles step down (tokens.css): Heading/64 to 56 then 40, Display/96 to 64 then 40, Heading/40
    to 28 and Heading/24 to 20 on mobile; Display/212 sizes to the content width.
  - Home and Collection between 1200 and 1440 scale fluidly: card widths, the card description offset
    and Learn more are shares of Figma's sizes, so 1440 still lands on Figma's pixels.
  - Framework CS between 1200 and 1440 keeps the 1440 composition scaled to the window
    (`site/js/fit-desktop.js`); body lands at 13.3 px and labels at 10 px at 1200. The other way was the
    stacked layout from 1440 down, which would show most laptops (1280, 1366) a phone layout. Under 1200
    it stacks: the generator now writes each section in reading order (`flow_order` in build.py, which
    also fixes the screen reader order, where every figure used to come last), frames drawn only behind
    desktop text are hidden and the Example box draws itself around its text.
  - Navbar: mobile drops the "Product Designer" line on Home and keeps all three links (they fit at
    390, so no menu). Footer stacks; the CHDWCK wordmark keeps the share that shows at 1440. Ending bar:
    previous and next on one line, Explore more under them; at 390 the long labels run to four lines,
    shorter labels would be a copy change for him.
  - Collection rows wrap: tablet keeps title, arrow and badge on one line with the locked status
    below; mobile puts the badge over the title, arrow on the right.
- His first look at the phone layouts (9 Nov, one picture of the first screen of Home, Mondai page and
  Framework CS): the hero needs rethinking; case study titles in the Mondai list must never wrap; the
  list layout reads weird. He wants to go through each page with him one by one, after everything else
  is in place. He also flagged that Phase 3 was built without checking in with him first: see
  fixes/2026-11-09-phase-3-built-without-his-checkpoint.md. Nothing in Phase 3 is approved.
- Next action: his review of the 390 versions (`docs/responsive/*-390.webp`, or `npm run dev` at 390).
  Then Phase 2 as he unparks it, then Phase 4.
- Phase 2, 9 Nov, the rest: Home work cards carry the H11 states (image eases in 3.5 percent, text white,
  Learn more fills, focus ring, press settles; reduced motion keeps colour only). Links and context rows
  ease over 200 ms like the Small button. The footer clock is live Chicago time on Home and Framework
  (site/js/site.js; Haven keeps its own). The Start of week dots are HTML, follow the carousel and jump
  on click; the hint text matches the old export to the pixel. Haven's motion is unchanged. Gate:
  node scripts/verify-phase2.mjs cards|links|clock|dots|regress, all pass.

- Pre launch check, 9 Nov (built site in dist/): every page has a title and description; the portfolio
  logo is now the favicon on every page (Haven already used it); Haven's profile scroll study page no
  longer ships. Resume is hidden in the footer on every page at his call (9 Nov) until he provides his resume; the
  link stays in the markup with hidden and data-hidden-until. Open for launch: Collection's Design system row links to #design-system; no social preview image
  (og:image) on any page.

## Details (end of build)

His call 9 Nov: polish pieces he wants to recreate himself wait here until the build is done. Nothing
in this list blocks a phase.
- Contact button effect. The pages run the gooey split (site/js/contact-goo.js). Two tuners exist: the
  gooey split (session "Portfolio: Contact button liquid effect",
  https://claude.ai/artifact/1UZGKKtRGbZMBgv7BhBPQG) and the liquid mix
  (https://claude.ai/artifact/BdG5yNZuFnkSDSfgQneXnU, site/js/contact-liquid.js). He has something he
  wants to try recreating.
- Footer halftone band motion. The band ships static as drawn in Figma. He has a reference to show.
  Haven keeps its own CSS until Phase 1 moves it.
- Figma reads: file `5RO0m4bYYrTvbiaOgaU3tI`, call `create_session` first; `get_metadata` on page
  `5658:1061` is 2 MB, so read single frames instead.

## Review loop (his yes, 9 Nov)

Every piece of site work, at every stage, runs this loop. Nothing is done because checks pass.

1. **Propose.** In plain words: what changes, why and what it is based on (a Figma frame, his reference,
   an earlier pick). Put a working version in `site/motion-lab/` or `site/dev/` and publish it to the
   preview link, so he can try it rather than look at a picture of it.
2. **His yes.** `.claude/hooks/site-review-gate.mjs` refuses changes to the shipped site (everything in
   the site folder except dev and motion-lab, plus `scripts/framework-page/`) until his recent message
   approves, or he answers Yes to a question card tagged [site change]. Tested by
   `node .claude/hooks/tests/site-review-gate-cases.mjs` (SITE_GATE_OK).
3. **Build** into the real pages, run the checks, republish the preview link.
4. **He tries it** on the preview link, on his laptop and his phone, and gives notes. Back to 3 until it
   feels right.
5. **Done on his yes only.** Write his yes and the date next to the piece in this file.

Preview link: https://claude.ai/artifact/WEWiXsm3fsWdV2gd7z5BST (private to him). Rebuild with
`node scripts/build-preview.mjs site <dir>`, then publish to that same url.

Loop log:
- 9 Nov, nav hover (first piece through the loop). His note on the preview: the hover changes the word's
  shape, the letters widen and space differently. Cause: the Figma Nav hover variant is Bold. His yes
  (card): keep the weight, only the block and text colour change. Built in components.css; measured: no
  nav word moves on hover. Waiting on him to try it. The Figma component still draws Bold.
- 9 Nov, he could not open the preview full screen in claude.ai, which also shows him the tablet layout.
  Open: whether to put the preview on a Vercel address instead.

- 9 Nov, his notes from the preview, full screen now works:
  - Mondai card label "Case study collection" on Home: he asked for Label/12 C, Neutral/300 (it is Bold,
    Neutral/200). On the preview as a proposal (site/dev/preview/proposals.css); goes into home.css on
    his yes.
  - Nav hover, second pass: Contact me looks thinner and wider on hover. Cause: dark text on the light
    block reads lighter than light text on black. Proposal on the preview: a hairline stroke that adds
    weight without moving any letter (measured: widths unchanged).
  - Work cards, his idea, not built yet: at rest only the image; on hover a 75 percent black overlay
    and Learn more loads in over it. Learn more is no longer shown by default. Next piece for the loop.
  - Heading/20: he is splitting it in Figma. Headers keep Medium; body text that uses it today moves to a
    new Regular style, Body/20. Wait for his Figma change, then map it into tokens.css.
  - Some text in the case studies has no text style attached in Figma. A pass to do later, without
    stopping progress. The preview's Type review tool marks unstyled text on any page.
  - He asked for a review tool to pick any text, see its style, try any style or colour and add styles.
    Built on the preview only: site/dev/preview/type-review.js and .css, added to every preview page by
    scripts/build-preview.mjs. Changes stay in his browser; Copy my notes gives a list to send back.

Approved so far: Phase 0 sheet ("fine enough", 8 Nov); Small button option A and the Contact button
gooey split (picks, 9 Nov). Not yet approved by him: the Phase 1 pages as built, everything else in
Phase 2, all of Phase 3.

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
2. **Framework CS copy is final (8 Nov) and lives in the repo, not Figma.** Take every line from
   `reference/cs2/review-2026-11-07/final-copy.md` on main (tactics pass done, his two last cuts
   applied in 1dc70ad). The Figma frame still holds the old copy and placeholder hero text; do not
   sync copy from Figma.
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
| 2 Interactions and motion | Button and Small button states designed together; link and card hovers; carry over what exists (Haven motion); new motion only after his pick | Each piece passes the motion review loop in `.claude/motion-rules.md` |
| 3 Responsive | 390 wide recompositions per page, then 768 and 1200 (built 9 Nov, ahead of the parked Phase 2 items) | No horizontal scroll at 390, 768, 1200 and 1440; he approves the 390 versions |
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
