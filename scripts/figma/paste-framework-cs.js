// Paste the reviewed CS2 copy into Transported Framework CS (5812:16446).
// Run in Figma: Plugins > Scripter, paste this whole file, press Run. Your browser loads Satoshi, which
// the cloud connection cannot. Each layer is changed only if it still starts with the text it had when
// this was written (8 Nov), so nothing you edited since gets overwritten; those are listed as skipped.
const ROWS = [
[
"5812:16466",
"Mondai is an AI",
"Designed as an AI guide for people from underrepresented backgrounds working their way into a tech career."
],
[
"5812:16469",
"asdsdasd",
"Mondai builds each user a curriculum for the tech career they choose, and it can take months to finish. Most users don’t have the same hours free every week, so a plan that expects a steady pace would have them falling behind from the first week.\n\nSo I designed a weekly framework that turns that curriculum into weeks the user can finish, planned around the hours they say they can give each week. Mondai hasn’t launched, so this case study shows the reasoning rather than results: how much lands in each week, how it fits around their calendar and what happens when a week runs short or ends early."
],
[
"5812:16474",
"There was no direct",
"Mondai had no direct model, but learning apps and task trackers each solve part of the problem."
],
[
"5812:16485",
"02. calendar",
"02. Calendar integration"
],
[
"5812:16496",
"04. timing",
"04. Timing"
],
[
"5812:16482",
"Studies find",
"Studies find that tracking real progress against a goal makes reaching it more likely. So, like CareerFoundry, Mondai shows two dates side by side: the target date the plan sets and the pace date the user’s progress points to."
],
[
"5812:16487",
"Motion showed",
"Motion uses AI to find free time in a user’s calendar. But research shows that pushing students to schedule didn’t help them stick with it, so a connected calendar suggests where the work fits, and the plan still runs without one."
],
[
"5812:16493",
"Linear opens",
"Linear opens straight onto the work in front of you, and so does Mondai: its home screen shows only this week’s work."
],
[
"5812:16498",
"Every learning app",
"Every learning app I reviewed, even the most structured, let learners fit lessons around their day. So the plan sets the goal, and each user decides where in their day the work goes."
],
[
"5812:16500",
"Sources: Harkin",
"Sources: Harkin et al. 2016; Baker, Evans and Dee 2016"
],
[
"5812:16505",
"The user’s route",
"Mondai calls the whole route to a user’s new career, and the curriculum that gets them there, their Growth Journey."
],
[
"5812:16511",
"The growth journey",
"The Growth Journey is made up of five Pathways, taken one at a time and in order, each covering a different part of getting into tech."
],
[
"5812:16547",
"Networking",
"Branding"
],
[
"5812:16562",
"Branding",
"Networking"
],
[
"5812:16589",
"Each pathway has two",
"Each Pathway holds Action Items, the individual pieces of work the user does, grouped into Focus Areas by theme."
],
[
"5812:16594",
"The whole route",
"The whole route has a page of its own, one users open now and then to see how far they’ve come and what’s left."
],
[
"5812:16597",
"People need",
"Users need to see how the Pathway they’re on fits into the whole journey, so this page zooms out to show all of it.\nLong term metrics like their journey target, pace and progress sit here out of the user’s immediate view.\nI kept the journey’s dates here because two sets of dates on the weekly screen would compete."
],
[
"5812:16773",
"Each Pathway has its own",
"Each Pathway has its own page, with all of its Action Items in the order the user works through them, including the ones still locked."
],
[
"5812:16777",
"This page was designed",
"This page shows the Pathway the user is on up close: its target and pace, what’s coming up next and the Focus Areas it covers. They won’t need it every week, but it’s there whenever they want to look ahead."
],
[
"5812:16779",
"Focus areas",
"Focus Areas"
],
[
"5812:16780",
"Each pathway is split",
"Focus Areas, like user testing or wireframes, group the Pathway’s Action Items by theme and show the user what the Pathway will cover."
],
[
"5812:16785",
"Action hub",
"Action Hub"
],
[
"5812:16786",
"Most of a person",
"Most of a user’s week happens on one screen: the list of Action Items they come back to nearly every day."
],
[
"5812:16965",
"I designed the Action Hub",
"I designed the Action Hub around one question for the user: what do I need to do this week?\nEach week opens with a short headline and a paragraph the AI writes about that week’s work. It should read like a friend telling the user what the week is about before they look at their list, so it talks about the work itself and not about how much they’ve finished.\nEach Action Item builds on the one before, so they’re finished in order and only the one at the top, marked Active, can be checked off."
],
[
"5812:16970",
"Action item",
"Action Item"
],
[
"5812:16971",
"Someone has to read",
"Every Action Item is a piece of work the AI writes for one user, and when I designed its page the AI was still being built."
],
[
"5812:17083",
"I couldn’t know yet",
"I couldn’t know yet how the AI would behave or what it would do well. The MVP scope was small too: the AI writes each Action Item as text, with no images or video, and nobody types anything into the page. So the page is built from ten kinds of plain text containers, like a short intro, a set of steps or a list of links, that the AI fills however the content needs, and I kept the structure loose in case it couldn’t use all of it at first. That keeps the page simple for the MVP and leaves me room to grow it into something richer once the AI is ready."
],
[
"5812:17087",
"The amount of action",
"How many Action Items a user gets in a week depends on two things, and the user sets one of them."
],
[
"5812:17122",
"Each user sets",
"Each user tells Mondai how many hours they can give each week, the first time they open the Action Hub. Everything else is planned from that number. Mondai asks instead of learning the number from how the user works, because learning it would leave the first two or three weeks without a real plan. The risk is that users promise more time than they have, so the screen has them type an exact number of hours, which makes them count, instead of picking a generous range. If their weeks keep falling short, the plan can lower it later."
],
[
"5812:17124",
"Cognitive load",
"Effort"
],
[
"5812:17125",
"The complexity",
"How much work each Action Item takes, which Mondai sizes item by item."
],
[
"5812:17128",
"Suzie’s capacity",
"Aisha’s capacity is 6 hours a week. Last week that fit 4 Action Items. This week it fits 3, because this week’s take more effort."
],
[
"5812:17134",
"Calendar sync is optional",
"Calendar sync is optional. Users who turn it on answer two quick questions about their day, and Mondai plans around the answers."
],
[
"5812:17137",
"Setting a preferred",
"The first question sets a time range, and Mondai only places Action Items inside it.\nThe range has to leave room, because Mondai can only use the time not already taken by the user’s own events. A short range on a busy day leaves none.\nThe second asks for their sharpest hours, when they focus best. Mondai fills those first when they’re free, but nothing is locked to them."
],
[
"5812:17147",
"With a calendar synced",
"With a calendar synced, the Action Hub can show the same week as a schedule, with Mondai finding times for Action Items around the user’s day."
],
[
"5812:17150",
"The list stays the home",
"The list stays the default view, and the user can switch between the list and the schedule whenever they like."
],
[
"5812:20111",
"Mondai looks for gaps",
"Mondai looks for gaps between the user’s own events, inside the hours they chose in setup. The calendar starts at the first of those hours, 8am for instance, so the day opens on the time Mondai can plan in. Each block is as long as its Action Item takes."
],
[
"5812:20112",
"Mondai only reads",
"Mondai only reads the calendar. It never writes Action Items into it, because that calendar holds commitments Mondai doesn’t own. Action Items and the user’s own events each get their own color."
],
[
"5812:20246",
"Reschedudling",
"Rescheduling an Action Item"
],
[
"5812:20247",
"People can move",
"Users can move their Action Items from the list or the schedule, and Mondai offers only open time in that week, so nothing overlaps their personal schedule. Mondai never moves a time on its own. Automatic moving was easy to build, and I left it out because a plan that rearranges itself gets confusing.\nAn Action Item’s time is only a suggestion. It’s due by the end of its week, Saturday night, so one without a time is fine, and finishing it still counts. When a week has no room left, the item stays in the list without a time."
],
[
"5812:20255",
"The Action Hub’s right rail",
"The Action Hub keeps two dates for the Pathway the user is on: where they’re aiming and where they’re headed."
],
[
"5812:20258",
"Research shows that a small",
"Both sit in a rail down the right side of the Action Hub. If the target moved every time a week went badly, the user would never see that they’d slipped, and seeing their pace fall behind it is what’s meant to get them back on track."
],
[
"5812:20297",
"The date this Pathway",
"Set from the user’s capacity, it holds steady through an ordinary week and moves when their capacity changes."
],
[
"5812:20300",
"Where the person",
"It updates once a week, so nobody watches it tick with every finished item. In week one it matches the target."
],
[
"5812:20303",
"The gap between",
"The gap between the two dates, in days. It is the only ahead or behind signal on the rail."
],
[
"5812:20309",
"When a week ends with work",
"When an Action Item is still open on Saturday night, everything after it moves a little later."
],
[
"5812:20315",
"An Action Item still open",
"An Action Item carried over from last week."
],
[
"5812:20349",
"The Rollover effect",
"The Rollover effect"
],
[
"5812:20350",
"A week that comes up short",
"A week that comes up short can feel like failing, and that feeling makes users less likely to keep going. So nobody has to decide what to do with it while they’re already behind: an unfinished Action Item moves into the next week on its own. Asking users to choose at that moment, with the math on screen, makes it feel like a gate instead of a guide. The Rollover takes up some of the next week’s capacity, so some of that week’s Action Items move to the week after, and the ones behind them move along too. That is why the pace date moves later, and since the journey pace is the last Pathway’s pace, the journey moves with it. The target stays where it was."
],
[
"5812:20354",
"Finish the week’s work",
"Finish the week’s work early and the days that are left become room to catch up or to get further ahead."
],
[
"5812:20357",
"The moment the last",
"The moment the last Action Item of the week is done, this screen celebrates it and offers next week’s Action Items to pull forward.\nA week only holds as much as the user’s capacity, so finishing early leaves nothing left to do. Pulling work forward is the only way to move the pace ahead of the target, or back toward it after a short week.\nWhat the screen says depends on the gap. A user who is ahead is told they can widen their lead. A user who is behind still gets the finish celebrated, then hears that pulling work forward is how they close the gap.\nThat’s why the screen doesn’t wait for the start of next week: how much a user can pull forward depends on the days left."
],
[
"5812:20704",
"A clean slate only",
"This one only shows when nothing carried over. A week with an open Action Item gets Rollover instead."
],
[
"5812:20911",
"Finishing every Action",
"Finishing every Action Item doesn’t close the gap for a user who is behind, so this screen shows how many days they made up last week and points them to finishing early until they’re back on target."
],
[
"5812:21108",
"When a week ends unfinished",
"When a week ends unfinished, the Rollover Action Items wait in the new week under a magenta tag. The screen shows where the pace landed and what carried over, so the plan never changes unseen."
],
[
"5812:21328",
"Rollover handles",
"Rollover handles one unfinished week. When it keeps happening, the screen suggests a capacity that fits the hours the user has been giving. They can take it, set their own or skip it with a warning."
],
[
"5812:21547",
"After a long absence",
"After a long absence, the old plan is too far behind to catch up to, so the week rebuilds from today with their progress kept. It has one button, because most users would pick keep my plan just because it’s the default."
],
[
"5812:21563",
"In reflection",
"Where it stands"
],
[
"5812:21564",
"Ending section",
"The framework is built, so the question left is whether it works for the users it was made for."
],
[
"5812:21566",
"or whatever",
"The framework is meant to give the user weeks they can actually finish, so the measure I’m watching is how many planned weeks close with every Action Item done, and how often Rollover Action Items clear in the week they land in.\nA user whose work keeps rolling over is the sign the plan doesn’t fit their life, which is the case Recalibration was built for. Testing with the first users comes next, and these are the two numbers I’ll count from it."
],
[
"5812:20501",
"Whether someone finished",
"Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week."
],
[
"5812:20719",
"Whether someone finished",
"Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week."
],
[
"5812:20926",
"Whether someone finished",
"Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week."
],
[
"5812:21123",
"Whether someone finished",
"Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week."
],
[
"5812:21343",
"Whether someone finished",
"Whether a user finished last week early or fell short, the next week starts with a recap and a plan for the week."
],
[
"5812:20715",
"This is the first screen",
"This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up."
],
[
"5812:20922",
"This is the first screen",
"This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up."
],
[
"5812:21119",
"This is the first screen",
"This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up."
],
[
"5812:21339",
"This is the first screen",
"This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up."
],
[
"5812:21558",
"This is the first screen",
"This is the first screen a user sees each Sunday, before the Action Hub. It picks one of five versions depending on how last week went. If they’re on track, it says less. If they’re behind their target, it offers ways to catch up."
],
[
"5812:16522",
"Focus areas",
"Focus Areas"
],
[
"5812:16537",
"Focus areas",
"Focus Areas"
],
[
"5812:16552",
"Focus areas",
"Focus Areas"
],
[
"5812:16567",
"Focus areas",
"Focus Areas"
],
[
"5812:16582",
"Focus areas",
"Focus Areas"
],
[
"5812:16525",
"Action items",
"Action Items"
],
[
"5812:16540",
"Action items",
"Action Items"
],
[
"5812:16555",
"Action items",
"Action Items"
],
[
"5812:16570",
"Action items",
"Action Items"
],
[
"5812:16585",
"Action items",
"Action Items"
]
];
const done = [], skipped = [], missing = [];
for (const [id, starts, text] of ROWS) {
  const n = await figma.getNodeByIdAsync(id);
  if (!n || n.type !== 'TEXT') { missing.push(id); continue; }
  if (n.characters === text) { done.push(id); continue; }
  if (!n.characters.startsWith(starts)) { skipped.push(id + ' (now starts: ' + n.characters.slice(0, 40) + ')'); continue; }
  for (const f of n.getStyledTextSegments(['fontName']).map(s => s.fontName)) await figma.loadFontAsync(f);
  n.characters = text;
  done.push(id);
}
// The two DM Sans headlines move to the headline style the rest of the page uses.
const med = { family: 'Satoshi', style: 'Medium' };
await figma.loadFontAsync(med);
for (const id of ['5812:20255', '5812:20309']) {
  const n = await figma.getNodeByIdAsync(id);
  if (n && n.type === 'TEXT') { n.fontName = med; n.letterSpacing = { unit: 'PERCENT', value: -4 }; }
}
// Hide the old hero label that sat above the placeholder list.
const lab = await figma.getNodeByIdAsync('5812:16468'); if (lab) lab.visible = false;
// Sources line under the Rollover effect body, in the competitive analysis sources style.
const body = await figma.getNodeByIdAsync('5812:20350'), src = await figma.getNodeByIdAsync('5812:16500');
const already = body && body.parent.findOne(x => x.type === 'TEXT' && x.characters === 'Sources: Soman and Cheema 2004');
if (body && src && !already) {
  for (const f of src.getStyledTextSegments(['fontName']).map(s => s.fontName)) await figma.loadFontAsync(f);
  const s = src.clone(); body.parent.appendChild(s);
  s.characters = 'Sources: Soman and Cheema 2004';
  s.textAutoResize = 'HEIGHT'; s.resize(body.width, s.height);
  if (body.parent.layoutMode === 'NONE') { s.x = body.x; s.y = body.y + body.height + 24; }
  done.push('new sources line ' + s.id);
}
// Buffer flow mock line.
const frame = await figma.getNodeByIdAsync('5812:16446');
const mock = frame.findOne(x => x.type === 'TEXT' && x.characters.includes('Every task, every week, no gaps.'));
if (mock) {
  for (const f of mock.getStyledTextSegments(['fontName']).map(s => s.fontName)) await figma.loadFontAsync(f);
  mock.characters = mock.characters.replace('Every task, every week, no gaps.', 'Every Action Item, every week, no gaps.');
  done.push('mock ' + mock.id);
}
print('Changed or already right: ' + done.length + ' of ' + ROWS.length + ' layers, plus the extras');
print('Skipped because you edited them since: ' + (skipped.length ? skipped.join('; ') : 'none'));
print('Missing: ' + (missing.length ? missing.join(', ') : 'none'));
