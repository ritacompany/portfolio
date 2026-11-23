# Gates: ten design system case study examples

OWNS: reference/design-system-cs/research/EXAMPLES.md, reference/design-system-cs/research/EXAMPLES-GATES.md, reference/design-system-cs/research/check-examples.mjs, reference/design-system-cs/research/check-claims.cjs

Scope: ten opened, public, 2024 or later, senior design system case studies with author, role, date and presentation, written to EXAMPLES.md and pushed.

- [x] G1: EXAMPLES.md lists ten distinct links, has no dash punctuation or Oxford comma, and is on the remote branch
  CHECK: node check-examples.mjs
  EXPECT: EXAMPLES-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research; path=0546b5e32cbf/16 entries; EXPECT=matched; output-sha256=e2152154d63bdc077660f0a8c817c7090b072ad46afbd96247174153e75ecbe4; output-bytes=14

- [x] G2: every listed page loads in public, without a login, and shows the role, date and key figure claimed
  CHECK: node check-claims.cjs
  EXPECT: CLAIMS-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reference/design-system-cs/research; path=0546b5e32cbf/16 entries; EXPECT=matched; output-sha256=652f903174ab504e2eccb72424adee714aa0526974b7c95c814892bd54209829; output-bytes=1370

- [x] G3: an independent fresh agent confirms or rejects each claim; failures are replaced and re-checked
  EVIDENCE: 23 Nov 2026, Sonnet round 1: 8 pass, 1 fail (Jiachen Cui, replaced), 1 unverifiable (Vera Marshalova, Cloudflare blocked the agent; read in full by check-claims.cjs). Round 2 on the two changed links: both pass.
