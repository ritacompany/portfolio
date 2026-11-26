# Gates: page transition research and plan

OWNS: reports/page-transition-research/**

Scope: a short, decided plan (PLAN.md) for a clean page change Home to /mondai/ to /mondai/framework/, every claim linked and marked, every quote independently checked, on a draft PR into claude/mondai-collection.

- [x] G1: PLAN.md leads with the recommendation (timings, easing, what moves, reduced motion), then reasoning, flair later, what would change it; no em or en dashes or double hyphens
  CHECK: node reports/page-transition-research/verify.mjs plan
  EXPECT: PLAN_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6e322d222a87/16 entries; EXPECT=matched; output-sha256=36d259cae5105b07a0aca5241472d0166641bd8b682a8b69155c3993119c3ac3; output-bytes=8

- [x] G2: every sourced claim in PLAN.md carries a link and a CONFIRMED or INFERENCE mark, and every CONFIRMED quote appears in CLAIMS.md with a PASS verdict from the independent fetch and exact match check (match.mjs)
  CHECK: node reports/page-transition-research/verify.mjs claims
  EXPECT: CLAIMS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6e322d222a87/16 entries; EXPECT=matched; output-sha256=0cc18fa997046d4614b8c1a2bd2b1a75efbcb69307e0cdc24326f04771fe71bc; output-bytes=45

- [x] G3: no site code changed on the branch relative to claude/mondai-collection
  CHECK: node reports/page-transition-research/verify.mjs nosite
  EXPECT: NOSITE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6e322d222a87/16 entries; EXPECT=matched; output-sha256=4e449969cadb55348ad638b5ba345f3e9368f8cf2fa24d46865779c0a64ede00; output-bytes=10

- [ ] G4: branch claude/page-transition-research pushed, draft PR open into claude/mondai-collection, and session session_01NtNprre3q34uGCT52zKqq9 sent the PR link and a three line recommendation
  EVIDENCE: pending
