# TRIALS_LEDGER.md: every trial, written before its result

Created 2026-10-22T02:23Z by tools/build_ledger.py (research repo), in the same commit as SEASON_SPLIT_PREREGISTER.md and
before any stage-2 number. Rule: a look that is not in this file does not exist. A row is added (or its status set
to "registered") before the look; its result is filled after, never edited later except by a dated note.

Moved to preview/TRIALS_LEDGER.md on 2026-10-22 by Samuel's decision (it was research/TRIALS_LEDGER.md, research
commit history up to the move). From the move on, this file is the only ledger; research/TRIALS_LEDGER.md points here.

Counts at creation:
- past: 109 rows, of which 89 were executed, and at least 630 individual comparisons (inventory/trials.md);
- planned exploration: 159 rows.

Thresholds (02_MASTER_PLAN.md section 2):
- exploration: promote only at z >= 3.9 (N = 790);
- (b) and (c): Holm at a family-wise 0.05 over the promoted candidates.

## Past trials (condensed; the full row is in inventory/trials.md)

| id | name | repo | date | pre-registered | data | verdict as written | full row |
|---|---|---|---|---|---|---|---|
| P001 | NFL-CLV-EXPL | nfl | 2026-10-08 | no | NFL 2026 wk1-4, 63 games | RUN, exploration "confirms nothing", used up | trials.md row 1 |
| P002 | NFL-CLV-CONF | nfl | 2026-10-08, amended 10-09/10-11 | yes | from 2026_05_PHI_JAX, n=113 valid | NOTRUN (pending) | trials.md row 2 |
| P003 | NFL-SRC-CHECK | nfl | 2026-10-11 | rule fixed before the check | 65 games 2026 | RUN, pass (instrument "verified", thin margin) | trials.md row 3 |
| P004 | NFL-RANK-FAMILY | nfl | 2026-10-08..11 | partly (§4, 6, 7, 8, 10, 11 "registered  | NFL 2012-2025, 2026 wk1-4 | RUN, "hypothesis generator, not confirmation" | trials.md row 4 |
| P005 | NFL-RANK-MOM-108 | nfl | 2026-10-08 | no | 2020-25, n=108 | LEAK: INVALID, trend crossed season boundary | trials.md row 5 |
| P006 | NFL-RANK-MOM-96 | nfl | 2026-10-09 | yes (20:48 UTC) | 2020-25, n=96 | RUN, "not a confirmation" | trials.md row 6 |
| P007 | NFL-RANK-PAIRED | nfl | 2026-10-09 | no | n=96 | RUN, "not significant, not confirmed" | trials.md row 7 |
| P008 | NFL-RANK-AUC | nfl | 2026-10-09 | no | 2020-25, 1,423 | RUN, "market's order is better" | trials.md row 8 |
| P009 | NFL-RANK-TOTALS | nfl | 2026-10-09 | no | 2020-25, 1,675 | RUN, "zero edge" | trials.md row 9 |
| P010 | NFL-RANK-WK4 | nfl | 2026-10-09 | yes | 2003-2020, 552; clean window 309 | LEAK (look-ahead; "do not cite") | trials.md row 10 |
| P011 | NFL-RANK-WK4-SPEAR | nfl | 2026-10-09 | yes | 2020-25, 6×32 | DESC | trials.md row 11 |
| P012 | NFL-RANK-PRESEASON | nfl | 2026-10-11 | yes | 2003-2020, 552; clean 309 | DESC; no verdict written | trials.md row 12 |
| P013 | NFL-RANK-CONFIRM | nfl | 2026-10-08 | yes | needs 3,149 picks (~173 seasons) | NOTRUN ("not confirmable") | trials.md row 13 |
| P014 | NFL-RANK-EXT | nfl | 2026-10-08 | yes | needs 3,114 (~11-19 seasons); observed 2020-25 n=1,693, +0.0 | NOTRUN as test | trials.md row 14 |
| P015 | REVMOM | nfl=nba | 2026-10-12 | yes | needs ≥8,700 open+close games | NOTRUN by its decision rule | trials.md row 15 |
| P016 | EDGE-D1 | nfl | 2026-10-12 | yes (dc48f6c, sha a74bc953) | ≥200 games per engine | NOTRUN | trials.md row 16 |
| P017 | EDGE-D2a | nfl | 2026-10-12 | yes | tennis, n=281 | RUN, FINDING ("not an edge") | trials.md row 17 |
| P018 | EDGE-D2b | nfl | 2026-10-12 | yes | MLB, n=1,187 | RUN, zero | trials.md row 18 |
| P019 | EDGE-D2c | nfl | 2026-10-12 | yes | NFL 2026, n=77 | RUN, zero | trials.md row 19 |
| P020 | EDGE-D2d | nfl | 2026-10-12 | yes | NFL 2006-25, n=5,181 | RUN, zero | trials.md row 20 |
| P021 | EDGE-D2e | nfl | 2026-10-12 | yes | WC, n=79 (derived join) | RUN, FINDING (draw counted as not-won; partly by definition) | trials.md row 21 |
| P022 | EDGE-D3a | nfl | 2026-10-12 | yes | MLB | NOTRUN | trials.md row 22 |
| P023 | EDGE-D3b-i | nfl | 2026-10-12 | yes | MLB winner, n=1,329 (derived) | RUN; printed "FINDING AGAINST", relabelled "unexplained" | trials.md row 23 |
| P024 | EDGE-D3b-ii | nfl | 2026-10-12 | yes | MLB totals, n=740 | RUN, zero | trials.md row 24 |
| P025 | EDGE-D3b-iii | nfl | 2026-10-12 | yes | tennis, n=263 (derived) | RUN, zero | trials.md row 25 |
| P026 | EDGE-D3b-iv | nfl | 2026-10-12 | yes | NFL, 14 games | DESC | trials.md row 26 |
| P027 | EDGE-D4 | nfl | 2026-10-12 | yes | tennis, WC, NFL | DESC | trials.md row 27 |
| P028 | EDGE-D5 / 5.1 | nfl | 2026-10-12 | yes | none | NOTRUN | trials.md row 28 |
| P029 | FAVLS-PRIMARY | nfl | 2026-10-12 | yes (83816a2, sha c5c1d443) | NFL 2006-25, n=5,254 | RUN, all zero | trials.md row 29 |
| P030 | FAVLS-SECONDARY | nfl | 2026-10-12 | yes | same | RUN, all zero | trials.md row 30 |
| P031 | FAVLS-NEUTRAL | nfl | 2026-10-12 | yes | neutral games, n 4-19 per band | DESC | trials.md row 31 |
| P032 | FAVLS-PIN-SIGN | nfl | 2026-10-12 | yes | 78 | NOTRUN | trials.md row 32 |
| P033 | SOM-COUNT | nfl | 2026-10-12 | yes (sha 0331b7aa) | NFL 2006-25, 10,590 records | STOP ("not constructible") | trials.md row 33 |
| P034 | SOM-OUTCOME | nfl | 2026-10-12 | yes | none | NOTRUN | trials.md row 34 |
| P035 | POOLED-EDGE | nfl | 2026-10-12 | yes (sha 2e9a9eaf) | runs at 2,000 eligible games; 477 now | NOTRUN; underpowered for 3% | trials.md row 35 |
| P036 | SETMKT-STEP0 | nfl | 2026-10-12 | yes (sha c41cdd91) | ≥300 matches | NOTRUN | trials.md row 36 |
| P037 | SETMKT-PRIMARY | nfl | 2026-10-12 | yes | ≥100 per book | NOTRUN | trials.md row 37 |
| P038 | SGP-TENNIS | nfl | 2026-10-12 | yes | ≥100 per book | NOTRUN | trials.md row 38 |
| P039 | DISP-VS-PIN | nfl | 2026-10-12 | no ("added after fe373e4") | NFL 78, tennis 304, WC 95 | RUN: NFL and WC draw "under-dispersed" (diagnostic) | trials.md row 39 |
| P040 | NFLDISP-SLOPE | nfl | 2026-10-20 | yes | NFL 2012-19: 2,128; 2020-25: 1,688; 2026: 92 | RUN, no difference; expected direction wrong; closed (84-89) | trials.md row 40 |
| P041 | NFLDISP-APLUS | nfl | 2026-10-20 | yes | 2012-25: 550 | DESC (sanity 76.4% / 258 passed) | trials.md row 41 |
| P042 | NFL-MOV | nfl | 2026-06-29 | no | NFL eval 2012+ | RUN, adopted | trials.md row 42 |
| P043 | NFL-PLATT | nfl | 2026-06-29 | no | not stated | RUN, rejected | trials.md row 43 |
| P044 | NFL-STAGE-LIFT | nfl | 2026-06-29 | no | not stated; A+ n=449 | RUN, "mostly swallowed; selectivity layer". Clean per KD 113 (KNOWN_DEFECTS:404) | trials.md row 44 |
| P045 | NFL-TOT-DISPLAY | nfl | 2026-06-29 | no | not stated | RUN, "market sharper" | trials.md row 45 |
| P046 | NFL-WIND-UNDER | nfl | 2026-06-29 | no | eras 2006-26 (n not stated) | RUN, "the real edge", deployed as monitored flag | trials.md row 46 |
| P047 | NFL-LEAK-KD43 | nfl | 2026-10-12 | no | local copy | LEAKCHK, leak found and fixed | trials.md row 47 |
| P048 | NFL-TOT-RECORD | nfl | 2026-10-13 | no | 78 frozen rows | DESC | trials.md row 48 |
| P049 | NBA-HOLDOUT-CORE | nba | 2026-06-07 | no | train <2019, test ≥2019 (n not stated) | RUN, "edge survives" (stands per KD 113) | trials.md row 49 |
| P050 | NBA-ROAD | nba | 2026-06-07 | no | same | RUN, "real edge" | trials.md row 50 |
| P051 | NBA-HOLDOUT-STAGE | nba | 2026-06-07 | no | test 561 / 966 | LEAK (KD 113) | trials.md row 51 |
| P052 | NBA-VALIDATE-STAGES | nba | 2026-06-07 | no | 2010-24 | LEAK (KD 113) | trials.md row 52 |
| P053 | NBA-PLAYOFF-STAGE | nba | 2026-06-07 | no | 82 games | LEAK (KD 113) | trials.md row 53 |
| P054 | NBA-KD113-RERUN | nba/preview | 2026-10-20 | no | TEST 609 / 946; TRAIN 1,086 / 1,782; validate 417 / 488; pla | RUN, "no evidence"; small effect not ruled out | trials.md row 54 |
| P055 | NBA-KHCA | nba | not stated | no | train/test | RUN, no change | trials.md row 55 |
| P056 | NBA-CALIB | nba | 2026-10-13 | yes (sha bee07c6da2e4, bdedd9d) | 2025-26: 1,322 | RUN, no difference | trials.md row 56 |
| P057 | NBA-CELLACC-LEAKED | nba | 2026-10-20 | yes | 1,320 | LEAK (KD 112) | trials.md row 57 |
| P058 | NBA-CELLACC-CLEAN | nba | 2026-10-20 | yes, with a post-hoc leak fix | 1,320 / 892 | RUN, no better | trials.md row 58 |
| P059 | NBA-TOTALS-ACC | nba | 2026-10-12 | no | 19,282 / 8,472 / 1,322 | DESC | trials.md row 59 |
| P060 | NBA-B2B-STRUCT | nba | not stated | no | 2014-2024 | RUN: HA/AH flagged, HH/AA rejected. Result not in any document | trials.md row 60 |
| P061 | NBA-B2B-SURPRISE | nba | not stated | no | balldontlie 2010-2026 (n not stated) | RUN, finding (code only) | trials.md row 61 |
| P062 | MLB-HOLDOUT | mlb | not stated | no | test 2019-23, 10,616 (CLAUDE says 32,483 total) | RUN; "62% threshold chosen looking at test" (:28-29); stage read clean per KD 113 | trials.md row 62 |
| P063 | MLB-STAGE-IN-CONF | mlb | not stated | no | same | RUN, "stage contributes ~3.5 pts" | trials.md row 63 |
| P064 | MLB-PITCHER-WIN | mlb | not stated | no | same | RUN, rejected | trials.md row 64 |
| P065 | MLB-FIP-WIN | mlb | not stated | no | not stated | RUN, adopted. Result not in any document | trials.md row 65 |
| P066 | MLB-TOT-S1 | mlb | 2026-06-17 | no | 33,507 real games | RUN, pass | trials.md row 66 |
| P067 | MLB-TOT-S2 | mlb | 2026-06-17 | no | same | RUN, rejected | trials.md row 67 |
| P068 | MLB-TOT-PARK-NAIVE | mlb | 2026-06-17 | no | same | RUN, rejected | trials.md row 68 |
| P069 | MLB-TOT-PARK-NEUTRAL | mlb | 2026-06-17 | no | same | RUN, kept | trials.md row 69 |
| P070 | MLB-TOT-BULLPEN | mlb | 2026-06-17 | no | none | NOTRUN | trials.md row 70 |
| P071 | MLB-TOT-FIP-KAPPA | mlb | not stated | no | not stated | RUN, adopted (code only) | trials.md row 71 |
| P072 | MLB-REVERSAL | mlb | 2026-06-16 | no | none | NOTRUN | trials.md row 72 |
| P073 | MLB-TOT-CLV | mlb | 2026-10-13 | no | 754 | DESC | trials.md row 73 |
| P074 | MLB-TOT-DIRECTION | mlb/preview | 2026-10-13 | no | 1,328 / 1,312 | DESC | trials.md row 74 |
| P075 | MLB-APLUS-LIVE | mlb | 2026-10-20 | no | 2026: 39 / 30 | DESC; published wrong source | trials.md row 75 |
| P076 | MLB-LEAK-TODAYALL | mlb/preview | 2026-10-12 | no | 665 games | LEAKCHK, leak found | trials.md row 76 |
| P077 | MLB-LEAK-PDISPLAY | mlb | 2026-10-12 | yes (direction "worse") | 536 / 607 | LEAKCHK, leak found; fix as pre-registered | trials.md row 77 |
| P078 | MLB-LEAK-MARKET | mlb | 2026-10-13 | yes (stop rule) | 117 extreme of 1,312 | LEAKCHK, leak found and restored | trials.md row 78 |
| P079 | TEN-ELO-HOLDOUT | tennis | not stated | no | 61,182 matches 2000-26 | RUN as claimed; KD 37 (KNOWN_DEFECTS:300): "no producing script" | trials.md row 79 |
| P080 | TEN-STAGES | tennis | not stated | no | 12,462 (2021-25) | RUN as claimed; KD 37 "no producing script"; not re-measured for leak | trials.md row 80 |
| P081 | TEN-PLATT | tennis | not stated | no | 32,931 | RUN as claimed, unsourced | trials.md row 81 |
| P082 | TEN-TOTALS | tennis | not stated | no | 42,672 (2010-24) | RUN (code only) | trials.md row 82 |
| P083 | TEN-FATIGUE-NAIVE | tennis | not stated | no | TML data | >3 | trials.md row 83 |
| P084 | TEN-FATIGUE-EVENT | tennis | not stated | no | not stated | >3 | trials.md row 84 |
| P085 | TEN-FATIGUE-HOLDOUT | tennis | not stated | no | split 2022 | NO-RESULT | trials.md row 85 |
| P086 | TEN-SURFACE-RUST | tennis | not stated | no | 2023+ | >3 in self-test) | trials.md row 86 |
| P087 | TEN-INTRANS | tennis | not stated | no | not stated | DESC | trials.md row 87 |
| P088 | TEN-INTRANS-NULL | tennis | not stated | no | not stated | NO-RESULT | trials.md row 88 |
| P089 | TEN-MOV | tennis | not stated | no | not stated | RUN per citation; numbers absent | trials.md row 89 |
| P090 | TEN-CLV | tennis/preview | 2026-10-13 | no | 304 | DESC | trials.md row 90 |
| P091 | TEN-RECORD | tennis/preview | 2026-10-13 | no | 344 | DESC | trials.md row 91 |
| P092 | TEN-STAGESV2 | tennis | 2026-10-12 | no | none | NOTRUN | trials.md row 92 |
| P093 | WC-HOLDOUT | wc | not stated | no | test ≥2019 | RUN; figures unsourced | trials.md row 93 |
| P094 | WC-ELO-STD | wc | not stated | no | same | RUN, rejected | trials.md row 94 |
| P095 | WC-ORDLOGIT | wc | not stated | no | same | RUN, rejected | trials.md row 95 |
| P096 | WC-PLATT | wc | not stated | no | all history | RUN, adopted | trials.md row 96 |
| P097 | WC-DQG-CORE | wc | not stated | no | 4 methods × 3 eras | RUN, rejected (12 variants) | trials.md row 97 |
| P098 | WC-DQG-SURPRISE | wc | not stated | no | 3 eras | RUN, kept | trials.md row 98 |
| P099 | WC-SURPRISE-FLAG | wc | not stated | no | test ≥2019 | RUN (code only) | trials.md row 99 |
| P100 | WC-SURPRISE-SCORE | wc | not stated | no | not stated | RUN (code only) | trials.md row 100 |
| P101 | WC-DRAW-LEAN | wc | not stated | no | not stated | RUN (code only) | trials.md row 101 |
| P102 | WC-CONF-ADJ | wc | not stated | no | 843 test matches | RUN, "not validated above noise"; still enabled (predict.py:19) | trials.md row 102 |
| P103 | WC-GOALS | wc | not stated | no | not stated | RUN (code only) | trials.md row 103 |
| P104 | WC-8FACTORS | wc | not stated | no | not stated | RUN per reference; details absent | trials.md row 104 |
| P105 | WC-LIVE | wc/preview | 2026-10-13 | no | 50 | DESC | trials.md row 105 |
| P106 | WC-LEAK-KD55 | wc/preview | not stated | no | 104 rows | LEAKCHK, no leak to ratings | trials.md row 106 |
| P107 | SV2-CENSUS | all 5 (identical) | 2026-10-12 | yes (prereg 2fc2f96b; census sha 41156f8 | NFL / NBA / MLB, 99,593 indices | STOP | trials.md row 107 |
| P108 | SV2-GATE | all | 2026-10-12 | yes | 20 indices × 3 engines | RUN, pass | trials.md row 108 |
| P109 | SV2-CLV | all | 2026-10-11 | yes | none | NOTRUN | trials.md row 109 |

## Planned exploration trials (02_MASTER_PLAN.md section 2)

| id | family | engine | trial | data | status | registered (commit) | result |
|---|---|---|---|---|---|---|---|
| E001 | 2.2 | NFL | engine log loss and Brier against the market no-vig | nflverse 2020-2025 (exploration only) | registered (PREREG_2_2) | this commit | +0.0311 [+0.021,+0.042] z+5.97: market better (PREREG_2_2 results) |
| E002 | 2.2 | NFL | 50/50 blend against the market | nflverse 2020-2025 (exploration only) | registered (PREREG_2_2) | this commit | blend 0.6168 vs market 0.6070: worse (PREREG_2_2 results) |
| E003 | 2.2 | NFL | A+ against the rest | nflverse 2020-2025 (exploration only) | registered (PREREG_2_2) | this commit | A+ +0.0413 z+2.61; rest +0.0293: market better in both (PREREG_2_2 results) |
| E004 | 2.2 | NBA | engine log loss and Brier against the market no-vig | Pinnacle journey journal 2026 (3 rows) | registered (PREREG_2_2) | this commit | n 3: counts only (PREREG_2_2 results) |
| E005 | 2.2 | NBA | 50/50 blend against the market | Pinnacle journey journal 2026 (3 rows) | registered (PREREG_2_2) | this commit | n 3: counts only (PREREG_2_2 results) |
| E006 | 2.2 | NBA | A+ against the rest | Pinnacle journey journal 2026 (3 rows) | registered (PREREG_2_2) | this commit | n 3: counts only (PREREG_2_2 results) |
| E007 | 2.2 | MLB | engine log loss and Brier against the market no-vig | 2026 journal (US-book median) | registered (PREREG_2_2) | this commit | +0.0066 [+0.001,+0.012] z+2.38: market better (later price) (PREREG_2_2 results) |
| E008 | 2.2 | MLB | 50/50 blend against the market | 2026 journal (US-book median) | registered (PREREG_2_2) | this commit | 0.6752 vs 0.6732: worse (PREREG_2_2 results) |
| E009 | 2.2 | MLB | A+ against the rest | 2026 journal (US-book median) | registered (PREREG_2_2) | this commit | A+ +0.0055 z+0.37 (n 30); rest +0.0067 (PREREG_2_2 results) |
| E010 | 2.2 | TEN | engine log loss and Brier against the market no-vig | 2026 journal (Pinnacle) | registered (PREREG_2_2) | this commit | early +0.0257 z+1.95; close +0.0252 z+1.77 (PREREG_2_2 results) |
| E011 | 2.2 | TEN | 50/50 blend against the market | 2026 journal (Pinnacle) | registered (PREREG_2_2) | this commit | 0.6120 vs 0.6066: worse (ECE lower) (PREREG_2_2 results) |
| E012 | 2.2 | TEN | A+ against the rest | 2026 journal (Pinnacle) | registered (PREREG_2_2) | this commit | A+ +0.0319 z+1.31; rest +0.0234 (PREREG_2_2 results) |
| E013 | 2.2 | WC | engine log loss and Brier against the market no-vig | 2026 journal (Pinnacle) | registered (PREREG_2_2) | this commit | early +0.0230 z+1.06; close +0.0415 z+1.69 (PREREG_2_2 results) |
| E014 | 2.2 | WC | 50/50 blend against the market | 2026 journal (Pinnacle) | registered (PREREG_2_2) | this commit | 0.8282 vs 0.8223: worse (PREREG_2_2 results) |
| E015 | 2.2 | WC | A+ against the rest | 2026 journal (Pinnacle) | registered (PREREG_2_2) | this commit | calls +0.0039 z+0.14; silent +0.0417 (PREREG_2_2 results) |
| E016 | 2.3 | NFL | Elo with MOV and autocorrelation term | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E1 MOV: variant-live -0.0003 [-0.0017,+0.0010] z -0.38, not promoted (PREREG_2_3 results) |
| E017 | 2.3 | NFL | K by season phase | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E2 K phase: variant-live +0.0014 [-0.0004,+0.0033] z +1.52, not promoted (PREREG_2_3 results) |
| E018 | 2.3 | NFL | home advantage by team and venue | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E3 team HCA: variant-live +0.0033 [+0.0013,+0.0053] z +3.36, live better (PREREG_2_3 results) |
| E019 | 2.3 | NFL | between-season regression | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E4 regression: variant-live +0.0013 [-0.0029,+0.0053] z +0.62, not promoted (PREREG_2_3 results) |
| E020 | 2.3 | NFL | Glicko-2 | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E5 Glicko-2: variant-live +0.0057 [+0.0010,+0.0104] z +2.39, live better (PREREG_2_3 results) |
| E021 | 2.3 | NFL | Bradley-Terry / ridge logistic | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E6 Bradley-Terry: variant-live +0.0048 [-0.0016,+0.0114] z +1.39, not promoted (PREREG_2_3 results) |
| E022 | 2.3 | NFL | Massey or Colley | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E7 Massey: variant-live +0.0063 [-0.0012,+0.0139] z +1.63, not promoted (PREREG_2_3 results) |
| E023 | 2.3 | NFL | player-based rating | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E8 player (QB): variant-live -0.0042 [-0.0088,-0.0002] z -1.88, not promoted (PREREG_2_3 results) |
| E024 | 2.3 | NFL | ensemble with weights from exploration seasons | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E9 ensemble: variant-live -0.0040 [-0.0070,-0.0012] z -2.56, not promoted (PREREG_2_3 results) |
| E025 | 2.3 | NBA | Elo with MOV and autocorrelation term | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E1 MOV: variant-live -0.0014 [-0.0031,+0.0003] z -1.63, not promoted (PREREG_2_3 results) |
| E026 | 2.3 | NBA | K by season phase | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E2 K phase: variant-live +0.0009 [-0.0005,+0.0024] z +1.18, not promoted (PREREG_2_3 results) |
| E027 | 2.3 | NBA | home advantage by team and venue | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E3 team HCA: variant-live +0.0035 [+0.0007,+0.0064] z +2.39, live better (PREREG_2_3 results) |
| E028 | 2.3 | NBA | between-season regression | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E4 regression: variant-live -0.0001 [-0.0004,+0.0003] z -0.30, not promoted (PREREG_2_3 results) |
| E029 | 2.3 | NBA | Glicko-2 | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E5 Glicko-2: variant-live +0.0011 [+0.0001,+0.0022] z +2.19, live better (PREREG_2_3 results) |
| E030 | 2.3 | NBA | Bradley-Terry / ridge logistic | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E6 Bradley-Terry: variant-live +0.0003 [-0.0016,+0.0020] z +0.37, not promoted (PREREG_2_3 results) |
| E031 | 2.3 | NBA | Massey or Colley | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E7 Massey: variant-live +0.0046 [-0.0006,+0.0094] z +1.88, not promoted (PREREG_2_3 results) |
| E032 | 2.3 | NBA | player-based rating | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | not runnable: no historical NBA player availability (PREREG_2_3) |
| E033 | 2.3 | NBA | ensemble with weights from exploration seasons | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E9 ensemble: variant-live -0.0014 [-0.0044,+0.0014] z -0.96, not promoted (PREREG_2_3 results) |
| E034 | 2.3 | MLB | Elo with MOV and autocorrelation term | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E1 MOV: variant-live -0.0009 [-0.0013,-0.0005] z -3.92, CANDIDATE (z <= -3.9) (PREREG_2_3 results) |
| E035 | 2.3 | MLB | K by season phase | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E2 K phase: variant-live -0.0001 [-0.0003,+0.0001] z -1.21, not promoted (PREREG_2_3 results) |
| E036 | 2.3 | MLB | home advantage by team and venue | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E3 team HCA: variant-live +0.0023 [+0.0013,+0.0034] z +4.32, live better (PREREG_2_3 results) |
| E037 | 2.3 | MLB | between-season regression | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E4 regression: variant-live +0.0002 [-0.0002,+0.0005] z +1.10, not promoted (PREREG_2_3 results) |
| E038 | 2.3 | MLB | Glicko-2 | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E5 Glicko-2: variant-live +0.0068 [+0.0045,+0.0090] z +5.84, live better (PREREG_2_3 results) |
| E039 | 2.3 | MLB | Bradley-Terry / ridge logistic | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E6 Bradley-Terry: variant-live +0.0014 [+0.0009,+0.0019] z +4.96, live better (PREREG_2_3 results) |
| E040 | 2.3 | MLB | Massey or Colley | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E7 Massey: variant-live +0.0006 [-0.0006,+0.0018] z +0.87, not promoted (PREREG_2_3 results) |
| E041 | 2.3 | MLB | player-based rating | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E8 player (SP): variant-live -0.0002 [-0.0008,+0.0004] z -0.64, not promoted (PREREG_2_3 results) |
| E042 | 2.3 | MLB | ensemble with weights from exploration seasons | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E9 ensemble: variant-live -0.0002 [-0.0008,+0.0004] z -0.65, not promoted (PREREG_2_3 results) |
| E043 | 2.3 | TEN | Elo with MOV and autocorrelation term | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E1 MOV: variant-live -0.0024 [-0.0038,-0.0010] z -3.52, not promoted (PREREG_2_3 results) |
| E044 | 2.3 | TEN | K by season phase | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E2 K phase: variant-live +0.0022 [+0.0015,+0.0029] z +6.51, live better (PREREG_2_3 results) |
| E045 | 2.3 | TEN | home advantage by team and venue | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | not runnable: no venue or home-country field in TML (PREREG_2_3) |
| E046 | 2.3 | TEN | between-season regression | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E4 regression: variant-live +0.0000 [+0.0000,+0.0000] z nan (same as live), not promoted (PREREG_2_3 results) |
| E047 | 2.3 | TEN | Glicko-2 | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E5 Glicko-2: variant-live +0.0040 [+0.0018,+0.0063] z +3.47, live better (PREREG_2_3 results) |
| E048 | 2.3 | TEN | Bradley-Terry / ridge logistic | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E6 Bradley-Terry: variant-live +0.0075 [+0.0048,+0.0102] z +5.55, live better (PREREG_2_3 results) |
| E049 | 2.3 | TEN | Massey or Colley | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E7 Colley: variant-live +0.0108 [+0.0080,+0.0136] z +7.62, live better (PREREG_2_3 results) |
| E050 | 2.3 | TEN | player-based rating | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E8 player (fatigue): variant-live +0.0023 [+0.0015,+0.0033] z +5.16, live better (PREREG_2_3 results) |
| E051 | 2.3 | TEN | ensemble with weights from exploration seasons | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E9 ensemble: variant-live -0.0034 [-0.0043,-0.0024] z -6.74, CANDIDATE (z <= -3.9) (PREREG_2_3 results) |
| E052 | 2.3 | WC | Elo with MOV and autocorrelation term | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E1 MOV: variant-live -0.0055 [-0.0072,-0.0037] z -6.04, CANDIDATE (z <= -3.9) (PREREG_2_3 results) |
| E053 | 2.3 | WC | K by season phase | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E2 K phase: variant-live -0.0015 [-0.0026,-0.0005] z -2.99, not promoted (PREREG_2_3 results) |
| E054 | 2.3 | WC | home advantage by team and venue | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E3 team HCA: variant-live +0.0022 [+0.0012,+0.0031] z +4.35, live better (PREREG_2_3 results) |
| E055 | 2.3 | WC | between-season regression | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E4 regression: variant-live +0.0000 [+0.0000,+0.0000] z nan (same as live), not promoted (PREREG_2_3 results) |
| E056 | 2.3 | WC | Glicko-2 | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E5 Glicko-2: variant-live -0.0071 [-0.0094,-0.0047] z -5.76, CANDIDATE (z <= -3.9) (PREREG_2_3 results) |
| E057 | 2.3 | WC | Bradley-Terry / ridge logistic | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E6 Bradley-Terry: variant-live -0.0079 [-0.0108,-0.0048] z -5.20, CANDIDATE (z <= -3.9) (PREREG_2_3 results) |
| E058 | 2.3 | WC | Massey or Colley | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E7 Massey: variant-live -0.0056 [-0.0111,+0.0003] z -1.89, not promoted (PREREG_2_3 results) |
| E059 | 2.3 | WC | player-based rating | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | not runnable: no player data for internationals (PREREG_2_3) |
| E060 | 2.3 | WC | ensemble with weights from exploration seasons | outcome exploration seasons (SEASON_SPLIT) | registered (PREREG_2_3) | research PREREG_2_3_RATINGS.md | E9 ensemble: variant-live -0.0132 [-0.0166,-0.0097] z -7.43, CANDIDATE (z <= -3.9) (PREREG_2_3 results) |
| E061 | 2.4 | NFL | stage beyond probability (logistic on p and stage) | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q1 coef +0.158 z +2.07; 9-cat LR p 0.0765, not promoted (PREREG_2_4 results) |
| E062 | 2.4 | NFL | monotonicity of accuracy and calibration by stage | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q2 residual slope z +1.83, Spearman +0.36, not promoted (PREREG_2_4 results) |
| E063 | 2.4 | NFL | stage as a calibration correction | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q3 corrected-live -0.0003 z -0.16, not promoted (PREREG_2_4 results) |
| E064 | 2.4 | NFL | other stage bounds (exploration seasons only) | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q4 chosen c 0.15 H k>=8: z -0.24 (live pair z +0.49), not promoted (PREREG_2_4 results) |
| E065 | 2.4 | NFL | stage against the market | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q5 high: engine-market ll z +4.30, return z -1.63, not promoted (PREREG_2_4 results) |
| E066 | 2.4 | MLB | stage beyond probability (logistic on p and stage) | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q1 coef +0.055 z +1.93; 9-cat LR p 0.575, not promoted (PREREG_2_4 results) |
| E067 | 2.4 | MLB | monotonicity of accuracy and calibration by stage | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q2 residual slope z +1.57, Spearman +0.50, not promoted (PREREG_2_4 results) |
| E068 | 2.4 | MLB | stage as a calibration correction | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q3 corrected-live +0.0007 z +3.15, not promoted (PREREG_2_4 results) |
| E069 | 2.4 | MLB | other stage bounds (exploration seasons only) | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q4 chosen c 0.6 H (6, 7, 8, 9): z +1.41 (live pair z +1.37), not promoted (PREREG_2_4 results) |
| E070 | 2.4 | MLB | stage against the market | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q5 high: engine-market ll z +0.88, not promoted (PREREG_2_4 results) |
| E071 | 2.4 | TEN | stage beyond probability (logistic on p and stage) | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q1 coef +0.126 z +5.18; 9-cat LR p 1.32e-07, CANDIDATE (z >= 3.9; Q1 and Q2 are one signal) (PREREG_2_4 results) |
| E072 | 2.4 | TEN | monotonicity of accuracy and calibration by stage | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q2 residual slope z +5.01, Spearman +0.45, CANDIDATE (z >= 3.9; Q1 and Q2 are one signal) (PREREG_2_4 results) |
| E073 | 2.4 | TEN | stage as a calibration correction | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q3 corrected-live -0.0004 z -1.34, not promoted (PREREG_2_4 results) |
| E074 | 2.4 | TEN | other stage bounds (exploration seasons only) | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q4 chosen c 0.25 H (7, 8, 9): z +3.16 (live pair z +3.43), not promoted (PREREG_2_4 results) |
| E075 | 2.4 | TEN | stage against the market | outcome exploration seasons; market where stored | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q5 high: engine-market ll z +1.11, return z +0.48, not promoted (PREREG_2_4 results) |
| E076 | 2.4 | NBA | monotonicity of accuracy and calibration by stage (no A+ stage) | 2010-11 to 2018-19 | registered (PREREG_2_4) | research PREREG_2_4_STAGES.md | Q2 residual slope z -1.10, Spearman +0.67, not promoted (PREREG_2_4 results) |
| E077 | 2.5 | NFL | blend weight w on exploration seasons | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | w* 0.00 [0.00,0.01]: no information beyond the price (PREREG_2_5 results) |
| E078 | 2.5 | NFL | act only beyond X points of disagreement (X fixed first) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | X .05 n555 return -0.068 z-1.67; X .10 n317 -0.068 z-1.15; margin 3.5%: none (PREREG_2_5 results) |
| E079 | 2.5 | NFL | abstain rule (World Cup style) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | >=0.62 n950 engine-market +0.0292 z+4.06: market better (PREREG_2_5 results) |
| E080 | 2.5 | NBA | blend weight w on exploration seasons | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | NBA 3 rows: counts only (PREREG_2_5 results) |
| E081 | 2.5 | NBA | act only beyond X points of disagreement (X fixed first) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | NBA 3 rows: counts only (PREREG_2_5 results) |
| E082 | 2.5 | NBA | abstain rule (World Cup style) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | NBA 3 rows: counts only (PREREG_2_5 results) |
| E083 | 2.5 | MLB | blend weight w on exploration seasons | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | w* 0.00 [0.00,0.38]: none (PREREG_2_5 results) |
| E084 | 2.5 | MLB | act only beyond X points of disagreement (X fixed first) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | no odds; X .05 n260 ll gain -0.0026 z-0.26; X .10 n36 z-0.30: none (PREREG_2_5 results) |
| E085 | 2.5 | MLB | abstain rule (World Cup style) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | >=0.62 n146 -0.0019 z-0.22: no difference (PREREG_2_5 results) |
| E086 | 2.5 | TEN | blend weight w on exploration seasons | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | w* 0.05 [0.00,0.48], gain +0.0001 z+0.10: none (PREREG_2_5 results) |
| E087 | 2.5 | TEN | act only beyond X points of disagreement (X fixed first) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | X .05 n140 return -0.021 z-0.26; X .10 n88 -0.046 z-0.42; margin 3.0%: none (PREREG_2_5 results) |
| E088 | 2.5 | TEN | abstain rule (World Cup style) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | >=0.62 n223 +0.0326 z+1.93: market better or equal (PREREG_2_5 results) |
| E089 | 2.5 | WC | blend weight w on exploration seasons | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | w* 0.00 [0.00,0.94]: none (n 95) (PREREG_2_5 results) |
| E090 | 2.5 | WC | act only beyond X points of disagreement (X fixed first) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | X .05 n40 return -0.046 z-0.33; X .10 n19 -0.047 z-0.21; margin 5.5%: none (PREREG_2_5 results) |
| E091 | 2.5 | WC | abstain rule (World Cup style) | market exploration data only | registered (PREREG_2_5) | research PREREG_2_5_BLEND.md | >=0.62 n45 +0.0042 z+0.15: no difference (PREREG_2_5 results) |
| E092 | 2.6 | NFL | timing: hours before start against distance to close | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | not runnable: exploration prices carry no timestamp; 2026 closed (PREREG_2_6_MARKET) |
| E093 | 2.6 | MLB | timing: hours before start against distance to close | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 2.05, not promoted (PREREG_2_6_MARKET results) |
| E094 | 2.6 | TEN | timing: hours before start against distance to close | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 0.59, not promoted (PREREG_2_6_MARKET results) |
| E095 | 2.6 | WC | timing: hours before start against distance to close | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | INVALID: 35 of 91 series end on an in-play price (an outcome below 3%), so the last point is not a close; no finding, a corrected look needs its own row (PREREG_2_6_MARKET results) |
| E096 | 2.6 | NFL | favourite/longshot by odds bin | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.74, not promoted (PREREG_2_6_MARKET results) |
| E097 | 2.6 | NBA | favourite/longshot by odds bin | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | not runnable: no NBA prices (PREREG_2_6_MARKET) |
| E098 | 2.6 | MLB | favourite/longshot by odds bin | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 2.13, not promoted (PREREG_2_6_MARKET results) |
| E099 | 2.6 | TEN | favourite/longshot by odds bin | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.14, not promoted (PREREG_2_6_MARKET results) |
| E100 | 2.6 | WC | favourite/longshot by odds bin | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.00, not promoted (PREREG_2_6_MARKET results) |
| E101 | 2.6 | NFL | early-season bias in totals | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 2.13, not promoted (PREREG_2_6_MARKET results) |
| E102 | 2.6 | MLB | early-season bias in totals | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | not runnable: MLB journal starts 2026-06-18 (PREREG_2_6_MARKET) |
| E103 | 2.6 | NBA | early-season bias in totals | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | not runnable: no NBA totals prices (PREREG_2_6_MARKET) |
| E104 | 2.6 | NFL | market type (spread / winner / total) where the engine is farthest | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | winner z +5.97, total z +4.49: market better in both (PREREG_2_6_MARKET results) |
| E105 | 2.6 | MLB | market type (spread / winner / total) where the engine is farthest | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 2.38, not promoted (PREREG_2_6_MARKET results) |
| E106 | 2.6 | TEN | market type (spread / winner / total) where the engine is farthest | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.95, not promoted (PREREG_2_6_MARKET results) |
| E107 | 2.6 | NFL | rest, travel, short week | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.21, not promoted (PREREG_2_6_MARKET results) |
| E108 | 2.6 | NBA | rest, travel, short week | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | b2b away +0.277 (z +5.50), b2b home -0.157 (z -2.46): CANDIDATE, outcome only (no NBA price) (PREREG_2_6_MARKET results) |
| E109 | 2.6 | MLB | rest, travel, short week | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.28, not promoted (PREREG_2_6_MARKET results) |
| E110 | 2.6 | MLB | weather and late pitcher change on totals | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | not runnable: no weather field; pitcher_changed empty (PREREG_2_6_MARKET) |
| E111 | 2.6 | NFL | weather on totals | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.94, not promoted (PREREG_2_6_MARKET results) |
| E112 | 2.6 | TEN | tennis factor: surface | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 2.26, not promoted (PREREG_2_6_MARKET results) |
| E113 | 2.6 | TEN | tennis factor: fatigue from previous tournament | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | games in the previous tournament (opp - player)/10: -0.0222 (z -8.42): CANDIDATE, outcome only; direction is form, not fatigue (PREREG_2_6_MARKET results) |
| E114 | 2.6 | TEN | tennis factor: retirements | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | max |z| 1.38, not promoted (PREREG_2_6_MARKET results) |
| E115 | 2.6 | TEN | tennis factor: Slam against smaller events | stored data in exploration seasons only | registered (PREREG_2_6_MARKET) | research PREREG_2_6_MARKET.md | Slam x logit p +0.341 (z +10.21): CANDIDATE, outcome only (live p too flat at Slams); journal best_of 5 n 58 z -0.58 (PREREG_2_6_MARKET results) |
| E116 | 2.6 | TEN | A+ CLV diagnosis: pick odds bucket (4 bins) | 2026 tennis journal, 82 A+ rows with CLV | registered (PREREG_2_6) | this commit | S1: < 1.40 bins z -2.39/-2.54; none >= 3.9 (PREREG_2_6 results) |
| E117 | 2.6 | TEN | A+ CLV diagnosis: surface and tournament level via the TML join | 2026 tennis journal, 82 A+ rows with CLV | registered (PREREG_2_6) | this commit | S2/S3: no bin >= 3.9; grass = all G, not separable |
| E118 | 2.6 | TEN | A+ CLV diagnosis: best_of (3 or 5) | 2026 tennis journal, 82 A+ rows with CLV | registered (PREREG_2_6) | this commit | S4: no bin >= 3.9 |
| E119 | 2.6 | TEN | A+ CLV diagnosis: market move early to close against the pick (NOT MEASURABLE: no price before our early write; replaced by S5 disagreement at the early price, PREREG_2_6_TENNIS_APLUS_CLV.md) | 2026 tennis journal, 82 A+ rows with CLV | registered (PREREG_2_6) | this commit | S5 (replacement): no bin >= 3.9 |
| E120 | 2.7 | NFL | A+ confidence threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -1.48, not promoted (PREREG_2_7 results) |
| E121 | 2.7 | NFL | A+ disagreement-with-market threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -1.15, not promoted (PREREG_2_7 results) |
| E122 | 2.7 | NFL | A+ combined with stage | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -0.86, not promoted (PREREG_2_7 results) |
| E123 | 2.7 | NFL | A+ threshold and disagreement jointly | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -1.34, not promoted (PREREG_2_7 results) |
| E124 | 2.7 | NFL | A+ excluding thin markets | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | no reading (n 0), not promoted (PREREG_2_7 results) |
| E125 | 2.7 | NFL | A+ by odds bin | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | normal z +12.50 on a bin of 2 bets is invalid; exact test z-eq +0.55: not promoted (PREREG_2_7 results) |
| E126 | 2.7 | NFL | fractional Kelly with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | descriptive: quarter Kelly, cap 5%: final bank 0.696, max drawdown 41.8%, bets staked 114 (PREREG_2_7 results) |
| E127 | 2.7 | NFL | flat stake with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | descriptive: flat 1%: final bank 0.918, max drawdown 11.5%, bets staked 258 (PREREG_2_7 results) |
| E128 | 2.7 | NBA | A+ confidence threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E129 | 2.7 | NBA | A+ disagreement-with-market threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E130 | 2.7 | NBA | A+ combined with stage | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E131 | 2.7 | NBA | A+ threshold and disagreement jointly | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E132 | 2.7 | NBA | A+ excluding thin markets | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E133 | 2.7 | NBA | A+ by odds bin | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E134 | 2.7 | NBA | fractional Kelly with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E135 | 2.7 | NBA | flat stake with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no NBA prices (PREREG_2_7) |
| E136 | 2.7 | MLB | A+ confidence threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +0.41, not promoted (PREREG_2_7 results) |
| E137 | 2.7 | MLB | A+ disagreement-with-market threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +0.56, not promoted (PREREG_2_7 results) |
| E138 | 2.7 | MLB | A+ combined with stage | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -1.26, not promoted (PREREG_2_7 results) |
| E139 | 2.7 | MLB | A+ threshold and disagreement jointly | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -0.29, not promoted (PREREG_2_7 results) |
| E140 | 2.7 | MLB | A+ excluding thin markets | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no MLB odds (PREREG_2_7) |
| E141 | 2.7 | MLB | A+ by odds bin | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -0.47, not promoted (PREREG_2_7 results) |
| E142 | 2.7 | MLB | fractional Kelly with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no MLB odds (PREREG_2_7) |
| E143 | 2.7 | MLB | flat stake with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no MLB odds (PREREG_2_7) |
| E144 | 2.7 | TEN | A+ confidence threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -0.95, not promoted (PREREG_2_7 results) |
| E145 | 2.7 | TEN | A+ disagreement-with-market threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -0.63, not promoted (PREREG_2_7 results) |
| E146 | 2.7 | TEN | A+ combined with stage | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +0.09, not promoted (PREREG_2_7 results) |
| E147 | 2.7 | TEN | A+ threshold and disagreement jointly | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -1.69, not promoted (PREREG_2_7 results) |
| E148 | 2.7 | TEN | A+ excluding thin markets | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z -0.10, not promoted (PREREG_2_7 results) |
| E149 | 2.7 | TEN | A+ by odds bin | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +0.09, not promoted (PREREG_2_7 results) |
| E150 | 2.7 | TEN | fractional Kelly with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | descriptive: quarter Kelly, cap 5%: final bank 0.872, max drawdown 24.1%, bets staked 47 (PREREG_2_7 results) |
| E151 | 2.7 | TEN | flat stake with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | descriptive: flat 1%: final bank 0.947, max drawdown 11.8%, bets staked 93 (PREREG_2_7 results) |
| E152 | 2.7 | WC | A+ confidence threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | normal z +3.92 on 20 bets is invalid (19 of 20 won); exact test z-eq +2.67: not promoted (PREREG_2_7 results) |
| E153 | 2.7 | WC | A+ disagreement-with-market threshold | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +0.87, not promoted (PREREG_2_7 results) |
| E154 | 2.7 | WC | A+ combined with stage | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | not runnable: no stage in the World Cup journal (PREREG_2_7) |
| E155 | 2.7 | WC | A+ threshold and disagreement jointly | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +2.96, not promoted (PREREG_2_7 results) |
| E156 | 2.7 | WC | A+ excluding thin markets | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | normal z +5.93 on 9 bets is invalid (9 of 9 won); exact test z-eq +1.75: not promoted (PREREG_2_7 results) |
| E157 | 2.7 | WC | A+ by odds bin | simulation on exploration data | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | reading-half z +1.10, not promoted (PREREG_2_7 results) |
| E158 | 2.7 | WC | fractional Kelly with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | descriptive: quarter Kelly, cap 5%: final bank 0.866, max drawdown 25.0%, bets staked 26 (PREREG_2_7 results) |
| E159 | 2.7 | WC | flat stake with margin, max drawdown | simulation on historical prices (NFL) or the 2026 journals | registered (PREREG_2_7) | research PREREG_2_7_SELECTION.md | descriptive: flat 1%: final bank 0.997, max drawdown 7.2%, bets staked 45 (PREREG_2_7 results) |

## Confirmation trials (b) and (c)

None registered. Each is added with its own pre-registration commit, after the season split is approved.

## Confirmation family (PREREG_CONFIRM_FAMILY.md, research 88504b4): ten tests, Holm over 10, one-sided

| id | from | engine | test | data | status | registered in | result |
|---|---|---|---|---|---|---|---|
| C01 | E052 | WC | MOV Elo, frozen | internationals 2026-07-20 to 2026-10-06, n 365 | read once 2026-10-22 | research 88504b4 | z -0.18, p 0.428: not decided (final) |
| C02 | E056 | WC | Glicko-2, frozen | same | read once 2026-10-22 | research 88504b4 | z -0.01, p 0.494: not decided (final) |
| C03 | E057 | WC | Bradley-Terry, frozen | same | read once 2026-10-22 | research 88504b4 | z +0.29, p 0.614: not decided (final) |
| C04 | E060 | WC | ensemble, frozen | same | read once 2026-10-22 | research 88504b4 | z -0.53, p 0.297: not decided (final) |
| C05 | E034 | MLB | MOV Elo, frozen | 2024-2025, n 4,866 | read once 2026-10-22 | research 88504b4 | z -1.91, p 0.028: not decided (final) |
| C06 | E108 | NBA | b2b away coefficient | 2024-25, n 1,321 | read once 2026-10-22 | research 88504b4 | z +2.33, p 0.0098: not decided (final) |
| C07 | E051 | TEN | ensemble, frozen | TML from 2026-11-30, live | registered; decisive at n 5,197 or 2028-12-31 | research 88504b4 | |
| C08 | E071 | TEN | high-stage coefficient | TML from 2026-11-30, live | registered; decisive at n 16,445 or 2028-12-31 | research 88504b4 | |
| C09 | E113 | TEN | previous-tournament coefficient | TML from 2026-11-30, live | registered; decisive at n 6,388 or 2028-12-31 | research 88504b4 | |
| C10 | E115 | TEN | Slam x logit p coefficient | TML from 2026-11-30, live | registered; progress after AO 2027; decisive at 773 Slam matches or 2028-12-31 | research 88504b4 | |
| CP1-CP8 | E051, E071, E113, E115 | TEN | against Pinnacle: log loss and CLV (Holm over 8) | tennis journal from 2026-11-30 | registered; read with C07-C10 | research 88504b4 | |


**Change to confirm_b.py between the check run and the reading (C04 to C06 code), recorded 2026-10-22:**
- **Order:**
  1. The pre-registration was committed (research 88504b4).
  2. confirm_b.py was written and run once in --check mode, which prints counts and assertions, no score.
  3. One line was deleted.
  4. The script was committed (research 8516585).
  5. The single reading was made (research 9359ed8).
- **The version before the deletion was never committed.** It was reconstructed by putting the line back in place.
- **The exact diff** (research analysis/confirm_b_line_removal/line.diff):
  ```
  @@ -79,6 +79,7 @@
       m = L.Elo(E.K, E.HCA, 1 - E.SEASON_REGRESSION); prev = None; last = {}; rows = []; mine = []
  +    gid = list(E.pd.read_csv if False else [])  # placeholder (pandas frame carries no GAME_ID after load_games)
  ```
  The line assigns an empty list to a name that nothing reads (`X if False else []` never evaluates X).
- **Proof:** the --check output of the reconstructed version and of 8516585 are byte-identical (sha256 a66978098371b62c,
  both). It is the same text as the original check run.

## 2.6 timing, market only (PREREG_2_6_TIMING_MARKET.md, research), registered 2026-10-22 before any call

| id | family | engine | idea | data | status | registered in | result |
|---|---|---|---|---|---|---|---|
| E160 | 2.6 | NBA | distance of the line from the close by hours before start | OddsPapi historical, Pinnacle, 2026-27 fixtures already started | registered; waits for ODDSPAPI_KEY in the environment | research PREREG_2_6_TIMING_MARKET.md | |
| E161 | 2.6 | NBA | direction of the favourite's move by horizon and price bin | same | registered; waits for the key | research PREREG_2_6_TIMING_MARKET.md | |
| E162 | 2.6 | TEN | distance of the line from the close by hours before start | OddsPapi historical, Pinnacle, the 367 journal fixtures | registered; waits for the key | research PREREG_2_6_TIMING_MARKET.md | |
| E163 | 2.6 | TEN | direction of the favourite's move by horizon and price bin | same | registered; waits for the key | research PREREG_2_6_TIMING_MARKET.md | |
| E164 | 2.6 | MLB | timing | none without a billed fixture call | not runnable | research PREREG_2_6_TIMING_MARKET.md | not runnable: no OddsPapi fixture ids stored |

## Block B of the overnight order: Pinnacle MLB 2016 (PREREG_B_MLB2016_PINNACLE.md, research), registered 2026-10-22 before any number

| id | family | engine | idea | data | status | registered in | result |
|---|---|---|---|---|---|---|---|
| E165 | B | MLB | engine against Pinnacle, close and open | MLB 2016 (exploration), CRAN pinnacle.data | registered (PREREG_B) | research PREREG_B_MLB2016_PINNACLE.md | |
| E166 | B | MLB | blend weight w against the close | same | registered (PREREG_B) | research PREREG_B_MLB2016_PINNACLE.md | |
| E167 | B | MLB | favourite and longshot by band, at the close | same | registered (PREREG_B) | research PREREG_B_MLB2016_PINNACLE.md | |
| E168 | B | MLB | early season (April) against the rest | same | registered (PREREG_B) | research PREREG_B_MLB2016_PINNACLE.md | |
| E169 | B | MLB | favourite's move from open to close by open-price band | same | registered (PREREG_B) | research PREREG_B_MLB2016_PINNACLE.md | |
| E170 | B | MLB | high stage against the market | same | registered (PREREG_B) | research PREREG_B_MLB2016_PINNACLE.md | |
| E171 | B | TEN | E115, A+ under 1.40, ATP rows | none (no ATP prices) | not runnable | research PREREG_B_MLB2016_PINNACLE.md | not runnable: tennis-data.co.uk blocked (D1) |
