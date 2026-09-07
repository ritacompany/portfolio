# GATES

Task: make the intake check hold, not just pass the friendly cases it was built against.
Each gate is an attack. A gate is met when the attack fails.

Harness: `node .claude/hooks/intake-probe.mjs <attack>`. G6 exists so the harness cannot
certify a hook that does nothing.

- [x] G1: A shell heredoc write cannot smuggle a theory into part one.
    CHECK: node .claude/hooks/intake-probe.mjs bash-heredoc
    EXPECT: ^G1 BLOCKED$
    EVIDENCE: G1 BLOCKED. Was ALLOWED before the fix, so this attack was live.

- [x] G2: A payload with no transcript is refused rather than waved through.
    CHECK: node .claude/hooks/intake-probe.mjs no-transcript
    EXPECT: ^G2 BLOCKED$
    EVIDENCE: G2 BLOCKED, correct before the other fixes as well.

- [x] G3: Removing the PART ONE heading does not create an unguarded file.
    CHECK: node .claude/hooks/intake-probe.mjs heading-removed
    EXPECT: ^G3 BLOCKED$
    EVIDENCE: G3 BLOCKED. Was ALLOWED before.

- [x] G4: A theory padded with his vocabulary is still caught.
    CHECK: node .claude/hooks/intake-probe.mjs padded-theory
    EXPECT: ^G4 BLOCKED$
    EVIDENCE: G4 BLOCKED. Was ALLOWED before, because padding lifted the proportional score.
    Four consecutive words he never used now condemn a line on their own.

- [x] G5: The seven original controls still behave, negative controls included.
    CHECK: node .claude/hooks/intake-probe.mjs regression
    EXPECT: ^G5 OK 7/7$
    EVIDENCE: G5 OK 7/7. Three of the seven must be ALLOWED, so a hook that denied
    everything would score 4/7 rather than look successful.

- [x] G6: The harness itself can fail.
    CHECK: node .claude/hooks/intake-probe.mjs self-test
    EXPECT: ^G6 OK harness detects a permissive hook$
    EVIDENCE: G6 OK. Every attack is run against a stub that always allows, and the harness
    reports all of them as leaking.

- [x] G7: The About record cannot be injected on every turn again in either repo.
    CHECK: node .claude/hooks/intake-probe.mjs no-injection
    EXPECT: ^G7 OK no record injection in either repo$
    EVIDENCE: G7 OK.

- [x] G8: MultiEdit cannot bypass the check.
    CHECK: node .claude/hooks/intake-probe.mjs regression
    EXPECT: ^G5 OK 7/7$
    EVIDENCE: MultiEdit carries its text in an edits array rather than new_string, so the
    check read nothing and exited clean. Verified live both ways after the fix: a theory
    through MultiEdit is BLOCKED, his real ruling through MultiEdit is ALLOWED.

- [x] G9: The guard covers sessions opened outside the portfolio folder.
    CHECK: node -e "const c=require('fs').readFileSync(process.env.HOME+'/.claude/settings.json','utf8');const h=JSON.parse(c).hooks?.PreToolUse??[];process.stdout.write(h.some(g=>g.hooks.some(x=>/record-intake/.test(x.command)))?'G9 OK global\n':'G9 FAIL\n')"
    EXPECT: ^G9 OK global$
    EVIDENCE: Proven live rather than by config inspection alone. From a session running in
    the Mondai repo, an Edit adding the real Sep 6 band line to part one of the record was
    refused by this hook. That is the exact scenario the gate describes, and the file was
    left unchanged.

- [x] G10: The shell branch refuses writes without refusing reads.
    CHECK: node .claude/hooks/intake-probe.mjs shell
    EXPECT: ^G10 OK 14/14$
    EVIDENCE: G10 OK 14/14. Six writes refused, eight reads allowed. Found by the guard
    blocking two of my own read-only commands: one merged stderr, one printed an arrow
    inside a quoted string. The check now matches the shape of a write to this file rather
    than the presence of a writing character anywhere in the command, and copying the record
    out to a backup is treated as the read it is.
