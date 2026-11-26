# Image check fix, 26 Nov (his yes on the site change card)

CI run 45702463649 failed `node scripts/check-images.mjs all` on 6 soft and 2 heavy pictures. All 8 are fixed;
no layout, copy, motion or CSS changed.

| Picture | Was | Now | Source |
| --- | --- | --- | --- |
| home/mondai-card-phone-laptop.webp | 817x1024, stretched 1.56x at 390 | 1634x2048, 144 KB | His cutout fill on 6437:24313 (Works phone frame, page CS), 3121x3912, with the same tone curve the old file had (fitted on the old file, 1.5 levels mean difference) |
| framework/timeline@2x.webp | 616x596, stretched 1.16x at 390 and 1.09x at tablet | 924x894 (3x, same crop and ratio), 132 KB | 6464:58710 in "framework cs", page CS, exported at 3x. Name kept so no markup changes; the capacity demo places its overlay in proportions, so it lines up |
| haven/program-texture-3x.webp | 591 KB | 455 KB, same 2679x1377 | Re-encoded, WebP quality 84 |
| haven/profile-background.webp | 568 KB | 484 KB, same 2040x2031 | Re-encoded, WebP quality 70 |

Right rail at 768 and 1024: not a soft picture. At tablet the img's content box is emptied with padding-left 100%
and his tablet export (right-rail-tablet.webp, 1200x1443) is drawn as its background, which already passed. The
check measured the img's border box, so it counted the hidden desktop file. It now measures the content box.
That also drops the same hidden img on Calendar setup, which is why 221 pictures are measured instead of 225.

Haven before and after, at the size drawn on a 2x screen: PSNR 35.9 dB (program texture) and 37.8 dB (profile
background) at 1440, 37.3 and 39.7 at 390. Side by side crops at 1440 in this folder (left before, right after);
no visible difference.

Note: `reports/nondev-safety-net/gates.mjs g7` used the soft laptop at 390 as its positive control and will now
report FAIL. It is a 17 Nov report gate, not part of CI.

Checks run locally: check-images all IMAGES_OK, npm run check OK (19 pages), verify-responsive health all OK.
