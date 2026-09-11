# Frontend implementation workflow

This is the standing completion standard for portfolio interface work. It applies to Codex,
Claude Code and any other agent working from this repository.

## Decision ownership

The agent owns reversible implementation choices inside the approved direction. It should inspect
the evidence, choose the strongest solution, implement a working version and explain what would
change the recommendation. Chadwick should not have to derive breakpoints, layout mechanics or
test cases for the agent.

The agent must ask before changing an approved art direction, personal brand claim, type family,
type weight or type style. When responsive type sizing or another perceptual choice remains under
Chadwick's control, the agent should first build and verify one recommended candidate in an isolated
study. The question should be whether to accept that demonstrated recommendation, not how to design it.

Approval is not required before correcting a clear defect, honoring an existing rule or making a
reversible implementation choice. A study may remain marked `draft` while it is implemented and
tested. It becomes `approved` only after Chadwick accepts any decision reserved to him.

## Required loop

Before implementation:

1. Reread the current request and the relevant approved rules in `docs/DECISIONS.md` and the active
   specification.
2. Identify fixed constraints, open design decisions and expected behavior. Resolve any conflict in
   favor of the current request and approved project records before writing tests.
3. Capture the current reference state when the change could affect an accepted visual baseline.

After implementation:

1. Run deterministic checks for structure, computed geometry, overflow, clipping, console errors and
   the specific requirements changed in the turn.
2. Exercise the page in a real browser at the reference width, every relevant boundary width and at
   least one width between each boundary. Add the width where the content first becomes visibly weak,
   even when it is not a named breakpoint.
3. Test applicable interaction states, keyboard order, focus visibility, touch target size, content
   wrapping and 200 percent browser zoom.
4. Capture screenshots at every tested width. Actually view the captures and compare the reference
   width with Figma or the accepted browser baseline. Review the full responsive set for hierarchy,
   rhythm, alignment, readable measure, image treatment and accidental empty space.
5. Record each material defect found, fix it and repeat the complete affected check. Continue until a
   full visual and behavioral pass finds no material defect.

## Honest evidence

A screenshot file existing or exceeding a file-size threshold proves only that capture ran. It is not
evidence that the interface looks correct. Automated geometry checks cannot certify composition or
visual hierarchy.

A visual gate is met only after the agent has viewed the relevant fresh captures. Its evidence must
name the widths or states reviewed and the defects corrected, or state that a complete review found
none. When an approved image baseline exists, use image comparison as an additional check. Do not use
image comparison as the only oracle for an intentionally changing responsive composition.

Acceptance checks must come from the user's request, approved decisions and source evidence. A test
that merely confirms values copied from the agent's own implementation cannot prove that the chosen
behavior is correct.

Use Unlazy for substantial sections or multi-part work. Small corrections still require the browser,
visual review and recheck loop, but do not need a new ledger when a focused existing check is enough.

## Review handoff

Lead with the recommended result. Include:

* what behavior changed and why it is the strongest choice
* the widths, states and accessibility conditions tested
* the defects the review caught and corrected
* any remaining decision that genuinely belongs to Chadwick

Do not present unchecked alternatives as homework. Do not report completion while a known defect,
unmet requirement or unreviewed screenshot remains.
