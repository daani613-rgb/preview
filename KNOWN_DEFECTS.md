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

## 3. MLB: settled totals tagged "no_market" by an old path
- Recorded 2026-10-11 (baseball-engine afd69a9). Not fixed.
- Where:
  - `totals/totals_predict.py`, line 197 writes `"verdict": classify(p_over, None)`. `classify` returns `"no_market"` when there is no market price (lines 124-129).
  - `complete_totals` copies that tag into `totals/totals_log.csv` at line 263.
  - Rows affected: `totals/totals_log.csv` lines 1402 to 10561, 2,744 rows. That is 327 games by date, home and away, or 343 game rows at the 8.5 line when doubleheaders count twice. Dates run from 2026-07-01 to 2026-09-27.
- What: for these games the per-game journal (`totals/predictions_journal.json`) holds the engine's real totals tag, but the log says "no_market". The journal tags are aplus 195, silent 121, check_tail 6 and value_uncalibrated 5.
- Effect:
  - The classic MLB dashboard counts settled totals by tag from this log (`baseball_dashboard.py`, lines 305-311) and shows "no_market: 343" live.
  - The preview "Settled totals" list shows only the newest 30 rows (`preview_build/gen_mlb_data.py`, lines 400-418). None of the affected rows is in it today; the newest affected game is 2026-09-27.
  - CLV, the totals result (`tot_correct`) and the journal record are not affected.

## 4. MLB: `slot_for_commence` raises on a missing start time
- Recorded 2026-10-11 (baseball-engine afd69a9). Not fixed.
- Where:
  - `totals/totals_clv_journal.py`, lines 34-44 (`slot_for_commence`). It calls `_parse_iso` (lines 29-31), which raises ValueError on an empty string.
  - It is called from `totals/predictions_journal.py`, line 201, inside `upsert`, and is not caught there.
- What: a game whose `game_datetime` is empty would stop `upsert` with ValueError, so the per-game journal step of that run would fail for every game.
- Effect: none so far. All 1,329 journal rows have a start time, so it has never fired. Because of this path, the date-only fallback in the new start freeze (`_started`, same file) cannot be reached through `upsert` today.

## 5. Tennis: 59 CLV journal rows without a start time
- Recorded 2026-10-11 (tennis-engine 57e4f73). Not fixed; the rows are not voided.
- Where: `clv_journal.csv` lines 2 to 60. These are matches dated 2026-06-29 to 2026-07-01, from before `start_iso` was recorded. The journal was seeded in df4ad1e (2026-06-28).
- What: with no start time, these rows cannot be confirmed as written before their matches started.
- Effect:
  - 57 of them are in the published CLV figure (2 have no CLV value). 13 are A+ rows.
  - The live pages now say so next to the figure, in EN and HE: "57 of the 336".
  - Every one of the 59 has closing odds. `phase_closing` (`collect_tennis.py`, lines 165-167) skips a row with no start time, so these rows did not get a closing-odds refresh.
