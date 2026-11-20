# Gates: Haven scroll integration repair

OWNS: site/haven/chat-rotate.js, site/haven/current.js, site/haven/current.css, reports/haven-motion-fix/**, NEXT.md

L1: retain the existing animation choreography and source design while repairing integration defects. The earlier geometry checks did not establish smoothness or visual fidelity.

- [ ] G1: Reproduce and record live wheel behavior with Lenis enabled before changing the animation.
  EVIDENCE: Pending browser measurements of frame timing, rendering work and layout shifts in the opening, quiz and chat.
- [ ] G2: The integrated phone performs no rendering or repeated layout work while offscreen and uses one update per browser frame while visible.
  EVIDENCE: Pending before and after wheel measurements and direct rendering counters.
- [ ] G3: Chat initialization does not change the page's scroll geometry and its turn, meet, hold and exit retain the original source positions.
  EVIDENCE: Pending layout shift evidence and original geometry comparisons.
- [ ] G4: Review real scrolling and compare source composition before reporting the repair, distinguishing fixed defects from unresolved visual judgment.
  EVIDENCE: Pending browser review at desktop and narrow width with Lenis enabled.
