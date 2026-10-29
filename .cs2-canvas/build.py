import base64, json, pathlib, sys
d = pathlib.Path(sys.argv[1])
secs = [("Hero",0,"Hero and background"),("Competitive",2420,"Competitive analysis"),("Foundation",3442,"The foundation we built on"),("Saturday",4495,"Saturday night deadlines"),("Timeline",5450,"Personalized timeline"),("Action Hub",6220,"The Action Hub"),("Calendar setup",7790,"Calendar setup"),("Schedule view",9300,"The schedule view"),("Rollover",10690,"Two years of answers"),("Opening the week",12890,"Opening the week"),("State rules",13880,"State rules"),("Recalibration",15130,"Recalibration"),("Reset",15975,"Reset")]
S = [dict(n=n,y=y,title=t) for n,y,t in secs]
h = (d/"template.html").read_text()
tiles = []
for f in sorted((d/"img/tiles").glob("*.png")):
    kind, y = f.stem.split("_"); y = int(y)
    x, w, alt = (0, 1440, "Frame") if kind.startswith("f") else (2160, 752, "Spec 1")
    tiles.append(f'<img class="art" alt="{alt}, from {y}px" src="data:image/png;base64,{base64.b64encode(f.read_bytes()).decode()}" style="left:{x}px;top:{y}px;width:{w}px;height:1500px">')
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
h = h.replace("__SPEC__", spec)
h = h.replace("__TILES__", "\n  ".join(tiles)).replace("__SECTIONS__", json.dumps(S))
(d/"cs2-canvas.html").write_text(h); print(len(h))
