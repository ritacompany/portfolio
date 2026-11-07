import html, json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data import SECTIONS
E = html.escape
HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = '/home/user/portfolio/reference/cs2/review-2026-11-07/template.html'
IMGS = json.load(open(os.path.join(HERE, 'imgs.json')))
KIND = {"order":("order","k-order"),"clarity":("clarity","k-clarity"),"ai":("AI pattern","k-ai"),"fact":("fact","k-fact"),"typo":("typo","k-typo")}

VERDICT = """
<p><b>Round 2, 7 Nov. Keep your order.</b> Unchanged from your comment on round 1: the right rail block sits low on purpose, so target and pace land right before Falling behind. What this round adds is the product check: every claim below was checked against the Mondai archive and DECISIONS.md, and a lot of the page holds up word for word. The ones that do not are marked fact, and five of them are worth reading first:</p>
<ol>
<li><b>Pathway order in the foundation diagram</b> puts Networking before Branding; the archive, DECISIONS and your own March message say Branding comes first.</li>
<li><b>Focus Areas</b> are written as a layer people move through in order (foundation, Pathway). In the product they are passive tags and a filter, never a sequence.</li>
<li><b>The streak is settled</b>: DECISIONS 24 Oct says no streak, so your rail copy is right and the 3 Week streak chip in the Buffer flow mock is the stale part.</li>
<li><b>Home screen</b>: Mondai has its own Home page, so card 03, the Action hub body and Schedule view should not call the Action Hub or the list the home.</li>
<li><b>Recalibration and Reset captions</b> each say one thing the archive contradicts (skip with a warning; new target dates).</li>
</ol>
<p>Still from round 1: give the rail block its own headline and the rollover block a three line headline.</p>
"""

ORDER = """
<div class="panel"><h3>Order, unchanged</h3><ol>
<li>Hero</li><li>Competitive analysis</li><li>The foundation we built on</li><li>Growth Journey</li><li>Pathway</li><li>Action hub</li><li>Action item</li><li>Personalized timeline</li><li>Calendar setup</li><li>Schedule view</li><li class="moved">Falling behind, part 1 (right rail): new headline</li><li class="moved">Falling behind, part 2 (rollover): three line headline</li><li>Buffer flow</li><li>Start of week</li><li>Ending</li></ol></div>
"""

HERO_INTRO = """<p>Matched against Haven CS Master's hero (5733:19874, read from Figma 7 Nov). Haven's left column is one 24px line saying who the product is for and what it gives them, starting with Designed as. Its right column is two plain paragraphs: the problem from the user's side, then the project's context. No role statement, no list of other case studies. This draft follows that shape, plainer than round 1's A and more concrete than its B, in your voice from docs/VOICE-draft.md (the user as subject, the reason inside the sentence). The left line is shared by every Mondai case study, so it gets pasted into the design system one too.</p>"""

HERO = [
 dict(name="Haven, as it stands (for comparison)", pick=False, ref=True,
  left="Designed as a way for LGBTQIA+ youth to gain access to affirming environments.",
  right="For many LGBTQIA+ teenagers, finding a sense of belonging and acceptance can be a difficult and isolating experience. The lack of access to affirming environments in their homes and local communities often leads to severe mental health consequences including an increase risk of suicide.\n\nThis project was developed as part of a UX bootcamp. The brief was to create a functional product for a specific user group and include a way to connect users with an expert.",
  why="Left: who and what. Right: the problem, then the context of the project."),
 dict(name="Framework CS, round 2 draft", pick=True,
  left="Designed as an AI guide for people from underrepresented backgrounds working their way into a tech career.",
  right="Mondai builds each user a curriculum for the tech career they choose, called their Growth Journey, and it can take months to finish. Most users don’t have the same hours free every week, so a plan that expects a steady pace would have them falling behind from the first week.\n\nThis case study covers the weekly framework I designed to turn that curriculum into weeks the user can finish: how much lands in each week, how it fits around their calendar and what happens when a week runs short or ends early.",
  why="My pick. Left line: the archive's own audience (emerging technologists from underrepresented backgrounds) and its word for what Mondai is (a guide, not a curriculum), in Haven's Designed as form; working their way keeps it asset framed. Right, paragraph 1: the problem the archive calls the framework's core diagnosis, that this audience does not have a steady week. Paragraph 2: the project context, naming the three things the page then shows in order. Facts: career selection generates the Growth Journey (CONFIRMED); a fixed weekly cadence would set this audience up to fail from week one (CONFIRMED, Archive:68 and :643); can take months (ESTIMATE, from a Pathway running many weeks). Humanizer pass run on the final text; no dashes or Oxford commas. Not measured in Satoshi; the left line is longer than Haven's (107 against 79 characters), so it will run one line more at 440px."),
]

END_INTRO = """<p>Matched against Haven CS Master's actual ending (Ending base, 5733:20831, read from Figma 7 Nov): eyebrow Where things stand (20px), one 96px statement ending on a colon, a 24px answer under it, a row of five phone screens, then a two line close in 40px, first line gray (Identity was the first phase.) and second white (Community is the next.), with a small resources block to its right. No reflection paragraph and no outcome claims. This draft keeps that exact form.</p>"""

END = [
 dict(name="Haven, as it stands (for comparison)", pick=False, ref=True,
  eb="Where things stand", big="Haven’s initial MVP phase was built around two needs:", small="To be understood and to be safe.",
  img="Five phone screens in a row", close1="Identity was the first phase.", close2="Community is the next.",
  side="Learn more about what you can do to support LGBTQIA + youth at the links below: THE TREVOR PROJECT · PFLAG · FAMILY ACCEPTANCE PROJECT",
  why="The form to match."),
 dict(name="Framework CS, round 2 draft", pick=True,
  eb="Where things stand", big="Mondai’s weekly framework was built around two needs:", small="To fit the hours each user has to give and to keep them going when a week falls short.",
  img="The five Start of week screens in a row (Clean slate, Catching up, Rollover, Recalibration, Reset): each is one way a week can end, so the row sums up the page the way Haven's row does.",
  close1="Fitting the work into the week came first.", close2="The work itself comes next.",
  side="Optional, your call whether it is public yet: Action Items that build toward something the user makes are starting to take their input, like a goal, a reflection or a link to their work.",
  why="My pick. Same structure and almost the same length as Haven's statement (53 characters each, so it should break in two lines at 96px; not measured). The two needs trace to the page: capacity is the single input everything is planned from (Archive:66), and rollover, Recalibration and Reset exist so a short week does not end the journey (Archive:112, :138). The close is true only because of your 29 Oct decision that Action Item pages take input where an item feeds what the user builds (DECISIONS 2026-10-29), which also makes the Action item block's room to grow line come true. The side note uses no product names you have not shown on the page."),
]

CHECKS = """
<ul>
<li><b>Product facts:</b> every product claim on the page checked against ritacompany/mondai, mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md and DECISIONS.md (repo attached 7 Nov, read in full). Findings say CONFIRMED, CONFLICT, WRONG or ESTIMATE and cite archive lines or the DECISIONS entry date. Where the archive is silent (eight hour floor, never moves a time on its own), the finding names your portfolio record instead. Research citations are not product facts and are flagged separately.</li>
<li><b>Frame text:</b> re-read from Figma 5763:2448 on 7 Nov; unchanged since round 1.</li>
<li><b>Haven:</b> hero and ending read from Figma 5733:19874 (text and a screenshot of the ending) before drafting.</li>
<li><b>Voice:</b> humanizer loaded as the skill and run on the new background and ending text; docs/VOICE-draft.md read first.</li>
<li><b>Kept from round 1:</b> the cold read, headline measurements (Satoshi, tracking minus 4 percent), typo findings and your order.</li>
<li><b>Not run:</b> Satoshi measurement of the new background, ending and the reworded captions; the three run reader check, which runs on the text you accept here, before you paste it.</li>
<li><b>Your marks:</b> the marks store on this page was empty when this round started, so nothing of yours was lost or carried over. Marks you make now save for me to read.</li>
</ul>
"""

ids=[]; secs=[]
for s in SECTIONS:
    cur = "".join(f'<div class="field{" hl" if lab.startswith("Headline") else ""}"><span class="lab">{E(lab)}</span><span class="txt">{E(t)}</span></div>' for lab,t in s["cur"])
    fig=""
    b = IMGS.get(s["name"])
    if b:
        fig=f'<figure><img src="data:image/png;base64,{b}" alt="Frame screenshot: {E(s["name"])}" loading="lazy"><figcaption>Figma node {s["node"]}</figcaption></figure>'
    fs=[]
    for i,(k,lab,c,p,why,src) in enumerate(s["f"],1):
        fid=f'r2-{s["id"]}-{i}'; ids.append(fid)
        kn,kc=KIND[k]
        unchanged = p.lower().startswith(("unchanged","see ","use one","remove the","confirm each","optional"))
        fs.append(f'''<article class="find" id="{fid}">
<div class="fhead"><span class="num">{s["name"].split(" (")[0].split(",")[0]} {i}</span><span class="chip {kc}">{kn}</span><span class="src">{E(lab)}</span>
<span class="tog" role="group" aria-label="Mark finding"><button type="button" class="a" aria-pressed="false">Accept</button><button type="button" class="r" aria-pressed="false">Reject</button></span></div>
<div class="pair"><div class="was{" nostrike" if unchanged else ""}"><span class="tag">Now</span><span class="t">{E(c)}</span></div>
<div class="now"><span class="tag">{"Do" if unchanged else "New"}</span><span class="t">{E(p)}</span></div></div>
<p class="why">{E(why)}</p><p class="src">Source: {E(src)}</p></article>''')
    secs.append(f'''<section class="block" id="{s["id"]}"><h2>{E(s["name"])}</h2><div class="split"><div class="cur">{fig}{cur}</div><div class="finds">{"".join(fs)}</div></div></section>''')

def opt(o, hero):
    tag = '<span class="pickTag">My pick</span>' if o.get("pick") else ('<span class="pickTag" style="color:var(--muted)">Reference</span>' if o.get("ref") else '')
    if hero:
        right = "".join(f'<p class="r">{E(x)}</p>' for x in o["right"].split("\n\n"))
        mock=f'<div class="mock"><p class="l">{E(o["left"])}</p>{right}</div>'
    else:
        mock=(f'<div class="mock"><p class="eb">{E(o["eb"])}</p><p class="big">{E(o["big"])}</p><p class="r" style="font-size:16px;color:#f2f2f2">{E(o["small"])}</p>'
              f'<p class="r" style="border:1px dashed #555;padding:10px;border-radius:4px;color:#9a9a9a">Image: {E(o["img"])}</p>'
              f'<p class="l" style="color:#8e8e94;margin-top:6px">{E(o["close1"])}</p><p class="l" style="margin-top:-6px">{E(o["close2"])}</p>'
              f'<p class="r" style="font-size:12px;color:#9a9a9a">{E(o["side"])}</p></div>')
    return f'<div class="panel opt{" pick" if o.get("pick") else ""}">{tag}<h3>{E(o["name"])}</h3>{mock}<p class="why">{E(o["why"])}</p></div>'

SHORT={"s-rail":"Right rail","s-fb":"Rollover","s-end":"Ending frame","s-haven":"Haven","s-sow":"Start of week","s-hero":"Hero"}
toc = "".join(f'<a href="#{s["id"]}">{E(SHORT.get(s["id"], s["name"]))}</a>' for s in SECTIONS)
t=open(TEMPLATE).read()
t=t.replace('<nav id="toc"></nav>', f'<nav id="toc"><a href="#verdict">Order</a><a href="#hero">Background</a><a href="#ending">Ending</a><a href="#checks">What ran</a>{toc}</nav>')
t=t.replace('<h2>Background (hero) options</h2>','<h2>Background (hero), round 2</h2>').replace('<h2>Ending options</h2>','<h2>Ending, round 2</h2>')
t=t.replace('<h2>Verdict on the order</h2>','<h2>Round 2: what changed and the order</h2>')
t=t.replace('copy review · read only, nothing changed in Figma','copy review round 2 · facts checked against the Mondai archive · nothing changed in Figma')
t=t.replace("localStorage.getItem('fcs-review')","localStorage.getItem('fcs-review-r2')").replace("localStorage.setItem('fcs-review'","localStorage.setItem('fcs-review-r2'")
t=t.replace('on 7 Nov. Kinds:','on 7 Nov. Product facts from ritacompany/mondai: PRODUCT_KNOWLEDGE_ARCHIVE.md (Archive:line) and DECISIONS.md (by entry date). Kinds:')
for k,v in {"__VERDICT__":VERDICT,"__ORDER__":ORDER,"__HERO_INTRO__":HERO_INTRO,"__HERO__":"".join(opt(o,True) for o in HERO),
            "__END_INTRO__":END_INTRO,"__END__":"".join(opt(o,False) for o in END),"__CHECKS__":CHECKS,"__SECTIONS__":"\n".join(secs),"__IDS__":json.dumps(ids)}.items():
    t=t.replace(k,v)
out=os.path.join(HERE,'framework-cs-review.html')
open(out,'w').write(t)
body=re.sub(r'<style>.*?</style>','',t,flags=re.S)
bad=[c for c in ['—','–',' -- '] if c in body]
print(len(ids),'findings', round(len(t)/1e6,2),'MB', 'dashes:',bad, 'unchecked:', len(re.findall('unchecked', body, re.I)))
