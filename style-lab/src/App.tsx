import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { SelectedWorks } from "@/components/site/SelectedWorks";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";
import { MobileMenu } from "@/components/site/MobileMenu";
import { runStyle, showSwitcher } from "@/lab/runtime";
import { StyleSwitcher } from "@/lab/StyleSwitcher";

// The whole homepage from his Hero master frame: hero, Selected works, About and footer. A style from
// src/lab/styles can change how it moves, scrolls, breathes and accents, never what it says or how its
// type and colour look.
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => (canvasRef.current ? runStyle(canvasRef.current) : undefined), []);

  return (
    <>
      <div ref={canvasRef} className="canvas home" id="top">
        <Header heroRef={heroRef} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} menuButtonRef={menuButtonRef} />
        <main>
          <Hero ref={heroRef} />
          <SelectedWorks />
          <About />
        </main>
        <Footer />
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} returnFocusRef={menuButtonRef} />
      {showSwitcher && <StyleSwitcher />}
    </>
  );
}
