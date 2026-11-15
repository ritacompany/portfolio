import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
  menuOpen: boolean;
  onMenuOpen: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
};

// Navbar, Figma 5812:22876. The last letter of each label is a mirrored digit (ABOU7, WORK5,
// CONTACT M3); screen readers get the plain word. Under 768 the bar scrolls away with the hero and
// drops back in, fixed, once the hero's last 50 px are under it (was site/js/home-phone.js).
export function Header({ heroRef, menuOpen, onMenuOpen, menuButtonRef }: Props) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: "-50px 0px 0px 0px" },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [heroRef]);

  return (
    <header className={cn("page-header", pastHero && "is-past-hero")}>
      <nav className="navbar layout-grid" aria-label="Main">
        <a className="navbar__logo layout-col-1" href="/" aria-label="Chadwick Fenner, home">
          <img src="/assets/ui/logo.svg" alt="" />
        </a>
        <p className="navbar__role layout-col-4 layout-span-3">Product Designer</p>
        <ul className="navbar__links layout-col-8 layout-span-5">
          <li>
            <a className="link-nav" href="#about" aria-label="About">
              <span aria-hidden="true">Abou<span className="mirror">7</span></span>
            </a>
          </li>
          <li>
            <a className="link-nav" href="#work" aria-label="Work">
              <span aria-hidden="true">Work<span className="mirror">5</span></span>
            </a>
          </li>
          <li>
            <a className="link-nav" href="#contact" aria-label="Contact me">
              <span aria-hidden="true">
                Contact<span className="gap">m<span className="mirror">3</span></span>
              </span>
            </a>
          </li>
        </ul>
        <button
          ref={menuButtonRef}
          className="navbar__menu"
          type="button"
          aria-label="Menu"
          aria-controls="site-menu"
          aria-expanded={menuOpen}
          onClick={onMenuOpen}
        >
          <img src="/assets/ui/menu.svg" alt="" width={18} height={12} />
        </button>
      </nav>
    </header>
  );
}
