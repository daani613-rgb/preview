# ITEM110_PREREGISTER.md: labels cut inside the probability bars (KNOWN_DEFECTS 110)

Written 2026-10-20, before the code.

## The defect (measured on live, 2026-10-20, 390 px)

- NFL card bar: the segment of 18% is 46 px wide and its label "IND 18%" needs 48 px (scrollWidth 48, clientWidth
  46): cut sideways. NBA has the same template ("PHI 18%" on 2026-10-20), and so has MLB.
- Tennis: the name sits in an ellipsis span next to the percentage; in a narrow segment the name span shrinks to
  nothing and only the percentage shows.
- Sub-item (3) of 110, the World Cup classic page: checked on 2026-10-20 (33 cards, gates 0). Closed here.

## The test (red on live before the code, green after)

`tools/measure/scan.js` `__overflow` gets one more gate, `barCut`. A bar is an element inside a card with display
flex, overflow hidden, a height of 20 to 34 px and two children or more; each child is a segment. For each
segment shown (width 1 px or more):
- the segment is cut if its scrollWidth is more than its clientWidth + 1 (text wider than the segment);
- a label inside it is cut if it is shown, has text, its scrollWidth is more than its clientWidth + 1 and less than
  21 px of it is visible (under 3 characters of the 12 px mono font: the name has vanished).
A label hidden on purpose (display none) is not cut. Run on NFL, NBA, tennis and MLB Command Center pages at 390 and
1024 px, English and Hebrew, every tab. MLB: checked if it has cards that day; if not, recorded as not checked.
Expected red on live: NFL at 390 (the 18% segment), tennis at 390 (narrow segments). Green: barCut 0 everywhere,
and the other gates of `__overflow` (109) and tap targets unchanged.

## The fix (display only, preview repo)

Chosen: CSS container queries on the segment (`container-type: inline-size`), so the label follows the width the
segment really has, at every screen width, with no script measuring. The other option, moving the label outside
the bar, changes the layout of the row and the reading of the bar; more change for the same result.

- NFL, NBA, MLB (team codes are already 2 or 3 letters): the label is two spans, the code and the percentage. Under
  56 px (the widest label "XXX 100%" in the 12 px mono font, about 6.9 px a character) the code is hidden and the
  percentage stays; under 28 px the percentage is hidden too (the other segment carries the reading, the card title
  carries both teams).
- Tennis: a 3-letter code is added in tennis/app.js (display only, not in the payload): the first three letters of
  the surname (the last word of the name, letters only, upper case). Over 110 px: the name with its ellipsis, as now;
  from 67 to 110 px: the code and the percentage; from 40 to 67 px: the percentage only; under 40 px: nothing.
- No payload, engine or data change. hub.app.js and the root site are not touched.

## Not touched

Engines, payload, line 2 of any app.js, hub.app.js, rootsite, A+ logic, stage filters.
