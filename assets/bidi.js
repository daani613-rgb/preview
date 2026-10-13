(function () {
  // A minus that starts a number gets an LRM (U+200E) before it, so in a Hebrew (RTL) line "-15%" keeps its minus on
  // the left instead of showing as "15%-" (KNOWN_DEFECTS 89). Text only, every render: values are never changed, an
  // LRM is invisible, and in English (LTR) it changes nothing. Not a minus: a hyphen after a letter, digit or %
  // ("A-1", "4-3", "2026-10-13", "ב-29.11", "3%-10%"). Idempotent: a minus that already has its LRM is left alone.
  var RE = /(^|[^\d\w.,%֐-׿‎])([-−])(?=\d)/g, SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, TEMPLATE: 1, NOSCRIPT: 1 };
  function fix(n) {
    var t = n.nodeValue;
    if (!t || (t.indexOf('-') < 0 && t.indexOf('−') < 0) || !n.parentNode || SKIP[n.parentNode.nodeName]) return;
    var u = t.replace(RE, '$1‎$2');
    if (u !== t) n.nodeValue = u;
  }
  function walk(r) {
    if (r.nodeType === 3) return fix(r);
    if (r.nodeType !== 1 || SKIP[r.nodeName]) return;
    var w = document.createTreeWalker(r, 4, null), n;
    while ((n = w.nextNode())) fix(n);
  }
  function start() {
    walk(document.body);
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) {
        var m = ms[i];
        if (m.type === 'characterData') fix(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
