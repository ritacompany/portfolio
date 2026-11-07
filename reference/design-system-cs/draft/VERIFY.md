# Design system CS: verify-claims, draft 1

7 Nov 2026. Method: the verify-claims skill (Mondai `.claude/skills/verify-claims/`). A fresh agent
got the 22 claims as questions with source pointers, never the draft, and answered each from the
source with a quote and line.

Result: 22 checked. 21 matched, 1 partial, 0 unsupported, 0 unchecked.

- C1 partial: the verifier read the Sep 2024 date from the PARAPHRASE row only. Fixed: CLAIMS.md now
  cites the two CONFIRMED Sep 2024 rows in `SOURCES.md` section 1 (29 Aug ChatGPT, 15 Sep Discord).
- C17 nuance: "every colour bound to a published role" covers only layers the agents made. Fixed in
  the draft ("every colour they placed").
- C20 nuance: the two advisement sides share 5 active days, so per side screens a day overstate the
  days; kept as ESTIMATE with the note in CLAIMS.md.
- Not used in the draft, noted by the verifier: the 23 Sep grid and 25 Sep button widths were later
  amended (margin 48, widths 104 or 232); the draft states neither value.

## Blind completion check

A fresh agent got the brief and the draft files, never this session's report. Verdict: not yet, 11
findings. Fixed in draft 1: the fixing card was the two extremes of three sprints (now a table of all
three, ESTIMATE); "days track sprint size" contradicted the data (cut); Studio's 4 days was in the range
though it may end before handoff (left out); "every variable has a code name" (now all but six);
unsourced lines about his intent (cut or sourced; three left for him in FRAME.md); a near quote of his
"designer's eye" (reworded); "passed every check" (now the checks written for them); "misses traced to
the system" (now the repeated misses); grid audit 27 of 33 with no follow up (in section 6);
three revisions "in two days" (25 to 27 Sep); the bare edge spacing rule (added); "obvious fix" and
"usual test" (now the three options and his earlier test); a typo. Kept: the claim ids in the page,
which come out before shipping, with marks shown on the page where a number is an ESTIMATE.

C23 was added after the verifier ran; checked by this session against the source file (NEXT-SESSIONS.md, His direction), not independently. The grid audit FAIL detail added to C15 was read from Mondai `ops/check-ledger.md` by this session.
