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
exports.t = t;
exports.textNode = textNode;
exports.update = update;
exports.version = version;
exports.wrapWithChangeDetector = wrapWithChangeDetector;
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e45) { throw _e45; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e46) { didErr = true; err = _e46; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var e = "undefined" != typeof window;
var n = e ? window : global;
e || (n.setTimeout = function () {}, n.setInterval = function () {}, n.location = {}, n.location.href = "", n.fetch = function () {}, n.XMLHttpRequest = {}, n.XMLHttpRequest.prototype = {}, n.XMLHttpRequest.prototype.send = function () {}), n.s = function () {}, s._state = {}, s._destroyFuncMap = new Map(), s._updateMap = new Map(), s._afterInitArr = [], s._destroyNodeMap = new Map(), s._structureForMap = new Map(), s._isAnimatingKeyed = null, s._scopedCssSet = new Set();
var r = function r(_ref, i) {
    var e = _ref.tagName,
      n = _ref.attrs,
      o = _ref.children,
      l = _ref.model;
    var a,
      u = "<" + (e = e.toLowerCase()),
      c = null;
    for (var _i = 0, _Object$entries = Object.entries(n); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        _e2 = _Object$entries$_i[0],
        _r2 = _Object$entries$_i[1];
      if (a = _typeof(_r2), u += "function" === a ? " " + _e2 + '=""' : " " + _e2 + '="' + _r2 + '"', "slfor" === _e2) {
        var _e3 = _r2.split(":");
        if (_e3.length >= 4) {
          s._structureForMap.has(_e3[0]) || s._structureForMap.set(_e3[0], T(null, l[_e3[2]]));
          var _n2 = s._structureForMap.get(_e3[0]);
          c = F.bind(l, _n2, l[_e3[1]], l[_e3[3]])();
        }
      } else if ("slfornamed" === _e2) {
        var _e4 = _r2.split(":");
        if (_e4.length >= 4) {
          var _n3 = void 0,
            _r3 = void 0,
            _o = void 0,
            _i2 = void 0;
          for (var _i3 = 0, _Object$keys = Object.keys(l); _i3 < _Object$keys.length; _i3++) {
            var _s2 = _Object$keys[_i3];
            _i2 = l[_s2], _i2.slfor === _e4[2] ? _n3 = _i2 : _i2.slfor === _e4[1] ? _o = _i2 : _i2.slfor === _e4[3] && (_r3 = _i2);
          }
          var _iterator = _createForOfIteratorHelper(D(l)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _s3 = _step.value;
              _i2 = l[_s3], _i2.slfor === _e4[2] ? _n3 = _i2 : _i2.slfor === _e4[1] ? _o = _i2 : _i2.slfor === _e4[3] && (_r3 = _i2);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _o = _o.bind(l), s._structureForMap.has(_e4[0]) || s._structureForMap.set(_e4[0], T(null, _n3));
          var _a = s._structureForMap.get(_e4[0]);
          c = F.bind(l, _a, _o, _r3)();
        }
      }
    }
    u += ">", null !== c && c.forEach(function (e) {
      u += r(e, i);
    });
    var _iterator2 = _createForOfIteratorHelper(o),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _e5 = _step2.value;
        _e5.view ? (_e5.slOnInit && (_e5.slOnInit(), i.push(_e5)), _e5 = _e5.view.bind(_e5)(), u += r(_e5, i)) : u += "string" == typeof _e5 ? _e5 : r(_e5, i);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return u += "</" + e + ">";
  },
  o = function o(e, n) {
    var s = [];
    var r;
    for (s.push(e); s.length > 0;) if (r = s.shift(), r.attrs && (r.attrs.slfor || r.attrs.slfornamed) && (r.model = n), r.children) for (var _e6 = r.children.length - 1; _e6 >= 0; --_e6) s.push(r.children[_e6]);
  },
  l = function l(e) {
    var n = [];
    var r, o;
    for (n.push(e); n.length > 0;) if (r = n.shift(), 3 !== r.nodeType && (r.hasAttribute("slfor") ? (o = r.getAttribute("slfor"), o = o.split(":"), o.length > 0 && s._structureForMap["delete"](o[0])) : r.hasAttribute("slfornamed") && (o = r.getAttribute("slfornamed"), o = o.split(":"), o.length > 0 && s._structureForMap["delete"](o[0])), r.children)) for (var _e7 = r.children.length - 1; _e7 >= 0; --_e7) n.push(r.children[_e7]);
  };
function renderElementWithoutClass(e, n, r) {
  var o, l, i;
  o = n && n.slns ? document.createElementNS(n.slns, e.toLowerCase()) : document.createElement(e);
  for (var _i4 = 0, _Object$keys2 = Object.keys(n); _i4 < _Object$keys2.length; _i4++) {
    var _e8 = _Object$keys2[_i4];
    if (i = n[_e8], l = _typeof(i), "function" === l) o[_e8] = i, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || i.name.startsWith("bound slDetached") || i.name.startsWith("slDetached") || k(_e8, o);else if ("slnsfor" === _e8) {
      var _e9 = JSON.parse(n.slnsfor);
      for (var _i5 = 0, _Object$entries2 = Object.entries(_e9); _i5 < _Object$entries2.length; _i5++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i5], 2),
          _n4 = _Object$entries2$_i[0],
          _s4 = _Object$entries2$_i[1];
        o.setAttributeNS(_s4.namespace, _n4, _s4.value);
      }
    } else o.setAttribute(_e8, i);
  }
  var _iterator3 = _createForOfIteratorHelper(r),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var _e10 = _step3.value;
      o.append(_e10);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  return o;
}
function renderElement(_ref2) {
  var e = _ref2.tagName,
    n = _ref2.attrs,
    r = _ref2.children;
  var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
  var l, i;
  l = n && n.slns ? document.createElementNS(n.slns, e.toLowerCase()) : document.createElement(e);
  for (var _i6 = 0, _Object$entries3 = Object.entries(n); _i6 < _Object$entries3.length; _i6++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i6], 2),
      _e11 = _Object$entries3$_i[0],
      _r4 = _Object$entries3$_i[1];
    if (i = _typeof(_r4), "function" === i) l[_e11] = _r4, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || _r4.name.startsWith("bound slDetached") || _r4.name.startsWith("slDetached") || k(_e11, l);else if ("slnsfor" === _e11) {
      var _e12 = JSON.parse(n.slnsfor);
      for (var _i7 = 0, _Object$entries4 = Object.entries(_e12); _i7 < _Object$entries4.length; _i7++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i7], 2),
          _n5 = _Object$entries4$_i[0],
          _s5 = _Object$entries4$_i[1];
        l.setAttributeNS(_s5.namespace, _n5, _s5.value);
      }
    } else l.setAttribute(_e11, _r4);
  }
  var _iterator4 = _createForOfIteratorHelper(r),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var _e13 = _step4.value;
      "string" == typeof _e13 ? l.append(_e13) : _e13.view ? o ? u(_e13, l) : c(_e13, l) : l.appendChild(renderElement(_e13, o));
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return l;
}
var i = function i(_ref3) {
    var e = _ref3.tagName,
      n = _ref3.attrs,
      r = _ref3.children;
    var o, l;
    o = n && n.slns ? document.createElementNS(n.slns, e.toLowerCase()) : document.createElement(e);
    for (var _i8 = 0, _Object$entries5 = Object.entries(n); _i8 < _Object$entries5.length; _i8++) {
      var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i8], 2),
        _e14 = _Object$entries5$_i[0],
        _r5 = _Object$entries5$_i[1];
      if (l = _typeof(_r5), "function" === l) o[_e14] = _r5, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || _r5.name.startsWith("bound slDetached") || _r5.name.startsWith("slDetached") || k(_e14, o);else if ("slnsfor" === _e14) {
        var _e15 = JSON.parse(n.slnsfor);
        for (var _i9 = 0, _Object$entries6 = Object.entries(_e15); _i9 < _Object$entries6.length; _i9++) {
          var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i9], 2),
            _n6 = _Object$entries6$_i[0],
            _s6 = _Object$entries6$_i[1];
          o.setAttributeNS(_s6.namespace, _n6, _s6.value);
        }
      } else o.setAttribute(_e14, _r5);
    }
    var _iterator5 = _createForOfIteratorHelper(r),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _e16 = _step5.value;
        "string" == typeof _e16 ? o.append(_e16) : _e16.view ? c(_e16, o) : o.appendChild(i(_e16));
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return o;
  },
  a = function a(e, n) {
    e.slKeyList = [], e.slNamespace = {};
    for (var _s7 in n) e.slNamespace[_s7] = n[_s7], e.slKeyList.push(_s7);
  },
  u = function u(e, n) {
    e = f(e, !0, !0, !0).view;
    var s = i(e);
    n.appendChild(s);
  },
  c = function c(e, n) {
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
    Object.getPrototypeOf(e).slDirty = !0;
    var o = e,
      l = f(e, !0, !0, !0);
    e = l.view, l.afterInit && s._afterInitArr.push(l.afterInit);
    var u = i(e);
    if (l.scopedCss) {
      var _e17 = x(l.model, l.model.slStyle());
      y(u, _e17), u.slScopedCss = !0;
    }
    l.onInit && (u.slOnInit = !0), d(u, l.destroyIndex, l.onDestroy, l.slUnboundOnDestroy), p(u), n.appendChild(u), a(u, o), r && C(u, e, l.model);
  },
  d = function d(e, n, s, r) {
    e.slOnDestroy = !0, e.slOnDestroyIndex = n, e.slOnDestroyFn = s, e.slAfterInit = !0, e.slOnInit = !0, e.slUnboundOnDestroy = r;
  },
  f = function f(e, n, r) {
    var l = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
    var i = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    if (r && e.slOnInit && (e.slOnInit(), i && (i.slOnInit = !0)), i && i.slKeyList) {
      var _iterator6 = _createForOfIteratorHelper(i.slKeyList),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _n7 = _step6.value;
          void 0 === e[_n7] ? e[_n7] = i.slNamespace[_n7] : i.slNamespace[_n7] = e[_n7];
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    var a = null;
    if (n && e.slOnDestroy) {
      var _n8 = s._destroyFuncMap.get(s._router.mountRoute);
      _n8 || (_n8 = []), _n8.push(e.slOnDestroy.bind(e)), s._destroyFuncMap.set(s._router.mountRoute, _n8), a = _n8.length - 1;
    }
    var u = e.view.bind(e)();
    return o(u, e), {
      view: u,
      afterInit: e.slAfterInit ? e.slAfterInit.bind(e) : null,
      onDestroy: n && !l || !e.slOnDestroy ? null : e.slOnDestroy.bind(e),
      onInit: !r && e.slOnInit ? e.slOnInit : null,
      destroyIndex: a,
      model: e,
      scopedCss: e.slStyle ? e.slStyle.bind(e) : null,
      slUnboundOnDestroy: e.slOnDestroy,
      slUnboundAfterInit: e.slAfterInit,
      slUnboundOnInit: e.slOnInit
    };
  },
  p = function p(e) {
    if (e && null !== e.slOnDestroyIndex && void 0 !== e.slOnDestroyIndex && !e.slOnDestroyRoute) {
      var _n9 = s._destroyNodeMap.get(s._router.mountRoute);
      _n9 || (_n9 = []);
      _n9.find(function (n) {
        return n.slOnDestroyIndex === e.slOnDestroyIndex;
      }) || _n9.push(e), s._destroyNodeMap.set(s._router.mountRoute, _n9), e.slOnDestroyRoute = s._router.mountRoute;
    }
  },
  h = function h(e) {
    if (e && e.slOnDestroy) {
      var _n10 = s._destroyFuncMap.get(s._router.mountRoute);
      _n10 || (_n10 = []), _n10.splice(e.slOnDestroyIndex, 1), s._destroyFuncMap.set(s._router.mountRoute, _n10);
      var _r6 = s._destroyNodeMap.get(s._router.mountRoute);
      _r6 || (_r6 = []), _r6.forEach(function (n) {
        n.slOnDestroyIndex > e.slOnDestroyIndex && n.slOnDestroyIndex--;
      }), _r6 = _r6.filter(function (n) {
        return n.slOnDestroyIndex !== e.slOnDestroyIndex;
      }), s._destroyNodeMap.set(s._router.mountRoute, _r6);
    }
  },
  g = function g(e) {
    if (e && e.children && e.children.length > 0) {
      var _iterator7 = _createForOfIteratorHelper(e.children),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _n11 = _step7.value;
          g(_n11);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      e.slOnDestroyFn && (e.slOnDestroyFn(), e.slOnDestroyFn = void 0, e.slUnboundOnDestroy = void 0, e.slAfterInit = !1, e.slOnInit = !1);
    } else e.slOnDestroyFn && (e.slOnDestroyFn(), e.slOnDestroyFn = void 0, e.slUnboundOnDestroy = void 0, e.slAfterInit = !1, e.slOnInit = !1);
  },
  y = function y(e, n) {
    if (e.setAttribute(n, ""), e.children && e.children.length > 0) {
      var _iterator8 = _createForOfIteratorHelper(e.children),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var _s8 = _step8.value;
          y(_s8, n);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  },
  _ = function _(e, n, r) {
    e.slOnDestroy = !0;
    var o = s._destroyFuncMap.get(s._router.mountRoute);
    o || (o = []), o.push(n), s._destroyFuncMap.set(s._router.mountRoute, o), e.slOnDestroyIndex = o.length - 1, e.slOnDestroyFn = n, e.slUnboundOnDestroy = r, p(e);
  },
  A = function A(e, n, r) {
    var o;
    var l = [];
    var _iterator9 = _createForOfIteratorHelper(n),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var _e18 = _step9.value;
        var _n13 = r[_e18.name];
        _n13 ? _n13.length === _e18.nodeValue.length && _n13 === _e18.nodeValue && delete r[_e18.name] : _e18.name.startsWith("slcss-") || l.push(_e18.nodeName);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    l.forEach(function (n) {
      e.removeAttribute(n);
    }), void 0 !== r.slref && (e.slref = e);
    var i = r.slpreventdefault;
    var a = !1;
    var _loop = function _loop() {
      var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i10], 2),
        n = _Object$entries7$_i[0],
        l = _Object$entries7$_i[1];
      if (o = _typeof(l), "function" === o) {
        if (void 0 !== i) {
          var _s9 = n;
          _s9.startsWith("on") && (_s9 = _s9.substring(2, _s9.length));
          var _r7 = e[n];
          if (_r7) {
            (Array.isArray(_r7) ? _r7 : [_r7]).forEach(function (n) {
              e.removeEventListener(_s9, n);
            });
          }
          e.addEventListener(_s9, function (e) {
            e.preventDefault();
          }), a = !0;
        }
        e[n] = l, s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC || l.name.startsWith("bound slDetached") || l.name.startsWith("slDetached") || k(n, e);
      } else if ("slnsfor" === n) {
        var _n12 = JSON.parse(r.slnsfor);
        for (var _i11 = 0, _Object$entries8 = Object.entries(_n12); _i11 < _Object$entries8.length; _i11++) {
          var _Object$entries8$_i = _slicedToArray(_Object$entries8[_i11], 2),
            _s10 = _Object$entries8$_i[0],
            _r8 = _Object$entries8$_i[1];
          e.setAttributeNS(_r8.namespace, _s10, _r8.value);
        }
      } else e.setAttribute(n, l);
    };
    for (var _i10 = 0, _Object$entries7 = Object.entries(r); _i10 < _Object$entries7.length; _i10++) {
      _loop();
    }
    a || (void 0 !== i || n.slpreventdefault) && S([e]);
  },
  b = function b(e, n, r) {
    var o = n.length,
      u = new Set();
    var d = 0;
    for (var _e19 = n.length - 1; _e19 >= 0; --_e19) {
      var _o2 = null,
        _l = null;
      if (r[_e19] && (n[_e19].slUnboundOnDestroy !== r[_e19].slOnDestroy && (void 0 !== n[_e19].slUnboundOnDestroy && void 0 !== n[_e19].slOnDestroyFn && n[_e19].slOnDestroyFn(), h(n[_e19]), n[_e19].slOnDestroyFn = void 0, n[_e19].slOnDestroy = !1, n[_e19].slOnInit = !1, n[_e19].slAfterInit = !1, u.add(_e19)), r[_e19].view)) {
        var _i12 = f(r[_e19], !1, !1, !1, n[_e19]);
        r[_e19] = _i12.view;
        var _u = Object.getPrototypeOf(_i12.model);
        !0 !== _u.slDirty && (_i12.onInit && n[_e19].slOnInit && (n[_e19].slOnInit = !1), _i12.afterInit && n[_e19].slAfterInit && (n[_e19].slAfterInit = !1), _i12.scopedCss && n[_e19].slScopedCss && (n[_e19].slScopedCss = !1), _i12.onDestroy && n[_e19].slOnDestroy && (n[_e19].slOnDestroy = !1), _u.slDirty = !0), _i12.onInit && !n[_e19].slOnInit && n[_e19].slUnboundOnInit !== _i12.slUnboundOnInit ? (n[_e19].slUnboundOnInit = _i12.slUnboundOnInit, _i12.onInit.bind(_i12.model)(), r[_e19].slOnInit = !0) : void 0 === n[_e19].slUnboundOnInit || _i12.onInit ? _i12.onInit && n[_e19] && !n[_e19].slOnInit ? (n[_e19].slUnboundOnInit === _i12.slUnboundOnInit && _i12.onInit.bind(_i12.model)(), n[_e19].slUnboundOnInit = _i12.slUnboundOnInit, r[_e19].slOnInit = !0) : _i12.onInit && n[_e19].slOnInit && void 0 === n[_e19].slUnboundOnInit && (n[_e19].slUnboundOnInit = _i12.slUnboundOnInit) : n[_e19].slOnInit = !1, _i12.afterInit && !n[_e19].slAfterInit && n[_e19].slUnboundAfterInit !== _i12.slUnboundAfterInit ? (n[_e19].slAfterInit = !0, n[_e19].slUnboundAfterInit = _i12.slUnboundAfterInit, s._afterInitArr.push(_i12.afterInit)) : void 0 === n[_e19].slUnboundAfterInit || _i12.afterInit ? _i12.afterInit && n[_e19] && !n[_e19].slAfterInit ? (n[_e19].slAfterInit = !0, n[_e19].slUnboundAfterInit === _i12.slUnboundAfterInit && s._afterInitArr.push(_i12.afterInit), n[_e19].slUnboundAfterInit = _i12.slUnboundAfterInit) : _i12.afterInit && n[_e19].slAfterInit && void 0 === n[_e19].slUnboundAfterInit && (n[_e19].slUnboundAfterInit = _i12.slUnboundAfterInit) : n[_e19].slAfterInit = !1, _i12.scopedCss && n[_e19] && !n[_e19].slScopedCss && (_l = x(_i12.model, _i12.model.slStyle())), _i12.onDestroy && n[_e19] && !n[_e19].slOnDestroy && _(n[_e19], _i12.onDestroy, _i12.slUnboundOnDestroy), a(n[_e19], _i12.model), _o2 = _i12.model;
      }
      C(n[_e19], r[_e19], _o2), r[_e19] && r[_e19].slOnInit && (n[_e19].slOnInit = !0);
      var _iterator10 = _createForOfIteratorHelper(u),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var _e20 = _step10.value;
          r[_e20] && n[_e20].slAfterInit && !n[_e20].slOnDestroy && (n[_e20].slAfterInit = !1), r[_e20] && n[_e20].slOnInit && !n[_e20].slOnDestroy && (n[_e20].slOnInit = !1);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
      _l && (y(n[_e19], _l), n[_e19].slScopedCss = !0), d++;
    }
    var p = n.length;
    for (; p > o;) h(n[p - 1]), g(n[p - 1]), l(n[n.length - 1]), O(n[p - 1]), p--;
    var _iterator11 = _createForOfIteratorHelper(r.slice(o)),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _n14 = _step11.value;
        if ("string" == typeof _n14) e.childNodes[d] ? e.childNodes[d].textContent !== _n14 && (e.childNodes[d].textContent = _n14) : e.append(_n14);else if ("string" == typeof _n14) e.append(_n14);else if (_n14.view) c(_n14, e, !0);else {
          var _s11 = i(_n14);
          e.appendChild(_s11), C(_s11, _n14);
        }
        d++;
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
    for (p = n.length; p > r.length;) h(n[p - 1]), g(n[p - 1]), l(n[p - 1]), O(n[p - 1]), p--;
  },
  O = function O(e) {
    var n = s._router.count;
    if (void 0 === e.slanimatedestroytarget || "" === e.slanimatedestroytarget || e.slAnimateDestroy || void 0 === e.attributes.slanimatedestroy || "" === e.getAttribute("slanimatedestroy")) {
      if (3 === e.nodeType || void 0 === e.attributes.slanimatedestroy || "" === e.getAttribute("slanimatedestroy") || e.slAnimateDestroy) e.slAnimateDestroy || (s._router.currentRoute && e.id !== s._router.currentRoute.root || n === s._router.count) && (e.remove(), s._updateMap["delete"](e.id));else {
        var _r9 = e.onanimationend,
          _o3 = e.onanimationstart,
          _l2 = e.getAttribute("slanimatedestroy");
        e.onanimationstart = function (n) {
          e.slAnimationName = n.animationName;
        }, e.onanimationend = function (l) {
          if (!e.slAnimationName || e.slAnimationName !== l.animationName) return;
          var i = void 0;
          return _r9 && (i = _r9.apply(this, [].slice.call(arguments))), (s._router.currentRoute && e.id !== s._router.currentRoute.root || n === s._router.count) && (e.remove(), s._updateMap["delete"](e.id)), e.slAnimationName = null, e.onanimationend = _r9, e.onanimationstart = _o3, e.slAnimateDestroy = !1, i;
        }, e.classList.add(_l2), e.slAnimateDestroy = !0;
      }
    } else {
      var _r10 = e.slanimatedestroytarget;
      if ("function" == typeof _r10) {
        var _o4 = _r10(e);
        if (_o4) {
          var _r11 = _o4.getAttribute("slanimatedestroy"),
            _l3 = _o4.onanimationend,
            _i13 = _o4.onanimationstart;
          _o4.onanimationstart = function (e) {
            _o4.slAnimationName = e.animationName;
          }, _o4.onanimationend = function (a) {
            if (!_o4.slAnimationName || _o4.slAnimationName !== a.animationName) return;
            var u = void 0;
            return _l3 && (u = _l3.apply(this, [].slice.call(arguments))), _o4.classList.remove(_r11), s._isAnimatingKeyed = null, s._router.currentRoute.animateDestroy ? (s._router.currentRoute.animateDestroy = !1, e.setAttribute("style", "opacity: 0;"), _o4.onanimationend = null, _o4.onanimationstart = null) : ((s._router.currentRoute && e.id !== s._router.currentRoute.root || n === s._router.count) && (e.remove(), s._updateMap["delete"](e.id)), _o4.onanimationend = _l3, _o4.onanimationstart = _i13), _o4.slAnimationName = null, _o4.onanimationend = null, _o4.onanimationstart = null, _o4.style.animation = "none", e.slAnimateDestroy = !1, delete e.slanimatedestroytarget, detectChanges(), u;
          }, s._isAnimatingKeyed = _o4, _o4.classList.add(_r11), e.slAnimateDestroy = !0;
        } else (s._router.currentRoute && e.id !== s._router.currentRoute.root || n === s._router.count) && (e.remove(), s._updateMap["delete"](e.id));
      } else (s._router.currentRoute && e.id !== s._router.currentRoute.root || n === s._router.count) && (e.remove(), s._updateMap["delete"](e.id));
    }
  },
  I = function I(e) {
    return e && e !== Object.prototype && Object.getOwnPropertyNames(e).filter(function (n) {
      return function (e, n) {
        return (Object.getOwnPropertyDescriptor(e, n) || {}).get;
      }(e, n) || function (e, n) {
        return "function" == typeof e[n];
      }(e, n);
    }).concat(I(Object.getPrototypeOf(e)) || []);
  },
  D = function D(e) {
    return function (e) {
      return Array.from(new Set(I(e)));
    }(e).filter(function (e) {
      return "constructor" !== e && !~e.indexOf("__");
    });
  },
  v = function v(e, n) {
    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    if (n.slStyle && !e.slScopedCss) {
      var _r12 = x(n, n.slStyle());
      y(e, _r12), e.slScopedCss = !0, e.style.display = s;
    }
  },
  S = function S(e) {
    var _loop2 = function _loop2() {
      var s = e[_n15];
      if (null !== s.getAttribute("slpreventdefault")) for (var _e21 in s) if (_e21.startsWith("on")) {
        var _n16 = _e21.substring(2, _e21.length);
        var _r13 = s[_e21];
        if (_r13) {
          (Array.isArray(_r13) ? _r13 : [_r13]).forEach(function (e) {
            s.removeEventListener(_n16, e);
          });
        }
        s.addEventListener(_n16, function (e) {
          e.preventDefault();
        });
      }
    };
    for (var _n15 = 0; _n15 < e.length; _n15++) {
      _loop2();
    }
  },
  C = function C(e, n) {
    var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (null !== s._isAnimatingKeyed) {
      var _iterator12 = _createForOfIteratorHelper(s._updateMap),
        _step12;
      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var _step12$value = _slicedToArray(_step12.value, 2),
            _n17 = _step12$value[0],
            _r14 = _step12$value[1];
          {
            var _r15 = document.getElementById(_n17);
            if (_r15.contains(s._isAnimatingKeyed) && _r15.contains(e)) return e;
          }
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    }
    var o;
    if (n && n.slStyle && (o = e.style.display, e.style.display = "none"), n && n.view) {
      e.slUnboundOnDestroy !== n.slOnDestroy && (void 0 !== e.slUnboundOnDestroy && void 0 !== e.slOnDestroyFn && e.slOnDestroyFn(), h(e), e.slOnDestroyFn = void 0, e.slOnDestroy = !1, e.slAfterInit = !1, e.slOnInit = !1);
      var _r16 = f(n, !1, !1, !1, e);
      n = _r16.view;
      var _o5 = Object.getPrototypeOf(_r16.model);
      if (!0 !== _o5.slDirty && (_r16.onInit && e.slOnInit && (e.slOnInit = !1), _r16.afterInit && e.slAfterInit && (e.slAfterInit = !1), _r16.scopedCss && e.slScopedCss && (e.slScopedCss = !1), _r16.onDestroy && e.slOnDestroy && (e.slOnDestroy = !1), _o5.slDirty = !0), _r16.onInit && e && !e.slOnInit && (_r16.onInit.bind(_r16.model)(), e.slOnInit = !0), _r16.afterInit && e && !e.slAfterInit && (e.slAfterInit = !0, s._afterInitArr.push(_r16.afterInit)), _r16.scopedCss && e && !e.slScopedCss) {
        var _n18 = x(_r16.model, _r16.model.slStyle());
        y(e, _n18), e.slScopedCss = !0;
      }
      _r16.onDestroy && e && !e.slOnDestroy && _(e, _r16.onDestroy, _r16.slUnboundOnDestroy);
    }
    if (!n) return e && (h(e), g(e), l(e), O(e)), e;
    if (e && (e.tagName || "").toLowerCase() !== ((n ? n.tagName : void 0) || "").toLowerCase()) {
      if (!n.tagName) return h(e), g(e), e.replaceWith(n), e = n;
      {
        var _s12;
        _s12 = n.attrs && n.attrs.slns ? document.createElementNS(n.attrs.slns, n.tagName.toLowerCase()) : document.createElement(n.tagName), v(_s12, n, o), e.parentNode.insertBefore(_s12, e), h(e), g(e), l(e), O(e), _s12.slUnboundAfterInit = e.slUnboundAfterInit, void 0 !== _s12.slUnboundAfterInit && (_s12.slAfterInit = !0), e.slOnInit && (_s12.slOnInit = !1), e = _s12;
      }
    }
    if ("string" == typeof n) return e.textContent !== n && (e.textContent = n), e;
    switch (n.attrs.sldirective) {
      case "useexisting":
        return v(e, n, o), e;
      case "onlychildren":
        return b(e, e.childNodes, n.children), e;
      case "onlyself":
        return A(e, e.attributes, n.attrs), v(e, n, o), e;
      case "trustchildren":
        {
          A(e, e.attributes, n.attrs), v(e, n, o);
          var _s13 = "";
          n.children.forEach(function (e) {
            _s13 += e;
          }), e.innerHTML !== _s13 && (e.innerHTML = _s13);
          var _r17 = e.querySelectorAll("[slpreventdefault]");
          return _r17.length > 0 && S(Array.from(_r17)), e;
        }
    }
    if (n.attrs.slfor) {
      var _r18 = n.attrs.slfor.split(":");
      if (_r18.length >= 4) {
        if (!s._structureForMap.has(_r18[0])) {
          var _o6 = T(e, n.model[_r18[2]]);
          if (s._structureForMap.set(_r18[0], _o6), e.children.length > 0) {
            var _n19 = Object.create(null);
            for (var _s14 = 0; _s14 < e.children.length; ++_s14) _n19[_s14] = e.children[_s14];
            _o6.map = _n19;
          }
        }
        var _o7 = s._structureForMap.get(_r18[0]);
        L.bind(n.model, _o7, n.model[_r18[1]], n.model[_r18[3]])();
      }
      return A(e, e.attributes, n.attrs), v(e, n, o), e;
    }
    if (n.attrs.slfornamed) {
      var _r19 = n.attrs.slfornamed.split(":");
      if (_r19.length >= 4) {
        var _o8, _l4, _i14, _a2;
        for (var _i15 = 0, _Object$keys3 = Object.keys(n.model); _i15 < _Object$keys3.length; _i15++) {
          var _e22 = _Object$keys3[_i15];
          _a2 = n.model[_e22], _a2.slfor === _r19[2] ? _o8 = _a2 : _a2.slfor === _r19[1] ? _i14 = _a2 : _a2.slfor === _r19[3] && (_l4 = _a2);
        }
        var _iterator13 = _createForOfIteratorHelper(D(n.model)),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var _e23 = _step13.value;
            _a2 = n.model[_e23], _a2.slfor === _r19[2] ? _o8 = _a2 : _a2.slfor === _r19[1] ? _i14 = _a2 : _a2.slfor === _r19[3] && (_l4 = _a2);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
        if (_i14 = _i14.bind(n.model), !s._structureForMap.has(_r19[0])) {
          var _n20 = T(e, _o8);
          if (s._structureForMap.set(_r19[0], _n20), e.children.length > 0) {
            var _s15 = Object.create(null);
            for (var _n21 = 0; _n21 < e.children.length; ++_n21) _s15[_n21] = e.children[_n21];
            _n20.map = _s15;
          }
        }
        var _u2 = s._structureForMap.get(_r19[0]);
        L.bind(n.model, _u2, _i14, _l4)();
      }
      return A(e, e.attributes, n.attrs), v(e, n, o), e;
    }
    return A(e, e.attributes, n.attrs), b(e, e.childNodes, n.children), v(e, n, o), e;
  },
  R = function R(e, n, r) {
    s._afterInitArr = [], n.slOnInit && n.slOnInit();
    var l = n.view.bind(n)();
    if (o(l, n), l.view && (l = l.view.bind(n)(), o(l, n)), !l.attrs || e && e.id !== l.attrs.id) {
      var _n22 = l.attrs ? l.attrs.id : "null";
      console.error("Mounted component root element changed from " + e.id + " to " + _n22);
    }
    if (e = C(e, l, n), n.slOnInit && (e.slOnInit = !0, e.slUnboundOnInit = n.slOnInit), n.slStyle && !e.slScopedCss) {
      var _s16 = x(n, n.slStyle());
      y(e, _s16), e.slScopedCss = !0;
    }
    r && s._updateMap.set(e.id, n), n.slOnDestroy && _(e, n.slOnDestroy.bind(n), n.slOnDestroy);
    var i = e.querySelectorAll("[slref]");
    void 0 !== e.slref && (i = Array.from(i), i.push(e));
    for (var _e24 = 0; _e24 < i.length; ++_e24) {
      n[i[_e24].getAttribute("slref")] = i[_e24].slref;
    }
    return n.slAfterInit && (n.slAfterInit(), e.slUnboundAfterInit = n.slAfterInit, H()), s._afterInitArr.forEach(function (e) {
      e();
    }), e;
  };
function version() {
  return "21.2.1";
}
var M = function M(e, n) {
    var s = 0,
      r = !1,
      o = !1,
      l = 0;
    for (; l < e.length;) {
      var _i16 = e[l];
      "'" !== _i16 || o ? '"' !== _i16 || r ? r || o || !e.startsWith(n, l) ? l++ : (s++, l += n.length) : (o = !o, l++) : (r = !r, l++);
    }
    return s;
  },
  E = function E(e, n) {
    if (!n) return 0;
    var s = 0,
      r = 0;
    for (;;) {
      var _o9 = e.indexOf(n, r);
      if (-1 === _o9) break;
      s++, r = _o9 + n.length;
    }
    return s;
  },
  N = function N(e, n) {
    var s = !1,
      r = !1;
    for (var _o10 = 0; _o10 <= e.length - n.length; _o10++) {
      var _l5 = e[_o10];
      if ("'" !== _l5 || r || "\\" === e[_o10 - 1] ? '"' !== _l5 || s || "\\" === e[_o10 - 1] || (r = !r) : s = !s, !s && !r && e.startsWith(n, _o10)) return _o10;
    }
    return -1;
  },
  x = function x(e, n) {
    var r = function (e) {
        for (var n = 0, s = 1779033703 ^ e.length; n < e.length; n++) s = (s = Math.imul(s ^ e.charCodeAt(n), 3432918353)) << 13 | s >>> 19;
        return function () {
          return s = Math.imul(s ^ s >>> 16, 2246822507), s = Math.imul(s ^ s >>> 13, 3266489909), (s ^= s >>> 16) >>> 0;
        };
      }(e.constructor.name),
      o = "slcss-" + String(r());
    if ("" === n || s._scopedCssSet.has(o)) return o;
    n = n.replace(/\t+/g, " "), s._scopedCssSet.add(o);
    var l,
      i = "",
      a = [],
      u = 0;
    var c = new Map();
    for (; n.length > 0;) {
      if (!/[^(\"|')]*?{/.test(n)) {
        i += n;
        break;
      }
      {
        var _e25 = /[^(\"|')]*?{/.exec(n);
        var _s17 = _e25.index + _e25[0].length,
          _r20 = n.substring(0, _s17).trim();
        for (; M(_r20, "{") < 1;) {
          var _e26 = n.substring(_s17);
          for (; _e26.startsWith('"') || _e26.startsWith("'");) _s17++, _r20 += _e26.charAt(0), _e26 = n.substring(_s17);
          if (_s17 = N(_e26, "{"), -1 === _s17) {
            n = "", _r20 = "";
            break;
          }
          var _o11 = _r20.length;
          _r20 += _e26.substring(0, _s17 + 1).trim(), _s17 += _o11 + 1, n = n.trim();
        }
        if ("" === n) break;
        var _d2 = n.substring(_s17);
        var _f = N(_r20, "}");
        if (-1 !== _f) for (i += _r20.substring(0, _f + 1), a.pop(), u--, u < 0 && (u = 0), _r20 = _r20.substring(_f + 1).trim(); _r20.length > 0 && (_r20.startsWith("}") || /(,|\w)*}/.test(_r20));) {
          var _e27 = /.*,.*}/.exec(_r20),
            _n23 = _e27 ? _e27.index + _e27[0].lastIndexOf("}") : _r20.indexOf("}");
          _n23 > 0 ? (i += _r20.substring(0, _n23 + 1) + " ", _r20 = _r20.substring(_n23 + 1).trim()) : (i += "} ", _r20 = _r20.substring(1).trim()), a.pop(), u--, u < 0 && (u = 0);
        }
        for (l = M(i, "{") - M(i, "}"), 0 === l && (a = []), n = _d2; /.*;/.test(_r20);) {
          var _e28 = N(_r20, ";"),
            _n24 = N(_r20, "{");
          if (-1 === _e28 || -1 !== _n24 && _n24 < _e28) break;
          i += _r20.substring(0, _e28 + 1) + " ", _r20 = _r20.substring(_e28 + 1).trim();
        }
        if (_r20.includes(",")) {
          var _e29 = _r20.split(",");
          for (var _n25 = 0; _n25 < _e29.length; _n25++) for (; M(_e29[_n25], ",") < E(_e29[_n25], ",") && _n25 + 1 < _e29.length;) _e29[_n25] += _e29[_n25 + 1], _e29[_n25] = _e29[_n25].trim(), _e29.splice(_n25 + 1, 1), _n25--;
          if (_e29[0].length > 0 && "@" === _e29[0].charAt(0) && !_e29[0].startsWith("@nest")) {
            if (0 === l ? a.push(!0) : a.push(a && !0), _e29[0].startsWith("@keyframes")) {
              u++;
              var _n26 = N(_e29[0], "{");
              if (-1 !== _n26 && _n26 > 0) {
                var _s18 = _r20.substring(0, _n26).trim();
                c.set(_s18.substring(10).trim(), _s18.substring(10).trim() + o), _s18 = _s18 + o + " ", _s18 += _r20.substring(_n26), _e29[0] = _s18;
              }
            }
          } else if (0 === u && (0 === l || a.length >= l && a.length > 0 && a.slice(0, l).every(function (e) {
            return e;
          }))) {
            for (var _n27 = 0; _n27 < _e29.length; _n27++) {
              var _s19 = N(_e29[_n27], "{"),
                _r21 = -1 !== _s19 ? _e29[_n27].substring(0, _s19) : _e29[_n27];
              var _l6 = _r21.trim().split(" ");
              var _i17 = void 0;
              for (var _e30 = 0; _e30 < _l6.length; _e30++) if (_i17 = _l6[_e30].trim(), ">" !== _i17 && "+" !== _i17 && "~" !== _i17 && "&" !== _i17) {
                _l6[_e30] = _i17 + "[" + o + "]";
                break;
              }
              _r21 = _l6.join(" "), _r21 += _e29[_n27].substring(-1 !== _s19 ? _s19 : _e29[_n27].length), _e29[_n27] = _r21;
            }
            a.push(!1);
          } else a.push(!1);
          for (var _n28 = 0; _n28 < _e29.length; _n28++) _n28 > 0 && (i += ", "), i += _e29[_n28];
          i += " ";
        } else {
          if (_r20.length > 0 && "@" === _r20.charAt(0) && !_r20.startsWith("@nest")) {
            if (0 === l ? a.push(!0) : a.push(a && !0), _r20.startsWith("@keyframes")) {
              var _e31 = N(_r20, "{");
              if (-1 !== _e31 && _e31 > 0) {
                var _n29 = _r20.substring(0, _e31).trim();
                c.set(_n29.substring(10).trim(), _n29.substring(10).trim() + o), _n29 = _n29 + o + " ", _n29 += _r20.substring(_e31), _r20 = _n29;
              }
              u++;
            }
          } else if (0 === u && (0 === l || a.length >= l && a.length > 0 && a.slice(0, l).every(function (e) {
            return e;
          }))) {
            var _e32 = N(_r20, "{"),
              _n30 = -1 !== _e32 ? _r20.substring(0, _e32) : _r20;
            var _s20 = _n30.trim().split(" ");
            var _l7 = void 0;
            for (var _e33 = 0; _e33 < _s20.length; _e33++) if (_l7 = _s20[_e33].trim(), ">" !== _l7 && "+" !== _l7 && "~" !== _l7 && "&" !== _l7) {
              _s20[_e33] = _l7 + "[" + o + "]";
              break;
            }
            _n30 = _s20.join(" "), _n30 += _r20.substring(-1 !== _e32 ? _e32 : _r20.length), _r20 = _n30, a.push(!1);
          } else a.push(!1);
          i += _r20 + " ", "@" !== _r20.charAt(0) && u && -1 === N(_r20, "}") && u++;
        }
      }
    }
    if (i = function (e, n) {
      var _iterator14 = _createForOfIteratorHelper(n.entries()),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var _step14$value = _slicedToArray(_step14.value, 2),
            _s21 = _step14$value[0],
            _r22 = _step14$value[1];
          var _n31 = new RegExp("animation\\s*:\\s*".concat(_s21, "\\s*"), "g");
          e = e.replace(_n31, "animation: ".concat(_r22, " ")), _n31 = new RegExp("animation-name\\s*:\\s*".concat(_s21, "\\s*"), "g"), e = e.replace(_n31, "animation-name: ".concat(_r22, " "));
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
      return e;
    }(i, c), "" !== i.trim()) {
      var _e34 = document.head || document.getElementsByTagName("head")[0],
        _n32 = document.createElement("style");
      _e34.appendChild(_n32), _n32.appendChild(document.createTextNode(i));
    }
    return o;
  };
function hydrate(e) {
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
  var r = document.getElementById(e).getAttribute("slssrclass");
  var o = n[r];
  !o && this && (o = this[r]);
  return mount(e, new o(), s);
}
function resolveAll(e) {
  return Promise.all(e.map(function (e) {
    return e.then(function (e) {
      return {
        result: e,
        status: "fulfilled",
        error: null
      };
    }, function (e) {
      return {
        result: null,
        error: e,
        status: "rejected"
      };
    });
  }));
}
function setState(e) {
  s._state = e;
}
function getState() {
  return s._state;
}
function textNode(e) {
  return String(e);
}
function t(e) {
  return String(e);
}
function markup(e) {
  var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref4$attrs = _ref4.attrs,
    n = _ref4$attrs === void 0 ? {} : _ref4$attrs,
    _ref4$children = _ref4.children,
    s = _ref4$children === void 0 ? [] : _ref4$children;
  return {
    tagName: e = e.toUpperCase(),
    attrs: n,
    children: s
  };
}
function m() {
  return 3 === arguments.length && "string" == typeof arguments[0] && "object" == _typeof(arguments[1]) && Array.isArray(arguments[2]) ? markup(arguments[0], {
    attrs: arguments[1],
    children: arguments[2]
  }) : markup(arguments[0], arguments[1]);
}
function mount(e, n) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  s._router.mountRoute = e;
  var o = document.getElementById(e);
  if (null !== o) return R(o, n, r);
  console.error("ID " + e + " does not exist in DOM.");
}
function renderToString(e) {
  var n = [],
    l = new Set();
  var _iterator15 = _createForOfIteratorHelper(s._structureForMap.keys()),
    _step15;
  try {
    for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
      var _e35 = _step15.value;
      l.add(_e35);
    }
  } catch (err) {
    _iterator15.e(err);
  } finally {
    _iterator15.f();
  }
  e.slOnInit && (e.slOnInit(), n.push(e));
  var i = e.view.bind(e)(),
    a = e;
  for (; i.view;) i.slOnInit && (i.slOnInit(), n.push(i)), a = i, i = i.view.bind(i)();
  o(i, a);
  var u = r(i, n);
  n.forEach(function (e) {
    e.slOnDestroy && e.slOnDestroy.bind(e)();
  });
  var _iterator16 = _createForOfIteratorHelper(s._structureForMap.keys()),
    _step16;
  try {
    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
      var _e36 = _step16.value;
      l.has(_e36) || s._structureForMap["delete"](_e36);
    }
  } catch (err) {
    _iterator16.e(err);
  } finally {
    _iterator16.f();
  }
  return u;
}
function update(e, n) {
  var r = e;
  if (e = document.getElementById(e), s._afterInitArr = [], e) {
    var _s22 = n.view.bind(n)();
    o(_s22, n), e = C(e, _s22, n);
  } else console.error("ID " + r + " not mounted in DOM; attachDetector likely needs to be called.");
  var l = e.querySelectorAll("[slref]");
  void 0 !== e.slref && (l = Array.from(l), l.push(e));
  for (var _e37 = 0; _e37 < l.length; ++_e37) {
    n[l[_e37].getAttribute("slref")] = l[_e37].slref;
  }
  if (s._afterInitArr.forEach(function (e) {
    e();
  }), n.slStyle && !e.slScopedCss) {
    var _s23 = x(n, n.slStyle());
    y(e, _s23), e.slScopedCss = !0;
  }
}
var U = n.onpopstate;
n.onpopstate = function (e) {
  switch (s._router.strategy) {
    case "#":
      n.location.hash && s._router.lastHash !== n.location.hash.substring(2) && (U && U(e), route(getRoute()));
      break;
    case "?":
      n.location.search && s._router.lastHash !== n.location.search.substring(2) && (U && U(e), route(getRoute()));
      break;
    case "":
      n.location.pathname && s._router.lastHash !== n.location.pathname.substring(1) && (U && U(e), route(getRoute()));
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
        var _e38 = n.location.href.split("#/")[1];
        if (_e38) {
          var _n33 = _e38.split("/");
          _n33.forEach(function (e, n) {
            s._router.segmentArr[n] = e;
          }), s._router.segmentArr.splice(_n33.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
    case "?":
      {
        var _e39 = n.location.href.split("?/")[1];
        if (_e39) {
          var _n34 = _e39.split("/");
          _n34.forEach(function (e, n) {
            s._router.segmentArr[n] = e;
          }), s._router.segmentArr.splice(_n34.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
    case "":
      {
        var _e40 = n.location.pathname;
        if (_e40) {
          _e40 = _e40.replace("/", "");
          var _n35 = _e40.split("/");
          _n35.forEach(function (e, n) {
            s._router.segmentArr[n] = e;
          }), s._router.segmentArr.splice(_n35.length, s._router.segmentArr.length);
        } else s._router.segmentArr.splice(0, s._router.segmentArr.length);
        break;
      }
  }
};
function setRouteStrategy(e) {
  new Set(["#", "?", ""]).has(e) && (s._router.strategy = e);
}
function getRouteQueryVariables() {
  var e = n.location.search.substring(2).split("&"),
    s = [];
  for (var r = 0; r < e.length; r++) {
    var _n36 = e[r].split("=");
    s.push({
      "var": decodeURIComponent(_n36[0]),
      value: decodeURIComponent(_n36[1])
    });
  }
  return s;
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
      return n.location.href.split("#/")[1];
    case "?":
      return n.location.href.split("?/")[1];
    case "":
      {
        var _e41 = n.location.pathname;
        return _e41 && (_e41 = _e41.replace("/", "")), _e41;
      }
  }
}
function addRoute(e, n) {
  s._router.routeList.push([new RegExp("^" + e.replace(/:[^\/]+/g, "([^\\/]+)") + "$"), n]);
}
function removeRoute(e) {
  var n = new RegExp("^" + e.replace(/:[^\/]+/g, "([^\\/]+)") + "$"),
    r = String(n);
  for (var _e42 = 0; _e42 < s._router.routeList.length; ++_e42) {
    var _s$_router$routeList$ = _slicedToArray(s._router.routeList[_e42], 2),
      _n37 = _s$_router$routeList$[0],
      _o12 = _s$_router$routeList$[1];
    if (String(_n37) === r) {
      s._router.routeList.splice(_e42, 1);
      break;
    }
  }
}
function route(e) {
  var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
  if (s._router.params = r, s._router.currentRoute && s._router.currentRoute.onCanDeactivate && !s._router.currentRoute.onCanDeactivate(e)) return;
  var i = null;
  var _iterator17 = _createForOfIteratorHelper(s._router.routeList),
    _step17;
  try {
    var _loop3 = function _loop3() {
      var _step17$value = _slicedToArray(_step17.value, 2),
        r = _step17$value[0],
        a = _step17$value[1];
      if (r.test(e)) {
        if (a.onActivationCheck && !a.onActivationCheck(e)) return {
          v: (a.onActivationFail && (i = route(a.onActivationFail.route, a.onActivationFail.params, "boolean" != typeof a.onActivationFail.attachDetector || a.onActivationFail.attachDetector)), void (e = void 0))
        };
        a.onBeforeRoute && a.onBeforeRoute();
        var _r23 = document.getElementById(a.root);
        var _u3 = s._destroyNodeMap.get(getRoute());
        _u3 && (_u3.forEach(function (e) {
          e.slOnDestroyFn && _r23.contains(e) && e.slOnDestroyFn(), e.slOnDestroyFn = void 0, e.slUnboundOnDestroy = void 0, e.slAfterInit = !1, e.slOnInit = !1;
        }), s._destroyNodeMap.set(getRoute(), []), s._destroyFuncMap.set(getRoute(), [])), s._router.lastHash = e;
        var _c = n.scrollY;
        switch (s._router.strategy) {
          case "#":
            n.history.pushState(null, document.title, "#/" + e);
            break;
          case "?":
            {
              var _s24 = n.location.href;
              var _r24 = n.location.pathname;
              _s24 = _s24.substring(0, _s24.indexOf(_r24)), _s24 += "/?/" + e, n.history.pushState(null, document.title, _s24);
              break;
            }
          case "":
            {
              var _s25 = n.location.href;
              var _r25 = n.location.pathname;
              _s25 = _s25.substring(0, _s25.indexOf(_r25)), _s25 += "/" + e, n.history.pushState(null, document.title, _s25);
              break;
            }
        }
        if (n.scrollTo(0, _c), s._router.currentRoute && void 0 !== s._router.currentRoute.animateDestroy && (s._router.currentRoute.animateDestroy = !0), s._router.currentRoute && s._router.currentRoute.animateDestroy) {
          var _e43 = s._router.currentRoute.root;
          _e43 = document.getElementById(_e43), s._router.currentRoute = a, h(_e43), g(_e43), l(_e43), O(_e43), w();
        } else w(), s._router.currentRoute = a;
        s._router.count++, a.component && (a.component.slOnDestroy && s._destroyFuncMap.set(e, [a.component.slOnDestroy.bind(a.component)]), s._router.mountRoute = e, R(_r23, a.component, o), a.component.slOnDestroy && (_r23.slOnDestroyIndex = 0, s._destroyFuncMap.get(e).pop(), p(_r23)), i = a.component);
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
  return s._changeDetector.changeDetectionStrategy === s.CHANGE_STRATEGY_AUTOMATIC && H(), i;
}
w();
var T = function T(e, n, s) {
  return {
    parent: e,
    factory: n,
    map: Object.create(null)
  };
};
function F(e, n) {
  "function" == typeof n && (n = n());
  var s = [];
  for (var _r26 = 0; _r26 < n.length; ++_r26) s.push(e.factory.bind(this, n[_r26])());
  return s;
}
function L(e, n, s) {
  "function" == typeof n && (n = n());
  var r = Object.create(null),
    o = e.parent;
  var a,
    u,
    c = o.firstChild;
  if (n.length) {
    for (var _l8 = 0; _l8 < n.length; ++_l8) a = e.map[_l8], a ? s.bind(a, this, n[_l8])() : (a = e.factory.bind(this, n[_l8])(), void 0 !== a.attrs && (a = i(a))), r[_l8] = a, c || o.appendChild(a), c = a.nextSibling;
    for (; null !== c;) u = c.nextSibling, h(c), g(c), l(c), O(c), c = u;
  } else o.textContent = "";
  e.map = r;
  var d = e.parent.querySelectorAll("[slpreventdefault]");
  d.length > 0 && (S([e.parent]), S(Array.from(d)));
}
s.CHANGE_STRATEGY_AUTOMATIC = 100, s.CHANGE_STRATEGY_MANUAL = 200, s.CHANGE_DETECTOR_DETACHED = !1, s.CHANGE_DETECTOR_ATTACHED = !0, s._changeStrategies = [s.CHANGE_STRATEGY_AUTOMATIC, s.CHANGE_STRATEGY_MANUAL], s._changeDetector = {
  lastUpdateDate: new Date(),
  changeDetectionStrategy: s.CHANGE_STRATEGY_AUTOMATIC
}, Object.seal(s._changeDetector), Object.freeze(s._changeStrategies);
var k = function k(e, n) {
  if (n[e]) {
    var _s26 = n[e];
    n[e] = function () {
      var e = _s26.apply(this, [].slice.call(arguments));
      return H(), e;
    };
  }
};
var j = function j() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    e ? update(e, s._updateMap.get(e)) : s._updateMap.forEach(function (e, n) {
      update(n, e);
    });
  },
  H = function H() {
    if (s._changeDetector.changeDetectionStrategy !== s.CHANGE_STRATEGY_AUTOMATIC) return;
    new Date() - s._changeDetector.lastUpdateDate > 6 ? j() : s._debouncedPerformUpdates(), s._changeDetector.lastUpdateDate = new Date();
  };
function setDetectionStrategy(e) {
  s._changeStrategies.forEach(function (n) {
    n === e && (s._changeDetector.changeDetectionStrategy = e);
  });
}
function detectChanges() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  j(e);
}
function isDetectorAttached(e) {
  return s._updateMap.has(e);
}
function detachDetector(e) {
  s._updateMap["delete"](e);
}
var G = Promise.prototype.then;
function enableDetectOnThen() {
  Promise.prototype.then = function (e, n) {
    return G.call(this, function (n) {
      return H(), "function" == typeof e && e instanceof Function ? e(n) : e;
    }, n);
  };
}
function wrapWithChangeDetector(e, n) {
  return function () {
    n && n.slpreventdefault && arguments.length > 0 && "function" == typeof arguments[0].preventDefault && arguments[0].preventDefault();
    var s = e.apply(this, [].slice.call(arguments));
    return H(), s;
  };
}
s._debouncedPerformUpdates = function (e, n) {
  var s;
  return function () {
    for (var _len = arguments.length, r = new Array(_len), _key = 0; _key < _len; _key++) {
      r[_key] = arguments[_key];
    }
    var o = this;
    clearTimeout(s), s = setTimeout(function () {
      return e.apply(o, r);
    }, n);
  };
}(j, 17);
var W = n.XMLHttpRequest.prototype.send,
  P = new Map();
function Y() {
  if (this._onreadystatechange) {
    var _e44 = P.get(this);
    if (void 0 !== _e44 && _e44 === this._onreadystatechangecount) return void P["delete"](this);
    void 0 !== _e44 ? P.set(this, _e44 + 1) : P.set(this, 0);
    var _n38 = this._onreadystatechange.apply(this, arguments);
    return H(), P["delete"](this), _n38;
  }
}
n.XMLHttpRequest.prototype.send = function (e) {
  return this.onreadystatechange ? (this._onreadystatechange = this.onreadystatechange, void 0 === this._onreadystatechangecount ? this._onreadystatechangecount = 0 : this._onreadystatechangecount += 4) : this._onreadystatechangecount = 0, this.onreadystatechange = Y, W.apply(this, arguments);
};
var B = n.fetch;
n.fetch = function () {
  var e = B.apply(this, arguments);
  return H(), e;
};
