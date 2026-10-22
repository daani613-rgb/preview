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

## Result (2026-10-22 15:30Z)
- **Red, before** (en and he, 390 px):
  - 7 pointer controls not focusable; 1 Tab stop;
  - Enter on the language toggle does nothing;
  - no page error.
- **Green, after:**
  - 0 not focusable; 8 Tab stops;
  - Enter on the toggle switches the language (en: עב to EN; he: EN to עב);
  - no page error.
- **What is left:** after the switch the focus does not stay on the toggle. The page re-renders, and focus returns to
  the body. Recorded; not fixed here.
- **Look:** the screenshots before (the live page) and after (this branch) are the same to the eye
  (research ux_2026-10-22/shots/hub_kbd_{before,after}_en_390.png). They are not byte-identical, because of the
  animated background.

## Added 2026-10-22 16:23Z, before the change: keep focus on the language toggle after a switch
- **The open point** (Result above): after Enter on the toggle, the page re-renders and focus returns to the body.
- **The change (hub.app.js only):** toggleLang notes whether the toggle had focus. If it did, it focuses the new .langbtn
  in the next animation frame after setState. Nothing else changes.
- **The test:** kbd_check.js's `enter.focused`, at 390 px in en and he.
  - Red: false now. Green: true after.
  - Also: the language still switches, there is no page error, and the stops and unreachable counts are unchanged
    (8, 0).

## Result of the focus follow-up (16:23Z)
- **Red:** enter.focused false in en and he.
- **Green:** true in en and he. The language switches; 8 Tab stops and 0 unreachable controls, unchanged; no page error.
