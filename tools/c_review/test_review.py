#!/usr/bin/env python3
"""test_review.py - C_MLB_REVIEW_PREREGISTER.md, as superseded by C_MLB_FIELDS_PREREGISTER.md (CLOSEOUT_TESTS_PREREGISTER.md).
The fixed 13-key set is gone; "Result under review" now follows the journal field totReview, on the totals mark only."""
import os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
js = open(os.path.join(ROOT, "mlb", "app.js"), encoding="utf-8").read()
F = []
def check(n, c):
    print(("PASS " if c else "FAIL ") + n)
    if not c: F.append(n)
check("no fixed RESULT_UNDER_REVIEW set (replaced by the journal field)", "RESULT_UNDER_REVIEW" not in js)
check("the review label reads totReview", "_totReview === 'uncertain'" in js and "totReview" in js)
check("he and en labels", "תוצאה בבדיקה" in js and "Result under review" in js)
check("the label sets the totals mark only (winner and score stand)", bool(re.search(r"_totReview === 'uncertain'\)[^}]*totLabel", js, re.S)))
print("\nALL TESTS PASS" if not F else f"\n{len(F)} FAILED"); sys.exit(1 if F else 0)
