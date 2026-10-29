# Gates: Haven current page update

OWNS: site/haven/**, site/lib/**, site/vendor/three/**, site/assets/haven-end/**, site/assets/satoshi-*.woff2, reports/haven-update/**, NEXT.md, TRACKER.md, docs/DECISIONS.md

Scope: Update the local Haven page to the current Figma design and integrate existing quiz, chat and finale motion while preserving Chadwick's spacing and link corrections.

Navigation scope: the case page owns hover states, fixed positioning, email, resources and back to top. The source does not supply LinkedIn or resume URLs and the shared homepage About destination is separate work. These are recorded in README.md rather than filled with invented destinations.

- [x] G1: The page matches the latest source sections, copy, media and corrected section spacing at desktop width.
  EVIDENCE: Current master 3300:12596 read after Chadwick's fixes, structure saved in current-structure.json. Current opening, collage, profile background and detail, scheduling, security media, ending and footer integrated. Desktop viewport captures compared with Figma; ordinary section entries use his 64 px inset and lower spacing follows his 164 px padding. The quiz retains its motion height. Repeated chat design states render as one sequence.

- [x] G2: The existing quiz and profile motion work in the updated page and repeated chat source states become one animated sequence.
  EVIDENCE: QUIZ_PROFILE_FALLBACK_ZOOM_PASS; profile content moved to translateY(-11.711%). Chat integration checked at 1440, 1024, 768 and 390 px. Pair remains stationary for 900 px of scroll within one px rounding tolerance and then exits at page speed. Desktop meet and hold PNGs have identical pixels. Existing quiz and profile logic retained; chat uses the 28 Oct round 7 source with one page Lenis controller and a narrower paragraph at intermediate widths.

- [x] G3: The five-card finale works with mouse, keyboard and touch in the current ending composition.
  EVIDENCE: HAVEN_INTERACTIONS_PASS. Mouse edge card remains in the desktop viewport; arrow keys move focus and open the next card; Escape closes; touch opens and an outside tap closes. Expanded state is exposed through aria-expanded. Hover and touch captures viewed; a gap beneath open cards prevents the closing text touching the expanded panel.

- [x] G4: Fixed navigation, smooth scroll and footer links function without opaque navbar fills.
  EVIDENCE: One Lenis controller exists; navigation top stays zero through chat hold and release at four widths. Computed navbar fill is transparent at every responsive check. Source letter forms preserved. Page-owned email, resources and back-to-top targets are wired. Shared destinations are explicitly outside the supplied navigation scope above.

- [x] G5: Desktop, intermediate and narrow layouts pass browser checks and viewed screenshots, including reduced motion and script failure fallbacks.
  EVIDENCE: HAVEN_BROWSER_GEOMETRY_PASS at 320, 390, 679, 680, 767, 768, 900, 1024, 1159, 1160, 1280, 1440 and 1920 px with no horizontal page overflow, missing images or script errors. Viewport galleries at every width viewed, with detailed desktop and phone media captures. Reduced motion, JavaScript disabled, missing GSAP and graphics failure retain content. Zoom-equivalent 720 CSS px at device scale two has no horizontal overflow. Fixed the old profile artwork, closing-card overlap, nested wireframes boundary and headline breakpoint jump before final review.
