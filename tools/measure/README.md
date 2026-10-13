# Page measurement tools

Basis of KNOWN_DEFECTS 103 (load time) and of the part-2 counts of 89 and 92 (2026-10-13).

## perf.mjs: load time

Headless Chromium driven over the DevTools protocol. Each load opens a fresh tab with the cache disabled, waits for
the load event and 6 s more (9 s with `--slow`), then reads first contentful paint, DOMContentLoaded, load, the bytes
over the wire (Network.loadingFinished), the bytes and timing of three.js, and saves a screenshot.

    node --experimental-websocket perf.mjs [--slow] <base url> <outdir> <runs> <widths> <path> [<path> ...]
    python3 perfsum.py <output.json>

Protocol used for 103:
- runs = 6: the first load of each page is a warm-up (DNS, TLS, CDN) and is dropped; the median of the other 5 is
  reported (`--slow`: runs = 4, median of 3).
- widths 390 and 1024 (390 emulates a phone).
- `--slow`: CPU 4x slower, 1.6 Mbps down, 750 kbps up, 150 ms round trip.
- GPU: the default ANGLE backend of the machine (on macOS, Metal). SwiftShader (software) inflates the three.js cost.
- One browser at a time: nothing else heavy runs during a measurement.
- Served from a local static server of the built site (`python3 -m http.server`).

Browser: `CHROME_BIN` (any Chromium; default: the Playwright headless shell path of the machine it was written on).
Node 20 needs `--experimental-websocket`.

## scan.js: minus sign, tap targets, contrast

Runs inside a page (`eval` of the file, then `await window.__front()`), over every tab of the page:
- `neg`: a minus that starts a number, in an RTL context, with no LRM before it and no LTR isolate around it.
- `tap`: clickable elements whose box is under 44 x 44 px (the skip link, shown on focus only, is left out).
- `contrast`: text colour against the effective background (colours blended up the tree, opacity included);
  4.5:1 for body text, 3:1 for large text. Gradient-clipped text and emoji-only text are not measured.
