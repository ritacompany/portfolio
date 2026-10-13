---
name: fix-the-process
description: Use when the user reports that something was built wrong, a step was skipped, an instruction was ignored, or a problem came back after an earlier fix; when a workflow, process doc, CLAUDE.md, skill, prompt or pipeline isn't producing the right output; when you are about to add or strengthen a rule as the fix; or when designing a new multi-step process for any task.
---

# Fix the process

## Core principle

A new rule is a guess about what will change the next output. It is not a fix until a fresh run of the process shows the output changed. Find out why the process produced the bad output, change the part that caused it, and prove the change by re-running the process.

You will be tempted to answer with something that sounds rigorous, such as a stronger rule, a checklist or a self-check step. Those are still more text for the same agent that already skipped the step. This skill exists to stop that.

## The fix record

Copy `templates/FIX.md` into the project as `fixes/YYYY-MM-DD-<slug>.md` before touching anything else. Fill in each section in order. Before reporting, run:

```
node ~/.claude/skills/fix-the-process/scripts/check-fix-record.mjs fixes/<file>.md
```

Do not report until it prints `fix record complete`. If you cannot complete a section, set `Status: not verified` and say what is missing. The checker accepts that honestly.

## Steps

### 1. Evidence

Quote the bad output itself: the draft lines, the file, the export, the message. Then state what should have come out instead. Don't work from the user's summary of the problem.

### 2. Trace the chain

For the step that went wrong, answer each link with evidence from the files:

1. **Input.** Did the agent have the material it needed?
2. **Instruction.** Does the instruction exist, and where?
3. **Loaded.** Was that file actually read at that point, or did it get lost to compaction or skipped?
4. **Conflict.** Does anything else say the opposite? This includes protocols, tactics, templates, examples, notes and memory.
5. **Enforcement.** What stops the step from being skipped? "The agent is told to" counts as nothing.
6. **Check.** What would have caught the bad output before the user saw it?

The first broken link is the candidate cause.

### 3. Causes

List at least two candidate causes, each with evidence for and against. Read the change history (HISTORY, git log, earlier fix records, memory). If a rule about this already exists and the failure happened anyway, that rule has been tested and failed. Adding another rule like it repeats a failed experiment, so record that.

### 4. Choose the layer

Use the first layer that removes the cause, and write down why each earlier layer doesn't fit:

| # | Layer | Use when |
|---|---|---|
| 1 | Remove or resolve | Two sources conflict, or a stale line is misleading. Delete one, or ask the user which wins. |
| 2 | Fix the source | A config, template, script, example or input produces the problem. Change it there. |
| 3 | Restructure | The step happens in the wrong order, lives in a file that isn't loaded, or is buried. Move it, or make it a required slot in the template the agent fills in. |
| 4 | Enforce outside the agent | The step must always happen. Use a hook (Stop, PreToolUse, UserPromptSubmit), a script the harness runs, or a separate reviewer agent. |
| 5 | Stage-specific skill | The step needs judgment and is only relevant at one stage. |
| 6 | Instruction text | The instruction was genuinely missing and needs judgment. State which existing line it replaces. Add no emphasis words (IMPORTANT, ALWAYS, NEVER). |

**Enforced means something other than the agent's own memory triggers it.** These are not enforcement:
- a check written in the process doc for the agent to run on itself
- a marker or checkbox the agent writes to say it did the step

A session that skips the step will skip or fake those as well. If true enforcement isn't possible here, say so, and tell the user which check they will have to run themselves.

### 5. Check first

Write a pass/fail check on the **output**, not the steps. Use a script when the check is mechanical. For a judgment call, use a yes/no question for a separate reviewer.

Run the check on the current bad output and record that it **fails**. A check that passes on the bad output tests nothing.

### 6. Apply the fix

Make the change at the chosen layer, and delete what it replaces. Count the instruction lines you added and removed. If net growth is above zero, justify it.

### 7. Verify with a fresh run

Run the real process again in a fresh context: a subagent, or a new session given only the project files and the original task. Do not re-run it in the context that just made the fix. Show the before and after outputs, and show the check passing.

Then run it on a second case: another section, file or input. This shows the fix isn't special-cased to the flagged example.

If something enforces the step (layer 4), also show it blocking a run that skips the step.

If a fresh run isn't possible, set `Status: not verified` and list exactly what the user needs to run.

### 8. Report

Lead with Status (`verified` or `not verified`), then cover:
- the cause
- what changed, and the layer it changed at
- before and after
- what each must-happen step is now enforced by
- the change in instruction lines
- anything left for the user to decide

Never say "fixed", "won't happen again", or "this should solve it" unless the status is verified.

## When it keeps failing

If the same area has been "fixed" twice already, or the user says the process itself is wrong, stop patching. Design 2–3 structurally different setups. Write output checks with the user first. Run each setup in fresh contexts on a case that hasn't been done yet, compare the outputs blind, and keep only the winner.

## Building a new process

Apply the same principles before anything breaks:
- For every step that must happen, name what enforces it (layers 2–4). A step with no enforcement is a request, so label it as one.
- Write 3–6 pass/fail checks on the final output with the user before writing the steps.
- Keep each instruction in exactly one place, and look for contradictions with what already exists.
- Dry-run the process in a fresh context on a real case, and score the result against the checks before adopting it.

## Red flags

Each of these means go back to step 2:

| Thought | Reality |
|---|---|
| "I'll make the rule clearer / stronger / bold it" | The rule existed and was skipped. Clarity wasn't the cause. |
| "I'll add a gate step to the process doc" | It's a gate the agent runs on itself, which is the same failure. |
| "The agent will add a marker when done" | A self-written marker is something the agent says it did, not proof that it did it. |
| "I tested it: the grep flags the bad draft" | That shows the check works. It doesn't show a future session runs it. |
| "I redrafted it and it's clean now" | You redrafted it while knowing the fix. A fresh context is the test. |
| "I fixed it." | Only with a fresh-run before/after. Otherwise say "not verified". |
| "Adding one more line can't hurt" | Every line dilutes the others, so count them. |
