# Skill sourcing: a skill that picks a visual form per beat

Run 2026-10-08 with resource-sourcing, which ran skill-shortlist first.

Need in one line: per beat of a case study, name what the reader must understand, pick a visual form
with a named reference, then pick a layout that serves it. Surface: Claude Code in this repo. Type: a
skill (know how and a procedure), no live system access needed.

## Installed skills (skill-shortlist)

Wide net: a grep of every installed SKILL.md body for visual form, narrative visualization, storyboard,
scrollytelling, chart choice and beat. Full bodies read for the six named skills, plus writing-beats
because the grep hit it. Where a body hands its core procedure to a reference file, that file was read
too (dataviz `references/choosing-a-form.md`).

| Skill | What the body actually does | Verdict |
|---|---|---|
| dataviz | A seven step chart procedure: pick the form from the data's job, then colour, a palette validator script, mark specs, hover layer, accessibility. Its form reference asks "Is it even a chart?" and maps jobs (magnitude, trend, part to whole, before and after per item) to chart types. Runs `scripts/validate_palette.js`. | Use part: the "is it even a chart" gate and its rule that the job picks the form. Everything after step 1 is for rendering numeric charts in code, and its default of a hover layer on every chart conflicts with stills first. |
| data-visualization (three installed copies) | The skills-plugin and designer-skills copies are a 45 line list of chart types by comparison, trend, part of whole, distribution and relationship, plus generic principles. The data plugin copy (305 lines) adds a relationship to chart table, "title states the insight" and Python plotting code. | Leave. All three assume a dataset; none handles a framework, a decision or a gap. The one useful line, the title states the insight, is already in the research (Burn-Murdoch). |
| scrollytelling | An implementation skill: definitions, the five NZZ techniques, four layout patterns, then CSS, GSAP and Motion code, accessibility and mobile testing. Its workflow starts "Understand the narrative" and then jumps to choosing a scroll pattern and a tech stack. Its "measured impact" figures (400% time on page, 67% recall) carry no sources. | Leave for now, return at the motion pass. Useful kept line: The Pudding's "preserve scroll animations if the transitions are truly meaningful". It never asks what the reader must understand per beat. |
| artifact-diagramming | A short brief for drawing diagrams in Artifacts: draw the mechanism not its name, when comparing options draw the difference, label the arrows, one figure one claim with a caption stating it, then inline SVG mechanics. | Use part at build time: "one figure, one claim", "draw the difference" and labelled arrows are the right rules for CS2 diagrams. Its SVG mechanics do not apply to Figma. It does not choose between forms. |
| writing-shape | A conversational loop to grow an article from a pile of notes. Step 3 argues the format of each beat out loud: prose or list, inline or callout, table or repeated structure, quote or paraphrase. | Use part: it is the closest installed thing to a per beat format decision, and its moves ("What does this paragraph do for the reader that the previous one didn't?") fit step 1 of the proposal. Its formats are text formats only; no visual forms, no layout. |
| writing-beats | Choose your own adventure assembly of an article one beat at a time, offering two or three next beats. | Leave. It sequences beats but never asks how a beat is shown. CS2 already has its order. |
| case-study | A seven question intake, then one of ten story formats. A five line "Visual storytelling" list: show the journey, before and after, annotate decisions, real screenshots. | Leave. Its intake would re ask what the CS2 process already holds, and its visual guidance is five generic bullets with no per beat choice. Its description ("drafts in the story format that best fits") is accurate. |

Flag for the next skill audit: the scrollytelling description reads as general narrative scroll
design, but the body is almost entirely implementation code, and its impact statistics are unsourced.

Result: no installed skill does the job. Three contribute one rule each (dataviz's "is it even a chart",
artifact-diagramming's "one figure, one claim", writing-shape's per beat format argument).

## Community search

See `community_search_raw.md` for the sources searched, phrasings and finalists.

Sources reached: skills.sh (https://skills.sh/api/search), GitHub repository search
(https://github.com/search), claude-plugins.dev (https://claude-plugins.dev/skills?q=storytelling), five
awesome lists, Glama (https://glama.ai/mcp/servers) and Smithery (https://smithery.ai) through web search, and the in-product skill and plugin search. Not reached: GitHub code search
for SKILL.md (no `gh` CLI) and a second batch of GitHub searches (rate limited). The resource-sourcing
`references/sources.md` file does not exist in the installed skill, so the sources were chosen by hand.

Finalists, read from their own SKILL.md files:

| Candidate | Signals | What the file does | Verdict |
|---|---|---|---|
| [slide-visual-selector](https://github.com/peter-tu-zynkr/zynkr-ai-skills/tree/main/skills/1-brand-marketing/slide-visual-selector) | 17 installs, 0 stars, changed 2 Oct 2026, no licence | Paginated beats in, one layout archetype per page out. "Define the message first, then pick the form." One main visual per page, no chart without quantifiable data, an overflowing page goes back to be split rather than shrunk, then a blocking review table (page, title, archetype, main visual). | Best structural model. Not installable for this: PowerPoint only, its own nine layouts, reads a brand guide from Google Drive at runtime, no licence, em dashes in its text. |
| [storytelling-with-data](https://github.com/sammcj/agentic-coding/tree/main/Skills/storytelling-with-data) | 162 stars, 93 installs, Apache 2.0, markdown only | Knaflic's lessons: context interview, storyboard titles first, then charts. Two checks worth taking: horizontal logic ("read just the section titles in sequence; they should tell a complete story") and vertical logic (each section makes sense on its own). | Borrow the two checks. Its chart choice is numeric only, no layout step, and it says to repeat the key message three times, which fights the house voice. |
| [data-storytelling-skills](https://github.com/neil-oliver/data-storytelling-skills) | 0 stars, Aug 2026, no licence | A "so what" gate: state the point in one sentence, then test whether the opposite headline survives the same visual. | Borrow the opposite headline test. One chart at a time, wants real data. |
| [visual-vocabulary-skill](https://github.com/eforus-overseer/visual-vocabulary-skill) | 0 stars, two days old, MIT | FT Visual Vocabulary chooser returning one pick and one alternative. | Leave. Numeric only, too new to trust. |
| [data-storytelling](https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills/data-storytelling) | 16k to 26k installs via a large bundle, MIT | A generic story arc with no step that chooses a visual; recommends the rule of three. | Reject. Installs come from the bundle, not fit. |

skill-inspector: not run, because nothing is proposed for install. Every finalist is adapted from by
reading, not installed. If Chadwick wants any of them installed as is, it goes through skill-inspector
first and only with his approval.

## Recommendation

Write a new project skill, adapted rather than from scratch. Nothing found does the whole job: every
community candidate either picks numeric charts or targets slides, and none works from existing Figma
templates on a 12 column grid. The need is also specific to this repo (node 3461:5685, the Haven grid,
CS2 rules), which is the case resource-sourcing allows a build for. Structure borrowed from
slide-visual-selector (beats in, one main visual each, overflow sent back, blocking review table), the
two title checks from storytelling-with-data, the opposite headline test from data-storytelling-skills,
dataviz's "is it even a chart" gate and artifact-diagramming's "one figure, one claim".

## Second search, widened (2026-10-08, after Chadwick flagged the first as too narrow)

The first search only used phrasings close to the job. The second searched neighbouring fields that do
the same work under other names: information design and explainers, documentation with diagrams, deck
design, instructional design, editorial and long form layout, design docs, Figma template filling and
large design bundles. Full record in `community_search_broad.md`. Unreachable: cursor.directory (rate
limited), Smithery (no listings returned), GitHub code search (needs the gh CLI and a login).

Checked against the files themselves:

- [talk-craft](https://github.com/astroicers/talk-craft/tree/master/skills/talk-craft), MIT, 0 stars,
  written in Traditional Chinese. Ghost deck first: every slide title is a full claim and the titles are
  read in sequence before any slide is built. Each slide block then carries `title`, `assertion`,
  `exhibit`, `reveal` and `note`, and `exhibit` is one of code, diagram, chart, photo, number, quote,
  section or none (`references/templates.md` section 3). This is the closest existing per point form
  choice, and unlike slide-visual-selector it is licensed for adapting.
- [understanding-ladder](https://github.com/ChangWenC/understanding-ladder/tree/main/skills/understanding-ladder),
  MIT, 18 stars. "Pick the lowest rung that fully answers. If a paragraph is enough, do not build a page."
  The visual may not add facts the text draft lacks. The best essential test found.
- [diagram-design](https://github.com/cathrynlavery/diagram-design/tree/main/skills/diagram-design), MIT,
  46,398 stars, pushed 8 Oct 2026. 44 diagram types and "would the reader learn more than from a good
  paragraph? If not, don't draw." Best type table; renders one HTML diagram per call with all caps arrow
  labels, so only the table and the test carry over.
- figure-planner (scientific writing, MIT): one claim per figure, one anchor panel. baoyu-article-illustrator:
  plans where each visual goes across a whole article, then generates AI images, so only the planning step
  is relevant. figma-layout-skill: section to template to Figma frame to screenshot check, but rebuilds
  templates from coordinates; a pattern only. These three were read by the search agent, not rechecked.

## Recommendation, revised

Still write a new project skill, but change the base. Take talk-craft's structure (claims first, read
the titles in sequence, then an exhibit per point with none allowed) because it is closest to the job
and MIT licensed. Swap its exhibit list for the CS2 forms and add understanding-ladder's lowest rung
rule, diagram-design's type table and the form to template table for node 3461:5685, written fresh.
slide-visual-selector drops to a reference for its review table only. Nothing is installed, so
skill-inspector has nothing to inspect; if any of these is wanted installed as is, it goes through
skill-inspector first.

## Final decision (2026-10-08)

No skill. Chadwick does not want AI written skills. Step 5 in `CS2_PROCESS.md` holds the procedure and
points to the index in `reports/Visual form per beat.md`. The recommendations above to write or adapt a
skill are withdrawn.
