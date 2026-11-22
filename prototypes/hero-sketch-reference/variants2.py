# Box stays exactly where version 3 has it, half through the pipe's bottom wall (wall at y 1152).
# Three ways to show how it sits there. Plugs stay on the box top, inside the glass.
src=open('_base.py').read()
ANCHOR="    for x in (440,480,520,548): o.append(f'<rect x=\"{x-8}\" y=\"1068\""
assert ANCHOR in src
GREY="#5b5b66"; METAL="#9aa0a8"
EXTRA={
"gasket":"""    if line: o.append('<rect x="404" y="1084" width="160" height="68" fill="none" stroke="#111" stroke-width="1.5" stroke-dasharray="6 5"/>')
    else: o.append('<rect x="404" y="1084" width="160" height="68" fill="#ff3fd2" opacity=".35"/>')
    o.append(f'<rect x="394" y="1144" width="180" height="16" rx="4" fill="{"#fff" if line else "%s"}" stroke="{"#111" if line else "%s"}" stroke-width="3"/>')
    for gx in range(404,566,14): o.append(f'<line x1="{gx}" y1="1146" x2="{gx+6}" y2="1158" stroke="{"#111" if line else "#3c3c44"}" stroke-width="1.5"/>')
""" % (GREY,GREY),
"plate":"""    o.append(f'<rect x="420" y="1060" width="140" height="26" rx="4" fill="{"#fff" if line else "%s"}" stroke="{"#111" if line else "%s"}" stroke-width="3"/>')
    for x in (440,480,520,548): o.append(f'<circle cx="{x}" cy="1073" r="7" fill="{"#fff" if line else "#2a2a30"}" stroke="#111" stroke-width="2"/>')
""" % (METAL,"#6f757d"),
"flange":"""    o.append(f'<rect x="384" y="1146" width="200" height="14" rx="3" fill="{"#fff" if line else "%s"}" stroke="{"#111" if line else "#6f757d"}" stroke-width="3"/>')
    for bx in (394,574): o.append(f'<rect x="{bx-12}" y="1146" width="24" height="30" rx="4" fill="{"#fff" if line else "%s"}" stroke="{"#111" if line else "#6f757d"}" stroke-width="3"/><circle cx="{bx}" cy="1166" r="4" fill="{"#111" if line else "#3c3c44"}"/>')
    for bx in range(418,560,34): o.append(f'<circle cx="{bx}" cy="1153" r="3.5" fill="{"#111" if line else "#3c3c44"}"/>')
""" % (METAL,METAL),
}
for name,extra in EXTRA.items():
    s=src.replace(ANCHOR, extra.replace("\n    ","\n    ",0)+ANCHOR) if name=="plate" else src
    if name!="plate":
        # draw after the plugs so it sits over the box at the wall line
        i=s.index(ANCHOR); j=s.index("\n",i)+1
        s=s[:j]+extra+s[j:]
    ns={}; exec(s,ns)
    open(f"box-{name}-regions.svg","w").write(ns["build"]("regions"))
    open(f"box-{name}-structure.svg","w").write(ns["build"]("line"))
print("ok")
