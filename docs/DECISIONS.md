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
without creating horizontal scrolling. The `Superpowers` letterforms must remain fully visible.
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
but it must resolve to a full-width fit by the maximum so cropped letters never sit beside empty outer
browser space.

Codex must explain the purpose and scope of a proposed branch or commit, then receive Chadwick's
approval before creating it. The planned responsive implementation remains one branch with separate
reviewable commits for the foundation and each verified section.

## 2026-09-08: Wide desktop responsive foundation approved

The responsive content canvas grows through 1920 pixels, then remains centered at that maximum.
The 12-column grid retains the accepted 40 pixel margins and 40 pixel gutters at 1440 pixels.
Margins grow fluidly to 64 pixels and gutters grow fluidly to 56 pixels at 1920 pixels. These values
also respond below the 1440 reference while the desktop structure remains viable.

All text must respond to viewport changes rather than remaining frozen at the 1440 reference. Exact
type values and structural reflow still require section-level approval. CHADWICK, Superpowers and
CATCHY OUTRO retain their intentional edge overlap at 1440 pixels, resolve it continuously and fit
inside the canvas at 1920 pixels. None of that bleed may create horizontal page scrolling.

## 2026-09-09: Wide hero and navigation approved

The 1440 hero retains the updated Figma spacing and detached custom tracking for CHADWICK. Only
CHADWICK changes type size across the wide desktop range. Biography text remains 16 pixels,
navigation text remains 14 pixels and the logo remains 60.458 by 17.92 pixels. Their horizontal
positions follow the responsive grid while their sizes and custom internal spacing remain fixed.

The logo and navigation links remain sticky as the page scrolls. The biography and relocation note
align with them at the top of the hero but scroll away with the hero because they are not menu
content. Navigation retains visible hover, focus and pressed states without motion.

## Existing design direction

The portfolio should use an asymmetric, editorial and evidence-led layout grammar. Figma is the visual source of truth. The existing Haven and Mondai WIP frames are protected from direct edits unless explicitly approved.
