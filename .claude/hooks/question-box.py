#!/usr/bin/env python3
"""Stop hook: a reply that ends on a question to Chadwick puts it in the box, the last thing in
the reply, one question in three quote lines:
    > **Your call:** <the question>
    > **Why it matters:** <what changes for his work>
    > **My pick:** <the answer and its reason>
Added 21 Oct 2026 (Chadwick: "there's like so much text to sort through, and then there's like this
question at the end without any context"). A reply with no question passes; a choice between set
options goes in the question card (AskUserQuestion), which this hook does not see. Waiver: a last
line containing "box: unmet (<reason>)". Same rule as rule 8 in the Mondai repo's turn-check.sh.
Exit 2 blocks with the reason on stderr; any failure to read the transcript exits 0.
Test: python3 .claude/hooks/tests/question-box-cases.py"""
import json, re, sys

def main():
    try: path = json.load(sys.stdin).get("transcript_path", "")
    except Exception: return 0
    if len(sys.argv) > 2 and sys.argv[1] == "--file": path = sys.argv[2]
    try: rows = [json.loads(l) for l in open(path, encoding="utf-8", errors="ignore") if l.strip()]
    except Exception: return 0
    last_text = ""
    for r in rows:
        if r.get("type") != "assistant" or r.get("isSidechain"): continue
        for b in (r.get("message") or {}).get("content") or []:
            if isinstance(b, dict) and b.get("type") == "text" and b.get("text", "").strip(): last_text = b["text"]
    lines = [re.sub(r"[*_`]", "", l.strip()) for l in last_text.strip().splitlines() if l.strip()]
    if not lines: return 0
    if re.search(r"box:\s*unmet\s*\(\s*[^)\s][^)]*\)", lines[-1], re.I): return 0
    body = lines[:-1] if re.match(r"^\[.*\]$", lines[-1]) else lines   # a footer line, if any
    run = []
    for l in reversed(body):
        if not l.startswith(">"): break
        run.insert(0, re.sub(r"^>\s*", "", l))
    box = run if any(re.match(r"your call\s*:", l, re.I) for l in run) else []
    bad = []
    if box:
        for lab in ("Your call", "Why it matters", "My pick"):
            if not any(re.match(lab + r"\s*:\s*\S", l, re.I) for l in box): bad.append("its '" + lab + ":' line is missing or empty")
        if " ".join(box).count("?") > 1: bad.append("it holds more than one question")
        if any(not re.match(r"(your call|why it matters|my pick)\s*:", l, re.I) for l in box): bad.append("it has lines beyond the three labels")
    else:
        tail = re.sub(r"^\s*(?:[-*>]\s*|\d+[.)]\s*)+", "", body[-1]) if body else ""
        if tail.rstrip().endswith("?"): bad.append("the reply ends on a question ('" + tail[-80:] + "') outside the box")
    if not bad: return 0
    print("BLOCKED by .claude/hooks/question-box.py: " + "; ".join(bad) + ". If the question is needed, make it the "
          "last thing in the reply, one question, as three quote lines: '> **Your call:** <question>', '> **Why it "
          "matters:** <what changes for his work>', '> **My pick:** <answer and reason>'. A choice between set options "
          "goes in the question card (AskUserQuestion), your pick first marked Recommended. If no question is needed, "
          "end on the answer. If it truly cannot be boxed, end with 'box: unmet (<reason>)'.", file=sys.stderr)
    return 2

if __name__ == "__main__": sys.exit(main())
