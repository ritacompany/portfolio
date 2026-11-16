// CHDWCK breaks into pixel blocks. Three phases, all keyed to scroll so scrolling back rebuilds it:
//   1. Drift: the DOM word moves at a fraction of the scroll (settings.drift), so Selected works
//      slides up over it. A CSS scroll driven animation does this, off the main thread.
//   2. Break: once the works title has met the word's top and gone `breakAfter` px further, the DOM
//      word hides and a canvas draws it as blocks sampled from the real letters, in place.
//   3. Spread and fade: blocks leave from the break point outward, carried away from it and by the
//      wind, and every block is gone by the time the works' bottom reaches the window's bottom.
// From 768 up only; the phone's vertical CHDWCK is left alone.

export type PixelSettings = {
  /** Word speed before the break, as a share of the scroll: 0 holds it still, 1 scrolls normally. */
  drift: number;
  /** Scroll, in px, after the works title meets the word's top before it starts to break. */
  breakAfter: number;
  /** Extra room added under the works so the breakup has somewhere to happen. */
  extraSpace: number;
  /** Block size in px; the word is sampled on this grid. */
  block: number;
  /** How much a block's size varies as it flies, 0 to 1 (0.5 means half to one and a half times). */
  variation: number;
  /** Space that opens between blocks as they separate, in px. */
  gap: number;
  /** Share of blocks that travel; the rest thin out early. */
  density: number;
  /** How far blocks travel, in px. */
  spread: number;
  /** Randomness in each block's direction and wobble, 0 to 1. */
  scatter: number;
  /** 0 breaks everywhere at once; 1 breaks strictly outward from the break point. */
  stagger: number;
  /** Where in its own flight a block starts to fade, 0 to 1. */
  fadeFrom: number;
  /** The break point, as a share of the word's width and height. */
  originX: number;
  originY: number;
  /** Wind direction in degrees (0 is right, -90 is up) and its pull, 0 to 1. */
  windAngle: number;
  wind: number;
};

export const DEFAULTS: PixelSettings = {
  drift: 0.25,
  breakAfter: 120,
  extraSpace: 420,
  block: 4,
  variation: 0.5,
  gap: 1,
  density: 0.85,
  spread: 520,
  scatter: 0.55,
  stagger: 0.6,
  fadeFrom: 0.45,
  originX: 0.5,
  originY: 0.5,
  windAngle: -70,
  wind: 0.35,
};

export type Frame = {
  phase: "drift" | "break" | "gone" | "off";
  scroll: number;
  sBreak: number;
  sEnd: number;
  progress: number;
  /** Blocks drawn this frame, blocks drawn outside the word's own box, and a positions checksum. */
  drawn: number;
  outside: number;
  sum: number;
  /** The word's box and the break point on screen, for the tuner's handles. */
  word: { x: number; y: number; w: number; h: number };
  origin: { x: number; y: number };
  total: number;
};

type Parts = {
  word: HTMLElement;
  letters: HTMLElement[];
  works: HTMLElement;
  title: HTMLElement;
  main: HTMLElement;
};

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a || 1)));
  return t * t * (3 - 2 * t);
};
// Small seeded random, so a block keeps its own direction and size every frame and every reload.
const rand = (i: number, k: number) => {
  const x = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export function createPixelBreak(root: HTMLElement, initial: PixelSettings) {
  const html = document.documentElement;
  const find = (): Parts | null => {
    const word = root.querySelector<HTMLElement>(".hero__name");
    const works = root.querySelector<HTMLElement>('[data-section="works"]');
    const title = root.querySelector<HTMLElement>(".works__title");
    const main = root.querySelector<HTMLElement>("main");
    const letters = [...root.querySelectorAll<HTMLElement>(".hero__wordmark > span")];
    return word && works && title && main && letters.length ? { word, works, title, main, letters } : null;
  };
  const parts = find();
  if (!parts) return null;

  let s = { ...initial };
  const wide = matchMedia("(min-width: 768px)");

  // The canvas rides in a sticky, zero height layer at the top of main, under everything in main.
  const layer = document.createElement("div");
  layer.className = "lab-px-layer";
  layer.setAttribute("aria-hidden", "true");
  const canvas = document.createElement("canvas");
  layer.append(canvas);
  parts.main.prepend(layer);
  const ctx = canvas.getContext("2d")!;

  // Measured geometry, in page px.
  let home = { x: 0, y: 0, w: 0, h: 0 };
  let sBreak = 0, sEnd = 1;
  let ink = "";
  // Blocks, in the word's own px: home x and y, plus per block random values.
  let hx = new Float32Array(0), hy = new Float32Array(0);
  let count = 0;
  let maxDist = 1;
  let dpr = 1, vw = 0, vh = 0;
  let last: Frame = { phase: "off", scroll: 0, sBreak: 0, sEnd: 0, progress: 0, drawn: 0, outside: 0, sum: 0, word: { x: 0, y: 0, w: 0, h: 0 }, origin: { x: 0, y: 0 }, total: 0 };
  const listeners = new Set<(f: Frame) => void>();

  // Draws the real letters into an offscreen canvas at their on screen size and keeps one block per
  // grid cell whose centre is inked.
  function sample() {
    const r = parts!.word.getBoundingClientRect();
    const w = Math.ceil(r.width), h = Math.ceil(r.height);
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const o = off.getContext("2d", { willReadFrequently: true })!;
    o.textBaseline = "alphabetic";
    for (const el of parts!.letters) {
      const cs = getComputedStyle(el);
      o.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const lr = el.getBoundingClientRect();
      const m = o.measureText(el.textContent ?? "");
      const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
      const baseline = lr.top - r.top + (lr.height - (asc + desc)) / 2 + asc;
      o.fillText(el.textContent ?? "", lr.left - r.left, baseline);
    }
    const data = o.getImageData(0, 0, w, h).data;
    const b = Math.max(1, Math.round(s.block));
    const xs: number[] = [], ys: number[] = [];
    for (let y = 0; y < h; y += b) {
      for (let x = 0; x < w; x += b) {
        const cx = Math.min(w - 1, x + (b >> 1)), cy = Math.min(h - 1, y + (b >> 1));
        if (data[(cy * w + cx) * 4 + 3] > 127) { xs.push(x); ys.push(y); }
      }
    }
    hx = Float32Array.from(xs); hy = Float32Array.from(ys);
    count = xs.length;
  }

  function measure() {
    html.classList.remove("lab-px-drift", "lab-px-broken");
    if (!wide.matches) { clear(); emit({ ...last, phase: "off" }); return; }
    // Undisturbed geometry first (the drift is off while measuring).
    const r = parts!.word.getBoundingClientRect();
    home = { x: r.left, y: r.top + scrollY, w: r.width, h: r.height };
    ink = getComputedStyle(parts!.letters[0]).color;
    html.style.setProperty("--px-extra", `${s.extraSpace}px`);
    const titleTop = parts!.title.getBoundingClientRect().top + scrollY;
    const meet = s.drift >= 0.999 ? titleTop - home.y : (titleTop - home.y) / (1 - s.drift);
    sBreak = Math.max(0, meet + s.breakAfter);
    const worksBottom = parts!.works.getBoundingClientRect().bottom + scrollY;
    sEnd = Math.max(sBreak + 200, worksBottom - innerHeight);
    html.style.setProperty("--px-sb", `${sBreak}px`);
    html.style.setProperty("--px-hold", `${(1 - s.drift) * sBreak}px`);
    sample();
    const ox = s.originX * home.w, oy = s.originY * home.h;
    maxDist = Math.max(
      Math.hypot(ox, oy), Math.hypot(home.w - ox, oy), Math.hypot(ox, home.h - oy), Math.hypot(home.w - ox, home.h - oy), 1,
    );
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

  function draw() {
    if (!wide.matches) return;
    const y = scrollY;
    // The word's top left on screen: it has moved at the drift speed the whole way.
    const wx = home.x, wy = home.y - s.drift * y;
    const word = { x: wx, y: wy, w: home.w, h: home.h };
    const origin = { x: wx + s.originX * home.w, y: wy + s.originY * home.h };
    const base = { scroll: y, sBreak, sEnd, word, origin, total: count };
    clear();
    if (y < sBreak) {
      html.classList.remove("lab-px-broken");
      emit({ ...base, phase: "drift", progress: 0, drawn: 0, outside: 0, sum: 0 });
      return;
    }
    html.classList.add("lab-px-broken");
    const p = Math.min(1, (y - sBreak) / (sEnd - sBreak));
    if (p >= 1) { emit({ ...base, phase: "gone", progress: 1, drawn: 0, outside: 0, sum: 0 }); return; }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = ink;
    const b = Math.max(1, Math.round(s.block));
    const ox = s.originX * home.w, oy = s.originY * home.h;
    const win = Math.max(0.08, 1 - s.stagger);
    const delayScale = Math.min(s.stagger, 1 - win);
    const wa = (s.windAngle * Math.PI) / 180;
    const wxv = Math.cos(wa), wyv = Math.sin(wa);
    let drawn = 0, outside = 0, sum = 0;
    for (let i = 0; i < count; i++) {
      const px = hx[i], py = hy[i];
      const r1 = rand(i, 1), r2 = rand(i, 2), r3 = rand(i, 3), r4 = rand(i, 4), r5 = rand(i, 5);
      const dx = px + b / 2 - ox, dy = py + b / 2 - oy;
      const d = Math.hypot(dx, dy);
      const delay = delayScale * ((d / maxDist) * 0.85 + r1 * 0.15);
      const q = Math.min(1, Math.max(0, (p - delay) / win));
      const keep = r2 < s.density;
      const alpha = keep ? 1 - smooth(s.fadeFrom, 1, q) : 1 - smooth(0, 0.3, q);
      if (alpha <= 0.01) continue;
      const e = q * q * (3 - 2 * q);
      let x = wx + px, yy = wy + py;
      let size = b;
      if (e > 0) {
        // Away from the break point, turned by the scatter, pulled by the wind.
        let ax = d > 0.001 ? dx / d : Math.cos(r3 * 6.283), ay = d > 0.001 ? dy / d : Math.sin(r3 * 6.283);
        const turn = (r3 - 0.5) * Math.PI * s.scatter;
        const c = Math.cos(turn), sn = Math.sin(turn);
        [ax, ay] = [ax * c - ay * sn, ax * sn + ay * c];
        let vx = ax * (1 - s.wind) + wxv * s.wind, vy = ay * (1 - s.wind) + wyv * s.wind;
        const vl = Math.hypot(vx, vy) || 1; vx /= vl; vy /= vl;
        const dist = s.spread * (0.35 + r4 * 1.3) * e;
        const wob = Math.sin(q * Math.PI * 2 + r5 * 6.283) * 24 * s.scatter * e;
        x += vx * dist - vy * wob;
        yy += vy * dist + vx * wob;
        size = b * (1 + s.variation * (r5 * 2 - 1) * e) - s.gap * e;
      }
      if (size <= 0.3) continue;
      ctx.globalAlpha = alpha;
      ctx.fillRect(x, yy, size, size);
      drawn++;
      if (x + size < wx || x > wx + home.w || yy + size < wy || yy > wy + home.h) outside++;
      sum = (sum + x * 0.37 + yy * 0.61 + size) % 1e9;
    }
    ctx.globalAlpha = 1;
    emit({ ...base, phase: "break", progress: p, drawn, outside, sum });
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
      const geometry = ["drift", "breakAfter", "extraSpace", "block", "originX", "originY"].some(
        (k) => k in next && next[k as keyof PixelSettings] !== s[k as keyof PixelSettings],
      );
      s = { ...s, ...next };
      schedule(geometry);
    },
    onFrame(f: (fr: Frame) => void) { listeners.add(f); f(last); return () => { listeners.delete(f); }; },
    frame: () => last,
    destroy() {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      wide.removeEventListener("change", onResize);
      ro.disconnect();
      layer.remove();
      html.classList.remove("lab-px-drift", "lab-px-broken");
      html.style.removeProperty("--px-sb");
      html.style.removeProperty("--px-hold");
      html.style.removeProperty("--px-extra");
    },
  };
}

export type PixelBreak = NonNullable<ReturnType<typeof createPixelBreak>>;
