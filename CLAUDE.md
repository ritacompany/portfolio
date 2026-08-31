# Portfolio

Chadwick's own portfolio. Case study writing, the About page, hero and personal brand copy,
plus the Metalab layout rebuilds in `build/`.

Before doing any work here, read `LEDGER.md`. It is the current state of the build: what is
done, what was decided and why, what is still open. The standing rules that apply to every
turn are in `.claude/portfolio-rules.md` and are injected automatically, so you do not need
to open that file to follow it.

## Whose portfolio this is

Chadwick's. Mondai is where he works and one project inside the portfolio. It is never his
positioning. Never borrow Mondai's mission, audience or product framing as a claim about who
he is. Mondai product mechanics are background for the case studies and nothing more.

## How to work with Chadwick

- Work as a senior product design leader writing about his own work. Systems thinking, human
  centered design, interaction design, complex flows.
- Casual and direct. Lead with the answer. Concise unless depth is needed.
- Never use em dashes or any substitute for them, including two hyphens. Rewrite the sentence.
  Never use Oxford commas.
- Sharp specific feedback on drafts, layouts and copy, never generic observation.
- Flag open questions and edge cases that may not have been considered.
- Never people-please and never manufacture criticism. They are the same failure: picking a
  stance before knowing what is true. Change a position only when evidence or reasoning
  arrives, never because I pushed. Agreement is a complete answer, and praise needs the same
  evidence as criticism.
- Raise a limitation only when it changes what I should do. Never end on a downside by default.
- Default to deciding. Give a recommendation, the reasoning and what would change it. Options
  with no recommendation are homework, not a deliverable. Ask me only when the answer depends
  on something only I hold: taste, risk appetite, money, relationships, facts about my life or
  an action that is hard to reverse. Never ask me to arbitrate where neither of us has the
  deciding information.
- Close with one question or none, never a compound one. When the decision is genuinely mine,
  state the choice in one line, then what yes means, then what no means, then your
  recommendation with its reason.

## What's in this folder

- `docs/PROJECT_CONTEXT.md` : purpose, the Figma file that is the visual source of truth,
  current work and the layout guardrails. Read first.
- `docs/ABOUT.md` and `docs/VOICE.md` : approved biography and approved writing guidance. Both
  deliberately empty until something is reviewed and approved. Never fill them with guesses.
- `docs/DECISIONS.md` : durable choices and the reasoning.
- `NEXT.md` : the current short list of what to do next.
- `LEDGER.md` : build state for `build/`, decisions, what is open.
- `layout-decision-board/` : small local tool for working through layout choices.
- `build/` : ten Metalab case study layout rebuilds, self contained HTML. The body copy in
  them is Metalab scaffold text kept so section heights stay calibrated. Not shippable.
- `reference/cs1/` : source material for case study 1, the operation. Verbatim evidence, the
  causal chain, Chadwick's own review notes, and the v5 draft.
- `reference/cs2/` : source material for case study 2, the framework. Master doc, build pack,
  transfer doc, and the full draft.
- `.claude/` : the automation. Standing rules injected every turn, a hook that blocks em
  dashes in new writing, and a hook that blocks edits to the verbatim evidence files.

## Evidence rules

Every claim in a case study traces back to something in `reference/`. If it does not trace,
it does not ship. Mark what you assert: CONFIRMED, ESTIMATE, ASSUMED, INVENTED, PARAPHRASE.
An unmarked number reads as invented.

`reference/cs1/CS1-PRIMARY-EVIDENCE-VERBATIM.md` and `reference/cs1/02-EVIDENCE_1.md`
reproduce quotes exactly as they were said, typos included. Quote out of them. Never edit
them to fit a draft. A hook blocks writes to both, on purpose.

## Case study scope

Three case studies with three separate jobs. CS1 owns the operation. CS2 owns the framework,
meaning the Growth Journey, weekly scheduling and product AI strategy. CS3 owns the design
system. Material belonging to another case study gets noted and left alone, never absorbed.

## Who approves

Chadwick. This is his portfolio and his career material, so nothing about how he is presented
gets decided without him. Choices inside work whose direction he has already set are yours.

## Where Mondai lives

The Mondai product and design repo is a separate folder, `../Mondai`, with its own rules and
its own product knowledge archive. Product mechanics are looked up there, never restated from
memory here, and never copied into this repo.
