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
