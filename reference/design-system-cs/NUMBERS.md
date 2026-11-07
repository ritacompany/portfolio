# Design system case study: efficiency and outcome numbers

Measured 6 Nov 2026 from the Mondai records (git on a full fetch of main, the cloud chat transcripts,
the close out audits, the check ledger and two live reads of the Figma library file). Every number
has what it measures, its baseline, how it was measured, where it comes from, a mark and the outline
section it serves. Sources are Mondai repo paths unless marked otherwise. Mondai is a private repo, so the paths
are for checking, not for readers.

Marks:
- **CONFIRMED**: counted from a record or re-measured by command or Figma read on or after the date given.
- **ESTIMATE**: a floor, a forecast, a self report by the agent that did the work, or a count whose
  method has a known gap. The gap is named in the row.

Outline sections: 1 opening; 2 the problem; 3 foundations made readable; 4 library and usage rules;
5 making it scale; 6 still imperfect.

Corrections to figures that were circulating before this pass:
- Journey Advisement did not take 20 days. It was two sprints: the mentor experience took 10 active days to its handoff and the mentee experience 6, five of them shared (N4, N5).
- Buttons did not go to "two widths" across the 236 buttons. The two width rule (104 and 232) was set
  on 26 Sep and applied only to the Cohorts screens; nobody has recounted the 236 since (N19).
- Spacing did not go from 800 to 677. 677 was a forecast; the measured result was 669 bound, 122 left
  raw, then 30 raw. The 800 has no surviving scan (N20).

## Speed: strategy to handoff, counted only on days the work could run

Method for N1 to N7. A sprint runs from its strategy capture commit to its handoff, in local time
(America/Chicago). Only **active days** count: a day with at least one commit under the sprint's folder or one
chat turn in its chats that ran and did not end in an error. Days with no activity at all, which is when the account was out of
usage or he was waiting for it to come back, are left out of every number. Hours are **working hours**:
Claude's turn time plus his reading and reply time (gaps under 30 minutes), so nights, waits and outages
are not in them either. Journey Advisement is two sprints, the mentor experience (`journey-advisement/`)
and the mentee experience (`student-advisement/`), measured separately; they shared five days, which count
in both.

Earlier drafts of this file used calendar days and clock hours from first flows to merge. Those include
the waiting days, so they are not used.

### N1 Peer Connect baseline: 5 active days
- **Measures:** days of real work from the strategy screenshots to the merged handoff, the sprint before the design system rebuild took hold.
- **Baseline:** this is the baseline.
- **Method:** window 20 to 26 Sep (capture commit 7a4f7361 to the merge of PR #70, 7aeec655). Active: 20, 22, 24, 25 and 26 Sep. 21 Sep had no commit or chat anywhere in the repo; 23 Sep had commits, but all on design system boards, none on Peer Connect. The process review places capture on 20 and 21 Sep, so if 21 Sep counts the baseline is 6. 39 state frames at its Figma build (commit 397fa8f1); 55 on its page by 22 Oct. Working hours are not usable: its 20 to 23 Sep chats are not in the cloud listing (2.4 hours found, a floor).
- **Source:** `design-system-ai/evidence/timing/2026-11-06/active-days.json` and `days.py`; `process/PROCESS-REVIEW.md` lines 20 to 30; `design-system-ai/evidence/timing/README.md`.
- **Mark:** CONFIRMED (5, or 6 with the review's 21 Sep)
- **Section:** 1, 2

### N2 Studio (Intelligent Career Tools 1): 4 active days, 42 screens
- **Measures:** the same span for the latest sprint, built on the rebuilt library with the checks and harness in place.
- **Baseline:** Peer Connect 5 active days for 39 states (N1).
- **Method:** window 28 to 31 Oct (capture 8dc4615b to the approved handoff, PR #254 merge 19dfa368); all four days active. 42 screens in the close out audit of 31 Oct. Working hours at least 9.9 (8 of its 13 chats only partly read).
- **Source:** `active-days.json` as N1; `intelligent-career-tools-1/CLOSEOUT.md` lines 1 to 4; `intelligent-career-tools-1/README.md` lines 8 and 11; `design-system-ai/evidence/timing/2026-11-06/per_feature.json`.
- **Mark:** CONFIRMED (days and screens); ESTIMATE (hours, a floor)
- **Section:** 1, 5

### N3 Mentor events: 6 active days, 69 screens
- **Measures:** the same span for the sprint before Studio.
- **Baseline:** Peer Connect (N1).
- **Method:** window 18 to 23 Oct (capture 959a99d5 to the handoff, PR #201 merge 0857125d); all six days active. 69 screens in the 23 Oct close out audit (23 base screens and 46 states). Working hours at least 8.3 (5 of 14 chats only partly read).
- **Source:** `active-days.json` as N1; `mentor-events/closeout/audit-2026-10-23d.json`; `process/sprint-review-2026-10-28/timeline.md` section 3; `design-system-ai/evidence/timing/2026-11-06/per_feature.json`.
- **Mark:** CONFIRMED (days and screens); ESTIMATE (hours, a floor)
- **Section:** 1, 5

### N4 Journey Advisement, mentor experience: 10 active days to its handoff
- **Measures:** the first of the two sprints run under the heavy eight stop process, before the library and checks were rebuilt.
- **Baseline:** Peer Connect (N1).
- **Method:** window 27 Sep (capture d5b4be28, the evening of 27 Sep local) to 9 Oct (stage 5 handoff built in Figma, fc265406). Active: 27 Sep to 2 Oct and 6 to 9 Oct. 3 to 5 Oct had no activity anywhere in the repo, after a session stopped at the usage limit on 2 Oct. Working hours 20.7 to the handoff (9.8 Claude, 11.0 his), then 5.3 more on fixes before its close out passed on 99 screens. Its PR merged later, on 17 Oct, which is why the earlier draft's merge based span was wrong.
- **Source:** `active-days.json` and `hours.py` as N1; `design-system-ai/evidence/timing/per_turn.json` (turns split by chat title); `journey-advisement/README.md` line 8; `process/SPRINT-AUDIT-2026-10-02.md` line 187.
- **Mark:** CONFIRMED (days); ESTIMATE (hours: a floor, and chats are assigned to mentor or mentee by title)
- **Section:** 2

### N5 Journey Advisement, mentee experience (Student Advisement): 6 active days to its handoff
- **Measures:** the second of the two heavy process sprints.
- **Baseline:** Peer Connect (N1).
- **Method:** window 2 Oct (capture 2ad1f855) to 14 Oct (PR #155 merge 81686364). Active: 2, 6, 7, 8, 9 and 14 Oct. 3 to 5 and 10 to 13 Oct had no commit anywhere in the repo; 10 Oct shows only two chat turns a minute apart that both ended in an error within seconds, consistent with the account being out of usage, so it is not counted. Five of its days (2 and 6 to 9 Oct) it shared with the mentor sprint. Working hours 12.7 to the handoff (5.6 Claude, 7.1 his), 1.5 after. 72 approved and handed off screens.
- **Source:** as N4; `student-advisement/README.md` line 10; `process/review-2026-10-14/README.md` line 23.
- **Mark:** CONFIRMED (days, recounted from git by a separate agent); ESTIMATE (hours, as N4)
- **Section:** 2

### N6 Screens per active day: about 8 to 12 throughout
- **Measures:** output on the days the work could run.
- **Baseline:** Peer Connect 39 states over 5 days, 7.8 a day (11.0 on the 55 its page later held; 6.5 or 9.2 if 21 Sep counts).
- **Method:** screens at handoff over active days: mentor experience 99 over 10 (9.9, its 99 counted at close out, after its handoff); mentee 72 over 6 (12.0); both together 171 over the 11 distinct days they used (15.5, because they ran side by side); Mentor events 69 over 6 (11.5); Studio 42 over 4 (10.5).
- **Source:** N1 to N5.
- **Mark:** CONFIRMED (inputs); the ratio is arithmetic on them
- **Section:** 1, 5
- **Reading:** a day of work produced about the same number of screens before and after the rebuild. What changed is what those screens carried (N9) and how few days a sprint took (Studio 4 against Peer Connect's 5 and the mentor sprint's 10). Do not claim the library made screens faster to draw.

### N7 Working hours, and fix time against build time
- **Measures:** hours of real work per sprint, and whether fixing what came back cost more than building it.
- **Baseline:** mentor experience: 20.7 hours to the handoff, of which building screens 8.8 and fixes and handoff 7.0, then 4.6 more fix hours after the handoff (11.6 fixing in all, more than the 8.8 building).
- **Method:** as N4, by stage from chat titles. Mentee: 12.7 hours, screens 3.9, fixes and handoff 1.7 before and 1.5 after. Mentor events: at least 8.3 hours, screens at least 3.9, fixes and handoff at least 0.8. Studio: at least 9.9 hours, no chat titled for fixes or handoff, so no split. Screens per working hour: mentor 3.8 (99 over 26.0 through close out), mentee 5.7 (72 over 12.7), Mentor events at most 8.3, Studio at most 4.2; Peer Connect has no usable hours.
- **Source:** `design-system-ai/evidence/timing/2026-11-06/hours.py` and `per_feature.json`; `design-system-ai/evidence/timing/per_turn.json`.
- **Mark:** ESTIMATE (every figure is a floor; about 6 Claude hours of the two Journey Advisement sprints are unread, by the README)
- **Section:** 2, 5

### N8 Commits on the feature after its handoff merged: 24, 12, 7, 2
- **Measures:** how much fixing a handoff needed once it was on main.
- **Baseline:** Journey Advisement 24 commits after its merge, the last on 30 Oct.
- **Method:** non merge commits on main under each feature folder authored after the PR merge that carried its handoff to main (mentor 17 Oct, mentee 14 Oct, Mentor events 23 Oct, Studio 31 Oct) (`git log --no-merges --since=<merge time> origin/main <folder>`; counting by ancestry instead gives 27 and 19 for the first two, because branches merged later carry older commits). Student Advisement 12 (last 4 Nov); Mentor events 7 (last 4 Nov); Studio 2 (both 4 Nov). Repo wide sweeps that touch a folder are included, and Studio has had six days since its merge against Journey Advisement's twenty, so the later rows are not yet like for like.
- **Source:** git, feature folders as named.
- **Mark:** ESTIMATE (the counts are exact; the windows are unequal)
- **Section:** 5

## Quality: what reached him and what came back

### N9 Faults known to the Figma check, handed off in the screens without his ruling: 596, then 97, then 0, then 0
- **Measures:** design system faults (unbound tokens, fixed text, missing text styles, off ladder spacing, two primary buttons) that the automated Figma check finds in each handed off feature.
- **Baseline:** Journey Advisement 596 faults on 99 screens, about 6.0 a screen.
- **Method:** count of entries in each feature's `closeout/craft-baseline.json`, the faults found when the check first ran and set aside so only new ones block. Student Advisement 97 on 72 screens (1.3 a screen). Mentor events 22, all on A1.3 and A3.2, whose hero is his own existing home screen cloned unchanged, so 0 of the agents' own; a further 7 stay on his ruling (margins he changed and a smaller checkbox he chose), listed in `mentor-events/CRAFT-OK.md`. Studio has no baseline file: 0. The two early sprints were measured after the fact (16 Oct, commit 349d056e); the two later ones were built under the rule that a Figma change ends only with the check clean, so their zero is the gate holding.
- **Source:** `journey-advisement/closeout/craft-baseline.json`; `mentor-events/CRAFT-OK.md`; `student-advisement/closeout/craft-baseline.json`; `mentor-events/closeout/craft-baseline.md` lines 3 to 8; `ops/craft/features.json`; `ops/check-ledger.md` line 26.
- **Mark:** CONFIRMED
- **Section:** 1, 5

### N10 Close out on Journey Advisement: 99 open items to 6 to clean
- **Measures:** the handoff audit that checks every screen against the flows and his reviews.
- **Baseline:** 99 open on 14 Oct.
- **Method:** close out runs; 6 open on 19 Oct (commit ee5a2e59); CLOSEOUT OK on 99 screens on 21 Oct 00:29 UTC, the evening of 20 Oct local (commit a19c6493). Mentor events and Studio reached CLOSEOUT OK at handoff.
- **Source:** `process/audit-2026-10-14-misses/ATTACK-2.md` line 106; git as given.
- **Mark:** CONFIRMED
- **Section:** 5

### N11 Issues raised after a session called the work done: 35, of which agents found 9 first (26%)
- **Measures:** how often a done claim was wrong, and who caught it.
- **Baseline:** this is the baseline, Journey and Student Advisement to 14 Oct. It became one source of the map gate and the close out.
- **Method:** the 14 Oct audit classified 136 issues: these 35, 92 from review rounds 0 to 5 and 9 from the call screens.
- **Source:** `process/audit-2026-10-14-misses/FINDINGS.md` lines 74 to 76; `process/audit-2026-10-14-misses/RECHECK.md` line 8.
- **Mark:** CONFIRMED
- **Section:** 2
- **No after figure:** no equivalent count exists for Mentor events or Studio.

### N12 His review rounds and comments per sprint
- **Measures:** how many times he had to look, and how much he found each time.
- **Baseline:** Student Advisement 5 numbered rounds (asks per round 30, 40, 33, 9, 2 by the 14 Oct count).
- **Method:** one row per distinct ask in each round's review file. Mentor events 9 rounds over three days (21 to 23 Oct), 84 comments (17, 2, 13, 5, 6, 15, 14, 8, 4). Studio 5 rounds, 63 asks (8, 9, 13, 12, 21). Three counts of Student Advisement exist with different units (119, 114, 92 asks); the 14 Oct one is used.
- **Source:** `process/audit-2026-10-14-misses/evidence/history.md` lines 110 to 114; `process/sprint-review-2026-10-28/repeats.md` lines 118 to 130; `process/sprint-review-2026-10-28/timeline.md` section 3; `intelligent-career-tools-1/screens/REVIEW-1.md` to `REVIEW-5.md` and `intelligent-career-tools-1/CLOSEOUT.md`.
- **Mark:** CONFIRMED
- **Section:** 5, 6
- **Reading:** rounds did not fall; Studio's last round was its largest. Not a speed claim.

### N13 Share of his comments that repeat an earlier one
- **Measures:** whether the system stopped him having to say the same thing twice.
- **Baseline:** Cohorts 20% (5 of 25); Journey Advisement 2 Oct round 18% (6 of 34); Student Advisement rising 23%, 35%, 42%, 44% over rounds 1 to 4.
- **Method:** a comment is a repeat when the same ask appears in an earlier round of the sprint or in a record dated before the sprint. Mentor events 41 of 84 (49%) overall, 26 of them from before the sprint; by round 65%, 0%, 69%, 20%, 17%, 33%, 43%, 63%, 75%; within the sprint, rounds 2 to 9, 19 of 67 (28%). Studio 14 of 63 (22%) overall, by round 0 of 8, 1 of 9, 0 of 13, 5 of 12, 8 of 21; 12 of those 55 asks (22%) repeat an earlier round of the sprint, the measure comparable with Mentor events' 28%. These come from tags the building session wrote itself, which undercount (at least three round 3 asks tagged new carry repeat wording).
- **Source:** `process/audit-2026-10-14-misses/evidence/history.md` lines 96 to 114; `process/sprint-review-2026-10-28/repeats.md` lines 5 to 21 and 118 to 131; `intelligent-career-tools-1/screens/REVIEW-1.md` to `REVIEW-5.md` (Asks tables).
- **Mark:** CONFIRMED for Cohorts, Journey Advisement, Student Advisement and Mentor events; ESTIMATE (a floor) for Studio
- **Section:** 6
- **Reading:** this belongs in still imperfect. Repeats did not fall cleanly; within a sprint they still climb in late rounds.

## Checks that catch agent mistakes

### N14 Checks proven on planted mistakes: 10 ledger rows to 74
- **Measures:** checks proven on planted mistakes before their pass counts.
- **Baseline:** 10 rows in the check ledger at the end of 14 Oct (commit 18a93e47), when the audit found only 7 of the 45 check scripts proven.
- **Method:** data rows in the ledger at the last commit of 14 Oct, against the ledger read 6 Nov: 74 rows dated 28 Sep to 4 Nov; 66 plain PASS, 3 FAIL, 4 mixed (PASS on one part, FAIL or not yet a gate on another), 1 with no verdict.
- **Source:** `process/audit-2026-10-14-misses/FINDINGS.md` lines 138 to 139; `ops/check-ledger.md` (and its 14 Oct state in git).
- **Mark:** CONFIRMED
- **Section:** 5

### N15 Two early checks on planted mistakes: label check 5 of 6 then 6 of 6; grid audit 27 of 33
- **Measures:** whether a check catches the faults it exists for.
- **Baseline:** the first run of each.
- **Method:** planted mistakes in copies of a real census (label check, 26 Sep, fixed on the same copies); synthetic pages with no Figma access (grid audit).
- **Source:** `ops/check-ledger.md` lines 52 to 54.
- **Mark:** CONFIRMED
- **Section:** 5

### N16 The screen critic: false alarms 10 of 10 to 6 of 10; catches 10 of 10 to 8 of 10
- **Measures:** an agent critic that reviews a round before he sees it, scored on 20 frames he had already judged (10 he failed, 10 he approved).
- **Baseline:** first version flagged all 10 approved frames.
- **Method:** blind run of 20 fresh agents on the same 20 frames, 4 Nov, after the critic's load was cut from 129 KB to 55 KB and its verdict calibrated. Four of the six remaining false alarms name checkable faults. Ledger verdict: findings pass, verdict not yet a gate.
- **Source:** `ops/check-ledger.md` lines 73 and 79; `mondai/kit/SCREEN-BRIEF.md` line 138; commit c704ad9c (its message gives the 129 KB to 55 KB load).
- **Mark:** CONFIRMED
- **Section:** 5, 6

### N17 Agent usability test, before: about 31 mistakes a build
- **Measures:** mistakes a fresh agent makes building a known screen from the library alone (wrong token, wrong component, raw value, wrong spacing).
- **Baseline:** this is the before record (three runs, 22 Oct).
- **Method:** rows in the three score files: 25, 29 and 38, mean 30.7. The written record regroups rows (24, 30, 40, mean 31.3); both round to 31. The after run has not happened; the test pages were deleted on 23 Oct and the protocol plans the rerun.
- **Source:** `design-system-ai/evidence/agent-test/score-run1.json` to `score-run3.json`; `design-system-ai/evidence/AGENT-TEST-BEFORE.md` lines 60 to 77 (method and plan), 92 to 96 (totals) and 193 (pages deleted).
- **Mark:** CONFIRMED (before); no after
- **Section:** 2, 5

### N18 One agent built three screens in Figma in 9.7 minutes
- **Measures:** a fresh agent building straight into Figma from the library.
- **Baseline:** the HTML drawing of the same screens took 3.2 minutes with the Figma build still to do.
- **Method:** one build, 39 Figma calls, 187k tokens, nothing left to build (8 Oct). One build shows it can work, not that it always does.
- **Source:** `process/screens-in-figma/screens-in-figma.html` lines 82 to 88; `mondai/reference/DECISIONS.md` line 396.
- **Mark:** CONFIRMED
- **Section:** 5

### N26 Hook log, 4 Nov to 6 Nov midday: 45 turn stops, 10 blocked (22%), 15 waived (33%)
- **Measures:** how often the turn check stops an agent's reply before it reaches him.
- **Baseline:** none: logs before 4 Nov were never committed, so there is no per sprint figure.
- **Method:** `node ops/hooks/log-summary.mjs` on the committed logs, 6 Nov, leaving out the session that measured this file (its own stops would count it twice).
- **Source:** `ops/hooks/log-summary.mjs`; the hook logs in `ops/hooks/`.
- **Mark:** CONFIRMED
- **Section:** 5
- **No baseline:** listed as such.

### N27 Replay set of past corrections: 31 of 50 passing to 43 of 64
- **Measures:** how many of his past corrections the process now holds when replayed.
- **Baseline:** 31 of 50 (28 Oct, first baseline).
- **Method:** replay scores at each baseline commit: 35 of 57 (28 Oct, rules changed), 43 of 63 (4 Nov), 43 of 64 (5 Nov). The case set grew from 50 to 64 as new corrections were added, so the rate (62% to 67%) is the fair comparison, not the count.
- **Source:** `ops/replay/baseline.json` at commits 0d2329a7, a6ebe36a, 31adb2cc, 38319e9b.
- **Mark:** CONFIRMED
- **Section:** 5

## The library: before and after

### N19 Buttons: 33 widths across 236 buttons; the two width rule
- **Measures:** how many button widths the MVP used.
- **Baseline:** 236 buttons, 33 distinct widths from 44 to 455, 47 set to hug (Figma read, 25 Sep).
- **Method:** the rule set two widths, 104 and 232 (26 Sep), applied to the Cohorts screens only (35 single buttons and 14 pairs). No recount of the 236 exists.
- **Source:** `process/BUTTON-AUDIT-MVP.md` line 9; `mondai/reference/DECISIONS.md` line 359; `process/BUTTON-RULES-PROPOSAL.md` lines 62 to 65.
- **Mark:** CONFIRMED (before); no after
- **Section:** 2, 4

### N20 Spacing: 669 raw spacing links moved onto spacing roles, 122 then 30 left raw
- **Measures:** spacing on the Cohorts and Peer Connect screens bound to named roles instead of raw numbers.
- **Baseline:** about 800 raw links, stated in the decision record; no scan survives.
- **Method:** rebind script run 2 Oct: 669 bound (Cohorts 462, Peer Connect 207), 122 left raw for his call, later 30. On the MVP the same day, 3,559 spacing swaps with 0 mismatches.
- **Source:** `mondai/reference/DECISIONS.md` line 459; commits a6a4f717 and a864db45; `ops/unlazy-archive/mvp-rebind-2026-10-02-GATES.md` as added in commit e97f44e7 (since removed from main; read it with `git show e97f44e7:<path>`); `design-system-plan/chats-C.md` line 131.
- **Mark:** CONFIRMED for 669, 122, 30 and 3,559; ESTIMATE for the 800
- **Section:** 3

### N21 Variables with a code name: 0 of 235 to 425 of 431
- **Measures:** tokens a developer or agent can map to code (web code syntax set).
- **Baseline:** 0 of 235 (plugin API read, 1 Oct).
- **Method:** 421 of 424 on 19 Oct (plugin API read); re-read live on 6 Nov: 425 of 431 variables have web code syntax.
- **Source:** `process/ds-audit/audit-data.json` at commit cd697982; portfolio repo `research_notes/Design system case study readiness/current-state.md` (a 19 Oct plugin read on a working branch, commit 1584a75, not yet on main); Figma library file, read 6 Nov (`design-system-ai/evidence/figma-read-2026-11-06.json`).
- **Mark:** CONFIRMED
- **Section:** 3

### N22 Components with a description: 4 of 94 to 105 of 106
- **Measures:** library components that tell a person or agent what they are for.
- **Baseline:** 4 of 94 (1 Oct audit: 90 of 94 had none).
- **Method:** 101 of 107 on 19 Oct; live read on 6 Nov of every component set and standalone component on the 14 library pages: 105 of 106 (the one without is Context menu on Navigation).
- **Source:** `process/ds-audit/audit-data.json` at commit cd697982; portfolio `current-state.md` as N21; Figma read 6 Nov (`design-system-ai/evidence/figma-read-2026-11-06.json`).
- **Mark:** CONFIRMED
- **Section:** 4

### N23 Token structure: 235 variables in 4 collections to 431 in 9; 248 published to 121; 971 bindings to retiring variables to 0
- **Measures:** a picker narrowed to roles, with raw values hidden behind them.
- **Baseline:** 1 Oct and 14 Oct reads.
- **Method:** Figma reads: 4 collections and 249 variables before the 14 Oct restructure, 9 and 370 after; published 248 to 121; 971 of 24,192 bindings pointed at variables being retired, then 0 (14 text layers held on purpose; three strokes on Mobile 1 were found still bound on 15 Oct). Live 6 Nov: 431 variables in 9 collections. The 14 Oct restructure was disputed on 15 Oct and re-audited; the case study evidence file holds it back until the tokens audit is settled.
- **Source:** `process/token-picker/before-after/SUMMARY.md` lines 20, 22, 50 and 57 (line 58: three strokes found still bound on 15 Oct); `design-system-ai/EVIDENCE.md` (design system today table); Figma read 6 Nov.
- **Mark:** CONFIRMED (counts); hold until the tokens audit is settled
- **Section:** 3

### N24 Text styles bound to size variables: 0 of 18 to 19 of 19
- **Measures:** type sizes that follow tokens.
- **Baseline:** 18 text styles, 0 bound (1 Oct).
- **Method:** 19 Oct plugin read: 19 styles, all bind font size.
- **Source:** `process/ds-audit/audit-data.json` line 15 at commit cd697982; portfolio `current-state.md` as N21 (Change since 1 Oct table).
- **Mark:** CONFIRMED
- **Section:** 3

### N25 Still imperfect: component wiring. Gaps bound 0.7% to 6.7%, paddings 0.3% to 1.9%; colour on roles 69.0%
- **Measures:** how much of the library's own components use the tokens.
- **Baseline:** 1 Oct audit.
- **Method:** 19 Oct plugin read of every library component. Colour bound to some variable 96.9% to 97.1%, but only 69.0% to roles; 798 colour properties still point at hidden primitives.
- **Source:** portfolio `current-state.md` as N21; `process/ds-audit/audit-data.json` at cd697982.
- **Mark:** CONFIRMED (as of 19 Oct; not re-read 6 Nov)
- **Section:** 6

## The problem, counted (before the rebuild)

### N28 Thirteen page agents at once: 3 clean, 1 half built, 9 delivered nothing
- **Measures:** agents working from the old system without the harness.
- **Baseline:** this is the before.
- **Method:** working log of 19 Sep; the thirteen drained a five hour usage window in 75 minutes.
- **Source:** `ops/WORKING-LOG-history.md` lines 494 to 502.
- **Mark:** CONFIRMED
- **Section:** 2

### N29 The process overgrowth: 31 files, about 53,500 words, 49 open questions in one day, no picture
- **Measures:** process weight on Journey Advisement's first day.
- **Baseline:** Peer Connect's light sequence (N1).
- **Method:** count in the 28 Sep process review.
- **Source:** `process/PROCESS-REVIEW.md` lines 12 to 13.
- **Mark:** CONFIRMED
- **Section:** 2

## What is not measured yet, and why

- **The agent test after run (N17).** It belongs to the case study evidence chat and runs on the next sprint; the before pages are gone, so the protocol's rebuild of them comes first.
- **Agent mistakes caught by checks before he saw them, per sprint.** No record counts it. The close out ran before his review in 0 of 14 rounds (Mentor events 9, Studio 5), and hook logs only exist from 4 Nov. The next sprint gives the first per sprint figure if close out and the critic run before each round and the hook log is committed with a sprint row.
- **Studio working hours (N6).** 8 of its 13 chats were only partly read, so the hours are floors. A full read needs many more transcript pages; worth doing once, then committing to the timing folder.
- **A recount of the 236 buttons (N19)** and a fresh read of component wiring (N25) after the library publish.
- **Repeat share by an independent tagger for Studio (N13).**
- **Peer Connect working hours.** Its first chats are gone; only its active days are a baseline.
