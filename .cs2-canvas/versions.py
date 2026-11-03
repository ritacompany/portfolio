"""Version blocks for the canvas, from reference/cs2/versions/<part>.md.

Each version is drawn on a pool layout (WORKING_LOOP.md, pool units scaled by 0.977 to 40px margins) and
placed left of his block: A at x -1940, B at -3480, C at -5020. Called by build.py.
"""
import html as H, pathlib, re

K = 0.977
def px(x): return round(40 + (x - 24) * K)
def sz(v): return round(v * K)

# Pool geometry in content coordinates (content starts under the header).
LAYOUTS = {
    "T1I": dict(img=[(260, 0, 1156, 749)], col=(24, 431, 212)),
    "T2I": dict(img=[(24, 0, 1090, 749), (967, 773, 449, 359)], col=(1138, 0, 278), side=(520, 773, 420)),
    "T3I": dict(img=[(24, 0, 684, 677), (732, 0, 684, 677), (24, 701, 684, 677)], col=(732, 701, 684)),
    "BRIDGE": dict(img=[], col=None),
}
XS = {"A": -1940, "B": -3480, "C": -5020}

def parse(md):
    vs = []
    for ln in md.splitlines():
        m = re.match(r"^## (.+) ([ABC]): (.+)$", ln)
        if m:
            vs.append(dict(name=m[1], letter=m[2], angle=m[3], text=[], side=[], images=[])); continue
        if not vs or ":" not in ln: continue
        k, v = ln.split(":", 1); v = v.strip(); k = k.strip()
        cur = vs[-1]
        if k in ("Eyebrow", "Headline", "Layout", "Covers", "Sources", "Top", "Height"): cur[k.lower()] = v
        elif k == "Text": cur["text"].append(v)
        elif k == "Side": cur["side"].append(v)
        elif k.startswith("Image"): cur["images"].append(v)
    return vs

def block(v):
    e = H.escape
    lay = LAYOUTS[v["layout"]]; top = int(v["top"]); h = int(v["height"]); x = XS[v["letter"]]
    parts = []
    if v["layout"] == "BRIDGE":
        hx, hw, bx, by, bw = (160, 812, 157, 416, 389) if v["letter"] == "A" else (160, 812, 811, 416, 520) if v["letter"] == "B" else (160, 1000, 160, 330, 560)
        parts.append(f'<div class="abs t" style="left:{hx}px;top:64px;width:{hw}px"><p class="eb">{e(v["eyebrow"])}</p><p class="hl">{e(v["headline"])}</p></div>')
        body = "".join(f'<p class="tx">{e(t)}</p>' for t in v["text"])
        parts.append(f'<div class="abs t" style="left:{bx}px;top:{by}px;width:{bw}px">{body}<p class="src">Sources: {e(v["sources"])}</p></div>')
    else:
        parts.append(f'<div class="abs t" style="left:40px;top:64px;width:1000px"><p class="eb">{e(v["eyebrow"])}</p><p class="hl">{e(v["headline"])}</p></div>')
        c0 = 330
        for (ix, iy, iw, ih), note in zip(lay["img"], v["images"]):
            parts.append(f'<div class="gn" style="left:{px(ix)}px;top:{c0 + sz(iy)}px;width:{sz(iw)}px;height:{sz(ih)}px"><p class="nl">Image</p><p class="tx">{e(note)}</p></div>')
        cx, cy, cw = lay["col"]
        body = "".join(f'<p class="tx">{e(t)}</p>' for t in v["text"])
        src = f'<p class="src">Sources: {e(v["sources"])}</p>'
        if v["side"]:
            sx, sy, sw = lay["side"]
            parts.append(f'<div class="abs t" style="left:{px(sx)}px;top:{c0 + sz(sy)}px;width:{sz(sw)}px">' + "".join(f'<p class="tx">{e(t)}</p>' for t in v["side"]) + '</div>')
        parts.append(f'<div class="abs t" style="left:{px(cx)}px;top:{c0 + sz(cy) + (24 if v["layout"] == "T3I" else 0)}px;width:{sz(cw) - (48 if v["layout"] == "T3I" else 0)}px;{"padding-left:24px" if v["layout"] == "T3I" else ""}">{body}{src}</div>')
    label = f'<div class="ver-label" style="left:{x}px;top:{top - 96}px;width:1440px;white-space:normal;line-height:1.3">{e(v["name"])} {v["letter"]} · {v["layout"]} · {e(v["angle"])}<br><small style="font-size:17px;font-weight:400;color:#a9a9b4">Covers: {e(v["covers"])}</small></div>'
    return label + f'<div class="lay" style="left:{x}px;top:{top}px;height:{h}px">' + "".join(parts) + "</div>"

def render(paths):
    out = []
    for p in paths:
        for v in parse(pathlib.Path(p).read_text()): out.append(block(v))
    return "\n".join(out)
