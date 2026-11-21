# Design system CS: the concept

**Parked 23 Oct (his call).** No direction is set for the whole case study yet; the story is found
from the material after the next pass (`DECISION-INVENTORY.md`). Sections 1 to 3 (the research) stand.
The concepts in section 4 and the outline in section 5 are not the direction.

23 Oct 2026. Concept chat, started from the Mondai design system lead chat on his ask of 23 Oct: a
design system case study that does what a normal one does but catches a hiring manager's attention,
with the AI work placed deliberately. Answers his five questions, each with a verdict and its
evidence. Not copy: the protocol's frame and decision list come before any sentence
(`docs/about-source/CASE-STUDY-WRITING-PROTOCOL.md`, section 3).

**Sources.** Outside research for this file was run on 23 Oct in three strands, saved in
`research_notes/Design system case study hooks/` (hiring signals, the AI design system landscape,
story structure; every page that failed or was paywalled is listed there). Every outside claim used
below went through a claim check in a fresh context: `claim-check.md` in the same folder. It builds
on the 19 Oct readiness research (`reports/Design system case study readiness.md` on PR #4's branch, not yet on main) and the Mondai
research of 2 Oct (R5, R7 and R9 in the Mondai repo, `design-system-ai/research/`).

Mondai evidence is pointed to, never copied: this repo is public and Mondai source material, or
anything quoting it, stays out of git (`reference/cs2/CS2_PROCESS.md`, Storage). Every Mondai number
here is in the Mondai evidence log (`design-system-ai/EVIDENCE.md` and
`design-system-ai/evidence/AGENT-TEST-BEFORE.md`) with its source and check.

## The answer in one screen

- **The pick: Concept A, the agent usability test.** He usability tested his design system with the
  AI agents that now build from it, the way a designer tests anything with a new user. Their
  mistakes were the system's defects: names, roles and states. He fixed the system, not the agents,
  and tested again.
- **Why it stands out.** It is a design system case study made of design work a reviewer can judge
  (a test, findings, fixes, a retest), with the failure on the page and a scoring check proven on
  planted mistakes. Engineers have started publishing agent tests of code packages since late
  September; nobody found in this research has published one on a Figma library run as user
  research, with the grader proven first and the behaviour score measured before and after.
- **Where the AI sits.** Named on the first screen as the method, under his judgment, then one
  thread through the story with one full scene at the failure. Not saved for a reveal and not
  leading as technology.
- **What only he decides:** the three calls in section 6.

## 1. What makes a design system case study stand out in 2026, and what makes most forgettable

**Verdict.** The forgettable one is a gallery told as "we", walked through as process and closed on
an adoption claim with no count. The one that stands out is an argument: a few decisions with their
cost, owned by "I", proved with something a reviewer can inspect, including a failure. For AI work
the bar moved in 2026 from using AI to governing it: reviewers expect AI in the work and distrust it
when it shows only as polish or speed.

What stands out, with its source:

| Signal | Evidence | Strength |
| --- | --- | --- |
| Decisions and trade offs, not process | Budi Tanrim as reported by Jeff Humble: a portfolio is weak "if it does not help him determine whether a designer can make a good decision" (R5); Tom Scott: "Too many sticky notes. Not enough outcomes" (2025) | Named voices, consistent since 2025 |
| An argument, not a gallery | Balint Bogdan, Jul 2026: the strongest portfolios "feel less like galleries and more like arguments" | One named voice; matches the protocol's premise |
| Clear ownership | Tom Scott: "focus on I"; vague "I led" language is a red flag (R5) | Named, repeated |
| Lead bar: live, traceable, scaling | Harry Enaholo reviewing for a Design Lead role (Humble's account of his post): "are these products live and traceable, and if they are live, are they scaling?" | One reviewer, secondhand |
| AI governed, not just used | Careem's 2026 design system role lists "AI-assisted audits and linting to catch off-system usage and token misuse before shipping" and structuring the system "for agentic design-to-code"; Figma's 2026 hiring research: AI fluency wanted together with human judgment | Employer evidence; one posting is not a trend |
| AI shown with its failures | ADPList (2025): "One of the biggest mistakes designers make in AI portfolios is showing only the polished end state"; Learnist (2026): a case study that only shows the winning approach "looks like it was written after the fact" | Practitioner advice |
| Something hard to generate | Bogdan: include dead ends and recorded walkthroughs; ADPList via Humble: "Record a 5-minute Loom of you working with AI" | Practitioner advice |
| Honest counts for a small system | Sujeet Jaiswal (2026): coverage, detachment and token purity as countable proxies; "Manual audits decay"; any gain needs a stated baseline (Learnist) | Engineering view, not a hiring voice |

What makes most forgettable: the component gallery and token tables (inferred; still not said by a
named hiring manager on an opened page, the same gap R5 and the 19 Oct notes found), process
recital, "we" language, AI as polish (Aneta Kmiecik, in Humble's account of her view: AI "becomes a sign of
sameness rather than capability") and speed or adoption claims with no baseline.

Limit on all of this: no named hiring manager on an opened page speaks about design system case
studies specifically; the one specialist voice found (Justine Montgomery, ex Stripe design systems)
is paywalled on both posts the research found (from the research notes, not re-checked). The table is general senior hiring advice plus one employer posting,
applied to a design system.

## 2. Is the AI scalable system the hook?

**Verdict: one part of it and not enough on its own. It is not the hook.** The system (agents building
from the library, checks proven on planted mistakes, strategy document to handoff) is the strongest
proof of seniority in the story and the weakest opener, for three reasons.

1. **Its surface is now table stakes.** A census of 21 public design systems (Kaelig
   Deloumeau-Prigent, data Jul 2026) found 20 with an MCP server, 19 with an agent skill and 15 with
   llms.txt; zeroheight's hero line is "Get teams and agents building from your design system".
   "Two audiences, people and agents" is where the field already is.
2. **Its headline number is a speed claim.** Journey and Student Advisement: 172 screens in about 40
   hours of measured working time, and fixes and handoff took longer (14.9 hours) than building
   (12.8 hours) (Mondai `EVIDENCE.md`). Honest and useful inside the story; as a hook it is the speed
   claim with no quality measure that the research reads as weak.
3. **It risks the scope rule.** The operation and the team belong to the leadership CS
   (`.claude/case-study-rules.md`, Scope). Told as the subject, the pipeline bleeds into it; told as
   what the design system makes possible, it stays here.

The candidates he named, judged on evidence that exists today:

| Candidate | Distinctive in Oct 2026? | Evidence today | Verdict |
| --- | --- | --- | --- |
| Agent experience: the system designed for agents as an audience | The label is rarely applied to design systems; the framing is common | Agent usability test, before: three fresh agents, a fixed brief with no skills or repo files, one known screen, mean 31 mistakes a build (24 to 40), nine problems recorded across the runs, seven of them in the library itself (names, roles, states, a component, trimmed text boxes); the other two trace to the reference screen and to what the API can set | **The hook, carried by the test, not the phrase** |
| Measured before and after | Rare: NordVPN's Aurora benchmark reports an after only on its audit score, not on agent behaviour | Before: scored by a check that caught 8 of 8 planted mistakes. After: not run | **The payoff. Missing until the after run** |
| The failures and how they were fixed | The strongest pieces now name a passing check that lied (Kaelig: tests passed while all 27 tokens were invented) | 20 Sep: agent screens passed the scale audit and were wrong by eye (buttons, sidebar); checks rebuilt to read real Figma data; label check caught 5 of 6 planted mistakes, then 6 of 6 | **The turning point. Strong now** |
| The operating model he runs | Common as a claim, rare with a decision record | Five stage pipeline, decisions logged with who decided, vetoes; 172 screens in about 40 hours | **The close.** One section, framed as what the system enables |
| Strategy document to handoff in hours | Common as a claim; no piece found starts from a strategy document | Peer Connect baseline (six calendar days from strategy screenshots to merged handoff; about 44 hours clock time from first flows to merge); no timed run against it yet | Inside the close, only once measured |

**Steal the thunder (t25).** Agent tests of design systems now exist: Aurora (Christoph Hellmuth at
NordVPN, written up 13 Oct 2026: intent tasks, worst of three runs, audit 64.8 against behaviour
44.9, "The audit score is always the optimistic one") and a five arm experiment by an engineering
manager on dev.to (7 Oct, 30 scored runs). Both test coded component libraries shipped as npm packages and are run by engineers; Aurora
grades 30% of its score with a model judge and reports no proof that its grader catches planted
mistakes. The case study names them in one line and owns the four things neither does: a Figma
library, a designer running it as user research, the grader proven first and the behaviour score
measured before and after.

## 3. Where the AI belongs

**Pick: stated up front as the method under his judgment, then one thread through the story with
one scene. Not a late reveal and not the headline technology.**

- **Not revealed at the end.** Readers see 20 to 28% of a page's words (NN/g, Weinreich, 25 users),
  so the reader who decides may never reach a late reveal. Readers told the ending first enjoyed
  even twist and mystery stories more, when the spoiler sat before the story, not inside it
  (Leavitt and Christenfeld, three experiments). And disclosed AI use costs trust, with exposure by a
  third party the worst case (Schilke and Reimann, 13 experiments, more than 5,000 people); a late
  reveal reads closer to being found out. That last link is reasoned: no study tested AI placement
  inside one case study.
- **Not leading as technology.** The trust cost attaches to the AI label with the work held
  constant, and a tool led opening reads as a tutorial (R7: Nervegna's 23 section guide). The
  headline carries the decision and its result; the agents appear as the method, framed by what he
  set, checked and overruled.
- **One thread, one scene.** Woven evenly through every section, the AI becomes the rationale
  recital (t48). It enters as the user the story needs, takes one full scene at the failure (t31,
  scene for minutes) and stays in the skim layer so the skimmer leaves with it.
- **The shape:** outcome first in a block above the story (t06 answer first), the story as the
  derivation (t19 howcatchem), the failure told blameless (t29), the AI never cast as the villain
  (t47).

## 4. Three concepts

### Concept A: The agent usability test (the pick)

- **Angle.** His design system got a new user: the agents that build from it. He ran a usability
  test with that user, read the system's defects in its mistakes and fixed the system.
- **Spine, six beats.**
  1. The system he built for people, from a button, a palette, four brand images and two typefaces
     (`reference/design-system-cs/ANSWERS.md`, item 4): two decisions from the original build,
     shown on real screens.
  2. It got a second user. Agents now build Mondai's screens from it.
  3. The pass that lied. Agent screens passed every check written for them and were wrong: the
     buttons were not the system's buttons. A check that can fail is not enough; it has to fail on
     the mistakes this user makes.
  4. The usability test. A fresh agent with a fixed brief and no skills or repo files, one known screen, three runs, every
     mistake counted by a scoring check proven on planted mistakes first. Seven library
     defects across the three runs, plus two problems that trace to the reference screen and the API.
  5. The findings were design flaws. A colour role named like a size, two green text roles with no
     description of which is for labels, a button named for the wrong size, a date state no agent could find, text
     boxes that hide their real spacing. He fixed the system rather than the prompt and ran the test
     again.
  6. What a system both users can read makes possible: strategy document to checked handoff with
     every call his, and where it still breaks.
- **Not a normal design system case study because** its findings come from research with a user,
  not from an audit, and its fixes are design decisions about names, roles and states that a
  reviewer can judge for themselves. It answers the 2026 bar (AI governed, failure shown, an
  inspectable artefact) inside a design system story instead of beside it.
- **Where AI sits.** Named on the first screen as the user and the method; the user in beat 2, the
  failure in 3, the participant in 4, the reason for the fixes in 5, the workforce in 6.
- **Rests on.** The before record (three runs, scored); the 20 Sep failure; check ledger rates;
  Peer Connect baseline; screens and hours per sprint.
- **Missing.** The after run (the payoff); two decisions from the original build (beat 1); which
  defects he fixed and why, as decisions with alternatives and costs; whether people made the same
  mistakes (section 5).

### Concept B: A pass worth trusting

- **Angle.** When agents do the building, a design system's value moves from its components to
  whether it can tell real use from imitation (the 2 Oct story draft, Mondai
  `design-system-ai/STORY.md`).
- **Spine, five beats.** The system he built; agents imitated it and passed; he rebuilt the checks
  to read the real file; the checks were tested on planted mistakes before their passes counted;
  what an earned pass makes possible.
- **Not normal because** its subject is verification, which design system case studies rarely touch.
- **Where AI sits.** From beat 2 on, as the thing being checked.
- **Rests on.** The 20 Sep failure; the check ledger; the vaccination records. Complete today.
- **Missing.** A check catching a real agent mistake after the rebuild, recorded.
- **Why not the pick.** Its subject is checks, so the design system becomes the setting and a
  reviewer judging design system skill sees quality assurance. Since early October it is also less
  rare: Kaelig's 27 invented tokens and Aurora's "the audit score is always the optimistic one" tell
  the same turn. Its best beat is beat 3 of Concept A.

### Concept C: One system, two audiences, one operator

- **Angle.** A design lead who turned the system he built into the engine of a way of working:
  strategy document in, checked screens and handoff out, people and agents building from one source.
- **Spine, five beats.** The system; teaching it to people; teaching it to agents; the pipeline; the
  numbers (screens, hours, baseline).
- **Not normal because** of scale and the operating model.
- **Where AI sits.** Leading.
- **Rests on.** Screens per sprint, working time, Peer Connect baseline, the decision record.
- **Missing.** A timed run against the baseline; any quality measure beside the speed.
- **Why not the pick.** It leads with the most common claim in the field (20 of 21 public systems
  in the census already serve agents), it leads with the AI label the trust research penalises, it
  bleeds into the leadership CS, and "two audiences" describes rather than argues.

**The pick: A.** It is the only concept whose central act is design work a hiring manager can
judge, it rests on the evidence hardest to fake (a scored before record with a proven scoring
check), and it holds B and C inside it as beats 3 and 6 instead of discarding them.

What would change the pick: if the after run shows no drop in mistakes, A loses its payoff. Then
the honest version is A told as a null result (the system's names were not the problem, and here is
what was), or B, whose evidence is complete today.

## 5. The outline for Concept A

### The frame (protocol section 1)

1. **Who reads it and what they decide.** A hiring manager for a senior or lead product design role
   deciding from the first screen whether to spend ten more minutes.
2. **What it argues.** When agents build from a design system, their mistakes are the system's
   usability defects, so the fix is the designer's job: test with the agent, fix the system, test
   again. Contestable: most teams answer agent mistakes with better prompts, more rules files or
   more documentation for the agent.
3. **The one thing they repeat.** He usability tested his design system with AI agents, and their
   mistakes showed him what was wrong with the system.
4. **What is at stake.** Screens that look like the system and are not, signed off because a check
   said pass; and a system only its author can use correctly, whether the next builder is a
   volunteer designer, a developer or an agent.

### The decisions, in order (protocol section 3)

Each needs what was at stake, the real alternative, why and the cost before it is written.

| # | Decision | Evidence (Mondai repo unless named) | Still needed |
| --- | --- | --- | --- |
| D1 | Two decisions from the original build | `reference/design-system-cs/SOURCES.md` sections 2 and 3 in this repo (candidates: colour carries meaning; the mono and Heebo label split; dark only) | His pick of the two, with what each cost |
| D2 | Reject the passing agent screens and rebuild the checks to read real Figma data | `cohorts/GATES-html-superseded.md`; `cohorts/REBUILD.md`; `EVIDENCE.md` act two | Nothing; the quotes stay in Mondai and are paraphrased here |
| D3 | Test the system with agents instead of writing more rules for them | `design-system-plan/PLAN.md` (the agent usability test); `evidence/AGENT-TEST-BEFORE.md` protocol | The alternative turned down, in one line (t24: refute it, do not just mention it) |
| D4 | Fix the system, not the prompt: the renames, roles and states chosen from the seven library defects | `AGENT-TEST-BEFORE.md`, "What went wrong in all three" | Which he fixed, which he left and why |
| D5 | Where agents stop and he decides | `mondai/reference/DECISIONS.md` (Decided by lines) | The veto log, see the capture list |

### Sections

Two readers, two budgets (t35): each section's argued heading and first sentence are the skim path
and carry the AI fact; the body is the read path.

1. **Opening block.** Title and one line: the system's newest user is an AI agent, so he tested the
   system with it, and its mistakes were the system's. One image: the reference screen beside an
   agent's build with its mistakes marked. Nut graf (t17): what the page proves and why now. The
   outcome sits here, above the story, not inside it.
2. **The system he built (short).** D1, on real screens. No timeline, no component gallery.
3. **A second user arrives.** One paragraph. Chekhov's rifle (t18): plant the volunteer designers
   and developers who also struggled to build from it, only if the human mistakes are captured (see
   the capture list), so section 6 can pay it off.
4. **The pass that lied.** D2. The one full scene (t23, t31). Blameless (t29): what signal existed
   and what changed.
5. **The test.** D3. Method in four lines; counts, never percentages ("in all three runs"). The
   scoring check's own proof in one line (t11). Steal the thunder (t25): the engineering benchmarks
   in one sentence, and what this test does that they do not.
6. **What the test found.** The seven library defects grouped as design flaws: names that mislead, roles with
   no description to tell them apart, missing states, text boxes that hide their spacing. Clues before the
   reveal (t14): show one agent mistake, let the reader find the name that caused it.
7. **The fixes and the retest.** D4. Before and after on the same saved reference, same brief, same
   model. Before and after asserts a cause (t12): say what else changed between runs.
8. **What it makes possible.** D5 and the operating model in one section: strategy document to
   handoff with every call his, and where it still breaks (fixes took longer than building). The
   team and how it ran stay in the leadership CS.
9. **Limits (t28).** Three runs per test, one screen, one model; an agent is not a person.

Inoculate (t26) in section 5 against the obvious interview question, "you tested a prompt, not a
system": the brief, model and screen were fixed in writing before the first run. The after run
changes only the system.

Title: open. "Your next design system user is an agent" is already the title of an earlier Murphy Trueman essay (about mid 2025, referenced in his 25 Jun 2026 post), so
"second user" is a beat, not the name. Titles are written last, from the sections
(`reference/cs2/CS2_PROCESS.md`, The idea).

### Evidence still to capture

Not duplicating the evidence chat ("Mondai: design system case study evidence"), which owns the
agent test, the evidence log and timing. Items in its lane are listed so the outline can be written,
not to restart them.

| What | Why | Who captures it |
| --- | --- | --- |
| The agent test after run, same protocol and saved reference, three runs | Sections 5 and 7; without it Concept A has no payoff | Evidence chat (its lane already), once the defect fixes land |
| A fix list: each of the seven library defects tied to a library change or a reason it was left, with the date and his call | D4; turns findings into decisions | Library thread ("design system library pages, wave 1") makes the changes; evidence chat logs them |
| A recording, about five minutes: an agent builds the test screen from the library, the scoring check marks its mistakes | The inspectable artefact the 2026 sources ask for; the opening image | Evidence chat, on the after run's first build |
| A veto log: date, what an agent produced, what he rejected, why, what changed | D5; makes his judgment visible | Evidence chat, from `DECISIONS.md` and the cohorts records |
| Two decisions from the original build, with alternative and cost | Beat 1, D1 | Him, in a portfolio chat, choosing from the `SOURCES.md` candidates |
| Human mistakes on the same system: the volunteer designers' and developers' 2025 errors matched against the seven library defects | Pays off "fix the system, not the user" and makes the agent a stand in for any new builder | Portfolio design system CS chat, from the Discord export `SOURCES.md` lists at `~/Documents/CS2-research/discord-work/flat.json` (outside git); a match table only, no quotes |
| A timed feature against the Peer Connect baseline, in the same two units | Section 8, only if measured | Evidence chat (timing is its lane), on the next feature run |

## 6. What he decides

1. **The pick.** Concept A. It is how he is presented, so it is his yes. Yes means the outline above
   is the working order; no means Concept B, whose evidence is complete today but whose subject is
   checks. Pick: A, because its central act is design work a reviewer can judge.
2. **The two decisions from the original build.** Only he holds them.

Decided here, not his to arbitrate: the after run waits for the library thread's defect fixes, so it
measures them; run before them it would only repeat the before.

Held as a working order, not a fixed narrative: the framework CS learned that a story picked first
and then filled in fails (`reference/cs2/CS2_PROCESS.md`, The idea). The decisions get written
first; the spine is confirmed or changed by them.
