# Tuning interfaces: what people use now and what the tuner takes from it

Research run 9 Nov by a research agent (web), checked where marked. Purpose: make the liquid Contact
button tuner something Chadwick can feel and fine tune, the way designers tune motion today.

## What people use

- DialKit (Josh Puckett, MIT, github.com/joshpuckett/dialkit): a panel for tuning animation values live.
  Spring editor with easing, time and physics modes, saved versions, a copy values button, values kept
  across reloads. React, Solid, Svelte, Vue and plain JS adapters. CDN build not verified.
- Tweakpane (tweakpane.github.io): folders, tabs, monitors, preset import and export, CSS variable
  theming. Version 4 ships as ES modules only; version 3.1.10 is the last UMD build (URL checked).
- lil-gui 0.21.0: small, UMD build available (URL checked).
- Leva is React only, so it does not fit a page with no build step (background knowledge, not checked).
- Skills that generate tuning panels exist for Claude, which points to the current pattern: generate a
  panel, tune by hand, paste the chosen values back into code.

## Patterns that make a panel work for a designer

- Group controls by what you feel, not by code module.
- Springs as speed and bounce, not stiffness and damping. Motion's visualDuration and bounce follow this;
  the conversion used here: angular speed w = 2 pi / T, damping ratio = 1 minus bounce, per frame at
  60 Hz k = (w / 60) squared and d = exp(minus 2 x ratio x w / 60). Bounce is clamped below 1.
- A live response graph for each spring.
- A changed mark and a reset on every row; presets; two snapshot slots to compare; undo with history.
- Slow motion and a scripted replay, so a fast moment can be seen.
- A debug view of the physics: rest shapes, pointer reach, the caught point.
- Copy back as a short message ready to paste to Claude, plus plain JSON; paste in to load.
- Keep the latest values in browser storage, wrapped so it never breaks the page.
- A phone layout where the preview stays in view while the controls scroll.

## Applied in the tuner

Built by hand rather than with Tweakpane, so the controls could use his plain language, the spring graphs
and the phone layout without fighting a library theme, and so the page has no outside script.

- Eight groups named for what you feel: Rest, Colours, Push from inside, Pull out, Brush past, Mail circle,
  Melt, Press. Each has a one line description.
- Every spring is Speed (seconds) and Bounce, with a response graph under it that redraws as you drag.
- Every row: a slider, an exact number box, a changed dot, a Reset button; double click the label resets.
- Presets: Mix (default), Gooey reference (joined at rest), Liquid outline only, No hidden colour, Calm, Wild.
- Save A and Save B with A and B buttons to flip between them; the stage badge says which is showing.
- Undo and Redo, also Ctrl or Cmd Z and Shift Ctrl or Cmd Z, 200 steps.
- Speed 0.1x, quarter, half and 1x; 1x or 2x zoom; Play demo runs the scripted pass with a ghost pointer;
  Debug view draws the rest shapes, both reach circles and the caught point.
- Copy for Claude gives a one line message with the changed values and the full set; Copy JSON; paste box
  with Load pasted, which reads either form.
- Values persist in browser storage. On a phone the stage sticks to the top and the groups scroll under it.

## Sources

- https://github.com/joshpuckett/dialkit
- https://tweakpane.github.io/docs/
- https://motion.dev/docs/spring
- https://filip-design.pages.dev/tools/spring
- https://www.framer.com/marketplace/components/gooey-liquid-button
- https://www.framer.com/marketplace/components/liquid-button/
