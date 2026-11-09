# Builds the reader check COPY file: the Haven page in order with the chosen proposals applied, every block one
# version, visible copy only (no alt text, no hidden Security body, no ticker, links or chart labels).
# Usage: python3 -I build-copy.py out.txt [--control] [--marks marks.json]
import json, re, sys, os
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.abspath(os.path.join(here, '../../..'))
fc = open(os.path.join(root, 'reference/haven/final-copy.md')).read()
P = json.load(open(os.path.join(root, 'reference/haven/tactics/proposals.json')))
marks = None
if '--marks' in sys.argv:
    marks = json.load(open(sys.argv[sys.argv.index('--marks') + 1]))
for p in P:
    if marks is not None:
        m = marks.get(p['id'], {})
        if m.get('choice') not in ('accept', 'change'): continue
        new = m.get('final') or p['new']
    else:
        new = p['new']
    for cur, nw in [(p['cur'], new)] + [tuple(a) for a in p['also']]:
        assert cur in fc, p['id']; fc = fc.replace(cur, nw)
SKIP = ('Alt', 'Aria', 'Ticker', 'Hidden heading', 'Links', 'Links intro', 'Legend', 'Chart', 'Labels', 'Flow', 'Title', 'Meta')
out = []
for blk in re.split(r'^## ', fc, flags=re.M)[1:]:
    name, *lines = blk.strip().split('\n')
    out.append('=== ' + name)
    for l in lines:
        if ':' not in l: continue
        k, v = l.split(':', 1); v = v.strip(); k = k.strip()
        if k.startswith(SKIP) or k.startswith('Body (hidden'): continue
        if k == 'Eyebrow': out.append('[eyebrow or sub-heading] ' + v)
        elif k == 'Headline': out.append('[headline] ' + v)
        elif k in ('Card', 'Task', 'Role', 'Stat'):
            parts = [x.strip() for x in v.split('|')]
            if k == 'Card' and len(parts) == 3: out += ['[eyebrow or sub-heading] ' + parts[0] + ', ' + parts[1], parts[2]]
            elif k == 'Card': out += ['[eyebrow or sub-heading] ' + parts[0], parts[1]]
            elif k == 'Stat': out.append('[eyebrow or sub-heading] ' + parts[0] + ' ' + parts[1])
            else: out.append('[eyebrow or sub-heading] ' + parts[0] + ' ' + parts[1])
        elif k == 'Tags': out.append('[eyebrow or sub-heading] Tags: ' + ', '.join(x.strip() for x in v.split('|')))
        elif k in ('Subhead', 'Label', 'Card 1 title', 'Card 2 title'): out.append('[eyebrow or sub-heading] ' + v)
        elif k in ('Card 1 number', 'Card 2 number', 'Card 1 source', 'Card 2 source'): out.append('[eyebrow or sub-heading] ' + v)
        elif k in ('Card 1 caption', 'Card 2 caption'): out.append(v[0].upper() + v[1:])
        else: out.append(v)
if '--control' in sys.argv:
    out += ['=== Planted control (not on the page)', '[eyebrow or sub-heading] Scheduling a chat',
            '[headline] My mentor asked me to rethink scheduling, so I changed my mind about the calendar.',
            'Testing showed users hesitating over which Confidante to pick, and some undid their choice after making it.',
            'So every chat now opens with the Haven Shield toggle and a Pulse score.',
            'I first tried a weekly digest, then dropped it after a long night of second guessing.']
open(sys.argv[1], 'w').write('\n'.join(out) + '\n')
print(sys.argv[1], sum(1 for l in out if l.startswith('=== ')), 'versions')
