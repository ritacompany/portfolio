# Portfolio project context

## Purpose

Build a personal portfolio that presents work with an editorial, art-directed and evidence-led feel. The case-study system should be coherent without forcing each project into the same page template.

## Current visual source of truth

- Figma file: https://www.figma.com/design/IarvWaqjIwrZ2afQmMxKm6/Portfolio-Design?node-id=2672-35
- Figma page: `VC`
- Current homepage source: `Master` frame `3461:7711`, inspected on 19 Sep 2026
- Existing Haven and Mondai WIP frames must not be overwritten.

## Current work

The current homepage task is the final Figma fidelity and responsive audit. The implementation maps the current
Portfolio color variables and shared text styles to named CSS tokens, uses the 19 Sep work and footer nodes and
rejects detached reusable text values. The responsive work rules and 1160 pixel compact header remain in force.
Temporary Figma holding frames are excluded until explicitly approved. Motion and final copy remain later phases.

## Important guardrails

- Keep the existing Figma typography, colors and 12-column desktop grid unless the owner explicitly changes them.
- Use actual project material. Never fabricate claims, research results, participant counts or outcome metrics.
- Do not use generic dashboards, bento grids or repetitive text-and-image templates.
- Mobile should be deliberately re-composed, not simply collapsed from desktop.

## Reference archive

`.handoff-review/claude-work-handoff/PORTFOLIO-HANDOFF.md` contains detailed case-study guidance. It is useful source material but this file, `docs/DECISIONS.md` and `NEXT.md` describe the current working state.
