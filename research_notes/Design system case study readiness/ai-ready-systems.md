# AI ready design systems: how AI tools consume a Figma design system (2025 to 2026)

Research date: 19 Oct 2026. Every page below was opened in full on that date. Most Figma docs and help pages show no publication or update date; they are marked "undated, fetched 19 Oct 2026" and treated as current because they are the live docs. Search snippets are never used as sources; where only a snippet existed, the point sits under Gaps.

Context carried from the brief: developers build from Figma with the Figma MCP server; designers have no code repository access; an October 2026 audit found 0 variables with code syntax and 90 of 94 components with no description.

## 1. Figma MCP server: what it passes to an AI and what Figma says improves output

### Takeaway
Figma's own docs name Code Connect as "the most effective way" to get an agent to reuse real components, followed by components, variables, semantic layer names, auto layout, annotations and dev resources. The docs list which tools return variables, styles and Code Connect mappings, but none of the pages I opened say that component descriptions or variable code syntax are passed to the agent.

### Cited Findings
- Figma's "Structure your Figma file for better code" page (undated, fetched 19 Oct 2026) says the server gives the agent structured context and that output quality depends on that context. Its list: make repeating elements into components; connect components with Code Connect, "the most effective way to get your agent to reuse your real components"; use variables for spacing, color, corner radius and typography so the agent references tokens instead of hardcoded values; "Give layers and components clear names" (`CardContainer`, not `Frame1268`); use auto layout and avoid absolute positioning; use annotations for behaviour that is hard to show; add dev resources in Dev Mode for docs, code or tickets. The page does not mention code syntax or component descriptions. Source: [Figma developer docs, Structure your Figma file](https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/) (the bullet list under "How to get the best output").
- Figma's tools page (undated, fetched 19 Oct 2026) lists 32 tools plus 9 Weave tools and one prompt. Read tools relevant here: `get_design_context` (design context and code for a selection, React and Tailwind by default); `get_variable_defs` (variables and styles used in a selection, such as colors, spacing, typography); `get_code_connect_map` (component name, source, snippet, version, label for mapped instances); `get_code_connect_suggestions`; `get_metadata` (layer IDs, names, types, positions, sizes); `search_design_system` (components, variables and styles matching a text query across connected libraries, remote only); `get_libraries` (libraries with name, key, description, source, remote only). Source: [Figma developer docs, Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) (read tools table).
- The same page lists the MCP prompt `create_design_system_rules`, which "creates a rules file for generating code that fits your codebase." Source: [Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) (MCP prompt section).
- Remote versus desktop: 18 tools are remote only (including `search_design_system`, `get_libraries`, `use_figma`). "Prompting with your current selection only works with the desktop server"; remote users pass a link to a frame or layer. Code Connect framework choice differs: desktop uses the mapping selected in Dev Mode, remote uses a `clientFrameworks` parameter. Source: [Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) (remote versus desktop notes).
- Plan limit: "On Professional plans, only one framework can be active at a time"; Organization and Enterprise can have several. Source: [Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) (plan notes).
- Figma's GitHub guide (no commit date visible, fetched 19 Oct 2026) repeats the same practices and adds: without Code Connect "the model is guessing"; write specific prompts naming framework, styling system and file paths; name tools explicitly when results are off; add project rules files covering layout primitives, naming and hardcoding limits; break large selections into sections. It says the server can "Pull in variables, components, and layout data directly into your IDE." It does not list descriptions as a passed field. Source: [figma/mcp-server-guide on GitHub](https://github.com/figma/mcp-server-guide) (README, best practices section).

### Inferences
- Inference: Figma's documented ranking puts Code Connect first. For this team, with 0 variables carrying code syntax and 90 of 94 components undescribed, the first mover by Figma's own words is Code Connect, then variable hygiene.
- Inference: because `get_variable_defs` returns variables used in a selection, any hardcoded fill or spacing on a screen reaches the agent as a raw value, not a token. Variable binding coverage on real screens matters as much as the library itself.
- Inference: the remote server's `search_design_system` returns components, variables and styles by text query, so component and variable names (and possibly descriptions, unconfirmed) are what the agent searches against. Clear names have a direct path into agent behaviour even where descriptions do not.

### Gaps
- No Figma page I opened states whether component descriptions or variable descriptions are included in `get_design_context`, `get_variable_defs` or `search_design_system` output. Third party guides claim the server shares variable code syntax, but I saw that only in search snippets, not on an opened page.
- A direct test would settle it: run `get_variable_defs` and `get_design_context` on a Mondai frame before and after adding code syntax to one variable and a description to one component, and compare the output. Not run here (outside the research brief).
- Neither Figma page shows a date, so I cannot say when the guidance was last revised.

## 2. Code Connect: what it is, plans, repository access and the no code (UI) option

### Takeaway
Code Connect maps Figma components to code components, and Figma says every mapping is passed to the MCP server. A UI based version lives inside Dev Mode and does not need GitHub or repository access: you can type the code path by hand. It needs a Dev or Full seat and a library file with published components.

### Cited Findings
- Code Connect UI "maps design components in your Figma libraries to matching code components in your repository," and the mappings "enhance the Figma MCP server by giving AI agents direct references to your code." Source: [Figma developer docs, Code Connect UI setup](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/) (undated, fetched 19 Oct 2026; opening paragraph).
- Steps: open a library file with published components, switch to Dev Mode, choose Library then "Connect components to code" from the file name dropdown, map each component to a code path, optionally add custom instructions for AI code generation and preview generated snippets. Source: [Code Connect UI setup](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/) (steps section).
- Repository access: GitHub is optional. Manual mapping needs only the component path (for example `src/components/Button.tsx`) and optionally the component name. Connecting GitHub adds path autocomplete and repo browsing. Source: [Code Connect UI setup](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/) (GitHub and manual mapping section).
- Plans: a Dev or Full seat on Professional, Organization or Enterprise. Professional plans can have one active library and one active framework. Source: [Code Connect UI setup](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/) (requirements section). Consistent with the tools page note that Professional has one active framework at a time: [Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/).
- Possible conflict: a search snippet attributed to Figma's help center said Code Connect is on Organization and Enterprise only, and referenced a Dec 2025 forum answer saying Professional users cannot create custom mappings. I did not open either page, so this is unverified. The current developer docs page above includes Professional. If the conflict matters, the plan Mondai is on should be checked in the product itself.
- UI versus CLI: Code Connect UI does not show code snippets in the Inspect panel; it shows the file and component name plus previews of AI generated snippets. Figma points to the CLI for Inspect snippets. Source: [Code Connect UI setup](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/) (comparison notes).
- MCP: "All mappings are shared with the Figma MCP server"; when a mapped component is used, its code context is included in data sent to agents; custom instructions are sent with the mapping; from Inspect, "Connect components" maps missing components for a selected frame and the mapping is used immediately. Source: [Code Connect UI setup](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/) (MCP section).
- The MCP server also exposes `add_code_connect_map`, `get_code_connect_suggestions` and `send_code_connect_mappings`, so an agent can create or confirm mappings. Source: [Tools and prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/) (read and write tables).

### Inferences
- Inference: designers without repo access can still own Code Connect UI if developers hand over a list of component paths and names once. The repo access gap is a one time list, not a blocker.
- Inference: the "custom instructions for AI code generation" field on each mapping is the one Figma documented channel I found where per component prose is confirmed to reach the agent. It may do more for AI output than the component description field, which no opened page confirms is passed.

### Gaps
- No opened page explains property mapping depth in the UI version (for example, mapping a Figma variant to a code prop) versus the CLI.
- Plan conflict above is unresolved from opened sources.

## 3. Variable code syntax (Web, iOS, Android)

### Takeaway
Code syntax gives each variable up to three code names (Web, Android, iOS) that appear in Dev Mode code snippets. Figma's help page does not mention MCP, and the MCP pages I opened do not mention code syntax, so its effect on AI output is unconfirmed by primary docs.

### Cited Findings
- "Code syntax allows you to represent variables in code using valid variable names to support a seamless handoff experience." "You can create one name per platform, including Web, Android, and iOS," allowing "up to three code syntaxes per variable." Source: [Figma help, Create and manage variables and collections](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections) (undated, fetched 19 Oct 2026; Code syntax section).
- "A variable's code syntax will appear in code snippets in Dev Mode when inspecting elements using the variable." "Currently, code snippets for variables are supported in CSS, SwiftUI, and Compose." Set it from the Edit variable modal: Add code syntax, pick a platform, enter the name, check the preview. The page's example Web value is `var(--extra-small)`. Source: [same page](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections) (Code syntax section).
- The same page: "Add a description to explain how the variable should be used," and scoping limits which properties a variable can apply to, which "reduces the guesswork when deciding which variables to use." Scoping covers number, color and string variables. Source: [same page](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections) (description and scoping notes).
- The page does not mention MCP. Source: [same page](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections).
- Code syntax can also be set by plugin with `setVariableCodeSyntax`, platforms `WEB`, `ANDROID`, `iOS`. I saw this only as a search result title for [Figma plugin API, setVariableCodeSyntax](https://developers.figma.com/docs/plugins/api/properties/Variable-setvariablecodesyntax) and did not open it; treat as unverified.

### Inferences
- Inference: setting code syntax needs no repo access, only the token names developers use. With 0 of the library's variables carrying it, every Dev Mode snippet currently shows Figma's own variable name, which developers then translate by hand.
- Inference: the bulk fill could be scripted with the plugin API method above, once developers supply a name mapping.

### Gaps
- Whether `get_variable_defs` or `get_design_context` returns the code syntax name or the Figma variable name is not stated on any opened Figma page. A before and after MCP call on one variable would answer it.
- Whether variable descriptions and scopes reach the agent is not stated on any opened page.

## 4. Component descriptions, property naming and annotations as AI context

### Takeaway
Figma's MCP guidance explicitly names layer and component naming, annotations and dev resources as context; it does not name component descriptions. Practitioner writing argues descriptions and semantic naming matter, with one informal reported failure (Claude using primitives) and no controlled before and after test.

### Cited Findings
- Figma names "clear names" for layers and components, annotations for behaviour and responsiveness, and dev resources as output improvers; component descriptions are not listed. Source: [Structure your Figma file](https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/) (undated); [figma/mcp-server-guide](https://github.com/figma/mcp-server-guide) (best practices).
- Romina Kavcic, 5 Dec 2025 (just under a year old): after connecting tokens via Figma MCP and prompting "Build me a button component using my design system," Claude used `red.6` for error, `space-2` for padding and `neutral-7` for text instead of the intended semantic tokens, because it "had no way to know that `red-6` is a primitive meant for building semantic tokens." She recommends semantic names, a `description` field saying when to use each token, and fields such as `usage`, `pairedWith`, `doNot`. Evidence level: one informal run, no model or tool version, no recorded after state; the after JSON is illustrative and the sample contains naming inconsistencies. She also promotes her own plugin. Source: [The Design System Guide, Design tokens that AI can actually read](https://learn.thedesignsystem.guide/p/design-tokens-that-ai-can-actually) (the button test and the token examples).
- Kelsey Ploransky, Southleft, 10 Sep 2026: "A token file can list every color and spacing value in a product without explaining where any of them belong." Recommends role based names (`color.background.surface` over `gray-2`), descriptions with restrictions ("Do not use on brand or danger fills"), deprecation flags and resolving overlapping names like `muted` versus `subtle`. Mentions parity measurements on its testbed but gives no figures on the page. Opinion and practice guidance, not measured. Source: [Southleft, Machine-readable design tokens](https://southleft.com/insights/design-systems/machine-readable-design-tokens-for-ai-ready-component-libraries/).
- Figma Make kits guidance says to describe "both what each part of the system is and how to use it," granular, in short focused files with imperative rules ("Do not use small text for anything except captions"). Source: [Figma help, Write design system guidelines for Make kits](https://help.figma.com/hc/articles/43602393097239) (undated, fetched 19 Oct 2026).

### Inferences
- Inference: the strongest evidence that usage intent changes AI output is the Kavcic case, and it concerns tokens, not component descriptions. No source I opened shows a measured change in AI output from Figma component descriptions.
- Inference: for this team, the 90 undescribed components are a lower lever for MCP output than Code Connect mappings and their custom instructions, which Figma confirms are passed. Descriptions still help humans and may help `search_design_system`; that last point is unconfirmed.

### Gaps
- No primary Figma statement on whether component descriptions are passed by MCP.
- No controlled study found on descriptions or annotations changing AI output.

## 5. Figma Make and other generators using a team's library

### Takeaway
Figma Make reads design system context through Make kits built from a design package, starting with `Guidelines.md`. Figma's advice is written guidance in short, routed files. The help article on bringing library style context into Make returned 404 on two URLs, so its specifics (which variables are extracted, how CSS is generated) are unverified.

### Cited Findings
- "Figma Make can read your design package and create guidelines for you when you're assembling your Make kit." "`Guidelines.md` is the initial set of guidelines that Figma Make always looks at first." Source: [Write design system guidelines for Make kits](https://help.figma.com/hc/articles/43602393097239) (undated; the developers.figma.com URL now 301 redirects here).
- Output improves with subfolders that match what files describe, granular what and how guidance, many short files with overview files that route, and imperative language. Build "with progressive disclosure and the size of the context window in mind." No plan requirements or dates on the page. Source: [same page](https://help.figma.com/hc/articles/43602393097239).
- Supernova (vendor), 3 Sep 2026, recommends giving each team or task only the relevant slice of the system to improve accuracy and cut token use. Source: [Supernova, AI-ready design systems](https://www.supernova.io/blog/ai-ready-design-systems-preparing-your-design-system-for-machine-powered-product-development).

### Inferences
- Inference: Make relies on written guidance more than on Figma metadata. A team's usage rules need to exist as prose somewhere, which overlaps with the description and Code Connect instruction work above.

### Gaps
- The Figma help article "Bring style context from a Figma Design library into Figma Make" (article 33024539096471) returned 404 at both URLs tried. Search snippets claimed Make extracts only a subset of variables into a global CSS file with raw values and needs re-export after library edits, and that `Guidelines.md` is per file rather than global. None of this is verified from an opened page.
- Other generators (v0, Lovable, Cursor without MCP) were not covered within the call budget.

## 6. Practitioner and industry views: what separates a ready system, and is it a hiring or leadership signal

### Takeaway
2025 to 2026 practitioner and vendor writing agrees on the ingredients: semantic tokens, usage descriptions, naming that matches code, design to code parity and machine readable exposure (MCP or endpoints). Evidence is thin and mostly secondhand. Hiring is the clearest signal: at least one live September 2026 design systems lead posting makes machine readability and agent composition a core duty.

### Cited Findings
- Supernova (vendor, Beatriz Novais, 3 Sep 2026): ready systems expose tokens through endpoints or MCP; write small modular docs per component with examples, rationale and constraints; record states, props, accessibility and reasoning as metadata; align Figma props and token usage with code naming. Cites Figma's Dev Mode MCP server as an early example. Vendor opinion promoting its own MCP features. Source: [Supernova, AI-ready design systems](https://www.supernova.io/blog/ai-ready-design-systems-preparing-your-design-system-for-machine-powered-product-development).
- The same post reports, secondhand, a benchmark by Wolosin at Indeed: across 1,056 prompts and eight configurations, Markdown docs used about 30,000 tokens per query at 82% coverage with hallucinations, while structured JSON was more accurate and used 80% fewer tokens. No methodology on the page; unverified. It also cites GitClear 2026 (623 million code changes, duplicated blocks up 81%); the link to design systems is the post's interpretation. Source: [Supernova](https://www.supernova.io/blog/ai-ready-design-systems-preparing-your-design-system-for-machine-powered-product-development).
- Southleft (10 Sep 2026): agents expose naming and documentation gaps; token changes need shared ownership across design and engineering, with accessibility, brand and product input. Asserted, not measured. Source: [Southleft](https://southleft.com/insights/design-systems/machine-readable-design-tokens-for-ai-ready-component-libraries/).
- Kavcic (5 Dec 2025): tokens are "the only layer AI always touches"; framed as opinion, with the one informal test noted in section 4. Source: [The Design System Guide](https://learn.thedesignsystem.guide/p/design-tokens-that-ai-can-actually).
- Hiring evidence (claim with evidence): Cox Enterprises, "Lead Product Designer, Design Foundations, Interstate," posted 14 Sep 2026, lists "ensuring the design system is optimized for machine readability and agent-based composition," "making the system machine-readable and defining how AI agents can correctly compose UIs from its components," and "Hands-on experience creating AI tooling for design, such as agents, MCP connectors, or prompt-based workflows," plus "Proficiency with Figma variables, theming capabilities, and token pipelines like Style Dictionary." Source: [designproject.io, Cox Enterprises posting](https://designproject.io/jobs/lead-product-designer-design-foundations-interstate-at-cox-enterprises-dtaqds).

### Inferences
- Inference: across the sources the line between ready and not ready is the same: does the system carry intent (what a token or component is for) in a form a machine can read, and does it match what ships in code. Mondai's audit numbers sit on the not ready side of both.
- Inference: one verified posting is not a trend. It shows the expectation exists at lead level in Sep 2026; it does not show how widespread it is.

### Gaps
- Several other 2026 design systems postings surfaced in search with similar AI and MCP language (Thumbtack, Yahoo, HubSpot, Gusto, Careem, Jobgether). Thumbtack and Yahoo returned 410 Gone when opened; the rest were not opened. None are counted as evidence.
- Brad Frost, Nathan Curtis, Into Design Systems, Design Systems Collective and zeroheight writing were not reached within the call budget. No design leadership essay was opened that names AI readiness as a hiring differentiator.
- The Indeed benchmark should be traced to its original talk before it is quoted anywhere.
