window.__tab = async function () {
  await new Promise(r => setTimeout(r, 1800));
  const vis = e => { const s = getComputedStyle(e); return s.display !== 'none' && s.visibility !== 'hidden' && e.getClientRects().length > 0; };
  const nativeF = e => (e.matches('a[href],button,input,select,textarea,summary,iframe,[contenteditable=""],[contenteditable=true]') && !e.disabled);
  const focusable = e => (nativeF(e) && e.tabIndex >= 0) || (e.hasAttribute('tabindex') && e.tabIndex >= 0);
  const inFocusableAnc = e => { for (let p = e.parentElement; p; p = p.parentElement) if (focusable(p)) return true; return false; };
  const all = [...document.body.querySelectorAll('*')].filter(vis);
  const ctrl = all.filter(e => (e.getAttribute('role') === 'button' || e.hasAttribute('onclick')) && !focusable(e));
  const pos = all.filter(e => e.hasAttribute('tabindex') && e.tabIndex > 0);
  const pointer = all.filter(e => getComputedStyle(e).cursor === 'pointer' && !focusable(e) && !inFocusableAnc(e) && !(e.parentElement && getComputedStyle(e.parentElement).cursor === 'pointer'));
  const stops = all.filter(focusable);
  const ex = a => a.slice(0, 3).map(e => e.tagName + ':' + (e.textContent || '').trim().slice(0, 30));
  return { lang: document.documentElement.lang, unreachableControls: ctrl.length, ucEx: ex(ctrl), positiveTabindex: pos.length, posEx: ex(pos), tabStopsDom: stops.length, pointerNotFocusable: pointer.length, pEx: ex(pointer) };
};
window.__kbd = async function () {
  const r = await window.__tab();
  const t = [...document.querySelectorAll('.langbtn')][0];
  let enter = null;
  if (t) { const before = t.textContent.trim(); t.focus(); t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
           await new Promise(x => setTimeout(x, 500)); enter = { before, after: ([...document.querySelectorAll('.langbtn')][0] || {}).textContent?.trim(), focused: document.activeElement === t || document.activeElement?.classList?.contains('langbtn') }; }
  return { ...r, enter };
};
