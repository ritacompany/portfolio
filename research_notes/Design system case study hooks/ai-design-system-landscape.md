# AI agents and design systems: published landscape 2025 to 2026, and what nobody has shown

Researched 23 Oct 2026. Builds on R7 (2 Oct), R9, R2 agent experience (15 Oct) and ai-ready-systems.md. Those pieces are not repeated here except where new material confirms or contradicts them.

## Sample size, plainly

- Searches: 13 web searches.
- Pages opened in full and used: 11. Kaelig Deloumeau-Prigent (Intuit agent teams), Kaelig's State of AI in Design Systems dataset, Into Design Systems on NordVPN's Aurora benchmark, Mateusz (dev.to) five arm experiment, Cory Rylan, Murphy Trueman ("new author"), Into Design Systems ("not ready for AI agents"), taka / nukotsuka (Cloudbase, note.com), Dora Makszy portfolio, Affora arXiv abstract, David Hoang (Proof of Concept, only the part before the paywall).
- Opened but empty: zeroheight Config 2026 post returned only the site shell (title and hero banner), no article body. Only the hero line is used.
- Failed to open (403, 404 or 503), not used as sources: Design Systems Collective "documentation for both AI agents and humans" (403, then freedium 503), Rostislav Peska "A constrained test" on Medium (403, scribe.rip 404, freedium 503), John Maeda Design in Tech Report 2026 "From UX to AX" on Medium (403).
- Method caveat: pages were read through a fetch tool that summarises. Quotes are the short lines it returned as verbatim. Recheck any quote against the live page before it goes into a case study.
- Search snippets that were not opened appear only under Gaps.

## Table of what has been published (new since the earlier notes, plus the strongest prior pieces for contrast)

| # | Author, role | Date | URL | One line argument | Evidence type | Opening line |
|---|---|---|---|---|---|---|
| N1 | Sil Bormüller (Into Design Systems founder) reporting Christoph Hellmuth, Design Engineering Manager for Design Systems at NordVPN | 13 Oct 2026 | [How to measure if AI agents actually use your design system](https://intodesignsystems.substack.com/p/how-to-measure-if-ai-agents-actually) | A repo can look agent ready while agents still invent components; readiness needs a behavioural benchmark, not an audit. | Benchmark: 10 intent tasks, 6 models, 3 runs each with worst run counted, weighted rubric, before and after on the audit score. Secondhand write up of a talk. | "What I learned from Christoph Hellmuth at our AI Jam on September 29 2026" |
| N2 | Mateusz, engineering manager (18 years in IT, Poland) | "Posted on Oct 7" (year not on page; search listing dated it about 15 days before 23 Oct 2026) | [Does a design system change what a coding agent writes?](https://dev.to/jablonowski/does-a-design-system-change-what-a-coding-agent-writes-280d) | The system does not make the agent more accurate; it decides who owns the code the agent writes. | Controlled experiment: one Angular dashboard, byte identical prompt, 5 arms adding one layer each, 30 scored runs, two unnamed models. | "A while ago I finished a piece of work I was proud of: a design system built the way I'd argue..." |
| N3 | Kaelig Deloumeau-Prigent (title not stated on page) | 22 Apr 2026 | [Building design system components with agent teams](https://www.kaelig.fr/design-system-components-with-ai-agent-teams/) | A multi agent pipeline can build a production component for Intuit's system but needs human gates where judgment beats automation. | Build log with a counted failure (27 fabricated tokens while tests passed), fixed by rules, 34 retrospective findings tiered. | "I built a complex design system React component from a Figma file without manually writing a single line of code." |
| N4 | Kaelig Deloumeau-Prigent | Data 26 to 28 Jul 2026, page generated 21 Sep 2026 | [State of AI in Design Systems](https://state-of-ai-in-design-systems.netlify.app/) | Census of agent affordances across 21 public systems. | Dataset, CC BY 4.0, each record linked to its source. | (data page, no opening prose) |
| N5 | Cory Rylan, software developer and speaker | 15 Oct 2026 | [Enforcing design system rules in AI generated UI](https://coryrylan.com/blog/enforcing-design-system-rules-in-ai-generated-ui) | Agents use the right components wrongly; system specific lint rules in CI catch it before review. | Worked example: 3 ESLint errors to 0. | "An AI coding agent can use the right design system components and still use them incorrectly." |
| N6 | Murphy Trueman, design systems practitioner | 25 Jun 2026 | [Your design system has a new author](https://blog.murphytrueman.com/your-design-systems-newest-author-is-an-agent/) | Agents now write to systems, not only read them, so review and traceability must catch up. | Opinion citing product announcements. | "Twelve months ago I argued in [Your next design system user is an agent] that the next user of your design system would be an agent." |
| N7 | Sil Bormüller, Into Design Systems founder | 10 Apr 2026 | [Your design system is not ready for AI agents](https://www.intodesignsystems.com/blog/design-system-not-ready-for-ai-agents) | Five failure modes cause most agent breakage. | Secondhand talk reports; Indeed format benchmark; Spotify adoption numbers. | "Most design systems are not ready for AI agents." |
| N8 | taka / nukotsuka, product designer, Cloudbase | 1 Apr 2026 | [AI UI implementation accuracy is determined by the designer](https://note.com/nukotsuka/n/nc1e7006616ca?hl=en) | Agent output quality tracks Figma file and codebase quality, not the tool. | Six months of field notes, failures, before and after screenshots of layer names, no metrics. | "Just pass the Figma URL and get the code" |
| N9 | Dora Makszy, Design Systems Lead, Element Logic | 2024 to ongoing (page date not shown) | [Case studies](https://heydorka.rocks/case-studies/) | Portfolio case study: from one designer's system to an agentic one. | Portfolio; one non AI metric (5 hours to 1 hour a week reconciling components); visuals pending. | "Three years of the same design system evolving with the team and the technology around it" |
| N10 | Jin Gao (sole author) | 16 Sep 2026 | [Affora: a design system for agent friendly interfaces](https://arxiv.org/abs/2609.19125) | One shared interface can serve humans and computer use agents if interaction meaning is preserved. | Three controlled studies (counts not on abstract page). About agents using UIs, not building them. | (abstract, paraphrased by the fetch tool) |
| N11 | David Hoang, Proof of Concept newsletter | 2 Aug 2026 | [Agent experience](https://www.proofofconcept.pub/p/agent-experience) | Systems now have agents as users as well as people. | Essay; paywalled after the intro; no design system mention in the visible part. | "Designers and software makers are familiar with user experience:" |
| P1 | Hardik Pandya | Sep 2026 | [Expose your design system to LLMs](https://hvpandya.com/llm-design-systems) | (from R7) Constrain agents with specs, tokens and audits. | 418 hardcoded values to 0 | "LLMs drift, fabricate tokens, and start every session from scratch." |
| P2 | Murphy Trueman | 2026 | [design-system-ops](https://github.com/murphytrueman/design-system-ops) | (from R7) Claude skills for design system ops, tested on fixtures with planted problems. | Evals on planted problems | "Design systems drift. Tokens go stale." |
| P3 | Maria Christley, Rachel Radford (Atlassian) | 28 May 2026 | [Building the context engine for the AI era](https://www.atlassian.com/blog/ai-at-work/atlassian-design-system-building-the-context-engine-for-the-ai-era) | (from R9) The system becomes a context engine for agents. | Self reported AI accuracy numbers | (see R9) |

## Since early October 2026, what new pieces exist? Has anyone published an agent usability test of a design system, or a before and after of agent mistakes after fixing the system?

### Takeaway
Yes, and this contradicts R7 and R2. Since late September 2026 at least two pieces run what is effectively an agent usability test: NordVPN's Aurora benchmark (intent tasks that never name a component, mistakes scored, a before and after on the audit score) and Mateusz's five arm experiment (same screen, counted reimplementations). Kaelig's April 2026 log is the clearest failure story of output that passed tests but was wrong, with a counted before and after (27 fabricated tokens to 0). What is still missing everywhere: the grader proven on planted mistakes, and a before and after of the behavioural score itself.

### Cited Findings
- Aurora tasks are written by intent and never name a component; a linter flagged one task that leaked the real `PasswordInput` export. Each task runs 3 times per model and the worst run counts. Rubric: imports 10%, apiFidelity 25%, tokenDiscipline 15%, a11yStatic 10%, compile 10%, judgment 30% (graded by a separate model). Source: [Into Design Systems, 13 Oct 2026](https://intodesignsystems.substack.com/p/how-to-measure-if-ai-agents-actually) (method sections)
- Aurora mistakes counted: 41 of 57 guided generations hand rolled components (72%); 10 of 55 guided cells compiled against published types; about 250 type errors, about 100 from `direction="column"`. Source: [Into Design Systems](https://intodesignsystems.substack.com/p/how-to-measure-if-ai-agents-actually) (section "The AGENTS.md was there and the models still built their own buttons")
- "It just invented a button, and honestly, we were quite shocked". Same source, same section.
- Audit read better than behaviour: audit 64.8 against benchmark 44.9; "The audit score is always the optimistic one." Same source (sections "The repo read 20 points better than it behaved" and "Two tools")
- "Their docs were teaching the agent some of the traps." Same source, section "The repo read 20 points better than it behaved".
- Before and after: hand rolled buttons 72% with source against 22% with the npm package after one README sentence; audit score 64.8 to 82.0 after fixes (exported types, an llms.txt); per model figures DeepSeek V4 Pro 58.7 to 84.8 and Sonnet 5 single shot 51.2 to 75.3 as reported. The benchmark score after fixes is not reported. Same source (section "One sentence in the README flipped it")
- No validation of the grader on planted mistakes is described; the only check on the test is the task linter. Same source.
- Mateusz: 5 arms (spec and Figma only; plus prose styleguide; plus installed npm packages; plus `llms.client.txt`; plus MCP token resolver), 30 scored runs, five per arm on a primary model plus one per arm on a second. Without the package "twelve or thirteen of the thirteen places" reimplemented and "around ninety custom properties" owned by the app; with it "zero, and zero". Hallucinated component API: "Not once in thirty runs." Source: [dev.to, Mateusz](https://dev.to/jablonowski/does-a-design-system-change-what-a-coding-agent-writes-280d) (sections "The experiment, briefly" and "What came out")
- Mateusz's failure that looks fine: the agent read the palette correctly but "ships serious contrast failures, repeatably, on both models" and "nothing in the diff looks like an error." Same source, "What came out". The MCP resolver arm showed no detectable improvement. Same source.
- This contradicts the general claim that agents hallucinate component APIs: in Mateusz's runs they did not, while in Aurora's they produced about 250 type errors. Sources: [dev.to](https://dev.to/jablonowski/does-a-design-system-change-what-a-coding-agent-writes-280d); [Into Design Systems](https://intodesignsystems.substack.com/p/how-to-measure-if-ai-agents-actually)
- Kaelig's failure story: v0.2 reported success with 34 stories and 17 interaction tests passing, yet "All 27 tokens use a plausible `--ids-*` prefix that does not exist in IDS"; "Tests passed because tests check behavior, not visual appearance." He caught it by opening Storybook; fixed with three rules including a Quality Gate that fails on any `--ids-` prefix; zero fabricated tokens from v0.3 across 13 more releases. Source: [kaelig.fr](https://www.kaelig.fr/design-system-components-with-ai-agent-teams/) (section "The 27 fabricated tokens")
- Kaelig tiered 34 retrospective findings: 18 fixable with rules, 9 tooling gaps, 6 needing human judgment. "Human gates aren't where automation fails. They're where humans are genuinely better judges." Same source ("Halting for humans")
- Cory Rylan's failures: a form control with no label and an icon name `rocket-launch` that does not exist; 3 ESLint errors fixed to "pass with no errors or warnings". Source: [coryrylan.com](https://coryrylan.com/blog/enforcing-design-system-rules-in-ai-generated-ui)

### Inferences
- The agent usability test now exists as a method, but only from engineering managers and design engineers at larger companies or in personal labs. None is by a lead designer, none is on a product's own screens from its own strategy, and none tests the Figma library (all test code packages).
- The strongest new pattern is "the audit said ready, behaviour said no" (Aurora's 20 point gap; Kaelig's passing tests over unstyled output). A case study that only reports passing checks now reads as naive.
- Nobody grades the grader. Aurora uses a model judge for 30% of the score and never reports catching planted mistakes. Trueman's repo (R7) remains the only planted problem evidence, and it is not a narrative.

### Gaps
- Rostislav Peska's "A constrained test" (Medium, search dated about Jan 2026; snippet says a Storybook surface "produced substantially better reuse") could not be opened.
- Aurora's six models are not all named in the write up; per model figures were returned by the fetch tool and should be rechecked before quoting.
- Mateusz's page gives no year; dated by search listing only.

## Who uses the framing of a design system with two audiences (people and agents), and is it now common?

### Takeaway
The framing is now table stakes. A census of 21 public systems finds 20 with an MCP server, 19 with an agent skill and 15 with llms.txt, and a design systems vendor uses "teams and agents" as its hero line. The novelty has moved from saying agents are an audience to proving the system works for them.

### Cited Findings
- 21 systems, 6 platforms, 200 AI affordances. With at least one: MCP server 20, agent skill 19, repo agent files 16, llms.txt 15, AI docs 15, Storybook 14, registry 11, editor rules 9, CLI 9, Code Connect 3. Maturity: 15 "ai-native", 5 "invested", 1 emerging (USWDS). Source: [State of AI in Design Systems](https://state-of-ai-in-design-systems.netlify.app/) (summary table)
- Per system in that census: Atlassian, Shopify Polaris, GitHub Primer, IBM Carbon and Salesforce SLDS each have at least one MCP server and an agent skill; Primer and Carbon also list Code Connect. Spotify, Vercel and Indeed are not in the 21. Same source.
- Vendor framing: "Get teams and agents building from your design system". Source: [zeroheight](https://zeroheight.com/blog/what-do-the-config-2026-announcements-mean-for-design-systems/) (hero banner; article body did not load)
- Portfolio framing: the system is "now being extended to work for AI agents as well as people." Source: [Dora Makszy](https://heydorka.rocks/case-studies/) ("At a glance")
- Practitioner framing: agents moved from reader to writer, "I underrated how much harder it is to build one that survives being written to." Source: [Murphy Trueman, 25 Jun 2026](https://blog.murphytrueman.com/your-design-systems-newest-author-is-an-agent/) ("The thing I underestimated")
- Indeed: "Our docs are written for humans. The new user, AI, needs structured metadata, not documentation prose." Source: [Into Design Systems, 10 Apr 2026](https://www.intodesignsystems.com/blog/design-system-not-ready-for-ai-agents) (failure mode 2)
- Confirms R9: Spotify ("good for humans, but also good for machines") and Atlassian (context engine) already used the two reader framing in Feb and May 2026. See R9 rows 9 and 10.

### Inferences
- "Two audiences" is no longer a hook. Every big system and a vendor homepage say it. A case study that leads with it is starting where the field already is.
- The census measures affordances (files exist), not behaviour. Aurora shows those two can be 20 points apart. That gap is the open ground.

### Gaps
- No primary 2026 post from Primer, Polaris or Vercel on agent audiences was found by search; the census rows are the only evidence.
- Kaelig's methodology page was not opened, so whether "ai-native" includes any behavioural test is unknown.

## Is "agent experience" being applied to design systems by name, by whom?

### Takeaway
Rarely, and not by any major system. AX by name lives in general product and platform writing (Biilmann, Hoang, agencies, Maeda's report title). Design systems writers describe agents as users without the AX label. The one academic "design system" for AX (Affora) is about agents operating interfaces, not building from a library. Applying AX by name to a design system, with an agent usability test as its method, is still unclaimed.

### Cited Findings
- Hoang frames AX broadly: "For decades, the 'user' was assumed to be human." No design system mention in the visible text; rest paywalled. Source: [Proof of Concept, 2 Aug 2026](https://www.proofofconcept.pub/p/agent-experience)
- Affora presents "a design system" serving human and agent readers, but its agents are computer use agents operating independently authored interfaces; gains appear "where existing deficits were present" and are limited elsewhere (fetch tool paraphrase of abstract). Source: [arXiv 2609.19125](https://arxiv.org/abs/2609.19125)
- Kaelig treats agents as consumers of IDS through MCP tools but does not use the term agent experience. Source: [kaelig.fr](https://www.kaelig.fr/design-system-components-with-ai-agent-teams/)
- Trueman implies it ("agent-ready") without naming AX. Source: [blog.murphytrueman.com](https://blog.murphytrueman.com/your-design-systems-newest-author-is-an-agent/)
- Confirms R2: AX was coined by Biilmann on 28 Jan 2025 as "the holistic experience AI agents will have as the user of a product or platform". See R2 F1.1.

### Inferences
- An AX framing plus a usability method borrowed from UX research (task by intent, observe, count errors, fix, retest) is a designer's natural move and is unowned. The engineering pieces already have the mechanics; none frames it as user research with the agent as participant.

### Gaps
- Maeda's Design in Tech Report 2026 "From UX to AX" (Medium 403) and the Design Systems Collective "documentation for both" piece (403) were not opened; either may apply AX to systems.
- A Maven lightning talk by Jan Six, "Building real design systems with agents", surfaced only as a listing snippet.

## Are there portfolio case studies (not essays) by individual designers on design systems plus AI? How are they structured, where does the AI sit?

### Takeaway
One found: Dora Makszy. It is a classic challenge, approach, impact, outcome shape with AI as step 5 of 5 and the closing outcome, no AI metric and visuals pending. This confirms R7: the AI part of portfolio case studies is still a coda, not the evidence.

### Cited Findings
- Structure: "At a glance", "The challenge", "My approach" (five numbered steps), "The impact", "The outcome". AI appears in the glance line, step 5 and the outcome; "The challenge" does not mention AI. Source: [heydorka.rocks](https://heydorka.rocks/case-studies/)
- Only metric: weekly time reconciling components 5 hours to 1 hour; no AI specific metric or artefact; screenshots described as pending. Same source.
- Closing line: "building a design system that agents, not just people, can work within." Same source.
- The closest designer authored field report is taka at Cloudbase: six months of failures, "MCP output quality ≒ Figma data quality", and "simply using the design system correctly makes the layer structure itself an instruction manual for the AI", with no numbers. Source: [note.com](https://note.com/nukotsuka/n/nc1e7006616ca?hl=en)

### Inferences
- A case study where the agent test is the evidence for the whole system (the hook, not the coda) would be the first of its kind in this sample.

### Gaps
- Bestfolios and ADPList were not searched directly this pass; one general search returned no other example.

## Verdicts

### (a) Table stakes, no longer distinctive
- Agents as a second audience of the system (census, vendor hero lines, Atlassian, Spotify, Makszy).
- MCP server, llms.txt, agent skills, AGENTS.md (20, 15 and 19 of 21 systems).
- "Constrain the agent to the system" and three layer tokens (R7, R9).
- A lint or CI rule that catches agent misuse (Rylan; Kaelig's Quality Gate).
- Speed claims without a baseline (R9).

### (b) What the strongest pieces do
- Test behaviour, not affordances: intent tasks that never name a component, worst of three runs, a rubric (Aurora).
- Hold everything constant but one variable and count (Mateusz's five arms, 30 runs).
- Name the passing check that lied and the rule that fixed it, with a before and after count (Kaelig, 27 tokens to 0).
- Admit null results (Mateusz: MCP resolver no better; no hallucinated API).
- Each has a one line thesis: "The audit score is always the optimistic one"; "A coding agent is not a compiler"; "Tests passed because tests check behavior, not visual appearance."

### (c) What nobody has shown that a lead designer's case study could own
1. An agent usability test on a Figma library, run as user research by a designer: agent given only the library builds a known screen, mistakes counted, system fixed, retested. Every published test is on code packages and run by engineers.
2. The grader proven first: catch rate and false alarms on planted mistakes before a pass counts. Aurora's model judge and Kaelig's gates are not validated this way; only Trueman's repo does it and not as a story.
3. A before and after on the behavioural score, not the audit score (Aurora reports only the audit after fixes).
4. AX applied to a design system by name, with the agent treated as a research participant.
5. A strategy document to handoff pipeline run by the designer, with human gates and a decision log; all pieces start from Figma or a prompt.
6. A failure that passed the designer's own checks, and the check that changed because of it, told from the design lead's seat at startup scale.
