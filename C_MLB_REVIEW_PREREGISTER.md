# C_MLB_REVIEW_PREREGISTER.md: "Result under review" on the 13 MLB journal rows that show another game's score

Written 2026-10-22 16:53Z, before the change, at Samuel's request. A stopgap until decision D4. A separate first commit,
on its own branch (c-mlb-review-2026-10-22), local only, not pushed.

## Why
- **The finding:** research PROPOSAL_MLB_DOUBLEHEADER_KEY.md and MLB_RECOUNT_BY_GAMEPK_2026-10-22.md; checked against
  MLB StatsAPI by game_pk. On 13 doubleheader rows the journal view shows the other game's final score next to this
  game's time, with a verdict graded on it.
- **The rows** (date|home|away, the journal's key): 2026-07-07|SLN|MIL, 2026-07-11|PIT|MIL, 2026-07-17|BOS|TBA, 2026-07-18|CLE|PIT, 2026-07-19|NYA|LAN, 2026-07-22|BOS|BAL, 2026-07-28|CIN|CLE, 2026-08-17|CIN|SLN, 2026-08-29|NYA|BOS, 2026-08-29|SFN|ARI, 2026-09-04|CLE|DET, 2026-09-22|NYA|TBA, 2026-09-25|BOS|CHN.

## The change (preview mlb/app.js only)
- A constant `RESULT_UNDER_REVIEW` holding exactly these 13 keys, with a comment pointing to the research files.
- When the journal board shows a row whose date|home|away is in the set:
  - the score is replaced by "Result under review" / "תוצאה בבדיקה";
  - the winner and total marks are neutral ("·" in grey) instead of ✓/✗.
- **Not touched:**
  - the journal (locked), every engine and the generator;
  - the data line (app.js line 2, rewritten by each run; the code lines survive it);
  - every other row;
  - the A+ tag ("Was an A+ call · total"), because the call itself was made.

## Tests
- **Static** (tools/c_review/test_review.py): the set has exactly these 13 keys, and the result tail uses it.
- **Rendered** (work/cdprun.mjs, the page served locally, 390 px, en and he, date 2026-09-22 picked through the date
  input):
  - before: the NYA-TBA row shows "0–2" with a mark;
  - after: it shows "Result under review" or "תוצאה בבדיקה", and the other rows of that day keep their scores;
  - no page error.
  - Screenshots before and after.
- **Red** before, **green** after.

## Result (2026-10-22 16:58Z)
- **Static:** 4 FAILED before, ALL TESTS PASS after.
- **Rendered** (390 px, the date picked through the date input):
  - 2026-09-22 TBA at NYA "7:05 PM EDT": before "0–2 ✗ winner ✗ total"; after "Result under review · winner · total"
    (he "תוצאה בבדיקה").
  - The other rows of the day are unchanged.
  - Across all 12 affected dates the label appears exactly on the 13 rows (2 on 2026-08-29), and nowhere else.
  - No page error.
- **Screenshots:** research ux_2026-10-22/shots/mlb_review_{before,after}_{en,he}_390 (files mlb_review_*.png).
- **Left as is:**
  - the row's CLV figure (a totals CLV from its odds snapshots; on a doubleheader day the snapshots can belong to
    either game, D4);
  - the "Was an A+ call" tag.
- **The list is fixed** (13 keys from the StatsAPI check). A doubleheader settled wrongly after today would not be
  caught. That is why this is a stopgap, until D4.
