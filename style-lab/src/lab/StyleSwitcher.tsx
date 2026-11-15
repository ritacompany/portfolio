import { Button } from "@/components/ui/button";
import { styles } from "./registry";

// Shown with ?lab. Picking a style reloads the page with ?style=<id>, so every style starts from a clean
// page: no leftover scroll listeners, tweens or injected CSS from the one before.
export function StyleSwitcher({ active }: { active: string | null }) {
  const go = (id: string | null) => {
    const url = new URL(location.href);
    if (id) url.searchParams.set("style", id);
    else url.searchParams.delete("style");
    location.href = url.toString();
  };
  const current = styles.find((s) => s.id === active);
  return (
    <div
      data-lab-switcher=""
      className="fixed bottom-4 left-4 z-50 flex max-w-[min(560px,calc(100vw-2rem))] flex-col gap-2 rounded-lg border border-border bg-card/90 p-2 font-sans text-sm text-foreground backdrop-blur"
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
