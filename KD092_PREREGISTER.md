# KD092_PREREGISTER.md: remove the leftover "teams" chip from the NFL page (KNOWN_DEFECTS item 92)

Written 2026-10-22 (overnight block D), before the change. A separate first commit, on its own branch
(kd-092-2026-10-22), local only.

- **The defect:** the "Teams" ranking tab was removed on 2026-10-13 (item 64: it listed the same teams as "Games" in the
  same order). nfl/index.html:290 still renders its chip (`rank.teams_today`), which opens that same duplicate list.
- **The change:** delete that one chip element from nfl/index.html. Not touched: nfl/app.js (the `teams_today` handler
  stays and becomes unreachable), the data, every number.
- **Tests:**
  - **Static** (tools/kd/test_kd092.py): nfl/index.html has no `rank.teams_today` binding, and the other three chips
    (games, composite_today, totals) are still there.
  - **Red** before the change, **green** after.
  - **Proof on real output:** the page rendered headless at 390 px in en and he. The ranking chip row has 3 chips, not
    4, and there is no page error.
