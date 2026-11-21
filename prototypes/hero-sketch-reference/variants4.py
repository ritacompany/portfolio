# His two options, box same size (160x96). Every cable routed along the pipe, checked by check_cables.py.
# 1 "halfway": box exactly where version 3 has it, through the bottom wall. Cables plug into its side, inside the glass.
# 2 "outside": box directly under the pipe, flush. Cables leave through one grommet straight into its top.
import re
from check_cables import check
src=open('build.py').read(); src=src[:src.index('open("structure.svg"')]
OLD_BOX=re.search(r"    o\.append\(f'<rect x=\"404\".*?\n    for x in \(440,480,520,548\).*?\n",src,re.S).group(0)
TOP={582:"V590 Q582 572 562 560",600:"V548",618:"V590 Q618 572 638 560"}
G="#5b5b66"
O={
"halfway":dict(
  cables=[f"M576 {Y} Q{X} {Y} {X} 1010 {TOP[X]}" for X,Y in ((582,1100),(600,1112),(618,1124))],
  side="M472 886 H554 Q570 886 570 902 V1010 Q570 1088 576 1088",
  allowed=[(404,1084,578,1180)],
  box=f"""    o.append(f'<rect x="404" y="1084" width="160" height="96" rx="6" fill="{{f("power")}}" stroke="{{st("power")}}" stroke-width="3"/>')
    if not line: o.append('<rect x="404" y="1084" width="160" height="66" fill="#ff3fd2" opacity=".35"/>')
    o.append(f'<rect x="396" y="1146" width="176" height="12" rx="4" fill="{{"#fff" if line else "{G}"}}" stroke="{{"#111" if line else "{G}"}}" stroke-width="2.5"/>')
    for y in (1088,1100,1112,1124): o.append(f'<rect x="564" y="{{y-6}}" width="14" height="12" fill="{{f("cable")}}" stroke="{{st("cable")}}" stroke-width="2"/>')
"""),
"outside":dict(
  cables=[f"M{gx} 1170 V1152 C{gx} 1090 {X} 1080 {X} 1010 {TOP[X]}" for gx,X in ((516,582),(524,600),(532,618))],
  side="M472 886 H554 Q570 886 570 902 V1010 C570 1080 508 1090 508 1152 V1170",
  allowed=[(496,1140,544,1176)],
  box=f"""    o.append(f'<rect x="404" y="1160" width="160" height="96" rx="6" fill="{{f("power")}}" stroke="{{st("power")}}" stroke-width="3"/><rect x="564" y="1198" width="10" height="20" fill="{{f("power")}}" stroke="{{st("power")}}" stroke-width="2"/>')
    for x in (508,516,524,532): o.append(f'<rect x="{{x-4}}" y="1160" width="8" height="10" fill="{{f("cable")}}" stroke="{{st("cable")}}" stroke-width="1.5"/>')
    o.append(f'<ellipse cx="520" cy="1152" rx="24" ry="8" fill="none" stroke="{{"#111" if line else "{G}"}}" stroke-width="5"/>')
"""),
}
ok=True
for name,v in O.items():
    s=src.replace("W,H=900,1200","W,H=900,1300").replace(OLD_BOX,"")
    s=re.sub(r'CABLES=\[.*?\]\n','CABLES='+repr(v['cables'])+'\n',s,flags=re.S)
    s=re.sub(r'SIDE="[^"]*"','SIDE="'+v['side']+'"',s)
    s=s.replace("    for i in range(8): o.append(f'<ellipse cx=\"600\"",v['box']+"    for i in range(8): o.append(f'<ellipse cx=\"600\"")
    ns={}; exec(s,ns)
    ok&=check(ns,v['allowed'],name)
    for m,tag in (("regions","regions"),("line","structure")):
        open(f"box2-{name}-{tag}.svg","w").write(ns["build"](m))
print("ALL_OK" if ok else "FAIL")
