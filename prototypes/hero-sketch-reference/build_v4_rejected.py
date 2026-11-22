# Builds the clean hero reference from Chadwick's 13 Nov annotated sketch.
# Outputs: structure.svg (line art), regions.svg (flat color map), annotated.svg (map plus legend).
import math
W,H=900,1200
PW=104  # pipe width, between the 13 Nov sketch and v1
C=dict(pipe="#ff3fd2",power="#1d4ed8",cable="#10a36a",spring="#e53935",planter="#7c5cff",
       second="#f26b1d",conn="#6b5a12",stem="#5ef04a",big1="#6fb3ff",big2="#a9b6d3",
       noodle="#c6e600",spray="#000000",small="#e9b0b6",coral="#d9a066",sleeve="#3a3a44",plug="#0b6b45")
LEFT="M250 520 V800 Q250 860 310 860 H600"
RIGHT="M600 600 V1010 Q600 1100 510 1100 H330"
STYLE="plugs"
TOP={582:"V590 Q582 572 562 560",600:"V548",618:"V590 Q618 572 638 560"}
ROUTE=[(582,1100),(600,1112),(618,1124)]
CABLES=[f"M588 {Y} Q{X} {Y} {X} 1010 {TOP[X]}" for X,Y in ROUTE]
SIDE="M472 886 H554 Q570 886 570 902 V1010 Q570 1088 588 1088"
SOCKETS=[(560,556,-55),(600,544,0),(640,556,55)]
CORAL=["M250 760 V400","M250 440 Q200 400 165 335 V300","M250 400 Q292 340 322 290 V266",
       "M180 360 Q140 380 120 400","M250 480 Q295 460 318 432","M322 300 Q362 312 390 334",
       "M205 405 Q172 440 162 470"]
BIG2=[(150,250,78),(332,182,85),(108,420,56)]
SMALL=[(322,428),(394,336),(160,476)]
SPRAY=[(118,212),(364,138),(78,404),(286,500)]
BIG1=[(575,330,95),(735,430,70)]
NOODLE=[(444,446,36),(792,262,40),(660,148,32)]
STEMS=[((560,556),(575,425)),((560,556),(452,480)),((600,544),(658,180)),
       ((640,556),(732,500)),((640,556),(786,302))]

def spray(x,y,col,w=2):
    s=""
    for i in range(9):
        a=i*2*math.pi/9+0.3; r=44 if i%2 else 32
        s+=f'<path d="M{x} {y} q{math.cos(a+0.5)*r*0.5:.1f} {math.sin(a+0.5)*r*0.5:.1f} {math.cos(a)*r:.1f} {math.sin(a)*r:.1f}" stroke="{col}" stroke-width="{w}" fill="none" stroke-linecap="round"/>'
    return s
def beads(p,q,col,fill,sw):
    (x1,y1),(x2,y2)=p,q; n=int(math.hypot(x2-x1,y2-y1)/16); s=f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{sw}"/>'
    for i in range(1,n): t=i/n; s+=f'<circle cx="{x1+(x2-x1)*t:.1f}" cy="{y1+(y2-y1)*t:.1f}" r="3.5" fill="{fill}" stroke="{col}" stroke-width="1.5"/>'
    return s
def socket(x,y,a,fill,st):
    return f'<g transform="translate({x} {y}) rotate({a})"><rect x="-13" y="-22" width="26" height="34" rx="3" fill="{fill}" stroke="{st}" stroke-width="2.5"/><rect x="-8" y="-31" width="16" height="10" fill="{fill}" stroke="{st}" stroke-width="2"/></g>'

def build(mode):
    line = mode=="line"
    K="#111"
    def f(key): return "#fff" if line else C[key]
    def st(key): return K if line else C[key]
    o=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="#fff"/>']
    # pipe
    if line:
        for p in (LEFT,RIGHT): o.append(f'<path d="{p}" stroke="{K}" stroke-width="{PW+6}" fill="none"/>')
        for p in (LEFT,RIGHT): o.append(f'<path d="{p}" stroke="#fff" stroke-width="{PW}" fill="none"/>')
        o.append('<rect x="546" y="808" width="56" height="104" fill="#fff"/>')
    else:
        for p in (LEFT,RIGHT): o.append(f'<path d="{p}" stroke="{C["pipe"]}" stroke-width="{PW}" fill="none" opacity=".55"/>')
    for (cx,cy,rx,ry) in ((250,520,52,14),(600,600,52,14),(330,1100,14,52)):
        o.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{"#fff" if line else C["pipe"]}" stroke="{st("pipe")}" stroke-width="3"/>')
    # power supply, cables, spring
    o.append(f'<rect x="404" y="1084" width="160" height="96" rx="6" fill="{f("power")}" stroke="{st("power")}" stroke-width="3"/><rect x="380" y="1160" width="24" height="16" fill="{f("power")}" stroke="{st("power")}" stroke-width="2"/>')
    if not line: o.append('<rect x="404" y="1084" width="160" height="66" fill="#ff3fd2" opacity=".35"/>')
    o.append(f'<rect x="396" y="1146" width="176" height="12" rx="4" fill="{"#fff" if line else "#5b5b66"}" stroke="{"#111" if line else "#5b5b66"}" stroke-width="2.5"/>')
    cw=3 if line else 6
    if STYLE=="ribbon":
        for X in (582,600,618): o.append(f'<path d="M{X} 990 {TOP[X]}" stroke="{st("cable")}" stroke-width="{cw}" fill="none"/>')
        o.append(f'<path d="M472 886 H554 Q570 886 570 902 V990" stroke="{st("cable")}" stroke-width="{cw}" fill="none"/>')
        o.append(f'<path d="M594 990 V1010 Q594 1106 588 1106" stroke="{"#111" if line else C["cable"]}" stroke-width="40" fill="none"/>')
        if line: o.append('<path d="M594 990 V1010 Q594 1106 588 1106" stroke="#fff" stroke-width="35" fill="none"/>')
        for k in range(-15,16,6): o.append(f'<path d="M{594+k} 990 V1010 Q{594+k} {1106+k} 588 {1106+k}" stroke="{"#111" if line else "#0b6b45"}" stroke-width="1" fill="none"/>')
        o.append(f'<rect x="560" y="978" width="68" height="14" rx="4" fill="{"#fff" if line else C["sleeve"]}" stroke="{"#111" if line else C["sleeve"]}" stroke-width="2.5"/>')
        o.append(f'<rect x="564" y="1084" width="28" height="46" rx="4" fill="{"#fff" if line else C["plug"]}" stroke="{"#111" if line else C["plug"]}" stroke-width="2.5"/>')
        for py in range(1092,1126,8): o.append(f'<circle cx="572" cy="{py}" r="2.2" fill="{"#111" if line else "#cfe"}"/>')
    else:
        for p in CABLES+[SIDE]: o.append(f'<path d="{p}" stroke="{st("cable")}" stroke-width="{cw}" fill="none"/>')
        if STYLE=="loom":
            o.append(f'<path d="M594 912 V996" stroke="{"#111" if line else C["sleeve"]}" stroke-width="58" fill="none"/>')
            if line: o.append('<path d="M594 914 V994" stroke="#fff" stroke-width="53" fill="none"/>')
            for yy in range(918,996,8): o.append(f'<path d="M568 {yy} L620 {yy+8} M568 {yy+8} L620 {yy}" stroke="{"#111" if line else "#6a6a76"}" stroke-width="1.2"/>')
            for yy in (912,996): o.append(f'<rect x="562" y="{yy-5}" width="64" height="10" rx="3" fill="{"#fff" if line else "#22222a"}" stroke="#111" stroke-width="2"/>')
        for y in (1088,1100,1112,1124):
            o.append(f'<rect x="564" y="{y-6}" width="8" height="11" fill="{"#fff" if line else "#22222a"}" stroke="#111" stroke-width="1.5"/>')
            o.append(f'<rect x="572" y="{y-6}" width="18" height="11" rx="3" fill="{"#fff" if line else C["plug"]}" stroke="{"#111" if line else C["plug"]}" stroke-width="2"/>')
    for i in range(8): o.append(f'<ellipse cx="600" cy="{676+i*10}" rx="36" ry="8" fill="none" stroke="{st("spring")}" stroke-width="{2.5 if line else 4}"/>')
    # planter, connector wires, secondary connector
    for dx in (-8,0,8): o.append(f'<path d="M{250+dx} 772 C{250+dx} 850 330 {886+dx} 400 {886+dx}" fill="none" stroke="{st("conn")}" stroke-width="{2 if line else 4}"/>')
    o.append(f'<rect x="400" y="866" width="72" height="40" rx="4" fill="{f("second")}" stroke="{st("second")}" stroke-width="3"/>')
    # coral and left garden
    for p in CORAL: o.append(f'<path d="{p}" stroke="{K if line else C["coral"]}" stroke-width="{26 if line else 22}" fill="none" stroke-linecap="round"/>')
    if line:
        for p in CORAL: o.append(f'<path d="{p}" stroke="#fff" stroke-width="20" fill="none" stroke-linecap="round"/>')
    o.append(f'<path d="M216 610 H284 L274 760 Q250 778 226 760 Z" fill="{f("planter")}" stroke="{st("planter")}" stroke-width="3"/>')
    for x,y in SMALL:
        for i in range(5):
            a=i*2*math.pi/5; o.append(f'<circle cx="{x+math.cos(a)*11:.1f}" cy="{y+math.sin(a)*11:.1f}" r="9" fill="{f("small")}" stroke="{st("small")}" stroke-width="2"/>')
        o.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{f("small")}" stroke="{st("small")}" stroke-width="2"/>')
    for x,y,r in BIG2:
        o.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{f("big2")}" stroke="{st("big2")}" stroke-width="3"/>')
        for k,rr in enumerate((0.78,0.54,0.3)):
            n=int(6+18*rr)
            for i in range(n):
                a=i*2*math.pi/n+k*0.2
                o.append(f'<circle cx="{x+math.cos(a)*r*rr:.1f}" cy="{y+math.sin(a)*r*rr:.1f}" r="{r*0.1:.1f}" fill="none" stroke="{st("big2") if line else "#8794b3"}" stroke-width="1.5"/>')
    # right garden
    for p,q in STEMS: o.append(beads(p,q,st("stem") if line else C["stem"],"#fff" if line else C["stem"],2.5 if line else 4))
    for x,y,a in SOCKETS: o.append(socket(x,y,a,f("cable"),st("cable")))
    for x,y,r in BIG1:
        o.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{f("big1")}" stroke="{st("big1")}" stroke-width="3"/>')
        for i in range(90):
            a=i*2.39996; rr=r*0.86*math.sqrt((i+0.5)/90); cx,cy=x+math.cos(a)*rr,y+math.sin(a)*rr
            col=st("big1") if line else "#3d8be6"
            o.append(f'<path d="M{cx-3:.1f} {cy:.1f} h6 M{cx:.1f} {cy-3:.1f} v6" stroke="{col}" stroke-width="1.4"/>')
    for x,y,r in NOODLE:
        o.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{f("noodle")}" stroke="{st("noodle")}" stroke-width="3"/>')
        for i in range(9):
            a=i*2*math.pi/9; rr=r*(0.55 if i%2 else 0.3); cx,cy=x+math.cos(a)*rr,y+math.sin(a)*rr
            o.append(f'<path d="M{cx-7:.1f} {cy:.1f} q3.5 -6 7 0 t7 0" stroke="{st("noodle") if line else "#8fa600"}" stroke-width="1.5" fill="none"/>')
    for x,y in SPRAY: o.append(spray(x,y,K if line else C["spray"]))
    o.append('</svg>'); return "".join(o)

LEG=[("pipe","Translucent tinted piping"),("power","Power supply, half through the wall"),("cable","Grips, sockets and cable stems"),("spring","Spring holding the cables together"),("planter","Planter, opaque"),("second","Secondary power connector"),("conn","Connector wires"),("stem","Beaded stems"),("big1","Large flower type 1"),("big2","Large flower type 2"),("noodle","Noodle puff flowers"),("spray","Wire spray"),("small","Small flowers"),("coral","Coral, the branching blob shape"),("plug","Plug ends at the box"),("sleeve","Sleeve or cable clip")]
def annotated(reg):
    leg='<g font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#111">'
    for i,(k,t) in enumerate(LEG):
        x=40+(i%2)*430; y=H+40+(i//2)*34
        leg+=f'<rect x="{x}" y="{y-14}" width="18" height="18" rx="3" fill="{C[k]}"/><text x="{x+28}" y="{y}">{t}</text>'
    E=H+320
    return reg.replace(f'viewBox="0 0 {W} {H}" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="#fff"/>',f'viewBox="0 0 {W} {E}" width="{W}" height="{E}"><rect width="{W}" height="{E}" fill="#fff"/>').replace('</svg>',leg+'</g></svg>')
if __name__=="__main__":
    for STYLE in ("plugs","loom","ribbon"):
        globals()["STYLE"]=STYLE
        open(f"v4-{STYLE}-structure.svg","w").write(build("line"))
        reg=build("regions"); open(f"v4-{STYLE}-regions.svg","w").write(reg)
        open(f"v4-{STYLE}-annotated.svg","w").write(annotated(reg))
    print("ok")
