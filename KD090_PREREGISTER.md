# KD090_PREREGISTER.md: the page kicker and footer kicker in the reader's language (KNOWN_DEFECTS item 90)

Written 2026-10-22 (overnight block D), before the change. A separate first commit, on its own branch
(kd-090-2026-10-22), local only.

- **The defect** (KNOWN_DEFECTS 90): fixed English text in the Hebrew view.
  - The kicker "MLB · A+ PREDICTION ENGINE" (mlb, nba, nfl, worldcup index.html).
  - The footer kicker "PREDICTION ENGINES · 2026" (all five).
- **The change:**
  - Two keys in each page's language dictionary L, en and he:
    - hdrEngine: en unchanged ("MLB · A+ PREDICTION ENGINE"), he "MLB · מנוע חיזוי A+";
    - hdrFooter: en unchanged ("PREDICTION ENGINES · 2026"), he "מנועי חיזוי · 2026".
    - The World Cup's he kicker reads "מונדיאל · מנוע חיזוי A+".
  - The literal strings in index.html become {{ hdrEngine }} and {{ hdrFooter }}. L is already spread into the
    template state (`...L`) in all five app.js files.
  - The data line (window.REAL, line 2) is not touched. inject_data.py replaces only that line, so the change
    survives the runs.
  - English text is byte-identical. No number changes.
- **Tests:**
  - **tools/kd/test_kd090.py (static):** no index.html carries the two English literals, and each app.js defines both
    keys twice (en and he).
  - **Rendered check** (tools/kd/kd090_check.js, headless) on the five pages at 390 px:
    - in he, the kicker and footer kicker contain Hebrew;
    - in en, they equal the old English text;
    - no page error.
- **Red** before, **green** after.
