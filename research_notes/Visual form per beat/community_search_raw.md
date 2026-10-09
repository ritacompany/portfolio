# Community search raw: skills that pick a visual form per beat

Searched 8 October 2026. Nothing was installed, cloned or run. Every finalist below was read from its raw SKILL.md on GitHub.

The source list the brief pointed to (`resource-sourcing/references/sources.md`) does not exist at that path. Only the skill's SKILL.md is there. Sources were chosen from the standard community set instead and are listed below.

## Sources searched

| Source | URL | Phrasings tried | Reached |
|---|---|---|---|
| In-product SearchSkills | account catalogue | data storytelling, narrative visualization, chart chooser, storyboard, visual vocabulary, scrollytelling | Yes. Returned only already installed scrollytelling, data-visualization and modern-web-design |
| In-product SearchPlugins | org catalogue | data storytelling, narrative visualization, chart chooser, storyboard, case study layout | Yes. Zero results |
| skills.sh search API | https://skills.sh/api/search | storytelling, data-storytelling, storytelling-with-data, chart, chart-chooser, choose-chart, visual-vocabulary, storyboard, narrative, scrollytelling, case-study, presentation-storyline, slide-storyline, diagram-chooser, visual-explainer | Yes |
| GitHub repository search (public API, no gh CLI on this machine) | https://api.github.com/search/repositories | storytelling with data skill, data storytelling claude, narrative visualization skill, chart chooser, visual vocabulary skill, scrollytelling skill, storyboard claude skill, topic:claude-skills storytelling, topic:agent-skills visualization, SKILL.md storytelling | Yes for ten queries, then rate limited. Second batch (knaflic, ft visual vocabulary, which chart, chart selection skill, case study portfolio skill, presentation storyboard skill, pyramid principle skill) unreachable |
| GitHub code search for SKILL.md | https://github.com/search?type=code | storytelling with data, narrative visualization, chart chooser, visual vocabulary | Unreachable. Needs an authenticated gh CLI, which is not installed |
| claude-plugins.dev | https://claude-plugins.dev/skills?q=storytelling | storytelling | Yes |
| Awesome lists | travisvn/awesome-claude-skills, ComposioHQ/awesome-claude-skills, VoltAgent/awesome-agent-skills, hesreallyhim/awesome-claude-code, punkpeye/awesome-mcp-servers (raw READMEs) | grep for storytelling, narrative, chart, visualization, storyboard, scrollytelling, vocabulary, case study, slide, presentation | Yes. ComposioHQ README returned nothing on main |
| Glama and Smithery (MCP) | via web search, glama.ai/mcp/servers | chart recommendation, visual vocabulary, chart chooser, data storytelling | Yes, indirectly through search results |
| Web search (aggregators: claudskills.com, vibeindex.ai, skillselion.com, claudemarketplaces.com) | general web | data storytelling or narrative visualization SKILL.md; per section or per beat visual form explainer diagram chooser | Yes |

## Finalists

### 1. storytelling-with-data (sammcj/agentic-coding)

- URL: https://github.com/sammcj/agentic-coding/tree/main/Skills/storytelling-with-data
- Signals: repo 162 stars, 93 installs on skills.sh, skill folder last changed 4 July 2026, repo pushed 8 October 2026, Apache 2.0, 0 open issues
- Maintainer: Sam McLeod (sammcj)
- What it instructs: runs Knaflic's six lessons in order (context, choose a visual, eliminate clutter, focus attention, think like a designer, tell a story). The create workflow is: context interview (who, what, how) → pick a narrative framework (Dykes arc for data insight, Duarte sparkline for persuasion, Miller SB7, Dicks, Heath SUCCESs) → storyboard section titles as an arc → craft a hook → pick the simplest chart per data point from `references/chart-selection.md` → build → verify the aha moment → review horizontal logic (titles alone tell the story) and vertical logic (each unit stands alone). Has a format table for deck, dashboard, infographic, static site and written report.
- Input: a message or data communication plus audience and medium. Output: guidance, a storyboard of titles, chart choices and a review checklist. Format agnostic; it tells you to pair it with a rendering skill.
- Ships: markdown only (SKILL.md, README and five reference files). No scripts, hooks or network calls.
- Clashes: British spelling ("colour", "visualisation"). Bans pie and dual axis charts outright. "Repeat your key message at least 3 times" pushes toward rule of three repetition. Chart taxonomy is data only, so a beat that is a decision, a quote or a process gets no form. No notion of fixed templates or a 12 column grid. Source text uses spaced hyphens as dashes in places, which would need cleaning if copied.
- Fit verdict: best fit for the narrative half of the job. Horizontal and vertical logic plus storyboard first are exactly the per beat discipline. Weak on non data beats and has no layout step, so it would need a project specific layer that maps beat type to Figma template.

### 2. data-viz-playbook (neil-oliver/data-storytelling-skills)

- URL: https://github.com/neil-oliver/data-storytelling-skills
- Signals: 0 stars, no skills.sh listing found, pushed 24 August 2026, no licence file, plugin manifest version 1.0.0
- Maintainer: Neil Oliver
- What it instructs: three entry points (create, review, render). The create loop is frame (question, audience, medium, explore or assert) → envision a target form from a task to form table with fourteen families including single value, process and tables → interrogate the data → build for real → a so-what gate (state the point in one sentence with metric, cause, impact and next action, then test the opposite headline) → deliver against an always on essentials file → anti-pattern sweep. Review runs integrity, form and delivery lenses in parallel. Explicitly defers house style to any other loaded design skill.
- Input: a question and data, or an existing chart image. Output: the chart or its spec, a one sentence takeaway and data notes.
- Ships: markdown rule corpus of about 600 rules plus `.claude-plugin/plugin.json` and `marketplace.json`. No scripts or hooks. It says to ask before fetching external sources.
- Clashes: "build it for real" assumes you render with real data before judging, which cuts against static stills chosen from existing templates. No licence, so adapting text needs care. Scope is one chart at a time; it warns against splitting a chart's loop but has no sequence or beat model.
- Fit verdict: strongest per item decision gate (the so-what test is directly reusable as "every beat earns its visual"). Not a sequence planner, so it is a component rather than the answer.

### 3. visual-vocabulary (eforus-overseer/visual-vocabulary-skill)

- URL: https://github.com/eforus-overseer/visual-vocabulary-skill
- Signals: 0 stars, pushed 6 October 2026 (two days old), MIT
- Maintainer: eforus-overseer
- What it instructs: a five step method. Identify the story not the columns → map it to one of the nine FT Visual Vocabulary families (deviation, correlation, ranking, distribution, change over time, part to whole, magnitude, spatial, flow) → pick a specific chart from the data's shape → apply cross cutting cautions → state the pick with one sentence of rationale and one alternative with its switching condition. Keeps the reasoning visible to the user.
- Input: a dataset or a stated message. Output: a recommendation, rationale and one runner up. Explicitly does not render.
- Ships: SKILL.md plus two reference files. The repo also holds 62 matplotlib example scripts and SVGs under `examples/`; the skill only points at them and never runs them. No hooks or network calls.
- Clashes: title case in its README headline. Uses em dashes throughout the SKILL.md and taxonomy, so nothing should be copied verbatim. Data charts only; no form for a quote, a decision, a screen or a process beat.
- Fit verdict: the cleanest FT vocabulary chooser found, and the "one pick plus one alternative with its condition" output matches how Chadwick wants decisions framed. Too new to trust on adoption, and too narrow on its own.

### 4. slide-visual-selector (peter-tu-zynkr/zynkr-ai-skills)

- URL: https://github.com/peter-tu-zynkr/zynkr-ai-skills/tree/main/skills/1-brand-marketing/slide-visual-selector (listed on skills.sh under the old repo name zynkr-skill-builder)
- Signals: 17 installs on skills.sh, repo 0 stars, skill last changed 2 October 2026, no licence
- Maintainer: Peter Tu (Zynkr)
- What it instructs: the third leg of a relay (storyline designer → page splitter → visual selector → pptx renderer). Step 1 receives a page list where each page carries number, beat, page type, title, content points and information density, and refuses to invent pagination. Step 2 maps each page to exactly one of nine layout archetypes (title, big statement, bulleted list, two column compare, data chart, process diagram, image led, quote, closing CTA) from a content signal table, with a chart sub rule. Gatekeeping: one main visual per page, the title carries the conclusion, reject charts with no information, overflow goes back upstream. Step 3 maps each element to a pptxgenjs primitive and writes a relative layout. Step 4 is human review per page. Step 5 hands off.
- Input: a paginated beat list. Output: a per page visual spec. Its reference `visual-decision-framework.md` synthesises Zelazny and Minto.
- Ships: markdown in this skill folder. The brand source reference tells the agent to search Google Drive for a brand guide through a connector. The wider repo contains Python and posting scripts, but not in this skill.
- Clashes: hard wired to pptxgenjs and 16:9 inches, not Figma or a 12 column grid. Archetypes are its own, not Chadwick's templates. Uses em dashes heavily. House style binds to Zynkr's own Google Doc. Partly translated from Chinese, so some instructions are loose.
- Fit verdict: the only community skill whose literal job is "beat in, one visual form per beat out", with the right gates. Structurally the closest model to borrow from. Not installable as is, because the archetype list and renderer would both have to be swapped for the Figma template set.

### 5. data-storytelling (wshobson/agents)

- URL: https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills/data-storytelling
- Signals: repo 40,305 stars, 16,019 installs on skills.sh and 25.7k on claude-plugins.dev, skill folder last changed 22 May 2026, MIT
- Maintainer: Seth Hobson (wshobson)
- What it instructs: setup, conflict, resolution; a six step narrative arc (hook, context, rising action, climax, resolution, call to action); a three pillar table; do and don't lists. The reference file is worked markdown templates (problem solution story, trend story) with placeholders like "[Show engagement curve visualization]". There is no step that chooses a form.
- Input and output: loose; produces a narrative outline for executive reporting.
- Ships: markdown only. No scripts or hooks.
- Clashes: "use the rule of three" directly conflicts with the anti slop writing rules. Arrows and title case headings in templates. Business KPI framing, not portfolio narrative.
- Fit verdict: highest adoption by far but thin. Popular because it ships inside a huge bundle, not because of depth. Reject.

## Near misses

- antvis/chart-visualization-skills (506 stars): chart type picker in Chinese that POSTs your data to an AntV hosted API to render images. Network call, data leaves the machine, reject.
- deanpeters/Product-Manager-Skills storyboard (7,202 stars): six frame problem to solution storyboard for pitching a feature; a narrative template, not a form chooser.
- gongnyang/awesome-html-scrolline-deck (30 stars): beat to "move" scrollytelling deck engine in Korean with npm scripts, smoke tests and MP4 export; motion first and executes code, opposite of static stills first.
- owl-listener/designer-skills case-study (2,858 stars): generic six section portfolio case study outline with a short visual storytelling list; no per section form logic.
- nicobailon/visual-explainer (10,306 stars): turns output into a styled HTML explainer page; picks a format for the whole artifact, not per beat.
- doodledood scrollytelling and mengto scroll storytelling skills: implementation of scroll effects, already covered by the installed scrollytelling skill.
- AliDujie/storytelling-with-data (4 stars) and other storytelling-with-data copies on skills.sh (booklib-ai, zlstas, ingeleyton): lower adoption duplicates of the Knaflic approach.
- skthewimp dataviz-selector, jayrha chart-chooser, ericwang915 choose-chart, jason-w507 ft-charts: single digit installs, chart pickers only; not opened past the listing.
- tyroneross pyramid-presentation and peter-tu-zynkr slide-storyline-designer: storyline builders that feed a visual step but do not choose forms themselves.
- MCP servers (antvis mcp-server-chart, mcp-plots with a "suggest" mode, QuickChart, Vizro): renderers. None plans form across a sequence.
- caylent/tufte-data-viz (223 stars): Tufte styling principles for a single chart, not selection across beats.
