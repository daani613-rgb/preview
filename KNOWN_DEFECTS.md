# Known defects (recorded, not fixed)

Recorded 2026-10-09. Each item is a known defect left in place on purpose. Nothing here changes behavior.

## Status (measured 2026-10-22, from the code and the commits at origin/main, not from the text)

Counts over items 1 to 115: **closed 74**, **open 39**, **undecidable 0**, **record only 2** (11 and 19, decided 2026-10-22 overnight; 49 decided open by measurement). Item 115, and the later entries of 103, 105, 106, 110 and 114, exist only in this local copy (not yet on origin/main). Record-only items (a known behaviour kept on purpose) are marked "(record only)". Method: four read-only checks of the code and commit history, with five claims re-checked by hand (items 31, 36, 56, 104, 115). Per-item tables: the research repository, kd_2026-10-22/.

| item | status | evidence (commit, on main, file:line at origin/main) | reason |
|---|---|---|---|
| 1 | closed | nfl-engine 301a161, yes; preview_build/gen_nfl_data.py:118-131 | Ties are broken by date, time, away and home after the games still to play. |
| 2 | open | no fix commit; preview mlb/app.js:567-568, mlb/index.html:206-207 | Today's slate note still shows on the Yesterday view. Fixed locally 2026-10-22 on kd-002-2026-10-22 (pending push, D7); 30-day replay passed. |
| 3 | open | baseball-engine totals/totals_predict.py:197, :262; totals/totals_log.csv has 2,752 lines with `no_market` | The old path still writes "no_market"; the log rows are unchanged. |
| 4 | open | baseball-engine totals/totals_clv_journal.py:29-31, 34-44; called at totals/predictions_journal.py:226 without try/except | An empty start time still raises ValueError inside upsert. Reproduced 2026-10-22 with the engine's code; draft declaration (research PREREG_DRAFT_KD4_KD60.md). |
| 5 | open | tennis-engine clv_journal.csv: 59 of 367 rows have empty start_iso, not voided | A data defect, still there. |
| 6 | open | tennis-engine collect_tennis.py:136, :171 | The journal start time is frozen at the first write. |
| 7 | open | nfl-engine nfl_pinnacle_close.py:57-69; nfl_build.py:534-535 | The close is measured against the scheduled kickoff, not the actual one. |
| 8 | closed | nba-engine a977540, 0ebcf2e, f5ba06d, yes; preview_build/gen_nba_data.py:255-264; 71a084a (item 18) | Fields with no source are gone from the tiles. |
| 9 | open | baseball-engine stages.py:44-50; predict_baseball.py:62 | classify_stage has no look-ahead guard of its own. |
| 10 | closed | baseball-engine 330d1e8, yes; games_2024.csv, games_2025.csv in the tree; predict_baseball.py:24 | The chain runs 2010-2026 with no gap. |
| 11 | record only | baseball-engine baseball_log.csv at origin/main: 42 rows, all chain_version 2010_2023+2026, none 2010_2026_full (decided 2026-10-22 overnight) | The situation recorded has not happened yet: the log holds one chain. |
| 12 | closed | baseball-engine 330d1e8, yes; log_baseball.py:21-23 | FIELDS matches the header. |
| 13 | closed | nba-engine a4929a2, yes; .github/workflows/daily.yml:44 | The key is set in the Build dashboard step. |
| 14 | closed | preview edfc4a8, yes; nba/app.js:598, :600, nba/index.html:114, :835; nba-engine gen_nba_data.py:491-493 | No featured card without a featured game. |
| 15 | closed | nba-engine a4929a2, yes; preview_build/gen_nba_data.py:143-149, :263-264 | Band matched by numeric bounds. The item's "Remaining" part is still open: dashboard.py:226 rounds before _band_for. |
| 16 | closed | nba-engine 7254266, yes; dashboard.py:227, 601; dashboard.html:849, 853-854; gen_nba_data.py:221-223 | Both pages read the is_aplus flag. |
| 17 | open | nba-engine preview_build/gen_nba_data.py:427-434 (cubes `data: []`); note fixed a4929a2 (:421-422) | The three day cubes are still never built. |
| 18 | closed | nba-engine 71a084a, yes; dashboard.py:141-187; dashboard.html:488, :698 | Expected total connected, dead branch removed. |
| 19 | record only | (decided 2026-10-22 overnight) | A pattern worth copying, not a defect. |
| 20 | closed | tennis-engine 565cb5e, yes; gen_tennis_data.py:118-124; tennis_dashboard.html:408; tennis_dashboard.py:167; preview d46b0ca, yes; tennis/app.js:772 | The pages use the engine's A+ flag. |
| 21 | closed | preview d46b0ca, yes; tennis/app.js:820, :836 | Results found by date and names. |
| 22 | closed | tennis-engine 565cb5e, yes; gen_tennis_data.py:290-293; preview tennis/app.js:1001 | An empty slate no longer raises IndexError. |
| 23 | closed | tennis-engine 5f5eb0e, yes; gen_tennis_data.py:353 | The month key is YYYY-MM. |
| 24 | closed | preview ea8f97e, yes; tennis/app.js:322-328 | The kicker follows the featured card. |
| 25 | closed | preview ea8f97e, yes; tennis/app.js:329-338, :1026 | PAUSED shown during the pause. |
| 26 | closed | preview ea8f97e, yes; tennis/app.js:372, :342, :345 | CLV no longer labelled or plotted in games. |
| 27 | closed | tennis-engine 5f5eb0e, yes; tennis_dashboard.html:456 | The classic card shows one number. |
| 28 | closed | preview ea8f97e, yes; tennis/app.js:872-873 | No price: no claim of "in line". |
| 29 | closed | preview ea8f97e, yes; tennis/app.js:874-878 | Big gaps are no longer "in line". |
| 30 | closed | tennis-engine 5f5eb0e, yes; tennis_dashboard.html:466-472 | Negative gaps are no longer "in line". |
| 31 | closed | preview ea8f97e, yes; preview tennis/app.js:723 `rf.engPick != null ? rf.engPick : null` | The fallback of 72 is gone. |
| 32 | closed | preview ea8f97e, yes; tennis/app.js:1004 `featEdgeTarget: ... : ''` | With no edge there is no count-up target; it used to be 0. |
| 33 | closed | preview ea8f97e, yes; tennis/app.js:841 `mktA: hasMktH ? 100 - t.mktH : null` | The away market share no longer falls back to 50. |
| 34 | closed | tennis-engine 5f5eb0e, yes; preview_build/gen_tennis_data.py:581 `round(pick_elo) if pick_elo else None` | Elo 0 is no longer published. |
| 35 | closed | tennis-engine 5f5eb0e, yes; gen_tennis_data.py:31, :440-441, :490 | The typed 1500 and the matches-10 default were removed. |
| 36 | open | no fix commit; tennis-engine tennis_dashboard.py:17 `PLATT_A, PLATT_B = 0.903, 0.001` | The constants are still there with no producing script (unused and not shown). |
| 37 | open | no fix commit; tennis_dashboard.py:28 `ACCURACY = {"overall": 63.7, ...}` (published as null) | The numbers with no producing script are still in the code (not published). Fixed locally 2026-10-22 on kd-037-2026-10-22 (pending push, D7); page byte-identical, replay 30/30. |
| 38 | closed | preview ea8f97e, yes; tennis/app.js:372 and :416 | The constant-dash KPI tile is gone. |
| 39 | closed | tennis-engine 5f5eb0e, yes; gen_tennis_data.py:172 | The Normal-approximation ladder was removed. |
| 40 | closed | preview d46b0ca, yes; `git grep howBullets origin/main -- tennis/` finds nothing | The howBullets block was deleted. |
| 41 | closed | tennis-engine 5f5eb0e, yes; tennis_frozen.py:64; gen_tennis_data.py:101; tennis_dashboard.py:55 | The price comes from the row with the same date and both players. |
| 42 | closed | tennis-engine 5f5eb0e, yes; gen_tennis_data.py:650-651, :242, :281; tennis_dashboard.html:490 | The Brier shown is the binary score (the journal stores the two-class sum). |
| 43 | closed | nfl-engine 301a161, yes; nfl_build.py:171-175, :314 | A game with no frozen pre-game row carries no model fields. |
| 44 | closed | nfl-engine 301a161, yes; preview_build/gen_nfl_data.py:126-129 | Games still to play come first on the board. |
| 45 | closed | preview 2c22d7a, yes; nfl/app.js:420 | The featured-card title was corrected. |
| 46 | closed | nfl-engine 301a161, yes; nfl_build.py:227; gen_nfl_data.py:53-54; nfl_template.html:450-451 | Both pages read one list, week.aplus_open. |
| 47 | closed | nfl-engine 301a161, yes; nfl_template.html:312 | A tie is no longer read as wrong. |
| 48 | open | preview 2c22d7a, yes (nfl/app.js:746-753); nfl-engine 27f72a4, yes (nfl_build.py:322-338); still at nfl_template.html:425-441 | The classic page still has no live season record. |
| 49 | open | gh API, scheduled runs 2026-10-08 to 2026-10-21 (research kd_2026-10-22/item49_runs_2026-10-08_to_21.md): MLB 66 of 98, NFL 26 of 28; NBA 14 of 14 (1 failed), tennis 42/42, WC daily 14/14, goals 28/28 | Decided by measurement 2026-10-22 overnight: missed runs remain for MLB and NFL. |
| 50 | closed | tennis-engine 5f5eb0e, yes; gen_tennis_data.py:308; preview tennis/app.js:752 | The English 'Today' fallback was removed. |
| 51 | closed | tennis-engine 5f5eb0e, yes; tennis_dashboard.html:456; tennis_dashboard.py:54 | Both pages show p_home; conf_cal is not shown. |
| 52 | closed | tennis-engine 5f5eb0e, yes (gen_tennis_data.py:287-293); preview ea8f97e, yes (tennis/app.js:322-328) | The featured card follows the NFL rule. |
| 53 | closed | baseball-engine 96c2a97, yes; baseball_daily.py:100-134, :225 | Started games take their frozen row or carry no model fields. |
| 54 | closed | baseball-engine 96c2a97 and f0c4100, yes; totals/predictions_journal.py:195 | The FIP display block is frozen at first pitch. |
| 55 | open (record only) | no fix commit; worldcup-engine predictions_log.csv:16 | The row written after kickoff is still in the log, unmarked (record-only item). |
| 56 | open | no fix commit; baseball-engine totals/predictions_journal.py:91-92 | The doubleheader key is unchanged; the missing postseason rows were not backfilled. 2026-10-22: checked against StatsAPI by game_pk, 13/18 doubleheader rows hold the other game's score; 19/20 PENDING never settle; draft declaration (D4). |
| 57 | open | no fix commit; baseball_daily.py:111-112 | Before first pitch today_all shows a recomputed value, not the frozen one. |
| 58 | open | no fix commit; baseball-engine .gitignore:17 `totals/today_totals.json` | today_totals.json is not kept in git, so it cannot be measured. |
| 59 | open | no fix commit; baseball_daily.py:141 | "Today" is still the runner's UTC date. |
| 60 | open | nba-engine 6c9af15, yes (TRACK, dashboard.py:487-497); CALIB at dashboard.py:479, :489 | CALIB still includes reconstructed 2026-27 games. |
| 61 | open (record only) | no fix; nba-engine dashboard.py:199 `keep = set(seasons[-2:])`; label preview c494f07, yes | The two-season window is still in the code (record-only item; only the label was added). |
| 62 | open (record only) | no fix; nba-engine dashboard.py:477; gen_nba_data.py:70 | The five-season window moves a whole season at a time (record only). |
| 63 | closed | nfl-engine e436ba1, yes, nfl_template.html:304, 309; preview cdf7f5a, yes, nfl/app.js:457, 566 | Decided A+ games read "was an A+ call" from the frozen row. |
| 64 | closed | nfl-engine e436ba1, yes, nfl_template.html:488; preview cdf7f5a, yes, nfl/app.js:246 | The Teams tab was removed. |
| 65 | open | no fix; baseball-engine preview_build/gen_mlb_data.py:426-427 | The board marks winner A+ from win_verdict; win_call is not read. |
| 66 | open | no fix; nba-engine preview_build/gen_nba_data.py:477-482 | Results-view games have no A+ field. |
| 67 | closed | tennis-engine 5f5eb0e, yes; tennis_frozen.py:74; gen_tennis_data.py:111; tennis_dashboard.py:51 | Started matches shown from their journal row or left out. |
| 68 | closed | tennis-engine 5f5eb0e, yes; tennis_dashboard.html:538, 541 | Date and flag printed only when the label differs. |
| 69 | closed | baseball-engine 7ed43fc, yes; totals/market_snapshot.py:30, 54-68, 232; predictions_journal.py:181 | A price comes only from the same not-yet-started game. |
| 70 | closed | baseball-engine 7ed43fc, yes; totals/predictions_journal.py:177-186, 232-233 | Market fields written only while not started. |
| 71 | open | no fix; baseball-engine preview_build/gen_mlb_data.py:427 | tot_verdict == 'aplus' still gives the A+ state. |
| 72 | open | no fix; baseball-engine gen_mlb_data.py:83, 440; preview mlb/app.js:18 | The number shown is pure Elo while the guide says it accounts for the starter. |
| 73 | open | no fix; baseball-engine baseball_dashboard.py:313 vs gen_mlb_data.py:390-403, :491 | The pages use different totals lines. |
| 74 | closed | nfl-engine 27f72a4, yes, nfl_build.py:167-191; preview b25d907, yes, nfl/app.js:464, 560 | A game counts as started at kickoff and is shown from its frozen row. |
| 75 | closed | nfl-engine 27f72a4, yes, nfl_template.html:440; preview b25d907, yes, nfl/app.js:231, 257, 264 | Both pages say the CLV reading is scheduled for 29.11. |
| 76 | closed | nfl-engine 27f72a4, yes; nfl_build.py:327-338; nfl_template.html:435 | totals_n computed from the frozen rows. |
| 77 | open | no fix; preview nfl/app.js:511, :582-586 | The value tag names no side or team. |
| 78 | closed | daani613-rgb.github.io 6be0831, yes; index.html:103, 144 | The hub reads each engine's published app.js. |
| 79 | open | CTA fixed preview 2caa10a, yes; rest at preview hub.app.js:229, :257, :29 | "Two-way calls on every tournament match", "In season" pill and the five-file fetch remain. |
| 80 | closed | tennis-engine ce8016c, yes; gen_tennis_data.py:117-129 | Preview "value" follows the classic rule. |
| 81 | closed | tennis-engine ce8016c, yes; gen_tennis_data.py:329-335; preview tennis/app.js:376 | One mean CLV per match with n. |
| 82 | open | name join fixed ce8016c, yes; rest: gen_tennis_data.py:513; tennis_dashboard.html:360-361 vs :456 | The "By surface" label and the Platt sentence remain while the raw p is shown. |
| 83 | open | no fix; tennis-engine tennis_dashboard.html:494-496, :260, :691 | Unsettled rows read "Not played yet"; no pause notice on the classic page. Text fixed locally 2026-10-22 on kd-083-2026-10-22, pause notice on c-tennis-pause-2026-10-22 (pending push); replay passed. Root cause of the 19 rows measured (±1 day window); draft declaration (D6). |
| 84 | closed | nba-engine c6c996f, yes, gen_nba_data.py:275-315; preview c494f07, yes | Today's tiles built from PICKS by phase. |
| 85 | open | no fix for the rest; nba-engine dashboard.html:301 (KPI "5,829" typed) | The classic KPI strip is still hand-typed. |
| 86 | open | label preview c494f07, yes; nba-engine dashboard.py:507 `datetime.date.today()` | "Today" is still the runner's UTC date. |
| 87 | closed | worldcup-engine c8fb789, yes; gen_worldcup_data.py:866; board_template.html:1017; preview worldcup/app.js:8, 475, 477 | Holdout block gone; "Tournament ended" shown. |
| 88 | closed | preview 8533ec9, yes; nba-engine 50b7672, yes, gen_nba_data.py:179-180 | Dates are dd.mm / dd.mm.yyyy. |
| 89 | closed | preview 45e951f, yes, assets/bidi.js:2-5; nfl-engine 3582637, yes; tennis-engine bd99844, yes; daani613-rgb.github.io 558435a, yes | An LRM precedes a leading minus. |
| 90 | open | no fix; preview mlb/index.html:93, nba/index.html:68, nfl/index.html:71 | English-only headers in the Hebrew view. Fixed locally 2026-10-22 on kd-090-2026-10-22 (pending push, D7); replay P4 300/300. |
| 91 | open | preview nba/app.js:331, :766; mlb/app.js:789; worldcup/app.js:1119; nfl/app.js:736 | The "collecting" placeholders and the NFL Brier dash are still in the code. |
| 92 | open | 45e951f, yes (assets/a11y.css:3); preview nfl/index.html:290 still renders the teams chip | Tap targets fixed; the NFL chip remains; the overlap and cut names can only be judged on screen. Chip removed locally 2026-10-22 on kd-092-2026-10-22 (pending push, D7); replay P3 60/60. |
| 93 | closed | 0f408ab, yes; preview mlb/app.js:586, :718, :842 | Without a price there is no market row, tag or Edge. |
| 94 | closed | c494f07, yes; preview nba/app.js:835 | "No open A+ call" with games on the board. |
| 95 | closed | 8533ec9, yes; preview nfl/app.js:291; nfl-engine nfl_template.html:466-467 | The Hebrew view no longer shows "Honest note." |
| 96 | closed | 8533ec9, yes | The old claim row is gone. |
| 97 | closed | 87c11ff, yes; preview hub.app.js:286-287 | "See open calls" or "No open calls right now". |
| 98 | open (record only) | tennis-engine clv_journal.csv:256, 271-273; blank_default_clv.py:20-21 | The data is unchanged; the item calls it "Done" because the rows are left on purpose and counted nowhere (record only). |
| 99 | closed | a8d8712, yes; preview worldcup/app.js:481, :545 | Header reads "A+ RECORD · THE TOURNAMENT". |
| 100 | closed | worldcup-engine fb9c900, yes; worldcup_dashboard.html:261, :283 | dd.mm in both languages. |
| 101 | closed | baseball-engine af5b39e, yes (baseball_dashboard.html:671, :790); preview c3a7962, yes (mlb/app.js:265) | Stamps and void reason print dd.mm.yyyy. |
| 102 | closed | c3a7962, yes; preview tennis/app.js:321, :341, :386 | The HOLDOUT header is replaced by the journal's figures. |
| 103 | closed | worldcup-engine 30358a4, yes; gen_worldcup_data.py:913; preview 2c0519a, yes | The unread keys are off the payload; the update text (e8d8726) is not on main. |
| 104 | open | fix not on main (8a6187d preview, 8fc774e root); preview hub.app.js:29, root index.html:144 | Both hubs still download all five app.js. |
| 105 | closed | baseball-engine 75dda0f, yes; aplus_record.py; baseball_dashboard.py:367-370; preview mlb liveRecord 30/18 | The MLB A+ record comes from the frozen journal; the update text (e4ff1a5) is not on main. |
| 106 | closed | baseball-engine b714aaa (measurement), yes; baseball_dashboard.py:399; gen_mlb_data.py:40 | Both pages read one holdout.json. |
| 107 | closed | nba-engine c7a89b1, 08d08fa (measurement), yes | Cell figure measured against the raw probability (item 112). |
| 108 | closed | 73c33c1, yes; preview assets/a11y.css:4-5 | Cards left out of the inline-flex rule. |
| 109 | closed | 14f04ca, yes; preview tennis/index.html:247 | Wrap and ellipsis fixes on main. |
| 110 | open | fix not on main (baee656); preview nfl/index.html:216 | The bar label is unchanged on main. |
| 111 | closed | nfl-engine 3d13105, yes; gaps_check.py; nfl_build.py:510-514; daily.yml:31 | The NFL gap check exists and runs. |
| 112 | closed | nba-engine 9d5f89f, yes; dashboard.py:114 | Stages from earlier games only. |
| 113 | open | nba-engine 4a4a5e5, 9e9a37b, yes; validate_stages.py:15, holdout_test.py:27, backtest_playoffs.py:29 still call classify_stage(..., asof=d) | Claims and slogan corrected; three scripts still give leaked figures (kept on purpose). |
| 114 | closed | nba-engine 5efbc4f (measurement), yes; dashboard.py:536 | 0 of 2,644 affected; the update entry exists only locally. |
| 115 | open | tennis-engine run_live.py:41 `atp.sort(reverse=True)` (7fec1e4); entry only local (6cb0d51) | Unfixed; run_live.py is protected. |

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
  - **Added 2026-10-22 15:15Z (research PROPOSAL_MLB_DOUBLEHEADER_KEY.md, checked against MLB StatsAPI by game_pk):**
    - **The finding:** 13 of the 18 settled journal rows on doubleheader keys hold the score of the day's *other* game,
      not their own.
    - **The mechanism:** settle looks up by date|home|away only (totals/predictions_journal.py:329). The first final
      game of the day settles the shared row, and a DONE row is never settled again.
    - **6 of the 13 are totals A+ calls** shown in the journal view with the other game's verdict. If re-graded on
      their own game, all 6 flip:
      - right to wrong: 07-11 PIT-MIL and 07-22 BOS-BAL;
      - wrong to right: 07-19 NYA-LAN, 08-29 NYA-BOS, 09-04 CLE-DET and 09-22 NYA-TBA.
    - **totalsDir** would read 681 of 1,320, not 682 [derived].
    - **Not changed:** liveRecord, because all 13 rows are silent on the winner.
    - **The rows themselves are not touched:** they are in the locked journal.
    - **The fix:** proposed (key and settle by game_pk). It waits for approval (decision D4).
  - **Added 2026-10-22 15:25Z: the root is postponed games** (the same research file).
    - **The finding:** 19 of the 20 PENDING journal rows will never settle as the code stands:
      - 9 were postponed and played in a later doubleheader;
      - 5 were made up as single games, each with a second settled row under the same game_pk;
      - 1 was cancelled;
      - 4 are postseason games with no data in StatsAPI.
    - **What a reader sees:** 11 of the 19 are totals A+ calls, shown in the journal view as unresolved.
    - **The fix must also:**
      - settle a postponed game's own row on its make-up date, by game_pk;
      - void cancelled or unneeded games, with a reason.
  - **Added 2026-10-22 16:11Z:** of the 6 totals A+ flips, 4 are certain (the line was locked in the row's creation run). 2 are uncertain (09-04 CLE-DET and 09-22 NYA-TBA, locked in a later run whose entry order is not stored).
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
  - **Added 2026-10-22 15:38Z: why the 19 never settle** (research TENNIS_UNSETTLED_2026-10-22.md, read only).
    - **The settlement window:** ±1 day around the journal date (collect_tennis.py:211-213).
    - **8 rows** are Canada Masters matches that TML records two days later (08-04/05 against 08-02/03), so the
      window never sees them. On every settled row the gap is 0 or 1 day.
    - **7 rows** have no TML 2026 match by player ids.
    - **4 rows** match only another meeting of the pair.
    - **5 of the 19 are A+ calls.**
    - **Proposed:** settle within the tournament, and void rows not found after the event ends. The journal is not
      touched.
- **84.** NBA preview never reads PICKS (`gen_nba_data.py:22-30`): in season the Signals tab will show the last six decided games in the present tense, and the empty message "no NBA games today" on game days. Must be read before 2026-10-20. Fixed locally 2026-10-13 in stop 1 (pending push): the preview reads PICKS; before tip-off "Before the game", after it the frozen row, decided with its score; "no NBA games today" only with no games.
- **85.** NBA: false method texts. "The engine hugs the diagonal, slightly conservative at the high end": overconfident in every band (60-70: 64.7 vs 62.7; 85+: 88.2 vs 85.0), and classic puts a fixed check mark on every band. "Elo picks, rest calibrates": the probability is pure Elo. Classic KPI strip "85/76/85/5,829/+10pp" is typed HTML. NEXT stage 4 is last season's form. Partly fixed locally 2026-10-13 in stop 1 (pending push): "slightly conservative" and "rest calibrates" removed from the preview. Still open: the classic KPI strip, the classic fixed check marks, stage 4 of the next game.
- **86.** NBA: from 2026-10-20 `seasons[-2:]` drops 2024-25 and the label becomes "the last 1 seasons" (`app.js:15` handles k==2 only); "today" is the runner's UTC date (`dashboard.py:505`), so at 03:05Z back-to-back flags and stage asof run a day ahead of ET. Partly fixed locally 2026-10-13 in stop 1 (pending push): the window wording follows the number of seasons ("the last season, 2025-26" from 20.10). Still open: "today" by the runner's UTC date.
- **87.** World Cup: holdout figures 60.4 / 7,318 / 5,655 / 78.3 / 22.8 typed in five places with no script; a recompute gives 7,356 / 5,686 / 78.4 / 60.6 / 22.7. Every preview card says "Group stage" (32 of 104 are knockouts). Classic default view "No upcoming matches right now (rest day)". Preview "LIVE · 2026-10-12", "The World Cup engine, live.", "Threshold edge, collecting" while `REAL.clv` holds final 7.0 on n=50. Fixed 2026-10-13 in stop 2 (pushed, verified live): the holdout block is gone from the five places; the stage comes from the results (72 group, 32 knockout on the preview and the board); "Tournament ended · 19.07" on the preview and the board. Left: the preview track header (item 99) and "Threshold edge, collecting" (not rechecked). Open.
- **88.** Dates across engines: NBA prints mm.dd ("06.13", "10.20"), MLB classic prints dd.mm ("12.08" for 12 August), tennis classic dd/mm, NFL/MLB/WC preview English month names in the Hebrew view ("8 Oct", "Jun 13", "Oct 13 · 8:00 PM EDT"); NFL classic times carry no zone. Fixed 2026-10-13 in stop 2 (pushed, verified live): dd.mm and dd.mm.yyyy on every page, no English month name in the Hebrew view. Left: items 100 and 101.
- **89.** Hebrew view: negative numbers without LRM render with the minus after the number. Seen as "פער 15%-" on NFL classic (screenshot). Unmarked minus texts counted: NFL preview 15 values, NFL classic 13 values, NBA ("Δ10 Elo -13", "m-18"), MLB ("-1.5..+1.5"), tennis (“-0.47”, "-3% · אין ערך"), WC ("▼-23", "-0.3%"). Fixed locally 2026-10-13, part 2 (pending push): an LRM before every minus that starts a number, on every render (preview/assets/bidi.js; the same code inline in the six classic pages and the root hub). Measured in Hebrew at 390 and 1024: unmarked minus signs NFL classic 70, tennis classic 253, World Cup board 148, tennis preview 10 before; 0 on all 13 pages after; seen fixed on NFL classic ("פער -2%") and the tennis hero ("-0.16%"). A hyphen after a letter or a digit is left alone by rule ("m-18" stays as written). Done.
- **90.** Language leaks: English mode shows Hebrew (MLB both pages "<3% שתיקה"; NBA classic tier names; WC classic "דגל 🔥 הפתעה על צד-הפער"); Hebrew mode shows English labels ("Over/Under" on NFL classic cards, "Pick a date", "off/def" NBA classic, "Elite ... Bottom" NFL, country names on WC classic, the results header "Match Tick CLV Brier" on the tennis preview, "PREDICTION ENGINE" headers on all previews). Open.
- **91.** Published "collecting" and lone dashes where a value exists or never can: NBA preview hero CLV "collecting", "Totals over/under direction · collecting" (NBA has no totals line), invented CLV zig-zag beside "- collecting pts"; drawdown/Brier "collecting" on NBA, MLB and WC previews (Brier is computable); tennis track "BACKTEST ACCURACY · HOLDOUT" over two lone "-" tiles; NFL integrity Brier "-" while meta holds 0.2234. Open.
- **92.** Design: tap targets under 44 px on every page (all 8 on NFL classic, all 14 on NBA classic, 48 date chips on the tennis preview, 52 on tennis classic); WC preview at 390 px: the floating "↑ Top" covers the "All" sub-tab; tennis classic shows its "Skip to content" link at all times, cut; tennis preview at 390 px cuts player names (4 tiles, 12 ranking rows); NFL preview blank "🏙️" chip left from the removed Teams tab; body text below 4.5:1 on classic NFL (10.5 px labels 3.21:1, "no value" 1.77:1, the "No A+ call" line about 3:1) and tennis classic (3.45-4.06:1). Tap targets and contrast fixed locally 2026-10-13, part 2 (pending push): 0 tap targets under 44 x 44 and 0 text pairs under 4.5:1 (3:1 large) on all 13 pages, Hebrew, 390 and 1024 (before: 593 tap targets, 71 failing colour pairs on 13,772 text elements). The opacity dimming of NFL non-A+ games, tennis silent cards and World Cup silent matches is removed: no opacity level kept the bar labels at 4.5. Still open: the "↑ Top" button over "All" at 390, the tennis preview cutting player names at 390, the empty "🏙️" chip on the NFL preview. Open.
- **93.** MLB preview: a tile with no market price drew an empty market bar ("TBA %"), a "too close" tag, "In line with market" and an Edge block. Fixed locally 2026-10-13 in stop 1 (pending push): no market row, tag "quiet", note "Quiet · no market price", no Edge without a price.
- **94.** NBA preview: with today's games on the board but no open A+, the featured slot said "There are no NBA games today". Fixed locally 2026-10-13 in stop 1 (pending push): "No open A+ call".
- **95.** NFL preview, Hebrew view: "Honest note." in English before the Hebrew caveat. Fixed 2026-10-13 in stop 2 (pushed, verified live: 0 in the Hebrew view of both NFL pages).
- **96.** NBA preview: an illustration row "68% / 32%, Elo + rest" (app.js, not rendered) keeps the old claim. Fixed 2026-10-13 in stop 2 (pushed; the row is gone from the served app.js).
- **97.** Preview hub: the button said "See today's calls" and led to an NFL A+ call of Sunday (an open call of this week). Wording fixed 2026-10-13: "See open calls" / "צפה בקריאות הפתוחות"; with none, "No open calls right now" / "אין קריאות פתוחות כרגע".

## Stop 2 live check 2026-10-13 (items 98 to 101)

- **98.** Tennis journal: 4 voided rows carry clv 0.0 with no closing price. `blank_default_clv.py` leaves voided rows as they are (a voided row never counts), so they keep the default. Queued for after 2026-10-20. Measured 2026-10-13 (night): the four rows are counted nowhere on the pages: CLV n 304 (308 with them), the monthly segments sum to 304, classic clv_n 304 and n_journal 363 (367 rows less 4), accuracy on 344 settled non-voided rows; mean -0.155% (-0.153% with them). They stay as they are in the journal. Done.
- **99.** World Cup preview, track tab: the header "BACKTEST ACCURACY · HOLDOUT" / "דיוק בבדיקה לאחור · HOLDOUT" stood over the live tournament record (76.0%, 38 of 50), before and after stop 2. Fixed locally 2026-10-13 (pending push): "A+ RECORD · THE TOURNAMENT" / "רקורד A+ · הטורניר".
- **100.** World Cup classic page (`worldcup_dashboard.html`, published as classic.html): English dates were mm.dd ("06.15") and the update stamp yyyy-mm-dd; missed in stop 2 (the date test covered `board_template.html` only). Fixed locally 2026-10-13 (pending push), red then green.
- **101.** MLB: "Backtest computed 2026-10-13 13:55 UTC" (both pages, both languages) and the journal notes "Voided 2026-10-07: ..." print yyyy-mm-dd. Fixed 2026-10-13, rebuilt 2026-10-20 after the local folder was lost (pending push): the stamp through the text formatters (__TS on the preview, __DMIN on the classic page) and the void reason through __DMIN on display (the journal text is unchanged): "Computed 20.10.2026 13:39 UTC", "Voided 07.10.2026: ...", both languages; checked at 23:30 UTC under Asia/Jerusalem (the day stays). Done.
- **102.** Tennis preview, track tab: the header "BACKTEST ACCURACY · HOLDOUT" / "דיוק בבדיקה לאחור · HOLDOUT" stands over no figure ("No backtest figure is published for tennis yet"). The header goes. Fixed 2026-10-13, rebuilt 2026-10-20 (pending push): the header goes; in its place the journal's own figures, built by gen_tennis_data.py from clv_journal.csv: "65.1% · 224 of 344 decided matches right · A+ 70 of 93" (checked against the journal: 224 of 344, A+ 70 of 93). Done.
- **103.** Command Center load on a slow phone (4x CPU, 1.6 Mbps, 150 ms; median of 3 after a warm-up, local build, 2026-10-13): first contentful paint MLB 7.06 s, World Cup 3.51 s, tennis 2.51 s, NFL 1.72 s, NBA 1.39 s, in step with the size of app.js (MLB 1.6 MB over the wire). three.js is not on that path: it was a dynamic import started at mount, and moving it after the first contentful paint (part 2) changed the paint by -16 to +32 ms, so that change was reverted (2026-10-13). Tools and protocol: tools/measure/. Correction 2026-10-13 (night): those figures came from a local server that does not compress; GitHub Pages serves app.js gzipped (MLB 122,813 bytes on the wire, not 1.2 MB). Measured again served compressed (median of 3, same slow profile): first contentful paint NFL 0.70 s, NBA 0.67 s, MLB 1.13 s, tennis 0.84 s, World Cup 1.14 s. The figures above (7.06 s and the rest) are wrong and are kept here only so the correction can be read. MLB with only what the first load reads (journalByDate cut to today's date, keys never read left out): 0.72 s against 1.14 s, about 420 ms less on a slow phone, none on a fast one. Decision of Samuel, 2026-10-13: deferred to after 2026-10-20, as one package: splitting MLB's journalByDate (today's date on the first load, the rest on demand) and the keys the World Cup and tennis pages never read. (Rebuilt 2026-10-19/20 from the transcript after the local folder was lost; text as written 2026-10-13.) Open: the payload size is the owner's decision.
- **104.** Both hubs download all five app.js (2.25 MB on the root hub, 2.35 MB on the preview hub) to show a status line and a record. Fields of a per-engine status.json (about 1.2 KB for the five) defined 2026-10-13, part 2; not written pending approval. Open.
- **105.** MLB: 42 A+ winner calls in the live log (`baseball_log.csv`, 2026, 3 voided) against 30 A+ `win_call` rows in the journal. Measured 2026-10-13: every one of the 42 has a journal row (none is among the 37 games without one); 26 agree; 16 are A+ in the log and silent in the journal (13 counted, 3 voided), 4 are A+ in the journal only; 42 - 16 + 4 = 30. The cause is timing: the journal locks its row at its first write, a day or two before the game, with the stage and probability of then (in 15 of the 16 the journal's stage is 7, 5 or 4 against the log's 8 or 9; in 3 the probability is on the other side of 0.62); the log writes its call on game day. Same root as item 57. Measurement only; the A+ logic is not touched. Decision of Samuel, 2026-10-13: the MLB A+ call is the journal's frozen call (its first write), not the log's game-day decision (MLB_LEAK_PREREGISTER.md, dated section). Aligning the log with the journal: after 2026-10-20. No change to the A+ logic. Open.
- **106.** MLB: the backtest computation time differs between the pages on 2026-10-13: preview "Computed 13.10.2026 19:21 UTC", classic "Backtest computed 13.10.2026 23:45 UTC". Two separate computations behind one number; not checked. Open.
- **107.** NBA: the classic page's cell figure next to each game (`cellAcc`, side x band x stage over all history) is not measured against the raw probability; the CALIB bands were (nba-engine/CALIB_MEASURE_PREREGISTER.md: no difference between daily, frozen and one refit; the raw probability a little ahead, not significant). Measurement after 2026-10-20. Open.

## 2026-10-19: Command Center card overflow (item 108)

- **108.** Command Center game cards at 390 px (NFL, MLB, tennis): the content was wider than the card and cut on both sides ("C @ KC", "s an A+ call", "A+ · str"). Cause: assets/a11y.css (45e951f, part 2) gave every `[role=button]` without its own display `inline-flex` with centring; a card is such an element, so its rows stopped stretching and were centred past both edges. Fixed 2026-10-19: the cards (grid-column in their style) are left out of that rule. Test: tools/measure/scan.js `window.__overflow` (red on live: NFL 10/10, MLB 2/2, tennis 16/18 cards at 390 px; green: 0 everywhere, 390 and 1024, English and Hebrew); tap targets under 44 px stay 0. Not part of 108, older: the NFL "Total points ⌄" row ends 42 px past the card at 390 px in English, the tennis "Total games ⌄" row 23 px (already on the build before 45e951f). The "↑ Top" overlap (92) stays recorded. The exclusion rests on grid-column in the card's style; `window.__overflow` is therefore a standing part of every design scan from 2026-10-19, and is what catches it if the card markup changes. Fixed (pending push).

## 2026-10-20: text leaving or cut inside cards (items 109 and 110)

- **109.** Command Center cards at 390 px: NFL "Total points ⌄" ended 42 px past the card (8 of 10 cards, English), tennis "Total games ⌄" 23 px; tennis long titles ran under the badge and long names in the 30 px bars wrapped to three lines and were cut top and bottom (18 of 18 tennis cards at 390 px, both languages). Older than 108 (the build before 45e951f shows them). Fixed 2026-10-20 (ITEM109_PREREGISTER.md): the footer row may wrap; the tennis title may wrap; the tennis bars hold one line, the name cut with an ellipsis and the percentage kept. Test: tools/measure/scan.js `__overflow` gates descendants, text overlap (per line, visible part) and height cuts; red on live, 0 after on every page, 390 and 1024, English and Hebrew; tap targets under 44 stay 0. Fixed, pushed (preview 2cd1a96).
- **110.** Polish, open, not now: (1) NFL and NBA bars: a narrow segment cuts its label sideways (NFL "IND 18%", NBA "PHI 18%" on 2026-10-20); (2) tennis bars: in a narrow segment the name disappears and only the percentage shows (the full names are in the title); (3) World Cup `classic.html` was not checked by the 109 test: the card selector found no cards there; (4) the NBA and MLB Command Center pages have the same footer and title pattern and had no cards on 2026-10-20, so they were not checked; NBA is checked the first time it shows cards. Open.
- **112.** NBA: the cell figure next to each game ("Similar calls ... X% of n", classic page; the same figure on the preview since 2026-10-20) is read from `dashboard.py` `build_tables`, which counts every past game under the stage of its pick "as of the game's date"; `stages.classify_stage` keeps `t[0] <= asof` and a team's series holds the rating after each game, so that stage already holds the game's own result (POR has an entry dated 2026-01-05, its game day). Measured 2026-10-20 (nba-engine/CELLACC_MEASURE_PREREGISTER.md): with the leak the cell scores far better than the raw probability (Brier 0.1992 against 0.2122 on 1,320 games of 2025-26); with the stage from games before the game's date it is no better (0.2124, interval contains 0). Opening night's figures without the leak: PHI at NYK 83% of 364 (shown 87% of 340), BOS at DET 53% of 1,565 (shown 42% of 1,622), OKC at SAS 54% of 1,192 (shown 63% of 1,160). The figure is hidden on both pages from 2026-10-20 until build_tables is fixed (decision of Samuel). The A+ call does not use the cell; tonight's own key is computed before the game. Open.
- **113.** NBA: the claims that the stage layer adds accuracy rest on the same leak as 112. Measured 2026-10-20. Method: `validate_stages.py`, `holdout_test.py` and `backtest_playoffs.py` read each past game's stage with `classify_stage(..., asof=d)`, which keeps the game's own result; each script was run as it is, and again through a wrapper that reads the stage from games before the game's date only (engine code unchanged). Intervals: Wilson for each rate, Newcombe for the gap.

  | Check | Version | High stage 6/8/9 | Low stage 1-5 | Gap [95%] |
  |---|---|---|---|---|
  | validate_stages (road picks >= 70%, 2010-2024) | with the leak | 330/392 = 84.2% [80.2, 87.5] | 319/498 = 64.1% [59.7, 68.1] | +20.1 points [+14.4, +25.5] |
  | | without | 321/417 = 77.0% [72.7, 80.8] | 373/488 = 76.4% [72.5, 80.0] | +0.5 [-5.0, +6.0] |
  | holdout_test TEST (2019-20 to 2023-24, confidence >= 70%) | with the leak | 481/561 = 85.7% [82.6, 88.4] | 626/966 = 64.8% [61.7, 67.8] | +20.9 [+16.6, +25.0] |
  | | without | 466/609 = 76.5% [73.0, 79.7] | 701/946 = 74.1% [71.2, 76.8] | +2.4 [-2.0, +6.7] |
  | holdout_test TRAIN (to 2018) | with the leak | 898/1042 = 86.2% [84.0, 88.1] | 1295/1811 = 71.5% [69.4, 73.5] | +14.7 [+11.7, +17.6] |
  | | without | 873/1086 = 80.4% [77.9, 82.6] | 1411/1782 = 79.2% [77.2, 81.0] | +1.2 [-1.9, +4.2] |
  | backtest_playoffs (89 playoff games, 2026) | with the leak | 72% (50) | 54% (39) | +18 |
  | | without | 60% (53) | 69% (36) | -9 (n small, no interval) |

  "Almost all of it", in numbers: the gap between high and low stage falls by 97% (validate_stages), 89% (TEST) and 92% (TRAIN); every interval without the leak contains 0; in the playoffs the direction reverses. Overall accuracy (63.7% TEST), confidence >= 80% and the road-pick signal do not depend on the stage and do not move.
  Fair reading: there is no evidence of an advantage of the NBA stage layer. The upper end of the holdout interval is about 6.7 points, so a small effect is not ruled out; what is wrong is the claim of about 20 points.
  The NBA A+ call does not use the stage (`is_aplus = conf_band(prob) in APLUS_BANDS`, bands 80% and up; the pages say "no stage condition"): the live product is not affected. No NBA page shows a stage figure (checked 2026-10-20 on the preview and classic pages, guide included, and both hubs, both languages).
  The rest of the fleet, checked the same day on the data: NFL `measured_meta` reads the stage before the game is added (0 of 7,369 games with an entry on or after the game day) and its live call is on games not yet played; MLB `holdout_test` likewise (0 of 32,483; 483 doubleheader second games see the finished first game), its live call reads finished games only; tennis builds its curves from finished matches and its pages read the frozen row; World Cup and the NFL research use `stages_v2`, strictly before the game. All clean.
  Published only in nba-engine/PROJECT_SUMMARY.md and CLAUDE.md, now with a dated correction beside each claim, nothing deleted. "84% against 68%" in PROJECT_SUMMARY: the script gives 84.2% against 64.1% today; where 68 came from is not known.
  The three scripts still return leaked figures; they are not changed now, and any future use of them needs the stage read from earlier games only (the wrapper, or a fix in the call). The stage layer itself is not changed.
  The NBA classic page's slogan "The engine predicts, the stage explains, calibration proves." / "המנוע מנבא, השלב מסביר, והכיול מוכיח." loses its stage part (2026-10-20, decision of Samuel): the stage does not explain the result in NBA. It appears on that page only; NFL and MLB do not carry it. Open.
- **114.** NBA, display only, not urgent: today's card shows the pick's stage as of today (`dashboard.py` line 536, `asof=today`). If a run happens after another game of the same day is final and in the games file, that team's stage would include that result. The journal freezes its stage before tip-off, so nothing recorded is affected. Not measured. Open.


## 2026-10-20 (night): items not tied to a clock

- **111.** NFL had no automatic gap check. Added (nfl-engine/NFL_GAPS_PREREGISTER.md): `gaps_check.py`, every started game of the season against nfl_predictions.csv and its commit history (no row, no kickoff time, not committed, committed after kickoff) -> gaps.csv, report only, as in the other engines; checkout fetch-depth 0. Red then green (8 of 8); real data 0 of 93. Fixed locally (pending push).
- **114.** Measured (nba-engine/ITEM114_PREREGISTER.md): the pick's series holds only the pick's own games, so another game of the day can never change the card's stage: 0 of 2,644 on 2025-26 (control with the game itself: 985). Closed, no code.
- **106.** Measured (baseball-engine/ITEM106_MEASURE.md): both pages read the same holdout.json from one step of each run; the numbers were equal on every reading; the two times of 2026-10-13 were two runs read side by side. Closed, no code.
- **110.** Fixed locally (ITEM110_PREREGISTER.md, pending push): a bar label follows its segment's width (code hidden, then the percentage, in NFL, NBA and MLB; tennis name, 3-letter code, percentage); scan.js `barCut`. Red on live NFL/NBA at 390 and tennis at 390/1024, green locally. MLB had no cards: not checked. Sub-item (3), World Cup classic.html: checked 2026-10-20, 33 cards, 0. Closed.
- **105.** Wrong figure on live pages: the MLB A+ record was counted from the log (`baseball_log.csv`, the game-day decision), not from the frozen journal. Shown: 26 of 39 (66.7%) on the classic page (counting the log since before the journal existed), the Command Center (since 2026-10-07) and the root hub (since 2026-10-13); right: 18 of 30 (60.0%). The two sources differ from the game of 2026-06-20 on (16 A+ in the log only, 4 in the journal only). Fixed locally 2026-10-20 (baseball-engine/ITEM105_MEASURE.md, decision of Samuel): one source, `aplus_record.py`, reads the journal; the classic TRACK and its list of calls and the payload's liveRecord read it; the root hub and status.json follow through liveRecord with no change of their own; the log stays as an internal record. Red 26 of 39 in every reader, green 18 of 30 in every reader, English and Hebrew. Pending push (engine part).
- **103.** Recon (ITEM103_MEASURE.md): the tennis keys rkOverallAll and rkSurface are read by visible cubes and stay (the 2026-10-13 note that they were never read was wrong); MLB journalByDate is not split (decision of Samuel, 2026-10-20). The World Cup keys results_dates and completed_tiles, read by nothing, leave the payload (worldcup-engine/ITEM103_WC_PREREGISTER.md): line 2 330 KB to 161 KB (gzip 31 KB to 18 KB), the text of every tab equal before and after. Fixed locally, pending push (after the hubs).
- NFL dispersion (nfl-engine/NFL_DISPERSION_PREREGISTER.md, measurement only): against outcomes the one-slope fit is b 0.93 to 0.97, below 1, in every season; no measurable gain (all intervals contain 0); with p' A+ only loses calls. Waiting for a decision.
- **115.** Tennis, `tennis-engine/run_live.py:41` (origin 7fec1e4): `atp.sort(reverse=True)` sorts tuples (activity, tournamentId, tournamentName) with no key, the pattern that failed the NBA run of 2026-10-21 14:39Z (`gen_nba_data.py:508`, fixed in 06bdfe6). It fails only when two ATP tournaments have the same activity (live + upcoming + future fixtures) and their ids cannot be compared (one `tournamentId` missing, so None against a number, or ids of two types), or the ids are equal and a name is missing; then `TypeError` and the live run stops. Not seen so far; the function runs only on a live run that is allowed to call OddsPapi (paused through 2026-11-29). Found 2026-10-21 by a scan of the six repos for that pattern (205 Python files; the only other hits sort strings). `run_live.py` is a protected file: not fixed. The fix, when allowed, is a key on the activity alone (`key=lambda x: x[0]`). Open.
