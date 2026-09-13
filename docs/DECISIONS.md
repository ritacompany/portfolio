# Portfolio decisions

## 2026-08-31: Shared project record

The repository will be the shared working record for Codex and Claude Code. Both should consult `AGENTS.md`, the core context files and Git history before beginning a task.

## 2026-09-07: Stale creative handoff closed

The 5 to 6 Sep Mondai session handoff no longer defines active portfolio work. Its band, hero
and About drafts must not be resumed from that record. `NEXT.md` defines the current priority.

## 2026-09-07: Deployable holding scaffold

The repository root builds a small static holding page from `public/` into `dist/`. The page
exists to verify the GitHub and Vercel path without publishing unapproved portfolio content.
It is excluded from search indexing. The case-study layout rebuilds in `build/` are not part of
the deployment output.

## 2026-09-07: Homepage desktop baseline

The Figma `Master` frame at node `3461:7711` is the source for the homepage implementation in
`site/`. The first milestone reproduces the 1440 by 10055 composition in vanilla HTML and CSS
with local assets. It intentionally excludes responsive rules, the menu screen, the live clock
and motion. The repeated 518 pixel desktop section spacing remains unchanged after browser
comparison. Current personal copy is temporary layout content and is not approved for shipping.

## 2026-09-08: Homepage desktop review corrections

The large display words may bleed beyond the canvas, but that bleed must be clipped by the page
without creating horizontal scrolling. Their original art-directed edge relationships remain visible
as intentional clipping rather than being normalized to fit the canvas.
Mondai case numbers align to the left edge of their rows. All text in the Overview and Current
role rows uses Neutral 050.

## 2026-09-08: Homepage desktop milestone accepted

The desktop reproduction is accepted as the starting baseline for responsive work. Small fidelity
differences may be handled in one final audit after responsiveness is complete rather than blocking
the responsive phase now.

## 2026-09-08: Responsive planning ownership and wide canvas

Responsive rules will be defined section by section before implementation. Figma Auto Layout,
constraints and sizing modes must be inspected as evidence before web behavior is invented. Font
families, weights, styles and other typography design choices remain Chadwick's decisions. Any
responsive type sizing must be proposed within the relevant section review.

The responsive content canvas will continue growing beyond the accepted 1440 pixel desktop frame.
The exact maximum remains open. Intentional display-word bleed may continue while the canvas grows,
and may remain clipped when the canvas reaches its maximum. Outer browser space does not require the
display words to resolve to a full-width fit.

Codex must explain the purpose and scope of a proposed branch or commit, then receive Chadwick's
approval before creating it. The planned responsive implementation remains one branch with separate
reviewable commits for the foundation and each verified section.

## 2026-09-08: Wide desktop responsive foundation approved

The responsive content canvas grows through 1920 pixels, then remains centered at that maximum.
The 12-column grid retains the accepted 40 pixel margins and 40 pixel gutters at 1440 pixels.
Margins grow fluidly to 64 pixels and gutters grow fluidly to 56 pixels at 1920 pixels. These values
also respond below the 1440 reference while the desktop structure remains viable.

Responsive type scaling is reserved for large display headlines. Body text, labels, navigation and
supporting headings retain their approved font sizes. CHADWICK, Superpowers and CATCHY OUTRO retain
their intentional edge overlap at 1440 pixels and preserve that relationship through the 1920 pixel
ceiling. None of that bleed may create horizontal page scrolling.

## 2026-09-09: Wide hero and navigation approved, amended 2026-09-10

The 1440 hero retains the updated Figma spacing and detached custom tracking for CHADWICK. Only
CHADWICK changes type size across the wide desktop range. The latest 10 Sep Figma revision moves the top
alignment to 32 pixels and applies Label/14 to the biography and relocation note. At 1440 the
biography is 306 pixels wide, the relocation note is 179 pixels wide, navigation remains 14 pixels
and the logo remains 60.458 by 17.92 pixels. Their outer anchors follow the responsive layout while
their type sizes and custom internal spacing remain fixed.

The logo and navigation links remain sticky as the page scrolls. The biography and relocation note
align with them at the top of the hero but scroll away with the hero because they are not menu
content. The navigation uses a 102 pixel gap. CONTACT is a Neutral 200 button with 30 pixel
horizontal padding, 13 pixel vertical padding, a 6 pixel radius and Label/14 Bold text. Its visible
height is 40 pixels inside a 44 pixel interaction target. Navigation retains visible hover, focus
and pressed states without motion.

CHADWICK remains anchored to the bottom of the visible hero, but its glyphs are fully visible along
that edge. The earlier negative 0.13 em offset was a mistaken interpretation of the reference and is
removed.

## 2026-09-09: Wide work cards approved, amended 2026-09-10

Both work-card media containers use a shared 464 pixel height at the 1440 baseline, replacing
the differing heights in the accepted page. The 10 Sep Figma revision narrows both media and metadata
containers to 1124 pixels at 1440 and centers them. The black Mondai composition is the approved card.
The green Mondai field was an experiment and is excluded. Their 1124 by 464 container ratio scales
with the responsive canvas through 1920 pixels. Supporting typography remains fixed in the wide
range. Each complete card is one accessible link with visible hover, focus and pressed states and
no motion.

## 2026-09-09: Responsive type scope clarified

Only large display headlines change font size with the viewport. Body text, labels, navigation,
list text and supporting headings keep their approved font sizes. Responsive positioning, container
sizing and structural reflow remain separate layout decisions.

## 2026-09-09: Mondai heading uses bounded fluid typography

The Mondai section heading grows from 148 pixels at 1024 to 212 pixels at 1440, then more slowly
to 236 pixels at 1728 before stopping while the canvas continues through 1920. This two-stage range
keeps strong contrast without allowing the fixed 16 pixel description to become visually disconnected.
The description wraps within the available header width and aligns to the visible bottom of the title.
The 12 pixel collection label keeps its top position in the same header frame. Case-list text remains
fixed at 40 pixels. Numbers use grid column 1, titles use column 4 and arrows use column 12 so the
spacing follows the responsive grid.

## 2026-09-09: Wide Mondai index approved

The verified Mondai index study is the approved wide-desktop behavior. The list follows the
12-column grid while its supporting type stays fixed. Compact, tablet and mobile composition
remain separate work.

## 2026-09-09: Autonomous frontend implementation and QA

Agents own reversible implementation choices inside the approved portfolio direction. For each
responsive section they should build and verify one evidence-based recommendation before asking for
review. Chadwick retains approval of personal brand, art direction and typography choices, but he is
not responsible for deriving breakpoints, layout mechanics or test cases.

Frontend work follows `docs/FRONTEND_WORKFLOW.md`. Browser captures must be viewed, not merely created.
Existence or file-size checks cannot serve as visual evidence. The agent fixes material defects and
repeats the affected visual and behavioral checks before returning the result.

## 2026-09-10: Superpower statement minimum measures

All three Superpowers statements retain their Figma text measures as minimum widths in the wide
homepage study. The first two remain 515 pixels wide and the third remains 481 pixels wide. Their
column 2 start continues to follow the responsive grid, but the text measure does not collapse with
the grid. This keeps every statement at two lines or fewer at 786 pixels and above. Tablet and mobile
work must recompose the block rather than force a third line.

## 2026-09-10: Persistent display-word edge bleed

The 1920 pixel content ceiling does not end the intentional clipping of the large display words.
CHADWICK retains left and right bleed, Superpowers retains its original left bleed and right-side
breathing room and CATCHY OUTRO retains left and right bleed. Their size and clipping relationship
freeze with the 1920 pixel canvas on wider browsers. CHADWICK remains bottom-aligned with a 0.02 em
optical inset so its lower glyphs are not clipped. Supporting text, grids and containers keep their
existing responsive behavior.

## 2026-09-11: Single-task responsive execution

Compact, tablet and mobile homepage work will run as one end-to-end implementation task in the same
portfolio project. The earlier recommendation to use a separate task and review stop for every section
is retired. The section sequence remains the agent's internal work order and acceptance ledger.

The agent owns reversible breakpoint, grid, spacing, stacking, media-treatment and responsive display-size
choices that preserve the accepted desktop art direction. It does not need intermediate approval for those
choices. It must not change approved copy, type family, type weight, type style, color system, personal brand
or desktop art direction. It pauses only when completion genuinely requires one of those owner-held decisions
or missing external information. Otherwise it implements the full page, runs the complete browser and visual
review loop, fixes every material defect and reports once when the full responsive page is ready for review.

## Existing design direction

The portfolio should use an asymmetric, editorial and evidence-led layout grammar. Figma is the visual source of truth. The existing Haven and Mondai WIP frames are protected from direct edits unless explicitly approved.

## 2026-09-13: Responsive homepage implemented, canonical source moved

The canonical homepage is `site/index.html`, `site/styles.css` and `site/main.js`. The wide
study files stay in the repository as the accepted desktop evidence the implementation was
measured against, and are no longer the source of truth.

The mobile composition is the base stylesheet and compact and desktop behaviour is added with
min-width queries. Three structural boundaries were derived from measured content failures
rather than device presets: 600 pixels where the card metadata, Mondai header and footer
contact pairs stop holding a two-group line, 1120 pixels where the four fixed-anchor hero
groups stop fitting because the relocation note and the navigation overlap from 1110 pixels
down, and 1440 pixels as the accepted desktop reference.

Each display word now derives its bleed and its layer width from one size value using the exact
Figma ratios, so the art-directed overlap is preserved proportionally at every width instead of
being re-specified per breakpoint. The approved 1440 and 1920 values are reproduced exactly.

Below the desktop boundary the three navigation links are replaced by a full-screen menu. Its
trigger reuses the accepted CONTACT pill and its rows reuse the case-row grammar already on the
page, so no new component is introduced. The MENU and CLOSE labels are interface copy chosen by
the agent from the open variables list, not personal brand copy, and remain changeable.

Two defects in the accepted baseline were corrected. The sticky header did not stick, because
`overflow: hidden` on the canvas made it a scroll container; the canvas now uses `overflow: clip`,
which still crops the display-word bleed. The footer contact links measured 40.1 pixels tall
against the stated 44 pixel interaction floor.

The three art-directed quote lines flow as one statement below the desktop boundary, because each
line wrapped separately below the desktop measure and produced a stair-step rag with the bolt
orphaned. The superpower statements drop their 515 and 481 pixel measures below that boundary for
a 20 to 24 character measure, which is the recomposition the 10 Sep decision requires rather than
a narrowed measure.

Verification is reproducible with `node scripts/responsive-check.mjs <check>`. Cross-browser smoke
testing is recorded as not verified: only Chromium was available.
