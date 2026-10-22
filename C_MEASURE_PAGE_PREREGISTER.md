# C_MEASURE_PAGE_PREREGISTER.md: a local "How we measure" page (overnight block C, d)

Written 2026-10-22, before the page is committed. A separate first commit, on its own branch
(c-measure-page-2026-10-22), local only. Publishing it is Samuel's decision (D9).

- **What:** measure/index.html, a standalone page in Hebrew and English, in the preview design (fonts, dark
  background, the a11y stylesheet). It explains the lock, CLV against the margin, pre-registration and the trials
  ledger, and states the finding that the engines add no information beyond the price.
- **Its numbers, each from a source:**
  - 109 past trials, 171 registered research tests and 10 confirmation tests: TRIALS_LEDGER.
  - 2,425 games, z +4.42, weight 0: PREREG_B_MLB2016_PINNACLE.
  - six confirmation tests, none confirmed: PREREG_CONFIRM_FAMILY.
- **Check:**
  - rendered at 390 and 1024 in en and he: no page error, no horizontal scroll, scan.js tap/contrast/minus 0;
  - html lang/dir follow the switch;
  - screenshots in research ux_2026-10-22/shots/measure_*.png.

## Added 2026-10-22 16:43Z, before the change: a known-exceptions line under "The lock" (decision D9, option a)
- **Why:** tonight's journal findings (research PROPOSAL_MLB_DOUBLEHEADER_KEY.md, TENNIS_UNSETTLED_2026-10-22.md).
  The prediction is locked, but in MLB the result attached can be another game's (doubleheaders), and in MLB and
  tennis some moved or cancelled games never get a result.
- **The change:** one paragraph in en and he, after the lock paragraph, saying exactly that, and that a fix is
  pending. No number.
- **Check:** the page renders at 390 px in en and he with the paragraph visible in the reader's language, and no page
  error.
- **Result (16:43Z):** the paragraph is inside the "1. The lock" card, visible in the reader's language at 390 px (en and
  he), with no page error. Screenshots: research ux_2026-10-22/shots/measure_exception_{en,he}.png.
  - The first render put it outside the card, because the card's `</div>` closed on the same line as the Hebrew
    paragraph. Moved inside and re-rendered.
