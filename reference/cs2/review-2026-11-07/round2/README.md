# Framework CS review, round 2 (7 Nov)

The restart of the copy review, published to https://claude.ai/artifact/X7ADaATwdu9Er9x6PEHqdB (version 3).

- data.py: 71 findings. Every product claim checked against ritacompany/mondai, mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md
  (cited Archive:line) and DECISIONS.md (cited by entry date). Research citations flagged separately.
- build.py: builds the page from data.py and ../template.html. Background and ending drafts live in build.py (HERO, END),
  each next to Haven's own text from Figma 5733:19874.
- extract.py: pulls the frame screenshots out of a saved copy of the published page into imgs.json
  (not in git, the repo is public). Run: python3 -I extract.py <saved page.html>, then python3 -I build.py.

Not run: Satoshi measurement of the new background, ending and reworded captions; the three run reader check, which
runs on the text he accepts.
