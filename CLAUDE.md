# CLAUDE.md, preview (Command Center)
- **מה הריפו עושה:** ההאב (/preview/) וחמשת דפי ה-Command Center, ודף המדידה (/preview/measure/). שורה 2 בכל
  `<ענף>/app.js` (window.REAL) נכתבת רק על ידי ריצת המנוע (inject_data.py). כל השאר הוא קוד הדף.
- **status.json:** כל מנוע כותב `<ענף>/status.json`, וההאב קורא אותו לפני ה-payload.
- **בדיקות:** tools/*/test_*.py ו-tools/status/test_status.js. עמודת הסטטוס של KNOWN_DEFECTS.md היא הרשומה של
  כל פגם.
- **TRIALS_LEDGER.md:** כל ניסוי, נרשם לפני התוצאה.

### מה השתנה ב-22.10
- נדחפו: D15 (‏22e4537), ‏D3 (‏9b16c1c), התוויות לפי שדות היומן (‏1a79d32), תיקוני הבדיקות (‏f323b43),
  GLOSSARY.md (‏4aa94db), וסטטוס לכל פריט ב-KNOWN_DEFECTS (‏929938b).
- בענף, בלי דחיפה עדיין: התווית "לא עודכן 36+ שעות" (c-hub-stale-2026-10-22).

## סגירה, 22.10.2026 (פרק מתוארך; פקודת הסגירה v2)
- **בדיקות:** כל הבדיקות של כל הריפוז רצות מעותק archive של origin/main, עם רשת חסומה:
  `python3 ~/prediction-engines-work/research/analysis/tests_all_main.py <tag>`. ב-22.10, אחרי הדחיפות: 48 מתוך 48
  עוברות. בדיקה שמשווה ל-git HEAD מדלגת ("SKIP, לא נמדד") כשאין git (CLOSEOUT_TESTS_PREREGISTER.md).
- **מוגן, לקריאה בלבד:** פרמטרי Elo, מתמטיקת הדירוגים, CHAIN, ‏.gitignore, ‏totals/pitcher_adapter.py, מסנני
  השלבים, לוגיקת בחירת A+, כל cron, ‏isOffseason, ‏CALIB, ‏tennis_calibration.py ו-Platt, ‏tennis_stages.py,
  ‏build_predictions.py:58, ‏run_live.py, ‏baseball_daily.py ושערי הנעילה, ומנגנון היומנים הנעולים.
- **workflows:** ‏schedule ו-workflow_dispatch בלבד, ואין טריגר על push. אין ריצה ידנית בלי אישור.
- **ההחלטות שממתינות לשמואל:** ‏research/CLOSEOUT_DECISIONS_2026-10-22.md.
- **מצב הצי:** ‏research/STATE_v18_2026-10-22.md.
