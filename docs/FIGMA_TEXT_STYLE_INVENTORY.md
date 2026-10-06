# Figma text style inventory

Source inspected: 19 Sep 2026. Figma file `IarvWaqjIwrZ2afQmMxKm6`, page `VC`, Master frame `3461:7711`.

## Audit result

The Master contains 43 text nodes. After repair, 39 use named text styles, three display nodes use intentional per-character tracking and one lockup label is intentionally detached. The work-card titles were the only accidental detached interface text. Both are now attached to `Heading/24` in Figma and use the same fixed implementation token at every viewport.

Color variable bindings on the two work-card titles were already correct: Mondai uses `Neutral/050` and Haven uses `Neutral/100`. The problem was typography, not color.

## Node inventory

Format: node; text; Figma style; font; size; weight; line height; tracking; fill.

1. `3664:5191`; CHADWICK; custom display; Satoshi Medium; 302; 500; 100%; per-character; `#fbf7f8`.
2. `3664:5197`; hero biography; Label/14; Satoshi Medium; 14; 500; 140%; 2%; Neutral/050 and Neutral/500.
3. `3664:5199`; relocation line; Label/14; Satoshi Medium; 14; 500; 140%; 2%; Neutral/500.
4. `3664:5201`; HOME; Link/14; Satoshi Medium; 14; 500; 100%; 2%; Neutral/100.
5. `3664:5202`; ABOUT; Link/14; Satoshi Medium; 14; 500; 100%; 2%; Neutral/100.
6. `3664:5204`; contact; Link/14 with control emphasis; Satoshi Bold; 14; 700; 100%; 2%; Neutral/900.
7. `3614:21173`; hero biography duplicate; Label/14; Satoshi Medium; 14; 500; 140%; 2%; Neutral/050 and Neutral/500.
8. `3614:21175`; relocation line duplicate; Label/14; Satoshi Medium; 14; 500; 140%; 2%; Neutral/500.
9. `3614:21177`; HOME duplicate; Link/14; Satoshi Medium; 14; 500; 100%; 2%; Neutral/100.
10. `3614:21178`; ABOUT duplicate; Link/14; Satoshi Medium; 14; 500; 100%; 2%; Neutral/100.
11. `3614:21180`; contact duplicate; Link/14 with control emphasis; Satoshi Bold; 14; 700; 100%; 2%; Neutral/900.
12. `3652:4339`; Mondai work title; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/050.
13. `3671:5299`; case study collection marker; Metadata/Mono/12; Space Mono Regular; 12; 400; 112%; 1%; Neutral/100.
14. `3652:4344`; Mondai support; Label/14; Satoshi Medium; 14; 500; 140%; 2%; Neutral/200.
15. `3652:4360`; Haven work title; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/100.
16. `3652:4361`; Haven support; Label/14; Satoshi Medium; 14; 500; 140%; 2%; Neutral/200.
17. `3461:27898`; large Mondai; custom Display/212 tracking; Satoshi Medium; 212; 500; 100%; per-character; Neutral/100.
18. `3632:4177`; collection marker; Metadata/Mono/12; Space Mono Regular; 12; 400; 112%; 1%; Neutral/100 equivalent.
19. `3461:27905`; Mondai description; Body/16; Satoshi Medium; 16; 500; 140%; 1%; Neutral/400.
20. `3461:27911`; case number 1; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/100 with Neutral/050 range fill.
21. `3461:27912`; Leadership CS; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/100 with Neutral/050 range fill.
22. `3461:27917`; case number 2; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/100 with Neutral/050 range fill.
23. `3461:27918`; Framework CS; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/100 with Neutral/050 range fill.
24. `3461:27923`; case number 3; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/100 with Neutral/050 range fill.
25. `3461:27924`; Design system CS; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/100 with Neutral/050 range fill.
26. `3461:27987`; quote line 1; Heading/64; Satoshi Medium; 64; 500; 109%; minus 4%; Neutral/050.
27. `3461:27988`; quote line 2; Heading/64; Satoshi Medium; 64; 500; 109%; minus 4%; Neutral/050.
28. `3461:27990`; quote line 3; Heading/64; Satoshi Medium; 64; 500; 109%; minus 4%; Neutral/050.
29. `3500:6966`; About introduction; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/500.
30. `3461:27999`; Superpowers; custom Display/248 tracking; Satoshi Medium; 248; 500; 100%; per-character; Neutral/100.
31. `3654:4409`; superpower line 1; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/050.
32. `3654:4410`; superpower line 2; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/500.
33. `3654:4411`; superpower line 3; Heading/40; Satoshi Medium; 40; 500; 110%; minus 2%; Neutral/550.
34. `3461:28010`; Overview; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/100.
35. `3461:28011`; overview copy; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/100.
36. `3461:28014`; Current role; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/050.
37. `3461:28015`; current-role copy; Heading/24; Satoshi Medium; 24; 500; 132%; 0.2%; Neutral/100.
38. `3664:5149`; footer opportunity copy; Heading/20 with bold range emphasis; Satoshi Medium and Bold; 20; 500 and 700; 132%; 2%; Neutral/500 and Neutral/050.
39. `3664:5154`; plug lockup label; intentional detached display; Satoshi Medium; 41.525; 500; 100%; minus 5.5%; black.
40. `3664:5160`; Chicago, IL; Metadata/Mono/14; Space Mono Regular; 14; 400; 140%; 1%; Neutral/100.
41. `3664:5161`; local time; Metadata/Mono/14; Space Mono Regular; 14; 400; 140%; 1%; Neutral/100.
42. `3664:5165`; Linkedin; Metadata/Mono/14; Space Mono Regular; 14; 400; 140%; 1%; Neutral/100.
43. `3664:5168`; email; Metadata/Mono/14; Space Mono Regular; 14; 400; 140%; 1%; Neutral/100.

## Responsive rules

The work-card titles, labels, descriptions, hero metadata, navigation and footer metadata stay on their named Figma styles at every viewport. The footer opportunity copy also stays on Heading/20.

Responsive size tiers remain only for large narrative roles already approved for reflow: Heading/64 uses 64, 40 and 32; Heading/40 case rows use 40, 32 and 24; Heading/40 superpower statements use 40, 34 and 28; Heading/24 long-form About copy uses 24 and 18. The CHADWICK, Superpowers and large Mondai words remain art-directed display treatments.
