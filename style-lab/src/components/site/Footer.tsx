import { useEffect, useRef } from "react";
import { startContactGoo } from "@/lib/contact-goo";

// Chicago time with seconds, ticking on each second boundary (was site/js/site.js).
const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago", hour: "numeric", minute: "2-digit", second: "2-digit", timeZoneName: "short",
});
function chicagoNow() {
  const parts = fmt.formatToParts(new Date());
  const g = (k: string) => parts.find((x) => x.type === k)?.value ?? "";
  return `${g("hour")}:${g("minute")}:${g("second")}${g("dayPeriod").toLowerCase()} ${g("timeZoneName")}`;
}

// Footer, Hero master instance 6109:21959, as the 14 Nov coded homepage draws it. Figma's instance lists
// Testimonials and hides Contact; Testimonials has no section yet, so the coded list (About, Selected
// works, Contact) stays, as it does on the 14 Nov site. Resume stays hidden until his file exists.
export function Footer() {
  const timeRef = useRef<HTMLTimeElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let id = 0;
    const tick = () => {
      const el = timeRef.current;
      if (el) { el.textContent = chicagoNow(); el.dateTime = new Date().toISOString(); }
    };
    const next = () => { tick(); id = window.setTimeout(next, 1000 - (Date.now() % 1000) + 20); };
    next();
    return () => clearTimeout(id);
  }, []);

  // The gooey split on the outlined Contact button (his pick 9 Nov); it never starts under reduced motion.
  useEffect(() => { if (rootRef.current) startContactGoo(rootRef.current); }, []);

  return (
    <footer ref={rootRef} className="footer" id="contact" data-section="footer">
      <div className="footer__main">
        <div className="footer__top layout-grid">
          <div className="layout-col-1 layout-span-5">
            <a className="footer__back" href="#top">
              <img src="/assets/ui/arrow-up.svg" alt="" />
              <span>Back to top</span>
            </a>
            <ul className="footer__nav">
              <li><a className="link-footer" href="#about">About</a></li>
              <li><a className="link-footer" href="#work">Selected works</a></li>
              <li><a className="link-footer" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer__contact layout-col-6 layout-span-3">
            <p className="footer__label">Contact</p>
            <a className="footer__email" href="mailto:hello@chadwickfenner.com">hello@chadwickfenner.com</a>
            <div className="footer__note">
              <p>I’m currently living in Chicago, IL</p>
              <p>and seeking opportunities in NYC.</p>
            </div>
            <a className="button" href="mailto:hello@chadwickfenner.com">
              <span className="button__icon" aria-hidden="true"><img src="/assets/ui/mail-asterisk.svg" alt="" /></span>
              <span className="button__label">Contact</span>
            </a>
          </div>
          <div className="footer__portraits layout-col-10 layout-span-3" aria-hidden="true">
            <span className="footer__pill"><span className="footer__frame"><img src="/assets/ui/footer-portrait.webp" alt="" /></span></span>
            <span className="footer__pill footer__pill-flip"><span className="footer__frame"><img src="/assets/ui/footer-portrait.webp" alt="" /></span></span>
          </div>
        </div>
        <img className="footer__wordmark" data-bleed="" src="/assets/ui/chdwck-master.svg" alt="" aria-hidden="true" />
        <div className="footer__bottom layout-grid">
          <p className="footer__meta layout-col-1 layout-span-3">@2026, Chadwick Fenner</p>
          <p className="footer__meta layout-col-4 layout-span-3"><time ref={timeRef}>10:24:00pm CST</time></p>
          <div className="footer__links">
            <p className="footer__label footer__links-label">Links</p>
            <a className="footer__out layout-col-7 layout-span-3" href="https://www.linkedin.com/in/chadwickfenner/">
              <img src="/assets/ui/arrow-out.svg" alt="" /><span>Linkedin</span>
            </a>
            <a className="footer__out layout-col-10 layout-span-3" href="#resume" hidden>
              <img src="/assets/ui/arrow-out.svg" alt="" /><span>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
