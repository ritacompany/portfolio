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

phrases = [l.strip() for l in open(listfile, encoding="utf-8")
           if l.strip() and not l.startswith("#")]

# a mention is allowed when the same paragraph marks it as dead
RETRACTED = re.compile(
    r"retract|\bdead\b|\bfalse\b|not true|was wrong|no longer|never true|"
    r"do not reintroduce|known to be false|already killed|cut from|blocked",
    re.I)

hits = []
for para in re.split(r"\n\s*\n", last):
    for p in phrases:
        if p.lower() in para.lower() and not RETRACTED.search(para):
            hits.append(p)

if hits:
    uniq = sorted(set(hits))
    print("BLOCKED. This response asserts something recorded as false:", file=sys.stderr)
    for h in uniq:
        print(f"  - {h}", file=sys.stderr)
    print("", file=sys.stderr)
    print("It is in .claude/dead-claims.txt. Either it is genuinely false and the sentence "
          "comes out, or you have new evidence, in which case say so explicitly and remove "
          "the line from that file.", file=sys.stderr)
    sys.exit(2)   # exit 2 blocks and returns stderr to Claude

sys.exit(0)
PY
