#!/usr/bin/env python3
"""test_pending.py - C_MLB_PENDING_PREREGISTER.md. Static checks of mlb/app.js."""
import os, re, sys, json
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
js = open(os.path.join(ROOT, "mlb", "app.js"), encoding="utf-8").read()
WANT = ["2026-06-18|ATL|SFN", "2026-06-21|CHN|TOR", "2026-06-22|NYN|CHN", "2026-06-25|SLN|ARI", "2026-07-10|PIT|MIL", "2026-07-17|CLE|PIT", "2026-07-18|NYA|LAN", "2026-07-21|BOS|BAL", "2026-07-21|NYA|PIT", "2026-07-27|CIN|CLE", "2026-07-28|NYN|ATL", "2026-09-22|BAL|TOR", "2026-09-26|BOS|CHN", "2026-09-27|NYA|BAL", "2026-10-08|NYA|TBA", "2026-10-09|MIL|SDN", "2026-10-16|CLE|TBA", "2026-10-16|LAN|MIL", "2026-10-20|TBA|CLE"]
F = []
def check(n, c):
    print(("PASS " if c else "FAIL ") + n)
    if not c: F.append(n)
m = re.search(r"const NO_RESULT_ROWS = new Set\((\[.*?\])\)", js, re.S)
check("NO_RESULT_ROWS defined", bool(m))
check("exactly the 19 keys", bool(m) and sorted(json.loads(m.group(1))) == WANT)
check("labels he and en", "No result: game postponed or cancelled" in js and "אין תוצאה: המשחק נדחה או בוטל" in js)
print("\nALL TESTS PASS" if not F else f"\n{len(F)} FAILED"); sys.exit(1 if F else 0)
