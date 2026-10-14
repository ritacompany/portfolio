# Output checks for a CS2 step 5 plan

Pass or fail on the plan file, per block. A plan passes only if every block passes every check.

C1. Message before layout. For every block, the claim and what the reader has to see to believe it are
written down before any layout piece is named, and the layout piece is justified by that, not the other
way round.
C2. Every figure earns its place. Each media slot names the specific part of the block's claim it proves.
A slot justified by later sections, consistency, a template's slot count or filling space fails.
C3. Fewest figures. Removing any one figure from a block would leave part of its claim unproven. A block
whose headline and body already carry the claim has no figure.
C4. No reused route diagram. No row of five Pathway marks, circles or stages unless the block's claim is
about the order of the Pathways themselves.
C5. Layout fits the message. The chosen layout piece has exactly as many media slots as the block's
figure count. No slot is filled because the piece had it.
C6. Shape. Every block carries its eyebrow and headline from the copy file, and the file passes
`node reference/cs2/check-slot-plan.mjs <file>`.
