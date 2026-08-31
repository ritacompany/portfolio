#!/usr/bin/env bash
# PostToolUse hook. Checks newly written prose against the Mondai copy rules.
# Only inspects the text this edit introduced, never pre-existing file content,
# so legacy violations elsewhere in a file do not fire on an unrelated edit.
set -uo pipefail

payload=$(cat)
file=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_response.filePath // empty')

[ -n "$file" ] || exit 0

case "$file" in
  *.md|*.markdown|*.html|*.txt) ;;
  *) exit 0 ;;
esac

# Write sends .content, Edit sends .new_string. Anything else is not prose we wrote.
written=$(printf '%s' "$payload" | jq -r '.tool_input.new_string // .tool_input.content // empty')
[ -n "$written" ] || exit 0

# Reduce the text to prose we authored, dropping everything the rule does not govern:
#   fenced blocks and inline code, so documented CLI flags are not read as dashes
#   blockquotes, which carry verbatim evidence we must preserve exactly as said
#   URLs, whose slugs legitimately contain double hyphens
#   structural markdown: rules, frontmatter delimiters, setext underlines, table separators
prose=$(printf '%s\n' "$written" | awk '
  /^[[:space:]]*```/                   { infence = !infence; next }
  infence                              { next }
  /^[[:space:]]*>/                     { next }
  /^[[:space:]]*[-=|: ]+[[:space:]]*$/ { next }
                                       { gsub(/`[^`]*`/, "")
                                         gsub(/https?:\/\/[^ )>"'"'"']+/, "")
                                         print }
')

# Em and en dashes are never valid. Two hyphens count only as an exact pair,
# so a longer run of hyphens is treated as structure rather than punctuation.
dashes=$(printf '%s\n' "$prose" | grep -E -e '—|–' -e '(^|[^-])--([^-]|$)' | head -10)

[ -n "$dashes" ] || exit 0

jq -n --arg f "$file" --arg d "$dashes" '{
  decision: "block",
  reason: ("Mondai copy rule: em dash, en dash or two hyphens in new text written to " + $f
           + ".\nRewrite the sentence. Do not substitute another dash.\n\n" + $d)
}'
exit 0
