# Self audit of plan logic

14 Oct 2026. The question: what is the most reliable way for Claude to check that a plan's logic holds before acting on it. Then one run of that method on the CS2 step 5 rewrite. Full evidence is in `reports/AI plan self verification methods.md`.

## Recommended method: a blind claim audit

The agent that wrote the plan never grades it. A fresh agent with no access to the author's reasoning does it in five passes:

1. **Extract.** List every load-bearing claim: each rule, each "if X then Y", each thing the plan assumes about its inputs, checks and owner.
2. **Question.** Turn each claim into one closed question answerable from the files ("does any step say who runs the fewer figures review, and when?").
3. **Answer blind.** Answer each question from the files, with a file and line, without rereading the plan's own argument.
4. **Trace real cases.** Run real outputs of the plan through its rules and note where they broke a rule or obeyed one into a bad result.
5. **Report holes only with evidence.** Each hole is written as "Fails if ...", with its proof, which check would catch it and the cheapest test. Claims that hold get listed as holding. One pass, then stop.

Why this wins:
- **Self review in the same context makes things worse.** GPT-4 accepted 38 of 45 invalid plans it checked itself. With self critique, its graph colouring score fell from 16% to 2%; a sound outside checker took it to 38% (Valmeekam, Stechly and Kambhampati 2023 to 2024). CONFIRMED in the research notes.
- **Finding the error is the bottleneck, not fixing it.** GPT-4 locates the first mistake 39.8% of the time, and fixes it well once told where (Tyen 2024). Models miss 64.5% of errors when they believe the error is their own (Self-Correction Bench 2026). The blind audit is aimed at locating errors.
- **Hiding the draft is what makes Chain-of-Verification work.** Its gains come from answering verification questions without seeing the draft. The variant that sees the draft repeats its own mistakes (Dhuliawala 2023). Pass 3 copies that mechanism.
- **The evidence rule stops manufactured findings.** Repeat reviews and reviewers asked to "find gaps" invent issues. Anthropic's own Claude Code guidance warns about this.
- **It fits what already works here.** `fix-the-process` already proves a change with a fresh run on outputs. The blind audit is the same idea moved one step earlier, onto the plan's logic.

Upgrade when available: run pass 3 on a different model family. A small 2026 preprint found a cross-family reviewer wrongly rejected 2% of correct answers against 35% for a same-model reviewer. Codex and Gemini are not installed on this Mac, so the demo used a fresh Claude agent.

## Runners up

- **strategy-red-team (installed):** closest fit. It has the right extraction step, the "Fails if" format and a no-fabrication rule. It lost because it runs in the author's context with no blind step and is aimed at market bets, not a process's internal logic. Its output format is worth reusing, and the method above does.
- **grilling (installed):** the only common method that catches bad premises, because the human holds those facts. It lost because it spends Chadwick's time on everything, including facts the files already answer. Keep it for the premise questions the audit sends to him.
- **pre-mortem (installed):** good for coming up with failure stories. It lost because it produces candidates, not verdicts, and invents threats. The famous "30% more reasons" figure comes from a study of explaining past events, not checking plans.
- **Multi-agent debate:** lost on evidence. Same-model debate does no better than majority voting, and correct agents switch to wrong answers under peer pressure (2024 to 2025 studies).
- **Fixed yes/no checklists (CHECKS.md style):** make reviewers agree with each other more, not agree with the truth more, and catch only failures someone already named. Keep CHECKS.md for scoring outputs, not for auditing logic.
- **writing-plans, requesting-code-review, superpowers:** check the work against the plan, so a wrong plan passes. red-team-prd is not installed.

## Demo: step 5 under a blind claim audit

One fresh agent, read only, given step 5, its scripts, CHECKS.md and the two trial outputs. It was not shown the fix record. It found six holes, ranked by how likely each one is to bring back the problem step 5 exists to prevent. Holes 3 and 4 I re-checked against the files myself.

1. **"Already shown by the copy" has no definition and the second look has no owner.** The process asks whether the copy can "make the reader see it" (`CS2_PROCESS.md:214`). CHECKS.md C3 uses a different bar, "already carry the claim". The fewer figures reviewer has no owner, trigger or output (`:228`). In section 2, 5 of 6 blocks got a figure, though blocks 4 to 6 state their claim outright in the headline. Fails if the planning agent judges its own "yes or no", which is the self-verification failure above.
2. **The copy step decides figures before the message plan exists.** Step 3 writes Label and Card lines as "text on the figure" (`:197`), and `check-copy.mjs:78` tells long blocks to move detail onto the figure. Step 5 then treats those labels as a reason a figure is needed ("First proposal", "Whole journey" in `A-revised-section-2.md`). This circular dependency is behind both remaining trial failures.
3. **Two rules contradict each other and nothing says which wins.** "Fewest figures" can leave two text only blocks next to each other. "Two text only blocks of the same width never sit back to back" (`:233`) then forbids that. Section 1 under the winning setup has two TitleAndText blocks back to back. The reviewer passed it and no script flagged it. Going back to pass 1 to fix it pushes the agent to add a figure. The Layouts section's "one figure" per block (`:60`) points the same way.
4. **The scripts check that fields exist, not that they make sense.** `check-message-plan.mjs` passes "Already shown: yes" with "Figure count: 3". `check-slot-plan.mjs` never compares media slots to the figure count. The hook runs the message check on a temp copy, which skips the block count match. The "guard hook enforces it" claim covers only the file's shape.
5. **The route figure ban is a keyword match.** Only the slot plan check tests for it, by regex. A route described in other words passes: section 2 block 3's "Action Items in order left to right" strip did. The same regex rejects plain copy like "the five stages". There is no place to record his yes, so a real claim about Pathway order can never pass.
6. **The width rule can't be checked.** "7 of 12 columns" (`:224`) has no matching widths in the LEDGER decoder, and nothing checks it.

Holds: message before layout is truly enforced on the real paths. A slot plan is refused without a message plan, and the message plan cannot name a layout piece. The trial correctly left text only the blocks whose cards carry the claim. Every media row names the part of the claim it proves.

**What this means for step 5:** holes 1 to 3 are logic problems a fresh run can't find, because the same run that applies a rule also grades it. Hole 2 is the open copy shape decision already flagged in the fix record. That decision is his, and it is the one that changes the most. The full audit is `step5-blind-audit.md` in the shared side session notes folder, not in the repo.
