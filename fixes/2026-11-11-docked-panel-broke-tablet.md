# Fix: opening the edit panel on a tablet squeezed the page under its own layout

Status: verified

## Evidence
Bad output: at 768 by 1024 with the panel open, html.ep-docked took 360 px (461 px with a saved width) and left the page 307 to 408 px wide while the site still applied its 768 px layout: Product Designer ran into the nav links, "Haven CS" was cut at the panel, the Haven intro wrapped to one word columns, the CHDWCK wordmark shrank. At 1024 by 768 the page was 410 to 664 px under the desktop layout. Screenshots: scratchpad tablet/cmp-port-home.png, cmp-port-haven.png, cmp-land-home.png (edit panel v2 session). Closed, base and new builds were pixel alike.
Expected: on a tablet the page keeps the window's width and its own tablet layout, and the panel sits where it does not squeeze it.

## Chain
Input: the site's breakpoints were known (tokens.css media queries at 768 and 1200, home.css at 768) and read during the build.
Instruction: the brief asked for the page to narrow to make room; nothing said where narrowing stops being honest.
Loaded: yes, the breakpoints and the vw token were read and one was patched for docking.
Conflict: media queries read the window width, docking changes only the page width; the two disagree below the layout's floor. Found in tokens.css lines 168 to 176 and home.css 92 and 178.
Enforcement: docking was gated on a phone media query only (max-width 767.98px), so any window from 768 up docked.
Check: the dock gate ran only at 1440, where the page stays in a fluid range; no gate ran a tablet size with the panel open.

## Causes
- Cause 1: the dock rule used the window size (phone or not) instead of the width left for the page | For: tablet portrait docked to 408 px, landscape to 664 px, both under the 768 or 1200 layouts they were served | Against: none found
- Cause 2: another session's commits after 058021f changed tablet CSS | For: four commits landed after mine (Haven chat phone, framework audit) | Against: panel closed, the baseline build (my files reverted) and the new build render the same at 768 and 1024
History: none for this panel; the v1 panel floated over the page to keep widths true, which v2 dropped at his ask.
Chosen cause: Cause 1, since the breakage appears only with the panel open and docked.

## Layer
Layer: 2
Why not earlier layers: layer 1, no stale or conflicting instruction to remove; the defect is in the code's dock rule.
Replaces: n/a

## Check
Check: node .unlazy/edit-panel-v2/check.mjs ../portfolio-site-preview tablet (at 768x1024, 1024x768, 1180x820, 1280x800 and 1440x900 on Home and Haven with the panel open: docked only if the page keeps 1024 px, otherwise a full width page with a bottom sheet; must dock at 1440)
Result on bad output: FAIL. "768x1024 /index.html: docked page 307 px under 1024", "1024x768 /index.html: docked page 410 px under 1024", "1440x900 /index.html: docked page 680 px under 1024" (a saved width of 760)

## Change
Files changed: site/dev/preview/edit-panel.js (dock only while innerWidth minus the panel leaves 1024 px; the panel's maximum width keeps the page at 1024; sheet mode set as data-sheet by script instead of a phone media query), site/dev/preview/edit-panel.css (sheet rules keyed on .ep[data-sheet]; the 768 to 1199 vw override removed since docking no longer happens there), .unlazy/edit-panel-v2/check.mjs (tablet gate; resize gate at 1600 since 1440 now caps at 416)
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: rebuilt with node scripts/build-preview.mjs site ../portfolio-site-preview, then a fresh Playwright browser per size and page (scratchpad tablet.mjs) and the gate script.
Before: "now port haven open docked true panel [408,0,360,1024]" with the page at 408 px
After: "now port haven open docked false sheet true panel [0,461,768,563]", page 768 px; screenshot after-port-haven.png shows the 768 layout untouched above the sheet
Check result after: PASS, "EDIT_PANEL_V2_OK tablet"
Second case: framework page and Home at 1024x768: "now land fw open docked false sheet true panel [0,346,1024,422]", sw 1024; all other gates (v1, dock, resize, phone, ascii, store, dashes) still pass
Enforcement test: n/a

## Report
Unverified: none. Note for him: a window narrower than 1304 px now gets the sheet instead of the docked panel, and at 1440 the panel can grow to 416 px.
