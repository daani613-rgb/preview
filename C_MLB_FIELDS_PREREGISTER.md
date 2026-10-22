# C_MLB_FIELDS_PREREGISTER.md: the MLB journal labels read the journal's fields, not fixed key lists (Samuel, step 4)

Written 2026-10-22 19:06Z, before any test or code. One declaration for two branches named c-mlb-fields-2026-10-22: in
baseball-engine (the generator) and in preview (the page). The same text is committed first in both.

## Samuel's decision (quoted)
"התוויות צריכות לעבור מרשימת מפתחות קבועה לשדות ביומן. 'תוצאה בבדיקה' רק על הטוטאל של 2 השורות הלא ודאיות. 'אין
תוצאה' רק על שורות שבאמת עדיין ללא תוצאה. VOID מוצג עם הסיבה. EXCLUDED לא מוצג כקריאה."

## Measured before (RESETTLE_D4_PREREGISTER.md)
- **5 uncertain rows, not 2:** tot_review = "uncertain" is in the journal on 5 rows (8 certain, measured). The
  label follows the field, so it appears on 5 rows.

## The change
- **Generator** (baseball-engine preview_build/gen_mlb_data.py): every journalByDate entry also carries:
  - status;
  - voidReason and voidReasonEn (from void_reason, void_reason_en);
  - totReview (from tot_review).
  Nothing else in the payload changes.
- **Page** (preview mlb/app.js): the two fixed sets RESULT_UNDER_REVIEW and NO_RESULT_ROWS are removed. On the
  journal board:
  - **a settled row with totReview "uncertain":** the score and the winner mark as settled; the totals mark reads
    "Result under review" / "תוצאה בבדיקה" with a neutral colour, and no total ✓/✗;
  - **a row with status VOID:** a past-tense tag, and the line "Void: <reason>" / "בוטל: <reason>" with neutral marks;
  - **a row with status EXCLUDED:** not shown as a call: the quiet style, the badge and call note "Not counted" /
    "לא נספר", and the line "Not counted: the same game as an earlier row" / "לא נספר: אותו משחק כמו שורה
    מוקדמת יותר";
  - **a row with no result whose date is before today** (status PENDING): "No result yet" / "אין תוצאה עדיין", with a
    past-tense tag;
  - every other row as before.
- With a payload that has no status or totReview (an older one), the page shows no review, void or excluded label,
  and "No result yet" on past rows with no result.

## Tests
- **Generator** (tools/c_fields/test_gen_fields.py): on a copy of the repo with the journal as committed, with the
  network blocked and gen_mlb_data.py run, every journal entry carries status; entries of the 5 tot_review rows carry
  totReview "uncertain"; the 5 EXCLUDED rows carry status EXCLUDED. Red before.
- **Page:**
  - static (tools/c_fields/test_fields.py): no RESULT_UNDER_REVIEW or NO_RESULT_ROWS; the four labels in he and en.
    Red before.
  - **rendered:** the page with a payload from the new generator, on a journal copy after a simulated next run
    (settle by game_pk), walking every journal date, en and he. Each label's count must equal the count of its rows
    in the payload: review = totReview rows that are played; void = VOID; excluded = EXCLUDED; no result = past rows
    with no result and status PENDING. 0 page errors.
- **Live, after the push and the next run:** the same count on every journal date, en and he.
