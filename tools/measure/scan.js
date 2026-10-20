// Part 2 measurement, run inside a built page. window.__front(opts) -> {neg, tap, contrast} for the visible DOM,
// over every tab state (preview: the emoji tabs; classic: all <details> open, plus the WC board views).
// neg: in an RTL context, a minus sign that starts a number with no LRM/LRI before it and no LTR isolate around it.
// tap: interactive elements (a, button, select, input, summary, [onclick], [role=button|tab], cursor:pointer roots)
//      whose box is under 44 px in height or width.
// contrast: text colour vs the effective background (solid colours blended up the tree; a gradient counts with its
//      first colour stop, flagged "est"); 4.5 for body text, 3 for large text (>= 24px, or >= 18.66px bold).
window.__front = async function (opts) {
  opts = opts || {};
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const seen = new Set(), seenText = new Set();   // tap targets and text are tracked apart
  const neg = [], tap = [], pairs = {};
  const vis = el => {
    if (!el || !el.getClientRects().length) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return false;
    let e = el;
    while (e && e.nodeType === 1) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
      e = e.parentElement;
    }
    return true;
  };
  const parse = c => {
    const m = c && c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  };
  const blend = (top, bot) => { const a = top[3]; return [top[0] * a + bot[0] * (1 - a), top[1] * a + bot[1] * (1 - a), top[2] * a + bot[2] * (1 - a), 1]; };
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const hex = c => '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const bgOf = el => {
    const stack = []; let est = false; let e = el;
    while (e && e.nodeType === 1) {
      const cs = getComputedStyle(e);
      const c = parse(cs.backgroundColor);
      if (c && c[3] > 0) stack.push(c);
      else if (cs.backgroundImage && cs.backgroundImage.includes('gradient')) {
        const g = parse(cs.backgroundImage); if (g && g[3] > 0) { stack.push(g); est = true; }
      }
      if (c && c[3] >= 1) break;
      e = e.parentElement;
    }
    let bg = [255, 255, 255, 1];
    for (let i = stack.length - 1; i >= 0; i--) bg = blend(stack[i], bg);
    return { bg, est };
  };
  const opac = el => { let o = 1, e = el; while (e && e.nodeType === 1) { o *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; } return o; };
  const label = el => (el.innerText || el.value || el.getAttribute('aria-label') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 40);
  const interactiveSel = 'a[href],button,select,input:not([type=hidden]),summary,[onclick],[role=button],[role=tab],label[for]';

  const measure = (state) => {
    // tap targets
    const cands = new Set(document.querySelectorAll(interactiveSel));
    document.querySelectorAll('div,span,li,tr,td,p,img,svg').forEach(e => {
      if (getComputedStyle(e).cursor === 'pointer' && !(e.parentElement && getComputedStyle(e.parentElement).cursor === 'pointer')) cands.add(e);
    });
    for (const el of cands) {
      if (seen.has(el) || !vis(el)) continue;
      if (el.matches('a[href^="#"]') && el.getBoundingClientRect().width <= 2) continue;   // skip link, shown on focus only
      if (el.parentElement && el.parentElement.closest(interactiveSel) && !el.matches(interactiveSel)) continue;
      seen.add(el);
      const r = el.getBoundingClientRect();
      const inline = el.tagName === 'A' && getComputedStyle(el).display === 'inline' && el.parentElement && (el.parentElement.innerText || '').trim().length > (el.innerText || '').trim().length + 15;
      if (r.height < 44 || r.width < 44) tap.push({ state, tag: el.tagName.toLowerCase(), text: label(el), w: Math.round(r.width), h: Math.round(r.height), inline });
    }
    // text nodes: contrast + negatives
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      const t = n.nodeValue; if (!t || !t.trim()) continue;
      const el = n.parentElement; if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(el.tagName) || !vis(el)) continue;
      const key = el;
      if (!seenText.has(key)) {
        seenText.add(key);
        const cs = getComputedStyle(el);
        const clipText = /text/.test(cs.webkitBackgroundClip || cs.backgroundClip || '');      // gradient-clipped text: no single colour
        const symOnly = !/[\p{L}\p{N}]/u.test(t);                                                 // emoji / symbols only
        const fg0 = (clipText || symOnly) ? null : parse(cs.color); if (fg0) {
          const { bg, est } = bgOf(el);
          const o = opac(el);
          const fg = blend([fg0[0], fg0[1], fg0[2], fg0[3] * o], bg);
          const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
          const large = size >= 24 || (size >= 18.66 && bold);
          const r = ratio(fg, bg), need = large ? 3 : 4.5;
          if (r < need) {
            const k = hex(fg) + ' on ' + hex(bg) + (large ? ' L' : '') + (est ? ' est' : '');
            pairs[k] = pairs[k] || { pair: k, ratio: +r.toFixed(2), need, n: 0, ex: t.trim().slice(0, 30), state,
              src: { tag: el.tagName.toLowerCase(), cls: (el.className && el.className.baseVal === undefined ? el.className : '').slice(0, 40),
                     raw: cs.color, op: +o.toFixed(2), style: (el.getAttribute('style') || '').slice(0, 90),
                     pcls: (el.parentElement && typeof el.parentElement.className === 'string' ? el.parentElement.className : '').slice(0, 30) } };
            pairs[k].n++;
          }
        }
      }
      // negatives in RTL
      if (getComputedStyle(el).direction === 'rtl') {
        const re = /(^|[^\d‎⁦\w.,%֐-׿])([-−])(?=\d)/g; let m;   // a Hebrew prefix (ב-, ל-) is not a minus
        while ((m = re.exec(t))) {
          let iso = false, e = el;
          while (e && e.nodeType === 1) {
            const cs = getComputedStyle(e);
            if (cs.direction === 'ltr' && /isolate|embed|plaintext|bidi-override/.test(cs.unicodeBidi)) { iso = true; break; }
            if (e.getAttribute('dir') === 'ltr') { iso = true; break; }
            if (cs.direction === 'rtl' && e !== el) break;
            e = e.parentElement;
          }
          if (!iso) neg.push({ state, text: t.trim().slice(Math.max(0, m.index - 12), m.index + 16) });
        }
      }
    }
  };

  document.querySelectorAll('details').forEach(d => d.open = true);
  measure('default');
  if (opts.tabs !== false) {
    const tabs = [...new Set([...document.querySelectorAll('div,button,a,span')].filter(x => x.children.length <= 2 && /^(⚡|📊|🎯|📖)\s*\S/.test(x.innerText.trim()) && x.innerText.trim().length < 30))];
    for (const t of tabs) { const name = t.innerText.trim().replace(/\s+/g, ''); t.click(); await wait(700); document.querySelectorAll('details').forEach(d => d.open = true); measure(name); }
    if (typeof window.setView === 'function') for (const v of ['upcoming', 'results', 'date', 'all']) { try { window.setView(v); await wait(400); measure('view:' + v); } catch (e) {} }
  }
  const pl = Object.values(pairs).sort((a, b) => b.n - a.n);
  return { neg: neg.length, negEx: neg.slice(0, 12), negAll: neg, tap: tap.length, tapNonInline: tap.filter(x => !x.inline).length, tapEx: tap.slice(0, 15), tapAll: tap,
           contrastPairs: pl.length, contrastEls: pl.reduce((s, p) => s + p.n, 0), contrastEx: pl.slice(0, 12), contrastAll: pl };
};

// Item 108 (2026-10-19): card overflow, over every tab state. A card is a visible [role=button] with more than two
// children. childOut: px by which a direct child's box leaves the card's box (fail if > 1). scroll: scrollWidth minus
// clientWidth. descOut: the widest overflow of any descendant. scroll and descOut are reported apart: on the build
// before 45e951f the NFL "Total points" row already overflows (a separate, older defect), so the regression gate is childOut.
// Item 109 (2026-10-20): descOut > 1 becomes a gate, with overlap (two text runs whose own boxes intersect by more
// than 2 x 2 px) and vclip (an element with overflow other than visible whose scrollHeight > clientHeight + 1).
window.__overflow = async function (opts) {
  opts = opts || {};
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const out = [], seen = new Set();
  const measure = state => {
    for (const c of document.querySelectorAll('[role=button]')) {
      const r = c.getBoundingClientRect();
      if (c.children.length <= 2 || r.width < 1 || !c.getClientRects().length) continue;
      const name = (c.innerText || '').trim().split('\n')[0].slice(0, 30), key = state + '|' + name;
      if (seen.has(key)) continue; seen.add(key);
      const ext = el => { const b = el.getBoundingClientRect(); return b.width < 1 ? 0 : Math.max(r.left - b.left, b.right - r.right); };
      let childOut = 0, descOut = 0, descEx = '';
      for (const k of c.children) childOut = Math.max(childOut, ext(k));
      for (const d of c.querySelectorAll('*')) { const e = ext(d); if (e > descOut) { descOut = e; descEx = (d.innerText || d.tagName).trim().replace(/\s+/g, ' ').slice(0, 30); } }
      // item 109: text runs that overlap (boxes of the text itself), and text cut in height by an overflow box
      const runs = [], tw = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); let n;
      while ((n = tw.nextNode())) {
        if (!n.nodeValue.trim()) continue;
        const rg = document.createRange(); rg.selectNodeContents(n);
        // one box per line, cut to what the overflow boxes between the text and the card let show (an ellipsis-cut
        // name's range still spans its full width)
        let clip = { left: -1e9, top: -1e9, right: 1e9, bottom: 1e9 };
        for (let e = n.parentElement; e && e !== c.parentElement; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
            const q = e.getBoundingClientRect();
            clip = { left: Math.max(clip.left, q.left), top: Math.max(clip.top, q.top), right: Math.min(clip.right, q.right), bottom: Math.min(clip.bottom, q.bottom) };
          }
        }
        const bs = [...rg.getClientRects()].map(b => ({ left: Math.max(b.left, clip.left), top: Math.max(b.top, clip.top),
                                                        right: Math.min(b.right, clip.right), bottom: Math.min(b.bottom, clip.bottom) }))
                                           .filter(b => b.right - b.left >= 1 && b.bottom - b.top >= 1);
        if (bs.length) runs.push({ bs, t: n.nodeValue.trim().slice(0, 24) });
      }
      let overlap = 0, overlapEx = '';
      const hit = (A, B) => Math.min(A.right, B.right) - Math.max(A.left, B.left) > 2 && Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top) > 2;
      for (let i = 0; i < runs.length; i++) for (let j = i + 1; j < runs.length; j++) {
        if (runs[i].bs.some(A => runs[j].bs.some(B => hit(A, B)))) { overlap++; if (!overlapEx) overlapEx = runs[i].t + ' / ' + runs[j].t; }
      }
      let vclip = 0, vclipEx = '';
      for (const d of [c, ...c.querySelectorAll('*')]) {
        const cs = getComputedStyle(d);
        if ((cs.overflowY === 'visible' && cs.overflow === 'visible') || !d.getClientRects().length || !(d.innerText || '').trim()) continue;
        if (d.scrollHeight > d.clientHeight + 1) { vclip++; if (!vclipEx) vclipEx = (d.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 30); }
      }
      out.push({ state, card: name, w: Math.round(r.width), display: getComputedStyle(c).display,
                 childOut: Math.round(childOut), scroll: c.scrollWidth - c.clientWidth, descOut: Math.round(descOut), descEx,
                 overlap, overlapEx, vclip, vclipEx });
    }
  };
  measure('default');
  if (opts.tabs !== false) {
    const tabs = [...new Set([...document.querySelectorAll('div,button,a,span')].filter(x => x.children.length <= 2 && /^(⚡|📊|🎯|📖)\s*\S/.test(x.innerText.trim()) && x.innerText.trim().length < 30))];
    for (const t of tabs) { const name = t.innerText.trim().replace(/\s+/g, ''); t.click(); await wait(700); measure(name); }
  }
  return { cards: out.length, childFail: out.filter(x => x.childOut > 1).length, scrollFail: out.filter(x => x.scroll > 0).length,
           descFail: out.filter(x => x.descOut > 1).length, maxChildOut: Math.max(0, ...out.map(x => x.childOut)),
           overlapFail: out.filter(x => x.overlap > 0).length, vclipFail: out.filter(x => x.vclip > 0).length,
           gate109: out.filter(x => x.descOut > 1 || x.overlap > 0 || x.vclip > 0).length, all: out };
};
