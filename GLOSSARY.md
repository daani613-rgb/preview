# GLOSSARY.md: the fleet's terms in Hebrew and English (overnight block F, c; local)

One term, one meaning, the same words on every page. Measured against the live pages on 2026-10-22: 12 pages × en/he,
the visible text read headless (research ux_2026-10-22/texts.jsonl).

| Term (en) | מונח (he) | Meaning | On the pages now |
|---|---|---|---|
| A+ call | קריאת A+ | the engine speaks: its probability for the favourite passes the engine's threshold and the stage rule | "קריאת A+" 12 times, no variant |
| silent / no call | שתיקה | the engine does not call the game | "שתיקה" 1,322; verb forms שותק/לשתוק are normal Hebrew |
| stage | שלב | the form stage of a side, from its rating curve (1 to 9) | "שלב" 1,266, consistent |
| no-vig probability | הסתברות no-vig | the market price with the bookmaker's margin removed (multiplicative unless stated) | "no-vig" 620; **one variant**: "נטול-וויג" on the classic baseball page |
| closing line | קו-הסגירה | the last price before the start | "קו-הסגירה" 659, consistent |
| CLV | CLV | (p_close − p_early) / p_early on the pick, no-vig | consistent |
| margin (overround) | עמלה | the sum of implied probabilities minus 1 | |
| frozen / locked row | שורה קפואה / נעולה | the prediction written before the start, shown after it | "קפוא" 3 |
| pre-registration | הצהרה מוקדמת | the test written and committed before its result | |
| trials ledger | יומן הניסויים | every test ever run, with its result | |
| Brier, log loss | Brier, log loss | proper scoring rules; lower is better | |

**Finding:**
- The fleet's terms are already consistent.
- The one difference is "נטול-וויג" on the classic baseball page (baseball-engine baseball_dashboard.html), against
  "no-vig" everywhere else. A one-word change in an engine template, proposed and not made.
