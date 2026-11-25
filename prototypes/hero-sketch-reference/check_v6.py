# Output checks for the v6 drawing and its palettes. Each mode prints one token on pass.
#   python3 check_v6.py decisions [build file]   every HANDOFF part decision is in the drawing
#   python3 check_v6.py cables                    every cable stays inside the glass
#   python3 check_v6.py spray                     every wire spray burst is visible in each palette render
#   python3 check_v6.py spread                    colors are spread, not grouped by part cluster
import sys, re, math, json, os, subprocess
from check_cables import check as cables_inside, pts

def load(path):
    src=open(path).read(); cut=src.find('if __name__'); ns={"__name__":"check"}
    exec(src[:cut] if cut>0 else src, ns); return ns

FAM={"#489E54":"green","#215129":"green","#9090F0":"peri","#2D1782":"peri","#E58598":"pink","#C12F33":"pink",
     "#E1EC9B":"yellow","#88982F":"yellow","#C244F4":"violet","#54176D":"violet"}
TOUCH=[("pipe","pot"),("pot","coral"),("pipe","levers"),("pipe","spring"),("pipe","box"),("pipe","collar"),("box","collar"),("box","glow"),
       ("cable1","grip1"),("cable2","grip2"),("cable3","grip3"),("cable1","plug1"),("cable2","plug2"),("cable3","plug3"),("cable4","plug4")]
TOUCH+=[("pipe",f"wire{i}") for i in (1,2,3)]+[("pot",f"wire{i}") for i in (1,2,3)]+[("levers",f"wire{i}") for i in (1,2,3)]
TOUCH+=[("box",f"cable{i}") for i in (1,2,3)]+[("hellebore",f"noodle{i}") for i in (1,2,3)]
TOUCH+=[("pipe",f"cable{i}") for i in (1,2,3,4)]+[("spring",f"cable{i}") for i in (1,2,3)]
LEFT_PARTS=["pot","coral","wire1","wire2","wire3","levers","collar","noodle2"]
RIGHT_PARTS=["cable1","cable2","cable3","grip1","grip2","grip3","spring","plug1","plug2","plug3","noodle1","noodle3","box","glow"]

def dist_to_paths(p,paths):
    return min(math.hypot(p[0]-q[0],p[1]-q[1]) for d in paths for q in pts(d,1))

def decisions(path):
    ns=load(path); bad=[]
    need=["SORREL","FORKS","HELLEBORE","NOODLE","GRIPS","CORAL"]
    miss=[k for k in need if k not in ns]
    if miss: return f"BAD missing {miss}"
    if any(k in ns for k in ("BIG1","BIG2","SMALL")): bad.append("placeholder flower lists still present")
    ends=[pts(d,1)[-1] for d in ns["CORAL"]]
    for x,y in ns["SORREL"]:
        if dist_to_paths((x,y),ns["CORAL"])>ns["CORAL_W"]: bad.append(f"sorrel off the coral at {x},{y}")
        if min(math.hypot(x-a,y-b) for a,b in ends)<18: bad.append(f"sorrel on a branch tip at {x},{y}")
    if len(ns["SORREL"])<5: bad.append("fewer than 5 sorrel")
    for x,y in ns["FORKS"]:
        if dist_to_paths((x,y),ns["CORAL"])>2: bad.append(f"spray not on the coral at {x},{y}")
    if len(ns["FORKS"])<4: bad.append("fewer than 4 wire sprays")
    if len(ns["HELLEBORE"])!=2 or len(ns["NOODLE"])!=3: bad.append("flower count")
    if ns["CORAL_W"]>15: bad.append("coral not slim")
    # his rule: flowers big enough to hold their own next to the pipe; hellebores face out, not hang
    pw=ns["PW"]
    for h in ns["HELLEBORE"]:
        if h["r"]<0.9*pw: bad.append(f"hellebore r {h['r']} small next to a {pw}px pipe")
        if not 30<=abs(h["tilt"])<=70: bad.append(f"hellebore tilt {h['tilt']} hangs or stands, not facing out")
    for n in ns["NOODLE"]:
        if n["r"]<0.33*pw: bad.append(f"noodle puff r {n['r']} small")
    if ns.get("SORREL_R",0)<0.22*pw: bad.append("sorrel small")
    svg=ns["build"]("line")
    for part in ("rings","rims","pot","coral","sorrel","spray","wires","connector","cables","spring","grips","box","plugs","stems","beaded","noodles","hellebores"):
        if f'data-part="{part}"' not in svg: bad.append(f"no {part}")
    # spray drawn after the coral and the sorrel so nothing covers it
    if svg.find('data-part="spray"')<svg.find('data-part="sorrel"'): bad.append("spray under sorrel")
    if svg.count("<rect",svg.find('data-part="rings"'),svg.find('data-part="wires"'))<5: bad.append("fewer than 5 coupling rings")
    if svg.count("<line",svg.find('data-part="grips"'),svg.find('data-part="box"'))<9: bad.append("grips not ribbed")
    if svg.count("<rect",svg.find('data-part="box"'),svg.find('data-part="plugs"'))<5: bad.append("box has no windows")
    return "DECISIONS_OK" if not bad else f"BAD {bad}"

def render(svg):
    png=svg[:-4]+".png"
    subprocess.run(["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome","--headless","--disable-gpu","--hide-scrollbars",
                    "--window-size=900,1200",f"--screenshot={png}",f"file://{os.path.abspath(svg)}"],capture_output=True)
    from PIL import Image; return Image.open(png).convert("RGB")

def spray():
    ns=load("build_v6.py"); bad=[]
    for name in ns["PALETTES"]:
        im=render(f"v6-{name}-regions.svg"); px=im.load()
        for fx,fy in ns["FORKS"]:
            n=sum(1 for x in range(fx-36,fx+37) for y in range(fy-36,fy+37)
                  if all(abs(a-b)<=26 for a,b in zip(px[x,y],(0xD8,0xD8,0xDE))))
            if n<40: bad.append(f"{name} spray at {fx},{fy}: {n}px")
    return "SPRAY_OK" if not bad else f"BAD {bad}"

def spread():
    ns=load("build_v6.py"); bad=[]
    for name,P in ns["PALETTES"].items():
        f=lambda k: FAM.get(P[k].upper(),P[k])
        for a,b in TOUCH:
            if f(a)==f(b): bad.append(f"{name}: {a} and {b} both {f(a)}")
        for fam in {f(k) for k in LEFT_PARTS+RIGHT_PARTS}:
            l=any(f(k)==fam for k in LEFT_PARTS); r=any(f(k)==fam for k in RIGHT_PARTS)
            if not (l and r): bad.append(f"{name}: {fam} only on the {'left' if l else 'right'}")
        # measured area: no accent family over 40% of the colored pixels outside the pipe
        im=render(f"v6-{name}-regions.svg"); cnt={}
        fams={k:tuple(int(k[i:i+2],16) for i in (1,3,5)) for k in FAM}
        pipe=tuple(int(P["pipe"][i:i+2],16) for i in (1,3,5))
        for x in range(0,900,3):
            for y in range(0,1200,3):
                c=im.getpixel((x,y))
                if max(c)<40: continue
                k=min(fams,key=lambda h: sum((a-b)**2 for a,b in zip(c,fams[h])))
                if sum((a-b)**2 for a,b in zip(c,fams[k]))>900: continue
                cnt[FAM[k]]=cnt.get(FAM[k],0)+1
        pf=FAM.get(P["pipe"].upper()); cnt.pop(pf,None); tot=sum(cnt.values()) or 1
        top=max(cnt,key=cnt.get)
        if cnt[top]/tot>0.40: bad.append(f"{name}: {top} is {cnt[top]/tot:.0%} of the accent color")
    return "SPREAD_OK" if not bad else f"BAD {bad}"

if __name__=="__main__":
    mode=sys.argv[1]
    if mode=="decisions": out=decisions(sys.argv[2] if len(sys.argv)>2 else "build_v6.py")
    elif mode=="cables":
        ns=load("build_v6.py"); out="CABLES_OK" if cables_inside(ns,[(404,1060,594,1182)],"v6") else "BAD cables"
    elif mode=="spray": out=spray()
    elif mode=="spread": out=spread()
    print(out); sys.exit(0 if out.endswith("_OK") else 1)
