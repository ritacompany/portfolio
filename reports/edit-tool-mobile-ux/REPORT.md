# Edit tool on the iPhone: research and build spec

**Summary.** Rebuild the Edit tool as a photo editor: the page stays full width as the canvas, and one thumb-height strip at the bottom holds a scrub ruler for one value at a time, a row of property chips and a row of four tool tabs (Text, Space, Size, Colour), with undo, redo and hold to compare in reach. Build the ruler as a native horizontal scroll strip (free iOS momentum for coarse moves, slow drag for fine ones), keep every other part plain HTML and CSS, and use one library at most (vanilla-colorful for the colour field).

Scope: research and spec only. No code changed. File to build from: `~/Code/portfolio-site/site/dev/preview/edit.js` and `edit.css`.

---

## 1. What is wrong with today's tool on a phone

Read from `edit.js` and `edit.css` as they stand.

| Problem | Where | What it does on a 375 wide phone |
|---|---|---|
| Panel is a floating card, 340 wide and up to 55vh tall | `.ed-panel` | Covers about half the page, so he edits blind: the change happens under the card. |
| Every property is a row of `−`, a number field and `+` | `field()` | 34px buttons (under Apple's 44pt minimum). Ten to twenty rows to scroll through inside a scrolling card. |
| Number fields at 14px | `.ed-ui { font: 14px }` | Safari zooms the whole page on focus because the input is under 16px, then the layout is wrong until he pinches back. |
| `oninput` commits every keystroke | `field()` | Each step writes state, so there is no clean undo, only "Undo changes on this element". |
| Panel anchored with `bottom: 12px` | `.ed-ui` | No `env(safe-area-inset-bottom)`, so the Copy button sits on the home indicator area. Keyboard covers the panel because fixed bottom elements do not move with it in Safari. |
| Select parent and scope sit in a wrapped header | `.ed-head` | Wraps into three lines on a phone and pushes the controls further down. |
| No compare | none | He cannot see before and after without clearing changes. |
| Selection by tap uses `e.target` | click handler | Tapping text almost always lands on the innermost span, and parent is a separate button with no sense of where you are. |

The core issue is one model: a desktop inspector (all properties at once, typed numbers) shrunk into a card. Photo editors use the opposite model: one value at a time, changed with a gesture, with the picture always visible.

---

## 2. Who uses it and what for

- **Who:** Chadwick, alone, on his iPhone over home wifi, holding the phone in one hand, reviewing a page he built with Claude. He is a senior product designer, fluent in type and spacing values, and he already knows the numbers he wants most of the time.
- **What he is feeling:** mid review, noticing that something is off ("that heading is tight", "this gap is too big"). The urge is to nudge it right now and see it, not to open Figma.
- **What he came to do:** change one or two values on one element, look, change again, then send the list to Claude. Typical session: five to fifteen changes.
- **What the tool is for:** turning "this feels off" into an exact value Claude can apply. The output is the Copy changes list, not a finished page.

**Concept, one sentence:** the page is the photo and the tool is the editing strip under it; he picks one thing, scrubs one value and watches the page move.

What that means it should have: the page visible above the strip at all times, one active value, big gesture controls, the numbers shown clearly because he thinks in numbers, undo and compare under the thumb.

What it should not have: a list of every property at once, panels that float over the page, typing as the main way to change a number, anything that needs two hands.

---

## 3. Research: how the best mobile editors do it

Evidence marks: **CONFIRMED** means a cited source says it. **OBSERVED** means from using the app, not from a citation (check on device). Several vendor help pages blocked automated fetching (Adobe returned 403; Apple's HIG pages render only with JavaScript), so some claims rest on secondary sources linked below.

### 3.1 Adobe Lightroom mobile

- **Tool strip:** a row of tool categories along the bottom (Light, Color, Effects, Detail and more). Tapping one opens its sliders in a panel above the strip; the photo shrinks to fit above. OBSERVED.
- **How a value changes:** a standard horizontal slider per property, value shown as a number to the right of the label. OBSERVED.
- **Fine steps:** tapping the left or right side of the slider nudges the value in small increments. CONFIRMED ([Digital Trends](https://digitaltrends.com/photography/lightroom-shortcuts-ipad-mobile), [Adobe gesture controls](https://helpx.adobe.com/lightroom/mobile/get-started/gesture-controls-in-lightroom-for-mobile.html)).
- **Reset one control:** double tap the slider thumb resets it to default. CONFIRMED ([Adobe gesture controls](https://helpx.adobe.com/ee/lightroom/mobile/get-started/gesture-controls-in-lightroom-for-mobile.html), [Adobe community thread](https://community.adobe.com/questions-680/sliders-are-not-resetting-back-to-0-when-i-double-tap-on-the-screen-929608)).
- **Compare:** press and hold the photo shows Before, lift to see After. CONFIRMED (Adobe gesture table, [Lynda course transcript](https://origin-www.lynda.com/Lightroom-Mobile-tutorials/Getting-know-general-editing-controls/5005075/2917586-4.html)).
- **Undo:** undo and redo arrows in the top bar. OBSERVED.
- **Lesson for us:** tap to nudge, double tap to reset and hold to compare are the three gestures worth copying exactly. The many-sliders panel is what we are moving away from.

### 3.2 iOS Photos (Edit, Adjust)

- **Tool strip:** since iOS 13, a horizontal strip of round tool icons you swipe through, with a dial beneath it. CONFIRMED ([Podfeet on iOS 13 Photos](https://www.podfeet.com/blog/2019/09/photos-ios-13/), [Macworld](https://www.macworld.com/article/226473/how-to-edit-photos-in-ios-using-photo-s-adjustments-panel.html)).
- **How a value changes:** a ruler of ticks scrolls under a fixed centre needle. You drag the ruler, not a thumb. OBSERVED, and described in the sources above.
- **Value readout:** the selected tool's icon shows the number while you adjust; a coloured arc on the icon shows how far from zero. CONFIRMED ([Macworld](https://www.macworld.com/article/226473/how-to-edit-photos-in-ios-using-photo-s-adjustments-panel.html), [Podfeet arcs](https://podfeet.com/blog/?p=19338)).
- **Reset point:** a dot on the ruler marks the starting value; scrubbing back to it returns the original. CONFIRMED (Macworld).
- **Compare:** tap the photo to toggle the original. OBSERVED.
- **Changed tools:** icons with a change keep their arc, so you can scan which tools are touched. CONFIRMED (Podfeet arcs).
- **Lesson for us:** the scrolling ruler with a fixed needle is the right control for a phone: the thumb drags anywhere along a wide strip, nothing small to grab, and the value sits in one fixed spot. The "this one was changed" mark on each tool is worth copying.

### 3.3 Snapseed

- **Tool strip:** tools live in a Tools sheet; inside a tool, a small bottom bar holds cancel, the adjust icon and apply. CONFIRMED ([9to5Google on 2.13](https://9to5google.com/2016/11/30/snapseed-2-13-simplified-editor-android-ios)).
- **How a value changes:** swipe up or down anywhere on the photo to pick a parameter, swipe left or right anywhere on the photo to change it. The picker vanishes when you lift. CONFIRMED ([TidBITS](https://tidbits.com/2012/01/06/snapseed-displays-innovative-touch-techniques/), [Macworld](https://www.macworld.com/article/212753/snapseed-cool.html)).
- **Value readout:** a pill at the top shows the parameter name and number while you swipe. OBSERVED.
- **Why it works:** the whole photo is the control, so there is no slider to cover anything. Reviewers call it clean and free of sliders. CONFIRMED (TidBITS).
- **Lesson for us, with a caution:** we cannot use the page as the scrub surface, because a swipe on our page must still scroll the page. Take the idea that the control surface is wide and the value floats in one place, not the gesture itself.

### 3.4 VSCO

- **Tool strip:** a row of tool icons beneath the image, swipe the row to see more. Tapping a tool opens one slider in its place. CONFIRMED ([iPhone Photography School VSCO guide](https://iphonephotographyschool.com/vsco/), [Tuts+](https://photography.tutsplus.com/tutorials/how-to-edit-photos-with-vsco-cam--cms-23617)).
- **One control at a time:** most tools have a single slider, with cancel and confirm either side. CONFIRMED (iPhone Photography School).
- **Compare:** press and hold the image shows the original. CONFIRMED (both sources).
- **Lesson for us:** one tool open replaces the strip; it does not stack on top. Cancel on the left, confirm on the right keeps the exit obvious.

### 3.5 Instagram edit

- **Tool strip:** Filter and Edit tabs at the very bottom; Edit opens a scrolling row of tool icons; tapping one opens a single slider under the photo. CONFIRMED ([Instagram announcement](https://about.instagram.com/blog/announcements/introducing-creative-tools-to-adjust-brightness-contrast-and-more), [Digital Trends](https://www.digitaltrends.com/photography/how-to-edit-photos-in-instagram/)).
- **Compare:** tap and hold on the photo for the original. CONFIRMED ([How-To Geek](https://www.howtogeek.com/299104/how-to-toggle-between-filtered-and-unfiltered-instagram-photos-as-you-edit/), [iPhone Life tip](https://iphonelife.com/blog/32671/tip-day-press-and-hold-photo-while-editing-temporarily-see-original)).
- **Intensity:** double tap a filter opens its strength slider. CONFIRMED ([Dummies](https://dummies.com/article/use-instagrams-editing-tools-249681)).
- **Lesson for us:** two levels at the bottom (category tabs, then tools) is enough; a third level becomes the slider itself, not another row.

### 3.6 Darkroom

- **Tool strip:** a short list of top-level tools (Crop, Filters, Adjust, Curves, Colour) along the bottom, each opening its own panel. CONFIRMED ([TapSmart review](https://www.tapsmart.com/apps/review-darkroom-an-editing-app-that-wont-make-you-want-to-lie-down-in-one/), [eXtensions 2018](https://extensions.in.th/amitiae/2018/3_2018/darkroom.html)).
- **Reputation:** Apple Design Award winner, described by Apple's editors as elegantly simple. CONFIRMED ([App Store story](https://apps.apple.com/story/id1521324925)).
- **Lesson for us:** keep top-level categories to five or fewer. Darkroom's restraint is what makes it fast.

### 3.7 Canva mobile (layout editor)

- **Contextual bottom toolbar:** tapping an element highlights it and opens a toolbar at the bottom whose options depend on what is selected; swipe the toolbar for more. CONFIRMED ([Techpoint guide](https://techpoint.africa/?p=330333), [Canva help](https://www.canva.com/en_au/help/glow-up/)).
- **Keyboard:** in text edit mode a separate toolbar sits above the keyboard. CONFIRMED ([Canva help](https://www.canva.com/help/glow-up/)).
- **Lesson for us:** this is the closest model to our job (selecting page elements, not adjusting one photo). Tools shown depend on the element: no Gap chip on a block that is not flex or grid, no Weight on an image.

### 3.8 Figma, Framer and Webflow on a phone

- **Figma mobile** does not edit design files; it views, comments and mirrors. CONFIRMED ([Figma forum answer](https://forum.figma.com/ask-the-community-7/why-can-t-i-edit-my-figma-files-in-mobile-app-12150), [App Store listing](https://apps.apple.com/app/figma-and-figjam/id1152747299)).
- **Framer** edits CMS content on a phone through an Editor Bar on the live site, not layout. CONFIRMED ([Framer update](https://www.framer.com/ja/updates/mobile-friendly-cms)).
- **Webflow** has no official mobile editor; third-party apps cover CMS only. CONFIRMED ([Digidop](https://digidop.com/blog/edit-webflow-mobile-project), [Webflow forum](https://discourse.webflow.com/t/cms-editor-for-mobile/80907)).
- **Lesson for us:** no major design tool solves layout editing on a phone. There is no pattern to lift; the photo editors are the right reference, adapted to element selection the way Canva does it.

### 3.9 Guidance that applies across all of them

- **Touch targets:** Apple's minimum is 44 by 44 points for any control. CONFIRMED by many secondaries ([Uxcel summary](https://app.uxcel.com/courses/mobile-design/mobile-layout-182/make-sure-tap-targets-are-large-enough-3678)); primary is [Apple HIG, Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility). Our current 34px buttons fail it.
- **Toolbars:** on iPhone, toolbars sit at the bottom and hold a small set of actions for the current view. Primary: [Apple HIG, Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars). Sliders: [Apple HIG, Sliders](https://developer.apple.com/design/human-interface-guidelines/sliders).
- **Bottom sheets:** NN/g says the "it is easier to reach" argument for bottom sheets is mostly wrong (the middle of the screen is easiest to tap); sheets suit quick tasks; nonmodal sheets let you keep using the page behind; give a visible Close, not only a grab handle; never stack sheets. CONFIRMED ([NN/g, Bottom sheets](https://www.nngroup.com/articles/bottom-sheet/)).
  - What this changes for us: the case for the bottom strip is **keeping the page visible above it**, not reach. Reach still matters for the frequent controls (scrub, undo, compare), so those go low; rare ones (Copy, exit) can go in the top row of the strip.

### 3.10 Pattern table

| | Tool pick | Value control | Readout | Compare | Reset one | Undo |
|---|---|---|---|---|---|---|
| Lightroom | Category strip, then sliders panel | Slider, tap sides to nudge | Number by label | Hold photo | Double tap thumb | Top arrows |
| iOS Photos | Swipeable icon row | Ruler under fixed needle | Number on icon, arc | Tap photo | Scrub back to dot | Top arrow |
| Snapseed | Swipe up or down on photo | Swipe left or right on photo | Top pill | Hold compare icon | Cancel tool | History |
| VSCO | Swipeable icon row | One slider | Number above | Hold photo | Cancel | History |
| Instagram | Tabs, then icon row | One slider | Number above | Hold photo | Cancel | Revert |
| Darkroom | Five tools | Sliders | Number | Hold photo | Double tap | History |
| Canva | Contextual bar on select | Mixed | Mixed | none | none | Top arrows |
| **Ours** | **4 tabs, then chips** | **Ruler under fixed needle** | **Big number above needle** | **Hold button** | **Double tap number** | **Bottom arrows** |

---

## 4. Reusable components

Plain static page, no build, one script tag at most. Ranked.

| # | Component | Use it for | Verdict |
|---|---|---|---|
| 1 | **No library: native horizontal scroll ruler** (a scroll container with tick marks, value read from `scrollLeft`) ([CSS scroll snap examples](https://freefrontend.com/css-scroll-snap/)) | The scrub dial | **Use.** iOS gives momentum (coarse) and precise slow drag (fine) for free, it feels like Photos, and it is about 80 lines. Pointer Events alternative is more code and loses native momentum. |
| 2 | **vanilla-colorful** (web component, `<hex-input>` and `<hex-color-picker>`, hex in and out, touch friendly) ([npm](https://npmjs.com/package/vanilla-colorful), [GitHub](https://github.com/web-padawan/vanilla-colorful)) | Colour tab | **Use if** he wants a picker as well as hex. Hex alone needs no library. |
| 3 | **Native `<dialog>`** styled as a sheet | Sections list and Copy changes list | **Use.** Built in focus handling, Esc and backdrop. No drag needed for two short sheets. |
| 4 | **pure-web-bottom-sheet** (web component, CSS scroll snap points, CDN) ([README](https://cdn.jsdelivr.net/npm/pure-web-bottom-sheet@0.7.0/README.md), [writeup](https://dev.to/viliket/native-like-bottom-sheets-on-the-web-the-power-of-modern-css-ld6)) | Sections sheet if we want drag between half and full height | Hold. Only if the native dialog feels stiff on device. |
| 5 | Coloris ([GitHub](https://github.com/mdbassit/coloris)) | Colour | Skip; heavier than vanilla-colorful for the same job. |
| 6 | timelessco js-bottomsheet, drwr ([GitHub](https://github.com/timelessco/js-bottomsheet), [drwr](https://apvl-dev.pages.dev/stuff/drwr)) | Sheets with spring physics | Skip; adds a gesture dependency we do not need. |
| 7 | Tweakpane / tweakpane-css (picked by the sibling report for `:root` tokens) ([npm](https://www.npmjs.com/package/tweakpane)) | Token sliders | Complementary, not a replacement: it is a desktop-style panel of rows, which is the model this spec moves away from. Keep it for tokens if adopted, keep this tool for per-element edits. |
| 8 | Eruda (mobile devtools) ([overview](https://umaar.com/dev-tips/105-embedded-mobile-devtools)) | Inspecting on phone | Skip; inspects the DOM, live CSS editing unconfirmed, and its UI is devtools, not a phone editor. |
| 9 | @scena/ruler ([npm](https://www.npmjs.com/package/@scena/ruler)) | none | Skip; it draws design rulers, it is not a value picker. |

---

## 5. Spec

### 5.1 Layout

Three zones, top to bottom. The page is never covered by a floating card.

1. **Page (canvas).** Full width, scrolls normally. Gets `padding-bottom` equal to the strip height while editing, so the last section can scroll above the strip.
2. **Selection label.** Drawn on the page, attached to the selection outline (above it, or below it if there is no room). Shows element name and current size in px, e.g. `h2 · 343 × 84`.
3. **Edit strip.** Fixed to the bottom, full width, solid background, never transparent over text.

Edit strip, from the top of the strip down:

| Row | Height | Contents |
|---|---|---|
| A. Context row | 44 | Breadcrumb (scrolls sideways), Up to parent button, scope pill (`Phone` or `All widths`) |
| B. Value row | 72 | Property name small, value large, centred over the needle. Original value marker on the ruler. |
| C. Ruler | 48 | The scrub ruler, edge to edge, fixed centre needle |
| D. Property chips | 44 | Chips for the active tab, scroll sideways. Dot on a chip that has a change. |
| E. Tab bar | 52 | Undo · Text · Space · Size · Colour · Redo, and Compare as a hold button |
| Safe area | `env(safe-area-inset-bottom)` (34 on Face ID iPhones) | Background only |

Total: about 260 plus safe area when an element is selected. Before anything is selected, rows B to D collapse and the strip is 96 plus safe area.

Top of screen, outside the strip: one small floating bar, top right, `Copy 7` and `Done`. These are rare actions and do not need to be in thumb reach; keeping them out of the strip keeps it short.

**At 375 by 812 (iPhone mini, SE class widths, 13 and 14 base):** visible page height while editing is about 812 minus 47 top inset minus 294 strip and safe area = about 470, which is a bit over half the screen. Chips show about four at a time; the tab bar fits six items at 62 each. Value text 28px.

**At 430 by 932 (Pro Max and Plus):** visible page about 932 minus 59 minus 294 = about 580. Chips show five at a time. Value text 32px. Nothing else changes; the strip is the same height so the muscle memory is the same.

**Landscape:** not a target. If the phone is turned, the strip keeps working but the page area is small; no special layout.

**Desktop and tablet bands:** the same strip, max width 480, centred at the bottom. Editing at those widths still matters because the scope pill writes to that band.

### 5.2 Rationale per region

| Region | Principle | Why it fits him |
|---|---|---|
| Page stays visible above the strip | Visibility of system status (Nielsen #1); direct manipulation | He is judging a feel, so the page must be visible while the value moves, which is the job a photo editor's canvas does. |
| One value at a time on a ruler | Progressive disclosure; Hick's law | The old card showed up to 20 rows; he only ever changes one number at a time. |
| Ruler under a fixed needle, not a thumb | Fitts's law: the target is the full strip width, not a 28pt thumb | One-handed drag anywhere on a 375 wide strip; the value never moves under his finger. Same model as iOS Photos, which he already uses. |
| Big number above the needle | Recognition over recall; match to the real world | He thinks in px values and must give Claude exact numbers. |
| Tabs at the very bottom | Platform convention (iOS tab bar and Photos edit) | Category switching is frequent and belongs in the easiest reach. |
| Undo, redo and compare in the tab row | Fitts's law and user control and freedom (Nielsen #3) | These are the most used actions after scrubbing. |
| Breadcrumb and Up in the context row | Wayfinding; visible location | Tapping text lands on a deep element; he needs to see where he is and climb. |
| Copy and Done at the top | Frequency of use | Used once per session. |

### 5.3 Selection on the page

- **Tap** selects the element under the finger. The tap never follows a link, submits a form or plays a video while edit mode is on (capture phase click handler with `preventDefault`, already in place).
- **Smart default:** if the tapped element is an inline span or a text node wrapper inside a block of text, select the nearest block (p, h1 to h6, li, a styled as a block, button). He almost always means the paragraph, not the span. Up to parent still reaches the span's parent chain; a Down button is not needed because tapping again selects deeper (see next).
- **Tap the selected element again:** selects the child under the finger, if there is one. Tap on a different element: selects that one fresh. This mirrors Figma's click to go deeper.
- **Up button** (in row A): selects the parent. Disabled at `body`.
- **Breadcrumb** (row A): `main › section.hero › div.copy › h1`. Each crumb is a button; tapping jumps to that ancestor. The current crumb is bold and the row auto-scrolls so it is visible at the right end.
- **Outline:** 2px solid blue outline, plus a 1px white outer ring so it reads on dark and light sections. Label tag as in 5.1.
- **Space overlay:** while the Space tab is open, tint margins orange at 25% and padding green at 25% on the selected element, like browser devtools. This is the single biggest legibility win for spacing work.
- **Auto scroll:** after selecting, if the element's box is hidden by the strip, scroll the page so the element sits in the visible area (use `scroll-margin-bottom` equal to strip height, then `scrollIntoView({ block: "nearest" })`).
- **Long press:** disabled on the page while editing (`-webkit-touch-callout: none; user-select: none` on `body.ed-on`), so Safari's text callout and link preview do not fire.
- **Sections list:** a `Sections` crumb at the start of the breadcrumb opens a sheet listing every section and its children (the current All sections view, simplified). Tapping a row selects the element, closes the sheet and scrolls to it.

### 5.4 Tabs and chips

Four tabs. A tab shows only the chips that apply to the selected element (Canva model). A dot on a tab means something in it has changed on this element.

| Tab | Chips | Hidden when |
|---|---|---|
| Text | Style, Size, Weight, Line height, Letter spacing | Element has no text (image, svg) |
| Space | Above, Below, Left, Right (margin); Inside top, Inside bottom, Inside left, Inside right (padding); Gap | Gap hidden unless flex or grid |
| Size | Width, Max width | never |
| Colour | Text colour (hex) | Element has no text |

Chip labels use the words in the table, not CSS names; the Copy output keeps CSS names for Claude.

**Style chip** opens a horizontal picker of the named styles (Display/96, Heading/64 and so on) in place of the ruler, current one highlighted. Tap applies all four values as one undo step.

**Linked values:** in Space, a `Link` toggle at the left of the chips applies Above and Below together (or all four inside values together). Off by default.

### 5.5 The scrub ruler

Micro-interaction spec.

- **Trigger:** touch down and horizontal drag on row C. Also: tap on the left or right third of the ruler, or tap the value.
- **Rules:**
  - The ruler is a horizontal scroll container. The centre needle is fixed. Value = original + (scroll offset ÷ px per step) × step.
  - Steps and scale per property:

    | Property | Step | Major tick every | Px per step on screen |
    |---|---|---|---|
    | Size | 1px | 8 | 10 |
    | Weight | 100 | 100 | 40 |
    | Line height | 1px | 4 | 10 |
    | Letter spacing | 0.1px | 1px | 8 |
    | Space (all) | 1px | 4 (our spacing base) | 8 |
    | Width, Max width | 4px | 40 | 8 |

  - **Coarse:** a flick uses iOS momentum to travel many steps. **Fine:** a slow drag moves one step per tick. Native scrolling gives both with no code.
  - **Nudge:** a tap on the left or right third of the ruler moves one step down or up (Lightroom's tap to nudge).
  - **Snap:** on release, the value rounds to the nearest step and the ruler animates to it.
  - **Bounds:** min 0 for size, line height, padding and width; margins may go negative; weight 100 to 900.
  - **Live apply:** every value change writes the CSS live (in a `requestAnimationFrame`), but only **release** writes one undo entry. One drag is one undo.
  - **Original marker:** a small dot on the ruler at the value the element had when the page loaded (Photos' white dot). Crossing it gives a slight detent (the ruler sticks for 6px).
- **Feedback:**
  - Value text updates every frame. Changed values are blue; the original value is the default ink colour.
  - The page moves live under the outline. The outline and label follow the element every frame.
  - Haptics: Safari on iPhone does not support the Vibration API, so no haptics. The detent at the original is the substitute.
- **Reset:** double tap the value text returns the original, as one undo step (Lightroom's double tap reset, moved off the slider because our ruler has no thumb).
- **Type a number:** single tap the value text turns it into a numeric field (`inputmode="decimal"`, 16px or larger). Return or tapping away commits. This is the escape hatch for exact values he already knows.
- **Durations:** snap 160ms ease-out; tab and chip switch 120ms crossfade; no motion if `prefers-reduced-motion: reduce`.
- **Accessibility:** ruler has `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` (e.g. "24 pixels"), and arrow keys step it.

### 5.6 Colour

- Ruler row is replaced by: a swatch, a hex field and a row of the site's colour tokens (read from `:root` custom properties) as swatches.
- Hex field: `type="text"`, `inputmode="text"`, `autocapitalize="off"`, `autocorrect="off"`, `spellcheck="false"`, `maxlength="7"`, font size 17px. Accepts with or without `#`, 3 or 6 digits. Invalid input shows a red underline and does not apply.
- Applies on every valid keystroke (live), commits one undo entry on blur or Return.
- Tapping a token swatch writes `var(--token)` rather than the raw hex, and the Copy output names the token. That keeps changes on system.
- Keyboard: when the field has focus the strip moves up above the keyboard (see 5.11).
- Picker: optional, via vanilla-colorful, behind a swatch tap. Leave out of the first build.

### 5.7 Width scope

- A pill in row A: `Phone` (the current band name) or `All widths`. Tap toggles.
- Default: the current band. He edits on a phone, so a change he makes should not silently change desktop.
- When `All widths` is on, the pill is filled and the value text gets a small `all` tag, so he cannot miss it.
- If a property has a band value and an all-widths value, the ruler shows the one for the current scope, and a small "also set for all widths" note sits under the value.

### 5.8 Compare

- **Hold** the Compare button in row E: all edit changes switch off (the changes stylesheet is disabled) and the outline hides. Release brings them back. Matches the press-and-hold compare in Lightroom, VSCO and Instagram.
- Why a button and not holding the page: a long press on the page fights Safari's link preview and text selection, and the page also needs taps for selection.
- **Scope:** compare shows the whole page without any changes, not only the selected element.
- **Feedback:** a pill at the top reads `Original` while held.

### 5.9 Undo and redo

- Arrows at the two ends of row E, 44 by 44.
- Every committed action is one step: one drag, one typed value, one style pick, one reset, one hex entry.
- Undo stack persists in localStorage with the changes, so a reload keeps history. Cap at 200 steps.
- After undo, the tool selects the element the step belonged to and opens its tab and chip, so he sees what changed back.
- Per element reset lives in the breadcrumb's long press menu: `Reset this element`. Clear all lives in the Copy sheet.

### 5.10 Copy changes

- Top right floating button: `Copy 7` (count of changes). Disabled at zero.
- Tap opens a sheet (native `<dialog>`) listing changes grouped by page and element, each with a remove button. At the bottom: `Copy for Claude` (primary) and `Clear all` (secondary, confirm).
- `Copy for Claude` uses `navigator.clipboard.writeText`; it works on the wifi preview only over HTTPS or localhost. On plain http over a LAN address the clipboard API is blocked, so fall back to a read-only textarea with the text selected and a note "Tap Copy in the menu". Check which one the preview address uses before building.
- Output format unchanged from today, so the proposals loop still works.

### 5.11 States and wireframes

All at 375 wide. `▓` is the strip background.

**State 0: off.** Only the Edit pill, bottom left above the safe area.

```
┌─────────────────────────────┐
│  page                       │
│                             │
│                             │
│                             │
│                             │
│ ( Edit )                    │
└──────────── ▬ ──────────────┘
```

**State 1: edit on, nothing selected.**

```
┌─────────────────────────────┐
│               ( Copy 0 )(Done)
│  page, links inactive       │
│                             │
│                             │
│                             │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ Tap anything to edit it    ▓│
│▓ [Sections]                 ▓│
│▓ ↶                       ↷  ▓│
└──────────── ▬ ──────────────┘
```

**State 2: heading selected, Text tab, Size chip.**

```
┌─────────────────────────────┐
│               ( Copy 3 )(Done)
│ ┌─h1 · 343×84──────────┐    │
│ │ Big heading text     │    │
│ └──────────────────────┘    │
│  body copy                  │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ ‹ section › div › h1  ↑ [Phone]
│▓            Size            ▓│
│▓             40             ▓│
│▓ |  .  .  .  |  •  .  ▼  .  |▓│  ruler, needle ▼ fixed
│▓ (Style)(Size•)(Weight)(Line)▓│
│▓ ↶  Text  Space  Size  Colour  ◐  ↷
└──────────── ▬ ──────────────┘
```

**State 3: Space tab, Below chip, overlay on.**

```
┌─────────────────────────────┐
│               ( Copy 4 )(Done)
│ ┌─p · 343×120──────────┐    │
│ │░░padding░░░░░░░░░░░░░│    │
│ │  paragraph text      │    │
│ └──────────────────────┘    │
│ ▒▒▒▒ margin below ▒▒▒▒▒▒    │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ ‹ div › p           ↑ [Phone]
│▓          Space below       ▓│
│▓              24            ▓│
│▓ |  .  .  .  |  .  .  ▼  .  |▓│
│▓ (Link)(Above)(Below•)(Left)…▓│
│▓ ↶  Text  Space  Size  Colour  ◐  ↷
└──────────── ▬ ──────────────┘
```

**State 4: Colour with keyboard open.** Strip rides on top of the keyboard; ruler row replaced.

```
┌─────────────────────────────┐
│ ┌─h1─────────────┐          │
│ │ Big heading    │          │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ ■  [ #f2f1f8          ]    ▓│
│▓ ● ● ● ● ● ●  tokens        ▓│
├─────────────────────────────┤
│  keyboard                   │
│                             │
└─────────────────────────────┘
```

**State 5: Compare held.**

```
┌─────────────────────────────┐
│          ( Original )       │
│  page without any changes   │
│  no outline                 │
│                             │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓   (strip dimmed to 40%)    ▓│
│▓ ↶  Text  Space  Size  Colour [◐] ↷
└──────────── ▬ ──────────────┘
```

**State 6: Sections sheet.**

```
┌─────────────────────────────┐
│  page, dimmed               │
│┌───────────────────────────┐│
││ Sections              ✕   ││
││ 1. Hero                 › ││
││    h1 "Designing for…"    ││
││    p  "I lead…"           ││
││ 2. Selected work        › ││
││ 3. About                › ││
││ 4. Footer               › ││
│└───────────────────────────┘│
└──────────── ▬ ──────────────┘
```

**State 7: Copy sheet.**

```
┌─────────────────────────────┐
│┌───────────────────────────┐│
││ 7 changes             ✕   ││
││ /  h1 "Designing…" phone  ││
││    font-size 40px     ⊖   ││
││    line-height 46px   ⊖   ││
││ /  p "I lead…" all widths ││
││    margin-bottom 24px ⊖   ││
││ [ Copy for Claude       ] ││
││ [ Clear all ]             ││
│└───────────────────────────┘│
└──────────── ▬ ──────────────┘
```

### 5.12 State model

```
off ──tap Edit──▶ idle ──tap element──▶ selected(tab, chip)
 ▲                 │  ▲                   │  │  │
 └──── Done ───────┘  └── tap empty area ─┘  │  └─ hold Compare ─▶ comparing ─release─▶ back
                      ▲                      └─ tap value ─▶ typing ─Return or blur─▶ selected
 Sections sheet ◀─────┤ Copy sheet ◀─ Copy 
```

Only one sheet open at a time (NN/g: never stack sheets). Opening a sheet keeps the selection.

### 5.13 Safari and touch details

| Detail | What to do | Why |
|---|---|---|
| Strip height and position | `position: fixed; bottom: 0; padding-bottom: env(safe-area-inset-bottom)` | Keeps controls off the home indicator. |
| Viewport meta | Add `viewport-fit=cover` on preview pages only, or `env()` returns 0 | `env(safe-area-*)` only has values with `viewport-fit=cover` ([OpenReplay](https://blog.openreplay.com/fr/5-mobile-web-problemes-solutions/)). |
| Page height | Use `100dvh` for any full height sheet, not `100vh` | `100vh` is the largest viewport on iOS and hides content under the toolbar. |
| Bottom padding for the page | `body.ed-on { padding-bottom: calc(var(--ed-strip-h) + env(safe-area-inset-bottom)) }` and `scroll-padding-bottom` the same | The last content can be scrolled above the strip and selections scroll into the visible area. |
| Keyboard | Listen to `visualViewport` resize and scroll; set `transform: translateY(-(innerHeight - visualViewport.height - visualViewport.offsetTop))` on the strip | Safari does not move fixed elements with the keyboard and ignores `interactive-widget` and `env(keyboard-inset-height)` ([saricden](https://saricden.substack.com/p/how-to-make-fixed-elements-respect-the-virtual-keyboard-on-ios), [WebKit bug 230225](https://bugs.webkit.org/show_bug.cgi?id=230225)). Reset on blur; there is a reported iOS 26 bug where `offsetTop` does not reset ([Apple forums](https://developer.apple.com/forums/thread/800154)). |
| Input zoom | Every input in the tool at `font-size: 16px` or larger | Safari zooms the page on focus of any input under 16px ([Telerik](https://docs.telerik.com/devtools/aspnet-ajax/knowledge-base/common-disable-autozoom-input-safari-iphone), [Rick Strahl](https://weblog.west-wind.com/posts/3805118.aspx)). Do not use `user-scalable=no`. |
| Double tap zoom | `touch-action: manipulation` on the whole strip and on `body.ed-on` | Removes double tap zoom and the tap delay ([WebKit blog](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/)). Needed so double tap on the value resets instead of zooming. |
| Ruler | `touch-action: pan-x; overscroll-behavior-x: contain; scrollbar-width: none` and hide `::-webkit-scrollbar` | Horizontal drag scrubs and never scrolls the page or triggers back swipe. |
| Strip itself | `overscroll-behavior: contain` | Stops the page from scrolling when he drags on the strip. |
| Text callout | `body.ed-on { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none }`, restore on inputs | No long press menus or text selection while picking elements. |
| Tap highlight | `-webkit-tap-highlight-color: transparent` on the strip | The grey flash on tap hides the active state. |
| Targets | Every control 44 by 44 minimum; chips 44 tall with 8px gap | Apple minimum ([HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility)). |
| Outline tracking | Redraw outline on `scroll`, `resize`, `visualViewport` events and after each value change, in `requestAnimationFrame` | The element moves as values change. |
| Clipboard | Needs a secure context; HTTP on a LAN address will fail | See 5.10. |
| Coexisting tools | Hide the Type review button while edit mode is on | Two fixed bottom tools overlap at 375. |
| Fonts in the strip | `font: 15px/1.3 system-ui`; inputs 17px | Matches iOS and clears the 16px zoom floor. |

---

## 6. Open questions and edge cases

- **Clipboard on the preview address.** If the preview is served as `http://192.168.x.x`, `navigator.clipboard` is unavailable and the textarea fallback is the real path. Worth knowing before building 5.10.
- **Tap smart default.** Selecting the nearest block instead of the span will be wrong sometimes (an inline link he wants to style). Tap again to go deeper covers it; check it on device.
- **Selector stability.** `selOf()` builds `nth-of-type` chains up to five deep. A change made on a page that later changes structure will point at the wrong element. Out of scope here, but the Copy sheet could show the element's text so Claude can match by content.
- **Scrub at desktop band.** He cannot preview the desktop band on a phone, so `All widths` changes are judged only at phone width. The `all` tag on the value is the guard.
- **Margins on inline elements.** Today the tool silently switches inline elements to `inline-block`. Keep that, but list it in the Copy output so Claude knows display changed.

---

## 7. Sources

Apps: [Adobe Lightroom gesture controls](https://helpx.adobe.com/lightroom/mobile/get-started/gesture-controls-in-lightroom-for-mobile.html) · [Digital Trends, Lightroom shortcuts](https://digitaltrends.com/photography/lightroom-shortcuts-ipad-mobile) · [Adobe community, double tap reset](https://community.adobe.com/questions-680/sliders-are-not-resetting-back-to-0-when-i-double-tap-on-the-screen-929608) · [Macworld, iOS Photos adjustments](https://www.macworld.com/article/226473/how-to-edit-photos-in-ios-using-photo-s-adjustments-panel.html) · [Podfeet, Photos iOS 13](https://www.podfeet.com/blog/2019/09/photos-ios-13/) · [Podfeet, arcs](https://podfeet.com/blog/?p=19338) · [TidBITS, Snapseed touch](https://tidbits.com/2012/01/06/snapseed-displays-innovative-touch-techniques/) · [9to5Google, Snapseed 2.13](https://9to5google.com/2016/11/30/snapseed-2-13-simplified-editor-android-ios) · [iPhone Photography School, VSCO](https://iphonephotographyschool.com/vsco/) · [Tuts+, VSCO](https://photography.tutsplus.com/tutorials/how-to-edit-photos-with-vsco-cam--cms-23617) · [Instagram, creative tools](https://about.instagram.com/blog/announcements/introducing-creative-tools-to-adjust-brightness-contrast-and-more) · [How-To Geek, Instagram compare](https://www.howtogeek.com/299104/how-to-toggle-between-filtered-and-unfiltered-instagram-photos-as-you-edit/) · [TapSmart, Darkroom](https://www.tapsmart.com/apps/review-darkroom-an-editing-app-that-wont-make-you-want-to-lie-down-in-one/) · [App Store, Apple Design Awards](https://apps.apple.com/story/id1521324925) · [Canva help, editor](https://www.canva.com/help/glow-up/) · [Techpoint, Canva mobile](https://techpoint.africa/?p=330333) · [Figma forum, mobile editing](https://forum.figma.com/ask-the-community-7/why-can-t-i-edit-my-figma-files-in-mobile-app-12150) · [Framer, mobile CMS](https://www.framer.com/ja/updates/mobile-friendly-cms) · [Digidop, Webflow on mobile](https://digidop.com/blog/edit-webflow-mobile-project)

Guidelines: [Apple HIG, Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) · [Apple HIG, Sliders](https://developer.apple.com/design/human-interface-guidelines/sliders) · [Apple HIG, Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) · [NN/g, Bottom sheets](https://www.nngroup.com/articles/bottom-sheet/)

Safari: [WebKit, more responsive tapping](https://webkit.org/blog/5610/more-responsive-tapping-on-ios/) · [Telerik, input zoom](https://docs.telerik.com/devtools/aspnet-ajax/knowledge-base/common-disable-autozoom-input-safari-iphone) · [Rick Strahl, input zoom](https://weblog.west-wind.com/posts/3805118.aspx) · [OpenReplay, safe areas](https://blog.openreplay.com/fr/5-mobile-web-problemes-solutions/) · [saricden, fixed elements and keyboard](https://saricden.substack.com/p/how-to-make-fixed-elements-respect-the-virtual-keyboard-on-ios) · [WebKit bug 230225](https://bugs.webkit.org/show_bug.cgi?id=230225) · [Apple forums, iOS 26 offsetTop](https://developer.apple.com/forums/thread/800154)

Components: [vanilla-colorful](https://github.com/web-padawan/vanilla-colorful) · [pure-web-bottom-sheet](https://cdn.jsdelivr.net/npm/pure-web-bottom-sheet@0.7.0/README.md) · [Coloris](https://github.com/mdbassit/coloris) · [js-bottomsheet](https://github.com/timelessco/js-bottomsheet) · [Tweakpane](https://www.npmjs.com/package/tweakpane) · [Eruda overview](https://umaar.com/dev-tips/105-embedded-mobile-devtools) · [@scena/ruler](https://www.npmjs.com/package/@scena/ruler)

Not reached: Adobe help pages returned 403 to direct fetch (facts taken from search results and secondary guides); Apple HIG pages render only with JavaScript, so HIG claims rest on the linked secondaries and should be checked on the live pages. Darkroom's current slider behaviour has no recent written source.
