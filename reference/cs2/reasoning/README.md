# reasoning/

Synthesis of how each decision was actually argued, built from the conversation corpus rather
than from memory or from the archive.

## What belongs here

The deliberation. What was on the table, who pushed, what was given up, what changed someone's
mind, what was wrong first. The archive holds settled state. This holds the argument that
produced it.

## What does not belong here

Restated mechanics. If a claim is already in `reference/PRODUCT_KNOWLEDGE_ARCHIVE.md` as a rule,
it does not get repeated here unless the record shows the rule arriving differently than the
archive says.

## Rules

1. **Every claim carries a speaker tag and a citation.** Speaker is Chadwick, Michael (reported),
   or Claude. Citation is `[YYYY-MM-DD slug #NNNN]`, where NNNN is the turn index in the corpus
   transcript for that date.
2. **Nothing is reconstructed.** If the record does not hold it, the file says the record does not
   hold it. A confirmed gap is worth more than a plausible reason nobody had.
3. **Quotes are verbatim**, typos included. They are the point.
4. **Corrections to the archive get flagged in their own section**, not folded into the narrative.

## Corpus

Source transcripts are the filtered Mondai conversation corpus, 154 conversations, built by
`tools/build_corpus.py` from the Claude account export. The corpus itself is gitignored because it
contains full unredacted conversation text. Citations are stable regardless: filename plus turn
index.

## Reading order

Start with `THROUGHLINES.md`. It carries the patterns that cross topics and the summary of where the
archive and the record disagree. The topic files hold the evidence.

## Status

- `carry-over.md` : rollover, flex points, the weekly assembly model. Complete.
- `action-item-page.md` : an output format for an AI rather than a feature set, the registers,
  the not-a-document rule. Complete.
- `ai-surfaces.md` : the eight-product study, the research audits, why the surfaces never
  share a container. Complete.
- `calendar-and-schedule.md` : the two clocks, schedule as assistance not commitment, control
  placement. Complete.
- `design-system-and-voice.md` : sentence case, colour meanings, the mono and Heebo split,
  and his rules for AI output. Complete.
- `capacity.md` : collection point, edit surfaces, bounds, the Recalibration recommendation,
  live versus commit preview. Complete.
- `onboarding.md` : the anti-step constraint, tutorial action items, empty states, the nav
  argument taken to Michael. Complete.
- `pathways-and-hierarchy.md` : what was designed versus inherited, the two zones, sequence
  gating. Complete.
- `start-of-week-states.md` : why a Sunday moment exists, how five states landed, the Reset
  decision. Complete.
