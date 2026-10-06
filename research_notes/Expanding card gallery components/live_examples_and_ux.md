# Expanding card galleries with caption reveal: live examples and UX/accessibility for a case study's final section

All pages viewed 2026-10-01 unless noted. Verification levels used below:
- LIVE-CHECKED: page opened in the built-in browser on 2026-10-01 and DOM/screenshot inspected.
- AWWWARDS-LISTED: element page on Awwwards Inspiration confirmed on 2026-10-01; the motion description comes from Awwwards metadata/tags (the recorded clip was not watched frame by frame), so motion details are partial.

## Q1. Best live examples of the pattern (expanding cards, image accordions, focus galleries, caption reveals)

### Takeaway
The horizontal image accordion (one panel grows, siblings shrink, caption appears in the grown panel) is well represented on Awwwards Inspiration, mostly on studio, production-company and luxury product sites rather than personal design portfolios. Awwwards element metadata is thin on exact motion; only partial live verification was possible because most of these interactions are JS-driven and several deep links now redirect.

### Cited Findings
Examples (site, URL, what it does, verification):

1. **OSAIC, horizontal accordion with quotes** (osaic.com), by Sullivan, posted May 2024. Tags: accordion, horizontal, expand, contract, component, quote. Horizontal panels expand/contract; the expanded panel shows a quote (caption-like text). AWWWARDS-LISTED. Live homepage loaded 2026-10-01 but no element with "accordion/expand" class names was found on the homepage, so the component may live on an inner page or have changed. Source: [Awwwards: Horizontal Accordion, OSAIC](https://www.awwwards.com/inspiration/horizontal-accordion-osaic)
2. **Maiora (yacht builder), horizontal accordion of exterior/interior fleet images**, by thebrandingcrew, posted May 2023. Tags: interaction, ux, ui, accordion; search snippet describes color transitions and an exterior/interior image gallery. Dark, photographic, editorial. The listed deep link (maiora.it/en/range/dna/maiora-30) now redirects to the homepage (checked 2026-10-01), so the component may no longer be live. Source: [Awwwards: Horizontal Accordion, Maiora](https://www.awwwards.com/inspiration/horizontal-accordion-maiora)
3. **Accordion Productions, image/video slider**, by HOLOGRAPHIK. Video autoplays on hover; also listed: full-screen image hover state, grid/list toggle; responsive on mobile and desktop. LIVE-CHECKED that the site (accordion.net.au) is up with a numbered "Our selection" project list (0 to 10) where each project carries credits text (Director, DOP, Edit, Photographer) in the DOM. Dark monochrome production-company site. Source: [Awwwards: Image/Video Slider, Accordion](https://www.awwwards.com/inspiration/image-video-slider-accordion); [Awwwards SOTD: Accordion](https://www.awwwards.com/sites/accordion)
4. **Fifth Year, video hover preview card**, by Touchstone Digital. Tags: video, hover, card, expand. Card expands on hover and plays a video preview while revealing more content. Live URL my5thyear.com now redirects to 5thyear.org (2026-10-01). Source: [Awwwards: Video Hover Preview, Fifth Year](https://www.awwwards.com/inspiration/video-hover-preview-fifth-year)
5. **OSI, vertical accordion**, by spotheroz, posted October 2023. Tags: accordion, vertical, interaction, responsive; shown working on desktop and mobile. Useful as the vertical/stacked variant that survives narrow screens. Source: [Awwwards: Vertical Accordion, OSI](https://www.awwwards.com/inspiration/vertical-accordion-osi)
6. **SIXMOREVODKA, work gallery hover effect**, by Spatzek Studio. Tags: hover, gallery, interaction, image. Studio work gallery where hovering a project changes the image presentation. Dark agency portfolio. Source: [Awwwards: Work Gallery Hover Effect](https://www.awwwards.com/inspiration/work-gallery-hover-effect)
7. **Camila Rosa portfolio, project card hover** (camilarosa.net/work), by Edgard Kozlowski, ~March 2025. Tags: hover, card. LIVE-CHECKED: each project card is a single link whose project name (e.g., "THE NEW YORKER", "OLD NAVY") is visible text in the DOM at rest, not hidden behind hover; no opacity-0 or visibility-hidden caption text was found inside the first project links. Light background, so not dark editorial, but a good model of "hover adds flourish, title is always there." Source: [Awwwards: Project card hover](https://www.awwwards.com/inspiration/project-card-hover-camila-rosas-portfolio)
8. **Cosie Studio, approach accordion** (cosiestudio.com), by wearegoat. Accordion/list component alongside image transitions. Source: [Awwwards: Approach accordion, Cosie Studio](https://www.awwwards.com/inspiration/approach-accordion-cosie-studio)
9. **Stefano Bartoletti portfolio, personal projects accordion** (Vue/Nuxt). The listed /experiments/ URL now redirects to /achievements/ (2026-10-01), so the component is likely retired. Source: [Awwwards: Personal Projects Accordion](https://www.awwwards.com/inspiration/personal-projects-accordion-stefano-bartoletti-portfolio)

Reference implementations (demos, not production sites, but they describe motion precisely):
- Five-image horizontal accordion: hovered card expands via flex transitions while the others collapse to vertical wordmarks. Source: [codefronts: Horizontal Accordion Expand](https://codefronts.com/components/css-animated-cards/horizontal-accordion-expand/)
- Accordion gallery that expands on hover **or focus**, neighbors shrink, captions rotate upright as their panel opens; built on `:has()` and animatable `grid-template-columns`; described as fully keyboard operable. Source: [codefronts: Tailwind accordion image gallery, flex-grow on hover and focus](https://codefronts.com/snippets/tailwind-css-image-gallery/tailwind-accordion-image-gallery-flex-grow/) (summarized via search snippet)
- Full-bleed columns that are grayscale and dimmed when collapsed, full color when active, captions revealed on selection. Source: [codefronts: Horizontal Image Reveal Accordion](https://codefronts.com/navigation/css-accordions/image-reveal/) (via search snippet)

Source-platform notes:
- godly.website now redirects to recent.design (navigated 2026-10-01, landed on "Recent Source: Design Inspiration" with `?ref=godly`); its search could not be queried as text. Source: [godly.website](https://godly.website/)
- Webflow's "Made in Webflow" horizontal-accordion gallery lists only cloneables (Timothy Ricks, Noah Raskin, Josh Jacobs and others), not live client sites. Source: [Webflow: Horizontal Accordion](https://webflow.com/made-in-webflow/horizontal-accordion)

### Inferences
- In production, the pattern clusters around production companies, studios and luxury product pages where imagery is the content and the caption is a short label or credit. It is rarely the final section of a written case study; most designers' portfolios with case studies (example 7) keep titles always visible.
- Several Awwwards element links are dead or redirected within 1 to 3 years, which suggests heavy custom hover components get retired. Weak evidence, but consistent across examples 2, 4 and 9.

### Gaps
- Exact easing, duration and expanded/collapsed width ratios for the live examples were not measured: the components are JS-driven, two redirected, and the Awwwards clips were not frame-analyzed. Treat motion descriptions for examples 1, 2, 4, 5, 6, 8 as metadata-level only.
- Land-book, SiteInspire, Mobbin and One Page Love were not successfully searched for this pattern in this pass; no examples from them are included.
- Could not confirm keyboard or screen reader behavior on any of the live examples.

## Q2. What NN/g and accessibility sources say about hover-revealed content, and the recommended fallback

### Takeaway
Hover-only text is a weak, effortful signal: NN/g treats it as reducing discoverability, it is unavailable on touch and to keyboard users unless also tied to focus, and media-query detection of "can hover" is unreliable. The consistent recommendation is: content that matters is visible without hover; hover and focus only enhance.

### Cited Findings
- NN/g: hover-triggered visual changes are weak signifiers that "require interaction effort" and "effectively reduce target discoverability"; recommends always-visible signifiers instead. Cites nrdc.org, where users had to hover thumbnails to reveal linked content. Source: [NN/g: Flat-Design Best Practices](https://www.nngroup.com/articles/flat-design-best-practices/)
- NN/g navigation study: SupermarketHQ homepage items "did not have any text descriptions (these appeared only on hover)," which made the homepage vague and pushed people into the nav instead. Task success still 95%, so the cost was clarity and wayfinding, not outright failure. Source: [NN/g: What Makes Navigation Discoverable on Desktops](https://www.nngroup.com/articles/find-navigation-desktop-not-hamburger/)
- NN/g: touchscreen and keyboard users have no access to content hidden under hover, so a backup way to access it is required; consistent interaction across devices is preferred and accidental hover triggers frustrate all users. Source: [NN/g: Menu-Design Checklist](https://www.nngroup.com/articles/menu-design/) (via search summary); [NN/g: Contextual menus guidelines](https://www.nngroup.com/articles/contextual-menus-guidelines/) recommends controls be "visible without hover when possible" (via search summary)
- NN/g timing for hover reveals: feedback within 0.1 s; wait 0.3 to 0.5 s of cursor pause before revealing hidden content; reveal within 0.1 s once intent is confirmed; keep it open at least 0.5 s after the cursor leaves. For click/tap: respond in 0.1 s and keep content open until the user clicks elsewhere. Source: [NN/g: Timing Guidelines for Exposing Hidden Content](https://www.nngroup.com/articles/timing-exposing-content/)
- WCAG 2.2 SC 1.4.13 Content on Hover or Focus (AA): additional content shown on hover or focus must be dismissible (e.g., Escape, unless it obscures nothing), hoverable (pointer can move onto it without it vanishing) and persistent (stays until hover/focus is removed or the user dismisses it). In scope: custom tooltips, submenus, non-modal popups. Out of scope: `title` tooltips, modal dialogs. Source: [W3C: Understanding SC 1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- WCAG 2.2 SC 2.3.3 Animation from Interactions (AAA): motion triggered by interaction can be disabled unless essential. Motion includes elements moving into place, size changes, parallax; color, opacity and blur changes that do not alter size, shape or position are not motion. Technique: `prefers-reduced-motion`. Source: [W3C: Understanding SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- web.dev: reduced motion means removing non-essential movement, not all feedback; zoom/scale effects, parallax and autoplaying video are named vestibular triggers; use `@media (prefers-reduced-motion)` in CSS and `matchMedia` in JS to stop in-flight animation. Source: [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)
- `hover`/`pointer` media queries only report the browser's guess at the primary input. Devices are "touch and mouse/keyboard," inputs change at runtime, and keyboard users are undetectable, so do not hide content based on them alone. Source: [CSS-Tricks (Patrick Lauke): Interaction Media Features and Their Potential for Incorrect Assumptions](https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/)
- `@media (hover: hover)` can scope hover styles to avoid sticky hover on touch; `any-hover` passes on an iPad with a mouse attached where `hover` fails. Source: [Jacob Padilla: hover and any-hover](https://jacobpadilla.com/writing/hover-media-query)
- Inclusive Components (Heydon Pickering) on cards: keep a heading as the card's main accessible content, mirror hover styling with `:focus-within`, use one link per card (pseudo-element overlay or JS delegation) and avoid redundant "read more" tab stops. Source: [Inclusive Components: Cards](https://inclusive-components.design/cards/)

### Inferences
- A caption revealed inside the card that grows (not overlaying neighbouring content) is arguably not a 1.4.13 "popup," and it naturally satisfies "hoverable" because the pointer is already on it. But if collapsing neighbours cover or shrink other content, or the caption hides anything, treat it as in scope: Escape should collapse, and it must persist while hovered or focused.
- Width/flex-grow expansion is a size change, so it counts as motion under 2.3.3. Under reduced motion, swap the animated width change for an instant change or an opacity-only caption fade, which the SC explicitly does not count as motion.
- Recommended fallback ranking for the caption: (1) always visible, (2) visible at rest on touch and narrow screens with expansion as desktop enhancement, (3) tap or focus to expand with `aria-expanded`. Hover-only is not acceptable for content that carries meaning.

### Gaps
- WCAG 2.5.1 Pointer Gestures and 2.5.8 Target Size (Minimum, 24 by 24 CSS px, AA in 2.2) were not fetched this session. From the spec as known: a hover-expand is not a path-based or multipoint gesture, so 2.5.1 mostly does not bite unless swipe/drag is required to move through cards; 2.5.8 matters if collapsed slivers are tappable targets. The report writer should verify at [W3C 2.5.1](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html) and [W3C 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) before citing.
- No NN/g study specific to hover-expand image accordions was found; findings above are generalized from hover-revealed descriptions, tooltips and menus.
- No quantitative data on how often visitors hover each card in a gallery was found.

## Q3. For five cards with one sentence each, which pattern serves skimmers and hover users best?

### Takeaway
Recommendation: show all five sentences at rest and let hover/focus emphasize one card (subtle grow, image brighten, caption contrast up) rather than reveal text. If a true accordion is wanted, keep each card's title always visible and treat the sentence as the expanded state on desktop only, with a stacked always-expanded layout on touch and narrow widths.

### Cited Findings
- Hover-only descriptions made content vague and redirected users elsewhere in NN/g's navigation study. Source: [NN/g](https://www.nngroup.com/articles/find-navigation-desktop-not-hamburger/)
- Hover signifiers carry interaction cost and reduce discoverability. Source: [NN/g](https://www.nngroup.com/articles/flat-design-best-practices/)
- The only portfolio example inspected live (Camila Rosa) keeps project titles visible at rest and uses hover only as enhancement. Source: [camilarosa.net/work](https://www.camilarosa.net/work), via [Awwwards](https://www.awwwards.com/inspiration/project-card-hover-camila-rosas-portfolio)
- A vertical accordion that works responsively on mobile is an established alternative layout for narrow screens. Source: [Awwwards: OSI](https://www.awwwards.com/inspiration/vertical-accordion-osi)
- Reliable input detection is not possible, so do not hide text on the assumption a user can hover. Source: [CSS-Tricks](https://css-tricks.com/interaction-media-features-and-their-potential-for-incorrect-assumptions/)

### Inferences
Practical checklist for the final section of a case study (five cards, one sentence each):
- **Skimmers:** five sentences total is short enough to show all at once. Hiding four of five means a skimmer reads one-fifth of the conclusion. As the last section, it is often the summary a recruiter reads, so never make it hover-gated.
- **Caption length:** one sentence of about 12 to 20 words fits in a card at rest. If a sentence needs the expanded width to fit, the collapsed state needs a short always-visible title (2 to 4 words) and the sentence becomes secondary. Derived from layout reasoning, not a sourced rule.
- **Touch:** default to the at-rest layout with captions visible; do not rely on `(hover: none)` to decide. If tap-to-expand is used, first tap expands and does not navigate, and content stays open until tapping elsewhere (NN/g timing).
- **Keyboard:** each card reachable by Tab only if it is interactive (a link or button). If cards are not links, do not add tabindex just to trigger expansion; expansion via `:focus-within` should mirror hover exactly. Visible focus ring on the card.
- **Screen readers:** caption text stays in the DOM and in reading order (no `display:none` or `visibility:hidden` when collapsed; clip or opacity is fine). Use a list (`ul`/`li`) of five items, a heading or strong title per card, real alt text or `alt=""` if the image is decorative relative to the sentence. If it is a toggled accordion, use buttons with `aria-expanded`.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, drop the width/flex-grow animation and any image zoom; keep an opacity or contrast change. Never autoplay video previews in this mode.
- **Layout shift:** animate inside a fixed-height row (fixed container, flex-grow or grid-template-columns redistribution) so the section height never changes on hover; text should not reflow line by line during the transition (fade the caption in after the width settles or set a fixed caption width). Hover-driven shifts are user-initiated, but height jumps still move the page under the cursor.
- **Timing:** about 0.1 s feedback, 0.3 to 0.5 s intent delay before large expansion so sweeping the cursor across five cards does not trigger a flicker of resizes, at least 0.5 s before collapsing. Source: numbers from [NN/g timing](https://www.nngroup.com/articles/timing-exposing-content/)
- **Escape/persistence:** if expansion overlaps or obscures anything, Escape collapses it; expanded state persists while hovered or focused (1.4.13).

### Gaps
- No usability study compared an always-visible five-card row against a hover-reveal accordion for skimming; the recommendation is an inference from the general NN/g findings above.
- No sourced guideline on maximum caption word count for cards was found.
