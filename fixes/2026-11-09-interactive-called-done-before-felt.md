# Interactive piece called done before he felt it

What happened (9 Nov): after he picked the gooey split, I shipped it to the site, ran the gates and a
screenshot sheet, and reported the Contact button done. He had never felt the shipped version or tuned it.
He had already said on this same piece that an interaction is felt and fine tuned, not shown.

Why: motion-rules said interactive pieces get "a live page he can use", but nothing said the piece stays
open until he has used it. Gates and the unlazy ledger measured only what code could check, so they went
green and the report followed them.

Fix:
- .claude/motion-rules.md: an interactive piece is not done until he has felt it on a published tuner and
  sent settings or approval; its GATES.md holds that as an unchecked manual gate.
- scripts/motion-tuner/contact-goo.py builds the tuner from the shipped module, so tuning maps 1:1.
- .unlazy/site-build/GATES.md: M2 (his settings) added unchecked.

Status: checker complete, not verified. Verified when the next interactive piece reaches him as a tuner
before any done report.
