# Gates: Haven tactics pass

OWNS: reference/haven/**, site/haven/index.html

Scope: the CS2 tactics pass run on the Haven case study: copy pulled, both banks walked, proposals written and checked, one review page published for his marks, then his marks applied and re-checked.

- [x] G1: final-copy.md holds every visible text node of site/haven/index.html in page order (a planted missing line is caught)
  CHECK: node reference/haven/tactics/pull-check.mjs
  EXPECT: PULL_OK
  EVIDENCE: run 9 Nov, exit 0, PULL_OK (212 nodes; planted missing line caught)

- [x] G2: bank-walk.md has exactly one valid verdict for each of the 49 cs and 44 re entries, and every USED or NEW names a proposal that exists (planted gaps caught)
  CHECK: node reference/haven/tactics/walk-check.mjs
  EXPECT: WALK_OK
  EVIDENCE: run 9 Nov, exit 0, WALK_OK (49 cs, 44 re; dropped entry, unknown proposal and bad verdict caught)

- [x] G3: every proposal passes dashes, Oxford commas, AI vocabulary, quotes, wording, casing, evidence fields; its current text is in final-copy.md; pull.md and page-pass.md cover every block; humanizer.md has draft, audit and final for every proposal, final equal to the new text (each rule proven on a planted mistake)
  CHECK: node reference/haven/tactics/run-checks.mjs proposals.json pending
  EXPECT: HAVEN_TACTICS_CHECKS_OK
  EVIDENCE: run 9 Nov, exit 0, HAVEN_TACTICS_CHECKS_OK, pending mode (21 proposals, 22 new lines; every planted mistake caught)

- [x] G4: every proposal fits: rendered in the real page at 1440 and 390 with Satoshi, and measured standalone with site/assets/fonts at the computed widths; controls hold
  CHECK: node reference/haven/tactics/measure.mjs
  EXPECT: HAVEN_FIT_OK
  EVIDENCE: run 9 Nov, exit 0, HAVEN_FIT_OK (planted long caption and long hero caught; hero column 10 of 10 at 1440); output in measure-out.txt

- [x] G5: facts: every proposal traces to the page or the repo, written per proposal in facts.md
  EVIDENCE: facts.md, one line per proposal; one ASSUMED claim (h-mvp-body), flagged on the review page with my pick Discuss

- [x] G6: reader check: round 1 on every proposed block plus a planted control, aggregated; round 2 on the whole page in order with fixed proposals applied, aggregated; every flag on a proposed line fixed or stated on the review page
  EVIDENCE: round 1 (reader-check/r1): planted control FAIL on every planted fault 3 of 3; h-hero-r2 and h-sched-body fixed after it. Round 2 (reader-check/r2), final page in order: hero, Demographic access, MVP, quiz, profile, scheduling and chat PASS. Still flagged, each stated on the review page: Wireframes (h-wires, process story 3 of 3, kept), the ending recap (h-end-cap3 among his recap captions), no design decision in data, usability testing, the program and Security (not decision blocks; Security's decision text is the hidden body), and his Testing synthesis headline (process story, the page's wrong turn). Six agents used, the cost guard cap

- [x] G7: review page published with Accept, Accept with changes, Discuss, Reject and a note per proposal, saved to the page db collection marks
  EVIDENCE: https://claude.ai/artifact/AuuSGfYV3TaATwVgjhii51, capabilities db; ArtifactData list marks returned empty, collection reachable

- [ ] G8: his marks applied to final-copy.md and site/haven/index.html, changed lines re-checked
  CHECK: node reference/haven/tactics/run-checks.mjs proposals.json applied
  EXPECT: HAVEN_TACTICS_CHECKS_OK
  EVIDENCE: pending

- [ ] G9: work committed and pushed to main with HANDOFF.md current
  CHECK: node reference/haven/tactics/pushed-check.mjs
  EXPECT: PUSHED_OK
  EVIDENCE: pending
