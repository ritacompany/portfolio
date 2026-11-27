# Gates: Mondai collection updated 1 and updated 2, one video each

OWNS: reports/mondai-collection-v2/**, docs/motion/mondai-collection-v2/**

Scope: one real time desktop video per version (Home, hover the Mondai card, click, the collection arrives), filmed from a copy of the site, with site/ untouched until Chadwick says yes to a video.

- [ ] G1: The Figma frames ("Mondai case study collection updated 1" and "updated 2") have been seen, from Figma or from screenshots he pastes. Blocked 27 Nov: Figma MCP call limit on the View seat.
  EVIDENCE: pending

- [ ] G2: Both videos exist as MP4 files, each 3 to 8 seconds long, at 1440x900.
  CHECK: node reports/mondai-collection-v2/check-videos.mjs
  EXPECT: VIDEOS OK
  EVIDENCE: pending

- [ ] G3: site/ has no changes on this branch against claude/page-transition-research.
  CHECK: node reports/mondai-collection-v2/check-site.mjs
  EXPECT: SITE UNTOUCHED
  EVIDENCE: pending

- [ ] G4: Each video matches its frame: header simplified to work container height, "Mondai // Case study collection" in place, "Tech career navigator" pushed right, spacing per version, no card labels, cursor button with case study name and arrow, locked cards per version (filled Material Symbols lock). Checked by viewing stills from each video against the frames.
  EVIDENCE: pending
