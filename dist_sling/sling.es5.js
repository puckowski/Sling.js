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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e39) { throw _e39; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e40) { didErr = true; err = _e40; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
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
      if (i = _typeof(_n2), a += "function" === i ? " " + _t + '=""' : " " + _t + '="' + _n2 + '"', "slfor" === _t) {
        var _t2 = _n2.split(":");
        if (_t2.length >= 4) {
          s._structureForMap.has(_t2[0]) || s._structureForMap.set(_t2[0], w(null, o[_t2[2]]));
          var _e2 = s._structureForMap.get(_t2[0]);
          u = T.bind(o, _e2, o[_t2[1]], o[_t2[3]])();
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
            _l = o[_s2], _l.slfor === _t3[2] ? _e3 = _l : _l.slfor === _t3[1] ? _r2 = _l : _l.slfor === _t3[3] && (_n3 = _l);
          }
          var _iterator = _createForOfIteratorHelper(I(o)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _s3 = _step.value;
              _l = o[_s3], _l.slfor === _t3[2] ? _e3 = _l : _l.slfor === _t3[1] ? _r2 = _l : _l.slfor === _t3[3] && (_n3 = _l);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _r2 = _r2.bind(o), s._structureForMap.has(_t3[0]) || s._structureForMap.set(_t3[0], w(null, _e3));
          var _i3 = s._structureForMap.get(_t3[0]);
          u = T.bind(o, _i3, _r2, _n3)();
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
    for (n.push(t); n.length > 0;) if (s = n.shift(), s.attrs && (s.attrs.slfor || s.attrs.slfornamed) && (s.model = e), s.children) for (var _t5 = s.children.length - 1; _t5 >= 0; --_t5) n.push(s.children[_t5]);
  },
  o = function o(t) {
    var e = [];
    var n, r;
    for (e.push(t); e.length > 0;) if (n = e.shift(), 3 !== n.nodeType && (n.hasAttribute("slfor") ? (r = n.getAttribute("slfor"), r = r.split(":"), r.length > 0 && s._structureForMap["delete"](r[0])) : n.hasAttribute("slfornamed") && (r = n.getAttribute("slfornamed"), r = r.split(":"), r.length > 0 && s._structureForMap["delete"](r[0])), n.children)) for (var _t6 = n.children.length - 1; _t6 >= 0; --_t6) e.push(n.children[_t6]);
  };
function renderElementWithoutClass(t, e, n) {
  var r, o, l;
  r = e && e.slns ? document.createElementNS(e.slns, t.toLowerCase()) : document.createElement(t);
  for (var _i4 = 0, _Object$keys2 = Object.keys(e); _i4 < _Object$keys2.length; _i4++) {
    var _t7 = _Object$keys2[_i4];
    if (l = e[_t7], o = _typeof(l), "function" === o) r[_t7] = l, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || l.name.startsWith("bound slDetached") || l.name.startsWith("slDetached") || L(_t7, r);else if ("slnsfor" === _t7) {
      var _t8 = JSON.parse(e.slnsfor);
      for (var _i5 = 0, _Object$entries2 = Object.entries(_t8); _i5 < _Object$entries2.length; _i5++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i5], 2),
          _e4 = _Object$entries2$_i[0],
          _n4 = _Object$entries2$_i[1];
        r.setAttributeNS(_n4.namespace, _e4, _n4.value);
      }
    } else r.setAttribute(_t7, l);
  }
  var _iterator3 = _createForOfIteratorHelper(n),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _t9 = _step3.value;
      r.append(_t9);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return r;
}
function renderElement(_ref2) {
  var t = _ref2.tagName,
    e = _ref2.attrs,
    n = _ref2.children;
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var o, l;
  o = e && e.slns ? document.createElementNS(e.slns, t.toLowerCase()) : document.createElement(t);
  for (var _i6 = 0, _Object$entries3 = Object.entries(e); _i6 < _Object$entries3.length; _i6++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i6], 2),
      _t10 = _Object$entries3$_i[0],
      _n5 = _Object$entries3$_i[1];
    if (l = _typeof(_n5), "function" === l) o[_t10] = _n5, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || _n5.name.startsWith("bound slDetached") || _n5.name.startsWith("slDetached") || L(_t10, o);else if ("slnsfor" === _t10) {
      var _t11 = JSON.parse(e.slnsfor);
      for (var _i7 = 0, _Object$entries4 = Object.entries(_t11); _i7 < _Object$entries4.length; _i7++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i7], 2),
          _e5 = _Object$entries4$_i[0],
          _n6 = _Object$entries4$_i[1];
        o.setAttributeNS(_n6.namespace, _e5, _n6.value);
      }
    } else o.setAttribute(_t10, _n5);
  }
  var _iterator4 = _createForOfIteratorHelper(n),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _t12 = _step4.value;
      "string" == typeof _t12 ? o.append(_t12) : _t12.view ? r ? a(_t12, o) : u(_t12, o) : o.appendChild(renderElement(_t12, r));
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return o;
}
var l = function l(_ref3) {
    var t = _ref3.tagName,
      e = _ref3.attrs,
      n = _ref3.children;
    var r, o;
    r = e && e.slns ? document.createElementNS(e.slns, t.toLowerCase()) : document.createElement(t);
    for (var _i8 = 0, _Object$entries5 = Object.entries(e); _i8 < _Object$entries5.length; _i8++) {
      var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i8], 2),
        _t13 = _Object$entries5$_i[0],
        _n7 = _Object$entries5$_i[1];
      if (o = _typeof(_n7), "function" === o) r[_t13] = _n7, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || _n7.name.startsWith("bound slDetached") || _n7.name.startsWith("slDetached") || L(_t13, r);else if ("slnsfor" === _t13) {
        var _t14 = JSON.parse(e.slnsfor);
        for (var _i9 = 0, _Object$entries6 = Object.entries(_t14); _i9 < _Object$entries6.length; _i9++) {
          var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i9], 2),
            _e6 = _Object$entries6$_i[0],
            _n8 = _Object$entries6$_i[1];
          r.setAttributeNS(_n8.namespace, _e6, _n8.value);
        }
      } else r.setAttribute(_t13, _n7);
    }
    var _iterator5 = _createForOfIteratorHelper(n),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _t15 = _step5.value;
        "string" == typeof _t15 ? r.append(_t15) : _t15.view ? u(_t15, r) : r.appendChild(l(_t15));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return r;
  },
  i = function i(t, e) {
    t.slKeyList = [], t.slNamespace = {};
    for (var _n9 in e) t.slNamespace[_n9] = e[_n9], t.slKeyList.push(_n9);
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
      var _t16 = N(o.model, o.model.slStyle());
      g(a, _t16), a.slScopedCss = !0;
    }
    o.onInit && (a.slOnInit = !0), c(a, o.destroyIndex, o.onDestroy, o.slUnboundOnDestroy), f(a), e.appendChild(a), i(a, r), n && S(a, t, o.model);
  },
  c = function c(t, e, n, s) {
    t.slOnDestroy = !0, t.slOnDestroyIndex = e, t.slOnDestroyFn = n, t.slAfterInit = !0, t.slOnInit = !0, t.slUnboundOnDestroy = s;
  },
  d = function d(t, e, n) {
    var o = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    var l = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    if (n && t.slOnInit && (t.slOnInit(), l && (l.slOnInit = !0)), l && l.slKeyList) {
      var _iterator6 = _createForOfIteratorHelper(l.slKeyList),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _e7 = _step6.value;
          void 0 === t[_e7] ? t[_e7] = l.slNamespace[_e7] : l.slNamespace[_e7] = t[_e7];
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    var i = null;
    if (e && t.slOnDestroy) {
      var _e8 = s._destroyFuncMap.get(s._router.mountRoute);
      _e8 || (_e8 = []), _e8.push(t.slOnDestroy.bind(t)), s._destroyFuncMap.set(s._router.mountRoute, _e8), i = _e8.length - 1;
    }
    var a = t.view.bind(t)();
    return r(a, t), {
      view: a,
      afterInit: t.slAfterInit ? t.slAfterInit.bind(t) : null,
      onDestroy: e && !o || !t.slOnDestroy ? null : t.slOnDestroy.bind(t),
      onInit: !n && t.slOnInit ? t.slOnInit : null,
      destroyIndex: i,
      model: t,
      scopedCss: t.slStyle ? t.slStyle.bind(t) : null,
      slUnboundOnDestroy: t.slOnDestroy,
      slUnboundAfterInit: t.slAfterInit,
      slUnboundOnInit: t.slOnInit
    };
  },
  f = function f(t) {
    if (t && null !== t.slOnDestroyIndex && void 0 !== t.slOnDestroyIndex && !t.slOnDestroyRoute) {
      var _e9 = s._destroyNodeMap.get(s._router.mountRoute);
      _e9 || (_e9 = []);
      _e9.find(function (e) {
        return e.slOnDestroyIndex === t.slOnDestroyIndex;
      }) || _e9.push(t), s._destroyNodeMap.set(s._router.mountRoute, _e9), t.slOnDestroyRoute = s._router.mountRoute;
    }
  },
  p = function p(t) {
    if (t && t.slOnDestroy) {
      var _e10 = s._destroyFuncMap.get(s._router.mountRoute);
      _e10 || (_e10 = []), _e10.splice(t.slOnDestroyIndex, 1), s._destroyFuncMap.set(s._router.mountRoute, _e10);
      var _n10 = s._destroyNodeMap.get(s._router.mountRoute);
      _n10 || (_n10 = []), _n10.forEach(function (e) {
        e.slOnDestroyIndex > t.slOnDestroyIndex && e.slOnDestroyIndex--;
      }), _n10 = _n10.filter(function (e) {
        return e.slOnDestroyIndex !== t.slOnDestroyIndex;
      }), s._destroyNodeMap.set(s._router.mountRoute, _n10);
    }
  },
  h = function h(t) {
    if (t && t.children && t.children.length > 0) {
      var _iterator7 = _createForOfIteratorHelper(t.children),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _e11 = _step7.value;
          h(_e11);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      t.slOnDestroyFn && (t.slOnDestroyFn(), t.slOnDestroyFn = void 0, t.slUnboundOnDestroy = void 0, t.slAfterInit = !1, t.slOnInit = !1);
    } else t.slOnDestroyFn && (t.slOnDestroyFn(), t.slOnDestroyFn = void 0, t.slUnboundOnDestroy = void 0, t.slAfterInit = !1, t.slOnInit = !1);
  },
  g = function g(t, e) {
    if (t.setAttribute(e, ""), t.children && t.children.length > 0) {
      var _iterator8 = _createForOfIteratorHelper(t.children),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _n11 = _step8.value;
          g(_n11, e);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  },
  y = function y(t, e, n) {
    t.slOnDestroy = !0;
    var r = s._destroyFuncMap.get(s._router.mountRoute);
    r || (r = []), r.push(e), s._destroyFuncMap.set(s._router.mountRoute, r), t.slOnDestroyIndex = r.length - 1, t.slOnDestroyFn = e, t.slUnboundOnDestroy = n, f(t);
  },
  _ = function _(t, e, n) {
    var r;
    var o = [];
    var _iterator9 = _createForOfIteratorHelper(e),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _t17 = _step9.value;
        var _e13 = n[_t17.name];
        _e13 ? _e13.length === _t17.nodeValue.length && _e13 === _t17.nodeValue && delete n[_t17.name] : _t17.name.startsWith("slcss-") || o.push(_t17.nodeName);
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
      var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i10], 2),
        e = _Object$entries7$_i[0],
        o = _Object$entries7$_i[1];
      if (r = _typeof(o), "function" === r) {
        if (void 0 !== l) {
          var _n12 = e;
          _n12.startsWith("on") && (_n12 = _n12.substring(2, _n12.length));
          var _s4 = t[e];
          if (_s4) {
            (Array.isArray(_s4) ? _s4 : [_s4]).forEach(function (e) {
              t.removeEventListener(_n12, e);
            });
          }
          t.addEventListener(_n12, function (t) {
            t.preventDefault();
          }), i = !0;
        }
        t[e] = o, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || o.name.startsWith("bound slDetached") || o.name.startsWith("slDetached") || L(e, t);
      } else if ("slnsfor" === e) {
        var _e12 = JSON.parse(n.slnsfor);
        for (var _i11 = 0, _Object$entries8 = Object.entries(_e12); _i11 < _Object$entries8.length; _i11++) {
          var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i11], 2),
            _n13 = _Object$entries8$_i[0],
            _s5 = _Object$entries8$_i[1];
          t.setAttributeNS(_s5.namespace, _n13, _s5.value);
        }
      } else t.setAttribute(e, o);
    };
    for (var _i10 = 0, _Object$entries7 = Object.entries(n); _i10 < _Object$entries7.length; _i10++) {
      _loop();
    }
    i || (void 0 !== l || e.slpreventdefault) && v([t]);
  },
  A = function A(t, e, n) {
    var r = e.length,
      a = new Set();
    var c = 0;
    for (var _t18 = e.length - 1; _t18 >= 0; --_t18) {
      var _r3 = null,
        _o = null;
      if (n[_t18] && (e[_t18].slUnboundOnDestroy !== n[_t18].slOnDestroy && (void 0 !== e[_t18].slUnboundOnDestroy && void 0 !== e[_t18].slOnDestroyFn && e[_t18].slOnDestroyFn(), p(e[_t18]), e[_t18].slOnDestroyFn = void 0, e[_t18].slOnDestroy = !1, e[_t18].slOnInit = !1, e[_t18].slAfterInit = !1, a.add(_t18)), n[_t18].view)) {
        var _l2 = d(n[_t18], !1, !1, !1, e[_t18]);
        n[_t18] = _l2.view;
        var _a = Object.getPrototypeOf(_l2.model);
        !0 !== _a.slDirty && (_l2.onInit && e[_t18].slOnInit && (e[_t18].slOnInit = !1), _l2.afterInit && e[_t18].slAfterInit && (e[_t18].slAfterInit = !1), _l2.scopedCss && e[_t18].slScopedCss && (e[_t18].slScopedCss = !1), _l2.onDestroy && e[_t18].slOnDestroy && (e[_t18].slOnDestroy = !1), _a.slDirty = !0), _l2.onInit && !e[_t18].slOnInit && e[_t18].slUnboundOnInit !== _l2.slUnboundOnInit ? (e[_t18].slUnboundOnInit = _l2.slUnboundOnInit, _l2.onInit.bind(_l2.model)(), n[_t18].slOnInit = !0) : void 0 === e[_t18].slUnboundOnInit || _l2.onInit ? _l2.onInit && e[_t18] && !e[_t18].slOnInit ? (e[_t18].slUnboundOnInit === _l2.slUnboundOnInit && _l2.onInit.bind(_l2.model)(), e[_t18].slUnboundOnInit = _l2.slUnboundOnInit, n[_t18].slOnInit = !0) : _l2.onInit && e[_t18].slOnInit && void 0 === e[_t18].slUnboundOnInit && (e[_t18].slUnboundOnInit = _l2.slUnboundOnInit) : e[_t18].slOnInit = !1, _l2.afterInit && !e[_t18].slAfterInit && e[_t18].slUnboundAfterInit !== _l2.slUnboundAfterInit ? (e[_t18].slAfterInit = !0, e[_t18].slUnboundAfterInit = _l2.slUnboundAfterInit, s._afterInitArr.push(_l2.afterInit)) : void 0 === e[_t18].slUnboundAfterInit || _l2.afterInit ? _l2.afterInit && e[_t18] && !e[_t18].slAfterInit ? (e[_t18].slAfterInit = !0, e[_t18].slUnboundAfterInit === _l2.slUnboundAfterInit && s._afterInitArr.push(_l2.afterInit), e[_t18].slUnboundAfterInit = _l2.slUnboundAfterInit) : _l2.afterInit && e[_t18].slAfterInit && void 0 === e[_t18].slUnboundAfterInit && (e[_t18].slUnboundAfterInit = _l2.slUnboundAfterInit) : e[_t18].slAfterInit = !1, _l2.scopedCss && e[_t18] && !e[_t18].slScopedCss && (_o = N(_l2.model, _l2.model.slStyle())), _l2.onDestroy && e[_t18] && !e[_t18].slOnDestroy && y(e[_t18], _l2.onDestroy, _l2.slUnboundOnDestroy), i(e[_t18], _l2.model), _r3 = _l2.model;
      }
      S(e[_t18], n[_t18], _r3), n[_t18] && n[_t18].slOnInit && (e[_t18].slOnInit = !0);
      var _iterator10 = _createForOfIteratorHelper(a),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var _t19 = _step10.value;
          n[_t19] && e[_t19].slAfterInit && !e[_t19].slOnDestroy && (e[_t19].slAfterInit = !1), n[_t19] && e[_t19].slOnInit && !e[_t19].slOnDestroy && (e[_t19].slOnInit = !1);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      _o && (g(e[_t18], _o), e[_t18].slScopedCss = !0), c++;
    }
    var f = e.length;
    for (; f > r;) p(e[f - 1]), h(e[f - 1]), o(e[e.length - 1]), b(e[f - 1]), f--;
    var _iterator11 = _createForOfIteratorHelper(n.slice(r)),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _e14 = _step11.value;
        if ("string" == typeof _e14) t.childNodes[c] ? t.childNodes[c].textContent !== _e14 && (t.childNodes[c].textContent = _e14) : t.append(_e14);else if ("string" == typeof _e14) t.append(_e14);else if (_e14.view) u(_e14, t, !0);else {
          var _n14 = l(_e14);
          t.appendChild(_n14), S(_n14, _e14);
        }
        c++;
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
    for (f = e.length; f > n.length;) p(e[f - 1]), h(e[f - 1]), o(e[f - 1]), b(e[f - 1]), f--;
  },
  b = function b(t) {
    var e = s._router.count;
    if (void 0 === t.slanimatedestroytarget || "" === t.slanimatedestroytarget || t.slAnimateDestroy || void 0 === t.attributes.slanimatedestroy || "" === t.getAttribute("slanimatedestroy")) {
      if (3 === t.nodeType || void 0 === t.attributes.slanimatedestroy || "" === t.getAttribute("slanimatedestroy") || t.slAnimateDestroy) t.slAnimateDestroy || (s._router.currentRoute && t.id !== s._router.currentRoute.root || e === s._router.count) && (t.remove(), s._updateMap["delete"](t.id));else {
        var _n15 = t.onanimationend,
          _r4 = t.onanimationstart,
          _o2 = t.getAttribute("slanimatedestroy");
        t.onanimationstart = function (e) {
          t.slAnimationName = e.animationName;
        }, t.onanimationend = function (o) {
          if (!t.slAnimationName || t.slAnimationName !== o.animationName) return;
          var l = void 0;
          return _n15 && (l = _n15.apply(this, [].slice.call(arguments))), (s._router.currentRoute && t.id !== s._router.currentRoute.root || e === s._router.count) && (t.remove(), s._updateMap["delete"](t.id)), t.slAnimationName = null, t.onanimationend = _n15, t.onanimationstart = _r4, t.slAnimateDestroy = !1, l;
        }, t.classList.add(_o2), t.slAnimateDestroy = !0;
      }
    } else {
      var _n16 = t.slanimatedestroytarget;
      if ("function" == typeof _n16) {
        var _r5 = _n16(t);
        if (_r5) {
          var _n17 = _r5.getAttribute("slanimatedestroy"),
            _o3 = _r5.onanimationend,
            _l3 = _r5.onanimationstart;
          _r5.onanimationstart = function (t) {
            _r5.slAnimationName = t.animationName;
          }, _r5.onanimationend = function (i) {
            if (!_r5.slAnimationName || _r5.slAnimationName !== i.animationName) return;
            var a = void 0;
            return _o3 && (a = _o3.apply(this, [].slice.call(arguments))), _r5.classList.remove(_n17), s._isAnimatingKeyed = null, s._router.currentRoute.animateDestroy ? (s._router.currentRoute.animateDestroy = !1, t.setAttribute("style", "opacity: 0;"), _r5.onanimationend = null, _r5.onanimationstart = null) : ((s._router.currentRoute && t.id !== s._router.currentRoute.root || e === s._router.count) && (t.remove(), s._updateMap["delete"](t.id)), _r5.onanimationend = _o3, _r5.onanimationstart = _l3), _r5.slAnimationName = null, _r5.onanimationend = null, _r5.onanimationstart = null, _r5.style.animation = "none", t.slAnimateDestroy = !1, delete t.slanimatedestroytarget, detectChanges(), a;
          }, s._isAnimatingKeyed = _r5, _r5.classList.add(_n17), t.slAnimateDestroy = !0;
        } else (s._router.currentRoute && t.id !== s._router.currentRoute.root || e === s._router.count) && (t.remove(), s._updateMap["delete"](t.id));
      } else (s._router.currentRoute && t.id !== s._router.currentRoute.root || e === s._router.count) && (t.remove(), s._updateMap["delete"](t.id));
    }
  },
  O = function O(t) {
    return t && t !== Object.prototype && Object.getOwnPropertyNames(t).filter(function (e) {
      return function (t, e) {
        return (Object.getOwnPropertyDescriptor(t, e) || {}).get;
      }(t, e) || function (t, e) {
        return "function" == typeof t[e];
      }(t, e);
    }).concat(O(Object.getPrototypeOf(t)) || []);
  },
  I = function I(t) {
    return function (t) {
      return Array.from(new Set(O(t)));
    }(t).filter(function (t) {
      return "constructor" !== t && !~t.indexOf("__");
    });
  },
  D = function D(t, e) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    if (e.slStyle && !t.slScopedCss) {
      var _s6 = N(e, e.slStyle());
      g(t, _s6), t.slScopedCss = !0, t.style.display = n;
    }
  },
  v = function v(t) {
    var _loop2 = function _loop2() {
      var n = t[_e15];
      if (null !== n.getAttribute("slpreventdefault")) for (var _t20 in n) if (_t20.startsWith("on")) {
        var _e16 = _t20.substring(2, _t20.length);
        var _s7 = n[_t20];
        if (_s7) {
          (Array.isArray(_s7) ? _s7 : [_s7]).forEach(function (t) {
            n.removeEventListener(_e16, t);
          });
        }
        n.addEventListener(_e16, function (t) {
          t.preventDefault();
        });
      }
    };
    for (var _e15 = 0; _e15 < t.length; _e15++) {
      _loop2();
    }
  },
  S = function S(t, e) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (null !== s._isAnimatingKeyed) {
      var _iterator12 = _createForOfIteratorHelper(s._updateMap),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _step12$value = _slicedToArray(_step12.value, 2),
            _e17 = _step12$value[0],
            _n18 = _step12$value[1];
          {
            var _n19 = document.getElementById(_e17);
            if (_n19.contains(s._isAnimatingKeyed) && _n19.contains(t)) return t;
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    }
    var r;
    if (e && e.slStyle && (r = t.style.display, t.style.display = "none"), e && e.view) {
      t.slUnboundOnDestroy !== e.slOnDestroy && (void 0 !== t.slUnboundOnDestroy && void 0 !== t.slOnDestroyFn && t.slOnDestroyFn(), p(t), t.slOnDestroyFn = void 0, t.slOnDestroy = !1, t.slAfterInit = !1, t.slOnInit = !1);
      var _n20 = d(e, !1, !1, !1, t);
      e = _n20.view;
      var _r6 = Object.getPrototypeOf(_n20.model);
      if (!0 !== _r6.slDirty && (_n20.onInit && t.slOnInit && (t.slOnInit = !1), _n20.afterInit && t.slAfterInit && (t.slAfterInit = !1), _n20.scopedCss && t.slScopedCss && (t.slScopedCss = !1), _n20.onDestroy && t.slOnDestroy && (t.slOnDestroy = !1), _r6.slDirty = !0), _n20.onInit && t && !t.slOnInit && (_n20.onInit.bind(_n20.model)(), t.slOnInit = !0), _n20.afterInit && t && !t.slAfterInit && (t.slAfterInit = !0, s._afterInitArr.push(_n20.afterInit)), _n20.scopedCss && t && !t.slScopedCss) {
        var _e18 = N(_n20.model, _n20.model.slStyle());
        g(t, _e18), t.slScopedCss = !0;
      }
      _n20.onDestroy && t && !t.slOnDestroy && y(t, _n20.onDestroy, _n20.slUnboundOnDestroy);
    }
    if (!e) return t && (p(t), h(t), o(t), b(t)), t;
    if (t && (t.tagName || "").toLowerCase() !== ((e ? e.tagName : void 0) || "").toLowerCase()) {
      if (!e.tagName) return p(t), h(t), t.replaceWith(e), t = e;
      {
        var _n21;
        _n21 = e.attrs && e.attrs.slns ? document.createElementNS(e.attrs.slns, e.tagName.toLowerCase()) : document.createElement(e.tagName), D(_n21, e, r), t.parentNode.insertBefore(_n21, t), p(t), h(t), o(t), b(t), _n21.slUnboundAfterInit = t.slUnboundAfterInit, void 0 !== _n21.slUnboundAfterInit && (_n21.slAfterInit = !0), t.slOnInit && (_n21.slOnInit = !1), t = _n21;
      }
    }
    if ("string" == typeof e) return t.textContent !== e && (t.textContent = e), t;
    switch (e.attrs.sldirective) {
      case "useexisting":
        return D(t, e, r), t;
      case "onlychildren":
        return A(t, t.childNodes, e.children), t;
      case "onlyself":
        return _(t, t.attributes, e.attrs), D(t, e, r), t;
      case "trustchildren":
        {
          _(t, t.attributes, e.attrs), D(t, e, r);
          var _n22 = "";
          e.children.forEach(function (t) {
            _n22 += t;
          }), t.innerHTML !== _n22 && (t.innerHTML = _n22);
          var _s8 = t.querySelectorAll("[slpreventdefault]");
          return _s8.length > 0 && v(Array.from(_s8)), t;
        }
    }
    if (e.attrs.slfor) {
      var _n23 = e.attrs.slfor.split(":");
      if (_n23.length >= 4) {
        if (!s._structureForMap.has(_n23[0])) {
          var _r7 = w(t, e.model[_n23[2]]);
          if (s._structureForMap.set(_n23[0], _r7), t.children.length > 0) {
            var _e19 = Object.create(null);
            for (var _n24 = 0; _n24 < t.children.length; ++_n24) _e19[_n24] = t.children[_n24];
            _r7.map = _e19;
          }
        }
        var _r8 = s._structureForMap.get(_n23[0]);
        F.bind(e.model, _r8, e.model[_n23[1]], e.model[_n23[3]])();
      }
      return _(t, t.attributes, e.attrs), D(t, e, r), t;
    }
    if (e.attrs.slfornamed) {
      var _n25 = e.attrs.slfornamed.split(":");
      if (_n25.length >= 4) {
        var _r9, _o4, _l4, _i12;
        for (var _i13 = 0, _Object$keys3 = Object.keys(e.model); _i13 < _Object$keys3.length; _i13++) {
          var _t21 = _Object$keys3[_i13];
          _i12 = e.model[_t21], _i12.slfor === _n25[2] ? _r9 = _i12 : _i12.slfor === _n25[1] ? _l4 = _i12 : _i12.slfor === _n25[3] && (_o4 = _i12);
        }
        var _iterator13 = _createForOfIteratorHelper(I(e.model)),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var _t22 = _step13.value;
            _i12 = e.model[_t22], _i12.slfor === _n25[2] ? _r9 = _i12 : _i12.slfor === _n25[1] ? _l4 = _i12 : _i12.slfor === _n25[3] && (_o4 = _i12);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
        if (_l4 = _l4.bind(e.model), !s._structureForMap.has(_n25[0])) {
          var _e20 = w(t, _r9);
          if (s._structureForMap.set(_n25[0], _e20), t.children.length > 0) {
            var _n26 = Object.create(null);
            for (var _e21 = 0; _e21 < t.children.length; ++_e21) _n26[_e21] = t.children[_e21];
            _e20.map = _n26;
          }
        }
        var _a2 = s._structureForMap.get(_n25[0]);
        F.bind(e.model, _a2, _l4, _o4)();
      }
      return _(t, t.attributes, e.attrs), D(t, e, r), t;
    }
    return _(t, t.attributes, e.attrs), A(t, t.childNodes, e.children), D(t, e, r), t;
  },
  C = function C(t, e, n) {
    s._afterInitArr = [], e.slOnInit && e.slOnInit();
    var o = e.view.bind(e)();
    if (r(o, e), o.view && (o = o.view.bind(e)(), r(o, e)), !o.attrs || t && t.id !== o.attrs.id) {
      var _e22 = o.attrs ? o.attrs.id : "null";
      console.error("Mounted component root element changed from " + t.id + " to " + _e22);
    }
    if (t = S(t, o, e), e.slOnInit && (t.slOnInit = !0, t.slUnboundOnInit = e.slOnInit), e.slStyle && !t.slScopedCss) {
      var _n27 = N(e, e.slStyle());
      g(t, _n27), t.slScopedCss = !0;
    }
    n && s._updateMap.set(t.id, e), e.slOnDestroy && y(t, e.slOnDestroy.bind(e), e.slOnDestroy);
    var l = t.querySelectorAll("[slref]");
    void 0 !== t.slref && (l = Array.from(l), l.push(t));
    for (var _t23 = 0; _t23 < l.length; ++_t23) {
      e[l[_t23].getAttribute("slref")] = l[_t23].slref;
    }
    return e.slAfterInit && (e.slAfterInit(), t.slUnboundAfterInit = e.slAfterInit, j()), s._afterInitArr.forEach(function (t) {
      t();
    }), t;
  };
function version() {
  return "21.2.1";
}
var R = function R(t, e) {
    var n = 0,
      s = !1,
      r = !1,
      o = 0;
    for (; o < t.length;) {
      var _l5 = t[o];
      "'" !== _l5 || r ? '"' !== _l5 || s ? s || r || !t.startsWith(e, o) ? o++ : (n++, o += e.length) : (r = !r, o++) : (s = !s, o++);
    }
    return n;
  },
  M = function M(t, e) {
    if (!e) return 0;
    var n = 0,
      s = 0;
    for (;;) {
      var _r10 = t.indexOf(e, s);
      if (-1 === _r10) break;
      n++, s = _r10 + e.length;
    }
    return n;
  },
  E = function E(t, e) {
    var n = !1,
      s = !1;
    for (var _r11 = 0; _r11 <= t.length - e.length; _r11++) {
      var _o5 = t[_r11];
      if ("'" !== _o5 || s || "\\" === t[_r11 - 1] ? '"' !== _o5 || n || "\\" === t[_r11 - 1] || (s = !s) : n = !n, !n && !s && t.startsWith(e, _r11)) return _r11;
    }
    return -1;
  },
  N = function N(t, e) {
    var n = function (t) {
        for (var e = 0, n = 1779033703 ^ t.length; e < t.length; e++) n = (n = Math.imul(n ^ t.charCodeAt(e), 3432918353)) << 13 | n >>> 19;
        return function () {
          return n = Math.imul(n ^ n >>> 16, 2246822507), n = Math.imul(n ^ n >>> 13, 3266489909), (n ^= n >>> 16) >>> 0;
        };
      }(t.constructor.name),
      r = "slcss-" + String(n());
    if ("" === e || s._scopedCssSet.has(r)) return r;
    e = e.replace(/\t+/g, " "), s._scopedCssSet.add(r);
    var o,
      l = "",
      i = [],
      a = 0;
    var u = new Map();
    for (; e.length > 0;) {
      if (!/[^(\"|')]*?{/.test(e)) {
        l += e;
        break;
      }
      {
        var _t24 = /[^(\"|')]*?{/.exec(e);
        var _n28 = _t24.index + _t24[0].length,
          _s9 = e.substring(0, _n28).trim();
        for (; R(_s9, "{") < 1;) {
          var _t25 = e.substring(_n28);
          for (; _t25.startsWith('"') || _t25.startsWith("'");) _n28++, _s9 += _t25.charAt(0), _t25 = e.substring(_n28);
          if (_n28 = E(_t25, "{"), -1 === _n28) {
            e = "", _s9 = "";
            break;
          }
          var _r12 = _s9.length;
          _s9 += _t25.substring(0, _n28 + 1).trim(), _n28 += _r12 + 1, e = e.trim();
        }
        if ("" === e) break;
        var _c = e.substring(_n28);
        var _d2 = E(_s9, "}");
        if (-1 !== _d2) for (l += _s9.substring(0, _d2 + 1), i.pop(), a--, a < 0 && (a = 0), _s9 = _s9.substring(_d2 + 1).trim(); _s9.length > 0 && (_s9.startsWith("}") || /(,|\w)*}/.test(_s9));) {
          var _t26 = /.*,.*}/.exec(_s9),
            _e23 = _t26 ? _t26.index + _t26[0].lastIndexOf("}") : _s9.indexOf("}");
          _e23 > 0 ? (l += _s9.substring(0, _e23 + 1) + " ", _s9 = _s9.substring(_e23 + 1).trim()) : (l += "} ", _s9 = _s9.substring(1).trim()), i.pop(), a--, a < 0 && (a = 0);
        }
        for (o = R(l, "{") - R(l, "}"), 0 === o && (i = []), e = _c; /.*;/.test(_s9);) {
          var _t27 = E(_s9, ";"),
            _e24 = E(_s9, "{");
          if (-1 === _t27 || -1 !== _e24 && _e24 < _t27) break;
          l += _s9.substring(0, _t27 + 1) + " ", _s9 = _s9.substring(_t27 + 1).trim();
        }
        if (_s9.includes(",")) {
          var _t28 = _s9.split(",");
          for (var _e25 = 0; _e25 < _t28.length; _e25++) for (; R(_t28[_e25], ",") < M(_t28[_e25], ",") && _e25 + 1 < _t28.length;) _t28[_e25] += _t28[_e25 + 1], _t28[_e25] = _t28[_e25].trim(), _t28.splice(_e25 + 1, 1), _e25--;
          if (_t28[0].length > 0 && "@" === _t28[0].charAt(0) && !_t28[0].startsWith("@nest")) {
            if (0 === o ? i.push(!0) : i.push(i && !0), _t28[0].startsWith("@keyframes")) {
              a++;
              var _e26 = E(_t28[0], "{");
              if (-1 !== _e26 && _e26 > 0) {
                var _n29 = _s9.substring(0, _e26).trim();
                u.set(_n29.substring(10).trim(), _n29.substring(10).trim() + r), _n29 = _n29 + r + " ", _n29 += _s9.substring(_e26), _t28[0] = _n29;
              }
            }
          } else if (0 === a && (0 === o || i.length >= o && i.length > 0 && i.slice(0, o).every(function (t) {
            return t;
          }))) {
            for (var _e27 = 0; _e27 < _t28.length; _e27++) {
              var _n30 = E(_t28[_e27], "{"),
                _s10 = -1 !== _n30 ? _t28[_e27].substring(0, _n30) : _t28[_e27];
              var _o6 = _s10.trim().split(" ");
              var _l6 = void 0;
              for (var _t29 = 0; _t29 < _o6.length; _t29++) if (_l6 = _o6[_t29].trim(), ">" !== _l6 && "+" !== _l6 && "~" !== _l6 && "&" !== _l6) {
                _o6[_t29] = _l6 + "[" + r + "]";
                break;
              }
              _s10 = _o6.join(" "), _s10 += _t28[_e27].substring(-1 !== _n30 ? _n30 : _t28[_e27].length), _t28[_e27] = _s10;
            }
            i.push(!1);
          } else i.push(!1);
          for (var _e28 = 0; _e28 < _t28.length; _e28++) _e28 > 0 && (l += ", "), l += _t28[_e28];
          l += " ";
        } else {
          if (_s9.length > 0 && "@" === _s9.charAt(0) && !_s9.startsWith("@nest")) {
            if (0 === o ? i.push(!0) : i.push(i && !0), _s9.startsWith("@keyframes")) {
              var _t30 = E(_s9, "{");
              if (-1 !== _t30 && _t30 > 0) {
                var _e29 = _s9.substring(0, _t30).trim();
                u.set(_e29.substring(10).trim(), _e29.substring(10).trim() + r), _e29 = _e29 + r + " ", _e29 += _s9.substring(_t30), _s9 = _e29;
              }
              a++;
            }
          } else if (0 === a && (0 === o || i.length >= o && i.length > 0 && i.slice(0, o).every(function (t) {
            return t;
          }))) {
            var _t31 = E(_s9, "{"),
              _e30 = -1 !== _t31 ? _s9.substring(0, _t31) : _s9;
            var _n31 = _e30.trim().split(" ");
            var _o7 = void 0;
            for (var _t32 = 0; _t32 < _n31.length; _t32++) if (_o7 = _n31[_t32].trim(), ">" !== _o7 && "+" !== _o7 && "~" !== _o7 && "&" !== _o7) {
              _n31[_t32] = _o7 + "[" + r + "]";
              break;
            }
            _e30 = _n31.join(" "), _e30 += _s9.substring(-1 !== _t31 ? _t31 : _s9.length), _s9 = _e30, i.push(!1);
          } else i.push(!1);
          l += _s9 + " ", "@" !== _s9.charAt(0) && a && -1 === E(_s9, "}") && a++;
        }
      }
    }
    if (l = function (t, e) {
      var _iterator14 = _createForOfIteratorHelper(e.entries()),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var _step14$value = _slicedToArray(_step14.value, 2),
            _n32 = _step14$value[0],
            _s11 = _step14$value[1];
          var _e31 = new RegExp("animation\\s*:\\s*".concat(_n32, "\\s*"), "g");
          t = t.replace(_e31, "animation: ".concat(_s11, " ")), _e31 = new RegExp("animation-name\\s*:\\s*".concat(_n32, "\\s*"), "g"), t = t.replace(_e31, "animation-name: ".concat(_s11, " "));
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
      return t;
    }(l, u), "" !== l.trim()) {
      var _t33 = document.head || document.getElementsByTagName("head")[0],
        _e32 = document.createElement("style");
      _t33.appendChild(_e32), _e32.appendChild(document.createTextNode(l));
    }
    return r;
  };
function hydrate(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  var s = document.getElementById(t).getAttribute("slssrclass");
  var r = e[s];
  !r && this && (r = this[s]);
  return mount(t, new r(), n);
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
  return 3 === arguments.length && "string" == typeof arguments[0] && "object" == _typeof(arguments[1]) && Array.isArray(arguments[2]) ? markup(arguments[0], {
    attrs: arguments[1],
    children: arguments[2]
  }) : markup(arguments[0], arguments[1]);
}
function mount(t, e) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  s._router.mountRoute = t;
  var r = document.getElementById(t);
  if (null !== r) return C(r, e, n);
  console.error("ID " + t + " does not exist in DOM.");
}
function renderToString(t) {
  var e = [],
    o = new Set();
  var _iterator15 = _createForOfIteratorHelper(s._structureForMap.keys()),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _t34 = _step15.value;
      o.add(_t34);
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
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
  var _iterator16 = _createForOfIteratorHelper(s._structureForMap.keys()),
    _step16;
  try {
    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
      var _t35 = _step16.value;
      o.has(_t35) || s._structureForMap["delete"](_t35);
    }
  } catch (err) {
    _iterator16.e(err);
  } finally {
    _iterator16.f();
  }
  return a;
}
function update(t, e) {
  var n = t;
  if (t = document.getElementById(t), s._afterInitArr = [], t) {
    var _n33 = e.view.bind(e)();
    r(_n33, e), t = S(t, _n33, e);
  } else console.error("ID " + n + " not mounted in DOM; attachDetector likely needs to be called.");
  var o = t.querySelectorAll("[slref]");
  void 0 !== t.slref && (o = Array.from(o), o.push(t));
  for (var _t36 = 0; _t36 < o.length; ++_t36) {
    e[o[_t36].getAttribute("slref")] = o[_t36].slref;
  }
  if (s._afterInitArr.forEach(function (t) {
    t();
  }), e.slStyle && !t.slScopedCss) {
    var _n34 = N(e, e.slStyle());
    g(t, _n34), t.slScopedCss = !0;
  }
}
var x = e.onpopstate;
e.onpopstate = function (t) {
  switch (s._router.strategy) {
    case "#":
      e.location.hash && s._router.lastHash !== e.location.hash.substring(2) && (x && x(t), route(getRoute()));
      break;
    case "?":
      e.location.search && s._router.lastHash !== e.location.search.substring(2) && (x && x(t), route(getRoute()));
      break;
    case "":
      e.location.pathname && s._router.lastHash !== e.location.pathname.substring(1) && (x && x(t), route(getRoute()));
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
var U = function U() {
  switch (s._router.strategy) {
    case "#":
      {
        var _t37 = e.location.href.split("#/")[1];
        if (_t37) {
          var _e33 = _t37.split("/");
          _e33.forEach(function (t, e) {
            s._router.segmentArr[e] = t;
          }), s._router.segmentArr.splice(_e33.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
    case "?":
      {
        var _t38 = e.location.href.split("?/")[1];
        if (_t38) {
          var _e34 = _t38.split("/");
          _e34.forEach(function (t, e) {
            s._router.segmentArr[e] = t;
          }), s._router.segmentArr.splice(_e34.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
    case "":
      {
        var _t39 = e.location.pathname;
        if (_t39) {
          _t39 = _t39.replace("/", "");
          var _e35 = _t39.split("/");
          _e35.forEach(function (t, e) {
            s._router.segmentArr[e] = t;
          }), s._router.segmentArr.splice(_e35.length, s._router.segmentArr.length);
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
    var _e36 = t[s].split("=");
    n.push({
      "var": decodeURIComponent(_e36[0]),
      value: decodeURIComponent(_e36[1])
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
        var _t40 = e.location.pathname;
        return _t40 && (_t40 = _t40.replace("/", "")), _t40;
      }
  }
}
function addRoute(t, e) {
  s._router.routeList.push([new RegExp("^" + t.replace(/:[^\/]+/g, "([^\\/]+)") + "$"), e]);
}
function removeRoute(t) {
  var e = new RegExp("^" + t.replace(/:[^\/]+/g, "([^\\/]+)") + "$"),
    n = String(e);
  for (var _t41 = 0; _t41 < s._router.routeList.length; ++_t41) {
    var _s$_router$routeList$ = _slicedToArray(s._router.routeList[_t41], 2),
      _e37 = _s$_router$routeList$[0],
      _r13 = _s$_router$routeList$[1];
    if (String(_e37) === n) {
      s._router.routeList.splice(_t41, 1);
      break;
    }
  }
}
function route(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  if (s._router.params = n, s._router.currentRoute && s._router.currentRoute.onCanDeactivate && !s._router.currentRoute.onCanDeactivate(t)) return;
  var l = null;
  var _iterator17 = _createForOfIteratorHelper(s._router.routeList),
    _step17;
  try {
    var _loop3 = function _loop3() {
      var _step17$value = _slicedToArray(_step17.value, 2),
        n = _step17$value[0],
        i = _step17$value[1];
      if (n.test(t)) {
        if (i.onActivationCheck && !i.onActivationCheck(t)) return {
          v: (i.onActivationFail && (l = route(i.onActivationFail.route, i.onActivationFail.params, "boolean" != typeof i.onActivationFail.attachDetector || i.onActivationFail.attachDetector)), void (t = void 0))
        };
        i.onBeforeRoute && i.onBeforeRoute();
        var _n35 = document.getElementById(i.root);
        var _a3 = s._destroyNodeMap.get(getRoute());
        _a3 && (_a3.forEach(function (t) {
          t.slOnDestroyFn && _n35.contains(t) && t.slOnDestroyFn(), t.slOnDestroyFn = void 0, t.slUnboundOnDestroy = void 0, t.slAfterInit = !1, t.slOnInit = !1;
        }), s._destroyNodeMap.set(getRoute(), []), s._destroyFuncMap.set(getRoute(), [])), s._router.lastHash = t;
        var _u = e.scrollY;
        switch (s._router.strategy) {
          case "#":
            e.history.pushState(null, document.title, "#/" + t);
            break;
          case "?":
            {
              var _n36 = e.location.href;
              var _s12 = e.location.pathname;
              _n36 = _n36.substring(0, _n36.indexOf(_s12)), _n36 += "/?/" + t, e.history.pushState(null, document.title, _n36);
              break;
            }
          case "":
            {
              var _n37 = e.location.href;
              var _s13 = e.location.pathname;
              _n37 = _n37.substring(0, _n37.indexOf(_s13)), _n37 += "/" + t, e.history.pushState(null, document.title, _n37);
              break;
            }
        }
        if (e.scrollTo(0, _u), s._router.currentRoute && void 0 !== s._router.currentRoute.animateDestroy && (s._router.currentRoute.animateDestroy = !0), s._router.currentRoute && s._router.currentRoute.animateDestroy) {
          var _t42 = s._router.currentRoute.root;
          _t42 = document.getElementById(_t42), s._router.currentRoute = i, p(_t42), h(_t42), o(_t42), b(_t42), U();
        } else U(), s._router.currentRoute = i;
        s._router.count++, i.component && (i.component.slOnDestroy && s._destroyFuncMap.set(t, [i.component.slOnDestroy.bind(i.component)]), s._router.mountRoute = t, C(_n35, i.component, r), i.component.slOnDestroy && (_n35.slOnDestroyIndex = 0, s._destroyFuncMap.get(t).pop(), f(_n35)), l = i.component);
        return "break";
      }
    };
    for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
      var _ret = _loop3();
      if (_ret === "break") break;
      if (_typeof(_ret) === "object") return _ret.v;
    }
  } catch (err) {
    _iterator17.e(err);
  } finally {
    _iterator17.f();
  }
  return s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && j(), l;
}
U();
var w = function w(t, e, n) {
  return {
    parent: t,
    factory: e,
    map: Object.create(null)
  };
};
function T(t, e) {
  "function" == typeof e && (e = e());
  var n = [];
  for (var _s14 = 0; _s14 < e.length; ++_s14) n.push(t.factory.bind(this, e[_s14])());
  return n;
}
function F(t, e, n) {
  "function" == typeof e && (e = e());
  var s = Object.create(null),
    r = t.parent;
  var i,
    a,
    u = r.firstChild;
  if (e.length) {
    for (var _o8 = 0; _o8 < e.length; ++_o8) i = t.map[_o8], i ? n.bind(i, this, e[_o8])() : (i = t.factory.bind(this, e[_o8])(), void 0 !== i.attrs && (i = l(i))), s[_o8] = i, u || r.appendChild(i), u = i.nextSibling;
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
var L = function L(t, e) {
  if (e[t]) {
    var _n38 = e[t];
    e[t] = function () {
      var t = _n38.apply(this, [].slice.call(arguments));
      return j(), t;
    };
  }
};
var k = function k() {
    var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    t ? update(t, s._updateMap.get(t)) : s._updateMap.forEach(function (t, e) {
      update(e, t);
    });
  },
  j = function j() {
    if (s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC) return;
    new Date() - s._changeDetector.lastUpdateDate > 6 ? k() : s._debouncedPerformUpdates(), s._changeDetector.lastUpdateDate = new Date();
  };
function setDetectionStrategy(t) {
  s._changeStrategies.forEach(function (e) {
    e === t && (s._changeDetector.changeDetectionStrategy = t);
  });
}
function detectChanges() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  k(t);
}
function isDetectorAttached(t) {
  return s._updateMap.has(t);
}
function detachDetector(t) {
  s._updateMap["delete"](t);
}
var H = Promise.prototype.then;
function enableDetectOnThen() {
  Promise.prototype.then = function (t, e) {
    return H.call(this, function (e) {
      return j(), "function" == typeof t && t instanceof Function ? t(e) : t;
    }, e);
  };
}
function wrapWithChangeDetector(t, e) {
  return function () {
    e && e.slpreventdefault && arguments.length > 0 && "function" == typeof arguments[0].preventDefault && arguments[0].preventDefault();
    var n = t.apply(this, [].slice.call(arguments));
    return j(), n;
  };
}
s._debouncedPerformUpdates = function (t, e) {
  var n;
  return function () {
    for (var _len = arguments.length, s = new Array(_len), _key = 0; _key < _len; _key++) {
      s[_key] = arguments[_key];
    }
    var r = this;
    clearTimeout(n), n = setTimeout(function () {
      return t.apply(r, s);
    }, e);
  };
}(k, 17);
var G = e.XMLHttpRequest.prototype.send,
  W = new Map();
function P() {
  if (this._onreadystatechange) {
    var _t43 = W.get(this);
    if (void 0 !== _t43 && _t43 === this._onreadystatechangecount) return void W["delete"](this);
    void 0 !== _t43 ? W.set(this, _t43 + 1) : W.set(this, 0);
    var _e38 = this._onreadystatechange.apply(this, arguments);
    return j(), W["delete"](this), _e38;
  }
}
e.XMLHttpRequest.prototype.send = function (t) {
  return this.onreadystatechange ? (this._onreadystatechange = this.onreadystatechange, void 0 === this._onreadystatechangecount ? this._onreadystatechangecount = 0 : this._onreadystatechangecount += 4) : this._onreadystatechangecount = 0, this.onreadystatechange = P, G.apply(this, arguments);
};
var Y = e.fetch;
e.fetch = function () {
  var t = Y.apply(this, arguments);
  return j(), t;
};
