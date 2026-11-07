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
