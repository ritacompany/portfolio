#!/usr/bin/env python3
"""
One command that answers: can a rejected line reach a session again.

Run it:  python3 .claude/hooks/rejected-copy-audit.py

History this exists to stop. A document called about-record.md was injected into context by a
UserPromptSubmit hook on every single turn, in both repos, from Sep 6 to Sep 7 2026. It carried
a "STILL REJECTED" list with the annotations, so every session read the rejected lines as part
of its standing instructions and reasoned from them. It was removed, but nothing checks that it
stays removed, and nothing checked the other ways a rejected line reaches a session.

Six gates. Any failure exits non-zero and says what to do.
"""
import json, os, re, subprocess, sys, tempfile

HERE  = os.path.dirname(os.path.abspath(__file__))
PORT  = os.path.dirname(os.path.dirname(HERE))
MOND  = os.path.join(os.path.dirname(PORT), "mondai")
REPOS = [p for p in (PORT, MOND) if os.path.isdir(p)]

SKILL  = os.path.join(PORT, ".claude", "skills", "about-page", "SKILL.md")
LIST   = os.path.join(PORT, ".claude", "dead-claims.txt")
MANUAL = os.path.join(PORT, ".claude", "dead-claims-manual.txt")
HOOK   = os.path.join(PORT, ".claude", "hooks", "dead-claim-check.sh")

MARKER = re.compile(
    r"reject|\bdead\b|killed|retract|never reintroduce|not a candidate|struck|"
    r"no longer|was wrong|cut from|blocked|do not reintroduce|do not re-offer", re.I)

SKIP_DIRS  = {".git", "node_modules", "dist", "build", ".unlazy", ".remember",
              ".playwright-cli", "output", ".handoff-review", "_evidence"}
SKIP_FILES = {"dead-claims.txt", "dead-claims-manual.txt", "HUMAN_CORPUS.txt",
              "CHADWICK_ONLY.txt", "rejected-copy-audit.py"}
SKIP_EXT   = {".png", ".jpg", ".jpeg", ".gif", ".pdf", ".woff", ".woff2", ".ttf",
              ".zip", ".mp4", ".ico", ".jsonl"}

fails, notes = [], []


def norm(t):
    for a, b in (("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'),
                 ("&rsquo;", "'"), ("&lsquo;", "'"), ("&ldquo;", '"'), ("&rdquo;", '"')):
        t = t.replace(a, b)
    return t


def section(text, heading):
    m = re.search(r"^#{2,4}\s+" + re.escape(heading) + r".*$", text, re.M)
    if not m:
        return ""
    start = m.end()
    nxt = re.search(r"^#{1,4}\s+|\n---\s*\n", text[start:], re.M)
    return text[start:start + nxt.start()] if nxt else text[start:]


# ---------------------------------------------------------------- G1 no injection
def g1():
    bad = []
    for r in REPOS:
        d = os.path.join(r, ".claude")
        for name in os.listdir(d) if os.path.isdir(d) else []:
            # .bak included on purpose. A backup that still carries the injection is a
            # loaded gun: restoring it puts the rejected list back into every prompt.
            if not re.match(r"settings.*\.json(\.bak)?$", name):
                continue
            try:
                cfg = json.load(open(os.path.join(d, name)))
            except Exception:
                continue
            for g in cfg.get("hooks", {}).get("UserPromptSubmit", []):
                for h in g.get("hooks", []):
                    if re.search(r"about-record|now\.md|about-page|superpower", h.get("command", "")):
                        bad.append("%s/%s injects %s" % (r, name, h["command"]))
        for f in ("about-record.md", "now.md"):
            if os.path.exists(os.path.join(d, f)):
                bad.append("%s/.claude/%s is back on disk" % (r, f))
    return ("no record document is injected into every prompt", bad,
            "Delete the file, or strip that hook. This is the one that caused the loop.")


# ------------------------------------------------------- G2 every rejection is blocked
def g2():
    src = norm(open(SKILL, encoding="utf-8").read())
    quoted = []
    for h in ("Rejected copy", "Killed. Never reintroduce."):
        body = re.sub(r"\s+", " ", section(src, h))
        quoted += [q.strip().rstrip(".").strip() for q in re.findall(r'"([^"]{6,}?)"', body)]
    blocked = {norm(l).strip().lower() for l in open(LIST, encoding="utf-8")
               if l.strip() and not l.startswith("#")}
    exempt = {norm(l).strip()[1:].strip().lower() for l in open(MANUAL, encoding="utf-8")
              if l.strip().startswith("-")}
    missing = [q for q in quoted if q.lower() not in blocked and q.lower() not in exempt]
    if exempt:
        notes.append("exempt on purpose, not blocked: " + ", ".join(sorted(exempt)))
    return ("every line he rejected is in the block list", missing,
            "Rebuild it: python3 .claude/hooks/build-dead-claims.py")


# ------------------------------------------------------- G3 the block actually fires
def g3():
    src = norm(open(SKILL, encoding="utf-8").read())
    body = re.sub(r"\s+", " ", section(src, "Rejected copy"))
    picks = [q for q in re.findall(r'"([^"]{20,}?)"', body)][:3]
    bad = []
    for phrase in picks:
        with tempfile.NamedTemporaryFile("w", suffix=".jsonl", delete=False) as t:
            t.write(json.dumps({"type": "assistant", "message": {"content": [
                {"type": "text", "text": "Slot two could be %s." % phrase}]}}) + "\n")
            path = t.name
        p = subprocess.run(["bash", HOOK], input=json.dumps({"transcript_path": path}),
                           capture_output=True, text=True,
                           env={**os.environ, "CLAUDE_PROJECT_DIR": PORT})
        os.unlink(path)
        if p.returncode != 2:
            bad.append("asserting %r finished cleanly, exit %d" % (phrase, p.returncode))
    # negative control. A check that blocks everything is not a check.
    with tempfile.NamedTemporaryFile("w", suffix=".jsonl", delete=False) as t:
        t.write(json.dumps({"type": "assistant", "message": {"content": [
            {"type": "text", "text": "An eye for the second thing a decision does."}]}}) + "\n")
        path = t.name
    p = subprocess.run(["bash", HOOK], input=json.dumps({"transcript_path": path}),
                       capture_output=True, text=True,
                       env={**os.environ, "CLAUDE_PROJECT_DIR": PORT})
    os.unlink(path)
    if p.returncode != 0:
        bad.append("negative control blocked, the check fires on clean copy")
    return ("the block fires on a real rejection and not on clean copy", bad,
            "Look at .claude/hooks/dead-claim-check.sh")


# ------------------------------------------- G4 registered where every session sees it
def g4():
    bad = []
    shared = os.path.join(PORT, ".claude", "settings.json")
    cfg = json.load(open(shared))
    if not any("dead-claim-check" in json.dumps(g) for g in cfg.get("hooks", {}).get("Stop", [])):
        bad.append("not registered in the shared settings, so it only runs on this machine")
    return ("the check is shared, not machine local", bad,
            "Move the Stop hook into .claude/settings.json")


# --------------------------------- G5 nothing presents a rejected line as a live option
def g5():
    phrases = [norm(l).strip() for l in open(LIST, encoding="utf-8")
               if l.strip() and not l.startswith("#")]
    # only the ones that read as copy, not the retracted-finding paraphrases
    phrases = [p for p in phrases if len(p) > 24]
    bad = []
    for r in REPOS:
        for root, dirs, files in os.walk(r):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for fn in files:
                if fn in SKIP_FILES or os.path.splitext(fn)[1].lower() in SKIP_EXT:
                    continue
                fp = os.path.join(root, fn)
                try:
                    if os.path.getsize(fp) > 2_000_000:
                        continue
                    text = norm(open(fp, encoding="utf-8", errors="ignore").read())
                except Exception:
                    continue
                low = text.lower()
                for p in phrases:
                    i = low.find(p.lower())
                    while i != -1:
                        # The phrase itself is blanked out first. Several rejected lines
                        # contain a marker word ("kill my own good ideas"), and without this
                        # they vouch for themselves and the gate silently never fires.
                        window = (text[max(0, i - 500):i] + " " * len(p)
                                  + text[i + len(p):i + len(p) + 500])
                        if not MARKER.search(window):
                            bad.append("%s carries %r with nothing marking it dead"
                                       % (os.path.relpath(fp, os.path.dirname(r)), p))
                            break
                        i = low.find(p.lower(), i + 1)
    return ("no file offers a rejected line as a live option", sorted(set(bad)),
            "Mark it rejected in that file, or delete the line.")


# ------------------------------------------- G6 no stale second copy of the About list
def g6():
    bad = []
    m = os.path.join(MOND, ".claude", "dead-claims.txt")
    if os.path.exists(m):
        live = [l.strip() for l in open(m, encoding="utf-8")
                if l.strip() and not l.startswith("#")]
        if live:
            bad.append("the Mondai folder holds its own list of %d claims. About page work "
                       "does not happen there and a second copy can only contradict the "
                       "generated one." % len(live))
    return ("no rival copy of the About list", bad, "Empty it, keep the header.")


GATES = [g1, g2, g3, g4, g5, g6]

print("Rejected copy audit\n" + "=" * 60)
for i, g in enumerate(GATES, 1):
    name, bad, fix = g()
    if bad:
        fails.append(name)
        print("G%d  FAIL  %s" % (i, name))
        for b in bad:
            print("          %s" % b)
        print("          fix: %s" % fix)
    else:
        print("G%d  ok    %s" % (i, name))

for n in notes:
    print("\nnote: %s" % n)

print("=" * 60)
if fails:
    print("%d of %d gates failed. A rejected line can still reach a session." % (len(fails), len(GATES)))
    sys.exit(1)
print("All %d gates pass. Nothing on disk can put a rejected line back in front of a session." % len(GATES))
