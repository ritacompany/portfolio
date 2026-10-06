# Portfolio decisions

## 2026-10-05: Pink cast resin style selected for piece form exploration

Chadwick chose the style of the pink piece study for the shiny chess pieces and asked to resolve their actual shapes before finalizing color. The earlier five-piece `14-magenta-cast-resin-calibration.png` is the material reference, not an approved six-piece master. New role-form comparisons are in `output/chess-portrait/04-piece-forms/`. The saved palette image exists, but the assignment of its colors to individual roles is unconfirmed. Piece geometry, individual assets and final scene placement remain open.

## 2026-10-05: Reflective wave board is the preferred direction for placement testing

Chadwick identified the exact reflective wave board at `output/chess-portrait/02-board-materials/03-wave-reflective.png` as his favorite of four material studies, conditional on workable chess piece placement. Its SHA256 is `c81c751c21fe0818b00a0c3e58f9c710b472c10dc94f5a43e3f0cfe194872cec`. The board is a preferred direction rather than an approved master. Test piece bases in the centers of the curved cells while keeping the board, pieces, person and selected background separately editable. Exact grid geometry, final resin forms and hand overlap remain open.

## 2026-10-04: Chess portrait source selection and independent layers

Chadwick authorized resuming empty-board placement using the exact selected evening background plate 10 and the accepted provisional pose for scale and perspective. The portrait handoff requires independently editable background, person, board and piece assets. Plate 13 and plate 17 do not replace plate 10. This authorization does not approve final board appearance or likeness.

The original portrait workspace is outside this session's writable roots. The continuation study and its ledger are saved in `output/chess-portrait/01-board-placement/`. Its selected background copy matches the original attachment byte for byte.

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

## 2026-09-16: Responsive homepage implementation

The committed wide study is promoted to the canonical homepage. The responsive implementation supports 320
through 2048 CSS pixels with one semantic document and one stylesheet. Its two structural boundaries come from
observed content failures: 1160 pixels replaces the crowded desktop header with the compact menu, while 680
pixels replaces narrow compact columns with the stacked mobile composition.

Wide media retains the approved 281 by 116 ratio. Compact media uses 16 by 9 and mobile media uses 4 by 3.
The full screen compact menu locks page scroll, makes background sections inert, traps focus, closes with Escape
or a destination link and restores focus to its trigger. No motion, copy, type family, type weight, type style,
color or desktop art direction changed.

## 2026-09-16: Responsive homepage correction pass

The explicit owner review supersedes the 11 pixel desktop hero-to-work transition inherited from the latest Figma
auto-layout. Desktop now restores the earlier 518 pixel pause before work. The page canvas uses non-scrolling
clipping so the accepted sticky logo and navigation remain fixed while biography and relocation copy scroll with
the hero.

From 680 through 1159 pixels, hero copy returns to the 24 pixel top field and occupies grid columns beside the
logo and menu trigger. CHADWICK uses the original proportional edge bleed in that range. Mobile keeps its approved
lower hero-copy composition. The About statement is one paragraph with consistent line rhythm and protected
phrases, the mobile Mondai label stays beside the title with its description below and card underlines remain a
desktop-only hover treatment.

## 2026-09-16: Updated VC Master supersedes the prior homepage composition

The owner's request to synchronize the live homepage to the current Figma `VC` page makes the latest `Master`
frame at node `3461:7711` the active desktop reference. Its 1440 by 7199.5 pixel composition supersedes the
earlier 10055 pixel revision and the correction pass that restored a 518 pixel hero pause.

The active desktop page now uses the Master's 169 pixel hero-to-work gap, asymmetric 787 by 520 and 505 by 485
project exports, side-by-side work cards and 11 pixel work-to-About transition. Within About, Superpowers comes
before the Mondai index, the three statements and the overview. The new 1041 pixel footer uses the two-row
equalizer, right-aligned Chicago-to-NYC callout, red contact control, LET'S plug CONNECT lockup and compact
location details. The existing 680 and 1160 pixel structural boundaries remain because the updated content still
fails cleanly at the same points. This change does not approve temporary personal copy or begin motion work.

## 2026-09-16: Responsive typography uses role-based tiers

The About statement uses 64 pixels on desktop, 40 pixels on tablet and 32 pixels on mobile with 1.09 line
height and negative 4 percent tracking. Mondai case rows use 40, 32 and 24 pixels with proportional 25, 22
and 20 pixel arrows. These tiers are the reusable starting point for equivalent roles on later pages, not a
single modular scale imposed on every text style.

CHADWICK, Superpowers, Mondai and LET'S CONNECT remain art-directed display words. Their Figma-specific
character tracking, scale behavior and intentional clipping take precedence over the shared supporting scale.
LET'S CONNECT grows from the 1440 reference through the 1920 canvas ceiling so its edge treatment does not
disappear on wider desktop viewports.

## 2026-09-16: Updated responsive work section supersedes the earlier card geometry

The latest `VC` Master keeps work at Figma node `3623:6385` but replaces its earlier card geometry. At the 1440
reference, Mondai is 895 pixels wide with a 591.242 pixel media frame. Haven is a 426 pixel square placed 39 pixels
to its right and bottom-aligned to the Mondai card. A later same-day Figma update changed the work band to 852.242
pixels and the complete Master to 7258.242 pixels. Both cards use a 20 pixel media-to-metadata gap and their links
end on the same baseline.

The live layout preserves the 895 to 426 relationship from 680 pixels upward and stacks both cards below 680
pixels. The full Haven description remains visible in the implementation. Figma currently places its 296 pixel
description inside a 426 pixel card after a 240 pixel title frame, which pushes copy beyond the page boundary.
That overflow is treated as a Figma layout defect, not an intentional clipping treatment.

## 2026-09-16: Work metadata reflows as one system

The updated Figma work section uses Metadata/12 in Space Mono Regular and Neutral 200 for the Mondai collection
marker. Both descriptions use Satoshi Medium at 14 pixels and Neutral 200. Their desktop maximum measures are
332.098 pixels for Mondai and 343 pixels for Haven.

At 1200 pixels and above, metadata retains its Figma row composition with at least 24 pixels between the leading
title group and trailing support copy. Below 1200 pixels both cards change together to a left-aligned vertical
stack with a 14 pixel gap. Haven does not switch independently even though its narrower card reaches the content
limit first. Mobile keeps the same left alignment and does not center or right-align either metadata group.

## 2026-09-16: Figma fidelity repair

The current `VC` nodes are authoritative for the footer, Mondai header and display-word typography. The footer uses
the 1041 pixel frame at node `3632:4000`, including its 12 pixel metadata row gaps, Space Mono 14 metadata, Satoshi
Medium 24 relocation copy and the proportional LET'S CONNECT lockup with per-character tracking. CHADWICK,
Superpowers and Mondai also keep their per-character Figma tracking at every viewport.

Mobile page margins are half the earlier compact margin, expressed as an 8 to 12 pixel responsive range. The
Superpowers heading keeps its proportional left crop on every viewport. The large About statement remains 64
pixels on desktop, 40 on tablet and 32 on mobile.

## 2026-09-16: Counterpart alignment overrides card-link alignment

The owner review establishes the work images, not the complete links, as the shared visual baseline. From 680
pixels upward, Mondai and Haven media bottoms align exactly and their metadata begins 20 pixels later. Desktop
support descriptions align to the project-name top edge. The Mondai collection marker may extend above that text
edge without moving either counterpart.

Display words preserve a constant width-to-canvas relationship across responsive sizes. Breakpoint-specific
minimum type sizes are not used for CHADWICK, Superpowers, the large Mondai heading or LET'S CONNECT. The Mondai
index marker aligns to the title top, while the description moves below the title in the compact composition.

## 2026-09-17: Tablet Mondai support stays within the title

From 768 through 1159 pixels, the Mondai index description uses 14 pixel type with 132 percent leading and begins
24 pixels below the collection marker. Its bottom edge may not extend below the Mondai title. The work-card media
baseline remains geometrically exact, including subpixel coordinates; differences in the green and purple source
imagery do not justify offsetting either card.

## 2026-09-17: Figma styles are an implementation contract

Every Figma-led frontend pass must inspect the current target node, its bound color variables and its assigned
text styles before implementation. Reusable values map to named CSS tokens carrying their Figma ids. Detached
art-directed display lettering remains a documented node-specific exception. Browser completion requires both
visual screenshot review and a successful asset-delivery check against the exact review URL.

The current footer at node `3632:4000` supersedes the 16 Sep red-control footer. It is 984.988 pixels high at
the 1440 reference, places the relocation copy on the left and uses the current 381.183 pixel LET’S vector,
164.491 pixel plug and 728 pixel CONNECT vector. Its metadata uses Metadata/14 and Neutral/100.

## 2026-09-18: Reusable text cannot inherit detached Figma values

The 27.018 pixel Mondai title and 28 pixel Haven title were detached values in the current Master, not named
members of the Portfolio type system. Both Figma nodes now use Heading/24 and keep their existing Neutral/050 and
Neutral/100 bindings. The browser uses the same fixed 24 pixel Medium treatment at every viewport.

Future Figma-led passes must inventory every text node before implementation. A detached reusable component label
is a source defect to resolve, not a value to copy into CSS. Documented per-character display lettering and the
footer plug lockup remain the only detached exceptions.

The current footer source is node `3664:5053`, 805.988 pixels high at 1440. Its opportunity copy uses Heading/20,
the metadata uses Metadata/Mono/14 and the footer content and node ids supersede the 17 Sep footer record.

## 2026-09-19: Current work and footer fidelity contract

The current work exports are 895 by 590 for Mondai and 426 by 426 for Haven. Their media bottoms and metadata
baselines align from 680 pixels upward, with a 24 pixel media-to-metadata gap. The current parenthesized collection
marker is Metadata/Mono/12 in Neutral/100. This amends earlier 591.242 pixel, 20 pixel gap and Neutral/200 records.

Footer opportunity copy, LET'S and metadata share one responsive left inset. Footer contact icons no longer set row
height. Both metadata columns use the same 12 pixel visual text gap. The full style audit also restores the 222 pixel
Superpowers circle, its three distinct statement colors and the Figma Overview border structure.

Temporary Figma holding frames and unapproved structural ordering are excluded from production synchronization.
Approved production order remains authoritative until an explicit owner decision changes it.

## Existing design direction

The portfolio should use an asymmetric, editorial and evidence-led layout grammar. Figma is the visual source of truth. The existing Haven and Mondai WIP frames are protected from direct edits unless explicitly approved.

## 2026-09-22: About copy review order and length

The current `VC` Master is the source for reviewing the assembled About content. Clarify how the body and adjacent sections communicate Chadwick's thinking as a designer before revising the short hero introduction. The hero should give readers a simple overview that draws them into the fuller page. Keep the total About content close to its current length by editing within the existing space rather than adding a long process explanation. These are review constraints, not approval of new copy.

## 2026-09-22: Superpowers content stays in place during this review

Chadwick confirmed that the current superpowers statement, star attribution and all three lines in the `VC` Master are settled for this pass. The hero offers a glimpse, the superpowers add selected strengths and the psychology paragraph expands on his systems thinking and its background. Pattern recognition, systems thinking and noticing what quietly affects an outcome are related but distinct. The About opener remains open as a possible transition into the psychology paragraph. Review the verbal processor material for whether it conveys how he works with people who think differently. This supersedes the same-day review note that proposed changing the superpowers content or cutting the opener solely for overlap.

## 2026-09-26: Homepage fidelity repair amendments

The About opening statement and its attribution always stack vertically. The attribution follows the statement as part of the same opening sequence, never as a parallel right column. The heading's three source lines must remain separate text nodes so responsive wrapping cannot join words across a removed break.

The relocation note is removed from the homepage header. The footer uses the current Figma arrow vector export, not a text-arrow substitute. Current Figma Master assets and bound colors are mandatory at their reference placements. Responsive implementation must preserve those source values while recomposing layout at content-driven boundaries.

## 2026-09-27: MetaLab layout destination

The approved MetaLab layout rebuilds belong in the `Case study layouts` section on the `VC` page of the Portfolio Design Figma file. The ten studies are layout references with scaffold copy and neutral media placeholders, not finished case studies. Haven, Mondai and the separate editorial exploration are outside this transfer.

## 2026-09-28: Homepage typography uses current node metrics

The current `VC` Master and the owner attribution amendment define the canonical homepage text metrics. The 27 September audit had verified colors and weights but had generalized tracking values across unrelated nodes. The 28 September pass corrected the hero biography and work descriptions to minus 1 percent tracking, work titles and Overview headings to normal tracking, and the individual Superpowers number and statement overrides. The collection marker retains its 12 pixel size on mobile. CHADWICK keeps the Figma per-character tracking as font-relative percentages so its spacing scales with the display size.

The attribution remains the owner exception: Satoshi Regular 400 at 16 pixels with normal tracking and `#c9c9da`. The current Figma node is not used to override that amendment. The retained Mondai dialog and skip link have no corresponding text nodes in the active Master, so their typography is verified as implementation UI rather than claimed as an exact Figma match.

## 2026-09-29: Homepage restyled from the current Master node values

A fresh read of every visible text segment in `VC` Master `3461:7711` replaced the 28 September values. Label/14 and Label/12 are Satoshi Regular 400 with positive tracking (1 percent and 8 percent); the 28 September entry had recorded minus 1 percent. The hero biography is `#d2d2db`, work descriptions `#dedee5`, Overview body Satoshi Medium 500 in `#e8e7ee`, work titles 20 pixels, the collection marker Satoshi Bold 12, and Superpowers Medium 500. Every Master text node uses cap height leading trim, so the browser applies `text-box: trim-both cap alphabetic` where Figma spacing is measured from trimmed text. The body uses grayscale font smoothing so light text on the dark background renders at the same visual weight as Figma. The footer arrow keeps the Figma vertical flip and the Haven card uses the current node export. The attribution owner exception and the removed relocation note stand.

## 2026-09-29: Homepage matches the current Master layout at 1440

The relocation note returns to the header at its Master position, superseding its 26 September removal. The page follows the current Master vertical rhythm: a 621 pixel pause between hero and work, a 750 pixel work section, 225 pixels to the About block and 225 pixels before the footer, for a 4630 pixel page. The Mondai case study list is paused and out of the flow. The attribution still stacks under the About heading, so the gap from it to Superpowers is shortened to keep Superpowers and everything below at their Master positions. CHADWICK scales with the viewport up to the 1920 ceiling with em based offsets, so its Master placement holds at every width.

## 2026-09-29: Pinned logo and navigation

Chadwick confirmed the logo and the three navigation links stay pinned while the page scrolls. The biography and relocation note belong to the hero and scroll away with it. Below 680 pixels nothing is pinned, because the navigation takes a full row there. The live Figma file outranks written instructions when they disagree.
