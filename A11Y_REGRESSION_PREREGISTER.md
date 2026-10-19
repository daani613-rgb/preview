# Item 108: card content wider than the card on the Command Center pages: expected results, fixed before the code

Written 2026-10-19, before any measurement or code of this item.

## What was seen

Samuel, iPhone, preview/nfl, English, 2026-10-19: in every game card the content is wider than the card and is cut
on both sides by the same amount ("C @ KC" for "LAC @ KC", "e"/"et" for Engine/Market, "s an A+ call", "A+ · str",
"LAC 2", "Total poin", "corre"). The floating "↑ Top" button covers a card's tag (item 92).

## Hypothesis (to check, not assumed)

`assets/a11y.css` (commit 45e951f, 2026-10-13) gives every `[role=button]` without "display" in its inline style
`display: inline-flex; align-items: center; justify-content: center`. The game card is a `role="button"` element
whose inline style has no display. As a flex container its children stop stretching to the card's width, take their
max-content width, are centred, and the widest ones overflow both edges equally and are clipped by the card.

## Checks

1. Live preview/nfl at 390 px, three game cards: role, display, align-items, justify-content of the card; the card's
   width against its widest child. The same on a local build of the commit before 45e951f. If the hypothesis is not
   confirmed: stop, report what does cause it, no fix.
2. The full list, on the five Command Center pages and the hub, of `[role=button]` elements wider than 120 px or with
   more than two children: what the rule caught that it was not meant for.
3. A red test (tools/measure/scan.js): at 390 and 1024 px, English and Hebrew, on the five pages and the hub, for every
   card: scrollWidth <= clientWidth, and every child's box inside the card's box. It must fail on the live code.

## The fix and the expected result

The rule gives a minimum size only and changes neither display nor alignment of an element that has its own layout;
or it excludes the cards by name. The simpler of the two is taken. Expected after the fix:
- no child wider than its card, on every page, both widths, both languages;
- the full tap-target scan of 2026-10-13 (13 pages) still finds 0 targets under 44 px; "This week" on NFL stays 44 px;
- "↑ Top" no longer sits on a card's content, if the fix is simple (bottom padding or position); otherwise recorded
  and skipped.

Nothing in this file is changed after the first code change; a later finding goes in a dated section.

## 2026-10-19: results (written after the code)

Check 1, confirmed. Live NFL at 390 px, English: the game card computes `display: flex; align-items: center;
justify-content: center`, card 362 px, widest child 381 px, 9 px out on each side. The build of 5ad9a6e (the commit
before 45e951f): `display: block`, every child inside the card.

Check 2. `[role=button]` wider than 120 px or with more than 2 children, live, 390 px, English: the game cards (NFL 5,
MLB 1, tennis 9 in the first tab; all with grid-column in their style, all hit by the rule); the tab bar items "⚡ ..."
(124 px, own display:flex, not hit); "How it works" on the hub (162 px, no children, hit, harmless); "Disclaimer &
privacy" on tennis and World Cup (128 px, no children, hit, harmless). Only the cards were caught by mistake.

Check 3, the test (tools/measure/scan.js, `window.__overflow`). A finding against this file: the build before 45e951f
already fails "scrollWidth <= clientWidth" at 390 px, English: the NFL row "Total points ⌄" ends 42 px past the card
(10 of 10 cards) and the tennis row "Total games ⌄" 23 px (8 of 18 cards scroll). It is an older defect, not this
regression, and is what was seen as "Total poin". So the gate is "every direct child's box inside the card" (childOut);
scrollWidth and the widest descendant are reported apart. Red on live: NFL 10/10 cards at 390 en, MLB 2/2 at 390 en,
tennis 16/18 at 390 en, 12/18 at 390 he, 6/18 at 1024 en, 4/18 at 1024 he (worst 92 px). NBA and World Cup have no
game cards today; the hub has none.

The fix: the cards are left out of the rule by name (`:not([style*="grid-column"])`), the simpler of the two: the
other elements the rule hits are labels that want centring.

Green, local build: childOut 0 on all 24 runs (6 pages x 390/1024 x en/he), the same as the build before 45e951f;
scroll and descendant figures equal to that build (the older rows above). Tap targets under 44 px on the six Command
Center pages, both widths, both languages: 0 before and after. "This week" on NFL: 44 px high (en 99 x 44, he 64 x 44).
The seven classic and root pages do not load a11y.css and were not scanned here.

"↑ Top" (NFL only): a fixed floating button sits over whatever is under it at a given scroll; at 390 px there is no
free margin to move it to. Recorded and skipped.
