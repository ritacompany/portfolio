# Ten design system case studies: study notes

Captured 24 Nov 2026 so the set can be used later without reopening the pages. The links and why
each one made the list are in `../EXAMPLES.md`. These notes are paraphrased: the repo is public, so
the full screens and page text live in the private archive (link below), not here.

Private archive with every screen and the full text of each page: https://claude.ai/artifact/Q5CKQKpkyB9bEWRXdpdP7s (private to Chadwick; 173 screens, the full text of each page and these notes, captured 24 Nov 2026)

Every number below is the author's own claim, copied as stated on the page; none was checked
independently.

## The set at a glance: how each one shows the system

| # | Page | Leads with | The system shown as | Proof shown as |
|---|---|---|---|---|
| 1 | Wise multi brand | the brand problem, a team card | token layers and library maps, around 70 images | three plain result cards, no numbers |
| 2 | JPMorgan Chase Manhattan | a role, scope and year header | a story of moving from big to small components | a short impact paragraph and a reflection |
| 3 | IndiGo | a dark hero and a contents rail | a four phase timeline and what the system is made of | number tiles and one proof story |
| 4 | CASSI Harmony | three big numbers | four decisions in a grid, one docs screenshot | the same three numbers again |
| 5 | Musterhall | an at a glance card | numbered plates, before and after screens | written gaps and what comes next |
| 6 | Diorama (Codrops) | a workflow promise | a to do app built step by step by agents | the screens the agents made |
| 7 | WellSky | goal, hypothesis, result | build chains and one table card | two numbers and a video |
| 8 | Anorbank | a role and duration header | three numbered decisions, one component diagram | estimates with their limits stated |
| 9 | MCP audit (Medium) | what the article covers | before and after file structure | counts of components before and after |
| 10 | Fortune 200 enterprise (Medium) | a one line subtitle | two phases, audits, a hub and spoke map | adoption charts and formulas |

What to notice across the set:

- Only two pages put a decision with the option rejected in plain view (4 and 10). Both read as
  more senior than pages with more visuals.
- Only one page states the limits of its own numbers (8), and only one writes down what the system
  still gets wrong (5). Both are short pages that earn trust fast.
- Adoption is evidenced properly only in 10. Most of the others assert it in a sentence.
- The AI pages split two ways: AI as a reader of the system (7, 6) or AI as a tool to clean the
  system up (9). None of them counts what the agents got wrong before and after.
- Structure varies more than expected: a token map (1), a timeline (2, 3), a decision grid (4),
  plates (5), a tutorial (6), chains (7), a numbered list (8), a before and after tree (9) and a
  two phase report (10).

## 1. Wise multi brand: Ness Grixti, design lead

- Link: https://nessgrixti.com/portfolio/wise-multi-brand/
- Archive: 31 screens, about 1,900 words. Work after the 2024 brand refresh; footer 2026.
- Shape: the question (how one system serves several brands and systems), the team card (design
  lead plus a tooling and an editorial designer), then the story as a chain of short headed beats:
  the consumer system, editorial as an afterthought, a new product brand arrives, can we copy the
  system, splitting it, the library breaks, a fork in the road, a global token strategy, starting
  over, iterating, one library for all. Then the system itself (primitives, type and spacing,
  nested variables, accessible scaling, colour, interaction states, sentiment themes, brand
  theming, global tokens, token savings, library setup). Ends with three result words.
- Visuals that carry it: diagrams of which brand pulls from which library; Figma variable panels
  with modes; one screen shown in each brand and theme side by side; library tiles named with
  coloured book icons so the library map reads at a glance.
- Numbers: the token library had reached about 400 and, with more brands and themes coming, could
  have passed 4,000 without early optimisation.
- Take: tell the token story as a run of short headed moments that include the failure (the library
  breaking) before the fix. The side by side of one screen across brands proves theming in one
  image.
- Skip: the ending. Three single words as results is the weakest part of a strong page.

## 2. JPMorgan Chase Manhattan design system: Jasha Michele, lead product designer then acting head of design systems

- Link: https://jashamichele.com/case-studies/mds-modernizing-design-system/
- Archive: 6 screens, about 900 words. 2022 to 2025.
- Shape: a dark header with role, scope and years, an overview, the problem (components that tried
  to do everything), understanding the impact of change, breaking down silos, delivering and
  refining, impact, reflection.
- Visuals that carry it: an opening image of the shift from one large configurable component to
  small composable parts; a second image of the new parts set out in a dark Figma file; only four
  images in all.
- Numbers: none of note; impact is described in words.
- Take: the dated beats in the text (a workshop in Jan 2023, small parts mid 2023, complex parts
  early 2024, a beta test programme in Aug 2024) show a long system change as a sequence of moves
  with the people work in it.
- Skip: an impact section with no numbers at all after a two year effort.

## 3. IndiGo enterprise design system: Ramesh Mandal, senior manager UI/UX

- Link: https://6epixels.com/case-study/design-system
- Archive: 11 screens, about 2,200 words. 2021 to 2024; footer 2026.
- Shape: a dark photo hero with role, company, duration and years, then numbered chapters on a
  sticky contents rail: overview, problem, research, psychology, process, solution, outcomes,
  learnings. The process chapter is four dated phases (foundation, core components, patterns and
  templates, governance and contribution).
- Visuals that carry it: number tiles (four to a block) in two places; few images, mostly type and
  tiles; the rail itself is the map of the page.
- Numbers: 10 products, 200 components; a brand colour change reached all products in hours
  instead of weeks; by 2024 a share of new components came from product teams, not the system team.
- Take: one proof story (a single brand colour change rippling through every product) does more
  than any tile. The psychology chapter, on why designers resisted, is a section almost nobody else
  writes.
- Skip: tile blocks that repeat the same figures twice.

## 4. CASSI Harmony: Felipe Levi, led the UX team

- Link: https://fplevi.github.io/newfolio/work/design-system.html
- Archive: 9 screens, about 800 words. Library launched Jan 2026.
- Shape: a big title, one line that states the result, three big numbers, a screenshot of the coded
  docs, then context, the real problem, my role, key decisions, results.
- Visuals that carry it: the docs screenshot under the numbers; a four card decision grid; one dark
  shot of the colour tokens. Two images in total.
- Numbers: delivery cycle time halved (the second product took half the weeks of the first); five
  platforms on one system; built in three months after three years of groundwork.
- Take: the decision grid. Each card names the choice and the reason, and the first one names the
  option rejected (one library over a federated family). The role section separates what he
  brokered from what he built by hand.
- Skip: very few visuals; it leans on the reader trusting the numbers.

## 5. Musterhall: Erick Nolasco, co-founder and product design lead

- Link: https://ericknolasco.com/work/musterhall-design-system/ (short version on Contra:
  https://contra.com/p/UmcocOmN-musterhall-design-system-web-flutter-tokens)
- Archive: 20 screens, about 1,900 words. 2025 to present; side venture in user testing.
- Shape: a role and status line, an at a glance card (the problem, what I did, the key decision),
  the product in real component captures, scope counts, research, four calls that shaped it, then
  numbered plates (the intent palette, one source feeding web and Flutter, button tiers and states),
  before and after screens, outcome, what comes next, and folded deep dives (charts and data, the
  full contrast table, how AI was used).
- Visuals that carry it: plates with a dark mat and a short caption that states a rule; before and
  after phone screens; a token table showing one value feeding both apps.
- Numbers: two apps, 27 base components, 64 larger patterns, 14 page templates.
- Take: the at a glance card puts the key decision in the first screen. Folded deep dives keep the
  page short while the detail is one click away. Writing down where contrast still fails reads as
  confidence, not weakness.
- Skip: no adoption or outcome numbers yet; it is a side venture still in testing.

## 6. Diorama on Codrops: Jakub Otcenas, co-founder and executive creative director

- Link: https://tympanus.net/codrops/2026/11/01/design-systems-agents/
- Archive: 27 screens, about 4,500 words. 1 Nov 2026.
- Shape: a tutorial built around one small app. The studio's open source design system, then a to do
  app made with it step by step: explore, design, create a theme, prototype, iterate, refine,
  document, show your work, create skills, context and memory, what is next, tools used.
- Visuals that carry it: the agent's actual output at each step (Paper canvas screens, dark and
  light themes, a calendar component); the prompts he used, set apart in grey boxes.
- Numbers: none.
- Take: showing the prompt beside the screen it produced is the clearest way to show how a system
  steers an agent. The section on skills and agent context files shows the system as something an
  agent reads.
- Skip: it is a guide, not a case study, so no decision costs or outcomes.

## 7. WellSky: Lars Erickson, lead designer

- Link: https://www.larserickson.design/case-studies/a-design-system-for-developers-and-ai
- Archive: 8 screens, about 550 words. Footer 2026.
- Shape: three columns up top (goal, hypothesis, result), then summary, process as a one line chain,
  current state with a survey and an engineer's quote, foundations, components, adoption, results,
  connecting Figma and code, a recorded demo of generating UI from screenshots.
- Visuals that carry it: build chains written as arrows (tokens to variables to themes; small parts
  to a full table card) with a picture of each step; a video of the code generation.
- Numbers: 30+ apps; a survey of developers before the work; 8 engineering teams plus cloud agents
  adopted it; team velocity up by a large share the next quarter; 800+ developers supported.
- Take: goal, hypothesis and result as the first thing on the page frames the whole system as a
  test. The build chain shows the system as something an agent assembles, in one line of arrows.
- Skip: very short; the Figma to code section is only a heading and a video.

## 8. Anorbank: Vladislav Dostavalov, senior product designer and design system lead

- Link: https://veroduplex.art/projects/design-system
- Archive: 4 screens, about 650 words. 2023 to 2024.
- Shape: tags, title, role, duration and company, then challenge, three numbered process points
  (foundations in a month, three token levels chosen on purpose, discipline instead of policing),
  impact, a case highlight on a token export plugin, an embedded prototype, conclusion.
- Visuals that carry it: one component diagram (a bank card built from parts, outlined); the plugin
  flow in three screenshots.
- Numbers: about 90 percent component coverage, labelled as a team estimate; feature time down from
  about four sprints; UI tickets down by roughly two fifths, labelled as an approximate before and
  after.
- Take: the impact section says what each number does not measure. It is the most honest numbers
  section in the set and costs two sentences.
- Skip: the embedded prototype did not load in a headless browser; the page is thin on visuals.

## 9. MCP audit: Vera Marshalova, senior product designer

- Link: https://medium.com/@vera.marshalova/optimising-the-design-system-with-the-mcp-server-096d0f7b027e
- Archive: 12 screens, about 1,300 words. 16 Jun 2025. Free on Medium.
- Shape: who she is, what the article covers, how to connect the MCP server, token extraction, the
  new component hierarchy, before and after, results.
- Visuals that carry it: the file structure before and after side by side; the token naming before
  and after; setup screenshots.
- Numbers: a library of more than 500 components cut to about 300; a nine level hierarchy.
- Take: before and after of the library tree is a fast way to show a cleanup.
- Skip: half the page is setup instructions; it is a how to with a case inside it.

## 10. Fortune 200 enterprise design system: Rounak Bhattacharjee, led the system

- Link: https://medium.com/design-bootcamp/building-scaling-a-global-enterprise-design-system-a-case-study-c90f3505dd1b
- Archive: 45 screens, about 4,800 words. 9 Apr 2025. Free on Medium. Company and brand disguised.
- Shape: context, problem, audits, goal, phase one (a platform system: research and audit,
  foundations, rebuilding components, quality checks, release and versioning, legacy to new UI),
  phase two (a hub and spoke structure for the enterprise, token architecture, token lifecycle,
  adoption and efficiency), business impact.
- Visuals that carry it: audit tables from lint reports; component iteration boards; a hub and spoke
  diagram of brands around a core; a token lifecycle flow; adoption charts over time; the version
  tree written out in code.
- Numbers: 120+ products; design to code match raised from a small share to almost all within three
  months; 251 of 280 products on the base libraries within two months; reliance on outside
  libraries cut from 40 percent to under 5; token changes from weeks to hours.
- Take: the versioning decision is told with the option rejected and why (one version for the whole
  library would force every team to update at once). The adoption section defines how adoption is
  measured before giving the numbers.
- Skip: long; a reader needs the phase headings to find their way. A projected figure for the white
  label rollout sits among the results.
