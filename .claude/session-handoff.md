# Handoff from the Mondai session, 5 to 6 Sep 2026

Read on demand, not injected. Everything here exists only in a conversation that is about
to end. The record holds decisions. This holds work in progress, evidence, and locations.

---

## 1. LIVE WORK. Band and hero, written but not reacted to.

These were produced at the very end of the session and Chadwick has not seen a reaction
through yet. They are the current step. Do not regenerate them, put them in front of him.

**The band.** Its job: carry systems thinking early, catchable by someone who reads nothing
else on the page. Full-bleed light panel interrupting the black. Not a label strip, because
a list of nouns is the false-uniqueness trap that killed nine earlier lines.

B1, performed rather than stated. The repetition is the point and the third line breaks it.
```
EVERYTHING IS CONNECTED TO SOMETHING.
EVERYTHING IS CONNECTED TO SOMETHING.
EVERYTHING IS CONNECTED TO SOMETHING ELSE.
```

B2, his own words, one line, large.
```
I MAP HOW THE PARTS HOLD EACH OTHER UP.
```

B3, cause and effect shown, two lines, nothing else.
```
MOVE ONE THING.
SOMETHING ELSE MOVES.
```

**The hero.** Chicago is out, "I make complicated things feel obvious" is cut as cliche,
2am is available but not owed a slot. Must not repeat the band.

H1 `> Product designer. Mostly in Figma, frequently at 2am. New York shortly.`

H2 `> I design the parts of a product nobody thinks about until they are wrong. New York shortly.`

H3 `> Product designer, New York shortly. Everything else is on the rest of this page.`

**Recommendation was B1 and H1.** B1 because it performs the idea instead of announcing it,
the break reads as deliberate rather than a typo, and it fits the surreal anti-design register
in his own Portfolio Summer 2026 brief. H1 because with B1 carrying the thinking claim, the
hero only owes role, personality and location. If B1 feels too clever at that scale under
CHADWICK, B3 does the same job with more weight and less performance.

---

## 2. THE TEST HE IS OWED

A diagnosis was made and it is unproven. It needs measuring, not more theory.

**Baseline, already measured:** 13% correction rate across 12 sessions and 275 unique
messages. Portfolio work ran at 19%, setup work at 3%. After a message from him over 1000
characters, the next message was a correction 27% of the time.

**Instruction load:** Mondai folder 216, portfolio folder 94 before the cut, 67 after.
Published guidance puts the reliable ceiling near 150 to 200 including roughly 50 that
Claude Code itself uses.

**The test:** work normally for a week in the portfolio folder, then re-measure. If the
correction rate has not moved, instruction load was not the cause and the diagnosis was
wrong. Say so rather than defending it.

---

## 3. WHAT CHANGED IN THE SETUP AND WHY

- `now.md` states the live step and is injected LAST, closest to his message. This is the
  ledger pattern. Position is deliberate: whatever is nearest wins, so the current step has
  to be nearest. Update it the turn a step completes.
- `dead-claims.txt` plus its Stop hook blocks any turn that asserts something already known
  false. It permits discussing one as dead. Add a line the moment something is found false.
- Case study, evidence and build rules moved to `case-study-rules.md`, read on demand only.
- Em dash and Oxford comma lines were removed from the rules text because a hook already
  enforces them. Stating a rule that a script enforces spends budget for nothing.

**Known defect:** `copy-check.sh` false-positives on CSS custom properties and command flags,
because both use two hyphens. It skips style and script blocks, but an Edit passes only a
fragment with no opening tag, so the skip does not fire. It blocked a legitimate edit.

---

## 4. LOCATIONS

- Figma, Portfolio Design file. WIP Home 1 is node `3168:15213`, WIP Home 2 is `3414:1683`.
  Home 2's about column is `3450:16774`, its hero `3450:16711`, its placeholder band
  `3450:18536`. Home 1's Current role block is `3450:19825`.
- The record audit artifact, holding his 75 rulings in its own database:
  `https://claude.ai/code/artifact/fa7cfba6-e567-4845-8ba3-307c9aeaf71d`
- The two prior sessions' full transcripts are on disk at
  `~/.claude/projects/-Users-chadwickfenner-Documents-Claude-Mondai/`, the large ones being
  `057be924...jsonl` and `57b7edc0...jsonl`. The `/transcripts` skill reads them.
- Corpus, his side of prior sessions, and the 45 tactics are in `docs/about-source/`.

---

## 5. STILL OPEN, AND WHAT NOT TO REDO

Open, in order: band and hero, then superpower slots one and two, then what else section 3
carries, then one tactics pass across the assembled page. His call any time: which WIP layout,
and where the Mondai role paragraph lives.

Section 3 is the hard one. He cut every candidate found so far, so it needs new material
rather than another pass over the same pile.

**Do not redo:** the ten attempts at a paragraph between the Mondai block and the psychology
block. The twelve dead theories in the record. Any of the rejected lines. The corpus has been
searched several times for a private-disclosure seam and there is not one, because he writes
about problems rather than about himself.

**A Mondai-side bug that never got fixed:** `mondai/SKILL.md` line 107 still reads "deliver
exactly what was asked for, no added scope" with no scoping to L1. That file travels to his
other accounts, so the contradiction with L3 exploration is still live everywhere except the
Mondai folder, where it was scoped correctly.
