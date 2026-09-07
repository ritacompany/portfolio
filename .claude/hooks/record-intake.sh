#!/bin/bash
# PreToolUse. Refuses to file an inference as one of Chadwick's decisions.
#
# The record has two halves. Part one is what he decided. Part two is what Claude
# worked out, carrying no authority. On Sep 6 a theory written at 2:52am was sitting
# in part one by 3:38am, ninety minutes after he had personally audited the file and
# deleted twelve of exactly that kind of entry.
#
# A convention cannot stop that, because a convention is advice to the step that was
# never the broken part. This runs whether or not anyone remembers it.
#
# What it does: any line being ADDED to part one has to trace to something he actually
# said in this session. Four consecutive content words in common is enough. Part two is
# unrestricted, because that half is already labelled as carrying no authority.

set -uo pipefail
payload=$(cat)

python3 - "$payload" <<'PY'
import json, sys, re, os

try:
    d = json.loads(sys.argv[1])
except Exception:
    sys.exit(0)

tool = d.get("tool_name", "")
if tool not in ("Write", "Edit", "MultiEdit"):
    sys.exit(0)

ti = d.get("tool_input") or {}
path = ti.get("file_path", "")
if "skills/about-page" not in path:
    sys.exit(0)

# The text this call would introduce.
added = ti.get("new_string") or ti.get("content") or ""
if not added.strip():
    sys.exit(0)

# Where does it land? Only part one is governed. A Write carries the whole file, so
# read the part one body out of the proposed content. An Edit carries a fragment, so
# decide from the file on disk which half the fragment is going into.
def part_one_of(text):
    m = re.search(r"##\s*PART ONE(.*?)(?=##\s*PART TWO|\Z)", text, re.S | re.I)
    return m.group(1) if m else ""

if ti.get("content"):
    governed = part_one_of(added)
else:
    old = ti.get("old_string", "")
    try:
        current = open(path, encoding="utf-8").read()
    except Exception:
        current = ""
    p1 = part_one_of(current)
    governed = added if (old and old in p1) or (not old and not current) else ""
    # An edit that inserts into part one without anchoring there is still governed
    # if the file has no part two yet.
    if not governed and "PART TWO" not in current:
        governed = added

if not governed.strip():
    sys.exit(0)

# What he said in this session.
tp = d.get("transcript_path", "")
said = []
if tp and os.path.exists(tp):
    for line in open(tp, encoding="utf-8", errors="ignore"):
        line = line.strip()
        if not line:
            continue
        try:
            r = json.loads(line)
        except Exception:
            continue
        if r.get("type") != "user":
            continue
        c = (r.get("message") or {}).get("content")
        t = ""
        if isinstance(c, str):
            t = c
        elif isinstance(c, list):
            t = " ".join(b.get("text", "") for b in c
                         if isinstance(b, dict) and b.get("type") == "text")
        t = t.strip()
        # Hook output and skill loads are not him talking.
        if not t or t.startswith("<") or t.startswith("Base directory for this skill"):
            continue
        said.append(t)
his = " \n ".join(said).lower()

STOP = set("""a an the and or but if then of to in on for with as is are was were be been
being it its this that these those he him his i my me you your we our not no never always
do does did done can could should would may might must at by from into over under about
only same other more most some any all one two three four five it's dont don't""".split())

def words(s):
    return [x for x in re.findall(r"[a-z][a-z'\-]+", s.lower()) if x not in STOP]

his_words = set(words(his))

# Only judge text this call actually introduces. An Edit's new_string carries the
# unchanged anchor along with the addition, and judging the anchor would block edits
# for lines that were already there and already approved.
old_lines = {l.strip() for l in (ti.get("old_string", "") or "").splitlines()}

unsupported = []
for raw in governed.splitlines():
    line = raw.strip()
    if not line or line in old_lines:
        continue          # unchanged, not being added
    if line.startswith("#") or line.startswith(">"):
        continue          # headings, and his verbatim quotes, are not claims being added
    line = re.sub(r"^[-*\d.]+\s*", "", line)
    w = words(line)
    if len(w) < 5:
        continue          # too short to judge, and rarely a smuggled theory
    hit = [x for x in w if x in his_words]
    # Paraphrasing his ruling keeps most of its nouns. An invented theory shares almost
    # none, because it is about something he never raised.
    if len(hit) < 3 or len(hit) / len(w) < 0.4:
        unsupported.append(line[:150])

if not unsupported:
    sys.exit(0)

reason = (
    "Blocked by the record intake check.\n\n"
    "These lines are going into PART ONE, the half of the record that says Chadwick "
    "decided it, but nothing he has said in this session supports them:\n\n"
    + "\n".join("  - " + u for u in unsupported[:6])
    + "\n\nPart one is his rulings only. If this is your reasoning, it belongs in PART TWO, "
      "which is labelled as carrying no authority and is not restricted. If he did decide it, "
      "put it in his words, or quote him with a blockquote, which this check does not touch."
)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": reason,
    }
}))
PY
exit 0
