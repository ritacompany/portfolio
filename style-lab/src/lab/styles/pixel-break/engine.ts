// CHDWCK breaks into pixel blocks. Phases, keyed to scroll so scrolling back rebuilds the word:
//   1. Drift: the DOM word moves at a fraction of the scroll (settings.drift) while Selected works
//      scrolls into it. A CSS scroll driven animation does this, off the main thread.
//   2. Break: when the works title first touches the word's bottom edge (plus `breakAfter`), the DOM word hides and a
//      canvas draws it in place as blocks sampled from the real letters. Some blocks split into
//      halves or quarters, so 4, 2 and 1 px pieces mix.
//   3. Float: every block lifts off at once (unless `stagger` asks for a ripple from the circle), each
//      at its own speed, drifting a little, rising a little and bobbing in the air, even while the
//      reader is not scrolling. They fade at their own moments and are all gone by the time the
//      works' bottom reaches the window's bottom.
// The word and the blocks sit over the work with a difference blend by default (the stuck, inverting
// style), or under it. From 768 up only; the phone's vertical CHDWCK is left alone.

export type PixelSettings = {
  /** Word speed before the break, as a share of the scroll: 0 holds it still, 1 scrolls normally. */
  drift: number;
  /** Scroll, in px, after the works title first touches the word's bottom before it breaks. */
  breakAfter: number;
  /** Extra room added under the works so the breakup has somewhere to happen. */
  extraSpace: number;
  /** How fast the floating blocks scroll away after the break: 0 hangs in the air, 1 scrolls normally. */
  hold: number;
  /** 1 floats the word and blocks over the work with a difference blend; 0 puts them under it. */
  over: number;
  /** Block size in px; the word is sampled on this grid. */
  block: number;
  /** Share of blocks that split into halves (2 px from 4) and into quarters (1 px from 4). */
  half: number;
  quarter: number;
  /** How much a piece's size varies as it floats, 0 to 1. */
  variation: number;
  /** Space that opens between pieces as they lift off, in px. */
  gap: number;
  /** Share of pieces that float; the rest thin out early. */
  density: number;
  /** How far pieces drift out, in px. */
  spread: number;
  /** How far pieces rise as they float, in px. */
  rise: number;
  /** Bob in the air: size of the wander in px, and its speed. */
  float: number;
  floatSpeed: number;
  /** How different the pieces' speeds are, 0 (all alike) to 1. */
  speedRange: number;
  /** Randomness in direction: 0 straight out from the circle, 1 any direction. */
  scatter: number;
  /** 0 breaks everywhere at once; 1 breaks strictly outward from the circle. */
  stagger: number;
  /** Earliest point in its flight a piece starts to fade, 0 to 1; each piece picks its own after it. */
  fadeFrom: number;
  /** The circle: as a share of the word's width and height. */
  originX: number;
  originY: number;
  /** Wind direction in degrees (0 is right, -90 is up) and its pull, 0 to 1. */
  windAngle: number;
  wind: number;
};

export const DEFAULTS: PixelSettings = {
  drift: 0.25,
  breakAfter: 0,
  extraSpace: 420,
  hold: 0.1,
  over: 1,
  block: 4,
  half: 0.35,
  quarter: 0.15,
  variation: 0.2,
  gap: 0,
  density: 0.9,
  spread: 90,
  rise: 70,
  float: 9,
  floatSpeed: 0.5,
  speedRange: 0.7,
  scatter: 1,
  stagger: 0,
  fadeFrom: 0.35,
  originX: 0.5,
  originY: 0.5,
  windAngle: -90,
  wind: 0.15,
};

export type Frame = {
  phase: "drift" | "break" | "gone" | "off";
  scroll: number;
  sBreak: number;
  sEnd: number;
  progress: number;
  /** Pieces drawn this frame, how far they sit from home on average (px), and a positions checksum. */
  drawn: number;
  meanMove: number;
  sum: number;
  /** The word's box and the circle on screen, for the tuner's handles. */
  word: { x: number; y: number; w: number; h: number };
  origin: { x: number; y: number };
  total: number;
  /** Pieces by size: [whole, half, quarter]. */
  sizes: [number, number, number];
};

type Parts = { word: HTMLElement; letters: HTMLElement[]; works: HTMLElement; title: HTMLElement; main: HTMLElement };

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a || 1)));
  return t * t * (3 - 2 * t);
};
// Small seeded random, so a piece keeps its own direction, speed and size every frame and reload.
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export function createPixelBreak(root: HTMLElement, initial: PixelSettings) {
  const html = document.documentElement;
  const word = root.querySelector<HTMLElement>(".hero__name");
  const works = root.querySelector<HTMLElement>('[data-section="works"]');
  const title = root.querySelector<HTMLElement>(".works__title");
  const main = root.querySelector<HTMLElement>("main");
  const letters = [...root.querySelectorAll<HTMLElement>(".hero__wordmark > span")];
  if (!word || !works || !title || !main || !letters.length) return null;
  const parts: Parts = { word, works, title, main, letters };

  let s = { ...initial };
  const wide = matchMedia("(min-width: 768px)");

  // The canvas rides in a sticky, zero height layer at the top of main.
  const layer = document.createElement("div");
  layer.className = "lab-px-layer";
  layer.setAttribute("aria-hidden", "true");
  const canvas = document.createElement("canvas");
  layer.append(canvas);
  parts.main.prepend(layer);
  const ctx = canvas.getContext("2d")!;

  let home = { x: 0, y: 0, w: 0, h: 0 };
  let sBreak = 0, sEnd = 1;
  let ink = "";
  // Pieces: rest x, y and size in the word's own px, plus the id that seeds their randoms.
  let px = new Float32Array(0), py = new Float32Array(0), ps = new Float32Array(0), pf = new Float32Array(0);
  let pid = new Uint32Array(0);
  let count = 0;
  let sizes: [number, number, number] = [0, 0, 0];
  let maxDist = 1;
  let dpr = 1, vw = 0, vh = 0;
  let clock: number | null = null;
  const empty: Frame = { phase: "off", scroll: 0, sBreak: 0, sEnd: 0, progress: 0, drawn: 0, meanMove: 0, sum: 0, word: { x: 0, y: 0, w: 0, h: 0 }, origin: { x: 0, y: 0 }, total: 0, sizes: [0, 0, 0] };
  let last = empty;
  const listeners = new Set<(f: Frame) => void>();

  // Draws the real letters into an offscreen canvas at their on screen size, keeps one block per grid
  // cell whose centre is inked, and splits some blocks into halves or quarters.
  function sample() {
    const r = parts.word.getBoundingClientRect();
    const w = Math.ceil(r.width), h = Math.ceil(r.height);
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const o = off.getContext("2d", { willReadFrequently: true })!;
    o.textBaseline = "alphabetic";
    for (const el of parts.letters) {
      const cs = getComputedStyle(el);
      o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const lr = el.getBoundingClientRect();
      const m = o.measureText(el.textContent ?? "");
      const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
      o.fillText(el.textContent ?? "", lr.left - r.left, lr.top - r.top + (lr.height - (asc + desc)) / 2 + asc);
    }
    const data = o.getImageData(0, 0, w, h).data;
    const b = Math.max(1, Math.round(s.block));
    const xs: number[] = [], ys: number[] = [], ss: number[] = [], fs: number[] = [], ids: number[] = [];
    const tally: [number, number, number] = [0, 0, 0];
    let cell = 0;
    for (let y = 0; y < h; y += b) {
      for (let x = 0; x < w; x += b) {
        const cx = Math.min(w - 1, x + (b >> 1)), cy = Math.min(h - 1, y + (b >> 1));
        if (data[(cy * w + cx) * 4 + 3] <= 127) continue;
        cell++;
        const r0 = rand(cell, 11);
        // Whole: one piece. Half: four pieces of half size. Quarter: four pieces that rest at half
        // size (so the word is still solid) and shrink to a quarter as they lift off.
        const kind = r0 < s.quarter ? 2 : r0 < s.quarter + s.half ? 1 : 0;
        const split = kind === 0 ? 1 : 2;
        const sz = b / split;
        for (let j = 0; j < split; j++) {
          for (let k = 0; k < split; k++) {
            const sx = x + k * sz, sy = y + j * sz;
            if (split > 1) {
              const qx = Math.min(w - 1, Math.floor(sx + sz / 2)), qy = Math.min(h - 1, Math.floor(sy + sz / 2));
              if (data[(qy * w + qx) * 4 + 3] <= 127) continue;
            }
            xs.push(sx); ys.push(sy); ss.push(sz); fs.push(kind === 2 ? b / 4 : sz); ids.push(cell * 17 + j * 4 + k);
            tally[kind]++;
          }
        }
      }
    }
    px = Float32Array.from(xs); py = Float32Array.from(ys); ps = Float32Array.from(ss); pf = Float32Array.from(fs); pid = Uint32Array.from(ids);
    count = xs.length;
    sizes = tally;
    prepare();
  }

  // Everything about a piece that does not change frame to frame, worked out once per settings change:
  // its start delay, fade point, speed, direction, how far it drifts, its bob phases and its final size.
  let kDelay = new Float32Array(0), kFade = new Float32Array(0), kSpeed = new Float32Array(0), kVx = new Float32Array(0), kVy = new Float32Array(0);
  let kOut = new Float32Array(0), kP1 = new Float32Array(0), kP2 = new Float32Array(0), kSize = new Float32Array(0), kKeep = new Uint8Array(0);
  function prepare() {
    const n = count, tau = Math.PI * 2;
    kDelay = new Float32Array(n); kFade = new Float32Array(n); kSpeed = new Float32Array(n); kVx = new Float32Array(n); kVy = new Float32Array(n);
    kOut = new Float32Array(n); kP1 = new Float32Array(n); kP2 = new Float32Array(n); kSize = new Float32Array(n); kKeep = new Uint8Array(n);
    const ox = s.originX * home.w, oy = s.originY * home.h;
    const win = Math.max(0.08, 1 - s.stagger), delayScale = Math.min(s.stagger, 1 - win);
    const wa = (s.windAngle * Math.PI) / 180, wxv = Math.cos(wa), wyv = Math.sin(wa);
    for (let i = 0; i < n; i++) {
      const id = pid[i];
      const r1 = rand(id, 1), r2 = rand(id, 2), r3 = rand(id, 3), r4 = rand(id, 4), r5 = rand(id, 5), r6 = rand(id, 6), r7 = rand(id, 7), r8 = rand(id, 8);
      const dx = px[i] + ps[i] / 2 - ox, dy = py[i] + ps[i] / 2 - oy, d = Math.hypot(dx, dy);
      kDelay[i] = delayScale * ((d / maxDist) * 0.85 + r1 * 0.15);
      kKeep[i] = r2 < s.density ? 1 : 0;
      kFade[i] = s.fadeFrom + (1 - s.fadeFrom) * 0.7 * r8;
      kSpeed[i] = 1 - s.speedRange / 2 + s.speedRange * r4;
      let ax = d > 0.001 ? dx / d : Math.cos(r3 * tau), ay = d > 0.001 ? dy / d : Math.sin(r3 * tau);
      const turn = (r3 - 0.5) * tau * s.scatter, c = Math.cos(turn), sn = Math.sin(turn);
      [ax, ay] = [ax * c - ay * sn, ax * sn + ay * c];
      let vx = ax * (1 - s.wind) + wxv * s.wind, vy = ay * (1 - s.wind) + wyv * s.wind;
      const vl = Math.hypot(vx, vy) || 1;
      kVx[i] = vx / vl; kVy[i] = vy / vl;
      kOut[i] = s.spread * kSpeed[i] * (0.4 + r5 * 0.6);
      kP1[i] = r6 * tau; kP2[i] = r7 * tau;
      kSize[i] = pf[i] * (1 + s.variation * (r5 * 2 - 1));
    }
  }

  function measure() {
    html.classList.remove("lab-px-drift", "lab-px-broken");
    html.classList.toggle("lab-px-over", s.over >= 0.5);
    if (!wide.matches) { clear(); emit({ ...empty }); return; }
    const r = parts.word.getBoundingClientRect();
    home = { x: r.left, y: r.top + scrollY, w: r.width, h: r.height };
    ink = getComputedStyle(parts.letters[0]).color;
    html.style.setProperty("--px-extra", `${s.extraSpace}px`);
    const titleTop = parts.title.getBoundingClientRect().top + scrollY;
    // The moment the title's top first touches the word's bottom edge, as the works start to go into it.
    const gap = titleTop - (home.y + home.h);
    const meet = s.drift >= 0.999 ? gap : gap / (1 - s.drift);
    sBreak = Math.max(0, meet + s.breakAfter);
    const worksBottom = parts.works.getBoundingClientRect().bottom + scrollY;
    sEnd = Math.max(sBreak + 200, worksBottom - innerHeight);
    html.style.setProperty("--px-sb", `${sBreak}px`);
    html.style.setProperty("--px-hold", `${(1 - s.drift) * sBreak}px`);
    const ox = s.originX * home.w, oy = s.originY * home.h;
    maxDist = Math.max(Math.hypot(ox, oy), Math.hypot(home.w - ox, oy), Math.hypot(ox, home.h - oy), Math.hypot(home.w - ox, home.h - oy), 1);
    sample();
    resize();
    html.classList.add("lab-px-drift");
    draw();
  }

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    vw = document.documentElement.clientWidth; vh = innerHeight;
    canvas.width = Math.round(vw * dpr); canvas.height = Math.round(vh * dpr);
    canvas.style.width = `${vw}px`; canvas.style.height = `${vh}px`;
    layer.style.height = `${vh}px`;
    layer.style.marginBottom = `${-vh}px`;
  }

  function clear() { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); }
  function emit(f: Frame) { last = f; listeners.forEach((l) => l(f)); }

  // The word's top left on screen for a scroll position: drift speed until the break, hold after.
  const fieldY = (y: number) => (y < sBreak ? home.y - s.drift * y : home.y - s.drift * sBreak - s.hold * (y - sBreak));

  let loop = 0;
  function draw() {
    cancelAnimationFrame(loop);
    if (!wide.matches) return;
    const y = scrollY;
    const wx = home.x, wy = fieldY(y);
    const wordBox = { x: wx, y: wy, w: home.w, h: home.h };
    const origin = { x: wx + s.originX * home.w, y: wy + s.originY * home.h };
    const base = { scroll: y, sBreak, sEnd, word: wordBox, origin, total: count, sizes };
    clear();
    if (y < sBreak) {
      html.classList.remove("lab-px-broken");
      emit({ ...base, phase: "drift", progress: 0, drawn: 0, meanMove: 0, sum: 0 });
      return;
    }
    html.classList.add("lab-px-broken");
    const p = Math.min(1, (y - sBreak) / (sEnd - sBreak));
    if (p >= 1) { emit({ ...base, phase: "gone", progress: 1, drawn: 0, meanMove: 0, sum: 0 }); return; }

    const t = clock ?? performance.now() / 1000;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = ink;
    const win = Math.max(0.08, 1 - s.stagger);
    const w1 = s.floatSpeed * Math.PI * 2 * 0.31, w2 = s.floatSpeed * Math.PI * 2 * 0.23;
    let drawn = 0, moved = 0, sum = 0;
    for (let i = 0; i < count; i++) {
      const q = Math.min(1, Math.max(0, (p - kDelay[i]) / win));
      const alpha = kKeep[i] ? 1 - smooth(kFade[i], 1, q) : 1 - smooth(0, 0.3, q);
      if (alpha <= 0.01) continue;
      // Lift off over the first fifth of the flight, then drift, rise and bob.
      const lift = smooth(0, 0.2, q), sp = kSpeed[i];
      const out = kOut[i] * (1 - (1 - q) * (1 - q));
      const bob = s.float * lift;
      const ddx = kVx[i] * out + Math.sin(t * w1 * sp + kP1[i]) * bob;
      const ddy = kVy[i] * out - s.rise * sp * q + Math.cos(t * w2 * sp + kP2[i]) * bob;
      const rs = ps[i];
      const size = rs + (kSize[i] - rs) * lift - s.gap * lift;
      if (size <= 0.3) continue;
      const x = wx + px[i] + ddx, yy = wy + py[i] + ddy;
      ctx.globalAlpha = alpha;
      ctx.fillRect(x, yy, size, size);
      drawn++;
      moved += Math.abs(ddx) + Math.abs(ddy);
      sum = (sum + x * 0.37 + yy * 0.61 + size + alpha * 7.3) % 1e9;
    }
    ctx.globalAlpha = 1;
    emit({ ...base, phase: "break", progress: p, drawn, meanMove: drawn ? moved / drawn : 0, sum });
    // Keep bobbing while the pieces are in the air, scrolling or not.
    if (clock === null && s.float > 0) loop = requestAnimationFrame(draw);
  }

  let raf = 0, pending = false;
  const schedule = (full = false) => {
    if (full) pending = true;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { if (pending) { pending = false; measure(); } else draw(); });
  };
  const onScroll = () => schedule();
  const onResize = () => schedule(true);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onResize);
  wide.addEventListener("change", onResize);
  const ro = new ResizeObserver(onResize);
  ro.observe(parts.works);
  document.fonts.ready.then(() => schedule(true));
  measure();

  return {
    get settings() { return s; },
    set(next: Partial<PixelSettings>) {
      const geometry = ["drift", "breakAfter", "extraSpace", "block", "half", "quarter", "originX", "originY", "over"].some(
        (k) => k in next && next[k as keyof PixelSettings] !== s[k as keyof PixelSettings],
      );
      s = { ...s, ...next };
      if (!geometry) prepare();
      schedule(geometry);
    },
    /** Freezes the float clock at t seconds (null runs it again); the checks use this. */
    freeze(t: number | null) { clock = t; schedule(); },
    onFrame(f: (fr: Frame) => void) { listeners.add(f); f(last); return () => { listeners.delete(f); }; },
    frame: () => last,
    destroy() {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(loop);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      ro.disconnect();
      layer.remove();
      html.classList.remove("lab-px-drift", "lab-px-broken", "lab-px-over");
      html.style.removeProperty("--px-sb");
      html.style.removeProperty("--px-hold");
      html.style.removeProperty("--px-extra");
    },
  };
}

export type PixelBreak = NonNullable<ReturnType<typeof createPixelBreak>>;
