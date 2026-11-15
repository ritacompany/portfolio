import { useRef, useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWorks } from "@/components/site/SelectedWorks";
import { MobileMenu } from "@/components/site/MobileMenu";
import { experiments } from "@/experiments";
import { LabSwitcher } from "@/experiments/LabSwitcher";

const params = new URLSearchParams(location.search);
const active = experiments.find((x) => x.id === params.get("x")) ?? null;

// The homepage canvas as the 14 Nov site draws it, cut to the two sections in play: the hero and
// Selected works. About and the footer stay in the plain HTML site for now. An experiment from
// src/experiments can stand in for either section.
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const HeroSection = active?.Hero ?? Hero;
  const WorksSection = active?.Works ?? SelectedWorks;

  return (
    <>
      <div className="canvas home" id="top">
        <Header heroRef={heroRef} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} menuButtonRef={menuButtonRef} />
        <main>
          <HeroSection ref={heroRef} />
          <WorksSection />
        </main>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusRef={menuButtonRef} />
      {params.has("lab") && <LabSwitcher active={active?.id ?? null} />}
    </>
  );
}
