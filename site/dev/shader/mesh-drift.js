// Mesh drift background test, with a live editor. Dev only: site/dev never ships.
// The fragment shader is the 21st.dev "Mesh drift" export (shader math unchanged; helpers it never
// calls, OKLab mixing, palette and hash22, are left out). Everything else here feeds its uniforms and
// draws the editor. Settings start at the export and are kept in this browser between visits.
// Built into a preview by scripts/build-shader-preview.mjs; load it on any page with
//   <link rel="stylesheet" href="/dev/shader/mesh-drift.css"> <script src="/dev/shader/mesh-drift.js" defer></script>

(() => {
  const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec3 u_colors[8];
uniform vec4 u_scene; uniform vec4 u_shape; uniform vec4 u_surface; uniform vec4 u_finish;
uniform vec4 u_transform; uniform vec4 u_space; uniform vec4 u_cursor;
#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w
float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y);
}
float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x), mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(17.0, 9.2); a *= 0.5; }
  return v;
}
vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col; float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca); return toRGB * yiq;
}
vec3 shade(vec2 uv, vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.15; float total = 0.15;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_colorCount) break;
    float fi = float(i);
    vec2 c = vec2(sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed), cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
    float w = exp(-dot(p - c, p - c) * 6.0); acc += u_colors[i] * w; total += w;
  }
  return acc / total;
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy; vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;
  if (u_cursorPresence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) { p += cursor * u_cursorPresence * u_cursorStrength * 0.55; }
    else {
      float cursorDistance = length(cursorDelta); vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) { p -= cursorDirection * cursorMask * u_cursorStrength * 0.24; }
      else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2; float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }
  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) { float cr = cos(u_rotate), sr = sin(u_rotate); p = mat2(cr, -sr, sr, cr) * p; }
  p += u_offset;
  if (u_drift > 0.0001) p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  if (u_warp > 0.0) p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur; float pe = e * u_scale; vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else { col = shade(uv, p, u_time); }
  if (abs(u_contrast - 1.0) > 0.0001) col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) { float luma = dot(col, vec3(0.299, 0.587, 0.114)); col = mix(vec3(luma), col, u_saturation); }
  if (abs(u_hue) > 0.0001) col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001) col += u_brightness;
  if (u_vignette > 0.0001) { float vd = length(screenUv - 0.5) * 1.41421356; col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd); }
  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5) col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
  if (u_grain > 0.0001) col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

  // ---------- Settings: the 21st.dev export is the default ----------
  const EXPORT = {
    colors: ["#101010", "#585a5f", "#0d0d0d", "#3a3a3a"],
    speed: 0.73, scale: 1.16, intensity: 0.34, drift: 0, rotate: 0, seed: 1453,
    warp: 0, detail: 2.4, blur: 0, grain: 0.09, vignette: 0,
    contrast: 1.16, brightness: 0, saturation: 1, hue: 0,
    cursorEffect: 2, cursorStrength: 0.65, cursorRadius: 0.46,
    where: "all", below: 1,
  };
  const KEY = "mesh-drift-settings";
  const load = () => { try { return { ...EXPORT, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return { ...EXPORT }; } };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
  let S = load();

  // Sliders, grouped the way you would think about them. [key, label, min, max, step, hint]
  const GROUPS = [
    ["Motion", [
      ["speed", "Speed", 0, 3, 0.01, "How fast the blobs travel. 0 freezes it."],
      ["intensity", "Spread", 0, 2, 0.01, "How far each blob wanders from the middle."],
      ["scale", "Zoom", 0.2, 4, 0.01, "Bigger numbers pull the field back, blobs get smaller."],
      ["drift", "Drift", 0, 1, 0.01, "Slow sway of the whole field."],
      ["rotate", "Rotation", -3.14, 3.14, 0.01, "Turns the whole field."],
      ["seed", "Seed", 0, 2000, 1, "Picks a different starting arrangement."],
    ]],
    ["Texture", [
      ["warp", "Warp", 0, 2, 0.01, "Bends the blobs into organic, smoky shapes."],
      ["detail", "Warp detail", 0.2, 8, 0.01, "How fine the warp is. Only shows when warp is above 0."],
      ["blur", "Blur", 0, 0.2, 0.001, "Softens edges further. Costs some speed."],
      ["grain", "Grain", 0, 0.3, 0.001, "Film grain over everything."],
      ["vignette", "Vignette", 0, 1, 0.01, "Darkens the corners of the screen."],
    ]],
    ["Tone", [
      ["contrast", "Contrast", 0, 3, 0.01, ""],
      ["brightness", "Brightness", -0.5, 0.5, 0.005, ""],
      ["saturation", "Saturation", 0, 2, 0.01, "Has no visible effect while the colors are greys."],
      ["hue", "Hue shift", -3.14, 3.14, 0.01, "Rotates every color around the wheel."],
    ]],
    ["Cursor", [
      ["cursorStrength", "Strength", 0, 2, 0.01, ""],
      ["cursorRadius", "Radius", 0.05, 1.5, 0.01, "How far from the cursor the effect reaches."],
    ]],
  ];
  const EFFECTS = [["0", "Push"], ["1", "Repel"], ["2", "Swirl"], ["3", "Ripple"], ["4", "Glow"]];
  const WHERE = [["all", "Whole page"], ["hero", "Hero only"], ["off", "Off"]];

  // ---------- WebGL ----------
  const canvas = document.createElement("canvas");
  canvas.className = "md-canvas"; canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  document.documentElement.classList.add("md-on");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) { canvas.remove(); document.documentElement.classList.remove("md-on"); return; }
  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}"));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const U = {}; ["u_colors", "u_scene", "u_shape", "u_surface", "u_finish", "u_transform", "u_space", "u_cursor"].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(innerWidth * dpr); canvas.height = Math.round(innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  addEventListener("resize", resize); resize();

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, presence: 0, target: 0 };
  addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / innerWidth) * 2 - 1; pointer.ty = 1 - (e.clientY / innerHeight) * 2;
    if (e.pointerType === "mouse") pointer.target = e.target.closest(".md-panel") ? 0 : 1;
  });
  document.documentElement.addEventListener("pointerleave", () => (pointer.target = 0));

  const hero = document.querySelector(".hero");
  const opacity = () => {
    if (S.where === "off") return 0;
    const h = hero ? hero.getBoundingClientRect().bottom + scrollY : innerHeight;
    const t = Math.min(Math.max(scrollY / (h * 0.85), 0), 1), s = t * t * (3 - 2 * t);
    if (S.where === "hero") return 1 - s;
    return 1 - s * (1 - S.below); // whole page: eases to the "below the hero" strength
  };

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const colors = new Float32Array(24);
  const draw = (t) => {
    colors.fill(0); S.colors.forEach((c, i) => colors.set(hexToRgb(c), i * 3));
    gl.uniform3fv(U.u_colors, colors);
    gl.uniform4f(U.u_scene, canvas.width, canvas.height, t, S.colors.length);
    gl.uniform4f(U.u_shape, S.scale, S.intensity, 0.5, S.warp);
    gl.uniform4f(U.u_surface, S.detail, S.contrast, S.brightness, S.saturation);
    gl.uniform4f(U.u_finish, S.hue, S.vignette, S.blur, S.grain);
    gl.uniform4f(U.u_transform, S.seed, S.rotate, S.drift, 0);
    gl.uniform4f(U.u_space, 0, 0, pointer.x, pointer.y);
    gl.uniform4f(U.u_cursor, pointer.presence, S.cursorEffect, S.cursorStrength, S.cursorRadius);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  // Shader time advances by speed each frame, so moving the speed slider never jumps the field.
  let last = performance.now(), clock = 0;
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.1); last = now;
    const o = opacity(); canvas.style.opacity = o;
    if (o > 0.001) {
      if (!reduced.matches) clock += dt * S.speed;
      const k = 1 - Math.exp(-dt * 8);
      pointer.x += (pointer.tx - pointer.x) * k; pointer.y += (pointer.ty - pointer.y) * k;
      pointer.presence += ((reduced.matches ? 0 : pointer.target) - pointer.presence) * (1 - Math.exp(-dt * 4));
      draw(clock);
    }
    requestAnimationFrame(frame);
  };
  draw(0); requestAnimationFrame(frame);

  // ---------- Editor ----------
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) k === "text" ? (n.textContent = v) : n.setAttribute(k, v);
    kids.forEach((c) => c && n.append(c)); return n;
  };
  const fmt = (v, step) => (step >= 1 ? String(Math.round(v)) : Number(v).toFixed(step < 0.01 ? 3 : 2));

  const panel = el("aside", { class: "md-panel", "aria-label": "Background editor" });
  const toggle = el("button", { class: "md-toggle", type: "button", "aria-expanded": "true", "aria-controls": "md-body", text: "Hide editor" });
  const body = el("div", { class: "md-body", id: "md-body" });
  panel.append(el("div", { class: "md-head" }, el("p", { class: "md-title", text: "Background" }), toggle), body);

  const segmented = (label, options, key, cast = (x) => x) => {
    const wrap = el("div", { class: "md-seg", role: "group", "aria-label": label });
    const btns = options.map(([v, t]) => {
      const b = el("button", { type: "button", "data-v": v, text: t });
      b.addEventListener("click", () => { S[key] = cast(v); save(); sync(); });
      wrap.append(b); return b;
    });
    return { node: el("div", { class: "md-field" }, el("p", { class: "md-label", text: label }), wrap), sync: () => btns.forEach((b) => b.setAttribute("aria-pressed", String(String(S[key]) === b.dataset.v))) };
  };
  const slider = ([key, label, min, max, step, hint]) => {
    const id = "md-" + key;
    const input = el("input", { type: "range", id, min, max, step });
    const out = el("output", { for: id });
    input.addEventListener("input", () => { S[key] = parseFloat(input.value); out.textContent = fmt(S[key], step); save(); });
    const node = el("div", { class: "md-field" }, el("div", { class: "md-row" }, el("label", { for: id, text: label }), out), input, hint ? el("p", { class: "md-hint", text: hint }) : null);
    return { node, sync: () => { input.value = S[key]; out.textContent = fmt(S[key], step); } };
  };

  const controls = [];
  // Page
  const where = segmented("Where it shows", WHERE, "where");
  const below = slider(["below", "Strength below the hero", 0, 1, 0.01, "Whole page only. 1 keeps it full strength behind the work and about sections; lower fades it as you scroll past the hero."]);
  controls.push(where, below);
  body.append(el("section", { class: "md-group" }, el("h2", { text: "Page" }), where.node, below.node));

  // Colors
  const swatches = el("div", { class: "md-swatches" });
  const addBtn = el("button", { type: "button", class: "md-small", text: "Add color" });
  const colorGroup = el("section", { class: "md-group" }, el("h2", { text: "Colors" }), swatches, el("div", { class: "md-row md-row-start" }, addBtn), el("p", { class: "md-hint", text: "Two to eight colors. Each one is a soft blob that drifts across the screen; the first also tints the gaps between them." }));
  const drawSwatches = () => {
    swatches.replaceChildren(...S.colors.map((c, i) => {
      const id = "md-color-" + i;
      const input = el("input", { type: "color", id, value: c, "aria-label": "Color " + (i + 1) });
      const hex = el("input", { type: "text", value: c, maxlength: "7", spellcheck: "false", "aria-label": "Color " + (i + 1) + " hex" });
      const rm = el("button", { type: "button", class: "md-x", "aria-label": "Remove color " + (i + 1), text: "×" });
      input.addEventListener("input", () => { S.colors[i] = input.value; hex.value = input.value; save(); });
      hex.addEventListener("change", () => { const v = hex.value.trim().toLowerCase(); if (/^#[0-9a-f]{6}$/.test(v)) { S.colors[i] = v; input.value = v; save(); } else hex.value = S.colors[i]; });
      rm.disabled = S.colors.length <= 2;
      rm.addEventListener("click", () => { S.colors.splice(i, 1); save(); sync(); });
      return el("div", { class: "md-swatch" }, input, hex, rm);
    }));
    addBtn.disabled = S.colors.length >= 8;
  };
  addBtn.addEventListener("click", () => { S.colors.push(S.colors[S.colors.length - 1]); save(); sync(); });
  body.append(colorGroup);

  for (const [name, items] of GROUPS) {
    const g = el("section", { class: "md-group" }, el("h2", { text: name }));
    if (name === "Cursor") { const fx = segmented("Effect", EFFECTS, "cursorEffect", Number); controls.push(fx); g.append(fx.node); }
    items.forEach((it) => { const c = slider(it); controls.push(c); g.append(c.node); });
    body.append(g);
  }

  // Actions
  const copyBtn = el("button", { type: "button", class: "md-small", text: "Copy settings" });
  const resetBtn = el("button", { type: "button", class: "md-small", text: "Reset to export" });
  const status = el("p", { class: "md-hint", role: "status" });
  const fallback = el("textarea", { class: "md-copy", readonly: "", rows: "6", "aria-label": "Settings to copy", hidden: "" });
  body.append(el("section", { class: "md-group" }, el("div", { class: "md-row md-row-start" }, copyBtn, resetBtn), status, fallback));

  const n = (v) => Number(v).toFixed(2);
  const settingsText = () => {
    const rgb = S.colors.map((c) => "//   vec3(" + hexToRgb(c).map((x) => x.toFixed(3)).join(", ") + ")");
    return [
      '// "Mesh drift", edited on the portfolio homepage',
      `//   u_colors[8] (first ${S.colors.length} used)`, ...rgb,
      `//   u_scene = vec4(canvas width, canvas height, seconds * ${n(S.speed)}, ${S.colors.length.toFixed(1)})`,
      `//   u_shape = vec4(${n(S.scale)}, ${n(S.intensity)}, 0.50, ${n(S.warp)})`,
      `//   u_surface = vec4(${n(S.detail)}, ${n(S.contrast)}, ${n(S.brightness)}, ${n(S.saturation)})`,
      `//   u_finish = vec4(${n(S.hue)}, ${n(S.vignette)}, ${Number(S.blur).toFixed(3)}, ${n(S.grain)})`,
      `//   u_transform = vec4(${Number(S.seed).toFixed(1)}, ${n(S.rotate)}, ${n(S.drift)}, 0.0)`,
      `//   u_cursor = vec4(presence, ${Number(S.cursorEffect).toFixed(1)}, ${n(S.cursorStrength)}, ${n(S.cursorRadius)})`,
      `//   page: ${S.where}, strength below the hero ${n(S.below)}`,
      `//   colors: ${S.colors.join(" ")}`,
    ].join("\n");
  };
  copyBtn.addEventListener("click", () => {
    const text = settingsText();
    const shown = () => { fallback.hidden = false; fallback.value = text; fallback.focus(); fallback.select(); status.textContent = "Select all and copy from the box."; };
    try {
      navigator.clipboard.writeText(text).then(() => { fallback.hidden = true; status.textContent = "Copied. Paste it to Claude to make it the default."; }, shown);
    } catch { shown(); }
  });
  resetBtn.addEventListener("click", () => { S = { ...EXPORT, colors: [...EXPORT.colors] }; save(); sync(); status.textContent = "Back to the 21st.dev export."; });

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open)); toggle.textContent = open ? "Hide editor" : "Edit background";
    panel.classList.toggle("is-closed", !open);
  });

  const sync = () => { drawSwatches(); controls.forEach((c) => c.sync()); };
  sync();
  document.body.append(panel);
  if (matchMedia("(max-width: 700px)").matches) toggle.click(); // phone: page first, editor on demand
})();
