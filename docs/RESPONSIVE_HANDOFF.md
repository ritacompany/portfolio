# Responsive homepage handoff

Updated: 11 Sep 2026

## Start here

The compact, tablet and mobile homepage is ready for one end-to-end implementation task.

Repository: https://github.com/ritacompany/portfolio

Starting branch: `codex/homepage-responsive`

Do not start from `main`. The default branch contains only the older desktop baseline. The completed
wide homepage work is on `codex/homepage-responsive`.

The repository is publicly readable. Remote connectivity and anonymous read access were verified on
11 Sep 2026. A cloud account still needs GitHub write permission if it will push changes.

## Accepted source

Treat these committed files as the accepted desktop source:

* `site/homepage-wide-study.html`
* `site/homepage-wide-study.css`
* `site/homepage-wide-study.js`

They preserve the approved desktop behavior from 1440 through 1920 pixels. The older
`site/index.html` and `site/styles.css` are still fixed at 1440 pixels. The responsive task must use
the wide study as its starting point and make the finished responsive version the canonical homepage.

Latest accepted wide commit before this handoff: `2c8807c Update wide homepage edge and navigation treatment`

## What the next task must do

Use one task with two internal passes, not separate tablet and mobile tasks.

1. Implement the complete homepage from 320 through 2048 CSS pixels.
2. Run the full browser, screenshot and repair loop until every acceptance gate passes.

The agent owns reversible breakpoint, grid, spacing, stacking, media-crop and responsive display-size
choices. It must preserve the desktop art direction and must not change copy, type family, type weight,
type style, colors or personal brand. It should not stop for intermediate section approvals.

The complete implementation prompt, viewport matrix, required skills, guardrails and acceptance gates
are in `docs/HOMEPAGE_RESPONSIVE_SPEC.md` under `New-task kickoff`.

## Prompt to paste into Claude Code or a cloud task

```text
$unlazy

Read AGENTS.md, CLAUDE.md, docs/RESPONSIVE_HANDOFF.md, docs/DECISIONS.md,
docs/FRONTEND_WORKFLOW.md, docs/HOMEPAGE_RESPONSIVE_SPEC.md and NEXT.md.

Start from the existing codex/homepage-responsive branch. Execute the complete instructions under
New-task kickoff in docs/HOMEPAGE_RESPONSIVE_SPEC.md. Complete the entire responsive homepage in one
task with two internal passes. Do not stop for section approvals or routine responsive choices.
Implement, test, capture and inspect every required screenshot, fix every material defect, rerun the
affected checks and report only when the complete page is ready for review.
```

## Required record updates

Before reporting completion, the implementation task must update:

* `docs/HOMEPAGE_RESPONSIVE_SPEC.md` with actual breakpoint values, behavior and verification evidence
* `NEXT.md` with the next real project priority

Do not rely on prior chat history. This repository is the handoff.
