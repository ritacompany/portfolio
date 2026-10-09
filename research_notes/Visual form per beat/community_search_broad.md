# Community search broad: adjacent fields that pick a visual form per point

Searched 8 October 2026. Nothing was installed, cloned or run. Every finalist was read from its raw SKILL.md on GitHub, plus the reference files named below. This pass deliberately skipped the earlier finalists in `community_search_raw.md` (storytelling-with-data, data-viz-playbook, visual-vocabulary, slide-visual-selector, data-storytelling) and their near misses.

## Sources and phrasings

| Source | URL | Phrasings tried | Reached |
|---|---|---|---|
| skills.sh search API | https://skills.sh/api/search?q= | explain with diagrams, visual explainer, concept diagram, which diagram, mermaid diagram, excalidraw, diagram from text, docs diagrams, architecture explainer, architecture diagram, illustrate, article illustrator, figure planner, where to put images, diataxis, duarte, slide design, one idea per slide, deck outline, pitch deck, keynote, presentation design, content to slides, multimedia learning, mayer, instructional design, lesson visuals, explainer video, sketchnote, comic, visual notes, editorial design, long form article, magazine layout, layout from content, content first layout, landing page sections, section planner, page layout, wireframe from copy, design doc diagrams, decision record, visual thinking, napkin, visual plan, blog visuals, infographic, report layout, case study layout, figma template, figma content | Yes. Hit the 30 per minute limit once; the second batch ran after the reset |
| GitHub repository search API (unauthenticated) | https://api.github.com/search/repositories | visual explainer skill claude, figure planner skill, storyboard explainer agent skill, slide layout selector skill, figma template content skill, editorial layout skill claude, assertion evidence slides skill, visual thinking skill claude, infographic layout skill | Yes. "slide layout selector skill" and "assertion evidence slides skill" returned little |
| GitHub git trees and commits API | https://api.github.com/repos/{owner}/{repo} | used to locate SKILL.md paths and read stars, licence and last change | Yes, within the 60 per hour limit |
| GitHub code search for SKILL.md | https://github.com/search?type=code | not attempted again | Unreachable. Needs authentication |
| claude-plugins.dev | https://claude-plugins.dev/skills?q= | diagram, presentation, explainer, visual explainer, figma layout | Yes |
| Awesome lists (raw READMEs) | travisvn/awesome-claude-skills, VoltAgent/awesome-agent-skills, hesreallyhim/awesome-claude-code, ComposioHQ/awesome-claude-skills | grep for diagram, explain, illustrate, figure, slide, deck, presentation, figma, layout, editorial, infographic, instructional, visual | Yes. Surfaced cathrynlavery/diagram-design |
| Anthropic's own marketplaces | anthropics/skills, anthropics/financial-services, anthropics/knowledge-work-plugins (via skills.sh and claude-plugins.dev listings) | pptx template mapping, pitch deck, ppt-template-creator | Yes for anthropics/skills pptx; others seen only as listings |
| Figma official skills | figma/mcp-server-guide listings on skills.sh; installed figma-generate-design | figma template, figma content, content first layout | Yes |
| cursor.directory | https://cursor.directory/rules?q=diagram | diagram | Unreachable. HTTP 429 |
| Smithery | https://smithery.ai/search?q=figma template | figma template | Unreachable in practice. Returns a script shell with no listings |
| Glama | https://glama.ai/mcp/servers?query=figma template | figma template | Yes. Only Figma read or write MCP servers, no form choosers |
| Web search | general web | "SKILL.md decide which diagram or visual for each section of an article explainer"; "Claude skill populate existing Figma template frames from content outline per section component"; "Dan Roam or back of the napkin or Mayer multimedia skill" | Yes. No Dan Roam or Mayer skill exists; the napkin hits are a whiteboard tool |

## Finalists

Ranked by fit to the job: point in, decision on whether it earns a visual, which form, which layout, static stills in Figma.

### 1. talk-craft (astroicers/talk-craft)

- URL: https://github.com/astroicers/talk-craft/tree/main/skills/talk-craft
- Signals: 0 stars, no skills.sh listing under this name, skill folder last changed 5 July 2026, repo pushed 17 August 2026, MIT
- Maintainer: astroicers
- Field: presentation design (Minto, Alley assertion evidence, Duarte, Knaflic, Reynolds, Mayer and Sweller cited in `references/slide-craft.md`)
- What it instructs: eight hard rules then a routing table. One governing thought for the whole piece. Answer first. Every page title is a full claim sentence, never a topic label, and the titles read alone must equal the whole argument. Build a ghost deck of titles before making any page and restructure if it does not read as one paragraph. One idea per page; if you need "and", split. Assertion evidence: a sentence headline plus visual evidence, no bullet lists. Content is locked before any visual work. The final output is a ghost deck artifact where each page carries `title`, `assertion`, `exhibit`, `reveal` and `note`, and `exhibit` is one of code, diagram, chart, photo, number, quote, section or none.
- Input: a topic or draft talk. Output: the ghost deck handoff file, written as a contract for a downstream layout skill (slidev-deck-stack) that maps each exhibit to a layout.
- Ships: markdown SKILL.md and ten reference files, plus `install.sh` that copies the folder into `~/.claude/skills` and a GitHub validation workflow. No hooks, no network calls in the skill itself.
- Clashes: written in Traditional Chinese, so it needs translating. 13 em dashes and 2 en dashes in SKILL.md. Endorses the rule of three in `slide-craft.md`. Built for live talks, so "say it aloud, do not show it" logic has to be reread for a page that is read, not presented. The exhibit enum has no annotated screenshot, comparison, timeline or 2x2 value.
- Fit verdict: the closest sequence level model found in any field. The `exhibit` enum with `none` and `number` is almost the per point decision the job asks for, and the ghost deck test is the horizontal logic check. Its handoff contract is the right shape for "decide form here, map to a Figma template downstream".

### 2. understanding-ladder (ChangWenC/understanding-ladder)

- URL: https://github.com/ChangWenC/understanding-ladder/tree/main/skills/understanding-ladder
- Signals: 18 stars, 1 install on skills.sh, last changed 6 October 2026, MIT
- Maintainer: ChangWenC
- Field: explainers and learning (built on Karpathy's ranking of plain text, diagram, interactive page and video)
- What it instructs: classify the content (definition or comparison or procedure; process or causality or hierarchy; parameter changes an outcome; derivation that unfolds over time) and map it to a rung. Pick the lowest rung that fully answers; if a paragraph is enough, stop there. For mixed content, pick by the core difficulty. When unsure, go one rung lower and offer the next. Open with one line stating the choice. Every rung starts from a plain text draft, and the diagram may add no fact that is not in the draft. Diagram reference: choose the type first (flowchart, sequence, state, hierarchy, causal graph, comparison table), at most 8 words per box and 12 nodes, one diagram answers one question, then two to four sentences on how to read it. Always end with what the reader should verify.
- Input: a concept or an agent's output. Output: the chosen rung, produced.
- Ships: markdown SKILL.md, three rung references and a sibling plain-chinese skill, plus plugin manifests. No scripts or hooks. The video rung only links out to external tools.
- Clashes: 5 em dashes and 4 en dashes. Rungs 3 and 4 (interactive, video) are out of scope for static stills and would be cut. Works one item at a time with no sequence model.
- Fit verdict: the best "does this point earn a visual at all" rule found. "Lowest rung that fully answers" plus "the visual adds no new facts" is exactly the prose versus visual gate, and it covers the non data beats the earlier finalists could not.

### 3. diagram-design (cathrynlavery/diagram-design)

- URL: https://github.com/cathrynlavery/diagram-design/tree/main/skills/diagram-design
- Signals: 46,395 stars, 8,554 installs on skills.sh, skill folder last changed 8 October 2026, MIT
- Maintainer: Cathryn Lavery
- Field: information design and editorial diagrams
- What it instructs: a style guide gate first (customise tokens from a website, a design system folder or pasted tokens; otherwise keep defaults). Then: deletion is the highest quality move, target density 4 out of 10, above 9 nodes it is two diagrams. Before drawing, ask whether the reader would learn more than from a well written paragraph; if not, do not draw. One shape diagrams become a sentence; lists become a table; attribute only before and after becomes a table. Selection runs semantic pattern first, then one of 44 visual types from a "if you are showing" table (architecture, flowchart, timeline, quadrant, swimlane, journey, layer stack, Venn, pyramid, tree and more). If a three column table says the same thing, pick the table. Confirm the chosen type, size and what the complexity budget forces out before rendering. Static output is the default; motion only when it clarifies ordered change.
- Input: a request for one diagram. Output: a self contained HTML file with inline SVG, exportable to PNG.
- Ships: SKILL.md, about 50 type references, plugin manifests, slash commands for import or export and maintainer Python scripts (geometry checks, screenshot rendering, packaging). Onboarding can fetch a website URL to read brand tokens.
- Clashes: 24 em dashes and 6 en dashes in SKILL.md. Arrow labels are all caps by rule, which breaks sentence case. Its own design language (Geist, coral accent, dotted paper) would fight the portfolio's Figma templates. Outputs HTML, not Figma frames. One diagram per call.
- Fit verdict: the strongest form vocabulary and the most trusted repo in this whole search. The selection table and the paragraph test are directly reusable as the "which kind" step for diagram, timeline, 2x2 and flow beats. Not a sequence planner and not a layout picker.

### 4. baoyu-article-illustrator (jimliu/baoyu-skills)

- URL: https://github.com/jimliu/baoyu-skills/tree/main/skills/baoyu-article-illustrator
- Signals: repo 26,438 stars, 31,432 installs on skills.sh, skill folder last changed 13 June 2026, repo pushed 10 September 2026, MIT
- Maintainer: Jim Liu (JimLiu)
- Field: editorial illustration for long form articles
- What it instructs: the only skill found that reads a whole article and decides where visuals go. Step 2 analyses content type, purpose, 2 to 5 core arguments and "positions where illustrations add value". It must illustrate core arguments, abstract concepts, data comparisons and processes. It must not illustrate metaphors literally, decorative scenes or generic images. Each position gets one of six types (infographic, scene, flowchart, comparison, framework, timeline). A density question (minimal, balanced, per section, rich) gates how many. Step 4 writes `outline.md` with position, purpose, visual content and filename per illustration. The user confirms before anything is generated.
- Input: an article file or pasted text. Output: an outline, saved prompt files and raster images inserted after paragraphs.
- Ships: SKILL.md, a `prompts` folder and references. Writes an `EXTEND.md` preference file on first run. Rendering calls an image generation backend (Codex imagegen, Cursor, baoyu-image-gen or similar), which is a network call, and it forbids SVG or HTML as a substitute.
- Clashes: 30 em dashes. Raster AI images are the opposite of static stills built from existing Figma templates; only steps 2 and 4 are usable. Scene type invites decoration. Defaults to a hand drawn sketch-notes style.
- Fit verdict: the right shape for the analysis half (article in, positions and type per position out, with a "do not illustrate" list). Everything after the outline should be thrown away.

### 5. figure-planner (boom5426/nature-paper-skills)

- URL: https://github.com/boom5426/nature-paper-skills/tree/main/skills/core/figure-planner
- Signals: repo 559 stars, 109 installs on skills.sh, skill folder last changed 30 September 2026, MIT
- Maintainer: boom5426
- Field: scientific writing (manuscript figures)
- What it instructs: each main figure earns its place by carrying one dominant claim; if it cannot be summarised in one sentence, split it, demote part or rewrite it around a clearer claim. Assign every panel one role (claim evidence, definition, validation, comparison, consequence, case illustration, null result). Pick the anchor panel the text revolves around. Move secondary detail to another figure, the supplement or the legend. Figure 1 renders the one sentence pitch; later figures carry mechanism, evidence and application. Output the claim, the panel list with roles, what stays versus what moves, legend logic and the matching section topic sentence.
- Input: a draft manuscript and its figures. Output: a figure plan.
- Ships: markdown only, with a matplotlib snippet for style. No scripts, hooks or network calls.
- Clashes: no em or en dashes. Academic vocabulary (panels, supplement, legend) needs remapping to case study terms. Assumes data figures.
- Fit verdict: the cleanest editorial gate found. "One claim per visual, one anchor, demote the rest" maps straight onto "this beat gets a visual, this one stays prose", and "figure arc" is a sequence check. A rule set to borrow, not a skill to run.

### 6. layout (shinhayoung02-cmd/figma-layout-skill)

- URL: https://github.com/shinhayoung02-cmd/figma-layout-skill/tree/main/skills/layout
- Signals: 0 stars, no meaningful skills.sh listing, last changed 9 September 2026, no licence
- Maintainer: shinhayoung02-cmd
- Field: Figma presentation layout
- What it instructs: take content, work out audience, length and read alone versus presented, split it at "one slide, one message", then assign each section one of six fixed templates (cover, index, left text plus module, full width title plus steps, image led, data grid). If two templates fit, ask; otherwise proceed. Never invent content. Build frames with `use_figma` one or two at a time, using frame relative coordinates, then screenshot each frame and check overflow, token use, margins and text density before moving on. Includes tested helper code and a documented auto layout sizing trap.
- Input: content plus a target Figma file. Output: real Figma frames.
- Ships: one SKILL.md with Plugin API JavaScript. Calls the Figma MCP. Points at the author's own reference Figma file.
- Clashes: written in Korean. No licence, so text cannot be adapted freely. It rebuilds templates from coordinates because it says the Plugin API cannot copy nodes across files, rather than instancing existing components, which is the opposite of "layouts from existing Figma templates" unless the templates live in the same file or a published library. 1920 by 1080 slide canvas, not a 12 column page grid. Uses arrow characters in step rows.
- Fit verdict: the only community skill found that covers the last mile (section, then template, then Figma frame, then screenshot check). Useful as a pattern for the placement step; the form decision itself is thin.

## Does any beat the earlier finalists as a base?

Not outright. slide-visual-selector is still the closest single model of the full relay (beat list in, one archetype per page out, with gates). But two from this pass beat the earlier finalists on specific halves, and one fills a gap none of them covered:

- On the decision of whether a point gets a visual and which kind, understanding-ladder plus diagram-design beat storytelling-with-data and data-viz-playbook. Both earlier finalists were data chart choosers; these two cover frameworks, processes, comparisons and the plain prose option, which is most of a conceptual case study.
- On sequence structure and licence, talk-craft beats slide-visual-selector as a base to adapt: same relay shape, an `exhibit` enum that already includes `none` and `number`, and an MIT licence where slide-visual-selector has none.
- On the Figma placement step, figma-layout-skill is the only example of any kind, but it rebuilds rather than instances templates and has no licence, so treat it as a reference pattern only.

Recommended base: talk-craft's ghost deck contract, with its exhibit enum replaced by the job's own forms (diagram, annotated screenshot, comparison, timeline, 2x2, flow, big number, prose), the gate from understanding-ladder ("lowest form that fully answers, the visual adds no new facts"), the type table and paragraph test from diagram-design, and figure-planner's "one claim, one anchor" rule. The template mapping step gets written fresh against the portfolio's own Figma section templates, borrowing only the build and screenshot loop from figma-layout-skill. What would change this: finding the portfolio's templates already published as a Figma library, which would make an instancing skill (figma-generate-design is installed) a better placement base than figma-layout-skill.

## Near misses

- nicobailon visual-explainer and plannotator-visual-explainer (10,652 installs): one HTML explainer page for a whole input; earlier near miss, not repeated in detail.
- petekp explainer-visuals (97 installs): good concept type to format table but every output is an animated HTML visual, motion first.
- owainlewis explain-visually (142 installs): one HTML page; "add a before and after, sequence or comparison only when the source supports it" is a useful line, no form taxonomy.
- joshua-heygen viz-pack (63 stars): picks one visual for the whole input and forbids plain text answers, the opposite of a prose option.
- camacho visualize (277 installs): decision table from content shape to Mermaid, ASCII or a table; SKILL.md not reachable, listing only.
- namitfruits explain-with-diagrams (23 installs): Vietnamese, one Mermaid diagram per problem, explanation not form choice.
- jwynia presentation-design (2,398 installs): assertion evidence and one concept per slide as an evaluation rubric, no form vocabulary or sequence output.
- lyndonkl visual-storytelling-design (208 installs) and mapping-visualization-scaffolds: data story and concept map method, overlaps the earlier data storytelling finalists.
- baoyu-slide-deck (30,597 installs): outline with a type and layout per slide and a content to layout table in `references/layouts.md`, but renders AI raster slides.
- baoyu-infographic (32,217 installs): 21 layouts times 22 styles for one infographic, raster output.
- vercel next.js docs-diagrams (80 installs): house style diagrams for one docs page from alt text; good "draw only what the brief names" rule, Next.js specific.
- medoismail grid-systems-editorial (3 stars): grid, spread and pacing rules from Muller-Brockmann and Samara; useful for the 12 column layer, no per point form logic.
- Anthropic pptx skill (232,137 installs): template workflow says map each content section onto a template slide, vary layouts and treat template slots as not equal to source items; pptx only.
- figma-generate-design (Figma official, installed): assembles a page section by section from existing components; strong placement tool, makes no form decision.
- builderio visual-plan (1,243 installs): coding plans as visual documents, wrong domain.
- spillwavesolutions design-doc-mermaid (67,109 installs) and the mermaid, excalidraw, PlantUML and draw.io skills: renderers once a diagram is chosen, no selection across a document.
- Diataxis skills (sammcj 609 installs and others): document type planning, never decides where diagrams go.
- academic figure planners (azhi-ss, jurgendn figure-table-planner): narrower copies of figure-planner.
- explainer video skills (higgsfield, iart-ai and others): storyboards for motion, out of scope.
- napkin (github/awesome-copilot, 2,205 installs): a browser whiteboard, not Dan Roam's method.
- No skill was found for Dan Roam's visual thinking, Mayer's multimedia principles as a planner, sketchnoting at article scale or Diataxis with diagram placement.
