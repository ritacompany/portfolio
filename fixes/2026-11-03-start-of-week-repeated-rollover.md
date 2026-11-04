# Fix: start of week round 1 re-explained rollover that Falling behind already owns

Status: not verified

## Evidence
Bad output: round 1 text paragraph 2, "Unfinished Action Items move into it on their own. The week takes fewer new ones, so it still fits the hours a person gave." plus an Open line asking whether Falling behind would carry it.
Expected: no rollover explanation in start of week; the column says why the recap exists, relying on Falling behind for rollover.

## Chain
Input: the decision existed only in the buffer flow session transcript, where he answered the rollover question with "Great, section complete".
Instruction: the session brief and HANDOFF.md both said rollover in Falling behind was recommended, not confirmed.
Loaded: HANDOFF.md was read first, as WORKING_LOOP requires; it carried the stale status.
Conflict: HANDOFF.md line on buffer flow, "Recommended, not yet confirmed by him", against his reply in the buffer flow session.
Enforcement: none; the handoff is rewritten by the session that closes a block, from its own reading of his reply.
Check: comparing each brief point against the handoff and the parent transcript before drafting.

## Causes
- Cause 1: the closing session read his "Great, section complete" as approval of buffer flow only and wrote the rollover answer down as unconfirmed | For: the handoff wording and the transcript order (question asked, then that reply) | Against: his reply never names rollover, so it is a reading
- Cause 2: the start of week brief itself listed rollover as open and the agent followed it | For: the brief says "Open and unconfirmed: introducing rollover in Falling behind" | Against: the brief only copied the handoff, so it is the same source
History: none for this failure.
Chosen cause: cause 1; the brief inherited it.

## Layer
Layer: 2
Why not earlier layers: layer 1 has no two live sources to delete from; the handoff is the single source and it was wrong.
Replaces: n/a

## Check
Check: does HANDOFF.md say rollover in Falling behind is decided? grep -c "Decided 3 Nov (his yes in the buffer flow session)" reference/cs2/HANDOFF.md
Result on bad output: FAIL, 0 matches on commit 8035922.

## Change
Files changed: reference/cs2/HANDOFF.md (rollover line now says decided), reference/cs2/versions/start-of-week.md (round 2)
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not run.
Before: round 1 paragraph 2 explained rollover.
After: round 2 drops it; the column opens on why the recap exists.
Check result after: grep returns 1 on the new HANDOFF.md, not yet confirmed in a fresh session.
Second case: none run.
Enforcement test: n/a

## Report
Unverified: whether "Great, section complete" was his yes on rollover. He said in the start of week session that it was decided, which supports it. A fresh session reading the new handoff has not been run.
