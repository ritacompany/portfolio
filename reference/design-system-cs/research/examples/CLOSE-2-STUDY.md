# Closer design system case studies, second pass: study notes

Captured 24 and 25 Nov 2026 so the second fit set can be used without reopening the pages. The
picks, their scores and why each one qualified are in `CLOSE-2-EXAMPLES.md`. Everything here is
paraphrased: the repo is public, so the full screens and page text live in the private archive.

Private archive with every screen and the full text of each page: https://claude.ai/artifact/AaPQccq74qnUChWtTgnjR4
(private to Chadwick; the first pass's six pages plus this pass's five picks and one near miss
with its review document, 79 new screens, captured 24 and 25 Nov 2026)

Every number below is the author's own claim, as stated on the page. Section numbers in the borrow
lines are outline 2's (`../../outline-2/MATERIAL.md`): 1 opening, 2 colour, 3 layout and components,
4 proving the checks, 5 the agent test and what the system changed, 6 still imperfect.

## What this set adds to the first

- Two more with and without agent tests (1, 2), one before and after on a production system (3).
  With Marques, Onori and Sanderson that makes six public pages that count what agents got wrong
  (seven with the near miss Kittusamy, whose five fresh agent runs are checked by a person).
- Two pages test the checks themselves, the CS3 section 4 move: Singh seeds the mistakes agents make
  and counts what her contract catches (4); Kukkasela finds nine false alarms in her own checks and
  rescored the baseline with the corrected check so the fix could not flatter itself (1).
- Two pages catch their own documentation teaching the mistake (2: guidelines said one radius, code
  another; 3: the rulebook advertised two props that do not exist). That is close to CS3's 20 Sep
  story, where the checks passed screens that were wrong.
- Every page puts the fix in the system (a rule, a contract, a catalog row, an entry point, a
  generator), never in a prompt, and every page states its sample size before a reader can ask.

## 1. Melina Kukkasela: four feedback loops for an AI native design system

- Link: https://www.designsystemscollective.com/four-feedback-loops-for-an-ai-native-design-system-5868751261a2
- Archive: 15 screens, about 3,200 words. 22 Oct 2026, Design Systems Collective; first of a series. Companions: shared memory (2 Nov) and product teams (23 Nov).
- Shape: an about this article box, a one paragraph self introduction with role and years, a short
  frame from organisational learning research, four loops told fastest to slowest, the first
  measurement with what failed, what she took from published practice, then what is still open and
  a reference list.
- AI readiness: told as the system's own machinery. Agents reach Adesy through an MCP server and an
  instructions file; a doctor tool checks setup; a gap tool turns a missing component into an issue
  and a release; an agent team of seven roles builds the system from shared versioned memory, and a
  repeated lesson becomes a one line rule only after QA and a person approve it.
- What was got wrong: without the setup agents used component APIs correctly in 22% of runs, with
  it 67%, and no run with it passed every check. Reading the failures found the MCP server denying
  14 child components, an instruction that skipped the grid docs whenever a template fit, and one
  over strict check. After fixes template pages went from none passing to all passing; the old runs,
  rescored with the corrected check, still passed none, because eight of nine never read the grid
  docs. A separate run log shows one lesson cut tokens by about 78% on the next build.
- Limits: a single case, not a controlled study; each bar rests on nine runs; the token comparison
  built different components; the run record step is still skipped; the data table task still fails.
- Visuals that explain the mechanism: a ring diagram of four loops by speed, a diagram of which
  loops improve building and which reach products, a with and without bar chart, a token report
  chart. Each caption says how much the numbers can carry.
- Borrow, section 1: the about this article box, who it is for and what it reports, before any story; and the two line self introduction with years and role.
- Borrow, section 2: nothing direct; her rule that one unclear rule reaches every brand at once is a useful line for why colour roles are decided by purpose.
- Borrow, section 3: the gap report as the way a missing component enters the system, told with one real case from request to release in a day.
- Borrow, section 4: the strongest model for CS3's section 4: she rescored the old runs with the corrected check so the improvement could not come from the check, and she reports her own nine false alarms.
- Borrow, section 5: the eval design (three real tasks, three runs each, with and without, pass or fail checks the agent never grades) and the caption that says each number rests on nine runs.
- Borrow, section 6: the closing pair: what changed after reading published practice has not had time to show, and three tasks are far too few, with the number she is heading for.

## 2. Andriy Yurchenko: design systems for coding agents

- Link: https://ayurchenko.xyz/writing/design-systems-for-coding-agents
- Archive: 12 screens, about 3,200 words. 26 Oct 2026, his own site.
- Shape: a title with a one line claim, a fact strip (test, measure, author, date), the setup, two
  result sections with tables, a growth test, what he now puts in a system, a choice between his own
  system and a default kit, a how I ran the test list, a short close and a paid offer.
- AI readiness: the system an agent reads is small and named: a rules file of 23 lines, a catalog
  of 29 rows where every row says what the component is for and what to use instead, and an audit
  the agent must run until it reports nothing. A rule for anything new: a new look is a variant, new
  behaviour a component, a new job a component made from old parts.
- What was got wrong: on the first pass every stack was close enough, which he reports against his
  own expectation. The difference shows in growth: brief only and written guidelines both forked the
  product into a private stylesheet (34 and 25 raw values, 31 and 29 new classes) while the agent
  with rules, catalog and audit added 0 raw values and 5 classes, recorded its new fields in the
  catalog and finished fastest. A short brief lost a third of 79 decisions.
- Limits: two runs per stack; the spread inside one stack sometimes matched the spread between
  stacks; his coding preferences made the no system builds better than usual, so the gaps are
  conservative; a look counts only on an exact computed style match.
- Visuals that explain the mechanism: two results tables, the rules file and four catalog rows as
  small code excerpts, and same screen comparisons across builds at one width. No diagram.
- Borrow, section 1: the fact strip under the title (what was tested, what was measured, author, date) as the way to set the scale before the story.
- Borrow, section 2: his line that tokens are how decisions get written down so an agent can follow them, against a default theme where nobody decided anything; it fits colour by purpose.
- Borrow, section 3: the catalog row format (what it is for, not for, use instead) shown as four rows of 21, small enough to read.
- Borrow, section 4: the growth test's third condition, an audit the agent must run until it reports nothing, as the plainest picture of a check that holds an agent.
- Borrow, section 5: the three condition table (brief, guidelines, rules with catalog and audit) and the detail that the agent believed the code over the guidelines.
- Borrow, section 6: the how I ran the test list, written as plain bullets with the reason each limit makes the result conservative or weaker.

## 3. Christoph Hellmuth: we taught the agents about Aurora

- Link: https://christophhellmuth.com/open-design-system-bench-aurora-improvements/
- Archive: 11 screens, about 2,900 words. 2026, no date on the page; it reports the audit of 25 Aug 2026 and an outside write up of his talk appeared on 13 Oct 2026.
- Shape: a headline that admits the failure, a four number strip, the thing never checked, what
  they saw, four findings, what they changed in four moves, what moved, keeping it true, lessons for
  another team, what is left.
- AI readiness: the system already had every artifact a team is told to ship; the case is the
  changes once behaviour was measured: a public entry point that was locked, one generator feeding
  the docs index to three addresses, a token export read from the stylesheet, a rulebook sentence
  that says a hand rolled button is a defect, a crosswalk of names, deleted phantom props.
- What was got wrong: unguided, no model used the system in 113 attempts; with the rulebook most
  still hand rolled until one sentence about the installed package; of 55 attempts that used it, 10
  compiled; the team's own docs taught two of the invented names.
- Limits: the behavioural matrix has not been rerun after the changes; one model gained about 36 points
  from the rulebook and another lost 2, so an average would hide a regression; two checks did not
  move on purpose; an editor query service is still missing.
- Visuals that explain the mechanism: a surface against behaviour bar chart, an engagement chart, a
  compile error chart, a before and after chart and table per check, and small diagrams of each fix
  (the one line fix that would have broken a type, one generator and three addresses, four sources
  and one build). The strongest set of mechanism diagrams in either pass.
- Borrow, section 1: the headline that names the failure, and the four number strip under it.
- Borrow, section 2: the token export kept generated from the stylesheet, with its first line saying code still styles through classes, so nobody reads it as leave to paste values.
- Borrow, section 3: the small diagram of the obvious fix that would have passed the check and broken a type, beside the fix they shipped; CS3's button decisions can be drawn the same way.
- Borrow, section 4: surface score against behaviour, twenty points apart; it is the cleanest public picture of a pass that does not mean right.
- Borrow, section 5: the engagement chart (0 of 113, then 16 of 57, then 43 of 55) and the one sentence that moved it; and grading against what ships rather than what is checked out.
- Borrow, section 6: let a number stay where it honestly belongs, and the closing what is left list.

## 4. Tina Singh: what breaks when AI starts writing your design system

- Link: https://www.designsystemscollective.com/what-breaks-when-ai-starts-writing-your-design-system-de7c44d26c11
- Archive: 7 screens, about 1,100 words. 18 Jun 2026; the follow up, Generation is not verification, 1 Sep 2026, was read and is summarised here but not archived.
- Shape: an opening on her own unreadable Cancel button, the bet (a contract per component), a
  seeded benchmark in one paragraph, two repos with two jobs, an honest close. The follow up is an
  admission that her validator graded paperwork, then the ledger of gaps.
- AI readiness: each component ships a closed list of the tokens it may use, the states it must
  implement, its parts and the rules it cannot break; an agent reads it through an MCP server before
  writing and a validator fails loudly after; the format is a separate tool so other systems can use it.
- What was got wrong: her own button, gray on gray with no focus state, opens the piece; the seeded
  set catches 7 of 7 agent style mistakes with a clean component silent; the follow up finds the
  state check only proved a story file existed, then counts 255 of 360 states proven and 105 gaps
  tracked by name.
- Limits: slower, still proving it earns its keep, some weeks mostly finding what she got wrong;
  not yet Figma parity, a full state audit, an accessibility review or outside adoption.
- Visuals that explain the mechanism: one diagram of typical drift against an enforceable contract;
  the rest is prose. Thin on visuals.
- Borrow, section 1: opening on the designer's own mistake in her own file, which is honest and sets up the agent problem in one scene.
- Borrow, section 2: nothing direct; the rule against reaching past semantic tokens to raw values is the colour chain's rule stated as a contract.
- Borrow, section 3: the closed list contract (allowed tokens, required states, parts, forbidden moves) as a tighter version of Marques's contract for showing one component.
- Borrow, section 4: the seeded benchmark sentence: how many planted, how many caught, how many as failures and warnings, and that a clean one stays silent. It is the shape of CS3's planted mistake table.
- Borrow, section 5: the line that the contract moved from something caught in review to something the agent reads first.
- Borrow, section 6: the follow up's ledger: proven, known gaps by name, and new hidden gaps fail; and her sentence that the system is not complete, only more honest.

## 5. Julia Gale: Baseline

- Link: https://juliagale.com/baseline.html
- Archive: 24 screens, about 2,200 words. Aug to Sep 2026, her portfolio.
- Shape: a project card (role, team, year, deliverables, status), four big numbers, approach, the
  ask, what she designed, four design decisions each as a question and an answer, a chapter on how
  she ran the agent, outcome, quality bar, reflection.
- AI readiness: she extended the system the engineers already used instead of replacing it, then
  ran the agent under a rulebook in layers that every tool reads, with checks that fail the build
  and rules born from review (one view toggle size, one link style, tags inform and chips are clicked,
  one icon set, no drawn icons).
- What was got wrong: a table of six agent failures, each with how it was caught and what changed,
  and one failing check shown as real output after breaking the rule on purpose in a copy.
- Limits: the sandbox is not where it ships; two avatar pairs still fail contrast and are written
  down; nothing made the agent run the checks after each edit, so the next project gets hooks and a
  shorter rulebook where every rule says what it prevents.
- Visuals that explain the mechanism: the rulebook layer list, the failure table and the check
  output; plus the colour ramp table with every cell's contrast. No test table.
- Borrow, section 1: the project card with team, status and deliverables, and four big numbers that are all things she made.
- Borrow, section 2: the colour chapter, kept to the client's own colours wherever contrast allows, with one rule for when a colour leaves its main shade; and the agent's darker pass shown and reverted.
- Borrow, section 3: each decision as a question, the answer in one line, then the options with what each saves and costs.
- Borrow, section 4: a check proven by breaking the rule on purpose in a copy of the repo, with the output shown.
- Borrow, section 5: the failure table (what went wrong, how review caught it, the rule it became), the honest form of CS3's what the system changed.
- Borrow, section 6: the reflection: the rules asked, the checks failed, but nothing made the agent run them, and what changes next time.

## Against Marques on structure

Marques's page sets the model: a role card, a five step diagram of the framework, numbered chapters
for each step with small code and markdown excerpts, a with and without test in one small table,
then a large team chapter marked as a plan and what she learned.

- Kukkasela (1) is the closest on the test and the honesty. Her eval has the same design as
  Marques's (same tasks, two conditions, several runs, counted) and goes further on checking the
  checks. Her framework is loops rather than steps. It is drawn as diagrams rather than shown as files;
  there are no contract excerpts.
- Yurchenko (2) is the closest on the agent's reading list: his rules file and catalog play the
  part of Marques's AGENTS.md and contracts, shown as excerpts, and his growth test is a three
  condition version of hers. He has no framework diagram and no chapter per step.
- Hellmuth (3) is the best at explaining the mechanism visually: every fix gets a small diagram and
  every result a chart. He tests a mature system rather than building one, so the frame is before
  and after rather than with and without.
- Singh (4) has Marques's contract idea in its tightest form and the seeded check, but in two short
  posts with one diagram and no agent test.
- Kittusamy, the near miss, has nearly every part of Marques's framework (reading order, contracts,
  decision map, checks, fresh agent test, limits) in plain repo documents; it is the right parts
  list without the page or a first person story, which is why it failed. Her round one table and
  the fabricated test claim are still worth borrowing for section 5.
- Gale (5) shares the role card and the honest close, and her agent chapter matches Marques's checks
  and triage chapters in spirit, but the agent work is one chapter of a product case study.

For CS3, the order of borrowing: Marques's chapters and table, Kukkasela's rescored baseline and
false alarm count for section 4, Hellmuth's surface against behaviour chart and fix diagrams, and
Yurchenko's three condition table and code excerpts.

## Voice

- All five write in the first person singular or a small "we" and state scale early (alone, two
  designers, a lead with an agent team, a design system team).
- None claims the result is proven. Each names its sample size and what the numbers cannot show,
  usually right under the result, not in a footnote.
- The tone is plain and dated. The best lines are admissions: the checks graded paperwork, the docs
  taught the mistake, the first pass was not where things went wrong.
- Avoid two habits seen here: ending on a paid offer (2) and opening with a literary metaphor before
  the system appears (some of the near misses).
