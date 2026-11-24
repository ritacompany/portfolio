# Closer design system case studies: study notes

Captured 24 Nov 2026 so the fit set can be used without reopening the pages. The picks, their scores
and why each one qualified are in `CLOSE-EXAMPLES.md`. Everything here is paraphrased: the repo is
public, so the full screens and page text live in the private archive.

Private archive with every screen and the full text of each page: https://claude.ai/artifact/AaPQccq74qnUChWtTgnjR4 (private to Chadwick;
100 screens and the full text of the three picks and three shortlisted near misses, captured 24 Nov 2026)

Every number below is the author's own claim, as stated on the page. Section numbers in the borrow
lines are outline 2's (`../../outline-2/MATERIAL.md`): 1 opening, 2 colour, 3 layout and components,
4 proving the checks, 5 the agent test and what the system changed, 6 still imperfect.

## What the set shows that the first ten did not

- Two pages count what agents got wrong under controlled conditions (1, 2) and one counts what people got wrong before the work (3). That is
  the proof CS3's sections 4 and 5 rest on, and none of the first ten does it.
- Each of the three tells the test the same way: the same task, two conditions, a fresh agent
  per run, a small table, then one paragraph on what the numbers do not show. Nobody uses a chart.
- Every page treats the failure as information about the system, never about the model. The fix
  lands in the system (a contract, a rule, a doc format, a check), not in a prompt.
- The two pages closest to CS3 both include the moment their own check misled them (2) or say the
  surface looked finished until the checks ran (1). That is CS3's 20 Sep story, told by others.
- Scale is stated plainly and early: alone, a team of two, a lead with agents. None of them inflates it.

## 1. Nayara Marques: a design system AI can build from

- Link: https://nayaramarques.com/design-system
- Archive: 15 screens, about 3,600 words. 2026, dated update 12 Nov 2026.
- Shape: a role card (alone, for AI tools and their reviewers, what I did as seven tags, a public kit
  link), a clickable five step diagram, then ten numbered chapters with a sticky contents rail: the
  scenario, tokens and components, contracts and rules, AI builds, checks, ships and triage, testing
  it, for large teams, what I learned, where I applied it. Code and markdown excerpts carry most
  chapters; the test is one small table.
- AI readiness: told as changes to the system, not tooling on top. Every component gets a contract
  (what it is, use for, never, where it lives, which check enforces it); screen rules are written as
  values; a decision map is generated from the contracts so the two cannot disagree; AGENTS.md sets
  the reading order and she states how much an agent reads per screen against the whole system. New
  parts get one labelled way in instead of being forbidden.
- What was got wrong: fresh agents built one new feature three times with components only and three
  times with the framework. With components only they improvised 176 unlabelled class names and
  labelled nothing; with the framework one unlabelled name was left (caught by the harness) and 16
  new parts were labelled with their job. An earlier run before templates existed is reported too,
  and it shows most of the remaining gap was layout the agent had to improvise.
- Limits: the test is called small and shallow on the page; the large team chapter is labelled a plan
  she has not run; the platform where it started kept the system inside Claude Code, not the repo,
  because the move was never prioritised.
- Borrow, section 1: the role card that states scale in one word (alone) and names who the system is for, people and AI tools, before any story.
- Borrow, section 2: the token excerpt that shows names by job (critical, not red) with one line on why; CS3's chain visual can work the same way, small and labelled.
- Borrow, section 3: the contract format; one component shown whole with its never lines and the check that tests each, as the way to show a component decision without a paragraph.
- Borrow, section 4: a failed check that names the rule, what broke and where the rule lives, shown as one line of output; CS3's planted mistake table can use the same three columns.
- Borrow, section 5: the test design and its table: same feature, two conditions, a new agent per run that never saw the other condition, two counts, then the earlier run as a before. This is the closest public model for CS3's agent test and its missing after run.
- Borrow, section 6: the honest pair at the end of the test (small, shows how it works, not how deep) and the chapter openly marked as a plan, not done.

## 2. PJ Onori, Sanity: how well do agents use your design system?

- Link: https://www.sanity.io/engineering/design-system-evals
- Archive: 29 screens, about 4,000 words. 26 Aug 2026, Sanity engineering blog.
- Shape: a loud title, a one line promise, a contents list, then a chronological story: context, a
  disclaimer, how the eval tool works, the painful first weeks, the docs loop, results tables by
  model, cost tables, the experiment that plateaued, the tools that made agents do less, a tangent
  on a broken comparison, quality markers and what stays the same. Each table is followed by the
  screens the agents built under each condition.
- AI readiness: the next version of the system was rebuilt with agents as a reader it is tested
  against. Docs moved from markdown to a JSON schema with use cases and stances; an MCP server adds
  reusable code chunks and a linter tuned to the errors agents repeat.
- What was got wrong: pools of agents (n=30 per model) build from one prompt; the report counts
  successful builds, fixes per iteration, builds needing no fixes, accessibility violations, inline
  styles and responsive builds, for the current and new system. Successful builds rise from 20% to
  90% on the middle model. Agent feedback is used like a smoke detector: it reports symptoms, and a
  person finds the cause.
- Limits: the tool is a work in progress with sharp edges; token spend did not drop and he says so;
  a run of agent written docs plateaued and was dropped; the system is mid swing. Best of all, he
  found his own side by side was not fair (chunks and the linter were covering for components agents
  struggled with), switched them off, watched results fall, fixed the cause, and now tests docs with
  the helpers off.
- Borrow, section 1: none for the hero; the loud register suits a company blog, not a portfolio.
- Borrow, section 2: the use case record with a stance (recommended, discouraged with an alternative and its reason) as the shape of a colour role's rule.
- Borrow, section 3: chunks, reusable code that is not yet a component, as the honest middle state between a pattern and a component.
- Borrow, section 4: the broken comparison story, told in four beats: the result looked fine, the test was not fair, switched off the help and it fell, fixed the cause and changed the method. This is the strongest public parallel to CS3's checks that passed wrong screens.
- Borrow, section 5: results as a short table per condition with the sample size in the heading, followed by the screens each condition produced; quality markers (violations, inline styles) beside the pass rate.
- Borrow, section 6: say which measure did not improve (token spend) in the same breath as the ones that did.

## 3. Charles Sanderson: design system, part 2

- Link: https://chsanderson.com/portfolio/design-system-redux-with-agentic-development
- Archive: 8 screens, about 1,500 words. 5 Sep 2026, portfolio, dark theme.
- Shape: a left contents rail and a right project card (year, role, challenge, pivotal insight,
  result, tools); then overview, a by the numbers table of eight rows, users' experience as an audit
  list, a role table (him, an authoring agent, a review agent), UX decisions, principles turned into
  guardrails, security, analytics events, what the review agent caught, outcome, learnings.
- AI readiness: agents are his design engineering team. The system is made checkable: every rule
  that matters to users becomes an automated test, and a linter product teams run flags off palette
  colours, off scale spacing and undefined classes. Roles not raw colours.
- What was got wrong: by people, counted in an audit before the work (about 210 hand built buttons
  and 1,300 inline styles against about 30 uses of the library; contrast pairs shown before and after
  as ratios); by the linter on its first run (25 broken classes rendering nothing); by the review
  agent (a type ahead answering the previous search, a 1.06 contrast highlight brought to him as a
  decision, missing privacy markers).
- Limits: adoption is 2 of 5 teams with the rest due; a styled scrollbar rollout he reversed; a
  learning that agents only held to principles once those were checked deterministically.
- Borrow, section 1: the project card with a challenge line and a pivotal insight line; a compact way to put the argument on the first screen.
- Borrow, section 2: contrast fixes as before and after ratios in a table row; CS3's colour decisions can carry their arithmetic the same way.
- Borrow, section 3: the audit list framed as what users experienced, each item a plain consequence.
- Borrow, section 4: no agent signs off its own work; claims must be shown working in a browser before they reach him. One line that states the standard of proof.
- Borrow, section 5: the role table (person, authoring agent, review agent) as the way to show who decides and who builds.
- Borrow, section 6: adoption as a fraction with the reason the rest are still to come.

## Near misses kept for their moves

These three were shortlisted and failed the independent check (see `CLOSE-EXAMPLES.md`). Their notes stay because some moves are still worth borrowing.

### Surendar Selvaraj: the agent ignored the component library

- Link: https://www.designsystemscollective.com/i-gave-my-agent-claude-md-and-design-md-it-ignored-my-entire-component-library-c6d7e9be34d4
- Archive: 16 screens, about 1,850 words. 20 May 2026, Design Systems Collective.
- Shape: opens on the moment (a screen with a button the agent built itself), then the two files
  everyone has, the gap, what the agent built wrong, the third file, one worked example of a token
  misread and its one line fix, three layers in Figma, the three files side by side, what writing it
  down exposed, how to start.
- AI readiness: the team wrote a dense component file for agents (when to use, when not, which
  sibling wins) and filled Figma variable descriptions so rules travel with the token on export.
- What was got wrong: named, not counted. A card with a hand built action instead of the button
  component; a raw input instead of the field component; a banner rebuilt from scratch; a
  background token used as body text that failed contrast. Each became one written line.
- Limits: no numbers and no controlled run; the claim of improvement is the author's read. The page
  is honest about the team's own gap: three years of rules lived in two designers' heads.
- Borrow, section 1: the opening scene, a single wrong button, as the hook for the AI half.
- Borrow, section 2: the token misread (a surface colour used as text) and its fix as one rule line; CS3's Text/Display finding is the same kind of story.
- Borrow, section 3: when to use, when not and which sibling wins, as three lines per component.
- Borrow, section 4: none; no checks are proven here.
- Borrow, section 5: the line that every agent mistake was a missing sentence a person never needed; a plain way to state why the system had to change, not the prompt.
- Borrow, section 6: what writing it down exposed about the team's own system.

### Richard, The Ambitious Designer: how to run a design system for AI agents

- Link: https://ambitiousdesigner.substack.com/p/design-system-for-ai-agents
- Archive: 18 screens, about 2,900 words. 24 Nov 2026, Substack newsletter.
- Shape: a one paragraph summary, the change in the job, the four kinds of agent file, his five part
  setup, the repo tree, rules split into checkable and judgment, exceptions as the real work, why one
  person should hold the write path, how to keep that from becoming a bottleneck, where it breaks.
- AI readiness: every rule lives in the repo, sorted by one question: can a machine check it? Checkable
  rules go in JSON and are linted; judgment goes in Markdown for the agent to read. An exceptions file
  says where each exception applies, why and whether it should spread.
- What was got wrong: described in kind, not counted: agents apply a rule everywhere or generalise a
  one off (a round button inside a pill shaped input spreading to every button).
- Limits: a section on where it breaks (a second designer, a slow queue, AI editing its own rules),
  and the bus factor named and answered.
- Borrow, section 1: none; it is an essay voice.
- Borrow, section 2: the reason attached to a colour rule (accent for primary actions, except irreversible ones) so an agent can handle the next case.
- Borrow, section 3: the generalise yes or no line on each exception.
- Borrow, section 4: agents may read the exceptions but not write them; a governance line CS3 can use for who changes the rules.
- Borrow, section 5: the checkable versus judgment split as the organising rule for what the system changed for agents.
- Borrow, section 6: the where it breaks list, three items, each one sentence with its cause.

### Eva Hörner: how to make your design system agent ready

- Link: https://medium.com/design-bootcamp/how-to-make-your-design-system-agent-ready-ea4cfc062270
- Archive: 14 screens, about 1,900 words. 13 Aug 2026, Bootcamp on Medium.
- Shape: why it matters now, her context (leading a design team, a shared system across products),
  what went wrong with generated code, why tokens are not enough, the file structure as a diagram,
  one template spec in full (a wizard), how agents retrieve only what a task needs, then where
  changes should flow (proposed through a pull request, reviewed by engineers).
- AI readiness: the system is split into tokens, global rules, registries and one spec per component,
  pattern and template, so an agent follows references instead of loading everything.
- What was got wrong: listed from real runs, not counted: a wrong hover state, a colour used for the
  wrong purpose, spacing off guideline, primary and secondary hierarchy not applied, actions placed in
  the wrong bar.
- Limits: framed as an experiment throughout; agents are kept from pushing changes to production.
- Borrow, section 1: none.
- Borrow, section 2: the line that a token file solves styling but not what to build; a clean way to say why colour roles needed rules.
- Borrow, section 3: one template shown whole with its references to the components it uses.
- Borrow, section 4: none.
- Borrow, section 5: the list of what the agent got wrong, short and concrete, as the before.
- Borrow, section 6: the boundary on what agents may change, stated as a rule, not a fear.

## Voice

How a senior designer writes a small, still in progress system story without overclaiming, from
the three picks, set against the failures in the near misses.

- Say the scale once, early and plainly. One word on a role card (alone), a role table, or the two
  designers named in passing. Never dress a solo build as a team or a programme.
- Put the method next to the number, every time. The sample size sits in the table heading; the
  conditions (a new agent per run, never saw the other condition) sit in the sentence before the
  table. A number never appears without what it counted.
- Follow the result with what it does not show, in one short sentence, without apology: the test is
  small; this chapter is a plan; this measure did not improve. Then move on.
- Tell the wrong turn in your own voice and give it a cause. The strongest moment in the set is a
  designer finding his own comparison was unfair and saying so. Admitting it costs nothing and earns
  the rest of the page.
- Credit the system, not the model. Every page says the agent did what its files said; the fix
  went into the files. That framing reads as judgment, where model talk reads as hype.
- Keep sentences short and claims sized to the evidence. The near misses show the opposite: a small
  trial called proven at full accuracy, or round before and after figures with no method. Both read
  as less senior than a page that says only what it counted.
- First person singular for decisions, plural only for work others did. The best pages say I decided
  and we built, and the reader trusts both.
