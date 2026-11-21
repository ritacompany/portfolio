# What a senior design system case study puts on the page (2026)

21 Nov 2026. Research only: no draft, frame or material file was changed. Builds on the 42 case study
map (`reports/Design system portfolio case studies.md`), the two research note folders, the reference
board (24 pages) and the tactics bank; it does not repeat them except where a finding is used. New
this pass: 31 pages opened by three research agents (12 on hiring ladders and reviewers, 13 on colour
and token write ups, 9 on AI era accounts; some overlap in reach), 9 more failed (listed in Sources).
Evidence ids point at `../NUMBERS.md` (N), `../concept/DECISION-INVENTORY.md` (table and date) or a
Mondai path. Nothing from Mondai or from Chadwick is quoted here.

How to read the marks: **RESEARCH** is a survey, dataset, benchmark or an employer's own ladder.
**CRAFT LORE** is a practitioner's or vendor's opinion. Sample sizes are given where a source has one.

## The answer in one screen

His reaction holds, with one correction. No opened source says in words that explaining semantic
tokens reads junior. What the evidence does show is stronger than a quote: the explanation is the
part everyone already has, and the pages that spend words on it are the ones with nothing else to
show.

- Semantic tokens look near universal: 85% of systems with a semantic tier and 90% with a primitive
  tier (zeroheight 2026, n=147, RESEARCH). Caution: those figures come from the 19 Oct note; the
  claim check found n=147 on the public report page but not the percentages, which may sit in the
  gated full report. Do not cite them publicly until reread.
- Employer ladders put the mechanics at entry level. One framework puts understanding component and
  token usage at its first level and owning architecture decisions at its fourth; a levelling
  template puts "the fundamentals of system design" at junior. GitLab's design system ladder asks
  every level for experience with design tokens, then gives staff the decisions about tokens and
  foundations; its senior and staff rungs are triage, deciding what belongs in the system, adoption
  and cross team work (RESEARCH, three ladders). Token knowledge is required of everyone; what moves
  a level is deciding.
- Of 13 colour and token write ups by respected teams, about 10 use semantic tokens without
  explaining them. The clearest page that does explain them (Pendo) is also the one with no count,
  method or cost (CRAFT LORE, read as a pattern across 13).
- One low authority vendor post advises the opposite: show the base type scale, primary colour
  tokens and grid logic first (Portfoliobox, CRAFT LORE). It is the only counter found.

The correction: the topic is not junior, the explanation is. A tokens section that shows a judgement
the reader could disagree with, with a count, reads senior. Primer's contrast audit, Stripe's
contrast arithmetic and Island's 12,000 token migration all sit squarely on colour and tokens and are
among the strongest pages found. So the section stays, shrinks and changes job: from how tokens work
to what he decided about colour and how he knows it held.

## Craft

**Table stakes** (assumed; junior if dwelt on)

- A primitive to role to component chain and the naming anatomy behind it. Near universal (85% and
  90%, zeroheight, unconfirmed on the public page), required at every level by GitLab and placed at
  entry level by the other two ladders. Atlassian's own docs teach it in
  one line; a reviewer does not need it taught again.
- A component library with variants and states, documented. 92% of systems include documentation and
  90% define tokens in a design tool (zeroheight). In the 42 case study map, atomic levels or a
  foundations list used as headings was the strongest predictor of a page reading as a gallery.
- Light and dark through modes (76% use tokens for modes, zeroheight).
- An inventory of what exists (component counts, variable counts) presented as the result. The map
  and the reference board both flag inventory counts shown as outcomes.

**Distinctive** (what senior and lead pages show)

- A decision with the option not taken and its cost. Only about two in five of the 42 do it; it is
  the clearest single split between memorable and forgettable in that map.
- Scope decisions: what belongs in the system and what does not. This is GitLab's staff rung word for
  word, and the reference board's Flex page ends on "deciding what not to build".
- A rule that turns a goal into something checkable. Stripe: shades five levels apart always pass
  small text contrast. Radix: every one of 12 steps has a job, with a stated contrast guarantee for
  text steps.
- A count before and after, with the method. Primer audited every colour pair across themes and put
  the check in CI on every pull request; Harvey lints primitives now and plans legacy warnings at
  80% adoption and pre commit errors at 95%; Island migrated over 12,000 token uses at 98.75% accuracy.
- A named failure of the system itself. Island: a text token chosen because its hex matched a
  background broke in dark mode; hover and pressed collapsed into one token.
- The system shown working on real screens, not on a specimen sheet (map: Swapnil, Nasir, Linear;
  board: Yudistira's spacing labels on a real card).

**Recommendation** (ranked, what to put on the page)

1. Component or not: a component is decided by interaction, never by repetition, with the backtrack that forced it (an AI redesign marked 41 element types as new components). It is a scope decision with a cost, the staff level signal. Evidence: DECISION-INVENTORY, Components and states, 2 and 6 Oct 2026 (CONFIRMED).
2. Buttons fill by default and take one or two column widths, from an audit of 236 buttons in 33 widths with screens built through the plugin hugging by default. Show the audit spread beside the rule. Do not claim the 236 were recounted. Evidence: N19 (before CONFIRMED, no after); DECISION-INVENTORY, Components and states, 25 Sep 2026.
3. Spacing judged on eight real screens at 48 against 64, then spacing roles with the ladder gaps filled, with the 669 raw links moved onto roles. Show the before and after previews, not the scale. Evidence: N20 (669, 122 then 30 CONFIRMED; the 800 is an ESTIMATE); DECISION-INVENTORY, Layout, 25 to 27 Sep and 2 Oct 2026; Mondai `process/spacing-rules/previews/`.
4. Inputs on one outline ladder with no filled state, because the filled state was covering for value text that looked like placeholder text. A craft call a reviewer can see in one image and argue with. Evidence: DECISION-INVENTORY, Components and states, 30 Sep 2026 (CONFIRMED).
5. One 12 column grid, with the earlier AI supplied grid values removed so they could not return. Keep it to one labelled screen; the decision line is the interesting part, the grid is table stakes. Evidence: DECISION-INVENTORY, Layout, 23 Sep 2026 (Decided by ASSUMED); Mondai `process/nosidebar-grid/renders/N-signup-grid.png`.
6. Documentation only as one number, not a section: components with a description, 4 of 94 to 105 of 106. Evidence: N22 (CONFIRMED).

## Scaling with AI

**Table stakes** (assumed; junior if dwelt on)

- An MCP server, an agent skill, llms.txt and agent files in the repo. In the July census of 21
  public systems: MCP 20, skill 19, repo agent files 16, llms.txt 15 (RESEARCH; the page was
  regenerated 28 Oct but its data is still July). The map already calls "agents as a second
  audience" table stakes.
- A design.md or similar context file; a 2026 dev tutorial now lints the file itself, which tells you
  the file alone is ordinary.
- Code Connect and component descriptions for agents; Figma's own docs name them as the basics.
- A pipeline diagram of skills and agents. Atlassian treats MCP against CLI delivery as a tuning
  detail (an 8% time and token gain), which shows how far the plumbing has become routine.
- A tool demo where agents build screens and nobody judges them (map: Parundekar).

**Distinctive** (still rare)

- A behavioural measure of agent output against the system, with its method: NordVPN's ten tasks,
  six models, three runs with the worst counted; an open benchmark now packages the method with
  stated weights (judgement 0.30, API fidelity 0.25, token discipline 0.15).
- A check that passed and was wrong. Kaelig's 27 fabricated tokens that passed tests is the known
  example; it is an engineer's log. No case study told one from a designer's seat (map, gap).
- Checks tested against planted mistakes before their pass counts. One 2026 experiment planted
  mistakes that lint, axe and visual checks caught, and still found that passing did not settle what
  ships. A general essay puts the ceiling on checking as the share of wrong work the checker accepts.
- A human gate: what the lead set, checked and overruled. 1Password puts a human gate before work
  starts; Atlassian says its most useful improvements came from things no metric flagged, found
  partly by inspecting traces.
- Evaluation by a designer on a Figma library. Every published agent test found was run by engineers
  on code; none by a designer on a library (map and this pass, no counterexample).
- An employer now asks for exactly this: Careem's design systems role lists AI assisted audits and
  linting to catch off system usage and token misuse before shipping.
- The only portfolio advice found on AI is generic but points the same way: find the one place AI
  belongs in each case study and say why (Designlab, CRAFT LORE).

**Recommendation** (ranked)

7. The checks that passed while the screens were wrong (20 Sep), and the rebuild of the checks to read the real file. This is the rarest beat in the field and he holds it from the designer's seat. Evidence: DECISION-INVENTORY, The system with its builders, 20 Sep 2026; Mondai `design-system-ai/EVIDENCE.md`, act two.
8. The agent usability test: fresh agents rebuild a known screen from the library alone, scored by him; about 31 mistakes a build before, with the library defects it exposed. A designer run behavioural test on a Figma library has no published counterpart. Evidence: N17 (before CONFIRMED); the after run is missing and is what turns this from a before into a result.
9. Checks proven on planted mistakes before they count: ledger rows 10 to 74, the label check 5 of 6 then 6 of 6, the grid audit 27 of 33 left honest. Evidence: N14, N15 (CONFIRMED); Mondai `ops/check-ledger.md`.
10. What the system had to change so agents could read it, shown as system decisions rather than an AI layer: code names on variables 0 of 235 to 425 of 431, buttons that hugged under the plugin, grid values that came from AI. Evidence: N21 (CONFIRMED); DECISION-INVENTORY rows for 23 Sep, 25 Sep and 2 and 6 Oct 2026; the inventory's own reading under What the inventory already shows.
11. The screen critic calibrated on 20 frames he had already judged: false alarms 10 of 10 to 6 of 10, catches 10 of 10 to 8 of 10, verdict not yet a gate. Shows the human gate in numbers. Evidence: N16 (CONFIRMED).
12. The pipeline, skills and agents as one real diagram with its detours, and the overgrowth that was cut. Low rank because the artefacts are table stakes; their value is the cut and the before (thirteen agents at once, nine delivered nothing). Evidence: N28, N29 (CONFIRMED); N18 (one build, not a rate); Mondai `.claude/skills/new-work/SKILL.md`.

## Proof

**Table stakes** (assumed, or distrusted)

- Role and team stated, product live. A Design Lead reviewer asks whether products are "live and
  traceable" and scaling (secondhand, earlier note).
- Percentages with no baseline, "adopted by every team", output counted as change. Distrusted by
  every source that names proof (Learnist, Jaiswal); only one of 42 case studies gave a coverage
  figure with a baseline.
- Company or programme results credited to the system (map: frog, Raise).

**Distinctive**

- A count with its baseline and method in the same line. Rare: one of 42 in the map.
- An adoption proxy an engineer would accept: token purity (share of styles on semantic tokens),
  detachment, coverage (Jaiswal, CRAFT LORE but the yardstick an engineering panelist brings). None of
  the 42 use one.
- A number that did not move, said plainly. Etsy asks what did not work; Kennedy praises naming what
  remains.
- An inspectable artefact: a recording of the system working or a check rejecting work (earlier
  notes: Bogdan, Geoco, ADPList, all CRAFT LORE).
- Migration cost in real units. Almost no colour or token write up states one (13 opened), so a real
  figure would stand out.

**Recommendation** (ranked)

13. Faults the Figma check knows about, handed off without his ruling: 596 on 99 screens, then 97, then 0, then 0, with the method and the caveat that the later zeros are the gate holding. Baseline, method and a reason to trust it in one line. Evidence: N9 (CONFIRMED).
14. Sprint length on active days only: Peer Connect 5, the heavy process sprint 10, Studio 4, with the reading kept honest that screens per day did not change. Evidence: N1, N2, N4, N6 (days CONFIRMED; hours are floors).
15. Token purity in his own numbers, with the limit beside it: colour bound to some variable about 97% but only 69% to roles; text styles bound to size variables 0 of 18 to 19 of 19. Evidence: N24 (CONFIRMED); N25 (CONFIRMED as of 19 Oct, needs a fresh read); N23 held back until the tokens audit is settled.
16. The agent test after run beside the before: the proof the whole second part needs. Evidence: N17 before only; after run no evidence yet.
17. What did not move: his review rounds did not fall and repeated comments still climb late in a sprint. Evidence: N12, N13 (CONFIRMED, Studio a floor).
18. A short recording of an agent building a screen and a check rejecting it. Evidence: no evidence yet (N18 is one build with no recording found).

## Tokens or colour

**Does a tokens or colour section belong?** Yes, as one short section about colour decisions, not a
section about tokens. Cut the explanation of tiers to a single labelled visual with no paragraph of
its own: the chain from raw value to role to a layer on a real screen, captioned with what it
replaced. Everything else in the section is judgement and counts.

What it would show that is not table stakes, from what he holds:

19. One token per job, measured: every colour on the MVP screens (about 40,000 paints) and the library (3,555) grouped by the job it does, with one token per job at the colour his screens already use most for it. That is a usage audit, the move Primer and Harvey made, and nobody in the 42 shows one. Evidence: Mondai `process/token-picker/colour-by-job/LIST.md` (no NUMBERS id yet; add one before the sentences).
20. The 11 colour sheets judged by purpose: elements compared by what they do and how they are used, never because they share a colour or an outline, then ruled sheet by sheet (accent text, selected states, card outlines, fills, hover and pressed, buttons, outlines at rest, progress, icons, alerts, overlays). Show two or three sheets with his ruling as the caption. This is the decision with an alternative (match by value) that the ladders call senior. Evidence: Mondai `process/token-picker/colour-by-job/HIS-DECISIONS-21OCT.md` and `sheets/`; no DECISION-INVENTORY row yet.
21. One rule that turns a feel into arithmetic, Stripe style: pressed is one step lighter than hover in dark mode, green included, and hover and pressed text is never dimmer than rest; an icon beside text sits one step darker than its text. Evidence: same Mondai file, 22 Oct follow up; no NUMBERS id.
22. The agent test as the colour system's proof: every colour the agents placed on their own layers was bound to a published role, while the role name Text/Display was read by agents as a size, not as the brightest text. One success and one naming defect, both found by testing names on a reader that never met him. Scope the claim to layers the agents made. Evidence: N17; `../draft/CLAIMS.md` C17 and `../draft/VERIFY.md`; Mondai `design-system-ai/evidence/AGENT-TEST-BEFORE.md`.
23. Gold is not part of the system: a colour that never existed spread because it was written down and repeated. A one line story about why the system's source has to be the file, which also sets up part two. Evidence: DECISION-INVENTORY, Foundations, 19 Aug 2026 (Decided by ASSUMED; who caught it is missing).
24. Dark only, one mode, as a stated scope cut with its reason. One line, not a section. Evidence: DECISION-INVENTORY, Foundations, 2 Oct 2026 (CONFIRMED).

Keep out of the section: colour meaning and the mono and Heebo split (framework CS owns them), and the
14 Oct restructure counts (N23) until the tokens audit reading is confirmed.

What would change this answer: a named design system hiring manager saying token tiers are what they
want to see explained (none found in four passes), or his tokens chat record showing the 21 Oct
rulings were reversed.

## Gates

- G1, G2, G4, G5: met by this file (`check-content.mjs` and a manual read for Oxford commas and quotes).
- G3: met. An independent Sonnet agent, given only the claims and links in `claim-check.md`, opened
  every page: 15 supported, 5 partly, 1 not supported, 1 could not open. Every partly and not
  supported claim was corrected in this file (GitLab does name tokens; Harvey's thresholds are
  plans; the zeroheight percentages are unconfirmed; Atlassian's transcript line; Figma's wardens
  belong to the large team stage; the Jaiswal page now 404s).

## Sources

Opened this pass (new):

- RESEARCH, employer ladder: [GitLab, Product Designer, Design System job description](https://handbook.gitlab.com/job-description-library/product/product-designer-design-system/), modified 30 Oct 2026. Levels Product Designer to Distinguished; experience with design tokens required at every level, token decisions at staff.
- RESEARCH, anonymous ladder (no author or organisation named): [Design Career Framework v3.0](https://mikeofmagnesia.github.io/career-framework/product-design.html), 2025. Read through a summarising fetch; level wording paraphrased by the tool except "Design systems, not just screens" and "No systems-level thinking".
- RESEARCH, levelling template (author not named): [Design systems levelling sheet](https://docs.google.com/spreadsheets/d/18VvbVCNBRWu-QYPncBl5IWTXTOpD68UQsLsymBvfm88/edit).
- CRAFT LORE: [Ariel Salminen, What's a design systems lead](https://arielsalminen.com/2023/whats-a-design-systems-lead/), Feb 2023.
- CRAFT LORE, vendor: [Figma, The spectrum of maturity for design systems](https://www.figma.com/scaling-design/the-the-spectrum-of-maturity-for-design-systems/), undated.
- CRAFT LORE, vendor, low authority: [Portfoliobox, How to present a design system portfolio](https://www.portfoliobox.com/magazine/design-system-portfolio), Apr 2026. The one counter source.
- CRAFT LORE: [Toptal, UX portfolio tips from recruiters](https://www.toptal.com/designers/ux/ux-portfolio-tips-recruiter), Aug 2026 (nothing design system specific).
- Null results, opened: Rippling ladder (2024), Intercom levels (2021), Kumu framework, Brad Frost interview questions (2020, a stakeholder script), Jonathan Snook (2016).
- Team write up: [GitHub, Primer colour system and inclusive design](https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/), May 2023.
- Team write up: [GitHub, Accelerating theme creation with colour tooling](https://github.blog/news-insights/product-news/accelerating-github-theme-creation-with-color-tooling/), Jun 2022.
- Team write up: [Stripe, Designing accessible color systems](https://stripe.com/blog/accessible-color-systems), Oct 2019 (older, canonical).
- Team write up: [Harvey, Rebuilding Harvey's design system](https://www.harvey.ai/en-US/blog/rebuilding-harveys-design-system-from-the-ground-up), Jan 2026.
- Team write up: [Island, Teaching AI to migrate 12,000+ design tokens to dark mode](https://www.island.io/blog/teaching-ai-to-migrate-code), Jul 2026.
- Team write up: [Pendo, Why we rebuilt the visual foundation](https://www.pendo.io/pendo-blog/why-we-rebuilt-the-visual-foundation-of-pendo), Jul 2026.
- Docs: [Radix Colors, Understanding the scale](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale); [Atlassian, Design tokens](https://atlassian.design/foundations/tokens/design-tokens) and [Migrate to tokens](https://atlassian.design/foundations/tokens/migrate-to-tokens); [Adobe Spectrum design data for AI](https://opensource.adobe.com/spectrum-design-data/ai); [Adobe Leonardo](https://leonardocolor.io/). All undated.
- Team write up: [FloQast, Lessons from the Flow UI migration](https://www.floqast.com/engineering-blog/design-system-in-flux-3-lessons-from-the-flow-ui-migration), Oct 2023 (little colour content).
- Preview only, paywalled: [Into Design Systems on Indeed's MCP benchmark](https://intodesignsystems.substack.com/p/ai-design-system-mcp-example), Jun 2026: 8 configurations, 1,056 prompts; findings not readable.
- RESEARCH, dataset (n=21 systems, July 2026 data): [State of AI in Design Systems](https://state-of-ai-in-design-systems.netlify.app/).
- RESEARCH, open tool, no results of its own: [open design system bench](https://github.com/christophhdesign/open-design-system-bench), Oct 2026.
- Worked example with internal benchmark (task count not given): [Atlassian, Giving AI agents design system context from the terminal](https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli), Sep 2026. Written by engineers.
- Vendor benchmark, n=7 paired scenarios: [Infragistics, MCP and agent skills study](https://www.infragistics.com/blogs/empirical-study-of-mcp-and-agent-skills-benefits), Jun 2026.
- Secondary summary of the census: [Smart Interface Design Patterns, AI design systems 2026](https://smart-interface-design-patterns.com/articles/ai-design-systems-2026/), Oct 2026. It calls first party MCP servers rare, which conflicts with the census count of any MCP server; the difference is first party against any.
- Worked example, pseudonymous author: [design.md lint tutorial on DEV](https://dev.to/promptmaster/off-brand-ui-from-your-ai-agent-write-lint-and-wire-a-designmd-192m), Nov (year not shown).
- Worked example: [agent review pull request 87](https://github.com/adamdhickey-collab/agent-review/pull/87), Nov 2026. Not a design system repo.
- Essay, not about design systems: [The ceiling on checking an agent](https://reasoningunderuncertainty.substack.com/p/the-ceiling-on-checking-an-agent), Oct 2026.
- CRAFT LORE, educator: [Designlab, Rebuilding your portfolio for the AI hiring market](https://designlab.com/blog/rebuilding-your-portfolio-for-the-ai-hiring-market), Oct 2026.
- CRAFT LORE, engineer: [Yaseen Khatib, The AI native portfolio](https://dev.to/yaseenyk04/the-ai-native-portfolio-landing-lead-roles-by-shipping-the-system-1b0c), Sep (year not shown). Not used for a recommendation.

Used from earlier notes (opened in those passes, not reopened now):

- RESEARCH, survey n=147: [zeroheight Design Systems Report 2026](https://report.zeroheight.com) via `research_notes/Design system case study readiness/maturity-signals.md`. Vendor with an interest in documentation. The claim check (21 Nov) could not find the tier, documentation or modes percentages on the public page; treat them as unconfirmed.
- Employer: [Careem, Senior Product Designer, Design Systems](https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7) via `research_notes/Design system case study hooks/hiring-signals-2026.md`.
- CRAFT LORE, engineer: [Sujeet Jaiswal, Design system adoption foundations](https://sujeet.pro/articles/design-system-adoption-foundations), same note. Returned 404 on 21 Nov; find its new address before citing it publicly.
- Engineering log: [Kaelig Deloumeau-Prigent, agent teams](https://www.kaelig.fr/design-system-components-with-ai-agent-teams/) and the NordVPN benchmark via [Into Design Systems](https://intodesignsystems.substack.com/p/how-to-measure-if-ai-agents-actually), via `ai-design-system-landscape.md`.
- Team write up: [1Password, agent driven design system](https://1password.com/blog/agent-driven-design-system), via the 42 case study map.
- The 42 case study map, the reference board (24 pages) and the Etsy, NN/g, Kennedy, Learnist, Bogdan, Geoco and ADPList findings, all as recorded in those files.

Failed this pass, not used: Nathan Curtis on token naming and team models (Medium, 403); Design
Systems Collective posts on Kuda and on token structure (403); Dan Mall's career paths post (404);
EightShapes leader post (500); uxdesign.cc, ACM Interactions, Rosenfeld and uxplanet portfolio
pieces (403); mantlr.com and an x.com post (402). A snippet attributing a "the more senior, the more
abstract the problem" line to Dan Mall, and one saying hiring managers rank prior design system
experience first, were never opened and are not used.
