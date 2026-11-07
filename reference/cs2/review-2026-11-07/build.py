import base64, html, json, re, sys
sys.path.insert(0, '.')
from data import SECTIONS
E = html.escape
KIND = {"order":("order","k-order"),"clarity":("clarity","k-clarity"),"ai":("AI pattern","k-ai"),"fact":("fact","k-fact"),"typo":("typo","k-typo")}

VERDICT = """
<p><b>Revised 7 Nov after your comment: keep the order you have.</b> You moved the right rail block down on purpose, so target and pace land right before Falling behind and the reader sees the dates and what moves them together. That works. Capacity (Personalized timeline) still comes before the rail, which is set from it, and the Saturday deadline and rollover still come before Buffer flow and Start of week. Nothing on the page is used before it is defined once the copy fixes below go in.</p>
<ol>
<li><b>Give the right rail block its own headline.</b> Today it repeats the rollover half's headline word for word, which the cold reader took for a duplicate render. Proposal in that block: The Action Hub keeps two dates for the Pathway someone is on: where they’re aiming and where they’re headed (3 lines). It can keep the Falling behind eyebrow, since it now opens that part of the page.</li>
<li><b>Define target and pace in plain words where they first show up.</b> Competitive analysis card 01 and the Growth Journey body mention them early. The rewrites for those two (card 01, Growth Journey 2) say what each date is without naming the rail, so the rail can still be where they are explained in full.</li>
<li><b>Give the rollover half one headline at three lines</b> (proposal in that block).</li>
</ol>
<p>My first pass said to move the rail up after Action hub and Personalized timeline up before it. That was based on terms being used before they were defined; with the two copy fixes above, that problem is gone, and your reason for the placement holds. Those two move findings are withdrawn.</p>
"""

ORDER = """
<div class="panel"><h3>Order, unchanged</h3><ol>
<li>Hero</li><li>Competitive analysis</li><li>The foundation we built on</li><li>Growth Journey</li><li>Pathway</li><li>Action hub</li><li>Action item</li><li>Personalized timeline</li><li>Calendar setup</li><li>Schedule view</li><li class="moved">Falling behind, part 1 (right rail): new headline</li><li class="moved">Falling behind, part 2 (rollover): three line headline</li><li>Buffer flow</li><li>Start of week</li><li>Ending</li></ol></div>
"""

HERO_INTRO = """<p>Haven style: left says what Mondai is, right gives the background. The left line is the one shared by all three Mondai case studies, so whatever you pick there has to be pasted into the design system case study and the third one too. The background comes from your own Background block (an AI curriculum in a fixed order, calendar sync planned, no framework joining them, your role was to build it).</p>"""

HERO = [
 dict(name="A: keep your line, the right column does the work", pick=True,
  left="Mondai is an AI tech career navigator designed for the next generation of hustlers.",
  right="When I started, Mondai’s AI could already write each person a curriculum for getting into tech, in a fixed order, and calendar sync was planned. Nothing connected the two. There was no way to turn a long route into weeks someone could finish, or to show them where they stood. My role was to design that framework: how the route is organized, how much of it lands in each week and what happens when a week runs short or ends early.\n\nMondai has three case studies. This one covers the framework; the design system and [third case study] each have their own.",
  why="Pick. The shared line stays as it is in the other two case studies, so nothing else changes. The right column carries the concrete part the cold reader missed: what the AI does, what was missing and what you designed, in the same order the page shows it."),
 dict(name="B: a concrete shared line, a shorter right column", pick=False,
  left="Mondai is an AI career tool that writes each person a route into tech and fits it around their week.",
  right="Its curriculum ran in a fixed order and calendar sync was planned, but nothing joined them. I designed the framework that does, from the whole route down to a single week, including the weeks that don’t go to plan.\n\nAlso from Mondai: the design system and [third case study].",
  why="Take this if the shared line matters more to you than the edit cost. The cold reader found navigator and hustlers told them nothing concrete. It means changing the line in all three case studies."),
]

END_INTRO = """<p>The Ending base frame has an eyebrow (20px), one large line (Satoshi Medium 96 at 1291px) and a smaller line (24px). Both large lines measure 2 lines at that size. Neither option claims an outcome. A fuller reflection needs facts I do not have: whether the framework shipped, anything from testing or use and what you would change now.</p>"""

END = [
 dict(name="B: the stance the page acts out", pick=True,
  eb="In reflection", big="When a week and a plan disagree, the plan gives way.",
  small="Unfinished work rolls over on its own, a run of short weeks brings a lower capacity and a long absence rebuilds the plan from today. Each change shows up at the start of the week, so nothing moves unseen.",
  why="Pick. It names the one idea every screen here acts out without saying it, which is what the cold reader half found on their own (no guilt mechanics, no auto moving). Each clause traces to a block already on the page: Falling behind, Recalibration, Reset and the Rollover caption."),
 dict(name="A: the question and what comes next", pick=False,
  eb="In reflection", big="Does the plan fit the week someone actually has?",
  small="That question sat behind every screen here, and this framework was Mondai’s first answer to it. Next is the Action Item page, once the AI can fill more of it.",
  why="The earlier ending session's pick, built on Haven's short ending. It ends looking forward, but the next step is only as true as the Action item block's \"room to grow\"; confirm it before using it."),
]

CHECKS = """
<ul>
<li><b>Cold read:</b> one fresh reader (a hiring manager who knows nothing about Mondai), given only the frame text in reading order, no screenshots. Its flags are quoted as sources on the findings. Flags caused only by not seeing the screens (no picture of the rail, the magenta tag) were dropped.</li>
<li><b>Humanizer:</b> loaded as the skill. Every paragraph was audited; every proposed line here is the final pass after a draft and an audit, and has no em dashes, en dashes or Oxford commas. Paragraphs with no AI pattern finding passed as written.</li>
<li><b>Product facts:</b> the Mondai repo (ritacompany/mondai) could not be attached in this session; the attach was refused by the session's permission check. So the archive and DECISIONS.md are <b>unchecked</b>. Claims were checked instead against the CS2 record in the portfolio repo, which cites the archive by line. Where a finding names the archive, that line is as cited by the record.</li>
<li><b>Measurement:</b> headlines and captions were measured with Satoshi Medium and Regular (and DM Sans) in a browser, with tracking calibrated so three current headlines break exactly where they do in your frame. Every proposed headline keeps 3 lines; every proposed caption stays inside 3.</li>
<li><b>Not run:</b> the three run reader check from WORKING_LOOP on the proposed text, and a second cold read after the moves.</li>
</ul>
"""

def img64(name):
    if not name: return ""
    b = base64.b64encode(open('img/'+name,'rb').read()).decode()
    return f'data:image/png;base64,{b}'

ids=[]
secs=[]
imgcache={}
for s in SECTIONS:
    cur = "".join(f'<div class="field{" hl" if lab.startswith("Headline") else ""}"><span class="lab">{E(lab)}</span><span class="txt">{E(t)}</span></div>' for lab,t in s["cur"])
    fig=""
    if s["img"]:
        if s["img"] not in imgcache: imgcache[s["img"]]=img64(s["img"])
        fig=f'<figure><img src="{imgcache[s["img"]]}" alt="Frame screenshot: {E(s["name"])}" loading="lazy"><figcaption>Figma node {s["node"]}</figcaption></figure>'
    fs=[]
    for i,(k,lab,c,p,why,src) in enumerate(s["f"],1):
        fid=f'{s["id"]}-{i}'; ids.append(fid)
        kn,kc=KIND[k]
        unchanged = p.lower().startswith("unchanged") or p.startswith("See ") or p.startswith("Move") or p.startswith("Use one") or p.startswith("Your call") or p.startswith("Withdrawn") or p.startswith("Keep it")
        fs.append(f'''<article class="find" id="{fid}">
<div class="fhead"><span class="num">{s["name"].split(" (")[0].split(",")[0]} {i}</span><span class="chip {kc}">{kn}</span><span class="src">{E(lab)}</span>
<span class="tog" role="group" aria-label="Mark finding"><button type="button" class="a" aria-pressed="false">Accept</button><button type="button" class="r" aria-pressed="false">Reject</button></span></div>
<div class="pair"><div class="was{" nostrike" if unchanged else ""}"><span class="tag">Now</span><span class="t">{E(c)}</span></div>
<div class="now"><span class="tag">{"Do" if unchanged else "New"}</span><span class="t">{E(p)}</span></div></div>
<p class="why">{E(why)}</p><p class="src">Source: {E(src)}</p></article>''')
    secs.append(f'''<section class="block" id="{s["id"]}"><h2>{E(s["name"])}</h2><div class="split"><div class="cur">{fig}{cur}</div><div class="finds">{"".join(fs)}</div></div></section>''')

def opt(o, hero):
    tag = '<span class="pickTag">My pick</span>' if o["pick"] else ''
    if hero:
        right = "".join(f'<p class="r">{E(x)}</p>' for x in o["right"].split("\n\n"))
        mock=f'<div class="mock"><p class="l">{E(o["left"])}</p>{right}</div>'
    else:
        mock=f'<div class="mock"><p class="eb">{E(o["eb"])}</p><p class="big">{E(o["big"])}</p><p class="r">{E(o["small"])}</p></div>'
    return f'<div class="panel opt{" pick" if o["pick"] else ""}">{tag}<h3>{E(o["name"])}</h3>{mock}<p class="why">{E(o["why"])}</p></div>'

SHORT={"s-rail":"Right rail","s-fb":"Rollover","s-end":"Ending frame","s-haven":"Haven","s-sow":"Start of week","s-hero":"Hero"}
toc = "".join(f'<a href="#{s["id"]}">{E(SHORT.get(s["id"], s["name"]))}</a>' for s in SECTIONS)
t=open('template.html').read()
t=t.replace('<nav id="toc"></nav>', f'<nav id="toc"><a href="#verdict">Order</a><a href="#hero">Background options</a><a href="#ending">Ending options</a>{toc}</nav>')
for k,v in {"__VERDICT__":VERDICT,"__ORDER__":ORDER,"__HERO_INTRO__":HERO_INTRO,"__HERO__":"".join(opt(o,True) for o in HERO),
            "__END_INTRO__":END_INTRO,"__END__":"".join(opt(o,False) for o in END),"__CHECKS__":CHECKS,"__SECTIONS__":"\n".join(secs),"__IDS__":json.dumps(ids)}.items():
    t=t.replace(k,v)
open('framework-cs-review.html','w').write(t)
bad=[c for c in ['—','–',' -- '] if c in re.sub(r'<style>.*?</style>','',t,flags=re.S)]
print(len(ids),'findings', round(len(t)/1e6,2),'MB', 'dashes:',bad)
