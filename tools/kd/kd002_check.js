// kd002_check.js - KD002_PREREGISTER.md. Run inside the MLB page (cdprun): returns whether today's empty-slate note is
// shown on today's view and after clicking "Yesterday". Both language versions of the note are looked for.
window.__kd002 = async function () {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const R = window.REAL || {};
  const sn = (R.slate && R.slate.note) || {};
  const notes = [sn.en, sn.he, 'אין היום משחקים בלוח.', "There are no games on today's slate."].filter(Boolean);
  const has = () => notes.some(n => document.body.innerText.includes(n));
  const today = has();
  const y = [...document.querySelectorAll('[role=button],button,div')].find(e => e.children.length <= 2 && /^(Yesterday|אתמול)/.test(e.textContent.trim()));
  if (!y) return { today, clicked: false };
  y.click(); await wait(1200);
  return { today, clicked: true, yesterday: has() };
};
