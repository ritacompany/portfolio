# The real question: how do cables get from the box into the tube?
# A: box fully inside the tube, smaller. B: box outside, cables pass through one hole in the wall.
import re
src=open('_base.py').read()
OLD_BOX=re.search(r"    o\.append\(f'<rect x=\"404\".*?\n    for x in \(440,480,520,548\).*?\n",src,re.S).group(0)
UP=[" C{a} 1060 582 1040 582 980 V590 Q582 572 562 560"," C{a} 1055 600 1035 600 970 V548"," C{a} 1060 618 1030 618 980 V590 Q618 572 638 560"]
GREY="#5b5b66"
V={
"inside":dict(
  cables=[f"M440 1096{UP[0].format(a=440)}",f"M470 1096{UP[1].format(a=470)}",f"M500 1096{UP[2].format(a=500)}"],
  side="M472 886 H550 Q566 886 566 902 V1030 C566 1070 530 1070 530 1096",
  box="""    o.append(f'<rect x="420" y="1104" width="124" height="44" rx="5" fill="{f("power")}" stroke="{st("power")}" stroke-width="3"/>')
    for x in (440,470,500,530): o.append(f'<rect x="{x-7}" y="1092" width="14" height="13" fill="{f("cable")}" stroke="{st("cable")}" stroke-width="2"/>')
"""),
"hole":dict(
  cables=["M440 1186 C440 1166 476 1172 476 1152 C476 1090 582 1050 582 980 V590 Q582 572 562 560",
          "M470 1186 C470 1168 484 1170 484 1152 C484 1085 600 1045 600 970 V548",
          "M500 1186 C500 1168 492 1170 492 1152 C492 1085 618 1040 618 980 V590 Q618 572 638 560"],
  side="M472 886 H550 Q566 886 566 902 V1030 C566 1090 500 1110 500 1152 C500 1170 530 1166 530 1186",
  box=f"""    o.append(f'<rect x="404" y="1194" width="160" height="80" rx="6" fill="{{f("power")}}" stroke="{{st("power")}}" stroke-width="3"/><rect x="564" y="1224" width="10" height="20" fill="{{f("power")}}" stroke="{{st("power")}}" stroke-width="2"/>')
    for x in (440,470,500,530): o.append(f'<rect x="{{x-7}}" y="1182" width="14" height="13" fill="{{f("cable")}}" stroke="{{st("cable")}}" stroke-width="2"/>')
    o.append(f'<rect x="460" y="1144" width="56" height="16" rx="8" fill="{{"#fff" if line else "{GREY}"}}" stroke="{{"#111" if line else "{GREY}"}}" stroke-width="3"/>')
"""),
}
for name,v in V.items():
    s=src.replace("W,H=900,1200","W,H=900,1300")
    s=re.sub(r'CABLES=\[.*?\]\n','CABLES='+repr(v['cables'])+'\n',s,flags=re.S)
    s=re.sub(r'SIDE="[^"]*"','SIDE="'+v['side']+'"',s)
    s=s.replace(OLD_BOX,"")
    # draw the box after the cables so the grommet sits on top
    s=s.replace("    for i in range(8): o.append(f'<ellipse cx=\"600\"",v['box']+"    for i in range(8): o.append(f'<ellipse cx=\"600\"")
    ns={}; exec(s,ns)
    for m,tag in (("regions","regions"),("line","structure")):
        open(f"cable-{name}-{tag}.svg","w").write(ns["build"](m))
print("ok")
