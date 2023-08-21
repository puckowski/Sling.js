"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRoute = addRoute;
exports.detachDetector = detachDetector;
exports.detectChanges = detectChanges;
exports.enableDetectOnThen = enableDetectOnThen;
exports.getRoute = getRoute;
exports.getRouteParams = getRouteParams;
exports.getRouteQueryVariables = getRouteQueryVariables;
exports.getRouteSegments = getRouteSegments;
exports.getState = getState;
exports.hydrate = hydrate;
exports.isDetectorAttached = isDetectorAttached;
exports.m = m;
exports.markup = markup;
exports.mount = mount;
exports.removeRoute = removeRoute;
exports.renderElement = renderElement;
exports.renderElementWithoutClass = renderElementWithoutClass;
exports.renderToString = renderToString;
exports.resolveAll = resolveAll;
exports.route = route;
exports.setDetectionStrategy = setDetectionStrategy;
exports.setRouteStrategy = setRouteStrategy;
exports.setState = setState;
exports.textNode = textNode;
exports.update = update;
exports.version = version;
exports.wrapWithChangeDetector = wrapWithChangeDetector;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e38) { throw _e38; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e39) { didErr = true; err = _e39; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var t = "undefined" != typeof window;
var e = t ? window : global;
t || (e.setTimeout = function () {}, e.setInterval = function () {}, e.location = {}, e.location.href = "", e.fetch = function () {}, e.XMLHttpRequest = {}, e.XMLHttpRequest.prototype = {}, e.XMLHttpRequest.prototype.send = function () {}), e.s = function () {}, s._state = {}, s._destroyFuncMap = new Map(), s._updateMap = new Map(), s._afterInitArr = [], s._destroyNodeMap = new Map(), s._structureForMap = new Map(), s._isAnimatingKeyed = null, s._scopedCssSet = new Set();
var n = function n(_ref, l) {
    var t = _ref.tagName,
      e = _ref.attrs,
      r = _ref.children,
      o = _ref.model;
    var i,
      a = "<" + (t = t.toLowerCase()),
      u = null;
    for (var _i = 0, _Object$entries = Object.entries(e); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        _t = _Object$entries$_i[0],
        _n2 = _Object$entries$_i[1];
      if (a += "function" === (i = _typeof(_n2)) ? " " + _t + '=""' : " " + _t + '="' + _n2 + '"', "slfor" === _t) {
        var _t2 = _n2.split(":");
        if (_t2.length >= 4) {
          s._structureForMap.has(_t2[0]) || s._structureForMap.set(_t2[0], N(null, o[_t2[2]]));
          var _e2 = s._structureForMap.get(_t2[0]);
          u = F.bind(o, _e2, o[_t2[1]], o[_t2[3]])();
        }
      } else if ("slfornamed" === _t) {
        var _t3 = _n2.split(":");
        if (_t3.length >= 4) {
          var _e3 = void 0,
            _n3 = void 0,
            _r2 = void 0,
            _l = void 0;
          for (var _i2 = 0, _Object$keys = Object.keys(o); _i2 < _Object$keys.length; _i2++) {
            var _s2 = _Object$keys[_i2];
            (_l = o[_s2]).slfor === _t3[2] ? _e3 = _l : _l.slfor === _t3[1] ? _r2 = _l : _l.slfor === _t3[3] && (_n3 = _l);
          }
          var _iterator = _createForOfIteratorHelper(O(o)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _s3 = _step.value;
              (_l = o[_s3]).slfor === _t3[2] ? _e3 = _l : _l.slfor === _t3[1] ? _r2 = _l : _l.slfor === _t3[3] && (_n3 = _l);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _r2 = _r2.bind(o), s._structureForMap.has(_t3[0]) || s._structureForMap.set(_t3[0], N(null, _e3));
          var _i3 = s._structureForMap.get(_t3[0]);
          u = F.bind(o, _i3, _r2, _n3)();
        }
      }
    }
    a += ">", null !== u && u.forEach(function (t) {
      a += n(t, l);
    });
    var _iterator2 = _createForOfIteratorHelper(r),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _t4 = _step2.value;
        _t4.view ? (_t4.slOnInit && (_t4.slOnInit(), l.push(_t4)), _t4 = _t4.view.bind(_t4)(), a += n(_t4, l)) : a += "string" == typeof _t4 ? _t4 : n(_t4, l);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return a += "</" + t + ">";
  },
  r = function r(t, e) {
    var n = [];
    var s;
    for (n.push(t); n.length > 0;) if ((s = n.shift()).attrs && (s.attrs.slfor || s.attrs.slfornamed) && (s.model = e), s.children) for (var _t5 = s.children.length - 1; _t5 >= 0; --_t5) n.push(s.children[_t5]);
  },
  o = function o(t) {
    var e = [];
    var n, r;
    for (e.push(t); e.length > 0;) if (3 !== (n = e.shift()).nodeType && (n.hasAttribute("slfor") ? (r = (r = n.getAttribute("slfor")).split(":")).length > 0 && s._structureForMap["delete"](r[0]) : n.hasAttribute("slfornamed") && (r = (r = n.getAttribute("slfornamed")).split(":")).length > 0 && s._structureForMap["delete"](r[0]), n.children)) for (var _t6 = n.children.length - 1; _t6 >= 0; --_t6) e.push(n.children[_t6]);
  };
function renderElementWithoutClass(t, e, n) {
  var r,
    o,
    l = document.createElement(t);
  for (var _i4 = 0, _Object$keys2 = Object.keys(e); _i4 < _Object$keys2.length; _i4++) {
    var _t7 = _Object$keys2[_i4];
    "function" === (r = _typeof(o = e[_t7])) ? (l[_t7] = o, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || o.name.startsWith("bound slDetached") || o.name.startsWith("slDetached") || W(_t7, l)) : l.setAttribute(_t7, o);
  }
  var _iterator3 = _createForOfIteratorHelper(n),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _t8 = _step3.value;
      l.append(_t8);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return l;
}
function renderElement(_ref2) {
  var t = _ref2.tagName,
    e = _ref2.attrs,
    n = _ref2.children;
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var o,
    l = document.createElement(t);
  for (var _i5 = 0, _Object$entries2 = Object.entries(e); _i5 < _Object$entries2.length; _i5++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i5], 2),
      _t9 = _Object$entries2$_i[0],
      _n4 = _Object$entries2$_i[1];
    "function" === (o = _typeof(_n4)) ? (l[_t9] = _n4, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || _n4.name.startsWith("bound slDetached") || _n4.name.startsWith("slDetached") || W(_t9, l)) : l.setAttribute(_t9, _n4);
  }
  var _iterator4 = _createForOfIteratorHelper(n),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _t10 = _step4.value;
      "string" == typeof _t10 ? l.append(_t10) : _t10.view ? r ? a(_t10, l) : u(_t10, l) : l.appendChild(renderElement(_t10, r));
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return l;
}
var l = function l(_ref3) {
    var t = _ref3.tagName,
      e = _ref3.attrs,
      n = _ref3.children;
    var r,
      o = document.createElement(t);
    for (var _i6 = 0, _Object$entries3 = Object.entries(e); _i6 < _Object$entries3.length; _i6++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i6], 2),
        _t11 = _Object$entries3$_i[0],
        _n5 = _Object$entries3$_i[1];
      "function" === (r = _typeof(_n5)) ? (o[_t11] = _n5, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || _n5.name.startsWith("bound slDetached") || _n5.name.startsWith("slDetached") || W(_t11, o)) : o.setAttribute(_t11, _n5);
    }
    var _iterator5 = _createForOfIteratorHelper(n),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _t12 = _step5.value;
        "string" == typeof _t12 ? o.append(_t12) : _t12.view ? u(_t12, o) : o.appendChild(l(_t12));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return o;
  },
  i = function i(t, e) {
    t.slKeyList = [], t.slNamespace = {};
    for (var _n6 in e) t.slNamespace[_n6] = e[_n6], t.slKeyList.push(_n6);
  },
  a = function a(t, e) {
    t = d(t, !0, !0, !0).view;
    var n = l(t);
    e.appendChild(n);
  },
  u = function u(t, e) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    Object.getPrototypeOf(t).slDirty = !0;
    var r = t,
      o = d(t, !0, !0, !0);
    t = o.view, o.afterInit && s._afterInitArr.push(o.afterInit);
    var a = l(t);
    if (o.scopedCss) {
      var _t13 = R(o.model, o.model.slStyle());
      g(a, _t13), a.slScopedCss = !0;
    }
    c(a, o.destroyIndex, o.onDestroy), f(a), e.appendChild(a), i(a, r), n && C(a, t, o.model);
  },
  c = function c(t, e, n) {
    t.slOnDestroy = !0, t.slAfterInit = !0, t.slOnInit = !0, t.slOnDestroyIndex = e, t.slOnDestroyFn = n;
  },
  d = function d(t, e, n) {
    var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    var l = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    if (n && t.slOnInit && t.slOnInit(), l && l.slKeyList) {
      var _iterator6 = _createForOfIteratorHelper(l.slKeyList),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _e4 = _step6.value;
          void 0 === t[_e4] ? t[_e4] = l.slNamespace[_e4] : l.slNamespace[_e4] = t[_e4];
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    var i = null;
    if (e && t.slOnDestroy) {
      var _e5 = s._destroyFuncMap.get(s._router.mountRoute);
      _e5 || (_e5 = []), _e5.push(t.slOnDestroy.bind(t)), s._destroyFuncMap.set(s._router.mountRoute, _e5), i = _e5.length - 1;
    }
    var a = t.view.bind(t)();
    return r(a, t), {
      view: a,
      afterInit: t.slAfterInit ? t.slAfterInit.bind(t) : null,
      onDestroy: e && !o || !t.slOnDestroy ? null : t.slOnDestroy.bind(t),
      onInit: !n && t.slOnInit ? t.slOnInit : null,
      destroyIndex: i,
      model: t,
      scopedCss: t.slStyle ? t.slStyle.bind(t) : null
    };
  },
  f = function f(t) {
    if (t && null !== t.slOnDestroyIndex && void 0 !== t.slOnDestroyIndex) {
      var _e6 = s._destroyNodeMap.get(s._router.mountRoute);
      _e6 || (_e6 = []), _e6.find(function (e) {
        return e.slOnDestroyIndex === t.slOnDestroyIndex;
      }) || _e6.push(t), s._destroyNodeMap.set(s._router.mountRoute, _e6);
    }
  },
  p = function p(t) {
    if (t && t.slOnDestroy) {
      var _e7 = s._destroyFuncMap.get(s._router.mountRoute);
      _e7 || (_e7 = []), _e7.splice(t.slOnDestroyIndex, 1), s._destroyFuncMap.set(s._router.mountRoute, _e7);
      var _n7 = s._destroyNodeMap.get(s._router.mountRoute);
      _n7 || (_n7 = []), _n7.forEach(function (e) {
        e.slOnDestroyIndex > t.slOnDestroyIndex && e.slOnDestroyIndex--;
      }), _n7 = _n7.filter(function (e) {
        return e.slOnDestroyIndex !== t.slOnDestroyIndex;
      }), s._destroyNodeMap.set(s._router.mountRoute, _n7);
    }
  },
  h = function h(t) {
    if (t && t.children && t.children.length > 0) {
      var _iterator7 = _createForOfIteratorHelper(t.children),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _e8 = _step7.value;
          h(_e8);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      t.slOnDestroyFn && (t.slOnDestroyFn(), t.slOnDestroyFn = null);
    } else t.slOnDestroyFn && (t.slOnDestroyFn(), t.slOnDestroyFn = null);
  },
  g = function g(t, e) {
    if (t.setAttribute(e, ""), t.children && t.children.length > 0) {
      var _iterator8 = _createForOfIteratorHelper(t.children),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _n8 = _step8.value;
          g(_n8, e);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  },
  y = function y(t, e) {
    t.slOnDestroy = !0;
    var n = s._destroyFuncMap.get(s._router.mountRoute);
    n || (n = []), n.push(e), s._destroyFuncMap.set(s._router.mountRoute, n), t.slOnDestroyIndex = n.length - 1, t.slOnDestroyFn = e, f(t);
  },
  _ = function _(t, e, n) {
    var r;
    var o = [];
    var _iterator9 = _createForOfIteratorHelper(e),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _t14 = _step9.value;
        var _e9 = n[_t14.name];
        _e9 ? _e9.length === _t14.nodeValue.length && _e9 === _t14.nodeValue && delete n[_t14.name] : _t14.name.startsWith("slcss-") || o.push(_t14.nodeName);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    o.forEach(function (e) {
      t.removeAttribute(e);
    }), void 0 !== n.slref && (t.slref = t);
    var l = n.slpreventdefault;
    var i = !1;
    var _loop = function _loop() {
      var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i7], 2),
        e = _Object$entries4$_i[0],
        o = _Object$entries4$_i[1];
      if ("function" === (r = _typeof(o))) {
        if (void 0 !== l) {
          var _n9 = e;
          _n9.startsWith("on") && (_n9 = _n9.substring(2, _n9.length));
          var _s4 = t[e];
          if (_s4) {
            (Array.isArray(_s4) ? _s4 : [_s4]).forEach(function (e) {
              t.removeEventListener(_n9, e);
            });
          }
          t.addEventListener(_n9, function (t) {
            t.preventDefault();
          }), i = !0;
        }
        t[e] = o, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || o.name.startsWith("bound slDetached") || o.name.startsWith("slDetached") || W(e, t);
      } else t.setAttribute(e, o);
    };
    for (var _i7 = 0, _Object$entries4 = Object.entries(n); _i7 < _Object$entries4.length; _i7++) {
      _loop();
    }
    i || (void 0 !== l ? v([t]) : e.slpreventdefault && v([t]));
  },
  A = function A(t, e, n) {
    var r = e.length;
    var a = 0;
    for (var _t15 = e.length - 1; _t15 >= 0; --_t15) {
      var _r3 = null,
        _o = null;
      if (n[_t15] && n[_t15].view) {
        var _l2 = d(n[_t15], !1, !1, !1, e[_t15]);
        n[_t15] = _l2.view;
        var _a = Object.getPrototypeOf(_l2.model);
        !0 !== _a.slDirty && (_l2.onInit && e[_t15].slOnInit && (e[_t15].slOnInit = !1), _l2.afterInit && e[_t15].slAfterInit && (e[_t15].slAfterInit = !1), _l2.scopedCss && e[_t15].slScopedCss && (e[_t15].slScopedCss = !1), _l2.onDestroy && e[_t15].slOnDestroy && (e[_t15].slOnDestroy = !1), _a.slDirty = !0), _l2.onInit && e[_t15] && !e[_t15].slOnInit && _l2.onInit.bind(_l2.model)(), _l2.afterInit && e[_t15] && !e[_t15].slAfterInit && (e[_t15].slAfterInit = !0, s._afterInitArr.push(_l2.afterInit)), _l2.scopedCss && e[_t15] && !e[_t15].slScopedCss && (_o = R(_l2.model, _l2.model.slStyle())), _l2.onDestroy && e[_t15] && !e[_t15].slOnDestroy && y(n[_t15], _l2.onDestroy), i(e[_t15], _l2.model), _r3 = _l2.model;
      }
      C(e[_t15], n[_t15], _r3), _o && (g(e[_t15], _o), e[_t15].slScopedCss = !0), a++;
    }
    var c = e.length;
    for (; c > r;) p(e[c - 1]), h(e[c - 1]), o(e[e.length - 1]), b(e[c - 1]), c--;
    var _iterator10 = _createForOfIteratorHelper(n.slice(r)),
      _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var _e10 = _step10.value;
        if ("string" == typeof _e10) t.childNodes[a] ? t.childNodes[a].textContent !== _e10 && (t.childNodes[a].textContent = _e10) : t.append(_e10);else if ("string" == typeof _e10) t.append(_e10);else if (_e10.view) u(_e10, t, !0);else {
          var _n10 = l(_e10);
          t.appendChild(_n10), C(_n10, _e10);
        }
        a++;
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
    for (c = e.length; c > n.length;) p(e[c - 1]), h(e[c - 1]), o(e[c - 1]), b(e[c - 1]), c--;
  },
  b = function b(t) {
    var e = s._router.count;
    if (void 0 === t.slanimatedestroytarget || "" === t.slanimatedestroytarget || t.slAnimateDestroy || void 0 === t.attributes.slanimatedestroy || "" === t.getAttribute("slanimatedestroy")) {
      if (3 === t.nodeType || void 0 === t.attributes.slanimatedestroy || "" === t.getAttribute("slanimatedestroy") || t.slAnimateDestroy) t.slAnimateDestroy || (s._router.currentRoute && t.id !== s._router.currentRoute.root ? (t.remove(), s._updateMap["delete"](t.id)) : e === s._router.count && (t.remove(), s._updateMap["delete"](t.id)));else {
        var _n11 = t.onanimationend,
          _r4 = t.onanimationstart,
          _o2 = t.getAttribute("slanimatedestroy");
        t.onanimationstart = function (e) {
          t.slAnimationName = e.animationName;
        }, t.onanimationend = function (o) {
          if (!t.slAnimationName || t.slAnimationName !== o.animationName) return;
          var l = void 0;
          return _n11 && (l = _n11.apply(this, [].slice.call(arguments))), s._router.currentRoute && t.id !== s._router.currentRoute.root ? (t.remove(), s._updateMap["delete"](t.id)) : e === s._router.count && (t.remove(), s._updateMap["delete"](t.id)), t.slAnimationName = null, t.onanimationend = _n11, t.onanimationstart = _r4, t.slAnimateDestroy = !1, l;
        }, t.classList.add(_o2), t.slAnimateDestroy = !0;
      }
    } else {
      var _n12 = t.slanimatedestroytarget;
      if ("function" == typeof _n12) {
        var _r5 = _n12(t);
        if (_r5) {
          var _n13 = _r5.getAttribute("slanimatedestroy"),
            _o3 = _r5.onanimationend,
            _l3 = _r5.onanimationstart;
          _r5.onanimationstart = function (t) {
            _r5.slAnimationName = t.animationName;
          }, _r5.onanimationend = function (i) {
            if (!_r5.slAnimationName || _r5.slAnimationName !== i.animationName) return;
            var a = void 0;
            return _o3 && (a = _o3.apply(this, [].slice.call(arguments))), _r5.classList.remove(_n13), s._isAnimatingKeyed = null, s._router.currentRoute.animateDestroy ? (s._router.currentRoute.animateDestroy = !1, t.setAttribute("style", "opacity: 0;"), _r5.onanimationend = null, _r5.onanimationstart = null) : (s._router.currentRoute && t.id !== s._router.currentRoute.root ? (t.remove(), s._updateMap["delete"](t.id)) : e === s._router.count && (t.remove(), s._updateMap["delete"](t.id)), _r5.onanimationend = _o3, _r5.onanimationstart = _l3), _r5.slAnimationName = null, t.slAnimateDestroy = !1, delete t.slanimatedestroytarget, detectChanges(), a;
          }, s._isAnimatingKeyed = _r5, _r5.classList.add(_n13), t.slAnimateDestroy = !0;
        } else s._router.currentRoute && t.id !== s._router.currentRoute.root ? (t.remove(), s._updateMap["delete"](t.id)) : e === s._router.count && (t.remove(), s._updateMap["delete"](t.id));
      } else s._router.currentRoute && t.id !== s._router.currentRoute.root ? (t.remove(), s._updateMap["delete"](t.id)) : e === s._router.count && (t.remove(), s._updateMap["delete"](t.id));
    }
  },
  D = function D(t) {
    return t && t !== Object.prototype && Object.getOwnPropertyNames(t).filter(function (e) {
      return function (t, e) {
        return (Object.getOwnPropertyDescriptor(t, e) || {}).get;
      }(t, e) || function (t, e) {
        return "function" == typeof t[e];
      }(t, e);
    }).concat(D(Object.getPrototypeOf(t)) || []);
  },
  O = function O(t) {
    return function (t) {
      return Array.from(new Set(D(t)));
    }(t).filter(function (t) {
      return "constructor" !== t && !~t.indexOf("__");
    });
  },
  I = function I(t, e) {
    if (e.slStyle && !t.slScopedCss) {
      var _n14 = R(e, e.slStyle());
      g(t, _n14), t.slScopedCss = !0;
    }
  },
  v = function v(t) {
    var _loop2 = function _loop2() {
      var n = t[_e11];
      if (null !== n.getAttribute("slpreventdefault")) for (var _t16 in n) if (_t16.startsWith("on")) {
        var _e12 = _t16.substring(2, _t16.length);
        var _s5 = n[_t16];
        if (_s5) {
          (Array.isArray(_s5) ? _s5 : [_s5]).forEach(function (t) {
            n.removeEventListener(_e12, t);
          });
        }
        n.addEventListener(_e12, function (t) {
          t.preventDefault();
        });
      }
    };
    for (var _e11 = 0; _e11 < t.length; _e11++) {
      _loop2();
    }
  },
  C = function C(t, e) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (null !== s._isAnimatingKeyed) {
      var _iterator11 = _createForOfIteratorHelper(s._updateMap),
        _step11;
      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var _step11$value = _slicedToArray(_step11.value, 2),
            _e13 = _step11$value[0],
            _n15 = _step11$value[1];
          {
            var _n16 = document.getElementById(_e13);
            if (_n16.contains(s._isAnimatingKeyed) && _n16.contains(t)) return t;
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
    if (e && e.view) {
      var _n17 = d(e, !1, !1, !1, t);
      e = _n17.view;
      var _r6 = Object.getPrototypeOf(_n17.model);
      if (!0 !== _r6.slDirty && (_n17.onInit && t.slOnInit && (t.slOnInit = !1), _n17.afterInit && t.slAfterInit && (t.slAfterInit = !1), _n17.scopedCss && t.slScopedCss && (t.slScopedCss = !1), _n17.onDestroy && t.slOnDestroy && (t.slOnDestroy = !1), _r6.slDirty = !0), _n17.onInit && t && !t.slOnInit && _n17.onInit.bind(_n17.model)(), _n17.afterInit && t && !t.slAfterInit && (t.slAfterInit = !0, s._afterInitArr.push(_n17.afterInit)), _n17.scopedCss && t && !t.slScopedCss) {
        var _e14 = R(_n17.model, _n17.model.slStyle());
        g(t, _e14), t.slScopedCss = !0;
      }
      _n17.onDestroy && t && !t.slOnDestroy && y(t, _n17.onDestroy);
    }
    if (!e) return t && (p(t), h(t), o(t), b(t)), t;
    if (t && t.tagName !== e.tagName) {
      if (!e.tagName) return p(t), h(t), t.replaceWith(e), t = e;
      {
        var _n18 = document.createElement(e.tagName);
        I(_n18, e), t.parentNode.insertBefore(_n18, t), p(t), h(t), o(t), b(t), t = _n18;
      }
    }
    if ("string" == typeof e) return t.textContent !== e && (t.textContent = e), t;
    switch (e.attrs.sldirective) {
      case "useexisting":
        return I(t, e), t;
      case "onlychildren":
        return A(t, t.childNodes, e.children), t;
      case "onlyself":
        return _(t, t.attributes, e.attrs), I(t, e), t;
      case "trustchildren":
        {
          _(t, t.attributes, e.attrs), I(t, e);
          var _n19 = "";
          e.children.forEach(function (t) {
            _n19 += t;
          }), t.innerHTML !== _n19 && (t.innerHTML = _n19);
          var _s6 = t.querySelectorAll("[slpreventdefault]");
          return _s6.length > 0 && v(Array.from(_s6)), t;
        }
    }
    if (e.attrs.slfor) {
      var _n20 = e.attrs.slfor.split(":");
      if (_n20.length >= 4) {
        if (!s._structureForMap.has(_n20[0])) {
          var _r7 = N(t, e.model[_n20[2]]);
          if (s._structureForMap.set(_n20[0], _r7), t.children.length > 0) {
            var _e15 = Object.create(null);
            for (var _n21 = 0; _n21 < t.children.length; ++_n21) _e15[_n21] = t.children[_n21];
            _r7.map = _e15;
          }
        }
        var _r8 = s._structureForMap.get(_n20[0]);
        H.bind(e.model, _r8, e.model[_n20[1]], e.model[_n20[3]])();
      }
      return _(t, t.attributes, e.attrs), I(t, e), t;
    }
    if (e.attrs.slfornamed) {
      var _n22 = e.attrs.slfornamed.split(":");
      if (_n22.length >= 4) {
        var _r9, _o4, _l4, _i8;
        for (var _i9 = 0, _Object$keys3 = Object.keys(e.model); _i9 < _Object$keys3.length; _i9++) {
          var _t17 = _Object$keys3[_i9];
          (_i8 = e.model[_t17]).slfor === _n22[2] ? _r9 = _i8 : _i8.slfor === _n22[1] ? _l4 = _i8 : _i8.slfor === _n22[3] && (_o4 = _i8);
        }
        var _iterator12 = _createForOfIteratorHelper(O(e.model)),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var _t18 = _step12.value;
            (_i8 = e.model[_t18]).slfor === _n22[2] ? _r9 = _i8 : _i8.slfor === _n22[1] ? _l4 = _i8 : _i8.slfor === _n22[3] && (_o4 = _i8);
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
        if (_l4 = _l4.bind(e.model), !s._structureForMap.has(_n22[0])) {
          var _e16 = N(t, _r9);
          if (s._structureForMap.set(_n22[0], _e16), t.children.length > 0) {
            var _n23 = Object.create(null);
            for (var _e17 = 0; _e17 < t.children.length; ++_e17) _n23[_e17] = t.children[_e17];
            _e16.map = _n23;
          }
        }
        var _a2 = s._structureForMap.get(_n22[0]);
        H.bind(e.model, _a2, _l4, _o4)();
      }
      return _(t, t.attributes, e.attrs), I(t, e), t;
    }
    return _(t, t.attributes, e.attrs), A(t, t.childNodes, e.children), I(t, e), t;
  },
  M = function M(t, e, n) {
    s._afterInitArr = [], e.slOnInit && e.slOnInit();
    var o = e.view.bind(e)();
    if (r(o, e), o.view && (o = o.view.bind(e)(), r(o, e)), !o.attrs || t && t.id !== o.attrs.id) {
      var _e18 = o.attrs ? o.attrs.id : "null";
      console.error("Mounted component root element changed from " + t.id + " to " + _e18);
    }
    if (t = C(t, o, e), e.slStyle && !t.slScopedCss) {
      var _n24 = R(e, e.slStyle());
      g(t, _n24), t.slScopedCss = !0;
    }
    n && s._updateMap.set(t.id, e), e.slOnDestroy && y(t, e.slOnDestroy.bind(e));
    var l = t.querySelectorAll("[slref]");
    void 0 !== t.slref && (l = Array.from(l)).push(t);
    for (var _t19 = 0; _t19 < l.length; ++_t19) {
      e[l[_t19].getAttribute("slref")] = l[_t19].slref;
    }
    return e.slAfterInit && (e.slAfterInit(), k()), s._afterInitArr.forEach(function (t) {
      t();
    }), t;
  };
function version() {
  return "19.0.2";
}
var E = function E(t, e) {
    return t.split(e).length - 1;
  },
  x = function x(t, e) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var s = "",
      r = !1,
      o = !1,
      l = !1;
    for (var _i10 = n; _i10 < t.length; ++_i10) if ('"' !== t[_i10] || o || r ? "'" !== t[_i10] || o || r ? '"' === t[_i10] && r && !l ? (o = !1, r = !1) : "'" === t[_i10] && o && !l ? (o = !1, r = !1) : l = ('"' !== t[_i10] || !r || !l) && ("'" !== t[_i10] || !o || !l) && "\\" === t[_i10] : o = !0 : r = !0, s += t[_i10], 1 === e.length) {
      if (t[_i10] === e && !r && !o) break;
    } else if (t.length > _i10 + e.length && t.substring(_i10, _i10 + e.length) === e && !r && !o) {
      s += t.substring(_i10, _i10 + e.length - 1);
      break;
    }
    return s;
  },
  R = function R(t, e) {
    var n = function (t) {
        for (var e = 0, n = 1779033703 ^ t.length; e < t.length; e++) n = (n = Math.imul(n ^ t.charCodeAt(e), 3432918353)) << 13 | n >>> 19;
        return function () {
          return n = Math.imul(n ^ n >>> 16, 2246822507), n = Math.imul(n ^ n >>> 13, 3266489909), (n ^= n >>> 16) >>> 0;
        };
      }(t.constructor.name),
      r = "slcss-" + String(n());
    if ("" === e || s._scopedCssSet.has(r)) return r;
    e = e.replace(/\t+/g, " "), s._scopedCssSet.add(r);
    var o = new RegExp("([^{]+)s*{s*([^}]+)s*}", "g"),
      l = e.match(o),
      i = /[^\s"]+|"([^"]*)"/gi;
    var a = "",
      u = null;
    do {
      null != (u = i.exec(e)) && (u[1] || (a += u[0]));
    } while (null != u);
    var c,
      d,
      f,
      p,
      h,
      g,
      y,
      _,
      A = "",
      b = 0,
      D = 0,
      O = 0,
      I = 0,
      v = !1,
      C = !1,
      M = 0,
      R = !1,
      T = 0;
    var w = new Map();
    if (a.includes("{") && a.includes("}") && a.split("{").length === a.split("}").length) for (var _t20 = 0; _t20 < l.length; ++_t20) {
      h = 0, c = 0, d = 0, f = null, p = !1, C = !1, R = !1;
      var _e19 = "";
      do {
        null != (u = i.exec(l[_t20])) && (u[1] || (_e19 += u[0]));
      } while (null != u);
      var _n25 = E(_e19, "{");
      for (g = l[_t20].substring(c); g.replace(/}/g, "").trim().startsWith("@") && (g.includes("@layer") || g.includes("@scope") || g.includes("@container") || g.includes("@keyframes") || g.replace(/}/g, "").trim().startsWith("@media"));) {
        if (b++, p = !0, l[_t20].substring(c).includes("@keyframes") ? v = !0 : l[_t20].substring(c).includes("@media") && (C = !0), 1 == _n25) c += x(l[_t20], ";", c).length, A += l[_t20].substring(d, c), d = c, b--;else {
          D++, b--, c += x(l[_t20], "{", c).length;
          var _e20 = x(l[_t20], ";", 0);
          if (v) {
            var _e21 = l[_t20].substring(d, c);
            (_e21 = (_e21 = _e21.replace("@keyframes", "")).trim()).endsWith("{") && (_e21 = (_e21 = _e21.substring(0, _e21.length - 2)).trim());
            var _n26 = " " + _e21 + r;
            w.set(_e21, _n26), A += " @keyframes " + _n26 + " { ";
          } else {
            var _s7 = l[_t20].substring(d, c);
            if (_e20.length < _s7.length) A += _e20, c -= _s7.length - _e20.length, _n25--;else {
              if (I > 0) {
                var _t21 = _s7.trim();
                for (; _t21.startsWith("}") && I > 0;) !(0 !== b || 1 !== I || _n25 <= I) && D - _n25 >= 1 || I--, _n25--, D--, _t21 = _t21.replace("}", "").trim();
              }
              var _t22 = "";
              u = null;
              do {
                null != (u = i.exec(_s7)) && (u[1] || (_t22 += u[0]));
              } while (null != u);
              if (A += _s7, 0 === I && E(_t22, "}") > 0) {
                var _e22 = _t22.length,
                  _s8 = _t22.replace(/^}+/, "");
                (D -= E(_s8, "}")) >= _e22 - _s8.length && (1 === D && 1 === _n25 || (T += _e22 - _s8.length));
              }
              var _e23 = E(_t22, "{") - E(_t22, "}"),
                _r10 = /(@layer|@container|@media|@scope)[^{]*\{/g,
                _o5 = _t22.replace(/\s/g, "").match(_r10);
              var _l5 = _o5 ? _o5.length : 0;
              (_e23 -= I > 0 ? 0 : _l5) < 0 && (_e23 = 0), I += _e23;
            }
          }
          d = c;
        }
        g = l[_t20].substring(c);
      }
      var _s9 = c + x(l[_t20], "{", c).length - 1;
      -1 === _s9 && (_s9 = c);
      var _o6 = l[_t20].substring(c, _s9);
      for (; (_o6.split('"').length - 1) % 2 != 0;) _s9 = _s9 + 1 + x(l[_t20], "{", _s9 + 1).length, _o6 = l[_t20].substring(c, _s9);
      if ("" !== _o6 && !/^\s*$/.test(_o6)) {
        var _e24 = _o6.split(",");
        var _a3 = void 0;
        O > 0 && _o6.startsWith(",") && (_e24.shift(), _e24[0] = ", " + _e24[0]);
        for (var _o7 = 0; _o7 < _e24.length; ++_o7) {
          for (_a3 = _e24[_o7].trim(); O > 0 && _a3.includes("}");) {
            var _t23 = void 0,
              _e25 = void 0,
              _n27 = "";
            for (; _a3.includes("}");) _t23 = _a3.indexOf("{"), ((_e25 = _a3.indexOf("}")) < _t23 || -1 === _t23) && (_n27 += _a3.substring(0, _e25 + 1), _a3 = _a3.substring(_e25 + 1), O--);
            A += _n27 + "\n", f = _a3 = _a3.trim();
          }
          if (0 === O) {
            for (; _a3.startsWith("}");) _a3 = _a3.substring(1).trim(), A += "}", D--, R = !1, I > 0 && I--, 0 === I && (v = !1);
            if (_a3.includes(" ")) {
              var _c = _a3.substring(0, _a3.indexOf(" ")),
                _d2 = _a3.substring(_a3.indexOf(" "));
              if (_o7 > 0 && (A += ", "), "@nest" === _c.trim() && _d2.replace(/^\s+/g, "").includes(" ")) {
                var _t24 = _d2.replace(/^\s+/g, ""),
                  _e26 = _t24.substring(0, _t24.indexOf(" "));
                _t24 = _t24.substring(_e26.length, _t24.length), _c += " " + _e26, _d2 = _t24;
              }
              if (R = _c.trim().startsWith("@"), y = _c.trim().endsWith(":")) {
                var _r11 = x(_d2, ";");
                for (; x(_d2, ";", _r11.length).trim().endsWith(";");) _r11 += x(_d2, ";", _r11.length);
                var _a4 = _d2.substring(_r11.length, _d2.length);
                _d2 = _r11;
                var _f = l[_t20].substring(_s9);
                _s9 = l[_t20].length;
                var _p = _a4 + " ";
                var _h = _e24.length > 1;
                for (var _t25 = _o7 + 1; _t25 < _e24.length; ++_t25) _p += ", " + _e24[_t25] + " ", _e24.splice(_t25, 1), _t25--;
                _p += _f, l.splice(_t20 + 1, 0, _p), _c.trim().endsWith(":") && I > 0 && _n25 > 0 && _h && (D++, T++);
                var _g = "";
                u = null;
                do {
                  null != (u = i.exec(l[_t20 + 1])) && (u[1] || (_g += u[0]));
                } while (null != u);
                var _y = E(_g, "{");
                (_y -= E(_g, "}")) < 0 && (_y = 0), D += _y, M += _y;
              }
              !(!I > 0) || v || C && 0 !== I || R && !_c.trim().startsWith("@nest") || y ? A += _c + _d2 : A += _c + (0 === I ? "[" + r + "]" : "") + _d2;
            } else _o7 > 0 && (A += ", "), !(!I > 0) || v || C && 0 !== I || _a3.trim().startsWith("@") || R || _a3.trim().endsWith(":") ? A += _a3 : A += _a3 + (0 === I ? "[" + r + "]" : "");
          }
        }
      }
      if (O > 0 && (_s9 = null !== f ? l[_t20].indexOf(f) : 0), l[_t20].includes("--") && _n25 > 1) {
        var _e27 = x(l[_t20], "--", 0).length;
        var _s10 = l[_t20].substring(0, _e27);
        var _r12 = "";
        do {
          null != (u = i.exec(_s10)) && (u[1] || (_r12 += u[0]));
        } while (null != u);
        var _o8 = E(_r12, "{") - 1;
        h = _n25 - 1, _o8 > 0 && (h -= _o8), h > 0 && (O += h);
      }
      if (_n25 - O > 1 && !p) {
        var _e28 = l[_t20].substring(_s9 + 1);
        l[_t20] = l[_t20].substring(0, l[_t20].length - _e28.length), l.splice(_t20 + 1, 0, _e28);
        var _n28 = "";
        u = null;
        do {
          null != (u = i.exec(_e28)) && (u[1] || (_n28 += u[0]));
        } while (null != u);
        _ = E(_n28, "{") - E(_n28, "}"), O -= h;
      }
      var _a5 = l[_t20].substring(_s9);
      var _S = _a5.replace("{", "").replace(";", "");
      if (_a5.includes("{") && E(_a5, "{") > 1 && !_S.trim().startsWith("--")) {
        var _e29 = x(_a5, "{", 0);
        _e29 = _e29 + " " + x(_a5, "{", _e29.length);
        var _n29 = _a5.substring(_e29.length + 1, _a5.length);
        _n29 = _e29.substring(_e29.lastIndexOf(";") + 1, _e29.length) + " " + _n29, _a5 = _e29 = _e29.substring(0, _e29.lastIndexOf(";") + 1), l.splice(_t20 + 1, 0, _n29), I++, M++;
      }
      A += _a5;
      var _N = "";
      u = null;
      do {
        null != (u = i.exec(_a5)) && (u[1] || (_N += u[0]));
      } while (null != u);
      for (D += (_ = E(_N, "{") - E(_N, "}")) - h >= 0 ? _ - h : _, (_ -= O) < 0 && (_ = 0), 0 === I && C || (M += _, (I += _) > 0 && (I -= 1 - D - E(_N, "{") + E(_N, "}") >= 0 ? 1 - D - E(_N, "{") + E(_N, "}") : 0)); b > 0;) A += "}", b--;
      0 === O && (A += "\n");
    }
    for (I -= M; I > 0;) A += "}", I--;
    for (D -= T; D > 0;) A += "}", D--;
    if (A += "\n", w.size > 0) {
      var _t26,
        _e30 = 0;
      A = (_t26 = S(A, _e30, w, "animation")).finalCss, _e30 = _t26.startIndex, A = (_t26 = S(A, _e30 = 0, w, "animation-name")).finalCss, _e30 = _t26.startIndex;
    }
    if ("" !== A.trim()) {
      var _t27 = document.head || document.getElementsByTagName("head")[0],
        _e31 = document.createElement("style");
      _t27.appendChild(_e31), _e31.appendChild(document.createTextNode(A));
    }
    return r;
  },
  S = function S(t, e, n, s) {
    for (; -1 !== (e = t.indexOf(s, e));) {
      var _r13 = t.substring(0, e);
      var _o9 = t.substring(e, t.indexOf(";", e));
      var _l6 = t.substring(e + _o9.length, t.length);
      if (_o9.includes(":")) {
        if (":" === _o9.substring(0, _o9.indexOf(":") + 1).replace(s, "").trim()) {
          var _iterator13 = _createForOfIteratorHelper(n),
            _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
              var _step13$value = _slicedToArray(_step13.value, 2),
                _t28 = _step13$value[0],
                _r14 = _step13$value[1];
              var _n30 = _o9.replace(s, "");
              (_n30 = _n30.trim()).startsWith(":") && (_n30 = (_n30 = _n30.substring(1, _n30.length)).trim()), new RegExp(_t28 + "(\\s|;|$)").test(_n30) && _t28.length > 0 ? e += (_o9 = _o9.replaceAll(_t28, _r14)).length : e += s.length;
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
          t = _r13 + _o9 + _l6;
        } else e += _o9.length;
      }
    }
    return {
      finalCss: t,
      startIndex: e
    };
  };
function hydrate(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  var s = document.getElementById(t).getAttribute("slssrclass");
  var r = e[s];
  return !r && this && (r = this[s]), mount(t, new r(), n);
}
function resolveAll(t) {
  return Promise.all(t.map(function (t) {
    return t.then(function (t) {
      return {
        result: t,
        status: "fulfilled",
        error: null
      };
    }, function (t) {
      return {
        result: null,
        error: t,
        status: "rejected"
      };
    });
  }));
}
function setState(t) {
  s._state = t;
}
function getState() {
  return s._state;
}
function textNode(t) {
  return String(t);
}
function markup(t) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref4$attrs = _ref4.attrs,
    e = _ref4$attrs === void 0 ? {} : _ref4$attrs,
    _ref4$children = _ref4.children,
    n = _ref4$children === void 0 ? [] : _ref4$children;
  return {
    tagName: t = t.toUpperCase(),
    attrs: e,
    children: n
  };
}
function m() {
  return markup(arguments[0], arguments[1]);
}
function mount(t, e) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  s._router.mountRoute = t;
  var r = document.getElementById(t);
  if (null !== r) return M(r, e, n);
  console.error("ID " + t + " does not exist in DOM.");
}
function renderToString(t) {
  var e = [],
    o = new Set();
  var _iterator14 = _createForOfIteratorHelper(s._structureForMap.keys()),
    _step14;
  try {
    for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
      var _t29 = _step14.value;
      o.add(_t29);
    }
  } catch (err) {
    _iterator14.e(err);
  } finally {
    _iterator14.f();
  }
  t.slOnInit && (t.slOnInit(), e.push(t));
  var l = t.view.bind(t)(),
    i = t;
  for (; l.view;) l.slOnInit && (l.slOnInit(), e.push(l)), i = l, l = l.view.bind(l)();
  r(l, i);
  var a = n(l, e);
  e.forEach(function (t) {
    t.slOnDestroy && t.slOnDestroy.bind(t)();
  });
  var _iterator15 = _createForOfIteratorHelper(s._structureForMap.keys()),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _t30 = _step15.value;
      o.has(_t30) || s._structureForMap["delete"](_t30);
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  return a;
}
function update(t, e) {
  var n = t;
  if (t = document.getElementById(t), s._afterInitArr = [], t) {
    var _n31 = e.view.bind(e)();
    r(_n31, e), t = C(t, _n31, e);
  } else console.error("ID " + n + " not mounted in DOM; attachDetector likely needs to be called.");
  var o = t.querySelectorAll("[slref]");
  void 0 !== t.slref && (o = Array.from(o)).push(t);
  for (var _t31 = 0; _t31 < o.length; ++_t31) {
    e[o[_t31].getAttribute("slref")] = o[_t31].slref;
  }
  if (s._afterInitArr.forEach(function (t) {
    t();
  }), e.slStyle && !t.slScopedCss) {
    var _n32 = R(e, e.slStyle());
    g(t, _n32), t.slScopedCss = !0;
  }
}
var T = e.onpopstate;
e.onpopstate = function (t) {
  switch (s._router.strategy) {
    case "#":
      e.location.hash && s._router.lastHash !== e.location.hash.substring(2) && (T && T(t), route(getRoute()));
      break;
    case "?":
      e.location.search && s._router.lastHash !== e.location.search.substring(2) && (T && T(t), route(getRoute()));
      break;
    case "":
      e.location.pathname && s._router.lastHash !== e.location.pathname.substring(1) && (T && T(t), route(getRoute()));
  }
}, s._router = {
  segmentArr: [],
  routeList: [],
  params: null,
  lastHash: !1,
  currentRoute: null,
  mountRoute: "",
  strategy: "#",
  count: 0
}, Object.seal(s._router);
var w = function w() {
  switch (s._router.strategy) {
    case "#":
      {
        var _t32 = e.location.href.split("#/")[1];
        if (_t32) {
          var _e32 = _t32.split("/");
          _e32.forEach(function (t, e) {
            s._router.segmentArr[e] = t;
          }), s._router.segmentArr.splice(_e32.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
    case "?":
      {
        var _t33 = e.location.href.split("?/")[1];
        if (_t33) {
          var _e33 = _t33.split("/");
          _e33.forEach(function (t, e) {
            s._router.segmentArr[e] = t;
          }), s._router.segmentArr.splice(_e33.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
    case "":
      {
        var _t34 = e.location.pathname;
        if (_t34) {
          var _e34 = (_t34 = _t34.replace("/", "")).split("/");
          _e34.forEach(function (t, e) {
            s._router.segmentArr[e] = t;
          }), s._router.segmentArr.splice(_e34.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
  }
};
function setRouteStrategy(t) {
  new Set(["#", "?", ""]).has(t) && (s._router.strategy = t);
}
function getRouteQueryVariables() {
  var t = e.location.search.substring(2).split("&"),
    n = [];
  for (var s = 0; s < t.length; s++) {
    var _e35 = t[s].split("=");
    n.push({
      "var": decodeURIComponent(_e35[0]),
      value: decodeURIComponent(_e35[1])
    });
  }
  return n;
}
function getRouteSegments() {
  return s._router.segmentArr;
}
function getRouteParams() {
  return s._router.params;
}
function getRoute() {
  switch (s._router.strategy) {
    case "#":
      return e.location.href.split("#/")[1];
    case "?":
      return e.location.href.split("?/")[1];
    case "":
      {
        var _t35 = e.location.pathname;
        return _t35 && (_t35 = _t35.replace("/", "")), _t35;
      }
  }
}
function addRoute(t, e) {
  s._router.routeList.push([new RegExp("^" + t.replace(/:[^\/]+/g, "([^\\/]+)") + "$"), e]);
}
function removeRoute(t) {
  var e = new RegExp("^" + t.replace(/:[^\/]+/g, "([^\\/]+)") + "$"),
    n = String(e);
  for (var _t36 = 0; _t36 < s._router.routeList.length; ++_t36) {
    var _s$_router$routeList$ = _slicedToArray(s._router.routeList[_t36], 2),
      _e36 = _s$_router$routeList$[0],
      _r15 = _s$_router$routeList$[1];
    if (String(_e36) === n) {
      s._router.routeList.splice(_t36, 1);
      break;
    }
  }
}
function route(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  if (s._router.params = n, s._router.currentRoute && s._router.currentRoute.onCanDeactivate && !s._router.currentRoute.onCanDeactivate(t)) return;
  var l = null;
  var _iterator16 = _createForOfIteratorHelper(s._router.routeList),
    _step16;
  try {
    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
      var _step16$value = _slicedToArray(_step16.value, 2),
        _n33 = _step16$value[0],
        _i11 = _step16$value[1];
      if (_n33.test(t)) {
        if (_i11.onActivationCheck && !_i11.onActivationCheck(t)) return _i11.onActivationFail && (l = route(_i11.onActivationFail.route, _i11.onActivationFail.params, "boolean" != typeof _i11.onActivationFail.attachDetector || _i11.onActivationFail.attachDetector)), void (t = void 0);
        _i11.onBeforeRoute && _i11.onBeforeRoute();
        var _n34 = s._destroyNodeMap.get(getRoute());
        _n34 && (_n34.forEach(function (t) {
          t.slOnDestroyFn && t.slOnDestroyFn(), t.slOnDestroyFn = null;
        }), s._destroyNodeMap.set(getRoute(), []), s._destroyFuncMap.set(getRoute(), [])), s._router.lastHash = t;
        var _a6 = e.pageYOffset;
        switch (s._router.strategy) {
          case "#":
            e.history.pushState(null, document.title, "#/" + t);
            break;
          case "?":
            {
              var _n35 = e.location.href;
              var _s11 = e.location.pathname;
              _n35 = _n35.substring(0, _n35.indexOf(_s11)), _n35 += "/?/" + t, e.history.pushState(null, document.title, _n35);
              break;
            }
          case "":
            {
              var _n36 = e.location.href;
              var _s12 = e.location.pathname;
              _n36 = _n36.substring(0, _n36.indexOf(_s12)), _n36 += "/" + t, e.history.pushState(null, document.title, _n36);
              break;
            }
        }
        e.scrollTo(0, _a6);
        var _u = document.getElementById(_i11.root);
        if (s._router.currentRoute && void 0 !== s._router.currentRoute.animateDestroy && (s._router.currentRoute.animateDestroy = !0), s._router.currentRoute && s._router.currentRoute.animateDestroy) {
          var _t37 = s._router.currentRoute.root;
          _t37 = document.getElementById(_t37), s._router.currentRoute = _i11, p(_t37), h(_t37), o(_t37), b(_t37), w();
        } else w(), s._router.currentRoute = _i11;
        s._router.count++, _i11.component && (_i11.component.slOnDestroy && s._destroyFuncMap.set(t, [_i11.component.slOnDestroy.bind(_i11.component)]), s._router.mountRoute = t, M(_u, _i11.component, r), l = _i11.component);
        break;
      }
    }
  } catch (err) {
    _iterator16.e(err);
  } finally {
    _iterator16.f();
  }
  return s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && k(), l;
}
w();
var N = function N(t, e, n) {
  return {
    parent: t,
    factory: e,
    map: Object.create(null)
  };
};
function F(t, e) {
  "function" == typeof e && (e = e());
  var n = [];
  for (var _s13 = 0; _s13 < e.length; ++_s13) n.push(t.factory.bind(this, e[_s13])());
  return n;
}
function H(t, e, n) {
  "function" == typeof e && (e = e());
  var s = Object.create(null),
    r = t.parent;
  var i,
    a,
    u = r.firstChild;
  if (e.length) {
    for (var _o10 = 0; _o10 < e.length; ++_o10) (i = t.map[_o10]) ? n.bind(i, this, e[_o10])() : void 0 !== (i = t.factory.bind(this, e[_o10])()).attrs && (i = l(i)), s[_o10] = i, u || r.appendChild(i), u = i.nextSibling;
    for (; null !== u;) a = u.nextSibling, p(u), h(u), o(u), b(u), u = a;
  } else r.textContent = "";
  t.map = s;
  var c = t.parent.querySelectorAll("[slpreventdefault]");
  c.length > 0 && (v([t.parent]), v(Array.from(c)));
}
s.CHANGE_STRATEGY_AUTOMATIC = 100, s.CHANGE_STRATEGY_MANUAL = 200, s.CHANGE_DETECTOR_DETACHED = !1, s.CHANGE_DETECTOR_ATTACHED = !0, s._changeStrategies = [s.CHANGE_STRATEGY_AUTOMATIC, s.CHANGE_STRATEGY_MANUAL], s._changeDetector = {
  lastUpdateDate: new Date(),
  changeDetectionStrategy: s.CHANGE_STRATEGY_AUTOMATIC
}, Object.seal(s._changeDetector), Object.freeze(s._changeStrategies);
var W = function W(t, e) {
  if (e[t]) {
    var _n37 = e[t];
    e[t] = function () {
      var t = _n37.apply(this, [].slice.call(arguments));
      return k(), t;
    };
  }
};
var L = function L() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    t ? update(t, s._updateMap.get(t)) : s._updateMap.forEach(function (t, e) {
      update(e, t);
    });
  },
  k = function k() {
    if (s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC) return;
    new Date() - s._changeDetector.lastUpdateDate > 6 ? L() : s._debouncedPerformUpdates(), s._changeDetector.lastUpdateDate = new Date();
  };
function setDetectionStrategy(t) {
  s._changeStrategies.forEach(function (e) {
    e === t && (s._changeDetector.changeDetectionStrategy = t);
  });
}
function detectChanges() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  L(t);
}
function isDetectorAttached(t) {
  return s._updateMap.has(t);
}
function detachDetector(t) {
  s._updateMap["delete"](t);
}
var j = Promise.prototype.then;
function enableDetectOnThen() {
  Promise.prototype.then = function (t, e) {
    return j.call(this, function (e) {
      return k(), "function" == typeof t && t instanceof Function ? t(e) : t;
    }, e);
  };
}
function wrapWithChangeDetector(t, e) {
  return function () {
    e && e.slpreventdefault && arguments.length > 0 && "function" == typeof arguments[0].preventDefault && arguments[0].preventDefault();
    var n = t.apply(this, [].slice.call(arguments));
    return k(), n;
  };
}
s._debouncedPerformUpdates = function (t, e) {
  var n;
  return function () {
    for (var _len = arguments.length, r = new Array(_len), _key = 0; _key < _len; _key++) {
      r[_key] = arguments[_key];
    }
    var o = this;
    clearTimeout(n), n = s.DETACHED_SET_TIMEOUT(function () {
      return t.apply(o, r);
    }, e);
  };
}(L, 17);
var G = e.XMLHttpRequest.prototype.send,
  U = new Map();
function P() {
  if (this._onreadystatechange) {
    var _t38 = U.get(this);
    if (void 0 !== _t38 && _t38 === this._onreadystatechangecount) return void U["delete"](this);
    void 0 !== _t38 ? U.set(this, _t38 + 1) : U.set(this, 0);
    var _e37 = this._onreadystatechange.apply(this, arguments);
    return k(), U["delete"](this), _e37;
  }
}
e.XMLHttpRequest.prototype.send = function (t) {
  return this.onreadystatechange ? (this._onreadystatechange = this.onreadystatechange, void 0 === this._onreadystatechangecount ? this._onreadystatechangecount = 0 : this._onreadystatechangecount += 4) : this._onreadystatechangecount = 0, this.onreadystatechange = P, G.apply(this, arguments);
};
var Y = e.fetch;
e.fetch = function () {
  var t = Y.apply(this, arguments);
  return k(), t;
};
var B = e.setTimeout;
e.setTimeout = function () {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
  var e;
  if (arguments.length > 2) {
    var _n38 = [].slice.call(arguments, 1);
    e = B.apply(this, _n38), t && k();
  } else {
    var _t39 = [].slice.call(arguments);
    e = B.apply(this, _t39), k();
  }
  return e;
};
var q = e.setInterval;
e.setInterval = function () {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !0;
  var e;
  if (arguments.length > 2) {
    var _n39 = [].slice.call(arguments, 1);
    e = q.apply(this, _n39), t && k();
  } else {
    var _t40 = [].slice.call(arguments),
      _n40 = _t40[0];
    _t40[0] = function () {
      _n40(), k();
    }, e = q.apply(this, _t40), k();
  }
  return e;
};
var K = e.setTimeout,
  X = e.setInterval;
Object.defineProperty(s, "DETACHED_SET_TIMEOUT", {
  value: K.bind(e, !1)
}), Object.defineProperty(s, "DETACHED_SET_INTERVAL", {
  value: X.bind(e, !1)
});
