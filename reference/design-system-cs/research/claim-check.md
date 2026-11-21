# Claim check for CONTENT.md

21 Nov 2026. Status: **run.** The first attempt was refused by the project cost guard (three sub
agents a turn); Chadwick approved a fourth agent in chat and it ran in the next turn.

How it must run: one fresh Sonnet agent that gets only the claims and links below, never
`CONTENT.md`. It opens each page and returns SUPPORTED, PARTLY, NOT SUPPORTED or COULD NOT OPEN with
a short reason. Record its verdicts in this file and correct `CONTENT.md` for anything below
SUPPORTED.

Claims (each was read by a research agent through a summarising fetch tool, so quotes are as that
tool returned them):

- C1 GitLab design system job description: levels Product Designer to Distinguished; Staff includes defining what belongs in the design system against product level code; tokens not named at any level. https://handbook.gitlab.com/job-description-library/product/product-designer-design-system/
- C2 Anonymous career framework v3.0: token and component usage at the lowest level; owning design systems architecture decisions at Level IV; "No systems-level thinking" a blocker. https://mikeofmagnesia.github.io/career-framework/product-design.html
- C3 Levelling template: Junior knows the fundamentals of system design; Senior leads cross functional efforts. https://docs.google.com/spreadsheets/d/18VvbVCNBRWu-QYPncBl5IWTXTOpD68UQsLsymBvfm88/edit
- C4 Portfoliobox advises showing base type scales, primary colour tokens and spacing grid logic. https://www.portfoliobox.com/magazine/design-system-portfolio
- C5 Salminen: a lead maintains and improves the contribution model for autonomous product teams. https://arielsalminen.com/2023/whats-a-design-systems-lead/
- C6 Primer (May 2023): colour pairs audited against contrast targets; a script run as a GitHub Action on every pull request; brand affecting hue changes out of scope. https://github.blog/engineering/user-experience/unlocking-inclusive-design-how-primers-color-system-is-making-github-com-more-inclusive/
- C7 Stripe (2019): any two colours five levels apart have enough contrast for small text. https://stripe.com/blog/accessible-color-systems
- C8 Harvey (Jan 2026): lint warnings, legacy warnings at about 80% adoption, pre commit errors at about 95%. https://www.harvey.ai/en-US/blog/rebuilding-harveys-design-system-from-the-ground-up
- C9 Island (Jul 2026): about 12,000 token uses migrated at 98.75% accuracy; tokens picked by matching hex was a failure mode. https://www.island.io/blog/teaching-ai-to-migrate-code
- C10 Radix: each of 12 steps has a use; text steps guaranteed APCA Lc 60 and Lc 90 on step 2. https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- C11 Pendo (Jul 2026): explains moving hex values to semantically named tokens; gives no counts. https://www.pendo.io/pendo-blog/why-we-rebuilt-the-visual-foundation-of-pendo
- C12 Census of 21 systems, data 26 to 28 Jul 2026: MCP 20, agent skill 19, llms.txt 15, repo agent files 16. https://state-of-ai-in-design-systems.netlify.app/
- C13 Atlassian (Sep 2026): CLI against MCP about 8% better on time and tokens; best improvements came from reading transcripts. https://www.atlassian.com/blog/ai-at-work/giving-ai-agents-design-system-context-from-the-terminal-what-we-learned-building-a-cli
- C14 Open benchmark weights: judgment 0.30, API fidelity 0.25, token discipline 0.15. https://github.com/christophhdesign/open-design-system-bench
- C15 Agent review pull request: planted mistakes caught by token lint, axe and visual checks; passing the checks did not settle what ships. https://github.com/adamdhickey-collab/agent-review/pull/87
- C16 Designlab (Oct 2026): find the one place in each case study where AI belongs and explain why. https://designlab.com/blog/rebuilding-your-portfolio-for-the-ai-hiring-market
- C17 zeroheight 2026 (n=147): primitive 90%, semantic 85%, component tokens 52%; documentation 92%; tokens for modes 76%. https://report.zeroheight.com
- C18 Indeed: 8 MCP configurations benchmarked with 1,056 prompts. https://intodesignsystems.substack.com/p/ai-design-system-mcp-example
- C19 Figma: mature systems need wardens or guardians who look for reuse and manage contributions. https://www.figma.com/scaling-design/the-the-spectrum-of-maturity-for-design-systems/
- C20 Infragistics: two developers, 7 paired scenarios; vendor study. https://www.infragistics.com/blogs/empirical-study-of-mcp-and-agent-skills-benefits
- C21 Jaiswal: token purity defined as share of styles on semantic tokens; adoption the only program level metric. https://sujeet.pro/articles/design-system-adoption-foundations
- C22 Careem: AI assisted audits and linting to catch off system usage and token misuse before shipping. https://jobs.intodesignsystems.com/jobs/careem-senior-product-designer-design-systems-2ffpq7

Not in scope of the check: the Mondai evidence (N ids and paths), which is counted in `../NUMBERS.md`
and the decision inventory, and the findings carried from earlier notes, which had their own claim
checks (`research_notes/.../claim-check.md`).

## Verdicts (fresh Sonnet agent, saw only this list, opened every link)

- C1 PARTLY: levels and the staff line are right, but tokens are named: every level requires experience with design tokens and staff makes decisions about tokens. Corrected.
- C2 SUPPORTED: "No systems-level thinking" is a level III promotion gap, not a hard blocker. Wording kept off the blocker sense.
- C3, C4, C5, C6, C7 SUPPORTED.
- C8 PARTLY: the 80% and 95% thresholds are plans, not reached. Corrected.
- C9 SUPPORTED: the page says over 12,000. Corrected to over.
- C10, C11, C12, C14, C15, C16, C20, C22 SUPPORTED. C22: the Careem posting has since been removed.
- C13 PARTLY: the page says the most useful improvements came from things no metric flagged, without naming transcripts as the single best source. Corrected.
- C17 NOT SUPPORTED on the public page: n=147 shows, the percentages do not; they may be in the gated report. Marked unconfirmed in CONTENT.md.
- C18 PARTLY: numbers match the subtitle; the body is paywalled. Already marked preview only.
- C19 PARTLY: the wardens line is tied to the large team stage. Not used in a recommendation.
- C21 COULD NOT OPEN: 404 on 21 Nov. Marked in CONTENT.md.

Count: 15 supported, 5 partly, 1 not supported, 1 could not open (22).
