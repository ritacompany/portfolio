# Gates: non developer safety net report (17 Nov 2026)

- [x] G1 Research covers the 13 named areas, each with at least one source.
  MANUAL: read REPORT.md audit table; every area has a row and the sources list names a source for it.
- [x] G2 Every research claim in the report passed an independent check (Sonnet agent against primary sources).
  MANUAL: the claim check verdicts are listed in REPORT.md under "How the research was checked".
- [x] G3 Every audit row names the existing script or hook, or says missing, and each named file exists.
  CHECK: node reports/nondev-safety-net/gates.mjs g3
  EXPECT: PATHS_OK
- [x] G4 Ranked recommendations each name a tool and a cost.
  MANUAL: each numbered recommendation has "Runs with" and "Cost" lines.
- [x] G5 No em or en dashes in the report.
  CHECK: node reports/nondev-safety-net/gates.mjs g5
  EXPECT: NO_DASH_OK
- [x] G6 Committed and pushed with only this folder staged; nothing under site/haven changed by this session.
  CHECK: node reports/nondev-safety-net/gates.mjs g6
  EXPECT: PUSHED_OK

## Build, 17 Nov (his yes: "Yes, build both")

- [x] G7 The image check catches a soft image (positive control: Home at 390 holds the 1.56x Mondai card) and exits 1.
  CHECK: node reports/nondev-safety-net/gates.mjs g7
  EXPECT: CATCHES_SOFT_OK
- [x] G8 The image check passes a page whose pictures are all sharp (Home at 1440, 4 pictures) and prints its token.
  CHECK: node reports/nondev-safety-net/gates.mjs g8
  EXPECT: PASSES_SHARP_OK
- [x] G9 The weight limit catches a heavy file (positive control: Home at 1440 with the limit lowered to 50 KB).
  CHECK: node reports/nondev-safety-net/gates.mjs g9
  EXPECT: CATCHES_HEAVY_OK
- [x] G10 The workflow file runs the link check, the image check and the layout health check on every push.
  CHECK: node reports/nondev-safety-net/gates.mjs g10
  EXPECT: WORKFLOW_OK
- [x] G11 The workflow ran on GitHub after the push and its result was read (pass or the expected image failures).
  MANUAL: the run page on GitHub, read in the built-in browser; result recorded in REPORT.md.

## Rewrite, 17 Nov (his correction: the report was about imagery, not the collection he asked for)

- [x] G12 Report leads with the collection, the whole setup audit and the standing process; images are one section.
  MANUAL: read REPORT.md headings in order.
- [x] G13 Second round of research claims (14) independently checked; partly verdicts corrected in the text.
  MANUAL: verdict table in REPORT.md under "How the research was checked".
