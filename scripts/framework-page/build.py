#!/usr/bin/env python3
"""Usage: python3 scripts/framework-page/build.py site/mondai/framework/index.html scripts/framework-page/spec.json scripts/framework-page/page.tpl
Generates site/mondai/framework/index.html from the Figma read of Transported Framework CS
(5812:16446), 9 Nov. Text is HTML at Figma positions; product screens and diagrams are 2x exports.
The four extra Start of week frames (templates 2 to 5) become slides in one carousel."""
import json, html, sys

OUT = sys.argv[1]
SPEC = sys.argv[2]

# Sections: id, Figma y, height
SECS = [
 ("5812:16447", 136, 569, "Introduction"),
 ("5812:16470", 705, 1022, "Competitive analysis"),
 ("5812:16501", 1727, 1027.13, "The foundation we built on"),
 ("5812:16590", 2754.13, 1243, "Growth Journey"),
 ("5812:16769", 3997.13, 1239.56, "Pathway"),
 ("5812:16782", 5236.68, 1410, "Action hub"),
 ("5812:16966", 6646.68, 1741.88, "Action item"),
 ("5812:17084", 8388.56, 847, "Personalized timeline"),
 ("5812:17129", 9235.56, 1503, "Calendar setup"),
 ("5812:17143", 10738.56, 2101, "Schedule view"),
 ("5812:20248", 12839.56, 1971, "Falling behind"),
 ("5812:20351", 14810.56, 1152, "Buffer flow"),
 ("5812:20498", 15962.56, 1305, "Start of week"),
 ("5812:21559", 22487.56, 438, "In reflection"),
]

FIGS = {  # node: (section, file, x, y, w, h, alt)
 "5812:16512": ("5812:16501", "foundation", 160, 2213, 895.5, 377, "The five Pathways, Discovery, Cognition, Networking, Branding and Opportunity, each with Focus Areas and Action Items below it."),
 "5812:16598": ("5812:16590", "growth-journey", 350, 3137, 1090, 695, "The Growth Journey page in Mondai, showing the whole route with its target, pace and progress."),
 "5812:16775": ("5812:16769", "pathway", 0, 4380, 1167, 692, "A Pathway page in Mondai, with its Focus Areas and Action Items in order."),
 "5812:16790": ("5812:16782", "action-hub", 0, 5650, 1166, 734, "The Action Hub in Mondai: the week's headline, its Action Items and the right rail."),
 "5812:16973": ("5812:16966", "action-item", 40, 7030, 892, 1194, "An Action Item page in Mondai, a set of plain containers the AI fills."),
 "5812:17089": ("5812:17084", "timeline", 158, 8797, 308, 298, "Weekly capacity and Action Items in Mondai."),
 "5812:17138": ("5812:17129", "calendar-setup", 351, 9619, 1089, 955, "Calendar setup in Mondai: preferred hours and sharpest hours."),
 "5812:17152": ("5812:17143", "schedule-view", 0, 11215, 1440, 686, "The Action Hub as a schedule, with Action Items placed between the person's own events."),
 "5812:20114": ("5812:17143", "schedule-gaps", 154, 12167, 547, 509, "Rescheduling an Action Item into open time in the week."),
 "5812:20260": ("5812:20248", "right-rail", 392, 13217, 466, 428, "The Action Hub's right rail with the Pathway target, the Pathway pace and days ahead of target."),
 "5812:20316": ("5812:20248", "rollover", 350, 14174, 789, 201, "A week ending with an unfinished Action Item that rolls into the next week."),
 "5812:20346": ("5812:20248", "rollover-effect", 390, 14448, 195, 31, ""),
 "5812:20358": ("5812:20351", "buffer", 390, 15182, 1050, 616, "Mondai celebrating a finished week and offering next week's Action Items to pull forward."),
}

PANELS = {  # frames that draw behind HTML text: node: (section, class, x, y, w, h)
 "5812:17126": ("5812:17084", "panel-example", 505, 8979.56, 563, 115),
 "5812:20259": ("5812:20248", "panel-card", 391, 13215.56, 1009, 430),
 "5812:20311": ("5812:20248", "panel-card", 40, 14172.56, 1100, 203),
 "5812:20250": ("5812:20248", "rule", 0, 13809.56, 1440, 1),
 "5812:20343": ("5812:20248", "vrule", 349.97, 14415.56, 1, 230),
}

# Final copy (reference/cs2/review-2026-11-07/final-copy.md) runs longer than the Figma copy in three
# places. These move what sits below the longer text and grow the section, keeping Figma's gaps:
# hero right column (+87), Capacity body over the Example box (gap 73 kept), Ending body under a three
# line headline (gap 80 kept).
DY = {"5812:17126": 286, "5812:17127": 286, "5812:17128": 286, "5812:21566": 188}
SEC_H = {"5812:16447": 656, "5812:17084": 1133, "5812:21559": 810}

TEMPLATES = [
 ("week-clean-slate", "Template 1 of 5", "Clean slate", "This one only shows when nothing carried over. A week with an open Action Item gets Rollover instead."),
 ("week-catching-up", "Template 2 of 5", "Catching up", "Finishing every Action Item doesn’t close the gap for a user who is behind, so this screen shows how many days they made up last week and points them to finishing early until they’re back on target."),
 ("week-rollover", "Template 3 of 5", "Rollover", "When a week ends unfinished, the Rollover Action Items wait in the new week under a magenta tag. The screen shows where the pace landed and what carried over, so the plan never changes unseen."),
 ("week-recalibration", "Template 4 of 5", "Recalibration", "Rollover handles one unfinished week. When it keeps happening, the screen suggests a capacity that fits the hours the user has been giving. They can take it, set their own or skip it with a warning."),
 ("week-reset", "Template 5 of 5", "Reset", "After a long absence, the old plan is too far behind to catch up to, so the week rebuilds from today with their progress kept. It has one button, because most users would pick keep my plan just because it’s the default."),
]
CAROUSEL_TEXT_IDS = {"5812:20702", "5812:20703", "5812:20704"}

STYLE = {
 "Display/212": "s-display-212", "Display/96": "s-display-96", "Heading/40": "s-heading-40", "": "s-heading-40",
 "Heading/24": "s-heading-24", "Heading/20": "s-heading-20", "Body/16": "s-body-16",
 "Body/Label/12": "s-label-12", "Body/Label/12 C": "s-label-12-c", "Body/Label/14 C": "s-label-14-c", "Body/Label/14": "s-label-14",
}

def color(c):
    if c.startswith("Neutral/"): return "c-neutral-" + c.split("/")[1]
    if c == "Green/400": return "c-green"
    raise SystemExit("unknown color " + c)

def fmt(v):
    v = round(v, 2)
    return str(int(v)) if v == int(v) else str(v)

spec = {s["id"]: s for s in json.load(open(SPEC))}

def text_el(t, sy, tag="p"):
    sy = sy - DY.get(t["id"], 0)
    cls = ["t", STYLE[t["style"]], color(t["color"])]
    if t["font"] == "Bold": cls.append("w-bold")
    if t["align"] == "CENTER": cls.append("a-center")
    style = f"left:{fmt(t['x'])}px;top:{fmt(t['y'] - sy)}px"
    if t["ar"] == "WIDTH_AND_HEIGHT": cls.append("nowrap")
    else: style += f";width:{fmt(t['w'])}px"
    body = t["text"].rstrip()
    paras = [p for p in body.split("\n")]
    if len(paras) > 1:
        inner = "".join(f"<span class=\"para\">{html.escape(p) if p.strip() else ''}</span>" for p in paras if p.strip())
        cls.append("paras")
    else:
        inner = html.escape(body)
    return f'<{tag} class="{" ".join(cls)}" data-figma-node="{t["id"]}" style="{style}">{inner}</{tag}>'

out = []
for sid, sy, sh, label in SECS:
    s = spec[sid]
    parts = []
    for node, (sec, cls, x, y, w, h) in PANELS.items():
        if sec == sid:
            parts.append(f'<span class="{cls}" data-figma-node="{node}" aria-hidden="true" style="left:{fmt(x)}px;top:{fmt(y - sy + DY.get(node, 0))}px;width:{fmt(w)}px;height:{fmt(h)}px"></span>')
    texts = s["texts"]
    for t in texts:
        if t["id"] in CAROUSEL_TEXT_IDS: continue
        tag = "p"
        if t["style"] == "Display/212": tag = "h1"
        elif t["style"] == "Heading/20" and t["color"] in ("Neutral/525", "Neutral/500") and t["w"] == 660: tag = "h2"
        elif t["style"] in ("Heading/40", "") and t["w"] >= 650: tag = "p"
        parts.append(text_el(t, sy, tag))
    for node, (sec, f, x, y, w, h, alt) in FIGS.items():
        if sec != sid: continue
        parts.append(f'<img class="fig" data-figma-node="{node}" src="/assets/framework/{f}@2x.webp" alt="{html.escape(alt)}" width="{round(w)}" height="{round(h)}" loading="lazy" decoding="async" style="left:{fmt(x)}px;top:{fmt(y - sy)}px;width:{fmt(w)}px;height:{fmt(h)}px">')
    if sid == "5812:16447":
        parts.append('<span class="rule" aria-hidden="true" style="top:293px"></span>')
    if sid == "5812:20498":
        slides = []
        for i, (f, lab, title, desc) in enumerate(TEMPLATES):
            slides.append(
                f'<li class="week__slide" aria-label="{html.escape(lab)}">'
                f'<img src="/assets/framework/{f}@2x.webp" alt="The {html.escape(title.lower())} start of week screen in Mondai." width="1017" height="550"{" loading=\"lazy\"" if i else ""}>'
                f'<p class="t s-label-12-c c-neutral-525 week__label"{" data-figma-node=\"5812:20702\"" if i == 0 else ""}>{html.escape(lab)}</p>'
                f'<p class="t s-heading-20 w-bold c-neutral-100 week__title"{" data-figma-node=\"5812:20703\"" if i == 0 else ""}>{html.escape(title)}</p>'
                f'<p class="t s-body-16 c-neutral-300 week__desc" style="width:{[259,461,529,487,529][i]}px"{" data-figma-node=\"5812:20704\"" if i == 0 else ""}>{html.escape(desc)}</p>'
                f'</li>')
        parts.append('<ul class="week" data-figma-node="5812:20504" aria-label="Start of week templates, scroll sideways for more" tabindex="0" style="left:33px;top:371px">' + "".join(slides) + '</ul>')
        dots = "".join(f'<button type="button" class="week-dot" aria-label="Show template {i + 1} of 5"{" aria-current=\"true\"" if i == 0 else ""}></button>' for i in range(5))
        parts.append(f'<div class="week-nav" data-figma-node="5812:20705" style="left:357px;top:{fmt(17071 - sy)}px"><div class="week-dots">{dots}</div><p class="week-hint">Scroll to view more templates</p></div>')
    sh = SEC_H.get(sid, sh)
    out.append(f'      <section class="fw-sec" data-figma-node="{sid}" aria-label="{html.escape(label)}" style="height:{fmt(sh)}px">\n        ' + "\n        ".join(parts) + "\n      </section>")

sections = "\n".join(out)

tpl = open(sys.argv[3]).read()
open(OUT, "w").write(tpl.replace("<!--SECTIONS-->", sections))
print("wrote", OUT)
