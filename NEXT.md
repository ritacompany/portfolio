# Next

1. Review the finished responsive homepage in `site/index.html`. The rules, the measured
   breakpoint causes and the verification evidence are in
   `docs/HOMEPAGE_RESPONSIVE_SPEC.md` under `Implemented responsive behaviour`.
2. Decide the MENU and CLOSE trigger labels. They were the agent's choice from the open
   variables list and can change without affecting the composition.
3. Approve the footer button copy and its destination, then replace the placeholder.
4. Supply the LinkedIn profile URL so the footer label can become a real link.
5. Run the small final fidelity audit that was deferred from the desktop milestone, now
   that responsiveness is complete.
6. Decide case study routes so the work cards and case rows can stop using same-page
   fragments.
7. Keep Vercel setup as a separate deployment task. The root scaffold still builds
   `public/` into `dist/`, so it does not yet publish `site/`.
8. Cross-browser smoke testing is still not verified. Only Chromium was available in the
   implementation environment.
