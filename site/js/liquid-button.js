// Liquid outline for the outlined Button (components.css .button), his pick 9 Nov.
// Rebuilt from the liquid outline prototype (session "Liquid button effects recreation", branch
// claude/cool-albattani-5v7t70, prototypes/homepage-foundations/liquid-buttons.html): each pill's
// border becomes a ring of points on springs, drawn as an SVG path. The pointer pushes nearby points
// outward along the edge's normal, neighbours carry the bulge along as a wave, damping settles it.
// Pressing squeezes both rings in a little; release springs them back. No fill, as in the prototype.
// Reduced motion keeps the plain CSS borders and never starts.
const CFG = { tension: 0.06, neighbour: 0.1, damping: 0.84, radius: 72, pushMax: 16, follow: 0.18, press: 4, spacing: 6 };
const REACH = 48;
const NS = "http://www.w3.org/2000/svg";

function ring(el) {
  const cs = getComputedStyle(el);
  const sw = parseFloat(cs.borderTopWidth) || 3;
  const w = el.offsetWidth, h = el.offsetHeight;
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "liquid-ring");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("viewBox", `0 0 ${w + 2 * REACH} ${h + 2 * REACH}`);
  // Absolute boxes start inside the border, so step back by the border width too. max-width:none
  // overrides the base.css rule that would shrink the svg to the pill.
  svg.style.cssText = `position:absolute;left:${-REACH - sw}px;top:${-REACH - sw}px;width:${w + 2 * REACH}px;height:${h + 2 * REACH}px;max-width:none;overflow:visible;pointer-events:none`;
  const path = document.createElementNS(NS, "path");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", String(sw));
  svg.appendChild(path);
  el.appendChild(svg);
  el.classList.add("is-liquid");
  // Rest points: a stadium inset by half the stroke, walked at equal arc length.
  const iw = w - sw, ih = h - sw, r = Math.min(ih, iw) / 2, ox = REACH + sw / 2, oy = REACH + sw / 2;
  const straight = Math.max(0, iw - 2 * r), arc = Math.PI * r, total = 2 * straight + 2 * arc;
  const count = Math.max(24, Math.round(total / CFG.spacing));
  const pts = [];
  for (let i = 0; i < count; i++) {
    const s = (i / count) * total;
    let x, y, nx, ny;
    if (s < straight) { x = r + s; y = 0; nx = 0; ny = -1; }
    else if (s < straight + arc) { const a = (s - straight) / r - Math.PI / 2; nx = Math.cos(a); ny = Math.sin(a); x = iw - r + nx * r; y = r + ny * r; }
    else if (s < 2 * straight + arc) { x = iw - r - (s - straight - arc); y = ih; nx = 0; ny = 1; }
    else { const b = (s - 2 * straight - arc) / r + Math.PI / 2; nx = Math.cos(b); ny = Math.sin(b); x = r + nx * r; y = r + ny * r; }
    pts.push({ rx: x + ox, ry: y + oy, nx, ny, x: x + ox, y: y + oy, vx: 0, vy: 0 });
  }
  return { el, path, pts };
}

function draw(rg) {
  const p = rg.pts, n = p.length;
  let d = `M${p[0].x.toFixed(2)} ${p[0].y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n], p1 = p[i], p2 = p[(i + 1) % n], p3 = p[(i + 2) % n];
    d += `C${(p1.x + (p2.x - p0.x) / 6).toFixed(2)} ${(p1.y + (p2.y - p0.y) / 6).toFixed(2)} ${(p2.x - (p3.x - p1.x) / 6).toFixed(2)} ${(p2.y - (p3.y - p1.y) / 6).toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  rg.path.setAttribute("d", d + "Z");
}

function liquid(button) {
  const rings = [...button.querySelectorAll(".button__icon, .button__label")].map(ring);
  const m = { x: -1e4, y: -1e4, px: -1e4, py: -1e4, near: false, down: false };
  let running = false, still = 0;
  rings.forEach(draw);

  const local = (rg, e) => { const b = rg.el.getBoundingClientRect(); return { x: e.clientX - b.left + REACH, y: e.clientY - b.top + REACH }; };
  const onMove = (e) => {
    const b = button.getBoundingClientRect();
    m.near = e.clientX > b.left - REACH && e.clientX < b.right + REACH && e.clientY > b.top - REACH && e.clientY < b.bottom + REACH;
    m.e = e;
    if (m.near) wake();
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  button.addEventListener("pointerdown", () => { m.down = true; wake(); });
  window.addEventListener("pointerup", () => { if (m.down) { m.down = false; wake(); } });
  button.addEventListener("pointerleave", () => { m.down = false; });

  function wake() { if (!running) { running = true; still = 0; requestAnimationFrame(step); } }
  function step() {
    let energy = 0, total = 0;
    for (const rg of rings) {
      const mp = m.near && m.e ? local(rg, m.e) : null;
      const mvx = mp && rg.lx !== undefined ? mp.x - rg.lx : 0, mvy = mp && rg.ly !== undefined ? mp.y - rg.ly : 0;
      if (mp) { rg.lx = mp.x; rg.ly = mp.y; } else { rg.lx = rg.ly = undefined; }
      const p = rg.pts, n = p.length;
      for (let i = 0; i < n; i++) {
        const q = p[i], prev = p[(i - 1 + n) % n], next = p[(i + 1) % n];
        let tx = q.rx, ty = q.ry, f = 0;
        if (m.down) { tx -= q.nx * CFG.press; ty -= q.ny * CFG.press; }
        else if (mp) {
          const dist = Math.hypot(q.rx - mp.x, q.ry - mp.y);
          if (dist < CFG.radius) { f = 1 - dist / CFG.radius; f = f * f * (3 - 2 * f); tx += q.nx * f * CFG.pushMax; ty += q.ny * f * CFG.pushMax; }
        }
        const ndx = ((prev.x - prev.rx) + (next.x - next.rx)) / 2 - (q.x - q.rx);
        const ndy = ((prev.y - prev.ry) + (next.y - next.ry)) / 2 - (q.y - q.ry);
        q.vx = (q.vx + (tx - q.x) * CFG.tension + ndx * CFG.neighbour + mvx * CFG.follow * f) * CFG.damping;
        q.vy = (q.vy + (ty - q.y) * CFG.tension + ndy * CFG.neighbour + mvy * CFG.follow * f) * CFG.damping;
        q.x += q.vx; q.y += q.vy;
        energy += Math.abs(q.vx) + Math.abs(q.vy) + Math.abs(q.rx - q.x) + Math.abs(q.ry - q.y);
      }
      total += n;
      draw(rg);
    }
    if (energy < 0.05 * total && !m.near && !m.down) still++; else still = 0;
    if (still > 10) {
      for (const rg of rings) { for (const q of rg.pts) { q.x = q.rx; q.y = q.ry; q.vx = q.vy = 0; } draw(rg); }
      running = false; return;
    }
    requestAnimationFrame(step);
  }
}

export function startLiquidButtons(root = document) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const go = () => root.querySelectorAll(".button").forEach(liquid);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
}

startLiquidButtons();
