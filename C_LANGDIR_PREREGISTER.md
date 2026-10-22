# C_LANGDIR_PREREGISTER.md: html lang and dir follow the language switch on the preview pages (overnight block C)

Written 2026-10-22, before the change. A separate first commit, on its own branch (c-langdir-2026-10-22), local only.

- **The finding** (research ux_2026-10-22/FINDINGS_C_2026-10-22.md): in the Hebrew view, the six preview pages (the
  hub and nfl, nba, mlb, tennis, worldcup) keep `<html lang="en">` with no dir.
- **The change:** in each of the six files, `toggleLang` also sets document.documentElement.lang ("he"/"en") and dir
  ("rtl"/"ltr") to the new language. Every page starts in English, as now. No text, number or data changes.
- **Check** (headless, served locally, 390 px):
  - in he, html lang = "he" and dir = "rtl";
  - in en, lang = "en";
  - no page error.
  - **Red** before: he shows "en". **Green** after.
