# Homepage responsive and behavior specification

Status: planning in progress

This file is the working source of truth for homepage responsiveness and non-motion behavior. It exists so Codex, Claude Code and future tasks can continue without reconstructing decisions from chat history.

## Authority

Use sources in this order:

1. Explicit owner-approved decisions in `docs/DECISIONS.md`
2. Entries marked `approved` in this specification
3. The accepted 1440 implementation in `site/`
4. The Figma `Master` frame at node `3461:7711`
5. Entries marked `draft` in this specification
6. Conversation history

A recent message amends only the rule it directly addresses. It does not silently replace unrelated approved rules. When a new request conflicts with an approved entry, record the amendment before implementation.

## Working method

First define the global grid and canvas rules. Then work through the homepage one section at a time.

For each section:

1. Inspect the accepted 1440 reference.
2. Record layout, resizing, reflow and visibility behavior.
3. Record links, controls, states and other non-motion behavior belonging to that section.
4. Build the strongest evidence-based recommendation as a reversible study. Do not require Chadwick
   to design the responsive solution before it can be tested.
5. Follow `docs/FRONTEND_WORKFLOW.md`: verify anchor widths and widths between them, inspect every
   fresh capture, correct defects and repeat until the complete pass is clean.
6. Present one verified recommendation. Mark it `approved` only after Chadwick accepts any decision
   reserved to him, then apply the rule to the homepage.
7. Record the decision and verification evidence, then continue to the next section.

Do not build the whole responsive page before review. A section study may be implemented and tested
while its design status remains `draft`. Do not separate closely related layout and interaction rules
into different tasks. Motion remains a later scope.

Status values are `not discussed`, `draft`, `approved`, `implemented` and `verified`.

## Global foundation

### Approved

* The accepted 1440 homepage is the desktop visual reference.
* The desktop grid has 12 stretch columns, 40 pixel page margins and 40 pixel gutters.
* The responsive content canvas grows through 1920 pixels, then remains centered at that maximum.
* The desktop grid remains 12 stretch columns. Its margins grow from 40 pixels at 1440 to 64 pixels at 1920. Its gutters grow from 40 pixels at 1440 to 56 pixels at 1920.
* Margins, gutters and text also respond below the 1440 reference while the desktop structure remains viable.
* Responsive type scaling is reserved for large display headlines. Body text, labels, navigation and supporting headings retain their approved font sizes while their containers and positions may respond.
* Large display type may bleed beyond the canvas without creating horizontal scrolling.
* When the content canvas reaches its eventual maximum and outer browser space begins to appear, display words must no longer look cropped against that empty space. Their bleed should resolve gradually to a full-width fit by that endpoint.
* Mobile is deliberately recomposed rather than treated as a scaled desktop page.
* Small fidelity differences may wait for the final audit after responsiveness is complete.
* Current copy is temporary layout content and is not approved for shipping.
* Font families, weights, styles and other typography design choices remain under Chadwick's control. Responsive type sizing will be proposed and approved section by section.

### Working recommendation

* Keep one centered editorial content canvas with full-bleed backgrounds where the design calls for them.
* Use CSS Grid for page alignment, Flexbox for simple rows and normal document flow for text.
* Use fluid values for continuous changes such as page margins, gutters and selected display sizes.
* Use breakpoints only where content needs to reflow, disappear, appear or change structure.
* Keep absolute positioning only for intentional art direction such as overlap or edge bleed.
* Between 1440 and 1920, continue growing the grid and gradually reduce the display-word crop. Above 1920, center the canvas and allow outer browser space.

### Open decisions

* Minimum page margin
* Minimum gutter
* Column behavior below desktop
* Smallest supported viewport
* Exact content-driven breakpoint locations

## Figma layout audit

Status: inspected, responsive interpretation still requires owner approval

The Figma `Master` frame is not a flat fixed-position mockup. It uses vertical Auto Layout, a hugged height and a fixed 1440 pixel width. Its layout grid is 12 stretch columns with 40 pixel margins and 40 pixel gutters. The 10 Sep revision reduces the major section gap to 11 pixels.

The implementation cannot copy every Figma sizing mode literally because the file mixes reusable responsive intent with fixed art direction:

* The hero display word is a 1523 pixel text layer positioned 47 pixels outside the 1440 frame. It has horizontal stretch and a bottom constraint inside a clipped hero that follows the visible viewport height.
* Work-card media and metadata containers are centered at 1124 pixels wide and 464 pixels high at the 1440 reference. Mondai uses the black card composition. The green field remains in Figma only as an experiment. Several image-composition layers use fixed dimensions and absolute or unconstrained placement.
* The Mondai content container and list rows fill the inner width. Each number container starts at the row's left edge with a fixed 56 pixel width. The row text groups use hugged width and fixed internal spacing, which will need an explicit web rule when the columns narrow.
* Each Superpowers statement keeps its Figma text measure as a minimum in the wide study: 515 pixels for the first two and 481 pixels for the third. This prevents any statement from becoming taller than two lines while its column 2 start remains on the responsive grid. The current wide block is 809 pixels high. At 1199 pixels and below, the annotated stress composition uses 431 pixel vertical padding and grows intrinsically so the text cannot collide with the overview.
* The Overview and Current role rows fill the 1360 pixel inner width. Their main text layers fill remaining row space with a Figma maximum width of 654.5 pixels.
* The portrait layer is fixed at 258 by 339 pixels. The inspection API did not return a usable aspect-ratio lock value, so preservation of that ratio must be treated as a design rule to confirm rather than inferred from Figma metadata.
* The footer callout intentionally overhangs the 1440 frame. The contact button is a fixed 270 by 76 pixel frame, not a Hug contents component.

No minimum width values were defined on the inspected major frames. Figma therefore gives useful alignment, fill, hug and fixed-size evidence, but it does not supply a complete responsive specification by itself.

## Wide desktop foundation prototype

Status: approved

The isolated review page is `site/responsive-foundation.html`. It tests the global wide-screen system without changing the accepted homepage in `site/index.html`:

* The content canvas grows from 1440 to an approved 1920 pixel ceiling, then centers inside wider browser space.
* Page margins grow continuously from 40 to 64 pixels.
* Grid gutters grow continuously from 40 to 56 pixels.
* The grid remains 12 equal stretch columns throughout this range.
* CHADWICK and CATCHY OUTRO retain their intentional 1440 bleed, then reduce that bleed continuously until the text fits the canvas at 1920.
* Superpowers retains its intentional 1440 edge overlap, then resolves continuously until it fits the canvas at 1920.
* CHADWICK, Superpowers and CATCHY OUTRO respond below and above the 1440 reference, then stop growing at the 1920 ceiling. Prototype notes, labels and readable-measure samples remain fixed at their 1440 font sizes.
* The prototype establishes the global responsive behavior. Exact type values remain subject to section-level approval.
* No structural breakpoint or section reflow is included.

The prototype was measured and captured at 1434, 1440, 1600, 1728, 1920 and 2048 pixels. It has no horizontal document overflow at those widths. Chadwick approved its wide canvas, margin, gutter, responsive-text and edge-resolution rules. Tablet, mobile and section-specific behavior remain unapproved.

## Section sequence

0. Global foundation, approved: canvas, grid, margins, gutters, type strategy and testing range
1. Hero and navigation, approved for wide desktop: header layout, display word, navigation links and link states. Compact navigation and the full-screen menu remain open
2. Work cards, approved for wide desktop: images, metadata, views, card links and responsive stacking
3. Mondai index, approved for wide desktop: header, collection label, case rows, arrows and destination behavior
4. About, wide-desktop study ready for review: quote, portrait, display word, superpower statements and overview rows
5. Footer, wide-desktop study ready for review: callout, button, contact links, location and live clock placement

### Hero and navigation

Status: approved for wide desktop

* Desktop reference: the accepted Figma-based hero at 1440 by 800 pixels.
* Elements and reading order: logo, biography, relocation note, primary navigation and CHADWICK.
* Alignment anchors: logo begins at the leading page margin. The biography starts 121 pixels after that margin at 1440. The relocation note starts 467 pixels after the leading page margin and navigation ends at the trailing page margin. All four top-row groups share the 24 pixel top alignment.
* Fluid values: the hero fills the visible viewport height. CHADWICK remains anchored to its bottom edge with a proportional 0.13 em crop while growing from 302 pixels at 1440 to 376.5 pixels at the 1920 ceiling. The page margins, gutters and horizontal anchors continue following the approved responsive grid.
* Display behavior: CHADWICK starts at 302 pixels with a 47 pixel left bleed at 1440. It grows to 376.5 pixels and resolves to the canvas edge at 1920. Its bottom anchor is independent of browser height so the display stays visible at the bottom of a shorter window. Its detached Figma styling is represented by the approved custom tracking runs: C and the second C use negative 7 percent tracking, HA and W use negative 5 percent, I uses negative 8 percent and the final K inherits negative 5.5 percent.
* Fixed values: biography and relocation text use Label/14 throughout the wide study. Biography width is 306 pixels at 1440 and becomes 268 pixels at 1199 pixels and below. Navigation stays at 14 pixels at 1200 and above, then uses 12 pixels. The logo stays 60.458 by 17.92 pixels, the top position stays 24 pixels, relocation width stays 179 pixels and the 76 pixel navigation gap stays fixed. Font families, weights, colors, copy and navigation labels remain the accepted values. Current copy is still temporary layout content.
* Reflow rules: none in this wide-desktop study. Structural changes below the viable desktop range will be defined separately.
* Visibility or replacement rules: all wide-desktop top-row elements remain visible. The logo and three navigation links are sticky. The biography and relocation note only align with that menu at the top of the page, then scroll away with the hero. The menu button and full-screen menu are not part of this study.
* Breakpoint triggers: 1920 pixels is the growth ceiling. The 1199 pixel annotation boundary centers the final quote line and gives the Superpowers statement block 431 pixel top and bottom padding. The final compact-header structure remains open.
* Default, hover, focus and active states: navigation preserves its accepted default color, underlines and brightens on hover, uses a visible two pixel keyboard-focus outline and shifts to Neutral 500 while pressed. States have no animation.
* Click or keyboard behavior: links retain the existing homepage anchors. Each link has at least a 44 pixel-tall interaction area and remains reachable in source order by keyboard. Sticky behavior does not trap focus or change the reading order.
* Content growth and wrapping: biography keeps its accepted fixed width and wrapping. Relocation and navigation labels remain on one line in the wide range.
* Accessibility requirements: semantic navigation, visible focus, no horizontal page overflow and no text clipping except the intentional CHADWICK edge treatment.
* Intentional exceptions: CHADWICK is art-directed and may remain absolutely positioned. Header content uses normal grid placement.
* Open questions: the compact-layout breakpoint, tablet composition, mobile composition, menu button and full-screen menu remain deliberately open.
* Verification evidence: isolated study at `site/hero-navigation-study.html`, measured at 1434, 1440, 1600, 1728, 1920 and 2048 pixels.

### Work cards

Status: approved for wide desktop

* Desktop reference: the accepted 1440 implementation in `site/`, supported by a fresh Figma extraction of node `3461:26549`.
* Source decision: current Figma reports 528 pixel Mondai media and 463 pixel Haven media. Chadwick explicitly replaced both values with a shared 464 pixel media-container height at the 1440 baseline.
* Elements and reading order: Mondai card followed by Haven card. Each card contains media, title, optional collection label, description, tags and view cue.
* Alignment anchors: both cards center their media and metadata at 78.055556 percent of the canvas, which is 1124 pixels at 1440. Titles and tags align to the media leading edge. Descriptions and view cues align to the media trailing edge. Mondai uses the black card composition.
* Fluid values: both media containers preserve their 281 by 116 aspect ratio, derived from 1124 by 464 pixels, so their height grows with the card width through the 1920 pixel canvas ceiling. The new flattened Figma renders are stored locally and cover the containers.
* Fixed values: title remains 24 pixels, collection label remains 12 pixels and all descriptions, tags and view cues remain 14 pixels. The 24 pixel media-to-metadata gap and 103 pixel inter-card gap remain fixed in the wide range. Work begins 11 pixels after the hero.
* Reflow rules: none in this wide-desktop study. The two metadata rows retain their leading and trailing groups.
* Visibility or replacement rules: no card content is hidden or replaced in the wide range.
* Breakpoint triggers: 1920 pixels is the growth ceiling. The first metadata reflow breakpoint remains open until the cards are tested below the wide range.
* Default, hover, focus and active states: the entire card is one link. Title and view cue underline and brighten on hover, the card receives a visible two pixel keyboard-focus outline and title and view cue shift to Neutral 500 while pressed. States have no animation.
* Click or keyboard behavior: each whole card has one link in source order. Final destination URLs remain open because no approved case-study routes exist in `site/` yet.
* Content growth and wrapping: descriptions retain their 295 pixel measure and may wrap. Metadata uses minimum heights rather than fixed clipping boxes so longer approved copy can increase the card height.
* Accessibility requirements: meaningful media alternatives, one link per card, visible focus, logical reading order, preserved image ratio and no horizontal overflow.
* Intentional exceptions: imagery grows while supporting type remains fixed. The green Mondai field visible in Figma is an excluded experiment. The homepage sequence remains Mondai then Haven.
* Open questions: compact and mobile composition remain open.
* Verification evidence: combined study at `site/homepage-wide-study.html`, measured and captured at 900, 960, 1024, 1194, 1200, 1434, 1440, 1600, 1728, 1920 and 2048 pixels. The 1440 Hero and Work captures were compared directly with fresh Figma references.

### Mondai index

Status: approved for wide desktop

* Desktop reference: the accepted 1440 implementation in `site/`, supported by a fresh Figma extraction of node `3461:27892`.
* Elements and reading order: Mondai heading, collection label, product description, then three numbered case-study rows.
* Alignment anchors: the list fills the canvas between responsive page margins. Every number sits in grid column 1, every case title begins in grid column 4 and every arrow ends in grid column 12. These anchors follow the responsive 12-column grid rather than retaining a fixed number-to-title gap.
* Fluid values: the Mondai display heading uses a two-stage bounded range. It grows from 148 pixels at 1024 to 212 pixels at 1440, then more slowly to 236 pixels at 1728 and stops. Its header frame and section spacing follow the same bounded behavior. The section width, case-title anchors and trailing arrows follow the approved responsive canvas, margins and gutters through the 1920 pixel ceiling.
* Fixed values: the product description remains 16 pixels, the collection label remains 12 pixels and case-list text remains 40 pixels. Row heights, arrows, color, type family, weight, copy, item order, hairline borders and the three-row structure retain the accepted values.
* Reflow rules: none in this wide-desktop study. Header and case rows keep their desktop structure.
* Visibility or replacement rules: no section content is hidden or replaced in the wide range.
* Breakpoint triggers: 1440 pixels changes the headline growth rate. The heading reaches its wide-size ceiling at 1728 while the canvas continues through 1920. Structural tablet and mobile compositions remain open.
* Default, hover, focus and active states: each complete row is one link. The title underlines and brightens on hover, the row receives a visible two pixel keyboard-focus outline and its text shifts to Neutral 500 while pressed. The arrow responds with brightness or opacity. States have no animation.
* Click or keyboard behavior: all three links follow source order. Placeholder same-page fragments are used because final case-study routes have not been approved.
* Content growth and wrapping: the product description uses up to its approved 355 pixel measure, wraps within the remaining header width and never extends beyond the canvas. Its bottom edge stays aligned with the visible bottom of the Mondai title through the shared header frame. The collection label stays at the top of that same frame and keeps its relative position beside the title. Case titles remain on one line through the tested range.
* Accessibility requirements: semantic ordered list, one descriptive link per row, decorative arrows with empty alternatives, visible focus and no horizontal overflow.
* Intentional exceptions: the Mondai heading uses the detached Figma tracking for its M and a. Its bounded fluid range is deliberately shorter and smaller than CHADWICK so the fixed 16 pixel description does not become visually disconnected.
* Open questions: compact and mobile title sizes and composition remain open.
* Verification evidence: isolated study at `site/mondai-index-study.html`, measured at 900, 960, 1024, 1200, 1434, 1440, 1600, 1728, 1920 and 2048 pixels. The 1440 capture is compared directly with the accepted homepage section. Interaction checks cover hover, pressed and every keyboard-focus stop. The narrowest layout also covers the 200 percent browser-zoom equivalent.

### About

Status: draft, wide-desktop study ready for review

* Desktop reference: the Figma About frame at node `3461:27984`, extracted directly from the Master frame and captured at 1440 pixels.
* Elements and reading order: three-line quote with bolt, supporting intro, portrait, Superpowers display, three superpower statements, Overview row and Current role row.
* Alignment anchors: quote and intro start at the leading page margin. The portrait occupies grid columns 9 through 11 and aligns its right edge to the end of column 11. Every superpower statement begins in column 2. The first two keep a 515 pixel minimum measure and the third keeps a 481 pixel minimum measure, preserving a maximum of two lines for each statement at 786 pixels and above. Overview labels begin in column 1. Overview copy begins 8.1667 pixels before column 8 at the 1440 reference and ends at the trailing margin.
* Fluid values: Superpowers is the only responsive type in the section. It begins at 248 pixels with the Figma 40 pixel left overlap at 1440. It grows to 344 pixels and resolves to the canvas edge by 1920. The heading frame grows enough to preserve the complete letterforms. Margins, gutters, portrait anchor, statement anchor and overview-copy anchor follow the approved grid.
* Fixed values: quote stays 64 pixels, intro and overview copy stay 24 pixels, statements stay 40 pixels and the portrait stays 258 by 344 pixels. The three statements share one 809 pixel block with 230 pixel vertical padding and 65 pixel gaps. Overview content keeps Neutral 050.
* Reflow rules: below 1100 pixels the quote lines may wrap and increase the opening area rather than collide. The statement measures stop shrinking before a third line can form. A future tablet or mobile composition must move the text block or change its typography rather than narrow these three measures. The wide composition otherwise remains intact.
* Visibility or replacement rules: no About content is hidden in the wide study.
* Breakpoint triggers: 1100 pixels only releases the Figma line-by-line quote positioning for narrow stress behavior. The Superpowers display reaches its growth ceiling by 1920.
* Content growth and wrapping: intro and overview blocks grow vertically when their fixed-size type wraps. Their rows use minimum heights so text is never clipped.
* Accessibility requirements: meaningful portrait alternative, decorative bolt with an empty alternative, logical source order, no horizontal scrolling and no clipped supporting text.
* Intentional exceptions: Superpowers keeps its detached Figma tracking and art-directed edge treatment. It may clip at the canvas edges below 1920, then must fit completely at the canvas ceiling.
* Open questions: owner approval of the demonstrated wide composition. The current second superpower mirrors the Figma draft but is not recorded as locked About copy. Tablet and mobile composition remain open.
* Verification evidence: combined study at `site/homepage-wide-study.html`, checked at 786, 900, 960, 1024, 1194, 1200, 1434, 1440, 1600, 1728, 1920 and 2048 pixels. The three statement line counts and measures are tested at every width. The 1440 About capture is compared directly with the fresh Figma reference.

### Footer

Status: draft, wide-desktop study ready for review

* Desktop reference: the Figma footer frame at node `3461:7986`, extracted directly from the Master frame and captured at 1440 pixels.
* Elements and reading order: CATCHY OUTRO display, fixed call-to-action button, Chicago location, live Chicago time, LinkedIn label and email link.
* Alignment anchors: the call-to-action stays centered. Location follows the leading page margin. The contact group aligns to the trailing page margin. Those anchors continue through the 1920 canvas ceiling.
* Fluid values: CATCHY OUTRO begins at 212 pixels with a 29 pixel left overlap at 1440. It grows to 263.5 pixels and resolves inside the canvas by 1920. The callout grows from 595 to 700 pixels so the larger display retains clear separation from the button.
* Fixed values: button stays 270 by 76 pixels with 24 pixel text. Footer contact text stays 20 pixels at 1200 pixels and above, then uses 14 pixels below 1200 pixels. The purple contact field stays 343 pixels high.
* Reflow rules: none in the wide study. Compact and mobile recomposition remain separate work.
* Visibility or replacement rules: no footer content is hidden.
* Default, hover, focus and active states: the button and email link have visible hover, keyboard focus and pressed states. No state uses motion.
* Click or keyboard behavior: the approved email address uses a mail link. LinkedIn remains text because no verified profile URL is recorded in the project. Button copy and its final destination remain unchanged because the Figma source still labels it `Button` and no approved destination exists.
* Content growth and wrapping: contact lines remain on one line in the verified wide range. The location and contact groups stay separated.
* Accessibility requirements: a semantic email link, visible focus, at least 44 pixel interaction targets, machine-readable time and no horizontal overflow.
* Intentional exceptions: CATCHY OUTRO uses detached Figma tracking and intentional edge overlap below the canvas ceiling.
* Open questions: the LinkedIn profile URL plus final button copy and destination remain owner decisions. Tablet and mobile composition remain open.
* Verification evidence: combined study at `site/homepage-wide-study.html`, checked at 900, 960, 1024, 1194, 1200, 1434, 1440, 1600, 1728, 1920 and 2048 pixels. The hero also has explicit height checks at 1194 by 775, 1440 by 800 and 1440 by 1000. The 1440 footer capture is compared directly with the fresh Figma reference. The live clock is verified against `America/Chicago`.

## Compact, tablet and mobile execution plan

Status: recommended plan, no compact or mobile layout approved or implemented

### Recommendation

Do not split future tasks by breakpoint. Tablet and mobile are coupled expressions of the same
responsive system, so separating them would duplicate discovery and encourage contradictory CSS.
Use one future task per homepage section, take that section from the widest approved state through
compact, tablet and mobile behavior, then review it before the next section begins.

Keep every section on one responsive branch and one semantic HTML structure. Use separate commits
for the foundation and each verified section, subject to the existing requirement that Chadwick
approves the branch and commit purpose first. A separate branch is justified only for a competing
art direction that may be discarded.

### Preflight dependency

The responsive source is not yet consolidated. `site/index.html` and `site/styles.css` remain the
accepted fixed 1440 implementation, while the newer wide behavior and semantic improvements live in
`site/homepage-wide-study.html`, its CSS and its JavaScript. About and footer are still draft wide
studies awaiting review. The current working tree also contains uncommitted responsive work.

Before compact or mobile implementation begins:

1. Review the combined wide study and resolve the remaining About and footer decisions.
2. Reconcile the accepted wide study into the canonical homepage files without changing its approved
   1440 appearance.
3. Capture a clean 1440 baseline plus the approved wide anchors.
4. Explain the responsive branch and first commit boundary, then receive Chadwick's approval before
   creating either.

Starting breakpoint work before this consolidation would create two responsive sources and force the
same structural decisions to be made twice.

### Content-driven breakpoint method

Breakpoint names are working ranges, not device classes and not preset media-query values. Use this
method to find the actual structural boundaries:

1. Shrink the consolidated homepage continuously from 1440 to 320 CSS pixels in a real browser.
2. Log the first width where each section loses hierarchy, collides, clips, produces horizontal
   overflow, creates weak empty space or forces an unreadable measure.
3. Fix continuous pressure with intrinsic layout, percentages, `minmax()`, `clamp()` or wrapping.
4. Add a media query only when the composition must change structure, visibility or reading order.
5. Place that boundary at the last width where the stronger composition still works, not at a named
   device width.
6. Recheck the boundary minus one pixel, at the boundary, the boundary plus one pixel and one midpoint
   between adjacent boundaries.

The working hypothesis is two structural transitions, one from wide to compact or tablet and one
from compact to mobile. That hypothesis must be rejected if the failure log shows that one transition
is enough or that a specific section needs a local container query. Exact values remain open until
the consolidated page is stress-tested.

Use 320 CSS pixels as the initial minimum-width target. Change that target only if product or audience
evidence establishes a different support floor. Probe 1199, 1100, 1024, 960, 900, 834, 768, 640, 480,
430, 390, 360 and 320 pixels during discovery. These are test samples, not approved breakpoints.

### CSS architecture

1. Keep one DOM and preserve logical source order at every width.
2. Make the smallest composition the base CSS, then enhance it with content-driven minimum-width
   queries for compact and wide layouts. Preserve the approved wide formulas inside the wide range.
3. Centralize page margin, gutter, column count, section rhythm and display-size values as custom
   properties so changes are traceable instead of repeated across selectors.
4. Use Grid for page alignment, Flexbox for simple rows and normal flow for copy. Keep absolute
   positioning only for the approved display-word overlap and other intentional art direction.
5. Use container queries only when a component's own width controls its reflow. Do not add them to
   page-level sections where viewport queries express the behavior more clearly.
6. Remove fixed page and text-container heights as sections are recomposed. Preserve media ratios and
   use minimum heights only where an art-directed field needs them.
7. Do not create separate tablet and mobile HTML pages. Isolated studies are temporary review surfaces,
   then approved behavior returns to the canonical homepage.

### Variables that must be resolved

#### Global canvas and grid

* Minimum supported width, page margins, safe-area insets, gutter size and compact or mobile column count
* The exact content failures that trigger the structural boundaries
* Full-bleed fields versus text and controls that remain inside the content margins
* Section spacing, hairline continuity and removal of the fixed 10055 pixel page-height assumption
* Behavior at 200 percent browser zoom and at short landscape heights

#### Typography

* Only large display words may scale, per the approved type rule
* Minimum and maximum sizes, wrapping versus intentional clipping and custom tracking at each composition
* Readable measure for biography, descriptions, quote, statements, overview and footer contact text
* Typography family, weight and style remain Chadwick's decision, as do perceptual mobile display sizes

#### Navigation

* The content failure that replaces desktop links with the menu trigger
* Sticky scope, scroll layering, anchor offsets, focus order and at least 44 pixel hit areas
* Trigger label or icon, open and closed semantics, focus management, Escape behavior, scroll lock and safe areas
* The full-screen menu remains a later task after the trigger composition is approved

#### Hero

* `svh` or `dvh` behavior, minimum height, short-landscape behavior and browser chrome changes
* Biography and relocation placement, visibility and wrapping in the recomposed layouts
* CHADWICK scale, overlap and crop without document overflow

#### Work cards and media

* Card width, image ratio, crop or art-directed mobile asset and image loading behavior
* Metadata stacking, label placement, description measure, tag wrapping and View cue placement
* One-link semantics, focus treatment and useful alternative text

#### Mondai index

* Heading and supporting-label composition, description placement and row rhythm
* Number, title and arrow alignment once the 12-column wide grid no longer fits
* Case-title wrapping, row growth and complete-row target behavior

#### About

* Quote line wrapping, bolt attachment, portrait placement and preserved portrait ratio
* Superpowers display treatment, statement widths and vertical rhythm
* Overview and Current role stacking, source order and readable measure
* No personal copy may be changed as part of responsive layout work

#### Footer

* CATCHY OUTRO fit, call-to-action placement and contact-field height
* Location, time, LinkedIn and email stacking plus long-address wrapping
* The button copy and destination plus LinkedIn URL remain owner-held decisions

#### Accessibility and content resilience

* Keyboard order, visible focus, menu focus management, semantic landmarks and descriptive link names
* Actual 200 percent browser zoom, forced colors, text-spacing overrides and large text
* 44 pixel minimum targets, non-overlapping hit areas and safe-area padding
* Long approved copy, temporary copy changes, image failure and web-font loading
* No motion is in this scope, but later motion must respect reduced-motion preferences

### Execution sequence

#### Phase 0: Consolidate and baseline

Resolve the wide-study review, move accepted behavior into the canonical homepage and capture the clean
reference. This is a prerequisite, not compact or mobile implementation.

#### Phase 1: Foundation, hero and navigation

Derive the compact and mobile canvas rules from the stress sweep. Recompose hero and header together,
because display width, sticky navigation, biography placement and the menu trigger compete for the same
space. Stop for review once one fully tested recommendation covers both tablet and mobile.

#### Phase 2: Work cards, then Mondai index

Use a separate task for each section. Carry each section through both structural ranges, verify it and
record its breakpoint cause before moving to the next. Work cards come first because they establish the
media, metadata and horizontal-margin behavior reused lower on the page.

#### Phase 3: About, then footer

Use a separate task for each section. About gets its own task because it has the highest density of
art-directed relationships and text-growth risks. Footer follows after page margins, display treatment
and stacking behavior are stable.

#### Phase 4: Full-screen menu and integration audit

Build the full-screen menu only after the compact trigger is approved. Then run one full-page pass for
section transitions, sticky layering, anchors, accumulated vertical rhythm, interaction states, browser
coverage and regressions at every approved width.

### Future task boundaries

Use these tasks in order:

1. Wide-source consolidation plus the compact and mobile foundation, hero and navigation
2. Work cards across compact, tablet and mobile
3. Mondai index across compact, tablet and mobile
4. About across compact, tablet and mobile
5. Footer across compact, tablet and mobile
6. Full-screen menu plus full-page responsive audit

Each task must begin by reading the authority files listed in the handoff requirements below. It owns
only its named section plus shared tokens that are necessary for that section. Every task updates this
specification with the actual failure point, chosen rule, reviewed widths, corrected defects and status.

### Verification plan

Automate the repeatable checks, then perform visual judgment on the fresh output. Automation cannot
certify hierarchy or art direction.

For each section:

1. Run the continuous width sweep and geometry checks for overflow, clipping, image ratio, computed
   target size, DOM order and console errors.
2. Test the accepted 1440 reference, every structural boundary, boundary minus one pixel, boundary plus
   one pixel, one midpoint between boundaries, 320 pixels and a width above the 1920 canvas ceiling.
3. Include representative portrait and landscape viewports, especially 1024 by 768, 768 by 1024,
   844 by 390, 430 by 932 and 390 by 844.
4. Test keyboard order, visible focus, hover, pressed state, touch targets and actual 200 percent browser zoom.
5. Capture fresh screenshots at every decisive width. View every capture and compare 1440 with the accepted
   baseline. Review the whole set for hierarchy, rhythm, alignment, measure, crop and accidental empty space.
6. Record defects, fix them and rerun the affected deterministic and visual checks until a complete pass
   finds no material defect.
7. Run one smoke pass in current Safari, Chrome and Firefox. Include iOS Safari and Android Chrome on real
   devices when available. If real-device coverage is unavailable, record it as not verified.

The section is complete only when the approved desktop appearance still holds, every supported width is
usable, no unreviewed capture remains and this specification contains the evidence.

### Skills, tools and plugin decision

Use the installed `responsive-design` and `better-layout` skills to derive content-driven structure. Use
the installed `playwright` skill for browser sweeps, computed-geometry checks, state checks and fresh
screenshots. Use `accessibility-test-plan` and `design-qa-checklist` to define the manual checks. Use
`unlazy` to keep section acceptance gates visible through implementation and re-verification.

Use the existing Figma connector only to read the Master node, inspect constraints and export current
reference screenshots or assets. The browser implementation remains the responsive source because Figma
does not define the missing minimum widths or reflow rules. Do not generate separate device frames as a
substitute for testing the real page.

No additional plugin is needed. The available workplace connectors do not contribute responsive design
or browser testing capability. Marketplace conclusion: the popular external responsive-design skills
overlap the installed skill and the project-specific workflow, while lower-adoption audit skills add no
coverage that is missing from the installed Playwright, accessibility and design QA stack. Installing more
guidance would add process variance without removing a real blocker.

Marketplace review recorded 10 Sep 2026:

* `responsive-design` at https://skills.sh/supercent-io/skills-template/responsive-design overlaps the
  installed responsive skill
* `responsive-craft` at https://skills.sh/kylezantos/responsive-craft/responsive-craft adds a similar
  describe-first workflow but no capability missing from this plan

### Acceptance gates for every implementation task

* The section has one written responsive rule set covering compact, tablet and mobile
* Every breakpoint is tied to a recorded content failure, not a device preset
* The accepted 1440 composition has no material regression
* The section passes from 320 through 2048 CSS pixels without accidental horizontal scrolling
* Text is not clipped, media is not distorted and interaction targets remain usable
* Keyboard, focus, menu behavior where applicable and actual 200 percent zoom are verified
* Every decisive fresh screenshot has been viewed, defects have been corrected and checks rerun
* Approved rules plus evidence are recorded here before the task ends
* No typography, personal-brand copy or art-direction decision is silently changed

### New-task kickoff

Start the next task with this instruction:

> Read `AGENTS.md`, `CLAUDE.md`, `docs/PROJECT_CONTEXT.md`, `docs/DECISIONS.md`,
> `docs/FRONTEND_WORKFLOW.md`, `docs/HOMEPAGE_RESPONSIVE_SPEC.md` and `NEXT.md`. Follow the Compact,
> tablet and mobile execution plan. Work only on the next incomplete phase. Treat exact breakpoints as
> content-driven findings. Do not split tablet and mobile into separate implementations. Preserve the
> accepted 1440 baseline, use the Figma Master only as reference and complete the browser plus visual
> verification loop before asking for review.

## Section decision template

Copy this structure for each section before implementation:

### Section name

Status: not discussed

* Desktop reference:
* Elements and reading order:
* Alignment anchors:
* Fluid values:
* Fixed values:
* Reflow rules:
* Visibility or replacement rules:
* Breakpoint triggers:
* Default, hover, focus and active states:
* Click or keyboard behavior:
* Content growth and wrapping:
* Accessibility requirements:
* Intentional exceptions:
* Open questions:
* Verification evidence:

## Git and task method

Recommended sequence:

1. Commit the accepted desktop baseline on `main` before responsive CSS begins.
2. Create one branch named `codex/homepage-responsive`.
3. Commit the global foundation separately.
4. Commit each implemented and verified section separately.
5. Merge only after the complete responsive audit passes.

Do not create separate branches for each section, interaction rules or tablet behavior. Those changes touch the same HTML and CSS and would create avoidable merge conflicts. Use a separate branch only for a genuinely competing implementation that may be discarded.

Before creating the branch or making any commit, explain what the operation will preserve, what work it will contain and why it is the right checkpoint. Wait for Chadwick's approval before running it.

Keep this planning work in the current task. Another task may research a narrow tool or technique, but its result has no authority until it is reconciled into this specification or `docs/DECISIONS.md`.

## Verification record

The final viewport list will be set after the global foundation is approved. Every implemented section must be checked at:

* the accepted 1440 reference
* each approved structural breakpoint
* at least one width between adjacent breakpoints
* the smallest supported viewport
* a width above the maximum content canvas

Checks must cover horizontal overflow, text clipping, unexpected wrapping, image distortion, interaction states, keyboard access and consistency with approved section rules.

## Handoff requirements

Before changing the responsive homepage, another tool or task must read:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `docs/PROJECT_CONTEXT.md`
4. `docs/DECISIONS.md`
5. This specification
6. `NEXT.md`

The handoff must identify the current section status, approved rules, open decisions, changed files and latest verification evidence. Chat history alone is never the handoff.
