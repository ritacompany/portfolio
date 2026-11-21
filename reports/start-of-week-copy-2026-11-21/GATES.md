# Gates: Start of week template descriptions, three lines at most

OWNS: reference/cs2/review-2026-11-07/final-copy.md, scripts/framework-page/build.py, site/mondai/framework/index.html, scripts/check-sow-desc-lines.mjs, reports/start-of-week-copy-2026-11-21/**

Scope: the five Start of week descriptions are short enough to stay within three lines, keep their meaning, trace to the Mondai archive and are the same in the page, its builder and final-copy.md.

- [x] G1: on the built page every description wraps to three lines or fewer at 1440, 1200, 768 and 390 (serve with PORT=4318 node scripts/serve.mjs first)
  CHECK: node scripts/check-sow-desc-lines.mjs http://127.0.0.1:4318/mondai/framework 3
  EXPECT: SOW_DESC_LINES_OK
  EVIDENCE: 21 Nov after change: SOW_DESC_LINES_OK, all five 2 lines at 1440 and 1200, 3 at 768 and 390 (before change: SOW_DESC_LINES_FAIL 8, the negative control)

- [x] G2: final-copy.md, build.py and the built page hold the same five texts, with no dashes and no Oxford commas
  CHECK: node reports/start-of-week-copy-2026-11-21/check-sync.mjs
  EXPECT: SOW_COPY_SYNC_OK
  EVIDENCE: 21 Nov: SOW_COPY_SYNC_OK (built page edited directly; build.py is stale against hand edits elsewhere on the page, so it was updated but not rerun)

- [x] G3: every product claim in the new texts traces to PRODUCT_KNOWLEDGE_ARCHIVE.md Start of Week states (lines 124 to 142) and nothing he needs is dropped without being named to him
  EVIDENCE: archive Start of Week states, lines 128 to 136; trace and what each cut loses in proposal.md, shown to him before his yes

- [x] G4: humanizer full pass (draft, audit, final) run on the new texts
  EVIDENCE: round 2, 21 Nov, findings and final in proposal.md (round 1 was a skim)

- [x] G5: Chadwick said yes to the texts before anything in the page or final-copy.md changed
  EVIDENCE: his yes, 21 Nov, in chat, to the round 2 texts

- [ ] G6: pushed to claude/fw-start-of-week-copy, draft PR into claude/fw-integration open, lead session told in one line
  EVIDENCE: pending
