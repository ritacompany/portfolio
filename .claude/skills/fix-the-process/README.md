# fix-the-process

A Claude Code skill for when something was built wrong, a step was skipped, or a problem came back. It makes Claude find the cause, fix it at the right layer, and prove the fix in a fresh run before saying "fixed". The instructions Claude follows are in SKILL.md.

## Where it lives

- **In a repo:** `.claude/skills/fix-the-process/`. Any Claude account that opens the repo in Claude Code gets the skill. The reminder hook is in the repo's `.claude/settings.json` under `UserPromptSubmit`.
- **For every project on one machine:** copy this folder to `~/.claude/skills/fix-the-process/`. Then add this to `~/.claude/settings.json` under `hooks.UserPromptSubmit`:
  `{"hooks":[{"type":"command","command":"node \"$HOME/.claude/skills/fix-the-process/hooks/remind.mjs\"","timeout":5}]}`

If both copies are installed, only the repo's hook fires.

## Check it works

```
node .claude/skills/fix-the-process/scripts/check-fix-record.mjs .claude/skills/fix-the-process/templates/FIX.md
```

This should report the blank template as incomplete. To test the hook, open a session and type a message such as "the export came out wrong again". Claude should load fix-the-process before it proposes a fix.

## Keeping copies in sync

The source copy is `~/.claude/skills/fix-the-process/` on Chadwick's main Mac. After changing it, copy the folder into each repo and commit.
