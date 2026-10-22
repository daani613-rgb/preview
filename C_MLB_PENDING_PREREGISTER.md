# C_MLB_PENDING_PREREGISTER.md: a "no result" label on the 19 MLB rows that will never settle (an extension of D15)

Written 2026-10-22 17:01Z, before the change. On its own branch c-mlb-pending-2026-10-22, stacked on c-mlb-review (D15),
because both change the same part of mlb/app.js. Local only, not pushed.

## Why
- **The finding:** research PROPOSAL_MLB_DOUBLEHEADER_KEY.md, the postponed-games section. 19 PENDING journal rows will
  never settle: their game was postponed and played later, cancelled, or not needed.
- **What the page shows now:** on its date, a row shows "A+ · total" in the present tense with no result, months
  later. Measured: 2026-06-18 SFN at ATL.
- **The rows:** 2026-06-18|ATL|SFN, 2026-06-21|CHN|TOR, 2026-06-22|NYN|CHN, 2026-06-25|SLN|ARI, 2026-07-10|PIT|MIL, 2026-07-17|CLE|PIT, 2026-07-18|NYA|LAN, 2026-07-21|BOS|BAL, 2026-07-21|NYA|PIT, 2026-07-27|CIN|CLE, 2026-07-28|NYN|ATL, 2026-09-22|BAL|TOR, 2026-09-26|BOS|CHN, 2026-09-27|NYA|BAL, 2026-10-08|NYA|TBA, 2026-10-09|MIL|SDN, 2026-10-16|CLE|TBA, 2026-10-16|LAN|MIL, 2026-10-20|TBA|CLE.

## The change (preview mlb/app.js only)
- A constant `NO_RESULT_ROWS` holding exactly these 19 keys.
- On the journal board, a row in the set:
  - shows the A+ tag in the past tense ("Was an A+ call");
  - shows a result tail "No result: game postponed or cancelled" / "אין תוצאה: המשחק נדחה או בוטל", with neutral
    marks.
- **Not touched:** the journal, the engines, the data line, and every other row.

## Tests
- **Static** (tools/c_review/test_pending.py): exactly the 19 keys; the label in he and en.
- **Rendered** (390 px, en and he):
  - 2026-06-18 SFN at ATL shows the label and the past-tense tag;
  - across the dates of the 19 rows, the label appears exactly 19 times;
  - no page error.
  - Screenshots before and after.

## Result (2026-10-22 17:11Z)
- **Static:** 3 FAILED before, ALL TESTS PASS after. D15's test still passes.
- **Rendered:**
  - 2026-06-18 SFN at ATL: before "A+ · total" with no result; after "Was an A+ call · total" and "No result: game
    postponed or cancelled" / "אין תוצאה: המשחק נדחה או בוטל";
  - across the 17 dates of the 19 rows, the label appears exactly 19 times;
  - D15's label still appears exactly 13 times on its 12 dates;
  - no page error.
- **Two template details** found while rendering: the result box is shown only when `resultDisp`, and its line only
  inside `<sc-if value="{{ t.hasResult }}">`. Both are passed as true for these 19 rows only.
- **Screenshots:** research ux_2026-10-22/shots/mlb_pending_{before,after}_{en,he}.png.
