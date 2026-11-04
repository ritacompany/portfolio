#!/usr/bin/env bash
# PostToolUse hook. Checks newly written prose against the Mondai copy rules.
# Only inspects the text this edit introduced, never pre-existing file content,
# so legacy violations elsewhere in a file do not fire on an unrelated edit.
set -uo pipefail

payload=$(cat)

if [ "$(printf '%s' "$payload" | jq -r '.tool_name // empty')" = Bash ]; then
  # A shell command can write prose too (printf or a heredoc into a file, sed -i). Find the prose
  # files it wrote, then read what landed: the lines git sees as added, or the whole file if new.
  cmd=$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')
  cwd=$(printf '%s' "$payload" | jq -r '.cwd // empty'); [ -n "$cwd" ] && cd "$cwd" 2>/dev/null
  ext='[^[:space:]'"'"'";|&<>()]+\.(md|markdown|html|txt)'
  targets=$(printf '%s' "$cmd" | grep -oE "(>>?|tee( -a)?)[[:space:]]*['\"]?$ext" | sed -E "s/^(>>?|tee( -a)?)[[:space:]]*['\"]?//")
  if printf '%s' "$cmd" | grep -qE '\b(sed|perl)\b[^|]*-[a-zA-Z]*i'; then
    targets="$targets"$'\n'$(printf '%s' "$cmd" | grep -oE "$ext")
  fi
  file=""; written=""
  while IFS= read -r t; do
    [ -n "$t" ] && [ -f "$t" ] || continue
    if git ls-files --error-unmatch -- "$t" >/dev/null 2>&1; then
      added=$(git diff -U0 -- "$t" | grep '^+' | grep -v '^+++' | cut -c2-)
    else
      added=$(cat -- "$t")
    fi
    [ -n "$added" ] || continue
    file="${file:+$file, }$t"; written="$written"$'\n'"$added"
  done <<< "$(printf '%s\n' "$targets" | sort -u)"
  [ -n "$written" ] || exit 0
else
  file=$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_response.filePath // empty')

  [ -n "$file" ] || exit 0

  case "$file" in
    *.md|*.markdown|*.html|*.txt) ;;
    *) exit 0 ;;
  esac

  # Write sends .content, Edit sends .new_string. Anything else is not prose we wrote.
  written=$(printf '%s' "$payload" | jq -r '.tool_input.new_string // .tool_input.content // empty')
  [ -n "$written" ] || exit 0
fi

# Reduce the text to prose we authored, dropping everything the rule does not govern:
#   fenced blocks and inline code, so documented CLI flags are not read as dashes
#   blockquotes, which carry verbatim evidence we must preserve exactly as said
#   URLs, whose slugs legitimately contain double hyphens
#   structural markdown: rules, frontmatter delimiters, setext underlines, table separators
prose=$(printf '%s\n' "$written" | awk '
  /^[[:space:]]*```/                   { infence = !infence; next }
  infence                              { next }
  /<\/style>/                          { instyle = 0; next }
  /<style/                             { instyle = 1; next }
  instyle                              { next }
  /<\/script>/                         { inscript = 0; next }
  /<script/                            { inscript = 1; next }
  inscript                             { next }
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
