#!/usr/bin/env python3
"""Planted and clean replies for .claude/hooks/question-box.py. Each planted reply must block (exit 2)
and each clean one pass (exit 0). Run: python3 .claude/hooks/tests/question-box-cases.py"""
import json, os, subprocess, sys, tempfile
HOOK = os.path.join(os.path.dirname(__file__), "..", "question-box.py")
def BOX(q, why="It changes how the case study opens.", pick="Yes, because the hook lands first."):
    return "\n\n---\n\n> **Your call:** %s\n> **Why it matters:** %s\n> **My pick:** %s" % (q, why, pick)
def run(*texts):
    rows = [{"type": "user", "message": {"content": "check the hero"}}] + \
           [{"type": "assistant", "message": {"content": [{"type": "text", "text": t}]}} for t in texts]
    f = tempfile.NamedTemporaryFile("w", suffix=".jsonl", delete=False)
    f.write("\n".join(json.dumps(r) for r in rows)); f.close()
    rc = subprocess.run([sys.executable, HOOK], input=json.dumps({"transcript_path": f.name}), capture_output=True, text=True).returncode
    os.unlink(f.name); return rc
PLANTED = {
    "bare question at the end": "The hero leads with the outcome.\nShould the band move above the fold?",
    "bold question": "Two headlines drafted.\n\n**Which headline reads stronger?**",
    "question in a plain quote": "Two versions.\n> Which one?",
    "box missing why it matters": "Drafted.\n\n> **Your call:** Keep the band?\n> **My pick:** Keep it.",
    "box missing my pick": "Drafted.\n\n> **Your call:** Keep the band?\n> **Why it matters:** It sets the first read.",
    "box with two questions": "Drafted." + BOX("Keep the band? And move the hero?"),
    "box with extra lines": "Drafted." + BOX("Keep the band?") + "\n> Also three notes on the footer.",
    "question after the box": "Drafted." + BOX("Keep the band?") + "\nOr wait?",
    "question before a footer line": "Drafted.\nKeep the band?\n[skills: none]",
    "empty waiver": "Drafted.\nKeep the band?\n[box: unmet ()]",
}
CLEAN = {
    "no question": "The band now sits under the hero, so the outcome reads first.",
    "the box": "Two headlines drafted." + BOX("Should the hero lead with the outcome line?"),
    "the box before a footer line": "Drafted." + BOX("Keep the band?") + "\n[skills: about-page]",
    "question earlier, ends on a statement": "Why does the band repeat the title? It anchors the scroll. I kept it.",
    "quoted passage, no question": "His note on 3 Oct:\n> lead with the outcome",
    "honest waiver": "Quoting his question back.\nKeep the band?\n[box: unmet (quoting his own question back)]",
    "earlier reply asked, last reply states": ("Two drafts.\nWhich one?", "Set to draft A."),
}
bad = 0
for n, t in PLANTED.items():
    ok = run(t) == 2; bad += not ok; print(("caught  " if ok else "MISSED  ") + n)
for n, t in CLEAN.items():
    ok = run(*(t if isinstance(t, tuple) else (t,))) == 0; bad += not ok; print(("passed  " if ok else "FALSE   ") + n)
print("\n%d planted, %d clean, %d wrong" % (len(PLANTED), len(CLEAN), bad)); sys.exit(1 if bad else 0)
