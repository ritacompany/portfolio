import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { styles } from "./registry";
import { activeStyleId, onStyleChange, setStyle } from "./runtime";

// Shown with ?lab. Picking a style switches live and goes back to the top: the running style is undone
// first (tweens reverted, listeners removed), so each starts from a clean page.
export function StyleSwitcher() {
  const [active, setActive] = useState(activeStyleId());
  // Folded on the phone, where the stuck styles do not apply and the card would cover the lede.
  const [open, setOpen] = useState(() => matchMedia("(min-width: 768px)").matches);
  useEffect(() => onStyleChange(setActive), []);
  const go = (id: string | null) => setStyle(id);
  const current = styles.find((s) => s.id === active);
  // Up in the empty band under the navbar from 768, so it never sits over CHDWCK, which is the thing
  // being judged; it folds to one small button when it is in the way.
  const place = "fixed bottom-4 left-4 z-50 md:bottom-auto md:left-auto md:top-16 md:right-4";
  if (!open) {
    return (
      <div data-lab-switcher="" className={place}>
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)} data-lab-toggle="">
          Styles: {current ? current.name : "Figma base"}
        </Button>
      </div>
    );
  }
  return (
    <div
      data-lab-switcher=""
      className={`${place} flex max-w-[min(560px,calc(100vw-2rem))] flex-col gap-2 rounded-lg border border-border bg-card/90 p-2 font-sans text-sm text-foreground backdrop-blur`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="px-2 text-muted-foreground">Style</span>
        <Button size="sm" variant={active ? "ghost" : "secondary"} onClick={() => go(null)}>
          Figma base
        </Button>
        {styles.map((s) => (
          <Button key={s.id} size="sm" variant={active === s.id ? "secondary" : "ghost"} onClick={() => go(s.id)} data-style-id={s.id}>
            {s.name}
          </Button>
        ))}
        <Button size="sm" variant="ghost" className="ml-auto text-muted-foreground" onClick={() => setOpen(false)} data-lab-toggle="">
          Hide
        </Button>
      </div>
      <p className="px-2 pb-1 text-muted-foreground" data-lab-remember="">
        {current ? current.remember : "His Hero master as drawn: no motion beyond the 14 Nov states."}
        {current?.reference && (
          <>
            {" "}
            <a className="underline" href={current.reference.url} target="_blank" rel="noreferrer">
              {current.reference.label}
            </a>
          </>
        )}
      </p>
    </div>
  );
}
