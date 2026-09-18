/**
 * Shared browser-side probes for the responsive homepage checks.
 *
 * Everything here runs inside the page via page.evaluate, so it must stay
 * dependency free and serialisable.
 */

/** Widths used for the continuous stress sweep and the structural checks. */
export const SWEEP_WIDTHS = [
  320, 340, 360, 375, 390, 412, 430, 480, 540, 600, 640, 700, 768, 800, 834,
  900, 960, 1000, 1024, 1100, 1150, 1194, 1199, 1200, 1280, 1366, 1434, 1440,
  1512, 1600, 1728, 1800, 1920, 1921, 2048
];

/** Viewports with explicit heights, including landscape phones and tablets. */
export const DEVICE_VIEWPORTS = [
  { name: "iphone-se-portrait", width: 320, height: 568 },
  { name: "iphone-12-mini-portrait", width: 360, height: 780 },
  { name: "iphone-14-portrait", width: 390, height: 844 },
  { name: "iphone-14-landscape", width: 844, height: 390 },
  { name: "iphone-14-promax-portrait", width: 430, height: 932 },
  { name: "iphone-14-promax-landscape", width: 932, height: 430 },
  { name: "ipad-portrait", width: 768, height: 1024 },
  { name: "ipad-landscape", width: 1024, height: 768 },
  { name: "ipad-pro-portrait", width: 834, height: 1194 },
  { name: "laptop-short", width: 1194, height: 775 },
  { name: "desktop-1440", width: 1440, height: 800 },
  { name: "desktop-1440-tall", width: 1440, height: 1000 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "desktop-2048", width: 2048, height: 1152 }
];

/**
 * Elements whose visual overflow is art directed and must not be reported.
 * These are the approved display words plus their clipping frames.
 */
export const INTENTIONAL_OVERFLOW = [
  ".hero h1",
  // The frame is the approved cropping mechanism for the Superpowers word.
  // Verified at 390 and 1440: the left overlap is intentional and the lower
  // letterforms are complete, with 41.7 pixels of clearance at the reference.
  ".superpowers-heading-frame",
  ".footer-callout h2",
  ".mondai-title"
];

/** Geometry probes compared between the accepted study and the canonical page. */
export const REGRESSION_PROBES = [
  { name: "logo", canonical: ".site-logo", study: ".wide-logo" },
  { name: "nav", canonical: ".site-navigation", study: ".wide-navigation" },
  { name: "nav-contact", canonical: ".nav-contact", study: ".wide-nav-contact" },
  { name: "bio", canonical: ".hero-bio", study: ".wide-bio" },
  { name: "relocation", canonical: ".hero-relocation", study: ".wide-relocation" },
  { name: "chadwick", canonical: ".hero h1", study: ".wide-hero h1" },
  { name: "hero", canonical: ".hero", study: ".wide-hero" },
  { name: "work", canonical: ".work", study: ".wide-work" },
  { name: "mondai-card-link", canonical: "#mondai-card .card-link", study: "#mondai-card .wide-card-link" },
  { name: "mondai-card-image", canonical: "#mondai-card .project-image", study: "#mondai-card .wide-project-image" },
  { name: "mondai-card-title", canonical: "#mondai-card .project-title", study: "#mondai-card .wide-project-title" },
  { name: "mondai-card-desc", canonical: "#mondai-card .project-description", study: "#mondai-card .wide-project-description" },
  { name: "mondai-card-view", canonical: "#mondai-card .project-view", study: "#mondai-card .wide-project-view" },
  { name: "haven-card-link", canonical: "#haven-card .card-link", study: "#haven-card .wide-card-link" },
  { name: "haven-card-image", canonical: "#haven-card .project-image", study: "#haven-card .wide-project-image" },
  { name: "mondai-section", canonical: ".mondai", study: ".wide-mondai" },
  { name: "mondai-title", canonical: ".mondai-title", study: ".wide-mondai-title" },
  { name: "mondai-description", canonical: ".mondai-description", study: ".wide-mondai-description" },
  { name: "mondai-label", canonical: ".mondai-label", study: ".wide-mondai-label" },
  { name: "case-list", canonical: ".case-list", study: ".wide-case-list" },
  { name: "case-1-number", canonical: "#leadership-case .case-number", study: "#leadership-case .wide-case-number" },
  { name: "case-1-title", canonical: "#leadership-case .case-title", study: "#leadership-case .wide-case-title" },
  { name: "case-1-arrow", canonical: "#leadership-case .case-arrow", study: "#leadership-case .wide-case-arrow" },
  { name: "case-3-title", canonical: "#design-system-case .case-title", study: "#design-system-case .wide-case-title" },
  { name: "quote-1", canonical: ".quote-line:nth-child(1)", study: ".wide-quote-line:nth-child(1)" },
  { name: "quote-3", canonical: ".quote-last", study: ".wide-quote-last" },
  { name: "about-intro", canonical: ".about-intro", study: ".wide-about-intro" },
  { name: "portrait", canonical: ".portrait", study: ".wide-portrait" },
  { name: "superpowers-frame", canonical: ".superpowers-heading-frame", study: ".wide-superpowers-heading-frame" },
  { name: "superpowers-word", canonical: ".superpowers-heading-frame h2", study: ".wide-superpowers-heading-frame h2" },
  { name: "power-list", canonical: ".power-list", study: ".wide-power-list" },
  { name: "power-1", canonical: ".power-row:nth-child(1) p", study: ".wide-power-row:nth-child(1) p" },
  { name: "power-3", canonical: ".power-row:nth-child(3) p", study: ".wide-power-row:nth-child(3) p" },
  { name: "overview-label", canonical: ".overview-main .overview-label", study: ".wide-overview-main .wide-overview-label" },
  { name: "overview-copy", canonical: ".overview-main .overview-copy", study: ".wide-overview-main .wide-overview-copy" },
  { name: "role-copy", canonical: ".role-row .overview-copy", study: ".wide-role-row .wide-overview-copy" },
  { name: "footer-callout", canonical: ".footer-callout", study: ".wide-footer-callout" },
  { name: "outro", canonical: ".footer-callout h2", study: ".wide-footer-callout h2" },
  { name: "footer-button", canonical: ".footer-callout button", study: ".wide-footer-callout button" },
  { name: "footer-contact", canonical: ".footer-contact", study: ".wide-footer-contact" },
  { name: "location", canonical: ".footer-location", study: ".wide-location" },
  { name: "contact-links", canonical: ".contact-links", study: ".wide-contact-links" }
];

/**
 * Freeze Date so the Chicago clock renders one stable string. Installed as an
 * init script so it is in place before the page's own module runs.
 */
export const FREEZE_CLOCK = `
  (() => {
    const FIXED = new Date("2026-09-13T22:24:00.000Z").getTime();
    const RealDate = Date;
    class FrozenDate extends RealDate {
      constructor(...args) {
        if (args.length === 0) super(FIXED);
        else super(...args);
      }
      static now() { return FIXED; }
    }
    globalThis.Date = FrozenDate;
  })();
`;

/**
 * Collect layout defects for the current viewport. Returns plain data.
 */
export const COLLECT_DEFECTS = `
  (allowList) => {
    const defects = [];
    const docEl = document.documentElement;
    const viewport = docEl.clientWidth;

    const add = (kind, selector, detail) => defects.push({ kind, selector, detail });

    const describe = (el) => {
      if (!el || el === document.body) return "body";
      const id = el.id ? "#" + el.id : "";
      const cls = typeof el.className === "string" && el.className
        ? "." + el.className.trim().split(/\\s+/).join(".")
        : "";
      return el.tagName.toLowerCase() + id + cls;
    };

    const allowed = (el) => allowList.some((sel) => el.matches(sel) || el.closest(sel));

    // 1. Horizontal document overflow.
    if (docEl.scrollWidth > viewport + 0.5) {
      add("horizontal-overflow", "document",
        "scrollWidth " + docEl.scrollWidth + " exceeds clientWidth " + viewport);
    }

    // 2. Any element whose border box crosses the viewport edges without an
    //    approved art-direction exemption.
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (allowed(el)) continue;
      if (rect.right > viewport + 0.5) {
        add("element-past-right", describe(el),
          "right " + rect.right.toFixed(2) + " > viewport " + viewport);
      }
      if (rect.left < -0.5) {
        add("element-past-left", describe(el), "left " + rect.left.toFixed(2));
      }
    }

    // 3. Clipped text: an element that hides its own overflow while its content
    //    is larger than its box.
    for (const el of document.querySelectorAll("p, h1, h2, h3, span, a, time, li, div")) {
      if (allowed(el)) continue;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      const hidesX = style.overflowX === "hidden" || style.overflowX === "clip";
      const hidesY = style.overflowY === "hidden" || style.overflowY === "clip";
      if (!hidesX && !hidesY) continue;
      if (!el.textContent || !el.textContent.trim()) continue;
      if (hidesX && el.scrollWidth > el.clientWidth + 1) {
        add("clipped-text-x", describe(el),
          "scrollWidth " + el.scrollWidth + " > clientWidth " + el.clientWidth);
      }
      if (hidesY && el.scrollHeight > el.clientHeight + 1) {
        add("clipped-text-y", describe(el),
          "scrollHeight " + el.scrollHeight + " > clientHeight " + el.clientHeight);
      }
    }

    // 4. Distorted media: a raster image whose box ratio differs from its
    //    intrinsic ratio while object-fit would stretch it.
    for (const img of document.querySelectorAll("img")) {
      const style = getComputedStyle(img);
      if (style.display === "none") continue;
      const rect = img.getBoundingClientRect();
      if (!rect.width || !rect.height || !img.naturalWidth || !img.naturalHeight) continue;
      const boxRatio = rect.width / rect.height;
      const trueRatio = img.naturalWidth / img.naturalHeight;
      const fit = style.objectFit;
      const isVector = /\\.svg(\\?|$)/i.test(img.currentSrc || img.src || "");
      if (!isVector && fit === "fill" && Math.abs(boxRatio - trueRatio) / trueRatio > 0.02) {
        add("distorted-image", describe(img),
          "box ratio " + boxRatio.toFixed(3) + " vs intrinsic " + trueRatio.toFixed(3) +
          " with object-fit: fill");
      }
    }

    // 5. Failed images.
    for (const img of document.querySelectorAll("img")) {
      if (img.complete && img.naturalWidth === 0) {
        add("broken-image", describe(img), img.getAttribute("src") || "no src");
      }
    }

    // 6. Interaction targets smaller than 44 CSS pixels in either axis.
    const interactive = document.querySelectorAll(
      "a[href], button, [role=button], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    );
    for (const el of interactive) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (el.closest("[hidden]")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;
      if (rect.height < 43.5 || rect.width < 43.5) {
        add("small-target", describe(el),
          rect.width.toFixed(1) + " by " + rect.height.toFixed(1));
      }
    }

    // 7. Overlapping interactive targets.
    const boxes = [];
    for (const el of interactive) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (el.closest("[hidden]")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      boxes.push({ el, rect });
    }
    for (let i = 0; i < boxes.length; i += 1) {
      for (let j = i + 1; j < boxes.length; j += 1) {
        const a = boxes[i];
        const b = boxes[j];
        if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
        const overlapX = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
        const overlapY = Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top);
        if (overlapX > 1 && overlapY > 1) {
          add("overlapping-targets", describe(a.el) + " and " + describe(b.el),
            overlapX.toFixed(1) + " by " + overlapY.toFixed(1) + " overlap");
        }
      }
    }

    return defects;
  }
`;

/** Geometry snapshot for a named probe list. */
export const COLLECT_GEOMETRY = `
  (probes) => {
    const out = {};
    for (const probe of probes) {
      const el = document.querySelector(probe.selector);
      if (!el) { out[probe.name] = null; continue; }
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      out[probe.name] = {
        x: Math.round((rect.left + window.scrollX) * 100) / 100,
        y: Math.round((rect.top + window.scrollY) * 100) / 100,
        width: Math.round(rect.width * 100) / 100,
        height: Math.round(rect.height * 100) / 100,
        fontSize: style.fontSize,
        lines: el.getClientRects().length
      };
    }
    return out;
  }
`;
