#!/usr/bin/env python3
"""
Generates .claude/dead-claims.txt. Do not edit that file by hand.

Why this exists: the block list and the record of what Chadwick rejected were two lists
maintained separately, and they drifted. Every phrase in the block list came from the Killed
list in part two, which is Claude's own bad ideas. Not one came from the Rejected copy list
in part one, which is his. His list is the one that regenerates, and it was the one nothing
was watching.

Now there is no second list to keep in sync. Anything quoted under "Rejected copy" or
"Killed" in the about-page skill is blocked from the moment it is written there.

Sources:
  .claude/skills/about-page/SKILL.md   quoted phrases under Rejected copy and Killed
  .claude/dead-claims-manual.txt       extra phrases, and exemptions prefixed with -
Output:
  .claude/dead-claims.txt
"""
import os, re, sys

root = os.environ.get("CLAUDE_PROJECT_DIR") or os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

skill  = os.path.join(root, ".claude", "skills", "about-page", "SKILL.md")
manual = os.path.join(root, ".claude", "dead-claims-manual.txt")
out    = os.path.join(root, ".claude", "dead-claims.txt")


def norm(s):
    for a, b in (("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'),
                 ("&rsquo;", "'"), ("&lsquo;", "'"), ("&ldquo;", '"'), ("&rdquo;", '"')):
        s = s.replace(a, b)
    return s


def section(text, heading):
    """Body of a section, up to the next heading or horizontal rule."""
    m = re.search(r"^#{2,4}\s+" + re.escape(heading) + r".*$", text, re.M)
    if not m:
        return ""
    start = m.end()
    nxt = re.search(r"^#{1,4}\s+|\n---\s*\n", text[start:], re.M)
    return text[start:start + nxt.start()] if nxt else text[start:]


phrases = []
if os.path.exists(skill):
    src = norm(open(skill, encoding="utf-8").read())
    for heading in ("Rejected copy", "Killed. Never reintroduce."):
        # Collapsed to one line first. These lists are hand wrapped, so a quoted phrase
        # regularly straddles a line break and would otherwise be missed silently.
        body = re.sub(r"\s+", " ", section(src, heading))
        # Unquoted entries in these lists are categories, not copy. A category cannot be
        # string matched without firing on ordinary sentences, so only quoted lines are taken.
        for q in re.findall(r'"([^"]{6,}?)"', body):
            phrases.append(q.strip().rstrip(".").strip())

extra, exempt = [], []
if os.path.exists(manual):
    for line in open(manual, encoding="utf-8"):
        line = norm(line).strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("-"):
            exempt.append(line[1:].strip().lower())
        else:
            extra.append(line)

seen, final = set(), []
for p in phrases + extra:
    k = p.lower()
    if k in seen or k in exempt or len(p) < 6:
        continue
    seen.add(k)
    final.append(p)

final.sort(key=str.lower)

header = (
    "# GENERATED. Do not edit by hand, your change will be overwritten.\n"
    "# Built by .claude/hooks/build-dead-claims.py from the Rejected copy and Killed lists\n"
    "# in the about-page skill, plus .claude/dead-claims-manual.txt.\n"
    "# To block something, reject it in the skill. There is nothing to keep in sync here.\n"
    "#\n"
    "# Matched case-insensitively against Claude's response before it is allowed to finish.\n"
    "# Discussing one of these is fine. Asserting one is blocked.\n"
)

open(out, "w", encoding="utf-8").write(header + "\n" + "\n".join(final) + "\n")
print("dead-claims.txt rebuilt: %d phrases" % len(final), file=sys.stderr)
