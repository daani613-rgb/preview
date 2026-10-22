# C_HUB_STALE_PREREGISTER.md: a "not updated" label on an engine whose status.json is older than 36 hours (closeout block C b)

Written 2026-10-22 20:24Z, before any test or code. Branches c-hub-stale-2026-10-22 in preview (hub.app.js) and in
daani613-rgb.github.io (index.html). The same text is in both.

## Why (the closeout order, block C b)
"בהאבים: תווית 'לא עודכן' למנוע ש-built_utc שלו ישן מ-36 שעות." Measured live on 22.10 at 20:2x: no such label in
either hub (hub.app.js and index.html have no built_utc use).

## The change
- **Both hubs:** when an engine's status.json is read (the shape check passes) and now − built_utc > 36 hours, the
  card shows an amber pill "Not updated for 36+ h" / "לא עודכן 36+ שעות" beside its status.
  - With no status.json (the payload fallback) or no built_utc: no label, because there is nothing to measure.
- Display only: no number, record or claim changes. hub.app.js / index.html only.

## Tests
- **Rendered** (tools/c_hub/stale_check.js with cdprun, on local copies served by gzserve, with a fixed clock CDP_NOW):
  - all 5 status.json fresh: 0 labels;
  - one built_utc 40 h before the clock: exactly 1 label, on that engine;
  - status.json missing for every engine: 0 labels, and no page error.
  Red on the current code (0 labels in the second case).
- **30-day replay** (research analysis/c_hub_stale_replay.py): for each of the last 30 UTC days, the 5 status.json files
  as they were at the end of that day in preview's history (none before they existed), the hub of origin/main against
  the branch, with the clock at 23:59Z of that day.
  - **Pass:** base shows 0 labels every day; the branch's count equals the number of engines whose built_utc is more
    than 36 h before the clock, computed from the files themselves; 0 page errors.
