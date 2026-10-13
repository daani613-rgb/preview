# Stop 2, words and consistency: expected results, fixed before the code change

Written 2026-10-13, after stop 1 was pushed and verified live, before any code of this stop. Measured on the HEAD of
the day: tennis-engine bbcc317, worldcup-engine 6249a3c, nba-engine b48e000, nfl-engine b9cec72, baseball-engine
ece9465, preview f541d54.

Not touched: the A+ rule of every engine, every cron, rating and stage maths, the Platt constants, `.gitignore`,
`isOffseason`, the tennis pause, the value thresholds of each engine (3 to 10 points in NFL, World Cup and tennis
classic; MLB 4 with no upper bound).

Invariants, checked after every change: tennis 98 A+ in the journal and 2 on the slate; MLB live A+ 26 of 39; NFL 6 A+
calls (5 right); World Cup 50 A+ calls (38 right). If one moves, stop.

## 1. "value" means one thing: a gap from the market

- Tennis preview: the page tier (stage 6 or more and confidence 57% or more, `gen_tennis_data.py:104-118`) is removed;
  the badge "value" follows the classic rule, a gap on the call side of 3 to 10 points.
- On the 2026-10-11 slate: Lehecka (+2) and Fils (-10) go from value to quiet; Tiafoe (+7), Paul (+4), Alcaraz (+3) go
  from quiet to value; Medvedev and Auger-Aliassime stay A+; Tien and Fritz stay quiet. Counter "2 A+ · 2 value ·
  5 silent" becomes "2 A+ · 3 value · 4 silent". The two pages agree on 9 of 9.
- NBA: `gen_nba_data.py:219` gives no 'value' for a probability of 65 or more; with no market there is no value.
  The payload carries 0 'value' tiles; nothing visible changes (the display already showed them quiet).

## 2. Tennis CLV, one number

- Kept: the mean CLV per match, in percent, on the winner market (`tennis_clv.clv_for_pick`), shown with n.
- Journal: the 40 rows with `clv` 0.0 and no closing price become empty, with a note column saying why (a default
  written as data, the FIELDS / FIP class). The 48 rows with 0.0 and an unchanged line keep their 0.0.
- Expected: mean -0.137% on 344 becomes -0.155% on 304; positive rows 121 in both. The cumulative sum (-0.472,
  labelled "games") leaves the hero, the chart header and the month segments; a month segment shows its mean and n.
- `collect_tennis._clv` writes an empty CLV, not 0.0, when there is no closing price. Red first.

## 3. Tennis names, case-insensitive join

- Today two names miss their rating on case alone: "Botic Van de Zandschulp" and "Jesper De Jong". 0 casefold
  collisions among 288 players. After: both get their rating; the Fils match score is not built on the 1500 default;
  "Today's players" lists 18 of 18.

## 4. World Cup

- The holdout block leaves all five places (`board_build.py:31`, `gen_worldcup_data.py:856`, `board_template.html`,
  `worldcup_dashboard.html`, preview `app.js`): 60.4, 7,318, 5,655, 78.3, 47.9, 22.8 and "23% vs 22.8%". No script
  produces 60.4 and the window moves with every new row. The live record 38 of 50 (76.0%) stays. A future holdout
  comes with a script, a fixed dated window and a pre-registration.
- Stage of each match from the results: the first three matches of each team are the group stage; after that by the
  team's match number (round of 32, of 16, quarter-final, semi-final), and the two matches at step five split into
  third place (2026-07-18 France-England) and final (2026-07-19 Spain-Argentina, the semi-final winners). Expected:
  72 group, 16, 8, 4, 2, 1, 1. 0 cards say "Group stage" after 2026-06-27.
- After the final: "הטורניר הסתיים · 19.07" / "Tournament ended · 19.07" where LIVE and "rest day" are now, the date
  from the results (the last FIFA World Cup row of 2026).
- The 50 decided A+ cards read "הייתה קריאת A+" / "Was an A+ call", not "A+ · strong" and "Call:".

## 5. Dates

- dd.mm with a leading zero ("19.07"); with a year dd.mm.yyyy; both languages; every page of the fleet. NBA leaves
  mm.dd. No English month name in the Hebrew view. Times and their zone labels unchanged.
- Inventory of 2026-10-13: 53 date-display sites in 15 files; 5 are the World Cup holdout range, which leaves with
  section 4, so 48 change format.
- Which day is shown: MLB classic `fmtGameDateTime` shows the slate (US) date; a time, when shown, with its own zone
  label. World Cup classic (board_template.html:830) shows the venue date only. A formatter that works on text stays on
  text. Test per page: the day shown before and after on fixed inputs, including 23:30 UTC (and an MLB game at
  19:00 ET seen from Asia/Jerusalem).
- Out of scope by decision of 2026-10-13, not a miss for the next scan: the browser's native date pickers (MLB preview,
  MLB classic, NBA classic) and month-year labels with no day.

## 6. One wording per state

- A decided A+ call, past tense: "הייתה קריאת A+" / "Was an A+ call". MLB names the market: the 779 decided A+ cards of
  the preview board are totals calls (`tot_verdict`), and read "הייתה קריאת A+ · טוטאל" / "Was an A+ call · total"; the
  12 open ones "A+ · טוטאל" / "A+ · total"; no card says "winner" for a totals call. (Marking winner A+ calls on the
  board is KNOWN_DEFECTS item 65, queued for after 2026-10-20.)
- Quiet with no market price: "שקט · אין מחיר שוק" / "Quiet · no market price" in all five engines, in place of "no
  market line yet", "No market line yet, indicative", "אין קו שוק כרגע", "אין קו-שוק למשחק זה" and "No market data yet,
  call only".
- Gap over 10: "פער גדול · מעבר לחלון" / "Large gap · outside the window" in MLB and NFL, in place of "In line with
  market · gap N%".
- NBA preview "(לא ביומן)" becomes "לא נרשם ביומן", as on the classic page.

## 7. Three more from stop 1

- NFL preview, Hebrew view: "Honest note." in English before the Hebrew caveat goes.
- NBA preview: the illustration row "68% / 32%, Elo + rest" (app.js, not rendered) is deleted.
- MLB: "צמוד · שתיקה" / "too close, silent" becomes "קרוב למטבע · פסק המנוע" / "Near a coin flip · the engine's
  verdict".

Nothing in this file is changed after the first code change; a later finding goes in a dated section.
