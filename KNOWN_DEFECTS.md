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

## 6. Tennis: OddsPapi start times change after they are journaled
- Recorded 2026-10-11 (tennis-engine 57e4f73 and later). Not fixed.
- Where the field comes from and where it is frozen:
  - `start_iso` is taken from OddsPapi `startTime` in `tennis_odds.py`, line 247 (`fixture_to_matchup`), and passed on in `run_live.py`, line 143.
  - It is written once, at the first ("early") write, in `collect_tennis.py`, line 130 (column defined at line 17).
  - It is never updated afterwards: `phase_closing` reads it at line 165 but does not rewrite it.
- What: OddsPapi moves start times after the row is written. Measured on Davidovich Fokina-Tiafoe (`clv_journal.csv` line 360, id1200308575439744): the journal holds 2026-10-11 11:10Z (written 2026-10-10 11:20Z), and the next day's feed (today.json, built 2026-10-11 11:33Z) had 11:30Z, a 20-minute move.
- Effect: any "written before the start" check that relies on the journal's start time carries that margin of error.
  - This covers the start guard at `collect_tennis.py` line 110, which is fed the live feed's current start time at write time, and later audits of existing rows.
  - It also covers the closing refresh cut-off at line 165, which uses the stale journal time.
  - The Hijikata-Rublev void (8 minutes between run start and recorded start) is within this margin; its row carries an audit note saying so.

## 7. NFL: the Pinnacle close is taken against the scheduled kickoff, not the actual one
- Recorded 2026-10-11 (nfl-engine 399a95a). Not fixed, not measured.
- Where:
  - The kickoff is the nflverse scheduled time, `gameday` + `gametime` (ET) in `games.csv`, converted by `_kickoff_utc` in `nfl_build.py`, lines 398-404, and passed in at lines 481-482.
  - `nfl_pinnacle_close.py`, `close_before` (lines 56-67), takes the last Pinnacle entry strictly before that time.
- What: if a game starts later than scheduled (a weather delay, for example), entries between the scheduled and the actual kickoff are not used, even though they are still pre-game prices. If it starts earlier, a price after the real start could be taken. The gap between scheduled and actual kickoff has not been measured for any game.
- Effect: the official close (CLV_PREREGISTER section 9) of a delayed game is the last price before the scheduled time, not the last price before the game began. How often this happens, and by how much, is unknown.
- Related: the kickoff re-check added in 399a95a handles a moved schedule in games.csv. It does not handle a delay that never appears in the schedule.

## 8. NBA preview tiles: fields with no source were published
- Recorded 2026-10-11. In `nba-engine/preview_build/gen_nba_data.py` since 17de499 (2026-07-03). The tiles are built from HISTORY (past games) and are shown in season. In the offseason the board hides them, but the values were in the published data line of `preview/nba/app.js` throughout.
- What was published without a source, and what was done on 2026-10-11:
  - **Stage and stage name:** picked from the verdict (8 for A+, 6 for value, 4 otherwise), because HISTORY has no stage. Removed: no stage, no name.
  - **`value.pct`:** the constants 7 (OVER) and 6 (UNDER) on A+ tiles. The NBA has no market totals price. Removed: no value block.
  - **`engOver`:** `50 - (net_h + net_a) * 0.8`, clipped to 35-65, a formula of the generator's own. Removed from the tiles.
  - **Line ladder:** `over = 50 - delta * 3` for lines at λ ± 2 and ± 4. Removed from the tiles.
  - **λ and the "line":** `110 + (h_off - a_def)/2 + (a_off - h_def)/2` from the rankings cube, labelled "λ · expected points" and "λ = X pts · 🔒 line Y", which implies the totals model and a market line. Removed from the tiles and from the featured card. The featured driver row "Adjusted off/def total" stays, but only when it has a value; its label describes what the number is.
  - **The "Total points" toggle and panel:** shown only when there are totals.
  - **Market rule** (`preview/nba/app.js`): an element that claims a comparison with the market is shown only when there is a market price.
    - The tile badge "value" and the notes "Value on the total" and "Strong edge on the total" appear only with a totals price.
    - "too close, quiet" and "In line with market" appear only with a winner price.
    - The board counter drops its "value" term when no tile has a totals price.
    - The featured card shows "Edge vs market" only with a market price, and "Stage" only with a stage. Driver rows with no value are not shown.
- What remains:
  - The engine's real totals model (`nba_totals_live.py`: `predict_total`, and `total_to_prob_over`, line 51) is not connected to the page. Connecting it is a separate step with a verification gate.
- Fixed 2026-10-11 (part 5): the tile `cellAcc` / `cellN` fell back to 65 and 0 when no calibration band matched (probability under 60%), and the page turned the 0 into "small sample". Now there is no value and no display (generator default None; `preview/nba/app.js` no longer maps a missing value to 0).

## 9. MLB: classify_stage has no guard of its own
- Recorded 2026-10-12.
- **classify_stage has no guard of its own.**
  predict_baseball.py:50 and :62 call classify_stage(history.get(pick, []))
  with the full history and no date filter. In production this is harmless,
  because predictions are made in the morning and the history holds only
  completed games. The defect is the absence of a guard: the function relies
  entirely on its caller passing a truncated series, so any backtest, any
  new script, or any reordering of the pipeline gets look-ahead by default
  with nothing to signal it. This is the sixth instance of the look-ahead
  family, and the first one that is an absence rather than an occurrence.
  Not fixed.
- Claude's earlier wording of this item was wrong and is retracted: it said
  the date-only timestamp affects the live stage and probability. It does
  not, because production applies no date filter at all. The date-only
  timestamp matters only where a "strictly before" filter is applied, which
  today is the stages_v2 census input alone. Doubleheaders per season: 14 to
  35 in normal years, 56 in 2020, 59 in 2021, 69 in 2022, 26 so far in 2026.

## 10. MLB: the rating chain skips 2024 and 2025
- Recorded 2026-10-12.
- **The MLB rating chain skips 2024 and 2025. Pipeline, not missing data.**
  The chain is predict_baseball.py:24, CHAIN = ["baseball_full_2010_2023.csv"]
  plus sorted(glob("games_2*.csv")). In the repo and in CI that resolves to
  2010 to 2023 plus 2026 only. games_2024.csv (2,432 games) and
  games_2025.csv (2,434 games) exist in the owner's local
  ~/baseball-engine folder and have never been in git history: .gitignore
  carries the pattern games_2*.csv, and CI force-adds only the file it
  creates itself, which is the current year. CLAUDE.md already stated that
  the live chain needs 2024 and 2025.
  Consequence: the between-season regression in stages.py:31-34 runs once
  per season change, so between 2023 and 2026 it ran once where a complete
  chain runs three times. Two regressions were skipped.
  Scope, measured 2026-10-12 UTC from the local files, read only: entering 2026
  the mean absolute difference against a complete chain was 19.7 Elo points
  and the maximum 53.4 (ATL). After the 2026 season the mean is 7.5 and the
  maximum 20.5 (KCA). In probability terms, on the two games live on
  2026-10-12 the model confidence moved by up to 3.8 points (TBA from 0.617
  to 0.579) and the displayed probability by up to 3.6 points (TBA from
  0.661 to 0.625). MIL moved the other way, from 0.534 to 0.557. Neither
  pick entered or left A plus, because both were silent before and after
  and TBA was already just under the 0.62 threshold. The earlier estimate of
  up to three points was derived from the Elo to probability conversion;
  these figures are measured, on a sample of two games.
  All seasons except 2026 hold regular season games only, including
  baseball_full_2010_2023.csv (2,430 games in 2022 and the same in 2023).
  games_2026.csv also holds 25 playoff games so far. The odd season is
  2026, not 2024 and 2025. Recorded, not fixed.
  Not affected: the published holdout accuracy, because holdout_test.py runs
  on baseball_full_2010_2023.csv alone with test seasons 2019 to 2023, which
  are continuous. The A+ constants were chosen on that same holdout. cellAcc
  does not exist in MLB.
  Affected: the live application of the A+ rule in 2026, the live picks, and
  their record in baseball_log.
  Gate result: holdout_test.py output identical before and after on
  every field except computed_utc, which the script writes from the clock
  on every run. All figures identical: aplus 70.2 on 578 games, overall
  58.1, test_seasons [2019, 2023]. The comparison was made on the parsed
  JSON with the clock field excluded.
  Status: being fixed under a chain version marker. See item 11.

## 11. MLB: the live log spans two rating chains
- Recorded 2026-10-12.
- The MLB log spans two chains. Every row carries chain_version with the
  chain it was produced under: 2010_2023+2026 for rows written before the
  commit that added games_2024.csv and games_2025.csv, and 2010_2026_full
  from that commit onward. That commit is baseball-engine 330d1e8
  (2026-10-12). The two groups are not pooled into a single record without
  saying so.

## 12. MLB: the log writer's FIELDS lagged the file's header
- Recorded 2026-10-12.
- FIELDS in log_baseball.py held 11 columns while baseball_log.csv held 13:
  void_reason was added on 2026-10-07 (f1cdfc0) and void_reason_en the same
  day (84ace3f), and FIELDS was not extended. A row appended in that state
  would have been written without both columns. FIELDS was extended on
  2026-10-12, together with chain_version.
- Rows affected: none. The last row was logged on 2026-09-27, before the
  columns were added, and no row has been appended since. Every row in the
  file and in every committed version of it has as many fields as its
  header. The defect was latent and did not occur.

## 13. NBA: BALLDONTLIE_KEY was missing from the Build dashboard step
- Recorded 2026-10-12.
- Correction 16 was only half applied. BALLDONTLIE_KEY was added to the
  Update step and not to the Build dashboard step, so
  dashboard.get_next_game() (dashboard.py:273) called balldontlie with no
  key from that step. The CI log of 2026-10-11 shows it failing after all
  retries, and a local copy reproduces the same error, expected string or
  bytes-like object, which is what Authorization: None produces. Impact:
  in the off-season the next game field was always empty; inside a season
  the function is not called. Fixed 2026-10-12. Recorded because the
  earlier record said done and was not, the same family as CLV_FINAL and
  log_aplus.

## 14. NBA preview: featured card, hero line and a fixed 60 when there is no featured game
- Recorded 2026-10-12. Found in a local simulation of the opening night, not in production.
- What was shown: with the season open and no featured game (`feat` is None: no NBA games that day, or the
  day's schedule could not be loaded), the featured card still rendered: "@ ·" with no teams, "HIGH" over a
  dash, "Engine 40%", an empty "Market %", and "Engine sees 60% HIGH". The 60 was a fallback constant in
  `preview/nba/app.js` (`fEngPick ... : 60`), not an engine value. The hero line said "Off-season now, next
  season tips off October 2026." in every state, because it was a fixed string.
- What was fixed: no fallback number (no engine value, no number and no "Engine sees" sentence); when `feat` is
  None the card is not rendered and one status message is shown instead ("No featured game today. There are
  no NBA games today, or today's schedule could not be loaded.", and in Hebrew). The hero line reads
  `isOffseason` (its logic unchanged) and carries no fixed date; in the off-season it names the next game's
  date only when the data has one.
- Opening guards: the four start guards (tennis, MLB journal, MLB totals freeze, NBA) were proven on copies
  and on real API data, and none has fired in production. A firing cannot be forced, and data is not
  injected into production to force one. The NBA opening night is the first opportunity for two of them.
- Season strings: every string on the NBA page that describes the season state now reads `isOffseason` (its
  logic unchanged) and carries no fixed date (the hero line, the rankings note, the CLV and totals collecting
  lines, the empty-signals body, the empty-state preview body and chip, the next-game card). The rankings note
  used to say "Off-season power rankings, no live games until October 2026" inside a season too. Hebrew typo
  "יחזרים" corrected to "יחזרו".
- The three day-dependent ranking cubes (teams today, games today, composite today) are never filled by
  `gen_nba_data.py`, in any season; their note promised "Fills when the season opens (October 2026)". The note now
  says they are not built on this page. Filling them is not done here.
- The opening-night IndexError guard in `nba-engine/preview_build/gen_nba_data.py` is at line 406. It was
  proven on local states of 0, 2, 4 and 6 rated teams (odd counts cannot arise: every game rates two teams).

## 15. NBA preview tiles: calibration band picked by substring match
- Recorded 2026-10-12. In `nba-engine/preview_build/gen_nba_data.py` (tile `cellAcc` / `cellN`), found while
  scanning for numeric fallbacks.
- What: the band for a pick was found with `'70' in c['band']` and the like. "60–70%" contains "70" and
  "70–80%" contains "80", so a 70 to 79 percent pick was given the accuracy of the 60–70% band and a pick of 80
  percent or more the accuracy of the 70–80% band: every pick above 70 percent showed the accuracy of the band
  below its own. CALIB and its bands were correct; only the choice of band was wrong.
- Fix: the band bounds are parsed from the label and compared as numbers ("60–70%" is [60, 70), "85%+" is
  [85, up)). CALIB and the bands it builds are unchanged.
- Effect on the number shown next to A+ calls (A+ is 80 percent or more): it was the 70–80% band's accuracy,
  73 percent on the current data (n=1,433). It is now 80 percent (80–85% band, n=444) or 85 percent (85%+ band,
  n=319). The shown number changes because a wrong number is replaced by the right one; this is not a
  regression.
- Remaining: the tile probability is rounded to a whole percent before the band is chosen, while CALIB banded
  the unrounded probability, so a pick at 79.6 percent is shown with the 80–85% band. Not fixed.

## 16. NBA: the A+ label was decided from the rounded probability
- Recorded 2026-10-12.
- The published A+ record (82 percent on n=763) is computed in `dashboard.py` from the raw probability
  (`conf_band`, the 80-85 and 85+ bands). The A+ label the reader sees was decided again, in two places, from
  the probability already rounded to a whole percent: the classic page (`dashboard.html`, the "A+ ·" label and
  tier 1 of the day cubes, `p.prob>=80`) and the preview (`gen_nba_data.py`, tile state 'aplus' and the A+
  counter). A pick at 79.5 to 79.99 percent was shown as 80 and labelled A+ without being an A+ pick.
- Scope: 158 such picks in all seasons (2010-11 to 2025-26), 16 in the two seasons the pages show
  (2024-25 and 2025-26), which is 4.5 percent of the 356 A+ picks there.
- Fix: the decision is made once, in `dashboard.py`, from the raw probability, and carried as a flag
  `is_aplus` on every pick; both pages read the flag. The 0.80 threshold, the probability and the fatigue
  flag are unchanged. A 79.6 percent pick now shows tier 2 on the classic page and 'value' on the preview.
- The published record did not change: holdout_test.py output is byte-identical and TRACK is 82 percent on
  n=763 before and after. The 16 picks lost a label that was not justified; this is not a regression.
- Same change: the classic page's cell accuracy fell back to 0 when there was no band
  (`dashboard.py`, `acc if acc is not None else 0`); with no band there is now no field and no number
  (n under 30 still says "Too few similar calls"; n of 0 shows nothing).

## 17. NBA preview: the three "today" ranking cubes are never built
- Recorded 2026-10-12.
- The day-dependent ranking cubes (teams today, games today, composite today) return `data: []` from
  `gen_nba_data.py` in every season. Their note said "Fills when the season opens (October 2026)", which was
  false in both season states. The note now says they are not built on this page.
- Whether to build them or remove them from the page is deferred until after 2026-10-20.

