"""Summary of perf.mjs output: median per page and width, the first run of each (warm-up) left out. python3 perfsum.py out.json"""
import json, sys, statistics as st
d = json.load(open(sys.argv[1]))
rows = {}
for r in d:
    if r['run'] == 0: continue                      # warm-up, discarded
    rows.setdefault((r['path'], r['w']), []).append(r)
print(f"{'page':22} {'w':>5} {'FCP med':>8} {'FCP min-max':>12} {'load':>6} {'KB':>6} {'3D KB':>6} {'3D start':>8} {'3D end':>7} canvas")
for (p, w), rs in rows.items():
    f = [x['fcp'] for x in rs if x['fcp'] is not None]
    med = lambda k: round(st.median([x[k] for x in rs if x[k] is not None])) if any(x[k] is not None for x in rs) else '-'
    print(f"{p:22} {w:>5} {round(st.median(f)) if f else '-':>8} {(str(min(f))+'-'+str(max(f))) if f else '-':>12} {med('load'):>6} {med('kb'):>6} {med('threeKb'):>6} {med('threeStart'):>8} {med('threeEnd'):>7} {sum(1 for x in rs if x['canvas'] and x['canvas']['drawn'])}/{len(rs)}")
