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
- Served compressed, as GitHub Pages serves it: `python3 gzserve.py <port> <site dir>` (gzip for text files).
  `python3 -m http.server` does not compress: on 2026-10-13 it made MLB's app.js 1.6 MB on the wire against
  123 KB live, and the slow-phone paint about six times longer (correction of KNOWN_DEFECTS 103).

Browser: `CHROME_BIN` (any Chromium; default: the Playwright headless shell path of the machine it was written on).
Node 20 needs `--experimental-websocket`.

## scan.js: minus sign, tap targets, contrast

Runs inside a page (`eval` of the file, then `await window.__front()`), over every tab of the page:
- `neg`: a minus that starts a number, in an RTL context, with no LRM before it and no LTR isolate around it.
- `tap`: clickable elements whose box is under 44 x 44 px (the skip link, shown on focus only, is left out).
- `contrast`: text colour against the effective background (colours blended up the tree, opacity included);
  4.5:1 for body text, 3:1 for large text. Gradient-clipped text and emoji-only text are not measured.

`window.__overflow()` (item 108, 2026-10-19): every game card ([role=button] with more than two children), over every
tab: `childOut` (px a direct child's box leaves the card; the gate, fail if > 1), `scroll` (scrollWidth - clientWidth)
and `descOut` (widest descendant), reported apart because the NFL "Total points" and tennis "Total games" rows already
overflowed before 45e951f.

`window.__front({inject: '<html>'})` (2026-10-20): appends fixed HTML before measuring, so a style that shows only on some
days is measured every time. MLB classic: `inject: '<span class="cflag eo">engine-only · not locked</span>'`.
