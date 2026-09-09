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
4. Mark the section `approved` only after Chadwick accepts the written behavior.
5. Implement that section across the supported width range.
6. Verify the section at its anchor widths and widths between them.
7. Record evidence, then continue to the next section.

Do not build the whole responsive page before review. Do not separate closely related layout and interaction rules into different tasks. Motion remains a later scope.

Status values are `not discussed`, `draft`, `approved`, `implemented` and `verified`.

## Global foundation

### Approved

* The accepted 1440 homepage is the desktop visual reference.
* The desktop grid has 12 stretch columns, 40 pixel page margins and 40 pixel gutters.
* The responsive content canvas grows through 1920 pixels, then remains centered at that maximum.
* The desktop grid remains 12 stretch columns. Its margins grow from 40 pixels at 1440 to 64 pixels at 1920. Its gutters grow from 40 pixels at 1440 to 56 pixels at 1920.
* Margins, gutters and text also respond below the 1440 reference while the desktop structure remains viable.
* All text responds to viewport changes. Exact type values and structural reflow require section-level approval.
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

The Figma `Master` frame is not a flat fixed-position mockup. It uses vertical Auto Layout, a hugged height and a fixed 1440 pixel width. Its layout grid is 12 stretch columns with 40 pixel margins and 40 pixel gutters. The repeated section gap is 518 pixels.

The implementation cannot copy every Figma sizing mode literally because the file mixes reusable responsive intent with fixed art direction:

* The hero display word is a fixed 1540 pixel text layer positioned 50 pixels outside the 1440 frame. It has horizontal stretch and bottom constraints inside a clipped fixed-size hero frame.
* Work-card containers fill a 1360 pixel inner width inside 40 pixel margins. Their media areas use a fixed 528 pixel height. Several image-composition layers use fixed dimensions and absolute or unconstrained placement.
* The Mondai content container and list rows fill the inner width. Each number container starts at the row's left edge with a fixed 56 pixel width. The row text groups use hugged width and fixed internal spacing, which will need an explicit web rule when the columns narrow.
* Each Superpowers statement is a fill-width text layer with a Figma maximum width of 515 pixels. Its surrounding row is still a fixed 1440 by 532 pixel composition.
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
* Every text size in the prototype responds below and above the 1440 reference, including labels and readable-measure samples. Text blocks scale with their type where required to preserve line relationships. Growth stops at the 1920 ceiling.
* The prototype establishes the global responsive behavior. Exact type values remain subject to section-level approval.
* No structural breakpoint or section reflow is included.

The prototype was measured and captured at 1434, 1440, 1600, 1728, 1920 and 2048 pixels. It has no horizontal document overflow at those widths. Chadwick approved its wide canvas, margin, gutter, responsive-text and edge-resolution rules. Tablet, mobile and section-specific behavior remain unapproved.

## Section sequence

0. Global foundation, approved: canvas, grid, margins, gutters, type strategy and testing range
1. Hero and navigation, not discussed: header layout, display word, navigation links, link states and full-screen menu
2. Work cards, not discussed: images, metadata, views, card links and responsive stacking
3. Mondai index, not discussed: header, collection label, case rows, arrows and destination behavior
4. About, not discussed: quote, portrait, display word, superpower statements and overview rows
5. Footer, not discussed: callout, button, contact links, location and live clock placement

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
