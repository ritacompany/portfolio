# How motion and scene editors lay out their panels

Researched 4 Nov 2026 from each tool's own documentation, for the Falling behind editor. Refero was not
available in this session (plugin not installed), so this is from official docs found by web search.

### Rive
Toolbar on top, a left sidebar holding the Hierarchy (a tree of every object on the stage, in render order)
and the list of animations, the stage in the middle, the Inspector on the right and the timeline at the
bottom in Animate mode. The Inspector shows only the properties of what is selected, and it changes when you
select an object on the stage, a key on the timeline or a state machine node.
Sources: https://rive.app/docs/editor/interface-overview/overview, https://rive.app/docs/editor/interface-overview/hierarchy.md, https://rive.app/docs/editor/interface-overview/inspector.md

### Jitter
Five areas: a layer list on the left (artboards and the layers in them, rename, reorder, group, hide with an
eye), the property panel on the right with two tabs, Design (how a layer looks at rest) and Animate (timed
motion on top), and a timeline at the bottom when Animate is open. The timeline is event based: each animation
is a bar you move and stretch rather than a set of keyframes.
Sources: https://help.jitter.video/en/articles/12597029-a-quick-tour-of-the-interface, https://help.jitter.video/en/articles/16414495-design-and-animate-modes, https://help.jitter.video/en/articles/14037746-manage-your-layers

### Spline
Left panel is the Outliner, the tree of objects in the scene. Right panel is properties. With nothing
selected it shows the scene's own settings (background, effects, colour); selecting an object swaps them for
that object's properties.
Source: https://docs.spline.design/basics/understanding-splines-ui

### Lottie Creator
A layers list, a context aware properties panel on the right and a timeline at the bottom whose left side
lists layers and right side holds their keyframe tracks. Clicking empty canvas shows scene properties;
clicking a layer shows its own. Space plays and pauses; J and L jump between keyframes.
Sources: https://docs.lottiefiles.com/en/creator/02_quickstart/interface, https://docs.lottiefiles.com/en/creator/06_properties/property-panel-overview, https://docs.lottiefiles.com/en/creator/07_animation/timeline

### Cavalry
The Scene Window holds the scene tree (layers), a timeline and a Time Editor where each layer's active range
and animation is retimed as bars. The Attribute Editor loads a panel for the selected layer only, with its
attributes grouped into rows.
Sources: https://docs.cavalry.scenegroup.co/user-interface/menus/window-menu/scene-window, https://cavalry.studio/docs/user-interface/menus/window-menu/attribute-editor/

### tsParticles
Not an editor, but the reference model for an ambient particle field. Movement is a speed range with an
optional random factor, a direction (an angle or a named side such as right), and an out mode for what
happens at the edge. Gentle wandering comes from random movement on top of a slow straight drift rather than
from trails.
Sources: https://particles.js.org/docs/interfaces/tsParticles_Engine.Options_Interfaces_Particles_Move_IMove.IMove.html, https://particles.js.org/docs/classes/tsParticles_Engine.Options_Classes_Particles_Move_Move.Move.html

## What every one of them agrees on
1. Objects on the left, as a list you can click. Properties on the right, for the selection only.
2. Empty selection shows the scene's own settings.
3. Selecting on the canvas and in the list is the same act, kept in sync.
4. Timing lives on a timeline at the bottom, not in a settings panel. Jitter and Cavalry show each animation as
   a bar you move or stretch.
5. Look and motion are separated (Jitter's Design and Animate tabs).

## What the current editor does wrong against this
It puts every setting in one right panel sorted by category, so to change the tag you scan seven sections.
Timing is typed as numbers in a section instead of placed on the timeline. There is no list of objects, so the
only way to reach a thing is the canvas or a category guess. Shared settings (all item colours) and one
object's settings (this item's position) are mixed.
