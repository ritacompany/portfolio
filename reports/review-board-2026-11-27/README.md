# Portfolio review board, 27 Nov

Live board: https://claude.ai/artifact/6pqACSvSGnP4Q6qoNeXz3Z (private to Chadwick). Source: `page/index.html`,
pictures in `page/img/`, captured by `capture.mjs` from each branch and by `scripts/check-card-transition.mjs CAPTURE`
(transition strips) on card-to-collection-transition. Hero pictures are the v6 versions on main.

His answers save to the board's database: collection `decisions`, one document per item id
(`choice`, `choice_label`, `note`, `at`), and `meta/finish` when he presses Send to Claude. Read them with
ArtifactData `list` on that collection.

Items and the PR each one approves: sow-tablet #35, sow-copy #38, fw-fixes #37, headlines #36, footer #25,
collection #30 (page only; its cursor button is superseded by the site cursor), transition #39 (A, B or C),
hero-colour (v6 a, b or c), registry #27, review-preview #24, go-live (everything approved onto main).
