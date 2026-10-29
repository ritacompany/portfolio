# Haven implementation

The current Figma master was read again after Chadwick corrected its spacing. The local page is `site/haven/index.html`. The separate Haven checkout was used as the motion source and remains unchanged.

The update carries the current opening, media, footer and ordinary section spacing into the page. It preserves the existing page entrances, quiz phone and profile scroll. The chat turn uses the 28 Oct round 7 implementation as one sequence. The finale ports the expanding-card interaction into the current ending composition. Reduced motion shows the final chat phone as a still with its paragraph and removes the scroll hold. A graphics failure also retains the still.

Browser evidence lives locally in `output/haven-current/`. The responsive check covers 320, 390, 679, 680, 767, 768, 900, 1024, 1159, 1160, 1280, 1440 and 1920 px. The interaction check covers the chat hold and release, fixed navigation, keyboard card navigation, touch expansion, reduced motion, disabled JavaScript and graphics failure. Supplemental checks cover the quiz pin, profile content scroll, missing GSAP and the layout at 720 CSS pixels with a device scale factor of two.

The shared homepage is still a foundation. About links retain its expected route. The Figma source supplies no LinkedIn or resume destination, so those labels retain their source appearance without invented URLs. Email, resource links and back to top are functional. This is a local page candidate, not a deployed portfolio.

Run a static server with `site/` as its root and open `/haven/`. `verify.mjs` starts its own temporary server. `interactions.mjs` expects the local preview at port 8184, configurable through `HAVEN_URL`. Both use `playwright-core` from the existing local installation, configurable through `PLAYWRIGHT_MODULE`.
