# Brief: visual storytelling step for case studies

Paste everything below into a new Claude Code session opened on /Users/chadwickfenner/Code/portfolio.

---

Read CLAUDE.md, reference/cs2/CS2_PROCESS.md (the Layouts section and loop step 5) and
reference/cs2/draft/CS2-section-1.md first for context.

Background: I'm laying out case study 2 section by section in the portfolio Figma (file
IarvWaqjIwrZ2afQmMxKm6, page VC, section "Case study layouts" node 3461:5685, ten WIP case study
pages of laid-out sections). Layouts keep coming out as walls of text because the process has no
step that asks how each beat should be shown. I want data visualization, diagrams and other visual
forms where they help, with the visual form chosen per beat and the layout chosen to serve that
form. There will still be a fair amount of text. This is the narrative visualization or visual
storytelling problem; scrollytelling is the animated form of it. Motion comes later, so every
visual has to work as a still first.

Mandatory skills, loaded with the Skill tool, not imitated:

1. unlazy, first. Write acceptance gates before executing, decompose with its Depth Tree and
   re-verify evidence before reporting. Gates must include: deep-research actually ran through its
   subagent process and produced a report; resource-sourcing ran with skill-shortlist for installed
   skills and searched at least three community sources; every recommendation cites what in its
   source earned it.
2. deep-research for the research. Let it spawn its research subagents in parallel and its report
   writer. Do not replace it with a few inline web searches. Scope:
   - how editorial graphics teams (NYT, The Pudding, Reuters, FT) choose a visual form per story beat
   - narrative visualization research: Segel and Heer's genres, Hullman on sequencing, Alberto
     Cairo, Cole Nussbaumer Knaflic, Tufte
   - how page layout carries a narrative, and scrollytelling patterns that still work as stills
   - visual form catalogues and marketplaces: FT Visual Vocabulary, Data Viz Catalogue, From Data
     to Viz and similar
   - how the strongest UX and product design case studies show reasoning visually instead of in prose
3. resource-sourcing, which runs skill-shortlist first. Judge installed skills by reading their full
   SKILL.md bodies (at least dataviz, data-visualization, scrollytelling, artifact-diagramming,
   writing-shape, case-study), then search outward for existing skills or plugins that pick a visual
   form per message or beat. Anything that would be installed goes through skill-inspector first and
   is never installed without my approval.

Deliverables:
- The deep-research report in reports/, notes in research_notes/.
- A proposed addition to CS2_PROCESS.md loop step 5, as a draft for my approval, not applied: per
  beat, name what the reader must understand, pick the visual form (with a named reference from the
  research), then pick the layout from the Case study layouts section that fits that form.
- A recommendation: adopt or adapt an existing skill, or write a new one, with what was searched
  and why.

Layout rules that already apply (CS2_PROCESS.md, Layouts, corrected 2026-10-07 after the first
layout batch went wrong):
- The grid is the Haven grid: 12 columns, 40 margins and gutters, Haven text styles. Every layout
  recommendation is stated on that grid.
- The Case study layouts templates are a starting point, not a standard. They were AI generated (tool
  unclear) and may not sit on his grid, so a template is chosen for fit and then adapted, never copied as is.
- Layout is worked out with him step by step. Nothing is built ahead of that.

Limits:
- No visuals made, no imagery chosen, nothing built in Figma.
- No changes to CS2 files and no commits until I approve.
- Copy rules: no em or en dashes, no hyphen pair as a dash, no Oxford commas, sentence case.
- Mondai source material (transcripts, chats, decks, notes) never goes into git.
- Short replies, one question at most, lead with the result.
