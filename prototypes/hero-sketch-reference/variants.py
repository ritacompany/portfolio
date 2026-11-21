# Three ways to join the power box to the pipe, drawn on the version 3 layout.
import re
src=open('_base.py').read()
TOP_L="V590 Q582 572 562 560"; TOP_R="V590 Q618 572 638 560"
V={
"branch":dict(H=1380,cables=[f"M466 1250 V1120 C466 1070 582 1070 582 1010 {TOP_L}",
   "M480 1250 V1120 C480 1060 600 1065 600 1000 V548",
   f"M494 1250 V1120 C494 1065 618 1060 618 1010 {TOP_R}"],
   side="M472 886 H550 Q566 886 566 902 V1060 C566 1100 508 1090 508 1130 V1250"),
"cap":dict(H=1200,cables=[f"M340 1076 H500 C560 1076 582 1050 582 1000 {TOP_L}",
   "M340 1096 H510 C575 1096 600 1060 600 1000 V548",
   f"M340 1116 H520 C590 1116 618 1070 618 1010 {TOP_R}"],
   side="M472 886 H550 Q566 886 566 902 V1010 C566 1110 420 1136 340 1136"),
"grommets":dict(H=1380,cables=[f"M440 1250 C420 1215 418 1180 430 1152 C440 1110 582 1080 582 1010 {TOP_L}",
   "M480 1250 C470 1210 462 1180 462 1152 C470 1100 600 1070 600 1000 V548",
   f"M520 1250 C515 1205 500 1180 494 1152 C500 1095 618 1065 618 1010 {TOP_R}"],
   side="M472 886 H550 Q566 886 566 902 V1060 C566 1110 540 1130 528 1152 C540 1190 560 1220 552 1250"),
}
OLD_BOX=re.search(r"    o\.append\(f'<rect x=\"404\".*?\n    for x in \(440,480,520,548\).*?\n",src,re.S).group(0)
GREY="#5b5b66"
for name,v in V.items():
    s=src.replace("W,H=900,1200",f"W,H=900,{v['H']}")
    s=re.sub(r'CABLES=\[.*?\]\n','CABLES='+repr(v['cables'])+'\n',s,flags=re.S)
    s=re.sub(r'SIDE="[^"]*"','SIDE="'+v['side']+'"',s)
    if name=="cap":
        s=s.replace("(250,520,52,14),(600,600,52,14),(330,1100,14,52)","(250,520,52,14),(600,600,52,14)")
        box="""    o.append(f'<rect x="232" y="1034" width="108" height="132" rx="10" fill="{f("power")}" stroke="{st("power")}" stroke-width="3"/><rect x="220" y="1088" width="12" height="24" fill="{f("power")}" stroke="{st("power")}" stroke-width="2"/>')
    for y in (1076,1096,1116,1136): o.append(f'<rect x="340" y="{y-7}" width="14" height="14" fill="{f("cable")}" stroke="{st("cable")}" stroke-width="2"/>')
"""
    else:
        box="""    o.append(f'<rect x="400" y="1250" width="168" height="92" rx="6" fill="{f("power")}" stroke="{st("power")}" stroke-width="3"/><rect x="568" y="1286" width="10" height="20" fill="{f("power")}" stroke="{st("power")}" stroke-width="2"/>')
"""
        if name=="branch":
            box+=f"""    if line: o.append('<path d="M484 1150 V1250" stroke="#111" stroke-width="62"/><path d="M484 1150 V1250" stroke="#fff" stroke-width="56"/>')
    else: o.append(f'<path d="M484 1148 V1250" stroke="{{C["pipe"]}}" stroke-width="56" opacity=".55"/>')
    o.append(f'<rect x="446" y="1222" width="76" height="28" rx="5" fill="{{"#fff" if line else "{GREY}"}}" stroke="{{"#111" if line else "{GREY}"}}" stroke-width="3"/>')
"""
        else:
            box+="""    for x in (440,480,520,552): o.append(f'<rect x="{x-8}" y="1238" width="16" height="14" fill="{f("cable")}" stroke="{st("cable")}" stroke-width="2"/>')
"""
    s=s.replace(OLD_BOX,box)
    if name=="grommets":
        s=s.replace("    # coral and left garden",f"""    for gx in (430,462,494,528): o.append(f'<ellipse cx="{{gx}}" cy="1152" rx="12" ry="7" fill="{{"#fff" if line else "{GREY}"}}" stroke="{{"#111" if line else "{GREY}"}}" stroke-width="3"/>')
    # coral and left garden""")
    if name=="branch":
        # stub joint: open the pipe floor where the stub meets it in line art
        s=s.replace("    # power supply, cables, spring","    if line: o.append('<rect x=\"457\" y=\"1146\" width=\"54\" height=\"10\" fill=\"#fff\"/>')\n    # power supply, cables, spring")
    ns={}; exec(s,ns)
    open(f"bottom-{name}-regions.svg","w").write(ns["build"]("regions"))
    open(f"bottom-{name}-structure.svg","w").write(ns["build"]("line"))
print("ok")
