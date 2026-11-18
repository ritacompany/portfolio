import { useEffect, useRef, useState, type RefObject } from "react";

type Props = { open: boolean; onClose: () => void; returnFocusRef: RefObject<HTMLElement | null> };

const FOCUSABLE = "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])";

// Phone menu, Figma 4928:11959, with the shared dialog behavior from site/js/dialog.js: focus moves
// in, Tab stays inside, Escape and the X close it, focus returns to the burger, the page is locked
// while it is open. A link closes it first so the jump lands with the page unlocked. Widening past
// 768 closes it, since it only exists on the phone.
export function MobileMenu({ open, onClose, returnFocusRef }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const restoreFocus = useRef(true);
  const wasOpen = useRef(false);

  // Mount, then set data-open a frame later so the CSS opacity transition runs; on close, drop
  // data-open and unmount after the transition. Nothing happens on first render while closed, so the
  // burger does not take focus on page load.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      restoreFocus.current = true;
      setMounted(true);
      const id = requestAnimationFrame(() => setShown(true));
      document.body.classList.add("is-locked");
      return () => cancelAnimationFrame(id);
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    setShown(false);
    document.body.classList.remove("is-locked");
    const t = setTimeout(() => setMounted(false), 600);
    if (restoreFocus.current) returnFocusRef.current?.focus({ preventScroll: true });
    return () => clearTimeout(t);
  }, [open, returnFocusRef]);

  useEffect(() => {
    if (open && mounted) closeRef.current?.focus({ preventScroll: true });
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const list = [...ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const inside = ref.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = matchMedia("(min-width: 768px)");
    const onWide = (e: MediaQueryListEvent) => {
      if (e.matches) {
        restoreFocus.current = false;
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [open, onClose]);

  const closeFromLink = () => {
    restoreFocus.current = false;
    onClose();
  };

  return (
    <div
      ref={ref}
      className="menu"
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!mounted}
      data-open={shown ? "" : undefined}
    >
      <div className="menu__bar">
        <a className="navbar__logo" href="/" aria-label="Chadwick Fenner, home">
          <img src="/assets/ui/logo.svg" alt="" />
        </a>
        <button ref={closeRef} className="navbar__menu menu__close" type="button" aria-label="Close menu" onClick={onClose}>
          <img src="/assets/ui/close.svg" alt="" width={14} height={14} />
        </button>
      </div>
      <nav className="menu__body" aria-label="Main">
        <ul className="menu__links">
          <li>
            <a className="link-footer link-footer-lg" href="#about" onClick={closeFromLink}>
              About
            </a>
          </li>
          <li>
            <a className="link-footer link-footer-lg" href="#work" onClick={closeFromLink}>
              Selected works
            </a>
          </li>
        </ul>
        <div className="menu__contact">
          <p className="footer__label">Contact</p>
          <a className="footer__email" href="mailto:hello@chadwickfenner.com">
            hello@chadwickfenner.com
          </a>
        </div>
      </nav>
    </div>
  );
}
