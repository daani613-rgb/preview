// stale_check.js - C_HUB_STALE_PREREGISTER.md: count the "not updated" labels on a hub page.
window.__stale = async function () {
  await new Promise(r => setTimeout(r, 2500));
  const leaves = [...document.querySelectorAll('span,div')].filter(e => e.children.length <= 1 && /Not updated for 36\+ h|לא עודכן 36\+ שעות/.test(e.textContent));
  const uniq = new Set(leaves.map(e => e.textContent.trim()));
  const t = document.body.innerText;
  return { n: (t.match(/Not updated for 36\+ h|לא עודכן 36\+ שעות/g) || []).length, texts: [...uniq].slice(0, 5) };
};
