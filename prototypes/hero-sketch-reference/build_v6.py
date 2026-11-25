# Hero sketch v6: the layout from build.py (STYLE "top") with every part decision in HANDOFF.md drawn in.
# Outputs: v6-structure.svg (line art on white), v6-<palette>-regions.svg (flat color on black, one per palette).
# Every element is wrapped in <g data-part="..."> so check_v6.py can test the drawing against the decisions.
import math, json
W,H=900,1200
PW=104
LEFT="M250 520 V800 Q250 860 310 860 H600"
RIGHT="M600 600 V1010 Q600 1100 510 1100 H330"

# Cables: the three thick cables up the right leg, from the collar plugs on top of the box to the grips.
TOP={582:"V590 Q582 572 562 560",600:"V548",618:"V590 Q618 572 638 560"}
ROUTE=[(582,1100),(600,1112),(618,1124)]
PLUGX=(494,518,542)
CABLES=[f"M{p} 1072 C{p} 1058 {X} 1064 {X} 1010 {TOP[X]}" for p,(X,Y) in zip(PLUGX,ROUTE)]
SIDE="M472 886 H554 Q570 886 570 902 V1010 C570 1060 470 1056 470 1072"   # connector cable to the fourth plug
SIDEPLUG=470
GRIPS=[(560,556,-55),(600,544,0),(640,556,55)]

# Precious coral: slim smooth branches forking like a little tree, growing from the pot.
CORAL=["M250 612 V480",
       "M250 480 Q246 430 214 392 Q192 362 184 318",
       "M250 480 Q262 420 298 374 Q324 340 330 296",
       "M214 392 Q176 384 150 400 Q128 414 118 438",
       "M184 318 Q170 288 176 252",
       "M184 318 Q206 292 214 262",
       "M330 296 Q324 262 338 230",
       "M330 296 Q356 280 380 286",
       "M298 374 Q338 370 364 392 Q380 406 382 430",
       "M250 540 Q224 530 204 546"]
CORAL_W=13
FORKS=[(250,480),(214,392),(298,374),(184,318),(330,296)]          # wire spray sits on these
SORREL=[(234,444),(282,402),(196,366),(146,404),(322,334),(356,396),(250,566)]  # on the branch surface, off the tips

# Right side flowers. Hellebores nod: the stem rises, arcs over and the head hangs facing down.
# Flowers hold their own against the pipe (his rule): hellebores about as wide as the pipe is thick times two,
# turned to face outward and down at an angle, not hanging. tilt is the turn of the face away from straight down.
HELLEBORE=[dict(grip=0,head=(506,290),r=128,tilt=45),
           dict(grip=2,head=(768,404),r=116,tilt=-45)]
for h in HELLEBORE:
    x,y=h["head"]; t=math.radians(h["tilt"]); vx,vy=0,-0.45*h["r"]
    ax,ay=x+vx*math.cos(t)-vy*math.sin(t),y+vx*math.sin(t)+vy*math.cos(t)
    gx,gy=GRIPS[h["grip"]][:2]
    h["attach"]=(round(ax),round(ay))
    h["stem"]=f"M{gx} {gy} C{gx+(10 if gx>600 else 8)} {gy-100} {ax+(-30 if gx>600 else 40):.0f} {ay+90:.0f} {ax:.0f} {ay:.0f}"
NOODLE=[dict(grip=1,a=(600,544),b=(684,112),r=48),
        dict(grip=0,a=(560,556),b=(452,512),r=42),
        dict(grip=2,a=(640,556),b=(846,196),r=46)]
SORREL_R=30   # pinwheel width, big enough to read next to the pipe

def g(part,body): return f'<g data-part="{part}">{body}</g>'

def pinwheel(x,y,fill,st,line):
    s=""
    for i in range(5):
        a=i*72+18; r=math.radians(a); cx,cy=x+math.cos(r)*SORREL_R*0.42,y+math.sin(r)*SORREL_R*0.42
        s+=f'<ellipse cx="{cx:.1f}" cy="{cy:.1f}" rx="{SORREL_R*0.58:.1f}" ry="{SORREL_R*0.33:.1f}" transform="rotate({a+28} {cx:.1f} {cy:.1f})" fill="{fill}" stroke="{st}" stroke-width="{1.5 if line else 1}"/>'
    return s+f'<circle cx="{x}" cy="{y}" r="{SORREL_R*0.14:.1f}" fill="{st if line else "#E1EC9B"}"/>'

def spray(x,y,col,w):
    s=""
    for i in range(11):
        a=i*2*math.pi/11+0.4; r=(30,22,34)[i%3]
        s+=f'<path d="M{x} {y} q{math.cos(a+0.45)*r*0.5:.1f} {math.sin(a+0.45)*r*0.5:.1f} {math.cos(a)*r:.1f} {math.sin(a)*r:.1f}" stroke="{col}" stroke-width="{w}" fill="none" stroke-linecap="round"/>'
    return s

def beads(p,q,col,fill,sw):
    (x1,y1),(x2,y2)=p,q; n=int(math.hypot(x2-x1,y2-y1)/16)
    s=f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{sw}"/>'
    for i in range(1,n): t=i/n; s+=f'<circle cx="{x1+(x2-x1)*t:.1f}" cy="{y1+(y2-y1)*t:.1f}" r="4" fill="{fill}" stroke="{col}" stroke-width="1.5"/>'
    return s

def hellebore(h,fill,vein,st,line):
    x,y=h["head"]; R=h["r"]; t=math.radians(h["tilt"]); s=""
    petals=[]
    for i in range(5):
        a=math.radians(i*72+90)
        # petal tip on a foreshortened ring below the attachment point: the flower faces down
        tx=x+math.cos(a)*R; ty=y+math.sin(a)*R*0.28+R*0.42
        petals.append((math.sin(a),tx,ty,a))
    bx,by=x,y-R*0.45
    for depth,tx,ty,a in sorted(petals):
        # broad rounded petal: an ellipse from the attachment point to the tip
        mx,my=(bx+tx)/2,(by+ty)/2; L=math.hypot(tx-bx,ty-by); ang=math.degrees(math.atan2(ty-by,tx-bx))
        s+=f'<ellipse cx="{mx:.1f}" cy="{my:.1f}" rx="{L/2+4:.1f}" ry="{R*0.34:.1f}" transform="rotate({ang:.1f} {mx:.1f} {my:.1f})" fill="{fill}" stroke="{st}" stroke-width="{2 if line else 1.2}"/>'
        ux,uy=(tx-bx)/L,(ty-by)/L; px,py=-uy,ux
        for k in (-0.55,-0.2,0.2,0.55):   # veins fanning across the petal as a net
            ex,ey=tx-ux*6+px*R*0.3*k,ty-uy*6+py*R*0.3*k
            s+=f'<path d="M{bx+ux*6:.1f} {by+uy*6:.1f} Q{mx+px*R*0.3*k*1.4:.1f} {my+py*R*0.3*k*1.4:.1f} {ex:.1f} {ey:.1f}" stroke="{vein}" stroke-width="0.9" fill="none"/>'
        for k,(f1,f2) in enumerate(((0.3,0.1),(0.45,-0.12),(0.6,0.08),(0.72,-0.06))):
            s+=f'<circle cx="{bx+(tx-bx)*f1+px*R*f2:.1f}" cy="{by+(ty-by)*f1+py*R*f2:.1f}" r="{2.2 if line else 2.6}" fill="{vein}"/>'
    for k in range(-3,4):   # stamens hanging below the center
        s+=f'<line x1="{x+k*4}" y1="{y+R*0.1:.1f}" x2="{x+k*6}" y2="{y+R*0.62:.1f}" stroke="{vein}" stroke-width="1.2"/>'
    return f'<g transform="rotate({h["tilt"]} {x} {y})">{s}</g>'

def build(mode,P=None):
    line = mode=="line"; K="#111"
    def c(key): return "#fff" if line else P[key]
    def s(key): return K if line else P[key]
    bg="#fff" if line else "#000"
    o=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><rect width="{W}" height="{H}" fill="{bg}"/>']
    # 1 pipe: satin glass, coupling rings where bends meet straight runs, thick rims at the three open ends
    if line:
        body="".join(f'<path d="{p}" stroke="{K}" stroke-width="{PW+6}" fill="none"/>' for p in (LEFT,RIGHT))
        body+="".join(f'<path d="{p}" stroke="#fff" stroke-width="{PW}" fill="none"/>' for p in (LEFT,RIGHT))
        body+='<rect x="546" y="808" width="56" height="104" fill="#fff"/>'
    else:
        body="".join(f'<path d="{p}" stroke="{P["pipe"]}" stroke-width="{PW}" fill="none" opacity=".72"/>' for p in (LEFT,RIGHT))
    rims=""
    for cx,cy,rx,ry in ((250,520,52,14),(600,600,52,14),(330,1100,14,52)):
        rims+=f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{"#fff" if line else P["pipe"]}" stroke="{s("ring")}" stroke-width="{4 if line else 8}"/>'
    o.append(g("pipe",body))
    o.append(g("rims",rims))
    RINGS=[(250,796,"h"),(318,860,"v"),(536,860,"v"),(600,792,"h"),(600,928,"h"),(600,1004,"h")]
    rb=""
    for x,y,d in RINGS:
        w,h=(PW+14,15) if d=="h" else (15,PW+14)
        rb+=f'<rect x="{x-w/2}" y="{y-h/2}" width="{w}" height="{h}" rx="5" fill="{c("ring")}" stroke="{s("ring") if line else P["pipe"]}" stroke-width="2"/>'
    o.append(g("rings",rb))
    # 2 inside the left leg: thin loose wires, the lever connector, its cable to the box
    wires=[f"M{250+dx} 760 C{250+dx+dx*2} 840 {320+dx*3} {880+dx} 400 {886+dx}" for dx in (-8,0,8)]
    o.append(g("wires","".join(f'<path d="{d}" fill="none" stroke="{s(k)}" stroke-width="{2 if line else 3.5}"/>' for d,k in zip(wires,("wire1","wire2","wire3")))))
    o.append(g("sidecable",f'<path d="{SIDE}" stroke="{s("cable4")}" stroke-width="{3 if line else 7}" fill="none"/>'))
    lev=f'<rect x="400" y="866" width="72" height="40" rx="5" fill="{"#fff" if line else P["clear"]}" stroke="{s("clearedge")}" stroke-width="2.5"/>'
    for x in (410,430,450): lev+=f'<rect x="{x}" y="852" width="12" height="20" rx="3" fill="{c("levers")}" stroke="{s("levers")}" stroke-width="2"/>'
    o.append(g("connector",lev))
    # 3 thick cables up the right leg, back half of the spring, cables, front half of the spring
    sp=""
    for i in range(7):
        y=676+i*14; sp+=f'<path d="M623 {y+7} Q600 {y-4} 577 {y}" stroke="{s("spring")}" stroke-width="{3 if line else 6}" fill="none" stroke-linecap="round" opacity="{1 if line else .55}"/>'
    o.append(g("spring_back",sp))
    o.append(g("cables","".join(f'<path d="{d}" stroke="{s(k)}" stroke-width="{3.5 if line else 8}" fill="none"/>' for d,k in zip(CABLES,("cable1","cable2","cable3")))))
    sp=""
    for i in range(7):
        y=676+i*14; sp+=f'<path d="M577 {y} Q600 {y+13} 623 {y+7}" stroke="{s("spring")}" stroke-width="{3 if line else 7}" fill="none" stroke-linecap="round"/>'
    o.append(g("spring",sp))
    # 4 ribbed boot grips at the top of the right leg
    gr=""
    for (x,y,a),k in zip(GRIPS,("grip1","grip2","grip3")):
        inner=f'<rect x="-12" y="-26" width="24" height="38" rx="7" fill="{c(k)}" stroke="{s(k)}" stroke-width="2.5"/>'
        for yy in (-18,-10,-2,6): inner+=f'<line x1="-12" y1="{yy}" x2="12" y2="{yy}" stroke="{K if line else P["ribs"]}" stroke-width="2"/>'
        gr+=f'<g transform="translate({x} {y}) rotate({a})">{inner}</g>'
    o.append(g("grips",gr))
    # 5 the control box, in front of the pipe: panel, glowing windows, vents, collar plugs on top, fat collar into the pipe
    bx=f'<rect x="372" y="1110" width="34" height="38" rx="9" fill="{c("collar")}" stroke="{s("collar")}" stroke-width="2.5"/>'
    bx+=f'<rect x="404" y="1084" width="160" height="96" rx="8" fill="{c("box")}" stroke="{s("box")}" stroke-width="3"/>'
    bx+=f'<rect x="414" y="1094" width="84" height="76" rx="4" fill="none" stroke="{K if line else P["boxline"]}" stroke-width="1.5"/>'
    for yy in (1104,1114,1124): bx+=f'<line x1="424" y1="{yy}" x2="470" y2="{yy}" stroke="{K if line else P["boxline"]}" stroke-width="2"/>'
    bx+=f'<circle cx="448" cy="1150" r="9" fill="{"#fff" if line else P["boxline"]}" stroke="{K if line else P["boxline"]}" stroke-width="2"/>'
    for yy in (1094,1120,1146): bx+=f'<rect x="512" y="{yy}" width="40" height="20" rx="3" fill="{c("glow")}" stroke="{s("glow")}" stroke-width="2"/>'
    o.append(g("box",bx))
    pl=""
    for x,k in zip(PLUGX+(SIDEPLUG,),("plug1","plug2","plug3","plug4")):
        pl+=f'<rect x="{x-9}" y="1066" width="18" height="20" rx="4" fill="{c(k)}" stroke="{s(k)}" stroke-width="2"/>'
    o.append(g("plugs",pl))
    # 6 the pot, then the coral growing out of it
    o.append(g("pot",f'<path d="M222 628 L230 752 Q250 764 270 752 L278 628 Z" fill="{c("pot")}" stroke="{s("pot")}" stroke-width="3"/><rect x="212" y="610" width="76" height="20" rx="6" fill="{c("pot")}" stroke="{s("pot")}" stroke-width="3"/>'))
    cb="".join(f'<path d="{p}" stroke="{K if line else P["coral"]}" stroke-width="{CORAL_W+4 if line else CORAL_W}" fill="none" stroke-linecap="round"/>' for p in CORAL)
    if line: cb+="".join(f'<path d="{p}" stroke="#fff" stroke-width="{CORAL_W-1}" fill="none" stroke-linecap="round"/>' for p in CORAL)
    o.append(g("coral",cb))
    o.append(g("sorrel","".join(pinwheel(x,y,c("sorrel"),s("sorrel") if line else "#d9d4dc",line) for x,y in SORREL)))
    o.append(g("spray","".join(spray(x,y,K if line else P["spray"],1.6 if line else 2.2) for x,y in FORKS)))
    # 7 right side: stems, noodle puffs, nodding hellebores
    st=""
    for h in HELLEBORE: st+=f'<path d="{h["stem"]}" stroke="{s("stem")}" stroke-width="{3 if line else 5}" fill="none" stroke-linecap="round"/>'
    o.append(g("stems",st))
    o.append(g("beaded","".join(beads(n["a"],n["b"],s("beads"),"#fff" if line else P["beads"],2.5 if line else 3.5) for n in NOODLE)))
    nd=""
    for n,k in zip(NOODLE,("noodle1","noodle2","noodle3")):
        x,y=n["b"]; r=n["r"]
        nd+=f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c(k)}" stroke="{s(k)}" stroke-width="2.5"/>'
        for i in range(10):
            a=i*2*math.pi/10; rr=r*(0.6 if i%2 else 0.28); cx,cy=x+math.cos(a)*rr,y+math.sin(a)*rr
            nd+=f'<path d="M{cx-6:.1f} {cy:.1f} q3 -5 6 0 t6 0" stroke="{K if line else P["curl"]}" stroke-width="1.5" fill="none"/>'
    o.append(g("noodles",nd))
    o.append(g("hellebores","".join(hellebore(h,c("hellebore"),K if line else P["vein"],s("hellebore") if line else P["vein"],line) for h in HELLEBORE)))
    o.append('</svg>'); return "".join(o)

# Palettes from his five families (refs/palette-his-25nov.png). Olive dropped; pale yellow only on the hellebore.
F=dict(green="#489E54",dgreen="#215129",peri="#9090F0",navy="#2D1782",pink="#E58598",red="#C12F33",
       yellow="#E1EC9B",violet="#C244F4",dviolet="#54176D")
FIXED=dict(sorrel="#FFFFFF",spray="#D8D8DE",hellebore="#E8EDB4",vein="#54176D",clear="#3a3a4a",clearedge="#B9B9D9",
           ribs="#000000",boxline="#1a1a22",curl="#000000",stem="#489E54",beads="#489E54")
def pal(**k): d=dict(FIXED); d.update(k); return d
PALETTES={
 # A: periwinkle glass. Pink and green trade places down each leg, violet on the spring and the side cable, pink glow in the box.
 "a-periwinkle":pal(pipe=F["peri"],ring="#C9C9FF",pot=F["green"],coral=F["pink"],wire1=F["red"],wire2=F["violet"],wire3=F["pink"],
     levers=F["green"],cable1=F["pink"],cable2=F["green"],cable3=F["red"],cable4=F["violet"],grip1=F["green"],grip2=F["red"],grip3=F["green"],
     spring=F["violet"],box=F["dviolet"],glow=F["pink"],collar=F["green"],plug1=F["green"],plug2=F["pink"],plug3=F["green"],plug4=F["pink"],
     noodle1=F["violet"],noodle2=F["pink"],noodle3=F["green"],stem=F["green"],beads=F["dgreen"]),
 # B: pink glass. Periwinkle, green and violet carry the parts, violet glows. No red: it would vanish into the pink glass.
 "b-pink":pal(pipe=F["pink"],ring="#F7C6D0",pot=F["peri"],coral=F["green"],wire1=F["green"],wire2=F["violet"],wire3=F["violet"],
     levers=F["peri"],cable1=F["peri"],cable2=F["violet"],cable3=F["peri"],cable4=F["violet"],grip1=F["green"],grip2=F["peri"],grip3=F["violet"],
     spring=F["green"],box=F["dgreen"],glow=F["violet"],collar=F["peri"],plug1=F["violet"],plug2=F["peri"],plug3=F["green"],plug4=F["peri"],
     noodle1=F["violet"],noodle2=F["peri"],noodle3=F["green"],stem=F["dgreen"],beads=F["green"]),
 # C: green glass. Pink and violet are the warm notes on both legs, periwinkle on the hardware, pink glow.
 "c-green":pal(pipe=F["green"],ring="#A9DDB2",pot=F["violet"],coral=F["pink"],wire1=F["peri"],wire2=F["red"],wire3=F["peri"],
     levers=F["violet"],cable1=F["violet"],cable2=F["pink"],cable3=F["violet"],cable4=F["pink"],grip1=F["pink"],grip2=F["violet"],grip3=F["pink"],
     spring=F["peri"],box=F["navy"],glow=F["pink"],collar=F["violet"],plug1=F["peri"],plug2=F["violet"],plug3=F["peri"],plug4=F["violet"],
     noodle1=F["pink"],noodle2=F["peri"],noodle3=F["violet"],stem=F["dgreen"],beads=F["peri"]),
}
if __name__=="__main__":
    open("v6-structure.svg","w").write(build("line"))
    for name,P in PALETTES.items(): open(f"v6-{name}-regions.svg","w").write(build("regions",P))
    json.dump({"families":F,"palettes":PALETTES},open("v6-palettes.json","w"),indent=1)
    print("ok")
