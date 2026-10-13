# Fix: CS2 drafts break his copy rules and skip the voice pass, and each fix has been another rule

Status: not verified

## Evidence
Bad output: section 1 Draft 3 copy (`reference/cs2/draft/CS2-section-1.md`, committed 44549eb, 10 Oct)
says "Then Betsy and Michael's curriculum arrived, and its Pathways took the place of my milestones. Each
Pathway breaks into Action Items". Its own header says "no attribution" and "humanizer and no-ai-slop not
run on this draft". Section 2 Draft 4 copy (1d5955b, 10 Oct 14:45) says "Michael wanted the other risk
covered" and "Michael asked for a clearer sense of where people stood in the whole journey", and records
no voice pass.
Expected: copy written for a stranger, with no colleague names, no quotes, no credit framing, no product
term before the ladder spends it, and both voice skills run on every draft before he sees it.

## Chain
Input: yes. Sources were in hand; both drafts cite them.
Instruction: exists in three places that disagree. Loop step 4 in `CS2_PROCESS.md` requires the voice
pass. No colleague names exists only in local memory (`cs2-write-for-the-stranger`, saved 10 Oct 14:25
CDT), not in the process doc.
Loaded: the memory loads every session on this machine. Draft 4 of section 2 was committed 20 minutes
after it was saved and still names Michael twice.
Conflict: yes. `CS2_PROCESS.md` line 141 to 144 says to separate what he designed from what he
inherited and names Betsy and Michael. Tactics cs-t27 ("Michael is the subject for the route") and
cs-t47 ("Michael's need stated as legitimate") were pulled for both sections. The writing protocol
section 5 says "every decision needs a visible author". All of these push names into copy.
Enforcement: none. The drafting session runs the voice pass on itself and writes its own compliance
note. Draft 3's "no attribution" header sits above copy that names two people.
Check: none before he reads it. The dash hook is PostToolUse, so it flags after the write.

## Causes
- Cause 1: no step is enforced outside the drafting session; it drafts, checks and certifies itself | For: Draft 3 header claims compliance the copy breaks; voice pass skipped twice with nothing stopping it | Against: the voice pass did run on section 1 Drafts 1 and 2 and section 2 Draft 2, so the step works when a session chooses to
- Cause 2: the craft sources contradict his rules, so following the tactics produces the violation | For: cs-t27 and cs-t47 name Michael as the subject; protocol section 5 demands visible authorship; section 2 Draft 4 lists cs-t47 as a deliberate move and then names Michael | Against: Draft 3 of section 1 claimed to drop attribution, so the session knew the rule
- Cause 3: too many instructions for the session to hold | For: about 84 hard-rule lines across 6 files plus 10 memories; research shows compliance falls as constraints pile up | Against: not directly observed; inferred from the literature
History: 7 Oct rule "inherited versus designed is for accuracy, never the subject"; 8 Oct memory "no quotes, accumulation"; 10 Oct memory "write for the stranger, no colleague names". Each was a rule. Each failed within the same day.
Chosen cause: 1 and 2 together. Rules already existed and were loaded, so a third rule repeats a failed experiment. The tactics and protocol actively instruct the opposite, and nothing outside the session checks the output.

## Layer
Layer: 4
Also applied: layer 1 (remove the conflicting tactic and protocol lines) and layer 2 (move the dash hook to PreToolUse).
Why not earlier layers: layer 1 alone (remove conflicts) leaves skipping the voice pass unenforced; layer 2 alone leaves self certification; layer 4 is needed because the voice pass and the copy rules must always happen
Replaces: n/a

## Check
Check: `check-cs2-copy.py <copy>` (scratchpad draft, to move into `.claude/hooks/` on his approval): colleague names, quotations, dashes, Oxford commas, product terms before the section that spends them. Judgment checks go to a separate reviewer as yes/no questions agreed with him first.
Result on bad output: FAIL.
Section 1 Draft 3: colleague name 'Betsy' at line 5, colleague name 'Michael' at line 5, product term 'Action Item' spent before its section, CS2COPY_FAIL.
Section 2 Draft 4: colleague name 'Michael' at line 7 and line 24, CS2COPY_FAIL (its Action Item flag is a false positive, since section 2 spends that term; the term list must be per section).
Control line: CS2COPY_PASS.

## Change
Files changed: none yet. Waiting on his agreement to the output checks, per the skill's rule for a process that keeps failing.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not run. Planned as 2 to 3 structurally different setups run cold on section 3, compared blind.
Before: as Evidence.
After: not run.
Check result after: not run.
Second case: section 2 Draft 4 already confirms the failure repeats on a second section.
Enforcement test: not run.

## Report
Unverified: everything after the check. He must agree the output checks (the mechanical list above plus the judgment questions), then the setups run in fresh contexts on section 3.

---

## Added 2026-10-13 from the section 1 session: two more failures of the same process

### Failure A: Haven's two by two keeps coming back
Bad output: section 1 Draft 3 copy, "None of them sat where Mondai needed to be." (44549eb), the
matrix argued in words one day after he rejected the matrix (9 Oct). Before that, two builds carried
the figure itself.
Chain: input fine. Instruction: memory `no-repeat-forms-across-case-studies` and one beat list line.
Loaded: yes, memory loads every session. Conflict: yes, and this is the cause. The source files told
every session to use it: `reports/Visual storytelling per beat.md` line 99 proposed a two by two for
"Nothing to copy"; the section 1 file described it as the plan in four places; the old Mondai CS Master
frame held the figure, and builds duplicated it. Enforcement: none. Check: none.
Cause: layer 1 conflict. The rule lost to the sources every time.
Layer: 1, applied 10 Oct (f319972): the report line, the four section file lines and the copy sentence
were rewritten; the old frame is gone from Figma. Mistake in the same commit: I also added a rule line to
`CS2_PROCESS.md` step 5 ("No two by two anywhere in CS2, in a figure or in words"). That is layer 6 on
top of a layer 1 fix and adds nothing. It comes out when this fix lands (+2 lines to remove).
Check: copy lines matching `two by two|matrix|quadrant|upper right|sat where|in the corner`, added to
`check-cs2-copy.py`. Before (44549eb Draft 3 copy): FAIL at "None of them sat where Mondai needed to
be". After (f319972): PASS on copy (the only hit is a note line, not copy).
Verification: not run in a fresh context.

### Failure B: gathered evidence does not reach the drafts
Bad output: section 1 Draft 3 describes the product (what existed, what it had to hold, products
compared). None of his decisions appear with the question, the options, the choice, the reason or the
cost, though the reasoning files, the Discord, weekly framework, Notion and ChatGPT trails hold them.
He does not know what was gathered.
Chain: input yes, all gathered. Instruction: loop step 2 brings material into the talk; step 3 drafts
"from the conversation". Loaded: the process doc, yes. The gathered files: not opened at drafting time;
Draft 3 was written from Draft 2 plus one correction. Conflict: the concept ladder orders product terms,
so a draft that explains the product in ladder order looks compliant. Enforcement: none. Check: the
per draft source list only proves sentences trace; it cannot show a decision is missing.
Cause: structural (layer 3). Nothing in the section file makes the gathered decisions an input to
the draft, so drafting starts from the last draft.
Proposed layer 3: the section file gets a required decision table before any draft (question he
faced, options, what he chose, why, what it cost, source file), built from the gathered files, shown
to him first. The draft is written from that table, not from the previous draft.
Check: separate reviewer, yes or no per row: "Does the draft show this decision with its reason?"
Run on Draft 3 of section 1: would FAIL (no decision rows exist to show).
Verification: not run.

Instruction lines from this session: +2 added to CS2_PROCESS step 5 (to remove), plus local memory
`cs2-write-for-the-stranger` saved 10 Oct without his yes (the main record shows it failed within 20
minutes); both to be removed when the checks replace them.

---

## Applied 2026-10-13 (evening session)

Status of this part: verified, except the live hook firing in a new session (handoff below).

Layer 1, conflicts removed:
- `CS2_PROCESS.md`: the designed versus inherited bullet no longer names Betsy and Michael, and it now
  says copy never states who built what. The duplicate two by two rule line in step 5 is gone; the
  two by two in words is caught by the check instead.
- `CASE-STUDY-WRITING-PROTOCOL.md`: "Every decision needs a visible author" replaced with "Show each
  decision with its reason and its cost, never who gets credit."
- `CS2_REFERENCE_INDEX.md`: cs-t27 and cs-t47 retired for CS2, with the reason.

Layer 3, structure: page copy now lives in `reference/cs2/copy/section-N.md`, apart from notes and
sources. Figma takes its text from the copy file only.

Layer 4, enforcement: `.claude/hooks/cs2-copy-guard.mjs` (PreToolUse) runs `reference/cs2/check-copy.mjs`
on every Write or Edit to a copy file and refuses the save on a fail; shell writes into the copy folder
are refused. Checks: colleague names, quotation marks, dashes, Oxford commas, the two by two in words,
product terms before the section that introduces them (from the concept ladder), and common AI
writing patterns.

Check first: `test-check-copy.mjs` catches 9 of 9 planted violations, passes a clean control, and fails
the real section 1 Draft 3 and section 2 Draft 4 copy. `test-copy-guard.mjs` blocks a bad Write, Edit
and shell redirect and allows clean ones.

After: section 2 copy Draft 5 in `copy/section-2.md`, names and early terms removed, humanizer and
no-ai-slop run. CS2COPY_PASS.

Fresh run: a fresh agent was told to add Michael and the Betsy and Michael curriculum origin back into
section 2 copy. It read the process, declined both and left the file unchanged (file still passes).

Instruction lines: +3 / -5 across `CS2_PROCESS.md` and the protocol.

Handoff, not verified:
- The hook was added mid session, so this session and its subagents run on the old hook set. A new
  session must confirm it fires (try saving a copy line with a colleague name; it must be refused).
- The four reviewer checks (claims match sources, a stranger can follow it, decisions shown with
  reason and cost, no credit framing) are not built. Failure B's decision table is not built.
- Section 1 copy is not redone: Draft 3 fails on names, and it also lacks his decisions (Failure B),
  so swapping names alone would not meet his standard. It waits for the decision table.
