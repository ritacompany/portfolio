// Motion library for the portfolio. Every function here is a pure function of time or progress,
// so any frame can be drawn on demand by window.seek(t) without replaying the frames before it.
// Rules for using it are in .claude/motion-rules.md.

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, p) => a + (b - a) * p;

// Progress of t through the window [a, b], clamped to 0..1.
export const range = (t, a, b) => clamp((t - a) / (b - a));

// Spring presets. z is the damping ratio: under 1 overshoots, 1 or more never does.
// UI: z 0.88, about 0.3 percent overshoot, settles in 0.6 s. For buttons, cards, chips, phones.
// TYPE: z 1.0, no overshoot, settles in 0.85 s. For anything with text in it.
// HEAVY: z 1.0, no overshoot, settles in 1.32 s. For large media and slow camera moves.
export const UI = { k: 220, d: 26 };
export const TYPE = { k: 120, d: 22 };
export const HEAVY = { k: 50, d: 14.2 };

// Damped spring from 0 to 1 as a closed form function of time since it started.
export function spring(t, k = UI.k, d = UI.d) {
  if (t <= 0) return 0;
  const w0 = Math.sqrt(k), z = d / (2 * w0);
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t));
  }
  if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  // Overdamped: two real roots.
  const r1 = -w0 * (z - Math.sqrt(z * z - 1)), r2 = -w0 * (z + Math.sqrt(z * z - 1));
  return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
}

// Seconds until a spring stays within tol of its target. Use it to size holds and close loops.
export function settleTime(k = UI.k, d = UI.d, tol = 0.001) {
  let last = 0;
  for (let t = 0; t < 10; t += 1 / 240) if (Math.abs(1 - spring(t, k, d)) > tol) last = t;
  return last;
}

// A value with several targets: keys is [[time, value], [time, value, {k, d}], ...].
// One spring per change, each starting at its own time and stacked, so a new target never restarts
// the motion and any t can be evaluated directly.
export function track(t, keys, k = UI.k, d = UI.d) {
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const s = keys[i][2] || { k, d };
    v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], s.k, s.d);
  }
  return v;
}

// CSS style cubic bezier as a pure function, so curves the motion plan already settled
// (Power3.easeInOut is 0.76, 0, 0.24, 1) stay exact under the render contract.
export function cubicBezier(x1, y1, x2, y2) {
  const bx = (u) => 3 * x1 * u * (1 - u) ** 2 + 3 * x2 * u * u * (1 - u) + u ** 3;
  const by = (u) => 3 * y1 * u * (1 - u) ** 2 + 3 * y2 * u * u * (1 - u) + u ** 3;
  return (p) => {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    let lo = 0, hi = 1, u = p;
    for (let i = 0; i < 40; i++) { u = (lo + hi) / 2; if (bx(u) < p) lo = u; else hi = u; }
    return by(u);
  };
}
export const power3InOut = cubicBezier(0.76, 0, 0.24, 1);
export const power1Out = (p) => 1 - (1 - clamp(p)) ** 2;

// Seeded randomness. Never Math.random: the same seed gives the same sequence on every render.
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// Smooth 1D value noise in 0..1, a pure function of x and seed. For drift and idle sway.
export function noise(x, seed = 1) {
  const h = (n) => { const r = rng((n * 374761393 + seed * 668265263) >>> 0); return r(); };
  const i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f);
  return lerp(h(i), h(i + 1), s);
}
