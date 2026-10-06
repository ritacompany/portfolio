#!/usr/bin/env python3
"""Fails if any source entry or heading is missing from CS2_REFERENCE_INDEX.md."""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parents[2]
index = (pathlib.Path(__file__).parent / "CS2_REFERENCE_INDEX.md").read_text()
missing = []

def ids(path):
    t = (root / path).read_text()
    data = t[t.index("const DATA"):]
    return re.findall(r"\{id:'(t[0-9a-z]+)'", data)

for i in ids("docs/about-source/case_study_tactics.html"):
    if f"cs-{i} " not in index: missing.append(f"case study bank {i}")
for i in ids("docs/about-source/tactics_bank.html"):
    if f"re-{i} " not in index: missing.append(f"reader effect bank {i}")
proto = (root / "docs/about-source/CASE-STUDY-WRITING-PROTOCOL.md").read_text()
for n in re.findall(r"^## (\d+)\.", proto, re.M):
    if f"wp-{n} " not in index: missing.append(f"protocol section {n}")
reports = {"How case studies end.md": "rp-end", "Case study results without metrics.md": "rp-met",
           "What gets designers interviewed.md": "rp-int", "Expanding card gallery components.md": "rp-gal"}
for f, tag in reports.items():
    if not (root / "reports" / f).exists(): missing.append(f"report file {f}")
    if f"{tag}-1 " not in index: missing.append(f"report {f}")
for f in (root / "reports").glob("*.md"):
    if f.name not in reports: missing.append(f"unindexed report {f.name}")
if missing:
    print("MISSING:\n" + "\n".join(missing)); sys.exit(1)
print("index covers every source entry")
