# Haven handoff

Where it stopped and the next action. Kept current at every checkpoint of the Haven tactics pass (his ask, 9 Nov:
the CS2 tactics pass of 8 and 9 Nov, run on Haven with every check).

## Where it stands (9 Nov, after his marks)
- His marks read from the review page and saved in reference/haven/tactics/marks.json: 19 accepted, h-mvp-body
  rewritten from his note (an interview showed identity and community belong together; no time for both),
  h-test-i1 on Discuss (he is unsure the plainer line keeps the mode of communication clear). All applied to
  final-copy.md and site/haven/index.html except h-test-i1, which keeps its current text.
- Re-checked: run-checks.mjs applied HAVEN_TACTICS_CHECKS_OK, pull-check PULL_OK, measure.mjs --marks against the
  pre-apply page HAVEN_FIT_OK (measure-applied.txt). Reader check round 3 (reader-check/r3) on the applied page.

## Next action
Aggregate reader-check/r3, record it, then settle h-test-i1 with him.

## Earlier state
### Before his marks
- Review page published, waiting for his marks: https://claude.ai/artifact/AuuSGfYV3TaATwVgjhii51 (db collection
  marks, empty at publish). Built by reference/haven/tactics/build.py from proposals.json, intro.html, checks.html.
- reference/haven/final-copy.md: the copy source, pulled from site/haven/index.html (PULL_OK). The Security
  features body is in the HTML but hidden on the page (display none in current.css); asked him on the page.
- reference/haven/tactics/: bank-walk.md (93 entries, WALK_OK), pull.md, page-pass.md, proposals.json (21),
  humanizer.md, facts.md, run-checks.mjs (HAVEN_TACTICS_CHECKS_OK pending), measure.mjs (HAVEN_FIT_OK), GATES.md
  (G1 to G7 met; G8 and G9 wait for his marks).
- reference/haven/reader-check/: r1 (round 1 plus planted control) and r2 (final page in order), aggregated.
  Six Sonnet agents used, the cost guard's cap for the session turn.
- Nothing applied to site/haven/index.html yet.

### Next action then
Read his marks (ArtifactData list, collection marks, on the URL above). Write them to
reference/haven/tactics/marks.json as {proposal id: {choice, final}} (final only for Accept with changes, using his
note; ids on the page are hv-xxx for h-xxx). Apply accepted ones to final-copy.md and site/haven/index.html
(both copies of h-links; h-journey's also edit), then run run-checks.mjs proposals.json applied, pull-check.mjs,
measure.mjs, and one reader check round on any line he changed in Accept with changes. Mind the dependencies: 8
needs 7, 16 needs 15; if 7 is in and 8 out, cut the old MVP body's first sentence.
