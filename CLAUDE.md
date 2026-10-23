# CLAUDE.md: preview (the Command Center pages)

## What this repository holds
- **`index.html`, `hub.app.js`:** the hub page, linking the five engine pages.
- **`nfl/`, `nba/`, `mlb/`, `tennis/`, `worldcup/`:** one Command Center page per sport.
  - `index.html` is the template and `app.js` the page logic.
  - Line 2 of `app.js` (`window.REAL = …`) is the data layer, written by each engine's own scheduled pipeline. The
    rest of the file is page code.
  - `status.json` is a small summary per engine (last data date, open call, build time), read by the hubs.
- **`measure/`:** the page that explains how the figures are measured.
- **`assets/`:** shared styles and scripts.
- **The records:**
  - `KNOWN_DEFECTS.md`: every known defect, with a status column;
  - `TRIALS_LEDGER.md`: every test that was run, recorded before its result;
  - `GLOSSARY.md`: the terms in English and Hebrew;
  - the `*_PREREGISTER.md` files: the declarations written before each change.

## Tests
- `python3 tools/<folder>/test_*.py` and `node tools/status/test_status.js`.
- Each test reads only this repository's files; none needs the network.
