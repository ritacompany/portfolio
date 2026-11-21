# CS2 handoff

<!--
The resume point for CS2 on either account. Whoever picks CS2 up reads this first, then
WORKING_LOOP.md. Rewritten, never appended: it says where things stand now, not a history.

Claude Code rewrites it at every save, at 75% and 90% of the 5 hour limit (the usage hook says when),
and whenever the stop hook asks; then commits and pushes. The browser account never edits this file in
GitHub: its new version goes in the return packet (BROWSER_MODE.md), and Claude Code saves it.

Format, checked by check-handoff.mjs: the four header lines, then every heading below with something
under it (None if nothing). Section and loop step use the numbers in CS2_PROCESS.md. The repo is
public and his record never goes in git, so no quotations from the research: name the file in
~/Documents/CS2-research/ instead.
-->

Updated: 2026-11-21 13:20
By: Claude Code
Section: 3
Loop step: 4

## Where it stopped

The framework page is built in code on branch claude/relaxed-ride-5mlbdu, site/mondai/framework/. On 20 and 21 Nov a lead chat (session_01NtNprpF2S84rwN3GY1iDpG) ran his page review through parallel sessions, one branch and draft PR each. Figma source: file Desktop 1 (MVP) 5RO0m4bYYrTvbiaOgaU3tI, page CS 5658:1061, frame "mondai framework cS most current" 6331:20607; his tablet frames in section 6340:30057 (Start of week templates 1 to 5 included); new collection page 6331:27875. The Portfolio Design file IarvWaqjIwrZ2afQmMxKm6 is stale for CS2.

Combined work: branch claude/fw-integration holds the working branch plus #31 (sync and desktop fixes: darker hero paragraph, nav and title spacing, Rescheduling 32 heading to body, Schedule view intro on one line, Rollover icon centred, footer from his frame marked not final, rail block eyebrow renamed Target and pace), #32 (his v4 Rollover row, section animates in as a whole), #26 (Capacity card overlay at tablet), #28 (his four tablet frames built in, 768 to 1159 from the grid), #29 (popover gradient fades in below the selected card) and #33 (Foundation diagram Pathway by Pathway, order Branding then Networking; #33 is already merged into the working branch). Every tablet, motion, sync and build check passes on it (lead ran them 21 Nov; three outdated checks were updated to his 20 Nov rules in bf55291). Review preview of it, 390, 768 and 1440: https://claude.ai/artifact/RK6mHiZRn1DHdUg13mDZ3A. On 21 Nov, at his yes, the working branch claude/relaxed-ride-5mlbdu was fast forwarded to claude/fw-integration, so both now hold all of it.

Running on 21 Nov, each PRs into claude/relaxed-ride-5mlbdu: fixes round 2 (session_01NtNprpn8h42gEu6mo3DqDR, branch claude/fw-fixes-round2: Rescheduling issue he still sees at desktop and tablet, Target and pace image missing on the left, other Schedule view mismatches); Start of week tablet (session_01NtNprpbbC9k3oXd6qCy4Ao, claude/fw-start-of-week-tablet: card text bigger at tablet, side fades at 768 scaled to the viewport from his adjusted template, no gap above the dots; in Figma, text layers hug and his gradient on all five templates); Start of week copy (session_01NtNprpjQEbdZJq48MP1sdh, claude/fw-start-of-week-copy: every template description at most three lines at 1440, proposals for his yes first).

Separate PRs: #24 review preview standard (docs/REVIEW_PREVIEW.md, scripts/review-preview/), #25 footer humanizer report (words wait on his yes), #27 Figma location registry (waits on his yes before it becomes a rule), #30 Mondai collection page, cursor button, page change built as provisional (no settled transition record found; session_01NtNprre3q34uGCT52zKqq9 asked him).

## Next action

Merge each running session's PR into claude/relaxed-ride-5mlbdu as he approves it, rerun the checks listed in Where it stopped, and republish the review preview to the same link.

## Decided in chat, not yet in files

- Review format from 20 Nov: the real page at 390, 768 and 1440 in one published viewer, no other widths (in PR #24, not merged).
- Tablet frames are the target at 768 only; 768 to 1159 follows from the grid, never fixed positions; his tablet text widths are fixed on purpose.
- Rail block eyebrow Target and pace; the Rollover block keeps Falling behind. His Figma frame still says Falling behind on the rail block.
- Popover gradient starts below the selected card: the session's reading, his yes not given; his Figma frame still has the old gradient.

## Open questions for Chadwick

- Footer words (PR #25) and the Figma location process (PR #27).
- The settled page transition between home, collection and framework (PR #30 session).
- Phone fixes for the framework page against Haven (reports/mobile-breakpoint/ISSUES.md, ten measured differences): yes or no.
- Remove #26's leftover .capdemo grid rule, now inert after #28.

## Waiting for Claude Code

- After each merge: republish the preview, update docs/SITE_BUILD_PLAN.md loop log (he has not tried the tablet build on a device yet).
- Earlier items still open: voice pass and three line headline rule not enforced by a hook; the copy hook flags CSS custom properties as dashes.

## Read first

- This file, then reference/cs2/WORKING_LOOP.md
- claude/relaxed-ride-5mlbdu and the PR list above; each session's reports/<name>-2026-11-2x/GATES.md
- docs/REVIEW_PREVIEW.md on claude/review-preview-standard
- His Figma frames named in Where it stopped
- mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md (attach ritacompany/mondai first)
