"""
parlay_record.py - realized return of the live A+ calls as single legs and as four-leg parlays.
Definitions set in the 2026-10-12 block before this was computed; nothing here is tuned.

  bets         = every live A+ call in a journal that has both a recorded price and a recorded result.
  price        = the price available when the call was made (early). The same return at the closing price is
                 reported separately and never merged with it.
  single leg   = (decimal price - 1) on a win, -1 on a loss.
  hold_single  = 1 - 1 / sum(1 / price) over all sides of the market at the quoted price, before any devig.
  parlays      = per engine, per day, in chronological order, consecutive non-overlapping groups of four.
                 No selection and no reordering. A remainder of fewer than four is dropped and counted.
  parlay       = product of the four prices - 1 if all four won, else -1.
  expected     = (1 + mean single leg)^4 - 1, the arithmetic composition of the single leg.
  parlay fee   = 1 - (1 - mean hold_single)^4.

Sources (read only):
  tennis : tennis-engine/clv_journal.csv, aplus == 1, void rows out; pick = home if engine_p_home > 0.5 else away;
           early = odds_early_*, close = odds_close_*, result = outcome.
  WC     : worldcup-engine/predictions_log.csv, verdict "קריאה" (predict.CALL_THRESHOLD; latest row per match, as
           gen_worldcup_data._aplus_rule does); result = correct; prices from clv_collect/clv_journal.csv
           odds_early / odds_close [home, draw, away], joined by date and team names.
  NFL    : nfl-engine/nfl_predictions.csv, aplus == 1 (kickoff-guarded log); result = w_correct; prices from
           nfl_clv_journal.csv by game_id: early = first_*_ml, close = close_*_ml (American, converted).
  Out    : MLB (baseball_log has no quoted price; predictions_journal holds market_p_home after devig only, so
           hold_single cannot be computed). NBA (predictions_log has five rows with a spread only).

Run: python3 parlay_record.py <nfl-engine> <tennis-engine> <worldcup-engine>
"""
import csv, json, math, sys


def am_to_dec(a):
    a = float(a)
    return 1 + (a / 100 if a > 0 else 100 / -a)


def hold(prices):
    return 1 - 1 / sum(1 / p for p in prices)


def tennis(d):
    out = []
    for r in csv.DictReader(open(f"{d}/clv_journal.csv", encoding="utf-8")):
        if r["aplus"] != "1" or (r.get("void_reason") or "").strip() or r["outcome"] not in ("home", "away"):
            continue
        side = "home" if float(r["engine_p_home"]) > 0.5 else "away"
        won = r["outcome"] == side
        legs = {}
        for k in ("early", "close"):
            h, a = r[f"odds_{k}_home"], r[f"odds_{k}_away"]
            if h and a:
                ph, pa = float(h), float(a)
                legs[k] = (ph if side == "home" else pa, hold([ph, pa]))
        out.append({"engine": "tennis", "day": r["date"], "order": (r["start_iso"] or r["date"], r["fixtureId"]),
                    "won": won, **legs})
    return out


def worldcup(d):
    seen = {}
    for r in csv.DictReader(open(f"{d}/predictions_log.csv", encoding="utf-8")):
        k = (r["match_date"], r["home"], r["away"])
        if k not in seen or r["logged_at"] >= seen[k]["logged_at"]:
            seen[k] = r
    jr = list(csv.DictReader(open(f"{d}/clv_collect/clv_journal.csv", encoding="utf-8")))
    out = []
    for (day, h, a), r in sorted(seen.items()):
        if r["verdict"] != "קריאה" or r["correct"] not in ("0", "1"):
            continue
        j = next((x for x in jr if x["date"][:10] == day and {x["home"], x["away"]} == {h, a}), None)
        if j is None:
            continue
        idx = 0 if r["fav"] == j["home"] else 2                     # the journal's own orientation
        legs = {}
        for k in ("early", "close"):
            v = (j.get(f"odds_{k}") or "").strip()
            if v:
                o = json.loads(v)
                legs[k] = (float(o[idx]), hold([float(x) for x in o]))
        out.append({"engine": "worldcup", "day": day, "order": (day, j["fixtureId"]), "won": r["correct"] == "1", **legs})
    return out


def nfl(d):
    jr = {r["game_id"]: r for r in csv.DictReader(open(f"{d}/nfl_clv_journal.csv", encoding="utf-8"))}
    out = []
    for r in csv.DictReader(open(f"{d}/nfl_predictions.csv", encoding="utf-8")):
        if r["aplus"] != "1" or r["w_correct"] not in ("0", "1"):
            continue
        gid = f"{r['date'][:4] if int(r['date'][5:7]) > 2 else int(r['date'][:4]) - 1}_{int(r['week']):02d}_{r['away']}_{r['home']}"
        j = jr.get(gid)
        if j is None:
            continue
        side = "home" if r["favorite"] == r["home"] else "away"
        legs = {}
        for k, pre in (("early", "first_"), ("close", "close_")):
            h, a = j.get(f"{pre}home_ml"), j.get(f"{pre}away_ml")
            if h and a:
                ph, pa = am_to_dec(h), am_to_dec(a)
                legs[k] = (ph if side == "home" else pa, hold([ph, pa]))
        out.append({"engine": "nfl", "day": r["date"], "order": (j.get("kickoff_utc") or r["date"], gid),
                    "won": r["w_correct"] == "1", **legs})
    return out


def mean_se(xs):
    n = len(xs)
    if n == 0:
        return None, None, 0
    m = sum(xs) / n
    sd = math.sqrt(sum((x - m) ** 2 for x in xs) / (n - 1)) if n > 1 else float("nan")
    return m, sd / math.sqrt(n), n


def report(bets, k):
    use = [b for b in bets if k in b]
    singles = [(b[k][0] - 1) if b["won"] else -1.0 for b in use]
    holds = [b[k][1] for b in use]
    parlays, dropped = [], 0
    groups = {}
    for b in sorted(use, key=lambda b: (b["engine"], b["day"], b["order"])):
        groups.setdefault((b["engine"], b["day"]), []).append(b)
    for g in groups.values():
        full = len(g) // 4 * 4
        dropped += len(g) - full
        for i in range(0, full, 4):
            four = g[i:i + 4]
            parlays.append(math.prod(x[k][0] for x in four) - 1 if all(x["won"] for x in four) else -1.0)
    ms, ses, ns = mean_se(singles)
    mp, sep, npar = mean_se(parlays)
    mh = sum(holds) / len(holds) if holds else None
    print(f"\n== price: {k}")
    by = {}
    for b in use:
        by[b["engine"]] = by.get(b["engine"], 0) + 1
    print(f"   bets by engine: {by}")
    if ns:
        print(f"   expected four-leg (arithmetic, (1 + single)^4 - 1): {((1 + ms) ** 4 - 1) * 100:+.1f}%")
        print(f"   single leg realized: {ms * 100:+.1f}%  SE {ses * 100:.1f}  n {ns}")
        print(f"   mean hold_single: {mh * 100:.2f}%   parlay fee 1 - (1 - hold)^4: {(1 - (1 - mh) ** 4) * 100:.2f}%")
    if npar:
        se_txt = f"SE {sep * 100:.1f}" if npar > 1 else "SE undefined (n = 1)"
        print(f"   four-leg parlay realized: {mp * 100:+.1f}%  {se_txt}  n {npar}")
    else:
        print("   four-leg parlay realized: no parlay could be formed (n 0)")
    print(f"   legs dropped as remainders: {dropped}")


if __name__ == "__main__":
    nfl_dir, tennis_dir, wc_dir = sys.argv[1:4]
    bets = nfl(nfl_dir) + tennis(tennis_dir) + worldcup(wc_dir)
    print("Excluded: MLB (no quoted price, only market_p_home after devig), NBA (five rows with a spread only).")
    report(bets, "early")
    report(bets, "close")
