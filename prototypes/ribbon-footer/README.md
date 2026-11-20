# Ribbon footer recreation

Independent shader study based on Chadwick’s screenshot and recording of the public React Bits Pro Dither Wave preview. The free Dither experiment remains parked in `prototypes/dither-footer/`. Neither candidate is approved for the deployed site.

## Current state, 2 Nov 2026

The unfinished GLSL function placement fix is verified: the shader compiles, draws visible output and advances its animation clock without browser errors. The prior blank-render failure came from placing the reference warp function in the vertex shader, where its fragment uniforms did not exist. The function now lives after those uniforms in the fragment shader.

The central-flow study uses one global branching coordinate field with a slow-changing central junction and increasing detail outward. It replaces the failed approach of blending a broad patch over the middle. The math is an independent approximation, not a verified reconstruction of the original shader. The visual match still needs Chadwick’s review.

The footer renders a horizontal crop of a reference field with a minimum aspect ratio of 2:1. Making the band shallow no longer compresses the whole scene into its height. Pixel size remains independent of Zoom.

## Framing

- Zoom ranges from 0.05 to 20.
- View full field centers the crop and sets zoom relative to the current pattern scale, targeting an effective scale of 15.5.
- Frame center centers the crop and targets an effective scale of 3.5, corresponding to the close view visible around 6.5 seconds in the recording.
- Both presets snap to the slider step. They no longer assume a pattern scale of 15.5.
- Crop X and Crop Y move the camera. Center size and Center emphasis change the branching coordinate field.
- Earlier shape modes remain available. The central-flow revision selects the new study when loading older settings, and preserves a browser-local backup under `portfolio-ribbon-before-central-flow-v2`.

## Controls and footer

The eye icon toggles settings. Drag the header to move the panel or the bottom-right grip to resize it. The panel reflows to one column below 460px. Controls are grouped into collapsible sections. Presets, export and proportion reset are in the three-dot menu.

Grip bars resize the animation and footer body. Footer geometry and SVG assets come from the existing project and the Figma Footer component `4659:11955`. The reference geometry is 1440 by 993, including a 217px animation band and 776px footer body. Satoshi is supplied by the existing project. Saved settings belong to this study independently of the free component experiment.

## Reference and verification

The 39.8-second recording was initially inspected through selected stills. A later review examined the entire duration as an 80-frame sequence at half-second intervals, including its wide field and close crop. That sequence supports the observed changing junction and finer surrounding folds. It does not reveal the original implementation.

On 2 Nov the preview was checked at the default narrow viewport and at the 1440 by 993 reference size. The wide field and center crop both produced visible output. Zoom bounds were confirmed as 0.05 and 20. The animation clock reached 14.316 seconds over 860 draws, and the final browser check reported no errors.

Serve the repository root with `scripts/serve.mjs`, then open `/prototypes/ribbon-footer/`. `study.html` is a separate full-field check page. Query options `still`, `no-center` and `zoom` permit fixed-frame inspection without modifying saved footer settings.
