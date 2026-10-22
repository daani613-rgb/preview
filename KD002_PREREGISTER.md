# KD002_PREREGISTER.md: today's empty-slate note only on today's view (KNOWN_DEFECTS item 2)

Written 2026-10-22 (overnight block D), before the change. A separate first commit, on its own branch
(kd-002-2026-10-22), local only.

- **The defect** (KNOWN_DEFECTS 2):
  - In the MLB "Yesterday" view, today's empty-slate note appears above yesterday's game cards.
  - It is built from `slateMsg` (R.slate.note, mlb/app.js:567) and shown by the `featEmpty` block (mlb/index.html:206).
  - So the page states something about today on another date's view.
- **The change:** mlb/app.js, `featEmpty` becomes `!featHas && !boardIsJournal`.
  - The empty-state card shows only when the view is today. `boardIsJournal` is the existing flag for "a date other
    than today", mlb/app.js:649.
  - Not touched: the note's text, the featured card, the data, every number.
- **Tests** (tools/kd/kd002_check.js, run headless through work/cdprun.mjs on the page served locally), at 390 px in en
  and he:
  1. On today's view, with today's slate empty, the note appears.
  2. After clicking "Yesterday", the note does not appear, and there is no page error.
- **Red** on the current code (check 2 fails), **green** after. Proof: the same checks on the rendered page.
