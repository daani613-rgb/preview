# C_HUB_KEYBOARD_PREREGISTER.md: the preview hub's controls reachable by keyboard (overnight block C, e)

Written 2026-10-22 15:29Z, before the change. A separate first commit, on its own branch (c-hub-keyboard-2026-10-22),
local only.

## The defect
- **Where:** research ux_2026-10-22/FINDINGS_C, the tab-order section; taborder.jsonl.
- **What happens:** on /preview/ (index.html), 7 controls are clickable divs with no role and no tabindex, so they
  cannot be reached with the keyboard:
  - the language toggle (index.html:50);
  - the "See open calls" CTA (:65);
  - the five engine cards (:82, one per engine).
  - The page has 1 Tab stop: the "guide" CTA (:66), which already has `tabindex="0" role="button" onKeyDown="{{ onKey }}"`.

## The change (index.html only)
- The same three attributes the guide CTA uses are added to the elements at :50, :65 and :82.
- **Not touched:** hub.app.js (its onKey handler already exists), the text, the layout, every number.

## Tests (tools/c_hub/kbd_check.js, headless through work/cdprun.mjs; the page served by gzserve from this worktree)
- At 390 px, in en and he:
  - visible elements with cursor:pointer that are neither focusable nor inside a focusable element: 7 before, 0 after;
  - Tab stops from the DOM: 1 before, 8 after;
  - Enter on the focused language toggle switches the language (html lang or the visible toggle text changes);
  - no page error.
- **Red** before, **green** after.
