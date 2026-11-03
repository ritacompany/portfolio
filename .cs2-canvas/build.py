import base64, json, pathlib, sys
d = pathlib.Path(sys.argv[1])
secs = [("Page",0,"")]
S = [dict(n=n,y=y,title=t) for n,y,t in secs]
h = (d/"template.html").read_text()
tiles = []
for f in sorted((d/"img/tiles").glob("*.png")):
    kind, y = f.stem.split("_"); y = int(y)
    x, w, alt = (0, 1440, "Frame") if kind.startswith("f") else (2160, 752, "Spec 1")
    tiles.append(f'<img class="art" alt="{alt}, from {y}px" src="data:image/png;base64,{base64.b64encode(f.read_bytes()).decode()}" style="left:{x}px;top:{y}px;width:{w}px;height:{int.from_bytes(f.read_bytes()[20:24],"big")*w//int.from_bytes(f.read_bytes()[16:20],"big")}px">')
import html as H, re
def inl(x):
    x = H.escape(x)
    x = re.sub(r"~~(.+?)~~", r"<s>\1</s>", x)
    x = re.sub(r"(Feedback:.*)$", r'<span class="fb">\1</span>', x)
    x = re.sub(r"^(Eyebrow|Headline|Text|Note|Card):", r'<span class="lab">\1:</span>', x)
    x = re.sub(r"(<s>)(Eyebrow|Headline|Text):", r'\1<span class="lab">\2:</span>', x)
    return x
out = []
for ln in (d/"spec.md").read_text().splitlines():
    if not ln.strip(): continue
    if ln.startswith("# "): out.append(f"<h1>{H.escape(ln[2:])}</h1>")
    elif ln.startswith("## "): out.append(f"<h2>{H.escape(ln[3:])}</h2>")
    elif ln.startswith("Section:"): out.append(f'<p class="sec">{H.escape(ln)}</p>')
    elif ln.startswith("COMMENT:"): out.append(f'<p class="cmt">{H.escape(ln[9:])}</p>')
    elif ln.startswith(("FEEDBACK","notes:")): out.append(f'<p class="fb">{H.escape(ln)}</p>')
    else: out.append(f"<p>{inl(ln)}</p>")
spec = '<div class="spec-title">Spec 1 (beside the frame in Figma)</div><div class="spec">' + "\n".join(out) + "</div>"
h = h.replace("__SPEC__", "")  # Spec 1 retired 2 Nov; the frame is the only source
sys.path.insert(0, str(d)); import versions as V
h = h.replace("__VERSIONS__", V.render(sorted((d.resolve().parent/"reference/cs2/versions").glob("map-and-falling-behind.md"))))
h = h.replace("__TILES__", "\n  ".join(tiles)).replace("__SECTIONS__", json.dumps(S))
(d/"cs2-canvas.html").write_text(h); print(len(h))
