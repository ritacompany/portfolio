// Framer code components for the two buttons in liquid-buttons.html.
// In Framer: Assets, Code, New code file, paste this whole file. Both components appear in the
// Assets panel with their property controls. Written against Framer's documented component API;
// not yet run inside Framer, so expect to tune numbers in the panel, not to debug logic.
import { addPropertyControls, ControlType } from "framer"
import { useEffect, useRef } from "react"

// Button one: the gooey split. Two layers, same geometry; only the shape layer is filtered,
// so the text stays crisp.
export function GooeyButton(props) {
    const { label, color, ink, height, restGap, hoverGap, duration, link } = props
    const id = useRef("goo" + Math.random().toString(36).slice(2)).current
    const t = `transform ${duration}ms cubic-bezier(0.25,1,0.5,1)`
    const style = `
      .${id}{position:relative;display:inline-grid;grid-template-columns:auto ${height}px;align-items:center;height:${height}px;border:0;background:none;padding:0;color:${ink};font:inherit;cursor:pointer;text-decoration:none;isolation:isolate}
      .${id} .s{position:absolute;inset:0;filter:url(#${id}f);pointer-events:none}
      .${id} .p,.${id} .d{position:absolute;top:0;height:${height}px;background:${color};border-radius:999px}
      .${id} .p{left:0;right:${height}px}
      .${id} .d{right:0;width:${height}px;transform:translateX(${restGap}px);transition:${t}}
      .${id} .l{position:relative;padding:0 ${Math.round(height * 0.43)}px;white-space:nowrap}
      .${id} .i{position:relative;width:${height}px;height:${height}px;display:grid;place-items:center;transform:translateX(${restGap}px);transition:${t}}
      .${id}:hover .d,.${id}:hover .i{transform:translateX(${hoverGap}px)}
      @media (prefers-reduced-motion: reduce){.${id} .d,.${id} .i{transition:none}}
    `
    return (
        <a className={id} href={link || undefined} style={{ fontSize: props.fontSize, fontWeight: 500 }}>
            <style>{style}</style>
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
                <filter id={id + "f"} x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
                    <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="g" />
                    <feComposite in="SourceGraphic" in2="g" operator="atop" />
                </filter>
            </svg>
            <span className="s" aria-hidden="true"><span className="p" /><span className="d" /></span>
            <span className="l">{label}</span>
            <span className="i" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
            </span>
        </a>
    )
}
GooeyButton.defaultProps = { label: "Gooey liquid button", color: "#e4e4e4", ink: "#111111", height: 56, fontSize: 16, restGap: -10, hoverGap: 14, duration: 560, link: "" }
addPropertyControls(GooeyButton, {
    label: { type: ControlType.String, title: "Label" },
    link: { type: ControlType.Link, title: "Link" },
    color: { type: ControlType.Color, title: "Pill" },
    ink: { type: ControlType.Color, title: "Text" },
    height: { type: ControlType.Number, title: "Height", min: 32, max: 96, step: 1 },
    fontSize: { type: ControlType.Number, title: "Font size", min: 10, max: 40, step: 1 },
    restGap: { type: ControlType.Number, title: "Rest gap", min: -40, max: 20, step: 1, description: "Negative sinks the circle into the pill." },
    hoverGap: { type: ControlType.Number, title: "Hover gap", min: 0, max: 60, step: 1 },
    duration: { type: ControlType.Number, title: "Duration", min: 100, max: 1500, step: 10, unit: "ms" },
})

// Button two: the liquid outline. A ring of points on springs drawn as an SVG path.
// No fill under the outline; set Fill to a colour if you ever want the original's look.
export function LiquidOutlineButton(props) {
    const { label, stroke, strokeWidth, fill, width, height, reach, tension, neighbour, damping, radius, pushMax, follow, link, fontSize, textColor } = props
    const host = useRef(null)
    const pathRef = useRef(null)
    const W = width + reach * 2, H = height + reach * 2

    useEffect(() => {
        const el = host.current, path = pathRef.current
        if (!el || !path) return
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const w = width, h = height, r = h / 2, count = 60
        const straight = w - h, arc = Math.PI * r, total = 2 * straight + 2 * arc
        const pts = []
        for (let i = 0; i < count; i++) {
            const s = (i / count) * total
            let x, y, nx, ny
            if (s < straight) { x = r + s; y = 0; nx = 0; ny = -1 }
            else if (s < straight + arc) { const a = (s - straight) / r - Math.PI / 2; nx = Math.cos(a); ny = Math.sin(a); x = w - r + nx * r; y = r + ny * r }
            else if (s < 2 * straight + arc) { x = w - r - (s - straight - arc); y = h; nx = 0; ny = 1 }
            else { const b = (s - 2 * straight - arc) / r + Math.PI / 2; nx = Math.cos(b); ny = Math.sin(b); x = r + nx * r; y = r + ny * r }
            pts.push({ rx: x + reach, ry: y + reach, nx, ny, x: x + reach, y: y + reach, vx: 0, vy: 0 })
        }
        const mouse = { x: -1e4, y: -1e4, px: -1e4, py: -1e4, inside: false }
        let running = false, still = 0, raf = 0

        const draw = () => {
            const n = pts.length
            let d = "M" + pts[0].x.toFixed(2) + " " + pts[0].y.toFixed(2)
            for (let i = 0; i < n; i++) {
                const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
                d += "C" + (p1.x + (p2.x - p0.x) / 6).toFixed(2) + " " + (p1.y + (p2.y - p0.y) / 6).toFixed(2) + " " +
                    (p2.x - (p3.x - p1.x) / 6).toFixed(2) + " " + (p2.y - (p3.y - p1.y) / 6).toFixed(2) + " " + p2.x.toFixed(2) + " " + p2.y.toFixed(2)
            }
            path.setAttribute("d", d + "Z")
        }
        const step = () => {
            const mvx = mouse.inside && mouse.px > -1e3 ? mouse.x - mouse.px : 0
            const mvy = mouse.inside && mouse.py > -1e3 ? mouse.y - mouse.py : 0
            let energy = 0
            const n = pts.length
            for (let i = 0; i < n; i++) {
                const p = pts[i], prev = pts[(i - 1 + n) % n], next = pts[(i + 1) % n]
                let tx = p.rx, ty = p.ry, f = 0
                if (mouse.inside) {
                    const dist = Math.hypot(p.rx - mouse.x, p.ry - mouse.y)
                    if (dist < radius) { f = 1 - dist / radius; f = f * f * (3 - 2 * f); tx += p.nx * f * pushMax; ty += p.ny * f * pushMax }
                }
                const dx = tx - p.x, dy = ty - p.y
                const ndx = ((prev.x - prev.rx) + (next.x - next.rx)) / 2 - (p.x - p.rx)
                const ndy = ((prev.y - prev.ry) + (next.y - next.ry)) / 2 - (p.y - p.ry)
                p.vx += dx * tension + ndx * neighbour + mvx * follow * f
                p.vy += dy * tension + ndy * neighbour + mvy * follow * f
                p.vx *= damping; p.vy *= damping
                p.x += p.vx; p.y += p.vy
                energy += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.rx - p.x) + Math.abs(p.ry - p.y)
            }
            mouse.px = mouse.x; mouse.py = mouse.y
            draw()
            still = energy < 0.05 * n && !mouse.inside ? still + 1 : 0
            if (still > 10) { for (const p of pts) { p.x = p.rx; p.y = p.ry; p.vx = p.vy = 0 } draw(); running = false; return }
            raf = requestAnimationFrame(step)
        }
        const wake = () => { if (!running && !reduced) { running = true; still = 0; raf = requestAnimationFrame(step) } }
        const onMove = (e) => {
            const b = el.getBoundingClientRect()
            mouse.x = (e.clientX - b.left) * (W / b.width)
            mouse.y = (e.clientY - b.top) * (H / b.height)
            mouse.inside = true
            wake()
        }
        const onLeave = () => { mouse.inside = false; mouse.x = mouse.y = -1e4 }
        el.addEventListener("pointermove", onMove)
        el.addEventListener("pointerleave", onLeave)
        draw()
        return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); cancelAnimationFrame(raf) }
    }, [width, height, reach, tension, neighbour, damping, radius, pushMax, follow, W, H])

    return (
        <div ref={host} style={{ position: "relative", width: W, height: H }}>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden="true">
                <path ref={pathRef} d="" fill={fill} stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" />
            </svg>
            <a href={link || undefined} style={{ position: "absolute", inset: reach, display: "grid", placeItems: "center", borderRadius: 999, color: textColor, fontSize, fontWeight: 500, textDecoration: "none", cursor: "pointer" }}>
                {label}
            </a>
        </div>
    )
}
LiquidOutlineButton.defaultProps = { label: "Liquid button", stroke: "#ffffff", strokeWidth: 1.25, fill: "none", textColor: "#ffffff", fontSize: 14, width: 200, height: 56, reach: 48, tension: 0.06, neighbour: 0.10, damping: 0.84, radius: 72, pushMax: 16, follow: 0.18, link: "" }
addPropertyControls(LiquidOutlineButton, {
    label: { type: ControlType.String, title: "Label" },
    link: { type: ControlType.Link, title: "Link" },
    stroke: { type: ControlType.Color, title: "Outline" },
    strokeWidth: { type: ControlType.Number, title: "Outline width", min: 0.5, max: 6, step: 0.25 },
    fill: { type: ControlType.String, title: "Fill", description: "none, or a colour to bring back the original's liquid fill." },
    textColor: { type: ControlType.Color, title: "Text" },
    fontSize: { type: ControlType.Number, title: "Font size", min: 10, max: 40, step: 1 },
    width: { type: ControlType.Number, title: "Width", min: 80, max: 600, step: 1 },
    height: { type: ControlType.Number, title: "Height", min: 32, max: 120, step: 1 },
    reach: { type: ControlType.Number, title: "Reach", min: 0, max: 120, step: 1, description: "How far outside the pill the pointer still pulls the edge." },
    tension: { type: ControlType.Number, title: "Tension", min: 0.01, max: 0.3, step: 0.01 },
    neighbour: { type: ControlType.Number, title: "Spread", min: 0, max: 0.4, step: 0.01 },
    damping: { type: ControlType.Number, title: "Viscosity", min: 0.5, max: 0.98, step: 0.01, description: "Lower is thicker." },
    radius: { type: ControlType.Number, title: "Pointer reach", min: 10, max: 200, step: 1 },
    pushMax: { type: ControlType.Number, title: "Bulge", min: 0, max: 60, step: 1, unit: "px" },
    follow: { type: ControlType.Number, title: "Drag", min: 0, max: 2, step: 0.05 },
})
