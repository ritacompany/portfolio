# Haven: current design and motion inspection

Inspected 28 Oct 2026. Creative level: L1, matching the existing design. This is an inspection and an isolated navigation setup, not a completed update of the coded page.

## Recommendation

Use 64 px from a section divider to its label as the default for the solution sections. Keep the varied compositions and the room reserved for motion. Measure the bottom from the last visible content to the divider, not from a padding field. The current layout demonstrates why those measurements can disagree.

Do the code sync in the existing Haven checkout. It contains work from 28 Oct that the portfolio launch tracker still describes as archived. Recover the separate finale study from the older Codex branch when integrating the ending.

## Sources and access

CONFIRMED:

<table>
<tr><th>Source</th><th>Location</th><th>Current role</th></tr>
<tr><td>Current visual source</td><td><a href="https://www.figma.com/design/IarvWaqjIwrZ2afQmMxKm6/Portfolio-Design?node-id=3300-12596">Haven CS Master</a>, VC page</td><td>1440 px wide, 20303.84 px high at inspection</td></tr>
<tr><td>Current page and latest chat motion</td><td><code>/Users/chadwickfenner/Code/portfolio-haven</code>, branch <code>haven/case-study</code>, inspected at commit <code>997911d</code></td><td>Full Haven page plus a separate chat phone study updated 28 Oct</td></tr>
<tr><td>MVP finale study</td><td>Branch <code>codex/homepage-responsive</code>, <code>site/haven-ending-anim.html</code></td><td>Expanding five-card ending, not integrated into the current Haven page</td></tr>
<tr><td>Original flow prototype</td><td><code>prototypes/journey-map/README.md</code> and <code>journey-section.html</code> in the portfolio repo</td><td>Historical source and timing. Later Haven implementation overrides some of its decisions</td></tr>
<tr><td>Motion history</td><td>Haven checkout, <code>docs/HAVEN_MOTION_PLAN.md</code></td><td>Several dated revisions. The opening proposal is not the current behavior</td></tr>
</table>

The current Haven checkout was clean when inspected. Main had unrelated logo and palette work in progress. Neither checkout's existing design or code was edited by this inspection.

## Current visible sequence

CONFIRMED from the live master and section screenshots:

1. Haven CS, project metadata and introductory context
2. The data, resource links and the large phone collage
3. Demographic access, proxy interview counts and five insight cards
4. Designing an MVP and the two-phase roadmap
5. Wireframes
6. Usability testing, key flows and testing insights
7. Full-width feedback statement
8. The Confidante program
9. Primary identity quiz
10. Testing synthesis and the Confidante selection journey flow
11. Confidante profile
12. Scheduling a chat
13. Chat-based interactions, with two illustrated animation states
14. Security features
15. Where things stand, five ending cards and phase handoff
16. Shared footer

The first stack, `3558:22718`, contains the opening through Designing an MVP. Its internal section gap is zero. The second stack, `3300:12803`, contains wireframes through the footer and also has zero internal section gap. Their parent, `3663:4902`, adds 67 px between the two stacks. That parent gap matters even though neither stack has a gap of its own.

## Section boundaries

CONFIRMED at the 1440 px desktop source. Measurements are in design pixels. Visible edges can differ by a fraction of a pixel because of text outlines and strokes. The screenshots were reviewed alongside the hierarchy in `figma-inventory.json`.

<table>
<tr><th>Section</th><th>Divider to label</th><th>Last content to bottom divider</th><th>Interpretation</th></tr>
<tr><td>Demographic access</td><td>133</td><td>About 142 below the card group</td><td>A more spacious research section</td></tr>
<tr><td>Designing an MVP</td><td>88</td><td>134 below the roadmap</td><td>Bottom padding says 90, but the nested roadmap wrapper contributes another 43 px plus the rule</td></tr>
<tr><td>Wireframes</td><td>123 from the preceding MVP divider</td><td>88 below the wireframes before testing</td><td>The entry combines the outer 67 px gap with 56 px inside the wireframes wrapper</td></tr>
<tr><td>Usability testing</td><td>32 from its own preceding rule</td><td>Separate insight block follows</td><td>A compact subsection within the testing sequence</td></tr>
<tr><td>The Confidante program</td><td>64</td><td>About 174 below the media</td><td>Fits the later entry baseline; spacious interior</td></tr>
<tr><td>Primary identity quiz</td><td>64</td><td>About 413 below the rendered composition</td><td>Fixed-height motion space. Do not infer this from its 276 px bottom padding</td></tr>
<tr><td>Testing synthesis</td><td>64</td><td>About 55 below the lower row</td><td>Tighter exit, appropriate to a diagram rather than a full-screen media beat</td></tr>
<tr><td>Confidante profile</td><td>64</td><td>About 85 below the rendered media group</td><td>Bottom padding says 155, but the media&#x27;s rendered bounds extend 71 px beyond its layout box</td></tr>
<tr><td>Scheduling a chat</td><td>64</td><td>About 65 below the media</td><td>The tightest ordinary media exit in this group</td></tr>
<tr><td>Chat-based interactions</td><td>64</td><td>About 388 below the second illustrated state</td><td>Fixed 2856 px frame with animation states and additional space</td></tr>
<tr><td>Security features</td><td>124</td><td>About 161 below the media</td><td>Its entry is 60 px deeper than the adjacent solution sections</td></tr>
<tr><td>Where things stand</td><td>218.5 from the previous section boundary</td><td>218.5 below its content group</td><td>The fixed 1421 px frame centers its contents vertically. Its padding is zero</td></tr>
</table>

The bottom distances in this table use the last media or content group's render bounds when available. They are composition measurements, not proposed scroll durations. The quiz phone, profile media and two chat states must also be checked during motion integration.

### Changes worth reviewing

RECOMMENDATION:

1. Bring Security features from 124 to 64 px at entry. It is an ordinary solution section following chat and its extra 60 px has no motion role established by the sources inspected. This changes the section start, not its internal composition.
2. Treat the research, MVP and wireframes sequence as an explicit early-page exception or normalize it as a group. Do not change only a child padding: the effective MVP-to-wireframes entry is 123 px because of the parent gap. My pick is to retain the more spacious research opening and compare the wireframes entry at 64 px before changing it.
3. Use a 40 px label-to-headline gap for ordinary section headers. Most inspected headers already use it. The Confidante program uses 48 px. An 8 px adjustment is a candidate for consistency, not evidence that the section needs a different composition.
4. Give section wrappers meaningful names and keep motion stages inside them. For example, a section can own its divider and entry inset while a child stage owns a phone's travel and hold. That makes later spacing edits less likely to shorten an animation.

Do not normalize every bottom gap. The flow diagram, cropped scheduling image, profile composition and isolated phone sequence have different visual endings. A single number would erase those differences without proving a better rhythm.

### Other visible details

CONFIRMED:

- The quiz section is 1427.40 px wide while the page is 1440 px. The Testing synthesis section is 1441 px wide. Their divider widths should be checked against the intended page-wide rule before a geometry cleanup.
- A tooltip-style annotation is visible above the profile badges as an absolute layer, `4264:7197`. It is present in the source screenshot. If it is meant to be a hover explanation, that interaction still needs to be established; the inspection did not classify it as accidental content.
- The ending card row deliberately extends beyond the 1440 px page. Preserve that composition when integrating its interactive state.

## Motion inventory and precedence

CONFIRMED from source code unless marked otherwise. Existing implementation and the latest dated agreement take precedence over the older proposal.

<table>
<tr><th>Moment</th><th>Current evidence</th><th>Integration treatment</th></tr>
<tr><td>Page smooth scroll</td><td>Haven <code>haven.js</code>: Lenis <code>lerp: 0.1</code>, <code>wheelMultiplier: 1</code>, GSAP ticker drives its RAF and lag smoothing is disabled</td><td>Retain this baseline. The historical duration 1.2 proposal is superseded</td></tr>
<tr><td>Text and media entrances</td><td>Haven <code>haven.js</code>: text 1.4 s with 0.15 s stagger; media 1.2 s with 0.3 s pair delay; media waits for image decoding</td><td>Reuse the actual current rules when new source sections are assembled</td></tr>
<tr><td>Feedback statement</td><td>Sticky, full-screen block; line draws and statement fades in; following sections pass over it</td><td>Preserve its own viewport and hold behavior rather than treating it as ordinary section padding</td></tr>
<tr><td>Primary identity quiz</td><td>Five live pillar outlines, label bars, scramble text and icons. Phone pins near the viewport center, releases relative to the section bottom with 100 px clearance and a softened handoff</td><td>The section height participates in the phone&#x27;s release calculation. Its empty lower area cannot be cut independently</td></tr>
<tr><td>Selection journey</td><td>Current page moves selection from slot three to five. The selected step starts green in the current CSS</td><td>Keep the later implementation. The historical standalone README&#x27;s green-only-on-landing rule was superseded in the Haven revisions</td></tr>
<tr><td>Profile content scroll</td><td>Current <code>haven.js</code> moves the content layer inside the phone using page scroll and inertia</td><td>Preserve separate chrome and content layers. Do not replace it with a flattened full-phone export</td></tr>
<tr><td>Chat phone turn</td><td><code>docs/motion/chat-rotate/state_list.md</code>, round 7 agreed 28 Oct; <code>site/motion-lab/chat-rotate.html</code> and <code>.js</code></td><td>Phone starts its own motion when its center reaches the bottom of the screen, rises more slowly while turning, meets the page-scrolling paragraph, holds with it for one screen then exits with it</td></tr>
<tr><td>Repeated chat mockup, copy and badge</td><td>Two source states visible in Figma; the latest chat study describes the transition between them</td><td>Treat as one animated sequence in code. Preserve both source states as references; do not render both sequentially as duplicated final content</td></tr>
<tr><td>MVP finale</td><td><code>codex/homepage-responsive:site/haven-ending-anim.html</code></td><td>Five cards open on mouse hover, keyboard focus or tap. Phone and caption reveal, neighboring cards move and edge cards stay inside the desktop margin. Narrow layouts scroll the row</td></tr>
<tr><td>Reduced motion</td><td>Existing Haven page avoids animated entrance states. Chat round 7 explicitly uses frame two as a still, without turn, parallax or hold</td><td>Carry those behaviors through the update. The finale&#x27;s existing reduced-motion rule removes transitions</td></tr>
</table>

The full page still uses a static chat media block. The round 7 phone turn remains a separate motion-lab study. The full page's ending is also static. The separate finale study sets its needs line at 40 px, whereas the current Figma ending uses a smaller line and the current page uses its 24 px heading class. Port the interaction logic into the current composition, not the old study's complete markup and styling.

The code opening is materially older: its hero image, background block and problem section do not match the current opening with The data and its collage. Its navbar still says Home, About and Contact, whereas the current source uses About, Work and Contact me with custom letter forms. The shared footer is also newer than the coded footer. These are concrete page-sync tasks, not animation tuning alone.

## Navigation review copy

CONFIRMED:

- [Open the isolated prototype](https://www.figma.com/proto/IarvWaqjIwrZ2afQmMxKm6/Portfolio-Design?page-id=4676%3A11050&node-id=4676-11127&scaling=scale-down-width&content-scaling=fixed).
- [Open its editable frame](https://www.figma.com/design/IarvWaqjIwrZ2afQmMxKm6/Portfolio-Design?node-id=4676-11127).
- New page: `Haven review, 28 Oct`, `4676:11050`.
- Review frame: `4676:11127`, 1440 by 900 viewport with the full 20303.84 px content stack inside it.
- Navbar is a direct child of the scrolling frame with one fixed child configured. This avoids fixing it only inside the short hero wrapper.
- The review uses isolated copies of the existing navbar and its three Nav link states. Default transitions to Hover while hovered and to Pressed while pressed. Hover also supports Pressed. The original source components still have no reactions and the original master still has zero fixed children.
- The review's labels and Satoshi font were checked after swapping components. Its initial viewport was inspected in both a Figma screenshot and the browser prototype.

Runtime limit: browser presentation loaded, but the available browser input could not hit-test its canvas for hover or scrolling. Hover and fixed navigation were verified in the Figma structure, not by successful pointer playback. Do not describe those runtime checks as passed. Link destinations were not invented; this copy establishes the requested visual states and fixed positioning only.

Smooth scroll belongs to the coded page. Figma's presentation scrolling is not evidence that Lenis has been integrated into this review copy.

![Navigation review](/Users/chadwickfenner/Code/portfolio/reports/haven-current-review/screenshots/navigation-review.png)

## Next implementation scope

1. Use the current Figma master to sync the page opening, current section text, media and shared footer in the Haven checkout.
2. Preserve the quiz and profile layers and motion. Integrate the round 7 chat study as one sequence, retaining its latest agreed state list.
3. Port the finale interaction from the Codex branch into the current ending layout.
4. Apply the reviewed section-boundary choices without flattening the interior compositions. Compare Security features at 64 px and the effective wireframes entry at 64 px against their neighboring sections before adopting either change.
5. Test the assembled page with ordinary scrolling, narrow layouts and reduced motion. Verify navigation over both dark and light content, focus states and actual destinations.

No spacing proposal in this report is recorded as an approved design decision. The original Figma master, shared components and all existing page code remain intact.
