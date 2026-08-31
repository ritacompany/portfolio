#!/usr/bin/env bash
# PreToolUse hook. Refuses any write to the primary evidence files.
# They carry quotes reproduced exactly as they were said. A tidied quote is
# no longer evidence, so an edit has to be reviewed, never done in passing.
set -uo pipefail

payload=$(cat)
tool=$(printf '%s' "$payload" | jq -r '.tool_name // empty')

PROTECTED='CS1-PRIMARY-EVIDENCE-VERBATIM\.md|02-EVIDENCE_1\.md'

# Shell operations that can modify a file. Read-only use (grep, cat, less) stays allowed.
WRITERS='>|\btee\b|\bsed\b[^|]*-[a-zA-Z]*i|\bperl\b[^|]*-[a-zA-Z]*i|\bpython[0-9.]*\b[^|]*-[a-zA-Z]*i|\bcp\b|\bmv\b|\brm\b|\btruncate\b|\bdd\b|\bpatch\b|\bgit\b +(apply|checkout|restore)|\binstall\b'

deny() {
  jq -n --arg r "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $r
    }
  }'
  exit 0
}

REASON='Blocked by the portfolio evidence guard. The primary evidence files are the
clean record of what was actually said and are not writable directly.

They reproduce quotes exactly, including typos and phrasing. Editing one in passing
destroys the only clean copy, and a tidied quote stops being evidence.

Do this instead:
1. Quote out of these files into whatever you are drafting. Never edit them to fit.
2. If something in them is genuinely wrong, say so and show the correction. Do not apply it.
3. Change them only with approval on record in this session.'

case "$tool" in
  Write|Edit|NotebookEdit)
    printf '%s' "$payload" | jq -r '.tool_input.file_path // empty' \
      | grep -qE "$PROTECTED" && deny "$REASON"
    ;;
  Bash)
    cmd=$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')
    # Strip heredoc bodies before matching. Writing an unrelated file whose text
    # merely names the archive is not an archive write, and blocking it here is a
    # dead end: the write never lands and the denial asks for approval on an edit
    # that was never being made. The redirect target stays on the command line,
    # so a heredoc writing into the archive is still caught.
    cmd=$(printf '%s\n' "$cmd" | awk '
      indoc {
        line = $0
        gsub(/^[ \t]+|[ \t]+$/, "", line)
        if (line == delim) indoc = 0
        next
      }
      {
        if (match($0, /<<-?[ \t]*[^ \t;|&<>()]+/)) {
          delim = substr($0, RSTART, RLENGTH)
          sub(/^<<-?[ \t]*/, "", delim)
          gsub(/[\047\042]/, "", delim)
          if (delim != "") indoc = 1
        }
        print
      }
    ')
    if printf '%s' "$cmd" | grep -qE "$PROTECTED" \
       && printf '%s' "$cmd" | grep -qE "$WRITERS"; then
      deny "$REASON

This shell command names a protected evidence file alongside an operation that can modify it.

If you are not writing to the archive at all, the guard is over-matching. Heredoc bodies are already exempt, so the usual causes are a quoted mention inside an inline write, or a read only command with a redirect. Either way, use the Write tool or a heredoc for the file you actually meant, or drop the redirect. Ask Chadwick to lift the guard only if you genuinely need to change the evidence."
    fi
    ;;
esac

exit 0
