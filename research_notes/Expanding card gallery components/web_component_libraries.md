# Expanding card gallery components: open source and copy-paste implementations

All pages viewed 2026-10-01 via WebFetch and WebSearch. Where WebFetch returned a model summary rather than raw code, that is flagged. Aceternity Focus Cards, Aceternity Expandable Card, Aceternity Apple Cards Carousel and the 50projects50days CSS were read as source code (registry JSON or raw GitHub).

## Which concrete implementations exist (at least 10 candidates) and what exactly do they do?

### Takeaway
There are 13 usable candidates in two families. Flex or grid "image accordions", where one panel grows and the others shrink, are almost all pure CSS, MIT and port straight into static HTML. The React/Motion libraries (Aceternity, Cult UI, motion.dev, Skiper) mostly do a different interaction: click a card to morph it into a centered modal, or blur the siblings. None of them is a hover-grow row. Of everything found, the CodeFronts `:has()` grid accordion and the fyildiz1974 CodePen are closest to the brief (five panels, grow on hover/focus, caption reveal, reduced motion).

### Cited Findings

**A. Pure CSS flex / grid accordions (the "grow, others shrink" pattern)**

1. **CodeFronts "Horizontal Accordion Expand"**. Pure CSS, MIT per the page. It uses CSS Grid with `:has()` instead of flex: `.rail:has(.panel:nth-child(1):hover) { grid-template-columns: 2.6fr 1fr 1fr 1fr 1fr }`. Grid track lists interpolate as long as the track count does not change. Every `:hover` rule is paired with `:focus-within`. The panels are `<a>` elements, so they are natively focusable. Collapsed captions sit sideways (`writing-mode: vertical-rl; rotate: 180deg`) and rotate upright on expand. Reduced motion sets transition duration to `.01ms`. For touch, the page recommends a hidden radio per panel plus `:has(input:checked)` so a tap pins a panel open. Source: [CodeFronts Horizontal Accordion Expand](https://codefronts.com/components/css-animated-cards/horizontal-accordion-expand/)
2. **CodeFronts "Zoom-on-Hover Expanding Accordion Gallery"**. Pure CSS flex, MIT per the page. Panels go from `flex: 1` to `flex: 5` on hover or `:focus-visible`. Each panel has `tabindex="0"`. Captions start at `opacity: 0; transform: translateY(12px)` and fade/slide in with staggered timing. Reduced motion removes all transitions. There is no explicit touch handling: mobile relies on tap firing `:hover`. Source: [CodeFronts Zoom-on-Hover Accordion](https://codefronts.com/components/css-image-slider/zoom-on-hover-expanding-accordion-gallery/)
3. **"Responsive Expandable Cards: CSS Accordion Slider" by fyildiz1974**. Published 2026-03-17, MIT. Cards rest at `flex: 1 1 0` and the hovered card goes to `flex: 3` (0.5s ease). The image shifts from grayscale to colour with a 1.2x zoom. The description slides up via `translateY` over a gradient overlay. It has `:focus-visible` outlines, uses `:active` to simulate hover on touch and has a `prefers-reduced-motion` block that kills transitions and a shimmer. Below 468px the cards stack vertically at 250px, with captions permanently shown. Source: [CSSScript writeup](https://www.cssscript.com/responsive-expandable-cards-accordion-slider/), demo [CodePen RNRwEjr](https://codepen.io/fyildiz1974/pen/RNRwEjr)
4. **Brad Traversy "50 Projects 50 Days: Expanding Cards"**. Plain CSS plus a tiny JS click handler (script.js exists; JS contents not read). The CSS was read verbatim. `.panel { flex: 0.5; transition: all 700ms ease-in }`, `.panel.active { flex: 5 }` and the caption `h3` goes from `opacity: 0` to `opacity: 1` with `transition: opacity 0.3s ease-in 0.4s`. That delay lets the caption appear after the panel has widened. The interaction is click to activate (an `.active` class), not hover. There are no focus styles and no reduced-motion handling. At 480px or below, panels 4 and 5 are hidden. The repo has about 40.6k stars. A license file was not visible on the directory page (see Gaps). Sources: [repo folder](https://github.com/bradtraversy/50projects50days/tree/master/expanding-cards), [raw style.css](https://raw.githubusercontent.com/bradtraversy/50projects50days/master/expanding-cards/style.css)
5. **Other CodePen "expanding cards" pens** found in search but not opened: [jaxparrow07 Expanding Image Cards](https://codepen.io/jaxparrow07/embed/dyazqZw/?theme-id=modal) (images with captions that expand on hover), [quicksilversel CSS Expandable Accordion Cards](https://codepen.io/quicksilversel/pen/abMNYZL) (vertical titles, descriptions that animate on hover) and [mahelhelou Expanding Cards on Mouse Hover](https://codepen.io/mahelhelou/pen/yLRLMjQ). CodePen pens default to the MIT license unless the author marks them otherwise (general CodePen policy, not verified per pen this session).

**B. React + Motion (Framer Motion) libraries**

6. **Aceternity UI "Focus Cards"**. React + Tailwind with no Motion dependency; the source has only `useState` and the `cn` helper. A 3-column grid (1 column on mobile). `onMouseEnter`/`onMouseLeave` set a `hovered` index. Non-hovered cards get `blur-sm scale-[0.98]` with `transition-all duration-300 ease-out`. The hovered card shows a `bg-black/50` overlay with the title (`opacity-0` to `opacity-100`). Only mouse events are used: no focus, keyboard or touch handlers and no reduced-motion handling in the code. Sources: [Focus Cards page](https://ui.aceternity.com/components/focus-cards), [registry source](https://ui.aceternity.com/registry/focus-cards.json)
7. **Aceternity UI "Expandable Card"**. React + `motion/react` (`AnimatePresence`, `layoutId` on card, image, title, description and button). A click morphs the card into a centered modal over a backdrop. Escape closes it (keydown listener). A `useOutsideClick` hook listens on `mousedown` and `touchstart`. It sets `body.style.overflow = "hidden"` while open. It has no aria, role or tabIndex attributes and no `prefers-reduced-motion` handling. It comes in standard (list) and grid variants. The description is a first-class field that reveals in the modal. Sources: [page](https://ui.aceternity.com/components/expandable-card), [registry source](https://ui.aceternity.com/registry/expandable-card-demo-standard.json), [block variant](https://ui.aceternity.com/blocks/cards/expandable-card-on-click)
8. **Aceternity UI "Apple Cards Carousel"**. React + `motion/react` + Next.js `Image` + Tabler icons. A horizontal scroll carousel of tall cards (category, title, image). Clicking opens a fixed full-screen modal with rich `content`, with optional `layoutId` shared transitions. Prev/next buttons scroll by 300px and disable at the ends. Escape and outside click close it. Per the source summary, the nav buttons have no aria-labels, there is no tabIndex and there is no reduced-motion check. The docs page summary claimed arrow keys and reduced motion, but the source fetch contradicts that. Sources: [page](https://ui.aceternity.com/components/apple-cards-carousel), [registry source](https://ui.aceternity.com/registry/apple-cards-carousel.json)
   - **Aceternity licence**: a proprietary licence (© Aceternity Labs LLC). Unlimited end products for yourself or clients, personal and commercial. No redistribution of source files, no marketplace resale and no templates for sale. The licence page does not single out free components as MIT. Source: [Aceternity licence](https://ui.aceternity.com/licence)
9. **Cult UI "Expandable"**. A compound React card for shadcn/ui built with Motion and `react-use-measure`. Click to expand condensed details (the demos are an event card, a headphones product and weather). The page does not document keyboard or reduced motion. The repo is MIT (© Nolly Studio) with about 6.2k stars. Sources: [Expandable docs](https://www.cult-ui.com/docs/components/expandable), [GitHub](https://github.com/nolly-studio/cult-ui)
10. **Cult UI "ExpandableScreen"**. A trigger morphs into a full-screen overlay via Motion `layoutId`. MIT. Source: [ExpandableScreen docs](https://www.cult-ui.com/docs/components/expandable-screen)
11. **21st.dev "Gallery Modal Accordion" (by ui layout)**. Next.js + Motion. Thumbnails expand accordion-style on hover, and a click opens an animated fullscreen modal with title and description. The page states no licence and no keyboard or touch documentation. 21st.dev also lists "Interactive Image Accordion", "Expandable Gallery", "Expand on Hover" and "Tailwind Image Accordion" (not opened). Sources: [component](https://21st.dev/@uilayout.contact/components/gallery-modal-accordion), [21st.dev gallery search](https://21st.dev/community/components/s/gallery)
12. **motion.dev "iOS App Store" layout example**. **Vanilla JS** using Motion's `animateLayout` (FLIP based). A card click expands it into a full-screen modal. Outside click and Escape close it with a reverse animation. The tutorial code is shown free on the page, but full source for the 450+ examples needs Motion+ (a one-time payment). The page does not mention reduced motion. The sibling "Feature expand bento" (React, a bento card that expands in place into a dialog) is fully Motion+ locked. Sources: [JS App Store example](https://motion.dev/examples/js-app-store-layout), [Feature expand bento](https://motion.dev/ui/sections/react-feature-expand)
13. **Skiper UI "Projects Showcase" (skiper80)**. framer-motion + React + lucide-react. Hover titles, click to expand details, a draggable preview and layout transitions from gallery to detail. Pro component (Pro CLI key). The licence page says free use with attribution to Skiper UI and that Pro removes attribution. It is adapted from a Webflow "Gallery to Overlay Transition". Source: [Skiper UI skiper80](https://skiper-ui.com/v1/skiper80)

**C. GSAP Flip**

14. **GSAP-Flip-Gallery (malialp)**. Uses `Flip.fit()` to fit a detail element to the clicked item, then `Flip.getState()` and `Flip.from()` to animate it. CodePen returned 403 to WebFetch, so the detail comes from a search snippet only. Other GSAP Flip resources: [GSAP forum "Expanding Card"](https://gsap.com/community/forums/topic/40028-expanding-card/), [React + GSAP + FLIP card transitions](https://codepen.io/AstroMash/pen/qBvJQBV), [FreeFrontend Flip.js roundup](https://freefrontend.com/flip-js/). GSAP, including Flip, is free for commercial use since Webflow's 2024 acquisition (general knowledge, not re-verified this session). Source: [CodePen gOQpeZw](https://codepen.io/malialp/pen/gOQpeZw)

**Magic UI**: no expanding-card or image-accordion component found. Its closest items are Magic Card (a cursor spotlight) and Interactive Hover Button. Source: [Magic Card](https://magicui.design/docs/components/magic-card)

**Codrops**: only legacy accordion tutorials surfaced, such as the 2010 jQuery "Elegant Accordion". No current Codrops demo matching this pattern was found. Source: [Codrops accordion tag](https://tympanus.net/codrops/tag/accordion/)

### Inferences
- The brief (a row of five, hover grows one, the others shrink, a caption reveals) maps directly onto family A. Family B libraries solve "open detail" (modal morph) or "dim the others" (blur), not "grow in row".
- Aceternity Focus Cards is the "others blur" variant and is trivially portable: it is about 40 lines of Tailwind class toggling with no Motion. Its accessibility is mouse-only.
- The Traversy delayed-caption trick (caption opacity transition delayed 0.4s until the panel finishes widening) is the cleanest way to stop text reflowing inside a growing panel. Worth borrowing regardless of base.

### Gaps
- The licence for 50projects50days could not be confirmed from the directory page. The root LICENSE was not opened.
- CodePen pages return 403 to WebFetch, so individual pen licences and code for pens 5 and 14 were not verified.
- The 21st.dev Gallery Modal Accordion licence is unstated. Its source was not read.

## Which are most refined, and which are pure CSS so they stay light?

### Takeaway
Most refined motion: Aceternity Expandable Card and Apple Cards Carousel, plus motion.dev's App Store example. They give shared-element morphs that pure CSS cannot match, but they cost a React/Motion runtime (or Motion+ for the vanilla version) and ship weak accessibility. Most refined pure CSS: the CodeFronts `:has()` grid accordion, which is the only candidate found that covers hover, focus, touch guidance, reduced motion and readable collapsed captions all at once.

### Cited Findings
- Pure CSS, no JS: CodeFronts Horizontal Accordion Expand ([source](https://codefronts.com/components/css-animated-cards/horizontal-accordion-expand/)), CodeFronts Zoom-on-Hover Accordion ([source](https://codefronts.com/components/css-image-slider/zoom-on-hover-expanding-accordion-gallery/)), fyildiz1974 accordion slider ([source](https://www.cssscript.com/responsive-expandable-cards-accordion-slider/)).
- CSS plus a few lines of JS: 50projects50days Expanding Cards ([CSS](https://raw.githubusercontent.com/bradtraversy/50projects50days/master/expanding-cards/style.css)).
- React with no animation library: Aceternity Focus Cards, using CSS transitions through Tailwind classes ([source](https://ui.aceternity.com/registry/focus-cards.json)).
- React + Motion: Aceternity Expandable Card, Apple Cards Carousel, Cult UI Expandable and ExpandableScreen, 21st.dev Gallery Modal Accordion and Skiper80 ([Aceternity](https://ui.aceternity.com/registry/expandable-card-demo-standard.json), [Cult UI](https://www.cult-ui.com/docs/components/expandable), [21st.dev](https://21st.dev/@uilayout.contact/components/gallery-modal-accordion), [Skiper](https://skiper-ui.com/v1/skiper80)).
- Vanilla JS + Motion `animateLayout`: motion.dev App Store ([source](https://motion.dev/examples/js-app-store-layout)).
- Grid-track interpolation and `flex` transitions are animatable in current browsers. CodeFronts cites Chrome 111+, Safari 15.4+, Firefox 113+ and Edge 111+ for the flex version ([source](https://codefronts.com/components/css-image-slider/zoom-on-hover-expanding-accordion-gallery/)).

### Inferences
- Porting ease to static HTML/CSS/vanilla JS, easiest first:
  1. CodeFronts `:has()` grid: copy as is.
  2. fyildiz1974 and the CodeFronts flex accordion: copy as is.
  3. 50projects: copy, then add `:hover`/`:focus-within` and reduced motion.
  4. Aceternity Focus Cards: rewrite about 10 lines as CSS `.row:has(.card:hover) .card:not(:hover) { filter: blur(4px); scale: .98 }`.
  5. motion.dev App Store: vanilla, but needs the Motion+ `animateLayout`.
  6. GSAP Flip gallery: vanilla JS and a free library.
  7. Aceternity Expandable Card and Apple Carousel, Cult UI, 21st.dev, Skiper: a full rewrite. Replicating `layoutId` morphs needs GSAP Flip, Motion's vanilla API or the View Transitions API.
- Phone screenshots are tall and narrow. Flex-grow accordions crop the collapsed panels to slivers, so `object-fit: cover` with a deliberate `object-position` (or showing the phone at a fixed width and letting the coloured card grow around it) matters more than the library choice.

### Gaps
- No bundle-size measurements were found for any candidate.
- The demos' touch behaviour was not tested live in a browser this session. The descriptions come from page text and code.

## Do any already reveal a caption or description on expand?

### Takeaway
Yes, most do. The pure CSS accordions reveal a short caption inside the growing panel. The Motion libraries reveal a longer description inside a modal.

### Cited Findings
- 50projects: `h3` fades in with a 0.4s delay after the panel grows ([CSS](https://raw.githubusercontent.com/bradtraversy/50projects50days/master/expanding-cards/style.css)).
- CodeFronts Zoom-on-Hover: the caption fades and slides up 12px on hover or focus, with staggered timing ([source](https://codefronts.com/components/css-image-slider/zoom-on-hover-expanding-accordion-gallery/)).
- CodeFronts Horizontal Accordion: the caption rotates from vertical to horizontal as the panel opens ([source](https://codefronts.com/components/css-animated-cards/horizontal-accordion-expand/)).
- fyildiz1974: the description slides up over a gradient overlay. On mobile it is always visible ([source](https://www.cssscript.com/responsive-expandable-cards-accordion-slider/)).
- Aceternity Focus Cards: the title only, on a 50% black overlay ([source](https://ui.aceternity.com/registry/focus-cards.json)).
- Aceternity Expandable Card: title and description animate into the modal via `layoutId` ([source](https://ui.aceternity.com/registry/expandable-card-demo-standard.json)).
- Apple Cards Carousel: category and title on the card, with rich content in the modal ([source](https://ui.aceternity.com/registry/apple-cards-carousel.json)).
- 21st.dev Gallery Modal Accordion: hover accordion plus a modal with title and description ([source](https://21st.dev/@uilayout.contact/components/gallery-modal-accordion)).

### Inferences
- For a short caption beside a phone screenshot, the in-panel reveal of family A fits. The modal pattern is for long content.
- The best composite for a static page: the CodeFronts `:has()` grid (or `flex` 1 to 3 or 5) for layout; `:hover` and `:focus-within` parity; a hidden radio or `aria-expanded` button toggle for tap-to-pin on touch; the 50projects delayed caption fade; and a `prefers-reduced-motion` block that removes the transitions while still showing the caption.

### Gaps
- None of the candidates shows evidence of screen-reader testing. The collapsed captions' accessibility (whether hidden text is still announced) is undocumented across all of them.
