# Number every sentence in the copy so reviewers answer per sentence.
# Usage: python3 -I number.py in.txt out.txt
import re, sys

out = []
v = 0
n = 0
for line in open(sys.argv[1]).read().splitlines():
    if line.startswith('=== '):
        v += 1
        n = 0
        out.append(f'\nVERSION V{v}: {line[4:]}')
        continue
    m = re.match(r'\[eyebrow or sub-heading\] (.*)', line)
    if m:
        out.append(f'  (label) {m.group(1)}')
        continue
    line = line.replace('[headline] ', '')
    if not line.strip():
        continue
    for sent in re.split(r'(?<=[.!?])\s+', line.strip()):
        if sent:
            n += 1
            out.append(f'V{v}.S{n} {sent}')
open(sys.argv[2], 'w').write('\n'.join(out).strip() + '\n')
