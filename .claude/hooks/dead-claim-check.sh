#!/bin/bash
# Blocks Claude from finishing a turn in which it ASSERTS a claim already known to be false.
#
# Why this exists: the failure is not bad reasoning, it is reasoning correctly from whatever
# text happens to be nearest to hand. A rule cannot fix that, because a rule is advice to the
# reasoning step, which was never the broken part. This fires whether or not Claude remembers.
#
# Discussing a dead claim is allowed. The check looks for a retraction marker in the same
# paragraph. Saying "that claim was retracted" passes. Saying it as fact does not.

INPUT=$(cat)
LIST="$CLAUDE_PROJECT_DIR/.claude/dead-claims.txt"

# Rebuild from the about-page skill first. The list used to be maintained by hand next to
# the record of what he rejected, and the two drifted until the block list contained none
# of his rejections. Regenerating every time means there is nothing left to keep in sync.
python3 "$CLAUDE_PROJECT_DIR/.claude/hooks/build-dead-claims.py" 2>/dev/null

[ -f "$LIST" ] || exit 0

TRANSCRIPT=$(printf '%s' "$INPUT" | python3 -c "import json,sys; print(json.load(sys.stdin).get('transcript_path',''))" 2>/dev/null)
[ -f "$TRANSCRIPT" ] || exit 0

python3 - "$TRANSCRIPT" "$LIST" <<'PY'
import json, sys, re

transcript, listfile = sys.argv[1], sys.argv[2]

# last assistant text in the transcript
last = ""
try:
    for line in open(transcript, encoding="utf-8", errors="ignore"):
        line = line.strip()
        if not line: continue
        try: r = json.loads(line)
        except: continue
        if r.get("type") != "assistant": continue
        c = (r.get("message") or {}).get("content")
        if isinstance(c, list):
            t = " ".join(b.get("text","") for b in c if isinstance(b, dict) and b.get("type") == "text")
            if t.strip(): last = t
except Exception:
    sys.exit(0)

if not last.strip():
    sys.exit(0)

def norm(t):
    # Curly and straight punctuation are the same phrase. Without this, retyping a dead
    # line with a typographic apostrophe walks straight through the check.
    for a, b in (("\u2019", "'"), ("\u2018", "'"), ("\u201c", '"'), ("\u201d", '"')):
        t = t.replace(a, b)
    return t

phrases = [norm(l).strip() for l in open(listfile, encoding="utf-8")
           if l.strip() and not l.startswith("#")]

# a mention is allowed when the same paragraph marks it as dead
RETRACTED = re.compile(
    r"retract|\bdead\b|\bfalse\b|not true|was wrong|no longer|never true|"
    r"do not reintroduce|known to be false|already killed|cut from|blocked",
    re.I)

hits = []
for para in re.split(r"\n\s*\n", norm(last)):
    for p in phrases:
        if p.lower() in para.lower() and not RETRACTED.search(para):
            hits.append(p)

if hits:
    uniq = sorted(set(hits))
    print("BLOCKED. This response asserts something Chadwick already rejected, or a claim", file=sys.stderr)
    print("recorded as false:", file=sys.stderr)
    for h in uniq:
        print(f"  - {h}", file=sys.stderr)
    print("", file=sys.stderr)
    print("Either the sentence comes out, or you say explicitly that it is dead and why you "
          "are raising it. Do not reword it and try again, the rejection is of the idea. "
          "If it is genuinely revived, he has to un-reject it in the about-page skill "
          "(Rejected copy or Killed); .claude/dead-claims.txt is generated from there and "
          "editing it directly does nothing.", file=sys.stderr)
    sys.exit(2)   # exit 2 blocks and returns stderr to Claude

sys.exit(0)
PY
