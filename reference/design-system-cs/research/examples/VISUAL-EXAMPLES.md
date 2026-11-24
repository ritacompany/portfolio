# Ten more design system case studies, chosen for how they show the system

24 Nov 2026. The second set, next to the ten in `../EXAMPLES.md`. The first ten are strong on
message and structure; these ten were picked for the pictures: pages where the images carry the
argument, judged against Wise multi brand (the bar), Musterhall and the Fortune 200 page. Each was
opened in Chromium and read from full page screenshots, not from its text. None is in `EXAMPLES.md`
(including its rejected list), `../../REFERENCE-BOARD.md` or the case studies report. Ordered by how
much each one shows, strongest first. Device tags in backticks; **data** marks the pages strongest
on numbers drawn as pictures.

| # | Case study | Author and role | Date | Visual devices |
|---|---|---|---|---|
| 1 | [Bupa: design once, ship everywhere](https://bupa-case-study.netlify.app/) | Nate Mills, design systems consultant who led the token and governance work (page header) | Sep 2025 to Mar 2026 | **data** `number tiles` `before and after` `structure diagram` `flow diagram` `rule plates` |
| 2 | [Bitsight: design token adoption](https://harielbaiz.com/case-study-design-tokens.html) | H. Ariel Baiz, design systems lead (page header) | Work 2023 to 2024 | `token chain` `name anatomy` `theme comparison` `before and after` `number tiles` |
| 3 | [NXT: from product to system](https://www.anixperience.com/nxtdes) | Anirudh Kanaparthi, sole product designer and system architect (page header) | Shipped 2025 | `structure diagram` `state matrix` `token chain` `number tiles` `screens in context` |
| 4 | [Holzprofi24: a multi brand system](https://abhidnyapatil-portfolio.framer.website/holzprofi24-design-system) | Abhidnya Patil, owned the system from pitch to rollout (at a glance card) | 2024 on, live in two shops | **data** `number tiles` `audit board` `token chain` `brand comparison` `name anatomy` `decision table` |
| 5 | [Ether.fi: design system](https://contra.com/p/77WW6bsE-design-system) | Oleksii Tatarko, product designer leading the design system (role block) | 12 Oct 2026 | `audit board` `structure diagram` `rule plates` `state matrix` |
| 6 | [JW Player: Figma variables in depth](https://medium.com/jw-player-engineering/building-design-consistency-a-deep-dive-into-figma-variables-at-jw-player-0e51562e99ae) | Mihaela Vodeb, lead designer of the design system (role line) | Work 2023; published 9 Jan 2025 | `structure diagram` `name anatomy` `token chain` `library map` |
| 7 | [Student Beans: a design system one year on](https://medium.com/pion/using-research-techniques-to-improve-a-design-system-1-year-on-852f60ab19c3) | Max Dunne, head of product design (author bio) | 26 Jun 2024 | **data** `before and after` `number tiles` |
| 8 | [E-signature platform: token based system](https://contra.com/p/sAqWlEF7-token-based-design-system-for-b2-b-signature-platform) | Bozena Bulat, senior product designer, first designer on the team (summary) | 2025 work; posted 24 Sep 2026 | `rule plates` `theme comparison` `screens in context` |
| 9 | [Limbo Citi: a municipal web platform](https://kristiansportfolio.com/limbo-citi) | Kristian Lykke Hansen, senior digital designer and design lead (role block) | 2022 to 2025 | `brand comparison` `rule plates` `library map` `screens in context` |
| 10 | [Tidal: dark mode for a design system](https://elk-khaki-4eel.squarespace.com/work/ds) | Avani Palkhiwala, co-led the dark mode work for the Tidal system (team section) | Work 2024 to 2025, for a mid 2025 launch | `theme comparison` `token chain` `before and after` `screens in context` |

## Close to CS3, flagged for the organizer

None is a close match on all three counts (solo or small team, agents as readers, the system tested
by what agents or people got wrong). Partial matches:

- **NXT (3)**: one designer built the system for a 16 person team, and the page has a section titled
  as a test of the system. No agents.
- **Ether.fi (5)**: a seven week system by the designer leading it, with Figma MCP and Claude Code used
  for the audit and the documentation. AI as a tool on the system, not a reader of it.
- **Holzprofi24 (4)**: one designer owned the system end to end, and the impact table has a column
  for what each number does and does not prove. No agents.
- **E-signature (8)**: the first designer built the token layer that later designers built on;
  the proof is that they did not break it. No agents.
- **Student Beans (7)**: the closest on proof style. The system is tested by what people got wrong
  (hesitations, wrong turns, tasks completed), measured a year apart. Enterprise team, no agents.

Seen and not kept, nearest to CS3: Jocelyn Lin's AI generated multi brand system (Claude Code and
Figma MCP build a three brand system; an experiment, not a shipped system) and Zhiyang's Medium post on
making a design system readable by agents (a solo side project, no seniority on the page, few visuals).
If the organizer runs the narrow hunt in `STRATEGY.md`, start from those two.

## How the checks ran

- About 45 candidate pages were found by search and opened in Chromium with `capture-visual.cjs`
  (the first set's capture script, with a contact sheet per page). Each was judged from its screens.
- A fresh Sonnet agent checked the first ten from the links alone. It failed five: Monzo.com (company
  blog, many decorative images), Hajimari and COG (written by an engineer), The Knot Worldwide (few
  system images), an enterprise system for 40+ products (no level on the page) and Student Beans
  (Cloudflare blocked the agent; our own browser read it in full, so it stays, as Vera Marshalova's
  Medium page did in the first set). The four were replaced with Holzprofi24, JW Player, Limbo Citi and
  Tidal, and a second check ran on those.
- Most others were cut for one of four reasons: text with few or no system images (Kenneth Courtney, Flatstudio,
  Charles on Contra, Murphy Trueman); images that did not load (several Contra pages); no lead or
  senior role on the page (Vodafone UK's taxonomy post, by.U, Infinum, Harvey, HP); or written by an
  engineer (Mews, Webflow's observability post). Vodafone UK and Webflow have some of the best system
  and adoption visuals in the pool and are worth a look as references even though they fail the
  author rule.
- `check-visual-examples.mjs` checks this table against the three exclusion files, the device spread
  and the copy rules. The independent check is recorded in `VISUAL-GATES.md`.
