/* dc-mini.js — tiny standalone renderer for the Prediction-Engines Command Centers.
 *
 * Reproduces the exact template semantics of the design-time `support.js`
 * ({{ }} interpolation in text + attributes, <sc-for>, <sc-if>, style-hover /
 * style-active pseudo rules, on* event binding, a `class Component extends DCLogic`
 * with state/setState/lifecycle/renderVals) — but with NO React, NO Babel, NO CDN.
 *
 * Differences from support.js, on purpose:
 *  - Plain DOM, not a virtual tree. setState() does a full re-render of #dc-root.
 *  - The persistent 3D hero canvas (#cc3d + #cc3d-fallback) is carried across
 *    re-renders by node identity, so the live WebGL/Three context survives a
 *    tab / language / state switch exactly like React keeps the node mounted.
 *
 * The design template markup, inline styles and the Component logic are used
 * verbatim; this file only swaps the runtime underneath them.
 */
(function () {
  'use strict';

  // ---- expression resolver (ported 1:1 from support.js src/expr.ts) ---------
  var IDENT_RE = /^[A-Za-z_$][A-Za-z0-9_$]*/;
  var NUMBER_RE = /^-?\d+(\.\d+)?$/;

  function resolve(vals, src) {
    var expr = String(src).trim();
    if (!expr) return undefined;
    if (expr[0] === '(' && expr[expr.length - 1] === ')' && parensWrapWhole(expr)) {
      return resolve(vals, expr.slice(1, -1));
    }
    var eq = findTopLevelEquality(expr);
    if (eq) {
      var lv = resolve(vals, expr.slice(0, eq.index));
      var rv = resolve(vals, expr.slice(eq.index + eq.op.length));
      switch (eq.op) {
        case '===': return lv === rv;
        case '!==': return lv !== rv;
        case '==': return lv == rv;
        default: return lv != rv;
      }
    }
    if (expr[0] === '!') return !resolve(vals, expr.slice(1));
    if (expr === 'true') return true;
    if (expr === 'false') return false;
    if (expr === 'null') return null;
    if (expr === 'undefined') return undefined;
    if (NUMBER_RE.test(expr)) return Number(expr);
    if (expr.length >= 2 && (expr[0] === '"' || expr[0] === "'") && expr[expr.length - 1] === expr[0]) {
      return expr.slice(1, -1);
    }
    return resolvePath(vals, expr);
  }
  function parensWrapWhole(expr) {
    var depth = 0;
    for (var i = 0; i < expr.length - 1; i++) {
      if (expr[i] === '(') depth++;
      else if (expr[i] === ')') { depth--; if (depth === 0) return false; }
    }
    return true;
  }
  function findTopLevelEquality(expr) {
    var depth = 0;
    for (var i = 0; i < expr.length; i++) {
      var c = expr[i];
      if (c === '[' || c === '(') depth++;
      else if (c === ']' || c === ')') depth--;
      else if (depth === 0 && (c === '=' || c === '!') && expr[i + 1] === '=') {
        if (i > 0 && (expr[i - 1] === '=' || expr[i - 1] === '!')) continue;
        if (!expr.slice(0, i).trim()) continue;
        var op = expr[i + 2] === '=' ? c + '==' : c + '=';
        return { index: i, op: op };
      }
    }
    return null;
  }
  function resolvePath(vals, expr) {
    var head = expr.match(IDENT_RE);
    if (!head) return undefined;
    var cur = vals == null ? undefined : vals[head[0]];
    var i = head[0].length;
    while (i < expr.length) {
      if (expr[i] === '.') {
        var m = expr.slice(i + 1).match(IDENT_RE) || expr.slice(i + 1).match(/^\d+/);
        if (!m) return undefined;
        cur = cur == null ? undefined : cur[m[0]];
        i += 1 + m[0].length;
      } else if (expr[i] === '[') {
        var depth = 1, j = i + 1;
        while (j < expr.length && depth > 0) {
          if (expr[j] === '[') depth++;
          else if (expr[j] === ']') { depth--; if (depth === 0) break; }
          j++;
        }
        if (depth !== 0) return undefined;
        var key = resolve(vals, expr.slice(i + 1, j));
        cur = cur == null ? undefined : cur[key];
        i = j + 1;
      } else return undefined;
    }
    return cur;
  }

  // ---- attribute value compiler --------------------------------------------
  function compileAttr(raw) {
    var whole = raw.match(/^\s*\{\{([\s\S]+?)\}\}\s*$/);
    if (whole) { var p = whole[1]; return function (vals) { return resolve(vals, p); }; }
    if (raw.indexOf('{{') !== -1) {
      var parts = raw.split(/\{\{([\s\S]+?)\}\}/g);
      return function (vals) {
        return parts.map(function (s, i) {
          if (i & 1) { var v = resolve(vals, s); return v == null ? '' : v; }
          return s;
        }).join('');
      };
    }
    return function () { return raw; };
  }

  // ---- pseudo-class (style-hover / style-active / style-*) stylesheet -------
  var pseudoSheet = null, pseudoCache = {}, pseudoN = 0;
  function pseudoClass(pseudo, css) {
    var k = pseudo + '|' + css;
    if (pseudoCache[k]) return pseudoCache[k];
    if (!pseudoSheet) { pseudoSheet = document.createElement('style'); document.head.appendChild(pseudoSheet); }
    var cls = 'scp' + (pseudoN++).toString(36);
    var sel = (pseudo === 'before' || pseudo === 'after') ? '.' + cls + '::' + pseudo : '.' + cls + ':' + pseudo;
    pseudoSheet.sheet.insertRule(sel + '{' + css + '}', pseudoSheet.sheet.cssRules.length);
    pseudoCache[k] = cls;
    return cls;
  }

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var SVG_TAGS = new Set(('svg path line circle rect ellipse polyline polygon g defs ' +
    'lineargradient radialgradient stop filter fegaussianblur femerge femergenode ' +
    'text tspan clippath use mask pattern marker symbol foreignobject').split(' '));
  // preserve camelCase for SVG attributes the DOM is case-sensitive about
  var SVG_ATTR_CASE = { viewbox: 'viewBox', gradientunits: 'gradientUnits', gradienttransform: 'gradientTransform',
    stopcolor: 'stop-color', stopopacity: 'stop-opacity', textanchor: 'text-anchor',
    stddeviation: 'stdDeviation', patternunits: 'patternUnits', clippathunits: 'clipPathUnits',
    preserveaspectratio: 'preserveAspectRatio' };

  var EVENT_ATTR = { onclick: 'click', onchange: 'change', oninput: 'input', onsubmit: 'submit',
    onkeydown: 'keydown', onkeyup: 'keyup', onkeypress: 'keypress', onmousedown: 'mousedown',
    onmouseup: 'mouseup', onmouseenter: 'mouseenter', onmouseleave: 'mouseleave',
    onfocus: 'focus', onblur: 'blur', ondblclick: 'dblclick', oncontextmenu: 'contextmenu' };

  // ---- compile a template fragment into a builder tree ----------------------
  function compileTemplate(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;                       // decodes entities, inert fragment
    return compileNodes(tpl.content.childNodes, false);
  }
  function compileNodes(nodeList, svg) {
    var out = [];
    for (var i = 0; i < nodeList.length; i++) {
      var b = compileNode(nodeList[i], svg);
      if (b) out.push(b);
    }
    return out;
  }
  function compileNode(node, svg) {
    if (node.nodeType === 3) return compileText(node);       // text
    if (node.nodeType !== 1) return null;                    // skip comments etc.
    var tag = node.tagName.toLowerCase();
    if (tag === 'sc-for') return compileFor(node, svg);
    if (tag === 'sc-if') return compileIf(node, svg);
    return compileElement(node, svg);
  }
  function compileText(node) {
    var txt = node.nodeValue || '';
    if (txt.indexOf('{{') === -1) {
      return function () { return document.createTextNode(txt); };
    }
    var parts = txt.split(/\{\{([\s\S]+?)\}\}/g);
    return function (vals) {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < parts.length; i++) {
        if (i & 1) {
          var v = resolve(vals, parts[i]);
          if (v === undefined || v === null || typeof v === 'boolean') continue;
          frag.appendChild(document.createTextNode(String(v)));
        } else if (parts[i]) {
          frag.appendChild(document.createTextNode(parts[i]));
        }
      }
      return frag;
    };
  }
  function compileFor(el, svg) {
    var listGet = compileAttr(el.getAttribute('list') || '');
    var asName = el.getAttribute('as') || 'item';
    var kids = compileNodes(el.childNodes, svg);
    return function (vals) {
      var list = listGet(vals);
      var frag = document.createDocumentFragment();
      if (Array.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
          var sub = Object.assign({}, vals); sub[asName] = list[i]; sub.$index = i;
          for (var j = 0; j < kids.length; j++) frag.appendChild(kids[j](sub));
        }
      }
      return frag;
    };
  }
  function compileIf(el, svg) {
    var valGet = compileAttr(el.getAttribute('value') || '');
    var kids = compileNodes(el.childNodes, svg);
    return function (vals) {
      var frag = document.createDocumentFragment();
      if (valGet(vals)) for (var j = 0; j < kids.length; j++) frag.appendChild(kids[j](vals));
      return frag;
    };
  }
  function compileElement(el, parentSvg) {
    var tag = el.tagName.toLowerCase();
    var svg = parentSvg || tag === 'svg';
    var attrs = [];
    for (var a = 0; a < el.attributes.length; a++) {
      var name = el.attributes[a].name, value = el.attributes[a].value;
      attrs.push({ name: name, get: compileAttr(value) });
    }
    var kids = compileNodes(el.childNodes, svg);
    return function (vals) {
      var node = svg ? document.createElementNS(SVG_NS, tag) : document.createElement(tag);
      var classes = null;
      for (var i = 0; i < attrs.length; i++) {
        var name = attrs[i].name, low = name.toLowerCase();
        if (low.indexOf('style-') === 0) {
          var cls = pseudoClass(low.slice(6), attrs[i].get(vals));
          (classes || (classes = [])).push(cls);
          continue;
        }
        if (EVENT_ATTR[low]) {
          var fn = attrs[i].get(vals);
          if (typeof fn === 'function') node.addEventListener(EVENT_ATTR[low], fn);
          continue;
        }
        var v = attrs[i].get(vals);
        if (low === 'class' || low === 'classname') { if (v != null) (classes || (classes = [])).push(String(v)); continue; }
        if (v === undefined || v === null || v === false) continue;
        if (low === 'style') { node.style.cssText = String(v); continue; }
        var attrName = svg ? (SVG_ATTR_CASE[low] || name) : name;
        node.setAttribute(attrName, v === true ? '' : String(v));
      }
      if (classes) node.setAttribute('class', classes.join(' '));
      for (var k = 0; k < kids.length; k++) node.appendChild(kids[k](vals));
      return node;
    };
  }

  // ---- DCLogic base ---------------------------------------------------------
  function DCLogic(props) { this.props = props || {}; this.state = {}; }
  DCLogic.prototype.setState = function (update, cb) { this.__host._setState(update, cb); };
  DCLogic.prototype.forceUpdate = function () { this.__host._rerender(this.state); };
  DCLogic.prototype.componentDidMount = function () {};
  DCLogic.prototype.componentDidUpdate = function () {};
  DCLogic.prototype.componentWillUnmount = function () {};
  DCLogic.prototype.renderVals = function () { return {}; };

  // ---- host: mounts a Component into #dc-root --------------------------------
  function DcHost(ComponentClass, opts) {
    opts = opts || {};
    this.rootEl = document.getElementById(opts.rootId || 'dc-root');
    this.tplSrc = document.getElementById(opts.tplId || 'dc-template').textContent;
    this.builders = compileTemplate(this.tplSrc);
    this.logic = new ComponentClass(opts.props || {});
    this.logic.__host = this;
    this._live = {};   // preserved nodes by id (the 3D canvas + fallback)
  }
  DcHost.prototype._render = function () {
    var vals = {};
    try {
      var rv = this.logic.renderVals() || {};
      vals = Object.assign({}, this.logic.props, rv);
    } catch (e) { console.error('renderVals():', e); }
    var frag = document.createDocumentFragment();
    for (var i = 0; i < this.builders.length; i++) frag.appendChild(this.builders[i](vals));
    // carry persistent nodes (live WebGL canvas) across renders by id
    for (var id in this._live) {
      var fresh = frag.querySelector('#' + id);
      if (fresh && this._live[id]) fresh.replaceWith(this._live[id]);
    }
    ['cc3d', 'cc3d-fallback'].forEach(function (id) {
      if (!this._live[id]) { var n = frag.querySelector('#' + id); if (n) this._live[id] = n; }
    }, this);
    this.rootEl.textContent = '';
    this.rootEl.appendChild(frag);
  };
  DcHost.prototype._setState = function (update, cb) {
    var prev = this.logic.state;
    var patch = typeof update === 'function' ? update(prev) : update;
    var prevState = Object.assign({}, prev);
    this.logic.state = Object.assign({}, prev, patch);
    this._rerender(prevState);
    if (cb) cb();
  };
  DcHost.prototype._rerender = function (prevState) {
    var prevProps = this.logic.props;
    this._render();
    try { this.logic.componentDidUpdate(prevProps, prevState); } catch (e) { console.error('componentDidUpdate:', e); }
  };
  DcHost.prototype.mount = function () {
    this._render();
    try { this.logic.componentDidMount(); } catch (e) { console.error('componentDidMount:', e); }
    return this;
  };

  window.DCLogic = DCLogic;
  window.DcHost = DcHost;
})();
