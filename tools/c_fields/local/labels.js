// fsim/labels.js - walk every MLB journal date, count the four C_MLB_FIELDS labels per date, and the expected counts
// from the payload itself (review: played + totReview uncertain; void: VOID; excl: EXCLUDED; nores: not played,
// PENDING, date before R.asOf).
window.__lab = async function () {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  await wait(1500);
  const R = window.REAL || {}; const J = R.journalByDate || {}; const today = R.asOf || '';
  const inp = document.querySelector('input[type=date]');
  if (!inp) return { error: 'no date input' };
  const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  const RX = { review: /Result under review|תוצאה בבדיקה/g, void: /Void:|בוטל:/g, excl: /Not counted:|לא נספר:/g, nores: /No result yet|אין תוצאה עדיין/g,
               old: /No result: game postponed|אין תוצאה: המשחק נדחה/g };
  const got = { review: 0, void: 0, excl: 0, nores: 0, old: 0 }, want = { review: 0, void: 0, excl: 0, nores: 0, old: 0 }, bad = [];
  for (const d of (R.journalDates || [])) {
    const es = J[d] || [];
    const w = { review: es.filter(e => e.played && e.totReview === 'uncertain').length, void: es.filter(e => e.status === 'VOID').length,
                excl: es.filter(e => e.status === 'EXCLUDED').length, nores: es.filter(e => !e.played && e.status === 'PENDING' && d < today).length, old: 0 };
    if (d === today) { w.nores = 0; }   // today's view is the live slate, not the journal
    set.call(inp, d); inp.dispatchEvent(new Event('input', { bubbles: true })); inp.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(300);
    const t = document.body.innerText; const g = {};
    for (const k in RX) { g[k] = (t.match(RX[k]) || []).length; got[k] += g[k]; want[k] += (d === today ? 0 : w[k]); }
    if (d !== today && Object.keys(RX).some(k => g[k] !== w[k])) bad.push({ d, g, w });
  }
  return { asOf: today, n: (R.journalDates || []).length, got, want, bad: bad.slice(0, 10), nbad: bad.length, lang: document.documentElement.lang };
};
