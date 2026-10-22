# ITEM103_MEASURE.md: who reads the payload keys item 103 would split or leave out (KNOWN_DEFECTS 103)

Written 2026-10-20. Recon before any code, by Samuel's rule: a key that the hubs, status.json or any script reads
stays. Measurement only; nothing changed. Sizes from line 2 of the live app.js, 2026-10-20.

| key | page | size in line 2 | read by (outside line 2) | by the rule |
|---|---|---|---|---|
| `journalByDate` | MLB | 1,142,686 of 1,145,305 chars (113 dates) | mlb/app.js (the board of any chosen date, lines 607 and 650; today's result tails, 672); hub.app.js `pick.mlb` (the payload fallback: last date with a played game); status_json.py `_dates` (in the five engines) | stays |
| `results_dates` | World Cup | 139,890 of 328,701 | nothing (worldcup/app.js only in line 2; gen_worldcup_data.py writes it) | can leave |
| `completed_tiles` | World Cup | 29,710 of 328,701 | nothing (same) | can leave |
| `rkOverallAll` | tennis | 110,860 of 245,728 | tennis/app.js line 481: the "All players" scope of the Overall ranking cube | stays |
| `rkSurface` | tennis | 31,436 of 245,728 | tennis/app.js line 504: the "By surface" ranking cube (tennis/index.html sub-chips) | stays |

What this changes in the package of 2026-10-13 [derived]:

- The tennis keys were written down on 2026-10-13 as never read. That was wrong: both feed visible cubes. They stay.
- The World Cup keys are not read: leaving them out saves about 170 KB of line 2 (about 52%).
- MLB `journalByDate`, the part with the gain (1.14 MB, about 420 ms on the slow profile measured on 2026-10-13), is
  read by the hub's fallback and by status.json besides the page. A split (today in line 2, the rest in a file
  loaded on a date choice) keeps the page and status.json right if the generator builds status.json from the full
  payload before the split; the hub's fallback to app.js would then see today's date only. Options for Samuel:
  (a) split after the hubs read status.json first (pushed), accepting that the fallback, used only when status.json
  is missing, reads a shorter date list; (b) split and add the last played date to line 2 for the fallback, which is
  a change to hub.app.js; (c) no split.

Nothing is coded for item 103 until that decision.
