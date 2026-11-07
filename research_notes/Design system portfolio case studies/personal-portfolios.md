# Design system case studies in personal portfolios of senior and lead designers

Researcher notes, 29 Oct 2026. Strand: personal portfolio case studies about a design system the designer built or led. Excludes the eight already covered (Grixti, Walker, Raise, Breault, Quiec, Histen, Russo, Makszy).

## Sample and method

- Searched: 19 web searches across phrasings ("design system" "my role" lead; "built a design system from scratch"; framer.website tokens adoption; staff and principal; multi-brand theming lead; governance and contribution model; "what I'd do differently"; v2 rebuild retrospective; AI, Claude, Cursor, MCP; Bestfolios; fintech Storybook adoption).
- Opened: 17 case study URLs, plus 4 home or about pages to confirm author and role.
- Usable and recorded: 11 case studies by 10 designers (Kassam Nasir has two).
- Failed, not used: Kait UX "Scaling with Purpose" (kaituxdesign.com: TLS handshake failure, then HTTP 503); Rushabh Pathak "A Design System From Zero" (rushabhh.com: proxy 502; a search summary also said its Adoption and Foundations sections are placeholders); Alex Couch "9 Micro case studies" (Medium, 403); Victor Jacobsson Handelsbanken (Medium, 403).
- Opened but excluded: "Building a Perfect Design System from Zero" on zolt-portfolio.framer.website is a Framer template with a fictional company ("Lumio"), footer reads "Remix For Free" and "More Template". It is worth knowing because it is the best written page in the sample and it is fake. Sungjoon Lee, "The Story of My Failed Design System" (blog.joonquixote.com, 31 Aug 2026) is a front end engineer's blog retrospective, not a designer's portfolio; used only as a contrast in Inferences, never in the table.
- How read: every page fetched as raw HTML with curl and stripped to text, so quotes below are verbatim from page text, not a model summary. Framer sites repeat text three times (one copy per breakpoint); word counts below are de-duplicated. Images were not viewed; visual descriptions come from image alt text, captions, file names and embed URLs, so say "what is shown" with that limit.
- Dashes: several source lines contain em dashes. Where one sits inside a quote it is written as "[dash]" so these notes carry none.
- Seniority caveat: the brief asked for senior, lead, staff and principal. Search engines surfaced very few staff or principal pages. The final set is 1 principal, 3 lead or team lead, 3 senior, 2 mid or unstated titles (Danny Cheung "Product Designer"; AG "UI/UX Designer") and 1 senior designer selling his own system (Adham Dannaway). Role labels are as each page states them.

## Q1. What each case study does (records)

### Takeaway
Ten designers, eleven case studies. Only two tell a real alternative with its cost (Swapnil's options table; Matze Lenz's failed attempt at tokens). Only one tells a wrong turn in its own work (Roberto Laschevoski's governance model was too complex at first). Numbers are either absent or large and unbaselined. Nobody mentions AI as part of the work.

### Cited Findings

**1. Kassam Nasir, Principal Experience Designer. Alshaya Group, Dubai. "Supercharged Design Delivery: How a Design System Redefined Efficiency."** [Source](https://kassamnasir.com/cases/supercharged/)
- Date: none shown; video files uploaded 2025/03; footer "© 2025".
- Opens (Overview): "When a leading retail empire faced the monumental challenge of refreshing 15 distinct lifestyle brands simultaneously across multiple platforms and languages, they needed more than just a design update[dash]they needed a revolution in their approach."
- Headings in order: Overview; The Challenge (Scaling Design Across a Brand Empire; Existing Workflow Problems); The Solution (A Variable-Driven Design System); The Transformation in Action: Minutes, Not Days (Before; After); The Impact (Quantitative Wins; Qualitative Wins); From Efficiency to Strategic Innovation.
- Visuals: an embedded video "transformation-in-action.mp4" introduced as "Demonstrating in real-time the reduction in workflow steps and time"; only 3 images. No component sheet, no token table.
- Decisions: one, Figma variables for layout (desktop, mobile) and language (English, Arabic). No alternative, no cost.
- Failure: none.
- Numbers: "7x faster design delivery (5 weeks → 5 days per brand)", "88% decrease in time-to-market", "$200K annual cost savings in design production". The 7x has a baseline (two designers, five weeks). The landing page walkthrough is the best evidence on the page: Before "Total time: 3-4 hours per landing page"; After "Total time: 20-30 minutes per landing page". The 88% and $200K have no baseline or method.
- I vs we: "Our team developed", "Working closely with the team, we developed". Own part never separated; "I" appears only in the call to action ("I'd be happy to walk you through").
- AI: none.
- Length: about 800 words. "3 min read".
- Verdict: memorable for one thing, the step by step before and after of a single landing page with minutes per step; forgettable for the adjective load ("revolution", "radical approach", "unprecedented flexibility", "perfect alignment").

**2. Kassam Nasir, Principal Experience Designer. Alshaya Group. "Designing the Design Process: DesignOps for a Multi-Brand Ecosystem."** [Source](https://kassamnasir.com/cases/designing-design/)
- Date: none; "© 2025".
- Opens (Overview): "When a multinational retail giant managing over 50 international brands faced mounting design inefficiencies, they didn't just need better designs[dash]they needed a better design process."
- Headings: Overview; The Design Dilemma; Architecting a Design Transformation (Team Architecture and Leadership; Building the Design Machine; The 80/20 Innovation Breakthrough); Design Excellence in Action (H&M; New Balance; Bath & Body Works); Transformative Results (Efficiency Metrics; Business Impact; Quality Improvements); Feature Implementation Comparison (Before DesignOps; After DesignOps); The Long-Term Legacy; Key Takeaways.
- Visuals: real branded product screens for three retailers, four images each, no captions; a looping decorative video.
- Decisions: the system rests on one finding: "around 80% of user flows were functionally identical across brands, with only 20% needing specific customization." Team organised by workstream "Rather than organizing by brand". That is the only alternative named, without cost.
- Failure: none.
- Numbers: "68% faster design delivery", "71% reduction in helpline and email cases", "56% reduction in time-to-market", "63% Faster Cross-Brand Implementation". No baselines. Several result headings carry no number at all: "Increase in Team Efficiency", "Decrease in Design Iterations", "Design System Adoption Rate" with the line "The team embraced the new system for its apparent benefits and usability." Checkout comparison gives a baseline: "3 designers working for 5 weeks per brand" against "2 designer working for 2 weeks per brand".
- I vs we: "we" throughout; team named as "5 senior designers supported by 2 design leads". Own role not separated.
- AI: none on the page (a sibling case is titled "UX Transformation Before the AI Boom").
- Length: about 1,200 words. "5 min read".
- Verdict: forgettable. The 71% helpline figure is the most striking number in the sample and nothing on the page ties it to the system. A heading that promises an adoption rate and delivers a sentence is the clearest instance of thin numbers papered over.

**3. Danny Cheung, Product Designer (states "Owner & contributor"). Credit Suisse, Wealth Management Design System (WMDS).** [Source](https://www.dannyckm.com/works/credit-suisse-design-system)
- Date: work 2022 ("2022 Design System Roadmap & Planning"); footer "@ 2025".
- Opens (subtitle): "Building a new Design System from scratch in Figma, to create a scalable, consistent and accessible digital experience." Overview: "Since joining Credit Suisse as a Product Designer in the Visual & Interaction team, I have had the opportunity of spearheading the development of the Wealth Management Design System (WMDS)."
- Headings: Overview; Discover & Define; Here's our challenges …; Problems to solve; Design & Validate (Configurable; Scalable; Interactive; Universal; Accessible; Design System Structure); Design Token (Base token; Purpose token; Component token).
- Visuals: a wall of seven quoted pain points from named roles ("I have no idea which components are ready to use. And where should I raise if there's new components needed?" New-join UX Designer); "Example of former components in a local design project"; brand guideline images; roadmap image; 58 images and one video (Framer asset). Component and token imagery dominates the back half.
- Decisions: three tier tokens, auto layout breakpoints 375, 768, 1024, 1440+, atomic structure. No alternatives, no costs.
- Failure: none.
- Numbers: "leveraged by over five digital products"; interviews "with over 3 design teams". No baseline, no outcome measures.
- I vs we: clean split in research ("I conducted interviews") and token work credited ("I collaborated with a designer from the Design Ops team"); "we" for structure and accessibility.
- AI: none.
- Length: about 1,250 words.
- Verdict: forgettable but honest. The user quote wall is a good opener device; the second half is a feature list of the Figma library ("Configurable", "Scalable", "Interactive") and the page simply stops after token tiers, with no result section at all.

**4. Swapnil (surname not shown on page), product designer and frontend developer. BrowserStack. "Creating a Design System for Scalable SaaS Product Development."** [Source](https://www.swapnil.design/en/portfolio/375f4888-2ed7-4df7-95f2-83f85e4f3d82); role from [home page](https://www.swapnil.design/en): "a bilingual product designer & frontend developer".
- Date: "Winter 2022 - Summer 2024".
- Opens (Introduction): "I worked alongside a team of over 20 designers to develop a comprehensive organizational design system."
- Headings: Introduction; Role; Timeline; The Problem; Possible Solutions; How the Design System Was Structured; My Contributions to the Design System; Code Snippet; Making the Code Snippet; Rich Text Editor; Making the Rich Text Editor; Media Player; Building the Media Player; Component Enhancements: Table; Guidelines For Data Visualisation; Design System Playground; Automation with Figma API; Results and Impact; Products Shipped with the Design System (eight product subsections).
- Visuals: component anatomy and examples (code snippet, rich text editor, media player anatomy); keyboard interaction frames for table column resizing; real product screens for eight shipped products (5 to 19 images each). The structure diagram rendered as "Loading..." without JavaScript.
- Decisions: the only page with a true options table. "Build a Completely New Design System: Low velocity, High efforts"; "Extend Coverage of the Existing Design System: Outdated aesthetics & paradigms, Outdated frontend frameworks"; "Build upon an existing design system: High velocity, High repeatability, Lower level of customization possible". The chosen path's cost is stated. Table built on TailwindUI, extended for resizing and reordering.
- Failure: none.
- Numbers, all with baselines: "Component Coverage Increased from 40% to 74%"; "Time Taken to Design a Feature Reduced from 7 days to 1½ days"; "Developing the Initial Product Template Reduced from 5 days to 30 mins"; "Developing New Pages Reduced from 5-10 days to 3-4 days". Method not stated.
- I vs we: unusually precise. "Building the design system was a team effort"; then a section headed "My Contributions" naming components he built and limits ("I worked on the foundations of the component").
- AI: none. Automation is his own Figma API plugins: "I was able to leverage my knowledge of Typescript to use Figma's API to automate repetitive and extensive tasks."
- Length: about 1,500 words.
- Verdict: memorable for scope honesty and the options table; the long run of per component sections tips into a gallery, rescued by ending on eight shipped products rather than components.

**5. Marco Simioni, Lead Product Designer. Unnamed B2B tech startup.** [Source](https://www.marcosimioni.net/portfolio-item/design_system/)
- Date: "Year: 2025".
- Opens (Challenge): "A B2B tech Startup faced complications while adopting fast delivery of new features and products."
- Headings: Challenge; Solution; What we built (Atoms; Molecules; Organisms); Approach; Benefits; Conclusion.
- Visuals: cover image, atoms sheet, molecule sheet. Component gallery only; no product screens.
- Decisions: atomic design. No alternative.
- Failure: none.
- Numbers: "15+ color variations across products" as the problem. Benefits lines have the number removed or never filled: "Design speed: faster mockup creation", "Development efficiency: less UI coding time", with a double space where a figure would sit, under the claim "The results were immediate and measurable".
- I vs we: "we" only; "This project has been a team effort". Lead role stated in the header, never in the body.
- AI: none.
- Length: about 350 words.
- Verdict: forgettable. The text promises measurement and shows blank slots; it reads as a template filled in.

**6. "AG" (AG Folio; full name not shown), UI/UX Designer, Design System Specialist. by.U (Indonesian mobile operator).** [Source](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable)
- Date: "Published Aug 22, 2025"; work year 2022.
- Opens: "A design system is not just a set of components, but a shared language that empowers collaboration." Then (Background): "When I first joined the team, I was excited to see that by.U already had a design system in Figma."
- Headings: Background: A System That Looked Connected, but Wasn't; My Role; Challenges: No Single Source of Truth; Process: From Audit to Documentation; Impact: Tangible Results for the Whole Team; Key Learnings; Closing.
- Visuals: an image captioned "Delivery to developer form fogma to zeplin" (sic); component and documentation images. No product screens named.
- Decisions: audit labels "keep, improve, or rebuild"; move documentation out of Zeplin into Figma. No alternatives or costs.
- Failure: none in own work; the inherited system's failure is the story.
- Numbers: "40% faster design workflow", no baseline or method.
- I vs we: mostly "I" with a four item responsibility list; "we" rarely.
- AI: none.
- Strongest line: a developer's question as the hinge, "Should I follow the button in Figma, or the one in Zeplin?", and the closing quote "It's the first time I can just open Figma and know that's the version I should implement".
- Length: about 1,300 words. "8 min read".
- Verdict: memorable for the one developer question that frames the whole problem; forgettable learnings ("A system is never 'done'").

**7. Chris Peck, Senior UX/UI and Product Designer (from [home page](https://chris-peck.design/)). The Travel Corporation (Contiki, Trafalgar, Costsaver, AAT Kings, Insight Vacations). "Multi-Brand Design System (2025 and Beyond)."** [Source](https://chris-peck.design/portfolio/multi-brand-design-system-2025-and-beyond/)
- Date: title says 2025; body says "across 2024 and beyond"; the template sidebar still says "Client Salient App" and "Year 2017".
- Opens: the first body paragraph under "What We Delivered" is unedited theme filler: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts." The real opener follows: "This case study initiates the development of an evolving, multi-brand design system and style guide".
- Headings: What We Delivered; Building a Scalable, Visual-First Design System for a Growing Travel Brand Portfolio; Our goal?; Platform Foundation; System Architecture; Atomic Design Methodology; Tailwind CSS Integration; Brand-Theming Support; Figma Design Structure; Magic Picker & Editor Empowerment; Token-Based Updates; Overview of the Tailwind-Based Component Library and Design System; Component Structure; Benchmarking Components in Live Page Context; Style guide; Other Touring brands; Key pages; Looking Ahead.
- Visuals: three live Figma embeds (Tailwind components library, a key page refactor, a default Tailwind file); style guide images captioned "Updated Colour Swatches", "Typography", "Defaults", "Buttons".
- Decisions: Tailwind utility first, brand token overrides on a base theme, a CMS "Magic Picker" for editors. No alternatives or costs.
- Failure: none.
- Numbers: none beyond the 8px spacing scale.
- I vs we: "we" only; credits "the Contiki team and the TTC Tech Design Team". Own part not separated.
- AI: none in this case study (the word count match is from the site menu "AI UX & Product Exploration").
- Length: about 850 words of case text.
- Verdict: forgettable, and the lorem ipsum in the first paragraph would end a hiring read. The Magic Picker, a CMS tool that lets non designers apply brand tokens, is a genuinely distinctive idea buried two thirds down.

**8. Adham Dannaway, senior designer and author, own commercial product. "My Figma design system" (Practical UI).** [Source](https://www.adhamdannaway.com/portfolio/figma-design-system)
- Note: R8 recorded this page as empty without JavaScript; raw HTML fetched on 29 Oct returned full text. Not a company system; included because it is a portfolio case study of a system he built, and it is the sample's best example of decisions with reasons.
- Date: "July 2024".
- Opens: "I've studied hundreds of design systems over the years, even before they were called design systems."
- Headings: Why I created the design system; Basics aren't basic; A simple yet powerful colour system; Light and dark mode; Depth done right; Intuitive components; Interaction states with transparent state layers; The landing page; Based on guidelines from the book.
- Visuals: colour palette, typography, icons, colour variables, "Colour token naming", light and dark mode, elevation in light and dark, interaction states, landing page.
- Decisions with reasons and alternatives: "I decided to use transparent colours, rather than solid ones, to help ensure components look consistent on different coloured backgrounds"; elevation in dark mode by "progressively lighter background colours" because shadows "are difficult to see in dark mode"; hover and press as an overlay so it "doesn't require the addition of extra colour variations". Costs mostly unstated except effort ("It took me a bit of extra work").
- Failure: none.
- Numbers: none on outcomes; "thousands of hours".
- I vs we: solo, all "I".
- AI: none.
- Length: about 1,000 words.
- Verdict: memorable. Each section is a design opinion with its reason, which is why it does not read as a gallery even though most images are component sheets.

**9. Matze Lenz ("423"), external UX/UI Consultant and Designer, 30+ years (from [home page](https://m423.super.site/)). Luzerner Kantonalbank (LUKB). "Banking Design system."** [Source](https://m423.super.site/cases/banking-design-system)
- Date: "Start: September 2022", "Timeline: 10 months" (body says "Over my 12-month contract").
- Opens: "Continuity Build Trust" (headline), then "Isn't that exactly what modern banking needs? This is how I tackled the challenge of transforming the LUKB Sketch component library into a fully integrated Figma Design System."
- Headings: The job to be done (How might we, turn a fragmented Sketch library into a comprehensive Design System?); The result (A foundation for building future user experiences.); My Role; In short, the process (Transform the now.; How We Did It); Insights & Learnings; Make It Easy to Use; Reduce to the max; Focus on consistency; What the project taught me (What I learned; What I would do more).
- Visuals: "LUKB-Core-Styles-Libarary" sheet; "Componet swap with pop-up content" (component swap demo). Few images.
- Decisions: reduce core components to what was used; separate corporate styles into a core library; component swaps in pop ups. Constraint notes dated to the tool: "Note: Figma Variables weren't available at this time".
- Failure: one real loss. "Unfortunately, due to internal regulations regarding Figma plugins, I couldn't convince the design team to adopt these token systems."
- Numbers: none.
- I vs we: names the team ("Team: Christophe Vouillamoz, Peter Matura, Manuela Sidler"); "I" for responsibility, "we" for building. Disclaimer: "These case studies exclude confidential information and reflect only my personal design work."
- Adoption: frank about its limit: "While we successfully implemented the system within the UX design team, I would push for deeper engagement with developers".
- AI: none.
- Length: about 1,200 words. "Reading time about 3 min."
- Verdict: memorable for the lost token argument and the spacing symptoms list ("Headlines jumping when navigating between pages"); the result section itself is generic.

**10. Roberto Laschevoski, Senior Product Designer and Design Systems Specialist; page role "Design System Team Lead". Allica Bank. "Design System Governance."** [Source](https://robnilas.design/projects/design-system-governance)
- Date: "Year 2023".
- Opens: "In the rapidly evolving world of financial technology (FinTech), the effectiveness of digital interfaces directly impacts user experience and business success."
- Headings: The Challenge; Implementation of the Governance Model; Challenges and Solutions; Challenge: Complexity in Understanding the New Process; Solution: Iterative Process Improvement; Results and Impact; Lessons Learned and Best Practices; Lessons Learned; Best Practices; Conclusion.
- Visuals: 14 images on the page; none captioned in the text; no diagram of the governance model is described.
- Decisions: a governance model with roles and contribution steps. No alternative named.
- Failure: yes, and the only one in the sample about the designer's own first version: "When the governance model was first introduced, feedback from designers and developers highlighted its complexity."
- Numbers: none. The metrics paragraph is generic advice, not a result: "Quantitative Metrics: While specific metrics may vary, common indicators of success include a reduction in design and development time, fewer inconsistencies in user interfaces, and positive feedback from end-users."
- I vs we: "My role was pivotal"; "I initiated and led workshops"; otherwise "we".
- AI: none mentioned, but the prose reads machine written (third person "This case study explores the journey of a FinTech company", "This narrative delves into").
- Length: about 1,150 words.
- Verdict: forgettable. A real failure is told and then smothered by a metrics paragraph that admits there are none.

**11. Dennis Wemyss, Senior Product Designer, Design Systems Leader. SupplyPike. "SP-UI."** [Source](https://www.wemyssdesign.com/design-system)
- Date: none shown; "© 2026".
- Opens: "1 Design System / 7+ Teams · 5+ Designers · 30+ Developers / Built SP-UI to align design and engineering on shared components, tokens, and governance for consistent delivery at scale."
- Headings: Context & Strategy; Strategic Outcome; Primary users; Core pain; Expand Capabilities; Challenges → Impact (Adoption & Buy-In; Ownership & Maintenance; Cross-Team Governance; Scaling to enterprise); How I Drove Impact (Led System Architecture & Adoption; Aligned Design with Business Priorities; Built Strong Design[dash]Engineering Partnerships (the source joins the two words with an en dash); Established Governance & Enablement); Results & Reflections (System Scale; What I Learned; 11-Star Standards).
- Visuals: component examples (browser starter kit, dialog, icon set, tab, dropdown documentation, tooltip); one image per challenge.
- Decisions: Figma first then code; contribution standards and shared ownership. No alternatives.
- Failure: resistance told plainly: "Early adoption was uneven[dash]engineers hesitated to maintain shared libraries, and PMs questioned long-term ROI."
- Numbers: scale only ("20+ Core Components", "7+ Product Teams"); outcomes are directional with no numbers ("Reduced QA mismatches", "Shortened design → build cycles").
- I vs we: almost entirely "I" ("I initiated SP-UI"); engineers credited as partners in one heading.
- AI: none.
- Length: about 600 words.
- Verdict: middling. Adoption treated as the story ("Adoption is the product. Standards only work when teams can't afford to say no") is the right instinct, and the challenge then response pairs scan fast; but every result is a claim without evidence.

## Q2. What structures recur, and how the strongest open

### Takeaway
Two skeletons cover nearly everything: the role card plus problem, process, solution, results, learnings (eight of eleven), and the system tour (Danny Cheung, Chris Peck, Marco Simioni). The strongest openings put a person or a scene first: a developer's question, a stakeholder quote wall, a ledger of scale. The weakest open on industry context or a definition of design systems.

### Cited Findings
- Header card of Client, Role, Year, Tools before any text appears on Kassam Nasir, Danny Cheung, AG, Matze Lenz, Roberto Laschevoski and Swapnil. [Nasir](https://kassamnasir.com/cases/supercharged/); [Cheung](https://www.dannyckm.com/works/credit-suisse-design-system); [AG](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable); [Lenz](https://m423.super.site/cases/banking-design-system); [Laschevoski](https://robnilas.design/projects/design-system-governance); [Swapnil](https://www.swapnil.design/en/portfolio/375f4888-2ed7-4df7-95f2-83f85e4f3d82)
- A results first overview with bullet metrics, then the story: both Kassam Nasir pages ("7x faster design delivery (5 weeks → 5 days per brand)"). [Source](https://kassamnasir.com/cases/supercharged/)
- A learnings section closes eight of eleven ("Key Learnings", "What I learned", "Lessons Learned and Best Practices", "What I Learned", "Key Takeaways"). Only Matze Lenz adds "What I would do more". [Lenz](https://m423.super.site/cases/banking-design-system)
- Openings built on a person: AG's developer question "Should I follow the button in Figma, or the one in Zeplin?" [Source](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable); Danny Cheung's seven role tagged quotes ("The existing design system is messy and full of unrelated explorations." Senior UX Designer from Product A). [Source](https://www.dannyckm.com/works/credit-suisse-design-system)
- Opening on a ledger of scale: "1 Design System / 7+ Teams · 5+ Designers · 30+ Developers". [Source](https://www.wemyssdesign.com/design-system)
- Opening on a claim of authority: "I've studied hundreds of design systems over the years". [Source](https://www.adhamdannaway.com/portfolio/figma-design-system)
- Weak openings: industry boilerplate ("In the rapidly evolving world of financial technology (FinTech)") [Source](https://robnilas.design/projects/design-system-governance); theme filler text ("Far far away, behind the word mountains") [Source](https://chris-peck.design/portfolio/multi-brand-design-system-2025-and-beyond/); a definition ("A design system is not just a set of components, but a shared language that empowers collaboration") [Source](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable).

### Inferences
- The opener that works names a specific person stuck on a specific artefact. The question about which button to follow does more than any metric line, because a reader recognises the problem in one sentence.
- Results first openers only work when the first number has its baseline in the same line (Nasir's "5 weeks → 5 days"); his other page's unbaselined "71% reduction in helpline and email cases" invites doubt instead.
- The best written page found (the Zolt template) opens "The first thing I did was nothing." and is fiction. Strong voice is now cheap; specificity a reader can check (a named product, a real number with its baseline, a quoted colleague) is what separates real work.

## Q3. How they show a system without becoming a component gallery

### Takeaway
Three moves keep pages out of the gallery: show the system in use on real product screens or a real task (Swapnil's eight shipped products; Nasir's landing page timed step by step; Peck's live page benchmark), give each visual a decision and its reason (Dannaway), and show the problem state before the parts (Cheung's quote wall, Lenz's spacing symptoms). Pages that lead with atoms, molecules and organisms read as a library tour.

### Cited Findings
- Swapnil ends on "Products Shipped with the Design System", eight real products each with screens, instead of components. [Source](https://www.swapnil.design/en/portfolio/375f4888-2ed7-4df7-95f2-83f85e4f3d82)
- Nasir replaces component imagery with a timed task: "1-2 minutes Duplicate original and switch language variable to Arabic", plus a video of the workflow. [Source](https://kassamnasir.com/cases/supercharged/)
- Peck validates components on a real page: "we created a key Contiki benchmark page that displays components in situ", with live Figma embeds. [Source](https://chris-peck.design/portfolio/multi-brand-design-system-2025-and-beyond/)
- Dannaway ties each sheet to a reason: "Contrast should remain consistent across light and dark mode, this ensures that visual hierarchy remains constant." [Source](https://www.adhamdannaway.com/portfolio/figma-design-system)
- Lenz lists visible symptoms that the system fixed: "Headlines jumping when navigating between pages", "Pop-ups with inconsistent padding and element alignment". [Source](https://m423.super.site/cases/banking-design-system)
- Gallery pattern: Simioni's "What we built" is atoms, molecules and organisms with three component sheets and no product screens. [Source](https://www.marcosimioni.net/portfolio-item/design_system/); Cheung's "Design & Validate" is five library attributes ("Configurable", "Scalable", "Interactive", "Universal", "Accessible") then token tiers. [Source](https://www.dannyckm.com/works/credit-suisse-design-system)

### Inferences
- Atomic design as a section structure is the strongest predictor of a gallery read in this sample (Simioni, Cheung, Peck, Lenz all use it; only Lenz escapes, by leading with symptoms).
- A timed before and after of one real task is the most persuasive visual in the set and costs the least to make.

## Q4. How they handle adoption and impact when numbers are thin

### Takeaway
Most fill the gap badly: unbaselined percentages, headings with no number under them, or generic advice in place of results. The honest moves are rarer: count scale (teams, products, components), name the resistance and how it was met, quote a user of the system, and state where adoption stopped.

### Cited Findings
- Heading with no number: "Design System Adoption Rate / The team embraced the new system for its apparent benefits and usability." [Source](https://kassamnasir.com/cases/designing-design/)
- Generic advice in place of results: "While specific metrics may vary, common indicators of success include..." [Source](https://robnilas.design/projects/design-system-governance)
- Blank slots under a promise: "The results were immediate and measurable: Design speed: faster mockup creation". [Source](https://www.marcosimioni.net/portfolio-item/design_system/)
- Baselined counts: "Component Coverage Increased from 40% to 74%"; "Reduced from 7 days to 1½ days". [Source](https://www.swapnil.design/en/portfolio/375f4888-2ed7-4df7-95f2-83f85e4f3d82)
- Resistance named: "engineers hesitated to maintain shared libraries, and PMs questioned long-term ROI" and the response "Proved value through faster delivery and fewer QA mismatches until SP-UI became the default foundation." [Source](https://www.wemyssdesign.com/design-system)
- Adoption limit stated: "While we successfully implemented the system within the UX design team, I would push for deeper engagement with developers". [Source](https://m423.super.site/cases/banking-design-system)
- A user quote as evidence: "It's the first time I can just open Figma and know that's the version I should implement". [Source](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable)
- Reach as evidence: "currently leveraged by over five digital products within the wealth management domain". [Source](https://www.dannyckm.com/works/credit-suisse-design-system)
- Contrast, out of scope (engineer's blog): a case that names non adoption outright: "We released the component library, but the broader system we were building on top of it was never adopted by a product." and "I failed to work on adoption alongside development." [Source](https://blog.joonquixote.com/en/posts/the-story-of-my-failed-design-system/)

### Inferences
- When there is no measurement, a stated boundary ("adopted within the UX team, not yet by engineering") reads as more senior than a vague percentage.
- Evidence that survives a sceptical reader, in order of strength in this sample: a baselined count, a timed real task, a quote from a system user, a count of products or teams on the system, a named resistance and how it ended.

## Q5. What is common and forgettable

### Takeaway
The forgettable core: atomic design section headings, "single source of truth", "shared language", unbaselined percentage gains, learnings that are platitudes, "we" with no own part, and no alternative or cost on any decision. Template residue and machine written prose are now a visible failure.

### Cited Findings
- "Shared language" or "single source of truth" as the thesis: Simioni ("A design system it's a shared language"), AG ("a shared language that empowers collaboration"; "No Single Source of Truth"). [Simioni](https://www.marcosimioni.net/portfolio-item/design_system/); [AG](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable)
- Platitude learnings: "A system is never 'done'" [AG](https://agfolio.framer.ai/by-u-design-system-from-scattered-to-scalable); "Start with a Clear Vision" [Laschevoski](https://robnilas.design/projects/design-system-governance); "Process Before Pixels" [Nasir](https://kassamnasir.com/cases/designing-design/).
- Decisions with alternative and cost: only Swapnil's options table [Source](https://www.swapnil.design/en/portfolio/375f4888-2ed7-4df7-95f2-83f85e4f3d82) and, for reasons without costs, Dannaway [Source](https://www.adhamdannaway.com/portfolio/figma-design-system).
- Own failure told: only Laschevoski (governance too complex at first) and Lenz (could not get tokens adopted). [Laschevoski](https://robnilas.design/projects/design-system-governance); [Lenz](https://m423.super.site/cases/banking-design-system)
- Own part hidden behind "we": both Nasir pages, Simioni, Peck. Separated well: Swapnil ("My Contributions"), Cheung (credits the Design Ops designer on tokens), Lenz (names three teammates).
- Template residue: Peck's lorem ipsum and "Year 2017" sidebar [Source](https://chris-peck.design/portfolio/multi-brand-design-system-2025-and-beyond/); Simioni's missing figures [Source](https://www.marcosimioni.net/portfolio-item/design_system/).
- AI appears in none of the eleven case studies as part of the design system work, including those dated 2025 and 2026.

### Inferences
- The gap a design lead can own is the one almost nobody fills: one or two decisions told with the option not taken and what the choice cost, and one thing that went wrong in the designer's own work.
- The absence of AI in every 2024 to 2026 page found means a case study that shows how the system was made legible to AI tools (tokens and docs that agents read) would stand apart; this sample offers no model to copy.

### Gaps
- Staff and principal level pages were hard to surface; only one principal (Nasir) was found and usable. Searches for staff level design system case studies returned job posts and advice, not portfolios.
- Images were not viewed; visual descriptions rest on alt text, captions and file names.
- Dates are missing on most pages; work dates were taken from timeline fields where present.
- No verification of any number with the companies named; every metric above is the designer's own claim.
- Kait UX (8 brands, Shopify, six weeks according to a search summary) could not be opened and is not used.
