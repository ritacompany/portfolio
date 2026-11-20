# Portfolio project context

## Purpose

Build a personal portfolio that presents work with an editorial, art-directed and evidence-led feel. The case-study system should be coherent without forcing each project into the same page template.

## Current visual source of truth

- Figma file: https://www.figma.com/design/IarvWaqjIwrZ2afQmMxKm6/Portfolio-Design?node-id=2672-35
- Figma page: `VC`
- Existing Haven and Mondai WIP frames must not be overwritten.

## Current work

The immediate design task is to inspect the Haven, Mondai and reference frames, then explore two or three real-content directions for Haven's Demographic Access section. Final copy, motion and asset production are later phases.

## Important guardrails

- Keep the existing Figma typography, colors and layout grids unless the owner explicitly changes them. All grids are stretch columns (no fixed column width), and margin always equals gutter:
  - Desktop (1200 and up): 12 columns, 40px margins, 40px gutters.
  - Tablet (768 to 1199): 8 columns, 32px margins, 32px gutters.
  - Mobile (under 768): 4 columns, 24px margins, 24px gutters.
- Use actual project material. Never fabricate claims, research results, participant counts or outcome metrics.
- Do not use generic dashboards, bento grids or repetitive text-and-image templates.
- Mobile should be deliberately re-composed, not simply collapsed from desktop.
- Building or reviewing a page in `site/`: the taste library's default yes entries apply wherever
  Figma leaves the choice open (the library is `taste/INDEX.md` in ritacompany/claude-harness, read
  through the taste skill or the repo; Figma and his rulings win, and a conflict goes to him with a
  pick). Before a page is called done, run `npm run taste` with `npm run dev` going and clear or
  explain every finding. Known and left on purpose: "Design system CS" ends on one word at 390
  (balance split the phrase, `reports/taste-2026-11-18/`). Decided by: Chadwick, 18 Nov 2026,
  "yes" to every page build applying the library's defaults and running its checks.

## Reference archive

`.handoff-review/claude-work-handoff/PORTFOLIO-HANDOFF.md` contains detailed case-study guidance. It is useful source material but this file, `docs/DECISIONS.md` and `NEXT.md` describe the current working state.
