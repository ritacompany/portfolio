# Fix: card transition was built onto the retired collection page

Status: not verified

## Evidence
Bad output: docs/motion/card-transition/style_guide.md names Multi-CS Model `5812:22999` as the end frame, and all three directions land on its intro paragraph and badge rows (PR #39, test build Vk1mZz4hirZJi9pVuHxnwR).
Expected: the transition lands on the new collection page from frame `6331:27875` (the Mondai wordmark, the "Case study collection" label and three image cards). Chadwick ruled on 20 Nov that it replaces 5812:22999. It also had to start from that session's provisional page change (title grows into the next page's title, docs/motion/page-transition/style_guide.md on that branch).

## Chain
Input: missing. The new page exists only on branch claude/mondai-collection (draft PR #30), which targets claude/relaxed-ride-5mlbdu, not main. main still serves the old page at /mondai/.
Instruction: the brief said "into the Mondai collection page (site/mondai/index.html)" and "start from main". TRACKER.md says state lives in files on main.
Loaded: CLAUDE.md, TRACKER.md rows H11 and H13, the motion rules and the /mondai/ page on main were all read. None of them mention 6331:27875.
Conflict: docs/DECISIONS.md on main has no 20 Nov entry. The retirement record exists only in the PR #30 commit 01b8bbb.
Enforcement: nothing. No step lists open PRs or branches that touch the page being built on.
Check: `git log --all` on the /mondai/ page file, or listing open PRs that touch it, would have shown PR #30 before any build.

## Causes
- Cause 1: the decision and the new page never reached main, so every session that starts from main sees the retired page. | For: DECISIONS.md on main lacks the 20 Nov entry, and PR #30 is a draft into a side branch. | Against: none found.
- Cause 2: this session did not search branches for newer work on the page it was building on. | For: the PR list and branch log found PR #30 in two commands after his note. | Against: the brief was explicit about the file and about starting from main.
History: fixes/2026-11-21-cursor-reference-never-opened.md (a different failure: work began without opening the source). The cursor button in PR #30 also overlaps the site cursor merged in PR #34, which is a sign of the same split.
Chosen cause: Cause 1. Main is where every session starts, and it carries the retired page as current.

## Layer
Layer: 2
Fix the source: put the 20 Nov decision and the new page on main.
Why not earlier layers: layer 1 is part of the same move, retiring the old page on main.
Replaces: n/a

## Check
Check: on main, `grep -c 6331:27875` over the /mondai/ page and docs/DECISIONS.md returns nonzero.
Result on bad output: FAIL. On main both counts are 0.

## Change
Files changed: none yet. Landing PR #30 changes the shipped site, so it waits on his yes (site review gate).
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done; it waits on the change.
Before: transition lands on 5812:22999.
After: not run.
Check result after: not run.
Second case: not run.
Enforcement test: n/a

## Report
Unverified: the fix itself waits on his decision to land PR #30 (or its decision entry) on main. Until then, any rebuild of the transition has to start from the PR #30 branch so it lands on the new page.
