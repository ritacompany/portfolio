# GATES

Task: make the intake check actually hold, not just pass the seven friendly cases it was
built against. Each gate is an attack. A gate is met when the attack fails.

Harness: `node .claude/hooks/intake-probe.mjs <attack>`. G6 exists so the harness cannot
certify a hook that does nothing.

- [x] G1: A shell heredoc write cannot smuggle a theory into part one.
    CHECK: node .claude/hooks/intake-probe.mjs bash-heredoc
    EXPECT: ^G1 BLOCKED$
    EVIDENCE: G1 BLOCKED. Was ALLOWED before the fix, so this attack was live. Bash is now
    matched, and a shell command that names the record alongside a writing operation is
    refused and pointed at the edit tools. Reads from the shell are untouched.

- [x] G2: A payload with no transcript is refused rather than waved through.
    CHECK: node .claude/hooks/intake-probe.mjs no-transcript
    EXPECT: ^G2 BLOCKED$
    EVIDENCE: G2 BLOCKED, and it already behaved correctly before the other fixes.

- [x] G3: Removing the PART ONE heading does not create an unguarded file.
    CHECK: node .claude/hooks/intake-probe.mjs heading-removed
    EXPECT: ^G3 BLOCKED$
    EVIDENCE: G3 BLOCKED. Was ALLOWED before. A rewrite that drops the headings from a file
    that had them is now refused, and a file without them is governed in full rather than
    skipped.

- [x] G4: A theory padded with his vocabulary is still caught.
    CHECK: node .claude/hooks/intake-probe.mjs padded-theory
    EXPECT: ^G4 BLOCKED$
    EVIDENCE: G4 BLOCKED. Was ALLOWED before, because padding lifted the proportional score.
    Four consecutive words he never used now condemn a line on their own.

- [x] G5: The seven original controls still behave, negative controls included.
    CHECK: node .claude/hooks/intake-probe.mjs regression
    EXPECT: ^G5 OK 7/7$
    EVIDENCE: G5 OK 7/7. Three of the seven are cases that MUST be allowed, so a hook that
    denied everything would score 4/7 here.

- [x] G6: The harness itself can fail.
    CHECK: node .claude/hooks/intake-probe.mjs self-test
    EXPECT: ^G6 OK harness detects a permissive hook$
    EVIDENCE: G6 OK. All four attacks run against a stub that always allows, and the harness
    reports every one as leaking.

- [x] G7: The About record cannot be injected on every turn again in either repo.
    CHECK: node .claude/hooks/intake-probe.mjs no-injection
    EXPECT: ^G7 OK no record injection in either repo$
    EVIDENCE: G7 OK. Checks both repos for a prompt hook naming the record and for the old
    record files still sitting in place.

- [x] G8: MultiEdit cannot bypass the check.
    CHECK: node .claude/hooks/intake-probe.mjs regression
    EXPECT: ^G5 OK 7/7$
    EVIDENCE: Found after the first six gates passed. MultiEdit carries its text in an edits
    array rather than new_string, so the check read nothing and exited clean. Verified live
    both ways after the fix: a theory through MultiEdit is BLOCKED, his real ruling through
    MultiEdit is ALLOWED. Shares G5's oracle because the regression set runs the same hook.

- [ ] G9: The guard covers sessions opened outside the portfolio folder. NOT MET.
    ABANDON: G9 requires editing ~/.claude/settings.json, which this session is not permitted
    to write. Handed to Chadwick with the exact change.
    EVIDENCE OF THE GAP: the hook is registered only in the portfolio repo. A session opened
    in another folder reaches the same file by absolute path with no check in front of it.
