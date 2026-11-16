# Dither footer preview

Review candidate based on Chadwick’s Footer.png supplied 31 Oct 2026. Uses Satoshi from the existing project, the existing footer SVG assets and his exact Dither props. The animation band defaults to the reference ratio of 1440 by 217. A preview control switches it to the 600px height in his snippet.

The free React Bits Dither renderer is adapted to plain JavaScript. No React runtime or external dependencies are required. Source: https://github.com/DavidHDev/react-bits/blob/main/src/content/Backgrounds/Dither/Dither.jsx. Retrieved 31 Oct 2026. License retained in LICENSE.md.

Reduced motion uses a static render. Rendering pauses offscreen and when the document is hidden. Existing LinkedIn and Resume labels remain preview text because their destinations are unresolved in the shared source.

Serve the repository root using scripts/serve.mjs and open /prototypes/dither-footer/. Add ?clean to hide preview controls. This candidate does not alter the deployed site.

## Live controls, 31 Oct 2026

The editor adds live adjustment of the original shader parameters plus white point, black point, midtone lift and exposure before dithering. Lowering white point maps more of the wave field to white; raising midtone lift brightens intermediate values. The brighter preset is a comparison starting point, not an approved design. Original settings remain available as a reset. Changes persist in local browser storage and Show settings exposes the current configuration for copying. The additional tone controls require this adapted renderer.

## Footer proportions and settings overlay

The Figma Footer component on the VC page is `4659:11955`, read 31 Oct 2026. Its reference geometry is 1440 by 993: a 217px transition followed by a 776px footer body. At desktop widths the preview scales the body, text and wordmark together from that geometry. The band height control is now expressed at the 1440px reference width. Reset proportions restores 217 without changing shader settings. Below 700px the existing mobile composition remains.

Show settings and Hide settings are anchored at the upper right of the animation. The editor is an overlay, starts hidden and does not add height to the footer. Escape closes it.

## Direct resizing and movable controls

The footer meets the lower edge of the preview viewport with no trailing space beneath it. Grip bars resize the animation and footer body separately using pointer capture. Both grips also support arrow keys. Their heights are saved alongside the shader settings. The default footer body fills any remaining viewport height; the footer remains bottom aligned when manually shortened.

An eye icon toggles the settings overlay. Drag its header to reposition it, or focus the header and use arrow keys. The pause button has been removed. Settings stay intact when the panel is hidden or moved.
