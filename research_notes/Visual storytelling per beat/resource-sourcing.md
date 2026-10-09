# Resource sourcing: visual form per beat

## Need

Per story beat: name what the reader must understand, pick a visual form (chart, conceptual diagram, annotated screen, sequence of stills, text only) with a named reference, then pick a layout template on the 12 column Haven grid in Figma, for mostly qualitative beats that must work as stills.

## Installed skills judged in full

### dataviz

Path: bundled, loaded with the Skill tool. Loaded body sits at `/private/tmp/claude-501/bundled-skills/2.1.293/20987332c5ad57d6f8970f1ca83657af/dataviz/`. The path in the brief (`.../2f1d33fbaa5d55f80d24ef5e443615dc/dataviz/`) is a second extracted copy; `choosing-a-form.md` is byte identical in both.
Read in full: yes (SKILL.md body plus `references/choosing-a-form.md`)
What it does: a seven step procedure for building one chart. Pick the form by the data's job, assign color by job, run the palette validator, apply mark specs, add a hover layer, do an accessibility pass, render and look. Input is a dataset; output is a coded chart (HTML, SVG, plotting library or PNG). The form step is a table that maps a reading job to a chart type, with an "is it even a chart?" gate that routes single values to a stat tile, hero figure, meter or table.
Picks a form per beat: partly. It picks a form per dataset, never per story beat. Every option is quantitative. Evidence: "The data's job picks the form, and sometimes the right form is not a chart." The jobs it knows are "Compare magnitude", "Trend over time", "Part-to-whole" and "Before -> after per item" (a dumbbell). Nothing covers a framework, hierarchy, decision or constraint, and "text only", "annotated screen" or "sequence of stills" never appear. No layout or grid step.
Clashes: the hover layer is on by default ("Add the hover layer, by default", step 5), which contradicts "every visual must work as a still". The default palette in `references/palette.md` is a placeholder to swap, not Haven's. Output is code, not Figma. The body uses spaced hyphens as dashes throughout, a style clash only if text is lifted.
Executes: `scripts/validate_palette.js` and `scripts/validate_palette.py` run locally (node or python). No network calls.
Verdict: use part. Use the "is it even a chart?" gate and the job to type table only for the few numeric beats, and the "emphasis" rule ("One series in the accent hue, the rest in the de-emphasis gray"). Leave the color pipeline and hover layer for this step; they belong to a later chart build, not the beat plan.

### data-visualization

Path: `/Users/chadwickfenner/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/e6023ffd-1c12-40e7-b946-31ce6aded7d5/0bf4ee35-c375-4614-ad33-4e9b8729d999/skills/data-visualization/SKILL.md`
Read in full: yes (both copies)
What it does: no procedure. A short list of chart types grouped by purpose (comparison, trend, part of whole, distribution, relationship), then generic principles on data ink, color, accessibility and responsive behavior. Input and output are undefined.
Picks a form per beat: no. It lists "Chart Selection" by data purpose only; the closest line is "Choose the simplest chart that communicates the insight." No qualitative forms, no beats, no layout.
Clashes: em dashes in the body; "Touch-friendly tooltips and interactions" assumes interactivity; no grid or Figma notion.
Executes: nothing.
Duplication: the two copies have identical bodies; only the description differs. The designer-skills copy (`/Users/chadwickfenner/.claude/plugins/marketplaces/designer-skills/ui-design/skills/data-visualization/SKILL.md`) claims it "Owns chart selection and encoding only" and that the color ramp "belongs to `color-system`", yet the body still carries a full "Color in Data Viz" section. Fully overlapped by dataviz, which is deeper on every point.
Verdict: leave. Everything useful here is in dataviz in sharper form.

### scrollytelling

Path: `/Users/chadwickfenner/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/e6023ffd-1c12-40e7-b946-31ce6aded7d5/0bf4ee35-c375-4614-ad33-4e9b8729d999/skills/scrollytelling/SKILL.md`
Read in full: yes (919 lines)
What it does: an implementation guide for scroll driven pages. Defines the format, five principles, five techniques (graphic sequence, animated transition, pan and zoom, moviescroller, show and play), four layout patterns (side by side sticky, full width, layered parallax, multi directional), three discovery questions (pattern, tech stack, animation library), then code for CSS scroll timelines, IntersectionObserver, GSAP and Motion, accessibility, performance and mobile checklists. Its 11 step workflow ends in code: "implement the scrollytelling experience directly in the codebase."
Picks a form per beat: partly. It names beats ("linear progression with clear narrative beats") and has a technique table with "Best For" rows, for example "Graphic Sequence" for "step-by-step explanations". But the choice is per page or section, not per beat. The options are motion techniques, not still forms. Layout is a pattern choice (sticky, full width, parallax), never a column template.
Clashes: motion first, against "work as a still; motion later". Build surface is React, Tailwind, GSAP code, not Figma. Its only grid is Tailwind `grid-cols-2`, not a 12 column grid with 40 margins and gutters. Em dashes throughout. "Avoid when: You lack strong visual assets" assumes imagery. Unsourced impact claims ("400% longer time-on-page", "67% improvement in information recall") would fail the evidence rules if cited.
Executes: nothing on its own; it instructs writing code and installing libraries. No network calls.
Staleness: a "Technical Implementation (2025-2026)" section with dated browser support claims (for example Firefox behind a flag); treat as unverified.
Verdict: use part, later. Its "Graphic Sequence" idea and the side by side sticky pattern are useful vocabulary for the motion pass and for naming a "sequence of stills" form now. Leave everything else for this step.

### artifact-diagramming

Path: bundled, loaded with the Skill tool (no file on disk in the brief).
Read in full: yes
What it does: guidance for drawing one diagram in an Artifact. A test for whether a diagram earns its place, rules for what to draw (the mechanism, the difference between options, complexity matched to stakes, labeled arrows), then inline SVG mechanics (viewBox, currentColor, markers, 11 to 13px text, grid alignment, one figure one claim, figcaption).
Picks a form per beat: partly. It decides diagram or prose, which is the "conceptual diagram vs text only" fork of this job. Evidence: "If a sentence says it faster, write the sentence." It also covers before and after: "Comparing options? Draw the difference." It does not choose among chart, annotated screen or sequence of stills, and has neither references nor a layout step.
Clashes: build surface is inline SVG in an HTML Artifact, not Figma. "One figure, one claim" fits the beat model well. It is written for engineering mechanisms (requests, caches, queues), so its examples need translating to frameworks and hierarchies.
Executes: nothing.
Verdict: use part. Use "what to draw" (depict the mechanism, draw the difference, label the arrows, one figure one claim) as the test every conceptual diagram beat must pass. Leave the inline SVG mechanics.

### writing-shape

Path: `/Users/chadwickfenner/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/e6023ffd-1c12-40e7-b946-31ce6aded7d5/0bf4ee35-c375-4614-ad33-4e9b8729d999/skills/writing-shape/SKILL.md`
Read in full: yes
What it does: a conversational loop that turns a raw markdown pile into an article. Read the pile, offer two or three candidate openings, then grow paragraph by paragraph, arguing each block's format and appending each agreed block to the article file.
Picks a form per beat: partly, for text formats only. Evidence: "Argue about whether the next beat is a paragraph, a list, a table, a callout". The options are markdown formats (prose, list, callout, table, quote, code block). No visual forms, no references, no layout.
Clashes: it writes the article prose itself, which collides with CS2's own drafting loop in `CS2_PROCESS.md`. Em dashes in its body and suggested moves. Markdown output, not Figma.
Executes: nothing.
Verdict: leave. The habit of defending each beat's format out loud is right, but the format menu is text only and the skill drafts copy, which is not this step's job.

### case-study

Path: `/Users/chadwickfenner/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/e6023ffd-1c12-40e7-b946-31ce6aded7d5/0bf4ee35-c375-4614-ad33-4e9b8729d999/skills/case-study/SKILL.md`
Read in full: yes (both copies)
What it does: a mandatory seven question intake (project, type, role, audience, story format, hook, raw material), a recommender from audience to story format, then drafting in one of ten formats (six part, STAR, hero's journey, before after bridge, pyramid, Pixar, three act, JTBD, decision log). Output is case study prose.
Picks a form per beat: no. Visuals get one generic list applied to every format: "Show the journey, not just the final product", "Use before/after comparisons", "Annotate key design decisions". Nothing per beat, no forms beyond screenshots, no layout.
Clashes: the intake is compulsory ("Before writing a single line of the case study, you MUST run this intake"), redundant with the existing CS1 and CS2 reference material. "Include real screenshots, not just mockups" leans on imagery. Its six part template conflicts with the case study scope already decided. Em dashes and arrows throughout.
Executes: nothing.
Duplication: the designer-skills copy (`/Users/chadwickfenner/.claude/plugins/marketplaces/designer-skills/designer-toolkit/skills/case-study/SKILL.md`) is an older, shorter version: a fixed six part structure with no intake and no story formats. Its description promises a "narrative arc", which the body only delivers as the six part outline. The visual storytelling list is the same in both.
Verdict: leave. The story format catalogue is unrelated to this step, and the visual guidance is one generic checklist.

### writing-beats

Path: `.../skills/writing-beats/SKILL.md` (same skills dir)
Read in full: yes
What it does: a choose your own adventure loop that writes an article one text beat at a time, offering two or three candidate next beats after each.
Picks a form per beat: no. Its "beat" is a prose move ("sets a scene, lands a point, asks a question"), sized in sentences and paragraphs; no visual or layout dimension.
Verdict: leave. Shares the word "beat" only.

### figma-generate-diagram

Path: `/Users/chadwickfenner/.claude/plugins/cache/claude-plugins-official/figma/2.2.81/skills/figma-generate-diagram/SKILL.md`
Read in full: yes (body; type references not needed)
What it does: routes a diagram request to one of five Mermaid types (flowchart, sequence, state, gantt, ERD), sets syntax constraints, then calls the `generate_diagram` MCP tool, which creates a FigJam board.
Picks a form per beat: no. It picks a Mermaid type once a diagram is already chosen, and its types are software oriented. Hierarchies, frameworks and before and after comparisons have no fitting type.
Clashes: output lands in FigJam, not the Haven Figma design file, and it cannot move shapes or change fonts. Each call without a `fileKey` creates a new draft file.
Executes: network calls through the Figma MCP `generate_diagram` tool.
Description vs body: the description lists "timeline" as a trigger, but the body puts "timeline" in the unsupported list and says not to call the tool.
Verdict: leave for this step. Possibly useful later for a quick flowchart sketch, not for the final still.

## Installed verdict summary

No installed skill does this job. None works per story beat across the five forms, none names a reference per choice and none picks a layout template on a 12 column grid. Two hold usable parts:

- dataviz: use the "is it even a chart?" gate, the job to type table and the emphasis rule for the few numeric beats. Leave the color validator and the default hover layer, which breaks the still rule.
- artifact-diagramming: use "what to draw" (depict the mechanism, draw the difference, label arrows, one figure one claim) as the test for conceptual diagram beats, and its diagram or sentence fork as the test for text only beats. Leave the SVG mechanics.
- scrollytelling: hold the graphic sequence technique and sticky pattern as vocabulary for the later motion pass. Leave the rest; it is a code build guide.
- Leave data-visualization (a thinner duplicate of dataviz), writing-shape and writing-beats (text formats only), case-study (story formats and a generic visual checklist) and figma-generate-diagram (FigJam Mermaid output).

Descriptions that misrepresent their bodies:

- figma-generate-diagram lists "timeline" as a trigger; the body marks timeline unsupported.
- data-visualization (designer-skills copy) says it owns encoding only and leaves color to `color-system`; the body still has a full color section.
- case-study (designer-skills copy) promises a narrative arc; the body is a fixed six part outline. It is also an older duplicate of the skills-plugin copy.
- dataviz: the brief's path points at a second extracted copy; the loaded skill lives in a different hash folder, with identical content.

The per beat step has to be written as a process doc (per the no AI written skills rule), borrowing the two parts above.

# Resource sourcing: a skill that picks a visual form per beat

Need: a Claude Code skill that takes each beat of a narrative document and picks its visual form (chart type, conceptual diagram, annotated screenshot, sequence of stills or text only), ideally anchored to a named reference such as FT Visual Vocabulary, Segel and Heer, Knaflic, Dan Roam or the Evergreen qualitative chart chooser.

Searched 9 Oct 2026. Nothing was installed. Note: the resource-sourcing skill's `references/sources.md` is missing from its install folder (only SKILL.md is present), so sources were chosen from the known community index set.

## In-product search

- **SearchSkills**, phrasings "visual storytelling", "data storytelling", "chart chooser", "storyboard", "narrative visualization", "case study visuals", "diagram". Returned five skills already enabled on the account: `case-study` (intake then story format, no visual planning), `user-flow-diagram`, `affinity-diagram`, `scrollytelling` (scroll build techniques) and `data-visualization` (chart selection and styling). None plans a visual per beat.
- **SearchPlugins**, same seven phrasings. No results.
- **Installed but not surfaced by search**: `dataviz` (form heuristic for charts) and `artifact-diagramming` (when a diagram earns its place). Both are chart or diagram craft for a single figure, not per beat planning across a story. Worth a skill-shortlist read if building from scratch, since they could supply the chart and diagram halves.

## Community sources searched

- **skills.sh** (https://skills.sh). Phrasings "storytelling", "chart selection", "data storytelling". The search page rendered no rows to the fetcher; reached individual listings through web search instead: `mengto/skills/scroll-world-storytelling` (1.2K installs, three security audits listed as pass), `agentsorg/benji/charts` (3 installs, chart craft starting from one reader question), `doodledood/claude-code-plugins/scrollytelling`.
- **anthropics/skills** (https://github.com/anthropics/skills). Listed all 19 skill folders. Nothing on storytelling, storyboards or chart choice; closest are `pptx`, `canvas-design` and `doc-coauthoring`.
- **awesome-claude-skills, travisvn** (https://github.com/travisvn/awesome-claude-skills). Scanned README for visualization, storytelling, storyboard, diagram, slides. Only `claude-d3js-skill`, `frontend-slides`, `pptx` and `xlsx`. No storytelling or storyboard entries.
- **SkillsMP** (https://skillsmp.com). Phrasing "data storytelling chart". Thirteen results including `storytelling-with-data` and `data-journalism` (majiayu000/claude-skill-registry, a mirror), `data-visualization-guide` (revfactory/harness-100), `infographic-creator` and `data-storytelling` (FerroxLabs/wayland), `presentation-design` (mkurman/zorai). Most are registry mirrors or bundle repos; the originals are covered below.
- **Smithery skills** (https://smithery.ai/skills). Phrasing "storytelling". 113 results; top by use are `data-storytelling` by wshobson (28,185), `scroll-experience` by davila7, `internal-narrative`, `visual-storyteller` by rohitg00 (a Manim video skill, 2 installs). None is titled storyboard, chart chooser or diagram planner.
- **mcpmarket.com skills** (https://mcpmarket.com/tools/skills). Reached via web search for "scrollytelling storyboard planner beats". Surfaced Scroll World Storytelling, mirrored under karanmrn/karanagentskills (a bulk scrape repo with 1 star); the original is MengTo/Skills.
- **claudskills.com, vibeindex.ai, skillselion.com, tessl.io** (aggregators). Reached via web search. Surfaced `storytelling-with-data` (sammcj), `executive-data-storytelling`, `data-artist`, `scrollytelling-and-parallax-data-visualization`, `prettydiagram` (sketchnote SVG via Kie.ai, plan approved first), `ancoleman/ai-design-components/visualizing-data`.
- **GitHub code search via web search**. Phrasings: SKILL.md with "Visual Vocabulary"; "Financial Times" "visual vocabulary"; "storytelling with data" Knaflic; "Dan Roam" or "back of the napkin" or "Segel and Heer"; "Evergreen" "qualitative chart chooser"; "visual explanation" or "concept diagram" per idea; slide storyboard "one message per slide". Results: no SKILL.md cites FT Visual Vocabulary, Segel and Heer, Dan Roam or the Evergreen qualitative chooser. Knaflic is cited by one skill (sammcj). The FT source PDF lives in `Financial-Times/chart-doctor` with no skill attached.

Unreachable: skills.sh search results page (rendered empty rows to the fetcher, listings reached individually); GitHub code search API (401 without auth); skillselion page for ancoleman (stub, read the repo directly instead).

## Finalists read in full

### storytelling-with-data (sammcj/agentic-coding)

https://github.com/sammcj/agentic-coding/tree/main/Skills/storytelling-with-data. 162 repo stars, about 61 installs per skills.sh as reported by Skillselion. Last commit to the skill folder 4 Jul 2026 (repo pushed 9 Oct 2026). Maintainer Sam McLeod. 0 open issues. Executes: nothing. Instructions only, plus five reference files (`narrative-frameworks.md`, `hooks-and-moments.md`, `chart-selection.md`, `review-checklist.md`, `colour-and-emphasis.md`).

What it instructs: the six Knaflic lessons in order (context, visual choice, declutter, focus, design, narrative), then a narrative framework, hook and call to action. It asks the user for audience, takeaway and medium before building. It does storyboard: "Storyboard first: Sketch your flow on sticky notes or paper before opening any tool." Its chart chooser is organised by the relationship being shown (comparison, change over time, part to whole, relationship, single key number, detailed lookup) and includes "simple text" for a single number and tables for lookup.

Fit to the need: the closest single match. It has a storyboard step, a message first chart chooser and a text only option, and it gates on user input before building. It misses everything qualitative: no conceptual diagrams, no annotated screenshots, no sequence of stills, no Dan Roam, Segel and Heer or Evergreen. The storyboard step does not output a per beat visual form; it says to sketch the flow and draft section titles as an arc. Clashes: British spelling, spaced hyphens used as dashes in its prose (fine to read, would need care if any of its text were reused). It also discourages pie charts and dual axes, which is harmless here.

Install candidate: yes, as a reference to adapt rather than to run as is. Needs skill-inspector before install.

### data-storytelling (wshobson/agents, business-analytics plugin)

https://github.com/wshobson/agents/tree/main/plugins/business-analytics/skills/data-storytelling. Repo 40,304 stars, 7 open issues; 28,185 uses on Smithery. Last commit to the skill folder 22 May 2026. Maintainer Seth Hobson. Executes: no scripts; `references/details.md` carries an illustrative matplotlib snippet that is not runnable on its own.

What it instructs: turn data into narrative through visualization, context and persuasive structure (paraphrase of its description). Setup, conflict, resolution; a six beat arc (hook, context, rising action, climax, resolution, call to action); three pillars of data, narrative and visuals; do and do not lists.

Fit to the need: weak. The beats exist but no beat is given a visual form in the SKILL.md. The reference file attaches a visual cue to a couple of beats in two templates only. No named chart chooser, no qualitative forms. Generic executive presentation advice.

Install candidate: no.

### visualizing-data (ancoleman/ai-design-components)

https://github.com/ancoleman/ai-design-components/tree/main/skills/visualizing-data. 524 stars, 5 open issues, last push 11 Dec 2025. Maintainer ancoleman. Executes: references `scripts/validate_accessibility.py`.

What it instructs: a purpose first selection table and a decision tree keyed on data type (categorical, continuous, temporal, hierarchical, geographic), with a catalogue of 24 or more chart types. "Choose based on data + purpose, not aesthetics."

Fit to the need: a stronger chart chooser than the others, with some structural diagrams (Sankey, chord, dendrogram, network). It works per chart, not per story beat; keyed on data shape rather than the message; nothing on qualitative stories, screenshots, stills or text only. Ten months since last push. Ships a Python script.

Install candidate: no for this need.

### scroll-world-storytelling (MengTo/Skills)

https://github.com/MengTo/Skills/tree/main/agent-skills/web-design/scroll-world-storytelling. Repo 6,691 stars, 8 open issues; 1.2K installs on skills.sh. Last commit to the skill folder 18 Jul 2026. Maintainer Meng To. Executes: instructions plus demos; directs the agent to generate video with a paid external tool, encode with ffmpeg and build with Three.js or HTML.

What it instructs: read the full source, separate facts from presentation ideas, reduce to 5 to 7 beats, then fill a ledger per beat (ID, scene, eyebrow, headline, body line, evidence, motion, scroll weight, CTA). Beat types are hook, old way, new rule, mechanism, proof, payoff and action. "Scroll advances a visual world and the copy reveals the story in deliberate beats." It asks for approval before spending generation credits or publishing, not before building the page.

Fit to the need: the best beat ledger found, and it is explicitly for case studies. But it picks one rendering mode for the whole page (video scrub, Three.js world or HTML with data and type) and says not to mix by default, so it never chooses a visual form per beat. It builds code and generates imagery, which clashes with Figma as the build surface and with nothing built or imagery chosen without approval. Its prose uses em and en dashes.

Install candidate: no. The beat ledger columns are worth borrowing as a structure.

### Also read, not shortlisted

- **doodledood scrollytelling** (Smithery, skills.sh): technique catalogue (graphic sequence, animated transition, pan and zoom, moviescroller, show and play) with a narrative first planning step, but no per beat mapping. Overlaps the installed `scrollytelling` skill.
- **MengTo cinematic-scroll-storytelling**: assigns a motion treatment per page section, not a visual form per message. Build skill with no approval gates.
- **agentsorg/benji charts**: good single chart principle ("a chart answers one question") but 3 installs and chart craft only.

## Community verdict

Best candidate: `storytelling-with-data` by sammcj. It is the only community skill that combines a storyboard step, a message first chart chooser with a text only option, a named reference (Knaflic) and an ask before build. Runner up: none close. `scroll-world-storytelling` by MengTo has the better beat ledger but chooses one renderer for the whole page and builds immediately; it lost on both counts.

Nothing found picks a visual form per beat for qualitative stories. No published skill, plugin or MCP server cites FT Visual Vocabulary, Segel and Heer, Dan Roam's six ways of seeing or the Evergreen qualitative chart chooser, and none offers conceptual diagram, annotated screenshot or sequence of stills as options alongside charts. The quantitative half is covered (sammcj, ancoleman, the installed `dataviz`); the qualitative half and the per beat planning step are not.

This is a case for adapt before build: a project specific skill that borrows sammcj's six lesson order and message first chooser, MengTo's per beat ledger columns, then adds a qualitative form vocabulary sourced from Dan Roam and Evergreen. If sammcj's skill is installed even as a reference, it needs skill-inspector before install.
