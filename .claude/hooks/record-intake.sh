#!/bin/bash
# PreToolUse. Refuses to file an inference as one of Chadwick's decisions.
#
# The record has two halves. Part one is what he decided. Part two is what Claude worked
# out, carrying no authority. On Sep 6 a theory written at 2:52am was sitting in part one
# by 3:38am, ninety minutes after he had personally audited the file and deleted twelve
# entries of exactly that kind.
#
# A convention cannot stop that, because a convention is advice to the step that was never
# the broken part. This runs whether or not anyone remembers it.
#
# Any line being ADDED to part one has to trace to something he said in this session.
# Part two is unrestricted, because that half already declares it carries no authority,
# and a blockquote of his words is never questioned.
#
# Attacks this closes, each with a probe in intake-probe.mjs:
#   a shell heredoc writing the file behind the tool's back
#   a payload arriving with no transcript to check against
#   an edit that removes the headings and takes the guarded section with them
#   a theory padded with his vocabulary to lift its overlap score

set -uo pipefail
payload=$(cat)

python3 - "$payload" <<'PY'
import json, sys, re, os

def deny(reason):
    print(json.dumps({"hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": reason}}))
    sys.exit(0)

try:
    d = json.loads(sys.argv[1])
except Exception:
    sys.exit(0)

tool = d.get("tool_name", "")
ti = d.get("tool_input") or {}
TARGET = "skills/about-page"

# A shell write goes around the inspection entirely, so it is refused outright and
# redirected to the edit tools, where the rest of this check can actually see the text.
if tool == "Bash":
    cmd = ti.get("command", "")
    WRITERS = r">|\btee\b|\bsed\b[^|]*-[a-zA-Z]*i|\bperl\b[^|]*-[a-zA-Z]*i|\bcp\b|\bmv\b|\brm\b|\btruncate\b|\bdd\b|\bpatch\b|\binstall\b"
    if TARGET in cmd and re.search(WRITERS, cmd):
        deny("Blocked by the record intake check.\n\n"
             "This writes the About record from the shell, which goes around the check that "
             "keeps inferences out of his rulings.\n\n"
             "Use Edit or Write on the file instead. Reading it from the shell is fine.")
    sys.exit(0)

if tool not in ("Write", "Edit", "MultiEdit"):
    sys.exit(0)

path = ti.get("file_path", "")
if TARGET not in path:
    sys.exit(0)

# MultiEdit carries its text in an edits array rather than in new_string, so reading only
# new_string let a whole class of writes past without ever being looked at.
edits = ti.get("edits") or []
if edits:
    added = "\n".join(e.get("new_string", "") for e in edits if isinstance(e, dict))
    prior = "\n".join(e.get("old_string", "") for e in edits if isinstance(e, dict))
else:
    added = ti.get("new_string") or ti.get("content") or ""
    prior = ti.get("old_string", "") or ""

if not added.strip():
    sys.exit(0)

try:
    current = open(path, encoding="utf-8").read()
except Exception:
    current = ""

def part_one_of(text):
    m = re.search(r"##\s*PART ONE(.*?)(?=##\s*PART TWO|\Z)", text, re.S | re.I)
    return m.group(1) if m else None

# Losing the headings is losing the guard, so a write that removes them from a file that
# had them is refused. A file that never had them is governed in full rather than skipped,
# which is what previously let a heading-free rewrite through untouched.
if ti.get("content"):
    proposed = part_one_of(added)
    if part_one_of(current) is not None and proposed is None:
        deny("Blocked by the record intake check.\n\n"
             "This rewrite removes the PART ONE and PART TWO headings. Those headings are what "
             "separates his decisions from your reasoning, and the check that enforces the split "
             "keys off them.\n\nKeep both headings. If the structure genuinely needs to change, "
             "ask him first.")
    governed = proposed if proposed is not None else added
else:
    old = prior
    p1 = part_one_of(current)
    if p1 is None:
        governed = added
    elif (old and old in p1) or not old:
        governed = added
    else:
        governed = ""

if not governed.strip():
    sys.exit(0)

# What he said in this session. No transcript means nothing can be corroborated, so the
# safe answer is refusal rather than a silent pass.
tp = d.get("transcript_path", "")
if not tp or not os.path.exists(tp):
    deny("Blocked by the record intake check.\n\n"
         "There is no session transcript available, so nothing added to his half of the record "
         "can be checked against what he actually said.\n\n"
         "Put the addition in PART TWO, which is unrestricted, or quote him with a blockquote.")

said = []
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
old_lines = {l.strip() for l in prior.splitlines()}

def longest_unsupported_run(ws):
    best = run = 0
    for w in ws:
        run = 0 if w in his_words else run + 1
        best = max(best, run)
    return best

unsupported = []
for raw in governed.splitlines():
    line = raw.strip()
    if not line or line in old_lines:
        continue                       # unchanged, not being added
    if line.startswith("#") or line.startswith(">"):
        continue                       # headings, and his verbatim quotes
    line = re.sub(r"^[-*\d.]+\s*", "", line)
    w = words(line)
    if len(w) < 5:
        continue                       # too short to judge
    hit = [x for x in w if x in his_words]
    thin = len(hit) < 3 or len(hit) / len(w) < 0.4
    # Padding a theory with his vocabulary lifts the ratio, so a stretch of consecutive
    # words he never used condemns the line on its own regardless of what surrounds it.
    smuggled = longest_unsupported_run(w) >= 4
    if thin or smuggled:
        unsupported.append(line[:150])

if not unsupported:
    sys.exit(0)

deny("Blocked by the record intake check.\n\n"
     "These lines are going into PART ONE, the half of the record that says Chadwick decided "
     "it, but nothing he has said in this session supports them:\n\n"
     + "\n".join("  - " + u for u in unsupported[:6])
     + "\n\nPart one is his rulings only. If this is your reasoning, it belongs in PART TWO, "
       "which is labelled as carrying no authority and is not restricted. If he did decide it, "
       "put it in his words, or quote him with a blockquote, which this check does not touch.")
PY
exit 0
