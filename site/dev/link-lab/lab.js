// Link states lab (site/dev/link-lab). Shows every link component on the site in each state side by side and
// lets Chadwick tune them live. The links are the site's own markup and CSS: the lab forces a state by
// copying each :hover, :active and :focus-visible rule from the site's stylesheets as a class
// (.lab-hover, .lab-press, .lab-focus), so a forced cell is exactly what the real state draws. Tuned values
// go into one override sheet, written only for values that differ from the site, so at rest the lab is the
// live site. Values autosave in this browser; Copy values hands them back as text.
(() => {
  const KEY = "link-lab:v1";
  const TOKENS = ["000", "050", "100", "200", "300", "400", "500", "525", "550", "575", "590", "600", "650", "675", "700", "800", "825", "850", "900", "1000"].map((n) => "neutral-" + n);
  const css = (v) => (TOKENS.includes(v) ? `var(--${v})` : v);
  // One shade in the token scale is one step along this list (Neutral/050 to /100 to /200 ...).
  const shift = (v, n) => (TOKENS.includes(v) ? TOKENS[Math.min(TOKENS.length - 1, TOKENS.indexOf(v) + n)] : v);
  const nice = (v) => (TOKENS.includes(v) ? "Neutral/" + v.slice(8) : v);
  const hexOf = (v) => (TOKENS.includes(v) ? getComputedStyle(document.documentElement).getPropertyValue("--" + v).trim() : v);

  const arrowOut = '<img src="/assets/ui/arrow-out.svg" alt="">';
  const color = (k, label, def) => ({ k, label, type: "color", def });
  const num = (k, label, def, unit, min, max, step) => ({ k, label, type: "num", def, unit, min, max, step });

  const TOUCH_FLAG = "On a touch screen this link still takes its hover after a tap, and it can stay stuck on. Today's rule is no mouse hover on phone and tablet; this link does not follow it yet.";

  // Each component: its real markup, where it is used, his ruling from the comment beside its CSS, the
  // values that can be tuned and the CSS those values write.
  const COMPS = [
    {
      id: "nav", name: "Nav", cls: ".link-nav",
      where: "The navbar on every page: About, Work, Contact me. On Haven it turns dark over the light bridge.",
      rule: "Hover, 10 Nov: the word goes to Neutral/050 and one weight heavier, drawn as an outline so every letter keeps its place. No block. Press looks the same as hover.",
      html: '<a class="link-nav" href="#" aria-label="Work"><span aria-hidden="true">Work<span class="mirror">5</span></span></a>',
      proto: '<div class="proto-navbar"><img class="proto-logo" src="/assets/ui/logo.svg" alt=""><span class="navbar__role">Product Designer</span><ul class="proto-row"><li><a class="link-nav" href="#" aria-label="About"><span aria-hidden="true">Abou<span class="mirror">7</span></span></a></li><li><a class="link-nav" href="#" aria-label="Work"><span aria-hidden="true">Work<span class="mirror">5</span></span></a></li><li><a class="link-nav" href="#" aria-label="Contact me"><span aria-hidden="true">Contact<span class="gap">m<span class="mirror">3</span></span></span></a></li></ul></div>',
      protoCaption: "The navbar as it sits at the top of each page.",
      light: true,
      flag: "Focus on the light bridge: the site's white focus ring on Neutral/400 is faint.",
      knobs: [color("rest", "Text at rest", "neutral-200"), color("hover", "Text on hover and press", "neutral-050"), num("stroke", "Hover outline", 0.36, "px", 0, 1.5, 0.01), color("lightRest", "Text on the light bridge", "neutral-900"), color("lightHover", "Hover on the light bridge", "neutral-900")],
      css: (r) => r.rule(".lab-dark .link-nav", ["color", "rest"]) + r.rule(".lab-dark .link-nav:is(:hover, :active, .lab-hover, .lab-press)", ["color", "hover"]) +
        r.rule(".link-nav:is(:hover, :active, .lab-hover, .lab-press)", ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]) +
        r.rule(".lab-light .link-nav", ["color", "lightRest"]) + r.rule(".lab-light .link-nav:is(:hover, :active, .lab-hover, .lab-press)", ["color", "lightHover"]),
    },
    {
      id: "footer", name: "Footer link", cls: ".link-footer",
      where: "The footer list on Home, Haven and Framework: Home, About, Selected works.",
      rule: "Hover, 10 Nov: dark text on a light block in the text's own resting colour, Neutral/100. The block reaches 0.02em past the capitals and baseline as a shadow, so nothing moves. Press looks the same.",
      html: '<a class="link-footer" href="#">Selected works</a>', cellMin: 220,
      proto: '<ul class="footer__nav proto-col"><li><a class="link-footer" href="#">Home</a></li><li><a class="link-footer" href="#">About</a></li><li><a class="link-footer" href="#">Selected works</a></li></ul>',
      protoCaption: "The footer list, spaced as in the footer.",
      knobs: [color("rest", "Text at rest", "neutral-100"), color("hoverText", "Text on hover and press", "neutral-900"), color("block", "Block on hover and press", "neutral-100"), num("reach", "Block reach above and below", 0.02, "em", 0, 0.4, 0.01), num("stroke", "Hover outline", 0.05, "px", 0, 1, 0.01)],
      css: (r) => r.rule(".link-footer:not(.link-footer-lg)", ["color", "rest"]) +
        r.rule(".link-footer:not(.link-footer-lg):is(:hover, :active, .lab-hover, .lab-press)", ["color", "hoverText"], ["background", "block"],
          ["box-shadow", ["reach", "block"], (a, b) => `0 ${a}em 0 ${css(b)}, 0 -${a}em 0 ${css(b)}`], ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]),
    },
    {
      id: "footer-lg", name: "Footer link, large", cls: ".link-footer.link-footer-lg",
      where: "The phone menu on Home: About, Works. The footer link at Heading/40.",
      rule: "The footer link's style and hover at the larger size.",
      html: '<a class="link-footer link-footer-lg" href="#">Works</a>', cellMin: 200,
      proto: '<div class="proto-phone"><ul class="menu__links proto-col"><li><a class="link-footer link-footer-lg" href="#">About</a></li><li><a class="link-footer link-footer-lg" href="#">Works</a></li></ul><div class="proto-contact"><p class="footer__label">Contact</p><a class="footer__email" href="#">hello@chadwickfenner.com</a></div></div>',
      protoCaption: "The phone menu's lower half, at phone width.",
      knobs: [color("rest", "Text at rest", "neutral-100"), color("hoverText", "Text on press", "neutral-900"), color("block", "Block on press", "neutral-100"), num("reach", "Block reach above and below", 0.02, "em", 0, 0.4, 0.01), num("stroke", "Press outline", 0.05, "px", 0, 1, 0.01)],
      css: (r) => r.rule(".link-footer-lg", ["color", "rest"]) +
        r.rule(".link-footer-lg:is(:hover, :active, .lab-hover, .lab-press)", ["color", "hoverText"], ["background", "block"],
          ["box-shadow", ["reach", "block"], (a, b) => `0 ${a}em 0 ${css(b)}, 0 -${a}em 0 ${css(b)}`], ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]),
    },
    {
      id: "email", name: "Email", cls: ".footer__email",
      where: "The footer's contact column on Home, Haven and Framework, and the phone menu.",
      rule: "Hover as the footer links, 10 Nov: same weight and underline at rest and on hover; the block also reaches down past the underline.",
      html: '<a class="footer__email" href="#">hello@chadwickfenner.com</a>', cellMin: 340,
      proto: '<div class="footer__contact proto-contact"><p class="footer__label">Contact</p><a class="footer__email" href="#">hello@chadwickfenner.com</a></div>',
      protoCaption: "The footer's contact column.",
      knobs: [color("rest", "Text at rest", "neutral-100"), color("hoverText", "Text on hover and press", "neutral-900"), color("block", "Block on hover and press", "neutral-100"), num("below", "Block reach below", 0.4, "em", 0, 0.8, 0.01), num("above", "Block reach above", 0.02, "em", 0, 0.4, 0.01), num("stroke", "Hover outline", 0.05, "px", 0, 1, 0.01)],
      css: (r) => r.rule(".footer__email", ["color", "rest"]) +
        r.rule(".footer__email:is(:hover, :active, .lab-hover, .lab-press)", ["color", "hoverText"], ["background", "block"],
          ["box-shadow", ["below", "above", "block"], (a, b, c) => `0 ${a}em 0 ${css(c)}, 0 -${b}em 0 ${css(c)}`], ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]),
    },
    {
      id: "out", name: "LinkedIn and Resume", cls: ".footer__out",
      where: "The footer's bottom row. Resume shows but is not a link until his resume file exists (17 Nov).",
      rule: "23 Nov, his call: rests on the nav's Neutral/200 and hovers as the nav does, Neutral/050 plus the outline; the arrow now changes with the text.",
      html: `<a class="footer__out" href="#">${arrowOut}<span>Linkedin</span></a>`,
      proto: '<div class="proto-row proto-out"><p class="footer__meta">@2026, Chadwick Fenner</p><a class="footer__out" href="#"><img src="/assets/ui/arrow-out.svg" alt=""><span>Linkedin</span></a><a class="footer__out"><img src="/assets/ui/arrow-out.svg" alt=""><span>Resume</span></a></div>',
      protoCaption: "The footer's bottom row. Resume is not a link yet, so it does not react.",
      knobs: [color("rest", "Text at rest", "neutral-200"), color("hover", "Text on hover and press", "neutral-050"), color("arrowRest", "Arrow at rest", "neutral-200"), color("arrowHover", "Arrow on hover and press", "neutral-050"), num("stroke", "Hover outline", 0.36, "px", 0, 1.5, 0.01)],
      css: (r) => r.rule(".footer__out", ["color", "rest"]) + r.rule(".footer__out:is(:hover, :active, .lab-hover, .lab-press)", ["color", "hover"], ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]) +
        r.rule(".footer__out img", ["background", "arrowRest"]) + r.rule(".footer__out:is(:hover, :active, .lab-hover, .lab-press) img", ["background", "arrowHover"]),
    },
    {
      id: "back", name: "Back to top", cls: ".footer__back",
      where: "The footer on tablet and desktop. Hidden on the phone.",
      rule: "Small link hover, 10 Nov: Neutral/550 to Neutral/050 plus the outline; the arrow turns light.",
      html: '<a class="footer__back" href="#"><img src="/assets/ui/arrow-up.svg" alt=""><span>Back to top</span></a>',
      proto: '<div class="proto-col"><a class="footer__back" href="#"><img src="/assets/ui/arrow-up.svg" alt=""><span>Back to top</span></a></div>',
      protoCaption: "Back to top, at the head of the footer.",
      knobs: [color("rest", "Text at rest", "neutral-550"), color("hover", "Text on hover and press", "neutral-050"), num("stroke", "Hover outline", 0.36, "px", 0, 1.5, 0.01)],
      note: "The arrow is an image: it turns light on hover but does not follow these colours.",
      css: (r) => r.rule(".footer__back", ["color", "rest"]) + r.rule(".footer__back:is(:hover, :active, .lab-hover, .lab-press)", ["color", "hover"], ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]),
    },
    {
      id: "button", name: "Small button", cls: ".button-sm", touchHover: false,
      where: "Learn more on the Home work cards. Under 1200 and on touch it sits under the image; from 1200 up with a mouse the site cursor carries it.",
      rule: "States, 9 Nov (option A): hover fills the outline and the text turns dark; press sinks to Neutral/300 and scales to 98 percent. 23 Nov: no hover fill on the work cards under 1200 or on touch; press still fills.",
      html: '<a class="button-sm" href="#">Learn more</a>',
      proto: '<a class="proto-card" href="#"><img src="/assets/home/haven-card-phone.webp" alt=""><span class="proto-card__row"><span class="proto-card__text"><span class="proto-card__name">Haven</span><span class="proto-card__desc">LGBTQIA + youth app</span></span><span class="work-card__more button-sm">Learn more</span></span></a>',
      protoCaption: "A phone work card, simplified: the whole card is the link, and pressing anywhere on it fills Learn more, as on the site.",
      knobs: [color("rest", "Outline and text at rest", "neutral-100"), num("border", "Outline", 3, "px", 1, 6, 0.5), num("radius", "Corner radius", 32, "px", 0, 40, 1),
        color("fill", "Fill on hover", "neutral-100"), color("hoverText", "Text on hover", "neutral-900"), color("press", "Fill on press", "neutral-300"), color("pressText", "Text on press", "neutral-900"),
        num("scale", "Press scale", 98, "%", 90, 100, 0.5), num("time", "Press scale time", 120, "ms", 0, 400, 10)],
      css: (r) => r.rule(".button-sm", ["color", "rest"], ["border-color", "rest"], ["border-width", "border", (v) => v + "px"], ["border-radius", "radius", (v) => v + "px"], ["transition", "time", (v) => `transform ${v}ms var(--ease-quart-out)`]) +
        r.rule(".button-sm:is(:hover, .lab-hover)", ["background", "fill"], ["color", "hoverText"]) +
        r.rule(".button-sm:is(:active, .lab-press)", ["background", "press"], ["border-color", "press"], ["color", "pressText"], ["transform", "scale", (v) => `scale(${v / 100})`]),
    },
    {
      id: "endbar", name: "End bar links", cls: ".ending-bar a",
      where: "The light bar between a case study and the footer, on Haven and Framework: previous, Explore more, next.",
      rule: "Hover, 9 Nov: the bar is light, so the highlight is inverted, a dark block with light text. The chevron turns light with the text (11 Nov).",
      html: '<nav class="ending-bar lab-endbar"><a class="ending-bar__prev" href="#"><img src="/assets/ui/chevron-left.svg" alt=""><span>Mondai: framework case study</span></a></nav>', cellMin: 300,
      proto: '<nav class="ending-bar"><a class="ending-bar__prev" href="#"><img src="/assets/ui/chevron-left.svg" alt=""><span>Mondai: design system case study</span></a><a class="ending-bar__all" href="#">Explore more case studies</a><a class="ending-bar__next" href="#"><span>Mondai: framework case study</span><img src="/assets/ui/chevron-left.svg" alt=""></a></nav>',
      protoCaption: "The full bar, as on Haven.", protoBleed: true,
      flag: "Focus: the site's white focus ring sits on a nearly white bar here (Neutral/050), so a keyboard user can barely see it.",
      knobs: [color("bar", "Bar", "neutral-050"), color("rest", "Text at rest", "neutral-1000"), color("block", "Block on hover and press", "neutral-900"), color("hover", "Text on hover and press", "neutral-050")],
      css: (r) => r.rule(".ending-bar", ["background", "bar"]) + r.rule(".ending-bar a", ["color", "rest"]) + r.rule(".ending-bar a:is(:hover, :active, .lab-hover, .lab-press)", ["background", "block"], ["color", "hover"]),
    },
    {
      id: "block", name: "Block", cls: ".link-block",
      where: "Built from his Figma Link set, on no page yet. Sample label.",
      rule: "Label/14 C Bold, dark on a Neutral/400 block. Hover lightens the block to Neutral/100, press Neutral/200 (the Figma variants).",
      html: '<a class="link-block" href="#">Learn more</a>',
      proto: '<div class="proto-row"><a class="link-block" href="#">Learn more</a><a class="link-block" href="#">Selected works</a><a class="link-block" href="#">About</a></div>',
      protoCaption: "Sample labels in a row.",
      knobs: [color("text", "Text", "neutral-900"), color("rest", "Block at rest", "neutral-400"), color("hover", "Block on hover", "neutral-100"), color("press", "Block on press", "neutral-200"), num("padY", "Padding above and below", 7, "px", 0, 20, 1), num("padX", "Padding left and right", 6, "px", 0, 24, 1)],
      css: (r) => r.rule(".link-block", ["color", "text"], ["background", "rest"], ["padding", ["padY", "padX"], (a, b) => `${a}px ${b}px`]) + r.rule(".link-block:is(:hover, .lab-hover)", ["background", "hover"]) + r.rule(".link-block:is(:active, .lab-press)", ["background", "press"]),
    },
    {
      id: "block-sm", name: "Block, small", cls: ".link-block-sm",
      where: "His addition 10 Nov for tight rows, on no page yet. Sample label.",
      rule: "Label/12 C Bold, dark on a Neutral/050 block; hover and press as Block.",
      html: '<a class="link-block-sm" href="#">Learn more</a>',
      proto: '<div class="proto-row"><a class="link-block-sm" href="#">Learn more</a><a class="link-block-sm" href="#">Selected works</a><a class="link-block-sm" href="#">About</a></div>',
      protoCaption: "Sample labels in a row.",
      knobs: [color("text", "Text", "neutral-900"), color("rest", "Block at rest", "neutral-050"), color("hover", "Block on hover", "neutral-100"), color("press", "Block on press", "neutral-200"), num("padY", "Padding above and below", 7, "px", 0, 20, 1), num("padX", "Padding left and right", 6, "px", 0, 24, 1)],
      css: (r) => r.rule(".link-block-sm", ["color", "text"], ["background", "rest"], ["padding", ["padY", "padX"], (a, b) => `${a}px ${b}px`]) + r.rule(".link-block-sm:is(:hover, .lab-hover)", ["background", "hover"]) + r.rule(".link-block-sm:is(:active, .lab-press)", ["background", "press"]),
    },
    {
      id: "nav-sm", name: "Nav, small", cls: ".link-nav-sm",
      where: "His addition 10 Nov for tight rows, on no page yet. Sample label.",
      rule: "Label/12 C on Neutral/050 with 7 px above and below as the hit area. It already rests on Neutral/050, so hover only adds the outline (0.31 px at 12 px).",
      html: '<a class="link-nav-sm" href="#">Learn more</a>',
      proto: '<div class="proto-row"><a class="link-nav-sm" href="#">Learn more</a><a class="link-nav-sm" href="#">Selected works</a><a class="link-nav-sm" href="#">About</a></div>',
      protoCaption: "Sample labels in a row.",
      knobs: [color("rest", "Text at rest", "neutral-050"), color("hover", "Text on hover and press", "neutral-050"), num("stroke", "Hover outline", 0.31, "px", 0, 1.5, 0.01)],
      css: (r) => r.rule(".link-nav-sm", ["color", "rest"]) + r.rule(".link-nav-sm:is(:hover, :active, .lab-hover, .lab-press)", ["color", "hover"], ["-webkit-text-stroke", "stroke", (v) => `${v}px currentColor`]),
    },
    {
      id: "all", name: "Every link", global: true,
      rule: "Focus is one site wide ring (base.css). Hover swaps instantly, in and out: a 200 ms fade showed grey on grey frames that read as a flicker (9 Nov).",
      knobs: [color("ring", "Focus ring", "neutral-000"), num("ringW", "Focus ring width", 2, "px", 1, 4, 0.5), num("ringO", "Focus ring gap", 4, "px", 0, 10, 1), num("swap", "Hover change time", 0, "ms", 0, 400, 10),
        { k: "tap", label: "Touch: after a tap", type: "choice", def: "sticks", choices: [["sticks", "Hover sticks (site today)"], ["none", "No hover (today's rule)"]] }],
      css: (r) => r.rule(":is(.lab-focus, :focus-visible)", ["outline", ["ringW", "ring"], (w, c) => `${w}px solid ${css(c)}`], ["outline-offset", "ringO", (v) => v + "px"]) +
        r.rule(":is(.link-block, .link-block-sm, .link-nav, .link-nav-sm, .link-footer, .footer__email, .footer__out, .footer__back, .ending-bar a)", ["transition", "swap", (v) => `color ${v}ms, background-color ${v}ms, box-shadow ${v}ms`]),
    },
  ];
  const STATES = [["rest", "Rest"], ["hover", "Hover"], ["press", "Press"], ["focus", "Focus"]];

  // Saved state.
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const saved = load();
  const narrow = matchMedia("(max-width: 899.98px)").matches;
  const S = {
    values: saved.values || {}, seededIcon3: saved.seededIcon3, notes: saved.notes || "", open: saved.open || {},
    // Opens on mouse wherever there is a mouse, whatever the window width; touch is only ever his choice
    // for that visit (an earlier version opened on touch in narrow windows and switched hover off).
    mode: matchMedia("(hover: hover)").matches ? "mouse" : "touch",
    view: saved.view || "tuned", zoom: saved.zoom || "1", rightW: saved.rightW || 340,
    left: narrow ? false : saved.left !== false, right: narrow ? false : saved.right !== false,
  };
  // His 23 Nov direction, shown as a proposal until he says yes: an icon rests darker than its text and
  // jumps clearly on hover: Neutral/300 at rest, Neutral/000 on hover. LinkedIn and Resume only; Back to top stays as the site has it.
  // Seeded once at one shade; Reset puts the live site back.
  if (!saved.seededIcon3) {
    S.values.out = S.values.out || {}; delete S.values.out.iconStep; S.values.out.arrowRest = "neutral-300"; S.values.out.arrowHover = "neutral-000";
    S.seededIcon3 = true; if (S.values.back) delete S.values.back.iconStep; if (S.values.back && !Object.keys(S.values.back).length) delete S.values.back;
  }
  let saveT;
  const flush = () => { clearTimeout(saveT); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
  const save = () => { clearTimeout(saveT); saveT = setTimeout(flush, 150); };
  // Leaving the page writes at once, so a change made just before closing is never lost.
  addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });

  const valOf = (c, k) => { const v = S.values[c.id]?.[k]; return v === undefined ? c.knobs.find((x) => x.k === k).def : v; };
  const changed = (c, k) => S.values[c.id]?.[k] !== undefined;

  // Force states: copy every :hover, :active and :focus-visible rule in the site's sheets as a class.
  const forced = document.createElement("style");
  forced.id = "lab-forced";
  const lines = [];
  for (const sheet of document.styleSheets) {
    if (!sheet.ownerNode?.hasAttribute?.("data-site")) continue;
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) {
      if (!(rule instanceof CSSStyleRule) || !/:(hover|active|focus-visible)/.test(rule.selectorText)) continue;
      const sel = rule.selectorText.replace(/:hover/g, ".lab-hover").replace(/:active/g, ".lab-press").replace(/:focus-visible/g, ".lab-focus");
      lines.push(`${sel} { ${rule.style.cssText} }`);
    }
  }
  forced.textContent = lines.join("\n");
  document.head.appendChild(forced);
  const tuned = document.createElement("style");
  tuned.id = "lab-tuned";
  document.head.appendChild(tuned);

  // Writes the override sheet: a declaration only when one of its values differs from the site.
  const writeCSS = () => {
    if (S.view === "site") { tuned.textContent = ""; return; }
    // Once any value of a component changes, all its states are written (at #stage strength), so a new
    // rest colour never overrides the site's hover. Untouched components keep the site's CSS alone.
    let out = "";
    for (const c of COMPS) {
      if (!S.values[c.id]) continue;
      const r = {
        rule: (sel, ...decls) => {
          const body = decls.map(([prop, keys, fmt]) => {
            const vals = [].concat(keys).map((k) => valOf(c, k));
            return `${prop}: ${fmt ? fmt(...vals) : css(vals[0])};`;
          }).join(" ");
          return `#stage ${sel} { ${body} }\n`;
        },
      };
      out += c.css(r);
    }
    tuned.textContent = touchMode() ? out.replace(/:hover/g, ".lab-sticky") : out;
  };

  const show = (k, v) => (k.type === "choice" ? k.choices.find((x) => x[0] === v)[1] : k.type === "color" ? `${nice(v)} ${hexOf(v)}` : `${v} ${k.unit}`);

  // Touch: the site's :hover rules are switched off (rewritten to a class) so only press reacts, as on a
  // phone. A tap then leaves the hover on that link until the next tap elsewhere, which is what iPhone
  // Safari does with the site today; "No hover" leaves it off.
  const hoverRules = [];
  for (const sheet of document.styleSheets) {
    if (!sheet.ownerNode?.matches?.("[data-site], link[href*='lab.css']")) continue;
    let rules; try { rules = sheet.cssRules; } catch { continue; }
    for (const rule of rules) if (rule instanceof CSSStyleRule && rule.selectorText.includes(":hover")) hoverRules.push([rule, rule.selectorText]);
  }
  const applyPointer = () => {
    for (const [rule, sel] of hoverRules) rule.selectorText = touchMode() ? sel.replace(/:hover/g, ".lab-sticky") : sel;
    clearSticky(); writeCSS();
  };
  let sticky = null;
  const clearSticky = () => { sticky?.classList.remove("lab-sticky"); sticky = null; };

  // Stage.
  const stage = document.getElementById("stage");
  const touchMode = () => S.mode === "touch";
  const cellHTML = (c, state, label, bg) => {
    let name = label, cls = "";
    if (state === "hover" && touchMode()) {
      if (c.touchHover === false) name = 'Hover <em>none here</em>';
      else { name = 'Hover <em>stuck after a tap</em>'; cls = "lab-hover"; }
    } else if (state === "hover") cls = "lab-hover";
    if (state === "press") cls = "lab-press";
    if (state === "focus") cls = "lab-focus";
    if (state === "press" && touchMode() && c.touchHover !== false) cls = "lab-press lab-hover";
    return `<div class="cell${state === "live" ? " is-live" : ""}" data-state="${state}"><div class="cell__name"><span>${name}</span>${state === "live" ? "<span>real</span>" : ""}</div>
      <div class="cell__body ${bg}"><div class="cell__zoom" data-cls="${cls}">${c.html}</div></div></div>`;
  };
  const strip = (c, bg) => `<div class="strip" style="--cell-min:${c.cellMin || 150}px">${STATES.map(([s, l]) => cellHTML(c, s, l, bg)).join("")}</div>`;
  const scene = (c, bg, label) => `<div class="scene-wrap"><p class="strip-label">${label}<span>${touchMode() ? "touch: tap and hold" : "mouse: hover and click"}</span></p>
    <div class="scene ${bg}${c.protoBleed ? " scene--bleed" : ""}" data-c="${c.id}"><div class="cell__zoom">${c.proto}</div></div>
    <p class="scene__caption">${c.protoCaption}</p></div>`;
  const render = () => {
    stage.innerHTML = (touchMode() && matchMedia("(hover: hover)").matches ? '<p class="comp__flag lab-mode-flag">Touch mode: hovers are switched off here, as on a phone. Pick Mouse at the top to see them.</p>' : "") + COMPS.filter((c) => !c.global).map((c) => `
      <section class="comp" id="comp-${c.id}">
        <div class="comp__head"><h2>${c.name}</h2><span class="mono">${c.cls}</span></div>
        <p class="comp__where">${c.where}</p>
        <p class="comp__rule">${c.rule}</p>
        ${c.flag ? `<p class="comp__flag">${c.flag}</p>` : ""}
        ${touchMode() && c.touchHover !== false ? `<p class="comp__flag">${TOUCH_FLAG}</p>` : ""}
        ${scene(c, "lab-dark", c.light ? "Try it on the dark page" : "Try it")}
        ${c.light ? scene(c, "lab-light", "Try it on Haven's light bridge, Neutral/400") : ""}
        <details class="held" ${S.held ? "open" : ""}><summary>Each state, held</summary>
          ${c.light ? '<p class="strip-label">On the dark page</p>' : ""}
          ${strip(c, "lab-dark")}
          ${c.light ? '<p class="strip-label">On Haven\'s light bridge, Neutral/400</p>' + strip(c, "lab-light") : ""}
        </details>
      </section>`).join("");
    // Put the forced state class on the link itself (for the end bar, the link inside its bar).
    for (const z of stage.querySelectorAll(".cell__zoom")) {
      const cls = z.dataset.cls; if (!cls) continue;
      const link = z.querySelector(".ending-bar a") || z.firstElementChild;
      link.classList.add(...cls.split(" "));
    }
    for (const a of stage.querySelectorAll(".cell a")) a.tabIndex = -1;
    for (const d of stage.querySelectorAll(".held")) d.addEventListener("toggle", () => { S.held = d.open; save(); });
    observe();
  };
  stage.addEventListener("click", (e) => {
    const a = e.target.closest("a"); if (a) e.preventDefault();
    if (!touchMode()) return;
    const link = a && a.closest(".scene") && a.hasAttribute("href") && !a.classList.contains("proto-card") ? a : null;
    clearSticky();
    if (link && valOf(COMPS.find((c) => c.id === "all"), "tap") === "sticks") { sticky = link; link.classList.add("lab-sticky"); }
  });
  // The work card: pressing anywhere on it fills Learn more (home-motion.js does the same on the site).
  stage.addEventListener("pointerdown", (e) => { const card = e.target.closest(".proto-card"); if (card) card.querySelector(".button-sm").classList.add("lab-press"); });
  const unpress = () => stage.querySelectorAll(".proto-card .lab-press").forEach((b) => b.classList.remove("lab-press"));
  for (const t of ["pointerup", "pointercancel", "pointerleave"]) stage.addEventListener(t, unpress, true);
  document.addEventListener("touchstart", () => {}, { passive: true }); // lets iPhone Safari run :active

  // Component list.
  const list = document.getElementById("list");
  const renderList = () => {
    list.innerHTML = COMPS.map((c) => {
      const n = c.knobs.filter((k) => changed(c, k.k)).length;
      return `<li><a href="#${c.global ? "knobs-all" : "comp-" + c.id}" data-id="${c.id}">${c.name}${n ? '<span class="dot" title="changed"></span>' : ""}<small>${c.global ? "focus ring, timing" : c.cls}</small></a></li>`;
    }).join("");
  };
  list.addEventListener("click", (e) => {
    const a = e.target.closest("a"); if (!a) return;
    const g = document.getElementById("knobs-" + a.dataset.id);
    if (g) { g.open = true; S.open[a.dataset.id] = true; save(); if (S.right) g.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
    if (a.dataset.id === "all") e.preventDefault();
    if (narrow) setPanel("left", false);
  });
  let io;
  const observe = () => {
    io?.disconnect();
    io = new IntersectionObserver((es) => {
      for (const en of es) if (en.isIntersecting) for (const a of list.querySelectorAll("a")) a.classList.toggle("is-current", a.dataset.id === en.target.id.slice(5));
    }, { rootMargin: "-30% 0px -60% 0px" });
    stage.querySelectorAll(".comp").forEach((s) => io.observe(s));
  };

  // Tuning panel.
  const knobsEl = document.getElementById("knobs");
  const opts = TOKENS.map((t) => `<option value="${t}">${nice(t)}</option>`).join("") + '<option value="custom">Hex</option>';
  const renderKnobs = () => {
    knobsEl.innerHTML = COMPS.map((c) => `
      <details class="knob-group" id="knobs-${c.id}" data-id="${c.id}" ${S.open[c.id] ? "open" : ""}>
        <summary>${c.name}<span class="count"></span></summary>
        <div class="knob-group__body">
          ${c.global ? `<p class="knob-group__note">${c.rule}</p>` : ""}
          ${c.note ? `<p class="knob-group__note">${c.note}</p>` : ""}
          ${c.knobs.map((k) => `
            <div class="knob" data-c="${c.id}" data-k="${k.k}">
              <span class="knob__label${k.type === "num" ? " is-scrub" : ""}">${k.label}</span>
              <span class="knob__ctl">${k.type === "choice" ? `<select class="wide" aria-label="${k.label}">${k.choices.map(([v, t]) => `<option value="${v}">${t}</option>`).join("")}</select>` : k.type === "color"
                ? `<span class="swatch"></span><select aria-label="${k.label}">${opts}</select><input type="text" aria-label="${k.label} hex" spellcheck="false">`
                : `<input type="number" aria-label="${k.label}" min="${k.min}" max="${k.max}" step="${k.step}"><span class="unit">${k.unit}</span>`}</span>
              <span class="knob__was">Site: ${show(k, k.def)}<button class="lab-link" data-reset>Reset</button></span>
            </div>`).join("")}
          <button class="lab-link" data-reset-group>Reset ${c.name.toLowerCase()}</button>
        </div>
      </details>`).join("");
    syncKnobs();
  };
  const syncKnobs = () => {
    for (const el of knobsEl.querySelectorAll(".knob")) {
      const c = COMPS.find((x) => x.id === el.dataset.c), k = c.knobs.find((x) => x.k === el.dataset.k), v = valOf(c, k.k);
      el.classList.toggle("is-changed", changed(c, k.k));
      if (k.type === "choice") { el.querySelector("select").value = v; continue; }
      if (k.type === "color") {
        const sel = el.querySelector("select"), txt = el.querySelector("input");
        sel.value = TOKENS.includes(v) ? v : "custom";
        if (document.activeElement !== txt) txt.value = hexOf(v);
        el.querySelector(".swatch").style.background = css(v);
      } else {
        const inp = el.querySelector("input");
        if (document.activeElement !== inp) inp.value = v;
      }
    }
    for (const g of knobsEl.querySelectorAll(".knob-group")) {
      const c = COMPS.find((x) => x.id === g.dataset.id), n = c.knobs.filter((k) => changed(c, k.k)).length;
      g.querySelector(".count").textContent = n ? `${n} changed` : "";
    }
    document.getElementById("reset-all").disabled = !Object.keys(S.values).length;
    renderList();
  };
  const setVal = (cid, k, v) => {
    const c = COMPS.find((x) => x.id === cid), def = c.knobs.find((x) => x.k === k).def;
    S.values[cid] = S.values[cid] || {};
    if (v === def || v === "" || v === null || Number.isNaN(v)) delete S.values[cid][k]; else S.values[cid][k] = v;
    if (!Object.keys(S.values[cid]).length) delete S.values[cid];
    if (S.view === "site" && S.values[cid]) setView("tuned");
    writeCSS(); syncKnobs(); save();
  };
  const fromHex = (h) => {
    h = h.trim().toLowerCase(); if (!/^#?[0-9a-f]{6}$/.test(h)) return null;
    h = h.startsWith("#") ? h : "#" + h;
    return TOKENS.find((t) => hexOf(t).toLowerCase() === h) || h;
  };
  knobsEl.addEventListener("change", (e) => {
    const el = e.target.closest(".knob"); if (!el) return;
    if (e.target.matches("select.wide")) { setVal(el.dataset.c, el.dataset.k, e.target.value); clearSticky(); return; }
    if (e.target.matches("select")) {
      if (e.target.value === "custom") { el.querySelector("input").focus(); return; }
      setVal(el.dataset.c, el.dataset.k, e.target.value);
    } else if (e.target.matches('input[type="text"]')) {
      const v = fromHex(e.target.value); if (v) setVal(el.dataset.c, el.dataset.k, v); else syncKnobs();
    }
  });
  knobsEl.addEventListener("input", (e) => {
    if (!e.target.matches('input[type="number"]')) return;
    const el = e.target.closest(".knob"); const n = parseFloat(e.target.value);
    if (!Number.isNaN(n)) setVal(el.dataset.c, el.dataset.k, n);
  });
  knobsEl.addEventListener("click", (e) => {
    if (e.target.matches("[data-reset]")) { const el = e.target.closest(".knob"); setVal(el.dataset.c, el.dataset.k, null); syncKnobs(); }
    if (e.target.matches("[data-reset-group]")) { delete S.values[e.target.closest(".knob-group").dataset.id]; writeCSS(); syncKnobs(); save(); }
  });
  knobsEl.addEventListener("toggle", (e) => { if (e.target.matches(".knob-group")) { S.open[e.target.dataset.id] = e.target.open; save(); } }, true);
  // Drag a number's label to scrub it, as in Figma. Shift moves ten times faster.
  knobsEl.addEventListener("pointerdown", (e) => {
    const lab = e.target.closest(".knob__label.is-scrub"); if (!lab) return;
    const el = lab.closest(".knob"), c = COMPS.find((x) => x.id === el.dataset.c), k = c.knobs.find((x) => x.k === el.dataset.k);
    const x0 = e.clientX, v0 = valOf(c, k.k), dec = (String(k.step).split(".")[1] || "").length;
    lab.setPointerCapture(e.pointerId);
    const move = (m) => {
      const v = Math.min(k.max, Math.max(k.min, v0 + Math.round((m.clientX - x0) / 4) * k.step * (m.shiftKey ? 10 : 1)));
      setVal(c.id, k.k, Number(v.toFixed(dec)));
    };
    const up = () => { lab.removeEventListener("pointermove", move); lab.removeEventListener("pointerup", up); };
    lab.addEventListener("pointermove", move); lab.addEventListener("pointerup", up);
  });
  document.getElementById("reset-all").addEventListener("click", () => { S.values = {}; writeCSS(); syncKnobs(); save(); toast("Back to the live site's values"); });
  const notes = document.getElementById("notes");
  notes.value = S.notes;
  notes.addEventListener("input", () => { S.notes = notes.value; save(); });

  // Top bar.
  const seg = (id, key, after) => {
    const el = document.getElementById(id);
    const sync = () => el.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === S[key])));
    el.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; S[key] = b.dataset.v; sync(); after(); save(); });
    sync(); return sync;
  };
  seg("mode", "mode", () => { render(); applyPointer(); });
  const syncView = seg("view", "view", writeCSS);
  const setView = (v) => { S.view = v; syncView(); };
  const applyZoom = () => document.body.style.setProperty("--z", S.zoom);
  seg("zoom", "zoom", applyZoom);
  applyZoom();

  const setPanel = (side, open) => {
    S[side] = open;
    document.body.classList.toggle(side + "-closed", !open);
    document.getElementById("tgl-" + side).setAttribute("aria-expanded", String(open));
    save();
  };
  document.getElementById("tgl-left").addEventListener("click", () => { setPanel("left", !S.left); if (narrow && S.left) setPanel("right", false); });
  document.getElementById("tgl-right").addEventListener("click", () => { setPanel("right", !S.right); if (narrow && S.right) setPanel("left", false); });
  setPanel("left", S.left); setPanel("right", S.right);
  document.getElementById("lab-left").addEventListener("click", (e) => { if (narrow && e.target === e.currentTarget) setPanel("left", false); });

  // Drag the tuning panel's edge to resize it.
  const setW = (w) => { S.rightW = Math.round(Math.min(Math.max(w, 280), Math.min(640, innerWidth * 0.6))); document.body.style.setProperty("--right-w", S.rightW + "px"); };
  setW(S.rightW);
  const drag = document.getElementById("drag");
  drag.addEventListener("pointerdown", (e) => {
    drag.setPointerCapture(e.pointerId); drag.classList.add("is-dragging");
    const move = (m) => setW(innerWidth - m.clientX);
    const up = () => { drag.classList.remove("is-dragging"); drag.removeEventListener("pointermove", move); drag.removeEventListener("pointerup", up); save(); };
    drag.addEventListener("pointermove", move); drag.addEventListener("pointerup", up);
  });

  // Copy values: every value that differs from the site, with the site's value beside it, and his notes.
  const toastEl = document.getElementById("toast");
  const toast = (t) => { toastEl.textContent = t; toastEl.classList.add("is-on"); clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.classList.remove("is-on"), 1800); };
  const valuesText = () => {
    const out = ["Link states lab values"];
    for (const c of COMPS) {
      const ks = c.knobs.filter((k) => changed(c, k.k)); if (!ks.length) continue;
      out.push("", `${c.name} (${c.global ? "every link" : c.cls})`);
      for (const k of ks) out.push(`  ${k.label}: ${show(k, valOf(c, k.k))} (site: ${show(k, k.def)})`);
    }
    if (out.length === 1) out.push("", "No changes from the live site.");
    if (S.notes.trim()) out.push("", "Notes:", S.notes.trim());
    return out.join("\n");
  };
  document.getElementById("copy").addEventListener("click", async () => {
    const t = valuesText();
    try { await navigator.clipboard.writeText(t); toast("Copied. Paste it to Claude."); }
    catch {
      const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); toast("Copied. Paste it to Claude."); } catch { toast("Copy blocked: select the text in Notes"); }
      ta.remove();
    }
  });

  render(); renderKnobs(); applyPointer();
})();
