# Item 109: text that leaves or is cut inside Command Center cards: expected results, fixed before the code

Written 2026-10-20, before the test and the code of this item. Frontend only: no data, no generator, no payload.

## What was seen and measured

- NFL preview at 390 px, English: the row "Total points ⌄" ends 42 px past the card (all 10 cards); tennis "Total
  games ⌄" 23 px. Both already on the build before 45e951f (A11Y_REGRESSION_PREREGISTER.md, section of 2026-10-19).
- Tennis preview at 390 px: a long title ("Rafael Jodar vs Jiri Lehecka") runs under the badge; a long name in a
  30 px bar ("Alejandro Davidovich Fokina 44%") wraps to three lines and is cut top and bottom. Same on the
  build before 45e951f (item 92 noted the cut names). The card test of 108 does not see these: they are overlap
  and vertical cuts, not width.
- Causes, from the templates: the title has `white-space:nowrap`; the bar segments are 30 px high with text that
  may wrap; the footer row puts two `nowrap` blocks side by side with no wrap.

## The test (tools/measure/scan.js, `window.__overflow`), red on live before the fix

Per card, on every tab, 390 and 1024 px, English and Hebrew, the five Command Center pages and the hub:
- no descendant leaves the card (the descendant figure of 108 becomes a gate);
- no two text runs in the card overlap (bounding boxes of the text itself, not of its element);
- no text is cut in height: an element with overflow other than visible has scrollHeight <= clientHeight + 1.
It must fail on live (NFL, tennis).

## The fix

- Footer row (NFL, tennis): the row may wrap, so "Total points/games ⌄" goes to its own line when it does not fit.
- Tennis title: may wrap to a second line instead of running under the badge.
- Tennis bars: one line per segment, cut with an ellipsis when it does not fit; the full names stay in the title.
- MLB and the six classic pages are checked for the same pattern; a fix there only if the test finds one.

## Expected

0 on all three gates, on every page, width and language; the 108 child gate stays 0; tap targets under 44 stay
0; before and after screenshots of the same row at 390 px, English and Hebrew.

Nothing in this file is changed after the first code change; a later finding goes in a dated section.
