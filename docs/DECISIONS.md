# Portfolio decisions

## 2026-11-10: Tablet and mobile layout grids set

Chadwick set the responsive grids to follow the desktop grid. Tablet is 8 columns with 32px margins and 32px gutters. Mobile is 4 columns with 24px margins and 24px gutters. Desktop stays 12 columns with 40px margins and 40px gutters. All are stretch grids in Figma with no fixed column width. Margin equals gutter at every size so the page edge reads as one more gutter, and 12, 8 and 4 keep halves and quarters intact. Breakpoints are 1200 and 768. Full spec is in `docs/PROJECT_CONTEXT.md`.

## 2026-10-28: Haven uses Chadwick's corrected spacing

Chadwick said he fixed the extra frames and the upper and lower margins himself. The current Haven master is the source for implementation. Do not apply the earlier spacing review's proposals over those corrections. The local page update preserves the existing quiz and profile motion and integrates the previously built chat turn and five-card ending. These integrations remain candidates for his review.

## 2026-10-06: Chess pieces must retain partial translucency

Chadwick said the current pieces look too solid compared with the original object inspiration. He identified partial transparency and subtle shadowing from the hand as likely missing cues, and asked to inspect those references before further full-scene work. The original resin reference photo shows varying degrees of translucency across its pieces. `output/chess-portrait/14-translucent-contact/` tests the material in a close grip, but its result is not approved.

## 2026-10-06: Resolve hand contact before the background

Chadwick said neither recent full-scene preview made it look like he touched a chess piece. He said the simpler field direction might be better for lighting his face, but neither background felt right in the complete image. The immediate priority is to establish convincing physical contact between his hand and a piece. `output/chess-portrait/13-hand-contact/` is a close-up proposal for that interaction, not an approved portrait or final piece choice.

## 2026-10-06: Full chess portrait composite rejected

After seeing himself with the colored pieces, Chadwick said the person lighting looked wrong, the background might not work and the hand did not appear to touch any chess piece. He rejected the preview in `output/chess-portrait/11-portrait-color-preview/`. This reopens the final background and lighting direction without undoing his earlier approval of the board-only frame. The simpler evening image in `output/chess-portrait/12-lighting-reset/` is a new comparison, not an approved replacement.

## 2026-10-06: Low wave board framing accepted for the chess portrait

Chadwick reviewed the board-only scene in `output/chess-portrait/07-board-scene/` and said it looks good. Keep the low board placement and selected evening field as the visual frame. The original background and wave board remain separate. The complete board grid, individual piece positions, colors, person layer and likeness are still open.

## 2026-10-06: Original chess portrait inspiration identified

Chadwick identified `_ (33).jpeg`, the image of a person in a pink coat with a green building, as the original inspiration for the chess portrait. It and three additional low-angle chess photos are preserved in `output/chess-portrait/06-composition-reference/`. They inform camera height, hand scale and posing. The exact piece layout in the original is not a target to copy. The current six-piece placement study is provisional and must be judged against the preferred wave board's own cell geometry before color and person integration.

## 2026-10-06: Classic rounded resin forms for the chess portrait

Chadwick chose the top, classic rounded pink piece study as the preferred form direction. The study showed one of each of the six standard roles. The complete inventory study in `output/chess-portrait/05-complete-set/` repeats them at the standard counts for two sides of 16 pieces. Chadwick then pointed out that the bishop slit remained in later versions after a smooth correction was shown. The current overview and current gallery use only a smooth, uncut bishop. Final side colors and production-ready individual assets remain open.

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

## Existing design direction

The portfolio should use an asymmetric, editorial and evidence-led layout grammar. Figma is the visual source of truth. The existing Haven and Mondai WIP frames are protected from direct edits unless explicitly approved.
