# Falling behind editor: structure

What it is to Chadwick: one screen where he points at a thing in the animation and changes only that thing.
So the layout follows the objects in the scene, not categories of setting. Every region below takes its
pattern from research.md.

## Toolbar, top
Name of the piece, Undo, Redo, Copy settings, Paste settings, Reset, and two buttons that show or hide the
left and right panels.
Pattern: Rive and Jitter put file level actions in a toolbar above the stage, away from object properties.

## Scene list, left panel
One row per object, in the order they appear on screen, click to select, eye to hide while editing:
Scene, Background pixels, This week label, Next week label, Moving item (This week item 1), This week item 2,
This week item 3, Next week items 1 to 3, Rollover tag, Green arrival.
Collapsible, drag its edge to resize.
Pattern: Rive Hierarchy, Spline Outliner, Jitter layer list, Lottie layers list.

## Canvas, centre
The frame, always centred in whatever space the two panels leave, refitting on any resize. Click selects the
same object as the list; drag moves it (writes `offsets`). The moving item keeps a start place and a landing
place, set by scrubbing before or after the move.
Pattern: Rive viewport and Spline canvas, selection synced with the list.

## Properties, right panel
Shows only the selected object. Two tabs where an object has both: Look and Motion.
Collapsible, drag its edge to resize.
Pattern: Rive Inspector, Lottie context aware panel, Jitter Design and Animate tabs.

- Scene (nothing selected): frame `frameW` `frameH`, background `bg`, loop `loop`, fade in `fadeIn`, fade out
  `fadeOutAt`, layout `colW` `weekGap` `rowH` `rowGap` `labelGap` `radius` `padX` `shiftY`.
- Background pixels. Look: `fieldCount` `sizeMin` `sizeMax` `fieldColor` `opMin` `opMax` `twinkle` `fieldSeed`.
  Motion: `drift` `wander` `wanderSpeed` `depth` `lives`.
- Either week label. Look: its own text (`labelThis` or `labelNext`); shared style marked "applies to both
  labels": `labelFont` `labelSize` `labelWeight` `labelCaps` `labelTracking` `labelColor`.
- Any action item. Position (its own nudge from `offsets`), then shared style marked "applies to all items":
  `cardFill` `cardBorder` `ring` `checkFill` `tick` `barTitle` `barMeta` `doneDim` `ringSize` `barH`.
- Moving item, extra. Motion: `lift` `grow` `moveEase` `makeRoom` `closeGap`.
- Rollover tag. Look: `chipText` `chipSize` `chipColor` `chipFill` `chipTint`. Motion: `chipStays`.
- Green arrival. Look: `arriveColor` `ringActive` `outlineWidth` `ringWidth` `splitA` `splitB`.
  Motion: `arriveStyle` with a preview of each effect, `flickers` `glitchAmount` `glitchSeed`.

## Timeline, bottom
Play, scrub, frame step, speed, time. Below the scrub, one row per timed event as a bar he drags to move and
stretches to lengthen: Last check (`checkAt`), Tag appears (`tagAt`), Lift (`liftAt`), Move (`moveAt`,
`moveDur`), Green arrival (`arriveDur`). Clicking a bar selects its object on the left and right.
Pattern: Jitter's event based timeline and Cavalry's Time Editor; Lottie's layers left, tracks right.

## Kept from the current editor
Copy settings to bake, hex everywhere, undo, autosave, Space to play, arrows to step.
Pattern: Lottie Creator uses Space to play and keys to step; hex is his standing preference for colour.
