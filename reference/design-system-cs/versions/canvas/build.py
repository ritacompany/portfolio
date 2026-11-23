# Builds colour-canvas.html from ../colour.md. Run: python3 -I build.py
import re, html, os, json
here = os.path.dirname(os.path.abspath(__file__))
md = open(os.path.join(here, '..', 'colour.md')).read()
FIELD = re.compile(r'^(Layout|Angle|Covers|Eyebrow|Headline|Side text|Image \d[^:]*|Caption \d|Note \d[^:]*|Body 2[^:]*|Body[^:]*|Sources|Evidence[^:]*):\s*', re.M)

def parse(block):
    out, key = {}, None
    chunks = []
    for para in re.split(r'\n\s*\n', block):
        chunks += [c for c in re.split(r'\n(?=(?:Layout|Angle|Covers):)', para)]
    for para in chunks:
        m = FIELD.match(para)
        if m:
            key = m.group(1); out[key] = [para[m.end():]]
        elif key and (key.startswith('Body')):
            out[key].append(para)
        else:
            key = None
    norm = {}
    for k, v in out.items():
        base = re.sub(r'\s*\(.*$', '', k)
        norm[base] = [re.sub(r'\s+', ' ', x).strip() for x in v]
        if base.startswith('Image') or base.startswith('Note'):
            norm[base + ' where'] = (re.search(r'\((.*?)\)', k) or [None, ''])[1]
    return norm

vers = {}
for part in re.split(r'^## Version ', md, flags=re.M)[1:]:
    letter = part[0]
    body = re.split(r'^## (?!Version)', part, flags=re.M)[0]
    vers[letter] = parse(body)

HEAD = 300  # header band height in pool units
GEO = {
 'A': dict(h=HEAD+1538+200, boxes=[
   ('img', 'Image 1', 24, 0, 684, 677, 'Caption 1'),
   ('img', 'Image 2', 732, 0, 684, 677, 'Caption 2'),
   ('img', 'Image 3', 24, 861, 684, 677, 'Caption 3'),
   ('text', 'Body', 732, 861, 684, 677, None)]),
 'B': dict(h=HEAD+1132+260, boxes=[
   ('img', 'Image 1', 24, 0, 1090, 749, None),
   ('text', 'Body', 1138, 0, 278, 749, None),
   ('img', 'Image 2', 967, 773, 449, 359, 'Caption 2'),
   ('text', 'Body 2', 24, 773, 920, 359, None)]),
 'C': dict(h=HEAD+749+330, boxes=[
   ('img', 'Image 1', 260, 0, 1156, 749, 'Caption 1'),
   ('text', 'Body', 24, 431, 212, 640, None)]),
}

def esc(s): return html.escape(s, quote=True)
def paras(lst): return ''.join(f'<p>{esc(x)}</p>' for x in lst)
def pct(v, total): return f'{v/total*100:.4f}%'

cards, nav = [], []
for L in 'ABC':
    v, g = vers[L], GEO[L]
    W, H = 1440, g['h']
    layout = v['Layout'][0].split(',')[0]
    angle = v['Angle'][0]
    covers = v['Covers'][0]
    items = []
    items.append(f'<div class="eyebrow" style="left:{pct(40,W)};top:{pct(24,H)}">{esc(v["Eyebrow"][0])}</div>')
    hw = 860 if 'Side text' in v else 1100
    items.append(f'<h3 class="headline" style="left:{pct(40,W)};top:{pct(64,H)};width:{pct(hw,W)}">{esc(v["Headline"][0])}</h3>')
    if 'Side text' in v:
        items.append(f'<div class="side" style="left:{pct(960,W)};top:{pct(64,H)};width:{pct(440,W)}">{paras(v["Side text"])}</div>')
    for kind, key, x, y, w, h, cap in g['boxes']:
        top = y + HEAD
        if kind == 'img':
            notes = ''.join(f'<div class="note n{k.split()[1]}"><span>{esc(k.replace("Note ","Note "))}</span>{esc(v[k][0])}</div>'
                            for k in v if k.startswith('Note') and not k.endswith('where'))
            if key != 'Image 1': notes = ''
            items.append(f'<figure class="slot" style="left:{pct(x,W)};top:{pct(top,H)};width:{pct(w,W)};height:{pct(h,H)}">'
                         f'<div class="slotnote"><span>Image slot, {w} by {h}</span>{esc(v[key][0])}</div>{notes}</figure>')
            if cap and cap in v:
                items.append(f'<figcaption class="cap" style="left:{pct(x,W)};top:{pct(top+h+14,H)};width:{pct(w,W)}">{paras(v[cap])}</figcaption>')
        else:
            lead = f'<div class="cap">{paras(v["Caption 1"])}</div>' if (L == 'B' and key == 'Body 2') else ''
            items.append(f'<div class="body" style="left:{pct(x,W)};top:{pct(top,H)};width:{pct(w,W)}">{lead}{paras(v[key])}</div>')
    items.append(f'<div class="sources" style="left:{pct(40,W)};top:{pct(H-56,H)};width:{pct(1360,W)}">{esc(v["Sources"][0])}</div>')
    # stacked reading order for narrow screens
    flow = [f'<div class="eyebrow">{esc(v["Eyebrow"][0])}</div>', f'<h3 class="headline">{esc(v["Headline"][0])}</h3>']
    if 'Side text' in v: flow.append(f'<div class="side">{paras(v["Side text"])}</div>')
    for kind, key, x, y, w, h, cap in g['boxes']:
        if kind == 'img':
            flow.append(f'<figure class="slot"><div class="slotnote"><span>Image slot, {w} by {h}</span>{esc(v[key][0])}</div></figure>')
            if cap and cap in v: flow.append(f'<figcaption class="cap">{paras(v[cap])}</figcaption>')
        else:
            flow.append(f'<div class="body">{paras(v[key])}</div>')
    flow.append(f'<div class="sources">{esc(v["Sources"][0])}</div>')
    cards.append(f'''<section class="version" id="version-{L.lower()}">
  <header class="label"><div class="tag">Colour · Version {L} · {esc(layout)}</div>
  <p class="angle">{esc(angle)}</p><p class="covers">Covers: {esc(covers)}</p></header>
  <div class="frame" style="aspect-ratio:{W}/{H}">{''.join(items)}</div>
  <div class="flow">{''.join(flow)}</div>
</section>''')
    nav.append(f'<a href="#version-{L.lower()}"><b>Version {L}</b><span>{esc(layout)}</span><span class="small">{esc(angle.split(".")[0])}</span></a>')

tpl = open(os.path.join(here, 'template.html')).read()
out = tpl.replace('{{NAV}}', '\n'.join(nav)).replace('{{CARDS}}', '\n'.join(cards))
open(os.path.join(here, 'colour-canvas.html'), 'w').write(out)
print('built', len(out))
