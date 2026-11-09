# Builds the Haven tactics review page from proposals.json, in the same form as the CS2 tactics page
# (reference/cs2/review-2026-11-07/tactics/build.py): the CS2 template, the four choices, a note per proposal and the
# db script from round2/build.py, saving to the page db collection marks. My pick is marked on every proposal.
# Run: python3 -I build.py   Writes haven-tactics-review.html beside this file. Intro and checks text come from
# intro.html and checks.html.
import html, json, os, re
E = html.escape
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '../../..'))
CS2 = os.path.join(ROOT, 'reference/cs2/review-2026-11-07')
P = json.load(open(os.path.join(HERE, 'proposals.json')))
src = open(os.path.join(CS2, 'round2', 'build.py')).read()
SCRIPT = re.search(r'SCRIPT = r"""(.*?)"""', src, re.S).group(1).replace("'fcs-review-r2b'", "'haven-tactics-1'")
CSS = re.search(r'CSS = """(.*?)"""', src, re.S).group(1) + """
.pickchip{font:600 11px/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:4px 7px;border-radius:4px;background:var(--accent-soft);color:var(--accent)}
.pickchip.discuss{background:var(--mag-soft);color:var(--mag)}
.tog button.mine{box-shadow:inset 0 -3px 0 var(--accent)}
.tog button.mine[data-v="discuss"]{box-shadow:inset 0 -3px 0 var(--mag)}
.also{font:400 12px/1.45 var(--mono);color:var(--muted)}
"""
PICK = {'accept': 'Accept', 'change': 'Accept with changes', 'discuss': 'Discuss', 'reject': 'Reject'}

def controls(pick):
    return ('<span class="tog" role="group" aria-label="Mark proposal">' + ''.join(
        f'<button type="button" data-v="{v}" aria-pressed="false"{" class=\"mine\" title=\"My pick\"" if v == pick else ""}>{lab}</button>'
        for v, lab in PICK.items()) + '</span>')

def notebox(fid):
    return (f'<label class="notelab" for="n-{fid}">Your note</label>'
            f'<textarea class="notein" id="n-{fid}" rows="2" placeholder="Optional. Say what you would change, what you are unsure of or what to ask."></textarea>'
            '<span class="notestate" aria-live="polite"></span>')

INTRO = open(os.path.join(HERE, 'intro.html')).read()
CHECKS = open(os.path.join(HERE, 'checks.html')).read()
ids = []; arts = []
for i, p in enumerate(P, 1):
    fid = 'hv-' + p['id'][2:]; ids.append(fid)
    also = ''.join(f'<p class="also">Applied with it: {E(c)} becomes {E(t)}</p>' for c, t in p['also'])
    arts.append(f'''<article class="find" id="{fid}">
<div class="fhead"><span class="num">{i}. {E(p["block"])}</span><span class="src">{E(p["field"])}</span><span class="pickchip{" discuss" if p["pick"] == "discuss" else ""}">My pick: {PICK[p["pick"]]}</span>{controls(p["pick"])}</div>
<div class="pair"><div class="was"><span class="tag">Now</span><span class="t">{E(p["cur"])}</span></div>
<div class="now"><span class="tag">New</span><span class="t">{E(p["new"])}</span></div></div>{also}
<p class="why"><b>Tactic:</b> {E(p["tactic"])}</p><p class="why">{E(p["why"])}</p><p class="src">Source: {E(p["src"])}</p>{notebox(fid)}</article>''')

t = open(os.path.join(CS2, 'template.html')).read()
t = t.replace('<title>Framework CS copy review</title>', '<title>Haven tactics pass</title>')
t = re.sub(r'<section class="block" id="verdict">.*?</section>\s*<section class="block" id="hero">.*?</section>\s*<section class="block" id="ending">.*?</section>',
           f'<section class="block" id="intro"><h2>What this pass found</h2><div class="prose">{INTRO}</div></section>', t, flags=re.S)
t = t.replace('<h1>Framework CS copy review</h1>', '<h1>Haven tactics pass</h1>')
t = t.replace('Mondai framework case study · copy review · read only, nothing changed in Figma', 'Haven case study · tactics pass · nothing changed in Figma or on the page yet')
t = re.sub(r'<p class="lede">.*?</p>', '<p class="lede">Each proposal shows the text as it stands on the coded Haven page, the new text and the tactic behind it, with why and my pick. Pick Accept, Accept with changes, Discuss or Reject. Add a note whenever you want. Choices and notes save to this page and I read them back.</p>', t, flags=re.S)
t = t.replace('<span class="count">Accepted <b id="cA">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>',
              '<span class="count">Accepted <b id="cA">0</b> · With changes <b id="cC">0</b> · Discuss <b id="cD">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>')
t = t.replace('<nav id="toc"></nav>', '<nav id="toc"><a href="#intro">What this pass found</a><a href="#checks">What ran</a><a href="#props">Proposals</a></nav>')
t = re.sub(r'<footer>.*?</footer>', '<footer>Source text: reference/haven/final-copy.md, pulled 9 Nov from site/haven/index.html. Working files: reference/haven/tactics/ and reference/haven/reader-check/.</footer>', t, flags=re.S)
t = re.sub(r'<script>.*?</script>', lambda m: SCRIPT, t, flags=re.S)
t = t.replace('</style>', CSS + '</style>', 1)
t = t.replace('__CHECKS__', CHECKS).replace('__SECTIONS__', '<section class="block" id="props"><h2>Proposals, in page order</h2><div class="finds">' + ''.join(arts) + '</div></section>')
t = t.replace('__IDS__', json.dumps(ids))
out = os.path.join(HERE, 'haven-tactics-review.html'); open(out, 'w').write(t)
body = re.sub(r'<style>.*?</style>', '', t, flags=re.S)
n_btn = len(re.findall(r'<span class="tog"', body))
print(len(ids), 'proposals', n_btn, 'control groups', 'dashes:', [c for c in ['—', '–', ' -- '] if c in body], 'placeholders left:', re.findall(r'__[A-Z_]+__', t), 'Oxford-like:', re.findall(r'\w+, \w+, and \w+', body)[:3])
