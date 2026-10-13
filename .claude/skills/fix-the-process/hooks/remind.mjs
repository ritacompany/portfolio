#!/usr/bin/env node
// UserPromptSubmit hook: when the prompt reports a failure, tell Claude to load fix-the-process.
// Reads the hook payload from stdin; prints JSON additionalContext only on a match. Never blocks.
import fs from 'node:fs';
import path from 'node:path';

// Installed both globally and in a project: let only the project copy speak, so the reminder appears once.
const projectCopy = process.env.CLAUDE_PROJECT_DIR
  && path.join(process.env.CLAUDE_PROJECT_DIR, '.claude/skills/fix-the-process/hooks/remind.mjs');
if (projectCopy && fs.existsSync(projectCopy) && fs.realpathSync(projectCopy) !== fs.realpathSync(process.argv[1])) process.exit(0);

let prompt = '';
try { prompt = JSON.parse(fs.readFileSync(0, 'utf8')).prompt ?? ''; } catch { process.exit(0); }
const p = prompt.toLowerCase();

const failure = /\b(skipp(ed|ing)|ignor(ed|ing)|didn'?t (work|do|follow|run|use)|did not (work|follow|run|use)|isn'?t working|not working|stopped working|broken|broke|messed up|built (it )?wrong|wrong (again|size|output|version)|came out wrong|keeps? (happening|doing|skipping|ignoring|forgetting)|forgot|left out|never (asked|ran|used)|still (not|doing|getting|wrong|broken)|again)\b/;
const target = /\b(process|workflow|step|rule|skill|hook|claude\.md|instruction|protocol|pipeline|draft|session|fix|export|build|built|prompt|template|output|layout|section|page|file|it)/;

if (failure.test(p) && target.test(p)) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: 'If this message reports that something went wrong (a skipped step, ignored instruction, wrong output, or a problem that came back), load the fix-the-process skill before proposing any fix: find the cause with evidence, fix it at the right layer, and verify with a fresh run. Do not answer with a new or stronger rule.',
    },
  }));
}
process.exit(0);
