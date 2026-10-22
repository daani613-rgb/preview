#!/usr/bin/env python3
"""test_kd090.py - KD090_PREREGISTER.md. Static checks. Exit 0 when every check passes."""
import os, sys, re
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FAILS = []
def check(name, cond):
    print(("PASS " if cond else "FAIL ") + name)
    if not cond: FAILS.append(name)
for e in ("mlb", "nba", "nfl", "tennis", "worldcup"):
    html = open(os.path.join(ROOT, e, "index.html"), encoding="utf-8").read()
    js = open(os.path.join(ROOT, e, "app.js"), encoding="utf-8").read()
    check(f"{e}: no fixed 'A+ PREDICTION ENGINE<' in index.html", "A+ PREDICTION ENGINE<" not in html)
    check(f"{e}: no fixed 'PREDICTION ENGINES · 2026<' in index.html", "PREDICTION ENGINES · 2026<" not in html)
    check(f"{e}: hdrFooter defined in en and he", len(re.findall(r"hdrFooter:\s*'", js)) == 2)
    if e != "tennis":
        check(f"{e}: hdrEngine defined in en and he", len(re.findall(r"hdrEngine:\s*'", js)) == 2)
print("\nALL TESTS PASS" if not FAILS else f"\n{len(FAILS)} FAILED")
sys.exit(1 if FAILS else 0)
