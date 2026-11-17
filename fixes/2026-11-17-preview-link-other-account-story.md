# Fix: sessions say they cannot republish the site preview because the link is his other account's

Status: verified

## Evidence
Bad output: 16 Nov, the session that built the capacity demo ran Artifact read on https://claude.ai/artifact/WEWiXsm3fsWdV2gd7z5BST, got "artifact not found: it may have been deleted, or it has not been shared with you", and told him the preview link was his other account's, so it could not republish.
Expected: rebuild from the last commit and publish to the preview link this Claude Code account owns, then hand him that link.

## Chain
Input: yes. Artifact list (scope all) on this account shows "Chadwick Fenner, product designer", https://claude.ai/artifact/McviYhengPB92skSvB2YEu, owned by this account, 177 files, db capability on. A session published it on 11 Nov (transcript 8bdb92ef, "Published ... Version 1 ... readable by only you") and others republished it on 12 to 14 Nov.
Instruction: docs/SITE_BUILD_PLAN.md named only the 9 Nov link WEWiXsm3 (review loop line 439, handoff line 242) and scripts/build-preview.mjs line 4 named it as the publish target. The 11 Nov link was written only to a side session note outside the repo (side-session-notes/local_b24ab9ac.../edit-panel-v2.md).
Loaded: yes. The 16 Nov session read SITE_BUILD_PLAN.md and followed it to WEWiXsm3.
Conflict: SITE_BUILD_PLAN.md lines 121 to 123, 180, 215 and docs/responsive/APPROACH.md line 11 said the old link was "private to his first account" and told the reader to build on "the second account" instead. That is the story sessions repeated.
Enforcement: none. Nothing tied the publish target to a link this account can open.
Check: an Artifact read of the documented link before telling him anything; it returned not found and the session explained it with the doc's account story instead of looking at Artifact list.

## Causes
- Cause 1: the doc and the build script name a link this account cannot open, and the live link was never written into the repo | For: grep shows WEWiXsm3 in 5 places and McviYheng in none; Artifact list shows McviYheng owned here | Against: none
- Cause 2: sessions are signed in to a different claude.ai account than the one that made WEWiXsm3 | For: ~/.claude.json shows the signed in account; WEWiXsm3 is absent from Artifact list scope all and reads 404; the doc's 9 Nov checkpoint says the same | Against: it does not stop anything, since this account already owns a working preview link. True, but not the cause of the failure.
History: fixes/2026-11-13-local-preview-links.md (localhost links instead of the preview link); it did not touch which link.
Chosen cause: 1. The account split is real but harmless; the failure is that the repo pointed at the unreachable link and hid the reachable one.

## Layer
Layer: 2
Why not earlier layers: layer 1 was also used: it removes the stale link and the account story from SITE_BUILD_PLAN.md and APPROACH.md; layer 2 puts the one link in scripts/build-preview.mjs as PREVIEW_URL, and the build now prints the exact publish call, so the step a session runs hands it the right link. The script also takes HEAD so it builds from the last commit, not the shared working tree.
Replaces: n/a

## Check
Check: scratchpad check-preview.sh, copied here: PASS when no file a session reads for the preview names WEWiXsm3 and `node scripts/build-preview.mjs HEAD <dir>` prints artifact/McviYhengPB92skSvB2YEu.
Result on bad output: FAIL ("FAIL: dead link still named" at SITE_BUILD_PLAN.md:242, :439 and build-preview.mjs:4; "FAIL: build from HEAD does not print the live link", the script crashed on HEAD).

## Change
Files changed: docs/SITE_BUILD_PLAN.md, docs/responsive/APPROACH.md, scripts/build-preview.mjs
Instruction lines: +6 / -11 in the docs; the script gains the link constant, the HEAD build and the printed publish call.
Net growth reason: n/a

## Verification
Fresh run: two fresh Sonnet subagents given only the repo and a task (no publish). Both started from CLAUDE.md and SITE_BUILD_PLAN.md's review loop, ran `node scripts/build-preview.mjs HEAD` into a temp folder (177 files, HOVER_STILL_OK 53 hovers, then the printed publish call) and read https://claude.ai/artifact/McviYhengPB92skSvB2YEu: "owned by you, private", version 1794896727-db19.
Before: "the link belongs to his other account", read of WEWiXsm3 not found.
After: both reported nothing suggested another account or another repo.
Check result after: PASS (check-preview.sh after the change)
Second case: the second subagent had a different task (put the committed Haven tablet timeline on the preview so he can check it on his phone) and reached the same link and steps.
Enforcement test: n/a

## Report
Unverified: none. The preview was republished 17 Nov from cfe7bea (version 4, id 1794896727-db19) with js/capacity-demo.js. Nothing enforces that a later session updates PREVIEW_URL if it ever makes a new link; the build printing it is the only guard.
