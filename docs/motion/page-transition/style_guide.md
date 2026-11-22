# Page change: style guide (provisional, 20 Nov)

Piece: moving from Home to the Mondai collection (/mondai/) and from the collection to the framework
case study (/mondai/framework/). Code: site/css/page-transition.css and site/js/page-transition.js.

## Where this came from
His 20 Nov words (via the lead session): "we did settle it, it basically never got fixed, there's a lot
of issues... we knew fix that space." Searched for that settled decision on 20 Nov and found nothing:
docs/DECISIONS.md, TRACKER.md, docs/SITE_BUILD_PLAN.md, reports/, docs/motion/, the prototypes, every
remote branch's files and commit messages, and his Wispr notes and meetings. The only nearby records:
the work card prototype says "Same tab, plain links, no transition yet" (16 Oct), and the Mondai motion
style guide only covers how each page arrives (text fades after a 0.35 s wait). So this is a proposal
built to be felt, not the settled version. It is replaced as soon as he names what was settled.

## What it does
- No flash between pages: the old page fades out into the page colour over 0.22 s while the new page
  fades in over it (0.42 s, starting at 0.12 s). Today the browser shows an empty frame between them.
- The title you clicked becomes the next page's title, in 0.7 s on an expo out curve: the Mondai card
  name on Home grows into the Mondai wordmark; the Framework CS card title grows into the case study's
  Framework CS heading. Only on a forward click; back and forward buttons get the plain fade, because the
  clicked title may be off screen by then.
- The arriving title skips the page entrance fade, so there is something to land on. The rest of the
  page still arrives as before.

## What not to take
- No wipe, slide or curtain over the whole page, no loading screen, no delay before the next page starts.
- No movement of images between pages: the card images do not match anything on the next page.

## Support
Chrome, Edge and Safari 18.2 and later draw it (cross document view transitions). Firefox changes page
as it does today. Reduced motion turns it off.
