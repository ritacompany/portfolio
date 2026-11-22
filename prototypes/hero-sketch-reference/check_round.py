# Output checks for round 5. Each mode prints one token on pass.
import sys,re,colorsys,os
from check_cables import check
STY=("back","top","side")
def load(path,style=None):
    src=open(path).read(); src=src[:src.index('if __name__') if 'if __name__' in src else src.index('open("structure.svg"')]
    ns={}; exec(src,ns)
    if style: ns["STYLE"]=style
    return ns
def svg(st,kind): return open(f"v4-{st}-{kind}.svg").read()
mode=sys.argv[1]; bad=[]
BOX='<rect x="404" y="1084" width="160" height="96"'
if mode=="box":
    # whole box visible: opaque, drawn after the pipe and every cable, nothing laid over it but plug heads
    for st in STY:
        for k in ("regions","structure"):
            t=svg(st,k); i=t.find(BOX)
            last_cable=max(t.rfind('stroke-width="6" fill="none"'),t.rfind('stroke-width="3" fill="none"',0,t.find('cx="600" cy="676"')))
            seg=t[i:t.find('>',i)]
            if i<0 or i<last_cable or 'opacity' in seg or 'opacity=".35"' in t: bad.append(f"{st}-{k}")
    print("BOX_OK" if not bad else f"BAD {bad}")
elif mode=="clean":
    # nothing new added to the tube: no gasket, sleeve, clip, ribbon or connector block
    for st in STY:
        for k in ("regions","structure"):
            t=svg(st,k)
            for m in ('y="1146" width="176"','stroke-width="58"','width="28" height="46"','y="978" width="68"','#3a3a44','#5b5b66'):
                if m in t: bad.append(f"{st}-{k}:{m}")
    print("CLEAN_OK" if not bad else f"BAD {bad}")
elif mode=="placements":
    ns=load("build.py"); A=[(404,1060,594,1182)]
    faces={}
    for st in STY:
        c,side,plugs=ns["routes"](st); r=dict(ns); r["CABLES"]=c; r["SIDE"]=side
        if not check(r,A,st): bad.append(st)
        faces[st]="hidden" if not plugs else ("top" if all(y+h<=1090 and y<1084 for x,y,w,h in plugs) else ("right" if all(x+w>564 and x>=556 for x,y,w,h in plugs) else "?"))
    if sorted(faces.values())!=["hidden","right","top"]: bad.append(f"faces {faces}")
    print("PLACEMENTS_OK" if not bad else f"BAD {bad}")
elif mode=="planter":
    for st in STY:
        for k in ("regions","structure"):
            t=svg(st,k); p=t.find('d="M216 610 H284'); c=t.rfind('d="M250 760 V400"')
            seg=t[t.rfind('<',0,p):t.find('>',p)]
            if p<0 or c<0 or p<c or 'opacity' in seg or 'fill="none"' in seg: bad.append(f"{st}-{k}")
    print("PLANTER_OK" if not bad else f"BAD {bad}")
elif mode=="coral":
    C=load("build.py")["C"]
    h=lambda x: colorsys.rgb_to_hsv(*[int(x[i:i+2],16)/255 for i in (1,3,5)])[0]*360
    d=abs(h(C["coral"])-h(C["pipe"])); d=min(d,360-d)
    print("CORAL_OK" if d>=60 else f"BAD hue gap {d:.0f}")
elif mode=="flowers":
    a,b=load("build.py"),load("build_v3.py")
    for k in ("BIG1","BIG2","NOODLE","SMALL","SPRAY","STEMS","CORAL"):
        if a[k]!=b[k]: bad.append(k)
    print("FLOWERS_OK" if not bad else f"BAD {bad}")
