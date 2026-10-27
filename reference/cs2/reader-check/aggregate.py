# Combine reviewer answers. A flag stands only when a majority of runs give it.
# Usage: python3 -I aggregate.py run1.txt run2.txt run3.txt
import re, sys, collections

runs = [open(f).read() for f in sys.argv[1:]]
need = len(runs) // 2 + 1
votes = collections.Counter()
notes = collections.defaultdict(set)
q1_no = collections.Counter()
versions = set()
for r in runs:
    for line in r.splitlines():
        m = re.match(r'(V\d+)(\.S\d+)?\s+(Q[1-4])\s+(yes|no)\s*(?:\|\s*(.*))?', line.strip(), re.I)
        if not m:
            continue
        v, s, q, a, note = m.groups()
        versions.add(v)
        a = a.lower()
        if q == 'Q1':
            if a == 'no':
                q1_no[v] += 1
            continue
        if a == 'yes':
            votes[(v + s, q)] += 1
            notes[(v + s, q)].add((note or '').strip())
for v in sorted(versions):
    flags = [(k, c) for k, c in votes.items() if k[0].startswith(v + '.') and c >= need]
    no_decision = q1_no[v] >= need
    status = 'PASS' if not flags and not no_decision else 'FAIL'
    print(f'{v} {status}' + (' | Q1 no decision' if no_decision else ''))
    for (sid, q), c in sorted(flags):
        print(f'  {sid} {q} ({c}/{len(runs)}) ' + '; '.join(sorted(x for x in notes[(sid, q)] if x)))
