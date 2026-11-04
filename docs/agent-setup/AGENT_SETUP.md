# Agent setup: the 10 frames, checked against what is really in place

Written 4 Nov 2026 from a Claude Code session on 3 Nov ("Memory and project frameworks"). In that
session Chadwick shared 11 slides on how an agent setup is built: harness, loop, context, tool
design, memory, orchestration, guardrails, evals, human in the loop and observability. The session
checked his setup against each one, got some of it wrong, and then re-tested every claim by firing
each guard at a planted bad case. This file holds the corrected result, so his second account can
read it from GitHub.

The short version: most protections that matter are written instructions, not checks. A written
instruction is a request the next session can skip. A check is something outside the agent that runs
on its own. The repeat fixing Chadwick keeps doing comes from that gap.

## Where the setup lives

- **Global** (`~/.claude/CLAUDE.md`, `~/.claude/settings.json`, `~/.claude/hooks/`, memory): how he
  works everywhere. Set once. Not in any repo, so the browser account cannot see it except through
  this file.
- **Project** (repo `CLAUDE.md`, `.claude/hooks/`, handoff docs): only what is specific to that repo.
- **Session**: nothing to set up. Every session reads the two layers above automatically.

About half the slides are for people building agent products (rate limiting, sandboxing,
orchestrators). Anthropic handles those inside Claude Code.

## The 10 frames, corrected

A "frame" is just one slide. Each looks at one part of an agent setup.

| Frame | Status | What is true |
|---|---|---|
| 1 Harness | In place | Hooks in this repo: dash blocker, evidence file lock, question box, usage checkpoint, Figma build gate. |
| 2 Loop | In place | `reference/cs2/WORKING_LOOP.md` plus the usage checkpoint. |
| 3 Context | Text only | "Read HANDOFF, then WORKING_LOOP, nothing else" is not enforced by anything. Skill count also belongs here: about 200 skills, listed at about 10k tokens every session, with humanizer, no-ai-slop, unlazy and systematic-debugging each listed twice. |
| 4 Tool design | Mostly fine | Means the tools the agent calls have clear names and inputs, and their errors say how to fix the problem. For him that is mostly the messages hooks print when they block, plus scripts like `check-asks.mjs`. The first pass wrongly filed skill count here. |
| 5 Memory | Text only | "Memory saves only with his OK" is an instruction. Nothing blocks a save. |
| 6 Orchestration | Partial | He splits work with worktrees and side sessions, but he is the one joining the results back together. Mondai's 28 Oct sprint review names this as F7. |
| 7 Guardrails | Mostly in place | Hooks guard archives, copy, CS2 copy, Figma builds without his go, pushes and the question box. Mondai adds a map gate and push rules. Gap: every session loads every connector, including Notion delete. Not urgent. |
| 8 Evals | Gap here, in place at Mondai | See below. |
| 9 Human in the loop | Text only | "Chadwick approves" is enforced only for Figma builds. Risk is the other way too: him approving things that do not need him. |
| 10 Observability | Gap | Git history and transcripts exist, but nothing tracks which rules keep failing. |

## Checks and evals are different things

- **A check** runs on each output, every time.
- **An eval** re-runs a fixed set of past cases after the process changes, to show whether the change
  helped or broke something.

Mondai has both. Its replay set is a real eval: the first baseline on main passed 31 of 50 cases and a
later run passed 35 of 57. Its blind check is a separate agent grading against a rubric. The portfolio
has checks but no replay set, so the eval gap is here, not at Mondai.

## Why the fixing keeps coming back

Mondai's 28 Oct sprint review already measured it: 41 of 84 review comments (49%) repeated a correction
already given, and the share rose from 17% to 46% across rounds. Three causes:

1. A fix closed on the one screen he named and never swept to the others.
2. A check could not see the fault, or the review saw it and passed it anyway.
3. Changes merged mid sprint without a replay run.

When an agent is asked to "make sure there is a check," it often writes a rule instead. The missing
loop is: his correction comes in, it becomes a check or a replay case, and the next sprint measures
whether it held. The sprint review's F6 found the measuring step broken (hook logs lost with each cloud
container, repeat share counted only by hand) and proposed a one line log at session close plus
tagging each ask as new or repeat. Whether F3 and F6 landed in Mondai has not been checked.

Mondai's opposite risk: the 28 Sep process review found 31 files and about 53,500 words written in one
day. More machinery is not the fix. Closing that one loop is.

## What was built: the rule without check hook

A session wrote a bare rule to fix a mistake, which is the exact failure above. The only thing behind
"do not fix things with rules" was a prompt hook that scans his wording for failure words and adds a
reminder. It depends on his wording, it only reminds and nothing checks what the session changed.

So a global Stop hook now checks the output. Source: `~/.claude/hooks/rule-without-check.mjs` on his Mac. It is registered in
`~/.claude/settings.json` under `Stop`, so it runs in every repo.

- **What it does:** when a turn edits instruction files (CLAUDE.md, AGENTS.md, SKILL.md, rules files,
  PROCESS, LOOP or PROTOCOL docs, `.claude/*.md`) and edits no hook, check script, test or settings
  file, it blocks the finish once. The session then builds the check, or tells him plainly which lines
  are unenforced.
- **Planted cases:** 12 of 12 correct. Rule only edits blocked, edits made with a check pass, reads
  pass, never blocks twice in a row.
- **Replay over his last 25 sessions:** would have fired on 7 of 582 turns.
- **Proven live:** its log shows one real block, 4 Nov at 02:19 UTC, on a CS2 session that edited
  `reference/cs2/WORKING_LOOP.md` with no check.
- **Blind spot:** subagents keep their own transcripts, so rule edits a subagent makes are not seen.
- **Replay it yourself:** `node ~/.claude/hooks/rule-without-check.mjs --scan <transcript.jsonl>`.

## Earlier claims, re-tested

| Claimed | What is true |
|---|---|
| Evidence files cannot be edited | Mostly. Edits, `cp`, `sed -i` and redirects are blocked. Leak: a Python or Node one liner can still write to them. |
| Dash hook catches dashes | Mostly. Blocked when written with the edit tools. Leak: text written into a file through a shell command is never checked. |
| Figma builds need his go | True. Blocked without "build" in his message. |
| Usage checkpoint stops at 75% and 90% | Partly. The finish step refuses to end while CS2 work is newer than the pushed handoff, but the percentages only reach the agent as reminders. Not fired in a test. |
| "Read HANDOFF, then WORKING_LOOP, nothing else" | Text only. |
| Memory saves only with his OK | Text only. |
| "Chadwick approves" | Text only, except Figma builds. |
| Oxford commas | Not checked. |

## Still open

1. Check whether Mondai's sprint review fixes F3 and F6 landed. If not, that is the first thing to build.
2. Close the two leaks (evidence lock via script one liners, dash hook via shell writes).
3. Trim duplicate skills to cut the per session listing cost.
4. The 3 Nov session proposed a global `~/.claude/agent-frames.md` reference. It was never written;
   this file covers the same ground.
5. For the case study: the design system sprint process belongs to CS3, so these terms fit there.
