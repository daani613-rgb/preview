#!/usr/bin/env python3
"""test_pending.py - C_MLB_PENDING_PREREGISTER.md, as superseded by C_MLB_FIELDS_PREREGISTER.md (CLOSEOUT_TESTS_PREREGISTER.md).
The fixed 19-key set is gone; "No result yet" now follows the row's own state (not played, not VOID or EXCLUDED, date
before today); VOID shows its reason; EXCLUDED is not shown as a call."""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
js = open(os.path.join(ROOT, "mlb", "app.js"), encoding="utf-8").read()
F = []
def check(n, c):
    print(("PASS " if c else "FAIL ") + n)
    if not c: F.append(n)
check("no fixed NO_RESULT_ROWS set (replaced by the row's state)", "NO_RESULT_ROWS" not in js)
check("no result: not played, not VOID/EXCLUDED, before today", "!t._played && !_void && !_excl" in js and "t._date < dateForSel.today" in js)
check("labels he and en", "אין תוצאה עדיין" in js and "No result yet" in js and "בוטל: " in js and "Void: " in js and "לא נספר" in js and "Not counted" in js)
check("EXCLUDED not styled as a call", "state: _excl ? 'silent' : t.state" in js)
print("\nALL TESTS PASS" if not F else f"\n{len(F)} FAILED"); sys.exit(1 if F else 0)
