# Known defects (recorded, not fixed)

Recorded 2026-10-09. Each item is a known defect left in place on purpose. Nothing here changes behavior.

## 1. NFL board: tie-break on the tile ranking
- Where: nfl-engine `preview_build/gen_nfl_data.py`, lines 114-118 (at nfl-engine 9176ed1): `tile_priority` (line 114), `others.sort(key=tile_priority, reverse=True)` (line 117), `top_games = aplus_games + others[:3]` (line 118).
- What: the board ranks the non-A+ games by a combined score of value and form stage (2 points if the winner or the total is in the value zone, plus the stage). A tie in that score is broken by the original order of the list, because the sort is stable.
- Example, 2026 week 5 (frozen pre-game zones): PHI@JAX, CLE@NYJ and BUF@LA all scored 8 (value on the winner and stage 6; no value and stage 8; value on the winner and stage 6). The stable sort kept PHI@JAX, which comes first in the list, and left BUF@LA off, the only one of the three still to be played. CHI@GB scored 10: its total entered the value zone in the 2026-10-10 16:18Z log write and was frozen so at kickoff. The earlier example (CHI@GB and BUF@LA tied at 8) was true when written and went stale when the zone moved.
- Status: fixed 2026-10-12 (item 44): games still to play come first, then decided games, and ties are broken by kickoff date and time, then away and home team, not by list order. The score itself (`tile_priority`) is unchanged.

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

- Update 2026-10-12: the real totals model is now connected as an expected total only; see item 18.

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

## 18. NBA totals: what is connected, what was removed, what stays open
- Recorded 2026-10-12. Measured first: `nba-engine/NBA_TOTALS_MODEL_MEASURED.md`.
- Connected: the expected total from `nba_totals_live.predict_total`, as one number, with its measured error:
  "Expected total (engine): X points · typical miss about 15 points (average error since 2019-20, n=8,472). A
  forecast from the engine, not a pick." (and in Hebrew).
  - Classic page: on today's games (it was already shown there, next to "No market line yet" and "not yet
    validated vs market · CLV decides"; those texts were replaced). The games cube label reads "expected total X".
  - Preview: on each finished game's tile, the expected total from a state built only from games on earlier
    dates, next to the realised total, so the misses can be seen. Leak gate on every build (20 rows, seed
    20261012): one mismatch and no totals are published. No expected total, no field and no display.
- Removed from `dashboard.html`: the P(over) branch that depended on `marketTotal`, which was always None and never
  ran: `pOverJS`, `segBar`, the over/under and zone strings (`totEngOU`, `modelVsLine`, `totZoneValue`,
  `totZoneOpen`, `totZoneNone`, `totNoLine`, `totalsHonest`), and in `dashboard.py` the fields `marketTotal`,
  `marketProbOver` and `totalSigma`. Lines removed: `dashboard.html` 613 to 628 (helpers) and 708 to 732 (branch),
  as of 006189a.
- Not connected, and not until there is a market line: `eng_over` or any probability of going over a line,
  `total_to_prob_over`, and any line ladder. A probability of going over needs a line, and this project has no
  NBA totals line. Item 8's removal of `engOver` and the ladder is therefore closed only in part: what stays
  open is the probability, which depends on a market line existing.
- Option (b), connecting the preview to today's games (PICKS), is deferred until after 2026-10-20.

## 19. Pattern worth copying: a leak gate that runs before publication
- Pattern worth copying, recorded 2026-10-12. The NBA preview build now runs a leak gate on every run: 20 seeded
  history rows are recompared against predict_total on a strictly-earlier-dates state, and a single mismatch
  stops the totals being published at all. The five look-ahead bugs that actually occurred in this project were
  all found after the fact. Item 9 is a sixth instance of the same family, but it is the absence of a guard rather
  than an occurrence. This mechanism is the first that catches one before publication. The other four engines do
  not have it. Deferred to after 2026-10-20.
- Same-day games do not feed each other in pregame_totals(), because start times are unknown. This is the same
  trap as the MLB doubleheader finding (item 9) and the same resolution.
- This item records a pattern, not a defect.

## 20 onward: tennis pages (audit of 2026-10-12; plan in tennis-engine/TENNIS_FIX_PREREGISTER.md)
One line per defect. Status: fixed locally 2026-10-12 (pending push), or open.

- **20.** The preview decided A+ by its own rule (`gen_tennis_data.py:110-118`, stage>=8 and conf>=0.62), not the engine's (`build_predictions.py:58`, `tennis_stages.is_aplus`): 17 of 98 engine A+ agreed, 19 extra. Fixed: the page carries the engine's `aplus` flag (363 of 363 agree); "value" is labelled a page tier. Also fixed: the featured card text (`app.js:770-771`) no longer gives "gap + cushion + calibrated" as the A+ definition; the unrendered `howBullets` block that repeated it was deleted (item 40); the classic page's copy of {5,7,8,9} (`tennis_dashboard.html:402`) is injected from `tennis_stages.HIGH_STAGES` at build.
- **21.** A tile's settled result was found by player names only (`app.js:818`), so the 2026-10-12 Lehecka vs Jodar tile showed the 2026-08-08 result ("call correct"). Fixed: date and both names; no date match, no result ("Not decided yet").
- **22.** `gen_tennis_data.py:279` `feat_tile = pool[0]` raised IndexError on an empty slate. Fixed: no featured card and one "No matches on today's slate" message.
- **23.** CLV by segment groups by `date[:7]` of a YYYYMMDD date (`gen_tennis_data.py:344`), giving 10-day buckets labelled "2026062". Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the key is YYYY-MM.
- **24.** The featured label "The A+ call · today" is a constant (`app.js:314`, `:372`) and shows on a non-A+ top tile. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the kicker follows the featured card (an A+ call still to play, another match still to play, or nothing left to play).
- **25.** "Updated several times a day" and LIVE (`app.js:313`, `:371`) show during the quota pause. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): during the pause the badge says PAUSED and the subtitle says the slate is not refreshed.
- **26.** The cumulative winner CLV is labelled "CLV games" and plotted in "games" (`app.js:347`, `runsWord`). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): labelled "CLV · winner market".
- **27.** The classic card shows two numbers for one quantity: calibrated "what it's worth" and raw "confidence" (`tennis_dashboard.html:445-466`). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): one number, the engine's p_home.
- **28.** With no market price the preview still says "In line with Pinnacle" (quiet) (`app.js:869-873`). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): with no price the note says "Quiet · no market price".
- **29.** The preview says "In line with Pinnacle" for any silent tile, including a 7 percent gap the page calls a value window (`app.js:869-873`). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): one threshold, 3 points (where the classic value zone starts): under it "in line", above it the engine above or below Pinnacle by the gap.
- **30.** The classic page says "In line with market" for any gap under 3, including -12 percent (`tennis_dashboard.html:458-460`). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): a gap of -3 or less reads "Engine below the market". Fils on 2026-10-12: before "In line with market · -12%" (calibrated 67% vs 79%), after "Engine below the market · -10%" (p_home 69% vs 79%).
- **31.** `app.js:728` falls back to an engine probability of 72. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): no engine number, none shown.
- **32.** `app.js:990` edge count-up target falls back to 0 ("+0%"). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): no edge, no count-up target.
- **33.** `app.js:839` market share for the away player falls back to 50. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): it was hidden without a price; now null as well.
- **34.** `gen_tennis_data.py:568` publishes `'elo': 0` when there is no blended Elo. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): None.
- **35.** `gen_tennis_data.py:427-428` (Elo 1500) and `:477` (matches 10) fill missing players. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): a player with no rating takes the engine's starting value (tennis_elo_engine.BASE_RATING); every player record carries matches, so that default is gone.
- **36.** Platt constants 0.903 and 0.001 (`tennis_dashboard.py:61`) have no script in the repo that produces them. Not shown any more (the classic page no longer shows conf_cal, item 51); the constants in code are unchanged.
- **37.** 63.7, 77.3, 77.4 and 61,182 (`tennis_dashboard.py:26`, `gen_tennis_data.py:28-34`) have no producing script; they are not shown. Published nowhere: the classic ACCURACY line is injected as null, the preview payload no longer carries them.
- **38.** The hero KPI is a constant dash (`app.js:347`). Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the tile is gone.
- **39.** The totals line ladder on the preview tiles is the generator's own Normal(lambda, sqrt(lambda)) (`gen_tennis_data.py:160-173`) and disagrees with the engine's `p_over_raw` on the same tile. Open, not scheduled in this plan. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the ladder is gone (a ladder with a measured error would be its own block, as for the NBA totals).
- **40.** The preview's `howBullets` (`app.js:355-366`, `:411-422` before the change) was never rendered by the template, so its A+ definition could not be read on the page. Deleted 2026-10-12 rather than shown: the page's guide already explains the method, and the block repeated claims that were wrong. This was the fourth place the A+ definition was derived or stated separately (engine `is_aplus`, the preview `state_for`, the classic page's copy of {5,7,8,9}, and this text plus the featured card text). Fixed locally.
- **41.** Market odds for today's matches are joined to the journal by player names only (`gen_tennis_data.py:79-84` and `:95-101`, `tennis_dashboard.py:42-52` and `:65`): a rematch shows the price of whichever journal row with the same names is read last, possibly from an earlier date. No published aggregate uses this join. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the price is the row of the same date and both players; none, no price. Measured before the fix on the slate of 2026-10-12: 0 of 9 tiles took a price from another date. The CLV column (collect_tennis._clv) reads the row's own odds, written by fixture id: no row affected.
- **42.** The Brier shown (0.437 on n=336) is the two-class sum `sum((p_i - t_i)^2)` over [p_home, 1 - p_home] (`tennis_clv.brier_score`, used by `collect_tennis._clv`), which is twice the usual binary Brier; a constant 0.5 forecast scores 0.5 on it, not 0.25. The binary equivalent on the current journal is 0.221 (n=343). The page does not state the convention. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): shown as the binary score, 0.221 on 344 rows, with "a coin gives 0.25"; per-match Brier on the same convention.
- **43.** NFL: a decided game with no frozen pre-game row in `nfl_predictions.csv` kept the probability, favorite, A+ and verdict that `game_payload` computed from the final ratings, which include the game (`nfl_build.py:163-187` before the fix). Run on a local copy with the rows of CHI@GB and CLE@NYJ (2026-10-11) removed: the pick flipped to GB and NYJ, both verdicts became correct, and the published record went from 49 of 77 to 51 of 77. No such game exists on today's data. Fixed 2026-10-12: with no frozen row the model fields are dropped (`MODEL_FIELDS`), there is no verdict, and the game is out of the record on both sides; the page states how many such games were left out. Test added in `test_nfl.py` (failed before the fix, passes after).
- **44.** NFL board: decided games competed with games still to play for the board, and the game still to play (BUF@LA, week 5) was left off (`gen_nfl_data.py:112-118` before the fix). Fixed 2026-10-12: games still to play first, then decided games; decided tiles speak in the past tense ("Was an A+ call", "Before kickoff: ..."); the counter says what it counts ("1 to play · 3 decided (1 A+)").
- **45.** NFL preview: the featured card's title "No high-confidence call this week" (`app.js:413`) said there was no A+ call while the board showed a decided A+ (MIN@NO). Fixed 2026-10-12: "No A+ call among this week's remaining games", and Hebrew.
- **46.** NFL: the headline A+ call was derived separately on the two pages: the classic page took every A+ game of the week, decided ones included (`nfl_template.html:427`), the preview only the A+ games not yet played (`gen_nfl_data.py:52-54`). The fifth time one display rule was derived differently on two pages. Fixed 2026-10-12: `nfl_build.py` writes the list once (`week.aplus_open`) and both pages read it; on the classic page decided A+ games appear under their own past-tense label.
- **47.** NFL classic page: a tie was shown as "Pick: WAS, wrong" because the verdict line read a missing grade as wrong (`nfl_template.html:298` before the fix). Fixed 2026-10-12: "tie, not graded", as on the preview.

- **48.** NFL preview: the season line said "based on 77 decided games" while the season had 78 decided games; the denominator counts only graded games (a frozen pre-game pick and a winner), and the A+ line said "decided A+ calls" for the same reason (`app.js:726` and `:731` before the fix). Fixed 2026-10-12: "based on 75 graded games · 78 decided · 1 tie · 2 without a frozen pick" (the generator now publishes `decided`, and graded + ties + games without a frozen pick add up to it), and Hebrew. The classic NFL page has no live season record: its accuracy cubes are 2020 to 2025 backtests that leave ties out (`nfl_build.py`, `if res != 0`), and the totals and CLV cubes read fields the build does not write, so they always show "collecting". Open (the last point).
- **49.** Scheduled runs are unreliable on the slow-cron engines. Measured over 14 full days (2026-09-28 to 2026-10-11, UTC calendar days, runs counted by start day, no slot assignment): NFL 16 of 16 planned scheduled runs happened, tennis 42 of 42 (5 failed, 09-28 to 09-30, all at "Pull closing odds"), World Cup goals 28 of 28, MLB 60 of 98 (61%), NBA 38 of 82 (46%), World Cup daily 37 of 82 (45%). Every missing run is on a workflow whose cron fires several times a day (`*/3`, `*/4`); after the 10-07 change to once a day, NBA and World Cup daily ran 4 of 4. Delays of 2 to 6 hours are common, so a run's start time does not say which slot it served. The World Cup hourly CLV cron is commented out since 2026-07-15 (`clv_collect.yml`), so it plans 0 runs, not 24. NBA Daily, the 09:41 slot (cron 41 9, its only one): 2026-10-12 fired at 19:18Z; 2026-10-13 the scheduled run fired at 17:07Z, about 7.5 hours late, the second day in a row (before it, all runs that day were manual: 01:58, 03:05, 12:46, 16:41Z). From now on every daily report carries one line: did 09:41 fire, and when. Safety net for 2026-10-20/21 in nba-engine/NBA_JOURNAL_PREREGISTER.md. Open.
- **50.** Tennis preview, Hebrew: the featured card's subtitle shows the English word "Today" ("Dalibor Svrcina @ Daniil Medvedev · Today"). Source: `gen_tennis_data.py:294`, `'time': feat_tile['time'] or 'Today'`, a fallback written in one language into the data. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the featured line carries the date in each language.
- **51.** Tennis: the same call is shown as 83% on the classic page and 86% on the preview (Medvedev, 2026-10-12). The classic page shows `conf_cal`, the preview the raw `p_home` (0.856). `conf_cal` applies Platt constants typed by hand into `tennis_dashboard.py:16` (`PLATT_A, PLATT_B = 0.903, 0.001`); the comment cites "holdout_calib", which does not exist anywhere in the repository's history, and the self-test in `tennis_calibration.py` fits A and B but writes them nowhere and needs year CSVs that are not in the repository. A value with no script that produces it. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): both pages show p_home (86% for Medvedev); conf_cal is no longer shown.
- **52.** Tennis preview: the featured card ("The A+ call · today") shows a match that is already decided (Medvedev, started 06:20Z, won, its tile shows "✓ call correct"). The NFL fix (items 45 and 46) set the opposite rule: the headline takes only games still to play. Two engines, two rules for the same card. Fixed locally 2026-10-13 (pending push, TENNIS_FIX2_PREREGISTER.md): the NFL rule (a match still to play first; with none, the title says so and the decided match is in the past tense with its verdict).
- **53.** MLB, open leak, same kind as item 43: `today_all.json` is rebuilt on every run from ratings that already include games finished earlier the same day (`baseball_daily.py:107-131` refreshes `games_2026.csv` up to today, then `write_today_all`). Measured on its git history (611 commits): 665 games had a version written after first pitch; in 319 the confidence changed, and it moved toward the actual result in 316 and away in 0. In 10 games the pick or verdict changed after first pitch. The preview's "today" board (`gen_mlb_data.py:9`, tiles and featured card) shows these values next to the result from the journal. Fixed locally 2026-10-12 (pending push, MLB_LEAK_PREREGISTER.md a029ebb74a76): a started game takes its journal row's values when that row was first written before first pitch, and carries no model fields otherwise (`baseball_daily.freeze_started`); test_leak_guards.py A1 to A6, red before, green after.
- **54.** MLB journal: `p_display`, `fip_edge` and `p_over_fip` are refreshed on every run with no start guard (`totals/predictions_journal.py:166-177` and `:216-227`; the start guard covers `tot_verdict` only). Of 1,311 decided journal games, 650 had a model field change after first pitch; `p_display` changed in 536, and the value now shown is closer to the result in 328 and farther in 208 (z = 5.2). The classic MLB card's engine bar, the "pitcher-aware" line and the per-game Match-Brier use these fields (`baseball_dashboard.html:501`, `:569-575`, `:630-632`). Example: 2026-09-25 BAL @ NYA, last value before first pitch 0.48, shown now 0.578. `p_home`, pick, A+ and the ✓/✗ verdict did not change. Fixed locally 2026-10-12 (pending push): the FIP display block is frozen at first pitch beside `tot_verdict`; 656 rows restored from the git history with `fip_restore_note` (648 decided); Match-Brier comes from the stored frozen values only, mean on the 536 games 0.2393 before, 0.2410 after (worse, as pre-registered); test_leak_guards.py B and C.
- **55.** World Cup: one row of `predictions_log.csv` was first written after kickoff: Spain v Cape Verde, 2026-06-15, written 18:14Z, last pre-match price 15:59Z. At that commit the result was still NA in `international_results.csv`, as it was for all 104 rows, so the result did not reach the ratings. 90 rows are proven before kickoff by the last pre-match price; 13 have no price series and their kickoff is not in the repository. Open (record only).
- **56.** MLB: 19 postseason games of 2026-09-29 to 2026-10-06 have no journal row: the gameType filter accepted the postseason types only from 2026-10-07. With the 18 second games of doubleheaders (they share the key `date|home|away` with the first game) they are the 37 decided games with no frozen pre-game record that the new gap counter shows (`gaps_check.py`, `totals/gaps.csv`). Open (record only; the doubleheader key is not changed).
- **57.** MLB: what is shown must equal what was checked. The journal locks `p_home` at its first write, one to two days before the game, while `today_all.json` keeps recomputing until first pitch, so a "today" tile moves at first pitch from the recomputed value to the frozen one (2026-10-12 LAN @ MIL: 0.562 before, 0.534 after). The rule to apply: a game that has a journal row shows that row's frozen value from the moment the row exists, not a recomputed value that is replaced at first pitch. When the journal locks is a question about the rating rule and is not changed without asking. Open.
- **58.** MLB: the "today" tiles' totals values come from `totals/today_totals.json`, rebuilt every run and not kept in git, so whether they are recomputed after first pitch cannot be measured. To do: keep the file in git, then measure it the way `today_all.json` was measured (item 53). Open.
- **59.** MLB: "today" in the pipeline is the runner's UTC date (`datetime.date.today()` in `baseball_daily.py`), so an evening game in US Eastern time drops off the "today" board once UTC passes midnight, while it is still being played (CLE @ TBA of 2026-10-12, first pitch 00:00Z on 10-13, was not in `today_all.json` of the 01:07Z run on 10-13). Open (record only).
- **60.** NBA: TRACK and CALIB (the A+ record and the calibration bands, the last five seasons) are built from the walk-forward reconstruction, so from 2026-10-20 they include 2026-27 games as reconstructed games, not from their frozen journal rows (seen in a local simulation: "621 games, 2022-10-18 to 2026-10-12"). TRACK fixed locally 2026-10-13 (pending push): from 2026-27 the A+ record reads each game's frozen row, a game with no frozen row is not in it (test_track.py, red before, green after); TRACK also carries its correct count `c`. CALIB not changed: it is recomputed on every build from the reconstruction and will include 2026-27 games from it. Open for CALIB (question for the owner).
- **61.** NBA: HISTORY keeps the last two seasons (`dashboard.build_history`, `seasons[-2:]`). When the first 2026-27 game is decided, 2024-25 drops out and the reconstruction figure falls from 2,643 games to about 1,322 (2025-26 only), with the 2026-27 games shown from their frozen rows beside it. Existing behavior, not changed. Labelled locally 2026-10-13 (pending push): the reconstruction line names its window, "the last two seasons" / "שתי העונות האחרונות", so the drop reads as a window. Open (record only).
- **62.** NBA: TRACK and CALIB use the last five seasons with a season (`cut = years[-5]`), so one 2026-27 game moves the window by a whole season (2021-22 to 2025-26 becomes 2022-23 to 2026-27). Measured in a local simulation with three 2026-27 games: TRACK n 763 to 621, CALIB n 4,184 to 3,384, the bands moving by about a point. Expected from 2026-10-21; a window, not a fault. Open (record only; CALIB not touched without asking).
- **63.** NFL: the record line said "6 graded A+ calls" and no list on either page showed which six: the preview games list tagged A+ in the present tense with no tie to the verdict, and the classic card put a present-tense "A+" badge on decided games. Fixed locally 2026-10-13 (pending push): every decided game that was an A+ call says so in the past tense beside its verdict ("Was an A+ call" / "הייתה קריאת A+"), read from the frozen row's `aplus` (the field the board and the record read); a game that was not A+ gets nothing. Counted on a local build: the results list carries 6 marks against "6 graded A+ calls" on the preview and 6 on the classic list; the week list carries 1 against the board counter's 1. An aggregate record with no evidence per game is a pattern: see items 65 and 66.
- **64.** NFL rankings: the "Teams" tab (favorite of each game not yet played, by win probability) was the "Games" tab in the same order, since the favorite's win probability is 0.5 + the game's confidence; on a full week (data of 2026-10-07) both started NE, MIN, HOU, JAX, DAL. Listing both teams of each game does not help: the top of that list is the same favorites in the same order. Removed locally 2026-10-13 (pending push) from both pages; the data field `rankings.teams_today` stays. The other tabs differ (verified on a full week, both languages), the switch between tabs is stateless (forward and reverse click order give the same content), and both composites are computed: this week's games winner^0.40 · Elo^0.30 · total^0.20 · data^0.10, all 32 teams Elo^0.70 · trend^0.30. On a Monday night one game is left, so the three week tabs show that one game; the week tabs now say how many games they cover.
- **65.** MLB preview: the per-date board marks a game A+ only if `win_verdict` starts with "A+" or `tot_verdict` is "aplus" (`gen_mlb_data.py:444`), but the journal's `win_verdict` is the market tag (value 731, silent 599); the winner A+ call is `win_call` (30 rows). So no winner A+ call is ever marked on the preview board, while the live record counts them. The classic page lists the decided A+ calls. Also: the journal holds 30 `win_call` A+ rows, the A+ log (`baseball_log.csv`) 42. Open (mapping only).
- **66.** NBA: the A+ record (TRACK) has no mark per game in the results views of either page: the classic date navigation cards show no A+ flag, and the preview results list carries no `is_aplus`; only the six preview tiles do. Open (mapping only).
- **67.** Tennis pages: today.json is rebuilt on every live run for every fixture in the feed, started ones included, and both pages showed its values, so a started match with no journal row still showed a probability, a pick and an A+ state, and a started match with a row showed today.json's later value. The journal itself was already guarded (written once, never after the start, since 3eac9d6). Fixed locally 2026-10-13 (pending push): `tennis_frozen.freeze_slate` shows a started match from its journal row (date and both names) and leaves it out with none; a gate stops the build when a shown value differs; `gaps_check.py` counts started matches with no frozen record from 2026-10-21; test_frozen.py red before, green after (the writer test was green before, as pre-registered).
- **68.** Tennis classic card: the date was printed twice on any day other than yesterday, today or tomorrow ("10/10 · 10/10", and a flag with the same date). Fixed locally 2026-10-13 (pending push): the date once.

## Fleet scan 2026-10-13 (items 69 to 92) and stop 1

- **69.** MLB: market price joined by team pair with no date or commence time (`totals/market_snapshot.py:45-76, :170`; same join in `totals/predictions_journal.py:167, :197, :211`). On 2026-10-13 the CLE@TBA card shows "Engine sees 58% for TBA vs 4% at market", "+54%", "Market 4%" and, on the same card, "In line with market · gap 54%, silent"; classic shows "Large gap: TBA +49%". The 4% is the in-play price of the 10-12 CLE@TBA game (first pitch 00:00Z, run 03:06Z). Measured on the live preview. Fixed locally 2026-10-13 in stop 1 (pending push): the snapshot records its fetch time; a price comes only from the row's own game (teams, commence within 2 h of the start), never from a game already under way (MLB_MARKET_PREREGISTER.md).
- **70.** MLB journal: `market_p_home` and `win_verdict` are refreshed on every run with no start guard (`predictions_journal.py:167-173`; the 2026-10-12 guard covers the FIP block and `tot_verdict` only). 117 decided rows have a market price outside 0.2-0.8; 110 of them (94%) favour the actual winner, against 60% (720/1,195) for the other rows. Example 2026-06-26 DET-HOU 0.9712. Both pages draw these as "Market" bars on decided games. Same class as item 54, for the market field. Fixed locally 2026-10-13 in stop 1 (pending push): market_p_home, win_verdict and market_p_over are frozen at the start; history restored to the last price seen before first pitch (560 rows, 2 emptied, 254 verdicts); the 117 extreme prices went from 94.0% to 63.2% toward the winner. Pushed 2026-10-13 (61487de, with market_p_over 156 rows, 2 emptied) and live verified: 0 "+54", 0 "Large gap", 0 empty market bars; 117 at 63.2%. A dry run after the 11:56Z run found the restore reading unwritten row versions as observations and comparing with series games long over: corrected and pushed 2026-10-13 (f2bdf8f section, 7b26fd6 script, ece9465 data): 8 market_p_home rows, 1 emptied (2026-09-26 BOS|CHN held the 2026-09-25 game's price); 2 market_p_over rows, 1 emptied. Live journal: second run 0, 117 at 63.2%, 0 extreme prices.
- **71.** MLB preview: "A+ · strong" badge on 791 of 1,331 journal games, from the totals verdict (`gen_mlb_data.py:444`, `tot_verdict == "aplus"`), while the page defines A+ as the winner rule (>=62% and stage 8/9). Example 10-14 MIL@LAN, engine 50%, "A+ · strong". Extends item 65. Partly fixed 2026-10-13 in stop 2 (pushed, verified live): the badge names its market and a decided one is in the past tense ("Was an A+ call · total", 4 on 12.10, 0 read "winner"); marking winner A+ calls stays with item 65. Open.
- **72.** MLB preview: the engine number is the pure-Elo `p_home` (`gen_mlb_data.py:101, :146`) while the guide says "accounting for today's starter" and the featured row says "Elo + FIP". Same game, four engine values across the pages: 58 / 52.7 / 62 to 57. Open.
- **73.** MLB: locked totals line differs between the pages (preview 8.5 from `today_totals`, journal and classic 7.0); two totals-direction figures (classic 54%, 713/1,328 at the fixed 8.5; preview 51.6%, 677/1,312 at the locked line); preview "Settled totals" lists one row per line, so 30 rows are 4 games with mixed check marks for the same game. Open.
- **74.** NFL: a started game with no score is rebuilt from post-kickoff prices instead of the frozen row (`nfl_build.py:191-192`). BUF@LA 2026-10-13 00:15Z, build 03:08Z: frozen mkt_home 0.609, line 54.5, tot_zone none; shown market 62, line 55.5, total "value" (LOW +3%), badge "value" in the present tense. Both guides say every result shown was predicted before the game. Fixed locally 2026-10-13 in stop 1 (pending push): the guard is the kickoff, not the score; a started game is shown from its frozen row in the pre-game wording ("Started · no final score yet").
- **75.** NFL CLV text is false on both pages: preview "no data yet ... no closing-line source is connected"; classic "CLV starts at season kickoff (Sep), no forward odds collected yet". `nfl_clv_pinnacle.csv` holds 79 rows, all ok. Fixed locally 2026-10-13 in stop 1 (pending push): both pages say the CLV reading is scheduled for 29.11.
- **76.** NFL classic totals cube shows "collecting, no decided totals yet": `totals_n` is never written (`nfl_build.py:126-137`). The frozen rows give 43/78 = 55.1%. Fixed locally 2026-10-13 in stop 1 (pending push): the totals cube reads the frozen rows, 43 of 78 (55.1%), pushes left out; no "collecting".
- **77.** NFL "value" tag names no side: on BUF@LA the value is on BUF while the card says "Call LA". Gaps over 10% ("open") map to quiet with "In line with market" (`gen_nfl_data.py:93-97`), against the page's own guide. Partly fixed 2026-10-13 in stop 2 (pushed, verified live): a gap over 10 reads "Large gap · outside the window" (NFL classic, 3 games, both languages); the side of the value is still not named. Open.
- **78.** Root hub (`daani613-rgb.github.io/index.html`) is static and publishes wrong statuses and figures with no source: NFL "Offseason, kicks off September 9" (in week 6), "64.6% overall, 78.4% on A+ (12%)" (engine 63.6% / 76.4% / 15.3%), "nine-stage"; World Cup "Live, tournament on" (final 2026-07-19) and "~78% on two-way calls" (live 76.0%, 38/50); tennis "Live, updates daily" (paused to 10-21) and "63.7% overall, ~77% A+" (marked NO SOURCE in the engine; journal 65.1%, 224/344; A+ 75.3%, 70/93); MLB "A+ ~70% (cross-source verified)" (backtest 70.2%; the cross-check is of game results, not of A+); NBA "63.7% / 85%" (2019-23 test window, other windows on the engine pages). Fixed locally 2026-10-13 in stop 1 (pending push): status and record read from each engine's published data; NBA shows no record (its figures are a reconstruction); "nine-stage" removed.
- **79.** Preview hub: "See today's calls" goes to ./worldcup/, which has no calls since July; "Two-way calls on every tournament match" (50 of 104, 3-way); tennis "In season" during the pause. The hub downloads all five app.js files (2.4 MB decoded) to compute five status pills. The engine cards are DIVs with no tabindex (7 targets not reachable by keyboard). Partly fixed locally 2026-10-13 in stop 1 (pending push): the CTA goes to an engine with an open call, or says there is none. Still open: "two-way calls on every match", tennis "In season" during the pause, the 2.4 MB download.
- **80.** Tennis: the two pages give opposite verdicts on the same match (Fils: preview "value", classic "Engine below the market · -10% · no value"; ADF, Paul, Bergs: classic "Value +7/+4/+3", preview "quiet"). Preview tier uses stage >= 6, the engine's high set is {5,7,8,9}. Fixed 2026-10-13 in stop 2 (pushed, verified live): the preview "value" is the classic rule, a gap of 3 to 10 on the call side; 2 A+, 3 value, 4 quiet on both pages.
- **81.** Tennis CLV: classic "mean CLV -0.1%", preview hero "-0.47" (cumulative sum) labelled "CLV · winner market", chart header "-0.47 games" (wrong unit, green while negative); per-match "+0.9%" vs "+0.009". Fixed 2026-10-13 in stop 2 (pushed, verified live): one number on both pages, the mean per match, -0.16% with n=304; the cumulative sum is gone.
- **82.** Tennis: name joins are case-sensitive ("Botic Van de Zandschulp" vs "Botic van de Zandschulp"), so the rating falls back to 1500 and the match score to 44. Classic "By surface" shows raw surface Elo under a "blended 60/40" label (Sinner 2276 vs 2298). Guide says the Engine bar is Platt-calibrated, "ECE halved"; the code shows the raw probability. Name join fixed 2026-10-13 in stop 2 (pushed, verified live: Van de Zandschulp 1821.9); the "By surface" label and the Platt sentence in the guide stay open. Open.
- **83.** Tennis: 19 journal rows never settled read "Not played yet" and "open positions 19" on classic and as red "✗" on the preview. "Today" on 10-13 shows the 10-11 slate. Classic has no pause notice ("Updated: 20261011"). Open.
- **84.** NBA preview never reads PICKS (`gen_nba_data.py:22-30`): in season the Signals tab will show the last six decided games in the present tense, and the empty message "no NBA games today" on game days. Must be read before 2026-10-20. Fixed locally 2026-10-13 in stop 1 (pending push): the preview reads PICKS; before tip-off "Before the game", after it the frozen row, decided with its score; "no NBA games today" only with no games.
- **85.** NBA: false method texts. "The engine hugs the diagonal, slightly conservative at the high end": overconfident in every band (60-70: 64.7 vs 62.7; 85+: 88.2 vs 85.0), and classic puts a fixed check mark on every band. "Elo picks, rest calibrates": the probability is pure Elo. Classic KPI strip "85/76/85/5,829/+10pp" is typed HTML. NEXT stage 4 is last season's form. Partly fixed locally 2026-10-13 in stop 1 (pending push): "slightly conservative" and "rest calibrates" removed from the preview. Still open: the classic KPI strip, the classic fixed check marks, stage 4 of the next game.
- **86.** NBA: from 2026-10-20 `seasons[-2:]` drops 2024-25 and the label becomes "the last 1 seasons" (`app.js:15` handles k==2 only); "today" is the runner's UTC date (`dashboard.py:505`), so at 03:05Z back-to-back flags and stage asof run a day ahead of ET. Partly fixed locally 2026-10-13 in stop 1 (pending push): the window wording follows the number of seasons ("the last season, 2025-26" from 20.10). Still open: "today" by the runner's UTC date.
- **87.** World Cup: holdout figures 60.4 / 7,318 / 5,655 / 78.3 / 22.8 typed in five places with no script; a recompute gives 7,356 / 5,686 / 78.4 / 60.6 / 22.7. Every preview card says "Group stage" (32 of 104 are knockouts). Classic default view "No upcoming matches right now (rest day)". Preview "LIVE · 2026-10-12", "The World Cup engine, live.", "Threshold edge, collecting" while `REAL.clv` holds final 7.0 on n=50. Fixed 2026-10-13 in stop 2 (pushed, verified live): the holdout block is gone from the five places; the stage comes from the results (72 group, 32 knockout on the preview and the board); "Tournament ended · 19.07" on the preview and the board. Left: the preview track header (item 99) and "Threshold edge, collecting" (not rechecked). Open.
- **88.** Dates across engines: NBA prints mm.dd ("06.13", "10.20"), MLB classic prints dd.mm ("12.08" for 12 August), tennis classic dd/mm, NFL/MLB/WC preview English month names in the Hebrew view ("8 Oct", "Jun 13", "Oct 13 · 8:00 PM EDT"); NFL classic times carry no zone. Fixed 2026-10-13 in stop 2 (pushed, verified live): dd.mm and dd.mm.yyyy on every page, no English month name in the Hebrew view. Left: items 100 and 101.
- **89.** Hebrew view: negative numbers without LRM render with the minus after the number. Seen as "פער 15%-" on NFL classic (screenshot). Unmarked minus texts counted: NFL preview 15 values, NFL classic 13 values, NBA ("Δ10 Elo -13", "m-18"), MLB ("-1.5..+1.5"), tennis (“-0.47”, "-3% · אין ערך"), WC ("▼-23", "-0.3%"). Open.
- **90.** Language leaks: English mode shows Hebrew (MLB both pages "<3% שתיקה"; NBA classic tier names; WC classic "דגל 🔥 הפתעה על צד-הפער"); Hebrew mode shows English labels ("Over/Under" on NFL classic cards, "Pick a date", "off/def" NBA classic, "Elite ... Bottom" NFL, country names on WC classic, the results header "Match Tick CLV Brier" on the tennis preview, "PREDICTION ENGINE" headers on all previews). Open.
- **91.** Published "collecting" and lone dashes where a value exists or never can: NBA preview hero CLV "collecting", "Totals over/under direction · collecting" (NBA has no totals line), invented CLV zig-zag beside "- collecting pts"; drawdown/Brier "collecting" on NBA, MLB and WC previews (Brier is computable); tennis track "BACKTEST ACCURACY · HOLDOUT" over two lone "-" tiles; NFL integrity Brier "-" while meta holds 0.2234. Open.
- **92.** Design: tap targets under 44 px on every page (all 8 on NFL classic, all 14 on NBA classic, 48 date chips on the tennis preview, 52 on tennis classic); WC preview at 390 px: the floating "↑ Top" covers the "All" sub-tab; tennis classic shows its "Skip to content" link at all times, cut; tennis preview at 390 px cuts player names (4 tiles, 12 ranking rows); NFL preview blank "🏙️" chip left from the removed Teams tab; body text below 4.5:1 on classic NFL (10.5 px labels 3.21:1, "no value" 1.77:1, the "No A+ call" line about 3:1) and tennis classic (3.45-4.06:1). Open.
- **93.** MLB preview: a tile with no market price drew an empty market bar ("TBA %"), a "too close" tag, "In line with market" and an Edge block. Fixed locally 2026-10-13 in stop 1 (pending push): no market row, tag "quiet", note "Quiet · no market price", no Edge without a price.
- **94.** NBA preview: with today's games on the board but no open A+, the featured slot said "There are no NBA games today". Fixed locally 2026-10-13 in stop 1 (pending push): "No open A+ call".
- **95.** NFL preview, Hebrew view: "Honest note." in English before the Hebrew caveat. Fixed 2026-10-13 in stop 2 (pushed, verified live: 0 in the Hebrew view of both NFL pages).
- **96.** NBA preview: an illustration row "68% / 32%, Elo + rest" (app.js, not rendered) keeps the old claim. Fixed 2026-10-13 in stop 2 (pushed; the row is gone from the served app.js).
- **97.** Preview hub: the button said "See today's calls" and led to an NFL A+ call of Sunday (an open call of this week). Wording fixed 2026-10-13: "See open calls" / "צפה בקריאות הפתוחות"; with none, "No open calls right now" / "אין קריאות פתוחות כרגע".

## Stop 2 live check 2026-10-13 (items 98 to 101)

- **98.** Tennis journal: 4 voided rows carry clv 0.0 with no closing price. `blank_default_clv.py` leaves voided rows as they are (a voided row never counts), so they keep the default. Queued for after 2026-10-20. Open.
- **99.** World Cup preview, track tab: the header "BACKTEST ACCURACY · HOLDOUT" / "דיוק בבדיקה לאחור · HOLDOUT" stood over the live tournament record (76.0%, 38 of 50), before and after stop 2. Fixed locally 2026-10-13 (pending push): "A+ RECORD · THE TOURNAMENT" / "רקורד A+ · הטורניר".
- **100.** World Cup classic page (`worldcup_dashboard.html`, published as classic.html): English dates were mm.dd ("06.15") and the update stamp yyyy-mm-dd; missed in stop 2 (the date test covered `board_template.html` only). Fixed locally 2026-10-13 (pending push), red then green.
- **101.** MLB: "Backtest computed 2026-10-13 13:55 UTC" (both pages, both languages) and the journal notes "Voided 2026-10-07: ..." print yyyy-mm-dd. Queued for after 2026-10-20: both to dd.mm.yyyy. Open.
- **102.** Tennis preview, track tab: the header "BACKTEST ACCURACY · HOLDOUT" / "דיוק בבדיקה לאחור · HOLDOUT" stands over no figure ("No backtest figure is published for tennis yet"). The header goes. Queued for after 2026-10-20. Open.
