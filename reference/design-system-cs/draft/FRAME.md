# Design system CS: frame, decisions and sections

7 Nov 2026, "Design system CS: first draft" session. Protocol order: frame, decisions, evidence,
then sentences (`docs/about-source/CASE-STUDY-WRITING-PROTOCOL.md`). The draft is `DRAFT.md`; every
number in it is a row in `CLAIMS.md`. Nothing here quotes Mondai sources or him: this repo is public
(`reference/cs2/CS2_PROCESS.md`, Storage), so claims point to Mondai paths.

## The frame

1. **Who reads it and what they decide.** A hiring manager for a senior or lead product design role
   (design systems or a product team that runs on one), deciding in a scan whether he can be
   trusted with a system other people and agents depend on, and whether to read on.
2. **What it argues.** A design system is only as good as the work of someone who is not its
   author, so I measured mine by what other people and agents got wrong when they built from it,
   and fixed the system, not them. Contestable: the usual measure is the library (components,
   variants, coverage), and a reasonable lead would say the author's own output is what counts.
3. **The one thing to repeat.** He tested his design system like a product: three agents that had
   never seen it rebuilt one screen and made 24 to 40 mistakes each, and he traced the mistakes to
   the system (names, missing states, rules that lived in his head), not to the agents.
4. **What was at stake.** Every screen built off the system lands in his review as rework; when
   agents started drawing screens, checks passed screens that were wrong, so the system could fail
   with every light green. Screens did not get faster; the question was how much of each sprint went
   to fixing.

## The decisions, in order

Ordered by cause (t15): the method first, because it is what found the others.

1. **Measure the system by its readers, not its author.** The 20 Sep pass that lied, then the agent
   usability test (22 Oct). Alternative: library counts. Cost: an honest baseline that looks bad
   (mean 31 mistakes a build) and an after run still owed.
2. **One grid and spacing roles, with the invented values deleted.** 23 Sep grid; 27 Sep area
   spacing judged on eight screens; 2 Oct ladder gaps filled. Alternative: remap screens to the old
   ladder. Cost: 122 links still raw; every desktop layout affected.
3. **A component is decided by interaction, not repetition.** 2 and 6 Oct, after 41 element types
   were marked as new components. Alternative: the common three screen rule. Cost: more written
   rules and fewer components, so the rules have to be readable.
4. **A check counts only after it catches planted mistakes.** Label check 5 of 6, fixed to 6 of 6;
   grid audit 27 of 33; the agent test scorer 8 of 8. Alternative: trust a green check. Cost: time
   on every new check.

The thing that went wrong, told in section 5: the 20 Sep checks passed screens with buttons the
system never had (t29). The 19 Sep thirteen agents at once is a second wrong turn, kept short.

## Sections

| # | Heading (argues, t36) | Job | Deliberate tactic | Visual |
| --- | --- | --- | --- | --- |
| 1 | Built for anyone who is not me | Answer first: problem, what changed, before and after numbers | t06 answer first, with the Rakbank number cards (a "from" under each) | The same screen: the settled M4.1 Mentor home beside an agent's build of it from the library, mistakes marked |
| 2 | The rules lived in my head | The problem, counted, as a real definition | t01 the deep issue: goal, complication, question | Three count tiles from the 1 Oct audit (CleverX style) |
| 3 | Every value gets one job and a name that says it | Foundations: grid, spacing, states | t21 name what it cost | One real screen with spacing roles labelled in place (Flex style) |
| 4 | A component says what; a rule says when | Library and usage rules for people and agents | t02 state the warrant | A component page with its usage note beside the variant grid |
| 5 | A check that cannot fail is not a check | Scale: checks proven on planted mistakes, the agent test, the time numbers | t29 the wrong turn and the signal | The agent test table, three runs by mistake type |
| 6 | Still imperfect, dated so it can be checked | What is not done, written to be updated | t28 the limitations paragraph | None; a dated list |

## Scope

The framework CS owns colour meaning, the mono and Heebo label split and sentence case
(`reference/cs2/reasoning/design-system-and-voice.md`); this draft does not use them. The leadership
CS owns the team and the operation; the July 2025 workshop appears only as evidence that the system
did not carry its own rules. The agent pipeline appears only as a reader of the system.

## Open, only he can answer

- Which two decisions from the original 2024 to 2025 build he would defend first in an interview.
- Whether he worked on Peer Connect on 21 Sep (the day counts show no chat and no commit that day):
  the baseline is 5 days without it, 6 with it.
