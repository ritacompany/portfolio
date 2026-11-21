# Foundation diagram entrance, 20 Nov

Scope: the diagram in "The foundation we built on" only. Nothing else on the page changes.

- [x] G1: his thoughts are recorded in his words in this folder before any option is built
  EVIDENCE: his-words.md, 20 Nov
- [x] G2: two or three options built from what he said, each structurally different, published as a preview he can open
  EVIDENCE: three options plus the live version in site/motion-lab/foundation-entrance.html, published https://claude.ai/artifact/3f5SJ417b6A18eVDBToiFP; his pick Pathway by pathway (20 Nov), timing "Yes, plays once on screen" on the [site change] card
- [x] G3: his pick is built on site/mondai/framework/index.html through site/js/mondai-motion.js and site/css/mondai-motion.css, and docs/motion/framework-page.md says what it does and why
  EVIDENCE: site/js/mondai-motion.js openCols and the Foundation observer replace the row mask; docs/motion/framework-page.md row updated. CSS needed no change (the image stays hidden by the existing media rule until the hand back)
- [x] G4: checked on the real page at 390, 768 and 1440, reduced motion on (diagram shown at once, nothing moves) and off; still frames saved here
  EVIDENCE: capture-page.cjs on the real page, 20 Nov: starts with the diagram at top 341 of 900 (1440), 495 of 1024 (768), 525 of 844 (390); after: image open, layer gone, 0 errors at every width; reduced motion: no layer, image shown at once (stills/). handback-check.cjs: last layer frame against the image, 0 differing pixels at 1440, 0 pixels over 100 at 1280 and 390, 7 at 768 (subpixel). framework-audit-gates.mjs Foundation block passes at 1440, 768, 390 (FOUNDATION_OK). framework-page-gates.mjs browser fails identically before and after this change (below fold hidden 87 of 89: two items shown by design), not caused here
- [x] G5: no change outside the Foundation section (diff reviewed hunk by hunk)
  EVIDENCE: diff touches only the Foundation code in mondai-motion.js (row mask removed, openCols and its observer added, replay clears the layer), the Foundation row of framework-page.md and the Foundation block of framework-audit-gates.mjs
- [ ] G6: Pathway order settled with him once, after reading the Mondai archive; his answer recorded in his words, and applied to the diagram and copy only if he says so
- [x] G7: branch claude/fw-foundation-motion pushed, draft PR into claude/relaxed-ride-5mlbdu, lead session sent the link
  EVIDENCE: pushed; draft PR https://github.com/ritacompany/portfolio/pull/33 into claude/relaxed-ride-5mlbdu; lead session sent the link 21 Nov
