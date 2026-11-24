# Closer design system case studies: the fit set

24 Nov 2026. Feeds Lens D in `STRATEGY.md`. The first ten (`../EXAMPLES.md`) lend structure, but
none of them is a close match: none counts what agents got wrong before and after. This set looks
only for pages that do what CS3 does: a system that agents read and build from, changed so they could,
tested by what its readers got wrong, by one designer or a small team, still being built.

Three pages qualify. The hunt opened about 60 pages; most were guides, essays, vendor posts or work
by an engineer or a company voice. Six reached the shortlist and were checked again from the link
alone by a fresh agent; three held (see "How the checks ran"). Fewer than ten qualified because the
bar is a page strong on the AI relationship and strong on two of proof, team size and stage, by a
senior designer about their own system, and almost nobody publishes that yet. The list is not padded:
the near misses at the end are close on content but fail a rule, and each is named with why.

Every number is the author's own claim, as stated on the page; none was checked independently.
Scores: strong, partial or weak, each with its evidence. The calibration pages (Usborne's Help
Scout page, Vercel and Kaelig in `../../REFERENCE-BOARD.md`) score strong on the AI axis and on proof.

| # | Case study | Author | Role, as the page states it | Date | AI | Proof | Team | Stage |
|---|---|---|---|---|---|---|---|---|
| 1 | [A design system AI can build from](https://nayaramarques.com/design-system) | Nayara Marques | Product designer and builder, alone; Senior Product Designer on the linked platform case it grew from | 2026, updated 12 Nov 2026 | strong | strong | strong | strong |
| 2 | [How well do agents use your design system?](https://www.sanity.io/engineering/design-system-evals) | PJ Onori | Principal Product Designer, Sanity | 26 Aug 2026 | strong | strong | partial | strong |
| 3 | [Design system, part 2: modernizing with agentic development](https://chsanderson.com/portfolio/design-system-redux-with-agentic-development) | Charles Sanderson | UX lead directing an agentic design engineering team | 5 Sep 2026 | strong | strong | strong | strong |

## The evidence for each score

### 1. Nayara Marques

- AI: strong. The system was rebuilt so AI tools build from it: a contract per component with when to use it and what never to do, rules written as values, a decision map built from the contracts, an AGENTS.md that sets the reading order.
- Proof: strong. Fresh agents built the same new feature three times with components only and three times with the framework; she counts unlabelled class names and labelled new parts in each condition, and reports an earlier run before templates existed. A later change to the decision map was tested the same way.
- Team: strong. Done alone; the role card says so, and a chapter on large teams is marked as a plan she has not run.
- Stage: strong. Dated update in Nov 2026; the platform version still lived only in Claude Code, not in the repository; the test is called small.
- Seniority: her role card says product designer; senior level shows on the linked platform case (Senior Product Designer) and her about page (earlier design lead of four).

### 2. PJ Onori, Sanity

- AI: strong. The next version of Sanity UI was built and documented around how agents read it: docs moved from markdown to a JSON schema, then an MCP server with code chunks and a linter.
- Proof: strong. An eval tool runs pools of agents on one prompt; successful builds, fixes per iteration, accessibility violations and inline styles are counted for the current and new system across three models (n=30 each). He also reports the run where his own helpers hid a failure.
- Team: partial. A small team inside a company: he credits two people building the new version. Not a solo build and not an enterprise programme.
- Stage: strong. The new system is said to be mid swing; the tool is a work in progress; token spend did not improve and he says so.
- Seniority: Principal Product Designer on the author card.

### 3. Charles Sanderson

- AI: strong. An authoring agent builds components, tokens and docs from his specifications and a review agent tests them; because agents held to principles only when checked, every rule that matters to users was turned into an automated test, and a linter flags off system values in consuming apps. My first read was partial (agents build the system more than read it); the independent check read it as strong, and the page's own learning (deterministic checks were what made agents hold) settles it.
- Proof: strong. An audit counts what people got wrong before (about 210 hand built buttons, 1,300 inline styles, failing contrast pairs with before and after ratios); the linter's first run found 25 broken classes; the review agent's catches are listed.
- Team: strong. One UX lead with agents; a role table names who did what.
- Stage: strong. Adoption under way, 2 of 5 product teams; a reversed decision (styled scrollbars) is written down.
- Seniority: UX lead on the page; Product Design Leader in the site footer.


## How the checks ran

- Search: about 30 web searches across portfolios, Medium publications, Substack, company design and
  engineering blogs and newsletters (Case Study Club, Design Systems Collective). About 60 pages
  opened in a headless browser and read; the shortlist was read in full.
- Every pick was captured whole with `capture-close.cjs` (the first ten's capture script with a new
  page list): full text and screens to the page bottom, 100 screens across the six.
- Exclusions: no page repeats `../EXAMPLES.md` (including its rejected list), `../../REFERENCE-BOARD.md`,
  `reports/Design system portfolio case studies.md` or the visual set (`VISUAL-EXAMPLES.md` on its
  branch, checked 24 Nov). `check-close.mjs` tests this.
- Independent check: a fresh Sonnet agent got only the six shortlist links and the criteria, opened
  each page itself and ruled. It passed Nayara Marques; failed Surendar Selvaraj (a file added on top,
  not a system changed; no counts; team size not stated; a three year old system); failed Richard,
  The Ambitious Designer (no name or level on the page; no test; nothing unfinished); and could not
  load Eva Hörner (Medium returned a bot check). Those three are now near misses: on the brief's own
  bar (strong on two of proof, team and stage) none of them holds, whatever the loading problem.
- Two of its failures were overruled, with the reason. PJ Onori: it scored team weak and doubted he
  built the system (he credits two colleagues with building the new version), but proof and stage
  are both strong, which meets the bar on their own; he built the docs schema, eval tool and agent
  layer himself, which is the part this set is about, and the team doubt is recorded in his scores.
  Charles Sanderson: it scored AI strong and the other three partial, then failed him on a strict
  reading; my read scores team and stage strong from the role table and the 2 of 5 adoption line,
  and proof strong from counted before figures, the linter's first run and the review agent's
  catches. Both are flagged in their entries so Lens D can weigh them.
- Nayara Marques: the checker noted no senior or lead title on the case study itself. It is on the
  platform case the page links to and on her about page, so she stays, flagged.

## Near misses: close on content, failing a rule

Kept here so Lens D can still use the moves; none is a pick. The first three were on the shortlist
and are captured in the archive with the picks.

- Surendar Selvaraj, [I gave my agent CLAUDE.md and DESIGN.md. It ignored my entire component library.](https://www.designsystemscollective.com/i-gave-my-agent-claude-md-and-design-md-it-ignored-my-entire-component-library-c6d7e9be34d4) (senior UI/UX architect, 20 May 2026). The agent rebuilt components the library had; each mistake became one written line. Fails: a file added on top of an old system, which is the layer CS3 argues against; no counts; team size not stated.
- Richard, The Ambitious Designer, [How to run a design system for AI agents](https://ambitiousdesigner.substack.com/p/design-system-for-ai-agents) (24 Nov 2026). Sole writer of a repo based system, rules split into checkable and judgment, an exceptions file agents may read but not write, a where it breaks list. Fails: no name or level on the page and no test.
- Eva Hörner, [How to make your design system agent ready](https://medium.com/design-bootcamp/how-to-make-your-design-system-agent-ready-ea4cfc062270) (leads a design team, 13 Aug 2026). Tokens, global rules, registries and one spec per template; the agent's mistakes listed. Fails: proof named not counted and a team across several enterprise products, so strong on stage only.

- Klai, [Agent ready design systems: readable is only half the job](https://getklai.com/blog/agent-ready-design-system) and the post before it. The closest proof style found anywhere: five claims the docs made about the code, checked and found wrong; every new check attacked with a deliberate mistake before it was trusted; four agent fabrications that no check caught. Fails the author rule: written by the company's founder, listed under engineering, not a designer.
- Automattic Design, [Working towards higher quality agentic experiences](https://automattic.design/2026/10/27/working-towards-higher-quality-agentic-experiences/). Same codebase with and without agent rules, scored blind on 25 rules; the gap almost closed once agents were given the answers up front. Fails the author rule: a handle only, organisational voice, enterprise scale.
- BILL engineering, Trinity design system made bilingual for people and agents. Fails: written by a UI software architect, an engineer.
- Cristian Morales Achiardi, [Towards an agentic design system](https://www.designsystemscollective.com/towards-an-agentic-design-system-c7e0a6469bb1). Solo, 11 trials with and without machine readable structure, counted misses. Fails seniority on the page, and overclaims (calls a small trial proven at full accuracy): useful as a voice warning.
- Zhiyang, [Making design system AI ready](https://medium.com/design-bootcamp/making-design-system-ai-ready-case-study-4edde4c19188). Solo, counted fixes, says plainly no controlled comparison was run and what still fails. Fails seniority: a side project by a product designer.
- Adam Hickey, Agent review (lab page). Twelve rules, one build with and one without, honest that one run each is not proof. Fails: a fictional product and not a design system case study.
- Justyna Tarkowska, Teaching design system AI agents the why. A lessons loop that promotes a repeated mistake into a failing check. Fails seniority on the page.
- Rostislav Peška (tested a government system he did not build), Kasava and Flowtivity (company voice, not a designer), The Maker's Lab (pen name, numbers without method).
