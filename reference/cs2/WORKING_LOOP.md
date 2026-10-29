# How CS2 gets written now

The loop that worked on 26 to 29 Oct. Every session on either account works this way. Read it in full
before the first reply, then HANDOFF.md for where things stand.

## The roles

- Chadwick drives. He names the block and says what it needs. Draft nothing he did not ask for.
  Shortlists and options only when he asks.
- Name blocks by their eyebrow or topic, never by section number.
- Default to deciding: one recommendation with the reason. Close with one question or none.

## Before drafting any block

1. His notes on the canvas: ArtifactData list, collection notes, on the canvas link below.
2. His frame copy above the block, read from Figma (use_figma, text sorted by y). The block has to pay off
   what earlier blocks set up and read as the next sentence after the block before it.
3. The record and research already in the repo: reports/, research_notes/, reference/cs2/reasoning/.
   Use what exists first. New research only when he asks, one agent, and say the cost before starting.

## What a block needs

- Headline: introduces the screen or the problem in plain words, at least three lines, never opens with
  the eyebrow's words, no solution in a problem headline, and the transition is never signposted.
- Body: the reasoning behind each decision and the research that backs it, in plain spoken language.
  A body that only lists features fails. Use I for his decisions, we only for team facts.
- Sources: one line at the bottom of the block, never cited inline.
- No quotes from anyone, no colleague names, no dashes, no Oxford commas, no process story (who asked
  whom, asking an AI). Write for a stranger who has never seen Mondai.

## Where versions go

- On the canvas: https://claude.ai/artifact/MVBwcVxzgtZvVmdsWE9C37. Source in `.cs2-canvas/`
  (template.html, build.py, spec.md are in git; his frame tiles in img/tiles are not, the repo is public).
  Build with `python3 .cs2-canvas/build.py .cs2-canvas`, publish the built cs2-canvas.html to that link.
  Before publishing, read the live canvas (Artifact read) in case a newer version was published elsewhere.
- Three versions for each section, labelled A, B and C, placed to the left of his block. They differ in
  structure, not wording. He gives feedback on the story, picks one, and the fix goes into that one.
- Keep his sections as the page names them. Never invent a new section, never split one by word count and
  never make a text only block.
- Layout, per version: list the points the section needs, decide which points have a visual, pick a layout
  from his pool by image count and text room (Case study layouts section, page VC, T1I T2I T3I). Points
  without an image ride in the same layout. Draw it on his black page: no gray backdrop, no boxes.
- Each image slot is a dashed gray frame with a note inside saying what the image is. He makes the images.
- Text keeps 40px margins; only images touch the frame edge.
- If the frame tiles are missing in a new worktree, copy .cs2-canvas/img from another worktree or
  re-export frame 4269:9433 from Figma and tile it (1500px tiles named fNN_y.png) before building.

## Checks, in order

1. Voice pass: no-ai-slop on every line before it goes on the canvas. Say it was run.
2. Canvas copy guard: runs on every canvas publish and refuses dashes, Oxford commas, quotes, AI
   vocabulary and colleague names (`.claude/hooks/canvas-copy-guard.mjs`). Enforced.
3. Reader check (`reference/cs2/reader-check/README.md`): three runs, PASS needed. Run it on the version
   he picks, not on A, B and C, to save usage.

## Usage

- The usage hook gives the 5 hour and weekly numbers. At 75 percent of the 5 hour limit rewrite HANDOFF,
  commit and push. At 90 percent finish the step in hand and stop, unless he says keep going.
- Weekly usage is the tighter limit. No fan out of sub-agents unless he asks. Prefer editing over redrafting.

## Saving

- After every change he approves, and at every checkpoint: commit and push to main, then fast forward
  ~/Code/portfolio. Work that is only committed in a worktree is invisible to every other session.
- HANDOFF.md is rewritten, never appended. Where it stopped holds the current state of each open block in
  a few lines. History lives in git.

## The browser account

It cannot edit the canvas or Figma. It reads HANDOFF.md and this file, talks the block through the same
way and returns each version as text in the return packet (BROWSER_MODE.md): eyebrow, headline, body,
sources line and the visual note. Claude Code puts it on the canvas and runs the checks.
