# Small team and solo design system stories: how they are told

Researcher notes, 29 Oct 2026. For: a design lead who built a startup's design system mostly alone, from a button, a palette and two typefaces, for a rotating volunteer team and outside developers, and later had AI agents build screens from it.

## Sample and method

- Opened and recorded: 11 pages. All text below was read from the raw page text (curl, or the freedium-mirror.cfd copy for Medium pages, since Medium, uxdesign.cc, uxplanet.org and designsystemscollective.com return 403 directly). Quotes are verbatim from that text, including the authors' own grammar.
- Of the 11, the fit with the brief varies:
  - Solo or tiny team, 2023 to 2026: Athene Loumi Nguyen (VNS, 2025), Inbar Fenichel Liel (TipRanks, 4 designers, 2022 to 2025, posted 2026), Rahul Parundekar (A.I. Hero, May 2026), Lisa Demchenko (Feb 2024, design system is one section), Aarzoo Khare (Apr 2025, index post only, thin).
  - Solo or tiny team, older (marked): Dee Kargaev (VALK, written 2020, republished on HackerNoon 16 Apr 2026), Geunbae "GB" Lee (Statsig, Jun 2021), Steffie Jessica with Nathaniel Biancaputra (goKampus, Apr 2022), Daniel De Wit (WebNL, part time team, Sep 2020).
  - Larger team contrast, recent: Oluwapelumi Abimbola (Kuda, 15 designers, Nov 2025), Nel Vasenina (Severstal, 14 designers, Sep 2025).
- Honest shortfall: only about five pages are both small team and 2023 to 2026, and two of those are thin. Strong, long, recent solo design system write ups are rare in the open web; most solo pieces are how to guides.
- Failed or unreadable, not used: Intripid design system on Peerlist (Cloudflare challenge; a reader proxy returned only the title), Copilot design system on Peerlist (Cloudflare), redBus Rubicon on Notion (JavaScript shell, no text), "Mistakes I have made as a first product designer in a startup" on nicelydone.club (Cloudflare), Medium direct URLs (403, read through freedium instead).
- Opened but excluded as not case studies: Ana B, "Building a Design System as a Solo Designer" (Design Systems Collective, 1 Mar 2025, a tips list); Martin Merschroth, "From Zero to Nowhere: The Design System Detour" (Klarheit Substack, 9 Oct 2023, an opinion essay against early systems); a Framer Community social post about a Claude screen checking system (secondhand, three sentences). HackerNoon "Building Order From a Startup Mess" (16 Apr 2026) is the same text as Kargaev's VALK post, so counted once.
- Word counts are estimates from page text or the platform's read time.

## Q1. The case study records

### Takeaway
The small team stories that work best are told as a sequence of wrong turns and corrections inside a real product, with one named developer or designer as the proof of adoption; the thin ones are lists of steps or claims with no before and after.

### Cited Findings

**1. Dee Kargaev, VALK (older, 2020; republished 2026)**
- Author and role: Dee Kargaev, then sole product designer at VALK, a fintech deal management platform for institutional investors; now "AI Engineer & Senior Product Designer". Team: solo designer, small dev team, a frontend engineer named Alex. URL: https://blog.deeflect.com/valk-02-design-process-from-zero/ (republished at https://hackernoon.com/building-order-from-a-startup-mess, 16 Apr 2026). Date: page says "5y ago"; text places it during COVID, March, so 2020. About 1,700 words, "8 min read". [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Opening: "Six months ago I opened Figma file for first time at VALK and felt something I did not expect. Not excitement. Just confusion." [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Headings in order: What I inherited; First instinct was wrong; What actually worked: pages first; Figma organization for one person; Getting the dev team to actually follow specifications; What I got wrong about scale; Six months in, honest assessment. [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Starting state, shown in words with exact numbers: hardcoded hex colours, Sketch screens pasted in as images, "body text was 14px, in other places 13px, in other places 15px", card padding of 16, 20 and 24px "all on same page". [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Decisions with alternative and cost: system first versus pages first; he tried system first for "almost six weeks" then "threw away most of this work"; settled on "extract, not prescribe". Figma structure told as three iterations (one big file, file per area, master plus product files). Naming convention "Category/Subcategory/Variant/State". [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Failures: the six lost weeks; "button component with eleven variants, most of which we never used." [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Adoption shown: developers "did not have strong culture of checking design specifications"; the fix was making specs "impossible to ignore" and bringing Figma to technical discussions before code; proof is one quote: "Alex told me at some point that specific Figma annotations saved him maybe one hour per week". [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Numbers: library covers "probably 70% of UI elements we use regularly"; no baseline. Visuals: none in the post body. AI: none in the story (author bio now mentions AI). [Source](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Verdict: the best told solo story in the sample, because it confesses the wrong first move and measures adoption through one named developer.

**2. Inbar Fenichel Liel, TipRanks (2022 to 2025, posted 8 Oct 2026)**
- Role: Product designer. Team: four designers. URL: https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system. About 450 words. [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Opening: "TipRanks had grown for more than a decade without a centralized design system. In 2022, I initiated the creation of its first system, starting with a product-wide UI audit and a shared component library in Adobe XD." [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Headings: The Problem; The Process; Component Architecture; The Figma Migration Challenge; Outcome. [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Starting state: shown through audit screenshots ("Examples from the product-wide UI audit"); designers "had to search through old files". [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Decision and reversal: the XD library would not transfer ("the layers broke"), so "Instead of recreating the old library as it was, we rebuilt the system from the ground up." Consolidation: "reduced more than 26 different news patterns across the product to 7 reusable components." The stat tile renders as "267 News patterns consolidated", which looks like a broken "26 to 7"; the body text is the reliable figure. [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Adoption: "default starting point for all four designers and a shared reference for developers during handoff"; "roughly twice as many projects reaching 'done' each week" from weekly Trello reviews (no baseline number, not attributed beyond the system). [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Visuals: audit examples, architecture diagram, component sheets (images unlabelled). AI: none. [Source](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- Verdict: clean and short, with a good forced rebuild moment, but outcome is a team claim with no baseline.

**3. Athene Loumi Nguyen, Vietnam Silicon VNS ERP (2025, posted 22 Sep 2026)**
- Role: sole Product Designer; team: "a team of 5 engineers". Six months. URL: https://contra.com/p/ABsYONkR-vns-design-system. About 450 words. [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Opening: "Building order out of an ERP that grew up without a designer. As the sole Product Designer, I owned the system end-to-end". [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Headings: Overview; The Starting Point; Token Architecture; Impact & Retrospect. [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Starting state: "every screen was built from each developer's intuition"; the ask reframed: "The ask wasn't 'make it prettier.' It was: give five engineers and one designer a single source of truth that survives contact with real deadlines." [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Decision: "Instead of starting with components, I started with decisions"; three tier tokens Global, Semantic, Contextual; "An engineer never touches a hex value, they consume intent." [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Reversal: "I'd introduce the Interaction/Action token split earlier. Retrofitting it cost a refactor week that a day of upfront modeling would have prevented." [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Numbers: 42 components; "~40% faster feature delivery", "90%+ screen adoption", "2× faster design reviews"; no baseline or method given. [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- AI: "I used AI-assisted workflows to draft, structure, and polish the documentation, compressing weeks of writing into days while keeping editorial control." [Source](https://contra.com/p/ABsYONkR-vns-design-system)
- Verdict: the closest structural match to the brief (sole designer, engineers who improvised) and a crisp reframe, but the metrics read as asserted rather than shown.

**4. Rahul Parundekar, A.I. Hero (2 May 2026)**
- Role: founder and builder at A.I. Hero (not a designer; says "I didn't know much about good UI design"). Team: internal devs, outside studios Casper Studios and Novatics, PM Ishani. URL: https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa. About 700 words, "4 min read". [Source](https://freedium-mirror.cfd/https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa)
- Opening: "Like everyone back in 2019, we started with Figma. I didn't know much about good UI design, but I could wireframe the UX I wanted." [Source](https://freedium-mirror.cfd/https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa)
- Headings: A.I. Hero Studio Design System Through the Years; A.I. Hero Design System (Fall 2025); Reimagining the UX with Claude Design; Plugging them into A.I. Hero. [Source](https://freedium-mirror.cfd/https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa)
- Story: designing in code with coding agents gave fast prototypes but "the experience is not particularly inspiring"; the system lived as markdown (ASCII layouts, personas.md, README) "so that your coding agent can use it as instructions"; Claude Design refined it into a folder of files; Claude Code then built screens "other than a few hiccups, where it did not wire the functionality correctly". [Source](https://freedium-mirror.cfd/https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa)
- Adoption, numbers: none; "We're yet to launch this". Visuals: version history screenshots, generated palette, type ramp, cards, a file tree. [Source](https://freedium-mirror.cfd/https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa)
- Verdict: the only piece where agents consume the system, but told as a tool demo with no judgement of output quality.

**5. Lisa Demchenko, unnamed fast growing startup (29 Feb 2024)**
- Role: "design-team-of-one" for two years, previously in a team of 30 designers. URL: https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743. About 1,300 words, design system is one short section near the end. [Source](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743)
- Opening: "Over the past two years, I have been a design-team-of-one at a fast-growing startup, and the experience has been nothing short of a rollercoaster." [Source](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743)
- Headings: Embracing Collaboration; Ideation; Employing AI; Testing, Iterating, and Learning; Design Critiques and Peer Feedback; Last, but not least, Design system; My Software Toolbox; Conclusion. [Source](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743)
- Starting state: "in the beginning we had just one Figma file!"; decision told as an open question: "Should I follow Atomic design, should I group my components by purpose or find other structure?" with no answer given. [Source](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743)
- Adoption: asserted, "brought a shared understanding ... within the team". No numbers. AI: a section on ChatGPT and Figma plugins for ideation, not tied to the system. [Source](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743)
- Verdict: useful as a voice of solo life, weak as a system story: the system is a footnote.

**6. Aarzoo Khare, unnamed company (7 Apr 2025)**
- URL: https://www.designsystemscollective.com/we-had-a-design-system-it-had-issues-9f7a67ecf3be. About 280 words, "1 min read"; an index to a planned series. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/we-had-a-design-system-it-had-issues-9f7a67ecf3be)
- Opening: "Working on the design system for my company has been one of the most exciting (and chaotic) projects I've taken on." No headings. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/we-had-a-design-system-it-had-issues-9f7a67ecf3be)
- Failure told plainly: "our design team began using it, but adoption by the dev team was patchy"; cracks: inconsistencies, too many fonts, lack of token usage, components that could not scale; "Now we're building v2. From scratch." [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/we-had-a-design-system-it-had-issues-9f7a67ecf3be)
- Verdict: a good v1 failure hook with nothing behind it yet.

**7. Geunbae "GB" Lee, Statsig (older, 4 Jun 2021)**
- Role: first designer, later Head of Design; team of ex Facebook engineers already shipping on Material components. URL: https://statsig.com/blog/design-system-important-early-startup. About 900 words plus many images. [Source](https://statsig.com/blog/design-system-important-early-startup)
- Opening: "I joined Statsig as the first designer when there were already a team of Ex-Facebook engineers that were actively building out the product." [Source](https://statsig.com/blog/design-system-important-early-startup)
- Headings: Background; Motivation; Goal; Process; Method, why Figma?; Statsig Design System (Master Component Library; Basic Grid Layout; Components in Action inside the Product). I read through the GIF captions; any closing section after them was not read. [Source](https://statsig.com/blog/design-system-important-early-startup)
- Decision with alternative and cost: "I could continue to build on top of what has already been built or, I could establish a design system from scratch"; names the cost: "At an early stage startup, putting time and energy into establishing a design system could be costly and risky", then four reasons Statsig was different. Component build in three priority groups. [Source](https://statsig.com/blog/design-system-important-early-startup)
- Starting state shown visually: a screenshot captioned "Early version of the Statsig built by using Google's Material Design Component Library". Adoption shown as GIFs: "Creating a new page is really easy", "Swapping out components inside a modal". No numbers, no AI. [Source](https://statsig.com/blog/design-system-important-early-startup)
- Verdict: the clearest "should we even do this" decision in the sample; usage shown, not counted.

**8. Steffie Jessica and Nathaniel Biancaputra, goKampus (older, 9 Apr 2022)**
- First two designers at an Indonesian ed tech startup; grew to four. URL: https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6. About 2,000 words, "8 min read"; the system is section 1 of 5. I read sections 1 to 4. [Source](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6)
- Opening: "6 months ago we took a drastic decision to leave our existing job and take a chance at the opportunity in front of us at goKampus". [Source](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6)
- Headings (section 1): Establishing a design system and revamping the visuals; Designing design system; Applying new typeface and visual style; What we could have done better for design system and visual revamp; then 2. Recruiting our first members; 3. Equipping ourselves from the best practices; 4. Realizing the importance of research. [Source](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6)
- Starting state: "For almost 3 years, goKampus doesn't have a dedicated product team or designer"; design came from "ad hoc design requests to a freelance designer". Decision: "Minimum-Viable Design System" of colours, typefaces, buttons and text fields. Visual: before and after font comparison. [Source](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6)
- Lessons as failures: "It is easier to improve or remove a component, rather than modifying a bunch of non-component elements that has been copied and used on dozens of screens and files"; "Keep a back up files before doing a major change". No numbers, no AI. [Source](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6)
- Verdict: the starting point (freelancer leftovers, minimum viable system) matches the brief closely, but the font choice rationale ("it looks undeniably cool and nice") undercuts it.

**9. Daniel De Wit, WebNL agency (older, 20 Sep 2020)**
- UX practitioner who started solo, then a part time design system team (project manager, researcher, designer, developer) fitted between client work. URL: https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd. About 2,300 words, "11 min read". [Source](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd)
- Opening: "When new designers and developers join forces to evolve your design system it is tempting to start working in projects." [Source](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd)
- Headings: Starting a design system team; Our first project (Research; Design; Development); Problems with design system projects; Improving the design system process; Process visualisation; Evolving process; Takeaways. [Source](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd)
- Failures and reversals: one navigation component took eight months ("Eight months after the project was started, our lead frontend developer merged our code"); Storybook did not fit the Vue inline template stack, so he built his own tool, Storybase; he archived his own files and handed visual ownership to the other designer so "designers knew where to find our design system". [Source](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd)
- Adoption: "Designers outside our team were also asking for new components"; a public Trello backlog; measurement planned but "we haven't set up these measurements". Visuals: process puzzle photos, process diagrams. No AI. [Source](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd)
- Verdict: the best account of a part time, interrupted team; the constraint becomes the thesis (continuous delivery, not projects).

**10. Oluwapelumi Abimbola, Kuda (4 Nov 2025), larger team contrast**
- Product Designer leading a four person design system team inside a 15 designer team; inherited system. URL: https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a. About 1,100 words. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a)
- Opening: "It's been two years since my last article." Headings: Let me give you some context; Here's why that mattered; So, what did we do? (Audited everything; Extended beyond colors; Built a multi-brand system; Implemented light and dark modes with Figma Variables; Educated the Team); Fast forward three months (The impact); But we're not done yet; A few things I learned along the way; I'd love to hear from you. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a)
- Adoption shown through designer quotes ("It's so much easier to pick the colors I need.") and an honest gap: "Developer adoption ... This is our biggest challenge right now." Takeaway: "Adoption is the real metric." No numbers, no AI. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a)
- Verdict: generous to predecessors and honest about developers; a good model of naming what is not done.

**11. Nel Vasenina, Severstal (22 Sep 2025), large company contrast**
- Product Designer; 14 designers, two teams, "over 3,000 IT specialists". URL: https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e. About 900 words, part 1 of 2. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e)
- Opening: "My name is Nel Vasenina, and I'm a Product Designer at Severstal, one of the world's leading steel companies with over 3,000 IT specialists." Headings: Before Rebuilding the Design System; The Problems We Found; Why it was critical; Midway: The Challenges We Faced; The Finish Line: How We Built a 3-Month Plan; Outcome; What's next? [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e)
- Decision with cost: must use the core corporate tokens "Because developers were already overloaded"; component research run as interviews with each team. Outcome asserted: "a working tool that everyone enjoys using." No numbers beyond scale, no AI. [Source](https://freedium-mirror.cfd/https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e)
- Verdict: problem list and plan, little story; shows how big company pieces lean on scale instead of tension.

### Inferences
- Of the 11, three carry the brief's shape best: Kargaev (messy inherited file, wrong first move, one named developer), Nguyen (sole designer, improvising engineers, a retrofitted token split) and De Wit (part time people, eight month component). None combines a volunteer team, outside developers and agents in one story, so the designer this is for would be telling an uncommon story.

### Gaps
- No case study about a volunteer or rotating team building a design system was found; searches returned job ads and civic tech background only.
- No case study by a designer (rather than a founder) showing agents building screens from a system they made, with judgement of the output.
- Intripid and Copilot (Peerlist) and redBus (Notion) could not be read.

## Q2. How do small team or solo stories differ from big company ones?

### Takeaway
Small team stories are first person, chronological and confessional, and their evidence is a person; big company stories are problem lists and plans, and their evidence is scale.

### Cited Findings
- Solo stories open on a feeling or an inherited mess: "Not excitement. Just confusion." [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/); "Building order out of an ERP that grew up without a designer." [Nguyen](https://contra.com/p/ABsYONkR-vns-design-system)
- Big company pieces open on credentials and scale: "over 3,000 IT specialists" and "10+ products" [Vasenina](https://freedium-mirror.cfd/https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e); "a team of 15 designers" [Abimbola](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a).
- Solo stories include the whether question: Statsig weighs building at all against "costly and risky" [Lee](https://statsig.com/blog/design-system-important-early-startup); the contrarian Klarheit essay argues a design system is "a luxury, not a necessity" before product market fit [Merschroth](https://klarheit.substack.com/p/from-zero-to-nowhere-the-design-system). Big company pieces take the need as given [Vasenina](https://freedium-mirror.cfd/https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e).
- Solo stories include non system work honestly: "you will spend significant time on things that are not product design. Pitch decks." [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Tooling decisions are visible in small stories because one person makes them: three Figma file structures [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/); building Storybase when Storybook did not fit [De Wit](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd).

### Inferences
- In a small team story the system and the designer's judgement are the same thing, so wrong turns are the content; in a big company story the system is an organisational fix and the plan is the content.

### Gaps
- Sample of big company pieces is two; the contrast is indicative.

## Q3. What makes the constraint read as strength rather than complaint?

### Takeaway
The constraint reads as strength when it is turned into a design requirement or a method that the reader could reuse, and when the author owns their own mistake rather than blaming the team.

### Cited Findings
- Reframing the brief: "The ask wasn't 'make it prettier.' It was: give five engineers and one designer a single source of truth that survives contact with real deadlines." [Nguyen](https://contra.com/p/ABsYONkR-vns-design-system)
- Turning a lack of time into a method: "extract, not prescribe" after the system first attempt failed [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/); "Minimum-Viable Design System" [Jessica](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6); "Don't build your design system in waterfall projects or scrum sprints" [De Wit](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd).
- Not blaming developers: "I do not blame them for this. It is natural in early startup" and "What changed it was not confrontation." [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/)
- Generosity to predecessors: "Our challenge wasn't that the previous work was inadequate, that was far from it." [Abimbola](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a)
- A forced rebuild told as opportunity: "What started as a migration problem became an opportunity to create a cleaner structure" [Fenichel Liel](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system)
- A costed self correction: "Retrofitting it cost a refactor week that a day of upfront modeling would have prevented." [Nguyen](https://contra.com/p/ABsYONkR-vns-design-system)
- Counter example, constraint as complaint or list: Demchenko lists challenges ("getting buy-in on tools and paid licences") without showing a decision that resolved them [Demchenko](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743).

### Inferences
- The pattern is: name the limit, show the choice it forced, show the cost you accepted. For the designer this is for, "rotating volunteers and outside developers" can be told as the reason the system had to explain itself without her in the room, which is also why agents could later use it.

### Gaps
- No reader or hiring manager reaction to these pieces was found, so "reads as strength" is my judgement from the texts.

## Q4. How do they show the system being used by others?

### Takeaway
Mostly with one named person's quote, a before and after of practice, or GIFs of building with it; hard adoption numbers are rare and, where present, have no baseline.

### Cited Findings
- One named developer with a time saving: "Alex told me ... saved him maybe one hour per week" [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/).
- Designer quotes after a three month check in: "I love how I can easily switch to dark mode now once I've applied the tokens." [Abimbola](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a)
- GIFs of real building: "Creating a new modal experience (form) from a template" [Lee](https://statsig.com/blog/design-system-important-early-startup).
- Behaviour change as evidence: "'Does it match the system?' replaced subjective debate" plus "90%+ screen adoption" with no method [Nguyen](https://contra.com/p/ABsYONkR-vns-design-system).
- Workflow tool as proxy: Trello review showing "roughly twice as many projects reaching 'done' each week" [Fenichel Liel](https://contra.com/p/kFloBrLP-building-tip-ranks-first-design-system).
- Demand as evidence: "Designers outside our team were also asking for new components" [De Wit](https://freedium-mirror.cfd/https://uxdesign.cc/stop-doing-design-system-projects-b094369dcfdd).
- Honest partial adoption: "adoption by the dev team was patchy" [Khare](https://freedium-mirror.cfd/https://www.designsystemscollective.com/we-had-a-design-system-it-had-issues-9f7a67ecf3be); developer adoption is "our biggest challenge right now" [Abimbola](https://freedium-mirror.cfd/https://www.designsystemscollective.com/from-ambiguity-to-adoption-evolving-kudas-design-system-583fddea948a).
- Agents as users: Claude Code built screens from the markdown system "other than a few hiccups, where it did not wire the functionality correctly" [Parundekar](https://freedium-mirror.cfd/https://medium.com/ai-hero/upgrading-my-design-system-with-claude-design-0051f2204cfa).

### Inferences
- A screen built by someone who never met the designer (a volunteer, an outside developer or an agent) is stronger adoption evidence than any of these, and no piece in the sample shows one.

### Gaps
- No piece reports a baseline for its adoption or speed figure.

## Q5. What do the best ones leave out?

### Takeaway
The best ones leave out the full component inventory, the generic "what is a design system" preamble and the tool list; they keep one or two wrong turns and stop.

### Cited Findings
- Kargaev has no component gallery and no images at all; the story is carried by decisions and mistakes [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/).
- Nguyen spends one sentence on the 42 components and the rest on the token decision and its retrofit [Nguyen](https://contra.com/p/ABsYONkR-vns-design-system).
- The weaker pieces include what the strong ones cut: a software toolbox list [Demchenko](https://freedium-mirror.cfd/https://uxplanet.org/a-solo-designers-journey-in-a-fast-growing-startup-d4c18f40f743); a reading list of books [Jessica](https://freedium-mirror.cfd/https://uxdesign.cc/first-hand-experience-in-designing-a-design-team-5db6d87285d6); a list of generic problems [Vasenina](https://freedium-mirror.cfd/https://www.designsystemscollective.com/how-we-built-a-consistent-ux-for-10-products-in-3-months-892f489bda2e).
- Strong pieces also skip victory laps: "The component library is not finished. Probably it is never finished." [Kargaev](https://blog.deeflect.com/valk-02-design-process-from-zero/)

### Inferences
- For this designer, the likely cuts are the full page by page system tour and any AI tooling list; the keeps are the starting kit (a button, a palette, two typefaces), one wrong turn, one person who used it without her, and what the agents got right and wrong.

### Gaps
- "Best" is my judgement across 11 pages; no external ranking of these pieces exists that I found.
