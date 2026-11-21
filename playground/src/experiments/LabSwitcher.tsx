import { Button } from "@/components/ui/button";
import { experiments } from "./index";

// Shown with ?lab. Built from shadcn parts and Tailwind utilities on purpose: it is the live proof
// that 21st.dev style components render on top of the site CSS.
export function LabSwitcher({ active }: { active: string | null }) {
  const go = (id: string | null) => {
    const url = new URL(location.href);
    if (id) url.searchParams.set("x", id);
    else url.searchParams.delete("x");
    location.href = url.toString();
  };
  return (
    <div className="fixed bottom-4 left-4 z-50 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-lg border border-border bg-card/90 p-2 font-sans text-sm text-foreground backdrop-blur">
      <span className="px-2 text-muted-foreground">Lab</span>
      <Button size="sm" variant={active ? "ghost" : "secondary"} onClick={() => go(null)}>
        14 Nov
      </Button>
      {experiments.map((x) => (
        <Button key={x.id} size="sm" variant={active === x.id ? "secondary" : "ghost"} onClick={() => go(x.id)}>
          {x.name}
        </Button>
      ))}
      {!experiments.length && <span className="px-2 text-muted-foreground">no experiments yet</span>}
    </div>
  );
}
