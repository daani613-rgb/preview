#!/usr/bin/env python3
"""test_fields.py - C_MLB_FIELDS_PREREGISTER.md, page static test (mlb/app.js)."""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
js = open(os.path.join(ROOT, "mlb", "app.js"), encoding="utf-8").read()
F = []
def check(n, c):
    print(("PASS " if c else "FAIL ") + n)
    if not c: F.append(n)
check("no fixed RESULT_UNDER_REVIEW set", "RESULT_UNDER_REVIEW" not in js)
check("no fixed NO_RESULT_ROWS set", "NO_RESULT_ROWS" not in js)
check("reads status and totReview from the entry", "t.status" in js and "t.totReview" in js)
for he, en in (("תוצאה בבדיקה", "Result under review"), ("בוטל:", "Void:"), ("לא נספר", "Not counted"), ("אין תוצאה עדיין", "No result yet")):
    check(f"label he/en: {en}", he in js and en in js)
print("\nALL TESTS PASS" if not F else f"\n{len(F)} FAILED"); sys.exit(1 if F else 0)
