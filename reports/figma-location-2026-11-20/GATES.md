# Gates: Figma location registry, 20 Nov

OWNS: reference/figma-locations.json, scripts/check-figma-locations.mjs, scripts/test-figma-locations.mjs, .claude/hooks/figma-location.mjs, .claude/settings.json, reference/cs2/HANDOFF.md, reference/cs2/BROWSER_MODE.md, reference/cs2/check-handoff.mjs, reference/cs2/WORKING_LOOP.md, CLAUDE.md, docs/skills-and-mcp-setup.md, fixes/2026-11-20-figma-location-registry.md, reports/figma-location-2026-11-20/**

Scope: one registry says where each live design is; the handoff and resume files point at it; a check fails on a stale or disagreeing pointer; hooks make a session try every known file before it tells Chadwick Figma is blocked or a frame is missing.

- [x] G1: the check fails on today's repo before the fix (HANDOFF names the Portfolio Design frame as where CS2 lives)
  EVIDENCE: FIGMA_LOCATIONS_FAIL with 19 problems on the 20 Nov files, saved in g1-before.txt (HANDOFF.md:61 restates IarvWaqjIwrZ2afQmMxKm6 and names stale 4269:9433; WORKING_LOOP.md:79; CS2_PROCESS.md:201). Also re run inside test-figma-locations.mjs against HANDOFF.md at commit 4d0b2a8: fails.

- [x] G2: the registry holds the 20 Nov verified CS2 location (5RO0m4bYYrTvbiaOgaU3tI, page 5658:1061, frames 6331:20607 and 6331:27875) and marks the Portfolio Design CS2 frame stale; the check passes on the real repo
  CHECK: node scripts/check-figma-locations.mjs
  EXPECT: FIGMA_LOCATIONS_PASS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=73e3902273a98eef7a49dcb1f83c8dab3de0db5dd1e6626c7f6d14f02fe2f29e; output-bytes=787

- [x] G3: planted cases fail: a stale pointer in a handoff, a file key restated in a handoff, a live entry not verified for over 7 days, a registry file missing from the known list
  CHECK: node scripts/test-figma-locations.mjs
  EXPECT: ALL_LOCATION_TESTS_PASS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=96aa8c29ac81b7e9771ade910ea52d8944b27806d8eb1b8c880e9625b686d2be; output-bytes=857

- [x] G4: check-handoff.mjs fails a handoff that disagrees with the registry and still passes the real one
  CHECK: node reference/cs2/test-handoff.mjs locations
  EXPECT: HANDOFF_TEST_LOCATIONS_PASS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=1648146713e805c7d3d56aa9bffb95436d6f026346c896a213e422ad8b1bd002; output-bytes=265

- [x] G5: the stop hook blocks a reply that says Figma is blocked or a frame is missing while a known file was never tried, and lets it through once every known file was tried; the pre hook names the current location when a call targets a stale frame
  CHECK: node scripts/test-figma-locations.mjs hooks
  EXPECT: HOOK_TESTS_PASS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=0fc857abc9c06bcdd9cbb5db91a0be4669325ba67154df6e4f5640ca0cbb0a7c; output-bytes=652

- [x] G6: a fresh agent given only the repo and his 20 Nov sentence goes to 5RO0m4bYYrTvbiaOgaU3tI node 6331:20607 and says it would try the other known files before reporting anything blocked
  EVIDENCE: fresh-run.md. Sonnet sub agent, new context: first call 5RO0m4bYYrTvbiaOgaU3tI, 5658:1061, 6331:20607; on a failure it searches the other registry files by frame name and would not say Figma is blocked first; Haven 5812:21569; no live disagreement found.

- [x] G7: no dashes or Oxford commas in the new and changed prose; fix record complete
  EVIDENCE: the copy hook passed every new and changed md file after two rewrites (it caught a two hyphen flag name, now removed); added lines read by hand for Oxford commas, none; check-fix-record.mjs prints fix record complete (status: verified, layer 4).
