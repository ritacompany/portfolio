# Closer design system case studies, second pass: the fit set

25 Nov 2026. A second, harder hunt after `CLOSE-EXAMPLES.md`, aimed at pages built like Nayara
Marques's "A design system AI can build from": a designer's own system rebuilt so agents build
from it, explained as a framework, then tested with agents and counted, with a plain line on the
limits. Nothing here repeats a page from any earlier set.

Five pages qualify. About 50 web searches in new query families and new routes opened about 70
pages; six reached the shortlist and were read in full, captured whole and checked again from the
link alone by a fresh agent (see "How the checks ran"); five held. Five and not ten because the bar is the same
as the first pass (strong on the AI relationship and strong on two of proof, team and stage, by a
senior designer about their own system) and most of what 2026 published on the subject is guides,
vendor posts, tool launches, agency blogs or essays without a test. The near misses at the end say
why each failed.

Every number is the author's own claim, as stated on the page; none was checked independently.
Scores are strong, partial or weak, each with its evidence. Structure is a fifth line: how closely
the page explains the mechanism as a framework, with diagrams and a test table, the way Marques does.

| # | Case study | Author | Role, as the page or the linked site states it | Date | AI | Proof | Team | Stage | Structure |
|---|---|---|---|---|---|---|---|---|---|
| 1 | [Four feedback loops for an AI native design system](https://www.designsystemscollective.com/four-feedback-loops-for-an-ai-native-design-system-5868751261a2) | Melina Kukkasela | Lead Product Designer at Visma, develops the Adesy design system | 22 Oct 2026 | strong | strong | partial | strong | strong |
| 2 | [Design systems for coding agents](https://ayurchenko.xyz/writing/design-systems-for-coding-agents) | Andriy Yurchenko | Independent designer, 14 years building design systems, implements components himself | 26 Oct 2026 | strong | strong | strong | partial | strong |
| 3 | [We taught the agents about Aurora. They weren't listening.](https://christophhellmuth.com/open-design-system-bench-aurora-improvements/) | Christoph Hellmuth | Design systems and design engineering lead on Aurora at Nord Security; 16 years in UX, UI and code | 2026, undated on the page (after the 25 Aug audit) | strong | strong | partial | strong | strong |
| 4 | [What breaks when AI starts writing your design system](https://www.designsystemscollective.com/what-breaks-when-ai-starts-writing-your-design-system-de7c44d26c11) | Tina Singh | Senior UI designer | 18 Jun 2026, follow up 1 Sep 2026 | strong | partial | strong | strong | partial |
| 5 | [Baseline](https://juliagale.com/baseline.html) | Julia Gale | Senior product designer, design systems | Aug to Sep 2026 | strong | partial | strong | strong | partial |

## The evidence for each score

### 1. Melina Kukkasela, Visma

- AI: strong. Adesy was made AI native this summer: an MCP server with six tools (search, get, icons, changelog, doctor, gap), an agent instructions file, build and review skills, and an agent team of seven roles that develops the system from shared versioned memory. Lessons become one line rules only after QA and a person approve them.
- Proof: strong. Evals run the same three tasks (settings form, data table, confirmation dialog) three times each, with and without the Adesy setup, 18 runs, scored by pass or fail checks the agent never grades. Correct component use 67% with against 22% without; expected component chosen every run against 78%. Reading the failed runs found three causes (the MCP server denied 14 child components existed, an instruction skipped the grid docs, one check matched names too strictly); after fixes template pages passing every check went from 0% to 100%, and the baseline was rescored with the corrected check and still passed 0 of 9. Nine false alarms in her own checks were found and the loop now checks its checks.
- Team: partial. One lead designer with an agent team inside a company with many product teams; the human team size is not stated and the system serves several brands and frameworks.
- Stage: strong. She calls it one practitioner's case and not a controlled study; three tasks are far too few and she is heading for 20 to 50; the run record step has been skipped so far; the data table task still fails every run; none of the five changes from published practice has had time to show.
- Structure: strong. A ring diagram of the four loops, a loop diagram, a with and without chart where each bar rests on nine runs, a token report chart, then a section on what is still open. No contract excerpts.
- Seniority shown at: the page's own introduction and author bio (Lead Product Designer at Visma, 16 years in the field).

### 2. Andriy Yurchenko

- AI: strong. The system an agent reads is a 23 line rules file (where values come from, what to do when nothing fits, run the audit until it reports nothing), a 29 row catalog that says what each component is for and what to use instead, and a token audit. He lists what he now adds to any system because agents read it.
- Proof: strong. Eleven one pass builds by one agent: no system, shadcn and a decided look, two runs each, with every element's computed style measured. Then a growth test: three agents add the same six screen section with brief only, plus written guidelines, plus rules, catalog and audit. Raw values in new code 34, 25 and 0; new CSS classes 31, 29 and 5; agent time 8.1, 7.3 and 4.4 minutes. The written guidelines said one corner radius and the code another, and the agent followed the code.
- Team: strong. One designer running his own test bed.
- Stage: partial. The test bed product was built in one evening as a thin system and he says so; the limits are stated (two runs per stack is small, his coding preferences favour CSS variables so the no system builds look better than usual, one condition's brief did not ask for states). It is a test of a method more than a system still being built.
- Structure: strong. Results tables, the rules file and catalog shown as small excerpts, side by side screenshots, and a closing section on how the test ran. The page ends with a paid review offer, which a borrower should not copy.
- Seniority shown at: the page's opening (a design system for every product over 14 years, components implemented in Storybook himself).

### 3. Christoph Hellmuth, Nord Security

- AI: strong. Aurora already shipped a rulebook, generated docs, a catalog and an offline agent bundle; the case is what was changed once agents were watched using it: a published entry point for shared types, a generated documentation index in three places, a machine readable token export, the missing sentence in the rulebook, a crosswalk of names models expect, and two conveniences deleted from seven files that advertised them.
- Proof: strong. Six model families at two context levels, run twice: all 113 unguided attempts used zero Aurora components; with the rulebook 16 of 57 against the source and 43 of 55 against the shipped package used the system; one sentence about the installed package cut hand rolling to about a fifth; 10 of 55 engaged attempts compiled, with five naming habits behind the errors. The static audit moved from 64.8 to 82.0 and the one hard fail cleared. The team's own docs were teaching two of the mistakes.
- Team: partial. A design system team at a company with dozens of squads; "we" throughout, team size not stated.
- Stage: strong. Nine of eleven planned items shipped; the behavioural run has not been repeated yet; two scores left where they honestly belong; a closing list of what is left.
- Structure: strong. Before and after charts, a check by check table, small diagrams of each fix (the one line fix that would have broken a type, one generator feeding three addresses), then lessons for another team and what is left.
- Seniority shown at: the author's own site, which the page sits on (home page: Aurora at Nord Security, design systems lead and consultant, 16 years). Flags: the case study page itself never names its author, and he writes as a design engineer for a team; the checker failed it on this and the overrule is under How the checks ran.

### 4. Tina Singh, Clementine

- AI: strong. Every one of 121 components carries a machine readable contract (allowed tokens, parts, states including focus, rules such as never reaching past semantic tokens); a validator fails the build on drift; the contract also runs as an MCP server so an agent reads it before it builds.
- Proof: partial. A small benchmark seeds the mistakes agents make and the contract catches 7 of 7, five as build failures and two as warnings, with a clean component silent. The follow up counts state evidence (255 of 360 declarations proven, 105 gaps named in a ledger). No with and without run of agents.
- Team: strong. One designer building in public.
- Stage: strong. She calls the work slower right now and unproven; the follow up lists what it still does not prove (Figma parity, every state audited, accessibility review, outside adoption).
- Structure: partial. The contract framing and the seeded check are the closest to Marques's contracts and checks chapters, with one diagram of drift against an enforceable contract; the pages are short and there is no test table.
- Seniority shown at: the author bio on the page (senior UI designer).

### 5. Julia Gale, Baseline

- AI: strong. She extended the client's daisyUI system (143 colours, 43 tokens, severity and status tags) and an agent built most pages under a layered rulebook (folder rules, CLAUDE.md as a pointer, AGENTS.md, DESIGN.md, one guide per kind of work) with checks that fail the build.
- Proof: partial. Six agent failures are named, each with its fix (every colour moved a shade darker and was reverted, a false limit of eight scales, a signing dialog that could lose fields, drift across pages, greys turned pink three times, a page class that broke the gallery), and one failing check is shown as real output after breaking a rule on purpose. Nothing is counted before and after.
- Team: strong. Two product designers with the client's team.
- Stage: strong. Handed off and being rebuilt by the engineers; the failing contrast pairs are written down; the reflection says nothing made the agent run the checks after each edit and hooks come next.
- Structure: partial. A rulebook layer diagram, a rules list, a failures table and a check output carry the agent chapter, but it is one chapter of a product case study and there is no test.
- Seniority shown at: the page's role line and footer (senior product designer, design systems).

## How the checks ran

- Search: about 50 web searches in new query families (portfolio hosts, GitHub kits that link a
  case study, Design Systems Collective and its monthly signals issues, Into Design Systems speaker
  notes, Kaelig's reading list, Substack newsletters, Portuguese, Spanish, French and German
  queries) plus the links out of every strong page. About 70 pages opened in headless Chromium and
  read; the six shortlisted pages read in full.
- Every pick was captured whole with `capture-close-2.cjs` (the first pass's capture script with a
  new page list): full text and screens to the page bottom, 74 screens across the six shortlisted
  pages and five more for the Kittusamy review document. `check-close-2-archive.mjs` tests this.
- Exclusions: no pick repeats `../EXAMPLES.md` (including its rejected list),
  `../../REFERENCE-BOARD.md`, `CLOSE-EXAMPLES.md`, `reports/Design system portfolio case studies.md`
  or `VISUAL-EXAMPLES.md` on its branch. `check-close-2.mjs` tests this.
- Independent check: a fresh agent on a faster model got only the six links and the criteria, not
  these scores, opened each page itself and ruled. It passed four, failed Kittusamy and, on a later
  try, failed Hellmuth on the author rule. Its verdicts and the one overrule are below.

### The checker's verdicts

- Yurchenko: pass. It scored AI, proof and team strong and stage partial, as I did, and noted the
  test bed and the closing sales offer.
- Kukkasela: pass. It scored team weak where I scored partial (an enterprise multi brand system);
  proof and stage strong carry the bar either way, and the team size doubt is recorded in her scores.
- Singh: pass, with proof partial because the seeded test checks the validator, not agents. Same
  read as mine.
- Gale: pass, lowest confidence. It scored stage partial where I scored strong. Overruled, with
  the reason: the work was built Aug to Sep 2026 and is being built into the product now, and the
  page names what still fails and what changes next, which is the stage axis as the first pass
  applied it. On the checker's scores alone she would hold only team strong, so she is the most
  exposed pick and is flagged as such.
- Kittusamy: fail on the author rule (a README with no first person story; title only on her
  profile and site). Accepted: moved to the near misses.
- Hellmuth: the site rate limited the checker twice; on a third try it read the page and failed
  it on the author rule only (no name on the page, a team "we", and the site's home page did not
  load for it), with AI and proof strong. Overruled, with the reason: the page sits on his own
  domain, whose home page names him, his 16 years and his design system work on Aurora at Nord
  Security, and an outside write up of his October talk attributes these same Aurora findings to
  him. The failure is recorded as two flags on the pick: the page itself never names its author,
  and the voice is a design engineering team's.

## Near misses: close on content, failing a rule

Kept so the borrow lines can still use the moves; none is a pick. The first was on the shortlist and is in the archive.

- Kirubha Kittusamy, [Agent ready design system](https://github.com/krpadesigns-aiux/agent-ready-design-system) and its Release 1 review (22 Nov 2026). The closest parts list to Marques found in either pass: AGENTS.md, a JSON contract per pattern, a four way decision for agents (reuse with verification, extract first, local example only, stop), 14 policy checks, then five fresh Claude Code sessions with a human checking each result (all five decisions permitted, 9 of 13 browser assertions passed, one app claimed tests it never ran, AGENTS.md changed after). Shortlisted, captured and archived. Fails: it is a README and review document with no first person narrative; her title (Staff / Principal Product Designer) is only on her GitHub profile and her site. The independent check failed it on the author rule and the failure stands.
- Cris Morales Achiardi at Southleft, [The autonomy vs alignment dial for AI](https://southleft.com/insights/design-systems/the-autonomy-vs-alignment-dial-for-ai/) and [What does AI readiness mean in design systems?](https://southleft.com/insights/design-systems/what-does-ai-readiness-mean-in-design-systems/) (Sep and Oct 2026). Ran the open benchmark on client systems, five runs per task, AGENTS.md against AGENTS.md plus guidelines, and found some of their own files lowered output quality. Fails: an agency blog about client systems, no role or seniority on the page (the first pass already failed his series on seniority).
- Ben Ellis, [Figma library guidelines: does Figma Agent follow them?](https://flexdesignsystem.com/figma-library-guidelines/) (12 Oct 2026). Six guideline files, the same three prompts run three times, token rules followed every run and layout rules only some. Fails: written on the product's sales site, no run without guidelines, no role shown.
- MC Dean, [Why coding agents make a mess of your design system](https://marieclairedean.substack.com/p/why-coding-agents-make-a-mess-of) (12 Nov 2026). An open kit that interviews the designer for the why behind each rule and runs a baseline with and without the files. Fails: a kit launch about an imaginary product, and she says the eight to one example is an illustration, not a measurement.
- Hardik Pandya, [Expose your design system to LLMs](https://hvpandya.com/llm-design-systems). Spec files, a closed token layer, an audit and drift detection, tried on Atlassian's system. Fails: a method and a prompt, not his own system, and no counted test.
- Murphy Trueman, [Design systems need evals](https://blog.murphytrueman.com/design-systems-need-evals/) (17 Jul 2026). A clear case for evals with mechanical and judged checks. Fails: an essay with no test of a system of his.
- Arnaud Morvan, [I tested 12 small AI models on 2,500 design system questions](https://www.designsystemscollective.com/i-tested-12-small-ai-models-on-2-500-design-system-questions-the-model-wasnt-what-mattered-4ef16e69ad64) (19 Oct 2026). A held out test where a one page guide took small models from about 63% to 78%. Fails: a tool builder importing other people's systems, not a design system case.
- Shreyasi Dutta, [Your design system now has two readers](https://www.designsystemscollective.com/your-design-system-now-has-two-readers-only-one-of-them-is-human-b2ac053c4c07) (19 Oct 2026). The only designer, counting 14 button styles by hand. Fails: short, no agent test, no senior title shown.
- Josef Richter, [Building an agentic design system](https://josefrichter.design/blog/agentic-design-system). A full token to MCP pipeline around one button. Fails: an engineering guide with no test of what agents got wrong.
- Plinth and Undrift by the handle free-agent83, [agent ready design system](https://github.com/free-agent83/agent-ready-design-system). A write time check on every file an agent writes. Fails: handle only.
- Also opened and set aside: Ali Afsah-Noudeh (a software engineer's MUI wrapper), Nurkhon Akhmedov (an essay by a product lead), Southleft's own Substack posts (agency voice), Uber's Base MCP and Atlassian's CLI post (company voice), Kaelig's State of AI field study reading list (a directory), Studio Maydit and Tarik Davis (agency guides, one written by an agent).
- Not new picks: Nayara Marques's public kit on GitHub, and Melina Kukkasela's two companion pieces on the product teams and on shared memory, which belong with pick 1.
