# Repository handoff, verified 7 Sep 2026

This file replaces the stale Mondai session handoff from 5 to 6 Sep 2026. That handoff's
band, hero and About work is not active work. Do not resume it from this file.

## Verified repository state

- `main` tracks `origin/main`. At the start of this review, the working tree was clean and
  local `main` was three commits ahead of `origin/main`: `38a1b41`, `904a64e` and `c8c413b`.
- The GitHub remote exists and `origin/main` already contains repository history. The old
  task to authenticate this Mac and make the first upload has therefore been superseded.
- `now.md` does not exist and is not tracked. `.claude/settings.json` does not inject it.
  `.claude/hooks/intake-probe.mjs no-injection` treats the absence of `now.md` as the expected
  state.
- `.claude/settings.json` injects `.claude/portfolio-rules.md` on prompt submission, runs
  `copy-check.sh` after Write or Edit and runs the archive and record intake guards before
  matching write operations.
- `.claude/settings.local.json` runs `dead-claim-check.sh` at Stop. This local setting is not
  part of the tracked project configuration.
- `copy-check.sh` checks em dashes, en dashes and an exact pair of hyphens in newly written
  Markdown, HTML and text. It does not check Oxford commas. Prose rules that are not checked
  by this script remain written instructions.
- The copy check still rejects CSS custom properties and command flags that begin with two
  hyphens when an Edit fragment does not include enclosing style or code markup. Synthetic
  payloads containing `--color` and `--help` reproduced the defect during this review.

## Current priority

`NEXT.md` is the source of truth for the next actions. Repository synchronization and Vercel
setup come before a newly chosen portfolio implementation scope. The old band, hero and About
drafts are not queued.

## Removed unsupported material

The prior handoff included correction rates, instruction counts and a claimed reliability
ceiling without recording the source set, classification rules, calculation or command needed
to reproduce them. Those measurements have been removed. Their removal means they were not
auditable from the repository, not that this review proved them false.
