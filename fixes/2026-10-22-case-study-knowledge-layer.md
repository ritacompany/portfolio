# Fix: case study writers did not know what they were building

Status: not verified

## Evidence
Bad output: the 21 Oct winning outline's start of week block plan described screens only ("Rollover names where the person is sitting, the days lost and the Action Items moving into the new week"), with no decision of his behind any block; the trial writer that did reach for his reasoning (setup A) pulled it from archive chats unchecked and made 14 product claims the live product does not support. Earlier sessions relied on PRODUCT_KNOWLEDGE_ARCHIVE.md and reference/cs2/reasoning/, which carried a wrong rollover month (THROUGHLINES) and invented reasons.
Expected: a writer starting a section knows each flow from the raw record (what it does, the problem, options considered, what he decided and why, how it changed, what was his, what is open), with every fact traceable to the exact words in the record and his decisions told apart from the assistant's suggestions.

## Chain
Input: the raw record exists and is large: 177 design chats (12.6M characters, topic tagged), 1,583 ChatGPT conversations, Discord and Notion exports, CS1 evidence, the live Figma file. Writers had it but never read it per flow.
Instruction: CS2_PROCESS.md step 2 says Claude "goes and finds the things he mentions in the archive, Figma, Notion or the record". Nothing says to read the raw record for each flow before planning it.
Loaded: sessions loaded the archive and reasoning files (summaries written by earlier sessions), not the raw chats.
Conflict: the 21 Oct truth gate accepted only frame, flow map and his recorded words as sources, so reasoning from the record had no way to be cited: writers either dropped it or used it unchecked.
Enforcement: none; reading the record was a request.
Check: none tested depth of knowledge, exactness of record quotes, breadth of sources searched or whether conflicts between sources were surfaced.

## Causes
- Cause 1: no step builds knowledge from the raw record, so writers work from summaries of summaries | For: archive and reasoning files were the only product knowledge loaded; both carry known errors; the record is too large for one context and was only ever grepped ad hoc | Against: the trial A writer did reach the raw chats on its own and found real decisions
- Cause 2: the truth gate gave record based reasoning no claim type, so it could not be carried even when found | For: B's outline cites only frames and has no decisions; A's decisions were all failed as unsupported by the map | Against: a writer could still have put reasoning in Reader lines
- Cause 3: the record itself contains case study drafting that reads like history | For: the 9 June chat titled building a framework case study with fabricated metrics was cited seven times as product fact for the three week threshold; his dictated case study notes in Notion were cited eight times | Against: none; found by the blind judge on 22 Oct
History: the 21 Oct rebuild (fixes/2026-10-21-cs2-process-rebuild.md) made product truth enforced but left knowledge depth to the writer.
Chosen cause: Causes 1 and 2 together, with Cause 3 found inside the fix. Without a knowledge step the writer has nothing true to say about decisions; without a claim type the gate cannot hold it.

## Layer
Layer: 4
Why not earlier layers: 1 (remove) the archive and reasoning files cannot simply go, they are useful search aids; 2 (fix the source) correcting the summaries leaves the writer reading summaries; 3 (restructure) a read the record step in the process doc is a request a session can skip, as step 2's finding instruction already was.
Replaces: n/a

## Check
Check: `node reference/check-dossier.mjs <dossier>` for depth (all seven questions answered or marked), exact sources (every excerpt found word for word, at least 20 characters), his turns only for decisions, no summaries or case study writing cited, all six source classes logged, conflicts with both sides cited; then a blind Opus judge on meaning. `check-truth.mjs` refuses a section plan whose flows have no passing dossier, and decision claims must cite a real dossier entry.
Result on bad output: FAIL. Five fixtures: a fabricated excerpt ("excerpt not found verbatim"), a missing question ("missing section ## Q5"), an archive citation ("cites a summary, not the record"), a missing source class ("no line for notion"), an assistant turn cited as his decision ("Q4 cites the assistant's turn, not his"); the clean fixture passes. The D1 dossier citing the fabricated metrics chat: DOSSIER_FAIL on 7 citations; after the Notion rule, 8 citations to the case study notes.

## Change
Files changed: reference/check-dossier.mjs (new), reference/check-truth.mjs (decision claim type citing dossier entries; section plans need a passing dossier for every flow step; an optional outline argument), reference/review-truth.mjs (the reviewer gets the dossiers; untyped reasoning fails), reference/cs2/truth.json (dossier folder), reference/cs2/CS2_PROCESS.md (one sentence on dossiers in the sources of truth section). Dossiers, the record search tool and trial outputs stay outside git in ~/Documents/CS2-research/.
Instruction lines: +4 / -0 (CS2_PROCESS.md +2; check-truth.mjs format +2)
Net growth reason: the knowledge step did not exist; it replaces no line, and its rules live in code (check-dossier.mjs) rather than the process doc.

## Verification
Fresh run: two structurally different setups, each in fresh sub-agents on start of week (F1 to F11). D1: three readers split by source (design chats; ChatGPT, Discord and Notion; live Figma and CS1), then a synthesiser. D2: one investigator with a search tool over every source. Both passed check-dossier.mjs. Blind Opus judge: D1 passed conflicts, failed depth, exact sources and breadth, 4 of 16 statements wrong, caught the Pathway order clash and his reset decision; D2 failed all four, 3 of 14 wrong, missed the reset redesign and the Pathway clash. D1 won. One fix round, then a fresh blind Opus re-judge: still fails all four, 4 of 30 statements wrong; open items in ~/Documents/CS2-research/dossiers/start-of-week.review.md.
Before: block plan "Rollover names where the person is sitting, the days lost and the Action Items moving into the new week" (screens only).
After: a fresh writer's block plan from the dossier carries 23 decision claims, for example "The old rollover screen forced the math on the person at the start of the week and read as a transaction" (dossier Q2.2), "He removed a clean slate variant that included a lost day, because a lost day means a rollover" (Q4.11), "He dropped the original schedule option because the person does not need to keep it" (Q4.13).
Check result after: TRUTH_PASS on that plan in section mode against the trial outline.
Second case: none yet; one flow was trialled.
Enforcement test: with the dossier removed the same plan fails "6 knowledge: no passing dossier for F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11"; a decision claim pointing at Q4.99 fails "cites Q4.99, which does not exist".

## Report
Unverified: the start of week dossier does not yet pass the blind judge (depth, exact sources, breadth, conflicts each failed on specific items listed in start-of-week.review.md) and now fails check-dossier.mjs on 8 case study notes citations; no second flow has been trialled. Next session: fix the review list, re-judge with Opus, then trial a second flow (capacity). Cost per flow on 22 Oct: four Sonnet readers and synthesiser plus two Opus judge runs, roughly a third of a 5 hour window.
