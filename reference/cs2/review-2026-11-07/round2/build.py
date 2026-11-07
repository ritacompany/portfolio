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

END_INTRO = """<p>Round 2's ending copied Haven's layout instead of asking what this ending has to do. Round 3 replaces it below.</p><p style="display:none">What round 2 did: matched against Haven CS Master's actual ending (Ending base, 5733:20831, read from Figma 7 Nov): eyebrow Where things stand (20px), one 96px statement ending on a colon, a 24px answer under it, a row of five phone screens, then a two line close in 40px, first line gray (Identity was the first phase.) and second white (Community is the next.), with a small resources block to its right. No reflection paragraph and no outcome claims. This draft keeps that exact form.</p>"""

END = [
 dict(name="Haven, as it stands (for comparison)", pick=False, ref=True,
  eb="Where things stand", big="Haven’s initial MVP phase was built around two needs:", small="To be understood and to be safe.",
  img="Five phone screens in a row", close1="Identity was the first phase.", close2="Community is the next.",
  side="Learn more about what you can do to support LGBTQIA + youth at the links below: THE TREVOR PROJECT · PFLAG · FAMILY ACCEPTANCE PROJECT",
  why="The form to match."),
 dict(name="Framework CS, round 2 draft (withdrawn)", pick=False,
  eb="Where things stand", big="Mondai’s weekly framework was built around two needs:", small="To fit the hours each user has to give and to keep them going when a week falls short.",
  img="The five Start of week screens in a row (Clean slate, Catching up, Rollover, Recalibration, Reset): each is one way a week can end, so the row sums up the page the way Haven's row does.",
  close1="Fitting the work into the week came first.", close2="The work itself comes next.",
  side="Optional, your call whether it is public yet: Action Items that build toward something the user makes are starting to take their input, like a goal, a reflection or a link to their work.",
  why="Withdrawn. Kept for reference. Same structure and almost the same length as Haven's statement (53 characters each, so it should break in two lines at 96px; not measured). The two needs trace to the page: capacity is the single input everything is planned from (Archive:66), and rollover, Recalibration and Reset exist so a short week does not end the journey (Archive:112, :138). The close is true only because of your 29 Oct decision that Action Item pages take input where an item feeds what the user builds (DECISIONS 2026-10-29), which also makes the Action item block's room to grow line come true. The side note uses no product names you have not shown on the page."),
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

def controls(fid, label="Mark finding"):
    return (f'<span class="tog" role="group" aria-label="{E(label)}">'
            '<button type="button" data-v="accept" aria-pressed="false">Accept</button>'
            '<button type="button" data-v="change" aria-pressed="false">Accept with changes</button>'
            '<button type="button" data-v="discuss" aria-pressed="false">Discuss</button>'
            '<button type="button" data-v="reject" aria-pressed="false">Reject</button></span>')

def notebox(fid):
    return (f'<label class="notelab" for="n-{fid}">Your note</label>'
            f'<textarea class="notein" id="n-{fid}" rows="2" placeholder="Optional. Say what you would change, what you are unsure of or what to ask."></textarea>'
            '<span class="notestate" aria-live="polite"></span>')

ids=[]; secs=[]
for s in SECTIONS:
    cur = "".join(f'<div class="field{" hl" if lab.startswith("Headline") else ""}"><span class="lab">{E(lab)}</span><span class="txt">{E(t)}</span></div>' for lab,t in s["cur"])
    fig=""
    b = IMGS.get(s["name"])
    if b:
        fig=f'<figure><img src="data:image/png;base64,{b}" alt="Frame screenshot: {E(s["name"])}" loading="lazy"><figcaption>Figma node {s["node"]}</figcaption></figure>'
    fs=[]; ok=[]
    for i,(k,lab,c,p,why,src) in enumerate(s["f"],1):
        fid=f'r2-{s["id"]}-{i}'; ids.append(fid)
        kn,kc=KIND[k]
        if p.lower().startswith("unchanged"):
            ok.append(f'''<div class="find okrow" id="{fid}"><p class="oklab"><b>{E(lab)}</b>: {E(c)}</p>
<p class="why">{E(why)}</p><p class="src">Source: {E(src)}</p>{notebox(fid)}</div>''')
            continue
        unchanged = p.lower().startswith(("unchanged","see ","use one","remove the","confirm each","optional"))
        fs.append(f'''<article class="find" id="{fid}">
<div class="fhead"><span class="num">{s["name"].split(" (")[0].split(",")[0]} {i}</span><span class="chip {kc}">{kn}</span><span class="src">{E(lab)}</span>
{controls(fid)}</div>
<div class="pair"><div class="was{" nostrike" if unchanged else ""}"><span class="tag">Now</span><span class="t">{E(c)}</span></div>
<div class="now"><span class="tag">{"Do" if unchanged else "New"}</span><span class="t">{E(p)}</span></div></div>
<p class="why">{E(why)}</p><p class="src">Source: {E(src)}</p>{notebox(fid)}</article>''')
    okhtml = (f'<details class="okbox"><summary>Checked, no change needed ({len(ok)})</summary>'
              f'<p class="why">These lines were checked against the Mondai archive and are correct as written. Nothing to decide; a note box is there if you want one.</p>{"".join(ok)}</details>') if ok else ''
    if not fs: fs.append('<p class="why">No changes proposed in this section.</p>')
    secs.append(f'''<section class="block" id="{s["id"]}"><h2>{E(s["name"])}</h2><div class="split"><div class="cur">{fig}{cur}</div><div class="finds">{"".join(fs)}{okhtml}</div></div></section>''')

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
    marker = ""
    if o.get("pick"):
        fid = "r2-bg" if hero else "r2-end"
        ids.append(fid)
        marker = f'<div class="find" id="{fid}"><div class="fhead"><span class="num">{"Background" if hero else "Ending"}</span>{controls(fid, "Mark draft")}</div>{notebox(fid)}</div>'
    return f'<div class="panel opt{" pick" if o.get("pick") else ""}">{tag}<h3>{E(o["name"])}</h3>{mock}<p class="why">{E(o["why"])}</p>{marker}</div>'

SCRIPT = r"""<script>
const IDS = __IDS__;
const state = {};   // id -> {mark, note}
let db = null;
const KEY = 'fcs-review-r2b';
function load(){ try{ Object.assign(state, JSON.parse(localStorage.getItem(KEY)||'{}')); }catch(e){} }
function saveLocal(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }
function get(id){ return state[id] || (state[id] = {mark:'', note:''}); }
function paint(){
  const c = {accept:0, change:0, discuss:0, reject:0};
  document.querySelectorAll('.find').forEach(el=>{
    const s = get(el.id);
    el.dataset.state = s.mark;
    el.querySelectorAll('.tog button').forEach(b=> b.setAttribute('aria-pressed', String(b.dataset.v === s.mark)));
    const ta = el.querySelector('.notein');
    if (ta && document.activeElement !== ta && ta.value !== (s.note||'')) ta.value = s.note || '';
    if (c[s.mark] !== undefined) c[s.mark]++;
  });
  document.getElementById('cA').textContent = c.accept;
  document.getElementById('cC').textContent = c.change;
  document.getElementById('cD').textContent = c.discuss;
  document.getElementById('cR').textContent = c.reject;
  document.getElementById('cO').textContent = document.querySelectorAll('.find .tog').length - c.accept - c.change - c.discuss - c.reject;
}
async function push(id, el){
  const st = el && el.querySelector('.notestate');
  if (!db){ if (st) st.textContent = 'Saved on this device only'; return; }
  const s = get(id);
  try{
    await db.doc('marks/'+id).set({finding:id, mark:s.mark||'', note:s.note||'', at:Date.now()});
    if (st) st.textContent = 'Saved for Claude';
    document.getElementById('saveState').textContent = 'Saved for Claude to read';
  }catch(e){ if (st) st.textContent = 'Not saved for Claude, kept on this device'; }
}
document.addEventListener('click', e=>{
  const b = e.target.closest('.tog button'); if(!b) return;
  const el = b.closest('.find'); const s = get(el.id);
  s.mark = (s.mark === b.dataset.v) ? '' : b.dataset.v;
  saveLocal(); paint(); push(el.id, el);
  if (s.mark === 'change' || s.mark === 'discuss'){ const ta = el.querySelector('.notein'); if (ta && !ta.value) ta.focus(); }
});
const timers = {};
document.addEventListener('input', e=>{
  const ta = e.target.closest('.notein'); if(!ta) return;
  const el = ta.closest('.find'); get(el.id).note = ta.value; saveLocal();
  const st = el.querySelector('.notestate'); if (st) st.textContent = 'Typing';
  clearTimeout(timers[el.id]); timers[el.id] = setTimeout(()=>push(el.id, el), 900);
});
document.addEventListener('focusout', e=>{
  const ta = e.target.closest && e.target.closest('.notein'); if(!ta) return;
  const el = ta.closest('.find'); clearTimeout(timers[el.id]); push(el.id, el);
});
load(); paint();
(async()=>{
  const t = setTimeout(()=>{ document.getElementById('saveState').textContent = 'Saved on this device only'; }, 10000);
  try{
    db = window.claude ? await window.claude.use('db') : null;
    if(!db){ clearTimeout(t); document.getElementById('saveState').textContent = 'Saved on this device only'; return; }
    const snap = await db.collection('marks').get();
    clearTimeout(t);
    (snap.docs||[]).forEach(d=>{ const x = d.data(); if (x && x.finding && IDS.includes(x.finding)) state[x.finding] = {mark:x.mark||'', note:x.note||''}; });
    saveLocal(); paint();
    document.getElementById('saveState').textContent = 'Choices and notes save for Claude to read';
  }catch(e){ clearTimeout(t); document.getElementById('saveState').textContent = 'Saved on this device only'; }
})();
</script>"""

CSS = """
.tog{flex-wrap:wrap}
.tog button[aria-pressed="true"][data-v="accept"]{background:var(--accent);color:var(--bg)}
.tog button[aria-pressed="true"][data-v="change"]{background:var(--warn);color:var(--bg)}
.tog button[aria-pressed="true"][data-v="discuss"]{background:var(--mag);color:var(--bg)}
.tog button[aria-pressed="true"][data-v="reject"]{background:var(--bad);color:var(--bg)}
.find[data-state="change"]{border-color:var(--warn)}
.find[data-state="discuss"]{border-color:var(--mag)}
.notelab{font:600 11px/1.2 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.notein{width:100%;font:15px/1.45 var(--body);color:var(--fg);background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:8px 10px;resize:vertical;min-height:44px}
.notein:focus-visible{outline:2px solid var(--fg);outline-offset:1px}
.notestate{font:400 12px/1.3 var(--mono);color:var(--muted);min-height:1em}
.opt .find{margin-top:4px}
.okbox{border:1px dashed var(--line);border-radius:8px;padding:10px 14px}
.okbox summary{cursor:pointer;font:600 13px/1.3 var(--mono);color:var(--muted)}
.okbox[open]{display:grid;gap:10px}
.okrow{display:grid;gap:6px;border-top:1px solid var(--line);padding-top:10px}
.oklab{font-size:15px}
.tog{max-width:100%}
.prose,.why,.src,.field .txt,.pair .t,.mock p{overflow-wrap:anywhere}
section.block,.wrap{min-width:0}
section.block>*{min-width:0}
@media (max-width:640px){.tog{margin-left:0;width:100%}.tog button{flex:1 1 40%;min-height:40px}.tog button+button{border-left:1px solid var(--line)}}
"""

SHORT={"s-rail":"Right rail","s-fb":"Rollover","s-end":"Ending frame","s-haven":"Haven","s-sow":"Start of week","s-hero":"Hero"}
toc = "".join(f'<a href="#{s["id"]}">{E(SHORT.get(s["id"], s["name"]))}</a>' for s in SECTIONS)
t=open(TEMPLATE).read()
t=t.replace('<nav id="toc"></nav>', f'<nav id="toc"><a href="#verdict">Order</a><a href="#hero">Background</a><a href="#ending">Ending</a><a href="#checks">What ran</a>{toc}</nav>')
t=t.replace('<h2>Background (hero) options</h2>','<h2>Background (hero), round 2</h2>').replace('<h2>Ending options</h2>','<h2>Ending, round 3</h2>')
t=t.replace('<h2>Verdict on the order</h2>','<h2>Round 2: what changed and the order</h2>')
t=t.replace('copy review · read only, nothing changed in Figma','copy review round 2 · facts checked against the Mondai archive · nothing changed in Figma')
t=t.replace("localStorage.getItem('fcs-review')","localStorage.getItem('fcs-review-r2')").replace("localStorage.setItem('fcs-review'","localStorage.setItem('fcs-review-r2'")
t=t.replace('on 7 Nov. Kinds:','on 7 Nov. Product facts from ritacompany/mondai: PRODUCT_KNOWLEDGE_ARCHIVE.md (Archive:line) and DECISIONS.md (by entry date). Kinds:')
END3_INTRO = """<p><b>Round 3, written for what this case study is:</b> the first build of a real product, with no before and after and no numbers yet. Built from new research on 14 case studies by founding designers in the same spot (scratch file research/first-build-endings.md, saved with this round). The ones that hold up do one of two things: state the real status, name what success will be measured by and say the first users are setting the baseline (the closest match is a founding designer's pilot study that ends on its target and admits the baseline is still being set); or close on a short reflection that names the hard part, what to validate next and the one test that would show it. The weak ones end on funding, colleague quotes or unquantified words like improved, and all three are ruled out here.</p>
<p>Three versions, each a different structure. The status line in brackets needs your answer: the product's real stage decides which version is honest. My pick: A if the framework is live with users, because it turns into a results ending the day counts arrive, by swapping one sentence. B if it is not live yet. C is the sharpest thinking but promises a comparison you would need data to run.</p>
<p>Facts used: capacity is the single input (Archive:66), cognitive load is sized per Action Item (Archive:104), rollover carries unfinished work (Archive:110), Recalibration fires on repeated short weeks (Archive:134). The measures named are proposals for you to confirm, not decisions. Humanizer run on all three; no dashes or Oxford commas.</p>"""

END3 = [
 dict(id="r3-end-a", name="A: status, the measure, the baseline", pick=True,
  eb="Where it stands",
  head="The framework is [built and live with its first users], so the numbers that would show it working don’t exist yet.",
  body=["I decided what success looks like before the first week ran. The framework is meant to give the user weeks they can actually finish, so the measure I’m watching is how many planned weeks close with every Action Item done, and how often rollover Action Items clear in the week they land in.",
        "A user whose work keeps rolling over is the sign the plan doesn’t fit their life, which is the case Recalibration was built for. The first users are setting the baseline, and their numbers go here as soon as there are enough to count."],
  why="Modelled on the strongest match in the research: status first, a measure named before results, and an honest line that the baseline is being set. When the diary study or first cohort reports, the last sentence becomes a count (for example x of n weeks closed) and nothing else changes."),
 dict(id="r3-end-b", name="B: the hard part, what to validate, how to know", pick=False,
  eb="Looking back",
  head="The hardest part was making a route that takes months feel like a week someone could finish, without hiding how long the whole thing is.",
  body=["What I want to validate next is whether rollover helps a user recover or slowly piles up on them, because a week that keeps carrying work forward means the plan doesn’t fit their life.",
        "I’ll know from real weeks: whether a user who rolls work over closes the next week, or rolls it over again."],
  why="The three line reflection shape. It needs no launch and no numbers, shows judgment rather than claiming results, and the test in the last line is a behaviour anyone could watch. Weaker than A once there are live users, because it leaves out where things stand."),
 dict(id="r3-end-c", name="C: the bet and what would prove it wrong", pick=False,
  eb="The bet",
  head="The framework bets that a plan sized to the hours someone actually has will hold up better than one that expects a steady pace.",
  body=["It’s wrong if users who set a small capacity fall behind as often as users with more time, because then capacity isn’t what keeps a week finishable.",
        "If that happens, the first place I’d look is how each Action Item is sized, since that decides how many fit into a week."],
  why="Turns the missing result into a test a reader can check, which reads as confidence rather than apology. It is the most senior sounding of the three, but it implies a comparison across capacity levels that needs a real cohort to run, so use it only if you can get that data."),
]

PLAN = """<h3 style="margin-top:8px">Getting real numbers fast</h3>
<p>From the same research, in the order to run them. Each says what it lets the ending claim honestly.</p>
<ol>
<li><b>Week 1, five moderated sessions on the build.</b> One session starts on a Sunday screen with rolled over work already seeded, so Start of week and rollover get seen. Claim: problems found and fixed, as x of 5.</li>
<li><b>Weeks 2 to 4, a diary study across three real weeks</b>, 6 to 8 people (recruit about 10, since people drop out). It is the only cheap method that sees a Saturday night with work left and the Sunday after, which is where this framework does its job. Claim: counts and anonymous participant quotes, such as 6 of 8 closed their first planned week. No rates.</li>
<li><b>If the product is live, track six events for the first cohort:</b> capacity set, week built, Action Item done, week closed, Action Item rolled over, pace date moved. Claim: what this cohort did, with its size stated. Nothing causal at this size.</li>
<li><b>Then update ending A:</b> its last sentence becomes the counts.</li>
</ol>
<p>Ruled out: funding, company milestones, colleague or founder quotes (your rule) and a product market fit survey, which needs about 40 regular users before it says anything.</p>"""

def end3(o):
    tag = '<span class="pickTag">My pick (if live)</span>' if o["pick"] else ''
    body = "".join(f'<p class="r" style="font-size:15px">{E(x)}</p>' for x in o["body"])
    mock = f'<div class="mock"><p class="eb">{E(o["eb"])}</p><p class="l" style="font-size:22px">{E(o["head"])}</p>{body}</div>'
    ids.append(o["id"])
    marker = f'<div class="find" id="{o["id"]}"><div class="fhead"><span class="num">Ending {o["name"][0]}</span>{controls(o["id"], "Mark ending version")}</div>{notebox(o["id"])}</div>'
    return f'<div class="panel opt{" pick" if o["pick"] else ""}">{tag}<h3>{E(o["name"])}</h3>{mock}<p class="why">{E(o["why"])}</p>{marker}</div>'

HERO_HTML = "".join(opt(o,True) for o in HERO)
END_HTML = ('</div><div class="prose">' + END3_INTRO + '</div><div class="opts">' + "".join(end3(o) for o in END3) + '</div>'
            '<div class="prose">' + PLAN + '</div><h3 style="margin-top:12px">Round 2, withdrawn, for reference</h3><div class="opts">'
            + "".join(opt(o,False) for o in END) + '</div><div class="opts">')
ids.append("r2-end-direction")
END_HTML += ('<div class="panel"><div class="find" id="r2-end-direction"><div class="fhead"><span class="num">Ending direction</span>'
             '<span class="src">Anything you want the new ending to do or avoid</span></div>' + notebox("r2-end-direction") + '</div></div>')
t = re.sub(r'<script>.*?</script>', lambda m: SCRIPT, t, flags=re.S)
t = t.replace('</style>', CSS + '</style>', 1)
t = t.replace('<span class="count">Accepted <b id="cA">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>',
              '<span class="count">Accepted <b id="cA">0</b> · With changes <b id="cC">0</b> · Discuss <b id="cD">0</b> · Rejected <b id="cR">0</b> · Open <b id="cO">0</b></span>')
t = t.replace('Mark each one accept or reject as you read; your marks save to this page and I can read them back.',
              'For each finding pick Accept, Accept with changes, Discuss or Reject, and add a note whenever you want, whatever you pick. Choices and notes save to this page and I read them back.')
for k,v in {"__VERDICT__":VERDICT,"__ORDER__":ORDER,"__HERO_INTRO__":HERO_INTRO,"__HERO__":HERO_HTML,
            "__END_INTRO__":END_INTRO,"__END__":END_HTML,"__CHECKS__":CHECKS,"__SECTIONS__":"\n".join(secs),"__IDS__":json.dumps(ids)}.items():
    t=t.replace(k,v)
out=os.path.join(HERE,'framework-cs-review.html')
open(out,'w').write(t)
body=re.sub(r'<style>.*?</style>','',t,flags=re.S)
bad=[c for c in ['—','–',' -- '] if c in body]
print(len(ids),'findings', round(len(t)/1e6,2),'MB', 'dashes:',bad, 'unchecked:', len(re.findall('unchecked', body, re.I)))
