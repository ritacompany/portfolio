# Ten more design system case studies: how they show the system

24 Nov 2026. The visual set, feeding Lens E in `STRATEGY.md`. Links, authors and dates are in
`VISUAL-EXAMPLES.md`. Notes are paraphrased from full page screenshots taken in Chromium; the repo is
public, so the screens and page text live in the private archive, not here.

Private archive with every screen and the full text of each page: https://claude.ai/artifact/Y9xXP7mVwqB3Quz9Wvq8iY (private to Chadwick; captured 24 Nov 2026)

Every number below is the author's own claim, as stated on the page; none was checked
independently. Outline 2 sections are numbered as in `../../outline-2/MATERIAL.md`: 1 opening,
2 colour, 3 layout and components, 4 proving the checks, 5 the agent test, 6 ending.

## What this set adds to the first ten

- The first ten mostly show the system in words; only Wise, Musterhall and the Fortune 200 page
  carry the argument in pictures. Here every page does, and four come close to Wise on density
  (Bupa, Bitsight, NXT, Holzprofi24).
- Several pages draw their diagrams in HTML instead of pasting Figma screenshots (Bitsight,
  Holzprofi24 and most of Bupa). The diagrams stay sharp, follow the page type and can be read at
  phone width. That is the strongest craft signal in the set and the cheapest to copy.
- Captions split three ways: the rule the image proves (Bitsight, NXT), the decision behind it in two
  or three lines (Limbo Citi), or just what it is (most others).
- The data pages show a number beside its baseline and its limit, never alone. Holzprofi24 gives
  every number a column for what it does not prove; Bupa labels a dashboard as roadmapped and not
  yet built. Both are the moves CS3 needs for anything still open.

## 1. Bupa: Nate Mills, design systems consultant

- Link: https://bupa-case-study.netlify.app/
- Archive: 40 screens, about 6,000 words. Sep 2025 to Mar 2026, a six month contract. Long, but
  held together by a sticky chapter bar (brief, discovery, tokens, governance, automation, outcomes,
  reflections) and huge outlined chapter numbers.
- Visuals that carry it: an audit at a glance row of big number tiles (libraries, tokens in
  circulation, share flagged); findings as tiles with one big figure and a label each; the token
  count drawn as a big before and after pair (hundreds of alpha tokens down to a couple of dozen)
  above a grid of scattered swatches turning into one shared black and white ramp; a three tier model
  as columns with counts per tier; an interactive token builder (pick a base colour and overlay, the
  token name resolves); a triage framework as three lettered cards (small, medium, high effort, with
  time to fix); an intake flow and a hub and spoke diagram of the tools that feed one source of
  truth; a six months measured block of before and after tiles.
- Captions and layout: mostly no captions; each visual sits in a rounded panel with a small
  uppercase label above (deliverable, chapter) and a one line takeaway set large and italic between
  chapters. Numbers are set very large with the change stated in words underneath.
- Serves: 2 colour (the swatch grid that collapses into one ramp is the clearest picture of
  consolidation in either set); 4 proving the checks (audit tiles); 6 ending (the dashboard card
  labelled roadmapped, not yet built, is how to show an open item honestly).
- Take: the before and after token count drawn as two numbers with an arrow, then the swatches
  that make the number visible. Number first, then the picture that earns it.
- Skip: length. About 6,000 words for six months of work; CS3 should not follow it there.

## 2. Bitsight: H. Ariel Baiz, design systems lead

- Link: https://harielbaiz.com/case-study-design-tokens.html
- Archive: 20 screens, about 2,000 words. Work 2023 to 2024.
- Visuals that carry it: a hero diagram of one value travelling from hex to primitive to semantic
  token to a real gauge component; a token chain drawn in HTML (raw value, primitive, semantic) for
  light and dark side by side, so one semantic name resolves to two values; the naming convention
  as an anatomy diagram (the parts of a token name, labelled); elevation drawn as nested surfaces;
  a real screen in light, dark and a colour blind mode; four number tiles for what shipped.
- Captions and layout: a sticky numbered contents rail on the left; diagrams in a soft grey panel
  with a one sentence caption under each that states the rule (a semantic token points at a
  primitive; components never touch the primitive). User quotes set large as pull quotes after a
  section, attributed by role and moment.
- Serves: 2 colour (the light and dark chain is the labelled raw value to role to screen chain
  MATERIAL.md asks for, already drawn); 1 opening (the hero diagram shows the system before the
  story).
- Take: a caption that states the rule, under a diagram drawn in the page's own type.
- Skip: nothing major. The outcome is a quote and token counts, with no measure of what changed.

## 3. NXT: Anirudh Kanaparthi, sole product designer and system architect

- Link: https://www.anixperience.com/nxtdes
- Archive: 19 screens, about 1,800 words. Shipped 2025.
- Visuals that carry it: four token layers, each a row with the layer named and its job in two lines
  beside a Figma variables panel; a variables to tokens to components chain set above a full button
  matrix (variants by sizes by purposes by states) in one image; six decision cards, each a question
  with the options weighed; number tiles on a blue panel (collections, variables, components,
  brand generations); the system shown working inside the product after a rebrand.
- Captions and layout: alternating left and right rows for the layers; decisions numbered and titled
  as questions; a single pull quote that names the shift in one line (a button asks for a role, not
  a colour). Captions under images say what the method went on to cover.
- Serves: 3 layout and components (the button matrix with its rule above it is exactly the button
  decision in MATERIAL.md: rules instead of drawings); 2 colour (the layer rows).
- Take: decisions titled as the question that was open, then the picture that answered it.
- Skip: the Figma panel screenshots inside the layer rows are too small to read at page width.

## 4. Holzprofi24: Abhidnya Patil, owned the system end to end

- Link: https://abhidnyapatil-portfolio.framer.website/holzprofi24-design-system
- Archive: 21 screens, about 2,000 words. Started 2024 during a platform migration; live in two of
  three shops.
- Visuals that carry it: a headline impact row of four tiles; an audit findings board (counts of
  colours, components, fonts, contrast failures, coverage) above a table of failures by area; the
  colour palette as named swatches; the token naming convention drawn as its parts; a three tier
  token tree that resolves one semantic name into three brand colours side by side; a design to
  code pipeline from Figma to GitHub to Storybook to each shop; a decisions and trade offs table;
  an impact table.
- Captions and layout: every image has a plain italic caption saying what it shows (how one semantic
  token maps to three brand colours). Uppercase section heads. The two tables carry the argument: one
  has a column for the trade off of each decision, the other a column for what each number does and
  does not prove.
- Serves: 2 colour (one semantic name resolving to three brands is the chain visual with a brand axis
  added); 6 ending and the numbers plan (the honest read column is the most direct model in either
  set for stating a limit beside every number, ahead of Anorbank).
- Take: the impact table with three columns: the signal, what it shows, what it does not prove.
- Skip: the audit board's small tiles; the counts are hard to read at page width.

## 5. Ether.fi: Oleksii Tatarko, product designer leading the design system

- Link: https://contra.com/p/77WW6bsE-design-system
- Archive: 32 screens, about 1,300 words. 12 Oct 2026. Seven week v1.
- Visuals that carry it: an audit board of every value in use (colour, type, spacing, radius,
  shadow), each flagged as duplicate, drift or off scale, with a legend; a duplicate gallery of the
  same component built several ways; a seven week plan as dark cards; scale boards; a semantic token
  mapping board; input and button state boards; a component checklist and a status board.
- Captions and layout: Figma boards dropped in at full width on a dark mat, usually with one plain
  line under them saying what the board was for. The boards carry their own titles, so the page
  reads like a walk through the Figma file.
- Serves: 2 colour (the audit board is the picture for N30, one token per job from a usage audit:
  values grouped by what they paint, duplicates flagged in red); 4 proving the checks (the status
  board). Also a partial CS3 match: Figma MCP and Claude Code were used for the audit and the docs.
- Take: the audit board's three flags (duplicate, drift, off scale) as the legend for a colour audit.
- Skip: the long run of dark boards with little text between them; the reader has to work out the
  point of several.

## 6. JW Player: Mihaela Vodeb, lead designer of the design system

- Link: https://medium.com/jw-player-engineering/building-design-consistency-a-deep-dive-into-figma-variables-at-jw-player-0e51562e99ae
- Archive: 36 screens, about 3,100 words. Work 2023; published 9 Jan 2025. Free on Medium.
- Visuals that carry it: the library as three file cards (foundations, components, patterns) with the
  token layer each holds; primitive and semantic variable panels; diagrams of how a semantic name is
  built, with the two naming approaches the team weighed written out side by side; spatial variables
  for containers and gaps drawn on real components; a component level variable tree.
- Captions and layout: Medium's centred captions, mostly naming the snippet; most diagrams are drawn
  cleanly on a pale panel. Sections follow the variable types in order, so the page works as a
  reference more than a story.
- Serves: 2 colour (the two naming approaches set side by side is the shape for the three roles
  renamed for what they paint, N32); 3 layout and components (spacing drawn on real components).
- Take: show the rejected naming scheme in the same diagram style as the chosen one, so the reader
  can compare them in one look.
- Skip: the long run of raw Figma panels in the middle; the diagrams say it faster.

## 7. Student Beans: Max Dunne, head of product design

- Link: https://medium.com/pion/using-research-techniques-to-improve-a-design-system-1-year-on-852f60ab19c3
- Archive: 8 screens, about 1,050 words. 26 Jun 2024. Free on Medium.
- Visuals that carry it: the old and the new library side by side as thumbnails; a dark table of time
  lost in the system per role, March 2023 against March 2024, with the change in green; a baseline
  table of hours per role.
- Captions and layout: Medium's centred captions; each table captioned with the average it shows.
  The numbers come from the same three tasks run a year apart (hesitations, wrong turns, tasks
  completed), so the method is in the text right above the table.
- Serves: 4 proving the checks and 5 the agent test (the model for a before and after run of the
  same task: same tasks, same measures, a year apart, the change per role). The closest page in
  either set to how CS3 proves itself, with people in the place of agents.
- Take: one table, three rows, two dates and a change column. That is the whole data visual, and it
  is enough.
- Skip: the decorative 3D heart and hand on the table.

## 8. E-signature platform: Bozena Bulat, senior product designer, first on the team

- Link: https://contra.com/p/sAqWlEF7-token-based-design-system-for-b2-b-signature-platform
- Archive: 22 screens, about 950 words. 2025 work; posted 24 Sep 2026.
- Visuals that carry it: foundation plates (full colour ramps, the type scale, icons); a long run of
  component plates (buttons and toggles, date picker, fields, message bar, toast, text area), each on
  a pale grey mat; then the same product screens in a light and a deep blue theme side by side.
- Captions and layout: every plate on the same grey mat with a short grey caption under it (design
  system, components); screens paired light and dark at the end under the line about three surfaces
  and one system.
- Serves: 3 layout and components (the plate run); 1 opening (one product shown in both themes
  proves the tokens in one image).
- Take: the closing pair of the same screen in two themes.
- Skip: captions that only say components; the plates do not say what rule each shows.

## 9. Limbo Citi: Kristian Lykke Hansen, senior digital designer and design lead

- Link: https://kristiansportfolio.com/limbo-citi
- Archive: 12 screens, about 1,300 words. 2022 to 2025. Two embedded videos did not load in our
  browser.
- Visuals that carry it: library pages with every size, state and variant laid out; a page template
  with a placeholder area; the token theming files; then one platform shown as several municipal
  sites, each on its own coloured mat, so the reader sees one system wearing many brands.
- Captions and layout: a numbered contents list up top; text in one column with images to its right;
  long captions in the accent colour under each image that explain what the board shows and why it
  was built that way (for example, all sizes built before variables existed).
- Serves: 1 opening (several brands on coloured mats in one scroll shows the reach of a system before
  any story); 3 layout and components (the explanatory caption is the model for a component board).
- Take: captions that explain the decision behind the board, two or three lines long.
- Skip: few numbers; the results section is words.

## 10. Halstack: Lara Cordoba Puerto, led the token refactor

- Link: https://www.designsystemscollective.com/a-token-story-part-1-51ac3df380db
- Archive: 17 screens, about 2,100 words. 12 Jun 2025. Part one of a series, on Design Systems
  Collective.
- Visuals that carry it: the token inventory as a run of tables, one per kind (colour ramps with name,
  value and swatch; font family, weight, style and scale with a live preview; spacing; border width
  and radius; shadow; height), all in the same purple headed table style; a first inventory of what
  existed before the refactor.
- Captions and layout: a centred caption under each table naming the set (colour core tokens for the
  system); the tables are drawn consistently enough that the run reads as one reference sheet. The
  text is a first person story, with a meme or two between sections.
- Serves: 2 colour and 3 layout and components (a token table with a preview column is the plainest
  way to show a scale: the name, the value and what it looks like on one row).
- Take: the preview column, so each row shows the value it names.
- Skip: the memes; and the tables are primitives only, so the page never shows a role or a screen.

## Catalogue: visual devices across all twenty pages, by what they prove

Pages from the first set are named as in `STUDY.md`: Wise, JPMorgan, IndiGo, CASSI, Musterhall,
Diorama, WellSky, Anorbank, MCP audit, Fortune 200. This set: Bupa, Bitsight, NXT, Holzprofi24,
Ether.fi, JW Player, Student Beans, E-signature platform, Limbo Citi, Halstack.

### Proves how the system is built

- Token chain, one value traced from raw value to role to component: Bitsight (light and dark side by
  side, the best in either set), Holzprofi24 (one name, three brand colours), WellSky (as arrows with a
  picture per step), Bupa (three tiers with counts).
- Layer rows, each layer with its one job: NXT, Wise (primitives, nested variables, global tokens).
- Token table with a preview column: Halstack (every primitive kind), Bupa (three tiers).
- Library map, which file holds which layer: JW Player (three file cards), Wise (book tiles), Limbo
  Citi (library pages).
- Structure diagram of brands or tools around a core: Fortune 200 (hub and spoke of brands), Bupa (hub
  and spoke of tools), Wise (which brand pulls from which library).
- Name anatomy: Bitsight, Holzprofi24 and JW Player (the parts of a token name), MCP audit (naming
  before and after).
- Component anatomy: Anorbank (a card built from outlined parts).
- Agent output beside its input: Diorama (the prompt beside the screen it produced).

### Proves the system holds across themes and brands

- One screen in each theme or brand side by side: Wise (the bar), Bitsight (light, dark, colour
  blind), E-signature platform (light and deep blue), Diorama.
- Several brands on one platform, each on its own coloured mat: Limbo Citi, Holzprofi24 (three shop
  resolutions).
- One mat for every image, so mixed evidence reads as one system: E-signature platform (grey),
  Musterhall (dark).

### Proves the rules

- Plates with a rule as the caption: Musterhall (the bar), Bitsight, NXT. Plates with an explanatory
  caption: Limbo Citi. Plates with a topic caption only: E-signature platform, Ether.fi boards.
- State matrix, every variant by state in one image: NXT (button matrix under its rule), Ether.fi
  (input and button boards), Limbo Citi (sizes, states and variants per component), Musterhall.
- Decisions with the cost written down: Holzprofi24 (a trade off column), NXT (six questions), CASSI
  (four card grid, one option rejected), Anorbank (three numbered decisions), JW Player (two naming
  schemes side by side).

### Proves what was wrong before

- Audit board of values in use, flagged: Ether.fi (duplicate, drift, off scale), Holzprofi24 (audit
  findings and failures by area), Fortune 200 (lint report tables), Bupa (audit tiles).
- Duplicate gallery: Ether.fi.

### Proves the change

- Before and after of a structure: MCP audit (library tree), Bupa (scattered swatches to one ramp),
  Musterhall (phone screens), JPMorgan (one big component to small parts), Student Beans (old and new
  library).
- Before and after as two numbers with an arrow: Bupa, MCP audit (component counts).

### Proves it worked

- Number tiles: IndiGo (twice, the same figures), CASSI (three up top), Bupa, NXT, Bitsight,
  Holzprofi24. Tiles land when each carries its baseline (Bupa) or its limit (Holzprofi24); they read
  as decoration when they repeat (IndiGo).
- Numbers with their limits stated: Holzprofi24 (a column per number), Anorbank (team estimates and
  what they do not measure).
- Charts over time: Fortune 200 (adoption with the measure defined first). Bupa's dashboard is a
  labelled mock, not data.
- A before and after table of the same task a year apart: Student Beans. The one data visual in either
  set built from a repeated test, which is the shape of CS3's agent test.

### Proves how the work ran

- Timeline of dated phases: JPMorgan, IndiGo, Ether.fi (seven weeks as cards).
- Flow of how a change travels: Bupa (intake to triage), Holzprofi24 (Figma to GitHub to Storybook to
  each shop), WellSky (build chain).
- Agent output step by step: Diorama (prompt and screen), WellSky (generation video).

## What CS3 can borrow, by section

- 1 opening: Bitsight's hero (one value travelling into a real component) or E-signature's one screen
  in two themes; Limbo Citi's coloured mats if more than one surface is shown.
- 2 colour: Ether.fi's audit legend (duplicate, drift, off scale) for N30; Bitsight's light and dark
  chain for the labelled chain visual; JW Player's two naming schemes side by side for the renamed
  roles (N32); Halstack's preview column for any scale shown as a table.
- 3 layout and components: NXT's rule above the button matrix for the 236 buttons in 33 widths; Limbo
  Citi's two to three line caption under each board.
- 4 proving the checks: Holzprofi24's decisions table with a trade off column.
- 5 the agent test: Student Beans' table (same task, two dates, change per row) for N17 before and
  after, once the after run exists.
- 6 ending and the numbers plan: Holzprofi24's honest read column beside every number; Bupa's
  roadmapped, not yet built label for anything still open.
