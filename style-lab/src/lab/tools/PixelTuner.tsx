import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Copy, GripVertical, RotateCcw } from "lucide-react";
import { DEFAULTS, type Frame, type PixelBreak, type PixelSettings } from "@/lab/styles/pixel-break/engine";
import "./tuner.css";

// The pixel breakup tuner. Lab chrome, not part of the page's design: it lives outside the canvas in
// its own root, so the type lock and the style lint never see it. Dark surfaces step up in lightness
// with elevation (page Neutral/900, panel 850, groups 800, tracks 700), text is Neutral/100 and 550.

type Key = keyof PixelSettings;
type Slider = { key: Key; label: string; min: number; max: number; step: number; unit?: string; pct?: boolean; hint: string };
const GROUPS: Array<{ title: string; sliders: Slider[] }> = [
  {
    title: "Timing",
    sliders: [
      { key: "drift", label: "Drift before the break", min: 0, max: 1, step: 0.01, pct: true, hint: "How fast CHDWCK moves while the works scroll into it. 0 holds it still." },
      { key: "breakAfter", label: "Break starts", min: -300, max: 900, step: 10, unit: "px", hint: "Scroll after the works title first touches the bottom of the word. 0 breaks the moment it starts to go in." },
      { key: "hold", label: "Float with the page", min: 0, max: 1, step: 0.01, pct: true, hint: "After the break: 0 hangs the pieces in the air, 100% scrolls them away with the page." },
      { key: "extraSpace", label: "Extra space under works", min: 0, max: 1200, step: 10, unit: "px", hint: "Room for the breakup to finish before About." },
    ],
  },
  {
    title: "Pieces",
    sliders: [
      { key: "block", label: "Block size", min: 2, max: 16, step: 1, unit: "px", hint: "The grid the word is cut into." },
      { key: "half", label: "Half size pieces", min: 0, max: 1, step: 0.01, pct: true, hint: "Share of blocks that split in four (2 px from 4)." },
      { key: "quarter", label: "Quarter size pieces", min: 0, max: 0.6, step: 0.01, pct: true, hint: "Share of blocks that split in sixteen (1 px from 4)." },
      { key: "variation", label: "Size wobble", min: 0, max: 1, step: 0.01, pct: true, hint: "How much each piece grows or shrinks once it lifts off." },
      { key: "gap", label: "Gap between pieces", min: 0, max: 3, step: 0.25, unit: "px", hint: "Space that opens between pieces as they lift off." },
      { key: "density", label: "Amount", min: 0.05, max: 1, step: 0.01, pct: true, hint: "Share of pieces that float; the rest thin out early." },
    ],
  },
  {
    title: "Float",
    sliders: [
      { key: "spread", label: "Drift out", min: 0, max: 600, step: 5, unit: "px", hint: "How far pieces drift from where they were." },
      { key: "rise", label: "Rise", min: -300, max: 400, step: 5, unit: "px", hint: "How far they rise as they float. Below 0 they sink." },
      { key: "float", label: "Bob", min: 0, max: 40, step: 1, unit: "px", hint: "How far each piece wanders in the air, even when you stop scrolling." },
      { key: "floatSpeed", label: "Bob speed", min: 0, max: 2, step: 0.05, unit: "×", hint: "How quickly they wander." },
      { key: "speedRange", label: "Speed differences", min: 0, max: 1, step: 0.01, pct: true, hint: "0 moves every piece alike; higher lets some move much faster than others." },
      { key: "scatter", label: "Scatter", min: 0, max: 1, step: 0.01, pct: true, hint: "0 drifts straight out from the circle; 100% any direction." },
      { key: "fadeFrom", label: "Fade starts", min: 0, max: 0.95, step: 0.01, pct: true, hint: "Earliest a piece starts to fade; each picks its own moment after that." },
      { key: "wind", label: "Wind", min: 0, max: 1, step: 0.01, pct: true, hint: "Pull toward the small handle. Drag it to aim." },
      { key: "windAngle", label: "Wind direction", min: -180, max: 180, step: 1, unit: "°", hint: "0 is right, -90 is up." },
      { key: "stagger", label: "Break from the circle", min: 0, max: 1, step: 0.01, pct: true, hint: "0 breaks everywhere at once; higher ripples out from the large circle." },
    ],
  },
];

// v2: the float model (16 Nov). Old v1 settings would carry the ripple defaults, so they are not read.
const STORE = "lab.pixel-break.v2";
const UI_STORE = "lab.pixel-break.ui.v1";
export function loadSettings(): PixelSettings {
  try {
    const raw = localStorage.getItem(STORE);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch { /* storage may be blocked */ }
  return { ...DEFAULTS };
}
const save = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* fine */ } };
type Ui = { dock: "left" | "right"; width: number; open: boolean };
function loadUi(): Ui {
  // Open on screens wide enough for the effect; folded on the phone, where the effect is off.
  const fallback: Ui = { dock: "right", width: 320, open: matchMedia("(min-width: 768px)").matches };
  try { const raw = localStorage.getItem(UI_STORE); if (raw) return { ...fallback, ...JSON.parse(raw) }; } catch { /* fine */ }
  return fallback;
}

const fmt = (sl: Slider, v: number) => (sl.pct ? `${Math.round(v * 100)}%` : `${Number.isInteger(sl.step) ? Math.round(v) : v.toFixed(1)}${sl.unit ?? ""}`);

export function PixelTuner({ engine }: { engine: PixelBreak }) {
  const [settings, setSettings] = useState<PixelSettings>(engine.settings);
  const [ui, setUi] = useState<Ui>(loadUi);
  const [frame, setFrame] = useState<Frame>(engine.frame());
  const [copied, setCopied] = useState<string | null>(null);
  const [wide, setWide] = useState(() => matchMedia("(min-width: 768px)").matches);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => engine.onFrame(setFrame), [engine]);
  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const f = (e: MediaQueryListEvent) => setWide(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  useEffect(() => save(UI_STORE, ui), [ui]);

  const update = useCallback((next: Partial<PixelSettings>) => {
    setSettings((cur) => {
      const merged = { ...cur, ...next };
      engine.set(next);
      save(STORE, merged);
      return merged;
    });
  }, [engine]);

  // Dragging the grip across the middle of the screen docks the panel on that side.
  const onGrip = (e: RPointerEvent) => {
    if (!wide) return;
    e.preventDefault();
    const move = (ev: PointerEvent) => {
      const side = ev.clientX < innerWidth / 2 ? "left" : "right";
      setUi((u) => (u.dock === side ? u : { ...u, dock: side }));
    };
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
  };
  // Dragging the inner edge sets the width, 260 to 560.
  const onResize = (e: RPointerEvent) => {
    e.preventDefault();
    const startX = e.clientX, startW = ui.width, dir = ui.dock === "right" ? -1 : 1;
    const move = (ev: PointerEvent) => setUi((u) => ({ ...u, width: Math.round(Math.min(560, Math.max(260, startW + dir * (ev.clientX - startX)))) }));
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
  };

  const json = JSON.stringify(settings, null, 2);
  const copy = async () => {
    try { await navigator.clipboard.writeText(json); setCopied("Copied"); }
    catch { setCopied("Select and copy below"); }
    setTimeout(() => setCopied(null), 2400);
  };
  const jump = (y: number) => scrollTo({ top: Math.max(0, y), behavior: "smooth" });

  const side = ui.dock === "right" ? "right-3" : "left-3";
  if (!ui.open) {
    return (
      <>
        {wide && <Handles frame={frame} settings={settings} update={update} hidden />}
        <button
          type="button"
          data-tuner-expand=""
          onClick={() => setUi((u) => ({ ...u, open: true }))}
          className={`lab-tuner fixed z-[60] ${wide ? `top-36 ${side}` : "bottom-3 right-3"} flex items-center gap-2 rounded-full border border-white/10 bg-neutral-850 px-3.5 py-2 text-[13px] text-neutral-100 shadow-[0_8px_30px_rgb(0_0_0/0.5)]`}
        >
          {ui.dock === "right" && wide ? <ChevronLeft className="size-4" /> : null}
          Pixel tuner
          {ui.dock === "left" && wide ? <ChevronRight className="size-4" /> : null}
          {!wide && <ChevronDown className="size-4 rotate-180" />}
        </button>
      </>
    );
  }

  return (
    <>
      {wide && <Handles frame={frame} settings={settings} update={update} />}
      <div
        ref={panelRef}
        data-tuner=""
        data-dock={ui.dock}
        role="region"
        aria-label="Pixel tuner"
        style={wide ? { width: ui.width } : undefined}
        className={`lab-tuner fixed z-[60] flex flex-col overflow-hidden border border-white/10 bg-neutral-850 text-neutral-100 shadow-[0_16px_50px_rgb(0_0_0/0.6)] ${
          wide ? `top-36 bottom-3 ${side} rounded-xl` : "inset-x-2 bottom-2 max-h-[58vh] rounded-xl"
        }`}
      >
        {wide && (
          <div
            data-tuner-resize=""
            onPointerDown={onResize}
            title="Drag to resize"
            className={`absolute inset-y-0 ${ui.dock === "right" ? "left-0" : "right-0"} z-10 w-1.5 cursor-ew-resize hover:bg-white/10`}
          />
        )}
        <header className="flex items-center gap-1 border-b border-white/[0.07] px-2 py-2">
          <div
            data-tuner-grip=""
            onPointerDown={onGrip}
            className={`flex min-w-0 flex-1 items-center gap-1.5 rounded-md px-1 py-1 ${wide ? "cursor-grab active:cursor-grabbing" : ""}`}
            title={wide ? "Drag to the other side to dock it there" : undefined}
          >
            {wide && <GripVertical className="size-4 shrink-0 text-neutral-550" />}
            <span className="truncate text-[13px] font-medium">Pixel breakup</span>
          </div>
          <button
            type="button"
            data-tuner-collapse=""
            onClick={() => setUi((u) => ({ ...u, open: false }))}
            className="rounded-md px-2 py-1 text-[12px] text-neutral-550 hover:bg-white/5 hover:text-neutral-100"
          >
            Hide
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-3">
          <Status frame={frame} wide={wide} onJump={jump} />
          <section className="mt-3 rounded-lg bg-neutral-800 px-3 py-2.5">
            <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-550">Layer</h3>
            <div role="radiogroup" aria-label="Layer" className="grid grid-cols-2 gap-1 rounded-md bg-neutral-900 p-1">
              {[["Over the work, inverting", 1], ["Under the work", 0]].map(([label, v]) => (
                <button
                  key={label as string}
                  type="button"
                  role="radio"
                  aria-checked={settings.over === v}
                  data-layer={v}
                  onClick={() => update({ over: v as number })}
                  className={`rounded px-2 py-1.5 text-[12px] leading-tight ${settings.over === v ? "bg-neutral-700 text-neutral-100" : "text-neutral-550 hover:text-neutral-100"}`}
                >
                  {label as string}
                </button>
              ))}
            </div>
          </section>
          {GROUPS.map((g) => (
            <section key={g.title} className="mt-3 rounded-lg bg-neutral-800 px-3 pb-1 pt-2.5">
              <h3 className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-550">{g.title}</h3>
              {g.sliders.map((sl) => (
                <label key={sl.key} htmlFor={`px-${sl.key}`} className="block py-2">
                  <span className="flex items-baseline justify-between gap-2 text-[12.5px]">
                    <span className="min-w-0 truncate">{sl.label}</span>
                    <span className="shrink-0 tabular-nums text-neutral-300">{fmt(sl, settings[sl.key])}</span>
                  </span>
                  <input
                    id={`px-${sl.key}`}
                    data-setting={sl.key}
                    type="range"
                    min={sl.min}
                    max={sl.max}
                    step={sl.step}
                    value={settings[sl.key]}
                    onChange={(e) => update({ [sl.key]: Number(e.target.value) } as Partial<PixelSettings>)}
                    className="lab-range mt-1.5 w-full"
                  />
                  <span className="mt-1 block text-[11.5px] leading-snug text-neutral-550">{sl.hint}</span>
                </label>
              ))}
            </section>
          ))}
          <section className="mt-3 rounded-lg bg-neutral-800 px-3 py-2.5 text-[12.5px]">
            <h3 className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-550">Circles</h3>
            <p className="leading-snug text-neutral-300">
              {wide
                ? "The large circle is the centre pieces drift away from (and the ripple start, if you raise Break from the circle). The small one aims the wind."
                : "The breakup runs from 768 px wide up; widen the window to see it."}
            </p>
            <p className="mt-1.5 tabular-nums text-neutral-550">
              {Math.round(settings.originX * 100)}% across, {Math.round(settings.originY * 100)}% down
            </p>
          </section>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" data-tuner-copy="" onClick={copy} className="flex items-center gap-1.5 rounded-md bg-neutral-100 px-3 py-1.5 text-[12.5px] font-medium text-neutral-900 hover:bg-neutral-000">
              <Copy className="size-3.5" /> {copied ?? "Copy settings"}
            </button>
            <button
              type="button"
              data-tuner-reset=""
              onClick={() => update({ ...DEFAULTS })}
              className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-[12.5px] text-neutral-100 hover:bg-white/5"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          </div>
          <textarea
            data-tuner-json=""
            readOnly
            value={json}
            aria-label="Settings as JSON"
            rows={4}
            className="mt-2 w-full resize-y rounded-md border border-white/[0.07] bg-neutral-900 p-2 font-mono text-[11px] leading-snug text-neutral-300"
          />
        </div>
      </div>
    </>
  );
}

function Status({ frame, wide, onJump }: { frame: Frame; wide: boolean; onJump: (y: number) => void }) {
  const label = !wide || frame.phase === "off"
    ? "Off under 768 px"
    : frame.phase === "drift" ? "Whole, drifting"
    : frame.phase === "break" ? `Floating, ${Math.round(frame.progress * 100)}%`
    : "Gone";
  const pct = frame.phase === "gone" ? 100 : frame.phase === "break" ? frame.progress * 100 : 0;
  return (
    <div className="mt-3 rounded-lg bg-neutral-800 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2 text-[12.5px]">
        <span data-tuner-phase={frame.phase} className="min-w-0 truncate">{label}</span>
        {wide && frame.phase !== "off" && <span className="tabular-nums text-neutral-550">{(frame.phase === "break" ? frame.drawn : frame.total).toLocaleString()} pieces</span>}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-700">
        <div className="h-full rounded-full bg-neutral-200 transition-[width] duration-150" style={{ width: `${pct}%` }} />
      </div>
      {wide && frame.phase !== "off" && (
        <div className="mt-2.5 flex gap-1.5">
          {[["Start", 0], ["Break", frame.sBreak - 80], ["Middle", (frame.sBreak + frame.sEnd) / 2], ["End", frame.sEnd]].map(([t, y]) => (
            <button
              key={t as string}
              type="button"
              onClick={() => onJump(y as number)}
              className="flex-1 rounded-md border border-white/[0.08] px-1 py-1 text-[11.5px] text-neutral-300 hover:bg-white/5 hover:text-neutral-100"
            >
              {t as string}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// The two circles on the page: the break point (large) and the wind aim (small, around the break point).
function Handles({ frame, settings, update, hidden }: { frame: Frame; settings: PixelSettings; update: (n: Partial<PixelSettings>) => void; hidden?: boolean }) {
  const { word, origin } = frame;
  const visible = !hidden && frame.phase !== "off" && word.w > 0 && origin.y > -40 && origin.y < innerHeight + 40;
  const reach = 90;
  const wa = (settings.windAngle * Math.PI) / 180;
  const windPos = { x: origin.x + Math.cos(wa) * (24 + reach * settings.wind), y: origin.y + Math.sin(wa) * (24 + reach * settings.wind) };

  const drag = (kind: "origin" | "wind") => (e: RPointerEvent) => {
    e.preventDefault();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    const move = (ev: PointerEvent) => {
      if (kind === "origin") {
        update({
          originX: Math.min(1, Math.max(0, (ev.clientX - word.x) / word.w)),
          originY: Math.min(1, Math.max(0, (ev.clientY - word.y) / word.h)),
        });
      } else {
        const dx = ev.clientX - origin.x, dy = ev.clientY - origin.y;
        update({ windAngle: Math.round((Math.atan2(dy, dx) * 180) / Math.PI), wind: Math.min(1, Math.max(0, (Math.hypot(dx, dy) - 24) / reach)) });
      }
    };
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
  };
  if (!visible) return null;
  return (
    <div className="lab-tuner pointer-events-none fixed inset-0 z-[55]" aria-hidden="true">
      <svg className="absolute inset-0 size-full overflow-visible">
        <line x1={origin.x} y1={origin.y} x2={windPos.x} y2={windPos.y} className="stroke-neutral-100/60" strokeWidth={1.5} strokeDasharray="3 3" />
      </svg>
      <div
        data-handle="origin"
        onPointerDown={drag("origin")}
        title="Break point: drag to move"
        style={{ left: origin.x, top: origin.y }}
        className="pointer-events-auto absolute size-9 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-neutral-100 bg-neutral-900/40 shadow-[0_0_0_4px_rgb(0_0_0/0.35)] backdrop-blur-[2px] active:cursor-grabbing"
      >
        <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100" />
      </div>
      <div
        data-handle="wind"
        onPointerDown={drag("wind")}
        title="Wind: drag to aim, further out pulls harder"
        style={{ left: windPos.x, top: windPos.y }}
        className="pointer-events-auto absolute size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-neutral-100 bg-neutral-900 active:cursor-grabbing"
      />
    </div>
  );
}
