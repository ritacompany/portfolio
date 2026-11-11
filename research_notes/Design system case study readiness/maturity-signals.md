# Maturity signals: what separates a design system from a component library, and what a small team can set up cheaply in a Figma library

Research date: 19 Oct 2026. Fetched pages were read in full through WebFetch, which hands back a model summary of the page, not the raw page. Quotes below are as that summary gave them. Before anything here is published as a direct quote, check it against the live page. Sources that could not be opened are listed under Gaps and are not used as evidence.

System under study (from the brief, not checked in Figma): four variable collections, one dark mode, about 18 text styles, about 94 components with about 540 variants, colour almost fully tokenised, spacing and radius tokenised recently, almost no component descriptions, no code syntax on variables, third party icons.

## 1. Token architecture: tiers, naming, aliasing, and the state of the W3C DTCG spec

### Takeaway
The DTCG format reached its first stable version, 2025.10, on 28 Oct 2025. It defines aliasing, groups, descriptions and deprecation, but it does not prescribe tiers or naming. Tiers are an industry convention. Primitive and semantic tiers are near universal (90% and 85% in zeroheight 2026), while component tokens are optional (52%).

### Cited Findings
- The DTCG released the "first stable version of the Design Tokens Specification (2025.10)" on 28 Oct 2025 (San Francisco dateline). Co-chair Kaelig Deloumeau-Prigent is quoted. Source: [W3C DTCG announcement, 28 Oct 2025, opening paragraph](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- The announcement says the format handles "light/dark modes, accessibility variants, and brand themes without file duplication". It claims "full support for Display P3, Oklch, and all CSS Color Module 4 spaces" and "rich token relationships" covering inheritance, aliases and component level references. Source: [W3C DTCG announcement, feature list](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- Adoption claims in the announcement are self reported. Reference implementations named: Style Dictionary, Tokens Studio, Terrazzo. More than 10 tools "already support or are implementing the standard", among them Penpot, Figma, Sketch, Framer, Knapsack, Supernova and zeroheight. The wording does not say which of these support it now and which are only implementing it. Source: [W3C DTCG announcement, adoption section](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/)
- The designtokens.org homepage banner reads "First stable version 2025.10 now available". Source: [designtokens.org homepage banner](https://www.designtokens.org/)
- Status of the Format Module 2025.10 (dated 28 October 2025): labelled a "Final Community Group Report" and stating "This specification is considered stable". The fetch summary also said the Status section mentions publication "as a Candidate Recommendation". That conflicts with the "Final Community Group Report" label, and Community Groups do not issue W3C Recommendations, so recheck that line on the page. It is a Community Group report, not a W3C Standard. Source: [DTCG Format Module 2025.10, Status of this document](https://www.designtokens.org/tr/2025.10/format/)
- The spec does not prescribe tiers or naming. The only naming rules are that names are case sensitive and must not start with `$` or contain `{`, `}` or `.` (sections 5.1 and 5.1.1). Groups such as "semantic" and "component" appear only in examples (6.10). Section 3.7: "Groups are arbitrary and tools SHOULD NOT use them to infer the type or purpose of design tokens." Source: [DTCG Format Module 2025.10, sections 3.7, 5.1, 6.10](https://www.designtokens.org/tr/2025.10/format/)
- Token properties: `$value` is required (5.1). `$type` must never be guessed from the value (5.2.2). `$description` is "a plain text description explaining the token's purpose" (5.2.1). `$extensions` holds vendor data (5.2.3). `$deprecated` "MAY be used to mark a token as deprecated, and optionally explain the reason" (5.2.4). Source: [DTCG Format Module 2025.10, section 5](https://www.designtokens.org/tr/2025.10/format/)
- Aliasing comes in two forms. Curly brace references "can ONLY target complete tokens" (7.1.1). JSON Pointer `$ref` must be supported (7.1.2). "References MUST NOT be circular" (7.2.3). Group inheritance through `$extends` deep merges, with local properties overriding inherited ones (6.4, 6.4.3). The fetch summary said 6.6 calls curly braces "maintained for backward compatibility" while 6.6.1 labels them "Recommended". That reads as contradictory, so recheck it on the page. Source: [DTCG Format Module 2025.10, sections 6.4, 6.6, 7.1, 7.2](https://www.designtokens.org/tr/2025.10/format/)
- Layer adoption in practice: primitives 90%, semantic 85%, component 52%. 90% define tokens in design tools such as Figma variables, 82% have tokens in code and 66% document their tokens. 60% have no token automation; 29% automate design to code, 6% code to design and 5% sync both ways. Tokens drive visual modes for 76% and brands or products for 63%. Source: [zeroheight Design Systems Report 2026, tokens section (n=147)](https://report.zeroheight.com)
- Atlassian names tokens in three parts. Foundation is "the type of visual design attribute or foundational style, such as color, elevation, or space". Property is "the UI element the token is being applied to, such as a border, background, shadow". Modifier is "additional details about the token's purpose, such as its color role, emphasis, or interaction state". The modifier is optional; example: `color.icon.success`. The page advises: "Choose tokens based on meaning where applicable, not specific values." It warns against choosing a token because "the colors appear to match". The page has no date; footer © 2026. Source: [Atlassian design tokens page, naming section](https://atlassian.design/foundations/tokens/design-tokens)
- Figma: "Create an alias for a variable to link its value to an existing variable"; "A variable can reference other variables of the same type." Each collection holds up to 5,000 variables. Variables can be hidden from publishing one at a time or in bulk. The page gives no advice on primitives versus semantic tokens. No date shown. Source: [Figma Help, Guide to variables, Aliasing, Collections and Hiding sections](https://help.figma.com/hc/en-us/articles/15145852043927-Guide-to-variables-in-Figma)

### Inferences
- Inference: two tiers in Figma count as mature. The first holds hidden, unscoped primitives; the second holds published semantic variables aliased to them. Component tokens are optional, since about half of systems skip them, and a 94 component system can defer them.
- Inference: hiding primitives from publishing is cheap and strong. It is a bulk edit in the Variables modal, and it forces designers to pick semantic variables.
- Inference: the DTCG spec matters to a Figma first team mainly as an export target. Its `$description` and `$deprecated` fields map onto the Figma variable description and a "deprecated" naming or description convention.

### Gaps
- Nathan Curtis, "Naming tokens in design systems" (EightShapes, Medium) returned HTTP 403 and was not used. His naming taxonomy is unsourced here.
- The Material 3 design tokens overview (m3.material.io) returned only its title, because the page renders in JavaScript. The ref, sys and comp tier model is unsourced here.
- No later DTCG version (a 2026.x) or other modules (colour, resolver) were confirmed. The homepage named none, so the 2025.10 status may be out of date.
- Which named tools ship DTCG import or export today (Figma in particular) was not confirmed.

## 2. Interaction and state tokens, accessibility in tokens, and how systems document them

### Takeaway
WCAG 2.2 gives hard numbers to build into tokens: 24 by 24 CSS px minimum targets (AA), focus that is never fully hidden (AA) and a 2 px, 3:1 focus indicator (AAA). Atlassian puts interaction state in the token name as a modifier. No authority found gives a standard token schema for focus or target size.

### Cited Findings
- 2.5.8 Target Size (Minimum), Level AA: pointer targets at least 24 by 24 CSS pixels, with exceptions for spacing (a 24 px circle centred on each target must not intersect another), equivalent controls, inline targets, user agent controls and essential presentation. Source: [W3C WAI, What's new in WCAG 2.2, updated 5 Oct 2023, Target Size (Minimum)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- 2.4.11 Focus Not Obscured (Minimum), Level AA: "Ensure when an item gets keyboard focus, it is at least partially visible." Source: [W3C WAI, What's new in WCAG 2.2, Focus Not Obscured](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- 2.4.13 Focus Appearance, Level AAA: the indicator covers at least the area of a 2 CSS px thick perimeter of the unfocused component, with at least 3:1 contrast between focused and unfocused states. Secondary checklists label this AA, which is wrong; the W3C page says AAA. Source: [W3C WAI, What's new in WCAG 2.2, Focus Appearance](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/)
- Atlassian lists "interaction state" as one kind of token modifier. It also defines `opacity.disabled` for disabled interactive images and `opacity.loading` for content under a loading spinner. Source: [Atlassian design tokens page, naming and opacity sections](https://atlassian.design/foundations/tokens/design-tokens)
- Figma scopes "limit which properties the variable can be applied to" and work for number, colour and string variables. A related help text says scopes only limit what the pickers show and do not stop binding through the Plugin API. Source: [Figma Help, Guide to variables, Scoping](https://help.figma.com/hc/en-us/articles/15145852043927-Guide-to-variables-in-Figma)
- GOV.UK will not publish a component until it is "Usable": tested in user research with a representative group of users, including disabled users. It must also be "Versatile", which includes testing across browsers, assistive technologies and devices. Source: [GOV.UK Design System, Contribution criteria, Stage 2](https://design-system.service.gov.uk/community/contribution-criteria/)
- Stark, an accessibility plugin, is the second most used Figma plugin among design system teams (19%), behind Tokens Studio (21%). Source: [zeroheight Design Systems Report 2026, Figma section](https://report.zeroheight.com)

### Inferences
- Inference: the cheapest accessibility signals in tokens are (a) a `focus` colour and a 2 px focus ring width in the dimension collection, (b) a minimum target size variable at 24 (AA) and (c) a variable description on each foreground semantic colour naming the background it is cleared to sit on, with its ratio. One dark mode only means one set of pairs to check.
- Inference: state as a modifier at the end of the token name (hovered, pressed, disabled, focused) suits a Figma file with 540 variants, because the variant State property and the token name then say the same word.

### Gaps
- Material 3 state layers (opacity per state) could not be fetched because the page renders in JavaScript. No sourced opacity values for hover and press are here.
- No authority found documents a named schema for contrast pair tokens. The only examples were small third party repos, not used.

## 3. Documentation inside Figma: descriptions, usage, do and do not, property naming

### Takeaway
Figma's own docs say component descriptions drive search and appear in six places, Dev Mode Inspect among them. Variables also take descriptions and per platform code syntax. Both are cheap to add, and the system lacks both today.

### Cited Findings
- "Figma will look at component descriptions when returning search results." Figma says descriptions can work as keyword tags and should put the most important information first. Source: [Figma Help, Add descriptions to styles, components and variables, Components section (no date shown)](https://help.figma.com/hc/en-us/articles/7938814091287)
- Descriptions and links can go on main components, whole component sets and individual variants. When components are combined into a set, "Figma will apply any existing links and descriptions to the individual variants." Adding or updating them needs edit access to the library. Source: [Figma Help, Add descriptions, Components section](https://help.figma.com/hc/en-us/articles/7938814091287)
- Descriptions show in the instance menu, the Assets panel, the Libraries picker, the Dev Mode Inspect panel and the Properties panel (view only). For variants, the Properties panel shows both the set and the variant description. Source: [Figma Help, Add descriptions, View descriptions and documentation section](https://help.figma.com/hc/en-us/articles/7938814091287)
- Style descriptions appear on hover in the style picker. Variables take descriptions through Edit variable. Figma advises slash naming that matches the use case for both. Source: [Figma Help, Add descriptions, Styles and Variables sections](https://help.figma.com/hc/en-us/articles/7938814091287)
- Library publish descriptions appear in the library modal and version history and suit "high level change summaries". Figma adds: "Library descriptions are only available at a file and library level, so have much less visibility." Source: [Figma Help, Add descriptions, Libraries section](https://help.figma.com/hc/en-us/articles/7938814091287)
- Code syntax: "You can create one name per platform, including Web, Android, and iOS". Dev Mode snippets show these names; variable snippets currently support CSS, SwiftUI and Compose. Source: [Figma Help, Guide to variables, Code syntax](https://help.figma.com/hc/en-us/articles/15145852043927-Guide-to-variables-in-Figma)
- Figma is the most used documentation tool among design system teams (69%), ahead of Storybook (61%) and zeroheight (32%). 92% include documentation, and documentation is called "the biggest pain point and the clearest opportunity" for AI. 60% use AI for documentation generation; 57% most look forward to it. Source: [zeroheight Design Systems Report 2026, Documentation and AI sections](https://report.zeroheight.com). zeroheight sells documentation tooling, so read the framing with that in mind.

### Inferences
- Inference: for a team whose developers build straight from Figma, code syntax on variables is the highest value cheap fix. Without it, Dev Mode shows Figma names, which may not match code, and developers rebuild the mapping by hand. A third party guide (not opened) says web syntax needs the `var()` wrapper. Check that in the file rather than trusting it.
- Inference: descriptions on the about 94 component sets matter more than on the 540 variants. Put a one line purpose, when not to use it and search keywords on the set; add variant descriptions only where a state needs explaining.
- Inference: do and do not guidance is too long for a description field. A link to a documentation frame or page is the cheap carrier, since Figma supports one link per component.

### Gaps
- Figma's help center gave no character limit for descriptions and no property naming convention. Property naming advice found (Component/Property=Value) came from third party pages, not Figma, and was not used.
- Search snippets mention a forum report (2024) that Dev Mode does not show alias chains. That was not confirmed on a primary page and may be out of date.

## 4. Governance: contribution, versioning, changelogs, deprecation, decision log

### Takeaway
The lightest governance that counts in the sources has four parts: a written path from "does a component exist?" to release (Frost), a changelog updated at each release, release notes (56% of teams) and stated entry criteria for new components (GOV.UK). Deprecation has a formal hook in the token spec (`$deprecated`). No source here describes a decision log.

### Cited Findings
- Brad Frost's 10 step governance process (4 Nov 2019): use the system first; contact the system team when a component is missing; decide "snowflake or part of the design system"; prototype; review; formal design, development and testing; final review; "Documentation and stage for release", where "the changelog will be updated"; release under "semantic versioning guidelines outlined by the system"; product team adoption and QA. Source: [Brad Frost, A design system governance process, steps 1 to 10](https://bradfrost.com/blog/post/a-design-system-governance-process/). Six years old; the principles hold but the tooling has moved on.
- Frost: "teams should establish a cadence for releasing design systems". He also writes: "Product teams' primary concern is getting work out the door, not to uphold the integrity of the design system." Source: [Brad Frost, governance process, step 9 and introduction](https://bradfrost.com/blog/post/a-design-system-governance-process/)
- The GOV.UK proposal stage requires a component to be "Useful" ("There is evidence that this component or pattern would be useful for many teams or services") and "Unique" (no duplicate; a replacement needs evidence it performs better). Before publication it must be Usable, Consistent (reuses existing styles and components and follows the style guide) and Versatile. Source: [GOV.UK Design System, Contribution criteria, Stages 1 and 2 (no date shown)](https://design-system.service.gov.uk/community/contribution-criteria/)
- Rituals in practice: release notes 56%, roadmap 48%, office hours 33%. Contribution is open to anyone on the product team in 65% of systems, specific people in 17% and only the system team in 14%. Only 36% are satisfied with their contribution process. Operating models: centralised 51%, hybrid 31%, federated 13%. Source: [zeroheight Design Systems Report 2026, Governance section](https://report.zeroheight.com)
- Team size: 1 to 2 people 28%, 3 to 5 33%, 6 to 10 25%. 61% say they are understaffed. 83% have a dedicated design system team, up from 78%. Source: [zeroheight Design Systems Report 2026, Team section](https://report.zeroheight.com)
- The DTCG `$deprecated` property marks a token as deprecated, with an optional reason (5.2.4). Source: [DTCG Format Module 2025.10, section 5.2.4](https://www.designtokens.org/tr/2025.10/format/)
- Figma library publish descriptions appear in version history and suit change summaries. Source: [Figma Help, Add descriptions, Libraries section](https://help.figma.com/hc/en-us/articles/7938814091287)

### Inferences
- Inference: the lightest version for a team this size is (1) a publish description on every library publish, written as release notes, (2) a changelog page in the library file listing date, change and whether it breaks instances, (3) a short entry test for new components in GOV.UK's terms (used by more than one screen, not a duplicate) and (4) a deprecation convention: rename to a "deprecated" prefix, say what replaces it in the description, then remove it after a set period. All four live inside Figma and cost hours, not weeks.
- Inference: semantic versioning (Frost) fits a Figma library loosely, because Figma publishes have no version numbers. Labelling each publish as breaking or non breaking in its description gets most of the value.

### Gaps
- No primary source on a decision log for design systems was opened. Nathan Curtis on release cadence and versioning is on Medium, where the EightShapes host returned 403.
- No source states a deprecation period or process for Figma components specifically.

## 5. Elevation, motion and other foundations young systems lack

### Takeaway
Elevation and motion are formally typed in the DTCG spec (shadow, duration, cubicBezier, transition) and Atlassian treats elevation as a token foundation. Opacity for disabled and loading states is a small, often missed foundation. No source ranks which missing foundation matters most.

### Cited Findings
- DTCG types: `duration` must be in "ms" or "s" (8.5, 8.5.1). `cubicBezier` must be "an array containing four numbers" (8.6). `shadow` is one shadow object or an array of shadows or references (9.6). `transition` needs `duration`, `delay` and `timingFunction` (9.5). Source: [DTCG Format Module 2025.10, sections 8.5, 8.6, 9.5, 9.6](https://www.designtokens.org/tr/2025.10/format/)
- Atlassian: "Elevation tokens apply to the perceived surface level and shadow." Opacity tokens: `opacity.disabled` and `opacity.loading`. Motion appears only as a foundations link, with no token names given. Source: [Atlassian design tokens page, Elevation and Opacity sections](https://atlassian.design/foundations/tokens/design-tokens)
- Atlassian's foundation categories in token names include colour, elevation and space; typography tokens cover family, size, weight and line height. Source: [Atlassian design tokens page, naming section](https://atlassian.design/foundations/tokens/design-tokens)

### Inferences
- Inference: in a dark only UI, shadows read weakly, so elevation is usually carried by surface colour steps. If the colour collection already has surface levels, elevation may be mostly done and only needs naming as elevation. That needs checking in the Figma file.
- Inference: Figma variables cannot hold shadows or easing curves as a single token, so elevation lives in effect styles and motion in a documented table of durations (number variables) and curves. Motion matters least for a team whose developers build static screens from Figma; it pays off once prototypes or handoff specs carry transitions.
- Inference: ranked by value for this system, the missing foundations are opacity (cheap, shows up in every disabled state), then elevation (effect styles bound to colour variables), then motion.

### Gaps
- No source compared which foundations young systems most often lack. Material 3 and Carbon elevation and motion pages were not opened.
- Whether Figma effect styles can bind shadow colour to variables (and so to modes) was not checked on a Figma page.

## 6. Published maturity models and what separates levels

### Takeaway
Sparkbox's model (Ben Callahan, 2021) separates stages by organisational job (ship v1, win adoption, prove value, run as a product), not by artefacts. It never mentions tokens. The structural signals it does name are documented patterns, release adoption and cadence, and formal governance and contribution. zeroheight's 2026 data shows where most teams sit.

### Cited Findings
- Sparkbox Design System Maturity Model (Ben Callahan, 23 Feb 2021) has four stages. Stage 1 is "Building Version One". Stage 2 is "Growing Adoption": "Once an initial design system is in place, the critical challenge is adoption", tracked through adoption rates and "implementation variations from the documented patterns". Stage 3 is "Surviving the Teenage Years": scrutiny from leadership, metrics on efficiency, consistency and accessibility regressions, and the need to "continue to add valuable patterns, integrations, and documentation". Stage 4 is "Evolving a Healthy Product": "the design system is a fully-realized product", with roadmaps, subscriber interviews, ambassadors, "healthy governance and contribution models", and metrics on adoption of new releases, onboarding speed and release cadence. Source: [Sparkbox, Design system maturity model, stage sections](https://sparkbox.com/foundry/design_system_maturity_model). Five years old; the model is still offered as an online assessment.
- Sparkbox says the origin story, "grassroots" or "top-down", shapes the path through every stage. Source: [Sparkbox, Design system maturity model, introduction](https://sparkbox.com/foundry/design_system_maturity_model)
- Secondary summaries name Stage 4 differently ("maturing into stable leadership", with an "iterative product mindset" stage) in Callahan's Frontend Masters course. That is a later variant of the model and the course page was not opened. Source of the original naming: [Sparkbox, Design system maturity model](https://sparkbox.com/foundry/design_system_maturity_model)
- Adoption in 2026: 7% fully adopted, 31% widely, 38% moderately, 22% minimally. 73% cite lack of a company mandate. Buy in satisfaction fell from 42% (2025) to 32% (2026). 82% say the system improved design and development collaboration. 79% run a single library architecture. Source: [zeroheight Design Systems Report 2026, Adoption and Tokens sections (n=147, fifth edition; exact publish date not shown on the page, a search snippet says 17 March)](https://report.zeroheight.com)

### Inferences
- Inference: against Sparkbox's stages, this system's artefacts (tokens, 94 components, a single library) are Stage 1 to 2 complete. The structural signals that would mark Stage 3 to 4 in its terms are documentation, release adoption and cadence, and a contribution model. Those are the cheap Figma items above.
- Inference, ranked by cost to set up in a Figma library, cheapest first, for one design lead with a few designers and developers who build from Figma:
  1. Hide primitives from publishing and scope semantic variables (bulk edit, hours). Signal: tiered architecture enforced, not just named.
  2. Code syntax on every semantic variable (bulk, hours to a day). Signal: design and code share one name in Dev Mode.
  3. Descriptions on all component sets and semantic variables: purpose, when not to use, keywords (a few days). Signal: in-tool documentation that also powers search.
  4. Release notes in every library publish description, plus a changelog page in the file (minutes per publish). Signal: versioned releases.
  5. Accessibility variables: focus colour, 2 px ring width, 24 px minimum target, plus contrast pairs noted in descriptions (a day or two). Signal: accessibility built into tokens.
  6. Opacity tokens for disabled and loading (hours).
  7. A deprecation convention and a one page contribution test (a day). Signal: governance.
  8. Elevation as effect styles tied to surface variables, then motion durations and curves (days to a week). Signal: complete foundations.
  9. Component tier tokens (weeks; only half of systems have them, so defer).

### Gaps
- No EightShapes or Nathan Curtis maturity or "system versus library" piece was opened (Medium returned 403).
- No Figma guide that defines a mature design system was opened.
- The Sparkbox Design Systems Survey results themselves were not opened, only the maturity model built on them.
- No source gives a direct, quotable "component library versus design system" definition. The distinction above is drawn from the maturity model and governance sources, so it is inference.
