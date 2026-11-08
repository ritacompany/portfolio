# Builds the tactics pass review page from proposals.json, in the same form as the round 2 review page
# (template.html and the controls, notes and db script from round2/build.py).
# Run: python3 -I build.py   Writes tactics-review.html beside this file.
import html, json, os, re
E = html.escape
HERE = os.path.dirname(os.path.abspath(__file__))
R2 = os.path.join(HERE, '..', 'round2', 'build.py')
TEMPLATE = os.path.join(HERE, '..', 'template.html')
P = json.load(open(os.path.join(HERE, 'proposals.json')))

src = open(R2).read()
SCRIPT = re.search(r'SCRIPT = r"""(.*?)"""', src, re.S).group(1).replace("'fcs-review-r2b'", "'fcs-tactics-1'")
CSS = re.search(r'CSS = """(.*?)"""', src, re.S).group(1)

def controls(fid):
    return ('<span class="tog" role="group" aria-label="Mark proposal">'
            '<button type="button" data-v="accept" aria-pressed="false">Accept</button>'
            '<button type="button" data-v="change" aria-pressed="false">Accept with changes</button>'
            '<button type="button" data-v="discuss" aria-pressed="false">Discuss</button>'
            '<button type="button" data-v="reject" aria-pressed="false">Reject</button></span>')

def notebox(fid):
    return (f'<label class="notelab" for="n-{fid}">Your note</label>'
            f'<textarea class="notein" id="n-{fid}" rows="2" placeholder="Optional. Say what you would change, what you are unsure of or what to ask."></textarea>'
            '<span class="notestate" aria-live="polite"></span>')

INTRO = """<p><b>Tactics pass, 7 Nov.</b> I went through every block of the final copy (your review decisions applied) against the tactics banks, asking what each block has to do for a hiring manager reading cold and whether a tactic makes it do that better. Most blocks already do the move, so they are not listed here: competitive analysis already refutes the option it rejected, the foundation glosses the terms, Action Item judges the page by what was known then, Personalized timeline has the Aisha example, Schedule view says why automatic moving lost, Buffer flow and Start of week give each screen its reason, and the ending already states pre launch status, two measures and the next step.</p>
<p>Eight proposals below. The biggest is your overkill point: the page said three times that the long view lives somewhere else and that the weekly dates are the Pathway's. After these, each of those points is made once, by the block that owns it, and the right rail body says the one thing no block says: why the target holds still.</p>"""

CHECKS = """<ul>
<li><b>Dashes and Oxford commas:</b> check-copy.mjs and the copy-check.sh hook run on every new line, after both were shown to catch a planted em dash, a planted double hyphen and a planted Oxford comma, and to pass a clean control line (run-checks.mjs).</li>
<li><b>Your wording:</b> the user (never person, people or someone), effort, and your casing, checked by the same script, which catches a planted people and a planted action item.</li>
<li><b>Humanizer:</b> loaded as the skill and run as draft, audit, final on every proposed line; the drafts and audits are in tactics/humanizer.md.</li>
<li><b>Forward references and repeats:</b> a written pass over the whole page in order, with these proposals applied (tactics/page-pass.md).</li>
<li><b>Facts:</b> every product fact checked against the Mondai archive (cited by line), with your 7 Nov corrections winning where the archive is out of date.</li>
<li><b>Fit:</b> the two changed headlines measured in Satoshi Medium 40, tracking minus 4 percent, at 708px: both 3 lines, same as now. No caption changed.</li>
<li><b>Reader check:</b> three runs, round 1 on six blocks: hero and ending PASS; flags on Active, the rail and the earlier version sentence, all fixed here. Round 2: Action Hub and Rollover PASS; two flags (Keeping them here was intentional, right rail undefined), both fixed. <b>Not yet run:</b> a round 3 on those two fixed lines (Growth Journey body 3 and the rail body); the per turn agent limit stopped it. It runs on whatever you accept, before the paste list.</li>
</ul>"""

ids = []; arts = []
for i, p in enumerate(P, 1):
    fid = 'tx-' + p['id'][2:]; ids.append(fid)
    arts.append(f'''<article class="find" id="{fid}">
<div class="fhead"><span class="num">{i}. {E(p["block"])}</span><span class="src">{E(p["field"])}</span>{controls(fid)}</div>
<div class="pair"><div class="was"><span class="tag">Now</span><span class="t">{E(p["cur"])}</span></div>
<div class="now"><span class="tag">New</span><span class="t">{E(p["new"])}</span></div></div>
<p class="why"><b>Tactic:</b> {E(p["tactic"])}</p><p class="why">{E(p["why"])}</p><p class="src">Source: {E(p["src"])}</p>{notebox(fid)}</article>''')

t = open(TEMPLATE).read()
t = t.replace('<title>Framework CS copy review</title>', '<title>Framework CS tactics</title>')
t = re.sub(r'<section class="block" id="verdict">.*?</section>\s*<section class="block" id="hero">.*?</section>\s*<section class="block" id="ending">.*?</section>',
           f'<section class="block" id="intro"><h2>What this pass found</h2><div class="prose">{INTRO}</div></section>', t, flags=re.S)
t = t.replace('<h1>Framework CS copy review</h1>', '<h1>Framework CS tactics pass</h1>')
t = re.sub(r'<p class="lede">.*?</p>', '<p class="lede">Each proposal shows the text as it stands in the final copy, the new text, the tactic and why. Pick Accept, Accept with changes, Discuss or Reject, and add a note whenever you want. Choices and notes save to this page and I read them back. Nothing is changed in Figma.</p>', t, flags=re.S)
t = t.replace('copy review · read only, nothing changed in Figma', 'tactics pass · nothing changed in Figma')
t = t.replace('<span class="count">Accepted <b id="cA">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>',
              '<span class="count">Accepted <b id="cA">0</b> · With changes <b id="cC">0</b> · Discuss <b id="cD">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>')
t = re.sub(r'<footer>.*?</footer>', '<footer>Source text: reference/cs2/review-2026-11-07/final-copy.md, 7 Nov, for Figma frame 5763:2448. Working files: reference/cs2/review-2026-11-07/tactics/.</footer>', t, flags=re.S)
t = re.sub(r'<script>.*?</script>', lambda m: SCRIPT, t, flags=re.S)
t = t.replace('</style>', CSS + '</style>', 1)
t = t.replace('__CHECKS__', CHECKS).replace('__SECTIONS__', '<section class="block" id="props"><h2>Proposals, in page order</h2><div class="finds">' + ''.join(arts) + '</div></section>')
t = t.replace('__IDS__', json.dumps(ids))
out = os.path.join(HERE, 'tactics-review.html'); open(out, 'w').write(t)
body = re.sub(r'<style>.*?</style>', '', t, flags=re.S)
print(len(ids), 'proposals', 'dashes:', [c for c in ['—', '–', ' -- '] if c in body], 'placeholders left:', re.findall(r'__[A-Z_]+__', t))
