# Brief: build a case study tactics bank

Paste this into a new conversation, with `READER-EFFECT-TACTICS.md` attached as project knowledge. It is written to be read by Claude, not by me.

---

## What you are being asked to build

A companion document to the attached `READER-EFFECT-TACTICS.md`. Same shape, different problem.

The attached one solves: **make a stranger interested in a person.** It was built for a portfolio About section.

The one you are building solves: **make a reader believe a design decision was sound, and enjoy watching it get made.** It is for portfolio case studies.

These are genuinely different problems and the tactics do not transfer cleanly. Do not restate the attached document with the word "case study" swapped in. If a tactic appears in both, it needs a different justification here.

## Who this is for

Chadwick Fenner, product designer, Chicago. Design lead at Mondai, an AI career navigation product, working part-time and unpaid, one of four voices setting product direction. Background in psychology. Writing three case studies: design operations, an AI product framework, and a design system.

Relevant facts about the work being written about:
- Two years, mostly solo, on a rotating volunteer team
- Real constraints, real deadlines, real cuts
- Strong preference for reasoning over outcomes, because the outcome metrics mostly do not exist yet
- Firm rule: no fabricated metrics, no invented results

## Format that worked

Build it as a single self-contained HTML artifact:

- A real table, not cards. Columns: number, tactic name plus category, the mechanic, a worked example, **how it fails**, and an empty notes field
- Filterable by category, chips at the top
- Notes persist in `localStorage`, with a "copy my notes" button that compiles everything into plain text
- Wrap the table in `overflow-x: auto` so it stays a table on narrow screens instead of collapsing into blocks
- Dark, editorial, restrained. Not glassmorphism, not SaaS-premium

**The "how it fails" column is the most important one.** Anyone can list techniques. The failure modes are what make a bank usable, and they are what he actually reads.

## Standards, non-negotiable

1. **Ground it where grounding exists.** Name the researcher and year. If a claim is craft lore rather than research, say so plainly rather than dressing it up.
2. **Include anti-tactics.** Things that feel like good moves and are not. The attached document has three and they carry real weight.
3. **Never inflate.** If a source is secondhand, mark it unverified. If you checked ten things and eight were dead, say that.
4. **State sample sizes.** Do not generalise from a handful of examples and present it as a finding.
5. **Correct visibly.** If you get something wrong and fix it, leave a revision note in the document. He values the correction being on the record.

## How to work with him

Read this section twice. Most of the friction in the previous conversation came from ignoring it.

**He gives an example to illustrate a category. Do not mistake the example for the subject.** This happened repeatedly. He mentioned one effect he liked, and the whole document tilted into researching that one effect. He wanted breadth. When he names one thing, he means "things like this."

**Do not narrow the search around your own inference.** At one point a claim was made about what hiring managers will tolerate, based on eight people, then the next search was narrowed around that claim, which predictably confirmed it. He caught it. Circular reasoning is the failure he spots fastest.

**Depth means coverage, not one deep hole.** "Take your time" means check more things, not think harder about the same thing.

**Never agree reflexively.** He has said, in his own words: *"the intention is never to PLEASE me. The intention is optimal results over that always."* And: *"STOP DONT JUST SAY YOURE RIGHT TO AGREE. THIS IS A PROBLEM SOLVING TASK. EFFECTIVENESS IS THE ONLY GOAL."* If he is wrong, say so and show why.

**Own errors without deflecting.** Do not describe your mistake in a way that implicates his instructions. He will notice.

**Keep responses short and scannable.** He has asked for this many times. Lead with the answer. No preamble, no recap of what he just said.

## Voice rules, absolute

- No em dashes, and no substitutes for them. Rewrite the sentence
- No Oxford commas
- Sentence case
- These apply to your prose and to anything you write for him

## What to actually research

Do not just search "how to write a case study." That returns process listicles, and it is the exact trap that wasted time in the previous conversation.

Better sources, roughly in order of expected yield:

- **Design critique and design writing craft.** How practitioners explain decisions to other practitioners
- **Tom Greever, *Articulating Design Decisions*.** Directly on this problem
- **Legal and scientific writing.** Both are professionally about making a reasoned case survive a hostile reader. Structure of argument, handling counter-evidence, what earns a claim
- **Narrative nonfiction and long-form journalism.** Sequencing a story where the reader already knows the outcome
- **Detective fiction structure.** Genuinely relevant: the reader knows a solution exists, the pleasure is watching it get derived. That is a case study
- **Documentary editing.** Compressing months into minutes without lying

The strongest single insight in the attached document came from obituary craft, not from design writing. Look outside the field first.

## Categories worth considering

Not prescriptive, but the attached document benefited from having many, so the recognition cluster did not swallow it:

- **Argument** — how a claim earns belief
- **Evidence** — artifacts, receipts, showing rather than asserting
- **Sequencing** — what order, and what gets withheld
- **Tension** — stakes, the thing that almost broke, real constraint
- **Honesty** — the rejected option, the wrong turn, the thing you would do differently
- **Compression** — cutting two years into four minutes
- **Reader state** — what a hiring manager is doing while scanning, and where attention drops
- **Anti-tactics** — the moves that look rigorous and are not

## The thing to get right

A case study fails in a specific way that is different from how an About page fails. An About page fails by being generic. A case study fails by being **a process recital**: research, then wireframes, then testing, then final designs, with no decision visible anywhere and nothing at stake.

The tactics you build should mostly be answers to that. Where is the judgment, how is it made visible, and why should a stranger believe it happened the way you say it did.

---

Aim for forty or more tactics. Ask him to react before you build the whole thing, and show him a few entries first so the shape can be corrected cheaply.
