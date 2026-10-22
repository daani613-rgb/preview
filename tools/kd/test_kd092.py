#!/usr/bin/env python3
"""test_kd092.py - KD092_PREREGISTER.md. Static check of nfl/index.html. Exit 0 when every check passes."""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
html = open(os.path.join(ROOT, "nfl", "index.html"), encoding="utf-8").read()
FAILS = []
def check(name, cond):
    print(("PASS " if cond else "FAIL ") + name)
    if not cond: FAILS.append(name)
check("no rank.teams_today chip", "rank.teams_today" not in html)
for k in ("rank.games.go", "rank.composite_today.go", "rank.totals.go"):
    check(f"chip {k} kept", k in html)
print("\nALL TESTS PASS" if not FAILS else f"\n{len(FAILS)} FAILED")
sys.exit(1 if FAILS else 0)
