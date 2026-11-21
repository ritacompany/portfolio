# Builds the hero and ending review page from versions.json and CHECKS.md, in the same form as the tactics
# review page (tactics/build.py: template.html plus the controls, notes and db script from round2/build.py).
# Run: python3 -I build.py   Writes hero-ending-review.html beside this file.
import html, json, os, re
E = html.escape
HERE = os.path.dirname(os.path.abspath(__file__))
R2 = os.path.join(HERE, '..', 'round2', 'build.py')
TEMPLATE = os.path.join(HERE, '..', 'template.html')
V = json.load(open(os.path.join(HERE, 'versions.json')))
FINAL = open(os.path.join(HERE, '..', 'final-copy.md')).read()

src = open(R2).read()
SCRIPT = re.search(r'SCRIPT = r"""(.*?)"""', src, re.S).group(1).replace("'fcs-review-r2b'", "'fcs-hero-end-1'")
CSS = re.search(r'CSS = """(.*?)"""', src, re.S).group(1) + """
.vfield{display:grid;grid-template-columns:96px 1fr;gap:4px 16px;margin:6px 0}
.vfield .k{font-size:12px;letter-spacing:.04em;text-transform:uppercase;opacity:.7;padding-top:3px}
.vfield .t{min-width:0}
.pickTag{display:inline-block;margin-left:10px;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:3px 8px;border:1px solid currentColor;border-radius:4px}
.nowref{opacity:.75;font-size:14px}
@media (max-width:560px){.vfield{grid-template-columns:1fr}}
"""

def controls():
    return ('<span class="tog" role="group" aria-label="Mark version">'
            '<button type="button" data-v="accept" aria-pressed="false">Accept</button>'
            '<button type="button" data-v="change" aria-pressed="false">Accept with changes</button>'
            '<button type="button" data-v="discuss" aria-pressed="false">Discuss</button>'
            '<button type="button" data-v="reject" aria-pressed="false">Reject</button></span>')

def notebox(fid):
    return (f'<label class="notelab" for="n-{fid}">Your note</label>'
            f'<textarea class="notein" id="n-{fid}" rows="2" placeholder="Optional. Say what you would change, what you are unsure of or what to ask."></textarea>'
            '<span class="notestate" aria-live="polite"></span>')

def section(block):
    m = re.search(r'^## ' + block + r'.*?\n(.*?)(?=^## )', FINAL, re.S | re.M)
    now = ''.join(f'<p class="nowref">{E(l)}</p>' for l in m.group(1).strip().splitlines() if l.strip())
    arts = []
    for v in [x for x in V if x['block'] == block]:
        tag = '<span class="pickTag">My pick</span>' if v['pick'] else ''
        fields = ''.join(f'<div class="vfield"><span class="k">{E(k)}</span><span class="t">{E(t)}</span></div>' for k, t in v['fields'])
        arts.append(f'''<article class="find" id="{v["id"]}">
<div class="fhead"><span class="num">{E(v["name"])}{tag}</span>{controls()}</div>
{fields}<p class="why">{E(v["note"])}</p>{notebox(v["id"])}</article>''')
    return (f'<section class="block" id="{block.lower()}"><h2>{block}, three versions</h2>'
            f'<details><summary>The current text in final-copy.md</summary>{now}</details>'
            f'<div class="finds">{"".join(arts)}</div></section>')

INTRO = open(os.path.join(HERE, 'intro.html')).read()
CHECKS = open(os.path.join(HERE, 'checks.html')).read()
t = open(TEMPLATE).read()
t = t.replace('<title>Framework CS copy review</title>', '<title>Framework CS hero and ending</title>')
t = re.sub(r'<section class="block" id="verdict">.*?</section>\s*<section class="block" id="hero">.*?</section>\s*<section class="block" id="ending">.*?</section>',
           f'<section class="block" id="intro"><h2>What this round is</h2><div class="prose">{INTRO}</div></section>', t, flags=re.S)
t = t.replace('<h1>Framework CS copy review</h1>', '<h1>Framework CS hero and ending</h1>')
t = re.sub(r'<p class="lede">.*?</p>', '<p class="lede">Three versions of each block, each built differently. Pick Accept, Accept with changes, Discuss or Reject on any version and add a note whenever you want. Choices and notes save to this page and I read them back, then apply them to final-copy.md.</p>', t, flags=re.S)
t = t.replace('copy review · read only, nothing changed in Figma', 'hero and ending · copy only, the site build takes it from final-copy.md')
t = t.replace('<span class="count">Accepted <b id="cA">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>',
              '<span class="count">Accepted <b id="cA">0</b> · With changes <b id="cC">0</b> · Discuss <b id="cD">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>')
t = re.sub(r'<footer>.*?</footer>', '<footer>Source text: reference/cs2/review-2026-11-07/hero-ending/versions.json. Current copy: reference/cs2/review-2026-11-07/final-copy.md.</footer>', t, flags=re.S)
t = re.sub(r'<script>.*?</script>', lambda m: SCRIPT, t, flags=re.S)
t = t.replace('</style>', CSS + '</style>', 1)
t = t.replace('__CHECKS__', CHECKS).replace('__SECTIONS__', section('Hero') + section('Ending'))
t = t.replace('__IDS__', json.dumps([v['id'] for v in V]))
out = os.path.join(HERE, 'hero-ending-review.html'); open(out, 'w').write(t)
body = re.sub(r'<style>.*?</style>', '', t, flags=re.S)
print(len(V), 'versions', 'dashes:', [c for c in ['—', '–', ' -- '] if c in body], 'placeholders left:', re.findall(r'__[A-Z_]+__', t))
