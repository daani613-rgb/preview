# Known defects (recorded, not fixed)

Recorded 2026-10-09. Each item is a known defect left in place on purpose. Nothing here changes behavior.

## 1. NFL board: tie-break on the tile ranking
- Where: nfl-engine `preview_build/gen_nfl_data.py`, lines 114-118 (at nfl-engine 9176ed1): `tile_priority` (line 114), `others.sort(key=tile_priority, reverse=True)` (line 117), `top_games = aplus_games + others[:3]` (line 118).
- What: the board ranks the non-A+ games by a combined score of value and form stage (2 points if the winner or the total is in the value zone, plus the stage). A tie in that score is broken by the original order of the list, because the sort is stable.
- Example, 2026 week 5: CHI@GB (no value, stage 8) and BUF@LA (value on the winner, stage 6) both scored 8. The tie put CHI@GB on the board and left BUF@LA off, although BUF@LA had value and CHI@GB had none.
- Status: deferred on purpose. Not fixed.

## 2. MLB: "Yesterday" view shows today's empty-slate note
- Where: preview `mlb/app.js`, line 558 (`slateMsg` from `R.slate.note`), shown by `mlb/index.html`, line 206.
- What: in the "Yesterday" view, the text "No MLB games are scheduled today" appears above yesterday's game cards. The note describes today's slate, not the date being viewed, so on that view it is a false statement on a live page.
- Status: outside the NFL scope. Not fixed.
