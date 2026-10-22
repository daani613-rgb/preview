#!/usr/bin/env python3
"""test_review.py - C_MLB_REVIEW_PREREGISTER.md. Static checks of mlb/app.js."""
import os, re, sys, json
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
js = open(os.path.join(ROOT, "mlb", "app.js"), encoding="utf-8").read()
WANT = ["2026-07-07|SLN|MIL", "2026-07-11|PIT|MIL", "2026-07-17|BOS|TBA", "2026-07-18|CLE|PIT", "2026-07-19|NYA|LAN", "2026-07-22|BOS|BAL", "2026-07-28|CIN|CLE", "2026-08-17|CIN|SLN", "2026-08-29|NYA|BOS", "2026-08-29|SFN|ARI", "2026-09-04|CLE|DET", "2026-09-22|NYA|TBA", "2026-09-25|BOS|CHN"]
F = []
def check(n, c):
    print(("PASS " if c else "FAIL ") + n)
    if not c: F.append(n)
m = re.search(r"const RESULT_UNDER_REVIEW = new Set\((\[.*?\])\)", js, re.S)
check("RESULT_UNDER_REVIEW defined", bool(m))
check("exactly the 13 keys", bool(m) and sorted(json.loads(m.group(1))) == WANT)
check("result tail uses it", "RESULT_UNDER_REVIEW.has(" in js)
check("he and en labels", "תוצאה בבדיקה" in js and "Result under review" in js)
print("\nALL TESTS PASS" if not F else f"\n{len(F)} FAILED"); sys.exit(1 if F else 0)
