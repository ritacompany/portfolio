# Checks on the hero and ending versions (9 Nov)

Every check below was proven on a planted mistake before it was trusted on the real text.

1. Dashes, Oxford commas, his wording and casing: run-checks.mjs (the tactics/run-checks.mjs pattern:
   check-copy.mjs plus the copy-check.sh hook). Catches a planted em dash, en dash, double hyphen, Oxford
   comma, people, lowercase action item and lowercase recalibration; passes a clean control and rolls over
   as a verb. Also checks the hero uses no product term the page introduces later (catches a planted Action
   Hub). Result: HERO_END_CHECKS_OK, 21 fields. It caught one real Oxford comma on the way (hero C, 5 hours,
   another 15, and either), rewritten.
2. Humanizer: loaded as the skill and run draft, audit, final on all six versions. What the audit changed:
   hero B Nothing yet decided (a thing doing a person's job) became There was no way yet to decide; the
   tailing not results became rather than results; ending C Body 2 was two tidy If sentences, now one
   sentence whose two tests are both observable (an earlier draft used would have caught up on their own,
   which nobody can see); ending A Body 1 opened on a subjectless two numbers fragment, now a full sentence;
   ending C headline the least settled rule is when became is the one for when. No fact was added.
3. Facts: every product claim checked against the Mondai archive (ritacompany/mondai, attached read only,
   PRODUCT_KNOWLEDGE_ARCHIVE.md read 9 Nov) or his own words; the trace list is in
   reference/cs2/versions/hero-and-ending.md.
4. Fit: measure.mjs, Satoshi from site/assets/fonts at the widths in tactics/measure-r3.md (hero left 440 at
   Medium 24, ending headline 708 at Medium 40, 115 percent, minus 4 percent) and Haven's right column
   (473 at Regular 16, 140 percent, minus 1 percent). Controls: the current hero left line measures 3 and
   the current ending headline 3, matching measure-r3.md; a planted overlong headline measures 5 and is
   caught. Rules: left line at most 3 lines, right column at most 10 lines (Haven's is 9), ending headline
   exactly 3. Result: FIT_OK. Every left line 3, every right column 10 (from 11 before trims), every
   ending headline 3 (B and C were 4 before trims). Ending bodies, for reference at 473: A 7 lines, B 6, C 6.
5. Reader check, three Sonnet runs per round (reader-check/runs/2026-11-09-hero-end). Round 1: all six
   versions PASS. Re-check round, the same six plus a planted bad version in each file (unexplained
   product terms and a process story in the hero; restated Rollover and Buffer flow facts and a process
   story in the ending): both planted versions FAIL on every planted fault, 3 of 3, so the check catches
   what it should. Hero A, B and C PASS again. Ending B and C PASS again. Ending A FAIL, Q1 no design
   decision, 3 of 3 (round 1 had 2 of 3 yes, so 4 of 6 runs over both rounds found no decision). Not
   rewritten: a third round this turn is refused by the cost guard, so the text shown is the text checked,
   and the one line fix waits for his pick. Single run notes below the 2 of 3 bar: one reader in round 1
   found calendar integration unexplained in hero A and B (left as is; it is his own Background wording and
   the calendar blocks pay it off).
