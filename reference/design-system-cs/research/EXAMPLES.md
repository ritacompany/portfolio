# Ten design system case studies to study

23 Nov 2026. Each one is written by the designer who led the work, about their own system, and every
page was opened and read in full in a headless browser on this date; all ten load in public without a
login. Nine are new; only Wise was in the October research. Ordered by how differently each shows the
system, not by rank.

| # | Case study | Author and role | Date | How it shows the system |
|---|---|---|---|---|
| 1 | [Wise multi-brand design system](https://nessgrixti.com/portfolio/wise-multi-brand/) | Ness Grixti, design lead (named on the page's team card) | Work follows the 2024 brand refresh; page footer 2026 | Token architecture as the hero: about 70 images walk one token set out to several brands and systems, with the token count kept small on purpose |
| 2 | [Modernizing a design system at scale](https://jashamichele.com/case-studies/mds-modernizing-design-system/) (JPMorgan Chase) | Jasha Michele, lead product designer then acting head of design systems (page header) | 2022 to 2025, dated milestones through Aug 2024 | A dated timeline of the move from monolithic to composable components, carried by stakeholder work: leadership workshop, OKRs, beta tests of Figma components |
| 3 | [Enterprise design system](https://6epixels.com/case-study/design-system) (IndiGo) | Ramesh Mandal, senior manager UI/UX (page header) | Work 2021 to 2024; page footer 2026 | A chaptered page with a sticky contents rail (problem, research, psychology, process, outcomes, learnings); four dated phases; a contribution protocol; one proof story where one brand colour change reached 10 products in hours |
| 4 | [Scaling with a design system](https://fplevi.github.io/newfolio/work/design-system.html) (CASSI) | Felipe Levi, led the UX team of up to nine (role section) | Library launched Jan 2026; footer 2026 | Opens on three numbers, then a grid of four key decisions, each with the option rejected (one library over a federated family); few visuals, so it is decisions first |
| 5 | [Musterhall design system](https://contra.com/p/UmcocOmN-musterhall-design-system-web-flutter-tokens) | Erick Nolasco, co-founder and product design lead (page intro) | 2026 | Numbered dark plates, each one a rule of the system and what it costs (a strict colour budget, a separate law for charts); lists its own gaps; the design rules are written as an agent skill |
| 6 | [Design systems and agents](https://tympanus.net/codrops/2026/11/01/design-systems-agents/) (Codrops) | Jakub Otcenas, co-founder and executive creative director at Diorama (author bio) | 1 Nov 2026 | First person workflow around his studio's open source, agent first system: how it grows, how agents build from it in Paper and Claude Code, with about 28 screens and recordings |
| 7 | [Enabling AI generated semantic UI across 30+ apps](https://www.larserickson.design/case-studies/a-design-system-for-developers-and-ai) (WellSky) | Lars Erickson, lead designer (summary) | Footer 2026; describes Copilot modes and cloud agents | Goal, hypothesis and result up front, then the pipeline drawn as chains (tokens to CSS variables to themes; atoms to a table card) so the system reads as something agents assemble from |
| 8 | [Design system for a mobile bank](https://veroduplex.art/projects/design-system) (Anorbank) | Vladislav Dostavalov, senior product designer and design system lead (page header) | 2023 to 2024 | Short and honest: three numbered decisions (three token levels chosen on purpose), then impact figures labelled as team estimates with what they do not measure; the embedded prototype did not load in our browser |
| 9 | [Optimising the design system with the MCP server](https://medium.com/@vera.marshalova/optimising-the-design-system-with-the-mcp-server-096d0f7b027e) | Vera Marshalova, senior product designer (byline bio) | 16 Jun 2025 | AI used to audit and restructure a 500+ component library through Figma MCP and Claude: token export, a nine level hierarchy, duplicates removed; free to read |
| 10 | [Design infrastructure and systems works](https://edric-cui.github.io/Portfolio1/posts/2025/12/13/Design-Infrastructure-and-Systems-Works.html) | Jiachen Cui, design lead for Commune DS vNext (page text); also Microsoft Fabric | 13 Dec 2025 (page URL) | One page for several systems, with a summary and contents up top, a before and after of one real screen, token layers by mode and the Tokens Studio to Storybook toolchain |

## How the checks ran

- Every page was opened and its full text pulled with Playwright. Full page screenshots were taken
  where the text did not show the layout (CASSI, Musterhall, Anorbank, WellSky, IndiGo).
- Each claim above (role, date, the key figure or feature) was then checked again on the live page by
  a script that loads each page and searches for those strings: 10 of 10 pages and 38 of 38 strings
  found, with no login wall.
- The independent check by a fresh agent did not run. The repo's agent limit hook counted denied
  launches earlier in the session and blocked any further agents in this turn. It can run on the next
  message.

## Rejected after opening

Ashwini Kuttappan (a made-up stand-in project because of an NDA); the Forbes design tokens page on and-ji.github.io and
Aubrey O'Neal's Carbon migration (work from 2023); Learnosity by Jasha Michele (2019 to 2021); Rushabh
Pathak (placeholder sections); Luke Wroblewski and Hardik Pandya (essays or a method demo, not a case
study of their own system); 1Password (company blog with executive authors); Sanjay Dey and Sealab
(generic articles); Lisa Demchenko (newsletter roundup); Northbound by Maty Sandoval (concept project,
role unclear); Handelsbanken by Victor Jacobsson (role not senior on the page); Intripid by Sarthak
Goyal (sole designer, seniority self described); Chris Peck travel brands (mostly a description of the
library); Dave Connis (mostly AI content work, undated).
