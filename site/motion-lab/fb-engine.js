// Falling behind animation engine. One engine for the editor and the render page, so what Chadwick
// tunes in the editor is exactly what gets rendered. Every frame is a pure function of t and the settings.
import { spring, cubicBezier, clamp, lerp, rng, UI, TYPE } from "../lib/motion.js";

export const DEFAULTS = {
  // Frame
  frameW: 720, frameH: 680, bg: "#0b0b0c",
  // Layout
  colW: 300, weekGap: 40, rowH: 56, rowGap: 8, labelGap: 24, radius: 12, padX: 16, shiftY: 0,
  // Labels
  labelThis: "This week", labelNext: "Next week", labelFont: "IBM Plex Mono", labelSize: 20, labelWeight: 700,
  labelCaps: true, labelTracking: 0.04, labelColor: "#09c916",
  // Rollover tag
  chipText: "ROLLOVER", chipSize: 9, chipColor: "#e31ecf", chipFill: "#1d0c1b", chipStays: true, chipTint: 0.45, tagAt: 1.7,
  // Action items
  cardFill: "#141416", cardBorder: "#26262a", ring: "#4a4a50", checkFill: "#78b765", tick: "#0b0b0c",
  barTitle: "#2a2a2e", barMeta: "#202023", doneDim: 0.4, ringSize: 20, barH: 9,
  // Arrival in next week
  arriveStyle: "flicker-rgb", arriveColor: "#3da342", ringActive: "#09c916", outlineWidth: 1.5, ringWidth: 3,
  arriveDur: 0.7, flickers: 6, glitchAmount: 8, glitchSeed: 3, splitA: "#e31ecf", splitB: "#3ad7e8",
  // Move
  liftAt: 2.5, moveAt: 2.7, moveDur: 1.05, lift: 6, grow: 1.04, moveEase: "smooth", makeRoom: true, closeGap: true,
  checkAt: 0.9,
  // Background field
  fieldCount: 160, sizeMin: 1, sizeMax: 3, fieldColor: "#ffffff", opMin: 0.1, opMax: 0.7, drift: 14, depth: 0.6,
  wander: 10, wanderSpeed: 1, lives: 2, twinkle: 0.3, fieldSeed: 11,
  // Timing
  loop: 8, fadeIn: 0.5, fadeOutAt: 6.9,
  // Per item nudges, from dragging in the editor
  offsets: {}
};

export const EASES = {
  smooth: [0.65, 0, 0.35, 1], gentle: [0.37, 0, 0.63, 1], snappy: [0.2, 0.8, 0.2, 1], expo: [0.16, 1, 0.3, 1], linear: [0, 0, 1, 1]
};
export const ARRIVE_STYLES = [
  ["none", "Plain fade"], ["flicker", "Flicker"], ["rgb", "Colour split"], ["slices", "Slices"],
  ["flicker-rgb", "Flicker and colour split"], ["flicker-slices", "Flicker and slices"]
];
export const FONTS = [["IBM Plex Mono", "IBM Plex Mono"], ["Satoshi", "Satoshi"]];

const FADE = { k: 400, d: 40 };
const TICK = (c) => `<svg viewBox="0 0 10 10" style="width:50%;height:50%"><path d="M2 5.2 4.2 7.4 8 2.8" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export function mix(a, b, k) {
  const A = hex(a), B = hex(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * clamp(k)).toString(16).padStart(2, "0")).join("");
}
// Deterministic hash in 0..1 for flicker and slice patterns.
const hash = (a, b = 0) => { const r = rng(((a * 73856093) ^ (b * 19349663)) >>> 0); r(); return r(); };

export function timeline(S) {
  const land = S.moveAt + S.moveDur;
  return [
    ["Fade in", 0], ["Check", S.checkAt], ["Tag", S.tagAt], ["Lift", S.liftAt], ["Move", S.moveAt],
    ["Arrive", land], ["Close gap", land + 0.25], ["Hold", land + 0.9], ["Fade out", S.fadeOutAt]
  ].filter(([, t]) => t < S.loop).sort((a, b) => a[1] - b[1]);
}

export function createScene(root, initial) {
  let S = { ...DEFAULTS, ...initial };
  root.innerHTML = "";
  root.style.position = "relative"; root.style.overflow = "hidden";
  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%";
  const stage = document.createElement("div");
  stage.style.cssText = "position:absolute;left:0;top:0";
  root.append(canvas, stage);
  const ctx = canvas.getContext("2d");
  let pxScale = 1, els = null, field = [], current = 0;

  function el(cls, key) { const d = document.createElement("div"); d.className = cls; if (key) d.dataset.key = key; stage.appendChild(d); return d; }

  function build() {
    stage.innerHTML = "";
    stage.style.width = S.frameW + "px"; stage.style.height = S.frameH + "px";
    root.style.background = S.bg;
    const label = (key, text) => {
      const d = el("fb-label", key);
      d.textContent = S.labelCaps ? text.toUpperCase() : text;
      Object.assign(d.style, { position: "absolute", left: 0, top: 0, whiteSpace: "nowrap", color: S.labelColor,
        font: `${S.labelWeight} ${S.labelSize}px/1 "${S.labelFont === "Satoshi" ? "Satoshi FB" : "Plex Mono FB"}", ui-monospace, monospace`,
        letterSpacing: S.labelTracking + "em" });
      return d;
    };
    const card = (key, w) => {
      const c = el("fb-card", key);
      Object.assign(c.style, { position: "absolute", left: 0, top: 0, width: S.colW + "px", height: S.rowH + "px", boxSizing: "border-box",
        display: "flex", alignItems: "center", gap: "12px", padding: `0 ${S.padX}px`, border: `1px solid ${S.cardBorder}`,
        borderRadius: S.radius + "px", background: S.cardFill, transformOrigin: "50% 50%" });
      c.innerHTML = `<div class="fb-ring" style="flex:none;width:${S.ringSize}px;height:${S.ringSize}px;box-sizing:border-box;border-radius:50%;border:1.5px solid ${S.ring};display:flex;align-items:center;justify-content:center">${TICK(S.tick)}</div>`
        + `<div class="fb-bar" style="flex:none;height:${S.barH}px;border-radius:${S.barH / 2}px;width:${w}%;background:${S.barTitle}"></div>`
        + `<div class="fb-meta" style="margin-left:auto;flex:none;height:${Math.max(2, S.barH - 2)}px;width:34px;border-radius:4px;background:${S.barMeta}"></div>`;
      return c;
    };
    const labThis = label("label:this", S.labelThis), labNext = label("label:next", S.labelNext);
    const next = [40, 60, 48].map((w, k) => card("next:" + k, w));
    const rows = [52, 44, 58].map((w, k) => card("this:" + k, w));
    const carry = rows[0];
    carry.style.zIndex = 5;
    const chip = document.createElement("div");
    chip.textContent = S.chipText;
    Object.assign(chip.style, { position: "absolute", right: "14px", top: "50%", font: `700 ${S.chipSize}px/1 "Plex Mono FB", ui-monospace, monospace`,
      letterSpacing: "0.12em", padding: `${S.chipSize * 0.45}px ${S.chipSize * 0.7}px`, borderRadius: "4px", border: `1px solid ${S.chipColor}`,
      color: S.chipColor, background: S.chipFill, transformOrigin: "100% 50%", whiteSpace: "nowrap" });
    carry.appendChild(chip);
    // The arrival outline and its glitch copies sit on top of the card.
    const outline = (color) => {
      const o = document.createElement("div");
      Object.assign(o.style, { position: "absolute", inset: "-1px", borderRadius: S.radius + "px", border: `${S.outlineWidth}px solid ${color}`,
        pointerEvents: "none", opacity: 0 });
      carry.appendChild(o); return o;
    };
    const main = outline(S.arriveColor);
    const split = [outline(S.splitA), outline(S.splitB)];
    const slices = Array.from({ length: 6 }, () => outline(S.arriveColor));
    els = { labThis, labNext, next, rows, carry, chip, main, split, slices };
    buildField();
  }

  function buildField() {
    const r = rng(S.fieldSeed);
    field = [];
    for (let i = 0; i < S.fieldCount; i += 1) {
      const z = r();
      field.push({ x: r() * (S.frameW + 80) - 40, y: r() * S.frameH, z,
        size: Math.round(lerp(S.sizeMin, S.sizeMax, z)), a: lerp(S.opMin, S.opMax, r() * 0.5 + z * 0.5),
        ph: r(), p1: r() * 6.283, p2: r() * 6.283, p3: r() * 6.283, tw: 1 + Math.floor(r() * 3), p4: r() * 6.283,
        n: Math.max(1, Math.round(S.lives * (0.6 + r() * 0.8))) });
    }
  }

  function drawField(t) {
    const W = canvas.width, H = canvas.height, s = pxScale, L = S.loop;
    ctx.fillStyle = S.bg; ctx.fillRect(0, 0, W, H);
    const [cr, cg, cb] = hex(S.fieldColor);
    const m = Math.max(1, Math.round(S.wanderSpeed));
    for (const p of field) {
      // Each pixel lives a whole number of times per loop, drifting right while it lives and fading at both ends,
      // so the loop is seamless at any drift speed.
      const life = L / p.n, u = ((t / life + p.ph) % 1 + 1) % 1;
      const speed = S.drift * lerp(1 - S.depth, 1, p.z);
      const x = p.x + speed * life * (u - 0.5) + S.wander * 0.4 * Math.sin((6.283 * m * t) / L + p.p3);
      const y = p.y + S.wander * Math.sin((6.283 * m * t) / L + p.p1) + S.wander * 0.35 * Math.sin((6.283 * (2 * m + 1) * t) / L + p.p2);
      const env = Math.min(1, u / 0.18, (1 - u) / 0.18);
      const tw = 1 - S.twinkle * 0.5 * (1 + Math.sin((6.283 * p.tw * t) / L + p.p4));
      const a = p.a * env * tw;
      if (a <= 0.003) continue;
      const sz = Math.max(1, Math.round(p.size * s));
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${a.toFixed(3)})`;
      ctx.fillRect(Math.round(x * s), Math.round(y * s), sz, sz);
    }
  }

  const off = (k) => S.offsets[k] || { x: 0, y: 0 };

  function ring(c, { done = 0, pop = 1, green = 0, on = 1 }) {
    const r = c.querySelector(".fb-ring");
    const g = green * on;
    r.style.background = done ? S.checkFill : "transparent";
    r.style.borderColor = done ? S.checkFill : mix(S.ring, S.ringActive, g);
    r.style.borderWidth = (done ? 1.5 : lerp(1.5, S.ringWidth, g)) + "px";
    r.firstElementChild.style.opacity = done ? 1 : 0;
    r.style.transform = done ? `scale(${lerp(0.6, 1, pop)})` : "none";
  }
  function place(c, key, x, y, op, sc = 1, shadow = 0) {
    const o = off(key);
    c.style.transform = `translate(${x + o.x}px, ${y + o.y}px) scale(${sc})`;
    c.style.opacity = op;
    c.style.boxShadow = shadow > 0.001 ? `0 ${16 * shadow}px ${36 * shadow}px rgba(0,0,0,${0.6 * shadow})` : "none";
  }

  function seek(t) {
    const L = S.loop;
    t = ((t % L) + L) % L; current = t;
    drawField(t);
    const { labThis, labNext, next, rows, carry, chip, main, split, slices } = els;
    const block = 2 * S.colW + S.weekGap, X1 = (S.frameW - block) / 2, X2 = X1 + S.colW + S.weekGap;
    const STEP = S.rowH + S.rowGap, content = S.labelSize + S.labelGap + 3 * STEP - S.rowGap;
    const TOP = (S.frameH - content) / 2 + S.shiftY, Y = (k) => TOP + S.labelSize + S.labelGap + k * STEP;
    const vis = (S.fadeIn > 0 ? spring(t * (0.47 / S.fadeIn), FADE.k, FADE.d) : 1) * (1 - spring(t - S.fadeOutAt, FADE.k, FADE.d));
    place(labThis, "label:this", X1, TOP, vis); place(labNext, "label:next", X2, TOP, vis);
    const land = S.moveAt + S.moveDur;
    const gap = (i) => S.closeGap ? STEP * spring(t - land - 0.25 - i * 0.04, TYPE.k, TYPE.d) : 0;

    rows.forEach((c, p) => {
      if (p === 0) return;
      const at = p === 1 ? -10 : S.checkAt;
      ring(c, { done: t >= at ? 1 : 0, pop: spring(t - at, UI.k, UI.d) });
      const dim = lerp(1, S.doneDim, spring(t - at - 0.25, TYPE.k, TYPE.d));
      c.style.background = mix(S.bg, S.cardFill, lerp(1, 0.55, (1 - dim) / Math.max(0.01, 1 - S.doneDim)));
      c.style.borderColor = mix(S.bg, S.cardBorder, dim);
      [...c.children].forEach((e) => { e.style.opacity = dim; });
      place(c, "this:" + p, X1, Y(p) - gap(p - 1), vis);
    });

    // The tagged item.
    const tag = spring(t - S.tagAt, UI.k, UI.d);
    const keep = S.chipStays ? 1 : 1 - spring(t - land, TYPE.k, TYPE.d);
    chip.style.opacity = tag * keep;
    chip.style.transform = `translateY(-50%) scale(${lerp(0.85, 1, tag)})`;
    carry.querySelector(".fb-meta").style.opacity = 1 - tag * keep;
    const la = spring(t - S.liftAt, UI.k, UI.d);
    const raw = clamp((t - S.moveAt) / Math.max(0.05, S.moveDur));
    const ease = cubicBezier(...(EASES[S.moveEase] || EASES.smooth));
    const settle = cubicBezier(0.2, 0.8, 0.2, 1)(clamp((raw - 0.6) / 0.4));
    const o0 = off("carry:start"), o1 = off("carry:end"), e = ease(raw);
    const x = lerp(X1 + o0.x, X2 + o1.x, e), y = lerp(Y(0) + o0.y, Y(0) + o1.y, e) - S.lift * la * (1 - settle);
    const sc = lerp(lerp(1, S.grow, la), 1, settle);
    carry.style.borderColor = mix(S.cardBorder, S.chipColor, S.chipTint * tag * keep);
    carry.style.transform = `translate(${x}px, ${y}px) scale(${sc})`;
    carry.style.opacity = vis;
    carry.style.boxShadow = la * (1 - settle) > 0.001 ? `0 ${16 * la * (1 - settle)}px ${36 * la * (1 - settle)}px rgba(0,0,0,${0.6 * la * (1 - settle)})` : "none";

    // Arrival: the green comes in with the chosen glitch.
    const a = S.arriveDur > 0 ? clamp((t - land) / S.arriveDur) : (t >= land ? 1 : 0);
    const started = t >= land, style = S.arriveStyle;
    let on = started ? 1 : 0;
    if (started && a < 1 && style.startsWith("flicker")) {
      const seg = Math.floor(a * S.flickers * 2);
      on = hash(seg + 1, S.glitchSeed) < 0.25 + 0.75 * a ? 1 : 0;
    }
    const fade = style === "none" ? a : 1;
    main.style.opacity = started ? on * fade : 0;
    ring(carry, { green: started ? fade : 0, on });
    const live = started && a < 1 ? 1 - a : 0, frame = Math.floor(t * 30);
    const doSplit = style.endsWith("rgb") || style === "rgb";
    split.forEach((s, i) => {
      const dx = (i ? -1 : 1) * S.glitchAmount * live * (0.4 + hash(frame, i + S.glitchSeed));
      s.style.opacity = doSplit ? live * on : 0;
      s.style.transform = `translateX(${dx}px)`;
    });
    const doSlices = style.endsWith("slices");
    slices.forEach((s, i) => {
      const top = hash(frame * 7 + i, S.glitchSeed) * 85, h = 6 + hash(frame * 3 + i, S.glitchSeed + 1) * 20;
      const dx = (hash(frame + i * 11, S.glitchSeed + 2) - 0.5) * 2 * S.glitchAmount * live;
      s.style.clipPath = `inset(${top}% -20px ${Math.max(0, 100 - top - h)}% -20px)`;
      s.style.transform = `translateX(${dx}px)`;
      s.style.opacity = doSlices ? live : 0;
    });

    // Next week makes room so it stays at three.
    next.forEach((c, k) => {
      ring(c, {});
      const sh = S.makeRoom ? spring(t - S.moveAt - 0.25 - (2 - k) * 0.04, TYPE.k, TYPE.d) : 0;
      const drop = S.makeRoom && k === 2 ? sh : 0;
      place(c, "next:" + k, X2, lerp(Y(k), Y(k + 1), sh) - (S.makeRoom ? 0 : 0), vis * (1 - drop), lerp(1, 0.96, drop));
    });
  }

  function resize(cssScale, dpr = 1) {
    pxScale = cssScale * dpr;
    canvas.width = Math.round(S.frameW * pxScale); canvas.height = Math.round(S.frameH * pxScale);
    root.style.width = S.frameW * cssScale + "px"; root.style.height = S.frameH * cssScale + "px";
    stage.style.transform = `scale(${cssScale})`; stage.style.transformOrigin = "0 0";
    seek(current);
  }

  build();
  return {
    seek, resize,
    get settings() { return S; },
    set(next, rebuild = true) { S = { ...DEFAULTS, ...next }; if (rebuild) build(); seek(current); },
    stage,
    carryKey: (t) => (t < S.moveAt ? "carry:start" : "carry:end"),
    get time() { return current; }
  };
}

export const FONT_CSS = [["Regular", 400], ["Medium", 500], ["SemiBold", 600], ["Bold", 700]].map(([n, w]) => `@font-face { font-family: "Plex Mono FB"; font-weight: ${w}; src: url("assets/IBMPlexMono-${n}.ttf") format("truetype"); }`).join("\n") + `
@font-face { font-family: "Satoshi FB"; font-weight: 500; src: local("Satoshi Medium"), local("Satoshi-Medium"); }
@font-face { font-family: "Satoshi FB"; font-weight: 700; src: local("Satoshi Bold"), local("Satoshi-Bold"); }`;
